import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap';
import { getTopSessionChart } from '../data';
const TopSession = () => {
  return <Col xl={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Top Session</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <ApexChartClient getOptions={getTopSessionChart} series={getTopSessionChart().series} type="bubble" height={333} className="apex-charts mt-n3" />
                </CardBody>
            </Card>
        </Col>;
};
export default TopSession;