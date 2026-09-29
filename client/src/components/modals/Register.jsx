import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CustomSelect from "@/components/common/CustomSelect";

export default function Register() {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const closeModal = () => {
    const el = document.getElementById("register");
    if (el) {
      import("bootstrap").then((bootstrap) => {
        const instance = bootstrap.Modal.getOrCreateInstance(el);
        instance.hide();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(`${firstName} ${lastName}`.trim(), email, password, role);
      closeModal();
    } catch (err) {
      setError(
        err?.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="register"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Register</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="tf-login-form">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger py-2 mb-3">{error}</div>
              )}
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label className="tf-field-label">First name</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="tf-field-label">Last name</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  autoComplete="abc@xyz.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="tf-field-label">Email *</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="tf-field-label">Password *</label>
              </div>
              <div className="mb-3">
                <label className="form-label small mb_8" htmlFor="register-account-type">Account type *</label>
                <CustomSelect
                  id="register-account-type"
                  options={[
                    { value: "customer", label: "Customer" },
                    { value: "seller", label: "Seller" },
                    { value: "delivery", label: "Delivery agent" }
                  ]}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                  >
                    <span>
                      {submitting ? "Creating account..." : "Register"}
                    </span>
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#login"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    Already have an account? Log in here
                    <i className="icon icon-arrow1-top-left" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}