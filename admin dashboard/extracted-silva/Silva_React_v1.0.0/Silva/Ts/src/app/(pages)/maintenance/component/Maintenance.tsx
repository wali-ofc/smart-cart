import logoDark from "@/assets/images/logo-dark.png"
import maintenace from "@/assets/images/svg/maintenance-1.svg"
import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { useEffect } from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Maintenance = () => {
    useEffect(() => {
        document.body.classList.add('bg-primary-subtle', 'bg-opacity-10');
        return () => {
            document.body.classList.remove('bg-primary-subtle', 'bg-opacity-10');
        };
    }, []);
    return (
        <div className="maintenance-pages">
            <Container fluid className="p-0">
                <Row>
                    <Col xl={12} className="align-self-center">
                        <Row>
                            <Col md={5} className="mx-auto">
                                <Card className="p-3 mb-0">
                                    <CardBody >
                                        <div className="text-center">
                                            <div className="mb-4">
                                                <Link to="/dashboard/index" className="auth-logo">
                                                    <img src={logoDark} alt="logo-dark" className="mx-auto" height="28" />
                                                </Link>
                                            </div>

                                            <div className="coming-soon-img text-center">
                                                <img src={maintenace} className="img-fluid" alt="maintenance-image" />
                                            </div>

                                            <div className="text-center">

                                                <h3 className="mt-0 fw-semibold text-dark text-capitalize fs-26">Our website is currently under construction.</h3>
                                                <p className="text-muted mt-3 mb-3">We sincerely apologize for the inconvenience <br />
                                                    Our site currently undergoing scheduled maintenance and upgrades, but will return shortly.</p>

                                                <h5 className="fs-14 text-stat">Don’t want to miss update? Subscribe now</h5>

                                                <Row className="d-flex my-4 align-items-center justify-content-center">
                                                    <Col md={6}>
                                                        <input type="email" className="form-control" placeholder="example@gmail.com" />
                                                    </Col>
                                                    <div className="col-auto">
                                                        <div className="d-grid sm:mt-2">
                                                            <button className="btn btn-primary d-flex align-items-center">
                                                                <IconifyIcon icon="mdi:bell-ring-outline" className="me-2" />Notify Me
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </div>

    )
}

export default Maintenance