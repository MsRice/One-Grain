import type { TaskUIProps, Todo } from '../../types';
import { useTheme } from '../../contexts/themes/ThemeContext';
import { useState } from 'react';
import {FaPencil} from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { useTasks } from '../../contexts/todo/TasksContext';

const TaskMore = ({task}:TaskUIProps) => {
    const {toggleTaskView} = useTheme()
    const {toggleTodo , addTodo ,deleteTodo , editTodo } = useTasks()

    const [editingId, setEditingId] = useState<string|null>(null);
    const [editText, setEditText] = useState<string>('');
    const [addText, setAddText] = useState<string>('');
    const [addTaskModal , setAddTaskModal] = useState<boolean>(false)


    const handleAddTodo = (taskId :string) =>{
        event?.preventDefault()
        console.log(addText)
        addTodo(taskId , addText)
        setAddTaskModal(o => !o)
        setAddText('')

    }

    const handleCompletion = (taskId: string, todoId: string) => {
   
        toggleTodo(taskId, todoId)
    }
            
    const handleEditStart = (todo: Todo) =>{
        setEditingId(todo.id)
        setEditText(todo.item)
        
    }
    
    const handleEditSubmit = (e: React.FormEvent , taskId: string) =>{
        e.preventDefault()
        if (editingId === null) return;
        if (!editText.trim()) return

        editTodo(taskId ,editingId , editText.trim())
        setEditingId(null)
    }
    console.log(task)
    
    return (
        <div className='more--wrapper'>
            <div className='task__area--tab' style={{backgroundColor: `${task.area.color}`}}>
            </div>
            <div className='more__section--wrapper'>
                <div className='more__title--wrapper'>
                    <h3 className='task--title'>{task.title}</h3>
                </div>
                <div className='more__sub-title--wrapper'>
                    <div className='more__sub-title--desc'>
                        <p className='more--desc'>{task.description}</p>
                    </div>

                    <div className='more__sub-title--date'>
                        <p className='more--desc'>{task.area.name}</p>
                        <h4>Due Date: {task.dueDate?.toDateString()}</h4>
                    </div>
                </div>
                <div className='more__todo--wrapper'>
                    <div className='more--todos'>
                            
                        <ul className='todos--wrapper'>
                            {task.todos?.map(todo => (
                                editingId === todo.id ? (
                                        <li className='todo__list--item' key={todo.id}>
                                            <form className='todo--edit' onSubmit={e => handleEditSubmit(e , task.id)}>
                                                <input
                                                type="text"
                                                value={editText}
                                                className='edit-input'
                                                onChange={(e) => setEditText(e.target.value)}
                                                autoFocus
                                                />
                                            </form>     
                                        </li>
                                        
                                    ):(
                                    <li className='todo__list--item' key={todo.id}>
                                        <input 
                                            type='checkbox' 
                                            checked={todo.completed}
                                            onChange={()=>handleCompletion(task.id , todo.id)}/>
                                        
                                        <p key={todo.id} style={{textDecoration : todo.completed ? 'line-through': 'none'}}>
                                            {todo.item} 
                                        </p>
        
                                        <div className='todo--btns'>
                                            <FaPencil className="edit-btn" onClick={() => handleEditStart(todo)}/> 
                                            <FaRegTrashCan className="delete-btn" onClick={() => deleteTodo(task.id ,todo.id)} /> 
                                        </div>
                                    </li>
                                )
                            ))} 
                        </ul>
                        <div className='todos-btn--wrapper'>
                            <button onClick={() => setAddTaskModal(o => !o)}>+ Add Todo</button>
                        </div>
                        {addTaskModal &&
                        <form onSubmit={() => handleAddTodo(task.id)}>
                            <label htmlFor="">Add a todo, to this task:</label>
                            <input type="text" value={addText} onChange={e => setAddText(e.target.value) }/>
                            <button>Submit</button>
                        </form>
                        }
                    </div>
                    <div>
                        {task.tags?.map((el,index ) => (

                            <span key={index}> #{el} , </span>
                        ))}
                    </div>

                </div>
                <div className='more-btn--wrapper' >
                    <p className='more-btn' onClick={() => toggleTaskView(task.id)}>
                        Less...
                    </p>
                </div>
                
            </div>

        </div>
    );
}

export default TaskMore;
