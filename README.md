# SmartCart — MERN eCommerce FYP Platform

[![React](https://img.shields.io/badge/Frontend-React_19_%2B_Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Backend-Express_5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js_v18+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SmartCart** is a modern, full-stack multi-role eCommerce application built on the MERN stack (**MongoDB, Express 5, React 19, Node.js**). Designed as an Final Year Project (FYP), SmartCart bridges customers, multi-vendor sellers, and delivery logistics in a single platform with AI-driven shopping assistance and predictive analytics.

---

## 🌟 Key Features

### 🛒 Customer Storefront
* **Product Catalog & Search:** Fast product discovery with dynamic category filters, sorting options, and live search drawer.
* **Server-Synced Shopping Cart:** Real-time persistent cart synced across devices via Express backend (`/api/cart`) alongside local storage persistence.
* **Smart AI Chatbot Assistant:** Integrated conversational shopping assistant powered by an Ollama AI hybrid backend (`/api/chat`) with rate-limiting and session persistence.
* **Wishlist & Likes:** Server-synced liked items and quick-save wishlist management.
* **Account Dashboard:** Order tracking with live status updates (Pending, Processing, Delivered, Cancelled) and profile management.

### 🏢 Seller Hub
* **Inventory & Product Management:** Complete CRUD operations for seller inventory, stock levels, and category tagging.
* **Order Processing & Fulfillment:** Multi-order pipeline processing and status updates.
* **Rider Assignment & Couriers:** Dispatch management to assign orders to delivery riders.
* **AI Demand & Stockout Analytics:** Predictive forecasting algorithms to alert sellers to stock risks and forecast sales trends.

### 🚚 Delivery Logistics Portal
* **Rider Dashboard:** Role-guarded portal for logistics personnel to accept, track, and complete delivery dispatches.
* **Real-Time Delivery Updates:** Instant status transitions to keep customers and sellers informed.

---

## 📂 Repository Layout

```
smart-cart-fyp/
├── client/                     # Vite + React 19 Storefront
│   ├── src/
│   │   ├── api/                # Axios API client (baseURL: /api, withCredentials)
│   │   ├── components/         # 76 UI components across 14 domain modules
│   │   ├── context/            # AuthContext (JWT), CartContext (server-synced), Context (localStorage)
│   │   ├── pages/              # 34 route views across 11 semantic categories
│   │   └── utlis/              # Product mapping & helper utilities
│   ├── public/                 # Static assets & SCSS stylesheets
│   └── CLIENT_PAGES_AND_COMPONENTS.md # Comprehensive client architecture guide
├── server/                     # Express 5 API Server
│   ├── controllers/            # Request handlers (auth, product, cart, order, seller, delivery, chat)
│   ├── middleware/             # Cookie JWT authentication, role guards, & rate limiters
│   ├── models/                 # Mongoose schemas (User, Product, Order, Review, ChatSession)
│   ├── routes/                 # REST API endpoints
│   ├── services/               # Business logic & AI prediction services
│   └── scripts/                # Database seed script (`seedProducts.js`) & 50-product manifest
├── documentation.md            # Authoritative FYP specification (7 Chapters)
├── package.json                # Root process orchestration (`concurrently`)
└── vercel.json                 # Single Page Application (SPA) rewrite rules
```

---

## 🚀 Quick Start

### Prerequisites
* **Node.js**: `v18.x` or higher
* **MongoDB**: Local instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI
* **Ollama** *(Optional)*: Running locally for AI Chatbot capabilities (`http://localhost:11434`)

### 1. Installation

Clone the repository and install root dependencies:

```bash
# Clone the repository
git clone https://github.com/wali-ofc/smart-cart-fyp.git
cd smart-cart-fyp

# Install dependencies for root, server, and client
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Environment Setup

Copy the environment configuration template in `server/.env.example` to `server/.env`:

```bash
cp server/.env.example server/.env
```

Configure your environment variables in `server/.env` using secure placeholders (never expose real credentials or secrets in source control):

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_uri>
JWT_SECRET=<your_strong_jwt_secret_key>
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
OLLAMA_HOST=http://localhost:11434
RATE_LIMIT_MAX_REQUESTS=50
RATE_LIMIT_WINDOW_MS=86400000
```

> **Note:** `server/.env` is listed in `.gitignore` to prevent committing sensitive keys and credentials to git.

### 3. Seed Database Catalog

Populate MongoDB with the curated **50-product catalog** (10 per category) and a demo seller account:

```bash
cd server
npm run seed
cd ..
```

### 4. Run Development Environment

Start both the backend API server (`:5000`) and Vite frontend dev server (`:5173`) concurrently:

```bash
npm run dev
```

* Storefront URL: `http://localhost:5173`
* Express API URL: `http://localhost:5000/api`

---

## 🛠️ Tech Stack & Libraries

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | React 19, Vite 6, JavaScript (ES6+) | Single-Page Application framework |
| **Styling & UI** | Bootstrap 5, SCSS, Swiper, PhotoSwipe | UI design system & interactive sliders |
| **State & Auth** | React Context API, Axios, Cookie-based JWT | Global authentication & server-synced cart |
| **Backend Core** | Express 5, Node.js (CommonJS) | RESTful API server & routing |
| **Database** | MongoDB, Mongoose ORM | Data persistence & schema validations |
| **AI Integration** | Ollama Hybrid Engine | Conversational chatbot & AI demand forecasts |
| **Tooling** | Concurrently, Jest, Supertest | Concurrent dev servers & testing |

---

## 🛰️ REST API Endpoints Overview

| Area | Endpoint | Method | Role | Description |
| :--- | :--- | :---: | :---: | :--- |
| **Auth** | `/api/auth/register` | `POST` | Public | Register new user account |
| | `/api/auth/login` | `POST` | Public | Authenticate user & receive HTTP cookie token |
| | `/api/auth/logout` | `POST` | All | Clear session cookie |
| | `/api/auth/me` | `GET` | All | Retrieve authenticated profile |
| **Products** | `/api/products` | `GET` | Public | Fetch product list with search/filter/pagination |
| | `/api/products/:id` | `GET` | Public | Fetch single product details |
| | `/api/products` | `POST` | Seller | Add new product to catalog |
| **Cart** | `/api/cart` | `GET` / `POST` | Customer | Fetch or add items to synced cart |
| | `/api/cart/:productId` | `PUT` / `DELETE` | Customer | Update item quantity or remove item |
| **Orders** | `/api/orders` | `POST` | Customer | Place new order |
| | `/api/orders` | `GET` | Customer | List customer order history |
| | `/api/orders/:id` | `GET` | All | View itemized order receipt |
| **Seller** | `/api/seller/dashboard` | `GET` | Seller | Fetch store sales metrics & charts |
| | `/api/seller/predictions` | `GET` | Seller | Fetch AI demand & stockout forecasts |
| **Delivery**| `/api/delivery/dispatches` | `GET` | Delivery | List assigned delivery dispatches |
| **AI Chat** | `/api/chat` | `POST` | Public | Send prompt to AI chatbot assistant |

---

## 🌐 Production Deployment

### Frontend (Vercel)
The client builds into `client/dist`. The root `vercel.json` provides automatic SPA routing rules directing all page URLs to `index.html`.

### Backend (Render / Hostinger)
* Entry script: `server/server.js`
* In `NODE_ENV=production`, Express automatically serves the compiled frontend static files from `dist/`.

### Database
* **MongoDB Atlas**: Supply the cloud database connection string via `MONGODB_URI` environment variable.

---

## 📖 Further Documentation

* **[`documentation.md`](file:///d:/code/smart-cart-fyp/documentation.md)** — Comprehensive FYP project specification (Requirements, Architecture, Implementation, & Testing).
* **[`client/CLIENT_PAGES_AND_COMPONENTS.md`](file:///d:/code/smart-cart-fyp/client/CLIENT_PAGES_AND_COMPONENTS.md)** — Exhaustive directory map of all 34 React pages and 76 UI components.

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).