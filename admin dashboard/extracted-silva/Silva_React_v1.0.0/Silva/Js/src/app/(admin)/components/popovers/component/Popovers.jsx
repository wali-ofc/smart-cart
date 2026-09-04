import CommonCard from '@/component/CommonCard';
import { Button, Col, OverlayTrigger, Popover, PopoverBody, PopoverHeader, Row } from 'react-bootstrap';
const Popovers = () => {
  return <Row>
            <Col xl={6}>
                <CommonCard title='Default Popovers' titleClass='mb-0'>
                    <OverlayTrigger trigger="click" placement="right" overlay={<Popover id="popover-basic">
                                <PopoverHeader as="h3">Popover title</PopoverHeader>
                                <PopoverBody>
                                    And here's some amazing content. It's very engaging. Right?
                                </PopoverBody>
                            </Popover>}>
                        <Button variant="danger">Click to toggle popover</Button>
                    </OverlayTrigger>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Custom Popovers" titleClass="mb-0">
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger trigger="click" placement="right" overlay={<Popover id="popover-basic" className="custom-popover">
                                    <PopoverHeader as="h3">Custom popover</PopoverHeader>
                                    <PopoverBody>
                                        This popover is themed via CSS variables.
                                    </PopoverBody>
                                </Popover>}>
                            <Button variant="primary">Custom popover</Button>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Four Directions" titleClass="mb-0">
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger trigger="click" placement="top" overlay={<Popover>
                                    <PopoverBody>Top popover</PopoverBody>
                                </Popover>}>
                            <Button variant="primary">Popover on top</Button>
                        </OverlayTrigger>

                        <OverlayTrigger trigger="click" placement="right" overlay={<Popover>
                                    <PopoverBody>Right popover</PopoverBody>
                                </Popover>}>
                            <Button variant="primary">Popover on right</Button>
                        </OverlayTrigger>

                        <OverlayTrigger trigger="click" placement="bottom" overlay={<Popover>
                                    <PopoverBody>Bottom popover</PopoverBody>
                                </Popover>}>
                            <Button variant="primary">Popover on bottom</Button>
                        </OverlayTrigger>

                        <OverlayTrigger trigger="click" placement="left" overlay={<Popover>
                                    <PopoverBody>Left popover</PopoverBody>
                                </Popover>}>
                            <Button variant="primary">Popover on left</Button>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>



            <Col xl={6}>
                <CommonCard title="Dismiss Click" titleClass="mb-0">
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger trigger="focus" placement="right" overlay={<Popover>
                                    <PopoverHeader as="h3">Dismissible popover</PopoverHeader>
                                    <PopoverBody>
                                        And here's some amazing content. It's very engaging. Right?
                                    </PopoverBody>
                                </Popover>}>
                            <Button variant="secondary">Dismissible popover</Button>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>



            <Col xl={6}>
                <CommonCard title="Hover" titleClass="mb-0">
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={<Popover>
                                    <PopoverHeader as="h3">Ohh Wow !</PopoverHeader>
                                    <PopoverBody>
                                        And here's some amazing content. It's very engaging. Right?
                                    </PopoverBody>
                                </Popover>}>
                            <Button variant="success">Please Hover Me</Button>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>
            <Col xl={6}>
                <CommonCard title="Disabled Hover Elements" titleClass="mb-0">
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={<Popover>
                                    <PopoverBody>Disabled popover</PopoverBody>
                                </Popover>}>
                            <span className="d-inline-block" tabIndex={0}>
                                <Button variant="primary" disabled>
                                    Disabled button
                                </Button>
                            </span>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title="Disabled Hover" titleClass="mb-0">
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={<Popover>
                                    <PopoverBody>Disabled popover</PopoverBody>
                                </Popover>}>
                            <span className="d-inline-block" tabIndex={0}>
                                <Button variant="primary" type="button" disabled>
                                    Disabled button
                                </Button>
                            </span>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>

        </Row>;
};
export default Popovers;