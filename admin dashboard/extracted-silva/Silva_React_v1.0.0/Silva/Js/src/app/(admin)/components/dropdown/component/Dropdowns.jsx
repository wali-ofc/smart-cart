import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const Dropdowns = () => {
  return <>
            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Single Buttons Dropdowns</h5>
                        </CardHeader>

                        <CardBody>
                            <Row>
                                <Col sm={6}>
                                    <Dropdown>
                                        <DropdownToggle className="btn btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown button
                                            <IconifyIcon icon="mdi:chevron-down" />

                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <li><DropdownItem href="#">Action</DropdownItem></li>
                                            <li><DropdownItem href="#">Another action</DropdownItem></li>
                                            <li><DropdownItem href="#">Something else here</DropdownItem></li>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>

                                <Col sm={6}>
                                    <Dropdown className="mt-2 mt-sm-0">
                                        <DropdownToggle className="btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown link
                                            <IconifyIcon icon="mdi:chevron-down" />
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            <li><DropdownItem href="#">Action</DropdownItem></li>
                                            <li><DropdownItem href="#">Another action</DropdownItem></li>
                                            <li><DropdownItem href="#">Something else here</DropdownItem></li>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Variant Dropdowns</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Primary<IconifyIcon icon="mdi:chevron-down" /></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Secondary<IconifyIcon icon="mdi:chevron-down" /></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-success" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Success<IconifyIcon icon="mdi:chevron-down" /></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-danger" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Danger<IconifyIcon icon="mdi:chevron-down" /></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-warning" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Warning<IconifyIcon icon="mdi:chevron-down" /></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>

                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>

                        <CardHeader>
                            <h5 className="card-title mb-0">Split Button Dropdowns</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-primary">Primary</button>
                                    <DropdownToggle type="button" className="btn btn-primary  dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-secondary">Secondary</button>
                                    <DropdownToggle type="button" className="btn btn-secondary  dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-success">Success</button>
                                    <DropdownToggle type="button" className="btn btn-success  dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-danger">Danger</button>
                                    <DropdownToggle type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-warning">Warning</button>
                                    <button type="button" className="btn btn-warning  dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </button>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-info">Info</button>
                                    <DropdownToggle type="button" className="btn btn-info dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-light">Light</button>
                                    <DropdownToggle type="button" className="btn btn-light  dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-dark">Dark</button>
                                    <DropdownToggle type="button" className="btn btn-dark  dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dropdown Buttons Sizing</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Large Button <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-light btn-lg" type="button">
                                        Large Split Button
                                    </DropdownToggle>
                                    <button type="button" className="btn btn-lg btn-light  dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </button>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>


                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary btn-sm" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Small Button <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown className="btn-group">
                                    <button className="btn btn-light btn-sm" type="button">
                                        Small Split Button
                                    </button>
                                    <DropdownToggle type="button" className="btn btn-sm btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dark Dropdowns Menu</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown>
                                    <DropdownToggle className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown Button <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                        <DropdownItem className="active" href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dropright Variation</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown drop="end" className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropright <IconifyIcon icon="mdi:chevron-right" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown drop='end' className="btn-group">
                                    <button type="button" className="btn btn-primary">
                                        Split dropend
                                    </button>
                                    <DropdownToggle type="button" className="btn btn-primary dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-right" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dropleft Variation</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown drop='start' className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-success" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-left" /> Dropleft
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>


                                <div className="btn-group dropup">
                                    <Dropdown drop='start' className="btn-group">
                                        <DropdownToggle type="button" className="btn btn-primary dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <IconifyIcon icon="mdi:chevron-left" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href="#">Action</DropdownItem>
                                            <DropdownItem href="#">Another action</DropdownItem>
                                            <DropdownItem href="#">Something else here</DropdownItem>
                                        </DropdownMenu>
                                        <button type="button" className="btn btn-primary">
                                            Split Dropstart
                                        </button>
                                    </Dropdown>

                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dropup Variation</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown drop='up' className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary " data-bs-toggle="dropdown" aria-expanded="false">Dropup <IconifyIcon icon="mdi:chevron-up" /></DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>


                                <Dropdown drop='up' className="btn-group">
                                    <button type="button" className="btn btn-success">
                                        Split dropup
                                    </button>
                                    <DropdownToggle type="button" className="btn btn-success dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-up" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Menu Alignment</h5>
                        </div>
                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Menu is right-aligned <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>

                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Responsive Right Alignment</h5>
                        </CardHeader>

                        <CardBody>
                            <Dropdown className="btn-group">
                                <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                    Left-aligned but right aligned when large screen <IconifyIcon icon="mdi:chevron-down" />
                                </DropdownToggle>

                                <DropdownMenu className="dropdown-menu-lg-end">
                                    <DropdownItem href="#">Action</DropdownItem>
                                    <DropdownItem href="#">Another action</DropdownItem>
                                    <DropdownItem href="#">Something else here</DropdownItem>
                                    <DropdownItem href="#">Separated link</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Responsive Left Alignment</h5>
                        </CardHeader>

                        <CardBody>

                            <Dropdown className="btn-group">
                                <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                    Right-aligned but left aligned when large screen <IconifyIcon icon="mdi:chevron-down" />
                                </DropdownToggle>

                                <DropdownMenu className="dropdown-menu-end dropdown-menu-lg-start">
                                    <DropdownItem href="#">Action</DropdownItem>
                                    <DropdownItem href="#">Another action</DropdownItem>
                                    <DropdownItem href="#">Something else here</DropdownItem>
                                    <DropdownItem href="#">Separated link</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Dropdown Options</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown>
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
                                        Offset <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <button type="button" className="btn btn-success">Reference</button>
                                    <DropdownToggle type="button" className="btn btn-success  dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                                        <IconifyIcon icon="mdi:chevron-down" />
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <li><DropdownItem href="#">Action</DropdownItem></li>
                                        <li><DropdownItem href="#">Another action</DropdownItem></li>
                                        <li><DropdownItem href="#">Something else here</DropdownItem></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><DropdownItem href="#">Separated link</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>


            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Alignment Options</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu aria-labelledby="dropdownMenuButton">
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                        Right-aligned menu <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                        Left-aligned, right-aligned lg <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu dropdown-menu-lg-end">
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                        Right-aligned, left-aligned lg <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end dropdown-menu-lg-start">
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown drop='start' className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                        <IconifyIcon icon="mdi:chevron-left" /> Dropstart
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown drop='end' className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropend <IconifyIcon icon="mdi:chevron-right"></IconifyIcon>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown drop='up' className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropup <IconifyIcon icon="mdi:chevron-up" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>
                    </Card>
                </Col>

            </Row>


            <Row>
                <Col xl={6}>
                    <Card>

                        <CardHeader>
                            <h5 className="card-title mb-0">Auto Close Behavior</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                        Default dropdown <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>

                                    <DropdownMenu aria-labelledby="dropdownMenuButton">
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="inside" aria-expanded="false">
                                        Clickable outside <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>

                                    <DropdownMenu>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                        Clickable inside <IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>

                                    <DropdownMenu>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                                        Manual close<IconifyIcon icon="mdi:chevron-down" />
                                    </DropdownToggle>

                                    <DropdownMenu className="dropdown-menu-end dropdown-menu-lg-start">
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                        <li><DropdownItem href="#">Menu item</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Menu Content</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Header
                                    </DropdownToggle>

                                    <DropdownMenu>
                                        <DropdownItem href="#">Action</DropdownItem>
                                        <DropdownItem href="#">Another action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <div className="dropdown-divider"></div>
                                        <DropdownItem href="#">Separated link</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-warning" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Text
                                    </DropdownToggle>

                                    <DropdownMenu className="p-3">
                                        <p>Some example text that's free-flowing within the dropdown menu.</p>
                                        <p className="mb-0">And this is more example text.</p>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dividers
                                    </DropdownToggle>

                                    <DropdownMenu>
                                        <li><DropdownItem href="#">Action</DropdownItem></li>
                                        <li><DropdownItem href="#">Another action</DropdownItem></li>
                                        <li><DropdownItem href="#">Something else here</DropdownItem></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><DropdownItem href="#">Separated link</DropdownItem></li>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown className="btn-group">
                                    <DropdownToggle type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Forms
                                    </DropdownToggle>

                                    <DropdownMenu className="p-4">
                                        <form>
                                            <div className="mb-2">
                                                <label className="form-label" htmlFor="exampleDropdownFormEmail">Email address</label>
                                                <input type="email" className="form-control" id="exampleDropdownFormEmail" placeholder="email@example.com" />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" htmlFor="exampleDropdownFormPassword">Password</label>
                                                <input type="password" className="form-control" id="exampleDropdownFormPassword" placeholder="Password" />
                                            </div>
                                            <div className="mb-2">
                                                <div className="form-check custom-checkbox">
                                                    <input type="checkbox" className="form-check-input" id="rememberdropdownCheck" />
                                                    <label className="form-check-label" htmlFor="rememberdropdownCheck">Remember me</label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Sign in</button>
                                        </form>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </CardBody>

                    </Card>
                </Col>

            </Row>
        </>;
};
export default Dropdowns;