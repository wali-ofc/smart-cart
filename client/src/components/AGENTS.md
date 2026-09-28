# COMPONENTS — UI Library

## OVERVIEW

76 files in 14 semantic folders. **Every file is reachable** — the import graph resolves 341 edges with 0 unresolved imports, 0 zero-importer files, and 0 case hazards.

> NAMING (2026-09-28): the numbered template variant names were retired. `Header1`→`SiteHeader`, `Header2`→`PageHeader`, `Topbar1`→`Topbar`, `Footer1`→`Footer`, `Productcard23`→`ProductListCard`, `ShopDefault`→`ProductListing`, `Faq1|2|3`→`FaqShopping|FaqPayment|FaqReturns`. Name components by **role**, not by variant number.
> **UI FREEZE:** the look & feel is FINAL — retained and newly written components must keep the current visual design (no restyle, no Tailwind/Lucide). A rename must never alter markup, `className`, or visible text.

> HISTORY: 119 zero-importer template variants (112 direct + 7 transitively orphaned) were removed 2026-09-14; `othersPages/Login.jsx` + `othersPages/Register.jsx` were removed 2026-09-28 (both proven zero-importer — the live auth modals are `modals/Login.jsx` / `modals/Register.jsx`). Prior counts quoted "80"/"87"/"196" files; those are stale.

## STRUCTURE

| Folder | # | Contents |
|--------|---|----------|
| `layout/` | 5 | `SiteHeader`, `PageHeader`, `Topbar`, `Nav`, `Footer` — global chrome |
| `modals/` | 13 | Global overlays mounted once in `App.jsx` (`QuickView`, `ShopCart`, `Login`, `Register`, `SearchModal`, `MobileMenu`, `ToolbarBottom`, ...) |
| `common/` | 13 | Shared utilities (`MetaComponent`, `Pagination`, `Countdown`, `ScrollTop`, `ScrollToTopBehaviour`, `ChatWidget`, `CustomSelect`, `Accordion`, `Features`, `Testimonials`, `CartLength`, `WishlistLength`, `ShopGram`) |
| `home/` | 6 | Home page sections (`Hero`, `Categories`, `Products`, `Brands`, `Lookbook`, `Marquee`) |
| `shop/` | 4 | Listing page sections (`ProductListing`, `ProductGrid`, `ProductFilter`, `SortControl`) |
| `productCards/` | 3 | `ProductCard`, `ProductCardWishlist`, `ProductListCard` (the list-layout card) |
| `product/` | 7 | Detail page parts (`ProductGallery`, `ProductDetailZoom`, `ProductDetailTabs`, `RelatedProducts`, `RecentProducts`, `ProductStickyBar`, `ProductQuantity`) |
| `account/` | 6 | Dashboard-sidebar pieces, `Account*` prefix (`AccountNav`, `AccountProfile`, `AccountOrders`, `AccountOrderDetails`, `AccountEditForm`, `AccountWishlist`) |
| `seller/` | 2 | `SellerNav`, `OrderStatusChart` |
| `engagement/` | 2 | Standalone `WishlistGrid`, `LikesGrid` |
| `cart/` | 2 | `CartView`, `CheckoutForm` |
| `payment/` | 2 | `PaymentConfirmationView`, `PaymentFailureView` |
| `content/` | 10 | Marketing + legal blocks (`AboutSection`, `AboutFeatures`, `AboutTestimonials`, `ContactForm`, `ContactMap`, `FaqShopping`, `FaqPayment`, `FaqReturns`, `OurStory`, `StoreLocator`) |
| `blog/` | 1 | `BlogGrid` |

## WHERE TO LOOK

| Need | Find |
|------|------|
| Product display card | `productCards/ProductCard.jsx`, `productCards/ProductListCard.jsx` |
| Product detail layout | `product/ProductDetailZoom.jsx` + `product/ProductGallery.jsx` + `product/ProductDetailTabs.jsx` |
| Header / nav | `layout/SiteHeader.jsx` / `layout/PageHeader.jsx`, `layout/Nav.jsx` |
| Global overlay | `modals/*.jsx` (mounted in App.jsx) |
| Page hero sections | `home/*`, `content/*` |

## CONVENTIONS

- **One PascalCase `.jsx` file per component, no `index.jsx` wrappers. The file name equals the component's export name** (e.g. `content/OurStory.jsx` exports `OurStory`). 74 files use `export default`; `productCards/ProductCard.jsx` and `productCards/ProductCardWishlist.jsx` use `export const` named exports (imported as `import { ProductCard } from ...`) — match the existing style when you touch them.
- Group by domain, not by template family. Name by **role**; do not reintroduce `1|2|3` suffixes.
- Cross-group name collisions are resolved by prefixing the domain (`Account*` vs standalone `engagement/WishlistGrid`), never by merging the two components.
- `MetaComponent` sets page `<title>`/description — every standalone page passes `meta`.
- Most components read demo data from `@/data/*`; behavior changes belong in `context/` or the page, not a new component.

## ANTI-PATTERNS

- **Do NOT bulk-delete "unused" components without proof** — a deletion requires an import-graph script (resolve every `from`/`import()`/`require` against the file set, flag zero-importer files, confirm 0 unresolved imports) plus a clean rebuild. A plain "unused file" grep is NOT sufficient (pages import a scattered subset).
- **Do NOT rename via blind word-boundary regex.** Doing so in 2026-09-28 rewrote the visible label `Quantity` → `ProductQuantity` inside two `className="quantity-title"` nodes, and renaming a wrapper to `Countdown` collided with the `react-countdown` import in the same file. After any rename, diff every changed line and assert **no JSX text node (`>text<`) and no `className`/`style=` changed**.
- **Single-quoted imports are a real hazard** in codemods — a replacement that only matches `"spec"` silently no-ops on `from 'spec'`. Always match both quote styles and re-verify the graph afterwards.
- Avoid editing one component without checking siblings — family-wide fixes historically went wrong via one-off scripts (see root `fix_*.cjs` — do not rerun).
- Do not add new global modals to pages — register them in `App.jsx` with the other 13.
- Route URLs are FROZEN and owned by `App.jsx`; renaming a component must never change a `<Route path=...>` or `<Link to=...>`.
