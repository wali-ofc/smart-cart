import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";
import { Pagination } from "swiper/modules";

const truncate = (text, max = 110) => {
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
      <div className="flat-title wow fadeInUp" data-wow-delay="0s">
        <span className="title">Top Rated Products</span>
        <p className="sub-title">
          Our customer favorites — the highest rated pieces in the store.
        </p>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-sw-lookbook"
        spaceBetween={0} // Equivalent to data-space-lg and data-space-md
        slidesPerView={2} // Equivalent to data-preview
        breakpoints={{
          1024: {
            slidesPerView: 2, // Equivalent to data-tablet
            spaceBetween: 0, // Equivalent to data-space-md
          },
          640: {
            slidesPerView: 1, // Equivalent to data-mobile
            spaceBetween: 0, // Equivalent to data-space-md
          },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true, el: ".spd110" }}
      >
        {topProducts.map((product) => (
          <SwiperSlide className="swiper-slide" key={product.id}>
            <div className="wrap-lookbook">
              <div
                className="image"
                style={{ aspectRatio: "800 / 585", overflow: "hidden" }}
              >
                <img
                  className="lazyload"
                  data-src={product.imgSrc}
                  alt={product.title}
                  src={product.imgSrc}
                  width="800"
                  height="585"
                />
              </div>
              <div className="position-absolute bottom-0 start-0 end-0 p-4 bg-white">
                <Link
                  className="link text-1 fw-6 d-inline-block mb-2"
                  to={`/product-detail/${product.id}`}
                >
                  {product.title}
                </Link>
                <p className="text-2 text_black-2 mb-3">
                  {truncate(product.description)}
                </p>
                <Link
                  to={`/product-detail/${product.id}`}
                  className="tf-btn btn-fill btn-sm radius-3 fw-6"
                >
                  See details
                  <i className="icon icon-arrow1-top-left" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="wrap-pagination">
          <div className="container-full">
            <div className="sw-dots sw-pagination-lookbook justify-content-center spd110" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}