import ApexChartClient from '@/component/client-wrapper/ApexChartClient'
import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'
import { getCustomerRateChart } from '../data'
import { Link } from "react-router-dom"

const CustomerRate = () => {

    const ratingsData = [
        { stars: "5", percentage: 80 },
        { stars: "4", percentage: 55 },
        { stars: "3", percentage: 45 },
        { stars: "2", percentage: 25 },
        { stars: "1", percentage: 8 },
    ];
    return (
        <>
            <Col lg={6} xl={5} >
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <h5 className="card-title text-black mb-0">Repeat Customer Rate</h5>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <ApexChartClient getOptions={getCustomerRateChart} series={getCustomerRateChart().series} type="line" height={305} className="apex-charts" />
                    </CardBody>
                </Card>
            </Col>

            <Col md={12} xl={3}>
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <h5 className="card-title text-black mb-0">Customer Reviews</h5>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="flex-1">
                                <div className="d-flex align-items-baseline mb-1">
                                    <h4 className="mb-1 text-muted fs-28">4.8</h4>
                                    <span className="ms-2">
                                        <IconifyIcon icon="mdi:star" className="text-warning" />
                                        <IconifyIcon icon="mdi:star" className="text-warning" />
                                        <IconifyIcon icon="mdi:star" className="text-warning" />
                                        <IconifyIcon icon="mdi:star" className="text-warning" />
                                        <IconifyIcon icon="mdi:star" className="text-muted" />
                                    </span>
                                </div>
                                <Link to="javascript:void(0);" className="fs-14">2,878 Reviews</Link>
                            </div>
                            <div className="min-w-fit">
                                <span className="fs-14">(4.3 out of 5)</span>
                            </div>
                        </div>

                        {ratingsData.map((rating, index) => (
                            <div className="mt-2" key={index}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-fill">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span className="d-block ">{rating.stars} Stars</span>
                                            <span className="d-block ">{rating.percentage}%</span>
                                        </div>
                                        <div
                                            className="progress progress-md mt-2"
                                            role="progressbar"
                                            aria-valuenow={rating.percentage}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <div
                                                className="progress-bar bg-primary"
                                                style={{ width: `${rating.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default CustomerRate