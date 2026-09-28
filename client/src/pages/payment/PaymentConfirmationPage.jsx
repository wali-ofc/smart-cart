import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import PaymentConfirmationView from "@/components/payment/PaymentConfirmationView.jsx";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Payment Confirmation || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function PaymentConfirmationPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Payment confirmation</div>
        </div>
      </div>

      <PaymentConfirmationView />
      <Footer />
    </>
  );
}
