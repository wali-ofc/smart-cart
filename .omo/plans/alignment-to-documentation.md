# SmartCart — Alignment Plan: Make the Codebase Match documentation.md

**Status:** Draft for review
**Branch:** main (work on feature branch)
**Source of truth:** `documentation.md` (only spec that matters)
**UI rule:** FROZEN — keep current Bootstrap/SCSS look; no restyle (owner directive)

---

## 0. Guiding Principles

1. **DB-first.** Every feature depends on the data model. Realign MongoDB schemas to documentation.md §3.2.2 EXACTLY before any controller/route/page work. Skip = rework everywhere downstream.
2. **Spec = contract.** API surface, route paths, field names, enums, statuses, response shape come verbatim from documentation.md §3.3.1 / §3.2.2. Deviations require a written decision (see §13 Decision Log).
3. **UI freeze.** All new pages/features built in the existing Bootstrap/SCSS/template-icon look. Tailwind/Lucide cancelled. No redesign of existing pages.
4. **Incremental & verifiable.** Each phase ends with something runnable + a defined acceptance check. Tests are added early (Phase 1 models) per Ch.5.
5. **Trim, don't patch.** Template residue (variant library, static catalog, admin iframe, stale scripts) is removed where the spec supersedes it — not "fixed".
6. **Sequence respects dependencies:** DB → server core (auth) → server API (cart/orders/seller/delivery/reviews/likes) → chat → seeding → client contexts → client pages → trim → tests → deploy.

---

## 1. Target State (post-alignment)

```
server/
├── config/database.js
├── controllers/  auth, product, cart, order, chat, seller, delivery, review
├── middleware/   authMiddleware, rateLimitMiddleware, errorMiddleware
├── models/       User, Product, Order, Review, ChatSession   (spec schemas)
├── routes/       auth, product, cart, order, chat, seller, delivery, review
├── services/     authService, productService, orderService, chatService
├── scripts/seedProducts.js
├── utils/
├── __tests__/    models/ routes/ services/
├── .env.example  (spec §6.2 vars)
└── server.js     (spec §4.2.1 bootstrap + /api/health)
```

```
client/src/
├── api/axios.js          (unchanged: /api, withCredentials)
├── contexts/  AuthContext (extended), CartContext (server-synced), ChatContext  — spec §4.3.2
├── pages/     home, products, product/:id, cart, checkout, orders, likes, profile,
│              seller/*, seller/products, seller/ai-predictions, delivery, delivery/:orderId — spec §4.3.4
├── components/  trimmed set: Navbar, ProductCard, CartItem, ChatWidget, SellerDashboard,
│                DeliveryDashboard + kept existing template components — spec §4.3.3
└── (static data/ removed; products come from MongoDB API)
```

---

## 2. Phase 0 — Baseline & Safety Net

**Goal:** dirty-state insurance + test runner before breaking anything.

1. `git checkout -b align-documentation` (branch off `main` @ 1653f09).
2. Install test tooling so model tests can start in Phase 1: `server`: jest + supertest + mongodb-memory-server; root scripts `test`.
3. Add `server/jest.config.js` per spec §5.1.2 layout (`__tests__/models|routes|services`).
4. Decide seeding strategy (see §6): fresh DB wipe + reseed is acceptable (dev project, no prod data). Document this in NOTES.
5. Write README replacement LAST (Phase 8) — do not spend time on it now.

**Acceptance:** `cd server && npm test` runs (even with 0 tests) and `npm run dev` still boots.

---

## 3. Phase 1 — DATABASE REALIGNMENT (highest priority, per §3.2.2)

### 3.1 Exact target schemas (copy from documentation.md §3.2.2 — this is the contract)

#### User
| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| name | String | yes | min 2, trim | was `username` |
| email | String | yes | unique, valid format | keep |
| password | String | yes | min 6; bcrypt-hashed pre-save (10 rounds, §3.5.1) | was `passwordHash` |
| role | String | yes | enum: customer, seller, delivery | keep |
| cart | Array | no | `[{ product: ObjectId, quantity: Number }]` | NEW — server-synced cart |
| createdAt | Date | — | timestamps | keep |

Methods per §4.2.2: `comparePassword`, `getSignedToken`, `toSafeJSON`.
Remove: `profileImage`? → KEEP `profileImage` optional (used by admin UI; harmless, undocumented addition — log in §13) | `addresses` → REMOVE (order carries shipping_address) | `likes` → REMOVE (likes move to Product.likes per spec).

