import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";

const STATUS_LABEL = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

const PAYMENT_LABEL = {
  cod: "Cash on Delivery",
  card: "Card",
  other: "Other",
};

const fmtDateTime = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No order selected.");
      return;
    }
    let active = true;
    api
      .get(`/orders/${id}`)
      .then(({ data }) => {
        if (active) setOrder(data.data);
      })
      .catch(() => {
        if (active) setError("Could not load this order.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    const tabs = () => {
      document.querySelectorAll(".widget-tabs").forEach((widgetTab) => {
        const titles = widgetTab.querySelectorAll(
          ".widget-menu-tab .item-title"
        );

        titles.forEach((title, index) => {
          title.addEventListener("click", () => {
            // Remove active class from all menu items
            titles.forEach((item) => item.classList.remove("active"));
            // Add active class to the clicked item
            title.classList.add("active");

            // Remove active class from all content items
            const contentItems = widgetTab.querySelectorAll(
              ".widget-content-tab > *"
            );
            contentItems.forEach((content) =>
              content.classList.remove("active")
            );

            // Add active class and fade-in effect to the matching content item
            const contentActive = contentItems[index];
            contentActive.classList.add("active");
            contentActive.style.display = "block";
            contentActive.style.opacity = 0;
            setTimeout(() => (contentActive.style.opacity = 1), 0);

            // Hide all siblings' content
            contentItems.forEach((content, idx) => {
              if (idx !== index) {
                content.style.display = "none";
              }
            });
          });
        });
      });
    };

    // Call the function to initialize the tabs
    tabs();
  }, [order]);

  if (loading) {
    return (
      <div className="wd-form-order">
        <p className="py-4 mb-0">Loading order…</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="wd-form-order">
        <p className="py-4 mb-0 text-danger">
          {error || "Order not found."}
        </p>
      </div>
    );
  }

  const address = order.shipping_address || {};
  const fullAddress = [
    address.street,
    address.city,
    address.state,
    address.zip_code,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
  const receiverName = order.user && order.user.name ? order.user.name : "—";
  const firstImage =
    order.items[0] && order.items[0].product
      ? order.items[0].product.image
      : "/images/products/brown.jpg";

  return (
    <div className="wd-form-order">
      <div className="order-head">
        <figure className="img-product">
          <img alt="product" src={firstImage} width="720" height="1005" />
        </figure>
        <div className="content">
          <div className="badge">
            {STATUS_LABEL[order.status] || order.status}
          </div>
          <h6 className="mt-8 fw-5">
            Order #{order._id.slice(-6).toUpperCase()}
          </h6>
        </div>
      </div>
      <div className="tf-grid-layout md-col-2 gap-15">
        <div className="item">
          <div className="text-2 text_black-2">Order Date</div>
          <div className="text-2 mt_4 fw-6">{fmtDateTime(order.createdAt)}</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Payment</div>
          <div className="text-2 mt_4 fw-6">
            {PAYMENT_LABEL[order.payment_method] || order.payment_method}
          </div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Items</div>
          <div className="text-2 mt_4 fw-6">{order.items.length}</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Address</div>
          <div className="text-2 mt_4 fw-6">{fullAddress || "—"}</div>
        </div>
      </div>
      <div className="widget-tabs style-has-border widget-order-tab">
        <ul className="widget-menu-tab">
          <li className="item-title active">
            <span className="inner">Order History</span>
          </li>
          <li className="item-title">
            <span className="inner">Item Details</span>
          </li>
          <li className="item-title">
            <span className="inner">Courier</span>
          </li>
          <li className="item-title">
            <span className="inner">Receiver</span>
          </li>
        </ul>
        <div className="widget-content-tab">
          <div className="widget-content-inner active">
            <div className="widget-timeline">
              <ul className="timeline">
                <li>
                  <div className="timeline-badge success" />
                  <div className="timeline-box">
                    <a className="timeline-panel" href="#">
                      <div className="text-2 fw-6">
                        {STATUS_LABEL[order.status] || order.status}
                      </div>
                      <span>{fmtDateTime(order.createdAt)}</span>
                    </a>
                    <p>
                      <strong>Order Number : </strong>
                      #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p>
                      <strong>Payment Method : </strong>
                      {PAYMENT_LABEL[order.payment_method] ||
                        order.payment_method}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="timeline-badge" />
                  <div className="timeline-box">
                    <a className="timeline-panel" href="#">
                      <div className="text-2 fw-6">Order Placed</div>
                      <span>{fmtDateTime(order.createdAt)}</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="widget-content-inner">
            <ul>
              {order.items.map((item) => (
                <li
                  key={item._id}
                  className="d-flex justify-content-between text-2"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="fw-6">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
              <li className="d-flex justify-content-between text-2 mt_4 pb_8 line">
                <span>Items Total</span>
                <span className="fw-6">
                  ${(order.items_price || 0).toFixed(2)}
                </span>
              </li>
              <li className="d-flex justify-content-between text-2 mt_8">
                <span>Order Total</span>
                <span className="fw-6">
                  ${(order.total_price || 0).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
          <div className="widget-content-inner">
            <p>
              Our courier service is dedicated to providing fast, reliable, and
              secure delivery solutions tailored to meet your needs. Whether
              you're sending documents, parcels, or larger shipments, our team
              ensures that your items are handled with the utmost care and
              delivered on time. With a commitment to customer satisfaction,
              real-time tracking, and a wide network of routes, we make it easy
              for you to send and receive packages both locally and
              internationally. Choose our service for a seamless and efficient
              delivery experience.
            </p>
          </div>
          <div className="widget-content-inner">
            <p className="text-2 text_success">
              Thank you, your order has been received
            </p>
            <ul className="mt_20">
              <li>
                Order Number :{" "}
                <span className="fw-7">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </li>
              <li>
                Date : <span className="fw-7">{fmtDateTime(order.createdAt)}</span>
              </li>
              <li>
                Total :{" "}
                <span className="fw-7">
                  ${(order.total_price || 0).toFixed(2)}
                </span>
              </li>
              <li>
                Receiver : <span className="fw-7">{receiverName}</span>
              </li>
              <li>
                Address : <span className="fw-7">{fullAddress || "—"}</span>
              </li>
              <li>
                Payment Methods :
                <span className="fw-7">
                  {PAYMENT_LABEL[order.payment_method] || order.payment_method}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}