import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

export default function AccountEditForm() {
  const { user, refresh } = useAuth();

  const firstNameInit = user?.name ? user.name.split(" ")[0] : "";
  const lastNameInit = user?.name
    ? user.name.split(" ").slice(1).join(" ")
    : "";

  const [firstName, setFirstName] = useState(firstNameInit);
  const [lastName, setLastName] = useState(lastNameInit);
  const [email, setEmail] = useState(user?.email || "");
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileSaving(true);
    try {
      const name = (firstName + " " + lastName).replace(/\s+/g, " ").trim();
      await api.put("/auth/me", { name, email });
      await refresh();
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileMsg({
        type: "danger",
        text: err.response?.data?.error || "Failed to update profile.",
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({
        type: "danger",
        text: "New password and confirm password do not match.",
      });
      return;
    }
    setPasswordSaving(true);
    try {
      await api.put("/auth/password", { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMsg({
        type: "success",
        text: "Password updated successfully.",
      });
    } catch (err) {
      setPasswordMsg({
        type: "danger",
        text: err.response?.data?.error || "Failed to update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
    </svg>
  );

  return (
    <div className="my-account-content account-edit">
      <div className="">
        <form onSubmit={handleProfileSubmit}>
          {profileMsg && (
            <div className={`alert alert-${profileMsg.type} py-2 mb-3`}>
              {profileMsg.text}
            </div>
          )}
          <div className="tf-field style-1 mb_15">
            <input
              className="tf-field-input tf-input"
              placeholder=" "
              type="text"
              id="property1"
              required
              name="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property1"
            >
              First name
            </label>
          </div>
          <div className="tf-field style-1 mb_15">
            <input
              className="tf-field-input tf-input"
              placeholder=" "
              type="text"
              required
              id="property2"
              name="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property2"
            >
              Last name
            </label>
          </div>
          <div className="tf-field style-1 mb_15">
            <input
              className="tf-field-input tf-input"
              placeholder=" "
              type="email"
              autoComplete="abc@xyz.com"
              required
              id="property3"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property3"
            >
              Email
            </label>
          </div>
          <div className="mb_20">
            <button
              type="submit"
              className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
              disabled={profileSaving}
            >
              {profileSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        <h6 className="mb_20">Password Change</h6>
        <form onSubmit={handlePasswordSubmit}>
          {passwordMsg && (
            <div className={`alert alert-${passwordMsg.type} py-2 mb-3`}>
              {passwordMsg.text}
            </div>
          )}
          <div className="tf-field style-1 mb_30">
            <input
              className="tf-field-input tf-input pe-5"
              placeholder=" "
              type={showCurrent ? "text" : "password"}
              required
              autoComplete="current-password"
              id="property4"
              name="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property4"
            >
              Current password
            </label>
            <button
              type="button"
              className="password-toggle position-absolute end-0 top-50 translate-middle-y me-1"
              style={{ background: "transparent", border: 0, padding: ".25rem", cursor: "pointer", color: "#8a8a8a", zIndex: 2 }}
              onClick={() => setShowCurrent(!showCurrent)}
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <div className="tf-field style-1 mb_30">
            <input
              className="tf-field-input tf-input pe-5"
              placeholder=" "
              type={showNew ? "text" : "password"}
              id="property5"
              required
              autoComplete="new-password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property5"
            >
              New password
            </label>
            <button
              type="button"
              className="password-toggle position-absolute end-0 top-50 translate-middle-y me-1"
              style={{ background: "transparent", border: 0, padding: ".25rem", cursor: "pointer", color: "#8a8a8a", zIndex: 2 }}
              onClick={() => setShowNew(!showNew)}
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <div className="tf-field style-1 mb_30">
            <input
              className="tf-field-input tf-input pe-5"
              placeholder=" "
              type={showConfirm ? "text" : "password"}
              id="property6"
              required
              autoComplete="new-password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property6"
            >
              Confirm password
            </label>
            <button
              type="button"
              className="password-toggle position-absolute end-0 top-50 translate-middle-y me-1"
              style={{ background: "transparent", border: 0, padding: ".25rem", cursor: "pointer", color: "#8a8a8a", zIndex: 2 }}
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <div className="mb_20">
            <button
              type="submit"
              className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
              disabled={passwordSaving}
            >
              {passwordSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
