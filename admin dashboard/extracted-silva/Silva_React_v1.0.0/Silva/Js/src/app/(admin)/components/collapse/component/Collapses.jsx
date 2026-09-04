import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Collapse, Row } from 'react-bootstrap';
const Collapses = () => {
  const [openDefault, setOpenDefault] = useState(false);
  const [openMulti1, setOpenMulti1] = useState(false);
  const [openMulti2, setOpenMulti2] = useState(false);
  const [openHorizontal, setOpenHorizontal] = useState(false);
  return <Row>
      <Col xl={6}>
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0">Default Collapse</h5>
          </CardHeader>
          <CardBody>
            <div className="d-flex flex-wrap gap-2">
              <Button onClick={() => setOpenDefault(!openDefault)}>
                Link with href
              </Button>
              <Button onClick={() => setOpenDefault(!openDefault)}>
                Button with data-bs-target
              </Button>
              <Collapse in={openDefault}>
                <div className="mt-2">
                  <Card className="mb-0">
                    <CardBody>
                      Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </CardBody>
                  </Card>
                </div>
              </Collapse>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0">Multiple Toggles And Targets</h5>
          </CardHeader>
          <CardBody>
            <div className="d-flex flex-wrap gap-2">
              <Button onClick={() => setOpenMulti1(!openMulti1)}>Toggle first element</Button>
              <Button onClick={() => setOpenMulti2(!openMulti2)}>Toggle second element</Button>
              <Button onClick={() => {
              setOpenMulti1(!openMulti1);
              setOpenMulti2(!openMulti2);
            }}>
                Toggle both elements
              </Button>
            </div>
            <Row className="mt-3">
              <Col>
                <Collapse in={openMulti1}>
                  <div>
                    <Card className="mb-0">
                      <CardBody>
                        Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                      </CardBody>
                    </Card>
                  </div>
                </Collapse>
              </Col>
              <Col>
                <Collapse in={openMulti2}>
                  <div>
                    <Card className="mb-0">
                      <CardBody>
                        Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                      </CardBody>
                    </Card>
                  </div>
                </Collapse>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0">Horizontal Collapse</h5>
          </CardHeader>
          <CardBody>
            <Button onClick={() => setOpenHorizontal(!openHorizontal)}>Toggle width collapse</Button>
            <div style={{
            minHeight: '120px'
          }} className="mt-3">
              <Collapse in={openHorizontal} dimension="width">
                <div>
                  <Card className="mb-0" style={{
                  width: '300px'
                }}>
                    <CardBody>
                      This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                    </CardBody>
                  </Card>
                </div>
              </Collapse>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default Collapses;