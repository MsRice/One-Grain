import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { useModal } from '../../contexts/modal/ModalContext';
import { useNavigate } from 'react-router-dom';

const SideBarNav = () => {
    const {isSidebarOpen , toggleSidebarModal} = useModal()
    const { logout} = useAuthentication()
    const moveHere = useNavigate()
    
    function handleLogout(){
        logout()
        toggleSidebarModal(isSidebarOpen)
    }
    
    function handleLink(route: string){
        moveHere(route)
        toggleSidebarModal(isSidebarOpen)
    }

    return (
       
        
    <div className='sidebarnav--wrapper'>
    
        <div className='sidebarnav__links--wrapper'>
            <div className='links--wrapper'>

                <div className='link--wrapper' onClick={() => handleLink('/')}>Tasks</div>
                <div className='link--wrapper' onClick={() => handleLink('/completed')}>Completed Tasks</div>
                <div className='link--wrapper' onClick={() => handleLink('/metrics')}>Metrics Dashboard</div>

            </div>
            <button className='sidebarnav--btn primary-btn' onClick={handleLogout}>Logout</button>
        </div>
    </div>
        
       
    );
}

export default SideBarNav;
