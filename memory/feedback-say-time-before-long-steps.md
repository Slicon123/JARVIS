---
name: feedback-say-time-before-long-steps
description: Before a step that takes minutes (video renders, exports, big checks), tell Bryan roughly how long it will take
metadata:
  type: feedback
---

Before starting anything that runs for more than a minute or two — an animate export (~4 min for 24s on his laptop), a full review.mjs pass (several more), big batch jobs — say up front roughly how long it will take and what he'll get at the end.

**Why:** on 7 Oct 2026, during the first animate piece, he asked "why are you taking so long?" mid-render. He'd had no warning that a render plus a full check takes 10+ minutes.

**How to apply:** one line before the step ("rendering now, about 4 minutes"). Also avoid redoing long steps: for the animate skill, always run build.mjs before export.mjs (export uses the existing index.html). See [[project-animate-skill]].
