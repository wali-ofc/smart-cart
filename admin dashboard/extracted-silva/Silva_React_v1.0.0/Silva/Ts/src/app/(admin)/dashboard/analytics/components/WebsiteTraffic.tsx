import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import { Card, CardBody, Col } from 'react-bootstrap'
import { TrendingUp } from 'react-feather'
import { getWebsiteTrafficChart } from '../data'

const WebsiteTraffic = () => {
    return (
        <Col md={6} xl={6} >
            <Card className="mb-0">
                <CardBody>
                    <div className="d-flex align-items-center">
                        <div className="fs-16 mb-1">Website Traffic</div>
                    </div>

                    <div className="d-flex align-items-baseline mb-2">
                        <div className="fs-22 mb-0 me-2 fw-semibold text-black">91.6K</div>
                        <div className="me-auto">
                            <span className="text-primary d-inline-flex align-items-center">
                                15%
                                <TrendingUp className="ms-1" style={{ height: "20px", width: "20px" }} />
                            </span>
                        </div>
                    </div>
                    <ApexChartClient getOptions={getWebsiteTrafficChart} series={getWebsiteTrafficChart().series} type="bar" height={45} className="apex-charts" />
                </CardBody>
            </Card>
        </Col >
    )
}

export default WebsiteTraffic