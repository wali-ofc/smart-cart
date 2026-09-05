import { products1 } from "@/data/products";
import React from "react";
import { ProductCard } from "../../shopCards/ProductCard";
import { Link } from "react-router-dom";

const categoriesToShow = [
  { id: "clothing", title: "Clothing", subtitle: "Upgrade your wardrobe with our latest clothing collection", imgSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop" },
  { id: "sunglasses", title: "Sunglasses", subtitle: "Stay cool and protected with our new shades", imgSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop" },
  { id: "bags", title: "Bags", subtitle: "Carry your essentials in style with premium bags", imgSrc: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop" },
  { id: "fashion", title: "Fashion", subtitle: "Explore high-end fashion and couture pieces", imgSrc: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop" },
  { id: "accessories", title: "Accessories", subtitle: "Complete your look with our chic accessories", imgSrc: "https://images.unsplash.com/photo-1515562141207-7a8efd3dc7f8?w=600&h=800&fit=crop" },
];

export default function Products() {
  return (
    <>
      {categoriesToShow.map((cat, index) => {
        const catProducts = products1.filter((p) => p.category === cat.id).slice(0, 3);
        if (catProducts.length === 0) return null;

        return (
          <section className="flat-spacing-5 flat-seller" key={cat.id} style={{ paddingBottom: index === categoriesToShow.length - 1 ? "" : "40px", paddingTop: index === 0 ? "" : "40px" }}>
            <div className="container">
              <div className="flat-title" style={{ marginBottom: "30px" }}>
                <span className="title wow fadeInUp" data-wow-delay="0s">
                  {cat.title}
                </span>
                <p className="sub-title wow fadeInUp" data-wow-delay="0s">
                  {cat.subtitle}
                </p>
              </div>
              <div
                className="grid-layout wow fadeInUp"
                data-wow-delay="0s"
                data-grid="grid-4"
              >
                {catProducts.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}
                
                {/* View All Card (Matches product card style) */}
                <div className="card-product fl-item">
                  <div className="card-product-wrapper" style={{ height: "100%", borderRadius: "8px", overflow: "hidden" }}>
                    <Link to={`/category/${cat.id}`} className="product-img" style={{ height: "100%", display: "block", position: "relative" }}>
                      <img
                        className="lazyload img-product"
                        src={cat.imgSrc}
                        alt={`View all ${cat.title}`}
                        width={720}
                        height={1005}
                        style={{ height: "100%", objectFit: "cover", filter: "brightness(0.4)" }}
                      />
                      <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "20px", textAlign: "center" }}>
                        <h4 style={{ color: "#fff", marginBottom: "15px", fontWeight: "600", letterSpacing: "1px" }}>{cat.title} Collection</h4>
                        <span className="tf-btn btn-line" style={{ borderColor: "#fff", color: "#fff", padding: "10px 20px", fontWeight: "500" }}>
                          View Full Category
                        </span>
                      </div>
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
