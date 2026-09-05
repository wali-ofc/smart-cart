import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import StoreLocations from "@/components/othersPages/StoreLocations";
import React from "react";

const metadata = {
  title: "Visit Our Store || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function StoreLocationsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Store Locations</div>
        </div>
      </div>
      <StoreLocations />
      <Footer1 />
    </>
  );
}
