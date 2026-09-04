import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import { getChartMoney, getSalesByCountry } from '../data'

const SalesReport = () => {
    return (
        <>
            <Col xl={8}>
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <h5 className="card-title text-black mb-0">Sales Report</h5>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ApexChartClient getOptions={getChartMoney} series={getChartMoney().series} type="bar" height={360} className="apex-charts" />
                    </CardBody>
                </Card>
            </Col>
            <Col xl={4}>
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <h5 className="card-title text-black mb-0">Sales by Country</h5>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <ApexChartClient getOptions={getSalesByCountry} series={getSalesByCountry().series} type="radar" height={360} className="apex-charts" />
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default SalesReport