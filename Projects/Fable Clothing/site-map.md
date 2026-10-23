---
up: "[[Fable Clothing]]"
---
# Site Map — Fable Clothing (button-by-button)

Companion to [[site-map.canvas]] (same structure, visual). This is the step-by-step table version — every button/element and exactly where it leads.

## Header (present on every customer-facing page)
| Element | Leads to |
|---|---|
| Logo | Home |
| Nav: Home | Home |
| Nav: Shop All | Shop (listing, all non-coming-soon) |
| Nav: Henleys | `/shop?category=Henleys` |
| Nav: Tees | `/shop?category=T-Shirts` |
| Nav: Hoodies | `/shop?category=Hoodies` |
| Nav: Pants | `/shop?category=Pants` |
| Nav: Coming Soon | Coming Soon (listing) |
| Search icon | *Not built in v1, deferred* |
| Account | Login/Signup (if guest) **or** Account/Order History (if logged in) |
| Cart | Opens the Cart Panel (slide-over overlay, not a page) |

Header behavior (built 2026-09-26): nav stays on one line; 900-1200px it scrolls sideways instead of wrapping. Below 900px the links hide behind a **"Menu" button** that opens a slide-in panel (closes on Escape, overlay click, or navigating). On Home only, the header is transparent over the hero and turns frosted once you scroll.

## Home (scroll order, see [[homepage-sections.canvas]])
| Element | Leads to |
|---|---|
| Hero CTA: "Shop the Drop" | Shop (listing) |
| Hero CTA: "Coming Soon" | Coming Soon (listing) |
| The Edit: product card | Product Detail |
| The Edit: "Shop all" | Shop (listing) |
| Category tile (Henleys/Tees/Hoodies/Pants) | `/shop?category=...` |
| Scarcity Strip: "View the piece" | Product Detail (coming soon / sold out) |
| Instagram CTA: "DM on Instagram" | Instagram (external, placeholder URL) |

## Footer (every customer page)
| Element | Leads to |
|---|---|
| Shop All / Henleys / Tees / Coming Soon | Same routes as the nav |

## Shop (listing, one component; `?category=` filters it)
| Element | Leads to |
|---|---|
| Product card (in stock) | Product Detail |
| Product card (coming-soon/sold-out badge) | Product Detail (still viewable, purchase blocked there) |

## Coming Soon (listing)
| Element | Leads to |
|---|---|
| Teaser product card | Product Detail, **view-only** — no Add to Cart / Buy Now shown |

## Product Detail
| Element | Leads to |
|---|---|
| Color swatch | Stays on page, updates gallery |
| Size selector | Stays on page |
| "Add to Cart" | Opens Cart Panel overlay, stays on the same page underneath |
| "Buy Now" | Checkout — **skips the cart entirely** |

## Cart Panel (slide-over overlay — not a full page)
| Element | Leads to |
|---|---|
| Qty +/-, remove item | Stays in panel, updates total |
| Discount code field | Stays in panel, updates total |
| "Proceed to Checkout" | Checkout |
| "Continue Shopping" | Closes the panel, stays on current page |

## Checkout
| Element | Leads to |
|---|---|
| Name/phone/address/email/order notes | Form fields, no navigation |
| Payment method: bKash/Nagad/SSLCommerz/COD | Choice made here, drives what "Place Order" does next |
| "Place Order" (COD selected) | Straight to Order Confirmation |
| "Place Order" (bKash/Nagad/SSLCommerz selected) | Redirects to that provider's **external payment gateway** |

## Payment gateway (external, off-site)
| Result | Leads to |
|---|---|
| Payment success | Redirects back to Order Confirmation |
| Payment failure | Redirects back to Checkout, so the customer can retry |

## Order Confirmation
| Element | Leads to |
|---|---|
| (automatic) | Triggers an email confirmation |
| (automatic) | Triggers a WhatsApp/SMS confirmation |
| "Continue Shopping" | Home |

## Login / Signup (Clerk-hosted, optional)
| Element | Leads to |
|---|---|
| Successful login/signup | Account / Order History |

*(Guest checkout bypasses this whole page — a guest never has to touch login.)*

## Account / Order History
Past orders + tracking status. No further drill-down at launch (kept minimal).

---

## Admin panel (completely separate login/auth from the above)

| Element | Leads to |
|---|---|
| Admin Login (success) | Admin Dashboard |
| Dashboard tab: Products | Products list |
| Dashboard tab: Orders | Orders list |
| Dashboard tab: Discount Codes | Discount codes list |
| Dashboard tab: Low-Stock Alerts | Low-stock view |
| Products list → "Add New Product" | Product Form (name, price, variants, image upload for front + hover, coming-soon/sold-out toggle) |
| Product Form → "Save" | Back to Products list |
| Orders list → click a row | Order Detail (update payment/courier status) |
| Order Detail → "Save" | Back to Orders list |
