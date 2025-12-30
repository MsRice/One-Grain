import React, { useMemo } from 'react';
import { useTasks } from '../../contexts/todo/TasksContext';
import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';



const Metrics = () => {
    const { taskList , userAreas} = useTasks()


    const metrics = useMemo(() => {
    const total = taskList.length
    const completed = taskList.filter(t => t.status).length

    return {
        total,
        completed,
        percentage: total === 0 ? 0 : (completed / total) * 100,
    }
    }, [taskList])

    return (
        <div className='metrics-wall--wrapper'>

            <div className='metric--container'>
                <div className='metric--title--wrapper'>
                    <h2 className='metric--title'>Total Tasks</h2>
                </div>
                <div className='metric--progress-bar--wrapper'>
                    <div className='metric--progress-bar'>
                        {metrics.total}
                    </div>
                </div>
            </div>
            
            <div className='metric--container'>
                <div className='metric--title--wrapper'>
                    <h2 className='metric--title'>Total Completed</h2>
                </div>
                <div className='metric--progress-bar--wrapper'>
                    <div className='metric--progress-bar'>
                        {metrics.completed}
                    </div>
                </div>
            </div>
            
            <div className='metric--container'>
                <div className='metric--title--wrapper'>
                    <h2 className='metric--title'>Completed Ratio</h2>
                </div>
                <div className='metric--progress-bar--wrapper'>
                    <div className='metric--progress-bar circular--progress-bar'>
                        <CircularProgressbar value={metrics.percentage} text={`${metrics.percentage.toFixed(2)}%`} styles={{
                            path:{
                                stroke: `rgba(234, 157, 41, ${metrics.percentage / 100})`,
                                strokeLinecap: 'round',
                            },
                            
                            text: {
                                fill: '#EA9D29',
                                fontSize: '1.2rem',
                                dominantBaseline: 'middle',
                                textAnchor: 'middle'
                            },
                            
                            trail: {
                                // Trail color
                                stroke: '#d6d6d6',
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                // Rotate the trail
                                transformOrigin: 'center center',
                            }
                            
                        }} />
                    </div>
                </div>
            </div>
            
            
            <div className='metric--container'>
                <div className='metric--title--wrapper'>
                    <h2 className='metric--title'>Total Task by Area</h2>
                </div>
                <div className='metric--progress-bar--wrapper'>
                    <div className='metric--task-wrapper'>
                        {userAreas?.map( area => {
                            const count =  taskList?.filter(
                                task => task.area.name === area.name
                            ).length
                            const completed = taskList?.filter(
                                t => t.area.name === area.name && t.status
                            ).length
                            
                            return(
                                <div className='metric--task-bar'>
                                    <span>
                                        {area.name} :
                                    </span>
                                    <progress value={completed} max={count}>
                                        {count}
                                    </progress>
                                   
                                </div>
                        )})
                    }
                </div>
                </div>
            </div>
        </div>
    );
}

export default Metrics;
