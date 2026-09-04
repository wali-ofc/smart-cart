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
          height: 90vh !important;
          min-height: 600px !important;
          position: relative;
        }
        .custom-hero-slider img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top !important;
        }
        .bellroy-content {
          position: absolute !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          left: 0;
          right: 0;
          text-align: left !important;
          z-index: 10;
        }
        .bellroy-content .container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .bellroy-heading {
          font-size: 6vw !important;
          font-weight: 900 !important;
          font-family: 'Poppins', sans-serif !important;
          text-transform: uppercase !important;
          line-height: 1.05 !important;
          color: #ffffff !important;
          margin-bottom: 35px !important;
          letter-spacing: -1px !important;
        }
        .bellroy-btn {
          background-color: #d15024 !important;
          color: #ffffff !important;
          text-transform: uppercase !important;
          font-weight: 800 !important;
          font-size: 14px !important;
          letter-spacing: 1.5px !important;
          padding: 16px 36px !important;
          border-radius: 3px !important;
          display: inline-block !important;
          border: none !important;
          text-decoration: none !important;
        }
        .bellroy-subtext {
          display: none !important;
        }

        /* Custom Pagination mimicking Bellroy */
        .tf-slideshow .wrap-pagination {
          bottom: 40px !important;
        }
        .tf-slideshow .sw-pagination-slider {
          justify-content: center !important;
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
        }
        .tf-slideshow .swiper-pagination-bullet {
          background: transparent !important;
          border: 2px solid #ffffff !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          margin: 0 !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
        }
        .tf-slideshow .swiper-pagination-bullet-active {
          background: #ffffff !important;
          width: 26px !important;
          border-radius: 10px !important;
        }

        /* Mobile Overrides */
        @media (max-width: 768px) {
          .custom-hero-slider {
            height: 85vh !important;
            min-height: 500px !important;
          }
          .custom-hero-slider img {
            object-position: center top !important;
          }
          .bellroy-content {
            top: auto !important;
            bottom: 12% !important;
            transform: none !important;
          }
          .bellroy-heading {
            font-size: 14vw !important;
            margin-bottom: 25px !important;
          }
          .bellroy-btn {
            padding: 14px 28px !important;
            font-size: 13px !important;
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
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobileImgSrc || slide.imgSrc} />
                <img
                  alt="fashion-slideshow"
                  src={slide.imgSrc}
                />
              </picture>
              <div className="bellroy-content">
                <div className="container">
                  <h1 className="fade-item fade-item-1 bellroy-heading">
                    {slide.title.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="fade-item fade-item-2 bellroy-subtext">{slide.text}</p>
                  <Link
                    to={`/shop-default`}
                    className="fade-item fade-item-3 bellroy-btn"
                  >
                    {slide.btnText}
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
