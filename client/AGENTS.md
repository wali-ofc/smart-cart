# CLIENT — SmartCart Storefront

## OVERVIEW

Vite 6 + React 19 storefront (SWC plugin, SCSS, Bootstrap 5, Swiper, PhotoSwipe, react-router-dom 7). Storefront content (product catalog, cart, dashboards) is driven by the Express API; `src/data/` holds ONLY marketing files (blogs, faqs, menu, ...). The iframed admin dashboard is GONE (Phase 7, D10) — all role dashboards are React pages.

> TEMPLATE FRONTEND, aligned to the spec: documentation.md §4.3 pages `/products /product/:id /cart /orders /likes /profile /seller /delivery` all exist as React routes in the frozen template look. AuthContext (JWT) + CartContext (server-synced) + ChatWidget (local state per D12) are the spec contexts. Tailwind/Lucide migration is CANCELLED.

> **UI FREEZE:** the current UI is considered PERFECT/FINAL — do NOT restyle or redesign anything. Build all new spec pages/features in the existing Bootstrap/SCSS/template-icon look. Tailwind/Lucide migration is CANCELLED.

## STRUCTURE

```
client/
├── src/
│   ├── components/     # UI library — 196 files (see components/AGENTS.md)
│   ├── data/           # marketing data ONLY — blogs/faqs/menu/socials/... (catalog REMOVED)
│   ├── context/        # Context.jsx (cart/wishlist localStorage) + AuthContext.jsx (JWT) + CartContext.jsx (server-synced)
│   ├── api/            # axios.js — the ONLY HTTP client
│   ├── pages/          # route views: dashboard/, otherPages/, shop/, shop-details/
│   └── utlis/          # TYPO'd dir name (wow.js, openCartModal.js, productMap.js)
├── public/
│   ├── scss/           # SCSS source — NOT in src/
│   ├── css/, fonts/    # static assets
│   └── images/         # 1,800+ media files (products/slider/collections/...)
├── index.html          # has #preloader removed by App.jsx on mount
├── vite.config.js      # port 5173, /api proxy → :5000, @/ alias, modern-compiler SCSS
└── jsconfig.json       # @/* path alias
```

## ENTRY CHAIN

`main.jsx` → `BrowserRouter` → `App.jsx` (imports `../public/scss/main.scss` + global CSS) → `AuthProvider` → `CartProvider` → `Context` → `<Routes>` + global modals (HomesModal, QuickView, ShopCart, Login, Register, SearchModal, ...) which render app-wide regardless of route. `ChatWidget` mounted inside App.

## ROUTES (src/App.jsx)

| Path | Page |
|------|------|
| `/` | HomePage1 (`pages/page.jsx`) |
| `/products`, `/shop-default`, `/shop-collection-*` | ShopDefaultPage |
| `/category/:categoryId` | CategoryPage |
| `/product/:id`, `/product-detail/:id` | ProductDetailPage (aliases per D14) |
| `/blog-grid`, `/blog-detail/:id` | Blog pages |
| `/cart`, `/view-cart`, `/checkout` | cart pages |
| `/profile`, `/orders`, `/likes`, `/wishlist`, `/my-account-*` | customer dashboard pages |
| `/seller`, `/seller/products`, `/seller/ai-predictions` | React seller pages (no iframe) |
| `/delivery` | DeliveryDashboard |
| `/payment-confirmation`, `/payment-failure` | payment result pages |
| `*` | PageNotFoundPage |

## STATE

- `context/Context.jsx` — cart/wishlist/compare; persisted to `localStorage` (`cartList`, `wishlist`, `compareItem`); exposes `addProductToCart`, `updateQuantity`, `addToWishlist`, `addToCompareItem`, `totalPrice`. Product lookups go through the API (`resolveServerProduct`).
- `context/CartContext.jsx` — server-synced cart via `/api/cart` (AuthProvider-wrapped).
- `context/AuthContext.jsx` — `useAuth()` → `{user, login, logout, loading}`; on mount GETs `/auth/me`; gates children until `loading` false. Works against Express cookies.
- `api/axios.js` — `api` instance, `baseURL: '/api'`, `withCredentials: true`. Import this everywhere; never `fetch` raw.

## CONVENTIONS

- Components: PascalCase files; page dirs use `kebab-case/` with `index.jsx` (e.g. `pages/otherPages/view-cart/index.jsx`) EXCEPT `product-detail` which is `pages/shop-details/product-detail/`
- Imports: `@/` for everything under src
- Use `useContextElement()` from `@/context/Context` for cart state — do not create new contexts for cart data
- Scroll/header/preloader effects handled in `App.jsx`, not per-page
- Product documents from the API are normalized via `normalizeProduct` (`@/utlis/productMap.js`) before rendering

## ANTI-PATTERNS

- Do NOT reimplement cart/wishlist/auth — extend `Context.jsx` / `CartContext.jsx` / `AuthContext.jsx`
- Tailwind + Lucide (documentation.md §1.4) are CANCELLED for the visual layer — the UI is frozen; build new work in the current Bootstrap/SCSS/template-icon look
- Do NOT import SCSS from `src/` — only `public/scss/` is the stylesheet root (existing pattern)
- Do NOT depend on `admin dashboard/` or `extracted-silva/` at runtime — vendor template source, reference only (iframe and `public/admin-build/` were removed in Phase 7 / D10)
- No eslint config exists despite the `lint` script — do not rely on `npm run lint`

## COMMANDS

```bash
cd client
npm run dev        # Vite dev server :5173 (proxies /api → :5000)
npm run build      # vite build → client/dist
npm run preview    # serve built output
```