import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
const Badges = () => {
  return <Row>
            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Default Badges</h5>
                    </CardHeader>

                    <CardBody>
                        <span className="badge text-bg-primary">Primary</span>&nbsp;
                        <span className="badge text-bg-secondary">Secondary</span>&nbsp;
                        <span className="badge text-bg-success">Success</span>&nbsp;
                        <span className="badge text-bg-danger">Danger</span>&nbsp;
                        <span className="badge text-bg-warning">Warning</span>&nbsp;
                        <span className="badge text-bg-info">Info</span>&nbsp;
                        <span className="badge text-bg-light">Light</span>&nbsp;
                        <span className="badge text-bg-dark">Dark</span>&nbsp;
                    </CardBody>
                </Card>
            </Col>


            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Pill Badges</h5>
                    </CardHeader>

                    <div className="card-body">

                        <span className="badge rounded-pill text-bg-primary">Primary</span>&nbsp;
                        <span className="badge rounded-pill text-bg-secondary">Secondary</span>&nbsp;
                        <span className="badge rounded-pill text-bg-success">Success</span>&nbsp;
                        <span className="badge rounded-pill text-bg-danger">Danger</span>&nbsp;
                        <span className="badge rounded-pill text-bg-warning">Warning</span>&nbsp;
                        <span className="badge rounded-pill text-bg-info">Info</span>&nbsp;
                        <span className="badge rounded-pill text-bg-light">Light</span>&nbsp;
                        <span className="badge rounded-pill text-bg-dark">Dark</span>&nbsp;

                    </div>
                </Card>
            </Col>

            <Col xl={6}>
                <Row>
                    <Col xl={12} md={12}>
                        <Card>
                            <CardHeader>
                                <h5 className="card-title mb-0">Positioned Badges</h5>
                            </CardHeader>

                            <CardBody>

                                <div className="d-flex flex-wrap gap-3">
                                    <button type="button" className="btn btn-primary position-relative">
                                        Mails
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            99+
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </button>

                                    <button type="button" className="btn btn-success position-relative">
                                        Alerts
                                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                            <span className="visually-hidden">New alerts</span>
                                        </span>
                                    </button>
                                </div>

                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={12} md={12}>
                        <Card>
                            <CardHeader>
                                <h5 className="card-title mb-0">Buttons Badges</h5>
                            </CardHeader>

                            <CardBody>
                                <button type="button" className="btn btn-primary">
                                    Notifications <span className="badge text-bg-secondary">4</span>
                                </button>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Col>

            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Badges With Headings</h5>
                    </CardHeader>

                    <CardBody>
                        <h1>Example heading <span className="badge text-bg-secondary">New</span></h1>
                        <h2>Example heading <span className="badge text-bg-secondary">New</span></h2>
                        <h3>Example heading <span className="badge text-bg-secondary">New</span></h3>
                        <h4>Example heading <span className="badge text-bg-secondary">New</span></h4>
                        <h5>Example heading <span className="badge text-bg-secondary">New</span></h5>
                        <h6 className="mb-0">Example heading <span className="badge text-bg-secondary">New</span></h6>
                    </CardBody>
                </Card>
            </Col>

        </Row>;
};
export default Badges;