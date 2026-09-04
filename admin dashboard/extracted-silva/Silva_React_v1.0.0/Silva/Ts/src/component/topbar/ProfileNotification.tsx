import { useNavigate } from "react-router-dom";
import userImg5 from "@/assets/images/users/user-5.jpg"
import IconifyIcon from '../wrapper/IconifyIcon'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap"

const ProfileNotification = () => {
    const navigate = useNavigate();
    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem('adminAuth');
        navigate('/auth/login');
    };
    
    return (

        <Dropdown className="notification-list topbar-dropdown">
            <DropdownToggle as={'a'} className="nav-link nav-user me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src={userImg5} alt="user-image" className="rounded-circle" />
                <span className="pro-user-name ms-1">
                    Abdullah <IconifyIcon icon="mdi:chevron-down"></IconifyIcon>
                </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end profile-dropdown ">

                <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome !</h6>
                </div>

                <DropdownItem href="/utility/profile" className="notify-item">
                    <IconifyIcon icon="mdi:account-circle-outline" className="fs-16 align-middle"></IconifyIcon>&nbsp;&nbsp;
                    <span>My Account</span>
                </DropdownItem>

                <DropdownItem href="/auth/lock-screen" className="notify-item">
                    <IconifyIcon icon="mdi:lock-outline" className="fs-16 align-middle"></IconifyIcon>
                    <span>Lock Screen</span>
                </DropdownItem>

                <div className="dropdown-divider"></div>

                <DropdownItem href="/auth/logout" className="dropdown-item notify-item">
                    <IconifyIcon icon="mdi:location-exit" className="fs-16 align-middle"></IconifyIcon>
                    <span>Logout</span>
                </DropdownItem>

            </DropdownMenu>
        </Dropdown>
    )
}

export default ProfileNotification
