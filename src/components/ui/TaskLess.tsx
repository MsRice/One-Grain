import { useTheme } from '../../contexts/themes/ThemeContext';
import { useTasks } from '../../contexts/todo/TasksContext';
import type {TaskUIProps } from '../../types';
import { GoTrash } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import DueDate from './DueDate';
import TodoNotification from './TodoNotification';


const TaskLess = ({task}:TaskUIProps) => {
        const { toggleTaskView} = useTheme()
        const {deleteTask , updateStatus} = useTasks()

        console.log(task)
    
    return (
        <div className='task--wrapper'>
            <div className='task__area--tab' style={{backgroundColor: `${task.area.color}`}}>
            </div>
            <div className='task__section--wrapper'>

                <div className='task__section--header'>
                    <h3 className='task__section--title'>{task.title}</h3>
                    <p className='task__section--desc'>{task.description}</p>
                    <div className='task__section--tags'>
                        {task.tags?.map((el,index ) => (
                            
                            <span key={index} className='task__section--tag'> #{el}</span>
                        ))}
                    </div>
                </div>

                <div className='task__section--sub-header'>
                   
                    <div className='sub-header__notification--wrapper'>

                        {task.dueDate && <DueDate dueDate={task.dueDate} />}

                        <TodoNotification todos={task.todos} />
                       
                        
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

                        <div className='more-btn--wrapper' >
                            <p className='more-btn' onClick={() => toggleTaskView(task.id)}>
                                More...
                            </p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
        
    );
}

export default TaskLess;
