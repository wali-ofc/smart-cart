import { Link } from "react-router-dom";
import { Anchor, Card, CardBody, Col, Row } from 'react-bootstrap';
import { Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Aperture, Archive, ArrowDown, ArrowDownCircle, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle, ArrowUpCircle } from 'react-feather';
import { FiArrowUpLeft } from 'react-icons/fi';
const FeatherIcon = () => {
  return <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <Row className="icon-demo">
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <Activity /><span>activity</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <Airplay /><span>airplay</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <AlertCircle /><span>alert-circle</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <AlertOctagon /><span>alert-octagon</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <AlertTriangle /><span>alert-triangle</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <AlignCenter /><span>align-center</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <AlignJustify /><span>align-justify</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <AlignLeft /><span>align-left</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <AlignRight /><span>align-right</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <Aperture /><span>aperture</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <Archive /><span>archive</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowDownCircle /><span>arrow-down-circle</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowDownLeft /><span>arrow-down-left</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowDownRight /><span>arrow-down-right</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowDown /><span>arrow-down</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowLeftCircle /><span>arrow-left-circle</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowLeft /><span>arrow-left</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowRightCircle /><span>arrow-right-circle</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowRight /><span>arrow-right</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <ArrowUpCircle /><span>arrow-up-circle</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <FiArrowUpLeft /><span>arrow-up-left</span>
                </div>
              </Col>
              <Col xl={3} lg={4} sm={6}>
                <div className="icon-box py-3">
                  <Anchor /><span>anchor</span>
                </div>
              </Col>
            </Row>
          </CardBody>

          <div className="align-items-center justify-content-center mx-auto text-center mb-3">
            <Link to="https://feathericons.com/" target="_blank" className="btn btn-primary">View All Icons</Link>
          </div>
        </Card>

      </Col>
    </Row>;
};
export default FeatherIcon;