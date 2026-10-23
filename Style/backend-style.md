---
tags: [style, backend]
---
# Backend style

Cross-project conventions.

## Stack defaults
- Node + Express, PostgreSQL + Prisma.
- Auth (later phase): bcrypt password hashing, JWT, protected routes, data scoped per user. Design the API so web, mobile, and desktop clients can all use it (don't depend on cookies alone). Web: httpOnly cookie over localStorage, with SameSite + CSRF handling; review explicitly before shipping.

## Patterns
- The route (method + URL) is the frontend/backend contract; document it in the project's `api-contract` note.
- CORS is fixed on Express (allow the Vite dev origin), never in React.
- Validate input at trust boundaries (Zod, later).
- Model queryable things as their own tables, not JSON blobs.
- Compute derived values on read (e.g. e1RM) unless it's measurably slow.
- Secrets in env vars, never in git, chat, or notes.

## Learn later, when a feature needs it
Pagination, logging, Vitest, Postgres indexes and `EXPLAIN`, Redis/queues, OWASP Top 10 pass, Docker + CI/CD.

See also [[frontend-style]], [[working-style]].
