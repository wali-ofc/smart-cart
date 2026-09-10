import { Link, useLocation } from "react-router-dom";

const sellerLinks = [
  { href: "/seller", label: "Dashboard" },
  { href: "/seller/orders", label: "Orders" },
  { href: "/seller/products", label: "Products" },
  { href: "/seller/ai-predictions", label: "AI Predictions" },
];

export default function SellerNav() {
  const { pathname } = useLocation();
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
        <Link to={`/login`} className="my-account-nav-item">
          Logout
        </Link>
      </li>
    </ul>
  );
}