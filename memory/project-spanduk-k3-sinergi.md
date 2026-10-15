---
name: project-spanduk-k3-sinergi
description: "K3 \"HATI-HATI sedang ada pekerjaan\" site banner (100x50 cm) for Sinergi, 15 Oct 2026: only the Peremajaan one is used, v2 has a blue title band; layout choices, files"
metadata:
  type: project
---

On 15 Oct 2026 a coworker asked Bryan for a yellow-and-black K3 banner, 100 × 50 cm, modelled on a blurry
online-shop example. Two titles were made first, but the team chose to use only
"Peremajaan Peningkatan Kap Power Wing A DC PLN Kantor Pusat". The current file (PDF vector + JPG 150 dpi,
5907×2952 px) is in `Laporan Sinergi\Spanduk\`. `_Arsip\` holds v1 of it and the unused
"[EMERGENCY] Recovery Gangguan Link ICON+ GI Sunyaragi" banner.

Layout (v2), top to bottom: job title (2 lines, white on a full-width SSS-blue #003399 band) → SSS logo | HATI-HATI
(red, black outline) | K3 logo → SEDANG ADA / PEKERJAAN / PROYEK → PT. SINERGI SARANA SOLUSI in SSS blue.
Hazard stripes top and bottom, Arial Black, background #FFD400. Gaps between blocks measure 1.7–1.8 cm.

Corrections from the team (15 Oct 2026): make the job title a little bigger and give it a stronger colour for emphasis.
Bryan picked the blue band with white text over black/red bands. The title went from 3.57 to 3.96 cm (+11%). That is
about the limit: the longest line already ends 4 cm from each edge. v1 had black title text and a black rule under it.

Bryan's choices: the SSS logo replaces the example's worker icon, mirroring the K3 logo beside HATI-HATI.
"Kap" stays as written, not "Kapasitas". The company name uses "PT." because the company's own documents do.
The K3 logo was drawn from the official description (green cross ringed by an 11-tooth green gear, white inside).
The SSS logo is a vector redraw of the IOM file's PNG (see [[project-iom-genset-sss]]), matching it at 99% overlap.

**Why:** more revisions, or banners for other job titles, are likely.

**How to apply:** at his choice, the build script is saved in `Spanduk\_Sumber\` (`buat_spanduk.py` + `sss_logo.py`;
needs pymupdf, Pillow, Chrome). For a new title, add it to the `SPANDUK` list and run `python buat_spanduk.py`. That
rebuilds every listed banner and overwrites files with the same name, so move the old version to `_Arsip\` first.
Pass a folder as an argument to test elsewhere first. Related: [[reference-folder-layout]].
