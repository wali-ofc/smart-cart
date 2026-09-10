import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Footer1 from '@/components/footers/Footer1';
import Header2 from '@/components/headers/Header2';
import MetaComponent from '@/components/common/MetaComponent';
import SellerNav from '@/components/othersPages/dashboard/SellerNav';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

const metadata = {
  title: 'Seller Orders || SmartCart - Modern Multipurpose eCommerce',
  description: 'SmartCart - Modern Multipurpose eCommerce',
};

const STATUS_LABEL = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLORS = {
  pending: '#f0ad4e',
  processing: '#5bc0de',
  shipped: '#0275d8',
  delivered: '#5cb85c',
  cancelled: '#d9534f',
  refunded: '#6c757d',
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const shortId = (id) => String(id).slice(-6).toUpperCase();

export default function SellerOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSeller = user?.role === 'seller';

  // Status counts for the top boxes
  const [statusCounts, setStatusCounts] = useState({});
  // Order list
  const [orders, setOrders] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderPage, setOrderPage] = useState(1);
  const [orderPages, setOrderPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderError, setOrderError] = useState('');

  const loadStats = async () => {
    try {
      const { data } = await api.get('/seller/orders/stats', { params: { period: 'all' } });
      setStatusCounts(data.data?.statusCounts || {});
    } catch { /* silent */ }
  };

  const loadOrders = async (status, page) => {
    setOrderLoading(true);
    setOrderError('');
    try {
      const { data } = await api.get('/seller/orders', {
        params: { status: status || undefined, page, limit: 8 },
      });
      setOrders(data.orders || []);
      setOrderTotal(data.total || 0);
      setOrderPages(data.pages || 1);
    } catch (err) {
      setOrderError(err?.response?.data?.error || 'Could not load your orders.');
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    if (!isSeller) return;
    loadStats();
  }, [isSeller]);

  useEffect(() => {
    if (isSeller) loadOrders(statusFilter, orderPage);
  }, [isSeller, statusFilter, orderPage]);

  const onFilterChange = (value) => {
    setStatusFilter(value);
    setOrderPage(1);
  };

  // Status box definitions — only show statuses that have orders
  const statusBoxes = [
    { key: 'pending', label: 'Pending' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
    { key: 'refunded', label: 'Refunded' },
  ];

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Seller Orders</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SellerNav />
            </div>
            <div className="col-lg-9">
              <div className={`my-account-content ${isSeller ? 'account-dashboard' : ''}`}>
                {!isSeller ? (
                  <div className="text-center">
                    <h5 className="fw-5 mb_20">Seller Orders</h5>
                    <p className="mb-0">
                      This page is for sellers. Please sign in with a seller account.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Status count boxes */}
                    <div className="mb_30">
                      <h6 className="fw-5 mb_20">Order Summary</h6>
                      <div className="row g-3">
                        {statusBoxes.map((box) => (
                          <div className="col-6 col-lg-4" key={box.key}>
                            <div
                              className="p-3 border rounded-3 text-center h-100"
                              style={{ borderLeftWidth: '4px', borderLeftColor: STATUS_COLORS[box.key] }}
                            >
                              <div className="fs-4 fw-6">{statusCounts[box.key] || 0}</div>
                              <div className="small text-secondary">{box.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Orders table */}
                    <div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb_20">
                        <h6 className="fw-5 mb-0">All Orders</h6>
                        <select
                          className="form-select form-select-sm w-auto"
                          value={statusFilter}
                          onChange={(e) => onFilterChange(e.target.value)}
                          aria-label="Filter orders by status"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value || 'all'} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {orderLoading && (
                        <p className="mb-0 py-3 text-secondary">Loading orders…</p>
                      )}
                      {!orderLoading && orderError && (
                        <p className="mb-0 py-3 text-danger">{orderError}</p>
                      )}
                      {!orderLoading && !orderError && orders.length === 0 && (
                        <p className="mb-0 py-3 text-secondary">
                          {statusFilter ? 'No orders match this status.' : 'No orders yet.'}
                        </p>
                      )}
                      {!orderLoading && !orderError && orders.length > 0 && (
                        <>
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
                                {orders.map((order) => (
                                  <tr
                                    key={order._id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/seller/orders/${order._id}`)}
                                  >
                                    <td>#{shortId(order._id)}</td>
                                    <td>{order.user?.name || '—'}</td>
                                    <td>{fmtDate(order.createdAt)}</td>
                                    <td>
                                      <span
                                        className="badge"
                                        style={{
                                          backgroundColor: STATUS_COLORS[order.status] || '#6c757d',
                                          color: '#fff',
                                          fontSize: '0.75rem',
                                          padding: '4px 8px',
                                        }}
                                      >
                                        {STATUS_LABEL[order.status] || order.status}
                                      </span>
                                    </td>
                                    <td>${(order.total_price || 0).toFixed(2)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {orderPages > 1 && (
                            <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn mb-0">
                              <Pagination
                                page={orderPage}
                                pages={orderPages}
                                onChange={(p) => setOrderPage(p)}
                              />
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
