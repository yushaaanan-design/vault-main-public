---
up: "[[STATE]]"
tags: [img2threejs, chelsea-boot, analysis]
---
# Chelsea boot: what I see in the photos (image analysis, step 1)

Plain-language version of the 8-layer protocol. **Observed** = visible in the photos. **Inference** = my guess from how boots are made, not visible. Photos: `C:\dev\img2threejs\chelsea\refs\` (private research copies, see [[run-log]]).

## 1. What it is
A men's brown calf-leather **Chelsea boot**: ankle-high, no laces, a stretchy panel (gusset) on each side, a pull tab at the back. Plain (no cap-toe lines), soft almond toe, thin leather sole with a welt, low stacked heel. Domain: object (not a character). Confidence 0.95.

## 2. Overall shape
- Bilateral boot as a pair; each boot is asymmetric front-to-back (long toe box, short tall shaft).
- Measured from the profile photo (boot length = 1.0): total height with tab **0.59**, collar height about **0.48 to 0.53**, toe tip height about **0.09**, vamp height at 80% of the length about **0.165**, heel about **0.11** (eyeballed). So the boot is long and low at the front, tall at the back.

## 3. Parts, big to small (macro, meso, micro)
- **Macro:** upper (vamp + quarter/shaft as one shell), sole unit (outsole + welt + heel stack), gusset, interior/lining.
- **Meso:** collar binding, pull tab, gusset opening, heel counter, toe cap area, welt, outsole, heel stack, back seam.
- **Micro:** stitch rows (collar, gusset outline, welt, back seam), grain creases, gusset ribbing, heel lift lines.

## 4. How the parts join
- Gusset is *sewn under* the leather edge of the quarter (leather overlaps the elastic).
- Welt runs round the lower edge of the upper and the outsole is stitched to it.
- Heel stack sits under the heel seat, top flush with the welt.
- Pull tab is sewn into the back seam at the top of the collar.

## 5. Materials (PBR terms)
| Part | Look (observed) | Starting values (inference) |
|---|---|---|
| Upper | brown calf leather, semi-gloss, smoky dark at toe and heel | roughness 0.35, no metal, clearcoat low |
| Gusset | matte ribbed elastic, dark brown | roughness 0.85, fine ribbing in normal map |
| Sole + welt | dark brown leather, satin | roughness 0.5 |
| Heel stack | layered dark leather, edge-burnished | roughness 0.55 |
| Lining | light tan leather | roughness 0.6 |
| Pull tab | brown woven webbing, matte | roughness 0.9 |

## 6. Colour and finish
Mid-value warm brown (hue about orange-brown), with a hand-antiqued gradient: darker at toe tip, heel counter and edges, lighter in the middle of the vamp. Soft sheen, not a mirror gloss, with a brighter hotspot on the toe cap.

## 7. What makes this boot THIS boot (identity features)
Gusset shape and position, plain almond toe with dark burnish, pull tab, thin welt + stacked heel proportions, deep brown with antique gradient. A brand stamp ("LEXA") is on the insole and outsole: **ignored** (exact branding not required).

## 8. What the photos do NOT show
Inside of the shaft below the lining, gusset thickness, sole thickness at the arch, true scale (no ruler), real leather colour (the photos look studio-lit and possibly lightly retouched). The sole photo is tilted, not a flat bottom view.

## What I filled from my own knowledge (you asked me to bring the data)
The photo set gives shape and colour but not construction facts, so these come from general footwear knowledge (**inference, not measured**, verify later if it matters):
- Goodyear/Blake-welted dress boots: welt about 3 mm proud, sole about 5 mm thick at the forepart, heel about 25 to 30 mm for this style.
- Real size assumption: UK 9 / EU 43 foot, boot length about 29 to 30 cm, shaft height about 14 to 15 cm.
- Chelsea gusset: elastic about 6 to 7 cm wide at the top, tapering to the welt.
The local spec search (BM25 over the skill's own notes) found nothing about footwear (3 irrelevant hits), so this note is the evidence source for the spec.
