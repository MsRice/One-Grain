import { PiSidebarSimpleBold } from "react-icons/pi";
import { useModal } from "../../contexts/modal/ModalContext";

import oneGrainLogo from '../../assets/images/one_grain_logo.png'
import { Link } from "react-router-dom";

const Nav = () => {
    const {isOpen , toggleModal} = useModal()
    return (
        <div className="nav--wrapper">
            <div className="nav--title">
                <Link to={'/'}>
                    <figure className="nav-logo--wrapper">
                        <img src={oneGrainLogo} alt="" />
                    </figure>
                </Link>
                <h4>
                    One Grain – small steps, big impact 🌾
                </h4>
            </div>
            <div onClick={() => toggleModal(isOpen)}><PiSidebarSimpleBold /></div>
        </div>
    );
}

export default Nav;
