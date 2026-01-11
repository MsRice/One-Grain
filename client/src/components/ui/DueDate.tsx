import type { DueDateProps } from "../../types";
import { format} from 'date-fns'


const DueDate = ({dueDate}:DueDateProps) => {
    return (
        <div className='due-date--wrapper'>
            
            <div className='date_period'>
                <span className='date_month'>{dueDate?.toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                <span className='date_year'>'{dueDate?.toLocaleString('en-US', { year: '2-digit' }).toUpperCase()}</span>
            </div>
            <div className='date_day'>{dueDate ? format(dueDate , 'do') : ''}</div>
            
        
        </div>
    );
}

export default DueDate;
