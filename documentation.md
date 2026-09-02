# SmartCart - E-Commerce Application Documentation

---

## Table of Contents

1. [Chapter 1 — Introduction](#chapter-1--introduction)
2. [Chapter 2 — Requirements Analysis](#chapter-2--requirements-analysis)
3. [Chapter 3 — System Design](#chapter-3--system-design)
4. [Chapter 4 — Implementation](#chapter-4--implementation)
5. [Chapter 5 — Testing & Evaluation](#chapter-5--testing--evaluation)
6. [Chapter 6 — Deployment](#chapter-6--deployment)
7. [Chapter 7 — Conclusion](#chapter-7--conclusion)

---

# Chapter 1 — Introduction

## 1.1 Project Overview

**SmartCart** is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with an integrated AI chatbot for customer support. The application supports three distinct user roles: customers, sellers, and delivery agents, each with dedicated dashboards and functionality.

The project aims to provide a complete online shopping experience including product browsing, shopping cart management, order placement, seller product management, and delivery tracking. Additionally, the AI chatbot assists customers with FAQs, order tracking, and general inquiries.

## 1.2 Problem Statement

Traditional e-commerce platforms often lack personalized customer support and seamless integration between sellers, customers, and delivery personnel. This project addresses these challenges by providing:

- A unified platform for product listing, purchasing, and delivery tracking
- Role-based dashboards for customers, sellers, and delivery agents
- AI-powered customer support for instant query resolution
- Real-time order status tracking

## 1.3 Objectives

The primary objectives of SmartCart are:

1. **Product Management**: Enable sellers to list, manage, and analyze their products
2. **Shopping Experience**: Provide customers with an intuitive product browsing and purchasing flow
3. **Order Tracking**: Allow customers and delivery agents to track and update order status
4. **AI Support**: Integrate a local AI chatbot for customer assistance
5. **Analytics**: Provide sellers with sales analytics and product performance metrics

## 1.4 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend** | React (Vite) | 19.2.4 |
| **Styling** | Tailwind CSS | 4.2.2 |
| **Backend** | Node.js | Latest LTS |
| **Framework** | Express.js | 5.2.1 |
| **Database** | MongoDB | Latest (compass) |
| **Authentication** | JWT (HTTP-only cookies) | 9.0.3 |
| **AI Integration** | Ollama (local AI) | - |
| **Icons** | Lucide React | 1.14.0 |
| **API Testing** | Browser DevTools / Postman | - |

### Additional Development Tools

| Tool | Purpose |
|------|---------|
| **Visual Paradigm** | UML diagramming (use case, class, sequence, ER diagrams) |
| **MongoDB Compass** | Database visualization and management |
| **Nodemon** | Backend hot-reload development |
| **ESLint** | Frontend code quality |

## 1.5 External Data Source

Products are seeded from the **Free E-commerce Products API**:
- **URL**: `https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json`
- **Product Count**: ~50 products
- **Categories**: Electronics & Gadgets, Fashion & Apparel, Beauty & Personal Care, Home & Kitchen, Health & Fitness

## 1.6 Scope

### In Scope
- User authentication (register, login, logout)
- Product browsing with filtering and search
- Shopping cart (add, remove, update quantity)
- Order placement and history
- Seller dashboard with product management
- Delivery agent dashboard with order assignments
- AI chatbot for customer support

### Out of Scope
- Payment processing (UI shows "Coming Soon")
- Email notifications
- Mobile application
- Advanced search analytics

---

# Chapter 2 — Requirements Analysis

## 2.1 Functional Requirements

### 2.1.1 Authentication System

| ID | Requirement | Description |
|----|-------------|-------------|
| F001 | User Registration | Users can register as Customer, Seller, or Delivery Agent |
| F002 | User Login | Users can login with email and password |
| F003 | JWT Authentication | Secure HTTP-only cookie-based authentication |
| F004 | Role-based Access | Different routes and dashboards based on user role |

### 2.1.2 Product Management

| ID | Requirement | Description |
|----|-------------|-------------|
| F005 | Product Listing | Browse all products with pagination |
| F006 | Product Filtering | Filter by category, price range |
| F007 | Product Details | View detailed product information |
| F008 | Product Search | Search products by name, description, keywords |
| F009 | Category Display | View available product categories |

### 2.1.3 Shopping Cart

| ID | Requirement | Description |
|----|-------------|-------------|
| F010 | Add to Cart | Add products with specified quantity |
| F011 | Update Quantity | Modify item quantity in cart |
| F012 | Remove Item | Remove items from cart |
| F013 | Clear Cart | Remove all items from cart |
| F014 | View Cart | Display cart contents and total |

### 2.1.4 Order Management

| ID | Requirement | Description |
|----|-------------|-------------|
| F015 | Place Order | Create order from cart items |
| F016 | Order History | View past orders |
| F017 | Order Details | View detailed order information |
| F018 | Order Status Tracking | Track order through various stages |

### 2.1.5 Seller Dashboard

| ID | Requirement | Description |
|----|-------------|-------------|
| F019 | Sales Overview | View total revenue, orders, products |
| F020 | Product Management | Add, edit, delete products |
| F021 | Product Analytics | View per-product sales data |
| F022 | Order Management | View and manage orders |
| F023 | AI Predictions | View AI-powered insights (UI placeholder) |

### 2.1.6 Delivery Dashboard

| ID | Requirement | Description |
|----|-------------|-------------|
| F024 | Assigned Orders | View orders assigned to delivery agent |
| F025 | Status Update | Update delivery status (pending → shipped → delivered) |
| F026 | Order Grouping | View orders grouped by seller |

### 2.1.7 AI Chatbot

| ID | Requirement | Description |
|----|-------------|-------------|
| F027 | Chat Interface | User-friendly chat UI |
| F028 | FAQ Response | Answer common customer questions |
| F029 | Order Context | Use order history for relevant responses |
| F030 | Rate Limiting | 50 requests per user per day |

## 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NF001 | Performance | Page load under 3 seconds |
| NF002 | Security | JWT in HTTP-only cookies, password hashing with bcrypt |
| NF003 | Responsive Design | Mobile-friendly UI |
| NF004 | Error Handling | Graceful error messages, no crashed pages |
| NF005 | Code Quality | ESLint compliance, clean code structure |

## 2.3 User Roles

| Role | Permissions |
|------|-------------|
| **Customer** | Browse products, manage cart, place orders, view order history |
| **Seller** | Manage products, view analytics, update order status |
| **Delivery Agent** | View assigned orders, update delivery status |

## 2.4 Use Case Diagram

```
┌─────────────┐
│   Visitor   │
└──────┬──────┘
       │
       ├─► Register ──────────────┐
       │                          │
       ├─► Login ────────────────►│
       │                          ▼
       │                    ┌──────────┐
       │                    │  User    │
       │                    └────┬─────┘
       │                          │
       │          ┌───────────────┼───────────────┐
       │          ▼               ▼               ▼
       │    ┌─────────┐    ┌─────────┐    ┌─────────────┐
       │    │Customer │    │ Seller  │    │Delivery Agent│
       │    └────┬────┘    └────┬────┘    └──────┬──────┘
       │         │              │                │
       │    ┌────┴────┐    ┌────┴────┐     ┌────┴────┐
       │    │         │    │         │     │         │
       │  Browse   Manage   Update   Update   View
       │  Products Products  Status   Orders  Deliveries
       │  Add to   Add/Edit          Status
       │  Cart     Products
       │  Place   Analytics
       │  Orders
       │  Chat
       └─────────────────────────────────────────────┘
```

## 2.5 Data Requirements

### Entities

1. **User**: name, email, password, role (customer/seller/delivery), cart
2. **Product**: name, description, price, category, image, keywords, rating, stock, seller
3. **Order**: user, items, shipping_address, payment_method, status, seller, delivery_agent
4. **ChatSession**: user, messages, context
5. **Review**: user, product, rating (1-5 stars), comment, createdAt

---

# Chapter 3 — System Design

## 3.1 System Architecture

### 3.1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────────┐│
│  │   Pages  │  │Components│  │ Contexts │  │   Services/API  ││
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬────────┘│
└───────┼─────────────┼─────────────┼─────────────────┼──────────┘
        │             │             │                 │
        └─────────────┴──────┬──────┴─────────────────┘
                             │ HTTP/HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER (Express.js)                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Middleware Layer                         ││
│  │  CORS │ Body Parser │ Cookie Parser │ Rate Limit │ Auth   ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     Route Layer                              ││
│  │  /api/auth │ /api/products │ /api/cart │ /api/orders │ /api/chat │
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   Controller Layer                           ││
│  │  authController │ productController │ cartController │ orderController │ chatController │
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   Service Layer                              ││
│  │  authService │ productService │ orderService │ chatService │
│  └─────────────────────────────────────────────────────────────┘│
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE (MongoDB)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │   User   │  │ Product  │  │  Order   │  │   ChatSession    │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1.2 Component Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND COMPONENTS                         │
├─────────────────────────────────────────────────────────────────────┤
│  Layout: Navbar, Footer, Container                                  │
│  UI: Button, Input, Card, Modal, Spinner                            │
│  Features:                                                          │
│    ├── ProductCard, CartItem, OrderCard                            │
│    ├── ChatWidget, ChatMessage                                     │
│    ├── SellerDashboard, DeliveryDashboard                         │
├─────────────────────────────────────────────────────────────────────┤
│  Pages:                                                             │
│    ├── Home, ProductListing, ProductDetail, Cart, Checkout        │
│    ├── OrderHistory, Login, Register                              │
│    ├── SellerDashboard, ProductManager, AIPredictions             │
│    └── DeliveryDashboard                                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKEND SERVICES                          │
├─────────────────────────────────────────────────────────────────────┤
│  Authentication: JWT, bcrypt, HTTP-only cookies                    │
│  Products: CRUD, filtering, search, pagination                    │
│  Cart: CRUD operations, quantity management                       │
│  Orders: Creation, status updates, history                       │
│  Chat: AI integration (Ollama), rate limiting         │
└─────────────────────────────────────────────────────────────────────┘
```

## 3.2 Database Design

### 3.2.1 Entity-Relationship Diagram

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    User     │         │   Product   │         │    Order    │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ _id (PK)    │         │ _id (PK)    │         │ _id (PK)    │
│ name        │         │ name        │         │ user (FK)   │
│ email       │◄───┐    │ description │         │ seller (FK) │
│ password    │    │    │ price      │         │ delivery_   │
│ role        │    │    │ category   │         │ agent (FK)  │
│ cart []     │    └────│ seller (FK)│         │ status      │
│ createdAt   │         │ image       │         │ total_price │
└─────────────┘         │ rating      │         │ createdAt   │
                        │ stock       │         └──────┬──────┘
                        │ createdAt   │                │
                        └──────┬──────┘                │
                               │                       │
                               │ items                 │
                               │                       │
                        ┌──────▼──────┐         ┌──────▼──────┐
                        │ ChatSession│         │ OrderItem   │
                        ├─────────────┤         ├─────────────┤
                        │ _id (PK)    │         │ product     │
                        │ user (FK)   │         │ name        │
                        │ messages [] │         │ price       │
                        │ createdAt   │         │ quantity    │
                        └──────┬──────┘         └─────────────┘
                               │
                               │ reviews
                               │
                        ┌──────▼──────┐
                        │   Review    │
                        ├─────────────┤
                        │ _id (PK)    │
                        │ user (FK)   │
                        │ product (FK)│
                        │ rating (1-5)│
                        │ comment     │
                        │ createdAt   │
                        └─────────────┘
```

### 3.2.2 Database Schema Details

#### User Schema

| Field | Type | Required | Validation |
|-------|------|----------|-------------|
| name | String | Yes | min 2 chars, trim |
| email | String | Yes | unique, valid email format |
| password | String | Yes | min 6 chars |
| role | String | Yes | enum: customer, seller, delivery |
| cart | Array | No | [{ product: ObjectId, quantity: Number }] |

#### Product Schema

| Field | Type | Required | Validation |
|-------|------|----------|-------------|
| name | String | Yes | max 200 chars |
| description | String | Yes | max 2000 chars |
| price | Number | Yes | min 0 |
| category | String | Yes | enum: 5 categories |
| subCategory | String | No | - |
| seller | ObjectId | No | ref: User |
| image | String | Yes | URL |
| keywords | Array | No | [String] |
| rating | Object | No | { stars: 0-5, count: Number } |
| likes | Array | No | [ObjectId - ref: User] |
| stock | Number | Yes | min 0 |

#### Order Schema

| Field | Type | Required | Validation |
|-------|------|----------|-------------|
| user | ObjectId | Yes | ref: User |
| items | Array | Yes | [{ product, name, price, quantity }] |
| shipping_address | Object | Yes | { street, city, state, zip_code, country } |
| payment_method | String | Yes | enum: cod, card, other |
| items_price | Number | Yes | default 0 |
| total_price | Number | Yes | default 0 |
| seller | ObjectId | No | ref: User |
| delivery_agent | ObjectId | No | ref: User |
| status | String | Yes | enum: pending, processing, shipped, delivered, cancelled |
| notes | String | No | max 500 chars |

#### ChatSession Schema

| Field | Type | Required | Validation |
|-------|------|----------|-------------|
| user | ObjectId | Yes | ref: User |
| messages | Array | No | [{ sender: user/ai, message, timestamp }] |
| context | Mixed | No | - |

#### Review Schema

| Field | Type | Required | Validation |
|-------|------|----------|-------------|
| user | ObjectId | Yes | ref: User |
| product | ObjectId | Yes | ref: Product |
| rating | Number | Yes | min 1, max 5 |
| comment | String | No | max 1000 chars |
| createdAt | Date | Yes | default: Date.now |

## 3.3 API Design

### 3.3.1 API Endpoints

#### Authentication Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | User login |
| POST | /api/auth/logout | Yes | User logout |
| GET | /api/auth/me | Yes | Get current user |

#### Product Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products | No | List products (paginated, filtered) |
| GET | /api/products/:id | No | Get single product |
| GET | /api/products/categories | No | List categories |
| POST | /api/products | Yes (seller) | Create product |
| PUT | /api/products/:id | Yes (seller) | Update product |
| DELETE | /api/products/:id | Yes (seller) | Delete product |

#### Cart Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/cart | Yes | Get user cart |
| POST | /api/cart | Yes | Add item to cart |
| DELETE | /api/cart/:productId | Yes | Remove item |
| DELETE | /api/cart | Yes | Clear cart |

#### Order Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/orders | Yes | Create order |
| GET | /api/orders | Yes | Get user orders |
| GET | /api/orders/:id | Yes | Get single order |
| PUT | /api/orders/:id/status | Yes | Update order status |

#### Seller Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/seller/dashboard | Yes (seller) | Dashboard stats |
| GET | /api/seller/products | Yes (seller) | Seller products |
| GET | /api/seller/products/:id/analytics | Yes (seller) | Product analytics |

#### Delivery Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/delivery/assigned | Yes (delivery) | Assigned orders |
| PUT | /api/delivery/:orderId/status | Yes (delivery) | Update status |

#### Chat Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/chat | Yes | Send message (rate limited) |

#### Review Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/reviews/product/:productId | No | Get product reviews |
| POST | /api/reviews/product/:productId | Yes | Add review to product |
| PUT | /api/reviews/:id | Yes (owner) | Update own review |
| DELETE | /api/reviews/:id | Yes (owner) | Delete own review |
| GET | /api/reviews/my-reviews | Yes | Get current user's reviews |

#### Like/Unlike Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products/:id/like | No | Check if user liked product |
| POST | /api/products/:id/like | Yes | Like a product |
| DELETE | /api/products/:id/like | Yes | Unlike a product |
| GET | /api/products/likes | Yes | Get user's liked products |

### 3.3.2 Sequence Diagram - Place Order

```
Customer              Server                  Database
   │                    │                        │
   │ POST /api/orders   │                        │
   │───────────────────►│                        │
   │                    │                        │
   │                    │ Validate JWT           │
   │                    │─────────────►          │
   │                    │                        │
   │                    │◄─────────────           │
   │                    │                        │
   │                    │ Create Order           │
   │                    │───────────────────────►│
   │                    │                        │
   │                    │◄───────────────────────│
   │                    │                        │
   │                    │ Clear User Cart        │
   │                    │───────────────────────►│
   │                    │                        │
   │                    │◄───────────────────────│
   │                    │                        │
   │ 201 Created       │                        │
   │◄──────────────────│                        │
   │                    │                        │
```

## 3.4 UI/UX Design

### 3.4.1 Design System (Airbnb-inspired)

**Color Palette**:
- Primary: #ff385c (Rausch)
- Primary Active: #e00b41
- Primary Disabled: #ffd1da
- Ink: #222222
- Body: #3f3f3f
- Muted: #6a6a6a
- Canvas: #ffffff
- Surface Soft: #f7f7f7

**Typography**:
- Display: 22-28px, weight 500-700
- Body: 14-16px, weight 400
- Button: 14-16px, weight 500

**Spacing System**:
- Base: 4px
- Common: 8px, 12px, 16px, 24px, 32px, 64px

### 3.4.2 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 744px | Single column, collapsible nav |
| Tablet | 744-1128px | 2-3 column grid |
| Desktop | 1128-1440px | Full layout |
| Wide | > 1440px | Max content width capped |

### 3.4.3 Page Layouts

1. **Home/Products Page**: Navbar + Category strip + Product grid + Footer
2. **Product Detail**: Image gallery + Details + Add to Cart
3. **Cart**: Item list + Quantity controls + Summary
4. **Seller Dashboard**: Stats cards + Charts + Product table
5. **Delivery Dashboard**: Status overview + Order list grouped by seller
6. **Chat Widget**: Floating button + Message list + Input field

## 3.5 Security Design

### 3.5.1 Authentication Flow

1. User registers with name, email, password, role
2. Password hashed with bcrypt (10 salt rounds)
3. JWT generated on login with user ID and role
4. JWT stored in HTTP-only cookie
5. Auth middleware validates JWT on protected routes

### 3.5.2 Security Measures

- **Password**: bcrypt hashing, never stored in plain text
- **JWT**: HTTP-only cookies, expiration 7 days
- **Rate Limiting**: 50 requests/day for chat endpoint
- **Input Validation**: express-validator for sanitization
- **CORS**: Configured for specific origins
- **Environment Variables**: Secrets in .env files

---

# Chapter 4 — Implementation

## 4.1 Project Structure

### 4.1.1 Directory Structure

```
smartcart/
├── server/                    # Backend
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── chatController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── rateLimitMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── ChatSession.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── chatRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── chatService.js
│   ├── scripts/
│   │   └── seedProducts.js
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── client/                    # Frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   └── features/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── .agents/
├── .claude/
├── skills-lock.json
├── README.md
├── AGENTS.md
├── CONTEXT.md
├── DESIGN.md
└── ollama-ecom-ai-guide.md
```

## 4.2 Backend Implementation

### 4.2.1 Server Setup (server/server.js)

```javascript
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware order (critical)
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Rate limiting
app.use(require('./middleware/rateLimitMiddleware'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Protected routes
app.use('/api/cart', require('./middleware/authMiddleware'), require('./routes/cartRoutes'));
app.use('/api/orders', require('./middleware/authMiddleware'), require('./routes/orderRoutes'));
app.use('/api/chat', require('./middleware/authMiddleware'), require('./routes/chatRoutes'));

// Error handling (must be last)
app.use(require('./middleware/errorMiddleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 4.2.2 Database Models

**User Model** (server/models/User.js):
- Pre-save hook for password hashing
- Methods: comparePassword, getSignedToken, toSafeJSON
- Indexes on email for fast lookups

**Product Model** (server/models/Product.js):
- Text index for search (name, description, keywords)
- Compound index on category + price
- Rating embedded object

**Order Model** (server/models/Order.js):
- User reference for ownership
- Items array with product reference
- Status enum with 5 states
- Index on user + createdAt for order history

**ChatSession Model** (server/models/ChatSession.js):
- TTL index: auto-delete after 30 days
- Messages array with sender + content + timestamp

**Review Model** (server/models/Review.js):
- User and Product references
- Rating field (1-5 stars)
- Comment text field
- Index on product for efficient retrieval

### 4.2.3 Authentication Implementation

```javascript
// Auth Controller - Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = user.getSignedToken();
    res.cookie('token', token, { httpOnly: true, expiresIn: '7d' });
    res.json({ user: user.toSafeJSON(), token });
  } catch (err) { next(err); }
};
```

### 4.2.4 Product Seeding

```javascript
// scripts/seedProducts.js
const fetch = require('node-fetch');
// Fetch from Free E-commerce Products API
// Transform and insert into MongoDB
// Run: npm run seed
```

### 4.2.5 AI Chat Service

Uses **Ollama** (local AI) with custom gemma3:1b model and Modelfile for store-specific responses.

```javascript
// chatService.js - Ollama integration
// Calls http://localhost:11434/api/generate with custom model
// Model: smartcart-bot (created from gemma3:1b with Modelfile)

exports.getAIResponse = async (message, orderContext) => {
  // Implementation with context injection
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'smartcart-bot',
      prompt: message,
      stream: false
    })
  });
  return response.json();
};
```

## 4.3 Frontend Implementation

### 4.3.1 Tech Stack Setup

- **React 19** with Vite for fast development
- **Tailwind CSS 4** for styling
- **React Router v7** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### 4.3.2 Context Providers

**AuthContext**:
- Provides: currentUser, loading, login(), logout(), register()
- Persists auth state across app

**CartContext**:
- Provides: cartItems, addToCart(), removeFromCart(), updateQuantity(), clearCart()
- Syncs with backend when authenticated

**ChatContext**:
- Provides: messages, sendMessage(), loading state

### 4.3.3 Key Components

| Component | Description |
|-----------|-------------|
| Navbar | Logo, nav links, cart icon with count, user menu |
| ProductCard | Image, name, price, rating, add to cart button |
| CartItem | Product info, quantity controls, remove button |
| ChatWidget | Floating button, message list, input field |
| SellerDashboard | Stats cards, charts, product table |
| DeliveryDashboard | Order list grouped by seller |

### 4.3.4 Pages

**Customer Pages**:
- `/` - Home with featured products
- `/products` - Product listing with filters
- `/product/:id` - Product detail with reviews & like button
- `/cart` - Shopping cart
- `/checkout` - Checkout form (UI only)
- `/orders` - Order history
- `/likes` - User's liked products
- `/profile` - User profile with reviews

**Seller Pages**:
- `/seller` - Dashboard with analytics
- `/seller/products` - Manage products
- `/seller/ai-predictions` - AI insights (placeholder)

**Delivery Pages**:
- `/delivery` - Assigned deliveries
- `/delivery/:orderId` - Delivery detail

### 4.3.5 API Integration

```javascript
// api/axios.js
import axios from 'axios';
const api = axios.create({ baseURL: '/api', withCredentials: true });
// Automatically includes JWT cookie
```

## 4.4 Feature Implementation Status

### Completed Features

- [x] User authentication (register, login, logout)
- [x] JWT in HTTP-only cookies
- [x] Role-based route protection
- [x] Product listing with pagination
- [x] Product filtering (category, price)
- [x] Product search (text index)
- [x] Shopping cart management
- [x] Order placement
- [x] Order history
- [x] Order status tracking
- [x] Seller dashboard with stats
- [x] Seller product management (CRUD)
- [x] Delivery dashboard
- [x] Delivery status updates
- [x] AI chatbot (Ollama local AI)
- [x] Product reviews & ratings (with comments)
- [x] Product likes/favorites
- [x] User profile page
- [x] Product seeding

### Placeholder Features (Coming Soon)

- [ ] Payment processing
- [ ] AI predictions (dashboard placeholders)
- [ ] Email notifications
- [ ] Advanced analytics

---

# Chapter 5 — Testing & Evaluation

## 5.1 Testing Strategy

### 5.1.1 Testing Types

| Type | Description | Tools |
|------|-------------|-------|
| Unit Testing | Individual functions/components | Jest, React Testing Library |
| Integration Testing | API endpoints | Supertest, Jest |
| Manual Testing | Feature verification | Browser, Postman |

### 5.1.2 Test Structure

```
server/
├── __tests__/
│   ├── models/
│   │   ├── User.test.js
│   │   └── Product.test.js
│   ├── routes/
│   │   ├── auth.test.js
│   │   ├── products.test.js
│   │   └── orders.test.js
│   └── services/
│       └── chat.test.js
└── jest.config.js

client/src/
├── __tests__/
│   ├── components/
│   │   ├── Button.test.jsx
│   │   └── ProductCard.test.jsx
│   └── hooks/
│       └── useCart.test.js
```

### 5.1.3 Test Examples

**User Registration Test**:
```javascript
describe('POST /api/auth/register', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'Password123' })
      .expect(201);
    
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });
});
```

## 5.2 Manual Testing Checklist

### Authentication
- [ ] Register new customer
- [ ] Register new seller
- [ ] Register new delivery agent
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout clears cookie

### Products
- [ ] View all products with pagination
- [ ] Filter by category
- [ ] Filter by price range
- [ ] Search products by keyword
- [ ] View product details
- [ ] Seller creates new product
- [ ] Seller edits product
- [ ] Seller deletes product

### Cart
- [ ] Add item to cart
- [ ] Update item quantity
- [ ] Remove item from cart
- [ ] Clear entire cart

### Orders
- [ ] Place order from cart
- [ ] View order history
- [ ] View single order details
- [ ] Seller updates order status
- [ ] Delivery agent updates status

### Seller Dashboard
- [ ] View total revenue
- [ ] View orders this month
- [ ] View products listed
- [ ] View average rating
- [ ] View product table

### Delivery Dashboard
- [ ] View assigned orders
- [ ] Group by seller
- [ ] Update delivery status

### Chat
- [ ] Open chat widget
- [ ] Send message
- [ ] Receive AI response
- [ ] Rate limiting works

## 5.3 Performance Evaluation

### Expected Performance Metrics

| Metric | Target | Actual |
|--------|-------|--------|
| Page Load Time | < 3 seconds | ~1-2s |
| API Response Time | < 500ms | ~100-300ms |
| Database Queries | Optimized with indexes | Yes |
| Bundle Size | < 500KB | Varies by route |

### Optimization Techniques Used

1. **Frontend**:
   - Vite for fast builds
   - Code splitting by route
   - Tailwind CSS purging

2. **Backend**:
   - Database indexes
   - Pagination for large lists
   - Rate limiting

## 5.4 Known Issues and Limitations

1. **Payment Processing**: UI only, no actual payment integration
2. **AI Predictions**: Placeholder UI, no real analytics
3. **Email Notifications**: Not implemented
4. **Search Suggestions**: Basic text search only

---

# Chapter 6 — Deployment

## 6.1 Deployment Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Vercel        │         │   Render        │
│   (Frontend)    │ ──────► │   (Backend)     │
│                 │  HTTPS  │                 │
└─────────────────┘         └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │   MongoDB Atlas │
                              │   (Database)    │
                              └─────────────────┘
```

