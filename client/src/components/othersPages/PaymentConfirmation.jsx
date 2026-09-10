import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "@/api/axios";

const PAYMENT_LABELS = {
  cod: "Cash on delivery",
  card: "Card",
  other: "Direct bank transfer",
};

const STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export default function PaymentConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!!orderId);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError("");
    api
      .get(`/orders/${orderId}`)
      .then(({ data }) => {
        if (!cancelled && data?.data) {
          setOrder(data.data);
        } else if (!cancelled) {
          setError("Order not found.");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err?.response?.data?.error ||
            "Could not load your order. Please try again."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h5 className="fw-5 mb_20">Payment confirmation</h5>
            <div className="tf-page-cart-checkout">
              {loading && (
                <div className="fs-18 mb_15">
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading your order...
                </div>
              )}

              {!loading && error && (
                <>
                  <p className="fs-18 mb_20">{error}</p>
                  <Link
                    to={`/orders`}
                    className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center mb_15"
                  >
                    <span>View my orders</span>
                  </Link>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn w-100 btn-outline animate-hover-btn radius-3 justify-content-center"
                  >
                    <span>Continue shopping</span>
                  </Link>
                </>
              )}

              {!loading && !order && !error && (
                <p className="fs-18 mb_20">
                  No order information found.
                </p>
              )}

              {order && (
                <>
                  <div className="d-flex align-items-center justify-content-between mb_15">
                    <div className="fs-18">Order number</div>
                    <p className="text-end">{order._id}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb_15">
                    <div className="fs-18">Date</div>
                    <p>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb_15">
                    <div className="fs-18">Payment method</div>
                    <p>{PAYMENT_LABELS[order.payment_method] || order.payment_method}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb_15">
                    <div className="fs-18">Status</div>
                    <p className="fw-6">
                      {STATUS_LABELS[order.status] || order.status}
                    </p>
                  </div>
                  {order.shipping_address && (
                    <div className="mb_15">
                      <div className="fs-18 mb-1">Shipping address</div>
                      <p>
                        {order.shipping_address.street},{" "}
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state}{" "}
                        {order.shipping_address.zip_code},{" "}
                        {order.shipping_address.country}
                      </p>
                    </div>
                  )}
                  <div className="tf-mini-cart-line mb_15" />
                  <ul className="wrap-checkout-product">
                    {(order.items || []).map((item, i) => (
                      <li key={i} className="checkout-product-item">
                        <figure className="img-product">
                          {item.product?.image ? (
                            <img
                              alt={item.name}
                              src={item.product.image}
                              width={720}
                              height={1005}
                            />
                          ) : null}
                          <span className="quantity">{item.quantity}</span>
                        </figure>
                        <div className="content">
                          <div className="info">
                            <p className="name">{item.name}</p>
                            <span className="variant">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>
                          <span className="price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between line pb_20">
                    <h6 className="fw-5">Total</h6>
                    <h6 className="total fw-5">
                      ${(order.total_price ?? 0).toFixed(2)}
                    </h6>
                  </div>
                  <div className="d-flex gap-10">
                    <Link
                      to={`/orders`}
                      className="tf-btn w-100 btn-outline animate-hover-btn radius-3 justify-content-center"
                    >
                      <span>View my orders</span>
                    </Link>
                    <Link
                      to={`/shop-default`}
                      className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center"
                    >
                      <span>Continue shopping</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}