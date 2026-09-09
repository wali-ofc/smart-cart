import React, { useState } from "react";

import { Link } from "react-router-dom";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";
export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    api
      .get("/products", { params: { search: q, limit: 4 } })
      .then(({ data }) => {
        setResults(
          Array.isArray(data.products)
            ? data.products.map(normalizeProduct)
            : []
        );
        setSearched(true);
      })
      .catch(() => {
        setResults([]);
        setSearched(true);
      });
  };
  return (
    <div className="offcanvas offcanvas-end canvas-search" id="canvasSearch">
      <div className="canvas-wrapper">
        <header className="tf-search-head">
          <div className="title fw-5">
            Search our site
            <div className="close">
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
          </div>
          <div className="tf-search-sticky">
            <form onSubmit={handleSearch} className="tf-mini-search-frm">
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="Search"
                  className=""
                  name="text"
                  tabIndex={0}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-required="true"
                  required
                />
              </fieldset>
              <button className="" type="submit">
                <i className="icon-search" />
              </button>
            </form>
          </div>
        </header>
        <div className="canvas-body p-0">
          <div className="tf-search-content">
            <div className="tf-cart-hide-has-results">
              <div className="tf-col-quicklink">
                <div className="tf-search-content-title fw-5">Quick link</div>
                <ul className="tf-quicklink-list">
                  <li className="tf-quicklink-item">
                    <Link to={`/shop-default`} className="">
                      Fashion
                    </Link>
                  </li>
                  <li className="tf-quicklink-item">
                    <Link to={`/shop-default`} className="">
                      Men
                    </Link>
                  </li>
                  <li className="tf-quicklink-item">
                    <Link to={`/shop-default`} className="">
                      Women
                    </Link>
                  </li>
                  <li className="tf-quicklink-item">
                    <Link to={`/shop-default`} className="">
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="tf-col-content">
                <div className="tf-search-content-title fw-5">
                  Need some inspiration?
                </div>
                <div className="tf-search-hidden-inner">
                  {searched && !results.length ? (
                    <p>No products found for "{query}".</p>
                  ) : (
                    results.map((product, index) => (
                      <div className="tf-loop-item" key={index}>
                        <div className="image">
                          <Link to={`/product-detail/${product.id}`}>
                            <img
                              alt={product.title}
                              src={product.imgSrc}
                              width={120}
                              height={150}
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <Link to={`/product-detail/${product.id}`}>
                            {product.title}
                          </Link>
                          <div className="tf-product-info-price">
                            <div className="price fw-6">
                              ${(Number(product.price) || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}