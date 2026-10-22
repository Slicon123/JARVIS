---
name: reference-headless-webgl-screenshots
description: "How to screenshot a WebGL/Three.js page on Bryan's laptop with headless Chrome to check it before publishing, incl. the phone-width trap"
metadata:
  node_type: memory
  type: reference
  originSessionId: 15892b85-68a6-47a0-a493-83982dd221d9
  modified: 2026-10-22T14:37:41.252Z
---

Chrome is at `C:\Program Files\Google\Chrome\Application\chrome.exe` (Edge also installed). WebGL renders
headless with SwiftShader (worked 22 Oct 2026, three.js 0.160 from jsDelivr):

`chrome --headless=new --no-first-run --user-data-dir=<own dir per run> --use-angle=swiftshader
--enable-unsafe-swiftshader --ignore-gpu-blocklist --hide-scrollbars --window-size=1366,820
--virtual-time-budget=25000 --screenshot=<out.png> "file:///<page>.html#<hash>"`

- An artifact file has no doctype/head, so wrap it in a small test page first.
- Parallel runs need separate `--user-data-dir`s, or the profile lock silently drops screenshots.
- `--window-size=390,…` does NOT give a 390 px layout (Chrome keeps a ~500 px minimum width), so the
  phone layout looks broken when it isn't. For phone checks, put the page in a 390×844 `<iframe>` and
  screenshot that.
- Use a bare `#token` hash to open a specific view, because artifacts only pass bare-token hashes.

Used for [[project-denah-3d-rumah]].
