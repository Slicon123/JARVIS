---
name: project-guitar-presets-gp100
description: "Valeton GP-100 preset matching — use the unit's real block names, plus an open noise issue on the Power LD amp model"
metadata: 
  node_type: memory
  type: project
  originSessionId: deb3bab6-d52e-483f-85a1-ac04679b615d
  modified: 2026-09-01T10:42:23.995Z
---

Bryan matches guitar tones from cover videos to build presets on a Valeton GP-100. Firmware V2.1, companion app V1.5.1.

Files: presets (`.prst`) in `C:\Bryan De Great\Musik\Preset GP-100\`; current firmware, app setup
and Valeton ASIO driver zips in `Musik\GP-100 Installer\`. The editor itself is installed at
`C:\Bryan De Great\GP-100\` (shortcuts point there, don't move it). **Still open, needs admin:**
registry `HKLM\...\Uninstall\GP-100` (UninstallString, UninstallDir, DisplayIcon) still points at the
pre-rename `C:\Bryan SMA X-XII` path. It only matters if he uninstalls the editor from Settings. Fix from
an admin PowerShell by replacing `SMA X-XII` with `De Great` in those three values.

Open issue: unwanted fuzz/noise isolated to the AMP model "Power LD" (high-gain lead amp) — persists even with DST bypassed and gain/presence lowered.

**Why:** Generic pedalboard advice doesn't map onto the GP-100's signal chain, so it wastes his time.

**How to apply:** Use the GP-100's actual block and parameter names — PRE, DST, AMP, NR, CAB, EQ, MOD, DLY, RVB — never generic pedal terms. Verify parameter behavior against the actual firmware version rather than assuming.

Related: [[user-bryan-profile]], [[feedback-self-correct-and-verify]]
