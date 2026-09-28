import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetailTabs({ product }) {
  const [currentTab, setCurrentTab] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewReload, setReviewReload] = useState(0);

  // Review form state
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  const description = product?.description || "";
  const descriptionParagraphs =
    description.length > 240
      ? [description.slice(0, 240), description.slice(240)]
      : [description];

  useEffect(() => {
    if (currentTab !== 2 || !product?.id) return;
    let cancelled = false;
    setReviewsLoading(true);
    api
      .get(`/reviews/product/${product.id}`)
      .then(({ data }) => {
        if (!cancelled && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        if (!cancelled) setReviews([]);
      })
      .finally(() => {
        if (!cancelled) setReviewsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentTab, product?.id, reviewReload]);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess("");
    if (!user) {
      setReviewError("Please log in to write a review.");
      return;
    }
    setReviewSubmitting(true);
    try {
      await api.post(`/reviews/product/${product.id}`, {
        rating: Number(rating),
        comment: comment.trim(),
      });
      setComment("");
      setRating(5);
      setReviewSuccess("Thanks! Your review has been posted.");
      setReviewReload((n) => n + 1);
    } catch (err) {
      setReviewError(
        err?.response?.data?.error || "Could not post your review. Please try again."
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <section
      className="flat-spacing-17 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="widget-tabs style-has-border">
              <ul className="widget-menu-tab">
                {[
                  { title: "Description" },
                  { title: "Review" },
                  { title: "Return Policies" },
                ].map((elm, i) => (
                  <li
                    key={i}
                    onClick={() => setCurrentTab(i + 1)}
                    className={`item-title ${
                      currentTab == i + 1 ? "active" : ""
                    } `}
                  >
                    <span className="inner">{elm.title}</span>
                  </li>
                ))}
              </ul>
              <div className="widget-content-tab">
                <div
                  className={`widget-content-inner ${
                    currentTab == 1 ? "active" : ""
                  } `}
                >
                  <div className="">
                    {descriptionParagraphs.map((p, i) => (
                      <p key={i} className={i === 0 ? "mb_30" : "mb-0"}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab == 2 ? "active" : ""
                  } `}
                >
                  {reviewsLoading ? (
                    <div className="text-center">
                      <p className="fs-18 text-paragraph">
                        Loading reviews...
                      </p>
                    </div>
                  ) : reviews.length ? (
                    <div className="wrap-review">
                      {reviews.map((review) => (
                        <div className="review-item" key={review._id}>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-10">
                              <img
                                className="radius-3"
                                src="/images/avatar/avatar-default.svg"
                                alt={review.user?.name || "Reviewer"}
                                width={40}
                                height={40}
                                style={{ objectFit: "cover" }}
                              />
                              <div>
                                <div className="fw-6">
                                  {review.user?.name || "Anonymous"}
                                </div>
                                <div className="d-flex gap-4 align-items-center">
                                  <span className="text_black-2 fs-13">
                                    {review.rating}.0
                                  </span>
                                  <span className="icon-star text-warning" />
                                </div>
                              </div>
                            </div>
                            <div className="text_black-2 fs-13">
                              {formatDate(review.createdAt)}
                            </div>
                          </div>
                          <p className="mb-0 mt_10">{review.comment}</p>
                          <hr />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="fs-18 text-paragraph">
                        No reviews yet — be the first to review this product.
                      </p>
                    </div>
                  )}

                  {/* Write a review */}
                  <div className="mt_20">
                    <h6 className="fw-5 mb_20">Write a review</h6>
                    {reviewError && (
                      <div className="alert alert-danger py-2 mb-3">
                        {reviewError}
                      </div>
                    )}
                    {reviewSuccess && (
                      <div className="alert alert-success py-2 mb-3">
                        {reviewSuccess}
                      </div>
                    )}
                    {user ? (
                      <form className="form-review" onSubmit={submitReview}>
                        <div className="mb_20">
                          <label className="fw-6 fs-14 d-block mb-2">
                            Your rating
                          </label>
                          <div className="d-flex align-items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                className="bg-transparent border-0 p-0 fs-4 lh-1"
                                style={{ cursor: "pointer" }}
                              >
                                <i
                                  className={`icon-star ${
                                    star <= rating ? "text-warning" : "text_black-2"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mb_20">
                          <label
                            htmlFor="review-comment"
                            className="fw-6 fs-14 d-block mb-2"
                          >
                            Your review
                          </label>
                          <textarea
                            id="review-comment"
                            rows={4}
                            className="tf-control w-100"
                            placeholder="Tell others what you think about this product…"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            maxLength={1000}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="tf-btn btn-fill animate-hover-btn radius-3"
                          disabled={reviewSubmitting}
                        >
                          <span>
                            {reviewSubmitting
                              ? "Submitting..."
                              : "Submit review"}
                          </span>
                        </button>
                      </form>
                    ) : (
                      <p className="fs-15 text-paragraph mb-0">
                        Please{" "}
                        <a
                          href="#login"
                          data-bs-toggle="modal"
                          className="text-decoration-underline"
                        >
                          log in
                        </a>{" "}
                        to write a review.
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab == 3 ? "active" : ""
                  } `}
                >
                  <div className="tf-page-privacy-policy">
                    <div className="title">Return Policy</div>
                    <p>
                      Return within 30 days of purchase, in original condition
                      and packaging, for a full refund. Duties &amp; taxes are
                      non-refundable. Once your return is received and
                      inspected, your refund will be processed within 5-7
                      business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}