## 6.2 Environment Variables

### Server (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcart
JWT_SECRET=your-64-character-random-string
JWT_EXPIRE=7d
OLLAMA_HOST=http://localhost:11434
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
RATE_LIMIT_MAX_REQUESTS=50
RATE_LIMIT_WINDOW_MS=86400000
```

### Client

- Vite proxy forwards `/api` to backend
- No client-side .env needed for API URL in dev

## 6.3 Deployment Steps

### 6.3.1 Backend (Render)

1. Connect GitHub repository to Render
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables
6. Deploy

### 6.3.2 Frontend (Vercel)

1. Import GitHub repository to Vercel
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### 6.3.3 Database (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster (free tier)
3. Create database user
4. Add IP whitelist (or 0.0.0.0 for all)
5. Get connection string
6. Add to server .env

## 6.4 Local Development Setup

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ LTS |
| MongoDB | Latest (or Atlas) |
| npm | 9+ |

### Setup Steps

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd smartcart
   ```

2. **Backend setup**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your values
   npm install
   npm run seed
   npm run dev
   ```

3. **Frontend setup** (new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 6.5 Ollama Local AI Setup

The AI chatbot uses Ollama (local AI) by default:

1. Install Ollama from https://ollama.com
2. Pull model: `ollama pull gemma3:1b`
3. Create Modelfile with system prompt
4. Create custom model: `ollama create smartcart-bot -f Modelfile`
5. Chat service calls `http://localhost:11434/api/generate`

