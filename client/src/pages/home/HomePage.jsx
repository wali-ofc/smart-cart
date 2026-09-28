import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Footer from "@/components/layout/Footer.jsx";
import SiteHeader from "@/components/layout/SiteHeader.jsx";
import Topbar from "@/components/layout/Topbar.jsx";
import Brands from "@/components/home/Brands.jsx";

import Categories from "@/components/home/Categories.jsx";

import Hero from "@/components/home/Hero.jsx";
import Lookbook from "@/components/home/Lookbook.jsx";
import Marquee from "@/components/home/Marquee.jsx";
import Products from "@/components/home/Products.jsx";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home 1 || SmartCart - Modern Multipurpose eCommerce",
  description: "SmartCart - Modern Multipurpose eCommerce",
};
export default function HomePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <SiteHeader />
      <Hero />
      <Marquee />
      <Products />
      <Lookbook />
      <Testimonials />
      <Categories />
      <Brands />
      <Features />
      <Footer />
    </>
  );
}
