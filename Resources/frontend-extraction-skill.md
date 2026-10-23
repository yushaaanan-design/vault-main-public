---
tags: [resources, skill, frontend, todo-later]
status: not started, build AFTER the Gym Tracker is finished
---
# Front-end extraction skill (future, reusable across projects)

> [!note] When
> The user asked for this on 2026-09-21 and said: **not now, after the project is done.** Do not start it until they say the Gym Tracker is finished. It is reusable, so it lives here and in a real skill folder, not inside `Projects/Gym Tracker/`.

## What it should be
A Claude Code skill (a folder with `SKILL.md` plus helper scripts and reference notes) that teaches a model **how to take a reference website and extract its design and motion into something buildable**: pictures, animations, motion values. Written from what we actually did in the Gym Tracker, including the mistakes.

## What it must teach
1. **Capture.** Headless-browser screenshots at 1440x900 (and 390 wide), one small batch, saved into `design-refs/<site>/`. Full-page and viewport, plus hover and scrolled states. Use `playwright-cli` (`playwright-cli run-code --filename=...` on Windows Git Bash).
2. **Read motion off a live page.** Record video or a frame sequence; inspect computed `transition`, `animation`, `@keyframes`, Web Animations API (`document.getAnimations()`), and the JS library in use (motion, GSAP, Lottie). Extract durations, delays, easings, spring values and stagger gaps into a table.
3. **Write it down as a spec.** Same shape as [[motion-system]] (`Projects/Gym Tracker/motion-system.md`): purpose, duration scale, easing, budget, reduced-motion state, signature moments, and one "we will NOT copy" line per site.
4. **Mockup before code.** Build 2 or 3 single-file HTML mockups with real motion (CDN `motion`), let the user pick or mix, and only then touch the app.
5. **Build in gates**, one at a time, each ending with numbers (lint, tests, bundle size before and after, browser checks, screenshots, detector, reviewer).
6. **Rules learned the hard way** (from this project): plan and design before code; one accent meaning per hue; animate transform and opacity only; the main task path never waits on an animation; every effect needs a reduced-motion still state; do not run long silent scripts; the user is limit-conscious, so use Sonnet and small steps; ask before retrying a rejected tool call.
7. **Licensing and ethics.** References are evidence, never templates: no copying branding, proprietary text, imagery or exact layouts.

## Files it should contain
`SKILL.md` (when to use, the loop) · `capture.md` (screenshot and recording recipes) · `extract-motion.md` (how to read values off a page) · `spec-template.md` · `mockup-template.html` · `gates.md` · `scripts/capture.cjs` (one small Playwright script).

## Inputs available when the time comes
Everything in `Projects/Gym Tracker/` (node: [[Gym Tracker]]): [[motion-system]], [[design-research]], the learning log section H, `DESIGN.md`, and the screenshots in `design-refs/` if Steps 1 and 2 were run.
