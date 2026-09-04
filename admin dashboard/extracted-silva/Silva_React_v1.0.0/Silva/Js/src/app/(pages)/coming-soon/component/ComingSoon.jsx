import logoDark from "@/assets/images/logo-dark.png";
import comingSoon from "@/assets/images/svg/coming-soon.svg";
import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import Countdown from 'react-countdown';
const ComingSoon = () => {
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

                                            <div className="coming-soon-img text-center">
                                                <img src={comingSoon} className="img-fluid" alt="maintenance-image" />
                                            </div>

                                            <div className="text-center">

                                                <div className="">
                                                    <h3 className="mt-4 fw-semibold text-dark text-capitalize fs-26">Our website is developing. It will be very soon</h3>
                                                    <p className="text-muted">Get ready, we are under process of creating something  really cool, <br /> Our website will be available soon.</p>
                                                </div>

                                                <Row className="d-flex my-4 align-items-center justify-content-center">
                                                    <Col md={6}>
                                                        <input type="email" className="form-control" placeholder="Email Address" />
                                                    </Col>
                                                    <Col className="col-auto">
                                                        <div className="d-grid sm:mt-2">
                                                            <button className="btn btn-primary d-flex align-items-center">
                                                                <IconifyIcon icon="mdi:bell-ring-outline" className="me-2" />Notify Me
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="justify-content-center mt-5 mb-5">
                                                    <Col md={8} className="text-center">
                                                        <Countdown date={new Date('2026-12-31T23:59:59')} renderer={({
                            days,
                            hours,
                            minutes,
                            seconds,
                            completed
                          }) => {
                            if (completed) {
                              return <span className="text-success fw-bold">We are live!</span>;
                            } else {
                              return <div className="counter-number">
                                                                            <div className="coming-box">{days} <span>Days</span></div>
                                                                            <div className="coming-box">{hours} <span>Hours</span></div>
                                                                            <div className="coming-box">{minutes} <span>Minutes</span></div>
                                                                            <div className="coming-box">{seconds} <span>Seconds</span></div>
                                                                        </div>;
                            }
                          }} />
                                                    </Col>
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
        </div>;
};
export default ComingSoon;