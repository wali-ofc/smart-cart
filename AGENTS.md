# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-08
**Branch:** main

## OVERVIEW

SmartCart — MERN eCommerce FYP (MongoDB, Express 5, React 19, Node). Three roles: customer / seller / delivery. The storefront (`client/`) is a React 19 app driven by the Express + Mongoose API (`server/`); product catalog, cart, orders, reviews, likes, chat, and all role dashboards hit MongoDB-backed endpoints (`/api/*`). AI chatbot runs via `/api/chat` (Ollama hybrid, 50 req/day rate limit, 30d TTL).

> `README.md` is the user-facing quickstart; `documentation.md` IS THE TARGET — the authoritative FYP spec.

## ALIGNMENT STATUS (IMPORTANT)

The codebase was acquired third-party and is largely aligned with `documentation.md` now (Phases 1-4 + 5-7 core). Treat `documentation.md` as the ONLY source of truth for required behavior; treat remaining template-derived code as disposable scaffolding.

| Area | documentation.md (TARGET) | Current repo |
|------|---------------------------|--------------|
| Styling | Tailwind CSS 4 — CANCELLED, see UI FREEZE below | Bootstrap 5 + SCSS template (KEEP) |
| Icons | Lucide React — CANCELLED (UI freeze) | template inline icons (KEEP) |
| Product data | MongoDB, ~50 items (Ch.1 §1.5) | **DONE** — 50-product seed (10/category via `server/scripts/seedData.json`); static `client/src/data/products.js` DELETED; `src/data/` holds only marketing files |
| Server layers | controllers/ + services/ + config/ + utils/ | **DONE** — services/ added (auth, product, order, chat); middleware/ (auth, error, rateLimit); utils/ApiError |
| Server API | cart, orders, chat, seller, delivery, reviews, likes + product CRUD | **DONE** — full §3.3.1 surface mounted; `/api/admin` REMOVED (D10, Phase 7) |
| Client pages | `/products /product/:id /cart /orders /likes /profile /seller /delivery` | **DONE** — all wired; legacy `/shop-default` + `/product-detail/:id` kept as aliases (D14); seller = React pages (no iframe) |
| Client contexts | Auth + Cart (server-synced) + Chat | Auth(API) + CartContext(server-synced) + ChatWidget(local state per D12); Context.jsx localStorage cart/wishlist persists for wishlist/compare (D3) |
| Models | `User.name`, `User.cart[]`, `Product.rating{stars,count}`, `Order.payment_method` | **DONE** — schemas aligned (model tests pass: User/Product/Order, 27 assertions) |
| Chatbot | Ollama via `/api/chat`, 50 req/day, TTL 30d | **DONE** — chatService (hybrid intents/Ollama), chatController, routes, rateLimit, ChatSession TTL 30d; ChatWidget in App.jsx |
| Dashboards | React role pages | **DONE** — seller (React: dashboard/products/ai-predictions), delivery, customer (/my-account-*); iframe removed |
| Tests | Jest/Supertest suites (Ch.5) | PARTIAL — model suites only; route suites pending (Phase 8) |
| Deploy | Vercel (client) + Render (server) + Atlas (Ch.6) | pending (Phase 9) |

Workflow: trim template residue → implement documented endpoints/layers → replace static data with seeded MongoDB → keep the current UI → add tests.

> **UI FREEZE (owner directive):** the current UI is considered PERFECT/FINAL — do NOT restyle, redesign, or swap the storefront look & feel. Styling migration to Tailwind/Lucide is CANCELLED. All functional work (pages, dashboards, features) must be built in the existing Bootstrap/SCSS/template-icon look.

## STRUCTURE

