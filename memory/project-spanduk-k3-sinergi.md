---
name: project-spanduk-k3-sinergi
description: "K3 \"HATI-HATI sedang ada pekerjaan\" site banners (100x50 cm) made for Sinergi on 15 Oct 2026: two job titles, layout choices, where the files are"
metadata:
  type: project
---

On 15 Oct 2026 a coworker asked Bryan for a yellow-and-black K3 banner, 100 × 50 cm, modelled on a blurry
online-shop example. Two banners were made, identical except for the job title:
"Peremajaan Peningkatan Kap Power Wing A DC PLN Kantor Pusat" and "[EMERGENCY] Recovery Gangguan Link ICON+ GI Sunyaragi".
Files (PDF vector + JPG 150 dpi, 5907×2952 px): `Laporan Sinergi\Spanduk\`.

Layout, top to bottom: job title (2 lines) → black rule → SSS logo | HATI-HATI (red, black outline) | K3 logo →
SEDANG ADA / PEKERJAAN / PROYEK → PT. SINERGI SARANA SOLUSI in SSS blue (#003399). Hazard stripes top and bottom,
Arial Black, background #FFD400. All gaps between blocks measured at 1.8–2.0 cm.

Bryan's choices: the SSS logo replaces the example's worker icon, mirroring the K3 logo beside HATI-HATI.
"Kap" stays as written, not "Kapasitas". The company name uses "PT." because the company's own documents do.
The K3 logo was drawn from the official description (green cross ringed by an 11-tooth green gear, white inside).
The SSS logo is a vector redraw of the IOM file's PNG (see [[project-iom-genset-sss]]), matching it at 99% overlap.

**Why:** revisions or more banners with other job titles are likely.

**How to apply:** at his choice, the build script is saved in `Spanduk\_Sumber\` (`buat_spanduk.py` + `sss_logo.py`;
needs pymupdf, Pillow, Chrome). For a new title, add it to the `SPANDUK` list and run `python buat_spanduk.py`. That
rebuilds every listed banner and overwrites files with the same name. Pass a folder as an argument to test elsewhere first.
Related: [[reference-folder-layout]].
