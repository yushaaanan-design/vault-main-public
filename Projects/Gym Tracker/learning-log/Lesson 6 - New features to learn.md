# Lesson 6 - New features to learn

> Order: [[Lesson 5 - Motion library]] <- this lesson. Date: 2026-09-21. All lessons: [[INDEX]].

> [!important] Planned, not built yet
> These come from the feature research ([[feature-research]]) and the decisions in [[architecture]] section 11. Same rule as before: each concept is re-logged here with the file where you first meet it once the code exists. Numbers continue from [[Lesson 5 - Motion library]] (41).

## A. Foundation and multi-user (learn first)
| #   | Concept                                              | The one-sentence idea                                                                                                                                    |
| --- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 42  | **Client-generated ID (UUID) and idempotent writes** | The browser makes an id for each workout before sending, so a retried request cannot create a duplicate.                                                 |
| 43  | **Persisting a draft in `localStorage`**             | `JSON.stringify` on write, `JSON.parse` inside `try/catch` on read, so an unfinished workout survives a refresh and a broken value cannot crash the app. |
| 44  | **Multi-user data model**                            | Every user-owned row has a `userId`; every query filters by it; the id comes from the server session, never from the request body.                       |
| 45  | **Authorisation vs authentication**                  | Authentication = who are you. Authorisation = are you allowed to touch THIS row. Return 404 for someone else's row so ids cannot be probed.              |
| 46  | **Password hashing (bcrypt)**                        | Store a slow one-way hash, never the password. Salting is built in.                                                                                      |
| 47  | **Sessions vs JWT, httpOnly cookies**                | Where the login proof lives and why it should be a cookie the page's JavaScript cannot read.                                                             |
| 48  | **CSRF and rate limiting basics**                    | What stops another site from making requests as you, and what stops password guessing.                                                                   |
| 49  | **Prisma composite unique and relations**            | `@@unique([userId, name])` lets two users each have "Squat" but not two of their own.                                                                    |
| 50  | **CSV export and import**                            | Own your data: write rows, quote commas, and parse the Strong/Hevy export format carefully (no library unless it earns its place).                       |
| 51  | **`pg_dump` backups**                                | The database is the only copy of your training history. Dump it on a schedule and test a restore once.                                                   |

## B. Consistency and insight
| # | Concept | The one-sentence idea |
|---|---|---|
| 52 | **Date keys and week maths** | Use local-day keys like `2026-09-21`, Monday as week start (same as `weeklyVolumes`), so a late-night workout lands on the right day. |
| 53 | **Streak algorithm** | Walk weeks backwards counting those that meet the target; the current unfinished week never breaks the streak; keep the best-ever. |
| 54 | **SVG heatmap layout** | 53 columns x 7 rows: `x = week * step`, `y = weekday * step`; a circle's AREA (not radius) should follow the value, so radius = sqrt(value). |
| 55 | **Buckets / quantiles** | Split a user's own volumes into 4 levels so one huge day does not wash out the rest. |
| 56 | **Muscle-group modelling** | Tag each exercise with a primary muscle group, then sum sets per group per week. |
| 57 | **Monthly report and Year in Review** | Aggregations over a date range: totals, best lift, most consistent week, PR count. |

## C. Powerlifting
| # | Concept | The one-sentence idea |
|---|---|---|
| 58 | **RPE and RPE-adjusted e1RM** | RPE 8 means 2 reps left in the tank, so a set at RPE 8 is worth more than its weight suggests. |
| 59 | **DOTS, Wilks, IPF GL** | Formulas that compare lifters across body weights. Coefficients must be copied from the official source, never from memory. |
| 60 | **Meet attempt planner** | Openers, second and third attempts per lift from gym bests, with a total. |
| 61 | **Percentage programs and training max** | 5/3/1, nSuns, GZCLP expressed as data: weights are percentages of a training max, rounded to loadable plates. |
| 62 | **Deload and stall detection** | Flag N sessions with no e1RM gain (the mock data already contains two stall weeks on purpose). |

## D. Deliberately NOT needed (same rule)
GraphQL, WebSockets or real-time sync, Redux or any state library, a native app, Firebase or Supabase, an ORM other than Prisma, machine-learning libraries, social-feed infrastructure, image or video storage, OAuth "Sign in with Google" for now.

