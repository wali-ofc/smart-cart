import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { getNewClients } from '../data';
const WebAnalytics = () => {
  return <Col md={12} xl={6}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Web Analytics</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <div className="justify-content-center mb-4">
                        <Row className="g-3">
                            <Col md={6} xl={3}>
                                <Link to="#">
                                    <div className="border rounded-3 px-2 py-3 text-center">
                                        <p className="mb-2 text-dark">Users</p>
                                        <h3 className="m-0 mb-2 fs-24 text-black">3 680</h3>
                                        <p className="text-muted mb-0 fs-13">
                                            <span className="text-primary bg-primary-subtle rounded-2 p-1 me-2"><IconifyIcon icon="mdi:arrow-up-circle" /> 2.5%</span>
                                        </p>
                                    </div>
                                </Link>
                            </Col>
                            <Col md={6} xl={3}>
                                <Link to="#">
                                    <div className="border rounded-3 px-2 py-3 text-center">
                                        <p className="mb-2 text-dark">New Users</p>
                                        <h3 className="m-0 mb-2 fs-24 text-black">2 870</h3>
                                        <p className="text-muted mb-0 fs-13">
                                            <span className="text-primary bg-primary-subtle rounded-2 p-1 me-2"><IconifyIcon icon="mdi:arrow-up-circle" /> 1.6%</span>
                                        </p>
                                    </div>
                                </Link>
                            </Col>
                            <Col md={6} xl={3}>
                                <Link to="#">
                                    <div className="border rounded-3 px-2 py-3 text-center">
                                        <p className="mb-2 text-dark">Key Event</p>
                                        <h3 className="m-0 mb-2 fs-24 text-black">78</h3>
                                        <p className="text-muted mb-0 fs-13">
                                            <span className="text-danger bg-danger-subtle rounded-2 p-1 me-2"><IconifyIcon icon="mdi:arrow-down-circle" /> 7.7%</span>
                                        </p>
                                    </div>
                                </Link>
                            </Col>
                            <Col md={6} xl={3}>
                                <Link to="#">
                                    <div className="border rounded-3 px-2 py-3 text-center">
                                        <p className="mb-2 text-dark">Event Count</p>
                                        <h3 className="m-0 mb-2 fs-24 text-black">9.4K</h3>
                                        <p className="text-muted mb-0 fs-13">
                                            <span className="text-primary bg-primary-subtle rounded-2 p-1 me-2"><IconifyIcon icon="mdi:arrow-up-circle" /> 17.6%</span>
                                        </p>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                           <ApexChartClient getOptions={getNewClients} series={getNewClients().series} type="line" height={240} className="apex-charts" />
                    <Row>
                        <Col xs={12}>
                            <Link to="#" className="btn text-black border fw-normal d-flex align-items-center justify-content-center text-capitalize rounded-3 mt-3">View reports snapshot <i className="mdi mdi-arrow-right ms-2 fs-17"></i></Link>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>;
};
export default WebAnalytics;