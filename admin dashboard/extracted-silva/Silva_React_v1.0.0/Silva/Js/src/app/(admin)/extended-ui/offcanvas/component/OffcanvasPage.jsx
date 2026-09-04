import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from 'react-bootstrap';
const OffcanvasPage = () => {
  const [showCanvas, setShowCanvas] = useState(null);
  const openCanvas = id => setShowCanvas(id);
  const closeCanvas = () => setShowCanvas(null);
  const isOpen = id => showCanvas === id;
  return <Row>
            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Offcanvas</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Button onClick={() => openCanvas("example")}>Link with href</Button>
                            <Button onClick={() => openCanvas("example")}>Button with target</Button>
                        </div>

                        <Offcanvas show={isOpen("example")} onHide={closeCanvas} placement="start">
                            <OffcanvasHeader closeButton>
                                <h5 className="offcanvas-title">Offcanvas</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <div>Some text as placeholder...</div>
                                <Dropdown className="mt-3">
                                    <DropdownToggle className="btn btn-primary">Dropdown button</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </OffcanvasBody>
                        </Offcanvas>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Offcanvas Backdrop</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Button onClick={() => openCanvas("scroll")}>Enable body scrolling</Button>
                            <Button onClick={() => openCanvas("backdrop")}>Enable (default)</Button>
                            <Button onClick={() => openCanvas("both")}>Enable both scrolling & backdrop</Button>
                        </div>

                        <Offcanvas show={isOpen("scroll")} onHide={closeCanvas} scroll backdrop={false} placement="start">
                            <OffcanvasHeader closeButton>
                                <h5>Offcanvas with body scrolling</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <p>Try scrolling the rest of the page to see this option in action.</p>
                            </OffcanvasBody>
                        </Offcanvas>

                        <Offcanvas show={isOpen("backdrop")} onHide={closeCanvas} placement="start">
                            <OffcanvasHeader closeButton>
                                <h5>Offcanvas with backdrop</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <p>Some placeholder content...</p>
                            </OffcanvasBody>
                        </Offcanvas>

                        <Offcanvas show={isOpen("both")} onHide={closeCanvas} scroll backdrop placement="start">
                            <OffcanvasHeader closeButton>
                                <h5>Backdrop with scrolling</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <p>This Offcanvas supports both scroll and backdrop.</p>
                            </OffcanvasBody>
                        </Offcanvas>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Dark Offcanvas</h5>
                    </CardHeader>
                    <CardBody>
                        <Button onClick={() => openCanvas("dark")}>Dark offcanvas</Button>

                        <Offcanvas show={isOpen("dark")} onHide={closeCanvas} placement="start" className="text-bg-dark">
                            <OffcanvasHeader closeButton>
                                <h5>Dark Offcanvas</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <p>This is a dark-themed offcanvas.</p>
                            </OffcanvasBody>
                        </Offcanvas>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Placement Offcanvas</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <Button onClick={() => openCanvas("top")}>Top</Button>
                            <Button onClick={() => openCanvas("right")}>Right</Button>
                            <Button onClick={() => openCanvas("bottom")}>Bottom</Button>
                            <Button onClick={() => openCanvas("left")}>Left</Button>
                        </div>

                        <Offcanvas show={isOpen("top")} onHide={closeCanvas} placement="top">
                            <OffcanvasHeader closeButton>
                                <h5>Offcanvas top</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>Top placement content.</OffcanvasBody>
                        </Offcanvas>

                        <Offcanvas show={isOpen("right")} onHide={closeCanvas} placement="end">
                            <OffcanvasHeader closeButton>
                                <h5>Offcanvas right</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>Right placement content.</OffcanvasBody>
                        </Offcanvas>

                        <Offcanvas show={isOpen("bottom")} onHide={closeCanvas} placement="bottom">
                            <OffcanvasHeader closeButton>
                                <h5>Offcanvas bottom</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>Bottom placement content.</OffcanvasBody>
                        </Offcanvas>

                        <Offcanvas show={isOpen("left")} onHide={closeCanvas} placement="start">
                            <OffcanvasHeader closeButton>
                                <h5>Offcanvas left</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>Left placement content.</OffcanvasBody>
                        </Offcanvas>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Responsive Offcanvas</h5>
                    </CardHeader>
                    <CardBody>
                        <Button className="d-lg-none" onClick={() => openCanvas("responsive")}>Toggle Responsive</Button>
                        <div className="alert alert-info d-none d-lg-block">Resize your browser to show the responsive offcanvas toggle.</div>

                        <Offcanvas show={isOpen("responsive")} onHide={closeCanvas} placement="end" className="offcanvas-lg offcanvas-end">
                            <OffcanvasHeader closeButton>
                                <h5>Responsive offcanvas</h5>
                            </OffcanvasHeader>
                            <OffcanvasBody>This is content within an <code>.offcanvas-lg</code>.</OffcanvasBody>
                        </Offcanvas>
                    </CardBody>
                </Card>
            </Col>
        </Row>;
};
export default OffcanvasPage;