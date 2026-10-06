---
name: feedback-excel-com-checklist
description: Checklist for building or editing Bryan's Excel files through Excel COM on his laptop — setup facts, COM traps, what to test up front, which checks to keep
metadata:
  type: feedback
---

Self-evaluation he asked for after the Struktur Organisasi build on 2026-10-06 ([[project-sinergi-struktur-organisasi]]).
About half the build/test runs that day were avoidable re-runs.

**Setup on his main laptop:** Python 3.14 has no openpyxl, and there's no LibreOffice, so the xlsx skill's `recalc.py` can't run.
pywin32 is installed (since 2026-10-06), and real Excel 16 is the build and verify engine. List separator is `,`.

1. Write every script with the Write tool and change it with Edit. Don't patch it with `sed` or inline Python: that once turned `'\\t1.xlsx'` into a tab and cost two crashed runs.
2. Start Excel through a helper that closes it and kills its PID in `finally`. Crashed runs left 3 hidden EXCEL.EXE behind. Bryan often has his own Excel open, so kill only PIDs you started.
3. COM call style: `FormatConditions.Add` must take positional args `(2, None, formula)`. Keyword args fail, and so does `pythoncom.Missing`.
4. Before building, run one feasibility test that covers every formatting trick the design relies on. Known behaviour:
   - Center-aligned text spills into truly empty neighbours.
   - A formula returning `""` blocks that spill.
   - Conditional-format borders from several rules combine.
   - Center Across Selection hides vertical borders inside its span, even when the span's cells are empty. This was found late and forced a column redesign.
5. When generating formulas, wrap every comparison in parentheses: `2*(X=0)`, never `2*X=0`.
6. PDFs exported from a hidden Excel instance come out Letter even when the sheet is A4. Check `paperSize` in the saved XML instead of chasing the PDF size.
7. Verify on every sheet, hidden and protected ones included, through `UsedRange.Value`. `SpecialCells` silently skips most cells there.
8. His files change between turns. Work on a copy and assert that the cells you write are still empty.
   Before replacing his file, check it isn't open (`~$` lock) and that it's byte-identical to your backup. Then diff every sheet you didn't mean to touch.
9. When you raise a capacity, check every code range that assumed the old limit. Team colour codes 9–12 once collided with the PM and Leader fills.
   A pixel diff of the current data against the old render proves the rework changed nothing he already had.

10. Learned on the Kurva S build (2026-10-06):
   - A cell written directly below an Excel table gets absorbed into it by auto-expand. Leave a spacer row. Don't toggle AutoCorrect, because that setting persists into his own Excel.
   - pywin32 shifts Python datetimes by the timezone, so 1 Oct turned into 30 Sep. Write dates as serial numbers through `Value2`.
   - In pywin32, call `GetCharacters(start, n)`, not `Characters(...)`.
   - Setting `NumberFormat="@"` before writing a formula stores the formula as text.
   - Chart title size: set it through `TextFrame2` after any `ChartArea.Font` change.
   - Dynamic print area works. Create a static one, then set `Names("Print_Area").RefersTo` to an OFFSET formula. It survives a reopen. (`Names.Add` converts it to static.)
   - A table with `ShowHeaders=False` frees its header row. On row insert, its calculated columns, validation and CF all extend.

**Keep, don't trim:** render the output after each build, test several input scenarios, and scan every sheet for formula errors.
These checks caught the real bugs; the time to cut is the avoidable re-runs above, not these checks.

**Why:** He asked why the build took so long and wants it faster, without the output getting worse.

**How to apply:** Run through this before any Excel build or COM edit.

Related: [[feedback-pptx-edit-checklist]], [[feedback-self-correct-and-verify]]
