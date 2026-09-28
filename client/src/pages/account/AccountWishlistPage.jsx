import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import AccountNav from "@/components/account/AccountNav.jsx";
import AccountWishlist from "@/components/account/AccountWishlist.jsx";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "My Account AccountWishlist || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function AccountWishlistPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account AccountWishlist</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <AccountWishlist />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
