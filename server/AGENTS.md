# SERVER — Express 5 API

## OVERVIEW

Express 5 + Mongoose 9 backend serving the SmartCart seller/delivery API. Cookie-based JWT auth with role guards. 14 files, ~700 lines — small, hand-written, CommonJS.

> SKELETON, not the spec: per documentation.md §3.3.1 this server must ALSO expose `/api/cart`, `/api/orders`, `/api/chat`, `/api/seller/*`, `/api/delivery/*`, `/api/reviews/*`, likes, and full product CRUD (create/update/delete, categories, pagination/search/filtering) behind a services/ layer with rate-limit + error middleware. ALL of that is missing here — closing this gap is the core of the alignment rework. Treat the missing routes as REQUIRED, not optional.

## STRUCTURE

```
server/
├── server.js            # bootstrap: cors → json(10kb) → cookieParser → routes → error mw
├── routes/
│   ├── authRoutes.js    # register/login/logout/me
│   ├── productRoutes.js # list/get
│   └── adminRoutes.js   # analytics/products/orders/customers/updateOrderStatus (seller-only)
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── adminController.js
├── middleware/auth.js   # protect (JWT verify) + authorize(...roles)
└── models/
    ├── User.js          # bcrypt pre-save hash + matchPassword; role enum customer|seller|delivery
    ├── Product.js       # text index on title/description
    ├── Order.js         # status enum pending|paid|processing|shipped|delivered|cancelled
    ├── Review.js        # unique (productId, userId)
    └── ChatSession.js   # user/ai messages — NOT MOUNTED (no chat routes exist)
```

## API SURFACE (mounted in server.js)

| Route | Method | Guard |
|-------|--------|-------|
| `/api/auth/register` | POST | public — takes `passwordHash` directly from body |
| `/api/auth/login` | POST | public — sets httpOnly `token` cookie (7d) |
| `/api/auth/logout` | GET | public — clears cookie |
| `/api/auth/me` | GET | `protect` |
| `/api/products` | GET | public — list |
| `/api/products/:id` | GET | public — detail |
| `/api/admin/analytics` | GET | `protect` + `authorize('seller')` |
| `/api/admin/products` | GET | `protect` + `authorize('seller')` |
| `/api/admin/orders` | GET | `protect` + `authorize('seller')` |
| `/api/admin/orders/:id/status` | PUT | `protect` + `authorize('seller')` |
| `/api/admin/customers` | GET | `protect` + `authorize('seller')` |
| `/api/health` | GET | public |

## CONVENTIONS

- CommonJS; controllers = named exported `async (req,res,next)`; errors → `next(error)` (auth/product) or inline 500 (admin)
- Responses: `{ success: true, data: ... }` / `{ success: false, error: '...' }`
- JWT secret/env: `process.env.JWT_SECRET`, expiry `process.env.JWT_EXPIRE` (fallbacks below)
- DB: `MONGODB_URI` env, fallback `mongodb://localhost:27017/smartcart`
- `protect` reads token from cookie first, then `Bearer` header
- Roles checked with `authorize('seller')` — role lives on user doc

## ANTI-PATTERNS

- **Hardcoded demo bypass (do not extend):** `authController.js` login contains a literal email+password that mint a token for virtual admin `admin_hardcoded_id`; `auth.js` protect() special-cases that id (created for Vercel demo — see git log). Real users must NOT be added this way.
- **Fallback secrets:** `jwt.sign/verify` default to `'secret123'` when `JWT_SECRET` unset — never rely on this in production; set env vars
- **`passwordHash` passed from client** in register — client-side hashing is non-standard; `pre('save')` re-hashes. Keep the field contract: register sends `passwordHash`, `matchPassword` compares `passwordHash`. Changing the field name breaks login
- `express-rate-limit` is a dependency but NOT wired — documentation.md requires rate limiting on `/api/chat` (50 req/user/day); wiring it is part of the rework
- **Schemas drift from spec** (documentation.md §3.2.2): current models use `username`/`passwordHash`/`averageRating`/`totalAmount` where the spec requires `name`/`password`/`rating{stars,count}`/`items_price`+`total_price`/`payment_method`/`keywords`/`subCategory`/`User.cart[]`. Realign models as part of the rework — and update AuthContext + cart flow together so field renames land in one sweep
- `ChatSession` + `/api/chat` + Ollama are REQUIRED by documentation.md (§3.3.1, §4.2.5) but unimplemented — build chatController/chatService, rate-limit middleware, and TTL-30d index during alignment
- `connectDB` deliberately swallows connection errors (dev when mongod is off) — server "starts" without DB; admin endpoints then 500

## COMMANDS

```bash
cd server
npm run dev    # node server.js — port 5000 (or $PORT)
```