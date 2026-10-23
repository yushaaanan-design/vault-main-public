---
tags: [gym-tracker, design, motion]
updated: 2026-09-21
status: spec written, nothing built
---
# Motion system (spec first, code later)

> [!important] For any Claude reading this
> Nothing here is built. `client/` has no animation library yet. The user wants a "top-end, most insane motion" site, but motion in a tool obeys rules or it becomes noise. **Write nothing in `client/` until the user picks a mockup and says "go".** Model: Sonnet 5. Build one mockup per turn to save the user's limit.

## Decisions (locked 2026-09-21, from the user's own answers)
| Decision | Choice |
|---|---|
| Motion tech | **`motion` library** (`import { motion } from 'motion/react'`, the independent successor to Framer Motion, about 35 KB). Not GSAP. |
| References | Claude screenshots public sites into `design-refs/` and writes up take/refuse per site. The user's own images in `design-refs/` win. |
| Mockups | **3 live HTML pages with real motion**; the user picks one or mixes ("build 2, but the charts from 3"). |
| Direction | Keep "The Plate Ladder" (see [[architecture]] section 10), add serious motion. |

## The rules
1. **Purpose.** Every animation answers "what changed?" or "did that work?". Decoration is deleted.
2. **Durations.** 120 ms micro (hover, tick), 240 ms transitions (screens, panels), 450 ms celebration (PR only). **Nothing over 600 ms, ever.**
3. **Easing.** One spring for anything physical (plates, counters), one ease-out (`cubic-bezier(0.2, 0.8, 0.2, 1)`, the existing token) for everything else.
4. **The logging path never waits.** Ticking a set commits instantly. The animation is feedback after the fact, never a gate.
5. **`prefers-reduced-motion`.** Every effect has a defined still state, and that state is tested.
6. **60 fps.** Transform and opacity only. Never animate width, height or layout. (The detector already caught one `width` animation, fixed with `scaleX`.)
7. **Colour rule still holds.** Hue means a plate weight only. Motion must not introduce new hues (this is why the green "rest over" and red "error" are known defects to fix).

## Signature moments
| Moment | What happens |
|---|---|
| Plates load | Add weight and each plate slides onto the bar from the sleeve, heaviest first, ~40 ms stagger, spring settle |
| Digits ignite | Seven-segment numbers change segment by segment, like a scoreboard |
| PR celebration | Three referee lights fire in sequence, the row flares, the number counts up to the new best |
| Screen transitions | Shared-element morph: a workout row expands into its detail page (`layoutId`) |
| Charts draw | Line strokes itself in; bars rise from the baseline, staggered |
| Ladder fills | Meters sweep to position on load; plate-club thresholds tick past |
| Rest timer | Ring depletes smoothly; last 10 s pulse; distinct state at zero |
| Lists | Rows stagger in ~30 ms apart; new rows animate in, removed rows collapse out |

## The three mockups (each = the Today screen, same fake data, `motion` from a CDN, reduced-motion toggle)
1. `mockups/1-restrained.html`: current look, motion added conservatively. Fast, calm, gym-usable.
2. `mockups/2-physical.html`: motion as weight. Springs everywhere, plates with mass, inertia on numbers. The barbell is the hero.
3. `mockups/3-broadcast.html`: meet-scoreboard reading. Big segment displays, hard state flips, referee-light language across the UI.

Serve at `localhost:5173/mockups/` by putting them in `client/public/mockups/`. Nothing else in `client/` changes until the user picks.

## Reference sites to capture (Step 1)
hevyapp.com · strong.app · whoop.com · fitbod.me · apple.com/apple-fitness-plus · linear.app · madewithgsap.com · awwwards.com/websites/animation · motion.dev/docs/react. Per site: link, screenshot path, 2 to 3 lines on what it does well, **one line on what we will not copy**. Do it in one small batch (the user rejected two long screenshot scripts before; keep it short and tell them what runs).

## Build gates (after the user picks)
| Gate | Work | Stop and show |
|---|---|---|
| 3 | `npm i motion`; primitives: spring tokens, stagger helper, shared-element setup, reduced-motion wrapper | one animated component |
| 4 | Today screen matches the chosen mockup | user clicks it |
| 5 | `git init` and first commit (so everything after is revertible) | nothing |
| 6 | Active Workout: plate loading, digit ignition, PR celebration, rest ring | user logs a set |
| 7 | Progress: chart draw-in, scroll reveals | user clicks it |
| 8 | History, Library, detail: shared-element transitions | user clicks through |
| 9 | Fix the two colour defects, tokenize `#5c5a52` and `#6f6d64`; rerun detector, finish-reviewer, tests, Playwright, screenshots | report |

**Every gate reports numbers, not claims:** `npm run lint` clean, `npm test` green (11/11 now), `npm run build` with bundle size **before and after** `motion`, Playwright suite (68 checks now) plus new motion checks (animations finish, reduced-motion still state, no layout shift, no console errors), screenshots at 1440/820/390, `impeccable detect` at 0 findings, a responsiveness check that ticking a set stays instant while animating.

## What the user must learn (also in [[Lesson 5 - Motion library]] section H)
`<motion.div>` (`initial`/`animate`/`exit`) · `AnimatePresence` · `layoutId` · spring config (`stiffness`, `damping`, `mass`) · `useScroll` + `useTransform` · `useReducedMotion` · `staggerChildren` · `useAnimate`. Theory that transfers anywhere: easing, duration scale, transform/opacity only, FLIP, orchestration, reduced motion, feedback vs decoration.

**Not learning:** GSAP, Lottie, Three.js, scroll-jacking libraries.

## Out of scope for this plan
Backend wiring (blocked on `server/.env`), mobile design, sound.
