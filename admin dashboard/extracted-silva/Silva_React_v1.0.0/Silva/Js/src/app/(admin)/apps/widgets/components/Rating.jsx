import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap';
import { getEmployeeRating } from '../data';
const Rating = () => {
  return <Col md={12} xl={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Employee Performance Rating</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <ApexChartClient getOptions={getEmployeeRating} series={getEmployeeRating().series} type="bar" height={355} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>;
};
export default Rating;