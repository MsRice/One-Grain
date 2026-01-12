import type { TaskUIProps, Todo } from '../../types';
import { useTheme } from '../../contexts/themes/ThemeContext';
import React, { useState } from 'react';
import {FaPencil} from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useTasks } from '../../contexts/todo/TasksContext';
import DueDate from './DueDate';
import { GoTasklist } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const TaskMore = ({task}:TaskUIProps) => {
    const {toggleTaskView , setOpenTasks } = useTheme()
    const {toggleTodo , addTodo ,deleteTodo , editTodo , deleteTask , updateStatus} = useTasks()

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
    
    const openAddTodo = () => {
        setAddTaskModal(true)
        setOpenTasks(o => ({
            ...o,
            [task.id]: true,       
            [`${task.id}-add`]: true
        }))
    }

      const closeAddTodo = () => {
        setAddTaskModal(false)
        setOpenTasks(o => ({
            ...o,
            [`${task.id}-add`]: false
        }))
    }

    return (
        <>
      
        <div className={`more--wrapper ${addTaskModal? 'add' : ''}`}>
            <div className='task__area--tab' style={{backgroundColor: `${task.area.color}`}}>
            </div>

            <div className='more__section--wrapper'>

                <h3 className='more__section--title'>{task.title}</h3>
                <div className='more__info--wrapper'>
                    <div className='more__section--header'>
                        <span className='more__section--area-title' style={{'--area-color': task.area.color , backgroundColor: `${task.area.color}6e`} as React.CSSProperties}>{task.area.name}</span>
                        <p className='more__section--desc'>{task.description}</p>
                        
                    </div>
               
                    <div className='task__section--sub-header'>
                        
                        <div className='sub-header__notification--wrapper'>

                            {task.dueDate && <DueDate dueDate={task.dueDate} />}                            
                            
                        </div>

                        <div className='sub-header__status--wrapper'>
                            <div className='status-btns--wrapper'>
                                {task.status ? 
                                    <p>
                                        <IoMdCheckboxOutline onClick={() => updateStatus(task.id)}/>
                                    </p>
                                : 
                                <p>
                                        <MdCheckBoxOutlineBlank onClick={() => updateStatus(task.id)}/>
                                    </p>
                                }
                                <p onClick={() => deleteTask(task.id)}><GoTrash /></p>
                            </div>    
                        </div>

                    </div>
                </div>

                <div className='more__todo--wrapper'>
                    <div className='todolist__title--wrapper'>

                        <div className='todolist__icon--wrapper'><GoTasklist /></div>
                        <h3 className='todolist__title'>Todos</h3>
                    </div>
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
                                                <button type="submit"><IoIosArrowForward /></button>
                                                
                                            </form>     
                                        </li>
                                        
                                    ):(
                                    <li className='todo__list--item' key={todo.id}>
                                        <div className='todolist__item--wrapper'>
                                            <input 
                                                type='checkbox' 
                                                checked={todo.completed}
                                                onChange={()=>handleCompletion(task.id , todo.id)}/>
                                            
                                            <p key={todo.id} className='todolist__item--title' style={{textDecoration : todo.completed ? 'line-through': 'none'}}>
                                                {todo.item} 
                                            </p>
                                        </div>
        
                                        <div className='todo--btns'>
                                            <FaPencil className="edit-btn" onClick={() => handleEditStart(todo)}/> 
                                            <FaRegTrashCan className="delete-btn" onClick={() => deleteTodo(task.id ,todo.id)} /> 
                                        </div>
                                    </li>
                                )
                            ))} 
                        </ul>
                        <div className='todos-btn--wrapper'>
                            <button onClick={openAddTodo} className='primary-btn'>+</button>
                        </div>
                     
                    </div>

                </div>
                
                <div className='more__footer--wrapper'>

                    <div className='task__section--tags more'>
                        {task.tags?.map((el,index ) => (

                            <span key={index} className='task__section--tag'> #{el}</span>
                        ))}
                    </div>
                    <div className='more-btn--wrapper' >
                        <p className='more-btn' onClick={() => toggleTaskView(task.id)}>
                            Less...
                        </p>
                    </div>
                </div>
                
            </div>
   
        </div> 

    
            {addTaskModal &&
            <div className='add__todo--wrapper'>
                <RxCross2 className='todo__exit-btn' onClick={closeAddTodo}/>
                <form onSubmit={() => handleAddTodo(task.id)} className='add__todo--form'>
                    <label htmlFor="">Add a todo, to this task:</label>
                    <input type="text" value={addText} onChange={e => setAddText(e.target.value) }/>
                    <button className='primary-btn'>Submit</button>
                </form>
            </div>
            }
     
        </>
    );
}

export default TaskMore;


