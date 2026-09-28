---
name: feedback-pptx-edit-checklist
description: Checklist for editing Bryan's .pptx files — raw XML first, measure fit with PowerPoint itself, reset stale autofit, audit every slide, one verified copy
metadata:
  type: feedback
---

Self-evaluation he asked me to keep, from avoidable re-runs on 2026-09-28:

1. Before regex-fixing text, dump the raw run XML of the target paragraphs. Text he pastes is split into per-word runs (spell-check `err="1"`), so a stray tab can sit alone in its own run — a per-run fix missed it three times.
2. Don't assume every text box uses normAutofit; some are noAutofit and must fit by size alone.
3. Measure fit with PowerPoint itself over COM (`TextFrame2.AutoSize = 0`, then `TextRange.BoundHeight`), not a font-metrics estimate, and probe all candidate widths in one run rather than several.
4. When resizing a box, reset its stored `fontScale` / `lnSpcReduction` — PowerPoint keeps the old shrink until the text is edited.
5. Finish with an overflow audit of every text box on every slide, a text diff proving only the intended paragraphs changed, and a render of each changed slide.
6. Chain commands so a failed build step can't feed a later one (an audit once ran against a file that hadn't been written).
7. When filtering text for a review, don't drop shapes by pattern — a digit-only filter once made a filled field look empty.

**Why:** Each slip cost a re-run while he was waiting, and he values verified, efficient work.

**How to apply:** Run this list before reporting any PowerPoint edit as done.

Related: [[feedback-permission-check-outage]], [[feedback-self-correct-and-verify]]
