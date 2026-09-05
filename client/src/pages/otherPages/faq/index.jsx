import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Faq1 from "@/components/othersPages/faq/Faq1";
import React from "react";

const metadata = {
  title: "FAQ's || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function FaqPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">FAQ's</div>
        </div>
      </div>
      <Faq1 />
      <Footer1 />
    </>
  );
}
