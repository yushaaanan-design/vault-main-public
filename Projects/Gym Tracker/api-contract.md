---
tags: [gym-tracker, api]
updated: 2026-09-21
---
# API Contract (built, tested 4/4 by `server/test/api.test.js`)

Base URL `http://localhost:3000` (bound to 127.0.0.1). JSON in, JSON out. Errors are `{ "error": "message" }`. Every route below `/health` runs `attachOwner` (server/src/auth.js), which sets `req.user` to the seeded owner until real login exists. **Nothing takes a `userId` from the request.**

| Method and path | Body | Answer |
|---|---|---|
| `GET /health` | | `{ ok: true }` (no user needed) |
| `GET /me` | | settings: `id, email, displayName, unit, weeklyTarget, restSeconds, sex` |
| `PATCH /me` | any of `displayName, unit (kg/lb), sex (male/female/null), weeklyTarget 1-14, restSeconds 15-900` | updated settings |
| `GET /exercises` | | built-in + my custom, A to Z |
| `POST /exercises` | `{ name, category?, muscleGroup? }` | 201, or 409 if the name exists (also vs built-ins, case-insensitive) |
| `GET /exercises/:id`, `GET /exercises/:id/history` | | 404 if not visible to me |
| `DELETE /exercises/:id` | | 204; only my custom ones; 409 if used in logged sets |
| `GET /workouts` | | all mine, newest first, with sets |
| `GET /workouts/:id` | | 404 if not mine |
| `POST /workouts` | `{ name?, notes?, date?, durationSec?, clientId?, routineId?, sets: [{ exerciseId, setNumber, reps, weight (kg), rpe?, setType?, supersetKey?, note? }] }` | 201; **200 with the existing workout if `clientId` was already saved** (safe retry) |
| `PUT /workouts/:id` | same fields | replaces name/date/notes and the whole set list in one transaction (used by Edit) |
| `PATCH /workouts/:id` | `name, notes, date` | updated |
| `DELETE /workouts/:id` | | 204 (sets go too) |
| `POST /workouts/:id/sets`, `PATCH /sets/:id`, `DELETE /sets/:id` | one set | only on my workouts |
| `GET /routines`, `POST /routines`, `DELETE /routines/:id` | `{ name, items: [{ exerciseId, plannedSets, plannedReps? }] }` | items in order |
| `GET /body-weight`, `POST /body-weight`, `DELETE /body-weight/:id` | `{ date: 'YYYY-MM-DD', kg 20-400 }` | oldest first; same date replaces |

## Validation (server/src/validate.js)
reps 1-100 whole, weight 0-1000, rpe 1-10, setType in `normal|warmup|drop|failure`, name 60 chars, notes 2000, at most 200 sets per workout, JSON body 256 KB, `clientId` must look like a uuid.

## Client side
`client/src/api.js` has one function per row; `client/src/lib/useStore.js` owns the loaded data and updates it **after** the server confirms (server-confirmed updates, no optimistic ones).

## Not built yet
Auth (login, sessions, CSRF). See [[Decision - Data layer and draft]] and the auth gate in [[STATE]].
