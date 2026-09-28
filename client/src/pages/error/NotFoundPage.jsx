import Footer from "@/components/layout/Footer.jsx";
import SiteHeader from "@/components/layout/SiteHeader.jsx";

import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Page Not Found || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function NotFoundPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <SiteHeader />
      <section className="page-404-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="image">
                <img
                  alt="image"
                  src="/images/item/404.svg"
                  width="394"
                  height="319"
                />
              </div>
              <div className="title">Oops...That link is broken.</div>
              <p>
                Sorry for the inconvenience. Go to our homepage to check out our
                latest collections.
              </p>
              <Link
                href="/"
                className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
