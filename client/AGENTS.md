# CLIENT — SmartCart Storefront

## OVERVIEW

Vite 6 + React 19 storefront (SWC plugin, SCSS, Bootstrap 5, Swiper, PhotoSwipe, react-router-dom 7). Storefront content is driven by static data in `src/data/`; the Express API is used for auth and the iframed admin dashboard, not for the product catalog.

## STRUCTURE

```
client/
├── src/
│   ├── components/     # UI library — 252 files, 42k lines (see components/AGENTS.md)
│   ├── data/           # static catalog, menus, blogs (see data/AGENTS.md)
│   ├── context/        # Context.jsx (cart/wishlist) + AuthContext.jsx (JWT)
│   ├── api/            # axios.js — the ONLY HTTP client
│   ├── pages/          # route views: dashboard/, otherPages/, shop/, shop-details/
│   └── utlis/          # TYPO'd dir name (wow.js, openCartModal.js)
├── public/
│   ├── scss/           # SCSS source — NOT in src/
│   ├── css/, fonts/    # static assets
│   ├── admin-build/    # prebuilt admin dashboard (iframed)
│   └── images/         # 1,800+ media files (products/slider/collections/...)
├── index.html          # has #preloader removed by App.jsx on mount
├── vite.config.js      # port 5173, /api proxy → :5000, @/ alias, modern-compiler SCSS
└── jsconfig.json       # @/* path alias
```

## ENTRY CHAIN

`main.jsx` → `BrowserRouter` → `App.jsx` (imports `../public/scss/main.scss` + global CSS) → `AuthProvider` → `Context` → `<Routes>` + 14 global modals (HomesModal, QuickView, ShopCart, Login, Register, SearchModal, ...) which render app-wide regardless of route.

## ROUTES (src/App.jsx)

| Path | Page |
|------|------|
| `/` | HomePage1 (`pages/page.jsx`) |
| `/products`, `/shop-default`, `/shop-collection-*` | ShopDefaultPage |
| `/product-detail/:id` | ProductDetailPage |
| `/blog-grid`, `/blog-detail/:id` | Blog pages |
| `/cart`, `/view-cart`, `/checkout` | cart pages |
| `/profile`, `/orders`, `/wishlist`, `/my-account-*` | dashboard pages |
| `/seller/*` | AdminIframe → `/admin-build/index.html` |
| `/delivery` | DeliveryDashboard |
| `/payment-confirmation`, `/payment-failure` | payment result pages |
| `*` | PageNotFoundPage |

## STATE

- `context/Context.jsx` — cart/wishlist/compare; seeded from `@/data/products`; persisted to `localStorage` (`cartList`, `wishlist`); exposes `addProductToCart`, `updateQuantity`, `addToWishlist`, `addToCompareItem`, `totalPrice`.
- `context/AuthContext.jsx` — `useAuth()` → `{user, login, logout, loading}`; on mount GETs `/auth/me`; gates children until `loading` false. Works against Express cookies.
- `api/axios.js` — `api` instance, `baseURL: '/api'`, `withCredentials: true`. Import this everywhere; never `fetch` raw.

## CONVENTIONS

- Components: PascalCase files; page dirs use `kebab-case/` with `index.jsx` (e.g. `pages/otherPages/view-cart/index.jsx`) EXCEPT `product-detail` which is `pages/shop-details/product-detail/`
- Imports: `@/` for everything under src
- Use `useContextElement()` from `@/context/Context` for cart state — do not create new contexts for cart data
- Scroll/header/preloader effects handled in `App.jsx`, not per-page

## ANTI-PATTERNS

- Do NOT add new components/pages that reimplement cart, wishlist, or auth — extend `Context.jsx` / `AuthContext.jsx`
- Do NOT import SCSS from `src/` — only `public/scss/` is the stylesheet root (existing pattern)
- Do NOT depend on `admin dashboard/` or `extracted-silva/` at runtime — the iframe uses `public/admin-build/`
- No eslint config exists despite the `lint` script — do not rely on `npm run lint`

## COMMANDS

```bash
cd client
npm run dev        # Vite dev server :5173 (proxies /api → :5000)
npm run build      # vite build → client/dist
npm run preview    # serve built output
```