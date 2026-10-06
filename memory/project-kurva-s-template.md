---
name: project-kurva-s-template
description: Kurva S (S-curve) Excel template + Upgrade Source-A S-curve built 2026-10-06 for a coworker's weekly/daily reports; weights still provisional
metadata:
  type: project
---

On 2026-10-06 a coworker at PT. Sinergi asked for a better way to make the kurva S that goes into weekly and daily reports. They had been making it in Excel. Two files were built in `Downloads`:

- `Template Kurva S.xlsx`, a blank template with example rows.
- `Kurva S - Upgrade Kelistrikan Source-A DC PLN Pusat.xlsx`, filled from the file "Timeline Upgrade kelistrikan source-A DC PLN Pusat R".

Both have three sheets: Data Proyek, Kurva S and Grafik. They use 4 weeks per month (same as their timelines), skip holiday weeks, and take weekly realisasi as % of each item done that week.

**Open item:** the project file's bobot is PROVISIONAL. It was computed from the DURASI column (1 minggu = 7 hari). The RAB breakdown is grouped by equipment, not by timeline activity, so it couldn't be mapped. Bobot from the RAB or contract should replace it. That's the coworker's call.

**Why:** these S-curves go to PLN Icon Plus in reports, so a wrong weighting basis goes out under Sinergi's name.

**How to apply:** the files are self-contained, so edit them in Excel. A rebuild isn't needed. Never copy RAB prices or HPP into this repo. Lessons from building it are in [[feedback-excel-com-checklist]].

Related: [[project-fss-ats-documentation]], [[project-sinergi-struktur-organisasi]]
