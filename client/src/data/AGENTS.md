# DATA — Static Catalog & Content

## OVERVIEW

19 files / ~15k lines of static demo content exported as JS/JSX modules. This IS the storefront's data source — the MongoDB `Product` model is NOT used by shop/cart pages. Content includes ~900 catalog entries, blogs, banners, menus, and testimonials.

> TEMPORARY SCAFFOLD — documentation.md §1.5/§4.2.4 requires MongoDB instead: ~50 products seeded from the Free E-commerce Products API (5 categories) via a `server/scripts/seedProducts.js` + `npm run seed`. This static catalog is slated for removal during alignment; migrate consumers (Context.jsx first) before deleting.

## FILE MAP

| File | Content | Used by |
|------|---------|---------|
| `products.js` | `products1` array — ~900 demo items (categories "Best seller"/"On Sale" etc.) | Context.jsx, shop pages, cards |
| `singleProductOptions.js` | variant-specific options | Details components |
| `productGallery.js`, `gallery.js` | image galleries | shopDetails/gallery |
| `shop.js` | shop demo settings | shop layout components |
| `categories.js`, `brands.js`, `brandList.js` | filters, brand lists | shop sidebars, home |
| `banner.js`, `heroslides.jsx` | hero/banner data | home + modals |
| `menu.jsx` | nav menu structure (updated by `update_nav.cjs`) | headers/Nav |
| `blogs.js` | 6 demo blog posts (per recent commits) | blog pages |
| `faqs.js`, `process.js`, `features.jsx`, `marquees.js`, `socials.js`, `testimonials.js`, `footerLinks.js` | marketing content | common/home components |

## PRODUCT OBJECT SHAPE (products.js)

```js
{ id, imgSrc, imgHoverSrc, title, price,
  colors: [{name, colorClass, imgSrc}],
  sizes: ["S","M","L","XL"],
  filterCategories: [...], brand, isAvailable }
```

## CONVENTIONS

- Prices are plain numbers (`16.95`), not strings
- `id` is an integer — cart/wishlist use loose `==` comparisons against it in `Context.jsx`
- Image paths are root-relative `/images/...` (resolved from `client/public/images/`)
- `.jsx` extension files export JSX (e.g. `menu.jsx` renders nav markup) — keep the format

## ANTI-PATTERNS

- **Static catalog files were REMOVED (2026-09-08, alignment rework)** — `products.js`, `singleProductOptions.js`, `shop.js`, `categories.js`, `brands.js`, `brandList.js`, `gallery.js`, `productGallery.js` and their dead variant importers are gone. Storefront product data now comes from the Express API (`@/api/axios`) normalized via `normalizeProduct` in `@/utlis/productMap`; cart/wishlist state lives in `Context.jsx`/`CartContext.jsx`. Do NOT re-create or re-import these deleted data files.
- **Do NOT change product `id`s** — breaking change for localStorage carts and routes (`/product-detail/:id`); ids are MongoDB `_id` strings returned by `normalizeProduct`
- Adding/removing blog posts must keep ids stable for `/blog-grid` + `/blog-detail/:id`
- Supabase seed scripts (`scripts/seed-supabase.js`) target a deprecated stack — do not expect this data to exist in MongoDB