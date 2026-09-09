import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function ShopDetailsTab({ product }) {
  const [currentTab, setCurrentTab] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

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
  }, [currentTab, product?.id]);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

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
                  { title: "Shipping" },
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
                                src={
                                  review.user?.profileImage ||
                                  "/images/avatar/avatar-default.png"
                                }
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
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab == 3 ? "active" : ""
                  } `}
                >
                  <div className="tf-page-privacy-policy">
                    <div className="title">Shipping Policy</div>
                    <p>
                      Orders are processed and dispatched within 1-2 business
                      days after payment confirmation. Estimated delivery
                      times: 3-6 business days (domestic) and 12-26 days
                      (international). You will receive a tracking number once
                      your order ships.
                    </p>
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab == 4 ? "active" : ""
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