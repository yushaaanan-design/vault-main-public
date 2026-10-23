---
tags: [resource, 3d, framework, likeness]
up: "[[INDEX]]"
---
# 3D likeness framework (real person from photos)

Distilled from the Marlon build (r1-r20, 2026-10-21; [[Projects/3D Avatar/STATE|3D Avatar]]). Map: [[3d-likeness-framework.canvas]]. Kit (tools, template, commands): `C:\dev\avatar\kit\README.md`. Detailed lessons: [[3d-sculpting-lessons]].

Goal for the next figures: likeness in a few measured rounds, not twenty. Stylisation (PS2 look) is a separate pass at the END, on top of a correct model.

## 1. Intake (before any build)
- Photos: front + left + right profile, MOUTH CLOSED, neutral, same haircut if possible. Smiles and open mouths are for colour and hair only.
- Ask the user which photos are the references; note what differs between shoots (haircut, camera distance).
- Write down the user's words about the person (e.g. "wide cheekbones", "hunter eyes", "mogger") as checks, not as changes.

## 2. Measure the person (fill REQUIREMENTS.md)
| What | Tool | Notes |
|---|---|---|
| Front ratios: thirds, face w/h, jaw/cheek, eyes, nose, mouth, chin, brows | `face_ratios.py` | ratios only, so photo and render compare directly |
| Head width per height | `head_widths.py` | flood-fill the background from inside the photo frame, away from hair |
| Profile: head length/height, nose, ear, jaw corner (u = nasion-menton) | `grid.py` | the PROFILE decides head size; a front photo is distorted by haircut and camera |
| Hair and skin colour | patch means | hair/skin RATIOS and HSV saturation, so lighting cancels |
| Hair fade | grid on the side photo | bottom (skin) and top (full length) in u above the nasion |

## 3. Know the controls (probe, never guess by name)
- `target_probe.py`, `width_probe.py`, `eye_probe.py` measure what a target does on the base mesh, per unit, in the same ratios as step 2.
- Known MakeHuman directions: corner1 = OUTER eye corner, corner2 = inner; `push1-in` pulls the outer corner in 11 %/unit; `height2-incr` opens the eye 28 %/unit; `eyefold-down` and `eyebrows-trans-down` close the eye; `eyebrows-angle-down` lifts the brow tail; `head-scale-vert-decr` squashes the WHOLE head, face included; `head-oval` narrows the upper head relative to the cheeks; `chin-width-decr` barely moves the chin landmark.
- Normalise probes by the morphed mesh's own reference (cheek width), or a uniform scale looks like a fix.
- When no target can do it: a shape key with the measured profile (SkullWidth), or edit the proxy mesh (brow lift, iris cap). Shape-key data overrides `v.co`.

## 4. Round loop
1. Show the user the target numbers and the planned changes (from steps 2-3).
2. Change only what is off, sized from the probe (needed % / effect per unit).
3. Quick test: face shots only, strands off (`MARLON_SHOTS`, `MARLON_STRANDS`), ~15 s per shot.
4. Measure the render with the same tools; fill the round column; look at a side-by-side sheet too (numbers miss "staring eyes", "popcorn hair").
5. Log in REQUIREMENTS + run-log; ask the user to review.
- Interacting changes: one control can move several ratios (brows move the middle third and face w/h; removing a target can already do what you planned to add). Re-measure before correcting twice.

## 5. Hair (short crops)
- Hairline as a closed side-view outline (straight segments + Chaikin-smoothed curves) with a signed distance; subdivide the scalp mesh near the line, or ~1 cm faces turn diagonals into a zigzag.
- User drawings beat descriptions: when the user marks a line on a render, template-match the screenshot to the render, convert the stroke to world coordinates with the render camera, and build the shape from those points (Marlon r25: hairline matched his line on the first try).
- Start with a NORMAL haircut (user, 2026-10-21): one natural hairline round the head (by azimuth: forehead at the person's measured height, ~6.5 cm above the glabella; temple points; sideburns to mid-ear; arc over the ear; nape), uniform length (sides a bit shorter), soft 3 mm edge. Fades and line-ups only where the user marks them.
- Measure hairline height with the SAME tool on photo and render (the mesh nasion is ~0.1 u below MediaPipe's).
- Brows/lashes: pick the closest stock asset by measuring all of them (contact sheet + thickness), don't scale the brow mesh (it arches).
- Curves object written strand by strand: root on the scalp shell, direction = growth direction projected onto the scalp (top forward, sides/back down), lifted at the root, flat at the tip. Not particle hair (advanced mode takes length from velocity; a world-space lean hangs off the head).
- Fade = length gradient in u: full above the skull corner, ~25 % (#0-#1 guard) at the bottom, scalp shell opaque by a third of the band, darker scalp colour low in the fade, diagonal hairline in front of the ear, smooth side-to-back blend.
- Texture = clumps of ~15 strands, pull 0.3 (40 / 0.6 reads curly). Colour from the photo's hair/skin ratio and hue.

## 6. Pitfalls that cost hours on Marlon
- Lock what the user approves. Once the user calls a version right (Marlon r19 face), freeze it and change only what he asks for; five rounds of "closer to the photo ratios" (r20-r24) were all rejected.
- Ratios are not the whole likeness: matching eye size and brow height to the photo (r20-r22) lost the "strong look" the user saw in r19, and he reverted. Keep a version the user calls right, and check the overall look (character, expression) with the user before chasing more ratios.
- Unmeasured "make it stronger" (r15 fat block face). Measure first.
- Landmark searches without a body-part window (the chin finder picked a toe).
- A comment pasted mid-line comments out the rest of a dict line (happened twice).
- Long hangs: if a render takes 10x the usual time, kill it and test with the new feature off.
- Front photo for head height (other haircut, camera). The profile wins.

## 7. Later passes
- Stylise (PS2): decimate, small textures, simpler shading as a filter on the finished model.
- Expressions as shape keys on the neutral head; the rig is already Mixamo-named.
