---
name: project-animate-skill
description: The animate skill (motion graphics in code) installed 7 Oct 2026 as an experiment — not for his clipping work; per-video language; Indonesian pace limit still an estimate
metadata:
  type: project
---

On 7 Oct 2026 Bryan found cth9191/animate (a skill that makes short animated videos in code). I analysed it as a
motion designer, then installed an adapted copy at `claude-config/skills/animate/` with the gaps fixed (see its
`CHANGES.md`): BT.709 colour, per-piece language, contrast/flash/hook/compression checks, an animatic step,
anticipation/overlap/stagger helpers.

- **It's an experiment for now, not for [[project-content-clipping-automation]].** Don't steer it toward his clips.
- **Language per video:** he wants both — one video Indonesian, the next English. `piece.json` `"lang": "id" | "en"`.
- **Indonesian narration pace (6 syllables/s) is an estimate** — no measured Indonesian rate was found. After his first
  real Indonesian voice take, measure its syllables/s and adjust `tools/speech.mjs` if a comfortable read exceeds it.
- **Pieces go in `C:\Bryan De Great\Animasi\`**, never in the JARVIS repo (public). See [[reference-folder-layout]].
- This machine has only English Windows voices (David, Zira), so an Indonesian scratch voice is read with an
  American accent — timing only; the real take fixes it.
- ffmpeg came from winget and sits on the user PATH; a VS Code session started before 7 Oct 2026 19:00 needs a restart to see it.

**Why:** he asked for an expert analysis plus the fixes, for experimenting.
**How to apply:** when he asks for an animation, use the skill, ask the language if unclear, and say which checks are
estimates (the Indonesian pace, the flash approximation).
