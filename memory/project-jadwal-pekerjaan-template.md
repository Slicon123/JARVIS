---
name: project-jadwal-pekerjaan-template
description: "Coworker asked 7 Oct 2026 for an automatic \"jadwal pekerjaan\" like the Kurva S and org chart templates; plan given, waiting on which schedule type she means"
metadata:
  node_type: memory
  type: project
  originSessionId: cc480763-2f42-499d-93ee-a9b2432ad25e
  modified: 2026-10-07T07:09:15.760Z
---

On 2026-10-07 a coworker at PT. Sinergi asked whether "jadwal pekerjaan" could stop being made by hand in Excel, the way [[project-kurva-s-template]] and [[project-sinergi-struktur-organisasi]] did. Bryan asked for research and a plan only, no build yet.

Two hand-made schedule types exist in `Laporan Sinergi`, both coloured cell by cell (no formulas, no conditional formatting):
- **Timeline proyek**: `Upgrade Source-A DC PLN Pusat\Timeline Upgrade kelistrikan source-A DC PLN Pusat R.xlsx`. Sections A–I, DURASI as text ("1-2 minggu"), month header retyped per section, NATARU/IDUL FITRI weeks grey, CATATAN about SP2K/PO at the bottom.
- **Schedule maintenance**: `KOM PM Kelistrikan DC PLN Pusat\Schedule Maintenance DC PLN kantor pusat (2026-2027).xlsx`. 4 periods × 3 months, W1–W4, one colour per item, FREQ/THN 3, grey Masa Freeze weeks, legend. `Laporan PDF\Schedule & Aktualisasi\...Keamanan Fisik Tahap-2.pdf` adds an Aktualisasi table with actual dates in the week cells.

Finding: `Template Kurva S.xlsx` already draws schedule bars from Mulai/Selesai, but only when Bobot is filled (CF and the P-columns both require it). It can't print a timeline before bobot exists, such as at the proposal stage.

Plan proposed: Excel only, no macros, Input sheet → output draws itself, test by rebuilding a real file and matching it week by week. Timeline input columns mirror Kurva S (Uraian, Mulai bln/mg, Selesai bln/mg, Durasi) so the rows paste straight across. Optional: "mulai setelah no. X" so later items shift on their own.

**How to apply:** before building, get his answer on which type(s) she means and her rules (dates 29–31 → W4?, freeze weeks, colours, whether aktualisasi is needed). Follow [[feedback-excel-com-checklist]].
