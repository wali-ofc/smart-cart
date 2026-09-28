import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const sellerLinks = [
  { href: "/seller", label: "Dashboard" },
  { href: "/seller/orders", label: "Orders" },
  { href: "/seller/products", label: "Products" },
  { href: "/seller/couriers", label: "Couriers" },
  { href: "/seller/ai-predictions", label: "AI Predictions" },
];

export default function SellerNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

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
            const instance = bootstrap.Modal.getOrCreateInstance(el);
            instance.show();
          });
        }
      }, 100);
    }
  };

  return (
    <ul className="my-account-nav">
      {sellerLinks.map((link, index) => (
        <li key={index}>
          <Link
            to={link.href}
            className={`my-account-nav-item ${
              link.href === "/seller"
                ? pathname === "/seller"
                : pathname === link.href || pathname.startsWith(link.href + "/")
                ? "active"
                : ""
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
      <li>
        <Link to="/login" onClick={handleLogout} className="my-account-nav-item">
          Logout
        </Link>
      </li>
    </ul>
  );
}