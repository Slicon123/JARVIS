---
name: project-kaos-kantor-sinergi
description: "Three short-sleeve office t-shirt designs for Sinergi (26 Oct 2026, asked by mbak Didi): Polo Navy Klasik, Polo Kombinasi, Kaos Oblong Casual; team chose design 2 Polo Kombinasi; choices I made, files, build script"
metadata:
  type: project
---

On 26 Oct 2026 mbak Didi (Sinergi) asked Bryan for SSS "kaos" for office work, 3 options. This is separate from the
long-sleeve field shirts in [[project-seragam-lapangan-sinergi]].

Files are in `Laporan Sinergi\Seragam\Kaos Kantor\`: one PDF (overview + one board per design) and four JPGs for WhatsApp.
1. **Polo Navy Klasik**: navy pique polo, white + cobalt tipping on collar and rib cuffs, 3 navy buttons, side vents,
   back 1,5 cm longer, small white SSS icon (4 cm) under the back collar.
2. **Polo Kombinasi**: white body, navy shoulder yoke front and back with cobalt piping, navy collar/placket/cuffs, white
   buttons, logo in its real blue, small flag on the right sleeve, "PT. SINERGI SARANA SOLUSI" in white on the back yoke (20 cm).
3. **Kaos Oblong Casual**: abu misty crew-neck, cobalt tape inside the back neck, navy hem tab, big back print (logo 10 cm + name 25 cm).

Choices I made without asking, so they may come back: "kaos" was ambiguous (polo vs oblong), so I did 2 polos + 1 crew-neck.
No employee name, no K3 logo (office, not field). The chest lockup is the same 9 cm one as the field shirt. Fabric advice:
lacoste cotton pique ± 200–230 g/m² (or CVC ± 60/40 as the cheaper option); combed 24s/30s for the tee. Every board says
office only: fabrics with polyester can melt, so site/panel work still uses the field shirt.

**Chosen (Bryan, 26 Oct 2026): design 2, Polo Kombinasi.** The next step is a production file for the konveksi; not started yet.

**Why:** revisions to design 2 and a konveksi file are likely next.

**How to apply:** `python buat_kaos.py` in `Kaos Kantor\_Sumber\` rebuilds everything and overwrites same-named files,
so move old ones to `_Arsip\` first, or pass a folder to test elsewhere. Colours, tipping, marker positions and texts are
constants/`DESIGNS` in the script; it reuses the field-shirt page layout and `sss_logo.py`. Needs Pillow and Chrome.
Related: [[reference-folder-layout]].
