---
name: feedback-permission-check-outage
description: When the auto-mode permission check returns "no verdict", don't burn retries — batch shell work, fall back to file tools, keep his file untouched until one verified final copy
metadata:
  type: feedback
---

On 2026-09-28, in a long PowerPoint-editing session, the auto-mode permission classifier returned "no verdict" on shell commands in two waves (about ten times). Ten no-verdicts in a row end the turn, and I spent several of them re-sending the same command; the final write to his file stalled and he had to say "lanjut" twice. He asked me to evaluate what held me up and remember it.

**Why:** The outage itself is external and transient, but retries are a small budget, and a stalled turn costs him waiting time and usage (he is cost-conscious — see [[feedback-self-correct-and-verify]]).

**How to apply:**
- Retry a no-verdict command at most once. In between, do work that needs no shell — Write, Edit and Read kept working during the outage, so create spec/data files with Write rather than shell heredocs.
- Batch shell work into fewer, fuller commands (build + verify in one run): fewer permission checks, fewer chances to stall.
- Keep his real file untouched until everything is verified in the scratchpad, then write it with ONE short command: lock-file check, hash-before check, copy, hash-after check.
- If that last step is blocked, stop and say plainly what is done, that his file is still the old version, where the verified result sits, and that "lanjut" resumes.

Related: [[feedback-pptx-edit-checklist]]
