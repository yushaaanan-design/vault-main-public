---
tags: [gym-tracker, decision, motion]
date: 2026-09-21
---
# Motion: the `motion` library through `LazyMotion`, native view transitions for shared elements

**Decision:** use `motion` (`motion/react`) for animation, loaded with `LazyMotion` + `domAnimation` and the small `m` component. Use the browser's native View Transitions (`<Link viewTransition>`) for the row-to-detail morph instead of `layoutId`. Count-up numbers use a 10-line `requestAnimationFrame` tween.

**Why:** the rules in [[motion-system]] (feedback not decoration, transform and opacity only, reduced motion tested, logging never waits) are easy to keep with one small token file (`lib/motion.js`). Measured cost: see [[Lesson 5 - Motion library]] (the full client is 478 KB JS / 150 KB gzip; the mockup-picking round was dropped by the user).

**Rejected:** GSAP (heavier, another mental model), scroll-driven CSS and `layoutId` (native view transitions already do the shared-element morph for free), motion own `animate()` for a counter (pulls about 100 KB for 10 lines of work).

**Cost of view transitions:** they need a data router, so `main.jsx` uses `createBrowserRouter` with one catch-all route.

**Not built:** exit animations (`AnimatePresence`), scroll-linked motion, animated row removal. Add only when a screen feels wrong without them.
