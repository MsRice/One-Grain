import { useTheme } from '../../contexts/themes/ThemeContext';
import type {TaskUIProps } from '../../types';

const TaskLess = ({task}:TaskUIProps) => {
        const { toggleTaskView} = useTheme()
    
    return (
        <div className='task--wrapper'>
            <div className='task__area--tab' style={{backgroundColor: `${task.area.color}`}}>
            </div>
            <div className='task__section--wrapper'>
                <h3 className='task__section--title'>{task.title}</h3>
                <p className='task__section--desc'>{task.description}</p>
                <p>Todo Items: {task.todos?.length}</p>
                <h4>Due Date: {task.dueDate?.toDateString()}</h4>

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
