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

Settled 24 Oct 2026 (Bryan left both to me): the flag is on the wearer's right sleeve, matching the shirt the team wears now, and K3 is on the left. The name sits on the right chest, the standard spot, with the placeholder "NAMA" (it was "BRYAN" in v1). The website www.3s-tech.co.id is left off the back because it wasn't in the brief. The chest lockup is the icon plus
"PT. SINERGI / SARANA SOLUSI", 9.1 × 2.2 cm with 5.6 mm letters. The back has a logo of about 10 cm and a 28 cm name.

Fabric advice is printed on every board: 100% cotton drill at about 160–200 g/m², no polyester blends for electrical work
because polyester melts, and plastic buttons and zips. OSHA 1910.269 bars polyester, nylon, acetate and rayon for workers
exposed to arcs or flame unless the fabric is treated. A plain cotton shirt is still not arc-rated PPE. Design 3 is only
"hi-vis style" unless its fabric and tape are ISO 20471 certified.

**Suitability check and revision (24 Oct 2026).** Bryan asked whether the designs fit the actual work: DC electrical PM
(UPS, battery, ATS-AMF LVMDP, ACB), FSS, distribution trafo/kubikel PM, gardu sites, and meetings at PLN/Icon Plus. My
answer was "partly". v1 had meltable synthetics that contradicted its own no-polyester advice: standard reflective tape,
polyester mesh, a nylon zip, and polyester thread. With his yes, all three became "versi aman listrik":
- FR reflective tape and piping, with plain cotton piping as the fallback for design 2.
- Stitched eyelets instead of mesh, and a cape-back gap with no mesh.
- Slanted welt pockets with hidden buttons instead of zips.
- Cotton sewing and embroidery thread, cotton patches, and melamine buttons (the usual FR-shirt button).
- A fabric ID-card loop on every design.

Every board says the shirt is a base layer, and energized work still needs arc-rated clothing over it. v1 files are in
`Seragam\_Arsip\` with the suffix "(v1 23 Okt)". Ranking: design 1 fits best (indoor panel rooms and meetings), design 3
only for outdoor or near-vehicle sites. The wearpack question is answered by his own files. The Aug 2026 BA Rapat Penjelasan RKS (DC PLN Pusat) and the KOM deck
require only "Seragam" and "Sepatu Safety" for the Engineer On Site; no wearpack is named. Sinergi's own SOP/MOP/EOP require
"baju/pakaian tahan api" for trafo and kubikel PM, cubicle faults, and genset hot refueling. Whether the team owns FR clothing
for those jobs is still open.

**Why:** the team will pick a design and ask for revisions, and the konveksi will need vector files.

**How to apply:** run `python buat_seragam.py` in `Seragam\_Sumber\` to rebuild every file. It overwrites files with the same name, so move old ones to `_Arsip\` first, or pass a folder to test elsewhere. Colours, the
name and the marker positions are constants at the top and in `DESIGNS`. It needs Pillow and Chrome. Chrome won't find Source Han Sans by
name, so the CSS loads it with `url('file:///C:/Windows/Fonts/…')`. Once a design is chosen, the next step is a vector file for the
konveksi with the text converted to curves, as in [[project-stiker-helm-sinergi]]. Related: [[project-spanduk-k3-sinergi]],
[[reference-folder-layout]].
