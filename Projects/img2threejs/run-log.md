---
up: "[[STATE]]"
tags: [img2threejs, log]
---
# Step-by-step run log (Chelsea boot test, started 2026-10-06)

Plain words, in order, so you can check how the pipeline actually works. Each row: what the step is for, what I did, what it produced, where the file is. Work folder: `C:\dev\img2threejs\chelsea\`. The state file `.img2threejs/state.json` there is the real checklist; this note is the readable copy.

| # | Step | What it is for | What I did | Result / file |
|---|---|---|---|---|
| 0 | Get references | Need photos of the object from all sides | Google Images search in your browser, opened one retailer product page (lexaitaliano.com, Shopify), read its image list, downloaded 7 PNGs 2 s apart | 7 files in `refs/` (5.6 MB). 6 angles: left-side, front, back, top, sole (tilted), + three-quarter |
| 1 | State gate (`state.py init`, `next.py`) | One checklist file decides what is allowed next, so nothing is skipped | Created `.img2threejs/state.json`, profile `generic` | Lists 23 mandatory steps; first one is image-analysis |
| 2 | Probe images (`probe_image.py`) | Check the files are real images | Ran on all 6 | All 1024 x 1024 PNG |
| 3 | Image analysis | Describe what is there, bottom-up, before any code | Looked at all six photos, measured the profile (threshold mask, `evidence/profile-bbox.json`) | [[image-analysis]] |
| 4 | Suitability | Is the photo a good 3D target? | One obvious object, strong silhouette, materials visible, hidden side inferable, buildable from primitives and lofted shapes | **PASS** (conditional only for the inside of the shaft) |
| 5 | Reference admission (`check_reference_admission.py`) | Reject junk references with a reason | Ran on each photo | 5 of 6 admitted. **Top view rejected**: it shows two boots, so the mask is two blobs (0.50 < 0.6). Fixed by cropping one boot: `top-view-single.png` admitted. Files in `evidence/admission-*.json` |
| 6 | Local spec search | Pull stored knowledge instead of inventing | Auto BM25 search, then retried with 7 footwear terms | Found nothing useful (3 hits about shaders). So I wrote the missing footwear facts myself and marked them as inference in [[image-analysis]] |
| 7 | Pre-spec assessment | Classify, score complexity, write the "what is good enough" contract | Filled `assessment.json` by script `fill_assessment.py` | complexity **complex**; 4 macro, 8 meso, 6 micro, 6 materials, 2 repeated systems; 5 blocking failure modes (gusset, toe, heel, welt, tab, flat material) |
| 8 | Detail inventory | List every small identity detail so none is missed | 3x3 grid crops (`evidence/zones/`) then 14 hand-entered details | 14 details (target was 10), each mapped to a planned part or material |
| 9 | Projection decision | Decide whether to paint the photo's own pixels on the mesh | Marked **skipped with a reason**: the leather burnish is a soft gradient, and one studio-lit photo would bake its highlights into the texture. Revisit if the material review fails | state.json reason recorded |
| 10 | Spec authoring (starter) | The spec is the full written blueprint the code generator reads | `new_sculpt_spec.py` made a starter spec (1 placeholder box). Validator then FAILED it on purpose: needs 4 macro / 8 meso / 5 micro parts, 3+ materials with real PBR, a repeated system, local overrides, lighting, 6 review views, real feature targets, and all 14 details mapped to parts | `object-sculpt-spec.json` (starter, not usable yet) |

| 11 | Fit the boot body to the photos (`fit_upper.py`) | Make the 3D shape proportional by measurement, not by eye | Built the upper as 6 smooth-merged ellipsoids minus a collar opening, then nudged their sizes/positions until the shape's shadow matched the photo silhouettes (side, front, top). Match score (IoU): **side 0.95, top 0.84, front 0.76, mean 0.85**. Front is low because that photo is taken from above (perspective), so its widths come from the top view | `fit_result.json` |
| 12 | Hand-write the spec (`author_spec.py`) | The blueprint the code generator reads | 12 parts (4 macro: upper, outsole, heel stack, welt; 8 meso: 2 gussets, collar binding, pull tab, lining, heel counter, heel tip, insole), 6 materials with colours sampled from the photos, 2 repeated systems (welt stitches, heel lifts, both normal-map only), 14 detail links, 9 local features, 6 review views (side, front, back, top, 3/4, bottom), lights, 6 feature review targets, 6 assumptions, 3 risks | `object-sculpt-spec.json`. Basic validation **PASS**; only warning left is "needs referencePbr" (next step) |
| 13 | Material evidence (`extract_pbr_evidence.py`) | Take real PBR values (colour palette, roughness, height, normal, AO) from photo crops instead of guessing | One crop per material (`evidence/crops/`), 6 runs, written straight into the spec. Confidence: leather upper **0.73**, gusset 0.75, sole 0.86, heel stack 0.85, lining 0.82, tab 0.79 (all above the 0.7 bar; the script itself says single-image PBR is an estimate) | `evidence/pbr/` |
| 14 | Strict validation | Block code generation if the spec is too shallow | `validate_sculpt_spec.py --strict-quality` | **PASS** (0 warnings) |
| 15 | Set up the viewer (Vite + Three.js) | A page that runs the generated model so we can look at it | `npm init`, `npm install three vite typescript @types/three` in `C:\dev\img2threejs\chelsea\viewer\`; wrote `index.html`, `src/main.ts` (lights from the spec, shadow, six camera views via `?view=`), type-check clean; `vite` dev server on http://127.0.0.1:5173 | viewer running |
| 16 | Generate pass 1 (blockout) | Turn the spec into Three.js code | `generate_threejs_factory.py --pass-id blockout` makes `src/createObjectModel.ts` (1,563 lines, one function that builds the boot) | works |
| 17 | First render and 3 bugs (all mine, fixed) | See if it looks like the photos | (a) small parts came out 1 unit big because I had set a scale that overrides their sizes; (b) the heel tip was parented to a rotated part; (c) the whole boot rendered BLACK: the texture URLs pointed to files the page could not find, and the smooth-merged upper has no UV coordinates (the generator does not make them for that shape). Fixed: maps copied to `viewer/public/pbr/`, a box-projection UV helper in main.ts | boot now shows |
| 18 | Where it stands | Look at the side view vs the photo | Silhouette is recognisably a Chelsea boot, proportions roughly right. Still wrong: pull tab floats behind the shaft (upper is too short/forward at the back top), heel block too boxy, toe slightly thin, the textures are raw photo crops (placeholder, they include white background) | blockout needs a correction round before it can be accepted |
| 19 | Correction round 2 | Fix the user's first review (back straighter, heel separate, front line smoother) | Better photo masks (flood fill from the border, so bright highlights count as leather); refit of the body with a straight-back box, bigger blend radius and 3 cutter boxes under the upper; heel rebuilt as 4 stacked lifts. Side match (IoU) 0.97, top 0.89, front 0.84. User: "significantly better" | spec + factory regenerated |
| 20 | User's own reference found | User said they had saved a side view in Pictures | `Pictures\chelsea side.jpg` (554 x 554): a DIFFERENT boot, dark chocolate cap-toe, wide rectangular gusset, straight back, thick black sole. I had been modelling the retailer boot. Copied to `refs/user-side.jpg`; measured (height/length 0.58, leather median RGB 72,50,44, sole 39,35,35). The refit to it is written but NOT run: user stopped it ("show me the reference first") | decision pending, see STATE |
| 21 | Shininess is not colour (user) | White patches on the model | The white parts in the photos are specular highlights, not leather colour. They leaked into the albedo textures because the raw photo crops were used as maps. Rule: albedo = body-colour pixels only (highlights filled in); highlights come from clearcoat, roughness and lights | to do in the material pass |

## Downloads and installs (everything that came onto the PC)
| # | What | From | Size | Where | Why |
|---|---|---|---|---|---|
| 1 | 7 boot photos (PNG) | lexaitaliano.com image CDN (found via Google Images) | 5.6 MB | `C:\dev\img2threejs\chelsea
efs\` | reference photos |
| 2 | npm packages: `three`, `vite`, `typescript`, `@types/three` (+ their dependencies) | npm registry | about 100 MB in `node_modules` (I guessed 30 to 50 MB; it was bigger) | `C:\dev\img2threejs\chelsea\viewer\node_modules` | Three.js draws the 3D; Vite serves the page; TypeScript checks the generated code |
| 3 | Nothing downloaded: a tiny local file server (`python -m http.server 8790`, my own Python) so the gallery page opens in a tab; plus `chelsea side.jpg` copied from your Pictures folder (not downloaded) | | | `refs/user-side.jpg` | |
| 4 | Nothing else: Python packages (Pillow, numpy) were already installed; the Chrome extension was already there | | | | |

## Quality target (user, 2026-10-06)
Not low-poly: highly realistic, including lighting and shaders. Plan: later passes raise the smooth-surface resolution (the SDF grid is 56 now, max 64) and add subdivision if needed, real leather shader (clearcoat, anisotropic sheen, grain normal map), environment lighting with soft shadows, and a physically based material per part. The blockout pass is deliberately rough.

## Open / needs the user
(see [[STATE]])
- Not blocked on the user. Next: build pass 1 (blockout): generate the TypeScript factory and render it. Needs a place to run Three.js in a browser (see below).
- How many passes: 8 (blockout, structural, form-refinement, material, surface, lighting, interaction, optimization). Each pass is built, screenshotted, compared with the photos, and must be accepted before the next unlocks.
- A decision the user may want to make later: real size (assumed UK 9 / EU 43, about 29 cm), and whether to model the inside of the shaft.

## 2026-10-07 Opus branch: hand-built loft (folder `C:\dev\img2threejs\chelsea-opus`, original `chelsea` untouched)
No git repo exists, so the "branch" is a sibling folder (viewer copied, node_modules is a junction to the old one).
| # | Step | What I did | Result / file |
|---|---|---|---|
| 1 | Measure | `profile.py`: side photo -> top/bottom line per slice, top view -> width + centre line per slice (161 slices) | `viewer/public/profile.json` |
| 2 | Model | `createObjectModel.ts`: upper = loft of superellipse rings (shaft boxier and narrower at the ankle, vamp domed), collar opening cut out, lining = inside of the same surface, gussets = faces inside the traced polygon (`measure_parts.json`), sole layer with arch + toe spring, stacked heel, insole, collar binding, strap pull tab | viewer `npx vite --port 5174` |
| 3 | Bug | Loft winding was inside-out (saw the tan lining from outside). Flipped triangle order | fixed |
| 4 | Compare | `compare.py` renders side/front/back/top/3q headless next to the 5 refs | `shots/compare.png` |
Open: vertical shading stripes on the side (photo-edge noise / bump), leather still too orange-light vs ref, ridge at the back centre (end-cap seam), jagged gusset edge, no burnish on the toe yet, front view toe should be flatter.

### 2026-10-07 round 2 (opus branch): fixes, checked against all 6 refs (sole view added to `compare.py`)
| Fix | Cause | What changed |
|---|---|---|
| Vertical stripes | linear interpolation between the 161 measured slices left a slope kink at every slice; clearcoat shows each kink as a band | Catmull-Rom interpolation + blur of widths (2x9 samples); top line blurred only lightly (5) so the collar dip/peak survive |
| Too orange/light | measured: render vamp (162,106,85) vs ref (101,61,52), same hue, 1.6x too bright | leather albedo #40211a, burnish #110706, exposure 1.2 -> 1.0 |
| Crease at the back, notch at the toe | top-view width tapers to a point at the heel (tab pixels) + a too-short end rounding zone | widths held from z -0.45 back, rounding zone heel 0.075 / toe 0.05; toe top line rolls down into the sole |
| Jagged gusset edge | gusset = whole triangles inside the traced polygon | leather seam tube laid on the surface along the outline (inverse of the loft), both sides |
| Sole black, tab orange | guessed colours | sole #3a2016, tab #4a281b |
Open: insole plain (no logo), fine leather grain/creases, stitch rows, gusset a bit narrow at the bottom vs ref, front view toe still slightly too bulbous.

- 2026-10-07: viewer is now split screen: matching reference photo left (copies in `viewer/public/refs`, local only), 3D right, view buttons on top (side/front/back/top/3q/bottom). `?solo=1` hides the photo (used by `compare.py`). Camera zooms out to fit the half-width pane.

### 2026-10-07 rounds 3-6 (opus branch), from the user's review in the split viewer
| Fix | Cause / how |
|---|---|
| Mirror twin vs the top photo | top-view centre line read with the wrong sign (top camera: screen right = -x); flipped in `profile.py` |
| Back curve (heel cup) + tulip back | side photo: back outline per height (`ends` in profile.json); back photo: width per height (BACK_W table, used at 70% because the photo is shot from above) |
| Toe ledge / ripples | outline squeeze removed at the toe; outline data blurred; toe rolls into the sole + almond sharpening in plan |
| Jagged gusset | gusset is now its own patch built inside the smoothed traced outline (cutting it from the leather followed triangle edges); top follows the collar; polygonOffset so the glossy leather under it does not show through (that was the shine) |
| Stitching | dashed thread rows (instanced capsules): beside the gusset (offset along the outline normal), collar edge, two rows on a raised back strap; split seam under the gusset down to the welt |
| Pull tab | flat woven strap swept along the traced loop (ExtrudeGeometry), ribbed matte |
| Too shiny | leather clearcoat 0.7 -> 0.3, env 0.9 -> 0.6, sole and collar glare reduced |
| Sole | narrower welt (0.005), dark edge, bottom texture (streaks, dark waist, debossed stamp), rubber top-lift |
| Inside the boot | new views `side2` (side-view.png, was unused) and `inside` (behind, 45 deg up); insole now fills the footbed, follows the floor, gold stamp reading bottom-to-top |
| Split viewer | photo left, 3D right, buttons for all 8 views |
Lesson recorded in Resources/3d-sculpting-lessons.md: next time build PART BY PART and use every photo.
Open: leather grain reads as a fine regular crosshatch up close; small hook at the gusset seam's top-back start; heel stack edge lines too regular; no lining seams inside.

### 2026-10-07 round 7 (final for now, user: 'you're good to go')
- Gusset seam hook fixed: the traced outline opens with a top segment (middle -> back corner); smoothing pulled the seam start toward the middle. Dropped those two points (`gRaw.slice(1, -1)`).
- Stitch: fine tonal thread #64402c, radius 0.0012, pitch 0.0075 (was orange and thick, then too dark to see).
- Heel stack: uneven lifts (random 22-38 px thick, own tone each, wavy glue lines), u runs around the heel.
- User decisions: leather grain is fine as is; no seams inside the boot for now.
- Round 8: gusset seam + stitch rows now run all the way up to the collar edge on both sides (outline ends extended along the edge's own slope to just under the collar; 4 evenly spaced points so the curve does not curl). User: everything else good.
- Round 9 (heel + sole): heel same width as the sole and overlapping into it (one unit); heel matte (no clearcoat, was the white flash), baked shadow toward the ground and on the front face under the arch; sole edge dark brown like the heel. Bug found: the black band was the sole texture's rim-darkening factor applied after the edge colour (x0.3), plus a bump map on a bottom-up planar uv, which has no vertical direction on the edge. Bump removed, edge colour applied last.

### 2026-10-07 tech pack (CB-001), modelled on the user's White2Label jacket tech pack (Downloads)
- `techpack\build.py` renders the views from the viewer, projects 3D callout points onto the images, writes `techpack\techpack.html` (4 A4 landscape pages: construction, views, measurements + grading EU 39-46, bill of materials + colour). `techpack\measure.py` = 26 points of measure off the model, scaled to an assumed 290 mm outsole (EU 43).
- Flats: viewer `?style=clay` = unlit white fill, black outline (offset back-face shell), grey gusset, no shadows (user: flats need no texture or shadows). `&zoom=1&fov=..&clean=1` for renders.
- Side-by-side page for photos: http://localhost:5174/split.html (3D left, tech pack right).
- User: no brand on it (Blue by Fable removed, style no CB-001). Flagged for checking: pull tab width (estimated), welt extension 1.4 mm, sole thickness 8.7 mm, Goodyear construction assumed. Local only, never published (refs are a competitor's photos).
- 2026-10-08 ~9:10 AM: phone access. Current model = C:\dev\img2threejs\chelsea-opus (round 9 + tech pack, newest). Started its Vite viewer on all interfaces, port 5175 (hidden window, log viewer\vite-phone.log): http://192.168.9.133:5175/ (same Wi-Fi) and http://100.95.213.66:5175/ (Tailscale). Tested from the PC only: all three answer 200; phone not tested. NOT published anywhere (textures come from the retailer's photos; private research only). Stop it: end the node process listening on 5175.
