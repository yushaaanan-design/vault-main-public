---
tags: [gym-tracker, decision]
date: 2026-09-21
---
# Redesign: "The Plate Ladder"

**Trigger:** the user judged the first frontend generic ("you changed absolutely nothing") and asked for a complete redo using the design skills they installed, taking inspiration from real gym apps, with the condition that anything new they must learn goes in the learning log.

**Process (impeccable's own):** wrote `PRODUCT.md` (inferred, assumptions labelled, because the user said to proceed rather than be interviewed) -> researched real apps ([[design-research]]) -> ranked seven grounded visual worlds from powerlifting culture -> ran `impeccable concept-seed` (seed `a631d720`), which assigned world 6, the **gym-wall plate-club chart** -> weighed challengers -> recorded a direction contract in `.impeccable/surfaces/client-src.md` -> built -> detector -> finish review.

**Verdicts on the challengers the roll dealt**
- Seven-segment display family: competitive. Kept: lit numerals with ghost cells for the few instrument readouts (e1RM, volume, rest timer), instant changes.
- Ikeda data-sublime: declined. Kept: 1px hairline discipline and tabular figures.
- Streetwear, reference-setting page, Emigre bitmap, alphabet storm: declined.

**Why it fits the product:** it uses only data we have (no bodyweight needed, unlike strength standards), its colour code is the sport's own (competition plate colours), and Operate mode is respected: text stays in a normal face, motion conveys state.

**The category defaults it refuses** (impeccable's craft floor): icon-card grids, hero-metric KPI cards, eyebrow labels above headings, coloured left borders, blur/glass decoration, sparklines standing in for content, neon-on-black with one accent.

**Added features to earn the concept:** Progress screen (e1RM chart with plate-club lines, weekly volume, records), rest timer, elapsed clock, plate visualisation per set, next-up rotation, 8 weeks of generated mock history.

**Costs:** ~1,900 lines of new CSS/JS to read; four new React ideas (Router already logged, `useEffect`, custom hook, SVG drawing). All listed in [[Lesson 4 - Router, Plate Ladder redesign and backend]].

**Rejected on purpose:** any chart or animation library (the user wants to learn what a chart is), Tailwind, a comp-first image workflow (no image generator is installed).
