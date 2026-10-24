---
name: project-seragam-lapangan-sinergi
description: "Three long-sleeve field-uniform designs for Sinergi (23 Oct 2026): Navy Eksekutif, Sport Raglan, Hi-Vis Tropis; the brief, choices to confirm, files and build script; waiting for the team to pick one"
metadata:
  node_type: memory
  type: project
  originSessionId: 20f37a9e-9854-4520-827d-1803018ea6f8
  modified: 2026-10-23T04:23:00.094Z
---

On 23 Oct 2026 a coworker asked Bryan for several new designs for the engineers' field uniform. The previous one had been
judged not good-looking: a navy shirt with a grey yoke, light-grey piping, and the name and company in small boxes, drawn
in CorelDRAW in March 2025. The brief: every shirt long-sleeved, carrying the SSS logo and "PT Sinergi Sarana Solusi".
Bryan asked for 3 designs clearly different from the current one but suited to engineers on site.

The files are in `Laporan Sinergi\Seragam\`: one PDF (an overview page plus one board per design) and four JPGs for WhatsApp.
1. **Navy Eksekutif**: solid navy, concealed placket, cobalt inside the collar and as piping along the back yoke, 2.5 cm segmented reflective tape on the forearms.
2. **Sport Raglan**: navy body, cobalt raglan sleeves with 3 mm reflective piping in the seams, stand collar, slanted plastic-zip chest pockets, underarm mesh, navy elbow patches.
3. **Hi-Vis Tropis**: fluoro orange on top and navy below, 5 cm reflective hoops around the body and arms, and a cape-back vent. It is modelled on Australian two-tone cotton-drill hi-vis shirts.

These are my choices, and the team may change them. The flag is on the wearer's right sleeve and K3 on the left. The worn
shirt in his photo has the flag on the right, but the March 2025 CorelDRAW file has it on the left. The example name is
"BRYAN". The website www.3s-tech.co.id is left off the back because it wasn't in the brief. The chest lockup is the icon plus
"PT. SINERGI / SARANA SOLUSI", 9.1 × 2.2 cm with 5.6 mm letters. The back has a logo of about 10 cm and a 28 cm name.

Fabric advice is printed on every board: 100% cotton drill at about 160–200 g/m², no polyester blends for electrical work
because polyester melts, and plastic buttons and zips. OSHA 1910.269 bars polyester, nylon, acetate and rayon for workers
exposed to arcs or flame unless the fabric is treated. A plain cotton shirt is still not arc-rated PPE. Design 3 is only
"hi-vis style" unless its fabric and tape are ISO 20471 certified.

**Suitability check (24 Oct 2026).** Bryan asked whether the designs fit the actual work: DC electrical PM (UPS,
battery, ATS-AMF LVMDP, ACB), FSS, distribution trafo/kubikel PM, gardu sites, and meetings at PLN/Icon Plus. My answer was
"partly". None of them is arc-rated PPE, and none needs to be: it is the base layer under arc-rated clothing for energized
work. But I had put meltable synthetics on them, contradicting the no-polyester advice: standard reflective tape (worst on
design 1's forearms and design 3's 5 cm hoops), polyester mesh (designs 2 and 3), a nylon zip (design 2), and polyester
embroidery thread and patches. I proposed an "aman listrik" revision of all three and am waiting for his yes: FR reflective
tape or no tape, mesh replaced by covered cotton vents, button flaps instead of zips, cotton thread, and an ID-card loop for
DC access. Ranking: design 1 fits best (indoor panel rooms and meetings), design 3 only for outdoor or near-vehicle sites, and
design 2 needs the most changes. I found no official PLN rule on contractor wearpacks, so the team's K3 officer should confirm it.

**Why:** the team will pick a design and ask for revisions, and the konveksi will need vector files.

**How to apply:** run `python buat_seragam.py` in `Seragam\_Sumber\` to rebuild every file. It overwrites files with the same name, so move old ones to `_Arsip\` first, or pass a folder to test elsewhere. Colours, the
name and the marker positions are constants at the top and in `DESIGNS`. It needs Pillow and Chrome. Chrome won't find Source Han Sans by
name, so the CSS loads it with `url('file:///C:/Windows/Fonts/…')`. Once a design is chosen, the next step is a vector file for the
konveksi with the text converted to curves, as in [[project-stiker-helm-sinergi]]. Related: [[project-spanduk-k3-sinergi]],
[[reference-folder-layout]].
