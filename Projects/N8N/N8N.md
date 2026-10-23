---
tags: [project, n8n]
type: project
status: full reel-to-knowledge pipeline written and validated — awaiting VPS setup + import
up: "[[INDEX]]"
---
# N8N (project node)

Up: [[INDEX]] (the vault root). Workflow automation — bought n8n + Hostinger (self-hosting target), currently learning via an n8n course. Not part of Fable Clothing; a separate track.

| Need | Note | Read when |
|---|---|---|
| Core nodes cheat sheet (triggers, flow control, data shaping, integrations) | [[nodes-reference]] | Building or reading any workflow |
| What's already known vs. what's new to learn here | [[CONTEXT]] | Start of a session on this project |
| Reel-to-knowledge pipeline: full handoff (scope, locked decisions, architecture, setup, open questions) | [[reel-pipeline-context]] | Working on the reel-download/analyze workflow |
| Reel pipeline phase 1 setup to-do list (checkboxes) + visual progress canvas | [[reel-pipeline-setup-checklist]] / [[reel-pipeline-progress.canvas\|reel-pipeline-progress]] | Resuming setup work on the reel pipeline |
| Reel pipeline step 5: actual n8n node-by-node build instructions, visual | [[reel-pipeline-workflow-build.canvas\|reel-pipeline-workflow-build]] | Wiring the workflow in the n8n editor |
| Actual importable workflow JSON (paste into n8n canvas with Ctrl+V) | `workflows/json/reel-pipeline-phase1.json` | Ready to paste the workflow into n8n (**superseded** by the full pipeline below) |
| **Full reel-to-knowledge pipeline — importable workflow JSON** (46 nodes, all branches + failure paths wired, validated) | `workflows/reel-to-knowledge.json` | Importing the finished pipeline into n8n |
| **Setup guide for it**: VPS packages, the three credentials, the git-to-vault approach and why, per-branch test plan, every Telegram failure reply decoded, cost per reel | [[reel-to-knowledge-setup]] | Before importing, and whenever a reply says `[x]` |
| Validator for any n8n export (ids/names unique, connections resolve, no orphans, every IF/Switch output wired, no leaked keys) | `workflows/validate-workflow.js` | After hand-editing any workflow JSON |

## Folder layout (inside `Projects/N8N/`)
`CONTEXT.md` (innate vs. learning), `nodes-reference.md` (node cheat sheet), `reel-pipeline-context.md` (first real workflow build), `reel-pipeline-setup-checklist.md` (setup to-do), `reel-pipeline-progress.canvas` (visual tracker), `reel-pipeline-workflow-build.canvas` (node-by-node build instructions), `workflows/json/` (early phase-1 JSON, superseded), `workflows/reel-to-knowledge.json` + `workflows/reel-to-knowledge-setup.md` + `workflows/validate-workflow.js` (the real pipeline, its guide, and the export validator). Each future workflow gets its own `<name>-context.md`, same pattern.
