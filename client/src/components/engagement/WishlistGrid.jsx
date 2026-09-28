import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { ProductCardWishlist } from "../productCards/ProductCardWishlist.jsx";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";

export default function WishlistGrid() {
  const { wishList } = useContextElement();
  const [wishListItems, setWishListItems] = useState([]);
  useEffect(() => {
    let cancelled = false;
    api
      .get("/products", { params: { limit: 50 } })
      .then(({ data }) => {
        if (!cancelled && Array.isArray(data.products)) {
          const catalog = data.products.map(normalizeProduct);
          setWishListItems(
            catalog.filter((el) => wishList?.includes(el.id))
          );
        }
      })
      .catch(() => {
        if (!cancelled) setWishListItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [wishList]);

  return (
    <section className="flat-spacing-2">
      <div className="container">
        <div className="grid-layout wrapper-shop" data-grid="grid-4">
          {wishListItems.map((elm, i) => (
            <ProductCardWishlist key={i} product={elm} />
          ))}
        </div>
        {!wishListItems.length && (
          <>
            <div
              className="row align-items-center w-100"
              style={{ rowGap: "20px" }}
            >
              <div className="col-lg-3 col-md-6 fs-18">
                Your wishlist is empty
              </div>
              <div className="col-lg-3  col-md-6">
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