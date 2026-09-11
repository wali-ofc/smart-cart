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

  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickAddItem, setQuickAddItem] = useState(null);

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

// Legacy template demo seeded wishlist/compare as [1, 2, 3] into localStorage;
  // real ids are Mongo _id hex strings. Drop any residue that isn't a real id
  // so the phantom template wishlist never resurfaces after rehydrate.
  const isRealProductId = (id) => typeof id === "string" && /^[0-9a-f]{24}$/i.test(id);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("wishlist"));
      if (items?.length) {
        const real = items.filter(isRealProductId);
        if (real.length) setWishList(real);
        else localStorage.removeItem("wishlist");
      }
    } catch {
      // corrupted wishlist key — fall back to defaults
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("compareItem"));
      if (items?.length) {
        const real = items.filter(isRealProductId);
        if (real.length) setCompareItem(real);
        else localStorage.removeItem("compareItem");
      }
    } catch {
      // corrupted compare key — fall back to defaults
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("compareItem", JSON.stringify(compareItem));
  }, [compareItem]);

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
    cartError: cart.cartError,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}