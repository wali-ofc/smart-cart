import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function AccountProfile() {
  const { user } = useAuth();
  const name = user?.name || "Customer";
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Owner-only edit / delete state. This list only ever holds the signed-in
  // user's own reviews, so every row is theirs to edit or delete.
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [rowError, setRowError] = useState("");

  const loadReviews = useCallback(async () => {
    try {
      const { data } = await api.get("/reviews/my-reviews");
      setReviews(data.reviews || []);
      setError("");
    } catch {
      setError("Could not load your reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const startEdit = (review) => {
    setEditingId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment || "");
    setRowError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditComment("");
    setRowError("");
  };

  const saveEdit = async (review) => {
    setBusyId(review._id);
    setRowError("");
    try {
      await api.put(`/reviews/${review._id}`, {
        rating: Number(editRating),
        comment: editComment.trim(),
      });
      setEditingId(null);
      setEditComment("");
      await loadReviews();
    } catch (err) {
      setRowError(
        err?.response?.data?.error || "Could not update your review."
      );
    } finally {
      setBusyId(null);
    }
  };

  const doDelete = async (review) => {
    setBusyId(review._id);
    setRowError("");
    try {
      await api.delete(`/reviews/${review._id}`);
      setConfirmId(null);
      if (editingId === review._id) {
        setEditingId(null);
        setEditComment("");
      }
      await loadReviews();
    } catch (err) {
      setRowError(
        err?.response?.data?.error || "Could not delete your review."
      );
    } finally {
      setBusyId(null);
    }
  };

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
                <div className="flex-grow-1">
                  <Link
                    className="fw-6 text_black-2"
                    to={`/product-detail/${review.product?._id}`}
                  >
                    {review.product?.name || "Product"}
                  </Link>
                  {editingId === review._id ? (
                    <form
                      className="mt_20"
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveEdit(review);
                      }}
                    >
                      <div className="mb_20">
                        <label className="fw-6 fs-14 d-block mb-2">
                          Your rating
                        </label>
                        <div className="d-flex align-items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setEditRating(star)}
                              aria-label={`${star} star${star > 1 ? "s" : ""}`}
                              className="bg-transparent border-0 p-0 fs-5 lh-1"
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                className={
                                  star <= editRating
                                    ? "text-warning"
                                    : "text-secondary"
                                }
                              >
                                ★
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb_20">
                        <label
                          htmlFor={`edit-review-${review._id}`}
                          className="fw-6 fs-14 d-block mb-2"
                        >
                          Your review
                        </label>
                        <textarea
                          id={`edit-review-${review._id}`}
                          rows={4}
                          className="tf-control w-100"
                          placeholder="Update your review…"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          maxLength={1000}
                          required
                        />
                      </div>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <button
                          type="submit"
                          className="tf-btn btn-fill animate-hover-btn radius-3"
                          disabled={busyId === review._id}
                        >
                          <span>
                            {busyId === review._id ? "Saving…" : "Save changes"}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="tf-btn btn-outline animate-hover-btn radius-3"
                          onClick={cancelEdit}
                          disabled={busyId === review._id}
                        >
                          <span>Cancel</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="small text-warning">
                        {"★".repeat(review.rating)}
                        <span className="text-secondary">
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="mb-0 mt-2 small">{review.comment}</p>
                      <div className="d-flex align-items-center gap-2 flex-wrap mt_20">
                        {confirmId === review._id ? (
                          <>
                            <span className="small text-danger">
                              Delete this review?
                            </span>
                            <button
                              type="button"
                              className="tf-btn btn-fill animate-hover-btn radius-3"
                              onClick={() => doDelete(review)}
                              disabled={busyId === review._id}
                            >
                              <span>
                                {busyId === review._id
                                  ? "Deleting…"
                                  : "Confirm delete"}
                              </span>
                            </button>
                            <button
                              type="button"
                              className="tf-btn btn-outline animate-hover-btn radius-3"
                              onClick={() => setConfirmId(null)}
                              disabled={busyId === review._id}
                            >
                              <span>Cancel</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="tf-btn btn-outline animate-hover-btn radius-3"
                              onClick={() => startEdit(review)}
                              disabled={busyId === review._id}
                            >
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="tf-btn btn-line rounded-0 justify-content-center text-danger"
                              onClick={() => setConfirmId(review._id)}
                              disabled={busyId === review._id}
                            >
                              <span>Delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  {rowError && (
                    <div className="alert alert-danger py-2 mt_20 mb-0">
                      {rowError}
                    </div>
                  )}
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