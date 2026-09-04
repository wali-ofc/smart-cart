import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'

const Setting = () => {
    return (
        <Row>
            <Row>
                <Col lg={6} xl={6}>
                    <Card className="border">

                        <CardHeader>
                            <Row className="align-items-center">
                                <Col>
                                    <h4 className="card-title mb-0">Personal Information</h4>
                                </Col>
                            </Row>
                        </CardHeader>

                        <CardBody>
                            <Row className="form-group mb-3">
                                <label className="form-label">First Name</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="text" defaultValue="Charles" />
                                </Col>
                            </Row>

                            <Row className="form-group mb-3">
                                <label className="form-label">Last Name</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="text" defaultValue="Buncle" />
                                </Col>
                            </Row>

                            <Row className="form-group mb-3">
                                <label className="form-label">Contact Phone</label>
                                <Col lg={12} xl={12}>
                                    <div className="input-group">
                                        <span className="input-group-text"><IconifyIcon icon="mdi:phone-outline" /></span>
                                        <input className="form-control" type="text" placeholder="Phone" aria-describedby="basic-addon1" defaultValue="+61 399615" />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="form-group mb-3">
                                <label className="form-label">Email Address</label>
                                <Col lg={12} xl={12}>
                                    <div className="input-group">
                                        <span className="input-group-text"><IconifyIcon icon="mdi:email" /></span>
                                        <input type="text" className="form-control" defaultValue="CharlesBuncle@dayrep.com" placeholder="Email" aria-describedby="basic-addon1" />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="form-group mb-3">
                                <label className="form-label">Company</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="text" defaultValue="zoyothemes" />
                                </Col>
                            </Row>

                            <Row className="form-group mb-3">
                                <label className="form-label">City</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="text" defaultValue="Adelaide" />
                                </Col>
                            </Row>

                            <Row className="form-group mb-3">
                                <label className="form-label">Address</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="text" defaultValue="Australia" />
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Col>

                <Col lg={6} xl={6}>
                    <Card className="border mb-0">

                        <CardHeader>
                            <Row className="align-items-center">
                                <Col>
                                    <h4 className="card-title mb-0">Change Password</h4>
                                </Col>
                            </Row>
                        </CardHeader>

                        <CardBody className="mb-0">
                            <Row className="form-group mb-3">
                                <label className="form-label">Old Password</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="password" placeholder="Old Password" />
                                </Col>
                            </Row>
                            <Row className="form-group mb-3">
                                <label className="form-label">New Password</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="password" placeholder="New Password" />
                                </Col>
                            </Row>
                            <Row className="form-group mb-3">
                                <label className="form-label">Confirm Password</label>
                                <Col lg={12} xl={12}>
                                    <input className="form-control" type="password" placeholder="Confirm Password" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col lg={12} xl={12}>
                                    <button type="submit" className="btn btn-primary mb-2 mb-md-0">Change Password</button>
                                    <button type="button" className="btn btn-danger" style={{ marginLeft: "4px" }}>Cancel</button>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </Row>
    )
}

export default Setting