# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-05
**Commit:** 1653f09
**Branch:** main

## OVERVIEW

SmartCart — MERN eCommerce FYP (MongoDB, Express 5, React 19, Node). Three roles: customer / seller / delivery. The customer storefront is a static-data-driven React app (`client/`), the seller/delivery API is Express + Mongoose (`server/`), and the admin dashboard is a prebuilt static app embedded via iframe (`client/public/admin-build/`). AI chatbot (ChatSession model) exists but its API is NOT wired into `server.js`.

> `README.md` is STALE — it describes a flat Supabase-based layout. `documentation.md` IS THE TARGET — the authoritative FYP spec.

## ALIGNMENT STATUS (IMPORTANT)

The codebase was acquired third-party and is HEAVILY misaligned with `documentation.md`. Expect a large trimming + fixing effort to make the repo match the spec. Treat `documentation.md` as the ONLY source of truth for required behavior; treat template-derived code as disposable scaffolding.

| Area | documentation.md (TARGET) | Current repo |
|------|---------------------------|--------------|
| Styling | Tailwind CSS 4 — CANCELLED, see UI FREEZE below | Bootstrap 5 + SCSS template (KEEP) |
| Icons | Lucide React — CANCELLED (UI freeze) | template inline icons (KEEP) |
| Product data | MongoDB, ~50 items seeded from Free E-commerce API (Ch.1 §1.5) | static `client/src/data/products.js` (~900 demo) |
| Server layers | controllers/ + services/ + config/ + utils/ | controllers only |
| Server API | cart, orders, chat, seller, delivery, reviews, likes + product CRUD | auth + products(GET) + admin only |
| Client pages | `/products /product/:id /cart /orders /likes /profile /seller /delivery` | `/shop-default /product-detail/:id /my-account-* /seller/*`(iframe) |
| Client contexts | Auth + Cart (server-synced) + Chat | Auth(API) + static-data cart (localStorage) |
| Models | `User.name`, `User.cart[]`, `Product.rating{stars,count}`, `Order.payment_method` | `User.username`, no cart, `Product.averageRating`, `Order.totalAmount` |
| Chatbot | Ollama via `/api/chat`, 50 req/day (rate limit), TTL 30d | ChatSession model only — no routes |
| Dashboards | React role pages | seller = prebuilt iframe; delivery = minimal page |
| Tests | Jest/Supertest suites (Ch.5) | none |
| Deploy | Vercel (client) + Render (server) + Atlas (Ch.6) | Vercel SPA only |

Workflow: trim template residue → implement documented endpoints/layers → replace static data with seeded MongoDB → keep the current UI → add tests.

> **UI FREEZE (owner directive):** the current UI is considered PERFECT/FINAL — do NOT restyle, redesign, or swap the storefront look & feel. Styling migration to Tailwind/Lucide is CANCELLED. All functional work (pages, dashboards, features) must be built in the existing Bootstrap/SCSS/template-icon look.

## STRUCTURE

