import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import Topbar from "@/components/layout/Topbar.jsx";

import WishlistGrid from "@/components/engagement/WishlistGrid.jsx";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "WishlistGrid || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function WishlistPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <PageHeader />
      <div className="tf-page-title ">
        <div className="container-full">
          <div className="heading text-center">Your wishlist</div>
        </div>
      </div>

      <WishlistGrid />

      <Footer />
    </>
  );
}
