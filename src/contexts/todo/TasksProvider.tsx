import { useEffect, useState } from 'react';
import {db} from '../../utils/firebase'

import type { Area, FirestoreTask, NewTask, Task, TasksProviderProps } from '../../types';
import { TasksContext } from './TasksContext';
import { addDoc, collection,  getDocs, onSnapshot, query,  Timestamp, where } from 'firebase/firestore';
import { useAuthentication } from '../auth/AuthenticationContect';

export default function TasksProvider({children}: TasksProviderProps){

    const { user } = useAuthentication()
    const [taskList , setTaskList] = useState<Task[]>([])
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
        todos: data.todos ?? [],
        tags: data.tags ?? [],
        dueDate: data.dueDate ? data.dueDate.toDate() : undefined,
        dateCreate: data.dateCreate.toDate(),
    }}


    const getTasks = async () => {

        if(!user) return []
        const q = query(
            collection(db , 'tasks'),
            where('userId', '==' , user.uid)
        )
        
        const snapshot = await getDocs(q)

       
        return snapshot.docs.map(mapFirestoreTask)
       
    }


    useEffect(()=>{
        if (!user) return
        

        let isMounted = true

        const load = async () => {
            const tasks = await getTasks()
            if(isMounted){
                // console.log(tasks)
                setTaskList(tasks)
            }

        }
        load()

        return () => {
            isMounted = false
        }
    },[user]) 
    // const addTodo = (text) =>{ 
    //     setTodoList(list =>[...list , {
    //   id : id,
    //   text,
    //   completed: false
    // }])
    
    // }

    
    // const toggleTodo = (id) =>{
    //     setTodoList(prev =>
    //         prev.map( todo =>
    //             todo.id === id ? {
    //                 ...todo,
    //                 completed : !todo.completed 
    //             }
    //             : todo
    //         )
    //     )
    // }

    // // const filteredTodos = todoList.filter( todo => {
    // //     if (filter === 'active') return !todo.completed
    // //     if (filter === 'completed') return todo.completed
    // //     return true
    // // }
    // // )

    // const deleteTodo = (id) =>{
    //     setTodoList(prev =>
    //         prev.filter( todo => 
    //             todo.id !== id
    //         )
    //     )
    // }

    // const editTodo = (id , text) =>{
    //     setTodoList(prev =>
    //         prev.map( todo =>
    //             todo.id === id ? {
    //                 ...todo,
    //                 text  
    //             }
    //             : todo
    //         )
    //     )

    // }
    
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
        <TasksContext.Provider value={{ taskList , userAreas , addTask }}>
            {children}
        </TasksContext.Provider>
    );
}

