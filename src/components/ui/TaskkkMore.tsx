import type { TaskUIProps, Todo } from '../../types';
import { useTheme } from '../../contexts/themes/ThemeContext';
import {FaPencil} from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from 'react';
import { useTodo } from '../../contexts/todo/TasksContext';

const TaskMore = ({task}:TaskUIProps) => {
    const {toggleTaskView} = useTheme()
    const {toggleTodo ,deleteTodo , editTodo } = useTodo()

    const [editingId, setEditingId] = useState<number|null>(null);
    const [editText, setEditText] = useState<string>('');

    const handleCompletion = (id : number) => {
      toggleTodo(id)
    }
    
    const handleEditStart = (todo: Todo) =>{
        setEditingId(todo.id)
        setEditText(todo.item)
        
    }
    const handleEditSubmit = (e: React.FormEvent) =>{
        e.preventDefault()
        if (editingId === null) return;
        if (!editText.trim()) return

        editTodo(editingId , editText)
        setEditingId(null)
    }
    
    return (
        <div className='task--wrapper'>
            <div className='task__area--tab' style={{backgroundColor: `${task.area.color}`}}>
            </div>
            <div className='more__section--wrapper'>
                <div className='more__section--title'>
                    <h3 className='task__section--title'>{task.title}</h3>
                    <h4>Due Date: {task.dueDate?.toDateString()}</h4>
                </div>
                <p className='more__section--desc'>{task.description}</p>
                <ul className='todos__section--wrapper'>
                    {task.todos?.map(todo => (
                        editingId === todo.id ? (
                                <li className='todo__list--item'>
                                    <form className='todo--edit' onSubmit={handleEditSubmit}>
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
                            <li className='todo__list--item'>
                                <input 
                                    type='checkbox' 
                                    checked={todo.completed}
                                    onChange={()=>handleCompletion(todo.id)}/>
                                
                                <p style={{textDecoration : todo.completed ? 'line-through': 'none'}}>
                                    {todo.item}
                                </p>

                                <div className='todo--btns'>
                                    <FaPencil className="edit-btn" onClick={() => handleEditStart(todo)}/> 
                                    <FaRegTrashCan className="delete-btn" onClick={() => deleteTodo(todo.id)} /> 
                                </div>
                            </li>
                        )
                    ))}
                </ul>

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
