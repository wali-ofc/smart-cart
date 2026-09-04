import ImgAuth from "@/assets/images/auth-images.svg"
import logoDark from "@/assets/images/logo-dark.png"
import confirmationEmail from "@/assets/images/svg/confirmation-email.svg"
import { useEffect } from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"

const ConfirmMail = () => {

    useEffect(() => {
        document.body.classList.add('bg-primary-subtle');
        return () => {
            document.body.classList.remove('bg-primary-subtle');
        };
    }, []);

    return (
        <div className="account-page">
            <Container fluid className="p-0">
                <Row className="align-items-center g-0">

                    <Col md={5}>
                        <Row>
                            <Col md={8} className="mx-auto">
                                <Card className="p-3 mb-0 mb-0">
                                    <CardBody>
                                        <div className="mb-0 border-0 p-md-5 p-lg-0 p-4">

                                            <div className="mb-4 p-0 text-center">
                                                <Link to="/dashboard/index" className="auth-logo">
                                                    <img src={logoDark} alt="logo-dark" className="mx-auto" height="28" />
                                                </Link>
                                            </div>

                                            <div className="auth-title-section mb-3 text-center mt-2">
                                                <h3 className="text-dark fs-20 fw-medium mb-2">Email Confirmation</h3>
                                                <p className="text-muted fs-15">Please check your email for confirmation mail. <br />Click link in email to verification your account</p>
                                            </div>

                                            <div className="text-center">
                                                <Link to="#" className="btn btn-primary mt-3 me-1" type="submit">Resend Confirmation</Link>
                                            </div>

                                            <div className="text-center pt-4">
                                                <div className="maintenance-img">
                                                    <img src={confirmationEmail} height="200" alt="svg-logo" />
                                                </div>
                                            </div>

                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={7}>
                        <div className="account-page-bg p-md-5 p-4">
                            <div className="text-center">
                                <div className="auth-image">
                                    <img src={ImgAuth} className="mx-auto img-fluid" alt="images" />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ConfirmMail