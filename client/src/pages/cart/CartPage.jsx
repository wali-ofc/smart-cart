import Testimonials from "@/components/common/Testimonials";
import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import CartView from "@/components/cart/CartView.jsx";
import RecentProducts from "@/components/product/RecentProducts.jsx";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "View CartView || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function CartPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Shopping CartView</div>
        </div>
      </div>

      <CartView />
      <Testimonials />
      <RecentProducts />
      <Footer />
    </>
  );
}
