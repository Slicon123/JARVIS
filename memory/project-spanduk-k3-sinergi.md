---
name: project-spanduk-k3-sinergi
description: "Three K3 site-banner designs for Sinergi (15 Oct 2026): HATI-HATI (Peremajaan job), UTAMAKAN K3, KAWASAN TERTIB K3; sizes, logo sources, Bryan's choices, build scripts"
metadata:
  type: project
---

On 15 Oct 2026 a coworker had Bryan design K3 banners from blurry online-shop examples. The brief: flat
vector, not a 1:1 copy, and not blurry. Final files (PDF vector + JPG) are in `Laporan Sinergi\Spanduk\`.
Older versions are in `_Arsip\`. The build scripts are in `_Sumber\`.

1. **HATI-HATI**, job "Peremajaan Peningkatan Kapasitas Power Wing A DC PLN Kantor Pusat". 400×80 (print 1) and 100×80
   (print 2). Yellow with hazard stripes. Job title in white on a full-width SSS-blue band. K3 logo | HATI-HATI (red) |
   K3 logo, then SEDANG ADA PEKERJAAN / PROYEK and PT. SINERGI SARANA SOLUSI. A white strip carries the logos
   PLN · PLN Icon Plus · TAB Solutions · SSS. The team set this order on 15 Oct 2026; the first order was PLN · SSS · TABS · Icon Plus. At 400 cm the SEDANG ADA lines sit beside HATI-HATI.
   History: v1 was 100×50 with black title text. In v2 the team asked for a bigger, stronger title, and Bryan picked the
   blue band. In v3 "Kap" became "Kapasitas", the four logos were added and the sizes changed. The unused "[EMERGENCY]
   Recovery Gangguan Link ICON+ GI Sunyaragi" title is archived.
2. **UTAMAKAN KESELAMATAN & KESEHATAN KERJA**: 200×80 (print 1) and 100×80 (print 2). White with a green frame, a large
   K3 logo and green text. No extra logos, Bryan's choice.
3. **ANDA MEMASUKI KAWASAN TERTIB K3**: 400×80 (print 1) and 250×80 (print 2). SSS logo top-left and K3 logo top-right,
   either side of a red title band. Below: five ISO 7010 mandatory signs (helm, masker, rompi, sarung tangan, sepatu
   safety, ordered head to toe) with "WAJIB MEMAKAI …" captions, a SAFETY FIRST diamond, and a green UTAMAKAN line.
   v2 (same day): the team also wanted the other partner logos. PLN · PLN Icon Plus · TAB Solutions now sit in a centred
   row at the bottom, in the same order as on HATI-HATI. SSS isn't repeated there because it is already top-left. v1 is in `_Arsip\`.

Each size gets one file. Copies of the same size print from the same file.

Logo sources: the PLN logo is Commons `Logo_PLN.svg` (public domain). PLN Icon Plus was rebuilt from the same PLN shapes
plus "Icon Plus" in Arial, fitted to plniconplus.co.id's 440 px logo (98.7% match on the symbol and letters). TAB
Solutions is raster only: tabs.co.id's 1024 px PNG, upscaled. It is acceptable at print size but slightly soft; ask
for their original file if a sharper one is needed. The ISO 7010 signs come from Commons (public domain). The K3 logo
is drawn from the official description. SSS is the vector redraw from [[project-iom-genset-sss]].

Bryan's earlier choices still apply: "PT." in the company name (the company's own documents use it), and the SSS logo
mirrors K3 where both appear.

**Why:** more revisions or new job titles are likely.

**How to apply:** `python buat_spanduk.py` rebuilds HATI-HATI (titles in the `SPANDUK` list, sizes in `UKURAN`).
`python buat_spanduk_k3.py` rebuilds the other two. Both overwrite same-named files, so move old versions to
`_Arsip\` first. Pass a folder as an argument to test elsewhere. Needs pymupdf, Pillow and Chrome.
Related: [[reference-folder-layout]].
