---
up: "[[design]]"
---
# Reference — Maneel Club (maneelclub.com)

Bangladeshi menswear brand — Fable's **closest direct competitor**: same product types (Henleys, ringer tees, drop-shoulder, polos, jeans), same Bangladesh market, similar price tier (BDT 400-1,600 range), founded Dec 2024 so also a young/new brand. This teardown is exhaustive — every nav item, category page, product page, cart, and policy page was individually crawled, not just the homepage.

## Full site link map (every href found)

**Top banner:** `/shop` — "Shop Now" (attached to the countdown-timer clearance sale banner)

**Nav menu:** `/` Home · `/shop` Shop · `/product-category/stock-clearance` Stock Clearance · `/product-category/jeans` Jeans · `/cart` (icon only)

**Category tiles (homepage):** `/product-category/drop-tee` Drop Shoulder · `/product-category/jeans` Jeans · `/product-category/polo` Polo · `/product-category/regular-t-shirts` Regular T-Shirts

**Product pages linked from homepage:** `/product/henley-long-sleeve` · `/product/ringer-t-shirt-contrast` · `/product/henley-t-shirt-chinese-collar` · `/product/tnf-drop-shoulder-premium` · `/product/muscle-tees` · `/product/old-money-half-sleeve-t-shirt`

**Footer:** `/shop` All Products · `/about` About Us · `/product-category/winter-collection` Winter Collection · `/product-category/hoodie` Hoodie · `/contact` Contact Us · `/reviews` Reviews · `/shipping` Shipping Info · `/returns` Returns & Exchange · `/faq` FAQ · `/privacy` Privacy Policy · `/terms` Terms of Service · `tel:+8801997193518` · Google Maps address link · Facebook, Instagram, WhatsApp (`wa.me` with a pre-filled message) · `https://arrowbin.com` (site builder credit)

**Note on nav structure:** despite Home/Shop/Stock Clearance/Jeans reading like a flat 4-item nav, "Stock Clearance" and "Jeans" are actually just two of the site's category pages promoted into the top nav — the real category list (visible via the `/shop` sidebar filter) is: Drop Shoulder, Jeans, Polo, Regular T-Shirts, Stock Clearance, Winter Collection, Hoodie. So the nav is "flat" but selectively surfaces only 2 of 7 categories at the top level — worth noting as a pattern (promote your best-selling/urgent categories into the nav, leave the rest to filters/footer).

## `/shop` — main collection page
- Left sidebar filter panel + product grid (breadcrumb shown as "Home > Shop", or deeper when filtered, e.g. "Home > Shop > Stock Clearance > Jeans").
- Filter categories (checkboxes): Drop Shoulder, Jeans, Polo, Regular T-Shirts, Stock Clearance, Winter Collection.
- Color filter present but options not enumerated in the fetch (likely populated dynamically per available stock).
- Size filter: S, M, L, XL, XXL.
- Price range: slider, BDT 0–5,000, with an explicit "Apply Filters" button (not live-filtering).
- 18 products total on this page. **No sort dropdown, no pagination** — everything loads on one page/view. At Fable's launch scale (2 products) this exact pattern (no sort, no pagination, single page) is directly copyable and appropriate.

## `/product-category/jeans` — category page
- Breadcrumb: Home / Shop / Jeans.
- Only **1 product** in this category ("American Eagle Jeans" — reseller/branded item, not a Maneel-branded product, suggesting they supplement their own line with resold branded jeans).
- No filters/sort needed or shown at this low a count — same "keep it minimal until there's enough to filter" pattern.

## `/product-category/stock-clearance` — category page
- Same countdown-timer banner as homepage ("STOCK CLEARANCE SALE IS LIVE!", live countdown).
- No filter/sort — just the main nav.
- 7 products, discounts ranging -35% to -58%: Old Money Half Sleeve T-shirt, TNF Drop Shoulder Premium, Butter Smooth Solid Drop Shoulder, Interlock Stripes Drop Shoulder, Old Money Polo, Waffle Drop Shoulder, Men's Ribbed Tank Top.
- Notable: "clearance" here doesn't mean discontinued odd designs — it's the same product line at deeper discounts, i.e. the clearance section functions as a permanent urgency/discount showcase, not genuine dead stock. Relevant to Fable's own manufactured-scarcity strategy — a "Stock Clearance" collection could be a legitimate additional way to use fake urgency beyond per-product "sold out" flags.

