# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

## What this repo is

JARVIS — Bryan's personal Claude Code workspace. Its purpose is the persistent memory
store in [memory/](memory/), which syncs across his devices via git. No package manager,
build step, or test tooling.

`retro-shooter.html` is an unrelated standalone browser game from an earlier session.
Open it in a browser to run it; it needs no documentation here.

## Memory — read this first

**At the start of every session, read [memory/MEMORY.md](memory/MEMORY.md)** unless it is
already in context, then open the individual files it lists that are relevant to the task.
Do this even if Claude's own memory system loaded nothing — on a device where the junction
below isn't set up, `memory/` in this repo is the only copy that exists.

**After writing or editing anything in `memory/`, commit and push it.** Memory does not
sync on its own, and an uncommitted memory is lost to every other device.

### Writing a memory

One fact per file, `kebab-case-name.md`, plus a one-line pointer in `MEMORY.md`
(`- [Title](file.md) — hook`). Prefer updating an existing file over adding a near-duplicate.

```markdown
---
name: <matches the filename, without .md>
description: <one line; this is what recall matches against>
metadata:
  type: user | feedback | project | reference
---

<the fact. For feedback/project, add **Why:** and **How to apply:** lines.>
<Link related memories as [[their-name]].>
```

`user` = who Bryan is · `feedback` = how he wants Claude to work, with the reasoning ·
`project` = ongoing work and constraints not derivable from the code · `reference` = links
to external resources. Use absolute dates, never "last week". Don't record what the repo
or git history already says.

### How the sync works

`~/.claude/projects/C--Bryan-SMA-X-XII-JARVIS/memory` is a **directory junction** pointing
at this repo's `memory/`, so Claude's ordinary memory reads and writes land straight in git.

Verify it on this machine — this should print `Junction` and the repo path:

```powershell
Get-Item "$env:USERPROFILE\.claude\projects\C--Bryan-SMA-X-XII-JARVIS\memory" | Select-Object LinkType, Target
```

If it errors or reports a blank LinkType, the junction is gone: fall back to reading
`memory/` in this repo directly, and tell Bryan it needs relinking.

### Setting up a new device

Clone the repo, then link the memory directory. The project slug is derived from the clone
path, so read the real name out of `~/.claude/projects/` rather than assuming the one above:

```
mklink /J "%USERPROFILE%\.claude\projects\<slug>\memory" "<repo-path>\memory"   :: Windows, no admin needed
ln -s <repo-path>/memory ~/.claude/projects/<slug>/memory                       # macOS / Linux
```

Until that link exists, memory still works read-only via the instruction at the top of this
section — new memories written on that device will land outside the repo and need moving in.

## Privacy — this repo is PUBLIC

Anything committed to `memory/` is world-readable. Never record credentials, ID numbers,
addresses, or client/employer-confidential material.

Files listed in [.gitignore](.gitignore) are deliberately local-only and exist on Bryan's
main machine even when absent here — currently the PT. Sinergi tender memory, which holds
client-confidential material. If that topic comes up on a device where the file is missing,
do not reconstruct it into a tracked file.
