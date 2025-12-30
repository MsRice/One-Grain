import React from 'react';
import { useTasks } from '../../contexts/todo/TasksContext';
import { useTheme } from '../../contexts/themes/ThemeContext';
import TaskLess from '../ui/TaskLess';
import TaskMore from '../ui/TaskMore';

const Comleted = () => {

    const { openTasks} = useTheme()
    
    const { taskList } = useTasks()
    
    return (
         <div className='task-wall--wrapper'>
            {taskList?.filter(
                task => task.status === true
            ).map(task => {

                const isOpen = openTasks[task.id] ?? false

                return(

                    <div key={task.id} className={`task__sp--wrapper ${!isOpen? 'more' : 'less'}`} >

                    {!isOpen? <TaskLess task={task}/> : <TaskMore task={task} />}
                    </div>
                )
            })}
        </div>
    );
}

export default Comleted;
