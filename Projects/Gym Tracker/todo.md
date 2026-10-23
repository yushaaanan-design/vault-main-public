# Todo

## Setup
- [x] Obsidian installed
- [x] ponytail plugin installed
- [x] agent-skills plugin: enabled directly in `~/.claude/settings.json` (the `/plugin install` command kept silently no-op'ing); loads next restart
- [x] OmniRoute tried and parked (env vars removed, server stopped); `npm uninstall -g omniroute` if never needed
- [x] obsidian-skills plugin installed
- [x] Obsidian CLI enabled (call via `C:\Program Files\Obsidian\Obsidian.com` until PATH refreshes)
- [x] Notes moved into the "Codebase and learning" vault under `Gym Tracker/`
- [ ] Revoke the leaked `sk-...` key
- [x] `CLAUDE.md` created so the vault gets updated every session

## Gym Tracker
- [x] Detailed plan with diagrams: [[architecture]] (review + modify before building)
- [x] Answer the open questions in [[architecture]] §8 (defaults, see [[Decision - Frontend defaults]])
- [x] `git init` done 2026-09-21: one repo at the project root, branch `main`, first commit 1059168 (`.env`, `node_modules`, `.claude/settings.local.json` ignored)
- [x] Vite scaffold + npm install + lucide-react (dev server verified)
- [x] Strip demo to "Hello" on screen (Phase 0, see [[Lesson 2 - Hello React and the first screen]])
- [x] Render mock workouts with `map` (Phase 1, see [[Lesson 2 - Hello React and the first screen]])
- [x] `useState` + controlled form to log a set (Phases 2-4, see [[Lesson 3 - Making it interactive]])
- [x] History view, e1RM, PR indicator (mock data) (Phases 5-6). **Frontend complete on mock data.**
- [x] Backend code written: Prisma schema, seed, routes, validation (migration NOT run: needs `server/.env` password)
- [ ] Create `server/.env`, run `npm run migrate` + `npm run seed` (migration and seed already proven on a throwaway DB, see [[STATE]])
- [x] React Router: real URLs, working Back button ([[Decision - Router and remodel]])
- [x] UI remodel + SVG trend chart
- [x] Replace mock data with `fetch` (wire `api.js`; see [[api-contract]])

## Design and motion (see [[motion-system]])
- [x] Step 0: fix the vault so it matches the code (2026-09-21)
- [ ] (dropped) Step 1: capture reference screenshots into `design-refs/`, rewrite [[design-research]]
- [ ] (dropped) Step 2: three live mockups (`mockups/1-restrained.html`, `2-physical.html`, `3-broadcast.html`); user picks or mixes
- [x] Gate 3: `npm i motion` and motion primitives (log it in the learning log, report bundle size)
- [x] Gate 4: Today screen
- [x] Gate 5: `git init` and first commit
- [x] Gate 6: Active Workout (plate loading, digit ignition, PR celebration, rest ring)
- [x] Gate 7: Progress (chart draw-in)
- [x] Gate 8: shared-element transitions (History, Library, detail)
- [x] Gate 9: fix the two colour defects (rest-over green, error red), tokenize `#5c5a52` and `#6f6d64`, rerun detector, finish-reviewer, tests, Playwright, screenshots at 1440/820/390

## After the project is finished
- [ ] Build the reusable front-end extraction skill: [[frontend-extraction-skill]]
- [ ] Append "what was actually used on the redesign" to `Resources/skills-list.md` (done 2026-09-21 if ticked here: [x])

## Feature stages (from [[feature-research]], see [[architecture]] section 11; do in this order, commit after each)
- [x] S1 Schema v2 + `req.user` middleware + seed + validation (no DB needed)
- [ ] S2 (skipped, the user dropped the mockup round; motion built straight into the app) Reference capture into `design-refs/`, rewrite [[design-research]]
- [x] S3 `npm i motion` + primitives (log in Lesson 5)
- [x] S4 Tier 1: draft survives refresh, set types (warm-up), RPE, kg/lb display, notes, edit/delete past workouts, routines, warm-up calculator, body weight, CSV export/import, Settings
- [x] S5 Tier 2: Consistency screen: weekly streak (`lib/streaks.js` + tests), yearly blob heatmap, multi-year strip, monthly report, muscle-group volume, Year in Review, PR timeline
- [x] S6 Motion gates (Today, Active Workout, Progress, shared-element) + fix the two colour defects
- [x] S7 Tier 3: RPE-adjusted e1RM, DOTS/Wilks/IPF GL (official coefficients), attempt planner, percentage programs, stall/deload
- [x] S8 Wire `api.js` everywhere, loading/error states, `pg_dump` backup script
- [ ] S9 **STOP: user creates `server/.env`**, then createdb, migrate, seed, curl, full browser suite
- [ ] S10 Auth phase (bcrypt, httpOnly cookie, CSRF, rate limit) + security-auditor review. **Hard gate before any other user.**
- [ ] S11 (after the project) front-end extraction skill: [[frontend-extraction-skill]]

## Vision (added 2026-10-05, see [[vision/Vision plan|Vision plan]])
- [ ] Film first test clips (side view, 5 to 10 reps) and pick the first exercise
- [ ] Phase 1 prototype: pose, joint angles, rep count on one clip (Python, user reads every line)
- [ ] Phase 2: label frames, fine-tune the bar detector, track the bar path
- [ ] Phase 3: form rules for the first exercise
- [ ] Phase 4/5: new tables, phone upload, background worker, charts over time
