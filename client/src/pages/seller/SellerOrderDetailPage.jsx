import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomSelect from '@/components/common/CustomSelect';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import MetaComponent from '@/components/common/MetaComponent';
import SellerNav from '@/components/seller/SellerNav';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

const metadata = {
  title: 'Order Details || SmartCart - Modern Multipurpose eCommerce',
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

// Allowed seller status moves — mirrors the server's SELLER_TRANSITIONS.
const SELLER_ACTIONS = {
  pending: ['processing', 'shipped', 'cancelled'],
  processing: ['shipped', 'refunded', 'cancelled'],
  shipped: ['refunded', 'cancelled'],
  delivered: ['refunded', 'cancelled'],
};

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'cancelled', label: 'Cancelled' },
];

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const shortId = (id) => String(id).slice(-6).toUpperCase();

export default function SellerOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSeller = user?.role === 'seller';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (!isSeller || !id) {
      setLoading(false);
      return;
    }
    let active = true;
    api.get(`/seller/orders/${id}`)
      .then(({ data }) => {
        if (active) {
          setOrder(data.data || null);
          setSelectedStatus(data.data?.status || '');
        }
      })
      .catch((err) => {
        if (active) setError(err?.response?.data?.error || 'Could not load order details.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id, isSeller]);

  const handleSave = async () => {
    if (!selectedStatus || selectedStatus === order.status) return;
    setSaving(true);
    setSaveMsg('');
    try {
      await api.put(`/orders/${id}/status`, { status: selectedStatus });
      setOrder((prev) => ({ ...prev, status: selectedStatus }));
      setSaveMsg('Status updated successfully.');
    } catch (err) {
      setSaveMsg(err?.response?.data?.error || 'Could not update status.');
    } finally {
      setSaving(false);
    }
  };

  const allowedTransitions = SELLER_ACTIONS[order?.status] || [];

  let content;
  if (!isSeller) {
    content = (
      <div className="text-center">
        <h5 className="fw-5 mb_20">Order Details</h5>
        <p className="mb-0">Please sign in with a seller account to view orders.</p>
      </div>
    );
  } else if (loading) {
    content = <p className="mb-0">Loading order details…</p>;
  } else if (error) {
    content = <p className="mb-0 text-danger">{error}</p>;
  } else if (!order) {
    content = <p className="mb-0 text-secondary">Order not found.</p>;
  } else {
    content = (
      <>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb_30">
          <div>
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate('/seller/orders')}
            >
              &larr; Back to Orders
            </button>
            <h5 className="fw-5 mb_0 mt-2">Order #{shortId(order._id)}</h5>
          </div>
        </div>

        {/* Order info grid */}
        <div className="row g-3 mb_30">
          <div className="col-md-6">
            <div className="p-3 border rounded-3 h-100">
              <div className="small text-secondary mb-1">Customer</div>
              <div className="fw-6">{order.user?.name || '—'}</div>
              <div className="small text-secondary">{order.user?.email || ''}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border rounded-3 h-100">
              <div className="small text-secondary mb-1">Order Date</div>
              <div className="fw-6">{fmtDate(order.createdAt)}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border rounded-3 h-100">
              <div className="small text-secondary mb-1">Shipping Address</div>
              <div className="fw-6">
                {order.shipping_address?.street}, {order.shipping_address?.city},{' '}
                {order.shipping_address?.state} {order.shipping_address?.zip_code}
              </div>
              <div className="small text-secondary">{order.shipping_address?.country}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border rounded-3 h-100">
              <div className="small text-secondary mb-1">Payment</div>
              <div className="fw-6 text-capitalize">{order.payment_method}</div>
              <div className="small text-secondary">
                Total: ${(order.total_price || 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb_30">
          <h6 className="fw-5 mb_20">Items</h6>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th className="fw-6">Product</th>
                  <th className="fw-6">Price</th>
                  <th className="fw-6">Qty</th>
                  <th className="fw-6">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>${(item.price || 0).toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status update */}
        <div className="mb_30">
          <h6 className="fw-5 mb_20">Update Status</h6>
          <div className="p-3 border rounded-3">
            <div className="row align-items-end g-3">
              <div className="col-md-4">
                <label className="form-label small text-secondary">Current Status</label>
                <div className="fw-6">{STATUS_LABEL[order.status] || order.status}</div>
              </div>
              <div className="col-md-4">
                <label className="form-label small text-secondary" htmlFor="order-detail-status">New Status</label>
                {allowedTransitions.length > 0 ? (
                  <CustomSelect
                    id="order-detail-status"
                    name="order-status"
                    options={STATUS_OPTIONS}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    placeholder="Select status"
                    disabled={saving}
                  />
                ) : (
                  <div className="text-secondary small">No status changes available.</div>
                )}
              </div>
              <div className="col-md-4">
                {allowedTransitions.length > 0 && (
                  <button
                    type="button"
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100"
                    onClick={handleSave}
                    disabled={saving || selectedStatus === order.status}
                  >
                    <span>{saving ? 'Saving…' : 'Save Status'}</span>
                  </button>
                )}
              </div>
            </div>
            {saveMsg && (
              <div className={`mt-3 small ${saveMsg.includes('success') ? 'text-success' : 'text-danger'}`}>
                {saveMsg}
              </div>
            )}
          </div>
        </div>

        {order.notes && (
          <div className="mb_30">
            <h6 className="fw-5 mb_20">Notes</h6>
            <div className="p-3 border rounded-3">
              <p className="mb-0">{order.notes}</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Order Details</div>
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
                {content}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
