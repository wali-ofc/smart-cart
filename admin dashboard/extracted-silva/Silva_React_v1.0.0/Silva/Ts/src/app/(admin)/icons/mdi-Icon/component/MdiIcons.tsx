import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const MdiIcons = () => {

    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <CardBody>
                        <Row className="icon-demo">
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:ab-testing" /><span>mdi-account-box-edit-outline</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:abacus" /><span>mdi-abacus</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:abjad-arabic" /><span>mdi-abjad-arabic</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:abjad-hebrew" /><span>mdi-abjad-hebrew</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:abugida-devanagari" /><span>mdi-abugida-devanagari</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:abugida-thai" /><span>mdi-abugida-thai</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point" /><span>mdi-access-point</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point-check" /><span>mdi-access-point-check</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point-minus" /><span>mdi-access-point-minus</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point-network" /><span>mdi mdi-access-point-network</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point-network-off" /><span>mdi-access-point-network-off</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point-off" /><span>mdi-access-point-off</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point-plus" /><span>mdi-access-point-plus</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:access-point-remove" /><span>mdi-access-point-remove</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:account" /><span>mdi-account</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:account-alert" /><span>mdi-account-alert</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:account-alert-outline" /><span>mdi-account-alert-outline</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:account-arrow-down" /><span>mdi-account-arrow-down</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:account-arrow-down-outline" /><span>mdi-account-arrow-down-outline</span>
                                </div>
                            </Col>
                            <Col xl={3} lg={4} sm={6}>
                                <div className="icon-box material-design-icon py-3">
                                    <IconifyIcon icon="mdi:account-arrow-left" /><span>mdi-account-arrow-left</span>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>

                    <div className="align-items-center justify-content-center mx-auto text-center mb-3">
                        <Link to="https://pictogrammers.com/library/mdi/" target="_blank" className="btn btn-primary">View All Icons</Link>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default MdiIcons