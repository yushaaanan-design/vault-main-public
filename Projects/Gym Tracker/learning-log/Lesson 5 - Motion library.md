# Lesson 5 - Motion library

> Order: [[Lesson 4 - Router, Plate Ladder redesign and backend]] <- this lesson -> [[Lesson 6 - New features to learn]]. Date: 2026-09-21. All lessons: [[INDEX]].

> [!important] Planned, nothing is installed yet
> Decision and rules: [[motion-system]]. The user chose the `motion` library (`motion/react`, about 35 KB, successor to Framer Motion). Every row below gets re-logged here with the file where you first meet it once the code exists. This is a plan, not a record. Numbers continue from [[Lesson 4 - Router, Plate Ladder redesign and backend]] section A.

| # | Concept | The one-sentence idea |
|---|---|---|
| 27 | **`npm i motion`** | The only new dependency. Import from `motion/react`. Report its bundle-size cost when added. |
| 28 | **`<motion.div>` with `initial`, `animate`, `exit`** | A normal element that animates from one described state to another. You describe states, not steps. |
| 29 | **`AnimatePresence`** | Lets an element animate OUT before React removes it, so removed rows can collapse. |
| 30 | **`layoutId` (shared-element transition)** | Two elements with the same `layoutId` on different screens morph into each other, like a row becoming a page. |
| 31 | **Spring config** (`stiffness`, `damping`, `mass`) | A spring has no duration; it simulates physics, so plates feel heavy and settle. |
| 32 | **`useScroll` + `useTransform`** | Turn scroll position into a value, then map it to an animation, for scroll-linked reveals. |
| 33 | **`useReducedMotion`** | Returns true when the OS asks for less motion, so you can swap in the still state. |
| 34 | **`staggerChildren` / `delayChildren`** | Children start one after another, ~30 to 40 ms apart, for plate loading and list entry. |
| 35 | **`useAnimate`** | Imperative sequences (do A, then B, then C) for the PR celebration. |
| 36 | **Easing** | A curve for how speed changes over time. Ease-out feels responsive; springs feel physical. |
| 37 | **Duration scale** | 120 ms micro, 240 ms transitions, 450 ms celebration, never above 600 ms. |
| 38 | **Transform and opacity only** | These run on the GPU; animating width, height or layout re-lays-out the page every frame. |
| 39 | **FLIP** | First, Last, Invert, Play: how layout animations fake movement with a transform. `layoutId` does it for you. |
| 40 | **Reduced motion as a requirement** | Every effect needs a tested still state. |
| 41 | **Feedback vs decoration** | Motion must answer "what changed?" or "did that work?". Otherwise delete it. Logging never waits on an animation. |

## What was actually built (2026-09-21)

> [!success] The plan became code
> `npm i motion` (version 13). Every concept below is used in the app now. Bundle cost, honestly: the whole client went from 302 KB to 478 KB of JavaScript (94 KB to 150 KB gzipped) in one pass. Roughly 40 percent of that is the new screens, about 55 KB is the switch to a data router (needed for view transitions), the rest is the motion library loaded through `LazyMotion`.

| Concept | Where you meet it |
|---|---|
| **Motion tokens** (27, 36, 37) | `client/src/lib/motion.js`: `EASE`, `DUR` (120/240/450 ms), one `SPRING`, `stagger(i)` capped at 10 rows. The only place animation numbers live. |
| **`m.div` + `initial/animate/transition`** (28) | `components/Rise.jsx` (list rows rise 8 px, staggered), `App.jsx` (page fade on every URL change). |
| **`LazyMotion` + `m`** | `main.jsx`. The full `motion` component ships the whole engine; `m` plus `domAnimation` loads only what we use. Try building both and compare. |
| **Reduced motion** (33, 40) | `MotionConfig reducedMotion="user"` in `main.jsx` plus a CSS rule that cancels keyframes. Tested with an emulated setting: all 105 heatmap blobs were at their final state at once. |
| **Spring** (31) | `PlateBar.jsx`: plates slide onto the bar heaviest first, 40 ms apart. `PRBadge.jsx`: a live PR pops (scale 0.7 to 1). |
| **Motion on a wrapper `<g>`** | On an SVG `rect`, motion `x` clashes with the rect own `x` attribute, so the animation goes on a `<g>` around it. |
| **Clip reveal instead of `pathLength`** | `LineChart.jsx`: lines are drawn in left to right with an animated `clipPath`. `pathLength` would overwrite the dashed and dotted styles that tell the three lifts apart. |
| **`transform` not `width`** (38) | Bars rise with `scaleY` (`BarChart.jsx`), ladder meters sweep with `scaleX` (`LiftLadder.jsx`). |
| **Hand-written tween on `requestAnimationFrame`** | `lib/useCountUp.js`: the streak counts up. Importing motion own `animate` for this would pull about 100 KB, so a 10-line tween is the cheaper tool. Know when a library is overkill. |
| **Stagger by column** (34) | `Heatmap.jsx`: blobs ripple in from the left, `delay = column * 8 ms`. |
| **Native View Transitions** (30, 39) | `WorkoutRow.jsx`, `ExerciseRow.jsx`, detail pages: `<Link viewTransition>` plus `useViewTransitionState` gives the row title a shared `view-transition-name: page-title` so it morphs into the detail heading. No library: the browser does the FLIP. Needs a data router: `main.jsx` now uses `createBrowserRouter` with one catch-all route. |
| **CSS-only states** | `.seg` opacity transition (digits change segment by segment), rest timer pulses in the last 10 s (`is-final`), fresh PR row flashes (`flare`). |

**Not built (on purpose):** `AnimatePresence` exit animations (rows collapsing on delete), `useScroll`, `useAnimate` sequences, `layoutId` shared elements. The native view transition covers the shared-element idea for free; the rest would cost more than they explain. Do them when a screen actually feels wrong without them.
