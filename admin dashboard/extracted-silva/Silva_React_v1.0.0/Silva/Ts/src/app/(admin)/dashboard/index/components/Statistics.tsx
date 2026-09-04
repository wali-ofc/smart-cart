import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import { getStaticRadarChart } from '../data'

const Statistics = () => {
    return (
        <Col md={6} xl={3}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Deals Statistics</h5>
                    </div>
                </CardHeader>
                <CardBody>
                    <ApexChartClient getOptions={getStaticRadarChart} series={getStaticRadarChart().series} type="radar" height={323} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>
    )
}

export default Statistics