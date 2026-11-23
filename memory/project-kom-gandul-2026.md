---
name: project-kom-gandul-2026
description: "KOM PM Kelistrikan DC Gandul & DRC Bandung 2026–2027 deck, built 26 Oct 2026 from the Pusat \"Lengkap\" KOM; schedule left empty; open points"
metadata:
  node_type: memory
  type: project
  originSessionId: 6823d0a2-0626-4809-aa2d-fbd103595717
  modified: 2026-11-23T04:56:51.929Z
---

On 2026-10-26 Bryan asked for a new KOM deck for the PLN Icon Plus TOR "Pengadaan Jasa Pemeliharaan
Kelistrikan Data Center" (DC Gandul + DRC Bandung, 2026–2027). Built
`Laporan Sinergi\KOM PM Kelistrikan DC Gandul\KOM PM Kelistrikan DC Gandul 2026-2027.pptx` (26 slides). The same
folder holds the TOR PDF and the coworker's `schedule PM Kelistrikan DC 2026-2027.xlsx`, which is the Gandul + Bandung
schedule; both were moved there from Downloads on 26 Oct 2026. The deck was built from
`KOM PM Kelistrikan DC PLN Pusat\KOM PM Kelistrikan DC PLN Pusat 2026-2027 Lengkap.pptx`. That Lengkap file
(14 Oct 2026, 26 slides, no SLA or kualifikasi slides) is the Pusat deck that was actually used, newer than
the 29-slide file named in [[project-sinergi-proposal-teknis]].

His rules for this deck:
- TOR sections that Lengkap left out stay out (SLA, sanksi, kualifikasi, BoQ, lokasi, jangka waktu, ToC, lampiran).
- Schedule slides (16–19) were empty on 26 Oct 2026. **Filled 23 Nov 2026** from the final
  `Schedule Pemeliharaan--Maintenance Listrik Gandul.pdf` (Mbak Didi's schedule, start 16 Nov 2026 = W3, 4 periods;
  moved from Downloads into the KOM folder). The PDF has no xlsx behind it, so each period was cropped from it with a
  script (table + legend stacked, since the source prints the legend only after II and IV) into
  `_Sumber\schedule-img\periode1-4.png`; spec `schedule.images` points to them. Old deck backed up in the session
  scratchpad (gone). Her legend still has a label that contradicts its row (black = "UPS Emerson dan Battery Gandul"
  is the EATON/HUAWEI/GTEC row) and Switchover FREQ 12 has only 8 marks across the 4 periods; shown as she made
  them, not raised with her or the client. The `schedule PM Kelistrikan DC 2026-2027.xlsx` in the
  folder is the old 7 Oct example, ignore it.
- Slides 20–24 and 26 (work permit, WO, terima kasih) identical to Lengkap; only the footer changed.
- Slide 25 (struktur organisasi) was rebuilt on 26 Oct 2026 from `Struktur project SINERGI.xlsx`, which is now in
  the same folder. Changes: new leader, and 4 engineer teams (UPS & Battery as vendor teams Schneider/Huawei/Eaton,
  Trafo & Kubikal, Elektrikal, Genset). Team Fire Alarm System and Team AC are gone. The deck's teal style is kept.

Choices I made, to explain if asked:
- Name on cover, title and footer: "Pengadaan Jasa Pemeliharaan Kelistrikan Data Center Gandul dan DRC
  Bandung". The TOR title itself names no site.
- Ruang Lingkup follows the TOR's six BoQ jobs in TOR order on slides 5–12. Slide 13 covers Tahapan,
  include material and Engineer On Site.
- The SOP card says SOP, MOP & EOP + sharing session (TOR), followed by Lengkap's "sehingga…" clause.
- Daftar Hadir EOS was removed from Tahap Administrasi.
- Isi Minimal Laporan gained "Data tools" and "Dokumen SOP, MOP, dan EOP". Slide 15 was re-laid out to fit them.
- TOR spellings fixed: handal→andal, mainhole→manhole, asbuilt→as-built, batere→battery, dumy→dummy.

Open, not raised with the client yet:
- Section numbers skip 03 (inherited from Lengkap).
- The TOR's scope text and equipment list disagree on cubicle types and on the DRC genset and UPS ratings.
  The deck follows the scope text.

On 26 Oct 2026 the build became the `kom` skill (`claude-config/skills/kom`, at Bryan's request). The deck's
spec is `KOM PM Kelistrikan DC Gandul\_Sumber\kom-spec.json`: rebuilding from it reproduces the delivered
deck, and it is the starting point for the next KOM. To change this deck, edit the spec and rebuild, then
swap the result in with file-audit's `install`.
