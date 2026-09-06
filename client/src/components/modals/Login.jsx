import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const closeModal = () => {
    const el = document.getElementById("login");
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
      await login(email, password);
      closeModal();
    } catch (err) {
      setError(
        err?.response?.data?.error || "Login failed. Please check your credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="login"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Log in</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="tf-login-form">
            <form onSubmit={handleSubmit} acceptCharset="utf-8">
              {error && (
                <div className="alert alert-danger py-2 mb-3">{error}</div>
              )}
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  required
                  autoComplete="abc@xyz.com"
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="tf-field-label">Password *</label>
              </div>
              <div>
                <a
                  href="#forgotPassword"
                  data-bs-toggle="modal"
                  className="btn-link link"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                  >
                    <span>{submitting ? "Signing in..." : "Log in"}</span>
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#register"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    New customer? Create your account
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