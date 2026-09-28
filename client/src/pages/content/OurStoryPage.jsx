import MetaComponent from "@/components/common/MetaComponent";
import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import OurStory from "@/components/content/OurStory.jsx";
import React from "react";

const metadata = {
  title: "Our Story || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function OurStoryPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Our Story</div>
        </div>
      </div>
      <OurStory />
      <Footer />
    </>
  );
}
