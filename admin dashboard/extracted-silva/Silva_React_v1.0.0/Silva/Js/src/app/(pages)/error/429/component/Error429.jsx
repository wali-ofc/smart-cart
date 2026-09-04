import ImgDark from "@/assets/images/logo-dark.png";
import ImgError from "@/assets/images/svg/429-error.svg";
import { useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Error429 = () => {
  useEffect(() => {
    document.body.classList.add('bg-primary-subtle');
    return () => {
      document.body.classList.remove('bg-primary-subtle');
    };
  }, []);
  return <div className="maintenance-pages">
            <Container fluid className="p-0">
                <Row>
                    <Col xl={12} className="align-self-center">
                        <Row>
                            <Col md={5} className="mx-auto">
                                <Card className="p-3 mb-0">
                                    <CardBody>
                                        <div className="text-center">
                                            <div className="mb-4 text-center">
                                                <Link to="/dashboard/index" className="auth-logo">
                                                    <img src={ImgDark} alt="logo-dark" className="mx-auto" height="28" />
                                                </Link>
                                            </div>

                                            <div className="maintenance-img">
                                                <img src={ImgError} className="img-fluid" alt="coming-soon" />
                                            </div>

                                            <div className="text-center">
                                                <h3 className="mt-4 fw-semibold text-black text-capitalize">Too many requests</h3>
                                                <p className="text-muted">This pages you are trying to access does not exits or has been moved. <br /> Try going back to our homepage.</p>
                                            </div>

                                            <Link className="btn btn-primary mt-3 me-1" to="/dashboard/index">Back to Home</Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>;
};
export default Error429;