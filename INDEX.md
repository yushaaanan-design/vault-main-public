---
tags:
  - index
---
# Vault Index (root. One row per project, then shared notes)

> [!tip] Rules, to save tokens
> Read this file → project node → its `STATE.md`, then stop. Open **one** note for the task at hand, never the whole vault. Long note: `Grep '^#'` for headings, then `Read` with `offset`/`limit`. New/renamed note → fix its row in the **project node**, not here; overwrite `STATE.md` each work chunk. Project-specific stuff → `Projects/<project>/` only; reusable stuff → `Style/`, `Concepts/`, `Resources/`, `Learning path`.

## Layout
```
INDEX.md                 <- root, you are here
Learning path.md         <- cross-project roadmap
Projects/
  Gym Tracker/           <- one folder per project
    Gym Tracker.md       <- the project NODE (hub): links every note of the project, links back here
    STATE.md ...         <- everything else for that project
  <next project>/        <- same shape
Style/                   <- how the user codes (all projects)
Concepts/                <- things the user has learned (all projects)
Resources/               <- saved GitHub repos, skills list, reusable skills
```

## Projects (each is a node: open its hub, then its STATE)
| Project | Node (hub) | Status | State | Code |
|---|---|---|---|---|
| Gym Tracker: powerlifting and gym tracker (React + Express + Postgres) | [[Gym Tracker]] | Built and tested; waiting for the user's real `server/.env`; auth not built | [[Projects/Gym Tracker/STATE|STATE]] | `C:\Users\yusha\OneDrive\Desktop\Gym App project\` (`client/` on :5173, `server/` on :3000) |
| Fable Clothing: clothing brand + full e-commerce site, no tech-stack constraints | [[Fable Clothing]] | Blank slate; waiting on brand answers (PRD) and a tech-stack research pass | [[Projects/Fable Clothing/STATE\|STATE]] | `C:\Users\yusha\OneDrive\Desktop\FABLE CLOTHING\` (empty, not yet a repo) |
| N8N: workflow automation, self-hosted on Hostinger | [[N8N]] | Learning phase — course in progress, no workflows built yet | — | n8n cloud/course environment; Hostinger for eventual self-hosting |
| Web Scraping: web scrapers (teal in the graph, see [[Graph Legend]]) | [[Web Scraping]] | Apex (apex4u.com) scraper for Blue market research: recon done, script 1 run, script 2 written not run (see run-log) | [[Projects/Web Scraping/STATE\|STATE]] | `C:\Users\yusha\OneDrive\Desktop\Web Scraping\` (empty) |
| Web Design: reference-site teardowns + procedures (pink in the graph, see [[Graph Legend]]) | [[Web Design]] | 3 teardowns (Maneel Club, Get The Juice, Illiyeen), 75 screenshots, teardown procedure | — | `Projects/Web Design/` |

| Blue by Fable: shoe brand + site, extension of Fable Clothing (fork of its code) | [[Blue by Fable]] | Set up 2026-10-01; leather shoes + accessories, men only; no Blue code yet; market research running in Web Scraping | [[Projects/Blue by Fable/STATE\|STATE]] | `C:\Users\yusha\OneDrive\Desktop\fable shoes\` (empty) |

| Content Creation: social content engine (AI avatars, posting plan). First client: Fable Clothing | [[Content Creation]] | Strategy drafted 2026-09-29; manual for now, no n8n yet | [[Projects/Content Creation/STATE\|STATE]] | — (no code) |

| Virtual Assistant: free local Jarvis-style PC assistant (green in the graph, see [[Graph Legend]]) | [[Virtual Assistant]] | Built 2026-10-03/04: Claude Haiku brain, phone Talk mode, instant commands, shell/delete/overwrite behind an Auto switch, Obsidian access, ARES red sci-fi screen (slim deck + full-screen HUD with firing connections). Read STATE.md first | [[Projects/Virtual Assistant/STATE\|STATE]] | `C:\dev\Virtual Assistant\` |

> [!example] Adding a project
> `Projects/<Name>/<Name>.md` hub (copy [[Gym Tracker]]'s shape: `type: project`, `up: "[[INDEX]]"`, a "start here" line, one table) + `STATE.md` (<45 lines) → one row in the table above → point the repo's `CLAUDE.md` session-start rule at both files.

## Shared across projects
| Need                                                          | Note                          | Read when                                                    |
| ------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------ |
| Every open task across all projects, one list                 | [[Central To-Do List]]        | User asks "what do I do next" or wants to check tasks        |
| How to work with the user                                     | [[working-style]]             | Start of a build session                                     |
| Frontend conventions                                          | [[frontend-style]]            | Writing React/CSS                                            |
| Backend conventions                                           | [[backend-style]]             | Writing Express/Prisma                                       |
| React concepts already covered                                | [[react-basics]]              | Explaining a concept, avoid repeating                        |
| Security notes                                                | [[security-notes]]            | Auth, secrets, anything sensitive                            |
| Skills status, project order, overall flow                    | [[Learning path]]             | Planning what to learn or build next                         |
| Which model did which task well (central, all projects)       | [[model-log]]                 | Before starting any task; after finishing one                |
| How we scrape any site: rules, steps, filters, data pipeline  | [[scraping-rules]]            | Before ANY scraping or site recon, in any project            |
| Android phone as a server + OS-level control (3 levels, Termux, ADB, root) | [[android-os]]            | Before using or changing the Android phone                   |
| iPhone: what it can do, jailbreak limits                       | [[ios-os]]                | Before using or changing the iPhone                          |
| Saved GitHub repos                                            | [[github-repos]]              | User pastes a repo link, or asks "what was that repo"        |
| Skills: loaded vs available, load commands                    | [[skills-list]]               | User asks what skills exist or how to load one               |
| Reusable front-end extraction skill (build AFTER Gym Tracker) | [[frontend-extraction-skill]] | The user says the project is finished and asks for the skill |

## Facts
- Vault: `C:\OBSIDIAN VAULT\Codebase and learning\`. Obsidian CLI: `C:\Program Files\Obsidian\Obsidian.com` (full path; Obsidian must be running).
- Postgres 18: `C:\Program Files\PostgreSQL\18\bin` (not on PATH). Local git repos only, never push.
- Plugins: ponytail, obsidian-skills, agent-skills, impeccable, taste-skill, img2threejs, playwright-cli. See [[skills-list]].
- Model: **Sonnet 5 for everything** (Pro plan). Claude installs plugins itself via `claude plugin install`.
- Gym Tracker repo root also holds `PRODUCT.md`, `DESIGN.md`, `.impeccable/`.

- **[[Harness/README|Harness (central)]]**: the system that improves the whole setup: vault registry, cross-project lessons, the user's working preferences, done-checklist, tools and skills review. Each private vault has its own `_Harness/`.
