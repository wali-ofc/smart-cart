import ApexChartClient from '@/component/client-wrapper/ApexChartClient';
import { Card, CardBody, Col } from 'react-bootstrap';
import { TrendingDown } from 'react-feather';
import { getConversionRateChart } from '../data';
const ConversionRate = () => {
  return <Col md={6} xl={6}>
            <Card className="mb-0">
                <CardBody>
                    <div className="d-flex align-items-center">
                        <div className="fs-16 mb-1">Conversion Rate</div>
                    </div>

                    <div className="d-flex align-items-baseline mb-2">
                        <div className="fs-22 mb-0 me-2 fw-semibold text-black">15%</div>
                        <div className="me-auto">
                            <span className="text-danger d-inline-flex align-items-center">
                                10%
                                <TrendingDown className="ms-1" style={{
                height: "20px",
                width: "20px"
              }} />
                            </span>
                        </div>
                    </div>
                    <ApexChartClient getOptions={getConversionRateChart} series={getConversionRateChart().series} type="area" height={45} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>;
};
export default ConversionRate;