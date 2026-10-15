---
name: project-stiker-helm-sinergi
description: "Helmet stickers for Sinergi (15 Oct 2026): SINERGI text 13,3x3 cm and K3 logo 5x5 cm, matched to photos of the team's helmets; font, colours, sizes, build script"
metadata:
  type: project
---

On 15 Oct 2026, right after the banners in [[project-spanduk-k3-sinergi]], Bryan asked for two helmet stickers made
"persis" like the ones in two photos of the team's helmets, and realistic. Files are in `Laporan Sinergi\Stiker\`:
a PDF for print (vector, exact size, text converted to curves so CorelDRAW needs no font), a 600 dpi JPG, and a
Preview JPG with shadows that is for viewing only.

1. **SINERGI** (side of the helmet): navy `#283A8A` on a white rectangle cut close to the text, 13,3 × 3 cm.
   The font is Source Han Sans Bold (its Latin is Source Sans, the Myriad family). It was picked by measuring the photo:
   stroke weight matched with no adjustment, and the letter spacing is the font's default.
2. **Logo K3** (front of the helmet): gear with 11 teeth and a cross, green `#11663A`, on a white 5 × 5 cm square.
   The logo fills 82% of the side. The cross is slimmer and the ring thicker than the banner version, to match the photo.

The sizes are estimates from the photos. If the team measures a real sticker, change `SINERGI_TINGGI` or `K3_SISI`
(the SINERGI width follows the text). Not made, and not asked for: the SNI ISO shield seen on some helmets.

**Why:** reprints or size changes are likely once a print shop quotes it.

**How to apply:** `python buat_stiker.py` in `Stiker\_Sumber\` rebuilds all three files and overwrites same-named
ones, so move old versions to `_Arsip\` first. Pass a folder as an argument to test elsewhere. Needs pymupdf, Pillow,
fonttools (installed with `pip --user` on 15 Oct 2026) and Chrome. Related: [[reference-folder-layout]].
