# COMPONENTS — Variant Library

## OVERVIEW

252 files / ~42k lines of UI components derived from a commercial template. Organized as families of near-identical numbered variants (Headers 1-22, ProductCards 1-33, Details 1-29, Footers 1-8, sliders, tabs, galleries). Most variants are UNUSED by the current routes — only a subset is imported by pages.

## STRUCTURE

- `headers/` — 22 Header + 4 Topbar variants, plus `Nav.jsx`
- `shopCards/` — ProductCard1-33 (note inconsistent casing: `Productcart2`, `Productcard23`, `ProductsCard21`)
- `shopDetails/` — Details1-29 + `DefaultShopDetails*`, zoom/grouped variants; subfolders `sliders/` (17 files, Slider1-6 + zoom variants) and `gallery/` (Gallery1-3)
- `shop/` — shop layout variants (ShopDefault, ShopFullwidth, ShopFilter, Sidebar*, Sorting, ProductStyle1-7, ProductGrid) — these are page-section components
- `modals/` — 20 global overlays mounted once in `App.jsx` (QuickView, ShopCart, Login, Register, SearchModal, MobileMenu, Toolbar*, ...)
- `common/` — shared utilities (MetaComponent, Pagination, Countdown, ScrollTop, RtlToggle, LoadStyles, ...)
- `footers/` — Footer1-8
- `homes/home-1/` — home page sections (Hero, Categories, Products, Brands, Lookbook, Marquee)
- `othersPages/` — section blocks for about/contact/faq/brands/dashboard + standalone view components (Cart, Checkout, Compare, Login, Register, Wishlist, OurStore, StoreLocations, Timelines, PaymentConfirmation/Failure)
- `blogs/` — BlogGrid/List/LeftRightbar/LeftSidebar/Details/RelatedBlogs/Sidebar

## WHERE TO LOOK

| Need | Find |
|------|------|
| Product display card | `shopCards/ProductCard*.jsx` |
| Product detail layout | `shopDetails/Details*.jsx` + `sliders/Slider*.jsx` |
| Header / nav | `headers/Header*.jsx`, `headers/Nav.jsx` |
| Global overlay | `modals/*.jsx` (mounted in App.jsx) |
| Page hero sections | `homes/home-1/*`, `othersPages/about|contact|faq/*` |

## CONVENTIONS

- Each variant family shares a similar prop structure — check the base variant (Header1, ProductCard, Details2) before editing a numbered variant
- Most components import demo data directly from `@/data/*`; behavior changes belong in `context/` or the page, not new variants
- `MetaComponent` sets page `<title>`/description — every standalone page passes `meta`

## ANTI-PATTERNS

- **Do NOT create NewVariant files blindly** — first grep the family for an existing variant that matches; sample pages before adding
- **Do NOT bulk-delete "unused" variants** — build tree-shaking removes them; pages import a scattered subset (e.g. `page.jsx` may import deep files). Deleting breaks builds
- Avoid editing one variant without checking siblings — fixes that should apply to a family (e.g. "Buy now" text, image swaps) historically went wrong via one-off regex scripts (see root `fix_*.cjs` — do not rerun)
- Do not add new global modals to pages — register them in `App.jsx` with the other 15