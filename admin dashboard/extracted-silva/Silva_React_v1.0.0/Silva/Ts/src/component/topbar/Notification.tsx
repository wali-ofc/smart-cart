import userImg12 from "@/assets/images/users/user-12.jpg"
import useImg2 from "@/assets/images/users/user-2.jpg"
import userImg3 from "@/assets/images/users/user-3.jpg"
import userImg5 from "@/assets/images/users/user-5.jpg"
import userImg6 from "@/assets/images/users/user-6.jpg"
import userImg8 from "@/assets/images/users/user-8.jpg"

import { Link } from "react-router-dom"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap"
import { Bell } from 'react-feather'
import SimpleBar from "simplebar-react"
import IconifyIcon from "../wrapper/IconifyIcon"

const Notification = () => {
    return (
        <Dropdown className="notification-list topbar-dropdown">
            <DropdownToggle as={'a'} className="nav-link" href="#">
                <Bell className="noti-icon" />
                <span className="badge bg-danger rounded-circle noti-icon-badge">9</span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end dropdown-lg">
                <DropdownItem className="noti-title">
                    <h5 className="m-0">
                        <span className="float-end">
                            <div  className="text-dark">
                                <small>Clear All</small>
                            </div>
                        </span>Notification
                    </h5>
                </DropdownItem>

                <SimpleBar className="noti-scroll" style={{ height: 352, width: 332 }}>
                    <DropdownItem href="javascript:void(0);" className="dropdown-item notify-item text-muted">
                        <div className="notify-icon">
                            <img src={userImg12} className="img-fluid rounded-circle" alt="" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="notify-details">Carl Steadham</p>
                            <small className="text-muted">5 min ago</small>
                        </div>
                        <p className="mb-0 user-msg">
                            <small className="fs-14">Completed <span className="text-reset">Improve workflow in Figma</span></small>
                        </p>
                    </DropdownItem>

                    <DropdownItem href="javascript:void(0);" className="dropdown-item notify-item text-muted">
                        <div className="notify-icon">
                            <img src={useImg2} className="img-fluid rounded-circle" alt="" />
                        </div>
                        <div className="notify-content">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="notify-details">Olivia McGuire</p>
                                <small className="text-muted">1 min ago</small>
                            </div>

                            <div className="d-flex mt-2 align-items-center">
                                <div className="notify-sub-icon">
                                    <IconifyIcon icon="mdi:download-box" className="text-dark"></IconifyIcon>
                                </div>

                                <div>
                                    <p className="notify-details mb-0">dark-themes.zip</p>
                                    <small className="text-muted">2.4 MB</small>
                                </div>
                            </div>

                        </div>
                    </DropdownItem>

                    <DropdownItem href="javascript:void(0);" className="dropdown-item notify-item text-muted">
                        <div className="notify-icon">
                            <img src={userImg3} className="img-fluid rounded-circle" alt="" />
                        </div>
                        <div className="notify-content">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="notify-details">Travis Williams</p>
                                <small className="text-muted">7 min ago</small>
                            </div>
                            <p className="noti-mentioned p-2 rounded-2 mb-0 mt-2"><span className="text-primary">@Patryk</span> Please make sure that you're....</p>
                        </div>
                    </DropdownItem>

                    <DropdownItem href="javascript:void(0);" className="dropdown-item notify-item text-muted">
                        <div className="notify-icon">
                            <img src={userImg8} className="img-fluid rounded-circle" alt="" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="notify-details">Violette Lasky</p>
                            <small className="text-muted">5 min ago</small>
                        </div>
                        <p className="mb-0 user-msg">
                            <small className="fs-14">Completed <span className="text-reset">Create new components</span></small>
                        </p>
                    </DropdownItem>

                    <DropdownItem href="javascript:void(0);" className="notify-item text-muted">
                        <div className="notify-icon">
                            <img src={userImg5} className="img-fluid rounded-circle" alt="" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="notify-details">Ralph Edwards</p>
                            <small className="text-muted">5 min ago</small>
                        </div>
                        <p className="mb-0 user-msg">
                            <small className="fs-14">Completed <span className="text-reset">Improve workflow in React</span></small>
                        </p>
                    </DropdownItem>

                    <DropdownItem href="javascript:void(0);" className="notify-item text-muted">
                        <div className="notify-icon">
                            <img src={userImg6} className="img-fluid rounded-circle" alt="" />
                        </div>
                        <div className="notify-content">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="notify-details">Jocab jones</p>
                                <small className="text-muted">7 min ago</small>
                            </div>
                            <p className="noti-mentioned p-2 rounded-2 mb-0 mt-2"><span className="text-reset">@Patryk</span> Please make sure that you're....</p>
                        </div>
                    </DropdownItem>
                </SimpleBar>

                <Link to="javascript:void(0);" className="dropdown-item text-center text-primary notify-item notify-all">
                    View all
                    {/* <ArrowRight /> */}
                </Link>

            </DropdownMenu>
        </Dropdown>
    )
}

export default Notification