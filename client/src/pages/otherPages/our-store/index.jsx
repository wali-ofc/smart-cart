import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import OurStore from "@/components/othersPages/OurStore";
import React from "react";

const metadata = {
  title: "Our Story || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function OurStoryPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Our Story</div>
        </div>
      </div>
      <OurStore />
      <Footer1 />
    </>
  );
}
