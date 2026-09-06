import { useEffect, useState } from "react";

import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";

import HomesModal from "@/components/modals/HomesModal";
import Context from "@/context/Context";
import QuickView from "@/components/modals/QuickView";
import ProductSidebar from "@/components/modals/ProductSidebar";
import QuickAdd from "@/components/modals/QuickAdd";
import ShopCart from "@/components/modals/ShopCart";
import AskQuestion from "@/components/modals/AskQuestion";
import FindSize from "@/components/modals/FindSize";
import Login from "@/components/modals/Login";
import MobileMenu from "@/components/modals/MobileMenu";
import Register from "@/components/modals/Register";
import ResetPass from "@/components/modals/ResetPass";
import SearchModal from "@/components/modals/SearchModal";
import ToolbarBottom from "@/components/modals/ToolbarBottom";
import ToolbarShop from "@/components/modals/ToolbarShop";

import ScrollTop from "@/components/common/ScrollTop";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage1 from "./pages/page";
import BlogGridPage from "./pages/BlogGridPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import WOW from "@/utlis/wow";

import ShopDefaultPage from "./pages/shop/shop-default";
import ProductDetailPage from "./pages/shop-details/product-detail";

import ViewCartPage from "./pages/otherPages/view-cart";
import CheckoutPage from "./pages/otherPages/checkout";
import PaymentCOnfirmationPage from "./pages/otherPages/payment-confirmation";
import PaymentFailurePage from "./pages/otherPages/payment-failure";
import AdminIframe from "./pages/dashboard/AdminIframe";

import MyAccountPage from "./pages/dashboard/my-account";
import MyAccountOrderPage from "./pages/dashboard/my-account-orders";
import MyAccountAddedssPage from "./pages/dashboard/my-account-address";
import MyAccountEditPage from "./pages/dashboard/my-account-edit";
import MyAccountWishlistPage from "./pages/dashboard/my-account-wishlist";
import MyAccountOrderDetailsPage from "./pages/dashboard/my-account-orders-details";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import DeliveryDashboard from "./pages/dashboard/DeliveryDashboard";

import WishlistPage from "./pages/otherPages/wishlist";
import PageNotFoundPage from "./pages/otherPages/page-not-found";

import PrivacyPolicyPage from "./pages/otherPages/privacy-policy";
import TermsConditionsPage from "./pages/otherPages/terms-conditions";
import DeliveryReturnPage from "./pages/otherPages/delivery-return";
import ShippingDeliveryPage from "./pages/otherPages/shipping-delivery";
import AboutUsPage from "./pages/otherPages/about-us";
import ContactUsPage from "./pages/otherPages/contact-us";
import FaqPage from "./pages/otherPages/faq";
import StoreLocationsPage from "./pages/otherPages/store-locations";
import OurStoryPage from "./pages/otherPages/our-store";

import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import CategoryPage from "./pages/shop/category";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ChatWidget from "./components/common/ChatWidget";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {});
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add("header-bg");
        } else {
          header.classList.remove("header-bg");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollY = { current: window?.scrollY || 0 };

  useEffect(() => {
    setScrollDirection("up");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      } else {
        setScrollDirection("down");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    import("bootstrap")
      .then((bootstrap) => {
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => console.error("Error loading Bootstrap:", error));
  }, [pathname]); 

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection == "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);

  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);

  useEffect(() => {
    const initializeDirection = () => {
      const direction = localStorage.getItem("direction");
      if (direction) {
        const parsedDirection = JSON.parse(direction);
        document.documentElement.dir = parsedDirection.dir;
        document.body.classList.add(parsedDirection.dir);
      } else {
        document.documentElement.dir = "ltr";
      }

      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("disabled");
      }
    };
    initializeDirection();
  }, []);

  return (
    <>
      <div className="preload preload-container" id="preloader">
        <div className="preload-logo">
          <div className="spinner"></div>
        </div>
      </div>
      <AuthProvider>
        <CartProvider>
          <Context>
          <div id="wrapper">
            <Routes>
              <Route path="/">
                <Route index element={<HomePage1 />} />
                <Route path="products" element={<ShopDefaultPage />} />
                <Route path="shop-default" element={<ShopDefaultPage />} />
                <Route path="shop-collection-list" element={<ShopDefaultPage />} />
                <Route path="shop-collection-sub" element={<ShopDefaultPage />} />
                <Route path="category/:categoryId" element={<CategoryPage />} />
                <Route path="product-detail/:id" element={<ProductDetailPage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="blog-grid" element={<BlogGridPage />} />
                <Route path="blog-detail/:id" element={<BlogDetailPage />} />
                <Route path="cart" element={<ViewCartPage />} />
                <Route path="view-cart" element={<ViewCartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                
                <Route path="profile" element={<MyAccountPage />} />
                <Route path="orders" element={<MyAccountOrderPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="likes" element={<WishlistPage />} />

                {/* Dashboard Sub-routes */}
                <Route path="my-account" element={<MyAccountPage />} />
                <Route path="my-account-orders" element={<MyAccountOrderPage />} />
                <Route path="my-account-address" element={<MyAccountAddedssPage />} />
                <Route path="my-account-edit" element={<MyAccountEditPage />} />
                <Route path="my-account-wishlist" element={<MyAccountWishlistPage />} />
                <Route path="my-account-orders-details" element={<MyAccountOrderDetailsPage />} />
                <Route path="my-account-orders-details/:id" element={<MyAccountOrderDetailsPage />} />

                <Route path="seller/*" element={<AdminIframe />} />
                <Route path="delivery" element={<DeliveryReturnPage />} />

                <Route path="payment-failure" element={<PaymentFailurePage />} />
                <Route path="payment-confirmation" element={<PaymentCOnfirmationPage />} />

                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms-conditions" element={<TermsConditionsPage />} />
                <Route path="delivery-return" element={<DeliveryReturnPage />} />
                <Route path="shipping-delivery" element={<ShippingDeliveryPage />} />
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="contact" element={<ContactUsPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="store-location" element={<StoreLocationsPage />} />
                <Route path="our-story" element={<OurStoryPage />} />

                <Route path="page-not-found" element={<PageNotFoundPage />} />
                <Route path="*" element={<PageNotFoundPage />} />
              </Route>
            </Routes>
          </div>
          <HomesModal /> 
          <QuickView />
          <QuickAdd />
          <ProductSidebar />
          <ShopCart />
          <AskQuestion />
          <FindSize />
          <Login />
          <MobileMenu />
          <Register />
          <ResetPass />
          <SearchModal />
          <ToolbarBottom />
          <ToolbarShop />
          <ChatWidget />
        </Context>
        </CartProvider>
      </AuthProvider>
      <ScrollTop />
      <ScrollTopBehaviour />
    </>
  );
}

export default App;

