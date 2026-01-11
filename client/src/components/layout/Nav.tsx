import { PiSidebarSimpleBold } from "react-icons/pi";
import { useModal } from "../../contexts/modal/ModalContext";

import oneGrainLogo from '../../assets/images/one_grain_logo.png'
import { Link } from "react-router-dom";

const Nav = () => {
    const {isSidebarOpen , toggleSidebarModal , isFormOpen} = useModal()
    return (
        <div className="nav--wrapper">
            <div className="nav-title--wrapper">
                <Link to={'/'}>
                    <figure className="nav-logo--wrapper">
                        <img src={oneGrainLogo} alt="" />
                    </figure>
                </Link>
                <h4>
                    One Grain <span className="title-sm">– small steps, big impact 🌾</span>
                </h4>
            </div>
            {!isFormOpen &&
            <div className={`open-btn--wrapper ${isSidebarOpen ? 'hidden' : ''}`}
                aria-expanded={isSidebarOpen}
                aria-controls="nav-menu"
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                onClick={() => toggleSidebarModal(isSidebarOpen)} >
                
                <PiSidebarSimpleBold className="openModal-btn"/></div>}
        </div>
    );
}

export default Nav;
