import { Link } from "react-router-dom"
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap'


type EarningType = {
    date: string,
    itemCount: number,
    change: string,
    isPositive: boolean,
    earnings: string
}
const earningsData: EarningType[] = [
    { date: '01 January', itemCount: 45, change: '+$70', isPositive: true, earnings: '$78,000' },
    { date: '05 February', itemCount: 35, change: '-$48', isPositive: false, earnings: '$18,000' },
    { date: '15 March', itemCount: 28, change: '-$31', isPositive: false, earnings: '$15,000' },
    { date: '06 April', itemCount: 38, change: '+$58', isPositive: true, earnings: '$125,000' },
    { date: '08 May', itemCount: 42, change: '+$65', isPositive: true, earnings: '$80,000' },
    { date: '25 December', itemCount: 39, change: '-$41', isPositive: false, earnings: '$73,000' },
    { date: '18 January', itemCount: 45, change: '+$74', isPositive: true, earnings: '$72,500' },
    { date: '09 September', itemCount: 29, change: '-$25', isPositive: false, earnings: '$23,000' },
]

const EarningsReports = () => {
    return (
        <Col md={12} xl={6}>
            <Card className="overflow-hidden">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0 text-black">Earnings Reports</h5>
                    </div>
                </CardHeader>

                <CardBody className="p-0">
                    <div className="table-responsive">
                        <table className="table table-traffic mb-0">
                            <thead>
                                <tr>
                                    <th className="border-top-0 fw-semibold text-black">Date</th>
                                    <th className="border-top-0 fw-semibold text-black">Item Count</th>
                                    <th className="border-top-0 fw-semibold text-black">Text</th>
                                    <th className="border-top-0 fw-semibold text-black">Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earningsData.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link to="#" className="text-reset">{item.date}</Link>
                                        </td>
                                        <td>{item.itemCount}</td>
                                        <td className={item.isPositive ? 'text-success' : 'text-danger'}>
                                            {item.change}
                                        </td>
                                        <td>{item.earnings}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default EarningsReports
