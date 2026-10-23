---
tags: [gym-tracker, decision]
date: 2026-09-21
---
# React Router added, and the UI remodelled

## Why the router
The user found the real bug: every screen shared one URL, so the browser's **Back button left the site** and nothing could be bookmarked or refreshed. [[architecture]] 5.5 said "add React Router the day it actually hurts". That day arrived.

Installed `react-router` 8.4.0 (the only new dependency; still no Tailwind, no TypeScript, no state library).

| URL | Screen |
|---|---|
| `/` | Home |
| `/history` | History |
| `/workouts/:id` | one saved workout |
| `/exercises` | library |
| `/exercises/:id` | one lift's history |
| `/active` | the workout being logged |
| anything else | Not found |

Terminology worth keeping straight: the **port** (5173) is the door on the machine and never changes; the **path** after it is what identifies the screen.

## Bug this introduced, and the rule learned
`/active` first rendered `<Navigate to="/" replace />` when there was no draft. Pressing **Finish** clears the draft and navigates in the same click, so that redirect fired first and stole the URL back to `/`. The saved workout never opened.

**Rule: never redirect during render based on state you are also clearing in the same action.** Replaced with a plain fallback screen ("No workout in progress"), which cannot race.

## Remodel
Same stack, better craft: layered dark surfaces, a 4px spacing scale, tabular-lining numbers so columns align, a sticky frosted toolbar with a progress bar while logging, hover and focus states, `prefers-reduced-motion` respected, and one media query so the sidebar becomes a top bar under 860px (desktop-first still stands, per [[Decision - Desktop first]]).

New: `components/Sparkline.jsx`, a hand-drawn SVG e1RM trend chart. **No chart library.** Its first version used `preserveAspectRatio="none"`, which squashed the drawing and turned every dot into an ellipse; fixed by giving the viewBox roughly the card's real shape so it scales uniformly.

## Backend, same day
`server/` built: Express 4 + Prisma 6.12 + PostgreSQL, schema per [[data-model]], routes per [[api-contract]], seed script, validation module, error handler. `client/src/api.js` written and ready but **not wired in yet** — the app still reads `mock.js`.
