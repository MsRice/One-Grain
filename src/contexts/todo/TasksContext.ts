import { createContext, useContext } from "react"
import type { TasksContextType } from "../../types";

export const TasksContext = createContext<TasksContextType | undefined>(undefined)


export const useTasks = () =>{

    const context = useContext(TasksContext)
    
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }

    return context;
} 