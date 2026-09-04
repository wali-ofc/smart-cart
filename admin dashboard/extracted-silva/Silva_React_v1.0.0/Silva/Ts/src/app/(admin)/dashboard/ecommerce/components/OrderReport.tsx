import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import { getOrderReportChart } from '../data'

const OrderReport = () => {
    return (
        <Col xl={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Order Report</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <ApexChartClient getOptions={getOrderReportChart} series={getOrderReportChart().series} type="radialBar" height={248} className="apex-charts" />
                    <div className="order-report-card border shadow-sm card mb-0 mx-auto mt-3 p-3">
                        <Row>
                            <Col md={6} className="justify-content-center text-center">
                                <p className="mb-1 d-flex justify-content-center">
                                    <span className="ballot-point bg-primary"></span>
                                    Delivered
                                </p>
                                <h4 className="mb-1 fw-medium text-black">7854</h4>
                                <div className="d-flex justify-content-center">
                                    <p className="text-muted mb-0 fs-13">Last 6 months</p>
                                </div>
                            </Col>

                            <Col md={6} className="justify-content-center text-center">
                                <p className="mb-1 d-flex justify-content-center">
                                    <span className="ballot-point bg-secondary"></span>
                                    Cancelled
                                </p>
                                <h4 className="mb-1 fw-medium text-black">2480</h4>
                                <div className="d-flex justify-content-center">
                                    <p className="text-muted mb-0 fs-13">Last 6 months</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>
        </Col >
    )
}

export default OrderReport