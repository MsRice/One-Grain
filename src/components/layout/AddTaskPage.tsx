import { RxCross2 } from "react-icons/rx";
import { useModal } from "../../contexts/modal/ModalContext";
import { useState } from "react";
import { Area } from "../../types";
import { useAuthentication } from "../../contexts/auth/AuthenticationContect";
import { useTasks } from "../../contexts/todo/TasksContext";

const AddTaskPage = () => {
    const {isFormOpen ,toggleFormModal} = useModal()
    const { user } = useAuthentication()
     const {userAreas ,addTask , addUserArea} = useTasks()

    const [title , setTitle] = useState<string>('')
    const [description , setDescription] = useState<string>('')
    const [dueDate , setDueDate] = useState<string>('')
    const [tags , setTags] = useState<string[]>([])
    const [area , setArea] = useState<Area>({name: 'Task' , color: '#00aaff'})
    const [areaName , setAreaName] = useState<string>('')
    const [areaColor , setAreaColor] = useState<string>('')

    const [isOpen ,setIsOpen] = useState<boolean>(false)
    const [isAdderOpen ,setIsAdderOpen] = useState<boolean>(false)

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
            tags :tags[0]?.split(',').map(t => t.trim()) ?? [],
            area: area,
            todos: [],
            dateCreate: new Date(),
            userId: user.uid,
            status:false
        }
        addTask(task)
        toggleFormModal(isFormOpen)

    }

    
    const handleSetArea = (updateArea: Area) =>{
        setIsOpen(o => !o)
        setArea(updateArea)
    }
    
    const handleAddArea = async() => {
        if (!areaColor || !areaName) return

        await addUserArea({
            name: areaName,
            color: areaColor
        })
        setIsOpen(o => !o)
        setIsAdderOpen(o => !o)
        setArea({name: areaName, color: areaColor})
        
    }
    return (
        <div className='form__section--wrapper'>
            <h2>Add a new task</h2>
            <RxCross2 className='exit-btn' onClick={() => toggleFormModal(isFormOpen)} />
            <div className='form--wrapper'>
                <form className='form--form' onSubmit={handleAddTaskForm}>
                    <label htmlFor=""></label>
                    
                    <label htmlFor="task-title">Title</label>
                    <input id="task-title" value={title} onChange={e =>setTitle(e.target.value)} type="text" required />

                    <label htmlFor="task-description">Description (optional)</label>
                    <textarea id="task-description" value={description} onChange={e =>setDescription(e.target.value)} rows={4}></textarea>

                    <label htmlFor="task-dueDate">Due Date</label>
                    <input id="task-dueDate" value={dueDate} onChange={e =>setDueDate(e.target.value)} type="date" />

                    <div className='form__area--wrapper'>
                        <div className='area__dropdown--wrapper'>
                        <label htmlFor="area">Area </label>
                            <button onClick={(e) =>{
                                    e.preventDefault()
                                    setIsOpen(o => !o)}} className="dropdown__option default">
                                <span className="form__area--circle" style={{backgroundColor: `${area.color}`}}></span>
                                <span className="form__area--name">{area.name}</span>
                            </button>
                        </div>

                        {isOpen &&
                        
                        

                        <div className="dropdown">
                            {userAreas?.map( area => (
                                <div 
                                key={`${area.name}`} 
                                className="dropdown__option"
                                onClick={(e) =>{
                                    e.preventDefault()
                                    handleSetArea({name: `${area.name}` , color: `${area.color}`})}}>
                                    <span className="form__area--circle" style={{backgroundColor: `${area.color}`}}></span>
                                    <span className="form__area--name">{area.name}</span>
                                </div>

                            ))}
                            
                            <div 
                            key={'adder'} 
                            className="dropdown__option adder"
                            onClick={() => setIsAdderOpen(o => !o)}>
                                <span className="form__area--name">Add new Area +</span>
                            </div>
                        </div>

                        }
                        {isAdderOpen && <div className='adder--wrapper'>
                                <label htmlFor="area-name">Area Name</label>
                                <input id="area-name" name="area.name" type="text" value={areaName}  onChange={e =>setAreaName(e.target.value)}/>
                                
                                <label htmlFor="area-color">Area Color</label>
                                <input id="area-color" name="area.color" type="color" value={areaColor} onChange={e =>setAreaColor(e.target.value)} />

                                <button type='button' onClick={handleAddArea}>+</button>
                        </div>}
                        </div>                      
                        


                    <label htmlFor="task-tags">Tags (optional, comma-separated)</label>
                    <input id="task-tags" value={tags} type="text" onChange={e =>setTags([e.target.value])} placeholder="school, urgent, backend" />

                    <button type="submit">add task submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddTaskPage;
