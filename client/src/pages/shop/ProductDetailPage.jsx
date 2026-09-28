import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";

import RelatedProducts from "@/components/product/RelatedProducts.jsx";
import RecentProducts from "@/components/product/RecentProducts.jsx";
import ProductDetailTabs from "@/components/product/ProductDetailTabs.jsx";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductDetailZoom from "@/components/product/ProductDetailZoom.jsx";
import MetaComponent from "@/components/common/MetaComponent";
import api from "@/api/axios";
import { useCart } from "@/context/CartContext";
import { normalizeProduct } from "@/utlis/productMap";

const metadata = {
  title: "Shop Details || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const { cartVersion } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevVersionRef = useRef(cartVersion);

  useEffect(() => {
    let cancelled = false;
    // a cartVersion bump is a background refresh — keep the current product on
    // screen (no loader flash); only a fresh id navigation shows "Loading…"
    if (prevVersionRef.current === cartVersion) {
      setLoading(true);
      setError(null);
    }
    prevVersionRef.current = cartVersion;
    api
      .get(`/products/${id}`)
      .then(({ data }) => {
        if (!cancelled) {
          setProduct(normalizeProduct(data.data));
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err?.response?.data?.error || "Could not load this product"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, cartVersion]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link to={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">
                {product?.title || (loading ? "Loading..." : "Product")}
              </span>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <section className="flat-spacing-4 pt_0">
          <div className="container">
            <div className="text-center fs-18 py-5">Loading product...</div>
          </div>
        </section>
      ) : error || !product ? (
        <section className="flat-spacing-4 pt_0">
          <div className="container">
            <div className="text-center fs-18 py-5">
              {error || "Product not found."}
            </div>
          </div>
        </section>
      ) : (
        <>
          <ProductDetailZoom product={product} />
          <ProductDetailTabs product={product} />
          <RelatedProducts category={product.category} />
          <RecentProducts />
        </>
      )}
      <Footer />
    </>
  );
}