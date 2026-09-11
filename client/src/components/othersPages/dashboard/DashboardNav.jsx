import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const accountLinks = [
  { href: "/my-account", label: "Dashboard" },
  { href: "/my-account-orders", label: "Orders" },
  { href: "/my-account-address", label: "Addresses" },
  { href: "/my-account-edit", label: "Account Details" },
  { href: "/my-account-wishlist", label: "Wishlist" },
];

export default function DashboardNav() {
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
      navigate("/login");
    }
  };

  return (
    <ul className="my-account-nav">
      {accountLinks.map((link, index) => (
        <li key={index}>
          <Link
            to={link.href}
            className={`my-account-nav-item ${
              pathname == link.href ? "active" : ""
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
