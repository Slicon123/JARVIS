---
name: feedback-pdf-to-word-replica
description: How to rebuild a PDF as a Word file that matches the original layout to within about 1 pt; Word line-spacing and page-break quirks, plus the checks to run
metadata:
  type: feedback
---

This method worked on 10 Oct 2026 for [[project-iom-genset-sss]]: 105 of 107 checked lines landed within 1 pt of the
original, and every line break matched.

1. Ask first about anything odd in the source (wrong numbering, overlapping text, another company's slogan). Then
   rebuild from the PDF's own data: PyMuPDF spans give text, fonts and baselines, and the drawings give shape and
   line coordinates. Write raw WordprocessingML. Don't use Word's PDF import.
2. With "Exactly" line spacing L, Word puts the baseline 0.8×L below the line top for every font tested. So
   spacing-before = (original baseline − 0.8×L) − bottom of the previous paragraph. If a one-line paragraph would
   overlap the one above, shrink its L instead of pushing it down.
3. Word drops spacing-before on the first paragraph after a page break (pageBreakBefore). End each page with a
   next-page section break instead. A section with no header reference inherits the previous header.
4. Word fits slightly more Arial on a line than the original did. Use explicit line breaks wherever the original
   breaks differ. In a justified paragraph, Word still stretches a line that ends in a manual break.
5. Header/footer logos, lines and flowchart shapes go in as page-anchored drawings at the original coordinates.
   Put a photo behind the text (behindDoc) so its white margin doesn't hide nearby text.
6. Verify by exporting through Word COM. Then compare probe baselines (aim for ≤1 pt), line-end words and
   side-by-side page PNGs, and grep for old names and typos. In PowerShell, `Quit()` takes no arguments (`Quit(0)`
   throws). Stop only the WINWORD PID you started.

**Why:** Bryan wants the replica to look the same as the original, with nothing changed beyond what he asked
([[feedback-duplicate-means-exact-copy]]). Getting there without these rules took several rebuilds.

**How to apply:** use this for any "jadikan Word / bikin persis kayak PDF ini" request. For Excel, see
[[feedback-excel-com-checklist]].
