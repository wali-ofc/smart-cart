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

  // Which order card is expanded (null = none)
  const [expandedId, setExpandedId] = useState(null);

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
        const assignedAgent = o.delivery_agent?._id
          ? String(o.delivery_agent._id)
          : '';
        if (!next[o._id]) {
          next[o._id] = {
            status: o.status,
            agent: assignedAgent,
            saving: false,
            msg: '',
          };
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
    const currentAgent = order.delivery_agent?._id
      ? String(order.delivery_agent._id)
      : '';

    // Only send if something changed
    if (newStatus === order.status && agent === currentAgent) {
      updateEdit(order._id, 'msg', 'No changes to save.');
      return;
    }

    updateEdit(order._id, 'saving', true);
    updateEdit(order._id, 'msg', '');

    try {
      const payload = { status: newStatus };
      if (agent) payload.delivery_agent = agent;

      await api.put(`/orders/${order._id}/status`, payload);

      // Update the local order list to reflect the new status + courier
      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id
            ? {
                ...o,
                status: newStatus,
                delivery_agent: agent
                  ? { ...(o.delivery_agent || {}), _id: agent }
                  : o.delivery_agent,
              }
            : o
        )
      );
      updateEdit(order._id, 'msg', 'Saved!');
    } catch (err) {
      updateEdit(order._id, 'msg', err?.response?.data?.error || 'Could not update order.');
    } finally {
      updateEdit(order._id, 'saving', false);
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedId((prev) => (prev === orderId ? null : orderId));
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

                    {/* Orders list (expandable) */}
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
                          <div className="d-flex flex-column gap-3">
                            {orders.map((order) => {
                              const isExpanded = expandedId === order._id;
                              const edit = edits[order._id] || {
                                status: order.status,
                                agent: order.delivery_agent?._id ? String(order.delivery_agent._id) : '',
                                saving: false,
                                msg: '',
                              };
                              const allowed = getAllowedTransitions(order.status);
                              const courierName = order.delivery_agent?.name || order.delivery_agent?.email || '';

                              return (
                                <div
                                  key={order._id}
                                  className="border rounded-3 overflow-hidden"
                                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}
                                >
                                  {/* Collapsed / header row — click to expand */}
                                  <button
                                    type="button"
                                    onClick={() => toggleExpand(order._id)}
                                    className="w-100 bg-white border-0 text-start px-3 py-3 d-flex align-items-center justify-content-between gap-3"
                                    style={{ cursor: 'pointer' }}
                                    aria-expanded={isExpanded}
                                  >
                                    <div className="d-flex align-items-center gap-3 flex-wrap">
                                      <span className="fw-6">#{shortId(order._id)}</span>
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
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                      <span className="small text-secondary d-none d-md-inline">
                                        {order.user?.name || '—'} · {fmtDate(order.createdAt)}
                                      </span>
                                      <span className="fw-6">
                                        ${(order.total_price || 0).toFixed(2)}
                                      </span>
                                      <i
                                        className="icon icon-arrow-right"
                                        style={{ transition: 'transform .2s', transform: isExpanded ? 'rotate(90deg)' : 'none' }}
                                      />
                                    </div>
                                  </button>

                                  {/* Expanded panel */}
                                  {isExpanded && (
                                    <div className="border-top bg-light p-3">
                                      <div className="row g-3 mb-3">
                                        <div className="col-md-4">
                                          <div className="small text-secondary mb-1">Customer</div>
                                          <div className="fw-6">{order.user?.name || '—'}</div>
                                          <div className="small text-secondary">{order.user?.email || ''}</div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="small text-secondary mb-1">Shipping Address</div>
                                          <div className="fw-6">
                                            {order.shipping_address?.street}, {order.shipping_address?.city},{' '}
                                            {order.shipping_address?.state} {order.shipping_address?.zip_code}
                                          </div>
                                          <div className="small text-secondary">
                                            {order.shipping_address?.country}
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="small text-secondary mb-1">Payment</div>
                                          <div className="fw-6 text-capitalize">{order.payment_method}</div>
                                          <div className="small text-secondary">
                                            Total: ${(order.total_price || 0).toFixed(2)}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Items */}
                                      <div className="bg-white border rounded-3 mb-3 p-3">
                                        <div className="small fw-6 text-secondary mb-2">Items</div>
                                        {order.items?.map((item, idx) => (
                                          <div
                                            key={idx}
                                            className="d-flex align-items-center justify-content-between gap-3 py-1"
                                          >
                                            <span>{item.name}</span>
                                            <span className="small text-secondary">
                                              {item.quantity} × ${(item.price || 0).toFixed(2)} ={' '}
                                              <span className="fw-6 text-dark">
                                                ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                                              </span>
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Status + courier controls */}
                                      <div className="bg-white border rounded-3 p-3">
                                        <div className="row g-3 align-items-end">
                                          <div className="col-md-4">
                                            <label className="form-label small text-secondary">
                                              Order status
                                            </label>
                                            {allowed.length > 0 ? (
                                              <div className="select-custom">
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
                                            ) : (
                                              <div className="text-secondary small pt-2">
                                                No further changes available.
                                              </div>
                                            )}
                                          </div>
                                          <div className="col-md-4">
                                            <label className="form-label small text-secondary">
                                              Delivery driver (courier)
                                            </label>
                                            <div className="select-custom">
                                              <select
                                                className="tf-select"
                                                value={edit.agent}
                                                onChange={(e) => updateEdit(order._id, 'agent', e.target.value)}
                                                disabled={edit.saving}
                                                aria-label={`Assign courier for order ${shortId(order._id)}`}
                                              >
                                                <option value="">
                                                  {courierName ? `${courierName} (assigned)` : 'Select courier…'}
                                                </option>
                                                {agents
                                                  .filter((a) => !(a._id === edit.agent))
                                                  .map((a) => (
                                                    <option key={a._id} value={a._id}>
                                                      {a.name || a.email}
                                                    </option>
                                                  ))}
                                              </select>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <button
                                              type="button"
                                              className="tf-btn btn-fill animate-hover-btn radius-3 w-100"
                                              onClick={() => handleSave(order)}
                                              disabled={edit.saving}
                                            >
                                              <span>{edit.saving ? 'Saving…' : 'Update order'}</span>
                                            </button>
                                            {edit.msg && (
                                              <div
                                                className={`small mt-2 text-center ${
                                                  edit.msg === 'Saved!' || edit.msg === 'No changes to save.'
                                                    ? 'text-success'
                                                    : 'text-danger'
                                                }`}
                                              >
                                                {edit.msg}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {orderPages > 1 && (
                            <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn mb-0 mt-3">
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