import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ShopDefault from "@/components/shop/ShopDefault";
import React from "react";
import { useParams } from "react-router-dom";
import { products1 } from "@/data/products";

import MetaComponent from "@/components/common/MetaComponent";

export default function CategoryPage() {
  const { categoryId } = useParams();
  
  // Format the category name for the title
  const formattedCategory = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace("-", " ")
    : "Category";

  const metadata = {
    title: `${formattedCategory} || SmartCart - Modern Multipurpose eCommerce`,
    description: `Shop the latest ${formattedCategory} on SmartCart`,
  };

  // Filter products by category (handle lowercase matches)
  const categoryProducts = products1.filter(
    (product) => product.category && product.category.toLowerCase() === categoryId.toLowerCase().replace("-", " ")
  );

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">{formattedCategory}</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of {formattedCategory}
          </p>
        </div>
      </div>
      {/* Reusing ShopDefault, but explicitly passing only products for this category */}
      {/* If categoryProducts is empty, ShopFilter will just show empty results, which is correct for empty categories */}
      {/* Wait, if we pass empty array [], does it override default? Yes. So it shows 0 products. */}
      <ShopDefault initialProducts={categoryProducts} />
      <Footer1 />
    </>
  );
}
