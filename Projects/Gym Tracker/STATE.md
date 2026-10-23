---
tags: [gym-tracker, state]
updated: 2026-09-21
---
# State (keep under 45 lines, overwrite each time)

**Phase: the whole app is built and tested against a throwaway database. The ONLY thing left before real use is the user creating `server/.env` (their Postgres password) and creating their real database.** Auth is not built and is a hard gate before anyone else uses the app.

## Done (2026-09-21, three local commits, no remote, never push)
- **Server:** multi-user schema v2 + migration, `req.user` middleware (`src/auth.js`), routes for exercises, workouts (POST/PUT/PATCH/DELETE, retry-safe `clientId`), sets, routines, body weight, settings (`/me`), `pg_dump` backup script. 4/4 API tests including "another user sees nothing". See [[api-contract]], [[data-model]].
- **Client (12 screens):** Today, Progress, Consistency (streak, yearly blob heatmap, years, month vs month, muscle volume, year in review, PR timeline), History, workout detail (edit, delete, save as routine), Library, exercise detail (stall notice), Routines, Body, Meet (total, DOTS, attempts, percentage table), Settings (kg/lb, target, rest, sex, CSV export/import), Active workout (warm-up ramp, set types, RPE, notes, draft survives refresh). All data via `lib/useStore.js` with loading/error/retry. Motion built in (see [[Lesson 5 - Motion library]]). Colour defects fixed. See [[architecture]] section 12.
- **Checks:** lint clean, client tests 29/29, API tests 4/4, build 478 KB JS (150 KB gzip) / 21 KB CSS (was 302 / 18), 9 screens toured with 0 console errors, 22/22 browser flow checks (log, warm-ups, refresh, edit, routine, lb, body weight, delete, 404), server-down error + Retry recovery, no horizontal overflow at 820 and 390 px, reduced-motion verified.
- Decisions: [[Decision - Data layer and draft]], [[Decision - Motion library]].

## Blocked on the user (the ONE stop)
1. Copy `server/.env.example` to `server/.env`, put YOUR Postgres password in it (never in chat).
2. In PowerShell: `& "C:\Program Files\PostgreSQL\18\bin\createdb.exe" -U postgres gym_tracker` (asks for the password).
3. In `server/`: `npm run migrate` (applies the ready migration), `npm run seed` (owner + 20 exercises, NO demo data), `npm run dev`. In `client/`: `npm run dev`. Open http://localhost:5173.
4. Revoke the leaked `sk-...` API key.

## Known limits
- **No login.** API bound to 127.0.0.1, every request = the owner. Never expose it (phone over wifi, hosting, tunnel) before auth. Auth is its own lesson: bcrypt, httpOnly session cookie, CSRF, login rate limit, replace `attachOwner`, then run the security-auditor agent.
- Charts, plates and plate clubs always use kg even in lb mode. DOTS coefficients came from a calculator site, not the federation: re-check. Backup restore untested (do it once). Bodyweight lifts have no e1RM. No `AnimatePresence` exit animations. Desktop-first.
- Not run: the impeccable detector and the finish-reviewer agent (spawning agents was not asked for). Say "review" to run them.

## Next (in order)
1. The `.env` steps above, then a first real workout and a `npm run backup` + restore test.
2. Auth phase (own lesson) before anyone else uses it.
3. After the project: build [[frontend-extraction-skill]].

## Standing preferences
- Stack fixed: JavaScript, React, plain CSS + flexbox, Vite, Express, Prisma, Postgres. New dependencies only with a reason, logged in the learning log.
- Heavy plain-word comments in every file. Model: Sonnet 5. Bash heredocs with apostrophes break: use the Write tool.
- "Build it all, review after." Never trust the client. Local only, never push.
- API tests write rows, so `server/test/api.test.js` refuses to run unless `THROWAWAY_DB=1` is set: only ever point it at a throwaway database.
- Throwaway test Postgres recipe (port 5433, trust auth, in a temp folder) is in [[Lesson 6 - New features to learn]] concept 63.

## 2026-10-05: scope extended to Gym Tracker Vision
The user wants a vision model that tracks bar path, form and progress over time from phone videos, merged into this project. Plan and phases: [[vision/Vision plan|Vision plan]]. The auth phase and the database connection stay prerequisites for any upload feature.
