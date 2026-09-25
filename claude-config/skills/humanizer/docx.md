# Word files (.docx): makalah, laporan, tugas

Read with SKILL.md; the patterns, **Voice**, and **Match the style** are there.

Bryan's usual case is a makalah or tugas in Word. The rewrite must come back as a Word file
that looks exactly like his: same styles, headings, numbering, spacing, fonts, italics on
foreign terms, tables, and page layout. Only the wording changes. The helper script
`scripts/docx_humanize.py`, in the same folder as this file, does the file handling. Call it
by its full path, quoted, since you run from the project folder, not the skill's:
`python "<skill-dir>/scripts/docx_humanize.py"`. `<skill-dir>` is the base directory shown
when the skill loaded. It needs `pip install python-docx` once per device.

1. **Never overwrite the original.** Write `<name>-humanized.docx` next to it. An old `.doc`
   file: ask Bryan to Save As `.docx` in Word first. A Google Doc: download it as `.docx`.
   If a `~$<name>.docx` lock file sits next to it, the file is open in Word. Tell him to
   close it first, or his next save will overwrite your changes.
2. **Extract.** `python "<skill-dir>/scripts/docx_humanize.py" extract <file> <scratchpad>/paragraphs.json`. Each
   paragraph comes with its index, Word style, the heading it sits under, and its text,
   with italic as `*x*` and bold as `**x**`. Read the whole thing before editing anything.
3. **Work out the style** (**Match the style** in SKILL.md). Name the document type, give each section its
   register, and find the writer's own voice. The paragraphs with the fewest tells are the
   writing sample; **Voice** applies to them. Note the pronoun he uses for himself (*penulis*,
   *kami*, or *saya*) and his term choices (*startup* or *perusahaan rintisan*), then keep
   both the same across the whole file.
4. **Choose what to leave alone.** Headings, cover page (nama, NIM, dosen), daftar isi,
   daftar tabel and gambar, captions ("Gambar 2.1 ..."), daftar pustaka, direct quotes, text
   of laws (Pasal, Ayat), data tables, and every paragraph with no real tells. Rewriting
   twenty paragraphs well beats touching two hundred.
5. **Write `edits.json`** with only the paragraphs you change: `{"12": "teks baru"}`. One
   paragraph in, one paragraph out, because merging or splitting would break Word's
   numbering and list styles. `null` deletes a paragraph that should go entirely, such as a
   "Semoga penjelasan di atas dapat membantu!" left at the end of a Pembahasan. Keep the `*italic*` marks on
   foreign terms, and italicise any new foreign term you introduce; that is the makalah
   convention (istilah asing dicetak miring).
6. **Apply.** `python "<skill-dir>/scripts/docx_humanize.py" apply <file> edits.json <name>-humanized.docx`.
   Then deal with every line it prints:
   - `check:` a number, year, citation, acronym, or name from the old text is gone. Put it
     back, or be sure a pattern required cutting it. Never ignore one.
   - `skipped: complex (mixed fonts ...)`: usually invisible leftovers from copy-paste.
     Look at the paragraph. If nothing about it is meant to look different, rerun with
     `--flatten`. If part of it is deliberately coloured, underlined, or sized, leave it.
   - `skipped: complex (footnote / field / hyperlink / image ...)`: the script will not touch
     these, because a Mendeley or Zotero citation, a footnote number, or a link would break.
     List them for Bryan (section plus first few words) with a suggested rewrite he can type
     into Word himself. Hand-edit their XML only if he asks, and then use the docx skill.
   - The word count. Lecturers often set a minimum length. If the document shrinks by more
     than about 10%, tell Bryan the before and after numbers so he can decide.
7. **Check the result.** Run `extract` on the new file and read the changed paragraphs in
   their surroundings, or read it flat with `pandoc <new>.docx -t plain`. Then reply with the
   new file's path, how many paragraphs changed in each section, three to six lines on what
   changed, the manual-edit list, and any fact you needed but did not have.
