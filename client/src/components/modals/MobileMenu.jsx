import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileMenu() {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path || (path !== "/" && pathname.startsWith(path)) ? "activeMenu" : "";

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            <li className="nav-mb-item">
              <Link to="/" className={`mb-menu-link ${isActive("/")}`}>
                Home
              </Link>
            </li>
            <li className="nav-mb-item">
              <Link to="/products" className={`mb-menu-link ${isActive("/products")}`}>
                Products
              </Link>
            </li>
            <li className="nav-mb-item">
              <Link to="/orders" className={`mb-menu-link ${isActive("/orders")}`}>
                My Orders
              </Link>
            </li>
            <li className="nav-mb-item">
              <a
                href="#accountMenu"
                className={`collapsed mb-menu-link current ${
                  isActive("/profile") || isActive("/seller") || isActive("/delivery") ? "activeMenu" : ""
                }`}
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accountMenu"
              >
                <span>Account</span>
                <span className="btn-open-sub" />
              </a>
              <div id="accountMenu" className="collapse">
                <ul className="sub-nav-menu">
                  <li>
                    <Link to="/profile" className={`sub-nav-link ${isActive("/profile")}`}>
                      Profile Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/seller" className={`sub-nav-link ${isActive("/seller")}`}>
                      Seller Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/delivery" className={`sub-nav-link ${isActive("/delivery")}`}>
                      Delivery Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="mb-other-content">
            <div className="d-flex group-icon">
              <Link to="/likes" className="site-nav-icon">
                <i className="icon icon-heart" />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-bottom">
          <Link to="/login" className="site-nav-icon">
            <i className="icon icon-account" />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
