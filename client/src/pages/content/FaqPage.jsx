import MetaComponent from "@/components/common/MetaComponent";
import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import FaqShopping from "@/components/content/FaqShopping.jsx";
import FaqPayment from "@/components/content/FaqPayment.jsx";
import FaqReturns from "@/components/content/FaqReturns.jsx";
import React from "react";

const metadata = {
  title: "FAQ's || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function FaqPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">FAQ's</div>
        </div>
      </div>
      <section className="flat-spacing-25">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="tf-main-area-page tf-page-faq">
                <FaqShopping />
                <FaqPayment />
                <FaqReturns />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
