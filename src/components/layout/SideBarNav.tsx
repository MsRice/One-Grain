import React from 'react';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { useModal } from '../../contexts/modal/ModalContext';

const SideBarNav = () => {
    const {isOpen , toggleModal} = useModal()
    const { logout} = useAuthentication()
    
    function handleLogout(){
        logout()
        toggleModal(isOpen)
    }

    return (
        <div className='sidebarnav--wrapper'>
            <div className='sidebarnav__links--wrapper'>
                <div className='links--wrapper'>

                    <div>Completed Tasks</div>
                    <div>Metrics Dashboard</div>
                </div>
                <button className='sidebarnav--btn' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default SideBarNav;
