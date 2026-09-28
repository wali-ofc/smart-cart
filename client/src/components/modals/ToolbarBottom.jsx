import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartLength from "../common/CartLength";
import WishlistLength from "../common/WishlistLength";
import { useAuth } from "@/context/AuthContext";
export default function ToolbarBottom() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountPos, setAccountPos] = useState(null);
  const accountRef = useRef(null);
  const panelRef = useRef(null);

  // The desktop dropdown (#header .nav-account) is :hover-driven, which is
  // unusable on touch, so the bottom-bar copy toggles on tap instead. Content
  // and logout flow are kept identical to SiteHeader/PageHeader.
  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

  // The bar sets overflow-y:hidden, so the panel is position:fixed (which
  // escapes that clip) and anchored to the trigger's measured rect.
  const place = useCallback(() => {
    const el = accountRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setAccountPos({ left: Math.round(r.left), width: Math.round(r.width) });
  }, []);

  useEffect(() => {
    if (!accountOpen) return;
    place();
    const onReflow = () => place();
    window.addEventListener("resize", onReflow);
    window.addEventListener("scroll", onReflow, true);
    return () => {
      window.removeEventListener("resize", onReflow);
      window.removeEventListener("scroll", onReflow, true);
    };
  }, [accountOpen, place]);

  useEffect(() => {
    if (!accountOpen) return;
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target)) return;
      if (accountRef.current?.contains(e.target)) return;
      setAccountOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [accountOpen]);

  // Mirrors SiteHeader/PageHeader: log out, return home, then surface the login modal.
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("login");
        if (el) {
          import("bootstrap").then((bootstrap) => {
            bootstrap.Modal.getOrCreateInstance(el).show();
          });
        }
      }, 100);
    }
  };

  return (
    <div className="tf-toolbar-bottom type-1150">
      <div className="toolbar-item">
        <a
          href="#canvasSearch"
          data-bs-toggle="offcanvas"
          aria-controls="offcanvasLeft"
        >
          <div className="toolbar-icon">
            <i className="icon-search" />
          </div>
          <div className="toolbar-label">Search</div>
        </a>
      </div>
      <div className="toolbar-item" ref={accountRef}>
        {user ? (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setAccountOpen((v) => !v);
            }}
            aria-expanded={accountOpen}
            aria-haspopup="true"
            className={accountOpen ? "active" : ""}
          >
            <div className="toolbar-icon">
              <i className="icon-account" />
            </div>
            <div className="toolbar-label">Account</div>
          </a>
        ) : (
          <a href="#login" data-bs-toggle="modal">
            <div className="toolbar-icon">
              <i className="icon-account" />
            </div>
            <div className="toolbar-label">Account</div>
          </a>
        )}
        {user && accountOpen && accountPos && (
          <ul
            ref={panelRef}
            className="menu-list d-flex flex-column align-items-start gap-2 mb-0 toolbar-account-menu"
            style={{ left: accountPos.left, minWidth: accountPos.width }}
          >
            <li>
              <Link
                to="/profile"
                className="menu-link-text link text_black-2"
              >
                Profile
              </Link>
            </li>
            {user.role === "seller" && (
              <li>
                <Link
                  to="/seller"
                  className="menu-link-text link text_black-2"
                >
                  Seller Dashboard
                </Link>
              </li>
            )}
            {user.role === "delivery" && (
              <li>
                <Link
                  to="/delivery"
                  className="menu-link-text link text_black-2"
                >
                  Delivery Dashboard
                </Link>
              </li>
            )}
            <li>
              <a
                href="#"
                onClick={handleLogout}
                className="menu-link-text link text_black-2"
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
      <div className="toolbar-item">
        <Link to={`/wishlist`}>
          <div className="toolbar-icon">
            <i className="icon-heart" />
            <div className="toolbar-count">
              <WishlistLength />
            </div>
          </div>
          <div className="toolbar-label">Wishlist</div>
        </Link>
      </div>
      <div className="toolbar-item">
        <a href="#shoppingCart" data-bs-toggle="modal">
          <div className="toolbar-icon">
            <i className="icon-bag" />
            <div className="toolbar-count">
              <CartLength />
            </div>
          </div>
          <div className="toolbar-label">Cart</div>
        </a>
      </div>
    </div>
  );
}
