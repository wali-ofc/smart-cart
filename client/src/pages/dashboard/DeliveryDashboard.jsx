import React, { useEffect, useState } from 'react';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

const STATUS_LABEL = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const fmtDateTime = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function DeliveryDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  const isDelivery = user?.role === 'delivery';

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/delivery/assigned');
      setOrders(data.orders || []);
    } catch (err) {
      setError(err?.response?.data?.error || 'Could not load your assigned deliveries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDelivery) {
      load();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelivery]);

  const updateStatus = async (orderId, status) => {
    setUpdating(orderId);
    setError('');
    try {
      await api.put(`/delivery/${orderId}/status`, { status });
      await load();
    } catch (err) {
      setError(err?.response?.data?.error || 'Could not update the order status.');
    } finally {
      setUpdating(null);
    }
  };

  // Role guard — only delivery agents see the dashboard.
  if (!isDelivery) {
    return (
      <section className="flat-spacing-11">
        <div className="container">
          <div className="text-center">
            <h5 className="fw-5 mb_20">Delivery Dashboard</h5>
            <p className="mb-0">
              This dashboard is for delivery agents. Please sign in with a delivery account.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="mb_40">
          <h5 className="fw-5 mb_20">Delivery Dashboard</h5>
          <p className="mb-0">Orders assigned to you and currently in transit.</p>
        </div>

        {loading && <p className="mb-0 py-4">Loading assigned deliveries…</p>}
        {!loading && error && <p className="mb-0 py-4 text-danger">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-4">
            <p className="mb-0 fs-18">No orders are assigned to you right now.</p>
          </div>
        )}
        {!loading && !error && orders.length > 0 && (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th className="fw-6">Order</th>
                  <th className="fw-6">Customer</th>
                  <th className="fw-6">Items</th>
                  <th className="fw-6">Total</th>
                  <th className="fw-6">Placed</th>
                  <th className="fw-6">Status</th>
                  <th className="fw-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const itemCount = (order.items || []).reduce(
                    (sum, it) => sum + (it.quantity || 0),
                    0
                  );
                  return (
                    <tr key={order._id}>
                      <td>#{String(order._id).slice(-6).toUpperCase()}</td>
                      <td>{order.user?.name || '—'}</td>
                      <td>
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </td>
                      <td>${(order.total_price || 0).toFixed(2)}</td>
                      <td>{fmtDateTime(order.createdAt)}</td>
                      <td>{STATUS_LABEL[order.status] || order.status}</td>
                      <td>
                        {order.status === 'shipped' ? (
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="tf-btn btn-fill animate-hover-btn radius-3"
                              disabled={updating === order._id}
                              onClick={() => updateStatus(order._id, 'delivered')}
                            >
                              <span>Mark Delivered</span>
                            </button>
                            <button
                              type="button"
                              className="tf-btn btn-outline animate-hover-btn radius-3"
                              disabled={updating === order._id}
                              onClick={() => updateStatus(order._id, 'cancelled')}
                            >
                              <span>Cancel</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-secondary">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}