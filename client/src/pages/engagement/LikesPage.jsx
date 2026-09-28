import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import Topbar from "@/components/layout/Topbar.jsx";

import LikesGrid from "@/components/engagement/LikesGrid.jsx";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "My LikesGrid || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function LikesPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <PageHeader />
      <div className="tf-page-title ">
        <div className="container-full">
          <div className="heading text-center">Liked products</div>
        </div>
      </div>

      <LikesGrid />

      <Footer />
    </>
  );
}