import authImg from "@/assets/images/auth-images.svg";
import logoDark from "@/assets/images/logo-dark.png";
import { useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
const RecoverPswd = () => {
  useEffect(() => {
    document.body.classList.add('bg-primary-subtle');
    return () => {
      document.body.classList.remove('bg-primary-subtle');
    };
  }, []);
  return <div className="account-page">
            <Container fluid className="p-0">
                <Row className="align-items-center g-0">
                    <Col xl={5}>
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

                                            <div className="auth-title-section mb-3 text-center">
                                                <h3 className="text-dark fs-20 fw-medium mb-2">Welcome back</h3>
                                                <p className="text-dark text-capitalize fs-14 mb-0">Sign in to continue to silve.</p>
                                            </div>

                                            <div className="pt-0">
                                                <form action="/dashboard/index" className="my-4">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="emailaddress" className="form-label">Email address</label>
                                                        <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                                                    </div>

                                                    <div className="form-group mb-0 row">
                                                        <Col xs={12}>
                                                            <div className="d-grid">
                                                                <button className="btn btn-primary" type="submit"> Recover Password </button>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </form>
                                                <div className="text-center text-muted">
                                                    <p className="mb-0">Change the mind  ?<Link className='text-primary ms-2 fw-medium' to='/auth/login'>Back to Login</Link></p>
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
                                    <img src={authImg} className="mx-auto img-fluid" alt="images" />
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>;
};
export default RecoverPswd;