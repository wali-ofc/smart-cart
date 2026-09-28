import Footer from "@/components/layout/Footer.jsx";
import PageHeader from "@/components/layout/PageHeader.jsx";
import ProductListing from "@/components/shop/ProductListing.jsx";
import React from "react";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

export default function CategoryPage() {
  const { categoryId } = useParams();

  // useParams already URL-decodes: home links are /category/<encodeURIComponent(name)>
  const formattedCategory = categoryId || "Category";

  const metadata = {
    title: `${formattedCategory} || SmartCart - Modern Multipurpose eCommerce`,
    description: `Shop the latest ${formattedCategory} on SmartCart`,
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <PageHeader />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">{formattedCategory}</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of {formattedCategory}
          </p>
        </div>
      </div>
      {/* Server-backed category feed (GET /api/products?category=) */}
      <ProductListing initialCategory={formattedCategory} />
      <Footer />
    </>
  );
}