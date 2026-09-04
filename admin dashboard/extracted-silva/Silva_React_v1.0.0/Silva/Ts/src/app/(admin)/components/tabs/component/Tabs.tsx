import CommonCard from '@/component/CommonCard'
import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap'

type tabDataType = {
    eventKey: string,
    title: string,
    icon: string,
    content: string
}
const tabData: tabDataType[] = [
    {
        eventKey: "home",
        title: "Home",
        icon: "mdi:home-account",
        content: "Vivamus consectetur justo non mi vehicula, nec fermentum turpis blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas accumsan sem eget magna aliquet, sed fermentum nisi mattis. Aenean a quam nec mauris cursus accumsan, Curabitur fermentum nisi non est ultricies. mauris cursus accumsan."
    },
    {
        eventKey: "profile",
        title: "Profile",
        icon: "mdi:account-outline",
        content: "Vakal text here dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Curabitur fermentum nisi non est ultricies."
    },
    {
        eventKey: "messages",
        title: "Messages",
        icon: "mdi:email-outline",
        content: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. mauris cursus accumsan."
    },
    {
        eventKey: "settings",
        title: "Settings",
        icon: "mdi:cog",
        content: "Indulge your taste buds with our mouthwatering selection of gourmet dishes crafted with the finest ingredients sourced from local farms. From savory appetizers to delectable main courses and decadent desserts, our menu promises to delight even the most discerning palates. Whether you're craving a hearty. Curabitur fermentum nisi non est ultricies."
    }
]

const DynamicTabs = ({ variant = "tabs", justify = false, vertical = false, cardTitle = "Tabs", verticalPosition = "left" }) => {
    const filteredTabs = justify ? tabData : tabData.slice(0, 3)
    return (
        <CommonCard title={cardTitle} titleClass="mb-0">
            <TabContainer defaultActiveKey={filteredTabs[0].eventKey}>
                {vertical ? (
                    <Row>
                        {verticalPosition === "left" ? (
                            <>
                                <Col md={3}>
                                    <Nav variant="pills" className="flex-column">
                                        {filteredTabs.map(tab => (
                                            <NavLink key={tab.eventKey} eventKey={tab.eventKey} className="mb-2">
                                                {tab.title}
                                            </NavLink>
                                        ))}
                                    </Nav>
                                </Col>
                                <Col md={9}>
                                    <TabContent className="text-muted">
                                        {filteredTabs.map(tab => (
                                            <TabPane key={tab.eventKey} eventKey={tab.eventKey}>
                                                <p>{tab.content}</p>
                                            </TabPane>
                                        ))}
                                    </TabContent>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col md={9}>
                                    <TabContent className="text-muted">
                                        {filteredTabs.map(tab => (
                                            <TabPane key={tab.eventKey} eventKey={tab.eventKey}>
                                                <p>{tab.content}</p>
                                            </TabPane>
                                        ))}
                                    </TabContent>
                                </Col>
                                <Col md={3}>
                                    <Nav variant="pills" className="flex-column">
                                        {filteredTabs.map(tab => (
                                            <NavLink key={tab.eventKey} eventKey={tab.eventKey} className="mb-2">
                                                {tab.title}
                                            </NavLink>
                                        ))}
                                    </Nav>
                                </Col>
                            </>
                        )}
                    </Row>
                ) : (
                    <>
                        <Nav variant={variant} className={justify ? "nav-justified mb-3" : ""}>
                            {filteredTabs.map(tab => (
                                <NavItem key={tab.eventKey}>
                                    <NavLink eventKey={tab.eventKey}>
                                        <span className="d-block d-sm-none"><IconifyIcon icon={tab.icon} /></span>
                                        <span className="d-none d-sm-block">{tab.title}</span>
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                        <TabContent className="p-3 text-muted">
                            {filteredTabs.map(tab => (
                                <TabPane key={tab.eventKey} eventKey={tab.eventKey}>
                                    <p className="mb-0">{tab.content}</p>
                                </TabPane>
                            ))}
                        </TabContent>
                    </>
                )}
            </TabContainer>
        </CommonCard>
    )
}

const Tabs = () => {
    return (
        <Row>
            <Col xl={6}><DynamicTabs cardTitle="Default Tabs" variant="tabs" /></Col>
            <Col xl={6}><DynamicTabs cardTitle="Nav Pills" variant="pills" /></Col>
            <Col xl={6}><DynamicTabs cardTitle="Nav Pills Justify" variant="pills" justify /></Col>
            <Col xl={6}><DynamicTabs cardTitle="Nav Tabs Justify" variant="tabs" justify /></Col>
            <Col xl={6}><DynamicTabs cardTitle="Tabs Vertical Left" variant="pills" vertical verticalPosition="left" /></Col>
            <Col xl={6}><DynamicTabs cardTitle="Tabs Vertical Right" variant="pills" vertical verticalPosition="right" /></Col>
            <Col xl={6}><DynamicTabs cardTitle="Underline Tabs" variant="underline" /></Col>
        </Row>
    )
}

export default Tabs