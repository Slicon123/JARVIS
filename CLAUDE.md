# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A tiny, dependency-free repo containing a single browser game: [retro-shooter.html](retro-shooter.html) — "NEON SURVIVOR", a Vampire-Survivors-style top-down auto-fire arena shooter. There is no package manager, build step, bundler, or external library — it's one self-contained HTML file with inline `<style>` and `<script>`.

## Running / testing the game

There is no build, lint, or test tooling in this repo. To try a change, open `retro-shooter.html` directly in a browser (double-click, or a `file://` URL) and play it — that's the entire verification loop.

## Architecture (all inside `retro-shooter.html`)

The script is one big IIFE with no modules/classes — everything is plain functions and object-literal arrays operating on shared state:

- **Game state machine**: a single `state` variable cycles through `"title" | "playing" | "levelup" | "gameover"`, driven by a `requestAnimationFrame` loop (`frame()`).
- **Update/draw split**: `update(dt)` does all per-frame logic (movement, spawning, auto-aim/fire, collisions, XP pickup, level-up triggers) for the current state; a corresponding `draw*()` function renders each state (`drawTitle()`, `draw()` for gameplay, `drawGameOver()`, `drawLevelUp()`, `drawHUD()`, `drawEnemy()`, `drawPlayer()`).
- **Entities**: `player` (object), plus `enemies[]`, `bullets[]`, `orbs[]`, `particles[]` — plain arrays of object literals, no entity classes. Enemy types are `grunt`, `brute`, `sprite`, `tank`.
- **Combat**: auto-aim/auto-fire targets the nearest enemy; no manual weapon aiming.
- **Progression**: killing enemies drops XP orbs; leveling up pauses gameplay (`state = "levelup"`) and shows an upgrade-card picker built from `UPGRADE_POOL` (8 upgrades) via `rollUpgrades()` / `triggerLevelUp()`.
- **Audio**: procedural WebAudio sound effects via a `beep()` helper and an `sfx` object — no audio files.
- **Persistence**: best runs are saved to `localStorage` under key `neonSurvivorRecords` (`RECORDS_KEY`), keeping the top 8 scores. No server, no networking.

When adding features (new enemy types, upgrades, weapons), follow the existing pattern: add data to the relevant pool/array, then wire it into both `update()` and the matching `draw*()` function.

## Persistent memory (synced across devices)

This repo doubles as the store for Claude Code's persistent memory about Bryan. The
files live in [memory/](memory/), indexed by [memory/MEMORY.md](memory/MEMORY.md) —
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
