import { Container } from 'react-bootstrap'
import IconifyIcon from '../wrapper/IconifyIcon'
import MenuSize from './MenuSize'
import Notification from "./Notification"
import ProfileNotification from "./ProfileNotification"
import ScreenSize from './ScreenSize'

const Topbar = () => {

  return (
    <div className="topbar-custom">
      <Container fluid>
        <div className="d-flex justify-content-between">
          <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">
            <MenuSize />
            <li className="d-none d-lg-block">
              <h5 className="mb-0">Good Morning, John Smith</h5>
            </li>
          </ul>

          <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">

            <li className="d-none d-lg-block">
              <div className="position-relative topbar-search">
                <input type="text" className="form-control bg-light bg-opacity-75 border-light ps-4" placeholder="Search..." />
                <IconifyIcon icon="mdi:magnify" className="fs-16 position-absolute text-muted top-50 translate-middle-y ms-2"></IconifyIcon>
              </div>
            </li>
            <ScreenSize />
            <Notification />
            <ProfileNotification />
          </ul>
        </div>
      </Container>
    </div>
  )
}

export default Topbar