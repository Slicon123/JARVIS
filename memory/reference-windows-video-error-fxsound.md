---
name: reference-windows-video-error-fxsound
description: "Windows video/audio \"Can't play 0xc00d36b4\" on Bryan's laptop came from the default output being the FxSound virtual device, not the file"
metadata:
  node_type: memory
  type: reference
  originSessionId: 07910cca-17f4-427f-aef7-e1e97719e5b2
  modified: 2026-11-01T10:07:40.648Z
---

On 1 Nov 2026 every file with audio failed in Windows' player on his laptop with `0xc00d36b4` ("format we don't support"), even a plain WAV, while video-only files played. Tested device by device through the Windows media engine: the default output, **Speakers (FxSound Audio Enhancer)**, failed; **Speakers (Synaptics Audio)** and **Speakers (USB Audio Device)** played. No FxSound process was running and it wasn't in the uninstall list, so the virtual device had nothing behind it.

The fix is changing the default output in Windows Sound settings. Check this before re-encoding a video that "won't play". His status not yet confirmed after the change. See [[project-konten-edukasi-sekitar]].
