import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import React from "react";

const slides = [
  {
    imgSrc: "/images/slider/bellroy-desktop.jpg",
    mobileImgSrc: "/images/slider/bellroy-mobile.jpg",
    title: "CARRY SMART.\nMOVE FREE.\nGO FAR.",
    text: "",
    btnText: "BESTSELLERS",
    linkTo: "/products",
  },
  {
    imgSrc: "/images/slider/bellroy-slide3-desktop.jpg",
    mobileImgSrc: "/images/slider/bellroy-slide3-mobile.jpg",
    title: "WE'VE GOT\nYOUR BACK",
    text: "",
    btnText: "SHOP BACKPACKS",
    // No backpack SKU in the seeded catalog; Fashion & Apparel is the nearest
    // real destination (Shopper, $120.95). Keeps the frozen CTA copy intact.
    linkTo: "/category/Fashion%20%26%20Apparel",
  },
];

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
          object-position: center 15% !important;
        }
        .bellroy-content {
          position: absolute !important;
          top: 55% !important;
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

        /* Custom Minimalist Navigation Arrows */
        .tf-slideshow .swiper-button-next,
        .tf-slideshow .swiper-button-prev {
          background: transparent !important;
          width: 50px !important;
          height: 50px !important;
          border-radius: 0 !important;
          margin-top: -25px !important;
        }
        .tf-slideshow .swiper-button-next::after,
        .tf-slideshow .swiper-button-prev::after {
          content: '' !important;
          display: block;
          width: 18px;
          height: 18px;
          border: solid #ffffff;
          border-width: 2px 2px 0 0;
          transform: rotate(45deg);
        }
        .tf-slideshow .swiper-button-prev::after {
          transform: rotate(-135deg);
        }

        /* Dynamic Header Contrast for Dark Slides */
        #header.header-light-text .item-link,
        #header.header-light-text .nav-icon-item i,
        #header.header-light-text svg path,
        #header.header-light-text .logo-header span {
          color: #ffffff !important;
          fill: #ffffff !important;
        }
        #header.header-light-text .count-box {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        /* Mobile Overrides */
        @media (max-width: 768px) {
          .custom-hero-slider {
            height: 85vh !important;
            min-height: 500px !important;
          }
          .custom-hero-slider img {
            object-position: center 15% !important;
          }
          .bellroy-content {
            top: auto !important;
            bottom: 8% !important;
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
          .tf-slideshow .swiper-button-next,
          .tf-slideshow .swiper-button-prev {
            display: none !important; /* Hide arrows on mobile for clean look */
          }
        }
      `}</style>
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true, el: ".sp1" }}
        navigation={true}
        speed={1000}
        onSlideChange={(swiper) => {
          const header = document.getElementById("header");
          if (header) {
            if (swiper.activeIndex > 0) {
              header.classList.add("header-light-text");
            } else {
              header.classList.remove("header-light-text");
            }
          }
        }}
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
                    to={slide.linkTo || "/products"}
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
