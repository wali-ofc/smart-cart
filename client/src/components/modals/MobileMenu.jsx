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
          </ul>
          <div className="mb-other-content">
            <div className="d-flex group-icon">
              <Link to="/wishlist" className="site-nav-icon">
                <i className="icon icon-heart" />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