```
smart-cart-fyp/
├── client/                 # Vite + React 19 storefront (see client/AGENTS.md)
│   ├── src/components/     # 252-file variant library (see components/AGENTS.md)
│   ├── src/data/           # static demo catalog, 15k lines (see data/AGENTS.md)
│   ├── src/context/        # Cart/wishlist/compare + auth state
│   ├── src/api/            # axios instance (baseURL /api, withCredentials)
│   ├── src/pages/          # 27 route views (incl. dashboard/AdminIframe)
│   ├── public/scss/        # SCSS source (compiled via import from App.jsx)
│   ├── public/admin-build/ # built admin dashboard, iframed at /seller/*
│   └── public/images/      # 1,800+ static media assets
├── server/                 # Express 5 API (see server/AGENTS.md)
├── scripts/                # legacy Supabase seed/upload scripts — STALE
├── admin dashboard/        # VENDOR: Silva React template source (extracted-silva/) — do not edit
├── documentation.md        # authoritative FYP documentation (7 chapters)
│
├── package.json            # runs client+server via concurrently
└── vercel.json             # SPA rewrite: all routes → /index.html
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Client routing | `client/src/App.jsx` | `./Routes` block, lines ~173-208 |
| Cart/wishlist logic | `client/src/context/Context.jsx` | localStorage-persisted, static-data driven |
| JWT auth state | `client/src/context/AuthContext.jsx` | hits `/api/auth/*` |
| Storefront product data | `client/src/data/products.js` | ~900 demo items, NOT from MongoDB |
| Server routes | `server/routes/*.js` | auth / products / admin |
| Auth middleware | `server/middleware/auth.js` | cookie JWT + role guard |
| Admin dashboard | `client/public/admin-build/index.html` | iframed by `pages/dashboard/AdminIframe.jsx` |
| FYP spec / architecture | `documentation.md` | chapters: req analysis, design, impl, testing |

## CODE MAP

(No LSP/codegraph available — built from direct source reads; reference centrality unmeasured)

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `App` | component | `client/src/App.jsx` | Router shell + global modals + providers |
| `Context` | provider | `client/src/context/Context.jsx` | Cart/wishlist/compare, localStorage |
| `AuthProvider` | provider | `client/src/context/AuthContext.jsx` | `/api/auth/me` session on mount |
| `api` | axios instance | `client/src/api/axios.js` | baseURL `/api`, cookies |
| `HomePage1` | page | `client/src/pages/page.jsx` | Index route |
| `AdminIframe` | page | `client/src/pages/dashboard/AdminIframe.jsx` | Embeds admin-build |
| `server.js` | entry | `server/server.js` | Express bootstrap, DB, route mounts |
| `protect` / `authorize` | middleware | `server/middleware/auth.js` | JWT verify + role gate |
| `User/Product/Order/Review/ChatSession` | models | `server/models/` | Mongoose schemas (ChatSession unused) |

## CONVENTIONS

- Client: `@/...` alias → `client/src` (vite.config.js + jsconfig.json)
- Server: CommonJS (`require`/`module.exports`), controllers export named handlers
- SCSS lives in `client/public/scss`, imported from `App.jsx` (`../public/scss/main.scss`) — NOT in src/
- JWT in httpOnly cookie named `token`; role field: `customer | seller | delivery`
- Dashboard routes nested under `/my-account-*`; payment pages use hyphenated `/payment-*`
- Mixed quote style: template-derived files use double quotes, hand-written server code uses single quotes

## ANTI-PATTERNS (THIS PROJECT)

- **UI is FINAL (owner directive)** — never restyle, redesign, or change the visual design of existing pages/components; build new work in the current look. See UI FREEZE under ALIGNMENT STATUS.
- **Hardcoded admin credentials in production code** — `server/controllers/authController.js` (email+password bypass) and `server/middleware/auth.js` (`admin_hardcoded_id`, fallback JWT secret `secret123`). Present by design for Vercel demo; never extend this pattern.
- **Root `*.cjs` / `add_route.js` patch scripts removed (2026-09-06)** — were one-off hacks (regex rewrites across components) that could corrupt source if re-run; do not recreate this pattern.
- **Do NOT edit `admin dashboard/extracted-silva/`** — purchased vendor template (TS+JS duplicates); `client/public/admin-build/` is its compiled output.
- **Do NOT "clean up" the hundreds of unused demo variants** in `client/src/components` — unused variants are tree-shaken at build; deletion risks breaking imports referenced by pages.
- **No test suite** — `server` test script is a stub. Adding tests is welcome but don't assume coverage exists.
- **`client/src/utlis/` is a typo'd directory name** — not `utils/`; `@/utlis/*` imports depend on it. Renaming requires updating all importers.

## UNIQUE STYLES

- Storefront catalog is STATIC (`client/src/data/products.js`) — server MongoDB contains a separate product model; the two are not synced. Cart reads static data; `/api/products` is used by the admin dashboard.
- Admin dashboard = full-page iframe (`zIndex 999999`), not a React route component.
- `documentation.md` uses Windows-1252-encoded characters (mojibake in headings) — authoritative but grep-hostile; prefer `documentation.md` only for chapter-level reference.
- Express `connectDB` swallows connection errors (comment: keeps dev alive when mongod is off).

## COMMANDS

```bash
npm run dev        # concurrently: server (port 5000) + client (port 5173)
npm run start      # node server/server.js
npm run build      # client build → copies dist/ to repo root
cd client && npm run lint   # WARNING: no eslint config present in client/ — script errors
```

## NOTES

- Dev proxy: Vite forwards `/api` → `http://localhost:5000` (client/vite.config.js)
- CORS whitelist only allows `localhost:5173/5174` — production API calls are same-origin via Vercel SPA or break
- Supabase (README, `scripts/`, `client/.env.example`, `supabase/schema.sql` if present) is the PREVIOUS stack — MongoDB/Mongoose is current