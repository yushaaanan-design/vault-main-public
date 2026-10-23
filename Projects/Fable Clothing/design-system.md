---
up: "[[Fable Clothing]]"
---
# Design system — First Edition

The visual world built on 2026-09-28. This replaces the earlier Archivo/Jost direction in [[design]], which is now history. The founders asked for all fonts and all photographs to change; both did.

## The idea
**Fable is a clothbound first edition.** A drop is an edition printed once. A piece is a numbered plate with a caption. The specs are the colophon that proves the garment. Scarcity is the delivery mechanism, never the pitch.

This refuses the dark-luxury template the old site was drifting toward: a full-bleed hero with centred type, a uniform boxed product grid, and badges everywhere.

## Colour (the founders' locked palette, unchanged)
| Role | Value | Where it is used |
|---|---|---|
| Bookcloth | `#000000` | The page. Carries a faint woven texture, so it is never flat black |
| Ink | `#EDE4D3` ivory | All body text |
| Foil | `#8A7355` gold, `#C9A876` bright | Stamped titles, hairline rules, the primary button |
| Leather | `#5C3A21` chestnut | The ribbon bookmark that marks the active choice, and the announcement bar |
| Paper | `#EDE4D3` on dark ink | Inserted slips only: the size guide and the order receipt. The one place the site turns light |

Depth comes from **overlap, never shadow**. Rules are one pixel of gold. Corners are square, except the badge pills.

## Type
- **Libre Caslon Display** at weight 400 for every title. Never bold, never faux-bold.
- **Alegreya Sans** for reading and interface text; **Alegreya Sans SC** (true small caps) for folios, captions, labels and buttons.
- Display sizes are fluid and capped at 6rem. Body measure stays near 65 characters.
- Prices and quantities use tabular figures so columns line up.

## The book, used as structure
Folios and plate numbers in roman (`Pl. IV`). Captions under photographs. Dotted leaders in the menu and the drop contents. A colophon block for specs. A running head at the top of a page. **Commerce words stay plain**: "Shop", "Add to cart", "Size guide", "Checkout". The metaphor never gets in the way of buying.

## The ribbon
A chestnut bookmark travels to the active choice: the current nav item, the selected size and colour, the chosen payment method, the current admin section. It is the one piece of motion that appears everywhere, and it is how the site says "you are here".

## Motion
One clock for the whole site. Smooth scrolling on pointer devices; native scrolling on touch. Content is visible without JavaScript; motion only upgrades it.
- Reveals rise 28px with an 80ms stagger.
- Photographs uncover top to bottom, like lifting tissue off a plate.
- Stamped titles settle from loose tracking with one brightening pass (the "foil strike").
- Page changes are view transitions; a product card morphs into the product page image.
- One orchestrated scroll scene per page at most. On the home page it is the book spread parting as you scroll.
- Everything respects reduced motion, verified.

## Page notes
- **Home**: a book spread. Left page is the title page (tagline, subtitle, edition line, the two actions); right page is the frontispiece photograph. Then: the current drop, what you are paying for (fabric, fit, construction, with proof), the Signature with its colophon, the lookbook strip, the scarcity explanation **once**, the next drop with a sign-up, and the reassurance rows.
- **Shop**: "All pieces" with a count line, category keys, the Signature spanning two columns, one editorial break, coming-soon pieces in their own section, and a compact "Why Fable".
- **Category**: with one product it becomes an editorial landing in the seven-part order the founders sent: hero, evidence, problem, features with benefits, how it works, FAQs, then the purchase module.
- **Product**: captioned plates on the left, sticky purchase panel on the right, then the colophon, the story blocks, and a delivery and exchanges accordion.
- **Checkout**: its own minimal chrome, no shop navigation, payment as real selection cards, "Subtotal" then "Total", reassurance under the button.
- **Order received**: "Order received", not "confirmed", because a person confirms by phone. The receipt is an ivory slip. The timeline says what happens next.
- **Admin**: the same world used as a publisher's ledger. Dense, scannable, colour never the only signal, one gold action per screen.

## Rules kept from the founders' critique
Never a small label above a heading. No gradient text, no glass, no coloured left borders, no emoji icons, no decorative section numbers, no identical icon-card grids. No em dashes in visible copy. Never the phrase "old money". Never "Quiet luxury, worn loud". Never invent reviews, ratings, customer quotes or "trusted by" claims: there are none yet, and the site says so honestly.
