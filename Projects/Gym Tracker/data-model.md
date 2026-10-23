---
tags: [gym-tracker, database]
updated: 2026-09-21
---
# Data Model (schema v2, built and migrated on a throwaway DB)

> [!info] Source of truth
> `server/prisma/schema.prisma` (heavily commented) and the migration in `server/prisma/migrations/`. This note is the map. Migration `20260921154848_init` was run against a **throwaway** Postgres on port 5433 to test; the user's real database has not been created yet (see [[STATE]]).

## Tables
```
User 1--many Workout 1--many SetEntry many--1 Exercise
User 1--many Routine 1--many RoutineItem many--1 Exercise
User 1--many BodyWeight
User 1--many Exercise (custom ones; built-ins have userId empty)
```

| Table | Notable columns | Why |
|---|---|---|
| `User` | `email` unique, `passwordHash` (empty until auth), `displayName`, `unit` (kg/lb, display only), `weeklyTarget` (default 3), `restSeconds` (120), `sex` (male/female/empty, only for DOTS) | Settings live on the server, so they follow the user to any device |
| `Exercise` | `userId` (empty = built-in), `name`, `category` (squat/bench/deadlift/accessory), `muscleGroup`, `@@unique([userId, name])` | Custom exercises are private; built-ins shared |
| `Workout` | `userId`, `clientId` (unique uuid made in the browser), `name`, `date`, `durationSec`, `notes`, `routineId` | `clientId` makes a retried save idempotent |
| `SetEntry` | `workoutId`, `exerciseId`, `setNumber`, `reps`, `weight` (**always kg**), `rpe`, `setType` (normal/warmup/drop/failure), `supersetKey`, `note` | Warm-ups are stored but never counted |
| `Routine` / `RoutineItem` | name, exercises in `position` order, `plannedSets`, `plannedReps` | Templates to start a workout from |
| `BodyWeight` | `userId`, `date` (midnight UTC of the picked day), `kg`, `@@unique([userId, date])` | One weigh-in per day; a second replaces it |

## Rules that go with it
- Every query on user data filters by `userId` from `req.user` (never from the request body). Someone else's row is a **404**, not a 403.
- Weights stored in kg only. `unit` changes what the screen shows and what the user types.
- e1RM, PRs, volume, streaks, heatmap, reports are **never stored**; the client recomputes them from the sets.
- Deletes: workout deletes its sets (Cascade); an exercise with logged sets cannot be deleted (Restrict, API answers 409); deleting a routine keeps the workouts made from it (SetNull).
- Deleting a *user* with data fails at the database while their sets exist (Restrict on exercise). Account deletion must delete workouts first. Remember this in the auth phase.

## Seed
`npm run seed` creates the owner (`OWNER_EMAIL`, default `owner@local`) and 20 built-in exercises with muscle groups. It creates NO workouts: there is no sample or demo data anywhere in the project (removed 2026-09-21).
