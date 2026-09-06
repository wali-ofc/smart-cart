import { allProducts } from "@/data/products";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

/**
 * Legacy global storefront state (wishlist/compare/quick-view) + cart slice.
 * The cart slice now comes from CartContext (server-synced when signed in,
 * localStorage when anonymous) — the exposed API surface is unchanged so all
 * 84 useContextElement consumers keep working.
 */
export default function Context({ children }) {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);
  const cart = useCart();

  const [wishList, setWishList] = useState([1, 2, 3]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);

  const addToWishlist = (id) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, id]);
    } else {
      setWishList((pre) => [...pre].filter((elm) => elm != id));
    }
  };
  const removeFromWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => wishList.includes(id);
  const isAddedtoCompareItem = (id) => compareItem.includes(id);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("wishlist"));
      if (items?.length) {
        setWishList(items);
      }
    } catch {
      // corrupted wishlist key — fall back to defaults
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts: cart.items,
    setCartProducts: cart.setLegacyCart,
    totalPrice: cart.totalPrice,
    addProductToCart: cart.addProductToCart,
    isAddedToCartProducts: cart.isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity: cart.updateQuantity,
    removeFromCart: cart.removeFromCart,
    clearCart: cart.clearCart,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}