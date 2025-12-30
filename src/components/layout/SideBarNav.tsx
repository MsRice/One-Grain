import React from 'react';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { useModal } from '../../contexts/modal/ModalContext';
import { Link } from 'react-router-dom';

const SideBarNav = () => {
    const {isSidebarOpen , toggleSidebarModal} = useModal()
    const { logout} = useAuthentication()
    
    function handleLogout(){
        logout()
        toggleSidebarModal(isSidebarOpen)
    }

    return (
        <div className='sidebarnav--wrapper'>
            <div className='sidebarnav__links--wrapper'>
                <div className='links--wrapper'>

                    <Link className='link--wrapper' to={'/'}>Tasks</Link>
                    <Link className='link--wrapper' to={'/completed'}>Completed Tasks</Link>
                    <Link className='link--wrapper' to={'/metrics'}>Metrics Dashboard</Link>
                </div>
                <button className='sidebarnav--btn' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default SideBarNav;
