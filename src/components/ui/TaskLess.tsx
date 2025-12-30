import { useTheme } from '../../contexts/themes/ThemeContext';
import { useTasks } from '../../contexts/todo/TasksContext';
import type {TaskUIProps } from '../../types';
import { GoTrash } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const TaskLess = ({task}:TaskUIProps) => {
        const { toggleTaskView} = useTheme()
        const {deleteTask , updateStatus} = useTasks()

        console.log(task)
    
    return (
        <div className='task--wrapper'>
            <div className='task__area--tab' style={{backgroundColor: `${task.area.color}`}}>
            </div>
            <div className='task__section--wrapper'>
                <h3 className='task__section--title'>{task.title}</h3>
                <p className='task__section--desc'>{task.description} , bananas</p>
                <p>Todo Items: {task.todos?.length}</p>
                <h4>Due Date: {task.dueDate?.toDateString()}</h4>
                <p onClick={() => deleteTask(task.id)}><GoTrash /></p>
                {task.status ? 
                    <p>
                        <IoMdCheckboxOutline onClick={() => updateStatus(task.id)}/> Completed ?
                    </p>
                : 
                    <p>
                        <MdCheckBoxOutlineBlank onClick={() => updateStatus(task.id)}/> Completed ?
                    </p>
}
                <div className='more-btn--wrapper' >
                    <p className='more-btn' onClick={() => toggleTaskView(task.id)}>
                        More...
                    </p>
                </div>

                
            </div>

        </div>
    );
}

export default TaskLess;
