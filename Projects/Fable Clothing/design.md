---
up: "[[Fable Clothing]]"
---
# Design — Fable Clothing

## Positioning (resolved)
Maneel Club (closest competitor) uses the literal phrase "old money" three times on their live site (hero banner, product description, and as a SKU name — see [[design-references/maneel-club|maneel-club]]). Decision: **Fable keeps the quiet-luxury/aspirational feel but drops the exact phrase "old money"** anywhere on-site, so it doesn't read as copying Maneel Club's signature line.

## Color palette (locked, user-provided)
| Name | Hex | Role |
|---|---|---|
| Black | `#000000` | Base/background (dark default) |
| Ivory | `#EDE4D3` | Body text on dark, background in light mode |
| Gold | `#8A7355` (muted gold) | Primary accent — CTAs, highlights |
| Chestnut brown | `#5C3A21` | Signature/secondary accent — borders, secondary buttons |
| White | `#FFFFFF` | Light-mode base |

Theme: **shiftable (light/dark toggle), defaults to dark** — black ground, gold accents, ivory text. This is moodier/more dramatic than Get The Juice or Illiyeen's light bases, closer to Maneel Club's dark hero energy but with brown/gold instead of their maroon/red.

## Typography (locked — Direction B)
**Gold-accented modern sans, no serif at all.** Chosen over an elegant-serif direction and an ornate-display-accent direction (see comparison artifact: https://claude.ai/artifact/EiuKP1ypwA7UaHe17W677V).
- Display/headline: **Archivo**, bold (700), wide letter-spacing, gold gradient text (`#C9A876` → `#8A7355`) for hero moments
- Body/UI: **Archivo**, regular/medium weights
- Small labels/eyebrows: **Jost**, uppercase, wide letter-spacing
- No serif, no script — full commitment to modern sans per the chosen direction

## Scarcity/urgency badges (locked)
**Loud pill badge, Maneel Club-style** — bold, front-and-center on the product card, not a quiet corner tag. Matches Fable's manufactured-demand strategy (fake "coming soon"/"sold out" — see [[PRD]]): the badge needs to be impossible to miss, not understated.

## Marketing energy (locked)
The khan.com-style AI comedy-video energy for ads **stays on Instagram/Facebook only** — the site itself stays quiet/premium per this palette and typography. Do not bring that tone on-site.

## Reference-informed patterns to reuse (from [[design-references/illiyeen|illiyeen]], [[design-references/getthejuice|getthejuice]], [[design-references/maneel-club|maneel-club]])
- Inline expandable size guide + fabric composition/care block on the product page (Illiyeen pattern) — trust-building for a new brand.
- Add to Cart **and** Buy Now as separate buttons (Maneel Club pattern) — supports both a considered browse-then-buy flow and an impulse buy.
- CTA gracefully degrades to a disabled/alternate state when a variant is unavailable (Illiyeen's "Find in store" fallback) — adapt for Fable's fake-sold-out flow instead of hiding the product.
- Trust line directly under the primary CTA (Maneel Club: "Trusted by X customers, cash on delivery across Bangladesh") — cheap, effective, add once real order numbers exist.
- Real payment icons (SSLCommerz + bKash + Nagad + card) shown in the cart/checkout footer (Get The Juice pattern) — confirms this exact mix to shoppers before they commit.

## Navigation (changed 2026-09-26)
~~Minimal flat nav at launch (Home / Shop / Coming Soon).~~ **Reversed by the user on 2026-09-26: "don't be minimal."** Now a 7-link category nav: Home / Shop All / Henleys / Tees / Hoodies / Pants / Coming Soon, plus Account + Cart. Categories are `/shop?category=...` on the one Shop component. Mobile (<900px): "Menu" button + slide-in panel (chosen over a bottom tab bar or horizontal-scroll nav). 900-1200px: nav scrolls sideways on one line. On Home the header is transparent over the hero, frosted once scrolled (from the competitor re-scrape).

## Motion rules (set 2026-09-26)
- **One GSAP moment on the whole site:** the Scarcity Strip on Home (CSS `position: sticky` pins the cards; GSAP ScrollTrigger only scrubs the outgoing card's scale/opacity). GSAP is imported in that one file only. Re-scrape found none of the three competitors use GSAP at all.
- **One marquee per page:** the Trust Strip.
- Everything else: IntersectionObserver slide-up reveals with a ~90ms stagger (`useScrollReveal` hook + `.reveal` class). No scroll listeners.
- `prefers-reduced-motion` respected everywhere (reveals show instantly, marquee stops, GSAP skipped).
- No em-dashes in visible copy (taste-skill rule).

## Contrast fix (2026-09-26)
Primary (gold) button text is now pure black. The old `#12100b` on gold `#8A7355` was ~4.2:1, below WCAG AA 4.5:1; black is ~4.7:1. Same fix on the "Coming soon" pill badge.

## Home page (locked)
Bold hero banner (Maneel Club style) — large brand/product photography with overlaid text (tagline, CTA), not a quiet product-first grid. Matches the dark/gold dramatic theme already locked above.

## Checkout (locked)
Fields: name, phone, address, email (standard) + order notes (free-text delivery instructions) + trust badges/policy links (exchange policy, payment security, COD-available badge) at checkout to reduce drop-off. Discount code field also included (feature already approved in [[features]]).

## Order confirmation (locked)
Three channels, all required: on-screen confirmation page (order number, summary, next steps), email confirmation, **and** WhatsApp/SMS confirmation. Note: WhatsApp/SMS needs a messaging API — more setup than email alone, tracked in [[todo]].

## Product detail page (locked)
Keep minimal at launch — image, name, price, size/color, size guide (already locked above). No fabric/care block, no fit description, no on-page delivery estimate yet — add later if needed, don't build it now.

## Competitor avoid-list
None specified — no site to explicitly avoid resembling.

## Still open
- Logo file + final "signature" chestnut-brown usage rules (needs the actual logo dropped in)
