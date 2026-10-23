---
tags: [learning, roadmap]
---
# Learning path (across all projects)

Gym Tracker's own versions (v1 to v3) live in `Projects/Gym Tracker/roadmap.md` (project node: [[Gym Tracker]]). This note is the bigger picture.

## Skills status
JS/ES6+, Node, Express, PostgreSQL + Prisma: done. React: learning on Gym Tracker. TypeScript: after React feels comfortable. Auth: not learned yet.

## Project order
1. **Gym Tracker**, built as a platform.
2. Second project with exactly one new feature (file uploads, Stripe, or a webhook integration). Anime info site (AniList/Jikan API) is a good candidate.
3. Uptime/price monitor or global events tracker (background workers, queues).

## Overall flow
Web dev (now) -> automation (n8n) -> AI (LLM APIs from Express) -> packaging (Capacitor for mobile, Electron for desktop) only when users need it.

## Shared skills to pick up along the way
Zod validation, pagination, logging/error handling, env config and secrets, Vitest, Postgres indexes and EXPLAIN, Redis, OWASP Top 10 pass, TypeScript, Docker/CI when deploy pain appears.
