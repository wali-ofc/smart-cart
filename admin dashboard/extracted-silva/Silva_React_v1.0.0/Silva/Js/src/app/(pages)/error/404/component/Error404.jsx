import { useEffect } from 'react';
import ErrorImg from "@/assets/images/svg/404-error.svg";
import logoDark from "@/assets/images/logo-dark.png";
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Error404 = () => {
  useEffect(() => {
    document.body.classList.add('bg-primary-subtle', 'bg-opacity-10');
    return () => {
      document.body.classList.remove('bg-primary-subtle', 'bg-opacity-10');
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
                                            <div className="mb-4">
                                                <Link to="/dashboard/index" className="auth-logo">
                                                    <img src={logoDark} alt="logo-dark" className="mx-auto" height="28" />
                                                </Link>
                                            </div>

                                            <div className="maintenance-img">
                                                <img src={ErrorImg} className="img-fluid" alt="coming-soon" />
                                            </div>

                                            <div className="">
                                                <h3 className="mt-5 fw-semibold text-dark text-capitalize">Oops!, Page Not Found</h3>
                                                <p className="text-dark">This pages you are trying to access does not exits or has been moved. <br /> Try going back to our homepage.</p>
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
export default Error404;