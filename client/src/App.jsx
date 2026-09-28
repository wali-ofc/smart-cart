import { useEffect, useState } from "react";

import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";

import HomesModal from "@/components/modals/HomesModal.jsx";
import Context from "@/context/Context";
import QuickView from "@/components/modals/QuickView.jsx";
import ProductSidebar from "@/components/modals/ProductSidebar.jsx";
import ShopCart from "@/components/modals/ShopCart.jsx";
import AskQuestion from "@/components/modals/AskQuestion.jsx";
import FindSize from "@/components/modals/FindSize.jsx";
import Login from "@/components/modals/Login.jsx";
import MobileMenu from "@/components/modals/MobileMenu.jsx";
import Register from "@/components/modals/Register.jsx";
import ResetPass from "@/components/modals/ResetPass.jsx";
import SearchModal from "@/components/modals/SearchModal.jsx";
import ShareModal from "@/components/modals/ShareModal.jsx";
import ToolbarBottom from "@/components/modals/ToolbarBottom.jsx";

import ScrollTop from "@/components/common/ScrollTop";
import { Route, Routes, useLocation } from "react-router-dom";
import WOW from "@/utlis/wow";
import ScrollToTopBehaviour from "./components/common/ScrollToTopBehaviour.jsx";

import HomePage from "./pages/home/HomePage";

import ProductListPage from "./pages/shop/ProductListPage";
import ProductDetailPage from "./pages/shop/ProductDetailPage";
import CategoryPage from "./pages/shop/CategoryPage";

import BlogGridPage from "./pages/blog/BlogGridPage";
import BlogDetailPage from "./pages/blog/BlogDetailPage";

import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";

import AccountProfilePage from "./pages/account/AccountProfilePage";
import AccountOrdersPage from "./pages/account/AccountOrdersPage";
import AccountOrderDetailPage from "./pages/account/AccountOrderDetailPage";
import AccountEditProfilePage from "./pages/account/AccountEditProfilePage";
import AccountWishlistPage from "./pages/account/AccountWishlistPage";

import SellerDashboardPage from "./pages/seller/SellerDashboardPage";
import SellerOrdersPage from "./pages/seller/SellerOrdersPage";
import SellerOrderDetailPage from "./pages/seller/SellerOrderDetailPage";
import SellerProductsPage from "./pages/seller/SellerProductsPage";
import SellerAiPredictionsPage from "./pages/seller/SellerAiPredictionsPage";
import SellerCouriersPage from "./pages/seller/SellerCouriersPage";
import DeliveryDashboardPage from "./pages/delivery/DeliveryDashboardPage";

import WishlistPage from "./pages/engagement/WishlistPage";
import LikesPage from "./pages/engagement/LikesPage";

import PaymentConfirmationPage from "./pages/payment/PaymentConfirmationPage";
import PaymentFailurePage from "./pages/payment/PaymentFailurePage";

import AboutUsPage from "./pages/content/AboutUsPage";
import ContactUsPage from "./pages/content/ContactUsPage";
import FaqPage from "./pages/content/FaqPage";
import PrivacyPolicyPage from "./pages/content/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/content/TermsConditionsPage";
import ShippingDeliveryPage from "./pages/content/ShippingDeliveryPage";
import ReturnsPage from "./pages/content/ReturnsPage";
import StoreLocationsPage from "./pages/content/StoreLocationsPage";
import OurStoryPage from "./pages/content/OurStoryPage";

import NotFoundPage from "./pages/error/NotFoundPage";
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
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductListPage />} />
                <Route path="shop-default" element={<ProductListPage />} />
                <Route path="shop-collection-list" element={<ProductListPage />} />
                <Route path="shop-collection-sub" element={<ProductListPage />} />
                <Route path="category/:categoryId" element={<CategoryPage />} />
                <Route path="product-detail/:id" element={<ProductDetailPage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="blog-grid" element={<BlogGridPage />} />
                <Route path="blog-detail/:id" element={<BlogDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="view-cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                
                <Route path="profile" element={<AccountProfilePage />} />
                <Route path="orders" element={<AccountOrdersPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="likes" element={<LikesPage />} />

                {/* Dashboard Sub-routes */}
                <Route path="my-account" element={<AccountProfilePage />} />
                <Route path="my-account-orders" element={<AccountOrdersPage />} />
                <Route path="my-account-edit" element={<AccountEditProfilePage />} />
                <Route path="my-account-wishlist" element={<AccountWishlistPage />} />
                <Route path="my-account-orders-details" element={<AccountOrderDetailPage />} />
                <Route path="my-account-orders-details/:id" element={<AccountOrderDetailPage />} />

                <Route path="seller" element={<SellerDashboardPage />} />
                <Route path="seller/orders" element={<SellerOrdersPage />} />
                <Route path="seller/orders/:id" element={<SellerOrderDetailPage />} />
                <Route path="seller/products" element={<SellerProductsPage />} />
                <Route path="seller/ai-predictions" element={<SellerAiPredictionsPage />} />
                <Route path="seller/couriers" element={<SellerCouriersPage />} />
                <Route path="delivery" element={<DeliveryDashboardPage />} />

                <Route path="payment-failure" element={<PaymentFailurePage />} />
                <Route path="payment-confirmation" element={<PaymentConfirmationPage />} />

                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms-conditions" element={<TermsConditionsPage />} />
                <Route path="delivery-return" element={<ReturnsPage />} />
                <Route path="shipping-delivery" element={<ShippingDeliveryPage />} />
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="contact" element={<ContactUsPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="store-location" element={<StoreLocationsPage />} />
                <Route path="our-story" element={<OurStoryPage />} />

                <Route path="page-not-found" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
          <HomesModal /> 
          <QuickView />
          <ProductSidebar />
          <ShopCart />
          <AskQuestion />
          <FindSize />
          <Login />
          <MobileMenu />
          <Register />
          <ResetPass />
          <SearchModal />
          <ShareModal />
          <ToolbarBottom />
          <ChatWidget />
        </Context>
        </CartProvider>
      </AuthProvider>
      <ScrollTop />
      <ScrollToTopBehaviour />
    </>
  );
}

export default App;

