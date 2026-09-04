import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap';
import { getBrowservisitingRadarChart } from '../data';
const Perfomance = () => {
  return <Col md={6} xl={3}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Your Recent Perfomance</h5>
                    </div>
                </CardHeader>

                <CardBody>

                    <ApexChartClient getOptions={getBrowservisitingRadarChart} series={getBrowservisitingRadarChart().series} type="radialBar" height={283} className="apex-charts" />

                    <div className="text-center fw-medium my-3">78% increase in company growth.</div>

                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-flex">
                            <div className="bg-primary-subtle rounded-2 p-1 me-2 border border-dashed border-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#287F71" d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15" />
                                </svg>
                            </div>
                            <div className="d-flex flex-column">
                                <small>{new Date().getFullYear() - 1}</small>
                                <h6 className="mb-0 fs-15">$32.5k</h6>
                            </div>
                        </div>

                        <div className="d-flex">
                            <div className="bg-success-subtle rounded-2 p-1 me-2 border border-dashed border-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#2786f1" d="M12 12V2c5.523 0 10 4.477 10 10z" opacity="0.25" /><path fill="#2786f1" d="m12 12l5 8.66A10.01 10.01 0 0 0 22 12z" opacity="0.5" /><path fill="#2786f1" d="M17 20.66L12 12V2c-5.523.002-9.999 4.48-9.997 10.003c.002 5.523 4.48 9.999 10.004 9.997A10 10 0 0 0 17 20.662l.003-.005l-.004.003z" />
                                </svg>
                            </div>
                            <div className="d-flex flex-column">
                                <small>{new Date().getFullYear() - 2}</small>
                                <h6 className="mb-0 fs-15">$41.2k</h6>
                            </div>
                        </div>
                    </div>

                </CardBody>
            </Card>
        </Col>;
};
export default Perfomance;