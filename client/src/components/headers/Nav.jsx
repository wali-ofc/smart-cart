import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path || (path !== "/" && pathname.startsWith(path)) ? "activeMenu" : "";

  return (
    <>
      <li className="menu-item">
        <Link to="/" className={`item-link ${Linkfs} ${textColor} ${isActive("/")}`}>
          Home
        </Link>
      </li>
      <li className="menu-item">
        <Link to="/products" className={`item-link ${Linkfs} ${textColor} ${isActive("/products")}`}>
          Products
        </Link>
      </li>
      <li className="menu-item">
        <Link to="/orders" className={`item-link ${Linkfs} ${textColor} ${isActive("/orders")}`}>
          My Orders
        </Link>
      </li>
      
      <li className="menu-item">
        <Link to="/blog-grid" className={`item-link ${Linkfs} ${textColor} ${isActive("/blog-grid")}`}>
          Blog
        </Link>
      </li>
      <li className="menu-item position-relative">
        <a href="#" className={`item-link ${Linkfs} ${textColor} ${isActive("/profile") ? "activeMenu" : ""}`}>
          Account
          {isArrow && <i className="icon icon-arrow-down" />}
        </a>
        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            <li>
              <Link to="/profile" className="menu-link-text link text_black-2">Profile Dashboard</Link>
            </li>
            <li>
              <Link to="/seller" className="menu-link-text link text_black-2">Seller Dashboard</Link>
            </li>
            <li>
              <Link to="/delivery" className="menu-link-text link text_black-2">Delivery Dashboard</Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
}
