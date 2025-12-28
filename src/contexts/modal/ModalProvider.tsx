import { useState } from 'react';
import type { ModalProviderProps } from '../../types';
import { ModalContext } from './ModalContext';

export default function ModalProvider({children} :ModalProviderProps){
    const [isSidebarOpen , setIsSidebarOpen] = useState<boolean>(false)

    const toggleSidebarModal = (isSidebarOpen:boolean) => {
        console.log(isSidebarOpen)
        setIsSidebarOpen(!isSidebarOpen)
    }
    const [isFormOpen , setIsFormOpen] = useState<boolean>(false)

    const toggleFormModal = (isFormOpen:boolean) => {
        console.log(isFormOpen)
        setIsFormOpen(!isFormOpen)
    }
    

    return (
        <ModalContext.Provider value={{ isSidebarOpen, toggleSidebarModal, isFormOpen, toggleFormModal}}>
            {children}
        </ModalContext.Provider>
    );
}

