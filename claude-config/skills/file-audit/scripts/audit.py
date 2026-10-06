"""Pre-send audit helpers for Excel, Word, PowerPoint and PDF files (Windows, real Office via COM).

  python audit.py scan <file> [--out DIR]       read-only report + page renders, works on a copy
  python audit.py diff <before> <after>          what changed between two versions (text and formulas)
  python audit.py install <fixed> <target> <backup>
                                                 replace target with fixed, only if target is closed
                                                 and still byte-identical to backup

Needs: pywin32, pymupdf, pillow. Office must be installed for xlsx/docx/pptx.
"""
import collections, csv, filecmp, io, os, re, shutil, subprocess, sys, tempfile, zipfile
from contextlib import contextmanager

APPS = {'.xlsx': ('Excel.Application', 'EXCEL.EXE'), '.xlsm': ('Excel.Application', 'EXCEL.EXE'),
        '.docx': ('Word.Application', 'WINWORD.EXE'), '.pptx': ('PowerPoint.Application', 'POWERPNT.EXE')}
PLACEHOLDER = re.compile(r'\b(TBD|TBA|XXX+|lorem ipsum|dummy|contoh nama)\b|\[[A-Z]\]|\?\?\?|<isi[^>]*>', re.I)
YEAR = re.compile(r'\b(20[0-4]\d)\b')
ERR_MIN = -2146826300                     # Excel error values come back as ints near -2.1e9


def out(*a):
    print(*a, flush=True)


def pids(image):
    r = subprocess.run(['tasklist', '/fo', 'csv', '/nh', '/fi', f'imagename eq {image}'],
                       capture_output=True, text=True)
    return {int(row[1]) for row in csv.reader(io.StringIO(r.stdout)) if len(row) > 1 and row[1].isdigit()}


@contextmanager
def office(progid, image):
    """Start a private Office instance; kill only the process we started (never Bryan's)."""
    import win32com.client
    before = pids(image)
    app = win32com.client.DispatchEx(progid)
    mine = pids(image) - before               # our instance; empty if PowerPoint reused Bryan's
    try:
        app.DisplayAlerts = False if image != 'POWERPNT.EXE' else 1   # ppAlertsNone = 1
    except Exception:
        pass
    try:
        yield app
    finally:
        try:
            if mine:                          # never Quit an instance Bryan is using
                app.Quit()
        except Exception:
            pass
        del app
        for pid in mine:
            subprocess.run(['taskkill', '/f', '/pid', str(pid)], capture_output=True)


def is_open(path):
    d, b = os.path.split(path)
    # Word shortens long names in its lock file: ~$ + name minus its first 2 chars
    return any(os.path.exists(os.path.join(d, n)) for n in ('~$' + b, '~$' + b[2:]))


def text_findings(label, texts):
    """texts: iterable of (where, text). Reports placeholders, double spaces, years."""
    ph, dbl, years = [], [], collections.Counter()
    for where, t in texts:
        if not isinstance(t, str) or not t.strip():
            continue
        for m in PLACEHOLDER.finditer(t):
            ph.append(f'{where}: {m.group(0)!r} in {t.strip()[:80]!r}')
        if re.search(r'\S  +\S', t):
            dbl.append(where)
        years.update(YEAR.findall(t))
    out(f'[{label}] placeholders: {len(ph)}')
    for x in ph[:30]:
        out('   ', x)
    out(f'[{label}] double spaces inside text: {len(dbl)}' + (f'  e.g. {dbl[:8]}' if dbl else ''))
    out(f'[{label}] years mentioned: ' + (', '.join(f'{y} x{n}' for y, n in sorted(years.items())) or 'none'))


def package_scan(path):
    z = zipfile.ZipFile(path)
    names = z.namelist()
    risky = [n for n in names if re.search(r'comment|threaded|person|externalLink|vbaProject|embeddings|customXml/item', n, re.I)]
    out('[package] parts worth a look:', risky or 'none')
    for part, tags in (('docProps/core.xml', 'dc:creator|cp:lastModifiedBy|dc:title|dc:subject|cp:keywords|dc:description'),
                       ('docProps/app.xml', 'Company|Manager|Template')):
        if part in names:
            s = z.read(part).decode('utf8', 'replace')
            out(f'[metadata] {part}:', re.findall(rf'<({tags})>([^<]*)<', s))
    return z


