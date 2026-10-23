---
up: "[[design]]"
---
# Reference — Get The Juice (getthejuice.store)

Bangladeshi jewelry/leather-goods/apparel brand. Reference for: visual-first minimalist luxury tone, social proof, email capture, category/filter structure at scale. Platform: Shopify (standard collection/filter/sort behavior).

## Full navigation tree

**Header:** Man | Woman | Gifts | Log in | Wishlist | Contact us | Cart

**Man section:**
- New In
- Best Sellers
- Jewellery
  - Rings → Bands, Bold & Signet, Gemstone, Shop All
  - Bracelets
  - Pendants
  - Earrings
  - Chain & Necklaces
  - Brass
- Leather Goods → Bags, Wallets, Belts, Shop All
- Apparel

**Woman section:**
- Jewellery
  - Rings → Bands, Bold & Signet, Gemstone, Shop All
  - Bracelets
  - Pendants
  - Earrings
  - Anklets (woman-only subcategory, not present under Man)
  - Chain & Necklaces
  - Brass
- Leather
- Apparel

**Gifts section:**
- For Him
- For Her
- For Couples
- Personalised
- Necklace & Pendant Sets
- Shop All Gifts

**General (outside gendered sections):** Customs, Shop All, About Us

## Category/listing page pattern (consistent across Rings, Apparel, Leather Goods)

**Sidebar filters:**
- Availability: In stock (N products) / Out of stock (N products), shown as counts next to checkboxes
- Price range: slider + custom "From"/"To" number inputs, max value scales per category (e.g. rings max ৳23,050; apparel max ৳4,500; leather max ৳25,000)
- "Remove all" link to reset active filters

**Sort dropdown (identical across all categories):**
Featured (default) · Most relevant · Best selling · Alphabetically A-Z · Alphabetically Z-A · Price low-to-high · Price high-to-low · Date old-to-new · Date new-to-old

**Pagination:** traditional numbered pages (not infinite scroll), e.g. Rings = 171 products across 8 pages.

**Page title convention:** plain "Collection: [Name]", sometimes with a one-line descriptive subtitle (e.g. Apparel: "Premium apparel in Bangladesh, crafted with a refined fit and finish.").

### Product card — jewelry (Rings)
- Multiple images with hover-swap
- Product name (linked)
- Price (BDT)
- Size options shown as a row of selectable sizes directly on the card (US ring sizes 3–13)
- "Add" button (adds to cart without visiting detail page)
- "New" badge on recent items, "Sold out" badge overrides Add button when unavailable

### Product card — apparel
- Front + lifestyle photo
- "New In" badge (applied to most items — used loosely, not just genuinely new stock)
- Name, price
- **Size selector inline on the card**: XS S M L XL as tappable options, same "Add" quick-add pattern as rings
- Key structural point: apparel and jewelry share the exact same card template (image, name, price, inline variant selector, Add button) — variant type (size vs. ring-size) is the only thing that changes

### Product card — leather goods
- Image(s) with hover
- Name, price
- Color/size variant selectors where applicable (bags/wallets have fewer variants than apparel)
- Stock status badge
- Same Add-to-cart pattern

## About Us page
- Text-driven, brand-mission-first layout: "craftsmanship is at the core of everything we create."
- Positions materials explicitly (sterling silver, brass, gold, white gold for jewelry; "100% genuine cow leather with Kintaka lining finished to Japanese standards" for leather goods) — heavy emphasis on material provenance/quality as the trust mechanism.
- No founder/team bios — institutional brand voice, not personality-led.
- 15+ image lifestyle/product gallery.
- Contact block: physical showroom address (Tower 52, Banani 11, Dhaka), phone, email.

## Footer
- **Policies:** Shipping, Exchanges & Returns, Terms of Service, Privacy Policy
- **General:** Size Guide, Care Guide, Contact, About Us
- **Social:** Instagram, Facebook
- Footer bottom (from earlier homepage pass): showroom address, "© Get The Juice, 2026 — Always Grateful", "Free Shipping Over 5000৳", payment icons (Visa, Mastercard, Amex, bKash, Nagad)

## Homepage sections (from earlier pass, unchanged)
Hero carousel (image-only, no text overlay) → "You May Also Like" grid → New In → branded campaign block (GTJ Sun & Moon) → Bestsellers → Explore (For Him/For Her cards) → Apparel strip → Leather Goods strip → Category grid → New collection spotlight → Social proof (4.8/5, 1,290 reviews, testimonial carousel) → email capture banner (10% discount).

