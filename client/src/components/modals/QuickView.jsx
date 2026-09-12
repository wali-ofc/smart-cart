import { useContextElement } from "@/context/Context";
import { useCart } from "@/context/CartContext";

import { Link } from "react-router-dom";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Quantity from "../shopDetails/Quantity";
import React, { useState } from "react";

export default function QuickView() {
  const { catalog } = useCart();
  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewItem) return null;

  // The click-time snapshot is kept render-stable, but stock readouts resolve
  // against the live catalog (refreshed by CartContext after every cart change),
  // so "- in stock / Out of Stock" stays correct without a page refresh.
  const live = catalog.find(
    (p) => String(p._id) === String(quickViewItem.id)
  );
  const stock = live
    ? Number(live.stock)
    : Number(quickViewItem.stock);
  const isAvailable = live ? Number(live.stock) > 0 : quickViewItem.isAvailable;
  const price = Number(quickViewItem.price) || 0;
  const imgSrc = quickViewItem.imgSrc;

  return (
    <div className="modal fade modalDemo" id="quick_view">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-media-wrap">
              <Swiper
                dir="ltr"
                modules={[Navigation]}
                navigation={{
                  prevEl: ".snbqvp",
                  nextEl: ".snbqvn",
                }}
                className="swiper tf-single-slide"
              >
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <img
                      alt={""}
                      src={imgSrc}
                      width={720}
                      height={1045}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </SwiperSlide>

                <div className="swiper-button-next button-style-arrow single-slide-prev snbqvp" />
                <div className="swiper-button-prev button-style-arrow single-slide-next snbqvn" />
              </Swiper>
            </div>
            <div className="tf-product-info-wrap position-relative">
              <div className="tf-product-info-list">
                <div className="tf-product-info-title">
                  <h5>
                    <Link
                      className="link"
                      to={`/product-detail/${quickViewItem.id}`}
                    >
                      {quickViewItem.title}
                    </Link>
                  </h5>
                </div>
                <div className="tf-product-info-badges">
                  <div
                    className={`badges ${
                      isAvailable ? "" : "text_red"
                    }`}
                  >
                    {isAvailable ? `${stock} in stock` : "Out of Stock"}
                  </div>
                  {Number(quickViewItem.rating?.stars) > 0 && (
                    <div className="product-status-content">
                      <i className="icon-star" />
                      <p className="fw-6">
                        {Number(quickViewItem.rating.stars).toFixed(1)} (
                        {quickViewItem.rating.count} reviews)
                      </p>
                    </div>
                  )}
                </div>
                <div className="tf-product-info-price">
                  <div className="price">${price.toFixed(2)}</div>
                </div>
                {isAvailable && (
                <div className="tf-product-info-quantity">
                  <div className="quantity-title fw-6">Quantity</div>
                  <Quantity setQuantity={setQuantity} max={stock} />
                </div>
              )}
              <div className="tf-product-info-buy-button">
                <form onSubmit={(e) => e.preventDefault()} className="">
                  {isAvailable ? (
                    <a
                      href="#"
                      className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        addProductToCart(
                          quickViewItem.id,
                          quantity ? quantity : 1
                        );
                      }}
                    >
                      <span>
                        {isAddedToCartProducts(quickViewItem.id)
                          ? "Already Added - "
                          : "Add to cart - "}
                      </span>
                      <span className="tf-qty-price">
                        ${(price * quantity).toFixed(2)}
                      </span>
                    </a>
                  ) : (
                    <a className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btns-sold-out cursor-not-allowed">
                      Sold out
                    </a>
                  )}
                  <a
                    onClick={() => addToWishlist(quickViewItem.id)}
                    className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action"
                  >
                    <span
                      className={`icon icon-heart ${
                        isAddedtoWishlist(quickViewItem.id) ? "added" : ""
                      }`}
                    />
                    <span className="tooltip">
                      {isAddedtoWishlist(quickViewItem.id)
                        ? "Already Wishlisted"
                        : "Add to Wishlist"}
                    </span>
                    <span className="icon icon-delete" />
                  </a>
                </form>
              </div>
                <div>
                  <Link
                    to={`/product-detail/${quickViewItem.id}`}
                    className="tf-btn fw-6 btn-line"
                  >
                    View full details
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}