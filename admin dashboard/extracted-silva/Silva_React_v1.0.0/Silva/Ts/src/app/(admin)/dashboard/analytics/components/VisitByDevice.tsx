import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Link } from "react-router-dom"
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import { TrendingDown, TrendingUp } from 'react-feather'

const VisitByDevice = () => {

    return (
        <Col md={12} xl={4}>
            <Card className="overflow-hidden">

                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Visit by Device</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2 position-relative">
                        <h3 className="fs-14 mb-0 text-muted">Total Page Visit</h3>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <h4 className="fs-24 mb-0 me-2 fw-medium text-black">24,565K</h4>
                        <span className="badge bg-primary-subtle text-primary">3.18%
                            <TrendingUp className="ms-1" style={{ height: "14px", width: "14px" }} />
                        </span>
                    </div>

                    <hr className="border my-3" />

                    <Row>
                        <Col md={4} xl={4} className="flex-wrap align-items-center justify-content-between gap-2">
                            <div className="visit-device mt-2">
                                <div className="">
                                    <h4 className="fs-15 text-muted mb-1">Mobile</h4>
                                    <p className="fs-24 text-black mb-0">78%</p>
                                    <p className="text-primary fw-medium mb-0 mt-md-5 mt-3 mb-0 d-flex align-items-center gap-2">
                                        3.75%
                                        <TrendingUp className="me-1" style={{ height: "18px", width: "18px" }} />
                                    </p>
                                    <div className="progress progress-md mt-2">
                                        <div className="progress-bar bg-primary" style={{ width: "78.0%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={4} xl={4} className="flex-wrap align-items-center justify-content-between gap-2">
                            <div className="visit-device border-start border-dashed border-1 mt-3 mt-md-2">
                                <div className="ms-md-3">
                                    <h4 className="fs-15 text-muted mb-1">Tablet</h4>
                                    <p className="fs-24 text-black mb-0">12%</p>
                                    <p className="text-danger fw-medium mb-0 mt-md-5 mt-3 mb-0 d-flex align-items-center gap-2">
                                        1.98%
                                        <TrendingDown className="me-1" style={{ height: "18px", width: "18px" }} />
                                    </p>
                                    <div className="progress progress-md mt-2">
                                        <div className="progress-bar bg-danger" style={{ width: "56.0%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={4} xl={4} className="flex-wrap align-items-center justify-content-between gap-2">
                            <div className="visit-device border-start border-dashed border-1 mt-3 mt-md-2">
                                <div className="ms-md-3">
                                    <h4 className="fs-15 text-muted mb-1">Web</h4>
                                    <p className="fs-24 text-black mb-0">10%</p>
                                    <p className="text-danger fw-medium mb-0 mt-md-5 mt-3 mb-0 d-flex align-items-center gap-2">
                                        1.77%
                                        <TrendingDown className="me-1" style={{ height: "18px", width: "18px" }} />
                                    </p>
                                    <div className="progress progress-md mt-2">
                                        <div className="progress-bar bg-danger" style={{ width: "37.0%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <p className="m-0 fs-14 fst-italic text-muted mb-0 mt-2 pt-1">Last data updated - 13min ago <Link to="#!" className="link-danger ms-1 "><IconifyIcon icon="mdi:refresh" className="align-middle" /></Link></p>
                </CardBody>
            </Card>
        </Col>
    )
}

export default VisitByDevice