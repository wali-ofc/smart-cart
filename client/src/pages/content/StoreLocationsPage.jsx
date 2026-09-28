import MetaComponent from "@/components/common/MetaComponent";
import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import StoreLocator from "@/components/content/StoreLocator.jsx";
import React from "react";

const metadata = {
  title: "Visit Our Store || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function StoreLocationsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Store Locations</div>
        </div>
      </div>
      <StoreLocator />
      <Footer />
    </>
  );
}
