---
tags: [resource, 3d, img2threejs, lessons]
up: "[[INDEX]]"
---
# 3D sculpting lessons (global, from the Chelsea boot test, 2026-10-06)
Framework for a real-person likeness (pipeline, tools, round loop): [[3d-likeness-framework]] and its canvas.

Project notes: [[Projects/img2threejs/STATE]] and its run-log. These lessons apply to EVERY object, not only the boot.

## Process (what the user wants)
- Infographic of the plan BEFORE each build round; tech pack and reference pictures first. Quality target: highly realistic (lighting and shaders), not low-poly.
- Ask which picture is the reference. The first boot test lost hours because the model followed retailer photos while the user had saved their own picture in `Pictures\`. Look in Pictures and show the reference in a browser tab to confirm.
- Show every step and every download in plain language (run-log tables).

- **Build part by part (user, 2026-10-07).** Do not build the whole object in one go. One part at a time (e.g. upper body, then back/heel cup, gusset, pull tab, sole, heel, insole, stitching), each checked against every reference view, including the views nobody thinks of (inside the shoe from behind at 45 degrees), before the next part starts.
- **Use every reference photo.** Each one must either drive a measurement or be a checked view; say which, and never leave one unused (the second side photo was forgotten on 2026-10-07).
- **Measure cross-sections from the back/front photos** (width per height) instead of guessing a taper: the back of a boot is a tulip curve, not a rounded box.

## Technical lessons
- **Shine is not colour.** White patches in a photo are specular highlights. Never use raw photo crops as albedo maps: clean them first (replace shine pixels: low saturation or very bright) or use a procedural map. Highlights come from clearcoat, roughness and lights.
- **Masks:** build silhouettes by flood-filling the near-white background from the border, not by a brightness threshold (that punched holes in highlights and corrupted the fit).
- **Fit shapes to silhouettes** (side, top, front) with smooth-unioned ellipsoids (+ boxes for straight parts, cutter boxes for underside): coordinate descent on IoU worked (side 0.97). Front photos are often perspective-distorted: take widths from the top view.
- **SDF bounds must contain the whole shape plus its radius.** If a primitive reaches past `bounds`, the mesh is cut off and left OPEN (hole at the back, missing front of the sole). Check bounds against every primitive's centre plus radius.
- **Generator gaps:** SDF (implicit) shapes get no UVs (add box UVs in the viewer); extrude has no bevel; `transform.scale` overrides `dimensions` (do not set it on unit primitives); texture maps from `referencePbr` load by URL (copy to `public/` and use `--url-prefix`, on Git Bash set `MSYS_NO_PATHCONV=1`).
- **Vertex paint** (`component.vertexPaint`) gives colour zones (burnish gradients, panels) with only 3 shapes: axis-band, ellipsoid, tapered-capsule. No polygon regions. Vertex colour multiplies the albedo map, so use a near-white albedo when painting.
- **Spec depth minimums are the pipeline's own estimate:** lower them only with an explicit user decision, and record it as an assumption.
- **Windows gotchas:** Python on Windows needs Windows paths (`C:/...`), not `/c/...`; set `PYTHONUTF8=1`; port 8765 belongs to the Ares assistant (use 8790 and 5173).
- **Vite viewer + three.js** setup is in the boot project (`chelsea\viewer`): copy it for the next object.

## Reuse next time
Scripts in `C:\dev\img2threejs\chelsea\`: `masks.py`, `fit_upper2.py` (silhouette fit), `measure_parts.py`, `make_crops.py` (shine removal), `author_spec.py` (spec writer), `run_material_evidence.sh`. Copy and edit part names and starting guesses.

## Likeness references: mouth closed (user, 2026-10-21)
- Model the head neutral with the MOUTH CLOSED (lips together, jaw relaxed). Shape references must also be mouth-closed, front AND side profile. A smile or open mouth moves the lips, jaw, chin, cheeks and eyes, so matching to it builds a different face.
- Smiling/talking photos are only for colour, hair, ears and accessories, never for face shape. Expressions come later as shape keys on top of the neutral head.

## MakeHuman target directions (measured 2026-10-21, don't guess)
- `l/r-eye-corner1-*` = OUTER eye corner, `corner2-*` = INNER corner. Hunter-eye tilt = corner1-up (corner2-up makes sad eyes).
- `eyebrows-angle-down` lowers the inner end and LIFTS the outer end; `eyebrows-angle-up` droops the outer end.
- Check a target by reading its .target.gz offsets against base.obj vertex x, not by name.

## Measured rounds only (user, 2026-10-21)
- Never throw in random changes. Measure the reference (ratios: facial thirds, widths, profile projection) and the model the same way, change only what the numbers say is off, and log model numbers next to the targets each round.
- Before each round, tell the user the actual requirements (target numbers + what will change) first. Example tracker: C:\dev\avatar\marlon\REQUIREMENTS.md.
- r15 is the warning: unmeasured "make it wider/stronger" overshot into a fat block face.

## Hair (Marlon r18-r19, 2026-10-21)
- **Blender particle hair, advanced mode:** `hair_length` is ignored; length = velocity (`normal_factor` 1.0 = 1 m). r18 grew metre-long strands and Cycles hung for an hour. Scale every velocity by the strand length.
- **Short hair must lie ON the scalp.** A world-space "down" lean makes strands hang off below the widest part of the head (bowl/helmet). Write strands yourself as a Curves object (`bpy.data.hair_curves.new`, `add_curves`, `position` + `radius` attributes): direction = growth direction projected onto the surface tangent, small lift at the root.
- **A fade is a length gradient, not a cut edge:** full length above the skull corner, shorter down to ~1.5 mm (#0-#1 guard), skin only at the bottom edge; scalp colour shows low in the fade. Place it in measured face units (nasion-menton), not guessed ones.
- **Texture = clumps:** tufts share a direction and the tips pinch toward the clump centre strand. Too strong (40 strands, 0.6) reads as curly; 15 strands / 0.3 read as a straight crop.
- **Hair colour:** compare hair/skin ratios and saturation with the photo (lighting cancels out). Bleach in linear RGB is about 1 : 0.57 : 0.29.

## Head shape (Marlon r19)
- Measure the front silhouette width at several heights (eye line to top) divided by cheekbone width, photo vs render. When no target matches the measured profile relative to the cheeks, add a shape key that scales x by the measured percentage per height.
- Normalise probes by the morphed mesh's own reference width: a target that scales the whole head looks like it helps but changes no ratio.
- Never put a comment in the middle of a line of dict entries: it silently comments out the rest (happened twice in one night).
