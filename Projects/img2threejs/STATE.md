---
up: "[[Codebase and learning]]"
tags: [img2threejs, state]
---
# State: img2threejs (image to Three.js), Chelsea boot test

**Read [[run-log]] first.** The real checklist is `C:\dev\img2threejs\chelsea\.img2threejs\state.json` (run `python forge/next.py --state ... ` from the skill folder).

## What this is
Test of the `img2threejs` Claude skill: rebuild a Chelsea boot as code-only procedural Three.js from 6 reference photos. Workflow diagram: `Resources/img2threejs-workflow.canvas`. Analysis: [[image-analysis]].

## Where we are (2026-10-06)
Intake finished: image analysis, suitability, admission, spec search, pre-spec assessment, detail inventory. Spec written and strictly validated; pass 1 (blockout) generated and rendering in the viewer, needs a correction round.

## Decisions
- Quality target: highly realistic (lighting + shaders), not low-poly. Real size not needed; proportional model (boot length = 1).
- Viewer: `C:\dev\img2threejs\chelsea\viewer\` (Vite). Start: `cd viewer; npx vite --port 5173`; views at `/?view=side|front|back|top|bottom|3q`.
- Photos are private research copies from lexaitaliano.com, kept in `C:\dev\img2threejs\chelsea\refs\` (outside OneDrive, vault, git). Never published.
- User removed the "never scrape Google Images/Shopping" rule on 2026-10-06 (scraping-rules 2b).
- No footwear data in the skill's own knowledge base, so footwear facts are written by Claude (marked inference) in [[image-analysis]].

## Open
See the bottom of [[run-log]].

## CONTEXT BOX: resume here (saved 2026-10-06, paused by the user to work on Instagram)
**Status:** pass 1 (blockout) generated and rendering; correction round 4 is PLANNED, not started. Spec is strict-valid (PASS).
**Reference = the retailer boot only** (`C:\dev\img2threejs\chelsea\refs\left-side.png` + 5 other angles). The user's own photo (`Pictures\chelsea side.jpg`) is NOT a reference (user said so).
**The user wants:** highly realistic (lighting + shaders), not low-poly; an infographic before every build round; a tech pack is coming (real measurements); a simple full breakdown of every step and download at the end.
**Open fixes (round 4, shown in `chelsea\infographic-round4.html`):**
1. HOLE: sole mesh is cut off at the SDF grid edge (bounds z +-0.54 but the sole reaches +-0.57): enlarge the sole-unit bounds to about z +-0.62 (this is the "hollow at the back" and the "missing front of the sole").
2. Heel a little wider (+0.01) and a little past the back of the upper (+0.015); one smooth sole, no flat plate, no gap.
3. Gusset (mesh fabric): exact traced outline (`measure_parts.json`, down the left edge, round arc at the bottom, arches back up on the right), both sides, ribbed matte, small height step vs the leather. Current painted capsule is wrong.
4. Pull tab must be a real loop (torus in the side plane); collar top line profile: bend up, flat, rise.
5. Leather too dark and too coarse: colour from highlight-free pixels (done in `make_crops.py`/`author_spec.py` COL), finer grain, glossier clearcoat; white patches earlier were shine baked into textures (fixed by cleaning crops).
6. Top opening must be hollow (top-view pass, later). Toe spring and toe end of the sole.
**Questions waiting for the user:** tech pack; gusset close-ups (side and back); sole from below; toe end from the front; top view into the collar; leather colour (retailer mid-brown assumed); left/right boot or symmetric.
**How to run it again:** `cd C:\dev\img2threejs\chelsea`; rebuild: `python author_spec.py` then `bash run_material_evidence.sh` then (from the skill folder, `PYTHONUTF8=1`) `validate_sculpt_spec.py ... --strict-quality` and `generate_threejs_factory.py ... --out viewer/src/createObjectModel.ts --pass-id blockout --force`; viewer: `cd viewer; npx vite --port 5173` (views `/?view=side|front|back|top|bottom|3q`); gallery pages: `python -m http.server 8790` in the chelsea folder (port 8765 belongs to Ares, do not use).
**Key files:** `object-sculpt-spec.json` (generated; edit `author_spec.py` instead), `fit_upper2.py` + `fit_result2.json` (body fit, IoU side 0.97 / top 0.89 / front 0.84), `masks.py` (flood-fill photo masks), `measure_parts.py`, `make_crops.py`, `viewer/src/main.ts` (lights, UV helper, sole deformation, environment).
**Known skill gaps (tell the user if relevant):** the generator makes no UVs for implicit (SDF) shapes (viewer adds box UVs); its extrude builder has no bevel; no polygon paint regions.
**State file:** `chelsea\.img2threejs\state.json` (next step: build-current-pass). Run `python forge/next.py --state ...` from the skill folder first.
