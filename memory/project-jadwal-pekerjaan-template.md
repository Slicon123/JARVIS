---
name: project-jadwal-pekerjaan-template
description: "Schedule Pemeliharaan.xlsx (Input -> Schedule; was \"Template Schedule Pemeliharaan\"), built 7 Oct 2026 from the coworker's \"schedule PM Kelistrikan DC 2026-2027\" example; matches it cell for cell"
metadata:
  node_type: memory
  type: project
  originSessionId: cc480763-2f42-499d-93ee-a9b2432ad25e
  modified: 2026-10-07T07:52:13.750Z
---

On 2026-10-07 a coworker at PT. Sinergi asked for "jadwal pekerjaan" without manual cell colouring, like [[project-kurva-s-template]] and [[project-sinergi-struktur-organisasi]]. She meant the **maintenance schedule** and gave `~/Downloads/schedule PM Kelistrikan DC 2026-2027.xlsx` as the model. That original was left in Downloads.

Built `C:\Bryan De Great\Laporan Sinergi\Template Pekerjaan\Schedule Pemeliharaan.xlsx`, filled with her example data:
- **Input** (protected, no password): title, start month (month dropdown C3:D3 + year E3), group name, then up to 15 items. Each row has Unit, Sat, FREQ/THN, Warna (left empty = automatic, one distinct colour per row; 1–20 to override), an optional legend label, and 48 week cells where you type x. There's also a Masa Freeze row, a Kunjungan count (consecutive weeks = 1 visit), a per-row Cek, a Status line and a "Cek tanggal" helper (day C6 + month dropdown D6:E6 + year F6, result G6). The month list is in hidden BJ1:BJ12.
- **No typed dates anywhere**: Bryan's Windows is en-US (M/d/yyyy), so "25/12/2026" was rejected and "1/10/2026" would silently mean 10 Jan. On 2026-10-07 both date cells were replaced with dropdown + number fields. Keep it that way, because coworkers' laptops may use other locales.
- **Schedule** (protected): her layout copied exactly (Rockwell, 4 periods × 3 months, legend after II and IV, A4 landscape, zoom 63, break before Periode III). Each table has room for 16 rows; empty rows go borderless through white conditional-format borders. Hidden helper columns are U:X on Schedule and BH:BI on Input. Her 0.56-wide separator column H (the double line before the weeks) was deleted at Bryan's request on 2026-10-07, so the weeks now run H:S and the print area is A1:S107.
- Colours: on 2026-10-07 Bryan asked for every job to have its own clearly different colour ("setiap pekerjaan, warnanya beda saja"). Her near-duplicate colours (two light blues, a grey close to freeze grey) were replaced with a 20-colour palette with no greys; freeze stays BFBFBF.
- Verified: all 576 week-cell positions and the 13 legend entries match her file. No formula errors. Scenarios tested: 7 items, a gap row, 15 items, no freeze, a different start month, and wrong inputs.

Her week rule (chat, 7 Oct): always W1–W4; "kalau W4 tanggalnya ga penuh, disambung ke W1 bulan berikutnya". I implemented it as W1 = 1–7, W2 = 8–14, W3 = 15–21, W4 = 22–28, with days 29–31 counted in next month's W1. This is an interpretation, still to confirm with her. It only drives the date-label row and Cek tanggal.

Audited 2026-10-07: 0 errors in 1,407 formulas. Fixed kVA spelling in her genset names and labels (1000kVA / 1000 KVA -> 1000 kVA). Input now prints as one A4 landscape overview. Opens on Input C2.

Print Preview showed fills covering top borders (2026-10-07). The print/PDF output was verified correct at 6x. Added 6 CF border rules on coloured week cells and legend swatches; cell contents are unchanged. Bryan still has to confirm Print Preview looks right.

Renamed 2026-10-07 at Bryan's request: he didn't want it called a template. The file was "Template Schedule Pemeliharaan.xlsx". The Title property is now "Schedule Pemeliharaan", and Cara Pakai item 12 says "file ini". No "templat" is left anywhere in the file's XML.

At Bryan's choice (2026-10-07), the Switchover count and the legend-label mismatches stay as they are for now. He is asking Mbak Didi about the week rule.

Open points from her own data, unchanged: Switchover has FREQ 12 but only 5 marked (Cek says "Kurang 7"). Two legend labels contradict their items: "UPS Emerson…" is the EATON/HUAWEI/GTEC item, and "…Battery Gandul" is the DRC item.

Print test with all 15 slots filled (2026-10-08, on a copy, via PDF export, not Print Preview): still 2 pages, no vertical split, legend's 16 slots (15 + freeze) exactly full. But long names get clipped: item column fits ~50 characters, legend label ~40. No wrap/shrink on those cells. Fix not applied yet; Bryan to choose.

Not built: the Aktualisasi table (not in her example) and the project timeline type. `Template Kurva S` only draws bars once Bobot is filled.

**How to apply:** edit the template in Excel (COM), not by rebuilding. The build/verify scripts lived in a session scratchpad and are gone. See [[feedback-excel-com-checklist]].
