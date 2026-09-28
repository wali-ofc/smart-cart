import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import { ProductCard } from "../productCards/ProductCard.jsx";
import { normalizeProduct } from "@/utlis/productMap";

// Spec category enum (§3.2.2) — section order follows the fixed enum
const SECTION_ORDER = [
  "Electronics & Gadgets",
  "Fashion & Apparel",
  "Beauty & Personal Care",
  "Home & Kitchen",
  "Health & Fitness",
];

const SECTION_SUBTITLES = {
  "Electronics & Gadgets": "Top-rated gear and gadgets for everyday life",
  "Fashion & Apparel": "Trending apparel and fashion essentials",
  "Beauty & Personal Care": "Beauty and personal care picks",
  "Home & Kitchen": "Upgrade your home with our kitchen collection",
  "Health & Fitness": "Stay healthy with our fitness range",
};

export default function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/products", { params: { limit: 50 } })
      .then(({ data }) => {
        if (!cancelled) {
          setProducts((data.products || []).map(normalizeProduct));
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Failed to load home products:", error);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {SECTION_ORDER.map((category, index) => {
        const catProducts = (products || [])
          .filter((p) => p.category === category)
          .slice(0, 3);
        if (!products || catProducts.length === 0) return null;
        const cover = catProducts[0].imgSrc;

        return (
          <section
            className="flat-spacing-5 flat-seller"
            key={category}
            style={{
              paddingBottom: index === SECTION_ORDER.length - 1 ? "" : "40px",
              paddingTop: index === 0 ? "" : "40px",
            }}
          >
            <div className="container">
              <div className="flat-title" style={{ marginBottom: "30px" }}>
                <span className="title wow fadeInUp" data-wow-delay="0s">
                  {category}
                </span>
                <p className="sub-title wow fadeInUp" data-wow-delay="0s">
                  {SECTION_SUBTITLES[category]}
                </p>
              </div>
              <div
                className="grid-layout wow fadeInUp"
                data-wow-delay="0s"
                data-grid="grid-4"
              >
                {catProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}

                {/* View All Card (Matches product card style identically) */}
                <div className="card-product fl-item">
                  <div
                    className="card-product-wrapper"
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <Link
                      to={`/category/${encodeURIComponent(category)}`}
                      className="product-img"
                    >
                      <img
                        className="lazyload img-product"
                        style={{ mixBlendMode: "multiply" }}
                        src={cover}
                        alt={`View all ${category}`}
                        width={720}
                        height={1005}
                      />
                      <img
                        className="lazyload img-hover"
                        style={{ mixBlendMode: "multiply" }}
                        src={cover}
                        alt={`View all ${category}`}
                        width={720}
                        height={1005}
                      />
                    </Link>
                    <div className="list-product-btn">
                      <Link
                        to={`/category/${encodeURIComponent(category)}`}
                        className="tf-btn btn-fill animate-hover-btn"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        View Full Category
                      </Link>
                    </div>
                  </div>
                  <div
                    className="card-product-info text-center"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={`/category/${encodeURIComponent(category)}`}
                      className="title link"
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginTop: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      Explore {category}
                    </Link>
                    <Link
                      to={`/category/${encodeURIComponent(category)}`}
                      className="price"
                      style={{ textDecoration: "underline" }}
                    >
                      View All Items
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}