import type { TaskUIProps } from '../../types';
import { useTheme } from '../../contexts/themes/ThemeContext';

const TaskMore = ({task}:TaskUIProps) => {
    const {toggleTaskView} = useTheme()
    
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
                        <li className='todo__list--item'>{todo.item}</li>
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
