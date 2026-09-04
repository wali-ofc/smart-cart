import logoSm from '@/assets/images/logo-sm.png'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Form, Row, Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap'

const AllToasts = () => {
    const [showBasicToast, setShowBasicToast] = useState(true)
    const [showLiveToast, setShowLiveToast] = useState(false)
    const [showTranslucentToast, setShowTranslucentToast] = useState(true)
    const [showStack1, setShowStack1] = useState(true)
    const [showStack2, setShowStack2] = useState(true)
    const [showCustom1, setShowCustom1] = useState(true)
    const [showCustom2, setShowCustom2] = useState(true)
    const [showCustom3, setShowCustom3] = useState(true)
    const [showCustom4, setShowCustom4] = useState(true)
    const [toastPlacement, setToastPlacement] = useState('top-0 end-0')

    return (
        <Row>
            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Basic Toasts</h5>
                    </CardHeader>
                    <CardBody>
                        <Toast show={showBasicToast} onClose={() => setShowBasicToast(false)} className="fade show" >
                            <ToastHeader closeButton>
                                <img src={logoSm} className="rounded me-2" height={16} alt="toast header" />
                                <strong className="me-auto">Silva</strong>
                                <small>11 mins ago</small>
                            </ToastHeader>
                            <ToastBody>Hello, world! This is a toast message.</ToastBody>
                        </Toast>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Toasts Live</h5>
                    </CardHeader>
                    <CardBody>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setShowLiveToast(true)}
                        >
                            Show live toast
                        </button>

                        <ToastContainer className="toast-container position-fixed bottom-0 end-0 p-3">
                            <Toast show={showLiveToast} onClose={() => setShowLiveToast(false)}>
                                <ToastHeader closeButton>
                                    <img src={logoSm} className="rounded me-2" alt="toast header" />
                                    <strong className="me-auto">Bootstrap</strong>
                                    <small>11 mins ago</small>
                                </ToastHeader>
                                <ToastBody>Hello, world! This is a toast message.</ToastBody>
                            </Toast>
                        </ToastContainer>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Translucent</h5>
                    </CardHeader>
                    <CardBody>
                        <Toast show={showTranslucentToast} onClose={() => setShowTranslucentToast(false)} className="toast fade show" >
                            <ToastHeader closeButton>
                                <img src={logoSm} className="rounded me-2" height={16} alt="toast header" />
                                <strong className="me-auto">Silva</strong>
                                <small className="text-body-secondary">11 mins ago</small>
                            </ToastHeader>
                            <ToastBody>Hello, world! This is a toast message.</ToastBody>
                        </Toast>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Stacking</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="toast-container position-static">
                            <Toast show={showStack1} onClose={() => setShowStack1(false)} className="toast fade show mb-2" >
                                <ToastHeader closeButton>
                                    <img src={logoSm} alt="brand-logo" height={16} className="me-2" />
                                    <strong className="me-auto">Silva</strong>
                                    <small className="text-muted">just now</small>
                                </ToastHeader>
                                <ToastBody>See? Just like this.</ToastBody>
                            </Toast>

                            <Toast show={showStack2} onClose={() => setShowStack2(false)} className="toast fade show" >
                                <ToastHeader closeButton>
                                    <img src={logoSm} alt="brand-logo" height={16} className="me-2" />
                                    <strong className="me-auto">Silva</strong>
                                    <small className="text-muted">2 seconds ago</small>
                                </ToastHeader>
                                <ToastBody>Heads up, toasts will stack automatically</ToastBody>
                            </Toast>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Custom Content</h5>
                    </CardHeader>
                    <CardBody>
                        <Toast show={showCustom1} onClose={() => setShowCustom1(false)} className="toast show align-items-center mb-4">
                            <div className="d-flex">
                                <ToastBody>Hello, world! This is a toast message.</ToastBody>
                                <button type="button" className="btn-close me-2 m-auto" onClick={() => setShowCustom1(false)}></button>
                            </div>
                        </Toast>

                        <Toast show={showCustom2} onClose={() => setShowCustom2(false)} className="toast show align-items-center text-white bg-primary border-0 mb-4">
                            <div className="d-flex">
                                <ToastBody>Hello, world! This is a toast message.</ToastBody>
                                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowCustom2(false)}></button>
                            </div>
                        </Toast>

                        <Toast show={showCustom3} onClose={() => setShowCustom3(false)} className="toast show mb-4">
                            <ToastBody>
                                Hello, world! This is a toast message.
                                <div className="mt-2 pt-2 border-top">
                                    <button type="button" className="btn btn-primary btn-sm">Take action</button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowCustom3(false)}>Close</button>
                                </div>
                            </ToastBody>
                        </Toast>

                        <Toast show={showCustom4} onClose={() => setShowCustom4(false)} className="toast bg-primary show">
                            <ToastBody className="text-white">
                                Hello, world! This is a toast message.
                                <div className="mt-2 pt-2 border-top">
                                    <button type="button" className="btn btn-light btn-sm">Take action</button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowCustom4(false)}>Close</button>
                                </div>
                            </ToastBody>
                        </Toast>
                    </CardBody>
                </Card>
            </Col>

            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Placement</h5>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="selectToastPlacement">Toast placement</label>
                                <select
                                    className="form-select mt-2"
                                    value={toastPlacement}
                                    onChange={(e) => setToastPlacement(e.target.value)}
                                >
                                    <option value="">Select a position...</option>
                                    <option value="top-0 start-0">Top left</option>
                                    <option value="top-0 start-50 translate-middle-x">Top center</option>
                                    <option value="top-0 end-0">Top right</option>
                                    <option value="top-50 start-0 translate-middle-y">Middle left</option>
                                    <option value="top-50 start-50 translate-middle">Middle center</option>
                                    <option value="top-50 end-0 translate-middle-y">Middle right</option>
                                    <option value="bottom-0 start-0">Bottom left</option>
                                    <option value="bottom-0 start-50 translate-middle-x">Bottom center</option>
                                    <option value="bottom-0 end-0">Bottom right</option>
                                </select>
                            </div>
                        </Form>
                        <div
                            className="bg-light position-relative bd-example-toasts"
                            style={{ minHeight: '294px' }}
                        >
                            <div className={`toast-container position-absolute p-3 ${toastPlacement}`}>
                                <Toast  className="toast show">
                                    <ToastHeader closeButton>
                                        <img src={logoSm} alt="brand-logo" height={16} className="me-2" />
                                        <strong className="me-auto">Silva</strong>
                                        <small>11 mins ago</small>
                                    </ToastHeader>
                                    <ToastBody>Hello, world! This is a toast message.</ToastBody>
                                </Toast>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default AllToasts
