# Gym Tracker: Overview

Part of the [[Gym Tracker]] project node (up: [[INDEX]]).

Powerlifting/gym workout tracker. Log workouts, see history, estimated 1RM, PR detection.

## Stack
- Frontend: React + Vite, JavaScript, plain CSS (flexbox), Lucide icons. Design: "The Plate Ladder" (iron greys, hue = plate weight, seven-segment numerals), desktop-first. See [[architecture]] section 10 and `DESIGN.md` in the repo. Motion library (`motion`) planned: [[motion-system]].
- Backend: Node + Express + Prisma + PostgreSQL.
- Layout: monorepo, `client/` and `server/`.

## Build order (status 2026-09-21)
1. Frontend with mock data (no backend yet): **done**, 7 screens, redesigned, verified
1b. Motion redesign: **planned**, see [[motion-system]]
2. Backend API + DB: code written, **database not connected** (needs `server/.env`)
3. Wire them together: not started (`client/src/api.js` exists but is unused)
4. Deploy, then auth (bcrypt + JWT), then v2/v3 features

## v1 scope
Log workouts (exercise, sets, reps, weight, RPE), history, e1RM, PR detection. Personal use first (real database, real data). **Other users will use it later, so the schema is multi-user from the start and auth is a hard gate before sharing.** See [[architecture]] section 11.

## Where we are
Start with [[STATE]], then [[CONTEXT]] (the full handoff).

## Links
- [[STATE]] / [[CONTEXT]]
- [[motion-system]]
- [[feature-research]] (what real gym apps ship; features and tiers)
- [[design-research]]
- [[architecture]] — the full blueprint, start here
- [[data-model]]
- [[api-contract]]
- [[todo]]
- [[Decision - Architecture and stack]]
- [[Lesson 1 - Tools and security basics]]
- Lessons, in order: [[Lesson 2 - Hello React and the first screen]], [[Lesson 3 - Making it interactive]], [[Lesson 4 - Router, Plate Ladder redesign and backend]] (main learn list), [[Lesson 5 - Motion library]] (planned), [[Lesson 6 - New features to learn]] (planned)
- [[roadmap]]
- [[react-basics]]
- [[security-notes]]
