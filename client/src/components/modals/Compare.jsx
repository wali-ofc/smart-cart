import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
import api from "@/api/axios";
import { normalizeProduct } from "@/utlis/productMap";
export default function Compare() {
  const { removeFromCompareItem, compareItem, setCompareItem } =
    useContextElement();
  const [catalog, setCatalog] = useState([]);
  useEffect(() => {
    let cancelled = false;
    api
      .get("/products", { params: { limit: 50 } })
      .then(({ data }) => {
        if (!cancelled && Array.isArray(data.products)) {
          setCatalog(data.products.map(normalizeProduct));
        }
      })
      .catch(() => {
        if (!cancelled) setCatalog([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const items = catalog.filter((elm) => compareItem.includes(elm.id));

  return (
    <div className="offcanvas offcanvas-bottom canvas-compare" id="compare">
      <div className="canvas-wrapper">
        <header className="canvas-header">
          <div className="close-popup">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
        </header>
        <div className="canvas-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tf-compare-list">
                  <div className="tf-compare-head">
                    <div className="title">Compare Products</div>
                  </div>
                  <div className="tf-compare-offcanvas">
                    {items.map((elm, i) => (
                      <div key={i} className="tf-compare-item">
                        <div className="position-relative">
                          <div
                            className="icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeFromCompareItem(elm.id)}
                          >
                            <i className="icon-close" />
                          </div>
                          <Link to={`/product-detail/${elm.id}`}>
                            <img
                              className="radius-3"
                              alt="image"
                              src={elm.imgSrc}
                              style={{ objectFit: "contain" }}
                              width={720}
                              height={1005}
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="tf-compare-buttons">
                    <div className="tf-compare-buttons-wrap">
                      <Link
                        to={`/compare`}
                        className="tf-btn radius-3 btn-fill justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn"
                      >
                        Compare
                      </Link>
                      <div
                        className="tf-compapre-button-clear-all link"
                        onClick={() => setCompareItem([])}
                      >
                        Clear All
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}