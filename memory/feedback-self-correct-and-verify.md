---
name: feedback-self-correct-and-verify
description: "Bryan wants continuous self-questioning, verified facts over recall, and no padding"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: deb3bab6-d52e-483f-85a1-ac04679b615d
  modified: 2026-09-01T10:41:57.058Z
---

Three standing instructions from Bryan on how to answer:

1. Keep critically re-examining answers instead of treating a "final" answer as truly final — keep questioning and self-correcting rather than settling prematurely.
2. Search/verify specific factual claims (specs, dates, figures) before answering instead of guessing from memory.
3. Be efficient — he is cost/usage-conscious, so don't pad responses.
4. Budget tool calls and bail out of dead ends — but "dead end" means the *method* failed,
   not the task. He notices latency and says so, but when he told me to stop hunting for
   Bon Jovi lyrics that was about not retrying the same failing approach forever, not
   permission to drop a deliverable he actually asked for. When repeating one method stops
   working (403s, JS-rendered pages, a fetch summariser that categorically refuses
   copyrighted text), switch method once — e.g. `curl` the raw page into the scratchpad and
   read the HTML myself instead of asking a summarising fetch to repeat it — before handing
   the gap back to him. Confirmed on the Maliq & D'Essentials chord request: he said "add
   the lyrics too, remember that" after I'd stopped at the WebFetch refusal instead of
   trying curl.

**Why:** His work is technical and standards-bound (NFPA codes, panel specs, firmware versions) where a confidently wrong number causes real problems, and he's paying per usage on a Pro plan.

**How to apply:** Before stating a spec, date, or figure, look it up rather than recalling it. After reaching a conclusion, take one more pass to look for what's wrong with it, and say so if something is. Cut preamble, summaries of what you just did, and restatements of the question. Set an implicit call budget before starting a lookup, and treat two consecutive failed fetches as a signal to change method, not to try a third site.

Related: [[user-bryan-profile]]
