# Security notes

## Auth plan (later phase)
bcrypt password hashing, JWT, protected routes, data scoped per user (`userId` on `Workout`).
- Design the API so web, mobile, and desktop clients can all use it. Don't depend on cookies alone.
- Web: prefer an httpOnly cookie over localStorage (localStorage is readable by any injected script). Needs SameSite and CSRF handling. Review explicitly before shipping.

## Habits
- Secrets (API keys, tokens) never go in chat, the vault, or git. If one leaks, rotate it immediately; a transcript can't be un-leaked. (Happened 2026-09-20.)
- Check what a local server binds to. `0.0.0.0` exposes it to the whole network; use `127.0.0.1` for local-only.
- Validate input at trust boundaries (Zod on the server later).
- Do an OWASP Top 10 pass against shipped code before calling something done.


## Added 2026-09-21 (Gym Tracker multi-user build)
- **Ownership check on every query.** `where: { id, userId: req.user.id }` (or `deleteMany` and check `count`). Someone else row = 404, never 403, so ids cannot be probed. Test it with a second user: `server/test/api.test.js`.
- **Never take `userId` from the request body.** It comes from the server (`req.user`).
- **Idempotent writes.** A client-made uuid stored UNIQUE turns a retried request into a harmless repeat.
- **Whitelist what PATCH may change.** `/me` lists the allowed fields one by one, and `passwordHash` is never in a response.
- **CSV formula injection.** A cell starting with `=`, `+`, `-` or `@` can run as a formula in Excel. Prefix it with an apostrophe on export (and remove it on import).
- **Secrets on command lines are visible to other programs.** Pass the database password to `pg_dump` through `PGPASSWORD`, not as an argument.
- **Unauthenticated localhost API:** safe only because it is bound to 127.0.0.1 and CORS allows one origin. JSON POSTs need a CORS preflight, which the browser refuses from other sites. Before any login exists nothing may bind wider. When auth arrives, cookies bring CSRF back into play.
- **Deleting a user** must delete their workouts first (Restrict on exercise), then the user. Design account deletion deliberately.