## Tone/voice cues
- Material-provenance-as-trust ("100% genuine cow leather," "Japanese standards," specific metal purities) rather than discount/urgency-driven trust (contrast with Maneel Club's "30,000+ customers" social-proof approach).
- "Timeless," "handcrafted," "Always Grateful" — warm but restrained, no hype language, no countdown timers, no aggressive discount badges anywhere in the nav/filter/card structure.
- Gendered navigation (Man/Woman) with near-identical subcategory structure, one asymmetry (Anklets only under Woman) — simple pattern if Fable ever splits by gender.

## Visual design (captured via real browser — screenshots in `Projects/Web Design/design-references/screenshots/`)

**Screenshots:** `getthejuice-home-desktop.png`, `getthejuice-home-mobile.png`, `getthejuice-apparel-listing-desktop.png`, `getthejuice-apparel-listing-mobile.png`, `getthejuice-apparel-product-desktop.png`, `getthejuice-apparel-product-mobile.png`, `getthejuice-ring-product-desktop.png`, `getthejuice-wallet-product-desktop.png`, `getthejuice-rings-listing-desktop.png`, `getthejuice-gifts-listing-desktop.png`, `getthejuice-about-desktop.png`, `getthejuice-cart-desktop.png`, `getthejuice-checkout-start-desktop.png`

**Colors:**
- Body background: pure white `#FFFFFF`
- Body text: near-black `rgba(0,0,0,0.75)` — softened black, not pure `#000`
- No brand accent color in the UI chrome itself (buttons, nav, filters are all black/white/grey) — **all color comes from product photography**, not from theme colors. Warm sun-drenched lifestyle photos (oranges, skin tones, red graphic accents on one hero image) carry the entire "vibe," while the UI stays neutral.
- "NEW IN" badge: light grey semi-transparent overlay, black text — quiet, not a shouty color like Maneel Club's discount badges

**Typography:**
- Font family: `Helvetica, Arial, sans-serif` — plain system sans, no custom webfont loaded for body/headings
- Logo wordmark uses a slim serif/display face with a small sparkle icon — the one place they spend a distinctive typographic choice, everything else is deliberately plain
- Heading weight is light (400), sizes modest (12.5px–24px seen) — no oversized hero typography at all, unlike Maneel Club's giant "PREMIUM" treatment

**Layout:**
- Hero is a 3-image full-bleed grid, photography-only, zero text overlay except the logo — the product/lifestyle photo IS the hero content
- A scrolling marquee ticker bar above the header (address, copyright, free-shipping line) repeats continuously
- Listing page: classic left-sidebar-filter + grid layout (Shopify default), generous whitespace, small unobtrusive "NEW IN" tags and a bookmark/wishlist icon per card — nothing fights for attention
- Overall visual restraint is the point: the quiet UI throws all the visual energy onto the product photography itself

**Product detail page (all categories — ring, apparel, leather wallet all share one PDP template):**
- Identical layout regardless of product type: image gallery left (grey `#F2F2F2`-ish backdrop, no arch-frame or prop styling — flat product-on-grey), info column right
- Price shown as a plain number with the currency symbol from the header only (no currency repeated per price) — e.g. just "1,800" not "1,800৳"
- Variant selectors differ per type but use the same button-grid component: ring sizes show as US size + BD size together per button (e.g. "US 5 / BD 10"), apparel shows plain S/M/L/XL, confirming (same as Maneel Club's finding) that size/variant should be a flexible field, not hardcoded
- **Both "Add to Cart" and "Buy It Now" buttons** — Add to Cart is a light-grey/outline style, Buy It Now is solid black — a clear visual hierarchy favoring the faster path, unlike Maneel Club where both buttons look equally weighted
- Trust icons row under the fold: "Defined by Craftsmanship," "Lifetime Service" (ring page) — small icon + one-line text, quieter than Maneel Club's bold "Trusted by 30,000+ customers" banner but the same underlying idea
- A "Make It Personal" custom-engraving text field appears on the ring PDP — a personalization touch not seen on the other two reference sites, likely jewelry-specific, not directly relevant to Fable's apparel
- A floating "Explore this product" AI-assistant chip appears bottom-center on every PDP (the site's 11 WebMCP tools/AI shopping assistant integration) — an emerging pattern (AI product Q&A) worth being aware of but not urgent for Fable's v1

**Cart & checkout:**
- Cart is a plain table layout (Product / Quantity / Total columns), no order-summary sidebar like Maneel Club — simpler, less persuasive (no free-shipping-threshold nudge shown here despite the footer advertising "Free Shipping Over 5000৳")
- **Payment logos shown directly in the cart footer confirm they use SSLCommerz** (visible "Payment Channels" block, SSLCommerz-verified badge, plus Visa/Mastercard/Amex/bKash/Nagad/Rocket icons) — a real market confirmation that Fable's planned SSLCommerz+bKash+Nagad combination is a proven, expected payment set for this exact market segment
- Checkout handoff goes to a separate `checkouts.shopify.com`-style subdomain (Shopify-hosted checkout) — not built into their own site, confirming they're on standard Shopify rather than custom checkout

**Mobile (390px):**
- Homepage: hero collapses to a single stacked image column, hamburger + centered logo + cart, "Get 10% off" email-capture chip and a WhatsApp bubble both overlap the bottom of the viewport by default — slightly cluttered on first load
- PDP: image gallery on top (edge-to-edge), then a **white rounded-top sheet** slides up over it holding title/price/variant/buttons — a bottom-sheet mobile pattern, distinct from just stacking the desktop layout vertically. Worth considering for Fable's mobile PDP given the mobile-first priority already set in the PRD

## Takeaways for Fable
- **Inline variant selector directly on the product card** (size for apparel, ring-size for jewelry) with an instant "Add" button is this site's single most reusable pattern — lets a customer buy without ever opening the product detail page. Worth considering for Fable's product grid once the cart-vs-buy-now decision is made.
- The filter/sort pattern (availability counts, price range, standard sort dropdown) is generic Shopify behavior — not something to copy specifically, but confirms it's the expected baseline UX for a BD e-commerce shopper.
- Material-provenance trust language is a good alternative/complement to Maneel Club's social-proof-heavy approach — Fable could use fabric/care specificity (like Illiyeen's composition breakdown) combined with this site's quieter tone rather than Maneel Club's loud discount badges, matching the "old money" positioning better.
- No countdown timers or discount-percentage badges anywhere on this site — confirms this is the "quiet luxury" reference point as opposed to Maneel Club's "urgency/discount" reference point. Fable's manufactured-scarcity strategy (fake sold-out/coming-soon) will need its own visual language since neither reference site does exactly that — Maneel Club does urgency via countdown+discount, Get The Juice does none of it.
- **SSLCommerz + bKash + Nagad + card payment icons visible directly in this site's cart** is real market validation that Fable's planned payment stack matches what BD shoppers already expect to see, not a guess.
- The mobile bottom-sheet PDP pattern (gallery on top, rounded white sheet with product info sliding over it) is a stronger mobile-first pattern than a simple stacked layout, worth adopting given Fable's mobile-first priority.
- Add to Cart (secondary/outline) vs. Buy It Now (primary/solid black) as visually distinct buttons is a small but clear UX signal worth copying — Maneel Club gives both buttons equal visual weight, which is weaker guidance for the customer.

## Scroll behavior (re-scrape 2026-09-26)
Screenshots: `screenshots/getthejuice-scroll-{0,25,50,75,100}-desktop.png`, `getthejuice-scroll-{0,50,100}-mobile.png`. Page height ~9,900–10,030px desktop, ~8,800px mobile.
- **Stack**: Shopify, custom theme built on **Dawn** ("Will Live Now Jahid working GTJ*Final FF"); Dawn custom elements present (`sticky-header`, `slideshow-component`, `slider-component`, `cart-drawer`, `predictive-search`). `window.Swiper` also loaded (1 instance). No GSAP/ScrollTrigger/AOS.
- **Reveal-on-scroll — YES, this is the only one of the three with it**: 68 `.scroll-trigger` elements / 63 `.animate--slide-in` — Dawn's native IntersectionObserver reveal. Elements carry `scroll-trigger--offscreen` (≈invisible) until they enter the viewport, then play a `slideIn` keyframe (slide up ~2rem + fade in, ease-out) with a per-item stagger via `--animation-order` (≈75ms steps). Applied to section titles, each grid item, and "View all" links — so product grids cascade in card by card. Also `fadeIn` keyframe and an `animate--ambient` slow rotation option.
- **Header**: transparent over the hero at the top (white logo/icons on the photo), then a solid white **sticky header** once scrolled (`shopify-section-header-sticky scrolled-past-header`). The **ticker bar is also sticky** above it: `.gtj-ticker__track` = CSS keyframe `gtj-marquee`, `120s linear infinite`, `translateX(0 → -50%)` over a duplicated track (seamless loop).
- **Refined section flow observed**: ticker → transparent header over 3-up peeking hero slideshow → New In grid → split campaign block (large image left, centered title/copy/SHOP button right — "GTJ Sun & Moon") → Bestsellers → For Him / For Her full-bleed duo with bottom-left labels → Apparel grid → category tiles (Apparel/Earrings/Leather Goods/Brass) → New Brass collection grid → testimonials (reviewer-name cards carousel) → footer (payment-channels image, subscribe-for-10% line input, policies/general/social columns) → **giant faded "GET THE JUICE" wordmark** cropped at the page bottom.
- **Persistent floating UI**: "Get 10% off" chip bottom-left, "Shop Best Sellers / Shop with AI" pill bottom-center, WhatsApp + chat bottom-right — cluttered, especially on mobile.
- **Mobile**: same reveals, hamburger + logo + cart, grids go 2-col.
