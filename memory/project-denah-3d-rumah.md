---
name: project-denah-3d-rumah
description: "Interactive 3D floor-plan model (Three.js artifact) of a client's 2-storey house renovation, built 22 Oct 2026 from a vector PDF; assumptions, files, how to revise"
metadata:
  node_type: memory
  type: project
  originSessionId: 15892b85-68a6-47a0-a493-83982dd221d9
  modified: 2026-10-22T14:37:40.085Z
---

On 22 Oct 2026 Bryan asked for a 2-floor house plan PDF (renovation, client of his; PDF in `Downloads`)
to be made 3D, with me deciding colours/output and asking only if needed. Delivered as a claude.ai
artifact: https://claude.ai/artifact/FnHJnydC6GQ74aMHnoNxru (views Lantai 1 / Lantai 2 / Rumah utuh,
camera 3D / atas / depan, toggles for room names, PDF dimension chains, furniture, roof, wall-cut slider).
Source HTML + a copy of the PDF: `C:\Bryan De Great\Denah 3D\` (one subfolder per house).

How the sizes were taken: the PDF is vector (shx text, no real text). PyMuPDF `get_drawings()` ×
`page.rotation_matrix`, then mm = pt × 44.08. Dimension ticks sit 1.38 pt past each dim-line end. Exterior
dims run to the outer wall faces; interior walls (~130 mm) are centred on the dim gridlines. All walls,
openings, stair treads and furniture positions are data at the top of the HTML.

My assumptions, not in the drawing (listed on the page): floor-to-floor 3.40 m (the U-stair has 19
risers), L2 walls 3.20 m, doors 2.10 m (main double door 2.40 m), windows 0.90–2.10 m, a flat dak roof
as a placeholder, a concrete canopy over the teras, a 0.8 m front fence, the names Ruang Tengah, Selasar,
Taman Samping and Taman Depan, and all finishes and colours.

**Why:** a renovation is still being designed, so heights, the roof and the finishes may change.
**How to apply:** if Bryan gives real heights, a roof type or other changes, edit the data block in the
source HTML and republish with the artifact URL (read it first in a new session). He hasn't confirmed
the assumptions yet. Keep the client's name and address out of this public repo. Checking method:
[[reference-headless-webgl-screenshots]]. Folder layout: [[reference-folder-layout]].
