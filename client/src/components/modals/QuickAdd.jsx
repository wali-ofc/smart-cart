import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Quantity from "../shopDetails/Quantity";
import { useContextElement } from "@/context/Context";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";

export default function QuickAdd() {
  const {
    quickAddItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    let cancelled = false;
    if (!quickAddItem) {
      setItem(null);
      setQuantity(1);
      return;
    }
    setItem(null);
    setQuantity(1);
    api
      .get(`/products/${quickAddItem}`)
      .then(({ data }) => {
        if (!cancelled && data.data) setItem(normalizeProduct(data.data));
      })
      .catch(() => {
        if (!cancelled) setItem(null);
      });
    return () => {
      cancelled = true;
    };
  }, [quickAddItem]);

  if (!item) return null;
  const price = Number(item.price) || 0;
  const qty = quantity ? quantity : 1;

  return (
    <div className="modal fade modalDemo" id="quick_add">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-info-item">
              <div className="image">
                <img
                  alt="image"
                  style={{ objectFit: "contain" }}
                  src={item.imgSrc}
                  width={720}
                  height={1005}
                />
              </div>
              <div className="content">
                <Link to={`/product-detail/${item.id}`}>{item.title}</Link>
                <div className="tf-product-info-price">
                  <div className="price">${price.toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="tf-product-info-quantity mb_15">
              <div className="quantity-title fw-6">Quantity</div>
              <Quantity setQuantity={setQuantity} max={item.stock} />
            </div>
            <div className="tf-product-info-buy-button">
              <form onSubmit={(e) => e.preventDefault()} className="">
                <a
                  className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                  onClick={() => addProductToCart(item.id, qty)}
                >
                  <span>
                    {isAddedToCartProducts(item.id)
                      ? "Already Added - "
                      : "Add to cart - "}
                  </span>
                  <span className="tf-qty-price">
                    ${(price * qty).toFixed(2)}
                  </span>
                </a>
                <div className="tf-product-btn-wishlist btn-icon-action">
                  <i className="icon-heart" />
                  <i className="icon-delete" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}