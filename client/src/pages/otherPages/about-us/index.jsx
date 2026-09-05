import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import About from "@/components/othersPages/about/About";
import Features from "@/components/othersPages/about/Features";
import Testimonials from "@/components/othersPages/about/Testimonials";
import React from "react";

const metadata = {
  title: "About Us || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function AboutUsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">About Us</div>
        </div>
      </div>
      <About />
      <Features />
      <Testimonials />
      <Footer1 />
    </>
  );
}
