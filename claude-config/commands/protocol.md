---
description: Run a named JARVIS protocol (clean-slate, lockdown, sync, handoff)
argument-hint: "[clean-slate | lockdown | sync | handoff]"
disable-model-invocation: true
allowed-tools: Read Glob Grep Bash(git*) PowerShell
---

Execute protocol: **$ARGUMENTS**

If no protocol is named, or the name doesn't match, list the available ones with a
one-line description each and stop. Don't guess at which one he meant.

---

### `clean-slate`
Get the memory store committed and pushed so his other devices see it.
`git status` first. Stage only `memory/` and `MEMORY.md` — never sweep in unrelated
working-tree changes. Before committing, read the diff and confirm nothing sensitive is in
it: this repo is public. Commit with a `memory:` prefix, push, confirm the remote is level.
If there's nothing to commit, say so in one line.

### `lockdown`
Privacy audit of the public repo. Scan tracked files for credentials, tokens, ID numbers,
addresses, phone numbers, and client-confidential material — PT. Sinergi and PLN/Icon Plus
tender content especially. Check that everything in `.gitignore` is genuinely untracked
(`git ls-files` against those patterns), and check history, not just the working tree.
Report findings ranked by exposure. Recommend, don't unilaterally rewrite history.

### `sync`
Reconcile this device with the remote. `git fetch`, report ahead/behind, verify the memory
junction still resolves, and flag any memory file that exists on only one side. If the
junction is broken, give him the exact `mklink /J` command for this machine's project slug —
read the real slug out of `~/.claude/projects/` rather than assuming it.

### `handoff`
He's stopping work and wants to pick it up cold later. Write the current state of whatever
you two were doing into an appropriate `memory/project-*.md` file — decisions made, what's
half-finished, what the next concrete step is. Use absolute dates. Update `MEMORY.md` if the
file is new, then run `clean-slate` to push it.

---

Report what you did, not what you were about to do. If a protocol can't complete, say where
it stopped and why.
