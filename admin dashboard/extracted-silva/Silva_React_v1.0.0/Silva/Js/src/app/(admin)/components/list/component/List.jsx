import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
const List = () => {
  return <>
            <Row>
                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Basic List</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Paypal Payment Company
                                </li>
                                <li className="list-group-item">
                                    Artificial intelligence Company
                                </li>
                                <li className="list-group-item">
                                    Open AI ChatGPT
                                </li>
                                <li className="list-group-item">
                                    Google One
                                </li>
                                <li className="list-group-item">
                                    Clickup Time tracking Company
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Active Items</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group">
                                <li className="list-group-item active" aria-current="true">
                                    Paypal Payment Company
                                </li>
                                <li className="list-group-item">
                                    Artificial intelligence Company
                                </li>
                                <li className="list-group-item">
                                    Open AI ChatGPT
                                </li>
                                <li className="list-group-item">
                                    Google One
                                </li>
                                <li className="list-group-item">
                                    Clickup Time tracking Company
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Disabled Items</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group">
                                <li className="list-group-item disabled" aria-disabled="true">
                                    Paypal Payment Company
                                </li>
                                <li className="list-group-item">
                                    Artificial intelligence Company
                                </li>
                                <li className="list-group-item">
                                    Open AI ChatGPT
                                </li>
                                <li className="list-group-item">
                                    Google One
                                </li>
                                <li className="list-group-item">
                                    Clickup Time tracking Company
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Links and Buttons</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="list-group">
                                <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    Paypal Payment Company
                                </Link>
                                <Link to="#" className="list-group-item list-group-item-action">
                                    Artificial intelligence Company
                                </Link>
                                <button type="button" className="list-group-item list-group-item-action">
                                    Open AI ChatGPT
                                </button>
                                <button type="button" className="list-group-item list-group-item-action" disabled>
                                    Google One
                                </button>
                                <Link to="#" className=" list-group-item list-group-item-action disabled" aria-disabled="true">
                                    Clickup Time tracking Company
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Flush</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Paypal Payment Company
                                </li>
                                <li className="list-group-item">
                                    Artificial intelligence Company
                                </li>
                                <li className="list-group-item">
                                    Open AI ChatGPT
                                </li>
                                <li className="list-group-item">
                                    Google One
                                </li>
                                <li className="list-group-item">
                                    Clickup Time tracking Company
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Numbered With Custom</h5>
                        </div>

                        <CardBody>
                            <ol className="list-group list-group-numbered">
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Paypal Payment Company
                                    </div>
                                    <span className="badge text-bg-primary rounded-pill">14</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Artificial intelligence Company
                                    </div>
                                    <span className="badge text-bg-primary rounded-pill">14</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Open AI ChatGPT
                                    </div>
                                    <span className="badge text-bg-primary rounded-pill">14</span>
                                </li>
                            </ol>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Horizontal</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group list-group-horizontal mb-3">
                                <li className="list-group-item">Google</li>
                                <li className="list-group-item">Whatsapp</li>
                                <li className="list-group-item">Facebook</li>
                            </ul>

                            <ul className="list-group list-group-horizontal-sm mb-3">
                                <li className="list-group-item">Apple</li>
                                <li className="list-group-item">PayPal</li>
                                <li className="list-group-item">Intercom</li>
                            </ul>

                            <ul className="list-group list-group-horizontal-md">
                                <li className="list-group-item">Google</li>
                                <li className="list-group-item">Whatsapp</li>
                                <li className="list-group-item">Facebook</li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">With Badges</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    A list item
                                    <span className="badge text-bg-primary rounded-pill">14</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    A second list item
                                    <span className="badge text-bg-primary rounded-pill">2</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    A third list item
                                    <span className="badge text-bg-primary rounded-pill">1</span>
                                </li>
                            </ul>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Checkboxes And Radios</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                                    <label className="form-check-label" htmlFor="firstCheckbox">First checkbox</label>
                                </li>
                                <li className="list-group-item">
                                    <input className="form-check-input me-1" type="checkbox" value="" id="secondCheckbox" />
                                    <label className="form-check-label" htmlFor="secondCheckbox">Second checkbox</label>
                                </li>
                            </ul>

                            <ul className="list-group">
                                <li className="list-group-item">
                                    <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" />
                                    <label className="form-check-label" htmlFor="firstRadio">First radio</label>
                                </li>
                                <li className="list-group-item">
                                    <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio" />
                                    <label className="form-check-label" htmlFor="secondRadio">Second radio</label>
                                </li>
                            </ul>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Custom content </h5>
                        </CardHeader>

                        <CardBody>
                            <div className="list-group">
                                <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small>3 days ago</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus.
                                        Maecenas sed diam eget risus varius blandit.</p>
                                    <small>And some small print.</small>
                                </Link>
                                <Link to="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small className="text-body-secondary">3 days ago</small>
                                    </div>
                                    <p className="mb-1">Nulla quis sem at nibh elementum imperdiet.
                                        Duis sagittis ipsum. Praesent mauris. Fusce nec.</p>
                                    <small className="text-body-secondary">And some muted small print.</small>
                                </Link>
                                <Link to="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">List group item heading</h5>
                                        <small className="text-body-secondary">3 days ago</small>
                                    </div>
                                    <p className="mb-1">Cras ultricies mi eu turpis hendrerit fringilla.
                                        Vestibulum ante ipsum primis in faucibus orci luctus et.</p>
                                    <small className="text-body-secondary">And some muted small print.</small>
                                </Link>
                            </div>
                        </CardBody>

                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Contextual Variants</h5>
                        </CardHeader>

                        <CardBody>
                            <ul className="list-group">
                                <li className="list-group-item">A simple default list group item</li>
                                <li className="list-group-item list-group-item-primary">A simple primary list group item</li>
                                <li className="list-group-item list-group-item-secondary">A simple secondary list group item</li>
                                <li className="list-group-item list-group-item-success">A simple success list group item</li>
                                <li className="list-group-item list-group-item-danger">A simple danger list group item</li>
                                <li className="list-group-item list-group-item-warning">A simple warning list group item</li>
                                <li className="list-group-item list-group-item-info">A simple info list group item</li>
                                <li className="list-group-item list-group-item-light">A simple light list group item</li>
                                <li className="list-group-item list-group-item-dark">A simple dark list group item</li>
                            </ul>

                        </CardBody>
                    </Card>
                </Col>

                <Col xl={4}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Contextual Links And Buttons</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="list-group">
                                <Link to="#" className="list-group-item list-group-item-action">A simple default list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-primary">A simple primary list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-secondary">A simple secondary list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-success">A simple success list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-danger">A simple danger list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-warning">A simple warning list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-info">A simple info list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-light">A simple light list group item</Link>
                                <Link to="#" className="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item</Link>
                            </div>

                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </>;
};
export default List;