---
name: feedback-search-before-building
description: before building a new skill, tool, script or app, search GitHub / Hugging Face for an existing one first, then audit it before use
metadata:
  type: feedback
---

Before building any new skill, tool, script or small app from scratch, first search
GitHub (and Hugging Face for models/agents) for something that already does most of it.
Also search the Higgsfield skills catalog (https://higgsfield.ai/skills), added by Bryan
on 18 Nov 2026. It matters most for image, video and visual tasks such as covers, product
shots and sekitar visuals. Higgsfield runs on its own MCP server
(mcp.higgsfield.ai) and on credits that cost money. Report what fits and what it would
cost, and never connect it, log in or spend credits without his yes.
Report what was found in one or two lines: name, link, licence, last update, how much of
the job it covers. Then:

- Good fit → audit it before installing (read every file that runs: scripts, hooks,
  install steps; look for network calls, credential reads, obfuscated code), credit it in
  a SOURCES.md like `humanizer` does, and trim it with `skill-audit`.
- Partial fit → reuse the useful part, build only the gap.
- Nothing usable → build from scratch, and say the search came up empty.

Skip the search only for tiny one-off scripts or when Bryan says to build it himself.

**Why:** Bryan agreed on 18 Nov 2026 (after a TikTok tip from SamAi) that most tools
already exist somewhere, often better; `humanizer` (blader/humanizer) and `impeccable`
v4.9.2 already came this way and saved work. claude-config is a public repo, so a
third-party skill must be audited before it lands there.

**How to apply:** make the search the first step of any "bikin skill / tool / script"
request; ask before installing, per [[feedback-ask-before-better-idea]]. Related:
[[feedback-self-correct-and-verify]].
