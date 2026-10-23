---
up: "[[N8N]]"
tags: [n8n, reference]
---
# n8n — core nodes reference

One-line-per-node cheat sheet, grouped by category. Not every node n8n ships — the ones you build almost every workflow from. Add to this file as you meet a new node in a real workflow; don't pre-fill niche integration nodes you haven't used yet.

## Triggers (start a workflow — every workflow needs exactly one, at the top)
| Node | What it does |
|---|---|
| Manual Trigger | Runs only when you click "Execute workflow" in the editor. Default while building/testing. |
| Webhook | Exposes a URL; workflow runs when something HTTP-POSTs/GETs to it. Most common trigger for "another app calls me". |
| Schedule Trigger (Cron) | Runs on a time interval (every N minutes, daily at HH:MM, cron expression). For polling/recurring jobs. |
| Form Trigger | Generates a hosted web form; workflow runs on submit. Built-in, no separate form tool needed. |
| Email Trigger (IMAP) | Runs when a new email arrives in a mailbox. |
| App-specific triggers (e.g. Gmail Trigger, Slack Trigger, Google Sheets Trigger) | Poll or webhook into a specific app's events (new row, new message). Same idea as Webhook/Schedule, pre-wired to that app's API. |
| Error Trigger | Not a normal trigger — attach it to a *separate* workflow that runs when another workflow throws. Central place to alert/log failures. |

## Flow control (branching, looping, stopping)
| Node | What it does |
|---|---|
| IF | Two-way branch (true/false) based on a condition. |
| Switch | Multi-way branch (route to one of several outputs based on rules). |
| Merge | Combines two input branches back into one (by index, by matching field, or append). |
| Filter | Drops items that don't match a condition (keeps the rest on one output, no branching). |
| Split In Batches (Loop Over Items) | Loops over items N at a time — the standard way to do a "for each" with rate-limited APIs. |
| Wait | Pauses the workflow for a duration, until a date, or until a webhook is called back (resume later). |
| Stop and Error | Deliberately fails the workflow with a custom error message (triggers the Error Trigger workflow if one is set). |
| No Operation (NoOp) | Does nothing — used as a visual anchor/label point in a workflow, or a dead-end branch. |

## Data shaping (the ones you'll use constantly)
| Node | What it does |
|---|---|
| Edit Fields (Set) | Add/remove/rename fields on each item. The most-used node in n8n — this is your "assign a variable". |
| Code | Write raw JavaScript (or Python) against the items when no built-in node covers it. Escape hatch. |
| HTTP Request | Call any REST API/URL directly — the universal node when there's no dedicated app node for a service. |
| Aggregate | Combines many items into one item (e.g. one array field from many rows). |
| Item Lists / Split Out | Splits one item's array field into many items, or the reverse. |
| Sort | Reorders items by a field. |
| Remove Duplicates | Drops items that duplicate a previous run/field value. |
| Rename Keys | Bulk-renames fields across items. |

## Sub-workflows & organization
| Node | What it does |
|---|---|
| Execute Workflow | Calls another n8n workflow as a reusable function, passing data in and getting data back. |
| Execute Workflow Trigger | Pairs with the above — marks a workflow as callable by another workflow (its "entry point" when used as a sub-workflow). |

## App/integration nodes (category, not individual nodes)
Every "connect to X" node (Gmail, Slack, Google Sheets, Airtable, Notion, Postgres, etc.) follows the same shape: pick a **resource** (e.g. "Message", "Row"), pick an **operation** (e.g. "Send", "Get", "Update"), fill parameters, attach **credentials** (stored once, reused across workflows). Learn the pattern once, every app node behaves the same way.

## Concepts that aren't nodes but you'll hit immediately
- **Expressions** — `{{ $json.fieldName }}` in any parameter pulls data from the current item; `{{ $('Node Name').item.json.field }}` pulls from a specific earlier node.
- **Items & the data structure** — every node passes an array of items, each item is `{ json: {...}, binary?: {...} }`. This is n8n's equivalent of "a row of data flowing down the pipe."
- **Pinned data** — freeze a node's output while testing so upstream nodes don't re-run every time.
- **Credentials** — stored separately from workflows, scoped per-node-type, never hardcode a token in an HTTP Request node's headers if a credential type exists for it.
