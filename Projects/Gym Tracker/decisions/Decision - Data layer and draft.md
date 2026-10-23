---
tags: [gym-tracker, decision]
date: 2026-09-21
---
# Data layer: server is the source of truth, the draft lives in the browser

**Decision:** the app no longer has mock data. All saved data (settings, exercises, workouts, routines, body weight) is loaded from the API by `client/src/lib/useStore.js` and changed only after the server confirms. The workout being logged (the draft) is different: it lives in `App` state **and** in `localStorage` (`lib/useDraft.js`), and reaches the server only when you press Finish.

**Why:**
- The user said this is a personal app with a real database. Persistence and correctness beat polish.
- A gym has bad signal and tired thumbs. A refresh, a closed tab or a failed request must never lose a half-logged workout. So the draft is local, and Finish is one request with a `clientId`, so a retry cannot create a duplicate.
- Server-confirmed (not optimistic) updates: what you see is what was saved. Simplest thing first ([[Decision - Frontend defaults]]).
- `mock.js` was deleted and the seed script creates no workouts: the project holds no sample data at all (cleared 2026-09-21).

**Consequences:**
- No server = the app shows "Cannot load" with a Retry button, on purpose.
- Weights are kg everywhere; kg/lb is display only (`lib/units.js`).
- Multi-user is in the schema and every query, but there is no login: `server/src/auth.js` treats every request as the owner. **Nobody else may use the app until the auth phase is built and reviewed.** The API stays bound to 127.0.0.1.

Related: [[api-contract]], [[data-model]], [[Lesson 6 - New features to learn]].
