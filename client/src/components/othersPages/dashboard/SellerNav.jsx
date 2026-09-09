import { Link, useLocation } from "react-router-dom";

const sellerLinks = [
  { href: "/seller", label: "Dashboard" },
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
              pathname === link.href || pathname.startsWith(link.href + "/")
                ? "active"
                : ""
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}