---
name: project-sinergi-struktur-organisasi
description: Reusable Excel "Struktur Organisasi Pekerjaan" for Sinergi projects — Input-sheet driven org chart plus Uraian Tugas; full names still pending from Bryan
metadata:
  type: project
---

Built 2026-10-06: `C:\Bryan SMA X-XII\Laporan Sinergi\Struktur Organisasi Pekerjaan.xlsx`, a reusable template
(Bryan chose reuse over one-project). It replaced two hand-drawn examples in his Downloads (a Word file of
loose shapes and an Excel file of cell borders), and its role structure follows the Excel one: PM,
Admin & Finance, Pengawas Ahli K3 Listrik, Leader, then teams. It was first filled for "Upgrade Kelistrikan Source A DC PLN Pusat".

- **Input** is the only sheet he types in: up to 12 teams × 15 members (both raised on 2026-10-06: from 8 teams, and from 6 members
  for Team Trafo's 12), with 2 names per core role. Core roles stay fixed at 4. He asked about a 5th, but it's not needed yet; when he
  needs one, ask whether it's a side box like Admin/K3 or sits between PM and Leader.
  **Struktur** redraws itself: 4 teams per row, up to 3 rows, each row centred,
  empty slots dropped, colour follows team number. The second row starts right under the tallest box in the first, and the print area follows the chart's height.
  **Uraian Tugas** has one task per row, and its headings pull from Input.
- Struktur and Input are protected without a password. Hidden sheets Hitung and Mask drive the boxes and lines through conditional formatting.
  If you edit it, don't use Center Across Selection: Excel then stops drawing vertical borders inside the span.
- He edits the file between sessions (e.g. typed "Maryono Susilo" himself). Read Input before writing, and fill only empty cells.
  Team Trafo's names came from his personnel list, which may shorten names. Reading the KTP photos was blocked as PII, so don't retry; ask him instead.
- **Names:** on 2026-10-06 he supplied full names for the Leader and for FAS, Elektrikal (now 6) and Genset. Single names he gave himself
  (Ikhsan, Kirsun) are final. UPS & Battery, Sipil and AC are still empty, and Team Trafo's names haven't been checked against KTP.
  The team tasks in Uraian Tugas were drafted from general practice (there's no TOR), so he should check them against the job's scope.

Related: [[project-sinergi-proposal-teknis]] (BAB X Struktur Organisasi), [[project-fss-ats-documentation]]
