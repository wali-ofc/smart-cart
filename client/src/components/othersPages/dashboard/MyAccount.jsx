import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export default function MyAccount() {
  const { user } = useAuth();
  const name = user?.name || "Customer";
  return (
    <div className="my-account-content account-dashboard">
      <div className="mb_60">
        <h5 className="fw-5 mb_20">Hello {name}</h5>
        {user && (
          <p className="mb_16">
            Signed in as <strong>{user.email}</strong>
            {user.role && (
              <span className="text_primary text-capitalize">
                {" "}
                ({user.role})
              </span>
            )}
          </p>
        )}
        <p>
          From your account dashboard you can view your{" "}
          <Link className="text_primary" to={`/my-account-orders`}>
            recent orders
          </Link>
          , manage your{" "}
          <Link className="text_primary" to={`/my-account-edit`}>
            shipping and billing addresses
          </Link>
          , and{" "}
          <Link className="text_primary" to={`/my-account-edit`}>
            edit your password and account details
          </Link>
          .
        </p>
      </div>
    </div>
  );
}