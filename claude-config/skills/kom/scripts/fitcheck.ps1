param([string]$deck, [string]$outdir, [string]$slides = "")
# Opens the deck read-only in PowerPoint, measures every text box at 100% font size
# (autofit switched off in memory only), exports PNGs, closes without saving.
# Width excess up to 3 pt is ignored: PowerPoint counts trailing spaces in BoundWidth,
# and the original decks show the same readings on text that renders fine.
$ErrorActionPreference = "Stop"
$pp = New-Object -ComObject PowerPoint.Application
$pres = $pp.Presentations.Open($deck, $true, $false, $false)
New-Item -ItemType Directory -Force $outdir | Out-Null
$want = @()
if ($slides) { $want = $slides.Split(",") | ForEach-Object { [int]$_ } }
$report = @()
foreach ($sl in $pres.Slides) {
  $i = $sl.SlideIndex
  if ($want.Count -gt 0 -and -not ($want -contains $i)) { continue }
  foreach ($sh in $sl.Shapes) {
    if (-not $sh.HasTextFrame) { continue }
    $tf = $sh.TextFrame2
    if (-not $tf.HasText) { continue }
    if ($tf.AutoSize -eq 1) { continue }   # box grows with its text (cover slide)
    $tf.AutoSize = 0
    $avail = $sh.Height - $tf.MarginTop - $tf.MarginBottom
    $availW = $sh.Width - $tf.MarginLeft - $tf.MarginRight
    $need = $tf.TextRange.BoundHeight
    $wide = $tf.TextRange.BoundWidth
    if ($need -gt $avail + 1 -or $wide -gt $availW + 3) {
      $report += ("slide {0} '{1}': needs h{2:N1} (has {3:N1}), w{4:N1} (has {5:N1})" -f $i, $sh.Name, $need, $avail, $wide, $availW)
    }
  }
  $sl.Export((Join-Path $outdir ("s{0:D2}.png" -f $i)), "PNG", 1920, 1080)
}
$pres.Saved = $true
$pres.Close()
if ($report.Count -eq 0) { "FIT OK" } else { $report }
