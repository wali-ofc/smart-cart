import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const Buttons = () => {
  return <Row>
            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Default Buttons</h5>
                    </CardHeader>

                    <CardBody>

                        <div className="d-flex flex-wrap gap-2">
                            <button type="button" className="btn btn-primary">Primary</button>
                            <button type="button" className="btn btn-secondary">Secondary</button>
                            <button type="button" className="btn btn-success">Success</button>
                            <button type="button" className="btn btn-danger">Danger</button>
                            <button type="button" className="btn btn-warning">Warning</button>
                            <button type="button" className="btn btn-info">Info</button>
                            <button type="button" className="btn btn-light">Light</button>
                            <button type="button" className="btn btn-dark">Dark</button>
                            <button type="button" className="btn btn-link">Link</button>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Outline Buttons</h5>
                    </CardHeader>

                    <CardBody>

                        <div className="d-flex flex-wrap gap-2">
                            <button type="button" className="btn btn-outline-primary">Primary</button>
                            <button type="button" className="btn btn-outline-secondary">Secondary</button>
                            <button type="button" className="btn btn-outline-success">Success</button>
                            <button type="button" className="btn btn-outline-danger">Danger</button>
                            <button type="button" className="btn btn-outline-warning">Warning</button>
                            <button type="button" className="btn btn-outline-info">Info</button>
                            <button type="button" className="btn btn-outline-light">Light</button>
                            <button type="button" className="btn btn-outline-dark">Dark</button>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Rounded Default Buttons</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <button type="button" className="btn btn-primary rounded-pill">Primary</button>
                            <button type="button" className="btn btn-secondary rounded-pill">Secondary</button>
                            <button type="button" className="btn btn-success rounded-pill">Success</button>
                            <button type="button" className="btn btn-danger rounded-pill">Danger</button>
                            <button type="button" className="btn btn-warning rounded-pill">Warning</button>
                            <button type="button" className="btn btn-info rounded-pill">Info</button>
                            <button type="button" className="btn btn-light rounded-pill">Light</button>
                            <button type="button" className="btn btn-dark rounded-pill">Dark</button>
                            <button type="button" className="btn btn-link rounded-pill">Link</button>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Rounded Outline Buttons</h5>
                    </CardHeader>

                    <CardBody>

                        <div className="d-flex flex-wrap gap-2">
                            <button type="button" className="btn btn-outline-primary rounded-pill">Primary</button>
                            <button type="button" className="btn btn-outline-secondary rounded-pill">Secondary</button>
                            <button type="button" className="btn btn-outline-success rounded-pill">Success</button>
                            <button type="button" className="btn btn-outline-danger rounded-pill">Danger</button>
                            <button type="button" className="btn btn-outline-warning rounded-pill">Warning</button>
                            <button type="button" className="btn btn-outline-info rounded-pill">Info</button>
                            <button type="button" className="btn btn-outline-light rounded-pill">Light</button>
                            <button type="button" className="btn btn-outline-dark rounded-pill">Dark</button>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>

                    <CardHeader>
                        <h5 className="card-title mb-0">Button Tags</h5>
                    </CardHeader>

                    <CardBody>

                        <div className="d-flex flex-wrap gap-2">
                            <Link className="btn btn-primary" to="#" role="button">Primary</Link>
                            <button className="btn btn-secondary" type="submit">Secondary</button>
                            <input className="btn btn-success" type="button" value="Input" />
                            <input className="btn btn-danger" type="submit" value="Submit" />
                            <input className="btn btn-warning" type="reset" value="Reset" />
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Buttons Sizes</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            <button type="button" className="btn btn-primary btn-lg">Large button</button>
                            <button type="button" className="btn btn-secondary btn-lg">Large button</button>
                            <button type="button" className="btn btn-success btn-sm">Small button</button>
                            <button type="button" className="btn btn-danger btn-sm">Small button</button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={6}>
                <Card>

                    <CardHeader>
                        <h5 className="card-title mb-0">Disabled State</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="mb-2">
                            <div className="d-flex flex-wrap gap-2">
                                <button type="button" className="btn btn-primary" disabled>Primary button</button>
                                <button type="button" className="btn btn-dark" disabled>Button</button>
                                <button type="button" className="btn btn-outline-primary" disabled>Primary button</button>
                                <button type="button" className="btn btn-outline-dark" disabled>Button</button>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex flex-wrap gap-2">
                                <Link to="#" className="btn btn-primary disabled" role="button" aria-disabled="true">Primary link</Link>
                                <Link to="#" className="btn btn-secondary disabled" role="button" aria-disabled="true">Link</Link>
                                <Link to="#" className="btn btn-outline-primary disabled" role="button" aria-disabled="true">Primary link</Link>
                                <Link to="#" className="btn btn-outline-secondary disabled" role="button" aria-disabled="true">Link</Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Block Buttons</h5>
                    </CardHeader>

                    <CardBody>

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-lg btn-block" type="button">Block level button</button>
                            <button className="btn btn-secondary btn-sm btn-block" type="button">Block level button</button>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>

                    <CardHeader>
                        <h5 className="card-title mb-0">Toggle states</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex flex-wrap">
                            <p className="d-inline-flex gap-2 mb-2">
                                <button type="button" className="btn" data-bs-toggle="button">Toggle button</button>
                                <button type="button" className="btn active" data-bs-toggle="button" aria-pressed="true">Active toggle button</button>
                                <button type="button" className="btn" disabled data-bs-toggle="button">Disabled toggle button</button>
                            </p>
                            <p className="d-inline-flex gap-2 mb-0">
                                <button type="button" className="btn btn-primary" data-bs-toggle="button">Toggle button</button>
                                <button type="button" className="btn btn-primary active" data-bs-toggle="button" aria-pressed="true">Active toggle button</button>
                                <button type="button" className="btn btn-primary" disabled data-bs-toggle="button">Disabled toggle button</button>
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xl={6}>
                <Card>

                    <CardHeader>
                        <h5 className="card-title mb-0">Button Group</h5>
                    </CardHeader>

                    <CardBody>

                        <div className="d-flex flex-wrap gap-2">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary">Left</button>
                                <button type="button" className="btn btn-primary">Middle</button>
                                <button type="button" className="btn btn-primary">Right</button>
                            </div>
                            <div className="btn-group">
                                <Link to="#" className="btn btn-primary active" aria-current="page">Active link</Link>
                                <Link to="#" className="btn btn-primary">Link</Link>
                                <Link to="#" className="btn btn-primary">Link</Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Mixed & Outlined Group Button</h5>
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-danger">Left</button>
                                    <button type="button" className="btn btn-warning">Middle</button>
                                    <button type="button" className="btn btn-success">Right</button>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary">Left</button>
                                    <button type="button" className="btn btn-outline-primary">Middle</button>
                                    <button type="button" className="btn btn-outline-primary">Right</button>
                                </div>
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Checkbox & Radio Buttons</h5>
                    </CardHeader>

                    <CardBody>

                        <div className="mb-2">
                            <div className="d-flex flex-wrap gap-2">
                                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                    <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off" />
                                    <label className="btn btn-primary" htmlFor="btncheck1">Checkbox 1</label>

                                    <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off" />
                                    <label className="btn btn-primary" htmlFor="btncheck2">Checkbox 2</label>

                                    <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off" />
                                    <label className="btn btn-primary" htmlFor="btncheck3">Checkbox 3</label>
                                </div>

                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                                    <label className="btn btn-primary" htmlFor="btnradio1">Radio 1</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                    <label className="btn btn-primary" htmlFor="btnradio2">Radio 2</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                                    <label className="btn btn-primary" htmlFor="btnradio3">Radio 3</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-0">
                            <div className="d-flex flex-wrap gap-2">
                                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                    <input type="checkbox" className="btn-check" id="btncheck4" autoComplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor="btncheck4">Checkbox 4</label>

                                    <input type="checkbox" className="btn-check" id="btncheck5" autoComplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor="btncheck5">Checkbox 5</label>

                                    <input type="checkbox" className="btn-check" id="btncheck6" autoComplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor="btncheck6">Checkbox 6</label>
                                </div>

                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio4">Radio 4</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio5">Radio 5</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio6" autoComplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio6">Radio 6</label>
                                </div>
                            </div>
                        </div>


                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Sizing</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
                                <button type="button" className="btn btn-primary">Left</button>
                                <button type="button" className="btn btn-primary">Middle</button>
                                <button type="button" className="btn btn-primary">Right</button>
                            </div>
                            <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
                                <button type="button" className="btn btn-outline-primary">Left</button>
                                <button type="button" className="btn btn-outline-primary">Middle</button>
                                <button type="button" className="btn btn-outline-primary">Right</button>
                            </div>
                        </div>
                        <br />
                        <div className="d-flex flex-wrap gap-2">
                            <div className="btn-group" role="group" aria-label="Default button group">
                                <button type="button" className="btn btn-secondary">Left</button>
                                <button type="button" className="btn btn-secondary">Middle</button>
                                <button type="button" className="btn btn-secondary">Right</button>
                            </div>
                            <div className="btn-group" role="group" aria-label="Default button group">
                                <button type="button" className="btn btn-outline-secondary">Left</button>
                                <button type="button" className="btn btn-outline-secondary">Middle</button>
                                <button type="button" className="btn btn-outline-secondary">Right</button>
                            </div>
                        </div>
                        <br />
                        <div className="d-flex flex-wrap gap-2">
                            <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                <button type="button" className="btn btn-success">Left</button>
                                <button type="button" className="btn btn-success">Middle</button>
                                <button type="button" className="btn btn-success">Right</button>
                            </div>
                            <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                <button type="button" className="btn btn-outline-success">Left</button>
                                <button type="button" className="btn btn-outline-success">Middle</button>
                                <button type="button" className="btn btn-outline-success">Right</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Vertical Variation</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                                <button type="button" className="btn btn-primary">Button</button>
                                <button type="button" className="btn btn-primary">Button</button>
                                <div className="btn-group" role="group">
                                    <Dropdown>
                                        <DropdownToggle type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown <IconifyIcon icon="mdi:chevron-down" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="btn-group" role="group">
                                    <Dropdown drop='start'>
                                        <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                            <IconifyIcon icon="mdi:chevron-left" /> Dropdown
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="btn-group" role="group">
                                    <Dropdown drop='end'>
                                        <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown <IconifyIcon icon="mdi:chevron-right" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="btn-group dropup" role="group">
                                    <Dropdown drop='up'>
                                        <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown <IconifyIcon icon="mdi:chevron-up" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off" />
                                <label className="btn btn-outline-danger" htmlFor="vbtn-radio1">Radio 1</label>
                                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off" />
                                <label className="btn btn-outline-danger" htmlFor="vbtn-radio2">Radio 2</label>
                                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio3" autoComplete="off" />
                                <label className="btn btn-outline-danger" htmlFor="vbtn-radio3">Radio 3</label>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Button Toolbar</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <div className="btn-toolbar gap-2" role="toolbar" aria-label="Toolbar with button groups">
                                <div className="btn-group me-2" role="group" aria-label="First group">
                                    <button type="button" className="btn btn-primary">1</button>
                                    <button type="button" className="btn btn-primary">2</button>
                                    <button type="button" className="btn btn-primary">3</button>
                                    <button type="button" className="btn btn-primary">4</button>
                                </div>
                                <div className="btn-group me-2" role="group" aria-label="Second group">
                                    <button type="button" className="btn btn-secondary">5</button>
                                    <button type="button" className="btn btn-secondary">6</button>
                                    <button type="button" className="btn btn-secondary">7</button>
                                </div>
                                <div className="btn-group" role="group" aria-label="Third group">
                                    <button type="button" className="btn btn-info">8</button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Nesting</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex flex-wrap gap-2">
                            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <button type="button" className="btn btn-success">1</button>
                                <button type="button" className="btn btn-success">2</button>

                                <div className="btn-group" role="group">
                                    <Dropdown>
                                        <DropdownToggle type="button" className="btn btn-success" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown <IconifyIcon icon="mdi:chevron-down" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                            <li><DropdownItem href="#">Dropdown link</DropdownItem></li>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

        </Row>;
};
export default Buttons;