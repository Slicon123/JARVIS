# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## What this repo is

JARVIS — Bryan's personal Claude Code workspace. Its main purpose is the persistent
memory store below, which syncs across his devices via git. There is no package
manager, build step, or test tooling.

`retro-shooter.html` is an unrelated self-contained browser game left over from an
earlier session; open it in a browser to run it. It needs no documentation here.

## Persistent memory (synced across devices)

Claude Code's persistent memory about Bryan lives here. The files live in [memory/](memory/), indexed by [memory/MEMORY.md](memory/MEMORY.md) —
one fact per file, with `name` / `description` / `metadata.type` frontmatter
(`user` | `feedback` | `project` | `reference`).

**Read [memory/MEMORY.md](memory/MEMORY.md) at the start of a session** if it wasn't
already loaded into context, and open the individual files it points to when they're
relevant to the task. Write new memories into `memory/` using the same format, and add
a one-line pointer to `MEMORY.md`.

### How the sync works

`~/.claude/projects/c--Bryan-SMA-X-XII-JARVIS/memory` is a **directory junction**
pointing at this repo's `memory/` folder, so Claude's normal memory reads and writes
land directly in git. Commit and push to share them; `git pull` on another device
picks them up.

### One-time setup on a new device

Clone the repo, then link the memory dir (Windows, no admin needed — the project slug
is derived from the clone path, so check `~/.claude/projects/` for the actual name):

```
mklink /J "%USERPROFILE%\.claude\projects\<project-slug>\memory" "<repo-path>\memory"
```

macOS/Linux equivalent: `ln -s <repo-path>/memory ~/.claude/projects/<project-slug>/memory`

### Privacy

**This repo is public.** Anything written to `memory/` is world-readable once pushed.
Do not record credentials, ID numbers, addresses, or client/employer-confidential
material. Files that must stay local-only are listed in [.gitignore](.gitignore).
