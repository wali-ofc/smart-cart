
import { useState, useEffect } from 'react';
import api from '@/helpers/api';
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row,
    Form
} from 'react-bootstrap';
import userImg11 from '@/assets/images/users/user-11.jpg'; // fallback
import IconifyIcon from '@/component/wrapper/IconifyIcon';

const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered': return 'badge bg-primary-subtle text-primary fw-semibold';
        case 'cancelled': return 'badge bg-danger-subtle text-danger fw-semibold';
        case 'pending': return 'badge bg-info-subtle text-info fw-semibold';
        case 'shipped': return 'badge bg-warning-subtle text-warning fw-semibold';
        case 'paid': return 'badge bg-success-subtle text-success fw-semibold';
        case 'processing': return 'badge bg-secondary-subtle text-secondary fw-semibold';
        default: return 'badge bg-light text-dark fw-semibold';
    }
}

const RecentOrder = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = () => {
        setLoading(true);
        // Using the dedicated orders endpoint to get all orders
        api.get('/admin/orders').then(res => {
            if(res.data.success && res.data.data) {
                setOrders(res.data.data.slice(0, 10)); // Just 10 recent
            }
        }).catch(err => console.error("Error fetching orders", err))
          .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const res = await api.put(`/admin/orders/${id}/status`, { status: newStatus });
            if (res.data.success) {
                // Update local state to reflect UI instantly
                setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
            }
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update order status");
        }
    };

    return (
        <Col md={12}>
            <Card className="overflow-hidden mb-0">
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title text-black mb-0">Recent Orders</h5>
                        <button className="btn btn-sm btn-outline-primary ms-auto" onClick={fetchOrders}>
                            <IconifyIcon icon="mdi:refresh" /> Refresh
                        </button>
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
                                    <th>Date</th>
                                    <th>Status (Click to edit)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="text-center py-4">Loading orders...</td></tr>
                                ) : orders.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center py-4">No orders found.</td></tr>
                                ) : orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <span className="text-muted">#{order._id.slice(-6).toUpperCase()}</span>
                                        </td>
                                        <td className="d-flex align-items-center">
                                            <img
                                                src={order.customerId?.profileImage || userImg11}
                                                alt="user"
                                                className="avatar avatar-sm rounded-circle me-3"
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div>
                                                <p className="mb-0 fw-medium fs-14">{order.customerId?.username || 'Unknown'}</p>
                                                <p className="text-muted fs-13 mb-0">{order.customerId?.email || 'N/A'}</p>
                                            </div>
                                        </td>
                                        <td><p className="mb-0">{order.items?.length || 0}</p></td>
                                        <td><p className="mb-0 fw-medium">$${order.totalAmount?.toFixed(2) || 0}</p></td>
                                        <td><p className="mb-0">{new Date(order.createdAt).toLocaleDateString()}</p></td>
                                        <td>
                                            <Form.Select 
                                                size="sm" 
                                                className={getStatusClass(order.status) + " border-0 shadow-none cursor-pointer"} 
                                                style={{ cursor: 'pointer' }}
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default RecentOrder;
