import React, { useEffect, useState, useCallback } from 'react';
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

// Allowed seller status transitions (mirrors server SELLER_TRANSITIONS)
const SELLER_TRANSITIONS = {
  pending: ['processing', 'shipped', 'cancelled'],
  processing: ['shipped', 'refunded', 'cancelled'],
  shipped: ['refunded', 'cancelled'],
  delivered: ['refunded', 'cancelled'],
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const shortId = (id) => String(id).slice(-6).toUpperCase();

export default function SellerOrders() {
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

  // Delivery agents for courier dropdown
  const [agents, setAgents] = useState([]);

  // Per-order inline editing state: { [orderId]: { status, agent, saving, msg } }
  const [edits, setEdits] = useState({});

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

  const loadAgents = async () => {
    try {
      const { data } = await api.get('/seller/delivery-agents');
      setAgents(data.agents || []);
    } catch { /* silent */ }
  };

  useEffect(() => {
    if (!isSeller) return;
    loadStats();
    loadAgents();
  }, [isSeller]);

  useEffect(() => {
    if (isSeller) loadOrders(statusFilter, orderPage);
  }, [isSeller, statusFilter, orderPage]);

  const onFilterChange = (value) => {
    setStatusFilter(value);
    setOrderPage(1);
  };

  // Initialize inline edit state when orders load
  useEffect(() => {
    setEdits((prev) => {
      const next = { ...prev };
      orders.forEach((o) => {
        if (!next[o._id]) {
          next[o._id] = { status: o.status, agent: '', saving: false, msg: '' };
        } else {
          // Sync status from server if not currently being edited
          next[o._id] = { ...next[o._id], status: o.status };
        }
      });
      return next;
    });
  }, [orders]);

  const updateEdit = useCallback((orderId, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [field]: value, msg: '' },
    }));
  }, []);

  const handleSave = async (order) => {
    const edit = edits[order._id];
    if (!edit || edit.saving) return;

    const newStatus = edit.status;
    const agent = edit.agent || undefined;

    // Only send if something changed
    if (newStatus === order.status && !agent) {
      updateEdit(order._id, 'msg', 'No changes to save.');
      return;
    }

    updateEdit(order._id, 'saving', true);
    updateEdit(order._id, 'msg', '');

    try {
      const payload = { status: newStatus };
      if (agent) payload.delivery_agent = agent;

      await api.put(`/orders/${order._id}/status`, payload);

      // Update the local order list to reflect the new status
      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id ? { ...o, status: newStatus } : o
        )
      );
      updateEdit(order._id, 'msg', 'Saved!');
    } catch (err) {
      updateEdit(order._id, 'msg', err?.response?.data?.error || 'Could not update order.');
    } finally {
      updateEdit(order._id, 'saving', false);
    }
  };

  // Allowed transitions for an order's current status
  const getAllowedTransitions = (currentStatus) =>
    SELLER_TRANSITIONS[currentStatus] || [];

  // Status box definitions
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
                        <div className="select-custom select-sm w-auto">
                          <select
                            className="tf-select"
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
                                  <th className="fw-6">Total</th>
                                  <th className="fw-6" style={{ minWidth: 120 }}>Status</th>
                                  <th className="fw-6" style={{ minWidth: 140 }}>Courier</th>
                                  <th className="fw-6"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((order) => {
                                  const edit = edits[order._id] || { status: order.status, agent: '', saving: false, msg: '' };
                                  const allowed = getAllowedTransitions(order.status);
                                  const hasChanges = edit.status !== order.status || edit.agent;
                                  const showCourier = edit.status === 'shipped' && !order.delivery_agent;

                                  return (
                                    <tr key={order._id}>
                                      <td>
                                        <span className="fw-6">#{shortId(order._id)}</span>
                                      </td>
                                      <td>{order.user?.name || '—'}</td>
                                      <td>{fmtDate(order.createdAt)}</td>
                                      <td>${(order.total_price || 0).toFixed(2)}</td>
                                      <td>
                                        <div className="d-flex align-items-center gap-2">
                                          <span
                                            className="badge"
                                            style={{
                                              backgroundColor: STATUS_COLORS[order.status] || '#6c757d',
                                              color: '#fff',
                                              fontSize: '0.7rem',
                                              padding: '3px 6px',
                                            }}
                                          >
                                            {STATUS_LABEL[order.status] || order.status}
                                          </span>
                                          {allowed.length > 0 && (
                                            <div className="select-custom select-sm" style={{ minWidth: 120 }}>
                                              <select
                                                className="tf-select"
                                                value={edit.status}
                                                onChange={(e) => updateEdit(order._id, 'status', e.target.value)}
                                                disabled={edit.saving}
                                                aria-label={`Change status for order ${shortId(order._id)}`}
                                              >
                                                <option value={order.status}>
                                                  {STATUS_LABEL[order.status] || order.status} (current)
                                                </option>
                                                {allowed.map((s) => (
                                                  <option key={s} value={s}>{STATUS_LABEL[s] || s}</option>
                                                ))}
                                              </select>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        {showCourier ? (
                                          <div className="select-custom select-sm" style={{ minWidth: 130 }}>
                                            <select
                                              className="tf-select"
                                              value={edit.agent}
                                              onChange={(e) => updateEdit(order._id, 'agent', e.target.value)}
                                              disabled={edit.saving}
                                              aria-label={`Assign courier for order ${shortId(order._id)}`}
                                            >
                                              <option value="">Select courier…</option>
                                              {agents.map((a) => (
                                                <option key={a._id} value={a._id}>{a.name || a.email}</option>
                                              ))}
                                            </select>
                                          </div>
                                        ) : order.delivery_agent ? (
                                          <span className="small text-secondary">Assigned</span>
                                        ) : (
                                          <span className="small text-muted">—</span>
                                        )}
                                      </td>
                                      <td>
                                        {allowed.length > 0 && hasChanges && (
                                          <button
                                            type="button"
                                            className="tf-btn btn-fill animate-hover-btn radius-3"
                                            style={{ fontSize: '0.8rem', padding: '4px 12px' }}
                                            onClick={() => handleSave(order)}
                                            disabled={edit.saving}
                                          >
                                            <span>{edit.saving ? '…' : 'Save'}</span>
                                          </button>
                                        )}
                                        {edit.msg && (
                                          <div
                                            className={`small mt-1 ${edit.msg === 'Saved!' || edit.msg === 'No changes to save.' ? 'text-success' : 'text-danger'}`}
                                            style={{ fontSize: '0.7rem' }}
                                          >
                                            {edit.msg}
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
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
