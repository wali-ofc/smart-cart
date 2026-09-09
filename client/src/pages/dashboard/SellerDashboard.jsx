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

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function SellerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isSeller = user?.role === 'seller';

  useEffect(() => {
    if (!isSeller) {
      setLoading(false);
      return;
    }
    let active = true;
    api
      .get('/seller/dashboard')
      .then(({ data }) => {
        if (active) setStats(data.data || null);
      })
      .catch(() => {
        if (active) setError('Could not load your dashboard.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [isSeller]);

  if (!isSeller) {
    return (
      <section className="flat-spacing-11">
        <div className="container">
          <div className="text-center">
            <h5 className="fw-5 mb_20">Seller Dashboard</h5>
            <p className="mb-0">
              This dashboard is for sellers. Please sign in with a seller account.
            </p>
            <div className="mt_30">
              <a
                href="#register"
                data-bs-toggle="modal"
                className="tf-btn btn-fill animate-hover-btn radius-3"
              >
                <span>Become a Seller</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="flat-spacing-11">
        <div className="container">
          <p className="mb-0">Loading your dashboard…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flat-spacing-11">
        <div className="container">
          <p className="mb-0 text-danger">{error}</p>
        </div>
      </section>
    );
  }

  const cards = [
    { label: 'Total Revenue', value: `$${(stats?.totalRevenue || 0).toFixed(2)}` },
    { label: 'Total Orders', value: stats?.totalOrders ?? 0 },
    { label: 'Orders This Month', value: stats?.ordersThisMonth ?? 0 },
    { label: 'Products Listed', value: stats?.totalProducts ?? 0 },
    { label: 'Average Rating', value: stats?.averageRating ?? 0 },
    { label: 'Customers', value: stats?.totalCustomers ?? 0 },
  ];

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="mb_40">
          <h5 className="fw-5 mb_20">Seller Dashboard</h5>
          <p className="mb-0">An overview of your store's performance.</p>
        </div>

        <div className="row g-3 mb_40">
          {cards.map((card) => (
            <div className="col-6 col-lg-2" key={card.label}>
              <div className="p-3 border rounded-3 text-center h-100">
                <div className="fs-4 fw-6">{card.value}</div>
                <div className="small text-secondary">{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb_30">
          <h6 className="fw-5 mb_20">Recent Orders</h6>
          {stats?.recentOrders?.length > 0 ? (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th className="fw-6">Order</th>
                    <th className="fw-6">Customer</th>
                    <th className="fw-6">Date</th>
                    <th className="fw-6">Status</th>
                    <th className="fw-6">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>#{String(order._id).slice(-6).toUpperCase()}</td>
                      <td>{order.user?.name || '—'}</td>
                      <td>{fmtDate(order.createdAt)}</td>
                      <td>{STATUS_LABEL[order.status] || order.status}</td>
                      <td>${(order.total_price || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mb-0 text-secondary">No orders yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}