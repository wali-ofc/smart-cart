import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import { Card, CardBody, Col } from 'react-bootstrap'
import { getAverageDailySalesChart } from '../data'

const AverageDailySales = () => {
    return (
        <Col md={12} xl={12}>
            <Card>
                <CardBody>
                    <div className="d-flex align-items-center">
                        <div className="fs-16 mb-1">Average Daily Sales</div>
                    </div>

                    <div className="d-flex align-items-baseline mb-2">
                        <div className="fs-22 mb-0 me-2 fw-semibold text-black">$28,450</div>
                    </div>

                    <ApexChartClient getOptions={getAverageDailySalesChart} series={getAverageDailySalesChart().series} type="area" height={82} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>
    )
}

export default AverageDailySales