import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
const Videos = () => {
  return <Row>
            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Ratio Video 16:9</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/O151OAc3nqQ" title="YouTube video" allowFullScreen></iframe>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Ratio Video 21:9</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="ratio ratio-21x9">
                            <iframe src="https://www.youtube.com/embed/7CN1A4vVlvk" title="YouTube video" allowFullScreen></iframe>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Ratio Video 4:3</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="ratio ratio-4x3">
                            <iframe src="https://www.youtube.com/embed/quF1NirPrcU" title="YouTube video" allowFullScreen></iframe>
                        </div>
                    </CardBody>
                </Card>

            </Col>


            <Col xl={6}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Ratio Video 1:1</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="ratio ratio-1x1">
                            <iframe src="https://www.youtube.com/embed/5Sud0wrUGlI" title="YouTube video" allowFullScreen></iframe>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Custom ratios</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="ratio" style={{
            '--bs-aspect-ratio': '50%'
          }}>
                            <iframe src="https://www.youtube.com/embed/zr-C5fN4-j0" title="YouTube video" allowFullScreen></iframe>
                        </div>
                    </CardBody>
                </Card>
            </Col>

        </Row>;
};
export default Videos;