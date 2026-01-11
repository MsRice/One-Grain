import { BiTask } from "react-icons/bi";
import { useModal } from "../../contexts/modal/ModalContext";


const AddTask = () => {
    const {isFormOpen , toggleFormModal} = useModal()
    return (
        <div  onClick={() => toggleFormModal(isFormOpen)} className='afmodal--wrapper'>
            <div className='afmodal__svg--wrapper'>
                <BiTask className='afmodal__svg'/>
            </div>
            <p className='afmodal__tag--wrapper'>Add Task</p>
        </div>
    );
}

export default AddTask;
