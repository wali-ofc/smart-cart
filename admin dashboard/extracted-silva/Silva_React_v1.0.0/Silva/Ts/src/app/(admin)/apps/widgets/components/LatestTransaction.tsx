import IconifyIcon from '@/component/wrapper/IconifyIcon'
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { CheckCircle, Loader } from 'react-feather'

import user11 from "@/assets/images/users/user-11.jpg"
import user12 from "@/assets/images/users/user-12.jpg"
import user13 from "@/assets/images/users/user-13.jpg"
import user14 from "@/assets/images/users/user-14.jpg"
import user15 from "@/assets/images/users/user-15.jpg"
import user3 from "@/assets/images/users/user-3.jpg"

type transactionDataType = {
    type: string,
    icon: string,
    person: string
    image: string
    date: string,
    amount: string
    status: string
}

const transactionData: transactionDataType[] = [
    {
        type: "Salary payment",
        icon: "mdi:credit-card-outline",
        person: "Jenny Wilson",
        image: user12,
        date: "February 14, 2024",
        amount: "$449.51",
        status: "Completed"
    },
    {
        type: "Office Manage",
        icon: "mdi:cash",
        person: "Jenny Wilson",
        image: user15,
        date: "January 25, 2024",
        amount: "$870.95",
        status: "Completed"
    },
    {
        type: "Client payment",
        icon: "mdi:account-outline",
        person: "Cameron Williamson",
        image: user13,
        date: "March 16, 2024",
        amount: "$687.85",
        status: "On progress"
    },
    {
        type: "Investment",
        icon: "mdi:hand-coin-outline",
        person: "Jenny Wilson",
        image: user11,
        date: "June 20, 2024",
        amount: "$528.18",
        status: "On progress"
    },
    {
        type: "Marketing",
        icon: "mdi:chart-box-plus-outline",
        person: "Esther Howard",
        image: user14,
        date: "July 16, 2024",
        amount: "$449.51",
        status: "Completed"
    },
    {
        type: "Salary payment",
        icon: "mdi:credit-card-outline",
        person: "Darlene Robertson",
        image: user3,
        date: "May 27, 2024",
        amount: "$478.51",
        status: "Completed"
    }
]

const LatestTransaction = () => {
    return (
        <Col md={12} xl={8}>
            <Row>
                <Col md={12} xl={12}>
                    <Card className="overflow-hidden">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 text-black">Latest Transaction</h5>
                                <div className="ms-auto">
                                    <Dropdown>
                                        <DropdownToggle className="btn btn-sm bg-light border dropdown-toggle fw-medium text-black">
                                            <IconifyIcon icon="mdi:calendar-blank-outline me-1" className='fs-14' />
                                            Monthly
                                            <IconifyIcon icon="mdi:chevron-down" className='ms-1 fs-14' />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href="#">Monthly</DropdownItem>
                                            <DropdownItem href="#">Yearly</DropdownItem>
                                            <DropdownItem href="#">Date Wise</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                        <CardBody className="p-0">
                            <div className="table-responsive">
                                <table className="table table-traffic mb-0">
                                    <thead>
                                        <tr>
                                            <th>Transaction type</th>
                                            <th>Person</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionData.map((txn, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="rounded-circle border d-flex align-items-center justify-content-center me-2" style={{ height: "35px", width: "35px" }}>
                                                            <IconifyIcon icon={txn.icon} className='fs-17' />
                                                        </div>
                                                        <Link to="#" className="text-reset">{txn.type}</Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={txn.image} alt='user' className="avatar avatar-sm rounded-circle me-2" />
                                                        <p className="mb-0">{txn.person}</p>
                                                    </div>
                                                </td>
                                                <td className="text-nowrap text-reset">
                                                    {txn.date}
                                                </td>
                                                <td>
                                                    <Link to="#" className="text-reset">
                                                        {txn.amount}
                                                    </Link>
                                                </td>
                                                <td className="text-nowrap text-reset">
                                                    <div className="d-flex align-items-center">
                                                        {txn.status === "Completed" ? (
                                                            <CheckCircle style={{ height: "16px", width: "16px" }} className="text-primary me-2" />
                                                        ) : (
                                                            <Loader style={{ height: "16px", width: "16px" }} className="text-warning me-2" />
                                                        )}
                                                        <p className="mb-0">{txn.status}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>

                    </Card>
                </Col>
            </Row>
        </Col>
    )
}

export default LatestTransaction
