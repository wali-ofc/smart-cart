import userImg from "@/assets/images/small/user-image.jpg"
import userImg11 from "@/assets/images/users/user-11.jpg"
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import IconifyIcon from '@/component/wrapper/IconifyIcon'

const Hero = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <img src={userImg} className="rounded-top-2 img-fluid" alt="image data" />
                    <CardBody>
                        <div className="align-items-center">
                            <div className="silva-main-sections">
                                <div className="silva-profile-main">
                                    <img src={userImg11} className="rounded-circle img-fluid avatar-xxl img-thumbnail float-start" alt="image profile" />

                                    <span className="sil-profile_main-pic-change img-thumbnail">
                                        <IconifyIcon icon="mdi:camera" className="text-white" />
                                    </span>
                                </div>

                                <div className="overflow-hidden ms-md-4 ms-0">
                                    <h4 className="m-0 text-dark fs-20 mt-2 mt-md-0">John Smith</h4>
                                    <p className="my-1 text-muted fs-16">Passionate Software Engineer Crafting Innovative Solutions</p>
                                    <span className="fs-15"><IconifyIcon icon="mdi:message" className="me-2 align-middle" />
                                        Speaks: <span>English <span className="badge bg-primary-subtle text-primary px-2 py-1 fs-13 fw-normal">native</span> , Canada, Alberta </span></span>
                                </div>
                            </div>

                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row >
    )
}

export default Hero