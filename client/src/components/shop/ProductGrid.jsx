import React from "react";
import { ProductCard } from "../productCards/ProductCard.jsx";
import ProductListCard from "../productCards/ProductListCard.jsx";

export default function ProductGrid({
  gridItems = 4,
  allproducts = [],
  totalProducts,
}) {
  const shown = Number.isInteger(totalProducts)
    ? totalProducts
    : allproducts.length;
  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {shown} product(s) found
      </div>
      {gridItems == 1 ? (
        <div className="grid-layout" data-grid="grid-list">
          {/* card product 1 */}
          {allproducts.map((elm, i) => (
            <ProductListCard product={elm} key={i} />
          ))}
          {/* card product 2 */}
        </div>
      ) : (
        <div
          className="grid-layout wrapper-shop"
          data-grid={`grid-${gridItems}`}
        >
          {/* card product 1 */}
          {allproducts.map((elm, i) => (
            <ProductCard product={elm} key={i} />
          ))}
        </div>
      )}
    </>
  );
}