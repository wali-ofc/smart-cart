import { useState, useEffect } from 'react';
import api from '@/helpers/api';
import { Link } from "react-router-dom"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    OverlayTrigger,
    Row,
    Tooltip
} from 'react-bootstrap'
import userImg11 from '@/assets/images/users/user-11.jpg'
import userImg12 from '@/assets/images/users/user-12.jpg'
import userImg13 from '@/assets/images/users/user-13.jpg'
import userImg14 from '@/assets/images/users/user-14.jpg'
import userImg15 from '@/assets/images/users/user-15.jpg'
import IconifyIcon from '@/component/wrapper/IconifyIcon'

interface Order {
    id: string
    name: string
    email: string
    image: any
    items: number
    total: string
    created: string
    modified: string
    status: 'Delivered' | 'Cancelled' | 'Pending' | 'Shipped'
}

const orderList: Order[] = [
    {
        id: '#3413',
        name: 'Richard Dom',
        email: 'richard@api.com',
        image: userImg12,
        items: 82,
        total: '$480.00',
        created: 'August 09, 2023',
        modified: 'August 18, 2023',
        status: 'Delivered',
    },
    {
        id: '#4125',
        name: 'Randal Dare',
        email: 'randal@dotcom.com',
        image: userImg11,
        items: 93,
        total: '$568.00',
        created: 'January 19, 2023',
        modified: 'March 09, 2023',
        status: 'Delivered',
    },
    {
        id: '#6532',
        name: 'Bickle Bob',
        email: 'bicklebob@dotcom.com',
        image: userImg13,
        items: 56,
        total: '$398.00',
        created: 'April 25, 2023',
        modified: 'June 21, 2023',
        status: 'Cancelled',
    },
    {
        id: '#7405',
        name: 'Emma Wilson',
        email: 'emmawilson@dotcom.com',
        image: userImg14,
        items: 68,
        total: '$652.00',
        created: 'September 24, 2023',
        modified: 'November 13, 2023',
        status: 'Pending',
    },
    {
        id: '#4526',
        name: 'Hugh Jackma',
        email: 'hughjackma@dotcom.com',
        image: userImg15,
        items: 52,
        total: '$746.00',
        created: 'July 28, 2023',
        modified: 'August 21, 2023',
        status: 'Shipped',
    },
    {
        id: '#1054',
        name: 'Angelina Hose',
        email: 'angelinahose@dotcom.com',
        image: userImg12,
        items: 45,
        total: '$205.00',
        created: 'June 09, 2023',
        modified: 'August 25, 2023',
        status: 'Pending',
    },
]

const getStatusClass = (status: Order['status']) => {
    switch (status) {
        case 'Delivered':
            return 'badge bg-primary-subtle text-primary fw-semibold'
        case 'Cancelled':
            return 'badge bg-danger-subtle text-danger fw-semibold'
        case 'Pending':
            return 'badge bg-info-subtle text-info fw-semibold'
        case 'Shipped':
            return 'badge bg-warning-subtle text-warning fw-semibold'
        default:
            return ''
    }
}

const RecentOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('/admin/analytics').then(res => {
            if(res.data.success && res.data.data.recentOrders) {
                setOrders(res.data.data.recentOrders);
            }
        }).catch(err => console.error("Error fetching orders", err));
    }, []);

    return (
        <Col md={12}>
            <Card className="overflow-hidden mb-0">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Recent Order</h5>
                    </div>
                </CardHeader>

                <CardBody className="p-0">
                    <div className="table-responsive">
                        <table className="table table-traffic mb-0">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Created</th>
                                    <th>Modified</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <Link to="javascript:void(0);" className="text-muted">{order.id}</Link>
                                        </td>
                                        <td className="d-flex align-items-center">
                                            <img
                                                src={order.image}
                                                alt="user"
                                                className="avatar avatar-sm rounded-circle me-3"
                                            />
                                            <div>
                                                <p className="mb-0 fw-medium fs-14">{order.name}</p>
                                                <p className="text-muted fs-13 mb-0">{order.email}</p>
                                            </div>
                                        </td>
                                        <td><p className="mb-0">{order.items}</p></td>
                                        <td><p className="mb-0">{order.total}</p></td>
                                        <td><p className="mb-0">{order.created}</p></td>
                                        <td><p className="mb-0">{order.modified}</p></td>
                                        <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
                                        <td>
                                            <Link to="#" aria-label="anchor" className="btn btn-sm bg-primary-subtle me-1">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                                    <IconifyIcon icon="mdi:pencil-outline" className="fs-14 text-primary" />
                                                </OverlayTrigger>
                                            </Link>
                                            <Link to="#" aria-label="anchor" className="btn btn-sm bg-danger-subtle">
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                                                    <IconifyIcon icon="mdi:delete" className="fs-14 text-danger" />
                                                </OverlayTrigger>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>

                <CardFooter className="py-0 border-top">
                    <Row className="align-items-center">
                        <Col sm>
                            <div className="text-block text-center text-sm-start">
                                <span className="fw-medium">1 of 3</span>
                            </div>
                        </Col>
                        <Col className="col-sm-auto mt-3 mt-sm-0">
                            <div className="pagination gap-2 justify-content-center py-3 ps-0 pe-3">
                                <ul className="pagination mb-0">
                                    <li className="page-item disabled">
                                        <Link className="page-link me-2 rounded-2" to="javascript:void(0);"> Prev </Link>
                                    </li>
                                    <li className="page-item active">
                                        <Link className="page-link rounded-2 me-2" to="#" data-i="1" data-page="5">1</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link me-2 rounded-2" to="#" data-i="2" data-page="5">2</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link text-primary rounded-2" to="javascript:void(0);"> next </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </Col>
    )
}

export default RecentOrder
