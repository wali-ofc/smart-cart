import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import AccountEditForm from "@/components/account/AccountEditForm.jsx";
import AccountNav from "@/components/account/AccountNav.jsx";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "My Account Edit || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Ultimate React Nextjs Ecommerce Template",
};
export default function AccountEditProfilePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account Edit</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <AccountEditForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
