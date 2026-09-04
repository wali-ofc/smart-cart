import CommonCard from '@/component/CommonCard';
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const Placeholders = () => {
  return <Row>
            <Col xl={6}>
                <CommonCard title='Default Placeholders' titleClass='mb-0'>
                    <Row>
                        <Col md={6}>
                            <Card className="mb-0">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#20c997"></rect></svg>

                                <CardBody>
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="#" className="btn btn-primary">Go somewhere</Link>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="mb-0" aria-hidden="true">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect></svg>
                                <CardBody>
                                    <h5 className="card-title placeholder-glow">
                                        <span className="placeholder col-6"></span>
                                    </h5>
                                    <p className="card-text placeholder-glow">
                                        <span className="placeholder col-7"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-6"></span>
                                        <span className="placeholder col-8"></span>
                                    </p>
                                    <Link to="#" className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></Link>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <Row>
                    <Col xs={12}>
                        <CommonCard title='Color' titleClass='mb-0'>
                            <span className="placeholder col-12"></span>
                            <span className="placeholder col-12 bg-primary"></span>
                            <span className="placeholder col-12 bg-secondary"></span>
                            <span className="placeholder col-12 bg-success"></span>
                            <span className="placeholder col-12 bg-danger"></span>
                            <span className="placeholder col-12 bg-warning"></span>
                            <span className="placeholder col-12 bg-info"></span>
                            <span className="placeholder col-12 bg-light"></span>
                            <span className="placeholder col-12 bg-dark"></span>
                        </CommonCard>
                    </Col>


                    <Col xs={12}>
                        <CommonCard title='Sizing' titleClass='mb-0'>

                            <span className="placeholder col-12 placeholder-lg"></span>
                            <span className="placeholder col-12"></span>
                            <span className="placeholder col-12 placeholder-sm"></span>
                            <span className="placeholder col-12 placeholder-xs"></span>

                        </CommonCard>
                    </Col>

                </Row>
            </Col>


            <Col xl={6}>
                <CommonCard title='Width Placeholders' titleClass='mb-0'>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder w-75"></span>
                    <span className="placeholder" style={{
          width: "25%"
        }}></span>

                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title='How IT Works' titleClass='mb-0'>
                    <p aria-hidden="true">
                        <span className="placeholder col-6"></span>
                    </p>
                    <Link to="#" className="btn btn-primary disabled placeholder col-4" aria-disabled="true"></Link>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title='Animation Placeholder Glow' titleClass='mb-0'>
                    <p className="placeholder-glow">
                        <span className="placeholder col-12"></span>
                    </p>
                </CommonCard>
            </Col>



            <Col xl={6}>
                <CommonCard title='Animation Placeholder wave' titleClass='mb-0'>
                    <p className="placeholder-wave">
                        <span className="placeholder col-12"></span>
                    </p>
                </CommonCard>
            </Col>

        </Row>;
};
export default Placeholders;