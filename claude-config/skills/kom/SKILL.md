---
name: kom
description: Build a Kick Off Meeting (KOM) PowerPoint for a PT. Sinergi maintenance contract from a new TOR, reusing the last KOM that was actually presented, or change an existing KOM (schedule, struktur organisasi, ruang lingkup). Use when Bryan says "bikin KOM", "KOM baru", "buat KOM dari TOR ini", "kick off meeting", or sends a TOR/RKS and wants the KOM slides.
---

# KOM builder

A new KOM is the last KOM that was used (the **base**) with its content swapped for the new
TOR. The design, the work-permit and work-order slides and the closing slide carry over.
Tool: `python ~/.claude/skills/kom/scripts/kom.py` (lxml, pillow, pymupdf, pywin32; PowerPoint
for `check`, Excel for `schedule-img`). Say up front that a full KOM takes about 30–45 minutes.

## Bryan's rules

- Follow the base's structure. A TOR section the base left out stays out (SLA, sanksi,
  kualifikasi, BoQ, lokasi, jangka waktu, table of compliance, lampiran) unless he asks.
  Content that is in neither the TOR nor the base is deleted, not handed back as a to-do.
  Fix the TOR's spelling (handal→andal, batere→battery, mainhole→manhole…).
- Work permit, form WO and Terima Kasih slides stay as in the base; only the footer changes.
- **Ask first, in one message, for whatever he hasn't given:**
  1. the TOR (PDF);
  2. the schedule (xlsx, PDF or image), or "kosongkan dulu" (slides keep their titles only);
  3. the struktur organisasi: PM, admin & finance, pengawas K3, leader, each engineer team
     with its members (an xlsx is fine), or "pakai yang lama";
  4. images to change (work-permit or WO forms, logos); by default the base's stay.
  Never invent names, dates or schedule weeks.
- TOR content, names and specs are client-confidential: they live in `Laporan Sinergi`, never
  in the JARVIS repo, this skill, or memory beyond file paths and decisions.

## 1. Base and inputs

- Base = the newest KOM *actually used*: look in `Laporan Sinergi\KOM PM Kelistrikan *\` and in
  Downloads. Run `kom.py inspect <deck>` on each candidate and compare `revision` and `saved`.
  Don't trust file dates or names. On 26 Oct 2026 a "Lengkap (1)" downloaded that day turned out
  to be an older revision saved by someone else. If two candidates differ in content, ask which.
- Starting spec: the newest `<KOM folder>\_Sumber\kom-spec.json`. It shows every field in use.
- Move the files he downloaded for this job (TOR, schedule, struktur) into the new KOM folder,
  and log each move in `C:\Bryan De Great\_Catatan pindah non-kuliah 2026-10-06.csv`.

## 2. Spec from the TOR

Write `Laporan Sinergi\KOM PM Kelistrikan <site>\_Sumber\kom-spec.json` (copy the old one):

- `name` (title slide + footer), `cover_title` (`\n` = line break; build warns when a line
  wraps), `years`, `forbid` (old site and brand words that must not survive).
- `latar` (2 cards) and `tujuan` (intro + 3 cards): the TOR's own wording.
- `tail`: the corrective / dokumentasi / SOP texts that close every job.
- `ruang_lingkup`: one entry per slide, jobs in TOR/BoQ order. Each job gets a panel (number,
  name, FREKUENSI and PERANGKAT as the TOR states them), an "a. Preventive Maintenance" list,
  then `"tail"`. Split a long job into (1/2) and (2/2), continuing the numbers with `start`.
  Layouts: `lmr`, `panel_card`, `num_stack`, `panel_two`, `panel_top_row`. Items: a string is
  numbered; `["b", …]` bullet sub-item, `["a", …]` lettered, `["bb", …]` bullet, `["p", …]`
  plain, `["h", …]` bold heading.
- `tahap_admin` (one row per termin) and `syarat` (dokumen wajib, isi minimal laporan, bentuk
  penyerahan) from the TOR's Term Pembayaran and Syarat Penyerahan.
- `schedule`: `{"images": [png per period]}`; add `"titles"` only when the period count changes.
- `struktur`: `pm`, `admin`, `k3`, `leader`, `teams: [{name, members}]`. Leave it out to keep the base slide.
- `drop`: titles of base slides to remove.

Note every TOR contradiction you notice (scope text vs equipment list, kVA vs kW) for the report.
The deck follows the scope text.

## 3. Build and check

```bash
python kom.py build "<spec>" "<scratchpad>/kom.pptx" && python kom.py check "<scratchpad>/kom.pptx" --out "<scratchpad>/check"
```

`build` prints the body size of each ruang lingkup slide (the largest of 15–12 pt that fits),
any overflow, cover lines that wrap, and LEFTOVER words from the old project. `check` measures
every text box in PowerPoint and writes contact sheets: view every one. Fix the spec, never the
pptx, and rebuild. Then run the pptx skill's `validate.py <out> --original <base>`.

Schedule from Excel: find the rows that start each "PERIODE" block, then
`kom.py schedule-img <xlsx> <outdir> --sheet <name> --ranges A3:T20 A22:T53 …`, one range per
period, and put the PNGs in `schedule.images`.

## 4. Deliver

- New KOM: copy to `Laporan Sinergi\KOM PM Kelistrikan <site>\KOM PM Kelistrikan <site> <years>.pptx`.
- Replacing a deck that already exists: back it up to the scratchpad, then run
  `python ~/.claude/skills/file-audit/scripts/audit.py install <new> <target> <backup>`. It refuses
  when PowerPoint has the file open (ask him to close it and say "udah") or when he changed it
  since your backup.
- Report in short Indonesian: what comes from the TOR, your own choices (titles, splits, site
  name), what is empty and why, and the TOR contradictions. Then update the project memory.

## What slowed the first build (26 Oct 2026), now handled

- Working out the base deck's XML by hand: `inspect` and the role detection do it now.
- Fitting text by trial: cards size from real Calibri metrics, `check` measures in PowerPoint.
- Bugs now fixed in code: numbering restarted after sub-bullets; "10." touched its text;
  "3150 kVA" broke across lines; footers split into per-word runs defeated string replace;
  removed slides left orphan images that make PowerPoint call the file corrupt.
- Process: chain build and check with `&&`, because a `;` once let a stale file pass validation.
  Write helper scripts with Write, not heredocs, because a `\1` inside a heredoc turned into a
  control character. Check that the target isn't open in PowerPoint before you swap it in.