#### Product
| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| name | String | yes | max 200 | was `title` |
| description | String | yes | max 2000 | keep |
| price | Number | yes | min 0 | keep |
| category | String | yes | enum: Electronics & Gadgets, Fashion & Apparel, Beauty & Personal Care, Home & Kitchen, Health & Fitness | NEW enum — affects seed + filters |
| subCategory | String | no | — | NEW |
| seller | ObjectId | no | ref User | was `sellerId` |
| image | String | yes | URL | was `images[]` → single string |
| keywords | Array | no | [String] | NEW — search target |
| rating | Object | no | `{ stars: 0-5, count: Number }` | was `averageRating` |
| likes | Array | no | [ObjectId ref User] | NEW — likes feature storage |
| stock | Number | yes | min 0 | keep |
| createdAt | Date | — | timestamps | keep |

Indexes (§4.2.2): text `(name, description, keywords)`; compound `(category, price)`.
Remove: `reviews[]` (reviews served via Review collection), `metadata` (Mixed).

#### Order
| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| user | ObjectId | yes | ref User | was `customerId` |
| items | Array | yes | `[{ product: ObjectId, name: String, price: Number, quantity: Number }]` | embedded `name` per spec |
| shipping_address | Object | yes | `{ street, city, state, zip_code, country }` | was `shippingAddress`, add `zip_code` |
| payment_method | String | yes | enum: cod, card, other | was `paymentId` |
| items_price | Number | — | default 0 | NEW |
| total_price | Number | — | default 0 | was `totalAmount` |
| seller | ObjectId | no | ref User | NEW (from first item's product.seller at creation) |
| delivery_agent | ObjectId | no | ref User | was `deliveryAgentId` |
| status | String | yes | enum: pending, processing, shipped, delivered, cancelled | DROP `paid` |
| notes | String | no | max 500 | NEW |
| createdAt | Date | — | timestamps | keep |

Index (§4.2.2): `(user, createdAt)` — owned-order history.

#### ChatSession
| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| user | ObjectId | yes | ref User | was `userId` |
| messages | Array | no | `[{ sender: user|ai, message: String, timestamp: Date }]` | `content` → `message` |
| context | Mixed | no | — | NEW — order context injection |
| createdAt | Date | — | timestamps | keep |

TTL index (§4.2.2 + §3.5.2): `createdAt` expireAfterSeconds `30*24*3600` (30 days).

#### Review
| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| user | ObjectId | yes | ref User | was `userId` |
| product | ObjectId | yes | ref Product | was `productId` |
| rating | Number | yes | min 1, max 5 | keep |
| comment | String | no | max 1000 | keep |
| createdAt | Date | — | default now | keep |

Indexes: `product` (retrieval, §4.2.2) + unique `(product, user)` (one review per user per product — keep existing).

### 3.2 Execution steps

1. Rewrite `server/models/*.js` to the exact schemas above (field names, validators, enums, indexes). Keep bcrypt pre-save hook (moved to `password`).
2. Add `User.comparePassword`, `User.getSignedToken`, `User.toSafeJSON` (spec §4.2.2 — auth service will use them).
3. Move `connectDB` from `server.js` into `server/config/database.js` (spec §4.1.1) — keep the dev-safe error swallowing.
4. Bring model tests online now (Ch.5): `__tests__/models/User.test.js` (hash/compare/validate role+email), `Product.test.js` (enums, rating object, text index query).
5. Update server.js references (populate path `sellerId` → `seller` etc.) as controllers land in Phase 2.

**Acceptance:** all model tests green; `mongoose.model` validators reject bad enum/range input; existing `/api/auth` broker known (temporarily) — auth controller is fixed in Phase 2.1 together with the `password` rename.

## 4. Phase 2 — Server Core & API Build-out (spec §3.3.1, §4.1.1)

Order: auth first (touches renamed fields), then the middleware stack, then route groups. Product CRUD before cart (cart stores product ids).

### 4.1 Auth (fix register/login during schema rename)
- `routes/authRoutes.js` unchanged paths; `register` now takes `{ name, email, password, role }`, validates (min 2/6, email format — express-validator per §3.5.2), returns `user.toSafeJSON()` + token cookie. Login uses `comparePassword`. Logout clears cookie.
- Remove hardcoded admin bypass (`admin_hardcoded_id` + literal credentials) — spec has no such backdoor; log removal in §13. (Reachable via real seller account + seed.)
- Add `POST /api/auth/logout` — spec requires Auth: yes (`protect`) — change from public GET to protected; client updated in Phase 4.

### 4.2 Middleware (spec §4.2.1 order: CORS → body → cookie → rate limit → routes → error LAST)
- `middleware/authMiddleware.js` — rename from `auth.js`, keep protect/authorize behavior minus hardcoded-id branch.
- `middleware/rateLimitMiddleware.js` — express-rate-limit: chat route scoped, `RATE_LIMIT_MAX_REQUESTS=50` / `RATE_LIMIT_WINDOW_MS=86400000` (§6.2). Per-user, not per-IP.
- `middleware/errorMiddleware.js` — central error handler (move inline handler from server.js); validate express-validator errors → 400 with field messages.
- `server.js` — spec §4.2.1 exact middleware order; mount ALL route groups; keep `/api/health`.

### 4.3 Route groups (paths/guards verbatim from §3.3.1)

| Router | Routes | Guard |
|---|---|---|
| auth | POST /register, POST /login, POST /logout, GET /me | logout+me protected |
| product | GET / (paginated+filtered), GET /categories, GET /:id, POST /, PUT /:id, DELETE /:id | write ops: seller |
| product-likes | GET /likes (my likes), GET /:id/like, POST /:id/like, DELETE /:id/like | :id-less route protected; others public GET / protected POST/DELETE |
| cart | GET /, POST /, DELETE /:productId, DELETE / | all protected (cart lives on User.cart) |
| order | POST /, GET /, GET /:id, PUT /:id/status | all protected; status update additionally seller/delivery per role |
| seller | GET /dashboard, GET /products, GET /products/:id/analytics | seller |
| delivery | GET /assigned, PUT /:orderId/status | delivery |
| chat | POST / | protected + rate-limited (50/day) |
| review | GET /product/:productId, POST /product/:productId, PUT /:id, DELETE /:id, GET /my-reviews | GET product public; create/update/delete auth; update/delete owner-only |

**Route-order pitfalls (Express 5):** declare `/products/categories`, `/products/likes` BEFORE `/products/:id`; declare `/products/likes` before `/products/:id/like` patterns carefully (exact segment wins).

### 4.4 Services layer (spec §4.1.1)
- `authService`: register/login/logout/getMe (interfaces with User methods).
- `productService`: list (pagination/filter/search via text index), CRUD, categories, analytics.
- `orderService`: create (cart→order, set seller from items, compute items_price/total_price, clear User.cart), history, status transitions.
- `chatService`: Ollama call (§4.2.5) + session persistence + context injection.

Controllers stay thin (parse/validate → service → respond) per spec architecture diagram (§3.1.1).

**Acceptance:** full §3.3.1 surface reachable; Postman/curl pass for each group; broken auth hardcoded-backdoor removed without breaking legit login.

## 5. Phase 3 — Admin Replacement (seller endpoints)

Current `/api/admin/*` = prebuilt iframe dashboard. Spec §3.3.1 defines `/api/seller/dashboard|products|analytics` instead.

1. Map adminController analytics → `seller/dashboard` (revenue, order count, products, ratings — §5.2 checklist).
2. Map admin products/orders/customers → `seller/products` + dashboard data; add `seller/products/:id/analytics`.
3. Order status update moves to `PUT /api/orders/:id/status` (§3.3.1) — seller role. Remove `/api/admin/*` mount from server.js once client pages (Phase 4) depend only on seller routes.
4. `client/public/admin-build/` + `AdminIframe` become dead once React seller pages land → remove in Phase 7 trim (log in §13).

## 6. Phase 4 — Product Seeding (owner decision 2026-09-05: Free E-commerce API DROPPED)

Source = curated subset of the existing static catalog `client/src/data/products.js` (the spec §1.5 API is abandoned — see D9).

1. Add `server/scripts/seedProducts.js`: import `products1` from `client/src/data/products.js` → deterministically curate a representative ~50-150 item subset spread across the 5 spec categories → map to spec Product shape → upsert by `name`.
2. Field mapping (static → spec):
   - `title` → `name`; `price` → `price`
   - `imgSrc` → `image` — keep the local path (`/images/...`), served by the client origin (Vite dev / Vercel prod); `imgHoverSrc` dropped (spec has a single image)
   - `filterCategories[]` → `category` — map to the 5 spec enums; unmapped entries → fallback category, log the count
   - `brand` → `subCategory` + `keywords` tokens
   - `id` / `colors[]` / `sizes[]` → dropped (Mongo `_id`; spec has no variants)
   - `isAvailable` → `stock` (true → 10, false → 0)
   - `description` → generated from title + brand + category (static data has none)
   - `keywords` → tokenized title/brand/category
   - `rating {stars, count}` → deterministic derivation from a seeded RNG (stars 3.6-4.9, count 0-150) so listings look alive
3. `npm run seed` script in `server/package.json`.
4. **Extraction timing:** the curated dataset is baked into `seedProducts.js` ONCE during this phase — after that, `client/src/data/products.js` is deletable in Phase 7 (already sequenced after the page flip; see §7.3).
5. Delete `scripts/seed-supabase.js` + `scripts/upload-assets-to-supabase.js` (previous stack) — Phase 7.

**Acceptance:** fresh DB → `npm run seed` → `/api/products?page=1&limit=10` returns paginated spec-shaped docs whose `image` paths resolve against the client origin; search/category/price filters return expected subsets; `/api/products/categories` = the 5 enum values; every seeded product renders in the existing card UI.

## 7. Phase 5 — Client Realignment (spec §4.3; UI frozen)

### 7.1 Contexts (§4.3.2)
- `AuthContext` — add `register(name, email, password, role)`; `/auth/me` stays; consume `user.name`.
- `CartContext` (NEW) — server-synced: hydrate from `GET /api/cart` when authed; `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` hit the API; keep localStorage fallback for anonymous browsing. REPLACES `Context.jsx` cart slice (wishlist/compare: keep as localStorage-only under template UI, or drop if unimplemented server-side — decision §13).
- `ChatContext` (NEW) — floating ChatWidget (existing template modal look), `sendMessage()` → `POST /api/chat`, message list, loading state.

### 7.2 Pages (§4.3.4) — new specs in CURRENT look
| Doc route | Reuse / build |
|---|---|
| `/products` | Rework ShopDefaultPage → live API data (filters from template sidebar: category + price range + search via productService params) |
| `/product/:id` | Rework product-detail page: API fetch, rating display, like button (POST/DELETE /api/products/:id/like), reviews section (GET/POST /api/reviews/product/:id) |
| `/cart` | Rework view-cart → CartContext (API-backed) |
| `/checkout` | UI-only form (spec: payment "Coming Soon") — keep template checkout page, wire totals from CartContext |
| `/orders` | NEW — order history from GET /api/orders (reuse my-account-orders page layout) |
| `/likes` | NEW — GET /api/products/likes grid |
| `/profile` | Rework my-account → user info + own reviews (GET /api/reviews/my-reviews) |
| `/seller` `/seller/products` `/seller/ai-predictions` | NEW React pages (template look) replacing AdminIframe; AI predictions = placeholder (spec §4.4) |
| `/delivery` `/delivery/:orderId` | Rework DeliveryDashboard + detail; GET /api/delivery/assigned, PUT status |

Routes change in `App.jsx`: `/product-detail/:id` → `/product/:id`; drop `/shop-default` duplicates; keep a redirect alias for old URLs or not (decision §13).

### 7.3 Data-source flip
- `Context.jsx` static-catalog hydration → CartContext/API. After pages stop importing `@/data/products`, delete `src/data/*` (15k lines) in Phase 7 trim.

**Acceptance:** customer journey works end-to-end against seeded DB: browse → filter/search → detail → like → review → cart → checkout(UI) → order → orders history; seller CRUD via /seller pages; delivery status updates via /delivery.

## 8. Phase 6 — AI Chatbot (spec §2.1.7, §4.2.5)

1. `chatService.getAIResponse(message, orderContext)` → `POST http://localhost:11434/api/generate` model `smartcart-bot` (gemma3:1b + Modelfile) per §6.5.
2. `chatController`: load/create ChatSession (user ref), inject order context (recent orders → messages.context), persist user+ai messages, enforce 50/day budget (rateLimit middleware, per-user).
3. Client ChatWidget wired to POST /api/chat with loading state.
4. TTL index ensures old sessions expire (30d).

**Acceptance:** chat returns Ollama answer with order-aware context; 51st request in a day → 429 (documented code).

## 9. Phase 7 — Trim Template Residue

Order matters — only delete what no longer has importers:
1. `client/src/data/*` (static catalog) — after pages flip to API AND Phase 4 has baked the curated subset into `seedProducts.js`.
2. Unused component variants (ProductCard n, Details n, Header n...) — verify import graph per family first; keep the set pages actually use.
3. `client/public/admin-build/` + `AdminIframe` — after React seller pages land.
4. Root `*.cjs` / `add_route.js` patch scripts — delete (anti-pattern).
5. `scripts/` supabase seeds, `supabase/` schema if present, Supabase references in client package.json (`@supabase/supabase-js`), README stack badges.
6. `client/public/images/` only if unreferenced after data flip (audit; images may still serve kept template sections).
7. Keep: `admin dashboard/extracted-silva/` (vendor purchase, reference only — don't delete without owner approval).

**Acceptance:** no dead imports; `vite build` passes; bundle size drops measurably.

## 10. Phase 8 — Tests & Docs (Ch.5)

- Jest/Supertest suites per §5.1.2: models (done in Phase 1), `routes/auth`, `routes/products`, `routes/orders` (+cart, delivery, review, chat rate limit), `services/chat`.
- Client: vitest/RTL smoke for ProductCard, CartContext, AuthContext (add deps).
- Manual checklist §5.2 executed once, results logged.
- Rewrite README.md: drop Supabase narrative; document MERN + seed + env (§6.2) + dev commands.

**Acceptance:** `npm test` green in server; client test script green; §5.2 checklist items verified in browser.

## 11. Phase 9 — Deployment (Ch.6)

- `server/.env.example`: PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRE=7d, OLLAMA_HOST, NODE_ENV, CORS_ORIGIN, RATE_LIMIT_MAX_REQUESTS=50, RATE_LIMIT_WINDOW_MS=86400000.
- `server.js` CORS: use `process.env.CORS_ORIGIN` (not hardcoded localhost) — spec §4.2.1.
- Deploy per §6.3: Render (backend root `server/`, `node server.js`) + Vercel (frontend root `client/`, output `dist`) + Atlas.
- `vercel.json` stays for SPA rewrite on client; root-level deployment config adjusted so Vercel points at `client/`.

**Acceptance:** production URLs serve client; API reachable over HTTPS with cookie auth; seed run against Atlas.

## 12. Suggested execution order (parallel-safe lanes)

1. **Lane A (single-thread):** Phase 0 → Phase 1 (DB) → Phase 2 (server) — the trunk; everything hangs off schemas/API.
2. **Lane B (after Phase 1 schemas frozen):** Phase 4 seeding script (can run against empty DB in parallel with server build-out).
3. **Lane C (after Phase 2 API surface stable):** Phase 5 client contexts → pages → Phase 7 trim.
4. **Lane D (anytime after Phase 2):** Phase 6 chatbot, Phase 8 tests/docs, Phase 9 deploy config.

## 13. Decision Log (open items — resolve before/while executing)

| # | Question | Default proposal |
|---|---|---|
| D1 | Keep `User.profileImage`? | Yes (admin uses it; harmless additive field) |
| D2 | Remove hardcoded admin backdoor? | Yes — spec has no backdoor; replace demo auth with real seed accounts |
| D3 | Wishlist/compare features — spec silent | Keep client-side localStorage under template UI (no server support) |
| D4 | `User.likes` → move to `Product.likes` | Per spec Product.likes; `/api/products/likes` = products where likes contains me |
| D5 | Old URLs (`/shop-default`, `/product-detail/:id`) | Redirect shims for 1 release, then drop |
| D6 | Index uniqueness `Review(product,user)` | Keep (one review/user/product) — implements spec intent |
| D7 | `admin dashboard/extracted-silva/` | Keep as vendor reference (owner purchase); never edit |
| D8 | Order status enforcement order | pending → processing → shipped → delivered; cancelled allowed from any |
| D9 | Product seed source (**DECIDED 2026-09-05**) | Curate ~50-150 items from the existing static catalog → map to spec schema, keep local `/images/...` paths; Free E-commerce API (§1.5/§4.2.4) abandoned by owner; `image` is relative to the client origin (dev: Vite, prod: Vercel) — acceptable deviation, logged |

## 14. Final Acceptance Criteria (all phases green)

- [ ] MongoDB schemas match §3.2.2 EXACTLY (field names, enums, validators, indexes — verified by model tests + Compass inspection)
- [ ] Every §3.3.1 endpoint exists with correct path/method/guard and returns spec-shaped data
- [ ] ~50-150 products curated from the existing catalog seeded into MongoDB (local images intact); 5 spec categories; search/filter/pagination working
- [ ] Customer flow: browse → cart → order → history (UI frozen, current look)
- [ ] Seller CRUD + dashboard + analytics (React pages, no iframe)
- [ ] Delivery assigned orders + status updates
- [ ] Chat: Ollama responses, order context, 50/day limit, 30d TTL
- [ ] Reviews + likes end-to-end
- [ ] Jest/Supertest + client tests green; §5.2 manual checklist done
- [ ] Deployed: Vercel + Render + Atlas per §6; README updated
- [ ] Template residue removed (static catalog, iframe admin, *.cjs, supabase scripts)
- [ ] UI pixel-identical to current storefront (no restyle)