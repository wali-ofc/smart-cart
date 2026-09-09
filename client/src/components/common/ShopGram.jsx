import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";
import { useContextElement } from "@/context/Context";
export default function ShopGram({ parentClass = "flat-spacing-7" }) {
  const { setQuickAddItem } = useContextElement();
  const [items, setItems] = useState([]);
  useEffect(() => {
    let cancelled = false;
    api
      .get("/products", { params: { limit: 8 } })
      .then(({ data }) => {
        if (!cancelled && Array.isArray(data.products)) {
          setItems(data.products.map(normalizeProduct));
        }
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <section className={parentClass}>
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <span className="title">Shop Gram</span>
          <p className="sub-title">
            Inspire and let yourself be inspired, from one unique fashion to
            another.
          </p>
        </div>
        <div className="wrap-carousel wrap-shop-gram">
          <Swiper
            dir="ltr"
            spaceBetween={7} // Equivalent to data-space-lg
            slidesPerView={5} // Equivalent to data-preview
            breakpoints={{
              1024: {
                slidesPerView: 5, // Equivalent to data-tablet
                spaceBetween: 7, // Equivalent to data-space-md
              },
              640: {
                slidesPerView: 3, // Equivalent to data-tablet
                spaceBetween: 7, // Equivalent to data-space-md
              },
              0: {
                slidesPerView: 2, // Equivalent to data-mobile
                spaceBetween: 7, // Equivalent to data-space-md
              },
            }}
            modules={[Pagination]}
            pagination={{ clickable: true, el: ".spd105" }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="gallery-item hover-img wow fadeInUp"
                  data-wow-delay="0s"
                >
                  <div className="img-style">
                    <img
                      className="lazyload img-hover"
                      data-src={item.imgSrc}
                      src={item.imgSrc}
                      alt={item.title}
                      width={400}
                      height={400}
                    />
                  </div>
                  <a
                    href="#quick_add"
                    onClick={() => setQuickAddItem(item.id)}
                    data-bs-toggle="modal"
                    className="box-icon"
                  >
                    <span className="icon icon-bag" />
                    <span className="tooltip">Quick add</span>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="sw-dots sw-pagination-gallery justify-content-center spd105" />
        </div>
      </div>
    </section>
  );
}