# SmartCart — MERN eCommerce FYP

**SmartCart** is a full-stack eCommerce platform built with **React 19 + Vite** (storefront),
**Express 5 + MongoDB/Mongoose** (API), with three roles: **customer / seller / delivery**.

> The authoritative project specification is **`documentation.md`** (FYP document, 7 chapters).
> The current UI look (Bootstrap 5 + SCSS template) is FROZEN — do not restyle.

---

## Repository Layout

```
smart-cart-fyp/
├── client/                  # Vite + React 19 storefront (Bootstrap 5 + SCSS)
│   ├── src/components/      # UI component library (template-derived variant set)
│   ├── src/context/         # AuthContext (JWT) + CartContext (server-synced cart)
│   ├── src/api/             # axios instance (baseURL /api, withCredentials)
│   ├── src/pages/           # route views
│   └── public/              # scss/, images/, admin-build/ (iframe seller dashboard)
├── server/                  # Express 5 API (controllers, models, routes, services)
├── scripts/                 # one-off maintenance scripts
├── admin dashboard/         # VENDOR template source (extracted-silva) — reference only
├── documentation.md         # authoritative FYP spec
└── vercel.json              # SPA rewrites
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install            # root (concurrently)
cd server && npm install
cd ../client && npm install

# 2. Configure the server
cp server/.env.example server/.env   # set MONGODB_URI, JWT_SECRET, etc.

# 3. Seed the product catalog (50 products, 5 categories) + demo seller
cd server && npm run seed

# 4. Run dev (server :5000 + client :5173, Vite proxies /api → :5000)
npm run dev

# 5. Build the storefront (client/dist, copied to ./dist by the root build script)
npm run build
```

Client-only: `cd client && npm run dev` (port 5173).

---

## Server Environment (server/.env.example)

| Var | Purpose |
|-----|---------|
| `PORT` | API port (default 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRE` | Token lifetime (default 7d) |
| `NODE_ENV` | `production` serves the built client from `dist/` |
| `CORS_ORIGIN` | Allowed origin for cookie auth |
| `OLLAMA_HOST` | Ollama endpoint for the AI chatbot |
| `RATE_LIMIT_MAX_REQUESTS` / `RATE_LIMIT_WINDOW_MS` | Chat rate limit (50/day) |

---

## API Surface (summary)

- `POST /api/auth/register|login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET|POST|PUT|DELETE /api/products`, `GET /api/products/categories`, likes endpoints
- `GET|POST /api/cart`, `PUT|DELETE /api/cart/:productId`, `DELETE /api/cart`
- `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`, `PUT /api/orders/:id/status`
- `GET /api/seller/*`, `GET /api/delivery/*` (role-guarded)
- `POST /api/chat` (rate-limited, Ollama-backed), `GET|DELETE /api/chat/history`

See `documentation.md` §3.3.1 for the full route table and response shapes.

---

## Deployment

- **Frontend**: Vercel (or static host) — root output `client/dist`
- **Backend**: Render / Hostinger — startup `server/server.js`, `NODE_ENV=production` serves the built client from `dist/`
- **Database**: MongoDB Atlas (`MONGODB_URI`)