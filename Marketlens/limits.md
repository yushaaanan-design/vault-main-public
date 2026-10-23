---
up: "[[Marketlens]]"
tags: [marketlens]
---
# Limits (so nothing surprises you)
- CLIP finds look-alikes, not the exact model ([[server-engine]]). Earlier test: 50% of top-5 matches shared the shoe type (chance is about 11%).
- Prices are asking prices from 5 sites, shown in an assumed currency ৳ ([[server-catalog]]).
- Fewer than about 10 comparables means a weak range; the screen says so ([[client-screens]]).
- Text search is less precise than photo search ([[data-flow]]).
Ideas to improve: [[todo]].

## Found by testing on a real photo (2026-10-02)
- A Chelsea boot photo (props, plant, logo) first returned mostly loafers: boots are only about 45 of 1,394 products, and CLIP compares overall look, not shoe type.
- Fix tried 1: guess the kind from the photo (CLIP sentences, then a classifier trained on our photos: 83% on unseen products). On the real photo both guessed "sandal" and flipped when the photo was cropped or mirrored, so a wrong guess made results worse. **Dropped.**
- Fix kept: the user picks the kind (Boots, Loafers and slip-ons, ...) next to the photo; matching then only looks at that family. Chelsea photo with Boots picked: 12 boots, market price about ৳4,235.
- The families come from keyword rules on the messy `type` text ([[server-catalog]], `group_of`). 75 products fall in "other" and are only found with "Any kind". Sneakers are nearly absent (15).

## Photo-only now works (2026-10-02, later the same day)
Photo alone still gave loafers for the Chelsea photo, because the small model (ViT-B-32) cannot recognise it. Tested bigger models on that photo: ViT-B-16 also wrong; **ViT-L-14 says boot at 93 to 98% in every view** (full, mirrored, cropped). It is too slow to re-embed all 7,428 photos (about 1.8 s each, about 4 hours), so it only reads the one query photo (about 2 s) to decide the kind; the fast index still does the matching ([[server-engine]]).
- Measured on a sample of 193 database photos: 80% right overall. Chosen rule (87% of the time the right kind is kept): 90% sure or more = that one kind; 50 to 90% = its top two kinds; under 50% = no filter.
- Weak spots: low ankle boots look like dress shoes to the model (8 of 45 database boots read as formal); sneakers (only 15 in the data) are nearly never recognised.
- The chips above the photo still override the guess. Costs: server uses about 2 GB more memory and takes about 40 s to start.
