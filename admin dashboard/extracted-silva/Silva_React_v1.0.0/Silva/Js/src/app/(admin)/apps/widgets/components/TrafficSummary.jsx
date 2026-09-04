import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { getDevelopmentActivity, getTrafficChart } from '../data';
const TrafficSummary = () => {
  return <Col md={12} xl={6}>
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <CardHeader>
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 text-black">Traffic summary</h5>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <ApexChartClient getOptions={getTrafficChart} series={getTrafficChart().series} type="bar" height={200} className="apex-charts" />

                        </CardBody>
                    </Card>
                </Col>

                <Col md={12} xl={12}>
                    <Card>
                        <CardHeader>
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0">Subscribers</h5>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <ApexChartClient getOptions={getDevelopmentActivity} series={getDevelopmentActivity().series} type="area" height={135} className="apex-charts" />
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </Col>;
};
export default TrafficSummary;