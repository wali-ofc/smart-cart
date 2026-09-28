import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";

const truncate = (text, max = 140) => {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
};

export default function Lookbook() {
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    let cancelled = false;
    api
      .get("/products", { params: { sort: "rating", limit: 2 } })
      .then(({ data }) => {
        if (!cancelled && Array.isArray(data.products)) {
          setTopProducts(data.products.map(normalizeProduct));
        }
      })
      .catch(() => {
        if (!cancelled) setTopProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <section className="flat-spacing-6">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <span className="title">Top Rated Products</span>
          <p className="sub-title">
            Our customer favorites — the highest rated pieces in the store.
          </p>
        </div>
        <div className="top-rated-grid wow fadeInUp" data-wow-delay="0s">
          {topProducts.map((product) => (
            <div
              className="top-rated-card"
              key={product.id}
              style={{ backgroundImage: `url(${product.imgSrc})` }}
            >
              <div className="top-rated-content">
                <h3 className="top-rated-title">{product.title}</h3>
                <p className="top-rated-desc">
                  {truncate(product.description)}
                </p>
                <Link
                  to={`/product-detail/${product.id}`}
                  className="top-rated-btn"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}