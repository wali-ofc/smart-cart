# SERVER — Express 5 API

## OVERVIEW

Express 5 + Mongoose 9 backend for SmartCart. Cookie-based JWT auth with role guards, services/ layer, full §3.3.1 API surface, and Jest tests (`mongodb-memory-server`). CommonJS.

> **Alignment status:** Phase 2 complete — all spec route groups exist (§3.3.1) behind services (+ rate-limit + central error middleware). Phases 3-9 still open: replace transitional `/api/admin`, seed MongoDB catalog from `client/src/data/products.js`, wire client to these APIs, route-level Jest suites (§5).

## STRUCTURE

```
server/
├── server.js                 # bootstrap: cors → json(10kb) → urlencoded → cookieParser → routes → 404 → error mw (spec §4.2.1)
├── config/database.js        # connectDB (swallows connection errors by design)
├── utils/ApiError.js         # operational errors: statusCode + optional validator errors[]
├── middleware/
│   ├── authMiddleware.js     # protect / optionalAuth / authorize(...roles) — NO hardcoded admin
│   ├── errorMiddleware.js    # notFound (404) + errorHandler (ApiError, CastError, dup-key, mongoose ValidationError)
│   └── rateLimitMiddleware.js# chatLimiter — per-user 50/day (RATE_LIMIT_* env, default 50/86400000ms)
├── services/                 # thin-controller support (spec §4.1.1)
│   ├── authService.js        # register / login / getMe (User methods: comparePassword, getSignedToken, toSafeJSON)
│   ├── productService.js     # list (pagination+category/search/price/sort), categories, CRUD (owner-guarded), likes
│   ├── orderService.js       # create from cart (totals, single-seller, clears cart), history, scoped detail, status transitions (D8)
│   └── chatService.js        # Ollama generate (OLLAMA_HOST/OLLAMA_MODEL), ChatSession persistence (TTL 30d), order context
├── controllers/              # thin: parse → validate → service → respond (Express 5 auto-forwards async errors)
├── routes/                   # auth product cart order seller delivery chat review (+ admin transitional)
│   └── (validators via express-validator inline; errors → 400 + errors[{field,message}])
├── __tests__/models/         # User / Product / Order — 27 assertions, in-memory mongo
└── models/                   # User Product Order Review ChatSession — spec §3.2.2 (see root AGENTS.md code map)
```

## API SURFACE (mounted in server.js)

| Route | Method | Guard |
|-------|--------|-------|
| `/api/auth/register` | POST | public — `{name, email, password, role?}` (role: customer\|seller\|delivery) |
| `/api/auth/login` | POST | public — `{email, password}` |
| `/api/auth/logout` | POST | `protect` |
| `/api/auth/me` | GET | `protect` |
| `/api/products` | GET | public — `?category&search&minPrice&maxPrice&page&limit&sort(price,-price,newest,rating)` |
| `/api/products/categories` | GET | public |
| `/api/products/likes` | GET | `protect` |
| `/api/products/:id` | GET | public |
| `/api/products/:id/like` | GET | public (`optionalAuth`) — `{liked, likeCount}` |
| `/api/products/:id/like` | POST/DELETE | `protect` — idempotent |
| `/api/products` | POST | `protect` + `authorize('seller')` |
| `/api/products/:id` | PUT/DELETE | `protect` + `authorize('seller')` + owner |
| `/api/cart` | GET/POST/DELETE | `protect` — POST `{product, quantity}`; DELETE body-less clears |
| `/api/cart/:productId` | DELETE | `protect` |
| `/api/orders` | POST | `protect` — `{shipping_address{street,city,state,zip_code,country}, payment_method(cod\|card\|other), notes?}` |
| `/api/orders` | GET | `protect` — my history |
| `/api/orders/:id` | GET | `protect` — owner / seller / assigned agent |
| `/api/orders/:id/status` | PUT | `protect` — role-checked transitions (seller: pending→processing→shipped(+delivery_agent)+cancelled; delivery: shipped→delivered/cancelled) |
| `/api/seller/dashboard` | GET | `protect` + `authorize('seller')` |
| `/api/seller/products` | GET | `protect` + `authorize('seller')` — paginated, seller-scoped |
| `/api/seller/products/:id/analytics` | GET | `protect` + `authorize('seller')` + owner |
| `/api/delivery/assigned` | GET | `protect` + `authorize('delivery')` — shipped+delivered |
| `/api/delivery/:orderId/status` | PUT | `protect` + `authorize('delivery')` — assigned only |
| `/api/chat` | POST | `protect` + `chatLimiter` — `{message}`; 503 when Ollama down |
| `/api/reviews/product/:productId` | GET | public |
| `/api/reviews/product/:productId` | POST | `protect` — one per user per product; recomputes `Product.rating{stars,count}` |
| `/api/reviews/my-reviews` | GET | `protect` |
| `/api/reviews/:id` | PUT/DELETE | `protect` + owner |
| `/api/admin/*` | — | `protect` + `authorize('seller')` — **TRANSITIONAL**, replaced in Phase 3 |
| `/api/health` | GET | public |

## CONVENTIONS

- CommonJS; controllers = named `async (req,res,next)` — **no try/catch**: Express 5 auto-forwards rejected promises to `errorMiddleware`; business errors `throw new ApiError(status, msg, errors?)`
- Responses: `{ success: true, ... }` / `{ success: false, error: '...' }`; validation failures add `errors: [{field, message}]`
- JWT: httpOnly cookie `token` (7d, sameSite lax, secure in prod); fallback secret `'secret123'` when `JWT_SECRET` unset (dev only — Phase 9 hardens env)
- `protect` reads cookie first, then `Bearer` header; attaches full user doc to `req.user` (`.id` = hex string)
- Route order: static segments (`/categories`, `/likes`) declared BEFORE `/:id`
- Mongoose 9: async hooks return, no `next()`; `populate`d single refs compare via `order.user._id.toString()`
- Likes/reviews mutate `Product.likes` / `Product.rating` in-place; product list slims `likes` → `likeCount`
- Express-validator: validators inline in routes; `failed(req)` helper in controllers throws 400
- `npm.ps1` blocked by execution policy on dev machine → use `npm.cmd`

## ANTI-PATTERNS (this project)

- **Hardcoded demo bypass REMOVED in Phase 2** (was `admin_hardcoded_id` in authController + middleware/auth.js — that file is deleted). Demo seller access now requires a real `seller` account (Phase 4 seed creates one). Do NOT reintroduce synthetic identities.
- **Fallback secrets:** `'secret123'` / local `MONGODB_URI` defaults — env vars required for production (§6.2); do not extend fallbacks
- **Multi-seller orders:** schema records ONE `seller` per order (MVP: first item's seller) — documented gap, revisit if spec grows
- **Stock is NOT decremented on order** — MVP scope decision recorded in plan (Phase 8 revisit)
- **`/api/admin` is transitional** — it exists so the iframed admin dashboard keeps working until Phase 3 replaces it with React role pages; do not extend it
- **connectDB swallows connection errors** (dev when mongod is off) — server boots without DB; endpoints then 500 via errorMiddleware

## COMMANDS

```bash
cd server
npm.cmd run dev    # node server.js — port $PORT (5000 default)
npm.cmd test       # jest --runInBand — model suites (in-memory mongo, no DB needed)
```