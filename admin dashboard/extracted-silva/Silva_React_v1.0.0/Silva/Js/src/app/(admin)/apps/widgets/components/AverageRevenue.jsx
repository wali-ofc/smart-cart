import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { getAverageRevenue } from '../data';
const AverageRevenue = () => {
  return <Col md={12} xl={6}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Average revenue</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <ApexChartClient getOptions={getAverageRevenue} series={getAverageRevenue().series} type="area" height={250} className="apex-charts" />

                    <Row>
                        <Col md={4} xl={4}>
                            <div className="mt-3">
                                <p className="mb-2 text-dark fs-15">This month</p>
                                <h3 className="m-0 mb-1 fs-18 text-black">$ 36,026.89</h3>
                                <div className="d-flex align-items-center">
                                    <span className="avatar-xs rounded-circle bg-success-subtle d-flex justify-content-center align-items-center me-2"><IconifyIcon icon="mdi:arrow-up" className='fs-13 text-success' /></span>
                                    <p className="text-muted mb-0 fs-13">+ $ 1,670.76</p>
                                </div>
                            </div>
                        </Col>

                        <Col md={4} xl={4}>
                            <div className="mt-3">
                                <p className="mb-2 text-dark fs-15">Today</p>
                                <h3 className="m-0 mb-1 fs-18 text-black">$ 1,260.16</h3>
                                <div className="d-flex align-items-center">
                                    <span className="avatar-xs rounded-circle bg-danger-subtle d-flex justify-content-center align-items-center me-2"><IconifyIcon icon="mdi:arrow-down" className='fs-13 text-danger' /></span>
                                    <p className="text-muted mb-0 fs-13">+ $ 1,670.76</p>
                                </div>
                            </div>
                        </Col>

                        <Col md={4} xl={4}>
                            <div className="mt-3">
                                <p className="mb-2 text-dark fs-15">This Year</p>
                                <h3 className="m-0 mb-1 fs-18 text-black">$ 136,026.89</h3>
                                <div className="d-flex align-items-center">
                                    <span className="avatar-xs rounded-circle bg-success-subtle d-flex justify-content-center align-items-center me-2"><IconifyIcon icon="mdi:arrow-up" className='fs-13 text-success' /></span>
                                    <p className="text-muted mb-0 fs-13">+ $ 11,670.76</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>;
};
export default AverageRevenue;