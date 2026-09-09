import { ProductCardWishlist } from "@/components/shopCards/ProductCardWishlist";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";

export default function Wishlist() {
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
    <div className="my-account-content account-wishlist">
      <div className="grid-layout wrapper-shop" data-grid="grid-3">
        {/* card product 1 */}
        {wishListItems.slice(0, 3).map((elm, i) => (
          <ProductCardWishlist product={elm} key={i} />
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
  );
}