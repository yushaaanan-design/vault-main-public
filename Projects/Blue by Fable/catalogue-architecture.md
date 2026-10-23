---
up: "[[Blue by Fable]]"
---
# Catalogue architecture (draft, 2026-10-01, awaiting the user's OK)

Goal: a huge shoe catalogue living in the same site as Fable clothing. Designed before any UI.

## What Fable already has (`server/src/lib/store.ts`)
- `Category` (flat, one level) -> `Product` (one colourway; `family` groups colourways of one silhouette) -> `Variant` (colour + size + stock).
- `sizes: string[]` and `Variant.size: string`, so a shoe size like "42" already fits. Per-product `SizeChart` (in/cm) exists.
- Status (`active / coming_soon / sold_out / archived`), images with role + colour, orders snapshot name/colour/size/price per line.
- Whole DB is one JSON file in memory (ponytail comment says swap for Prisma + Neon).

## What shoes need that Fable does not have
| Gap | Why it matters at "huge" scale | Proposal |
|---|---|---|
| One category level | Shoes need Sneakers > Running, Boots > Chelsea etc. | `division` ("fable" / "blue") on Category, plus optional `parent` slug. Nav: Fable and Blue as two top-level worlds. |
| No brand | Big shoe catalogues filter by brand | `brand: string` on Product (Blue's own, or others if resold; **open question**). |
| No filters, no search, no pagination | Hundreds+ of products cannot ship as one list | Server-side `GET /products?division&category&brand&size&color&min&max&sort&page`. Client never loads the whole catalogue. |
| Fixed `Specs` (fabric, weight...) | Shoes have upper, lining, sole, closure, heel height | Division-specific spec fields; keep `Specs` for Fable, add `ShoeSpecs`. |
| Size chart in in/cm only | BD buyers think in EU/UK, brands differ | Size label stays a string (EU). Chart columns: EU, UK, foot length cm. **Open: which system is the primary one.** |
| JSON-in-memory store | Thousands of variants + concurrent orders + stock is a real race risk | **Pull the Prisma + Postgres (Neon) phase forward**, before the shoe catalogue is loaded. Only `store.ts` changes, per the existing design. |
| Image weight | Many photos per shoe | Existing compression + Hostinger plan; cap photos per colour. |

## Proposed model (additions only)
- `Category`: add `division`, `parent?`.
- `Product`: add `division`, `brand`, `gender` (men/women/unisex/kids, if needed), `type tags` for filters, `shoeSpecs`.
- `Variant`: unchanged (colour + size + stock). Orders unchanged, so shared customers/admin/orders keep working.
- Admin: division switcher; bulk import (CSV) because hand-entering a huge catalogue in a form will not work.

## Shared with Fable (confirmed by the user)
Same customers, same admin, same orders, same cart and checkout. A cart can hold clothes and shoes together. Only catalogue, nav and theme sections differ by `division`.

## Decisions needed before any code
1. Own-brand shoes only, or resold third-party brands too? (decides `brand` and sourcing)
2. Men only like Fable, or women/kids too?
3. Primary size system for Bangladesh: EU (most common in local shops) with UK shown alongside? Half sizes?
4. Price range (BDT) and a few example shoe types for launch.
5. OK to move to Postgres before building Blue?
