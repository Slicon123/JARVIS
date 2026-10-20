---
name: project-layout-ruang-ups-pln
description: PLN panel/UPS/battery room layout for SSS — my 5-sheet DXF+PDF set (rev 1, 20 Oct 2026) was superseded; the client went with the hired drafter's Opsi-1
metadata:
  node_type: memory
  type: project
  originSessionId: 84891d9c-e6dd-41d2-926e-021c58189085
  modified: 2026-10-20T02:51:59.875Z
---

On 19 Oct 2026 Bryan asked for a professional-drafter redo of a PLN panel, UPS & battery room layout (SSS had
hired a drafter whose "Opsi 1/2/3" drawings were wrong). Output is in `C:\Bryan De Great\Laporan Sinergi\Gambar Layout Ruang UPS\`:
`Layout Ruang Panel UPS Battery.dxf` + `.pdf`, 5 tabs (01 existing, 02 bongkar, 03-05 Opsi A/B/C), A3 1:100.
Generator: `_Sumber\build_layout.py "<output folder>"` — every wall, door and equipment position is data at the
top; it prints a clash check per option (incl. 600 mm in front of each new AC). Rev 0 script + outputs kept in
`_Sumber\rev0\`. No AutoCAD on his laptop; DXF opens in AutoCAD and can be saved as DWG.

Fixed decisions: single-leaf 1000 fire door; existing racks/UPS don't move; new UPS 1A/2A (Vertiv HIPULSE U
2280x855) on the left, existing UPS removed only after the new ones run. Floor tiles are 30x30 cm.

Rev 1, 20 Oct 2026 (his boss's markup, relayed by Bryan):
- Existing names follow drafter Opsi 1: P. I/O UPS A/B (top row), LVMDP A/B, RACK BATTERY (was CAB. BATTERY),
  RACK BATTERY 1A/1B/2A/2B. Sizes kept; Opsi 1 dimensions LVMDP A/B as 900x2400, mine are ~925x1700 — unconfirmed.
- New rack = 1000 wide x 5x1230 = 6150 long; 1A at x 6328, 2A at x 8337 (east face of the pillar), aisles 1009/665.
- Old item B6 is a structural pillar 692x907 (lower box in the existing PDF); only the wall stub above it is demolished.
- Existing FSS tube under the pillar stays; my old "APAR" is really a NEW FSS tube (drawn top-left of new room).
- AC (Bryan confirmed 20 Oct: 4 new in total) = 2 on the new room's top wall + 2 in a 2x2 back-to-back block with
  the 2 existing AC from the old B7 wall (new face W, existing face E). In Opsi A/B the block sits west of the
  BCB 1A work area because the rack row fills the strip by the tube. Opsi C ("opsi 3" in their notes = my 3rd
  option): new racks need not line up with the old ones -> rack 1A on the west side, 700 off the wall (boss: battery
  must not hug the wall) with 700 aisles both sides, BCB at its north end; panels x 2400-6400, UPS row lower
  (y 8900); AC block ~700 below the FSS tube so the new W-facing AC blow down the panel/UPS rear aisle, not at
  a panel end; FSS panel moved to the top-left wall near the new FSS tube. Bryan wants every
  work space reachable without squeezing: panel aisles need an entrance at both ends (NFPA 70 110.26(C)(2),
  >= 610 each) - Opsi C now has 700 (west, rack aisle) + open east end; A/B already open at both ends.
- ICON asked for an empty legend/title block incl. PT name: frame + empty grid only, no logo, no names.
  The B/N wall tags on sheet 2 now have no key.

**Outcome (20 Oct 2026):** they chose the hired drafter's **Opsi-1**, not my set. The drafter's final 5-page PDF
(existing, pembongkaran partisi, Opsi-1/2/3) is `Downloads\LAYOUT PLAN RUANG PANEL BATTERY & UPS.pdf`. In it the new
racks 1A/2A run horizontally (6150) off the left wall, new panels vertical top-left, UPS 1-A/2-A at the bottom-left,
and the pillar is labelled "BALOKAN". My generator stays in `_Sumber\` for reference only.

**Why:** the brief came as loose markup relayed through Bryan and changed several times in one day.
**How to apply:** treat the drafter's Opsi-1 as the reference for this room from now on; don't push my Opsi A/B/C
again unless asked. If asked to review it, check aisle and work-space widths the same way (entrances at both ends of
panel aisles, battery not hugging walls). Client context: [[project-sinergi-proposal-teknis]].
