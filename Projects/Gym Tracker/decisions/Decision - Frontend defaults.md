---
tags: [gym-tracker, decision]
date: 2026-09-21
---
# Frontend defaults (answers to architecture section 8)

The user asked for the whole frontend at once, so the open questions in [[architecture]] section 8 were answered with the defaults below. Change any of them and I rebuild that part.

| Question | Decision | Why |
|---|---|---|
| kg or lb | kg only. The `unit` field stays `'kg'` on every set. | Simplest. The column exists so lb can be added later. |
| RPE | Stored as `rpe: null`, no input in the UI | One less input per row. The set table stays fast to fill in. |
| Rest timer | Not built (v2) | Needs `useEffect` + `setInterval` + cleanup. Bad to bolt onto the first state lessons. |
| Elapsed workout clock | Not built | Same reason. |
| Warm-up sets | Not modelled | Every ticked set counts toward volume and PRs. |
| Seed exercises | The 12 proposed in the architecture (Squat ... Tricep Extension) | `MOCK_EXERCISES` in `mock.js`. |
| Custom workout name | Free text with a datalist of 6 suggestions (Push Day, Pull Day, Leg Day, Upper Body, Lower Body, Full Body). Empty name saves as "Workout". | User asked for custom names plus default suggestions. |
| Home stats | "Last 7 days" (rolling), not calendar week. PRs = number of exercises that hit a PR. | Mock data is mid-September, a rolling window works on any date. |
| PR rule | A set is a PR if its e1RM beats every earlier set of that exercise. The first time is not a PR. | Otherwise every first set would show a trophy. |
| Validation (client) | weight 0 to 1000 kg, reps whole 1 to 100, exercise name 1 to 60 chars, no duplicate names (case-insensitive) | Cheap sanity checks. The server must re-check everything later; the client is never trusted. |
| Persistence | None. Memory only. | Backend comes next. Adding localStorage now would be code we delete. |
| Edit/delete saved workouts | Not built (Phase 9) | Belongs with the API calls. |
| Layout | Desktop only, per [[Decision - Desktop first]] | |
