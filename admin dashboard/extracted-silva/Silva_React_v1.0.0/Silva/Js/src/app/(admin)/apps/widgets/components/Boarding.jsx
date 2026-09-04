import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { getAlignSelfEndChart, getBoardingClickedChart, getBoardingConvertedChart, getBoardingDeliveredChart } from '../data';
const Boarding = () => {
  return <Col md={12} xl={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">On boarding Campaign</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <div className="justify-content-center">
                        <Row className="g-3">

                            <Col md={12} xl={12}>
                                <div className="border rounded-2 bg-light p-2 d-flex align-items-center">
                                    <IconifyIcon icon="mdi:star-four-points" className='fs-19 text-primary me-2' />
                                    <p className="fs-16 mb-0">Help new customer understand the value they'll receive from your product.</p>
                                </div>
                            </Col>

                            <Col md={6} xl={6}>
                                <div className="border rounded-3 px-2 py-3">
                                    <span className="mb-2 text-black text-success bg-tag rounded-2 py-1 px-2 align-content-center"><IconifyIcon icon="mdi:circle-medium" className='dot-primary' />Delivered</span>
                                    <div className="d-flex align-content-center justify-content-between">
                                        <div>
                                            <h3 className="m-0 mb-2 fs-22 text-black mt-3">12.50%</h3>
                                            <p className="text-muted mb-0 fs-14">Last 24 hours</p>
                                        </div>
                                        <ApexChartClient getOptions={getBoardingDeliveredChart} series={getBoardingDeliveredChart().series} type="line" height={22} width={85} className="apex-charts align-self-end" />
                                    </div>
                                </div>
                            </Col>

                            <Col md={6} xl={6}>
                                <div className="border rounded-3 px-2 py-3">
                                    <span className="mb-2 text-black text-success bg-tag rounded-2 py-1 px-2 align-content-center"><IconifyIcon icon="mdi:circle-medium" className='dot-primary' />Opened</span>
                                    <div className="d-flex align-content-center justify-content-between">
                                        <div>
                                            <h3 className="m-0 mb-2 fs-22 text-black mt-3">40.3%</h3>
                                            <p className="text-muted mb-0 fs-14">Last 30 hours</p>
                                        </div>
                                        <ApexChartClient getOptions={getAlignSelfEndChart} series={getAlignSelfEndChart().series} type="radialBar" height={75} width={75} className="apex-charts align-self-end" />
                                    </div>
                                </div>
                            </Col>

                            <Col md={6} xl={6}>
                                <div className="border rounded-3 px-2 py-3">
                                    <span className="mb-2 text-black text-success bg-tag rounded-2 py-1 px-2 align-content-center"><IconifyIcon icon="mdi:circle-medium" className='dot-primary' />Clicked</span>
                                    <div className="d-flex align-content-center justify-content-between">
                                        <div>
                                            <h3 className="m-0 mb-2 fs-22 text-black mt-3">38.7%</h3>
                                            <p className="text-muted mb-0 fs-14">Last 30 hours</p>
                                        </div>
                                        <ApexChartClient getOptions={getBoardingClickedChart} series={getBoardingClickedChart().series} type="radialBar" height={75} width={75} className="apex-charts align-self-end" />
                                    </div>
                                </div>
                            </Col>

                            <Col md={6} xl={6}>
                                <Link to="#">
                                    <div className="border rounded-3 px-2 py-3">
                                        <span className="mb-2 text-black text-success bg-tag rounded-2 py-1 px-2 align-content-center"><IconifyIcon icon="mdi:circle-medium" className='dot-primary' />Converted</span>
                                        <div className="d-flex align-content-center justify-content-between">
                                            <div>
                                                <h3 className="m-0 mb-2 fs-22 text-black mt-3">12.3%</h3>
                                                <p className="text-muted mb-0 fs-14">Last 30 hours</p>
                                            </div>
                                            <ApexChartClient getOptions={getBoardingConvertedChart} series={getBoardingConvertedChart().series} type="line" height={25} width={90} className="apex-charts align-self-end" />
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </CardBody>

            </Card>
        </Col>;
};
export default Boarding;