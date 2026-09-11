import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const encode = (str) => encodeURIComponent(str);

export default function ShareModal() {
  const { pathname } = useLocation();
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : pathname;
  const shareText = "Check this out on SmartCart";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers / non-secure contexts
      const input = document.getElementById("share-link-input");
      if (input) {
        input.select();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const socials = [
    {
      label: "Facebook",
      icon: "icon-fb",
      cls: "social-facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encode(shareUrl)}`,
    },
    {
      label: "X (Twitter)",
      icon: "icon-Icon-x",
      cls: "social-twiter",
      href: `https://twitter.com/intent/tweet?url=${encode(shareUrl)}&text=${encode(shareText)}`,
    },
    {
      label: "WhatsApp",
      icon: "icon-whatsapp",
      cls: "social-whatsapp",
      href: `https://wa.me/?text=${encode(`${shareText} ${shareUrl}`)}`,
    },
    {
      label: "Pinterest",
      icon: "icon-pinterest-1",
      cls: "social-pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encode(shareUrl)}&description=${encode(shareText)}`,
    },
    {
      label: "Email",
      icon: "icon-mail",
      cls: "social-email",
      href: `mailto:?subject=${encode(shareText)}&body=${encode(shareUrl)}`,
    },
  ];

  return (
    <div
      className="modal modalCentered fade modalDemo tf-product-modal modal-part-content"
      id="share_social"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Share</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="overflow-y-auto">
            <ul className="tf-social-icon d-flex gap-10">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`box-icon bg_line ${social.cls}`}
                    aria-label={`Share on ${social.label}`}
                  >
                    <i className={`icon ${social.icon}`} />
                  </a>
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                copyLink();
              }}
              className="form-share"
              method="post"
              acceptCharset="utf-8"
            >
              <fieldset>
                <input
                  id="share-link-input"
                  type="text"
                  readOnly
                  value={shareUrl}
                  onFocus={(e) => e.target.select()}
                  tabIndex={0}
                  aria-required="true"
                />
              </fieldset>
              <div className="button-submit">
                <button
                  className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                  type="submit"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}