def contact_sheets(pdf, prefix, outdir, dpi=60, per=6):
    """Render every page and paste them into sheets of `per` pages, so few images need viewing."""
    import pymupdf
    from PIL import Image
    doc = pymupdf.open(pdf)
    sizes = collections.Counter(f'{round(p.rect.width)}x{round(p.rect.height)}pt' for p in doc)
    out(f'[render] {os.path.basename(pdf)}: {doc.page_count} pages, sizes {dict(sizes)}')
    imgs = []
    for p in doc:
        pix = p.get_pixmap(dpi=dpi)
        imgs.append(Image.frombytes('RGB', (pix.width, pix.height), pix.samples))
    files = []
    for s in range(0, len(imgs), per):
        chunk = imgs[s:s + per]
        cols = 3 if len(chunk) > 2 else len(chunk)
        rows = -(-len(chunk) // cols)
        w = max(i.width for i in chunk)
        h = max(i.height for i in chunk)
        sheet = Image.new('RGB', (w * cols, h * rows), 'white')
        for k, im in enumerate(chunk):
            sheet.paste(im, ((k % cols) * w, (k // cols) * h))
        fn = os.path.join(outdir, f'{prefix}-p{s + 1}-{s + len(chunk)}.png')
        sheet.save(fn)
        files.append(fn)
    for fn in files:
        out('   view:', fn)
    return files


# ---------------------------------------------------------------- Excel
def scan_xlsx(copy, outdir):
    z = package_scan(copy)
    wbx = z.read('xl/workbook.xml').decode()
    rels = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', z.read('xl/_rels/workbook.xml.rels').decode()))
    part = {name: 'xl/' + rels[rid].lstrip('/').replace('xl/', '')
            for name, rid in re.findall(r'<sheet name="([^"]+)"[^>]*r:id="(rId\d+)"', wbx)}
    out('[views] active tab (0-based):', re.findall(r'activeTab="(\d+)"', wbx) or ['0'])
    with office(*APPS['.xlsx']) as xl:
        wb = xl.Workbooks.Open(copy, 0, True)
        texts = []
        for i, sh in enumerate(wb.Worksheets, 1):
            ur = sh.UsedRange
            forms, vals = ur.Formula, ur.Value
            if not isinstance(forms, tuple):
                forms, vals = ((forms,),), ((vals,),)
            nf, errs = 0, []
            for r, (frow, vrow) in enumerate(zip(forms, vals)):
                for c, (fv, vv) in enumerate(zip(frow, vrow)):
                    addr = f'{sh.Name}!R{ur.Row + r}C{ur.Column + c}'
                    if isinstance(fv, str) and fv.startswith('='):
                        nf += 1
                    elif isinstance(vv, str):
                        texts.append((addr, vv))
                    if isinstance(vv, int) and vv < -2000000000:
                        errs.append(addr)
            vis = {-1: 'visible', 0: 'hidden', 2: 'very hidden'}.get(sh.Visible, sh.Visible)
            ps = sh.PageSetup
            out(f'[sheet {i}] {sh.Name!r} {vis}, protected={bool(sh.ProtectContents)}, used {ur.Address}, '
                f'formulas {nf}, errors {len(errs)}, comments {sh.Comments.Count}, '
                f'paper {ps.PaperSize} orient {ps.Orientation} printArea {ps.PrintArea or "-"}')
            for e in errs[:20]:
                out('    error at', e)
            xml_name = part.get(sh.Name.replace('&', '&amp;'), '')
            sx = z.read(xml_name).decode() if xml_name in z.namelist() else ''
            out('    view:', re.findall(r'<sheetView [^>]*>', sx)[:1], re.findall(r'<selection [^>]*>', sx)[:1])
            hidden_rows = sum(1 for r in range(ur.Row, min(ur.Row + ur.Rows.Count, ur.Row + 5000)) if sh.Rows(r).Hidden)
            hidden_cols = sum(1 for c in range(ur.Column, ur.Column + ur.Columns.Count) if sh.Columns(c).Hidden)
            if hidden_rows or hidden_cols:
                out(f'    hidden rows {hidden_rows}, hidden cols {hidden_cols} (check for stale data)')
        bad = [(n.Name, n.RefersTo) for n in wb.Names
               if '#REF' in str(n.RefersTo) and not n.Name.startswith('_xlfn')]
        out('[names] broken:', bad or 'none')
        try:
            links = wb.LinkSources(1)
        except Exception:
            links = None
        out('[links] external workbooks:', links or 'none')
        text_findings('text', texts)
        visible = [sh for sh in wb.Worksheets if sh.Visible == -1]
        files = []
        for sh in visible:
            pdf = os.path.join(outdir, f'sheet-{sh.Index}.pdf')
            try:
                sh.ExportAsFixedFormat(0, pdf)
                files.append((sh.Name, pdf))
            except Exception as e:
                out(f'[render] {sh.Name}: nothing to print ({e.__class__.__name__})')
        wb.Close(False)
    out('[render] note: PDFs from a hidden Excel can come out Letter; trust paperSize above, not the PDF size')
    for name, pdf in files:
        contact_sheets(pdf, re.sub(r'\W+', '_', name), outdir)


# ---------------------------------------------------------------- Word
def scan_docx(copy, outdir):
    z = package_scan(copy)
    doc_xml = z.read('word/document.xml').decode('utf8', 'replace')
    out('[review] tracked insertions/deletions in XML:', len(re.findall(r'<w:ins ', doc_xml)), '/',
        len(re.findall(r'<w:del ', doc_xml)))
    out('[review] highlighted runs:', len(re.findall(r'<w:highlight ', doc_xml)),
        '| hidden-text runs:', len(re.findall(r'<w:vanish/>', doc_xml)))
    with office(*APPS['.docx']) as wd:
        wd.Visible = False
        doc = wd.Documents.Open(copy, False, True, False)
        out(f'[doc] pages {doc.ComputeStatistics(2)}, revisions {doc.Revisions.Count}, comments {doc.Comments.Count}, '
            f'TOCs {doc.TablesOfContents.Count}, fields {doc.Fields.Count}')
        texts = [(f'para {i}', p.Range.Text) for i, p in enumerate(doc.Paragraphs, 1)]
        for s in doc.Sections:
            for kind, coll in (('header', s.Headers), ('footer', s.Footers)):
                for k in (1, 2, 3):
                    try:
                        texts.append((f'{kind}{k} sec{s.Index}', coll(k).Range.Text))
                    except Exception:
                        pass
        text_findings('text', texts)
        pdf = os.path.join(outdir, 'document.pdf')
        doc.ExportAsFixedFormat(pdf, 17)      # render first, so the pages show the file as it is
        if doc.TablesOfContents.Count:
            before = [t.Range.Text for t in doc.TablesOfContents]
            for t in doc.TablesOfContents:
                t.Update()                    # on the throwaway copy only; never saved
            stale = [i + 1 for i, (b, t) in enumerate(zip(before, doc.TablesOfContents)) if b != t.Range.Text]
            out('[toc] stale tables of contents (page numbers or headings differ after update):', stale or 'none')
        doc.Close(False)
    contact_sheets(pdf, 'document', outdir)


# ---------------------------------------------------------------- PowerPoint
def scan_pptx(copy, outdir):
    package_scan(copy)
    with office(*APPS['.pptx']) as pp:
        pres = pp.Presentations.Open(copy, -1, 0, 0)      # read-only, no window
        texts, notes, hidden, overflow, comments = [], [], [], [], 0
        for s in pres.Slides:
            if s.SlideShowTransition.Hidden:
                hidden.append(s.SlideIndex)
            comments += s.Comments.Count
            try:
                n = s.NotesPage.Shapes.Placeholders(2).TextFrame.TextRange.Text
                if n.strip():
                    notes.append(s.SlideIndex)
            except Exception:
                pass
            for sh in s.Shapes:
                if sh.HasTextFrame and sh.TextFrame.HasText:
                    texts.append((f'slide {s.SlideIndex} {sh.Name}', sh.TextFrame.TextRange.Text))
                    tf = sh.TextFrame2
                    if tf.AutoSize == 0 and tf.TextRange.BoundHeight > sh.Height + 2:
                        overflow.append(f'slide {s.SlideIndex} {sh.Name}')
        out(f'[slides] {pres.Slides.Count} slides, hidden {hidden or "none"}, with speaker notes {notes or "none"}, '
            f'comments {comments}')
        out('[slides] text taller than its box (no autofit):', overflow or 'none')
        text_findings('text', texts)
        pdf = os.path.join(outdir, 'slides.pdf')
        pres.SaveAs(pdf, 32)
        pres.Close()
    contact_sheets(pdf, 'slides', outdir)


# ---------------------------------------------------------------- PDF
def scan_pdf(copy, outdir):
    import pymupdf
    doc = pymupdf.open(copy)
    out('[metadata]', {k: v for k, v in doc.metadata.items() if v})
    out('[pdf] pages', doc.page_count, '| bookmarks', len(doc.get_toc()),
        '| annotations', sum(1 for p in doc for _ in p.annots()))
    text_findings('text', [(f'page {i + 1}', p.get_text()) for i, p in enumerate(doc)])
    contact_sheets(copy, 'pdf', outdir)


def scan(path, outdir=None):
    path = os.path.abspath(path)
    ext = os.path.splitext(path)[1].lower()
    outdir = outdir or os.path.join(tempfile.gettempdir(), 'file-audit', re.sub(r'\W+', '_', os.path.basename(path)))
    os.makedirs(outdir, exist_ok=True)
    out(f'[file] {path}\n[file] open in Office right now: {is_open(path)} | output dir: {outdir}')
    copy = os.path.join(outdir, 'audit-copy' + ext)
    shutil.copy2(path, copy)
    {'.xlsx': scan_xlsx, '.xlsm': scan_xlsx, '.docx': scan_docx, '.pptx': scan_pptx, '.pdf': scan_pdf}[ext](copy, outdir)


# ---------------------------------------------------------------- diff / install
def snapshot(path):
    ext = os.path.splitext(path)[1].lower()
    snap = {}
    if ext in ('.xlsx', '.xlsm'):
        with office(*APPS['.xlsx']) as xl:
            wb = xl.Workbooks.Open(os.path.abspath(path), 0, True)
            for sh in wb.Worksheets:
                ur = sh.UsedRange
                f = ur.Formula if isinstance(ur.Formula, tuple) else ((ur.Formula,),)
                for r, row in enumerate(f):
                    for c, v in enumerate(row):
                        if v not in ('', None):
                            snap[f'{sh.Name}!R{ur.Row + r}C{ur.Column + c}'] = v
                snap[f'{sh.Name}!<visible>'] = sh.Visible
            wb.Close(False)
    elif ext == '.docx':
        with office(*APPS['.docx']) as wd:
            doc = wd.Documents.Open(os.path.abspath(path), False, True, False)
            for i, p in enumerate(doc.Paragraphs, 1):
                snap[f'para {i}'] = p.Range.Text
            doc.Close(False)
    elif ext == '.pptx':
        with office(*APPS['.pptx']) as pp:
            pres = pp.Presentations.Open(os.path.abspath(path), -1, 0, 0)
            for s in pres.Slides:
                for sh in s.Shapes:
                    if sh.HasTextFrame and sh.TextFrame.HasText:
                        snap[f'slide {s.SlideIndex} {sh.Name}'] = sh.TextFrame.TextRange.Text
            pres.Close()
    else:
        raise SystemExit(f'diff not supported for {ext}')
    return snap


def diff(a, b):
    sa, sb = snapshot(a), snapshot(b)
    keys = sorted(k for k in sa.keys() | sb.keys() if sa.get(k) != sb.get(k))
    out(f'[diff] {len(keys)} changed')
    for k in keys:
        out(f'  {k}\n    - {str(sa.get(k))[:150]!r}\n    + {str(sb.get(k))[:150]!r}')


def install(fixed, target, backup):
    for f in (fixed, target, backup):
        if not os.path.isfile(f):
            raise SystemExit(f'[install] STOP: {f} does not exist.')
    if is_open(target):
        raise SystemExit('[install] STOP: target is open in Office. Ask Bryan to close it.')
    if not filecmp.cmp(target, backup, shallow=False):
        raise SystemExit('[install] STOP: target changed since the backup (he edited it). Redo the fix on the new version.')
    shutil.copy2(fixed, target)
    ok = filecmp.cmp(target, fixed, shallow=False)
    out('[install]', 'replaced OK' if ok else 'COPY FAILED')


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    cmd, *args = sys.argv[1:] or ['-h']
    if cmd == 'scan':
        o = args[args.index('--out') + 1] if '--out' in args else None
        scan(args[0], o)
    elif cmd == 'diff':
        diff(*args[:2])
    elif cmd == 'install':
        install(*args[:3])
    else:
        print(__doc__)
