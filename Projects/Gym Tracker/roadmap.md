# Gym Tracker: Roadmap

Bigger picture across projects: [[Learning path]].

## Gym Tracker versions
- **v1**: log workouts (exercise, sets, reps, weight, RPE), history, e1RM, PR detection.
- **v2**: ~~charts (e1RM over time, weekly volume)~~ **shipped** (Progress screen), ~~rest timer~~ **shipped**, ~~plate calculator~~ **shipped** (plates drawn on the bar), bodyweight log, kg/lb, programs and templates (templates and logged workouts stay separate tables).
- **v3**: meet countdown and attempt planner, IPF GL / DOTS scoring (verify coefficients from the official source), OpenPowerlifting dataset import (check terms), weekly summary email, stall detection, LLM weekly review, offline PWA.

Risk: it can stay plain CRUD. Commit to dataset import, offline logging, and a scheduled weekly job so it teaches real infrastructure.

## Design track (separate from the versions above)
1. Plate Ladder redesign: **done** (2026-09-21).
2. Motion redesign with the `motion` library: **planned**. Written spec in [[motion-system]]; three mockups, the user picks one, then build gate by gate.
3. After the whole project is finished: a reusable front-end extraction skill (screenshots, animation timing, motion specs). See [[frontend-extraction-skill]].

## Update 2026-09-21: what the research changed
The version list above is superseded in detail by [[architecture]] section 11 (tiers 1 to 4) and [[feature-research]]. In short: v1 is now "personal app with real persistence", v2 adds the Consistency screen (weekly streak, yearly blob heatmap, monthly report, muscle volume, Year in Review), v3 adds powerlifting tools (RPE, DOTS/Wilks/IPF GL, attempt planner, percentage programs), and **multi-user with auth is a gate before anyone else uses it**.
