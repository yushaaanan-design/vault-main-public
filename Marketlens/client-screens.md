---
up: "[[Marketlens]]"
tags: [marketlens]
---
# The screens
- Login: name + access code ([[server-auth]]).
- Photo: drag and drop anywhere on the screen, paste with Ctrl+V, or click; an optional words box (name, type or code); upload, preview, a row of kind chips (Any kind, Boots, Loafers and slip-ons, ...) so a boot is only compared with boots, then "Find the price" ([[data-flow]]). Changing the chip after a result searches again.
- Text: search by name, description or product code; exact name matches first ([[server-engine]]).
- Browse: filters, sort, pages over the catalogue ([[server-catalog]]).
- History: saved lookups, delete ([[server-history]]).
- Product popup: photos, facts, "Find similar".
Shared piece: `Results.jsx` = price package + product cards. Parent: [[client-app]]. Calls go through [[client-api]].
