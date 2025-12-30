import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme, ThemeProviderProps } from '../../types';

export default function ThemeProvider({children}: ThemeProviderProps) {
    const [theme , setTheme] = useState<Theme>('light')
    const [openTasks, setOpenTasks] = useState<Record<string, boolean>>({});

    
    const toggleTheme = () =>{
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))

    }
    const toggleTaskView = (taskId: string) =>{
        setOpenTasks(prev => ({
        ...prev,
        [taskId]: !prev[taskId],
    }));
    }    

    useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    }, [theme])
    return (
        <ThemeContext.Provider value={{ theme , toggleTheme , openTasks , toggleTaskView}}>
            {children}
        </ThemeContext.Provider>
    );
}