## E. Explain it back (when the code exists)
1. Why is `userId` never read from the request body?
2. What happens if the same workout is POSTed twice with the same client id?
3. Why should the current week not break a streak?
4. Why does a heatmap circle use `sqrt(volume)` for its radius?
5. Why 404 and not 403 for someone else's workout?

## What was actually built (2026-09-21)

> [!success] Concepts 42, 43, 44, 45 (half), 49, 50, 51 now exist in code. Auth (46 to 48) is NOT built: it is its own lesson and a hard gate.

| # | Where you meet it |
|---|---|
| 42 client id, idempotent write | `lib/active.js` `newActive()` makes `clientId`; `server/src/routes/workouts.js` POST catches Prisma error `P2002` (unique broken) and returns the saved workout with 200. Tested in `server/test/api.test.js`. |
| 43 draft in localStorage | `lib/useDraft.js`. Every read and write in try/catch, shape check on read. |
| 44 multi-user model | `schema.prisma` (`userId` everywhere), `server/src/auth.js` (`attachOwner` sets `req.user`), every route filters `userId: req.user.id`. |
| 45 authorisation | Another user row is a 404. The last test in `api.test.js` creates a second user and tries to read, change, delete and reference their workout, set and exercise: every attempt fails. |
| 49 composite unique | `@@unique([userId, name])` on Exercise and `@@unique([userId, date])` on BodyWeight. Postgres treats empty `userId` as different each time, so built-in duplicates are prevented in the seed by looking first. |
| 50 CSV | `lib/csv.js` (own parser: quotes, commas, newlines) and `SettingsView.jsx`. Export neutralises spreadsheet formula injection (a cell starting `=` gets an apostrophe). Test round-trips a hostile name. |
| 51 backups | `server/scripts/backup.js`, `npm run backup`. Password goes in the `PGPASSWORD` environment variable, never on the command line. **Restore has not been tested yet: do it once on a scratch database.** |

## New concepts from this build (numbers continue at 52)
| # | Concept | The one-sentence idea |
|---|---|---|
| 52 | **Custom hook that owns server data** | `lib/useStore.js`: one function holds loaded lists in state and returns one action per change. Screens never call `fetch`. |
| 53 | **Loading, error, retry** | `status` is `loading`, `error` or `ready`. `App.jsx` draws a message instead of an empty screen; Retry bumps an `attempt` counter that re-runs the effect. |
| 54 | **Ignoring a stale answer** | The load effect sets `cancelled = true` in its cleanup, so an answer arriving after the component left is dropped (React StrictMode runs effects twice in dev, so this matters). |
| 55 | **Server-confirmed updates** | Ask the server first, update the screen with its answer. A failed Finish keeps the draft and shows the message. |
| 56 | **Warm-ups excluded everywhere** | `calc.js` `isWork()`: volume, PRs, best e1RM, history, muscle volume and reports all skip `setType === 'warmup'`. One helper, used in every place; tests prove it. |
| 57 | **RPE-adjusted e1RM** | `calc.js` `setE1rm`: with an RPE, a set of 5 at RPE 8 was worth an all-out 7 (table lookup); without one it uses Epley. |
| 58 | **Weekly streak** | `lib/streaks.js`: count Monday-start weeks with at least the target sessions; the unfinished week never breaks it. Stepping weeks with `setDate(+7)` survives daylight-saving changes. 6 tests. |
| 59 | **Heatmap geometry** | 53 columns by 7 rows, Monday on top, circle area proportional to volume (radius uses the square root), brightness from your own quartiles so one huge day does not flatten the rest. |
| 60 | **Display units vs stored units** | `lib/units.js`: everything is kg in the database and in every calculation; lb only changes what you see and type. Changing unit is blocked while a draft exists. |
| 61 | **DOTS score** | `lib/scores.js`: total x 500 / a 4th-degree polynomial of bodyweight. Coefficients were checked against a calculator site, **not** the federation own document: re-check before trusting it for a real meet. |
| 62 | **Data router and view transitions** | `createBrowserRouter` is needed for `viewTransition`; the app keeps its `<Routes>` inside one catch-all route. |
| 63 | **Testing a real server against a throwaway database** | `initdb` made a private Postgres on port 5433 in a temp folder with trust auth, so the API, migration and seed were tested without touching your real database or password. |
