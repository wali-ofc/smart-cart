import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searched, setSearched] = useState(false);

  // Load product catalog when modal initializes
  useEffect(() => {
    let cancelled = false;
    api
      .get("/products", { params: { limit: 50 } })
      .then(({ data }) => {
        if (cancelled) return;
        const normalized = Array.isArray(data.products)
          ? data.products.map(normalizeProduct)
          : [];
        setAllProducts(normalized);
        setProducts(normalized);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter products in real time as the user types
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setProducts(allProducts);
      setSearched(false);
      return;
    }

    setSearched(true);

    // Instant client-side substring filter for smooth keystroke response
    const clientFiltered = allProducts.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const category = (p.category || "").toLowerCase();
      const searchStr = q.toLowerCase();
      return (
        title.includes(searchStr) ||
        category.includes(searchStr) ||
        (Array.isArray(p.keywords) &&
          p.keywords.some((k) => k.toLowerCase().includes(searchStr)))
      );
    });
    setProducts(clientFiltered);

    // Debounced server fetch to also catch backend regex matches
    const timer = setTimeout(() => {
      api
        .get("/products", { params: { search: q, limit: 50 } })
        .then(({ data }) => {
          if (Array.isArray(data.products)) {
            const serverResults = data.products.map(normalizeProduct);
            const combinedMap = new Map();
            clientFiltered.forEach((item) => combinedMap.set(item.id, item));
            serverResults.forEach((item) => combinedMap.set(item.id, item));
            setProducts(Array.from(combinedMap.values()));
          }
        })
        .catch(() => {});
    }, 150);

    return () => clearTimeout(timer);
  }, [query, allProducts]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const closeOffcanvas = () => {
    import("bootstrap").then((bootstrap) => {
      const el = document.getElementById("canvasSearch");
      if (el) bootstrap.Offcanvas.getOrCreateInstance(el).hide();
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
            <form onSubmit={handleSearchSubmit} className="tf-mini-search-frm">
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
                />
              </fieldset>
              <button className="" type="submit" aria-label="Search">
                <i className="icon-search" />
              </button>
            </form>
          </div>
        </header>
        <div className="canvas-body p-0">
          <div className="tf-search-content">
            <div className="tf-cart-hide-has-results">
              <div className="tf-col-content w-100">
                <div className="tf-search-hidden-inner">
                  {searched && products.length === 0 ? (
                    <p className="text-muted py-3">
                      No products found for "{query}".
                    </p>
                  ) : (
                    products.map((product) => (
                      <div className="tf-loop-item" key={product.id || product._id}>
                        <div className="image">
                          <Link
                            to={`/product-detail/${product.id}`}
                            onClick={closeOffcanvas}
                          >
                            <img
                              alt={product.title}
                              src={product.imgSrc}
                              width={120}
                              height={150}
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <Link
                            to={`/product-detail/${product.id}`}
                            onClick={closeOffcanvas}
                          >
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