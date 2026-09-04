import IconifyIcon from '@/component/wrapper/IconifyIcon';
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const About = () => {
  return <>
            <Row>
                <Col md={6} sm={6} className="col-md-6 mb-4">
                    <div className="">
                        <h5 className="fs-16 text-dark fw-semibold mb-3 text-capitalize">About me</h5>
                        <p>Geetings, fellow software enthusiasts! I'm thrilled to see your intereset in exploring my profile. I'm Christian Mayo,
                            a 24-year-old software engineer from the United Kingdom. My educational path led me to earn a Bachelor's Degeer in Computer Science,
                            specializing in Software Engineering. With this qualification, I'm equipped to dive into the world of coding and develooment,ready
                            to tackle exciting projects and contribute to cutting-edge technological advancement...
                        </p>
                    </div>

                    <div className="skills-details mt-3">
                        <h6 className="text-uppercase fs-13">Skills</h6>

                        <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-light px-3 text-dark py-2 fw-semibold">User Interface</span>
                            <span className="badge bg-light px-3 text-dark py-2 fw-semibold">User Experience</span>
                            <span className="badge bg-light px-3 text-dark py-2 fw-semibold">Interaction Design </span>
                            <span className="badge bg-light px-3 text-dark py-2 fw-semibold">3D Design</span>
                            <span className="badge bg-light px-3 text-dark py-2 fw-semibold">Information Architecture</span>
                            <span className="badge bg-light px-3 text-dark py-2 fw-semibold">User Research</span>
                            <span className="badge bg-light px-3 text-dark py-2 fw-semibold">Wireframing</span>
                        </div>

                    </div>
                </Col>

                <Col md={6} sm={6} className="mb-4">
                    <h5 className="fs-16 text-dark fw-semibold mb-3 text-capitalize">Contact Details</h5>

                    <Row>
                        <Col md={4} sm={4} lg={4} className="mb-3">
                            <div className="profile-email mb-md-2">
                                <h6 className="text-uppercase fs-13">Email Addess</h6>
                                <Link to="#" className="text-primary fs-14 text-decoration-underline">zoyothemes@gmail.com</Link>
                            </div>
                        </Col>

                        <Col md={4} sm={4} lg={4} className="mb-3">
                            <div className="profile-email">
                                <h6 className="text-uppercase fs-13">Social Media</h6>
                                <ul className="social-list list-inline mt-0 mb-0">
                                    <li className="list-inline-item">
                                        <Link to="javascript: void(0);" className="social-item border-primary text-primary justify-content-center align-content-center align-items-center"><IconifyIcon icon="mdi:facebook" className="fs-14" /></Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="javascript: void(0);" className="social-item border-primary text-primary justify-content-center align-content-center align-items-center"><IconifyIcon icon="mdi:facebook" className="fs-14" /></Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="javascript: void(0);" className="social-item border-info text-info justify-content-center align-content-center align-items-center "><IconifyIcon icon="mdi:twitter" className="fs-14" /></Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="javascript: void(0);" className="social-item border-secondary text-secondary justify-content-center align-content-center align-items-center"><IconifyIcon icon="mdi:github" className="fs-14" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={4} sm={4} lg={4} className="mb-3">
                            <div className="profile-email">
                                <h6 className="text-uppercase fs-13">Location</h6>
                                <Link to="#" className="fs-14">Melbourne, Australia</Link>
                            </div>
                        </Col>
                    </Row>

                    <div className="skills-details">
                        <h6 className="text-uppercase fs-13">Fluent In</h6>

                        <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-light px-3 py-2 text-dark fw-semibold">English</span>
                            <span className="badge bg-light px-3 py-2 text-dark fw-semibold">Madrian</span>
                            <span className="badge bg-light px-3 py-2 text-dark fw-semibold">Spanish</span>
                            <span className="badge bg-light px-3 py-2 text-dark fw-semibold">French</span>
                        </div>

                    </div>
                </Col>
            </Row>

            <Row>
                <Col md={6} sm={6} className="mb-0">
                    <div className="">
                        <h5 className="fs-16 text-dark fw-semibold mb-3 text-capitalize">Projects</h5>
                    </div>

                    <Row>
                        <Col md={6} xs={12}>
                            <Card className="border">
                                <CardBody>
                                    <h4 className="m-0 fw-semibold text-dark fs-16">Website Developing</h4>
                                    <Row className="mt-2 d-flex align-items-center">
                                        <Col>
                                            <h5 className="fs-20 mt-1 fw-bold">$12,000</h5>
                                            <p className="mb-0 text-muted">Total Budget</p>
                                        </Col>
                                        <div className="col-auto">
                                            <Link to="#" className="btn btn-sm btn-outline-dark px-3">More Details</Link>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={6} xs={12}>
                            <Card className="border">
                                <CardBody>
                                    <h4 className="m-0 fw-semibold text-dark fs-16">Algorithm Developing</h4>
                                    <Row className="mt-2 d-flex align-items-center">
                                        <Col>
                                            <h5 className="fs-20 mt-1 fw-bold">$35,800</h5>
                                            <p className="mb-0 text-muted">Total Budget</p>
                                        </Col>
                                        <div className="col-auto">
                                            <Link to="#" className="btn btn-sm btn-outline-dark px-3">More Details</Link>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={6} xs={12}>
                            <Card className="border mb-md-0">
                                <CardBody>
                                    <h4 className="m-0 fw-semibold text-dark fs-16">Digital Marketing</h4>
                                    <Row className="mt-2 d-flex align-items-center">
                                        <Col>
                                            <h5 className="fs-20 mt-1 fw-bold">$8,000</h5>
                                            <p className="mb-0 text-muted">Total Budget</p>
                                        </Col>
                                        <Col className="col-auto">
                                            <Link to="#" className="btn btn-sm btn-outline-dark px-3">More Details</Link>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={6} xs={12}>
                            <Card className="border mb-md-0">
                                <CardBody>
                                    <h4 className="m-0 fw-semibold text-dark fs-16">Mobile Developing</h4>
                                    <Row className="mt-2 d-flex align-items-center">
                                        <Col>
                                            <h5 className="fs-20 mt-1 fw-bold">$16,000</h5>
                                            <p className="mb-0 text-muted">Total Budget</p>
                                        </Col>
                                        <Col className="col-auto align-content-end">
                                            <Link to="#" className="btn btn-sm btn-outline-dark px-3">More Details</Link>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col md={6} sm={6} className="mb-0">
                    <div className="">
                        <h5 className="fs-16 text-dark fw-semibold mb-3 text-capitalize">Expertise</h5>
                    </div>

                    <Row className="align-items-center g-0">
                        <Col sm={3}>
                            <p className="text-truncate mt-1 mb-0"><IconifyIcon icon="mdi:circle-medium" className="text-primary me-2" /> Photoshop </p>
                        </Col>

                        <Col sm={9}>
                            <div className="progress mt-1" style={{
              height: "8px"
            }}>
                                <div className="progress-bar progress-bar bg-primary rounded" role="progressbar" style={{
                width: "72%"
              }} aria-valuenow={52} aria-valuemin={0} aria-valuemax={52} />
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-center g-0 mt-3">
                        <Col sm={3}>
                            <p className="text-truncate mt-1 mb-0"><IconifyIcon icon="mdi:circle-medium" className="text-primary me-2" /> illustrator </p>
                        </Col>
                        <Col sm={9}>
                            <div className="progress mt-1" style={{
              height: "8px"
            }}>
                                <div className="progress-bar progress-bar bg-primary rounded" role="progressbar" style={{
                width: "45%"
              }} aria-valuenow={45} aria-valuemin={0} aria-valuemax={45}>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-center g-0 mt-3">
                        <Col sm={3}>
                            <p className="text-truncate mt-1 mb-0"><IconifyIcon icon="mdi:circle-medium" className="text-primary me-2" /> HTML </p>
                        </Col>
                        <Col sm={9}>
                            <div className="progress mt-1" style={{
              height: "8px"
            }}>
                                <div className="progress-bar progress-bar bg-primary rounded" role="progressbar" style={{
                width: "68%"
              }} aria-valuenow={48} aria-valuemin={0} aria-valuemax={48}>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-center g-0 mt-3">
                        <Col sm={3}>
                            <p className="text-truncate mt-1 mb-0"><IconifyIcon icon="mdi:circle-medium" className="text-primary me-2" />  CSS </p>
                        </Col>
                        <Col sm={9}>
                            <div className="progress mt-1" style={{
              height: "8px"
            }}>
                                <div className="progress-bar progress-bar bg-primary rounded" role="progressbar" style={{
                width: "78%"
              }} aria-valuenow={78} aria-valuemin={0} aria-valuemax={78}>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-center g-0 mt-3">
                        <Col sm={3}>
                            <p className="text-truncate mt-1 mb-0"><IconifyIcon icon="mdi:circle-medium" className="text-primary me-2" />  Javascript </p>
                        </Col>
                        <Col sm={9}>
                            <div className="progress mt-1" style={{
              height: "8px"
            }}>
                                <div className="progress-bar progress-bar bg-primary rounded" role="progressbar" style={{
                width: "63%"
              }} aria-valuenow={63} aria-valuemin={0} aria-valuemax={63}>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-center g-0 mt-3">
                        <Col sm={3}>
                            <p className="text-truncate mt-1 mb-0"><IconifyIcon icon="mdi:circle-medium" className="text-primary me-2" />  Php </p>
                        </Col>
                        <Col sm={9}>
                            <div className="progress mt-1" style={{
              height: "8px"
            }}>
                                <div className="progress-bar progress-bar bg-primary rounded" role="progressbar" style={{
                width: "48%"
              }} aria-valuenow={48} aria-valuemin={0} aria-valuemax={48}>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>;
};
export default About;