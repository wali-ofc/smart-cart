import React from "react";
import Quantity from "./Quantity";
import { useContextElement } from "@/context/Context";

export default function StickyItem({ product }) {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  if (!product) return null;
  const soldOut = !product.isAvailable;
  return (
    <div className="tf-sticky-btn-atc">
      <div className="container">
        <div className="tf-height-observer w-100 d-flex align-items-center">
          <div className="tf-sticky-atc-product d-flex align-items-center">
            <div className="tf-sticky-atc-img">
              <img
                className="lazyloaded"
                data-src={product.imgSrc}
                alt="image"
                src={product.imgSrc}
                width={770}
                height={1075}
              />
            </div>
            <div className="tf-sticky-atc-title fw-5 d-xl-block d-none">
              {product.title}
            </div>
          </div>
          <div className="tf-sticky-atc-infos">
            <form onSubmit={(e) => e.preventDefault()} className="">
              <div className="tf-sticky-atc-btns">
                <div className="tf-product-info-quantity">
                  <Quantity max={product.stock} />
                </div>
                {soldOut ? (
                  <a className="tf-btn btns-sold-out cursor-not-allowed btn-fill radius-3 justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn ">
                    <span>Sold out</span>
                  </a>
                ) : (
                  <a
                    onClick={() => addProductToCart(product.id)}
                    className="tf-btn btn-fill radius-3 justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn"
                  >
                    <span>
                      {isAddedToCartProducts(product.id)
                        ? "Already Added"
                        : "Add to cart"}
                    </span>
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}