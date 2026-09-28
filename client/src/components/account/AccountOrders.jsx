import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";

const STATUS_LABEL = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

// statuses a customer may cancel on their own (order not yet shipped)
const CANCELLABLE_STATUS = ["pending", "processing"];

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function AccountOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let active = true;
    api
      .get("/orders")
      .then(({ data }) => {
        if (active) setOrders(data.orders || []);
      })
      .catch(() => {
        if (active)
          setError(
            "Could not load your orders. Please sign in and try again."
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleCancel = async (order) => {
    if (!window.confirm("Cancel this order? Its reserved stock will be released.")) {
      return;
    }
    setBusyId(order._id);
    try {
      await api.delete(`/orders/${order._id}`);
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
      setError("");
    } catch (err) {
      setError(err?.response?.data?.error || "Could not cancel this order.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="my-account-content account-order">
      <div className="wrap-account-order">
        {loading && <p className="mb-0 py-4">Loading your orders…</p>}
        {!loading && error && (
          <p className="mb-0 py-4 text-danger">{error}</p>
        )}
        {!loading && !error && orders.length === 0 && (
          <div
            className="row align-items-center w-100"
            style={{ rowGap: "20px" }}
          >
            <div className="col-lg-3 col-md-6 fs-18">
              You have no orders yet
            </div>
            <div className="col-lg-3 col-md-6">
              <Link
                to={`/products`}
                className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
              >
                Start Shopping!
              </Link>
            </div>
          </div>
        )}
        {!loading && !error && orders.length > 0 && (
          <table>
            <thead>
              <tr>
                <th className="fw-6">Order</th>
                <th className="fw-6">Date</th>
                <th className="fw-6">Status</th>
                <th className="fw-6">Total</th>
                <th className="fw-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="tf-order-item" key={order._id}>
                  <td>#{order._id.slice(-6).toUpperCase()}</td>
                  <td>{fmtDate(order.createdAt)}</td>
                  <td>{STATUS_LABEL[order.status] || order.status}</td>
                  <td>
                    ${(order.total_price || 0).toFixed(2)} for{" "}
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <Link
                        to={`/my-account-orders-details/${order._id}`}
                        className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                      >
                        <span>View</span>
                      </Link>
                      {CANCELLABLE_STATUS.includes(order.status) && (
                        <button
                          type="button"
                          className="tf-btn btn-line rounded-0 justify-content-center text-danger"
                          onClick={() => handleCancel(order)}
                          disabled={busyId === order._id}
                        >
                          <span>
                            {busyId === order._id ? "Cancelling…" : "Cancel"}
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}