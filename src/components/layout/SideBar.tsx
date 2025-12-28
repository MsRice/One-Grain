import { RxCross2 } from "react-icons/rx";
import { useModal } from "../../contexts/modal/ModalContext";
import { useAuthentication } from "../../contexts/auth/AuthenticationContect";
import SideBarNav from "./SideBarNav";

const SideBar = () => {
    const {isSidebarOpen , toggleSidebarModal} = useModal()
    const {user} = useAuthentication()

   
    
    return (
        <div className={`sidebar--wrapper sidebar-${isSidebarOpen}`}>
        <RxCross2 className='exit-btn' onClick={() => toggleSidebarModal(isSidebarOpen)}/>
        <h3 className="color-theme">Theme :<span> Light Mode</span></h3>
        

        {!user && <h3 className="additional-features"> Please Login for additional Features</h3> }
        {user && <SideBarNav />}
        
      
      </div>
    );
}

export default SideBar;
