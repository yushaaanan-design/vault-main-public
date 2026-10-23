# Architecture decisions, 2026-09-20

- **Skipped the Task App**, started the Gym Tracker directly. Learning React on the real project.
- **JavaScript, not TypeScript.** One new thing at a time; TS comes after React feels comfortable.
- **Monorepo** with `client/` and `server/`.
- **Frontend first** with mock data, backend wired in later.
- **Plain CSS + flexbox**, matching what's already learned. No Tailwind.
- **Lucide icons**, no photos. Strong/Hevy as the visual reference.
- **SetEntry is its own table**, not a JSON blob, so per-exercise history and PR queries are plain SQL.
- **e1RM computed on read**, stays correct when a past set is edited.
- **No auth in v1.** Auth is its own phase after deploy.
- **Exercises**: seeded defaults plus user-added. **Workouts**: free-text name with default suggestions.
- **OmniRoute** (local LLM gateway) tried, then parked: not needed now. It defaults to `0.0.0.0` with no API key, a network exposure, so it was rebound to `127.0.0.1` while it ran. Revisit for the AI phase (calling LLMs from Express).
