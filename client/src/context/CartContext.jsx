import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import api from '@/api/axios';
import { useAuth } from './AuthContext';
import { openCartModal } from '@/utlis/openCartModal';
import { allProducts } from '@/data/products';

const CartContext = createContext();

export const CART_LOCAL_KEY = 'cartList';

// Server GET /api/cart cart line → frozen-UI cart item shape
const normalizeServerItem = (entry) => {
  const p = entry && entry.product;
  if (!p || !p._id) return null;
  return {
    id: String(p._id),
    title: p.name,
    imgSrc: p.image,
    price: Number(p.price) || 0,
    quantity: Number(entry.quantity) || 1,
    stock: Number(p.stock) || 0,
    isServer: true
  };
};

// Static catalog lookup (Phase 7 removes the static catalog — this is the only consumer surface)
const staticItem = (id) => allProducts.find((elm) => elm.id == id);

/**
 * Server-synced cart (documentation.md §4.3.2 CartContext).
 * - Signed in: /api/cart is the source of truth; legacy localStorage cart is
 *   migrated once on login (title-matched items re-added via the API, unmatched
 *   static-only items stay as a local "demo items" overlay).
 * - Anonymous: localStorage-backed local cart, exactly as before (UI freeze).
 */
export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  // server-synced items (normalized to the frozen-UI shape)
  const [serverItems, setServerItems] = useState([]);
  // anonymous cart OR signed-in overlay of unmatched static products — localStorage persisted
  const [localItems, setLocalItems] = useState([]);
  // seeded server catalog, fetched once, for static-id ↔ server-product resolution
  const [catalog, setCatalog] = useState([]);
  const [isCartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  const persistLocal = useCallback((next) => {
    setLocalItems(next);
    localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(next));
  }, []);

  // Load the seeded server catalog once (50 products — a single page at limit=50)
  useEffect(() => {
    let cancelled = false;
    api
      .get('/products', { params: { limit: 50 } })
      .then(({ data }) => {
        if (!cancelled) setCatalog(data.products || []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Anonymous mount / sign-out: rehydrate local cart from localStorage
  useEffect(() => {
    if (isAuthenticated) return;
    try {
      const raw = JSON.parse(localStorage.getItem(CART_LOCAL_KEY));
      setLocalItems(Array.isArray(raw) ? raw : []);
    } catch {
      setLocalItems([]);
    }
  }, [isAuthenticated]);

  // Anonymous: local cart is the source of truth → persist on change
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(localItems));
    }
  }, [localItems, isAuthenticated]);

  const resolveServerProduct = useCallback(
    (item) => {
      const id = String(item?.id ?? '');
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        const byId = catalog.find((p) => String(p._id) === id);
        if (byId) return byId;
      }
      const title = String(item?.title ?? '')
        .trim()
        .toLowerCase();
      if (title) {
        return catalog.find(
          (p) => String(p.name || '').trim().toLowerCase() === title
        );
      }
      return undefined;
    },
    [catalog]
  );

  const refreshServerCart = useCallback(async () => {
    const { data } = await api.get('/cart');
    setServerItems((data.cart || []).map(normalizeServerItem).filter(Boolean));
    setCartError(null);
  }, []);

  // Signed in: hydrate server cart + one-time migration of the legacy localStorage cart
  useEffect(() => {
    if (!isAuthenticated) {
      setServerItems([]);
      return;
    }
    let cancelled = false;
    const hydrate = async () => {
      setCartLoading(true);
      setCartError(null);
      try {
        let lines = [];
        const { data } = await api.get('/cart');
        lines = (data.cart || []).map(normalizeServerItem).filter(Boolean);
        if (cancelled) return;

        // one-time migration: server-matched legacy items are re-added via the API,
        // unmatched static-only items stay in the local overlay
        const legacy = (() => {
          try {
            const raw = JSON.parse(localStorage.getItem(CART_LOCAL_KEY));
            return Array.isArray(raw) ? raw : [];
          } catch {
            return [];
          }
        })();
        const migrated = new Set();
        for (const item of legacy) {
          if (cancelled) return;
          const match = resolveServerProduct(item);
          if (!match) continue;
          try {
            await api.post('/cart', {
              product: String(match._id),
              quantity: Math.max(1, Number(item.quantity) || 1)
            });
            migrated.add(String(item.id));
          } catch {
            // leave failed migrations in the overlay
          }
        }
        if (cancelled) return;

        const leftovers = legacy.filter((i) => !migrated.has(String(i.id)));
        localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(leftovers));
        setLocalItems(leftovers);

        if (migrated.size || !lines.length) {
          const fresh = await api.get('/cart');
          if (!cancelled) {
            lines = (fresh.data.cart || [])
              .map(normalizeServerItem)
              .filter(Boolean);
          }
        }
        if (!cancelled) setServerItems(lines);
      } catch (error) {
        if (!cancelled) {
          setCartError(error?.response?.data?.error || 'Could not load your cart');
        }
      } finally {
        if (!cancelled) setCartLoading(false);
      }
    };
    hydrate();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Rendered cart: anonymous → localItems; signed in → server items + static overlay
  const items = useMemo(
    () => (isAuthenticated ? [...serverItems, ...localItems] : localItems),
    [isAuthenticated, serverItems, localItems]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, el) => sum + (Number(el.price) || 0) * (Number(el.quantity) || 0),
        0
      ),
    [items]
  );

  const isAddedToCartProducts = useCallback(
    (id) => items.some((elm) => elm.id == id),
    [items]
  );

  const addProductToCart = useCallback(
    async (id, qty) => {
      const q = Math.max(1, Number(qty) || 1);
      const append = (prev) =>
        prev.some((elm) => elm.id == id)
          ? prev.map((elm) =>
              elm.id == id
                ? { ...elm, quantity: Number(elm.quantity) + q }
                : elm
            )
          : [
              ...prev,
              {
                ...(staticItem(id) || {
                  id,
                  title: `Item #${id}`,
                  imgSrc: '',
                  price: 0
                }),
                quantity: q
              }
            ];

      if (!isAuthenticated) {
        persistLocal(append(localItems));
        openCartModal();
        return;
      }

      const server = resolveServerProduct({ id });
      if (server) {
        try {
          await api.post('/cart', { product: String(server._id), quantity: q });
          await refreshServerCart();
          setCartError(null);
          openCartModal();
        } catch (error) {
          setCartError(error?.response?.data?.error || 'Could not add to cart');
        }
        return;
      }

      // static-only product while signed in → local overlay (demo item, not orderable)
      persistLocal(append(localItems));
      openCartModal();
    },
    [isAuthenticated, resolveServerProduct, refreshServerCart, localItems, persistLocal]
  );

  const updateQuantity = useCallback(
    async (id, qty) => {
      const q = Math.min(99, Math.max(1, Number(qty) || 1));
      if (!items.some((elm) => elm.id == id)) {
        // legacy behavior: quantity set on a non-cart item adds it
        addProductToCart(id, q);
        return;
      }
      if (!isAuthenticated || localItems.some((elm) => elm.id == id)) {
        setLocalItems((prev) =>
          prev.map((elm) => (elm.id == id ? { ...elm, quantity: q } : elm))
        );
        return;
      }
      try {
        await api.put(`/cart/${id}`, { quantity: q });
        await refreshServerCart();
        setCartError(null);
      } catch (error) {
        setCartError(error?.response?.data?.error || 'Could not update quantity');
      }
    },
    [isAuthenticated, localItems, items, refreshServerCart, addProductToCart]
  );

  const removeFromCart = useCallback(
    async (id) => {
      if (!isAuthenticated || localItems.some((elm) => elm.id == id)) {
        setLocalItems((prev) => prev.filter((elm) => elm.id != id));
        return;
      }
      try {
        await api.delete(`/cart/${id}`);
        await refreshServerCart();
        setCartError(null);
      } catch (error) {
        setCartError(error?.response?.data?.error || 'Could not remove item');
      }
    },
    [isAuthenticated, localItems, refreshServerCart]
  );

  const clearCart = useCallback(async () => {
    localStorage.setItem(CART_LOCAL_KEY, JSON.stringify([]));
    setLocalItems([]);
    if (!isAuthenticated) return;
    try {
      await api.delete('/cart');
      setServerItems([]);
      setCartError(null);
    } catch (error) {
      setCartError(error?.response?.data?.error || 'Could not clear cart');
    }
  }, [isAuthenticated]);

  // Legacy direct-setter escape hatch used by a few template components:
  // anonymous → replace local cart; signed in → the server is the source of truth
  const setLegacyCart = useCallback(
    (next) => {
      if (isAuthenticated) return;
      if (Array.isArray(next)) {
        setLocalItems(next);
        localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(next));
      }
    },
    [isAuthenticated]
  );

  const value = {
    items,
    setLegacyCart,
    totalPrice,
    addProductToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isAddedToCartProducts,
    isCartLoading,
    cartError
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);