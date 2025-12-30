import { useModal } from '../../contexts/modal/ModalContext';

import Nav from './Nav';
import Contact from '../ui/Contact';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import AddTask from '../ui/AddTask';
import AddTaskPage from './AddTaskPage';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';




const HomeLayout = () => {
    const {isSidebarOpen , isFormOpen} = useModal()
    const {user} = useAuthentication()
    
    return (
        <div className='container'>
            <div className={`row row-modal-${isSidebarOpen}`}>
                {!isFormOpen?
                <div className='main__section--wrapper'>
                    <Nav />
                    <Contact />
                    <Outlet />
                    {!isSidebarOpen && user && <AddTask />}
                </div>
                :
                <>
                <Nav />
                <AddTaskPage />
                </>
                }
            </div>
            {isSidebarOpen && <SideBar />}
        </div>
       
    );
}

export default HomeLayout;
