---
name: project-sekitar-pipeline-mod
description: sekitar-pipeline mod (17 Nov 2026) — Claude Desktop panel showing each film's stage, session state and Gemini quota; local only, not yet installed for other sessions
metadata:
  type: project
---

Built 17 Nov 2026 as Bryan's first try of Claude Code mods: a pane listing each sekitar film with 4 stages (Naskah, Voice, Render, Upload), its session state (Claude kerja / nunggu kamu / sesi ditutup / belum dibuka), a [produk] tag, and the Gemini count from `~/.claude/sekitar-gemini-usage.json`. `/pipeline` opens it.

- Source: `C:\Users\p\.claude\dev-mods\5d3dc084-f3fa-43d2-80bc-9453c5df6ef0\sekitar-pipeline\` (outside the repo, by his choice: "lokal dulu"). 3 tests pass (`claude plugin test`).
- Data: one file per film in `~/.claude/sekitar-pipeline/<slug>.json`, session→film links in `sessions/`. Files, not `$.store`, so 5 sessions never overwrite each other.
- Fed by the tool `pipeline_update` (slug, stage ide/naskah/voice/render/upload/hapus, title, product). [[project-konten-edukasi-sekitar]]'s `sekitar` skill calls it at naskah/voice/render, `unggah-sekitar` at upload.
- A dev-mods mod loads only in the session that wrote it. Film sessions see nothing until it is installed (local marketplace) — pending his yes.
- `Progress` is not in this build's element table (2.1.325) despite the docs; the Gemini bar is drawn with text.

**Why:** he wanted to learn mods and see the 5-film pipeline at a glance.
**How to apply:** if the panel stays empty, check the mod is installed in that session first; on another device the skills skip the tool silently.
