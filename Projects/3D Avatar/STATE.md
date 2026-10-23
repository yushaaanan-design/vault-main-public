---
tags: [project, 3d, blender, avatar]
up: "[[INDEX]]"
---
# State: 3D Avatar (Marlon test character)

Part of the 3D business (see [[Business]]), but this is a TEST TRIAL, not commercial (user, 2026-10-21).

**Goal (user):** PS2-style, full-body, rigged character of the real Twitch streamer Marlon, with a technical guide, then front/back/side references and onward. Resemblance in PS2 style, not a photoreal copy.

**Code and files:** `C:\dev\avatar\marlon\` (outside the vault). Guide: `C:\dev\avatar\marlon\TECHNICAL-GUIDE.md`. Plan page: `C:\dev\avatar\plan.html`.

## Where it stands (2026-10-21, v0.6)
- Built by `build_marlon.py` in Blender 5.2.2 (headless): 3,110 triangles, 22 Mixamo-named bones, shape keys Blink/Smile/JawOpen, GLB export.
- 6 self-review rounds against reference frames from his YouTube channel (London Fashion Week video).
- Honest: body, rig and outfit work; the face is still generic, likeness needs a photo face texture.

## Next
1. User approves the reference frames (`refs\picked_sheet.jpg`).
2. Face texture from his front photo (UVs, projection, clean-up) + hair texture.
3. Long coat variant; Three.js viewer with shape-key sliders and a Mixamo idle.

## Rules for this project
- Read [[Resources/3d-sculpting-lessons|3D lessons]] first. Plan infographic before each build round.
- Reference video and frames are private reference only; never share or publish them.
- Never make the character say or do things presented as the real person.
- Project colour (graph group, Graph Legend row, project-colors.css) not added yet.

## Update 2026-10-21 night: v2 realistic (supersedes v0.6)
User rejected v0.6 as not realistic. Rebuilt on MPFB (MakeHuman) + CC0 asset pack, 6 review rounds vs the reel close-up and his photo. r6 = realistic tan skin, lean face, bleached crop, chain, stud, Mixamo rig, 58.6K tris, GLB. Script C:\dev\avatar\marlon\build_marlon_v2.py, renders C:\dev\avatar\marlon\out_v2\r6\sheet.png. Next: photo face texture for likeness, outfit, animation.

## Rule (user, 2026-10-21)
- Neutral head, mouth closed. Only mouth-closed photos (front and side profile) count as shape references; smiling/talking shots are for colour and hair only. See [[Resources/3d-sculpting-lessons|3D lessons]].

## Update 2026-10-21 afternoon: r7-r14
Buzz-cut shell with a straight line-up replaces the hair mesh. User rule: mouth closed; shape matched only to closed-mouth refs (refs/closed_picked, picked by tools/find_closed_mouth.py). Latest: out_v2/r14/face_sheet.png. Next: skin texture match, lower lip, back of head, a clean closed-mouth side profile reference (ask user or scan more videos).

## Update 2026-10-21 evening: r15-r17 (user's 4 closed-mouth photos)
User sent 2 left profiles, 1 right profile, 1 front (all mouth closed): saved in C:\dev\avatar\marlon\refs\user_profile\. User notes: top of head NOT narrow, wide cheekbones, muscular jaw, perfect symmetry, more realism, hunter eyes, brows tilted up at the outer end, wide muscular neck, wide shoulders, confident look, eyes were too narrow.
Done: hunter-eye tilt (fixed a wrong target: corner1 = outer corner), outer brow lifted, wider skull top and cheekbones with hollows, stronger jaw/chin/nose in profile, wider neck and shoulders, more muscle, Cycles GPU render, hair volume on the crown, stubble shell, symmetry measured (mean 0.001 mm). Latest: out_v2/r17/face_sheet.png.
Next: stubble visible but fine, hair silhouette (flat top, not a cap), lips colour, skin realism (pores/texture).

## Rule + tracker (user, 2026-10-21 night)
Measured changes only; show the requirements before each round. Tracker: C:\dev\avatar\marlon\REQUIREMENTS.md (target ratios from the user's photos vs each round). r18 running.

## Update 2026-10-21 late: r19 (curves hair, skull flare)
r18 hang fixed (1 m particle strands). Hair is now a Curves object built strand by strand (lies on the scalp, real fade from his side photo, clumps, his bleach hue). SkullWidth shape key gives the measured flare above the temples. User: hair "pretty good"; next: face more harmonic and handsome, skin more vibrant. Targets for r20 are in C:\dev\avatar\marlon\REQUIREMENTS.md ("Next round"): eyes (height 0.31 -> 0.35, tilt 7.7 -> 6.3), face w/h, chin tip (shape key), crown rounding, skin +16 % saturation, goatee. Latest: out_v2/r19/face_sheet.png.

## Update 2026-10-21 night: r20 (eyes, brows, skin, Adam's apple)
Eyes bigger and opener, brows at his height, tilt near his, skin more vibrant, Adam's apple. Numbers: C:\dev\avatar\marlon\REQUIREMENTS.md "r20 results". Still open: eye width -4 %, chin tip (needs a shape key), goatee, crown rounding, profile jaw line. User (2026-10-21): PS2 look is applied LATER as a filter pass; build likeness at full quality first. Framework + canvas done: Resources/3d-likeness-framework.md/.canvas, kit C:\dev\avatar\kit.

## Update 2026-10-21 night: r22 (normal haircut)
User: normal haircut first, no fade or line-up; he will mark fades later. Hairline is one natural line round the head (HAIRLINE params in the build script), front at his measured height. Brows = eyebrow009, lips pink, head length matched in profile. Sheet out_v2/r22/face_sheet.jpg. Next: user marks fades; open items in REQUIREMENTS.md.

## Update 2026-10-21 late night: r23 (r19 face restored)
User: r19 face was perfect (strong look); r20-r22 eye/brow changes reverted. Kept: head length fix, normal haircut, skin vibrance, pink lips, Adam's apple. Next: side profile fixes (user to point them out; candidates: jaw line merging into the neck, goatee missing, forehead slope).

## Update 2026-10-21: r24b (side profile)
Chin pulled back to his profile (prominent/prognathism off, prominent-decr 0.70); brow ridge kept for the strong look. Profile within 0.02 u of his except brow ridge +0.037 and lips +0.05. Open: lips slightly forward in profile, goatee, front looks a bit softer than r19 (likely the higher natural hairline + lighter skin/pink lips, not geometry: test if the user agrees).

## Update 2026-10-21: r25 (user rule: KEEP THE R19 FACE)
User (2026-10-21): every face change after r19 made it worse; do not change the face. He will send a frontal diagram for what comes next. Hair edits come from his marked drawings (side: refs/user_marks/r24_side_temple_line.jpg, built into HAIRLINE side_marks). Open question to him: keep or revert the r20 skin tint, r21 pink lips, Adam's apple.

## Update 2026-10-21: r26
r19 face + r19 front line-up; side hairline = straight vertical (1 cm behind the user's mark) then a smooth curve round the ear (HAIRLINE outline in the build script). Waiting for the user's frontal diagram.

## Update 2026-10-22: r27 (face shape untouched)
r27d: "Italian mogger" groomed circle goatee (was: goatee + stubble, chin/cheek 0.630 vs his 0.668), little fade on sides/back only, textured matte skin (micro 0.016 vs his 0.015), slim gold rectangle glasses with translucent gold lenses from the user's photo (MARLON_GLASSES=0 to hide). Latest sheet out_v2/r27d/face_sheet.jpg. Front line-up unchanged. Sheet out_v2/r27/compare.jpg. Next: user review; then body (wide shoulders, muscle), outfit, animation, PS2 filter.

## Update 2026-10-22: r28 body + outfit
Face passed (r27d). Body widened with region targets only, outfit from the user's shop page (black or white crewneck, grey glen check, wine suede horsebit loafers). Sheet out_v2/r28/body_sheet.jpg. Next: user picks top colour; open items: ankle crop, belt, per-foot horsebit before animation.

## Update 2026-10-22: r29
Arms down (84 deg) with soft elbows, white tee, dark brown trousers, brown leather jacket (casualsuit05 jacket only), gold chain. Sheet out_v2/r29/sheet.jpg. Open: side specks, inner-thigh sliver, boxy jacket shape (only jacket in the MakeHuman pack).

## Update 2026-10-22: r30
Fitted open biker jacket (shorter, white tee showing), traps, natural shoulders (clavicle bones lowered). Rule (user): keep clothes/accessories as separate objects, never merge into one mesh; only basic physics needed later (cloth sim on the jacket, maybe hair/chain jiggle). Sheet out_v2/r30/sheet.jpg.

## Update 2026-10-22: r32
All pieces are separate named objects (Human, Jacket, Tee, Pants, Shoes, Chain, Sunglasses, HorsebitLeft/Right, hair and beard); 3-pose movement test keyed and rendered (out_v2/r32/move_sheet.jpg); GLB carries the test action. Next: user review; then basic physics (jacket cloth, chain sway) and Mixamo animations.

## 2026-10-23
- User: the Marlon avatar is done. Removed from the Central To-Do List.
