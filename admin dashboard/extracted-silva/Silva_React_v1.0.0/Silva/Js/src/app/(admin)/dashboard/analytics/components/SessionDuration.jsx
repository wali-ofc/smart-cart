import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import { Card, CardBody, Col } from 'react-bootstrap';
import { TrendingUp } from 'react-feather';
import { getSessionDurationChart } from '../data';
const SessionDuration = () => {
  return <Col md={6} xl={6}>
            <Card className="mb-0">
                <CardBody>
                    <div className="d-flex align-items-center">
                        <div className="fs-16 mb-1">Session Duration</div>
                    </div>

                    <div className="d-flex align-items-baseline mb-2">
                        <div className="fs-22 mb-0 me-2 fw-semibold text-black">90 Sec</div>
                        <div className="me-auto">
                            <span className="text-primary d-inline-flex align-items-center">
                                25%
                                <TrendingUp className="ms-1" style={{
                height: "20px",
                width: "20px"
              }} />
                            </span>
                        </div>
                    </div>
                    <ApexChartClient getOptions={getSessionDurationChart} series={getSessionDurationChart().series} type="area" height={45} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>;
};
export default SessionDuration;