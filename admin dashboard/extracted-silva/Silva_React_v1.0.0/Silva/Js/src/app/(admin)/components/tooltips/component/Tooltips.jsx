import CommonCard from '@/component/CommonCard';
import { Link } from "react-router-dom";
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
const Tooltips = () => {
  const htmlTooltip = <Tooltip>
            <em>Tooltip</em> <u>with</u> <b>HTML</b>
        </Tooltip>;
  return <Row>
            <Col xl={6}>
                <CommonCard title='Examples' titleClass='mb-0'>
                    <p className="text-muted">
                        Placeholder text to demonstrate some{" "}
                        <OverlayTrigger overlay={<Tooltip>Default tooltip</Tooltip>}>
                            <Link to="#">inline links</Link>
                        </OverlayTrigger>
                        {" "}with tooltips. This is now just filler, no killer. Content placed here just to mimic the presence of{" "}
                        <OverlayTrigger overlay={<Tooltip>Another tooltip</Tooltip>}>
                            <Link to="#">real text</Link>
                        </OverlayTrigger>
                        . And all that just to give you an idea of how tooltips would look when used in real-world situations. So hopefully you've now seen how{" "}
                        <OverlayTrigger overlay={<Tooltip>Another one here too</Tooltip>}>
                            <Link to="#">these tooltips on links</Link>
                        </OverlayTrigger>
                        {" "}can work in practice, once you use them on{" "}
                        <OverlayTrigger overlay={<Tooltip>The last tip!</Tooltip>}>
                            <Link to="#">your own</Link>
                        </OverlayTrigger>
                        {" "}site or project.
                    </p>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title='Custom Tooltip' titleClass='mb-0'>

                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip className="custom-tooltip">
                                    This top tooltip is themed via CSS variables.
                                </Tooltip>}>
                            <Button variant="primary">Custom tooltip</Button>
                        </OverlayTrigger>
                    </div>

                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title='Four Directions' titleClass='mb-0'>
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Tooltip on top</Tooltip>}>
                            <Button variant="primary">Tooltip on top</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={<Tooltip>Tooltip on right</Tooltip>}>
                            <Button variant="primary">Tooltip on right</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Tooltip on bottom</Tooltip>}>
                            <Button variant="primary">Tooltip on bottom</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="left" overlay={<Tooltip>Tooltip on left</Tooltip>}>
                            <Button variant="primary">Tooltip on left</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={htmlTooltip}>
                            <Button variant="primary">Tooltip with HTML</Button>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title='HTML Tags' titleClass='mb-0'>
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger placement="top" overlay={htmlTooltip}>
                            <Button variant="primary">Tooltip with HTML</Button>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title='Disabled Tooltips' titleClass='mb-0'>
                    <div className="d-flex flex-wrap gap-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Disabled tooltip</Tooltip>}>
                            <span className="d-inline-block">
                                <Button variant="primary" disabled style={{
                pointerEvents: 'none'
              }}>
                                    Disabled button
                                </Button>
                            </span>
                        </OverlayTrigger>
                    </div>
                </CommonCard>
            </Col>

        </Row>;
};
export default Tooltips;