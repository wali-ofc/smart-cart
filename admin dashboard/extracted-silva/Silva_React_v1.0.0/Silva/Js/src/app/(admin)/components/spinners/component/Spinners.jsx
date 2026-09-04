import CommonCard from '@/component/CommonCard';
import { Col, Row, Spinner, Button } from 'react-bootstrap';
const Spinners = () => {
  return <Row>
            <Col xl={6}>
                <CommonCard title="Border Spinner" titleClass="mb-0">
                    <Spinner className="m-2">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Colors Spinner" titleClass="mb-0">
                    {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map(variant => <Spinner key={variant} animation="border" variant={variant} className="m-2">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>)}
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Growing Spinner" titleClass="mb-0">
                    <Spinner animation="grow" className="m-2">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Colors Growing Spinner" titleClass="mb-0">
                    {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map(variant => <Spinner key={variant} animation="grow" variant={variant} className="m-2">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>)}
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Alignment" titleClass="mb-0">
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" className="m-2">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Placement" titleClass="mb-0">
                    <div className="clearfix">
                        <div className="float-end">
                            <Spinner animation="border" className="m-2">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Size" titleClass="mb-0">
                    <Row className="justify-content-center align-items-center text-center">
                        <Col md={4}>
                            <Spinner animation="border" className="m-2" style={{
              width: '4rem',
              height: '4rem'
            }} />
                            <Spinner animation="grow" className="m-2" style={{
              width: '4rem',
              height: '4rem'
            }} />
                        </Col>
                        <Col md={4}>
                            <Spinner animation="border" className="m-2 spinner-border-xl" />
                            <Spinner animation="grow" className="m-2 spinner-grow-xl" />
                        </Col>
                        <Col md={4}>
                            <Spinner animation="border" className="spinner-border-sm m-2" />
                            <Spinner animation="grow" className="spinner-grow-sm m-2" />
                        </Col>
                    </Row>
                </CommonCard>
            </Col>


            <Col xl={6}>
                <CommonCard title="Buttons Spinner" titleClass="mb-0">
                    <Row>
                        <Col md={6}>
                            <div className="d-flex flex-wrap gap-2">
                                <Button variant="primary" disabled>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="visually-hidden">Loading...</span>
                                </Button>
                                <Button variant="primary" disabled>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    Loading...
                                </Button>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex flex-wrap gap-2 mt-2 mt-sm-0">
                                <Button variant="primary" disabled>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                    <span className="visually-hidden">Loading...</span>
                                </Button>
                                <Button variant="primary" disabled>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                    Loading...
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CommonCard>
            </Col>

        </Row>;
};
export default Spinners;