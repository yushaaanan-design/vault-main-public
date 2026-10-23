---
tags:
  - procedure
---
# Procedure — Competitor/Reference Site Teardown

Reusable across projects whenever a new site needs a design/structure teardown before building something similar. First used on [[Projects/Fable Clothing/Fable Clothing|Fable Clothing]].

## When to run this
The user gives 2-5 reference sites (competitors or aesthetic references) and wants them understood before writing a design doc or PRD.

## Step 1 — Structural crawl (content, not visuals)
Use `WebFetch` per site. This gets nav trees, category/subcategory structure, product card/PDP field patterns, footer/policy structure, pricing/badge conventions — but **not** colors, fonts, spacing, or real imagery (WebFetch converts HTML to text, stripping all visual styling).

- For a small site (under ~10 nav items): one direct WebFetch pass per key page (home, one listing, one PDP) is enough.
- For a large/deep site (mega-menus, many categories): delegate one background agent per site (`Agent` tool, `subagent_type: "fork"` or general-purpose), each instructed to visit every nav item/category/subcategory (not just the homepage) and write a single exhaustive `.md` file. Running 3 site-crawls in parallel as separate agents keeps the main conversation's context clean — the raw fetch output doesn't need to live in the main thread, only the finished file.
- Each output file should end with a "Takeaways for [project]" section — the crawl is worthless if it doesn't get translated into what to reuse/avoid.

## Step 2 — Visual capture (colors, fonts, spacing, imagery, motion)
WebFetch cannot see this. Options, in order of reliability given typical tool access — **try #1 first, it's fast and confirmed working**:

1. **`playwright-cli`** (installed globally on this machine — `npm list -g` shows `@playwright/cli`; see [[skills-list]]). This drives the user's **already-installed real Chrome** — no binary download, so it sidesteps the sandbox network problem entirely. Confirmed working 2026-09-26 against live external sites (not just localhost, despite the skills-list note saying "localhost only" — that was the user's own caution from testing local dev servers, not a hard restriction).
   - Workflow: `playwright-cli open <url>` (or `goto`/`tab-new` for additional pages) → `playwright-cli resize 1440 900` (desktop) or `390 844` (mobile) → `playwright-cli screenshot --filename=<path>.png` → `playwright-cli eval "() => JSON.stringify({...getComputedStyle(...)})"` to pull real hex colors/font-families/sizes straight from the page, not guessed from a screenshot.
   - Save screenshots into the project's `Projects/Web Design/design-references/screenshots/` folder, named `<site>-<page>-<viewport>.png`.
   - `eval` selector tip: sites with hashed/CSS-module class names (e.g. `price_a3f9x`) won't match a guessed `[class*=price]` selector — if a targeted `eval` returns `null`, don't debug the selector, just read the screenshot visually instead (faster than reverse-engineering their build's class names).
   - Close the browser (`playwright-cli close`) when done with a site to free it up.
2. **Live browser control via an MCP tool** (e.g. claude-in-chrome, if connected) — equivalent capability, use if available and playwright-cli isn't. Always invoke the tool's own setup/trigger skill first.
3. **`npx playwright install chromium` (downloads its own browser)** — **do not use this as a first attempt**; confirmed to time out repeatedly in this sandboxed environment trying to download the ~100MB+ binary from `cdn.playwright.dev`. Only worth retrying if `playwright-cli` isn't installed and no MCP browser tool is available either.
4. **User-provided screenshots** — reliable fallback, zero tooling risk, and still the only way to see anything behind a login or truly blocked by the sandbox. Ask for specific named sections per the user's own convention (see [[../Projects/Fable Clothing/feedback_design_reference_convention|design reference convention]] if it exists) rather than full-page dumps, to keep it token-efficient. Read them with the `Read` tool (it handles images natively).

Do not spend more than one retry on a failing automated method before falling back — a second identical timeout confirms it's blocked, not transient.

## Step 3 — Write per-site files
One `.md` file per reference site, not one combined file — easier to reference individually later ("check the maneel-club file" vs. hunting through a combined doc). Structure per file:
- What the site is / why it's a reference
- Full nav/structure (from Step 1)
- Visual notes (from Step 2, once available)
- A closing "Takeaways for [project]" section — concrete, actionable, not just observations

## Step 4 — Keep this procedure updated
If a step in this process changes (a new tool becomes available, a faster method is found, a failure mode is discovered), update this file directly rather than re-explaining the process from scratch next time.
