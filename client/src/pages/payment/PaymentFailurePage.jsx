import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import PaymentFailureView from "@/components/payment/PaymentFailureView.jsx";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Payment Failure || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function PaymentFailurePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Payment Failure</div>
        </div>
      </div>

      <PaymentFailureView />
      <Footer />
    </>
  );
}
