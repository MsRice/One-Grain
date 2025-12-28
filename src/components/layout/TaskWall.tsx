import { useState } from 'react';
import { useTheme } from '../../contexts/themes/ThemeContext';
import { useTasks } from '../../contexts/todo/TasksContext';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import TaskLess from '../ui/TaskLess';
import TaskMore from '../ui/TaskMore';

const TaskWall = () => {
    const { openTasks} = useTheme()
    const { user } = useAuthentication()
    const { taskList , userAreas ,addTask} = useTasks()

    const [title , setTitle] = useState<string>('')
    const [description , setDescription] = useState<string>('')
    const [dueDate , setDueDate] = useState<string>('')
    const [tags , setTags] = useState<string[]>([])

    console.log(taskList)
    console.log(userAreas)


    const handleAddTaskForm = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        if (!user) {
            console.error("User not authenticated")
            return
        }

        const task = {
    
            title : title,
            description: description,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            tags :tags[0].split(','),
            area: {
                name: 'Tasks' , 
                color: '#00aaff' 
            },
            todos: [],
            dateCreate: new Date(),
            userId: user.uid

        }
        addTask(task)

    }

    return (
        <div className='task-wall--wrapper'>
            {taskList?.map(task => {

                const isOpen = openTasks[task.id] ?? false

                return(

                    <div key={task.id} className={`task__sp--wrapper ${isOpen? 'more' : 'less'}`} >
                    {isOpen? <TaskLess task={task}/> : <TaskMore task={task} />}
                    </div>
                )
            })}



           <form onSubmit={handleAddTaskForm}>
            <label htmlFor=""></label>
            
            <label htmlFor="task-title">Title</label>
            <input id="task-title" value={title} onChange={e =>setTitle(e.target.value)} type="text" required />

            <label htmlFor="task-description">Description (optional)</label>
            <textarea id="task-description" value={description} onChange={e =>setDescription(e.target.value)} rows={4}></textarea>

            <label htmlFor="task-dueDate">Due Date</label>
            <input id="task-dueDate" value={dueDate} onChange={e =>setDueDate(e.target.value)} type="date" />

            {/* <fieldset>
                <legend>Todos (optional)</legend>

                <div id="todos-container">
                    <div className="todo-row" data-index="0">
                    

                        <label>
                        Item
                        <input name="todos.item" type="text" />
                        </label>

                    </div>
                </div>

                <button type="button" id="add-todo-btn">+ Add another todo</button>
            </fieldset> 

            <fieldset>
                <legend>Area</legend>

                <label htmlFor="area-name">Area Name</label>
                <input id="area-name" name="area.name" type="text"  />

                <label htmlFor="area-color">Area Color</label>
                <input id="area-color" name="area.color" type="color" value="#00aaff"  />
            </fieldset>

*/}

            <label htmlFor="task-tags">Tags (optional, comma-separated)</label>
            <input id="task-tags" value={tags} type="text" onChange={e =>setTags([e.target.value])} placeholder="school, urgent, backend" />

            <button>add task submit</button>
           </form>
        </div>
    );
}

export default TaskWall;
