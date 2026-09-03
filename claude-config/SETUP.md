# claude-config — the JARVIS persona, synced

Canonical copies of the Claude Code config that makes this assistant JARVIS. These live in
the repo so they reach Bryan's other devices; `~/.claude/` itself is not version-controlled.

| Path | What it does |
| --- | --- |
| `output-styles/JARVIS.md` | **The persona.** Appended to Claude's system prompt every request. Delete it and Claude reverts to its default voice. |
| `commands/*.md` | `/diagnostics`, `/protocol`, `/briefing`. Manual-invoke only, so they cost no context until typed. |
| `skills/*/SKILL.md` | Model-invoked skills. Only the name and description sit in context; the body loads when the skill fires. `chords/` prints guitar chord sheets in the terminal. |
| `statusline.ps1` | The terminal HUD. Never enters the model's context. |

On this machine `~/.claude/output-styles`, `~/.claude/commands` and `~/.claude/skills` are
**directory junctions** pointing here, the same trick [memory/](../memory/) uses — so edits land straight
in git. `statusline.ps1` needs no link; `settings.json` points at it by absolute path.

## Setting up a new device

Clone the repo, then link the three directories and set two values in `~/.claude/settings.json`.
If `~/.claude/output-styles`, `~/.claude/commands` or `~/.claude/skills` already exist with
files you want, move them into `claude-config/` first — creating a junction requires the path to be free.

```powershell
$cc = "<repo-path>\claude-config"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\output-styles" -Target "$cc\output-styles"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\commands"      -Target "$cc\commands"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills"        -Target "$cc\skills"
```

Junctions need no admin rights. On macOS or Linux use `ln -s` and rewrite the status line in
`bash` — `statusline.ps1` is Windows-only.

Then in `~/.claude/settings.json`:

```json
{
  "outputStyle": "JARVIS",
  "statusLine": {
    "type": "command",
    "command": "powershell -NoProfile -ExecutionPolicy Bypass -File \"<repo-path>/claude-config/statusline.ps1\""
  }
}
```

Use **forward slashes** in that path even on Windows, and keep the quotes — Claude Code runs
status line commands through Git Bash when Git Bash is installed, which eats unquoted
backslashes and splits on the spaces in `Bryan SMA X-XII`.

`outputStyle` is read once at session start, so it applies after `/clear` or a restart.
A project-level `outputStyle` in any `.claude/settings.local.json` overrides this one.

## Two things that will silently break the status line

Both were real failures here, and both fail *blank* rather than loudly:

1. **Execution policy.** Launched from Git Bash, `powershell.exe` starts under the machine
   policy and refuses to run an unsigned `.ps1`. Hence `-ExecutionPolicy Bypass`. Testing
   from an already-running PowerShell hides this, because the child process inherits a
   permissive process-scope policy.
2. **Output encoding.** Under Git Bash the console falls back to an OEM codepage and the
   box-drawing glyphs arrive as `?` and `�`. The script forces
   `[Console]::OutputEncoding = UTF8` to prevent it.

The script's source is deliberately **ASCII-only**, building every glyph from `[char]`
codes: PowerShell 5.1 decodes a BOM-less `.ps1` as ANSI, so literal Unicode in the file
would be corrupted before it ever ran.

Test any change the way Claude Code actually invokes it — piped into the real command
string from **Git Bash**, not from the PowerShell tool:

```bash
echo '{"model":{"display_name":"Opus 5"},"cwd":"c:/Bryan SMA X-XII/JARVIS","context_window":{"used_percentage":42}}' \
  | powershell -NoProfile -ExecutionPolicy Bypass -File "c:/Bryan SMA X-XII/JARVIS/claude-config/statusline.ps1"
```

A non-zero exit or empty output means a blank status line, with no error shown in the UI.
