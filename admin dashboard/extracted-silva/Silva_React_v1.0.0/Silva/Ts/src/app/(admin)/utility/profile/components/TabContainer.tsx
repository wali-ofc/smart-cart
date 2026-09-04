import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap'
import About from './About'
import Education from './Education'
import Experience from './Experience'
import Friends from './Friends'
import Setting from './Setting'

const TabContainers = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <CardBody className="pt-0">
                        <TabContainer defaultActiveKey={"profile_about"}>
                            <Nav className="nav-underline border-bottom pt-2" id="pills-tab" role="tablist">
                                <NavItem role="presentation">
                                    <NavLink eventKey={"profile_about"} className="nav-link p-2" id="profile_about_tab" data-bs-toggle="tab" href="#profile_about" role="tab">
                                        <span className="d-block d-sm-none"><IconifyIcon icon="mdi:information" /></span>
                                        <span className="d-none d-sm-block">About</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink eventKey={"profile_experience"} className="nav-link p-2" id="profile_experience_tab" data-bs-toggle="tab" href="#profile_experience" role="tab">
                                        <span className="d-block d-sm-none"><IconifyIcon icon="mdi:sitemap-outline" /></span>
                                        <span className="d-none d-sm-block">Work experience</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink eventKey={"portfolio_education"} className="nav-link p-2" id="portfolio_education_tab" data-bs-toggle="tab" href="#profile_education" role="tab">
                                        <span className="d-block d-sm-none"><IconifyIcon icon="mdi:school" /></span>
                                        <span className="d-none d-sm-block">Education</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink eventKey={"setting"} className="nav-link p-2" id="setting_tab" data-bs-toggle="tab" href="#profile_setting" role="tab">
                                        <span className="d-block d-sm-none"><IconifyIcon icon="mdi:information" /></span>
                                        <span className="d-none d-sm-block">Setting</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink eventKey={"friend"} className="nav-link p-2" id="friend_tab" data-bs-toggle="tab" href="#friends_setting" role="tab">
                                        <span className="d-block d-sm-none"><IconifyIcon icon="mdi:all-inclusive-box" /></span>
                                        <span className="d-none d-sm-block">Friends</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent className="text-muted bg-white">
                                <TabPane className="pt-4" eventKey="profile_about" role="tabpanel">
                                    <About />
                                </TabPane>

                                <TabPane className="pt-4" eventKey="profile_experience" role="tabpanel">
                                    <Experience />
                                </TabPane>

                                <TabPane className="pt-4" eventKey="portfolio_education" role="tabpanel">
                                    <Education />
                                </TabPane>

                                <TabPane className="pt-4" eventKey="setting" role="tabpanel">
                                    <Setting />
                                </TabPane>

                                <TabPane className="pt-4" eventKey="friend" role="tabpanel">
                                    <Friends />
                                </TabPane>

                            </TabContent>
                        </TabContainer>
                    </CardBody>
                </Card>
            </Col>
        </Row >
    )
}

export default TabContainers