import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import AccountNav from "@/components/account/AccountNav.jsx";
import AccountProfile from "@/components/account/AccountProfile.jsx";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "My Account || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function AccountProfilePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <AccountProfile />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
