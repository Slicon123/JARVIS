---
name: project-approval-material-forms
description: Persetujuan Material forms for the PLN Pusat UPS & Genset project — the real task was a 1:1 Excel replica of page 1 of Genset.pdf (done 9 Oct 2026)
metadata:
  node_type: memory
  type: project
  originSessionId: dc35df87-6961-43dd-85ae-aa182744a345
  modified: 2026-10-09T11:04:22.353Z
---

On 9 Oct 2026 Bryan was asked to "bikinin form persetujuan" for the genset. After a detour (mapping the genset
brochures into the FSS example `Approval Material FSS.xlsx`, 23 sheets in Icon+ format), it turned out the job was
only to recreate **page 1 of `Genset.pdf`** — Sinergi's own "Pengajuan Persetujuan Material" form — as Excel.
The detour files were deleted to the Recycle Bin at his request.

Deliverable: `Laporan Sinergi\Approval Material\Pengajuan Persetujuan Material - Genset APC880T.xlsx`. One sheet,
A4, 11 columns A–K and 48 rows sized from a 300 dpi measurement of the scan, Calibri 10 (title Calibri Bold 18,
project name and PIC in Arial 8), blue Sinergi logo taken from his Word reports, signature boxes as grouped
rounded-rectangle shapes. Overlay against the scan matched within about 1–1.5 pt. Signatures and the stamp were
deliberately not copied — they must be signed fresh.
Then, at his request ("rapihin"), it was tidied away from strict 1:1: the signature area now has three equal
140 pt columns with evenly stacked boxes (7 pt corners) and centred headings; everything is Calibri 10 (no Arial);
"1" became "1."; the project name breaks after "dan"; sub-labels are indented; the logo has its true proportions;
gridlines are hidden. The form's own spelling ("Di Setujui", "Di Tolak", "DI AJUKAN", "USER /OWNER") was left
as is, pending his answer.

The FSS example and `Genset.pdf` were in Downloads on that date. Genset.pdf is a 31-page scan with no text layer:
page 1 is the form, pages 2–31 brochures (genset APC880T, Cummins KTA38 engine, Stamford alternator, DSE
controller, fuel-tank sketch), with conflicting alternator/controller models. No trafo or PDU in it.

**Input version (13 Oct 2026):** a coworker wanted a fill-in template of this form ("sheet 1 input, sheet 2 hasil").
Built `Laporan Sinergi\Template Pekerjaan\Pengajuan Persetujuan Material.xlsx` from the 9 Oct file (a byte-identical
copy had turned up in Downloads). **Input** holds every variable field: No. surat, date as day + month dropdown + year,
project name in 2 lines (the user picks the break), fields 2–7, and all 10 check boxes (X / - / empty; the list is
case-sensitive, and the form applies UPPER). **Pengajuan Material** is the 9 Oct form with formulas. G16:K16 was merged
to hold Gambar No. Text fields shrink-to-fit, and about 48 characters fit per line at full size. With the genset data
it rendered pixel-identical to the 9 Oct form. Then, at his request, the "PT. SINERGI SARANA SOLUSI" signature label
went from bold (as in the scan) to regular like the other labels. That label is the only intended visual difference. Both sheets are protected without a password. The signature labels
(PLN 1–3, PLN ICON Plus, PT. Sinergi) stay fixed shapes.
Signature images (same day, his choice "tempel sebagai gambar", then "6 tanda tangan, jangan cuma 1"): all 6 boxes
(PLN 1–3, ICON 1–2, Sinergi). On his request for "1 kertas HVS", the windows were laid out like the form in a
grey block from row 34: Disetujui (PLN 1–3) in column B, Diketahui (ICON 1–2) in C, Diajukan (Sinergi) in D. Each
window is a white merged range with a label above it. Rows are cut at every column's boundary, so each window keeps
its box's aspect. Input now prints on 1 A4 portrait page at scale 60%, and the form is still 1 page. Linked pictures
"TTD <key>" (`=Input!<window range>`, same aspect as the window) sit in each box. Numbered boxes get about 20 pt of margin each side to clear the "1."/"2.". Input is protected with drawing
objects left editable so pictures can be pasted. No cell border may touch a window's edge, because Excel draws the
top/left ones into the linked picture. An empty window leaves the box blank for a wet signature. Whether PLN accepts
a scanned signature was flagged to him and isn't known.

**Why:** the same project also covers UPS, so a UPS form in this format is a likely next request.

**How to apply:** if asked for another Persetujuan Material, first confirm which format is wanted (Sinergi page-1
style vs the Icon+ FSS style) before mapping anything. Reuse the build approach in [[feedback-excel-com-checklist]]
item 13. See [[feedback-duplicate-means-exact-copy]] and [[feedback-ask-before-better-idea]].
