import MetaComponent from "@/components/common/MetaComponent";
import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import ContactForm from "@/components/content/ContactForm.jsx";
import ContactMap from "@/components/content/ContactMap.jsx";
import React from "react";

const metadata = {
  title: "Contact Us || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};

export default function ContactUsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Contact Us</div>
        </div>
      </div>
      <ContactMap />
      <ContactForm />
      <Footer />
    </>
  );
}
