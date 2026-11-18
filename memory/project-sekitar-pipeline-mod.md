---
name: project-sekitar-pipeline-mod
description: sekitar-pipeline mod (17 Nov 2026) — Claude Desktop panel showing each film's stage, session state and Gemini quota; installed locally (user scope) from ~/.claude/local-mods
metadata:
  type: project
---

Built 17 Nov 2026 as Bryan's first try of Claude Code mods: a pane listing each sekitar film with 4 stages (Naskah, Voice, Render, Upload), its session state (Claude kerja / nunggu kamu / sesi ditutup / belum dibuka), a [produk] tag, and the Gemini count from `~/.claude/sekitar-gemini-usage.json`. `/pipeline` opens it.

- Source: `C:\Users\p\.claude\local-mods\sekitar-pipeline\` (outside the repo, by his choice: "lokal dulu"), a folder marketplace `bryan-local`; installed as `sekitar-pipeline@bryan-local`, user scope, read from that folder: edit there, then `/reload-plugins`, no reinstall. The first dev-mods copy was deleted to avoid a double load. 3 tests pass (`claude plugin test`).
- Data: one file per film in `~/.claude/sekitar-pipeline/<slug>.json`, session→film links in `sessions/`. Files, not `$.store`, so 5 sessions never overwrite each other.
- Fed by the tool `pipeline_update` (slug, stage ide/naskah/voice/render/upload/hapus, title, product). [[project-konten-edukasi-sekitar]]'s `sekitar` skill calls it at naskah/voice/render, `unggah-sekitar` at upload.
- Installed 17 Nov 2026 at his yes; a fresh `claude -p` session listed the tool. A dev-mods mod alone loads only in the session that wrote it.
- Panes belong to one chat, so the panel "vanished" when Bryan switched chats (17 Nov 2026). Since then each film chat opens it by itself, once: on a `/sekitar` or `/unggah-sekitar` prompt, on its first `pipeline_update`, or when a chat already tied to a film starts or reloads. Closing it keeps it closed in that chat; `/pipeline` reopens. 4 tests pass.
- **Bryan's rules, 18 Nov 2026** (after I put 6 fresh research ideas on the panel unasked):
  - An idea goes on the panel only when Bryan has its block pasted into its own film chat (or tells me to set up the film chats), never from `riset-sekitar`, the stock or a new suggestion. The tool description, `riset-sekitar` and `sekitar` say so.
  - A film with every stage ticked is never removed by itself: it stays, marked "selesai · tunggu kamu konfirmasi hapus", and I ask him first; `stage: "hapus"` only on his yes. The old end-of-day auto-hide was removed; `/pipeline` lists finished films awaiting his yes. Unfinished films still drop after 7 days without an update.
  - First run: he confirmed hiding lampu-sensor-gerak, telinga-pesawat, cacing-hujan, penyerap-lembap, tekanan-ban-dingin. `tes-panel` (test entry) is still there.
- `Progress` is not in this build's element table (2.1.325) despite the docs; the Gemini bar is drawn with text.

**Why:** he wanted to learn mods and see the 5-film pipeline at a glance.
**How to apply:** if the panel stays empty, check the mod is installed in that session first; on another device the skills skip the tool silently.
