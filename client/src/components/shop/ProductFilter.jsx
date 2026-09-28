import { useEffect, useState } from "react";
import Slider from "rc-slider";
import { Link } from "react-router-dom";
import api from "@/api/axios";

const MAX_PRICE = 1000;

export default function ProductFilter({ value, onChange, activeCategory = "" }) {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState([0, MAX_PRICE]);
  const [loaded, setLoaded] = useState(false);

  // Hydrate the local price range from the active query
  useEffect(() => {
    setPrice([
      Number(value.minPrice) || 0,
      Number(value.maxPrice) || MAX_PRICE,
    ]);
  }, [value.minPrice, value.maxPrice]);

  // Real categories from the API (server-backed filter)
  useEffect(() => {
    let cancelled = false;
    api
      .get("/products/categories")
      .then(({ data }) => {
        if (!cancelled) setCategories(data.categories || []);
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePrice = (newPrice) => setPrice(newPrice);
  const commitPrice = (newPrice) => {
    const [minPrice, maxPrice] = newPrice;
    onChange({
      minPrice: minPrice > 0 ? minPrice : "",
      maxPrice: maxPrice < MAX_PRICE ? maxPrice : "",
    });
  };

  const clearFilter = () => {
    setPrice([0, MAX_PRICE]);
    onChange({ minPrice: "", maxPrice: "" });
  };

  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        <header className="canvas-header">
          <div className="filter-icon">
            <span className="icon icon-filter" />
            <span>Filter</span>
          </div>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </header>
        <div className="canvas-body">
          <div className="widget-facet wd-categories">
            <div
              className="facet-title"
              data-bs-target="#categories"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="categories"
            >
              <span>Product categories</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="categories" className="collapse show">
              <ul className="list-categoris current-scrollbar mb_36">
                {loaded && !categories.length ? (
                  <li className="cate-item">
                    <span>No categories available</span>
                  </li>
                ) : (
                  categories.map((category) => (
                    <li
                      key={category}
                      className={`cate-item ${
                        activeCategory === category ? "active" : ""
                      }`}
                    >
                      <Link
                        to={`/category/${encodeURIComponent(category)}`}
                      >
                        <span>{category}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            action="#"
            id="facet-filter-form"
            className="facet-filter-form"
          >
            <div className="widget-facet wrap-price">
              <div
                className="facet-title"
                data-bs-target="#price"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="price"
              >
                <span>Price</span>
                <span className="icon icon-arrow-up" />
              </div>
              <div id="price" className="collapse show">
                <div className="widget-price filter-price">
                  <Slider
                    formatLabel={() => ``}
                    range
                    max={MAX_PRICE}
                    min={0}
                    value={price}
                    onChange={(value) => handlePrice(value)}
                    onAfterChange={(value) => commitPrice(value)}
                    id="slider"
                  />
                  <div className="box-title-price">
                    <span className="title-price">Price :</span>
                    <div className="caption-price">
                      <div>
                        <span>$</span>
                        <span className="min-price">{price[0]}</span>
                      </div>
                      <span>-</span>
                      <div>
                        <span>$</span>
                        <span className="max-price">{price[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-5"></div>
          <a
            className="tf-btn style-2 btn-fill rounded animate-hover-btn"
            onClick={clearFilter}
          >
            Clear Filter
          </a>
        </div>
      </div>
    </div>
  );
}