```
smart-cart-fyp/
├── client/                 # Vite + React 19 storefront (see client/AGENTS.md)
│   ├── src/components/     # 196-file variant library (see components/AGENTS.md)
│   ├── src/data/           # marketing data only (blogs/faqs/menu/...); catalog REMOVED (see data/AGENTS.md)
│   ├── src/context/        # AuthContext + CartContext + Context (cart/wishlist localStorage)
│   ├── src/api/            # axios instance (baseURL /api, withCredentials)
│   ├── src/pages/          # route views incl. dashboard/ (Seller/Delivery: React, no iframe)
│   ├── public/scss/        # SCSS source (compiled via import from App.jsx)
│   └── public/images/      # 1,800+ static media assets
├── server/                 # Express 5 API (see server/AGENTS.md)
├── scripts/                # EMPTY (supabase seeds removed Phase 7)
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
| Cart/wishlist logic | `client/src/context/Context.jsx` | localStorage-persisted; product data via API (`resolveServerProduct`) |
| JWT auth state | `client/src/context/AuthContext.jsx` | hits `/api/auth/*` |
| Storefront product data | MongoDB via `/api/products` | NO static catalog — seeded 50 products; `normalizeProduct` in `client/src/utlis/productMap.js` |
| Server routes | `server/routes/*.js` | auth / product / cart / order / seller / delivery / chat / review |
| Auth middleware | `server/middleware/authMiddleware.js` | cookie JWT + role guard |
| Role dashboards | `client/src/pages/dashboard/` | SellerDashboard + seller-products + seller-ai-predictions; DeliveryDashboard; my-account-* |
| Seller API | `server/controllers/sellerController.js` | dashboard / products / products/:id/analytics / predictions (demand forecasts + stock risk, `predictionService`) |
| Seed data + script | `server/scripts/seedData.json` + `seedProducts.js` | 50 products (10/category) + demo seller |
| FYP spec / architecture | `documentation.md` | chapters: req analysis, design, impl, testing |

## CODE MAP

(No LSP/codegraph available — built from direct source reads; reference centrality unmeasured)

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `App` | component | `client/src/App.jsx` | Router shell + global modals + providers |
| `Context` | provider | `client/src/context/Context.jsx` | Cart/wishlist/compare, localStorage |
| `CartProvider` | provider | `client/src/context/CartContext.jsx` | Server-synced cart (`/api/cart`) |
| `AuthProvider` | provider | `client/src/context/AuthContext.jsx` | `/api/auth/me` session on mount |
| `api` | axios instance | `client/src/api/axios.js` | baseURL `/api`, cookies |
| `HomePage1` | page | `client/src/pages/page.jsx` | Index route |
| `SellerDashboard` | page | `client/src/pages/dashboard/SellerDashboard.jsx` | React seller dashboard (no iframe) |
| `DeliveryDashboard` | page | `client/src/pages/dashboard/DeliveryDashboard.jsx` | delivery role dashboard |
| `Likes` | component | `client/src/components/othersPages/Likes.jsx` | server-synced liked products grid |
| `server.js` | entry | `server/server.js` | Express bootstrap, DB, route mounts |
| `protect` / `authorize` | middleware | `server/middleware/authMiddleware.js` | JWT verify + role gate |
| `User/Product/Order/Review/ChatSession` | models | `server/models/` | Mongoose schemas (ChatSession used by chat routes) |

## CONVENTIONS

- Client: `@/...` alias → `client/src` (vite.config.js + jsconfig.json)
- Server: CommonJS (`require`/`module.exports`), controllers export named handlers
- SCSS lives in `client/public/scss`, imported from `App.jsx` (`../public/scss/main.scss`) — NOT in src/
- JWT in httpOnly cookie named `token`; role field: `customer | seller | delivery`
- Dashboard routes nested under `/my-account-*`; seller pages under `/seller`; payment pages use hyphenated `/payment-*`
- Response envelope (D11): singletons `{success, data}`; lists `{success, count, <plural>}`; `GET /api/auth/me` keeps `{success, user}` (frozen AuthContext)
- Seed command: `cd server && npm run seed` (idempotent upsert by name)
- Mixed quote style: template-derived files use double quotes, hand-written server code uses single quotes

## ANTI-PATTERNS (THIS PROJECT)

- **UI is FINAL (owner directive)** — never restyle, redesign, or change the visual design of existing pages/components; build new work in the current look. See UI FREEZE under ALIGNMENT STATUS.
- **Hardcoded admin bypass REMOVED (Phase 2)** — `server/middleware/auth.js` and the admin email/password bypass are deleted; demo seller access requires a real `seller` account (Phase 4 seed creates `seller@smartcart.local` / `seller123`). Do NOT reintroduce synthetic identities.
- **Root `*.cjs` / `add_route.js` patch scripts removed (2026-09-06)** — were one-off hacks (regex rewrites across components) that could corrupt source if re-run; do not recreate this pattern.
- **Do NOT edit `admin dashboard/extracted-silva/`** — purchased vendor template (TS+JS duplicates, reference only). Its compiled output `client/public/admin-build/` was DELETED in Phase 7 (D10) — the iframe dashboard is gone.
- **Do NOT "clean up" the hundreds of unused demo variants** in `client/src/components` — unused variants are tree-shaken at build; deletion risks breaking imports referenced by pages (58 variants already verified-dead and deleted — never bulk-delete without a zero-importer grep).
- **Route suites missing** — only model tests (`server/__tests__/models/`) exist so far; adding route/service tests is welcome (Phase 8) but don't assume coverage exists.
- **`client/src/utlis/` is a typo'd directory name** — not `utils/`; `@/utlis/*` imports depend on it. Renaming requires updating all importers.

## UNIQUE STYLES

- Storefront catalog is MongoDB-seeded (50 products) served via `/api/products`; **no static catalog** — client normalizes API docs via `normalizeProduct` (`client/src/utlis/productMap.js`). Static `src/data/` holds marketing files only (blogs, faqs, testimonials, menu, ...).
- Cart/wishlist: `CartContext.jsx` is server-synced; `Context.jsx` keeps localStorage cart/wishlist/compare.
- `documentation.md` uses Windows-1252-encoded characters (mojibake in headings) — authoritative but grep-hostile; prefer `documentation.md` only for chapter-level reference.
- Express `connectDB` swallows connection errors (comment: keeps dev alive when mongod is off).
- `server/scripts/seedData.json` is a BAKED curated manifest (owner decision 2026-09-06: exactly 10/category, 50 total) — do not regenerate from client; edit + re-seed to change the catalog.
- Product `image` paths are root-relative `/images/...` served by the client origin (Vite dev / Vercel prod).

## COMMANDS

```bash
npm run dev        # concurrently: server (port 5000) + client (port 5173)
npm run start      # node server/server.js
npm run build      # client build → copies dist/ to repo root
cd server && npm run seed   # upsert 50-product catalog + demo seller (idempotent)
cd server && npm test       # jest --runInBand — model suites (in-memory mongo)
cd client && npm run lint   # WARNING: no eslint config present in client/ — script errors
```

## NOTES

- Dev proxy: Vite forwards `/api` → `http://localhost:5000` (client/vite.config.js)
- CORS whitelist: dev `localhost:5173/5174`; production `CLIENT_URL` env (default `/api` same-origin via Vercel SPA)
- Supabase fully removed (README rewritten, `scripts/` emptied, `client/.env.example` deleted) — MongoDB/Mongoose is current