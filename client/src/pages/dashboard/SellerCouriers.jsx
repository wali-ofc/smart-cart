import React, { useEffect, useState } from 'react';
import MetaComponent from '@/components/common/MetaComponent';
import Header2 from '@/components/headers/Header2';
import Footer1 from '@/components/footers/Footer1';
import SellerNav from '@/components/othersPages/dashboard/SellerNav';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

const metadata = {
  title: 'Seller Couriers || SmartCart - Modern Multipurpose eCommerce',
  description: 'SmartCart - Modern Multipurpose eCommerce',
};

const EMPTY_FORM = { name: '', email: '', password: '' };

export default function SellerCouriers() {
  const { user } = useAuth();
  const isSeller = user?.role === 'seller';

  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadCouriers = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/seller/delivery-agents');
      setCouriers(data.agents || []);
    } catch (err) {
      setError(err?.response?.data?.error || 'Could not load couriers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSeller) loadCouriers();
  }, [isSeller]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormMsg('');
    setSaving(true);
    try {
      const { data } = await api.post('/seller/delivery-agents', form);
      setCouriers((prev) => [...prev, data.agent]);
      setForm(EMPTY_FORM);
      setFormMsg('Courier added!');
    } catch (err) {
      setFormError(err?.response?.data?.error || 'Could not add courier.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this courier? They will no longer be able to sign in as a delivery driver.')) return;
    setDeletingId(id);
    try {
      await api.delete(`/seller/delivery-agents/${id}`);
      setCouriers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err?.response?.data?.error || 'Could not remove courier.');
    } finally {
      setDeletingId(null);
    }
  };

  const setField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFormError('');
    setFormMsg('');
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Seller Couriers</div>
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
                    <h5 className="fw-5 mb_20">Seller Couriers</h5>
                    <p className="mb-0">
                      This page is for sellers. Please sign in with a seller account.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Add courier form */}
                    <div className="mb_40">
                      <h6 className="fw-5 mb_20">Add a Courier (Delivery Driver)</h6>
                      <div className="p-4 border rounded-3">
                        <form onSubmit={handleAdd} className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label small text-secondary mb-1">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. Imran Khan"
                              value={form.name}
                              onChange={setField('name')}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label small text-secondary mb-1">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="driver@smartcart.local"
                              value={form.email}
                              onChange={setField('email')}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label small text-secondary mb-1">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="At least 6 characters"
                              value={form.password}
                              onChange={setField('password')}
                              minLength={6}
                              required
                            />
                          </div>
                          <div className="col-12 d-flex align-items-center gap-3">
                            <button
                              type="submit"
                              className="tf-btn btn-fill animate-hover-btn radius-3"
                              disabled={saving}
                            >
                              <span>{saving ? 'Adding…' : 'Add Courier'}</span>
                            </button>
                            {formMsg && <span className="small text-success">{formMsg}</span>}
                            {formError && <span className="small text-danger">{formError}</span>}
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Courier table */}
                    <div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb_20">
                        <h6 className="fw-5 mb-0">Courier List</h6>
                      </div>

                      {loading && <p className="mb-0 py-3 text-secondary">Loading couriers…</p>}
                      {!loading && error && <p className="mb-0 py-3 text-danger">{error}</p>}
                      {!loading && !error && couriers.length === 0 && (
                        <p className="mb-0 py-3 text-secondary">
                          No couriers yet. Add your first delivery driver above.
                        </p>
                      )}
                      {!loading && !error && couriers.length > 0 && (
                        <div className="table-responsive">
                          <table className="table align-middle">
                            <thead>
                              <tr>
                                <th className="fw-6">Name</th>
                                <th className="fw-6">Email</th>
                                <th className="fw-6">Joined</th>
                                <th className="fw-6"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {couriers.map((c) => (
                                <tr key={c._id}>
                                  <td className="fw-6">{c.name || '—'}</td>
                                  <td>{c.email}</td>
                                  <td>
                                    {c.createdAt
                                      ? new Date(c.createdAt).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                        })
                                      : '—'}
                                  </td>
                                  <td className="text-end">
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => handleDelete(c._id)}
                                      disabled={deletingId === c._id}
                                    >
                                      {deletingId === c._id ? 'Removing…' : 'Remove'}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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