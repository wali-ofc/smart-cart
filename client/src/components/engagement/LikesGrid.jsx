import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCardWishlist } from "../productCards/ProductCardWishlist.jsx";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";

/**
 * Liked products grid (documentation.md §4.3.4 `/likes`).
 * Server-synced: GET /api/products/likes returns the products the signed-in
 * user liked (Product.likes array). Not the localStorage wishlist — that page
 * is `/wishlist` (components/engagement/WishlistGrid.jsx).
 */
export default function LikesGrid() {
  const { user } = useAuth();
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setLikedItems([]);
      return;
    }
    let cancelled = false;
    api
      .get("/products/likes")
      .then(({ data }) => {
        if (!cancelled && Array.isArray(data.products)) {
          setLikedItems(data.products.map(normalizeProduct));
        }
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your liked products.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) {
    return (
      <div className="container">
        <div className="row align-items-center w-100" style={{ rowGap: "20px" }}>
          <div className="col-lg-4 col-md-6 fs-18">
            Please sign in to see the products you've liked.
          </div>
          <div className="col-lg-3 col-md-6">
            <Link
              to={`/login`}
              className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <p className="mb-0 py-4">Loading your liked products…</p>
      </div>
    );
  }

  return (
    <section className="flat-spacing-2">
      <div className="container">
        {error && <p className="mb-0 py-4 text-danger">{error}</p>}
        {!error && likedItems.length > 0 && (
          <div className="grid-layout wrapper-shop" data-grid="grid-4">
            {likedItems.map((elm, i) => (
              <ProductCardWishlist key={elm.id || i} product={elm} />
            ))}
          </div>
        )}
        {!error && likedItems.length === 0 && (
          <>
            <div
              className="row align-items-center w-100"
              style={{ rowGap: "20px" }}
            >
              <div className="col-lg-3 col-md-6 fs-18">
                You haven't liked any products yet
              </div>
              <div className="col-lg-3 col-md-6">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                >
                  Explore Products!
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}