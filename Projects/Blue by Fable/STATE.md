# State

**Read [[CONTEXT]] first.** Updated 2026-10-01.

## Done
- Project created in the vault: hub, CONTEXT, STATE, INDEX row; `CLAUDE.md` in `fable shoes/` points here.
- Direction decided: same site and codebase as Fable, shared customers/admin/orders; Blue = leather shoes + leather accessories, men only, own brand plus sourced brands.
- [[catalogue-architecture]] drafted against Fable's real data model (not yet approved line by line).
- Market-research system designed and started in the **Web Scraping** project: see Web Scraping STATE. Apex pilot: recon done, script 1 run, script 2 written (not run).
- Central notes created this session: `Resources/scraping-rules.md`, `Resources/model-log.md` (also a global rule in `~/.claude/CLAUDE.md`).

## Not started
- No Blue code. `fable shoes/` holds only CLAUDE.md. The Fable repo (`FABLE CLOTHING/`) is untouched.
- Fable is still on a JSON file store: **Postgres/Prisma move approved but not started.**

## Next
1. Finish the Apex pilot (scripts 2 to 5) in the Web Scraping project.
2. User answers the open items in [[CONTEXT]]: Bangladeshi sizing, price range, image storage (Hostinger vs Cloudinary), git branch plan.
3. Postgres move in the Fable repo, then `division`/`brand`/filters, then Blue UI. Later, Blue's product upload calls the market lookup before pricing.
