import { GoTasklist } from "react-icons/go";
import type { TodosProps } from "../../types";

const TodoNotification = ({todos}:TodosProps) => {
    return (
        <div className='todo-items--wrapper'>
            <div className='todo-item__icon--wrapper'><GoTasklist /></div>
            <div className='todo-item__circle--wrapper'>
                <span className='todo-items--total'>{todos?.length}</span>
                
            </div>
            
        </div>
    );
}

export default TodoNotification;
