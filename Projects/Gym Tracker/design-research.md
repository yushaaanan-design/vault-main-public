---
tags: [gym-tracker, design, research]
date: 2026-09-21
---
# Design research (what real gym apps do, and what we took)

Sources read 2026-09-21 (public web only; no Pinterest or Behance board access):
- Hevy: hevyapp.com and its "workout logger" page. Logging = pick exercises, add sets, tap the check; shows previous weights, automatic rest timers, RPE, plate calculators.
- Strong: strong.app. Tap-to-log with auto-filled previous weights; minimalist and fast.
- Fitbod, Vora and SensAI comparisons of Hevy, Strong, Fitbod, Jefit (2026): the field splits into fast loggers vs programming/coaching apps.
- Canvas Builder, "Best dark mode fitness dashboards 2026": dark charcoal plus one electric accent (neon green, amber, hot coral) is the 2026 default; dashboards are organised as Overview, Progress, Exercises, Records.
- Dashboard patterns: frequency, volume trends, consistency streaks, recent achievements, muscle heat maps.

## What the category always ships (the rut)
Near-black background, one neon accent, a row of identical KPI cards ("big number, small label"), a sparkline, rounded everything. The previous build of this app did exactly that and was rightly called out.

## Table stakes we copied
- Previous set as ghost numbers; confirm with one action (tick or Enter).
- Rest timer that starts when a set is ticked.
- Plate calculator (as a drawn barbell).
- Progress and Records screens.

## What we did differently (the direction, "The Plate Ladder")
Chosen by impeccable's direction roll (seed `a631d720`, assigned index 6). The colours are the plate colours (25 red, 20 blue, 15 yellow, 10 green), because that colour code is the sport's own language and it carries meaning. Numbers are lit seven-segment readouts (meet scoreboards, gym interval timers). The PR mark is three referee lights. The gym-wall "1 plate, 2 plate, 3 plate" milestone chart becomes the Today screen. Full contract: `.impeccable/surfaces/client-src.md` in the project.

## Not taken, and why
Coaching recommendations and AI plan generation (need data and a coaching model). **Muscle-group volume was reversed on 2026-09-21 and is now planned**: see [[feature-research]] and [[architecture]] section 11. bodyweight-relative strength standards (needs bodyweight; we do not track it, so any tier would be invented); a photo-led look (no photography assets, and this is a tool, not a landing page).

## Update 2026-09-21
Feature-level research (Hevy, Strong, Fitbod, Liftosaur, powerlifting apps, streak and heatmap designs, offline-first architecture) is in [[feature-research]]. Motion and layout references from motion.dev, madewithgsap and Awwwards are still to be captured (plan stage S2).
