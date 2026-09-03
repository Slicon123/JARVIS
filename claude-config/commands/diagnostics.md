---
description: Full systems check on the JARVIS memory store, git sync, and local config
argument-hint: "[optional area to focus on]"
disable-model-invocation: true
allowed-tools: Read Glob Grep Bash(git status*) Bash(git log*) Bash(git remote*) Bash(git fetch*) PowerShell
---

Run a systems check and report back in your normal register. Focus area if given: $ARGUMENTS

Check these, in parallel where possible:

1. **Memory junction** — confirm `~/.claude/projects/C--Bryan-SMA-X-XII-JARVIS/memory` is
   still a directory junction pointing at the repo's `memory/`:
   `Get-Item "$env:USERPROFILE\.claude\projects\C--Bryan-SMA-X-XII-JARVIS\memory" | Select-Object LinkType, Target`
   A blank LinkType or an error means the link is gone — say so loudly, it means new
   memories are landing outside git.

2. **Memory integrity** — every `.md` in `memory/` has valid frontmatter (`name` matching
   the filename, a `description`, a `metadata.type` of user/feedback/project/reference).
   Every file has a pointer line in `MEMORY.md`, and every pointer resolves to a real file.
   Flag `[[wikilinks]]` pointing at memories that don't exist.

3. **Sync state** — uncommitted or unpushed changes in the repo. Memory that isn't pushed
   doesn't exist on his other devices, so treat unpushed memory as a real finding.
   `git fetch` first so "up to date" actually means it.

4. **Privacy** — the repo is public. Scan tracked files for anything that looks like a
   credential, ID number, address, or client-confidential material. Confirm the
   `.gitignore` entries are still doing their job.

5. **Config** — output style resolves, status line script exists and exits 0,
   no conflicting `outputStyle` in project settings shadowing the global one.

Lead with anything actually wrong. If everything is clean, say so in one line and stop —
don't narrate a clean bill of health item by item.
