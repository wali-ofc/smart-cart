import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { getWebsiteVisitors } from '../data';
const WebsiteVisitors = () => {
  return <Col md={12} xl={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Website Visitors</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col md={4} xl={4}>
                            <div className="mt-2 mb-2">
                                <p className="mb-2 text-dark fs-15">Visit Duration</p>
                                <div className="d-flex align-items-center">
                                    <h3 className="m-0 mb-0 fs-22 text-black me-2">1m 35s</h3>
                                    <span className="badge rounded-3 bg-success-subtle d-flex justify-content-center align-items-center text-primary"><IconifyIcon icon="mdi:arrow-up" className='fs-13 text-success me-1' />15 %</span>
                                </div>
                            </div>
                        </Col>

                        <Col md={4} xl={4}>
                            <div className="mt-2 mb-2">
                                <p className="mb-2 text-dark fs-15">Total Page Views</p>
                                <div className="d-flex align-items-center">
                                    <h3 className="m-0 mb-1 fs-18 text-black me-2">805K</h3>
                                    <span className="badge rounded-3 bg-danger-subtle d-flex justify-content-center align-items-center text-danger"><IconifyIcon icon="mdi:arrow-down" className='fs-13 text-danger me-1' />12 %</span>
                                </div>
                            </div>
                        </Col>

                        <Col md={4} xl={4}>
                            <div className="mt-2 mb-2">
                                <p className="mb-2 text-dark fs-15">Unique visitors</p>
                                <div className="d-flex align-items-center">
                                    <h3 className="m-0 mb-0 fs-22 text-black me-2">120K</h3>
                                    <span className="badge rounded-3 bg-success-subtle d-flex justify-content-center align-items-center text-primary"><IconifyIcon icon="mdi:arrow-up" className='fs-13 text-success me-1' />19 %</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <ApexChartClient getOptions={getWebsiteVisitors} series={getWebsiteVisitors().series} type="bar" height={225} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>;
};
export default WebsiteVisitors;