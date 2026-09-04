import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { slides } from "@/data/heroslides";
import { Link } from "react-router-dom";
import React from "react";

export default function Hero() {
  return (
    <div className="tf-slideshow slider-effect-fade position-relative">
      <style>{`
        .custom-hero-slider {
          height: 85vh !important;
          min-height: 600px !important;
        }
        .custom-hero-slider img {
          object-position: 85% top !important;
        }
        @media (max-width: 768px) {
          .custom-hero-slider {
            height: 50vh !important;
            min-height: 320px !important;
          }
          .custom-hero-slider img {
            object-position: 85% 30% !important;
          }
        }
      `}</style>
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        modules={[Pagination]}
        pagination={{ clickable: true, el: ".sp1" }}
        speed={1000}
      >
        {slides.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wrap-slider custom-hero-slider">
              <img
                alt="fashion-slideshow"
                src={slide.imgSrc}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="box-content">
                <div className="container">
                  <h1 className="fade-item fade-item-1">
                    {slide.title.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="fade-item fade-item-2">{slide.text}</p>
                  <Link
                    to={`/shop-default`}
                    className="fade-item fade-item-3 tf-btn btn-fill animate-hover-btn btn-xl radius-3"
                  >
                    <span>{slide.btnText}</span>
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sp1 sw-pagination-slider justify-content-center" />
        </div>
      </div>
    </div>
  );
}