## Product detail page — apparel (Henley Long Sleeve, representative of all T-shirt/polo/henley/drop-shoulder types)
- Breadcrumb: Home > Regular T-Shirts > Henley Long Sleeve.
- Gallery: 7 thumbnails, large main image, click-to-swap.
- Title + price: "Henley Long Sleeve", BDT 590 sale / BDT 950 original, -38%.
- Color swatch: single color shown with a checkmark (Black) — swatch UI present even for single-color products, implying the component always renders regardless of variant count.
- Size: M/L/XL/XXL as a "Select size" dropdown (not inline buttons like the homepage card teaser suggested — dropdown, not tap-buttons, on this SKU).
- Size guide table: chest + length in inches per size (M 38"/27", L 40"/28", XL 42"/29", XXL 44"/30").
- Quantity: numeric input, default 1.
- Buttons: **Add to Cart** and **Buy Now**, both present, side by side.
- Trust signal directly below buttons: "Trusted by 30,000+ customers, cash on delivery across Bangladesh" (linked to reviews).
- Tabs: Description / Size Chart / Reviews / Shipping & Delivery.
- Related products: 4 items, same card treatment as grid (image, discount %, price, Add to Cart).

## Product detail page — jeans (American Eagle Jeans, the one non-apparel-cut product type)
- Breadcrumb: Home > Jeans > American Eagle Jeans.
- Gallery: 11 thumbnails (more than the henley's 7 — likely because denim needs more detail shots: stitching, zipper, fabric close-up).
- Title + price: BDT 850 sale / BDT 1,550 original, -45%.
- Color: "Deep Blue," pre-selected (again, single-option swatch UI still shown).
- Size: **waist sizes as a dropdown (30/32/34/36/38)** — structurally different from the apparel S/M/L/XL/XXL dropdown. Confirms the size selector is a generic dropdown component whose *options* change per product type (letter sizes for tops, waist numbers for jeans) — same component, different value set. Directly relevant for Fable's Prisma `Variant` model: size should be a free-text/enum field per product, not hardcoded to one size system.
- Size guide table for jeans is still labeled S–XXL (not waist numbers) — i.e. the size GUIDE table format didn't fully adapt to the waist-size selector, a minor inconsistency on their site worth avoiding in Fable's build (guide table units should match the selector's units).
- Quantity, Add to Cart + Buy Now, trust signal, tabs, related products — identical pattern to apparel PDP.
- Description highlights fabric composition explicitly ("98% cotton, 2% spandex lycra"), fit (slim, European styling), and a hardware detail (YKK zippers) — same "specific material/construction facts as trust-building" pattern seen on Illiyeen.

## Cart page
Could not be fetched with real contents via static WebFetch (cart state is client-side/session-based — a fresh, cart-less crawl only returns the homepage shell). Known from the earlier homepage-linked pass: line items show image, name, color/size, quantity stepper, price, remove icon; order summary shows subtotal, "shipping calculated at checkout," a free-shipping-threshold nudge ("Add BDT 2,080 more for free shipping!"), total, and a "Proceed to Checkout" button. Checkout page itself was not reachable read-only (requires cart contents to proceed) — not pursued further per instruction not to enter real personal/payment info.

## `/faq`
1. **How can I pay?** — COD, bKash, Nagad, Rocket (no SSLCommerz/card mentioned — narrower than Fable's planned bKash+Nagad+SSLCommerz+COD).
2. **How long does delivery take?** — Varies, faster in Dhaka than elsewhere.
3. **Can I exchange for a different size?** — Yes, per Return & Exchange Policy.
4. **Do you offer refunds?** — No cash refunds; exchanges only for defective items or sizing — matches Fable's own "exchanges allowed, no refunds" decision exactly.

## `/shipping`
- Delivers nationwide. Flat rates: **BDT 80 within Dhaka, BDT 130 outside Dhaka** — a concrete flat-rate shipping model Fable could adopt directly instead of inventing one (this answers Fable's own open "shipping cost model" todo item with a real market comparable).
- No stated delivery timeframe beyond "varies, faster in Dhaka."

## `/returns`
- Exchanges only, no cash refunds (matches Fable's stated policy).
- Damaged/defective: must reject at the door with the delivery person, who marks it rejected and arranges replacement — no post-delivery damage claims accepted.
- Size exchange: must contact within **24 hours** of receiving the order, via Facebook or an emergency phone line, get approval, then ship it back at the customer's own cost; if the desired size is unavailable, store credit is issued instead of a swap.

## `/reviews`
- Not a structured review system — no star ratings, no verified-purchase badges, no filter/sort/pagination. Just a grid of screenshotted Messenger/Instagram DMs with a customer photo and 1-2 sentence quote, framed by "Over 30,000+ customers have shopped with Maneel Club, most of them paying on delivery." This is a deliberately low-tech, high-authenticity trust mechanism — cheap to replicate (just needs real customer screenshots once orders start coming in) versus building an actual review/rating system.

## `/privacy`
Standard sections: Information We Collect (direct/automatic/in-store), How We Use It, How We Share It ("we do not sell your personal information"), Your Rights, Data Security, Children's Privacy, Policy Changes, Contact. Useful as a structural checklist for Fable's own privacy policy page (still open in `todo.md`).

## `/about`
- Headline: "Welcome to Maneel Club, where every thread tells a story."
- Founded December 2024 — explicitly positions itself as a reaction against "fast fashion that felt generic and lacked soul."
- Values: "quality over quantity," "source premium materials, prioritize ethical manufacturing," positions itself as "more than just a clothing brand; it's a community," targets "the dreamers, the doers, and those who aren't afraid to stand out."
- Tone: conversational, aspirational, personal ("our shared passion"), no founder bios/team photos — brand-voice-led, not personality-led.

## Visual design (captured via real browser — screenshots in `Projects/Web Design/design-references/screenshots/`)

**Screenshots (16 total):** `maneel-home-desktop.png`, `maneel-home-desktop2.png`, `maneel-home-mobile.png`, `maneel-product-desktop.png`, `maneel-cart-desktop.png`, `maneel-shop-listing-desktop.png`, `maneel-shop-listing-mobile.png`, `maneel-jeans-category-desktop.png`, `maneel-stock-clearance-desktop.png`, `maneel-jeans-product-desktop.png`, `maneel-henley-chinese-collar-desktop.png`, `maneel-cart-populated-desktop.png`, `maneel-about-desktop.png`, `maneel-reviews-desktop.png`, `maneel-faq-desktop.png`. (`maneel-hoodie-category-desktop.png` attempted — the footer's "Hoodie" link 404s, category doesn't actually exist despite being linked; a real bug on their site, not ours to fix but note it as "don't trust footer links = real inventory" if ever building a similar footer.)

**⚠️ Important finding, now confirmed three separate times, not one:** "Old money" isn't a one-off tagline — it appears (1) as the hero banner overlay text, (2) inside the Henley T Shirt (Chinese Collar) product's actual description copy ("Most trendy & old money outfit for 12 month long.."), and (3) as a literal **product name**: "Old money Half Sleeve T shirt" is a real SKU in their Stock Clearance category (BDT 350, screenshot `maneel-stock-clearance-desktop.png`). This is Maneel Club's core recurring brand phrase, not incidental copy — it is their positioning, used repeatedly and deliberately. Fable planning to use the same phrase is now a confirmed direct collision, not a coincidental style overlap.

**Also worth flagging:** Their Stock Clearance grid includes a "TNF Drop Shoulder (Premium)" item that is visibly a **The North Face-branded product** (screenshot shows "THE NORTH FACE / NEVER STOP EXPLORING" on the actual garment). Selling branded-logo apparel from a brand they almost certainly don't have licensing rights to is either a resale/counterfeit item or an unlicensed reference — not a pattern for Fable to copy, but relevant competitive-landscape context (this is what "the market" looks like here).

**Colors:**
- Top announcement/countdown banner: near-black maroon (`~#2B0A10`), white text, black pill-shaped countdown boxes
- Header/nav: white background, black text, a red/maroon diamond-heart logo mark (`~#C4283C`)
- Hero background: deep burgundy/oxblood (`~#6B1F2A`), bold oversized white serif-ish display type ("PREMIUM"), red-and-white striped shirt as the product photography focal point
- Discount badge (product card/page): bright crimson-red pill (`~#E62950`), white bold text ("-32% OFF")
- Primary CTA ("Start Shopping", "Add to Cart"): dark maroon matching the brand red, white text
- Cart/neutral pages: light grey (`#F7F7F7`ish) footer background, white content area — the maroon is reserved for urgency/brand moments, not used everywhere
- **Real measured values** (via `getComputedStyle`, not visual guessing): discount badge = `rgb(220, 38, 38)` / `#DC2626` background with white text (this is Tailwind's default `red-600` — confirms they're using an off-the-shelf Tailwind palette, not a custom brand red); price text color = `rgb(35, 2, 14)` / `#23020E`, a near-black with a maroon tint rather than pure black — a small detail that ties the price text back to the brand color even where it reads as "black" at a glance

**Typography:**
- Body font: system UI sans-serif stack (`ui-sans-serif, system-ui...`) — no custom webfont, unlike Illiyeen
- Headings: bold (weight 700), 30px — noticeably bolder/heavier than both Illiyeen (500) and Get The Juice (400), matching its louder overall tone
- Hero display type ("PREMIUM") is enormous, condensed, all-caps — the boldest typographic move of all three references by far

**Layout:**
- Persistent top urgency bar (countdown timer) sits above the actual header — always visible, never dismissed by default (has a close X but starts open)
- Hero is a single large asymmetric banner (not a grid like Illiyeen or Get The Juice) — one big story per slide
- Product page: standard 50/50 image-left/info-right, but denser than Illiyeen's — color swatches as literal filled circles (not swatch thumbnails), size as small square buttons, discount badge inline next to price rather than as a separate corner ribbon
- Floating WhatsApp chat bubble bottom-right, persistent across every page including cart
- **Mobile home** (`maneel-home-mobile.png`): bottom tab bar (Home / Shop / Cart / Search) — same app-like persistent-nav pattern as Illiyeen's mobile site, seemingly a shared convention among BD e-commerce sites, not a one-off choice
- **Populated cart** (`maneel-cart-populated-desktop.png`, added a real Henley to cart to see it): line item shows product photo, name, color+size as plain text ("Color: Black • Size: M"), quantity stepper, price; order summary shows subtotal, shipping "Calculated at checkout," a free-shipping nudge ("Add BDT 2,010 more for free shipping!"), total, and a black "Proceed to Checkout →" button — matches the text-based description from the earlier structural pass exactly, now visually confirmed
- **Jeans PDP** (`maneel-jeans-product-desktop.png`): confirms the waist-number size selector (30/32/34/36/38) visually, plus a lifestyle photo background (jeans on a hanger against a raw wall) — a moodier photo treatment than the plain studio backdrop used for the Henley/ringer tee product shots, i.e. **photo treatment does vary by product type** on their site
- **Reviews page** (`maneel-reviews-desktop.png`): literal screenshots of Messenger/WhatsApp conversations pasted as images — zero star-rating UI, zero verification badges, genuinely just customer chat screenshots in a grid. One review screenshot shows an alternate "Maneel Club" wordmark in a blackletter/gothic font style, different from the main site logo — inconsistent secondary branding, not something to replicate
- **About page** (`maneel-about-desktop.png`): plain single-column text, no imagery, no team photos — confirms the earlier note that this is brand-voice-led copy, not a designed page. Notable phrase: "for people who appreciate a middle class journey to try big & keep hard working even after failure" — positions itself as aspirational-but-accessible, in tension with the literal "old money" language used elsewhere (i.e. their own brand messaging isn't fully internally consistent between "middle class journey" and "old money" — worth avoiding that specific inconsistency in Fable's own copy)

## Takeaways for Fable
- **This is the single most directly transferable reference** — same products, same market, same scale of business (also a young brand). Its concrete numbers (BDT 80/130 flat shipping, 24-hour exchange window, COD+bKash+Nagad payment set) are usable as direct starting defaults for Fable's own open decisions in `todo.md` and `PRD.md`, not just style inspiration.
- **Size selector must be a flexible field, not hardcoded to S–XXL** — Maneel Club's own jeans page proves this (waist-number dropdown vs. letter-size dropdown, same component). Carry this into Fable's Prisma `Variant` schema.
- **"Stock Clearance" as a standing category (not real dead stock)** is a second, complementary manufactured-urgency mechanic beyond per-product sold-out/coming-soon flags — worth considering alongside Fable's existing scarcity plan.
- **Reviews-as-screenshots** (not a real review system) is a cheap, authentic trust pattern Fable can copy immediately once first real orders land — no review infrastructure needed for v1.
- Tone/visual gap to reconcile: Maneel Club's mechanics (urgency banners, loud discount badges, screenshot reviews) are directly reusable, but its visual language is louder/more discount-forward than Fable's stated "old money" positioning — pair these mechanics with Get The Juice's quieter visual tone (see [[design-references/getthejuice|getthejuice]]) rather than copying Maneel Club's red/maroon discount-badge aesthetic wholesale.
- **"Old money" is now a confirmed three-times-repeated core phrase for this competitor, not a one-off** — a real positioning decision is needed before `design.md`/`PRD.md` lock this language in for Fable too. Options: pick a genuinely different phrase, or lean into it deliberately knowing a direct competitor already owns that exact word combination in the same market.
- Their discount-badge red is literally Tailwind's default `red-600` — if Fable wants to look distinct at a glance even while using similar mechanics (badges, urgency banners), picking a non-default red/accent color is a cheap, easy differentiator.
- Don't copy the "unlicensed branded item" move (the North Face-branded stock-clearance item) — legal risk, not a pattern worth the short-term traffic it might bring.

## Home page section flow
(Re-scrape 2026-09-26, desktop 1440×900, page height ~4,580px desktop / ~5,670px mobile.)
1. Countdown urgency bar (maroon, "STOCK CLEARANCE SALE IS LIVE! Shop Now — OFFER ENDS IN 01D 06H 11M 51S", dismissible X)
2. Header — logo left, 4 centered text links (Home/Shop/Stock Clearance/Jeans), search/account/cart icons right
3. Hero carousel — single full-width banner slide (Embla carousel, dot pagination)
4. **Shop by Category** — 4 image tiles with centered white label overlay + "View all products →"
5. **Featured Products** — 4-col product cards, red `-38%` discount pill top-left, sale price + struck original + green "Save 360tk" pill
6. **New Arrivals** — same card grid on a faintly tinted full-width band
7. **Social proof** — "30,000+ customers have shopped with us" + subline ("26,000 orders delivered, cash on delivery in every district") + "See all reviews →", then TWO rows of WhatsApp/Messenger screenshot reviews auto-scrolling as a marquee
8. **Free-shipping CTA banner** — dark maroon rounded panel, "Free Shipping on Orders Over BDT 2,500", white "Shop Now" button
9. **Why Choose Maneel Club?** — 3 icon columns (Premium Quality / Affordable Prices / Fast Delivery)
10. Footer — 4 columns (brand+socials / Shop / Support / Contact), bottom bar with legal links
Persistent: floating green WhatsApp bubble bottom-right.

## Scroll behavior (re-scrape 2026-09-26)
Screenshots: `screenshots/maneel-scroll-{0,25,50,75,100}-desktop.png`, `maneel-scroll-{0,50,100}-mobile.png`.
- **Stack**: Tailwind (shadcn-style classes), not Shopify/WordPress/Next-detectable. No GSAP, no ScrollTrigger, no AOS, no `[data-scroll]`, no pin-spacers, zero `animate/reveal/fade` classes at any depth — **there is no scroll-triggered reveal animation on this site.** Sections are simply static and present on load.
- **What actually moves**: (1) the **review screenshot marquee** — two `.review-marquee-track` rows with pure CSS keyframes, `60s linear infinite` and `50s linear infinite reverse` (opposite directions, different speeds); (2) the hero **Embla carousel** (`translate3d` on `.flex.-ml-4` track); (3) the live countdown ticking in the top bar; (4) ~130 elements with CSS `transition` (hover states).
- **Sticky/fixed**: `HEADER.sticky top-0 bg-background/95 backdrop-blur` (frosted sticky header) and, on mobile only, `NAV.fixed bottom-0 md:hidden` — a floating rounded **bottom tab bar** (Home/Shop/Cart/Search) with shadow.
- **Mobile**: hamburger + centered logo + search/cart; category tiles go 2×2; same no-reveal behavior. The "alive" feeling comes entirely from the marquee, carousel, countdown and dense content — not from scroll animation.
