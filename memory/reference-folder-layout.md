---
name: reference-folder-layout
description: Where Bryan's files live under C:\Bryan De Great after the 6 Oct 2026 cleanup — save new files into this layout, not Downloads or the root
metadata:
  type: reference
---

On 6 Oct 2026 everything in `C:\Bryan De Great` and `~/Downloads` was sorted at his request
(Downloads now holds only `desktop.ini`). Top-level folders:

- `Kuliah\`: all coursework. Layout is in [[project-uksw-digital-business]].
- `Laporan Sinergi\`: all PT. Sinergi work. Type folders (`Laporan Word\PM|CM`, `Laporan PDF`, SOP,
  EOP, MOP, Flowchart, Kurva S, Template Pekerjaan, Template Proposal Teknis), plus `Foto Laporan\<date>\`,
  `Checklist & Testcomm`, `Data Uji & Laporan Vendor`, `Cover (PPT)`, `KOM PM Kelistrikan DC PLN Pusat`,
  `Upgrade Source-A DC PLN Pusat`, `Contoh Laporan` (examples from older projects) and `Lowongan Kerja`.
  Older versions go in an `_Arsip\` subfolder next to the current one.
- `SMA\`: high-school files (Tugas Dokumen, Dokumen Ulangan, Kisi-Kisi SAS Ganjil 2023, Lain-lain).
- `Musik\`: GP-100 presets and installers, backing tracks, Remaco (Sie Musik). See [[project-guitar-presets-gp100]].
- `Konten\`: May 2025 videos (`Klip\`, `Sumber YouTube\`). See [[project-content-clipping-automation]].
- `Pribadi\`: personal documents, backups (Dompet Bryan backup, Claude account exports), pas foto.
- `Aplikasi\AutoClicker\`: portable AutoClicker he still uses, with its `ACLib\` settings folder.
- `GP-100\` is the installed GP-100 editor app (Start Menu and Desktop shortcuts point at it). **Never move it.**
- `Python\` is his practice scripts. `JARVIS\` is this repo.
- `Animasi\` (created on first use): animation pieces from the animate skill, one `pieces\<name>\` each. See [[project-animate-skill]].

Old→new paths are logged in `C:\Bryan De Great\_Catatan pindah non-kuliah 2026-10-06.csv` (and
`Kuliah\_Catatan pindah 2026-10-06.csv` for coursework). Everything removed went to the Recycle Bin.

Lesson from the rename: auto mode's permission check blocks `cmd /c rmdir` on junctions whose names
resolve under `C:\Bryan…`. `[System.IO.Directory]::Delete($link, $false)` removes only the link and isn't blocked.

**How to apply:** when you create or download a file for him, save it straight into the matching folder.
If you're asked where something went, check the two logs before guessing.
