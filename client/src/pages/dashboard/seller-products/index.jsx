import React, { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';
import Footer1 from '@/components/footers/Footer1';
import Header2 from '@/components/headers/Header2';
import MetaComponent from '@/components/common/MetaComponent';
import SellerNav from '@/components/othersPages/dashboard/SellerNav';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

const metadata = {
  title: 'Seller Products || SmartCart - Modern Multipurpose eCommerce',
  description: 'SmartCart - Modern Multipurpose eCommerce',
};

const CATEGORIES = [
  'Electronics & Gadgets',
  'Fashion & Apparel',
  'Beauty & Personal Care',
  'Home & Kitchen',
  'Health & Fitness',
];

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: '',
  subCategory: '',
  image: '',
  stock: '',
  keywords: '',
};

export default function SellerProductsPage() {
  const { user } = useAuth();
  const isSeller = user?.role === 'seller';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // product being edited, null = new
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const load = async (searchTerm, pageNum) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/seller/products', {
        params: { page: pageNum, limit: 10, search: searchTerm || undefined },
      });
      setProducts(data.products || []);
      setPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err?.response?.data?.error || 'Could not load your products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSeller) load(search, page);
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSeller, page]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    load(search, 1);
  };

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setUploadError('');
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory || '',
      image: product.image,
      stock: product.stock,
      keywords: (product.keywords || []).join(', '),
    });
    setFormError('');
    setUploadError('');
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, image: data.image }));
    } catch (err) {
      setUploadError(err?.response?.data?.error || 'Failed to upload image from device.');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        keywords: form.keywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
      };
      if (editing) {
        await api.put(`/products/${editing._id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setShowForm(false);
      load(search, page);
    } catch (err) {
      const msg = err?.response?.data?.error;
      const detail = (err?.response?.data?.errors || [])
        .map((v) => v.message)
        .join(', ');
      setFormError(msg || detail || 'Could not save the product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setError('');
    try {
      await api.delete(`/products/${product._id}`);
      load(search, page);
    } catch (err) {
      setError(err?.response?.data?.error || 'Could not delete the product.');
    }
  };

  if (!isSeller) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <Header2 />
        <div className="tf-page-title">
          <div className="container-full">
            <div className="heading text-center">Seller Products</div>
          </div>
        </div>
        <section className="flat-spacing-11">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <SellerNav />
              </div>
              <div className="col-lg-9">
                <div className="my-account-content">
                  <div className="text-center">
                    <h5 className="fw-5 mb_20">Seller Products</h5>
                    <p className="mb-0">
                      This page is for sellers. Please sign in with a seller account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer1 />
      </>
    );
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Products</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SellerNav />
            </div>
            <div className="col-lg-9">
              <div className="my-account-content account-dashboard">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb_30">
          <div>
            <h5 className="fw-5 mb_10">My Products</h5>
            <p className="mb-0">{total} product{total === 1 ? '' : 's'} listed</p>
          </div>
          <button
            type="button"
            className="tf-btn btn-fill animate-hover-btn radius-3"
            onClick={openNew}
            disabled={showForm}
          >
            <span>+ Add Product</span>
          </button>
        </div>

        {showForm && (
          <div className="p-4 border rounded-3 mb_30">
            <h6 className="fw-5 mb_20">{editing ? 'Edit Product' : 'Add Product'}</h6>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small mb_8">Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={200}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small mb_8">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small mb_8">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small mb_8">Category *</label>
                  <select
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small mb_8">Sub-category</label>
                  <input
                    type="text"
                    name="subCategory"
                    className="form-control"
                    value={form.subCategory}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small mb_8">Product Image *</label>
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <label htmlFor="device-image-upload" className="form-label small text-secondary mb-1">
                        Upload from Device:
                      </label>
                      <input
                        type="file"
                        id="device-image-upload"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </div>
                    {uploading && (
                      <div className="small text-primary">Uploading image from device…</div>
                    )}
                    {uploadError && (
                      <div className="small text-danger">{uploadError}</div>
                    )}
                    <div>
                      <label className="form-label small text-secondary mb-1">
                        Image URL / Relative Path:
                      </label>
                      <input
                        type="text"
                        name="image"
                        className="form-control"
                        placeholder="/images/products/..."
                        value={form.image}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {form.image && (
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className="small text-secondary">Preview:</span>
                        <img
                          src={form.image}
                          alt="Product preview"
                          style={{ width: 60, height: 60, objectFit: 'cover' }}
                          className="rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label small mb_8">Description *</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    maxLength={2000}
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small mb_8">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    className="form-control"
                    placeholder="wireless, bluetooth, white"
                    value={form.keywords}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {formError && <p className="mb-0 mt-3 text-danger small">{formError}</p>}
              <div className="mt-4 d-flex gap-2">
                <button
                  type="submit"
                  className="tf-btn btn-fill animate-hover-btn radius-3"
                  disabled={saving}
                >
                  <span>{saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Product'}</span>
                </button>
                <button
                  type="button"
                  className="tf-btn btn-outline animate-hover-btn radius-3"
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}

        <form onSubmit={onSearchSubmit} className="mb_30">
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search your products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="tf-btn btn-fill animate-hover-btn radius-3">
              <span>Search</span>
            </button>
          </div>
        </form>

        {loading && <p className="mb-0 py-4">Loading products…</p>}
        {!loading && error && <p className="mb-0 py-4 text-danger">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="mb-0 py-4">No products found.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th className="fw-6">Product</th>
                    <th className="fw-6">Category</th>
                    <th className="fw-6">Price</th>
                    <th className="fw-6">Stock</th>
                    <th className="fw-6">Rating</th>
                    <th className="fw-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width: 44, height: 44, objectFit: 'cover' }}
                              className="rounded"
                            />
                          )}
                          <span className="fw-6">{product.name}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${(product.price || 0).toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        {product.rating?.count
                          ? `${product.rating.stars} ★ (${product.rating.count})`
                          : 'No ratings'}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="tf-btn btn-fill animate-hover-btn radius-3"
                            onClick={() => openEdit(product)}
                          >
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            className="tf-btn btn-outline animate-hover-btn radius-3"
                            onClick={() => handleDelete(product)}
                          >
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pages > 1 && (
              <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn mt-4 mb-0">
                <Pagination page={page} pages={pages} onChange={setPage} />
              </ul>
            )}
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