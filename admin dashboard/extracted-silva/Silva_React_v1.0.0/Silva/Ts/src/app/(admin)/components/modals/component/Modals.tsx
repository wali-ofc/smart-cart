import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, OverlayTrigger, Popover, PopoverBody, PopoverHeader, Row, Tooltip } from 'react-bootstrap';

const Modals = () => {
    const [ModalShow, setModalShow] = useState({
        standard: false,
        grid: false,
        toggle1: false,
        toggle2: false,
        center: false,
        center2: false,
        secondModal: false,
        scrollable: false,
        fullscreen: false,
        VerticallyModal: false,
        TooltipPopoverModal: false,
        xl: false,
        lg: false,
        sm: false,
        fullscreenMain: false,
        fullscreenSm: false,
        fullscreenMd: false,
        fullscreenLg: false,
        fullscreenXl: false,
        fullscreenXxl: false,
        staticBackdrop: false,
        ModalScrollable: false
    });


    const handleShow = (key: string) =>
        setModalShow((prev) => ({ ...prev, [key]: true }));

    const handleClose = (key: string) =>
        setModalShow((prev) => ({ ...prev, [key]: false }));
    return (
        <>
            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Default Modals</h5>
                        </CardHeader>
                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Button type="button" onClick={() => handleShow('standard')} className="btn btn-primary">
                                    Standard Modal
                                </Button>
                            </div>

                            <Modal show={ModalShow.standard} onHide={() => handleClose('standard')} tabIndex={-1}>
                                <ModalHeader>
                                    <h1 className="modal-title fs-5">Modal Title</h1>
                                    <button className="btn-close" onClick={() => handleClose('standard')}></button>
                                </ModalHeader>
                                <ModalBody>
                                    <h5>Text in a modal</h5>
                                    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                                    <hr />
                                    <h5>Overflowing text to show scroll behavior</h5>
                                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                                    <p className="mb-0">Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="button" className="btn btn-light" onClick={() => handleClose('standard')}>Close</Button>
                                    <Button type="button" className="btn btn-primary">Save changes</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Optional sizes</h5>
                        </CardHeader>

                        <CardBody>

                            <div>
                                <div className="d-flex flex-wrap gap-2">
                                    <Button onClick={() => handleShow('fullscreen')} className="btn btn-primary">
                                        Fullscreen Modal
                                    </Button>
                                    <Button className="btn btn-info" onClick={() => handleShow('xl')}>Extra Large Modal</Button>
                                    <Button className="btn btn-success" onClick={() => handleShow('lg')}>Large Modal</Button>
                                    <Button className="btn btn-danger" onClick={() => handleShow('sm')}>Small Modal</Button>
                                </div>


                                <Modal show={ModalShow.fullscreen} onHide={() => handleClose('fullscreen')} className="exampleModalFullscreen" dialogClassName="modal-fullscreen" tabIndex={-1}>
                                    <ModalHeader>
                                        <h5 className="modal-title" id="exampleModalFullscreenLabel">Fullscreen
                                            Modal Heading</h5>
                                        <button type="button" onClick={() => handleClose('fullscreen')} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </ModalHeader>
                                    <ModalBody>
                                        <h5>Overflowing text to show scroll behavior</h5>
                                        <p>Cras mattis consectetur purus sit amet fermentum.
                                            Cras justo odio, dapibus ac facilisis in,
                                            egestas eget quam. Morbi leo risus, porta ac
                                            consectetur ac, vestibulum at eros.</p>
                                        <p>Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Vivamus sagittis lacus vel
                                            augue laoreet rutrum faucibus dolor auctor.</p>
                                        <p>Aenean lacinia bibendum nulla sed consectetur.
                                            Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Donec sed odio dui. Donec
                                            ullamcorper nulla non metus auctor
                                            fringilla.</p>
                                        <p>Cras mattis consectetur purus sit amet fermentum.
                                            Cras justo odio, dapibus ac facilisis in,
                                            egestas eget quam. Morbi leo risus, porta ac
                                            consectetur ac, vestibulum at eros.</p>
                                        <p>Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Vivamus sagittis lacus vel
                                            augue laoreet rutrum faucibus dolor auctor.</p>
                                        <p>Aenean lacinia bibendum nulla sed consectetur.
                                            Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Donec sed odio dui. Donec
                                            ullamcorper nulla non metus auctor
                                            fringilla.</p>
                                        <p>Cras mattis consectetur purus sit amet fermentum.
                                            Cras justo odio, dapibus ac facilisis in,
                                            egestas eget quam. Morbi leo risus, porta ac
                                            consectetur ac, vestibulum at eros.</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={() => handleClose('fullscreen')} className="btn btn-light" data-bs-dismiss="modal">Close</Button>
                                        <Button className="btn btn-primary ">Save changes</Button>
                                    </ModalFooter>
                                </Modal>


                                <Modal show={ModalShow.xl} onHide={() => handleClose('xl')} className="fade bs-example-modal-xl" dialogClassName="modal-xl" tabIndex={-1}>
                                    <ModalHeader>
                                        <h5 className="modal-title" id="myExtraLargeModalLabel">Extra Large
                                            Modal</h5>
                                        <button type="button" onClick={() => handleClose('xl')} className="btn-close"></button>
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>Cras mattis consectetur purus sit amet fermentum.
                                            Cras justo odio, dapibus ac facilisis in,
                                            egestas eget quam. Morbi leo risus, porta ac
                                            consectetur ac, vestibulum at eros.</p>
                                        <p>Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Vivamus sagittis lacus vel
                                            augue laoreet rutrum faucibus dolor auctor.</p>
                                        <p className="mb-0">Aenean lacinia bibendum nulla sed consectetur.
                                            Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Donec sed odio dui. Donec
                                            ullamcorper nulla non metus auctor
                                            fringilla.</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className="btn btn-light" onClick={() => handleClose('xl')}>Close</Button>
                                        <Button className="btn btn-primary ">Save changes</Button>
                                    </ModalFooter>
                                </Modal>

                                <Modal show={ModalShow.lg} onHide={() => handleClose('lg')} className="bs-example-modal-lg" dialogClassName="modal-lg" tabIndex={-1}>
                                    <ModalHeader>
                                        <h5 className="modal-title" id="myLargeModalLabel">Large Modal</h5>
                                        <button type="button" className="btn-close" onClick={() => handleClose('lg')}>
                                        </button>
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>Cras mattis consectetur purus sit amet fermentum.
                                            Cras justo odio, dapibus ac facilisis in,
                                            egestas eget quam. Morbi leo risus, porta ac
                                            consectetur ac, vestibulum at eros.</p>
                                        <p>Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Vivamus sagittis lacus vel
                                            augue laoreet rutrum faucibus dolor auctor.</p>
                                        <p className="mb-0">Aenean lacinia bibendum nulla sed consectetur.
                                            Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Donec sed odio dui. Donec
                                            ullamcorper nulla non metus auctor
                                            fringilla.</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className="btn btn-light" onClick={() => handleClose('lg')}>Close</Button>
                                        <Button className="btn btn-primary ">Save changes</Button>
                                    </ModalFooter>
                                </Modal>


                                <Modal show={ModalShow.sm} onHide={() => handleClose('sm')} className="bs-example-modal-sm" tabIndex={-1} dialogClassName="modal-sm">
                                    <ModalHeader>
                                        <h5 className="modal-title" id="mySmallModalLabel">Small Modal</h5>
                                        <button type="button" onClick={() => handleClose('sm')} className="btn-close"></button>
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>Cras mattis consectetur purus sit amet fermentum.
                                            Cras justo odio, dapibus ac facilisis in,
                                            egestas eget quam. Morbi leo risus, porta ac
                                            consectetur ac, vestibulum at eros.</p>
                                        <p>Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Vivamus sagittis lacus vel
                                            augue laoreet rutrum faucibus dolor auctor.</p>
                                        <p className="mb-0">Aenean lacinia bibendum nulla sed consectetur.
                                            Praesent commodo cursus magna, vel scelerisque
                                            nisl consectetur et. Donec sed odio dui. Donec
                                            ullamcorper nulla non metus auctor
                                            fringilla.</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className="btn btn-light" onClick={() => handleClose('sm')}>Close</Button>
                                        <Button className="btn btn-primary">Save changes</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Toggle Between Modals</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleShow('center')}
                                >
                                    Open First Modal
                                </button>
                            </div>

                            <Modal
                                show={ModalShow.center}
                                onHide={() => handleClose('center')}
                                centered
                            >
                                <ModalHeader>
                                    <ModalTitle>Modal 1</ModalTitle>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => handleClose('center')}
                                    ></button>
                                </ModalHeader>
                                <ModalBody>
                                    Show a second modal and hide this one with the button below.
                                </ModalBody>
                                <ModalFooter>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleClose('center');
                                            handleShow('secondModal');
                                        }}
                                    >
                                        Open Second Modal
                                    </button>
                                </ModalFooter>
                            </Modal>

                            <Modal
                                show={ModalShow.secondModal}
                                onHide={() => handleClose('secondModal')}
                                centered
                            >
                                <ModalHeader>
                                    <ModalTitle>Modal 2</ModalTitle>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => handleClose('secondModal')}
                                    ></button>
                                </ModalHeader>
                                <ModalBody>
                                    Hide this modal and show the first with the button below.
                                </ModalBody>
                                <ModalFooter>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleClose('secondModal');
                                            handleShow('center');
                                        }}
                                    >
                                        Back to First
                                    </button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Vertically Centered Modal</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <button type="button" className="btn btn-primary" onClick={() => handleShow('VerticallyModal')}>Center Modal</button>
                            </div>


                            <Modal className="bs-example-modal-center" show={ModalShow.VerticallyModal} dialogClassName='modal-dialog-centered' onHide={() => handleClose('VerticallyModal')} tabIndex={-1}>
                                <ModalHeader>
                                    <h5 className="modal-title">Center Modal Title</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose('VerticallyModal')}>
                                    </button>
                                </ModalHeader>
                                <ModalBody>
                                    <p>This is a vertically centered modal.</p>
                                    <p>This is some placeholder content to show a vertically centered modal. We've added
                                        some extra copy here to show how vertically centering the modal works when
                                        combined with scrollable modals. We also use some repeated line breaks to quickly
                                        extend the height of the content, thereby triggering the scrolling. When content
                                        becomes longer than the predefined max-height of modal, content will be cropped
                                        and scrollable within the modal.</p>
                                    <p>Praesent commodo cursus magna, vel scelerisque
                                        nisl consectetur et. Vivamus sagittis lacus vel
                                        augue laoreet rutrum faucibus dolor auctor.</p>
                                    <p className="mb-0">Aenean lacinia bibendum nulla sed consectetur.
                                        Praesent commodo cursus magna, vel scelerisque
                                        nisl consectetur et. Donec sed odio dui. Donec
                                        ullamcorper nulla non metus auctor
                                        fringilla.</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={() => handleClose('VerticallyModal')} className="btn btn-light">Close</Button>
                                    <Button type="button" className="btn btn-primary">Save changes</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Tooltips and Popovers</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleShow('TooltipPopoverModal')}
                                >
                                    Launch Demo Modal
                                </button>
                            </div>

                            <Modal show={ModalShow.TooltipPopoverModal} onHide={() => handleClose('TooltipPopoverModal')}>
                                <ModalHeader closeButton>
                                    <ModalTitle>Modal title</ModalTitle>
                                </ModalHeader>

                                <ModalBody>
                                    <h5>Popover in a modal</h5>
                                    <p>
                                        This{' '}
                                        <OverlayTrigger
                                            trigger="click"
                                            placement="right"
                                            overlay={
                                                <Popover>
                                                    <PopoverHeader as="h3">Popover Title</PopoverHeader>
                                                    <PopoverBody>
                                                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                                                    </PopoverBody>
                                                </Popover>
                                            }
                                            rootClose
                                        >
                                            <Button variant="primary">Button</Button>
                                        </OverlayTrigger>{' '}
                                        triggers a popover on click.
                                    </p>

                                    <hr />

                                    <h5>Tooltips in a modal</h5>
                                    <p>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>Tooltip title</Tooltip>
                                            }
                                        >
                                            <span
                                                className="text-primary text-decoration-underline"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                This link
                                            </span>
                                        </OverlayTrigger>{' '}
                                        and{' '}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>Tooltip title</Tooltip>
                                            }
                                        >
                                            <span
                                                className="text-primary text-decoration-underline"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                that link
                                            </span>
                                        </OverlayTrigger>{' '}
                                        have tooltips on hover.
                                    </p>
                                </ModalBody>

                                <ModalFooter>
                                    <Button className="btn btn-light" onClick={() => handleClose('TooltipPopoverModal')}>
                                        Close
                                    </Button>
                                    <Button className='btn btn-primary'>Save changes</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>


                <Col xxl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Grids in Modals</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <button type="button" className="btn btn-primary" onClick={() => handleShow('grid')}>
                                    Launch Demo Modal
                                </button>
                            </div>

                            <Modal show={ModalShow.grid} onHide={() => handleClose('grid')} tabIndex={-1}>
                                <ModalHeader>
                                    <h5 className="modal-title" id="exampleModalgridLabel">Grid Modals</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </ModalHeader>
                                <ModalBody>
                                    <form action="javascript:void(0);">
                                        <Row className="g-3">
                                            <Col xxl={6}>
                                                <div>
                                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                                    <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                                </div>
                                            </Col>
                                            <Col xxl={6}>
                                                <div>
                                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" id="lastName" placeholder="Enter lastname" />
                                                </div>
                                            </Col>
                                            <Col xxl={6}>
                                                <label htmlFor="emailInput" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                                            </Col>
                                            <Col xxl={6}>
                                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="passwordInput" defaultValue="451326546" placeholder="Enter password" />
                                            </Col>
                                            <Col lg={12}>
                                                <div className="hstack gap-2 justify-content-end">
                                                    <Button className="btn btn-light" onClick={() => handleClose('grid')}>Close</Button>
                                                    <Button className="btn btn-primary">Submit</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </ModalBody>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Fullscreen Modal</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <Button variant="primary" onClick={() => handleShow("fullscreenMain")}>Full Screen</Button>
                                <Button variant="secondary" onClick={() => handleShow("fullscreenSm")}>Full Screen Below sm</Button>
                                <Button variant="success" onClick={() => handleShow("fullscreenMd")}>Full Screen Below md</Button>
                                <Button variant="danger" onClick={() => handleShow("fullscreenLg")}>Full Screen Below lg</Button>
                                <Button variant="warning" onClick={() => handleShow("fullscreenXl")}>Full Screen Below xl</Button>
                                <Button variant="info" onClick={() => handleShow("fullscreenXxl")}>Full Screen Below xxl</Button>
                            </div>
                        </CardBody>

                        <Modal show={ModalShow.fullscreenMain} onHide={() => handleClose("fullscreenMain")} dialogClassName="modal-fullscreen">
                            <ModalHeader closeButton>
                                <h5 className="modal-title">Full Screen Modal</h5>
                            </ModalHeader>
                            <ModalBody>Content goes here...</ModalBody>
                            <ModalFooter>
                                <Button variant="light" onClick={() => handleClose("fullscreenMain")}>Close</Button>
                                <Button variant="primary">Save Changes</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal show={ModalShow.fullscreenSm} onHide={() => handleClose("fullscreenSm")} dialogClassName="modal-fullscreen-sm-down">
                            <ModalHeader closeButton>
                                <h5 className="modal-title">Full Screen Below sm</h5>
                            </ModalHeader>
                            <ModalBody>Content goes here...</ModalBody>
                            <ModalFooter>
                                <Button variant="light" onClick={() => handleClose("fullscreenSm")}>Close</Button>
                                <Button variant="secondary">Save Changes</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal show={ModalShow.fullscreenMd} onHide={() => handleClose("fullscreenMd")} dialogClassName="modal-fullscreen-md-down">
                            <ModalHeader closeButton>
                                <h5 className="modal-title">Full Screen Below md</h5>
                            </ModalHeader>
                            <ModalBody>Content goes here...</ModalBody>
                            <ModalFooter>
                                <Button variant="light" onClick={() => handleClose("fullscreenMd")}>Close</Button>
                                <Button variant="success">Save Changes</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal show={ModalShow.fullscreenLg} onHide={() => handleClose("fullscreenLg")} dialogClassName="modal-fullscreen-lg-down">
                            <ModalHeader closeButton>
                                <h5 className="modal-title">Full Screen Below lg</h5>
                            </ModalHeader>
                            <ModalBody>Content goes here...</ModalBody>
                            <ModalFooter>
                                <Button variant="light" onClick={() => handleClose("fullscreenLg")}>Close</Button>
                                <Button variant="danger">Save Changes</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal show={ModalShow.fullscreenXl} onHide={() => handleClose("fullscreenXl")} dialogClassName="modal-fullscreen-xl-down">
                            <ModalHeader closeButton>
                                <h5 className="modal-title">Full Screen Below xl</h5>
                            </ModalHeader>
                            <ModalBody>Content goes here...</ModalBody>
                            <ModalFooter>
                                <Button variant="light" onClick={() => handleClose("fullscreenXl")}>Close</Button>
                                <Button variant="warning">Save Changes</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal show={ModalShow.fullscreenXxl} onHide={() => handleClose("fullscreenXxl")} dialogClassName="modal-fullscreen-xxl-down">
                            <ModalHeader closeButton>
                                <h5 className="modal-title">Full Screen Below xxl</h5>
                            </ModalHeader>
                            <ModalBody>Content goes here...</ModalBody>
                            <ModalFooter>
                                <Button variant="light" onClick={() => handleClose("fullscreenXxl")}>Close</Button>
                                <Button variant="info">Save Changes</Button>
                            </ModalFooter>
                        </Modal>
                    </Card>
                </Col>


                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Static Backdrop Modal</h5>
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex flex-wrap gap-2">
                                <button type="button" className="btn btn-primary" onClick={() => handleShow('staticBackdrop')}>
                                    Static Backdrop
                                </button>
                            </div>
                            <Modal backdrop="static" show={ModalShow.staticBackdrop} onHide={() => handleClose('staticBackdrop')} tabIndex={-1}>
                                <ModalHeader>
                                    <h1 className="modal-title fs-5">Modal Title</h1>
                                    <button type="button" className="btn-close" onClick={() => handleClose('staticBackdrop')}></button>
                                </ModalHeader>
                                <ModalBody>
                                    I will not close if you click outside me. Don't even try to press escape key.
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="btn btn-light" onClick={() => handleClose('staticBackdrop')}>Close</Button>
                                    <Button className="btn btn-primary">Understood</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <h5 className="card-title mb-0">Scrolling Modal</h5>
                        </CardHeader>

                        <CardBody>

                            <div className="d-flex flex-wrap gap-2">
                                <Button className="btn btn-primary" onClick={() => handleShow('ModalScrollable')}>Scrollable modal</Button>
                            </div>

                            <Modal show={ModalShow.ModalScrollable} onHide={() => handleClose('ModalScrollable')} tabIndex={-1} dialogClassName='modal-dialog-scrollable'>
                                <ModalHeader>
                                    <h1 className="modal-title fs-5">Scrollable Modal</h1>
                                    <button type="button" className="btn-close" onClick={() => handleClose('ModalScrollable')}></button>
                                </ModalHeader>
                                <ModalBody>
                                    <p>This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal,
                                        we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating
                                        the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
                                    </p>
                                    <p>This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal,
                                        we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating
                                        the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
                                    </p>
                                    <p>This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal,
                                        we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating
                                        the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
                                    </p>
                                    <p>This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal,
                                        we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating
                                        the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
                                    </p>
                                    <p>This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal,
                                        we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating
                                        the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
                                    </p>
                                    <p>This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal,
                                        we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating
                                        the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="btn btn-light" onClick={() => handleClose('ModalScrollable')}>Close</Button>
                                    <Button className="btn btn-primary">Send message</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>
            </Row >
        </>
    )
}

export default Modals