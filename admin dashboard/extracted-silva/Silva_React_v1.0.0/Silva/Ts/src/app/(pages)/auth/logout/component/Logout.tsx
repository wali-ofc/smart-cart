import AuthImg from "@/assets/images/auth-images.svg"
import logoDark from "@/assets/images/logo-dark.png"
import LogoutImg from "@/assets/images/svg/logout.svg"
import { useEffect } from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Logout = () => {

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
                                <Card className="p-3 mb-0">
                                    <CardBody>

                                        <div className="mb-0 border-0 p-md-5 p-lg-0 p-4">
                                            <div className="mb-4 p-0 text-center">
                                                <Link to="/dashboard/index" className="auth-logo">
                                                    <img src={logoDark} alt="logo-dark" className="mx-auto" height="28" />
                                                </Link>
                                            </div>

                                            <div className="text-center auth-title-section">
                                                <h3 className="text-dark fs-20 fw-medium mb-2">You are Logged Out</h3>
                                                <p className="text-muted fs-15">Thank you for using Silva admin template</p>
                                            </div>

                                            <div className="text-center">
                                                <Link to="/auth/login" className="btn btn-primary mt-3 me-1"> Log In </Link>
                                            </div>

                                            <div className="maintenance-img text-center pt-4">
                                                <img src={LogoutImg} height="200" alt="svg-logo" />
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
                                    <img src={AuthImg} className="mx-auto img-fluid" alt="images" />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Logout