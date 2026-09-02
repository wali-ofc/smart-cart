# SmartCart - Modern Multipurpose eCommerce Platform

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Storage-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

**SmartCart** is a modern, high-performance eCommerce application built with React 19, Vite, and integrated with Supabase for PostgreSQL database, authentication, and media storage.

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Abdullah-2125/smart-cart-fyp.git
cd smart-cart-fyp
npm install
```

### 2. Environment Variables Setup

Copy `.env.example` to `.env.local` or `.env`:

```bash
cp .env.example .env.local
```

Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

> **Note**: The application works seamlessly out-of-the-box in local demo mode even if Supabase credentials are not provided.

### 3. Run Development Server

```bash
npm run dev
```

Open your browser at **[http://localhost:5173/](http://localhost:5173/)**.

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 🗄️ Supabase Backend Integration

### 1. Database Schema
Execute the SQL statements from [`supabase/schema.sql`](supabase/schema.sql) in your **Supabase Dashboard → SQL Editor**.

The schema provisions:
- `profiles` (User profile linked to Supabase Auth `auth.users`)
- `categories` (Product categories with slugs and item counts)
- `products` (Product catalog with pricing, variants, colors, sizes, and media)
- `banners` (Promotional banners and hero sliders)
- `cart_items` (Persistent cart items)
- `orders` (Order headers with tracking, payment status, and totals)
- `order_items` (Order line items linked to orders and products)
- Row Level Security (RLS) policies and automatic profile creation triggers.

### 2. Supabase Storage Setup
Create a public storage bucket named **`smartcart-assets`** in Supabase Storage with the following folder structure:

```
smartcart-assets/
  ├── products/
  ├── banners/
  ├── sliders/
  ├── categories/
  └── logos/
```

### 3. Database Seeding
To populate your Supabase PostgreSQL database with initial catalog and category data, run:

```bash
node scripts/seed-supabase.js
```

### 4. Media Asset Upload to Supabase Storage
To upload all local images from `public/images/` to your Supabase Storage bucket:

```bash
node scripts/upload-assets-to-supabase.js
```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub: `https://github.com/Abdullah-2125/smart-cart-fyp`
2. Import the project in [Vercel](https://vercel.com/new).
3. Vercel automatically detects the Vite framework settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. In **Project Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**. SPA rewrites are automatically handled by [`vercel.json`](vercel.json).

---

## 📁 Project Architecture

```
smart-cart-fyp/
├── public/                  # Static assets, logos, and demo images
│   ├── images/              # Local media files (1,800+ assets)
│   ├── favicon.ico          # SmartCart Favicon
│   └── scss/                # Stylesheet root
├── scripts/                 # Supabase migration and asset upload utilities
│   ├── seed-supabase.js
│   └── upload-assets-to-supabase.js
├── src/
│   ├── components/          # React UI components (Headers, Footers, Modals, Sliders)
│   ├── context/             # Global cart, wishlist, and compare state
│   ├── data/                # Local demo products, categories, menus, and banners
│   ├── lib/
│   │   ├── supabase.js      # Supabase client initialization
│   │   └── storage.js       # Dynamic image URL and storage resolver
│   ├── pages/               # Route views and page layouts
│   ├── services/            # Product, Category, and Order data services
│   ├── App.jsx              # Main router and route definitions
│   └── main.jsx             # Entry point
├── supabase/
│   └── schema.sql           # Complete PostgreSQL schema & RLS policies
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules for secrets and build artifacts
├── package.json             # Dependencies and scripts
├── vercel.json              # Vercel deployment SPA routing rules
└── vite.config.js           # Vite configuration
```

---

## 📄 License
Private project for FYP SmartCart development.
