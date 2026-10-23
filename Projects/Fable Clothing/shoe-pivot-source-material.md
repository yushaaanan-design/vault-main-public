---
up: "[[Fable Clothing]]"
tags: [blue-by-fable, shoes, planning]
---
# Shoe pivot: planning + source material (2026-10-21)

Clothing is dropped. The site is rebuilt as a shoe catalogue, brand **Blue by Fable**. Decisions are also summarised in [[STATE]].

## Source material (owner's catalogue photos, Google Photos albums)
Private links from the owner. Not yet opened or identified. Photos are the supplier's catalogue; use them to identify each shoe, not as live-site images until the owner confirms rights.

| # | Link | Status |
|---|---|---|
| 1 | https://photos.app.goo.gl/i7rGqUw1YeGyH86z7 | not opened |
| 2 | https://photos.app.goo.gl/xPg2cSgLKdgDy2RD6 | not opened |
| 3 | https://photos.app.goo.gl/oPkf3QQprDWVj1qx9 | not opened |

More links may follow. Next step: open each album, list every shoe, identify type/colour/sole/closure, then group into categories for the owner to correct.

## Decisions
- Brand on site: Blue by Fable. Instagram may say "Shoes by Fable".
- Sizes: S / M / L with **placeholder ranges** until the owner's foot-length chart arrives.
- All genuine leather. Supplier-bought. Prices: high-end placeholders, owner sets real ones later.
- **No exchange window**: remove all exchange copy, promise no returns.
- Not everything is "coming soon": the owner chooses which products are live and which are coming soon. Every coming-soon product gets a price, a page and a **Notify me waitlist**; Add to cart disabled.
- Payments as before: COD, bKash, Nagad, SSLCommerz.
- Photos: placeholders, ideally a foot or lower leg wearing the shoe; web photos are stand-ins only, never for the live site. AI-generated photos possible later.
- Theme stays, small tweaks allowed.

## Build order (to confirm with an infographic before starting)
1. Identify shoes from the albums, owner corrects the list.
2. Rewrite seed catalogue + categories + API.md for shoes.
3. Rebuild navigation, home, category pages, product page (size chart, waitlist).
4. Strip exchange copy and clothing content.
5. Placeholder photos, compress, QA at 1440 and 390.

## Open
- Foot-length chart (owner, later).
- Real prices (owner, later).
- Which products are live vs coming soon (owner picks).

## 2026-10-21: albums downloaded and identified
- Albums are only visible when signed in; downloaded with Google Photos "Download all" (3 zips, ~900 MB, 183 HEIC + Live Photo MP4) to `C:\dev\blue-shoes\catalogue\` (outside OneDrive/git). Album names: 1 = Luxury 4U, 2 = Glossy Leather Goods BD, 3 = Iconic Leather.
- Converted to 1200 px JPEG (`make_sheets.py`, ffmpeg), contact sheets in `C:\dev\blue-shoes\sheets\`.
- **20 shoes identified**, review page `C:\dev\blue-shoes\shoe-list.html` (photos, names, categories, placeholder prices, build flow). Waiting for the owner's corrections.
- Proposed categories: Loafers (Penny smooth, Penny suede, Bit & Plaque), Monk Straps, Boots (Chelsea, Zip Ankle, Suede Chelsea), Weekend (sneaker-sole loafers).
- Placeholder prices from market.db (top 25%): loafers ৳7,500-8,500, boots ৳7,900-8,500, monk ৳8,990, weekend ৳6,900.
- **Flags for the owner:** CAT (Caterpillar) logos on soles/insoles of A6, A7, A8 (trademark risk); supplier names on insoles (LUXURY, ICONIC LEATHER, B&J LEATHER, possible MANGO on A9); confirm genuine leather on A2, A4, A5; near duplicates A3/C2 and B2/B3.
