import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function MyAccount() {
  const { user } = useAuth();
  const name = user?.name || "Customer";
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api
      .get("/reviews/my-reviews")
      .then(({ data }) => {
        if (active) setReviews(data.reviews || []);
      })
      .catch(() => {
        if (active) setError("Could not load your reviews.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="my-account-content account-dashboard">
      <div className="mb_60">
        <h5 className="fw-5 mb_20">Hello {name}</h5>
        {user && (
          <p className="mb_16">
            Signed in as <strong>{user.email}</strong>
            {user.role && (
              <span className="text_primary text-capitalize">
                {" "}
                ({user.role})
              </span>
            )}
          </p>
        )}
        <p>
          From your account dashboard you can view your{" "}
          <Link className="text_primary" to={`/my-account-orders`}>
            recent orders
          </Link>
          , and{" "}
          <Link className="text_primary" to={`/my-account-edit`}>
            edit your account details
          </Link>
          .
        </p>
      </div>

      <div className="mb_30">
        <h6 className="fw-5 mb_20">My Reviews</h6>
        {loading && <p className="mb-0 py-2">Loading your reviews…</p>}
        {!loading && error && (
          <p className="mb-0 py-2 text-danger">{error}</p>
        )}
        {!loading && !error && reviews.length === 0 && (
          <p className="mb-0 text-secondary">
            You haven't written any reviews yet.
          </p>
        )}
        {!loading && !error && reviews.length > 0 && (
          <ul className="ps-0 list-unstyled d-flex flex-column gap-3">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="p-3 border rounded-3 d-flex justify-content-between align-items-start gap-3"
              >
                <div>
                  <Link
                    className="fw-6 text_black-2"
                    to={`/product-detail/${review.product?._id}`}
                  >
                    {review.product?.name || "Product"}
                  </Link>
                  <div className="small text-warning">
                    {"★".repeat(review.rating)}
                    <span className="text-secondary">
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="mb-0 mt-2 small">{review.comment}</p>
                </div>
                <span className="small text-secondary text-nowrap">
                  {fmtDate(review.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}