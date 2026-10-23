---
tags: [style, workflow]
---
# Working style with Claude

- Claude writes code; the user reads every line, tests it, and tries to break it.
- Per feature: short concept briefing, then build, then user reads and asks "why", then user tests. Security-critical pieces get an explicit review pass.
- One new idea per step; explain added lines in plain words; smallest working version first; wait for "I understand".
- **Teach in the code itself.** While the user is learning a stack, write plain-word comments on every file: what each variable, prop, state and function is for, its shape, and where its data comes from. This overrides the usual "few comments" habit. (Asked 2026-09-21: "it's very hard to understand how things are working for each variable".) Comments must never change behavior: re-run lint, tests and build after adding them.
- When something breaks, explain why before fixing.
- Direct answers. Recommend one option with tradeoffs, not a neutral list.
- Never paste secret keys into chat. If one leaks, rotate it immediately. (Happened 2026-09-20.)
- Check what a local server binds to (`127.0.0.1` vs `0.0.0.0`) before trusting it.
- Vet third-party repos/plugins before installing (read the hooks and scripts).

## Growing this folder
Add to [[frontend-style]] / [[backend-style]] when a convention is taught or decided and applies across projects. Project-only decisions go in that project's folder.
