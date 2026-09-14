# COMPONENTS — Variant Library

## OVERVIEW

80 files of UI components derived from a commercial template. Organized as families of numbered variants (Headers, ProductCards, Details, sliders, tabs, galleries). **All remaining files are actively imported by routes** — 119 zero-importer template variants (112 direct + 7 transitively orphaned) were removed in the 2026-09-14 cleanup (verified via import-graph analysis + build).

> TEMPLATE RESIDUE — cleanup of unused variants completed 2026-09-14 (112 files removed via verified zero-importer analysis). Remaining 87 files are all reachable; the directory now maps 1:1 to routes.
> **UI FREEZE:** the look & feel is FINAL — trimming removes unused/copy-paste variants, but retained and newly written components must keep the current visual design (no restyle, no Tailwind/Lucide).

## STRUCTURE

- `headers/` — 4 files (Header1, Header2, Topbar1, Nav)
- `shopCards/` — 3 files (ProductCard, ProductCardWishlist, Productcard23 — note the surviving inconsistent casing)
- `shopDetails/` — 7 files (ShopDetailsTab, DetailsOuterZoom, StickyItem, Quantity, Products, RecentProducts; `sliders/` holds only Slider1ZoomOuter)
- `shop/` — 4 shop layout/page-section components (ShopDefault, ShopFilter, Sorting, ProductGrid)
- `modals/` — 15 global overlays mounted once in `App.jsx` (QuickView, ShopCart, Login, Register, SearchModal, MobileMenu, Toolbar*, ...)
- `common/` — 13 shared utilities (MetaComponent, Pagination, Countdown, ScrollTop, ChatWidget, ...)
- `footers/` — 1 (Footer1)
- `homes/home-1/` — 6 home page sections (Hero, Categories, Products, Brands, Lookbook, Marquee)
- `othersPages/` — 25 section blocks + standalone view components (Cart, Checkout, Login, Register, Wishlist, OurStore, StoreLocations, PaymentConfirmation/Failure; `dashboard/` 7, `about/` 3, `contact/` 2, `faq/` 3)
- `blogs/` — 1 (BlogGrid)
- `dashboard/` — 1 (OrderStatusChart)

## WHERE TO LOOK

| Need | Find |
|------|------|
| Product display card | `shopCards/ProductCard*.jsx` |
| Product detail layout | `shopDetails/ShopDetailsTab.jsx` + `sliders/Slider1ZoomOuter.jsx` |
| Header / nav | `headers/Header1.jsx` / `Header2.jsx`, `headers/Nav.jsx` |
| Global overlay | `modals/*.jsx` (mounted in App.jsx) |
| Page hero sections | `homes/home-1/*`, `othersPages/about|contact|faq/*` |

## CONVENTIONS

- Each variant family shares a similar prop structure — check the base variant (Header1, ProductCard) before editing a numbered variant
- Most components import demo data directly from `@/data/*`; behavior changes belong in `context/` or the page, not new variants
- `MetaComponent` sets page `<title>`/description — every standalone page passes `meta`

## ANTI-PATTERNS

- **Do NOT create NewVariant files blindly** — first grep the family for an existing variant that matches; sample pages before adding
- **Do NOT bulk-delete "unused" variants without proof** — the 2026-09-14 cleanup removed 112 files only after an import-graph script (resolve every `from`/`import()`/`require` against the file set, flag zero-importer files, confirm 0 unresolved imports) plus a clean rebuild. Any future deletion must repeat that verification — a plain "unused file" grep is NOT sufficient (pages import a scattered subset, e.g. `page.jsx` may import deep files)
- Avoid editing one variant without checking siblings — fixes that should apply to a family (e.g. "Buy now" text, image swaps) historically went wrong via one-off regex scripts (see root `fix_*.cjs` — do not rerun)
- Do not add new global modals to pages — register them in `App.jsx` with the other 15