import { useModal } from '../../contexts/modal/ModalContext';

import Nav from './Nav';
import Contact from '../ui/Contact';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import AddTask from '../ui/AddTask';
import { useTheme } from '../../contexts/themes/ThemeContext';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { useTasks } from '../../contexts/todo/TasksContext';
import { useState } from 'react';

const HomeLayout = () => {
    const {isSidebarOpen , isFormOpen} = useModal()
    const { user } = useAuthentication()
    const { taskList , userAreas ,addTask} = useTasks()

    const [title , setTitle] = useState<string>('')
    const [description , setDescription] = useState<string>('')
    const [dueDate , setDueDate] = useState<string>('')
    const [tags , setTags] = useState<string[]>([])

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
        <div className='container'>
            <div className={`row row-modal-${isSidebarOpen}`}>
                {isFormOpen?
                <div className='main__section--wrapper'>
                    <Nav />
                    <Contact />
                    <Outlet />
                    {!isSidebarOpen && <AddTask />}
                </div>
                :
                <>
                <Nav />
                <div className='form__section--wrapper'>
                    <h2>Add a new task</h2>
                    <div className='form--wrapper'>
                        <form className='form--form' onSubmit={handleAddTaskForm}>
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
                                <label htmlFor="area">Area </label>

                                <div className="dropdown">
                                    <div className="dropdown__option">
                                        <span className="form__area--circle" style={{backgroundColor: '#EEB211'}}></span>
                                        <span className="form__area--name">NTLBOLWOMH</span>
                                    </div>
                                </div>


                                {/* {userAreas?.map( area => (
                                    <option value="">
                                    
                                            <div className='form__area--circle' style={{backgroundColor: `${area.color}`}}>

                                            </div>
                                            <div>
                                                {area.name}
                                            </div>
                                    </option>

                                ))} */}
                            
                                    {/* <div className='form__area--circle' style={{backgroundColor: '#EEB211'}}>

                                    </div>
                                    <div className='form__area--name'>
                                        NT
                                    </div> */}
                                
                                
                               


                            <label htmlFor="task-tags">Tags (optional, comma-separated)</label>
                            <input id="task-tags" value={tags} type="text" onChange={e =>setTags([e.target.value])} placeholder="school, urgent, backend" />

                            <button>add task submit</button>
                        </form>
                    </div>
                </div>
                </>
                }
            </div>
            {isSidebarOpen && <SideBar />}
        </div>
       
    );
}

export default HomeLayout;
