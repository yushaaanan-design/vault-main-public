---
tags: [project, gym-tracker]
type: project
status: built, waiting for the real database (see STATE)
repo: C:\Users\yusha\OneDrive\Desktop\Gym App project
up: "[[INDEX]]"
aliases: [Gym Tracker Vision]
---
# Gym Tracker (project node)

Up: [[INDEX]] (the vault root, which lists every project). Everything about this app hangs off this note. Powerlifting and gym tracker: React + Vite client, Express + Prisma + Postgres server, "The Plate Ladder" design. Summary and stack: [[00-overview]].

> [!tip] Start here
> Read [[STATE]] first (where we are, what is blocked, what is next). Then open **one** note from the table below. Shared, cross-project notes are linked at the bottom.

| Need | Note | Read when |
|---|---|---|
| Current status, next step, blockers | [[STATE]] | Start of every session on this project |
| Summary, stack, build order | [[00-overview]] | New to the project |
| Task checklist | [[todo]] | Picking what to do next |
| Full handoff for a fresh session (who the user is, decisions, gotchas) | [[CONTEXT]] | Right after STATE when the chat was cleared |
| Full blueprint. Section 12 = what was built 2026-09-21 and overrides 10.4, 10.5, 10.10; section 11 = feature tiers, multi-user, streak and heatmap spec | [[architecture]] | Designing or building anything |
| Prisma schema (v2, built) | [[data-model]] | Touching the DB or API |
| Endpoint table (built, tested) | [[api-contract]] | Writing routes or `api.js` |
| What real gym apps ship, feature ideas, sources | [[feature-research]] | Adding or judging a feature |
| Motion rules and the plan behind them | [[motion-system]] | Any animation work |
| Design research, what we took | [[design-research]] | Changing the look |
| Versions v1 to v3 and the design track | [[roadmap]] | Scoping what is next |
| Why we chose X | [[Decision - Architecture and stack]], [[Decision - Desktop first]], [[Decision - Frontend defaults]], [[Decision - Router and remodel]], [[Decision - Plate Ladder redesign]], [[Decision - Data layer and draft]], [[Decision - Motion library]] | Someone asks "why did we..." |
| What the user learned here (read in order) | [[Lesson 1 - Tools and security basics]] · [[Lesson 2 - Hello React and the first screen]] · [[Lesson 3 - Making it interactive]] · [[Lesson 4 - Router, Plate Ladder redesign and backend]] · [[Lesson 5 - Motion library]] · [[Lesson 6 - New features to learn]] | Learning, adding a lesson, reviewing |

## Folder layout (inside `Projects/Gym Tracker/`)
`STATE.md`, `CONTEXT.md`, `00-overview.md`, `todo.md`, `roadmap.md`, `architecture.md`, `data-model.md`, `api-contract.md`, `feature-research.md`, `design-research.md`, `motion-system.md`, `decisions/` (one `Decision - <topic>` per choice, date inside), `learning-log/` (`Lesson N - <topic>`, date inside). Project-only things stay in this folder.

## Shared notes this project uses (they live outside, for every project)
[[working-style]] · [[frontend-style]] · [[backend-style]] · [[react-basics]] · [[security-notes]] · [[Learning path]] · [[github-repos]] · [[skills-list]] · [[frontend-extraction-skill]] (to build after this project is finished)

## Vision (added 2026-10-05): this project is now Gym Tracker Vision
Plan, phases and the phone workflow: [[vision/Vision plan|Vision plan]].
