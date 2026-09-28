import MetaComponent from "@/components/common/MetaComponent";
import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import AboutSection from "@/components/content/AboutSection.jsx";
import AboutFeatures from "@/components/content/AboutFeatures.jsx";
import AboutTestimonials from "@/components/content/AboutTestimonials.jsx";
import React from "react";

const metadata = {
  title: "AboutSection Us || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function AboutUsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">AboutSection Us</div>
        </div>
      </div>
      <AboutSection />
      <AboutFeatures />
      <AboutTestimonials />
      <Footer />
    </>
  );
}
