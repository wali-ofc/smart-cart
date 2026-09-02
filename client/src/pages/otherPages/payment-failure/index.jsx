import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import PaymentFailure from "@/components/othersPages/PaymentFailure";
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
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Payment Failure</div>
        </div>
      </div>

      <PaymentFailure />
      <Footer1 />
    </>
  );
}
