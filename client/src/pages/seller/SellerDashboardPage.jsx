import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import MetaComponent from '@/components/common/MetaComponent';
import SellerNav from '@/components/seller/SellerNav';
import OrderStatusChart from '@/components/seller/OrderStatusChart';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

const metadata = {
  title: 'Seller Dashboard || SmartCart - Modern Multipurpose eCommerce',
  description: 'SmartCart - Modern Multipurpose eCommerce',
};

export default function SellerDashboardPage() {
  const { user } = useAuth();
  const isSeller = user?.role === 'seller';

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSeller) {
      setLoading(false);
      return;
    }
    let active = true;
    api.get('/seller/dashboard')
      .then(({ data }) => {
        if (active) setStats(data.data || null);
      })
      .catch(() => {
        if (active) setError('Could not load your dashboard.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [isSeller]);

  let content;
  if (!isSeller) {
    content = (
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
    );
  } else if (loading) {
    content = <p className="mb-0">Loading your dashboard…</p>;
  } else if (error) {
    content = <p className="mb-0 text-danger">{error}</p>;
  } else {
    const cards = [
      { label: 'Total Revenue', value: `$${(stats?.totalRevenue || 0).toFixed(2)}` },
      { label: 'Total Orders', value: stats?.totalOrders ?? 0 },
      { label: 'Orders This Month', value: stats?.ordersThisMonth ?? 0 },
      { label: 'Products Listed', value: stats?.totalProducts ?? 0 },
      { label: 'Average Rating', value: stats?.averageRating ?? 0 },
      { label: 'Customers', value: stats?.totalCustomers ?? 0 },
    ];

    content = (
      <>
        <div className="mb_60">
          <h5 className="fw-5 mb_20">Hello {user?.name || 'Seller'}</h5>
          {user && (
            <p className="mb_16">
              Signed in as <strong>{user.email}</strong>
              <span className="text_primary text-capitalize"> (seller)</span>
            </p>
          )}
          <p>
            From your seller dashboard you can manage your{' '}
            <Link className="text_primary" to={`/seller/products`}>
              products
            </Link>
            , view{' '}
            <Link className="text_primary" to={`/seller/orders`}>
              orders
            </Link>
            , and explore{' '}
            <Link className="text_primary" to={`/seller/ai-predictions`}>
              AI demand predictions
            </Link>{' '}
            for your store.
          </p>
        </div>

        <div className="mb_30">
          <h6 className="fw-5 mb_20">Store Overview</h6>
          <div className="row g-3">
            {cards.map((card) => (
              <div className="col-6 col-lg-4" key={card.label}>
                <div className="p-3 border rounded-3 text-center h-100">
                  <div className="fs-4 fw-6">{card.value}</div>
                  <div className="small text-secondary">{card.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <OrderStatusChart />
      </>
    );
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Seller Dashboard</div>
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
