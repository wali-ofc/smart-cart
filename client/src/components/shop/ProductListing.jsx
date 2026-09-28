import ProductGrid from "./ProductGrid.jsx";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import ProductFilter from "./ProductFilter.jsx";
import SortControl from "./SortControl.jsx";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";

const layouts = [
  { className: "sw-layout-list list-layout", dataValueGrid: "1", iconClass: "icon icon-list" },
  { className: "sw-layout-2", dataValueGrid: "2", iconClass: "icon-grid-2" },
  { className: "sw-layout-3", dataValueGrid: "3", iconClass: "icon-grid-3" },
  { className: "sw-layout-4", dataValueGrid: "4", iconClass: "icon-grid-4" },
  { className: "sw-layout-5", dataValueGrid: "5", iconClass: "icon-grid-5" },
  { className: "sw-layout-6", dataValueGrid: "6", iconClass: "icon-grid-6" },
];

const PAGE_LIMIT = 12;

export default function ProductListing({ initialCategory = "" }) {
  const [gridItems, setGridItems] = useState(4);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    category: initialCategory,
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: 1,
  });

  // Re-sync when the route category changes (e.g. /category/:name navigation)
  useEffect(() => {
    setQuery((pre) => ({ ...pre, category: initialCategory, page: 1 }));
  }, [initialCategory]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const params = { limit: PAGE_LIMIT };
    if (query.category) params.category = query.category;
    if (query.minPrice) params.minPrice = query.minPrice;
    if (query.maxPrice) params.maxPrice = query.maxPrice;
    if (query.sort) params.sort = query.sort;
    params.page = query.page;
    api
      .get("/products", { params })
      .then(({ data }) => {
        if (cancelled) return;
        setProducts((data.products || []).map(normalizeProduct));
        setTotal(data.total || 0);
        setPages(data.pages || 1);
      })
      .catch((err) => {
        if (cancelled) return;
        setProducts([]);
        setError(err?.response?.data?.error || "Could not load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const updateQuery = (patch) =>
    setQuery((pre) => ({ ...pre, ...patch, page: 1 }));

  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          <div className="tf-shop-control grid-3 align-items-center">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
            </div>
            <ul className="tf-control-layout d-flex justify-content-center">
              {layouts.map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${
                    gridItems == layout.dataValueGrid ? "active" : ""
                  }`}
                  onClick={() => setGridItems(layout.dataValueGrid)}
                >
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <SortControl
                  value={query.sort}
                  onChange={(sort) => updateQuery({ sort })}
                />
              </div>
            </div>
          </div>
          <div className="wrapper-control-shop">
            {loading ? (
              <div className="text-center py-5 fs-18">
                Loading products...
              </div>
            ) : error ? (
              <div className="text-center py-5 fs-18 text_red">{error}</div>
            ) : (
              <>
                <ProductGrid
                  allproducts={products}
                  gridItems={gridItems}
                  totalProducts={total}
                />
                {pages > 1 ? (
                  <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                    <Pagination
                      page={query.page}
                      pages={pages}
                      onChange={(page) => setQuery((pre) => ({ ...pre, page }))}
                    />
                  </ul>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <ProductFilter
        value={query}
        onChange={updateQuery}
        activeCategory={query.category}
      />
    </>
  );
}