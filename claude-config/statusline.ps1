# JARVIS status line for Claude Code.
# Reads session JSON on stdin, prints a single HUD row.
# ASCII-only source: PowerShell 5.1 decodes BOM-less .ps1 as ANSI, so any
# literal Unicode here would be mangled. Glyphs are built from [char] codes.

$ErrorActionPreference = 'Stop'

# Claude Code routes the status line through Git Bash on Windows, where powershell.exe
# inherits the OEM console codepage and mangles the box-drawing glyphs below. Force UTF-8.
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch { }

try {
    $data = $input | Out-String | ConvertFrom-Json

    $e     = [char]27          # ESC, for ANSI colour
    $dim   = "$e[2m"
    $reset = "$e[0m"
    $cyan  = "$e[36m"
    $green = "$e[32m"
    $amber = "$e[33m"
    $red   = "$e[31m"
    $sep   = " $dim" + [char]0x2502 + "$reset "   # vertical bar

    $parts = @()

    # --- location -----------------------------------------------------------
    $cwd = if ($data.workspace.current_dir) { $data.workspace.current_dir } else { $data.cwd }
    if ($cwd) {
        $leaf = Split-Path $cwd -Leaf
        $loc  = "$cyan$leaf$reset"

        $branch = $null
        try { $branch = (& git -C $cwd rev-parse --abbrev-ref HEAD 2>$null) } catch { }
        if ($branch) {
            $dirty = $null
            try { $dirty = (& git -C $cwd status --porcelain 2>$null) } catch { }
            $mark = if ($dirty) { '*' } else { '' }
            $loc += " $dim" + [char]0x2387 + " $branch$mark$reset"
        }
        $parts += $loc
    }

    # --- model + effort -----------------------------------------------------
    if ($data.model.display_name) {
        $m = $data.model.display_name
        if ($data.effort.level) { $m += " $dim.$($data.effort.level)$reset" }
        if ($data.fast_mode)    { $m += " $amber" + [char]0x00BB + "$reset" }
        $parts += $m
    }

    # --- context window as a reactor bar ------------------------------------
    $pct = $data.context_window.used_percentage
    if ($null -ne $pct) {
        $p = [int][math]::Round($pct)
        $filled = [int][math]::Floor($p / 12.5)
        if ($filled -gt 8) { $filled = 8 }

        $colour = if ($p -ge 80) { $red } elseif ($p -ge 55) { $amber } else { $green }
        $full   = [string][char]0x25B0     # filled block
        $empty  = [string][char]0x25B1     # hollow block

        $bar = $colour + ($full * $filled) + $reset + $dim + ($empty * (8 - $filled)) + $reset
        $parts += "$bar $colour$p%$reset"
    }

    # --- session cost -------------------------------------------------------
    if ($data.cost.total_cost_usd) {
        $parts += ('{0}${1:N2}{2}' -f $dim, $data.cost.total_cost_usd, $reset)
    }

    # --- rate limit, only once it matters -----------------------------------
    $rl = $data.rate_limits.five_hour.used_percentage
    if ($null -ne $rl -and $rl -ge 60) {
        $c = if ($rl -ge 85) { $red } else { $amber }
        $parts += ('{0}5h {1:N0}%{2}' -f $c, $rl, $reset)
    }

    Write-Host ($parts -join $sep)
}
catch {
    # Never let the HUD take the session down with it.
    Write-Host "JARVIS"
}
