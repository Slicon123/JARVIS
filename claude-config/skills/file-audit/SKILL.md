---
name: file-audit
description: Audit a finished Excel, Word, PowerPoint or PDF file before Bryan sends it, fix it on a copy, and swap it in safely. Covers leftover comments, tracked changes and speaker notes; author metadata; hidden sheets and slides; formula errors; placeholders and stale years; typos and terms; and how every page prints. Use when Bryan asks to audit or check a file before sending, or says "audit file ini", "cek file ini", "cek sebelum dikirim", "biar bersih", "final check", "siap kirim?". Not for skills or commands (that is skill-audit).
---

# File audit

The goal: the person who receives the file sees nothing Bryan didn't mean to send.
Nothing changes in his file without proof that only the intended parts changed.

**Rules**
- Never write to a file that is open in Office. Work on a copy and swap it in with `install`.
- Read everything first, in one pass. Then fix everything in one pass.
- Never open ID documents (KTP, passport photos). The permission system blocks it as PII, and
  that is right. Don't copy NIK, phone numbers or addresses into memory or the JARVIS repo.
- Never send, upload or share the file. Bryan sends it himself.

## 1. Scan

```bash
python ~/.claude/skills/file-audit/scripts/audit.py scan "<file>"
```

It works on a copy and prints:
- whether the file is open right now;
- metadata (author, last saved by, title, company, template);
- review leftovers (comments, tracked changes, speaker notes, hidden slides or sheets, hidden
  text and highlights);
- for Excel: formula errors on every sheet, hidden ones included, plus broken names and
  external links;
- placeholders (`[A]`, TBD, XXX), double spaces, and every year mentioned;
- for Word: whether the table of contents is stale;
- for PowerPoint: text taller than its box.

It then renders every page into contact sheets. **View every PNG it lists.** Most layout
problems only show up there. With several files, scan each one.

Read its flags as leads, not verdicts:
- A double space can be deliberate, like `1.  ` in a numbered list.
- In the years line, look for a year that doesn't belong, usually copied from last year's version.
- Excel PDFs rendered by a hidden instance come out Letter size. Trust `paper 9` (A4) in the
  sheet line instead.

## 2. Read it as the recipient

Use the renders and the text the scan surfaced, and check:

- **Language:** typos and standard KBBI forms (fondasi not pondasi, mengoordinasikan,
  kelembapan, analisis). English terms must be correct ("Terms of Reference", "fan belt").
  Each term is spelled one way throughout.
- **Consistency:** names cased the same way and numbering without gaps. Dates, contract periods and
  units agree everywhere. The title matches the file name, cover and headers.
- **Leftovers from a template or last year's file:** another project's name, an old author in the
  metadata, last year's period, sample rows, fill-in slots.
- **Layout:** no clipped or overflowing text. No section or table split across pages unless it has to be.
  No blank trailing page. Page numbers are right.
- **How it opens:** on the main sheet or slide, cursor at A1, a sensible zoom, gridlines as
  intended.
- **Facts:** when Bryan has a source (TOR, RKS, schedule), the memory files say where it lives.
  Check numbers and names against it.

**By format**
- Excel: 0 errors; helper sheets set to very hidden; print area, fit and paper (A4) right on every printed sheet; no stale
  data in hidden rows or columns. When changing anything, follow the memory file `feedback-excel-com-checklist`.
  Coloured cells inside a bordered grid: contact sheets are too small to show a 1-px line. Render a crop of the
  coloured area at 4–6x and check that every fill sits inside its lines, with the border above it still drawn.
  Excel's Print Preview can swallow thin lines under fills even when the print is correct. Tell Bryan which one you checked.
- Word: no tracked changes or comments left; table of contents updated if stale; headers and footers right.
- PowerPoint: no speaker notes, hidden slides or comments unless they're meant to stay;
  no overflow. When editing, follow the memory file `feedback-pptx-edit-checklist`.
- PDF: title and author in the metadata; page size; bookmarks. A PDF can't be edited
  cleanly. Fix the source file and export it again.

## 3. Sort the findings

- **Fix:** objectively wrong, such as typos, wrong terms, errors, split sections, stale metadata or a stale table of contents.
  Fix without asking.
- **Ask:** depends on who receives it. Examples: notes for whoever edits next, empty
  placeholder boxes, internal comments, hidden draft slides. Use one AskUserQuestion with at most 4
  questions, before any write. Skip it if there's nothing to ask.
- **Flag:** only Bryan can verify, such as names against ID cards or numbers from a source you
  can't read.

## 4. Fix, prove, install

1. Copy the original to the scratchpad twice: one copy as the backup, one to edit. Apply every fix to
   the edit copy in one run, with a script written via Write or Edit, not patched with sed.
2. Run `audit.py diff "<backup>" "<fixed>"`. Only the intended cells, paragraphs or shapes may
   appear. Anything else means stop and find out why.
3. Run `scan` again on the fixed copy and look at the pages you changed.
4. Run `audit.py install "<fixed>" "<original>" "<backup>"`. It refuses if the file is open (ask Bryan to close it)
   or if it changed since the backup (he edited it, so redo the fix on his version).
5. Open the file for him: `Start-Process "<original>"` in PowerShell.

## 5. Report

In Bryan's language, plain words, short:

- **Diperbaiki:** each fix in a few words.
- **Dicek, aman:** with numbers, e.g. "0 error dari 4.166 rumus, 3 halaman A4".
- **Dibiarkan sesuai pilihanmu:** what he chose to keep.
- **Perlu kamu cek:** what only he can verify.

End with where the backup is.

## Needs

Windows with Office, plus `pywin32`, `pymupdf` and `pillow` (`pip install pywin32 pymupdf pillow`).
Without Office, only PDFs can be scanned. Say so instead of guessing.
