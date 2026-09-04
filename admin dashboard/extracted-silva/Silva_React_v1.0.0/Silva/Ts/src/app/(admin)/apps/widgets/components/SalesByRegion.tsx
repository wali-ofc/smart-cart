import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import { getSalesRegion } from '../data'

const SalesByRegion = () => {
    return (
        <Col md={6} xl={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Sales by Region</h5>
                    </div>
                </CardHeader>

                <CardBody>
                    <ApexChartClient getOptions={getSalesRegion} series={getSalesRegion().series} type="radar" height={305} className="apex-charts" />
                </CardBody>
            </Card>
        </Col>
    )
}

export default SalesByRegion