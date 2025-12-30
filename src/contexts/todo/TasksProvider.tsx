import { useEffect, useState } from 'react';
import {db} from '../../utils/firebase'

import type { Area, FirestoreTask, NewTask, Task, TasksProviderProps, Todo } from '../../types';
import { TasksContext } from './TasksContext';
import { addDoc, collection,  deleteDoc,  doc,  getDocs, onSnapshot, query,  Timestamp, updateDoc, where } from 'firebase/firestore';
import { useAuthentication } from '../auth/AuthenticationContect';
import { nanoid } from 'nanoid'


export default function TasksProvider({children}: TasksProviderProps){

    const { user } = useAuthentication()
    const [taskList , setTaskList] = useState<Task[]>([])
    // const [todoList , setTodoList] = useState<Todo[]>([])
    const [userAreas , setUserAreas] = useState<Area[] | null>(null)
    


    
    
    const addTask = async (task:NewTask) => {
        console.log(task)
        if(!user) return

        try {
            await addDoc(collection(db , 'tasks'),{
                ...task,
                userId: user.uid,
                dueDate: task.dueDate ? Timestamp.fromDate(task.dueDate) : null,
                dateCreate: Timestamp.fromDate(task.dateCreate),
            })
            console.log("Document successfully written!");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    
    useEffect(() => {
        if(!user) return
                
        const q = query(
            collection(db, "tasks"),
            where("userId", "==", user.uid)
        )
        
        const unsub = onSnapshot(q, (snapshot) => {
            const tasks: Task[] = snapshot.docs.map((doc) => {
            const data = doc.data() as FirestoreTask
            
            return {
                id: doc.id,
                title: data.title,
                area: data.area,
                description: data.description,
                todos: data.todos ?? [],
                tags: data.tags ?? [],
                dueDate: data.dueDate ? data.dueDate.toDate() : undefined,
                dateCreate: data.dateCreate.toDate(),
                status: false
            }
        })
    
        setTaskList(tasks)
    
    })
    return unsub
    
    }, [user])


    useEffect(() => {
        if(!user) return
        
        const areasRef = collection(db , 'users' , user.uid , 'areas')
        
        const unsub = onSnapshot( areasRef ,snapshot => {

            const areas: Area[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Area, 'id'>)
                }))
                
                setUserAreas(areas)
            })
       
       
        return unsub

    }, [user])
  

    const mapFirestoreTask = (doc: any): Task => {
    const data = doc.data()

    return {
        id: doc.id,
        title: data.title,
        area: data.area,
        description: data.description,
        todos: Array.isArray(data.todos) ? data.todos : [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        dueDate: data.dueDate ? data.dueDate.toDate() : undefined,
        dateCreate: data.dateCreate.toDate(),
        status: data.status ?? false
    }}


    const deleteTask = async (taskId: string) => {
        if (!user) return;

        try {
            await deleteDoc(doc(db, 'tasks', taskId));
            console.log('Task successfully deleted');
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };


useEffect(() => {
    if (!user) {
        return
    }

    const q = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid)
    )

    const unsubscribe = onSnapshot(q, snapshot => {
        const tasks = snapshot.docs.map(mapFirestoreTask)
        setTaskList(tasks)
    })

    return () => unsubscribe()
}, [user])


    const addUserArea = async (area: Area) => {
        if (!user) return;

        try {
            await addDoc(
            collection(db, 'users', user.uid, 'areas'),
            {
                ...area,
                userId: user.uid,
                dateCreated: Timestamp.now(),
            }
            );

            console.log('Area successfully added');
        } catch (err) {
            console.error('Error adding area:', err);
        }
    };

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'users', user.uid, 'areas')
        );

        const unsub = onSnapshot(q, snapshot => {
            const areas: Area[] = snapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                name: data.name,
                color: data.color,
            };
            });

            setUserAreas(areas);
        });

        return () => unsub();
    }, [user]);



    const addTodo = async (taskId: string, item: string) => {
        if (!user) return

        try {
            const task = taskList.find(t => t.id === taskId)
            if (!task) return

            const newTodo = {
                id: nanoid(),
                item,
                completed: false
            }

            const updatedTodos = [...(task.todos ?? []), newTodo]

            await updateDoc(doc(db, 'tasks', taskId), {
                todos: updatedTodos
            })

            console.log('Todo added')
        } catch (err) {
            console.error('Error adding todo:', err)
        }
    }

    
    const toggleTodo = async (taskId: string, todoId: string) => {
        if (!user) return

        try {
            const task = taskList.find(t => t.id === taskId)
            if (!task) return

            const updatedTodos = (task.todos ?? []).map(todo =>
                todo.id === todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )

            await updateDoc(doc(db, 'tasks', taskId), {
                todos: updatedTodos
            })

            console.log('Todo toggled')
        } catch (err) {
            console.error('Error toggling todo:', err)
        }
    }

    const updateStatus = async (taskId: string) => {

        if (!user) return
        
        try {
            const task = taskList.find(t => t.id === taskId)
            if (!task) return
            
            await updateDoc(doc(db, 'tasks', taskId), {
                status: !task.status,
            })
            console.log(task.status)

            console.log('Task status updated')
        } catch (err) {
            console.error('Error updating task status:', err)
        }
    }
  
    // // const filteredTodos = todoList.filter( todo => {
    // //     if (filter === 'active') return !todo.completed
    // //     if (filter === 'completed') return todo.completed
    // //     return true
    // // }
    // // )

    const deleteTodo = async (taskId: string , todoId: string) =>{
        if(!user) return

        try{
            const taskRef = doc(db, 'tasks' , taskId)

            const task = taskList.find(t => t.id === taskId)
            if(!task) return

            const updatedTodos = task.todos?.filter(todo => todo.id !== todoId)

            await updateDoc(taskRef, {
                todos: updatedTodos
            })

        } catch(err){
            console.error(err)
        }
       
    }

    const editTodo = async (
        taskId: string,
        todoId: string,
        item: string
    ) => {
        if (!user) return

        try {
            const taskRef = doc(db, 'tasks', taskId)

            const task = taskList.find(t => t.id === taskId)
            if (!task) return

            const updatedTodos = task.todos?.map(todo =>
                todo.id === todoId
                    ? { ...todo, item }
                    : todo
            )

            await updateDoc(taskRef, {
                todos: updatedTodos
            })

            console.log('Todo updated')
        } catch (err) {
            console.error('Error editing todo:', err)
        }
    }
    
    // const clearCompleted = () =>{
    //     setTodoList(prev =>
    //         prev.filter( todo =>
    //             !todo.completed
    //         )
    //     )
    // }


    // useEffect(() => {
        
    //     localStorage.setItem('todos', JSON.stringify(todoList))
    
    // }, [todoList])
    
    return (
        <TasksContext.Provider value={{ taskList , userAreas , addTask , addUserArea , deleteTask , updateStatus , addTodo  ,toggleTodo , deleteTodo , editTodo}}>
            {children}
        </TasksContext.Provider>
    );
}

