import { RxCross2 } from "react-icons/rx";
import { useModal } from "../../contexts/modal/ModalContext";
import { useAuthentication } from "../../contexts/auth/AuthenticationContect";
import SideBarNav from "./SideBarNav";
import { useTheme } from "../../contexts/themes/ThemeContext";

const SideBar = () => {
    const {isSidebarOpen , toggleSidebarModal} = useModal()
    const {user} = useAuthentication()
    const {theme , toggleTheme } = useTheme()
   
    
    return (
        <div className={`sidebar--wrapper sidebar-${isSidebarOpen}`}>
        <RxCross2 className='exit-btn' onClick={() => toggleSidebarModal(isSidebarOpen)}/>
        <button onClick={toggleTheme} className="color-theme">Theme : {theme ==='light' ? <span>Light Mode</span> : <span>Dark Mode</span>}</button>
        

        {!user && <h3 className="additional-features"> Please Login for additional Features</h3> }
        {user && <SideBarNav />}
        
      
      </div>
    );
}

export default SideBar;
