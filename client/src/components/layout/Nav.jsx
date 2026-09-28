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
    </>
  );
}
