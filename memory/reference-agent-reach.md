---
name: reference-agent-reach
description: Agent Reach CLI installed 18 Nov 2026 (audited); when it beats WebFetch/WebSearch/Chrome and when it doesn't, measured
metadata:
  type: reference
---

Agent Reach v1.6.1 (github.com/Panniantong/agent-reach, MIT) installed 18 Nov 2026 with
`uv tool install` from the GitHub release zip (never PyPI: that package is an impostor).
uv came from `winget install astral-sh.uv` (the `irm | iex` installer is blocked here).
Audit: release zip = v1.6.1 tag; read-only; no telemetry; browser debugging bound to 127.0.0.1;
login reuse copies one site's cookies through CDP, never the password store. Its skill lands in
`claude-config/skills/agent-reach` (gitignored) plus ~/.gemini and ~/.copilot.

Measured 18 Nov 2026, characters entering context:
- Search: WebSearch ~3.2K summarised vs Agent Reach 13.4K raw → keep WebSearch.
- Normal page: WebFetch ~0.9K vs Agent Reach 4.1K (2.5K cleaned) → keep WebFetch.
- Tokopedia search: WebFetch times out at 60 s; Agent Reach 8 s, 21K raw → 3K through
  `riset-sekitar/scripts/ar_read.py --grep Rp` → use Agent Reach.
- Ultimate Guitar: WebFetch gets the title only; Agent Reach reads the full sheet in ~2K → use it.
- Shopee, YouTube Studio, Facebook: login wall → Chrome stays.
- yt-dlp: his Python already has it (2026.10.26), so the per-run pip install (17 s) was dropped;
  Agent Reach's bundled copy is older (2026.08.19) and only a fallback.

Gotcha: this Python is the MSIX build, so a subprocess it starts can't run agent-reach
("uv trampoline failed to canonicalize"). Run agent-reach from the shell and pipe into Python.

Related: [[feedback-search-before-building]], [[project-konten-edukasi-sekitar]].
