---
tags: [content-creation, 3d, threejs, reel-analysis]
up: "[[Content Creation]]"
---
# Frame-by-frame analysis of two 3D reels (2026-10-23)

Files (private reference, outside the vault): `C:\dev\reels-3d\<id>\<id>.mp4`, contact sheets (2 fps, timestamped) in `<id>\s\`, 4 fps thumbs in `<id>\f\`. Downloaded with yt-dlp via the reel-bot venv; Python lacked a Windows root CA, so `C:\dev\reels-3d\dl.py` points certifi at an export of the Windows root store (`win-roots.pem`). Verification stays ON.

## Reel A: DewpdMXJrwB (39.3 s, 1080x1920) "12 Claudes judge your idea" (AI-tools account)
Look: low-poly box/voxel characters, one warm courtroom, bloom, dust, shallow depth of field.
Structure: ~16 shots, 1.5-3 s each, hard cuts, one camera per beat.
| t (s) | Shot | Graphic device |
|---|---|---|
| 0-3.5 | Judge bench, bulb on pedestal ("your idea") | title card, JURORS counter 1 to 12, "ON TRIAL" stamp |
| 4-6.5 | Witness monitor + clerk: "always says yes" | speech bubbles "GREAT IDEA / LOVE IT" |
| 7-8.5 | Two orange boxes on a circular stage, "VS" | VS slams in with sparks |
| 8.5-13 | Lawyer 1 (fail) then lawyer 2 (work) at desks | FAIL / WORK stamps, label cards |
| 13.5-17 | Jury box, 12 colour-coded jurors vote | cards red/green, VOTES counter 5 to 12 |
| 17.5-19 | Blind vote: dividers + blindfolds | "NO PEEKING AT VOTES" |
| 19.5-25.5 | 12 different people: roles tagged | "CHEAT CODE" label |
| 26-30 | Verdict on bench | VERDICT stamp, document |
| 30.5-32.5 | "Saves you a year": calendar, paper pile flying at camera | MONTHS LOST 12 to 0, SAVED stamp |
| 33-39 | Back to bench, CTA: comment a keyword | FREE stamp, typing UI, IG notification |
Constant layers: top paper-ribbon title that changes per beat, word-by-word captions on tape-style tags (about 4 words/s), HUD counter chips top right.
Verdict: **fully doable in Three.js.** Boxes + MeshStandardMaterial, 2-3 lights, UnrealBloom, light DOF, HTML/CSS overlays for ribbon/captions/stamps/HUD (stamps = scale-rotate slam in 150 ms), a camera-per-beat timeline, voice by TTS (Kokoro is installed). Characters are reusable: only the script and prop set change per reel. Use our own original characters, not the reel's.

## Reel B: DepByE0CGZ1 (66.5 s, 1080x1920) "He punched the Sun" Part 2 (physics-explainer account)
Look: cinematic space, photoreal bodies, glowing outline human figure, big bloom.
Core mechanic: a "PUNCH POWER" counter that **doubles every 1.0 s of video** (201 septillion J at 2.5 s, 284 at 3.0 s: x1.41 per 0.5 s), with a unit line and a status chip that changes (MOON'S BIGGEST CRATER, MOON: SHATTERED, MARS: DESTROYED, ENOUGH TO DESTROY EARTH, SATURN, JUPITER, SUN: SURVIVES, SUN: DESTROYED, THE SUN'S WHOLE LIFETIME).
Beats: Earth 0-2.5 | Moon approach 2.5-5, crater 5-9, zoom out 9-12, shatter 12-14.5 | Mars 15-20 | back to Earth 20.5-27 | Saturn 27.5-34.5, rings | Jupiter 35-40.5 | Sun 41-48 (granulation cells close up), "10 seconds later 800x stronger" 48-54 | Sun explodes 55-60 | blue shockwave 60-66.5, CTA "Follow for Part 3".
Repeating shot grammar (every body): approach with the figure tumbling in, surface close-up (texture rushing), impact flash, shock ring around the impact point, crater glow + debris particles, zoom out, fracture glow, expanding noisy shell, cut to next body.
Verdict: **doable in Three.js, harder, about 75-85 % of this look** (unverified how the original was made). Needs: public-domain planet textures (Earth day+clouds, Moon, Mars, Sun), Saturn ring alpha texture, procedural banded Jupiter, atmosphere rim shader, emissive stick-figure (capsules) with rim glow, Voronoi cell shader for the Sun, shock-ring and fbm-displaced blast-shell shaders, particle debris, bloom. Counter and subtitles are HTML. Hard parts: the volumetric-looking blast shells and the fracture cracks; both can be faked with shaders.

## Render pipeline (both)
Deterministic frame stepping in headless Chrome (Playwright) at 1080x1920 / 30 fps, screenshot per frame, ffmpeg encode with the voice track. RTX 3060 is enough. The HyperFrames skill is an alternative driver (HTML composition to video).

## Applying to products
Existing asset: the Chelsea boot (`C:\dev\img2threejs\chelsea-opus`, Three.js, private refs, never published). Reel A style fits a "verdict / stamp" product story; Reel B style fits a "zoom through scale / counter" story. Open: which reel style first, which product, voice yes/no.

## Reference images (timestamped contact sheets, 2 fps, 6 x 4 frames each)
Files live in `references/3d-js-reels/`. Source mp4s stay outside the vault in `C:\dev\reels-3d\`. Private style reference only, never published.

### Reel A: courtroom (0-39 s)
![[references/3d-js-reels/A-courtroom-sheet1.jpg]]
![[references/3d-js-reels/A-courtroom-sheet2.jpg]]
![[references/3d-js-reels/A-courtroom-sheet3.jpg]]
![[references/3d-js-reels/A-courtroom-sheet4.jpg]]

### Reel B: punching planets (0-66 s)
![[references/3d-js-reels/B-punch-sun-sheet1.jpg]]
![[references/3d-js-reels/B-punch-sun-sheet2.jpg]]
![[references/3d-js-reels/B-punch-sun-sheet3.jpg]]
![[references/3d-js-reels/B-punch-sun-sheet4.jpg]]
![[references/3d-js-reels/B-punch-sun-sheet5.jpg]]
![[references/3d-js-reels/B-punch-sun-sheet6.jpg]]

Sources: A = instagram.com/reel/DewpdMXJrwB (AI-tools account), B = instagram.com/reel/DepByE0CGZ1 (physics-explainer account). Post metadata: `A-info.json`, `B-info.json`.