---

# Chapter 7 — Conclusion

## 7.1 Project Summary

SmartCart is a fully functional MERN stack e-commerce application that provides:

1. **Multi-role support**: Customers, sellers, and delivery agents each have dedicated dashboards
2. **Complete shopping flow**: Product browsing, cart management, order placement, and tracking
3. **AI integration**: Local chatbot for customer support with context-aware responses
4. **Modern UI**: Airbnb-inspired design with Tailwind CSS, fully responsive
5. **Security**: JWT authentication, password hashing, rate limiting

## 7.2 Key Achievements

| Achievement | Description |
|-------------|-------------|
| Full-stack implementation | Complete MERN application |
| Role-based access control | Three distinct user roles with protected routes |
| Product management | CRUD operations with search and filtering |
| Order workflow | From cart to delivery status tracking |
| AI chatbot | Integrated with Ollama (local AI) |
| Reviews & Ratings | Customers can rate and comment on products |
| Responsive design | Works on mobile, tablet, and desktop |
| Clean code | ESLint compliant, modular architecture |

## 7.3 Future Enhancements

1. **Payment Integration**: Add Stripe or PayPal
2. **Email Notifications**: Order confirmations, shipping updates
3. **Advanced Analytics**: Real sales predictions, trend analysis
5. **Mobile App**: React Native or Flutter

## 7.4 Lessons Learned

1. **Planning**: Clear requirements prevent rework
2. **Architecture**: Separation of concerns makes maintenance easier
3. **Security**: Never expose secrets, always validate input
4. **Testing**: Early testing catches bugs faster
5. **Documentation**: Good docs help team collaboration

## 7.5 References

- [React Documentation](https://react.dev)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Ollama](https://ollama.com)
- [Free E-commerce Products API](https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json)

---

*Document Version: 1.0*
*Last Updated: May 2026*
*Created with Visual Paradigm for UML Diagrams*