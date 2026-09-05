import { products1 } from "@/data/products";
import React from "react";
import { ProductCard } from "../../shopCards/ProductCard";
import { Link } from "react-router-dom";

const categoriesToShow = [
  { id: "clothing", title: "Clothing", subtitle: "Upgrade your wardrobe with our latest clothing collection", imgSrc: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop" },
  { id: "sunglasses", title: "Sunglasses", subtitle: "Stay cool and protected with our new shades", imgSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop" },
  { id: "bags", title: "Bags", subtitle: "Carry your essentials in style with premium bags", imgSrc: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop" },
  { id: "fashion", title: "Fashion", subtitle: "Explore high-end fashion and couture pieces", imgSrc: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop" },
  { id: "accessories", title: "Accessories", subtitle: "Complete your look with our chic accessories", imgSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop" },
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
                
                {/* View All Card (Matches product card style identically) */}
                <div className="card-product fl-item">
                  <div className="card-product-wrapper">
                    <Link to={`/category/${cat.id}`} className="product-img">
                      <img
                        className="lazyload img-product"
                        src={cat.imgSrc}
                        alt={`View all ${cat.title}`}
                        width={720}
                        height={1005}
                      />
                      <img
                        className="lazyload img-hover"
                        src={cat.imgSrc}
                        alt={`View all ${cat.title}`}
                        width={720}
                        height={1005}
                      />
                    </Link>
                    <div className="list-product-btn">
                      <Link 
                        to={`/category/${cat.id}`} 
                        className="tf-btn btn-fill animate-hover-btn" 
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        View Full Category
                      </Link>
                    </div>
                  </div>
                  <div className="card-product-info text-center" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Link to={`/category/${cat.id}`} className="title link" style={{ fontSize: "16px", fontWeight: "600", marginTop: "10px", marginBottom: "5px" }}>
                      Explore {cat.title} Collection
                    </Link>
                    <Link to={`/category/${cat.id}`} className="price" style={{ textDecoration: "underline" }}>
                      View All {catProducts.length < 20 ? 20 : catProducts.length}+ Items
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
