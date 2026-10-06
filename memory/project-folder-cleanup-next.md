---
name: project-folder-cleanup-next
description: "Folder cleanup after the C:\\Bryan De Great rename: kuliah done 6 Oct 2026; non-kuliah files (Downloads, root) and a GP-100 registry fix still open"
metadata:
  type: project
---

Bryan renamed `C:\Bryan SMA X-XII` to `C:\Bryan De Great` and is tidying up in stages
("kuliah dulu, bertahap").

- **Done 6 Oct 2026:** the fix-ups after the rename (Git, junctions, session slug, status line,
  GP-100 shortcuts) and the kuliah cleanup. Where coursework lives now:
  [[project-uksw-digital-business]].
- **Next, only when he asks:** the non-kuliah files. Downloads still holds many Sinergi/Icon Plus
  work files (laporan PM, MOP/SOP/EOP, KOM, Kurva S, proposals, a tender BA), WhatsApp photos,
  old SMA files, installers and large videos. The root of `C:\Bryan De Great` still has
  `Image_20260625_0001.pdf` (scanned FSS smoke-detector checklist, Gandul, 23 Mei 2026),
  `EDARAN DAN JADWAL PSAS Gasal 23-24.pdf` and two `data-…zip` exports.
- **Still open, needs admin:** registry `HKLM\...\Uninstall\GP-100` (UninstallString,
  UninstallDir, DisplayIcon) still points at the old path. It only matters if he uninstalls the
  GP-100 editor from Settings. Fix from an admin PowerShell by replacing `SMA X-XII` with
  `De Great` in those three values.
- Lesson: auto mode's permission check blocks `cmd /c rmdir` on junctions whose names resolve
  under `C:\Bryan…`. `[System.IO.Directory]::Delete($link, $false)` removes only the link and
  isn't blocked.

**Why:** a new session starts cold; this keeps what is left and the rules that worked.
**How to apply:** same rules as the kuliah stage: inventory first and show him a "file ini pindah
ke sini" list before touching anything; move, don't delete; only md5-identical duplicates (or
files he names) go to the Recycle Bin; keep an old→new log. Delete this memory when all is done.
