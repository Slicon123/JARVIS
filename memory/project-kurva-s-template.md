---
name: project-kurva-s-template
description: Kurva S (S-curve) Excel template + Upgrade Source-A S-curve, built and audited 2026-10-06, now in Laporan Sinergi; weights still provisional
metadata:
  type: project
---

On 2026-10-06 a coworker at PT. Sinergi asked for a better way to make the kurva S that goes into weekly and daily reports. They had been making it in Excel. Two files were built, simulated, audited, and moved at Bryan's choice:

- `C:\Bryan SMA X-XII\Laporan Sinergi\Template Pekerjaan\Template Kurva S.xlsx`, a template with example rows.
- `C:\Bryan SMA X-XII\Laporan Sinergi\Kurva S\Kurva S - Upgrade Kelistrikan Source-A DC PLN Pusat.xlsx`, filled from the file "Timeline Upgrade kelistrikan source-A DC PLN Pusat R".

Both have three sheets: Data Proyek, Kurva S and Grafik. They use 4 weeks per month (same as their timelines), skip holiday weeks, and take weekly realisasi as % of each item done that week.
For the weekly report, Grafik A1:O47 goes in via Copy as Picture. Use the Bitmap format if the paste target isn't Office.

**Built-in guards (added after the simulation, approved by Bryan):**
- Realisasi cells turn red when they hold text or a value over 100%.
- The status changes to "■ Periksa isian realisasi" when any item is over 100% or holds text.
- "Laporan minggu ke-" is capped at the number of weeks in the schedule.
- Cara Pakai has 14 rules, including: don't change the schedule after the first report (save a new R1 file instead), and enter Bulan mulai before holidays.

**Known limits:**
- Excel refuses "Insert Copied Cells" inside the table.
- Changing Bulan mulai doesn't move the holiday labels.
- The status reads "Terlambat" mid-week in daily reports.

**Open item:** the project file's bobot is PROVISIONAL. It was computed from the DURASI column (1 minggu = 7 hari). The RAB breakdown is grouped by equipment, not by timeline activity, so it couldn't be mapped. Bobot from the RAB or contract should replace it. That's the coworker's call.

**Why:** these S-curves go to PLN Icon Plus in reports, so a wrong weighting basis goes out under Sinergi's name.

**How to apply:** the files are self-contained, so edit them in Excel. A rebuild isn't needed. Bryan edits and re-saves them himself, so diff against his current version before changing anything. Never copy RAB prices or HPP into this repo. Lessons from building it are in [[feedback-excel-com-checklist]].

Related: [[project-fss-ats-documentation]], [[project-sinergi-struktur-organisasi]]
