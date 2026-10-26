"""Kick-off-meeting (KOM) deck builder for PT. Sinergi maintenance contracts.

  python kom.py inspect <deck.pptx>
      Version info (revision, last saved by, saved at) and the role of every slide.
  python kom.py build <spec.json> <out.pptx> [--base <deck.pptx>]
      New KOM from the last KOM actually used (the base) plus a spec written from the new TOR.
  python kom.py check <deck.pptx> [--slides 5,6,25]
      Opens the deck in PowerPoint, measures every text box at 100 % size, exports PNGs and
      contact sheets. Never saves the deck.
  python kom.py schedule-img <file.xlsx> <outdir> --sheet <name> --ranges A1:T20 A22:T40 ...
      Renders each Excel range to a trimmed PNG (one per schedule period).

Needs: lxml, pillow, pymupdf, pywin32, PowerPoint/Excel (check, schedule-img). Windows.
"""
import argparse
import datetime
import glob
import itertools
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pptlib as L  # noqa: E402
from pptlib import Card, Panel, NS, X0, X1, Y0, Y1  # noqa: E402
from lxml import etree  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
RELNS = 'http://schemas.openxmlformats.org/package/2006/relationships'
CTNS = 'http://schemas.openxmlformats.org/package/2006/content-types'
RT = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/'
HEADER_IDS = {2, 3, 4, 5, 6, 7, 8}   # section label, title, two slashes, footer logo, footer text, page number
FOOTER_PREFIX = 'PT. Sinergi Sarana Solusi'


# ================================================================ package
class Pkg:
    def __init__(self, pptx, workdir):
        if os.path.exists(workdir):
            shutil.rmtree(workdir)
        zipfile.ZipFile(pptx).extractall(workdir)
        self.d = workdir

    def p(self, part):
        return os.path.join(self.d, *part.split('/'))

    def _xml(self, part):
        return etree.parse(self.p(part))

    def _write(self, part, t):
        L.save(self.p(part), t)

    def slide_parts(self):
        pres = self._xml('ppt/presentation.xml')
        rels = {r.get('Id'): r.get('Target') for r in self._xml('ppt/_rels/presentation.xml.rels').getroot()}
        return ['ppt/' + rels[s.get('{%s}id' % NS['r'])] for s in pres.find('p:sldIdLst', NS)]

    @staticmethod
    def rels_of(part):
        d, f = part.rsplit('/', 1)
        return f'{d}/_rels/{f}.rels'

    def _ct_override(self, part, ctype=None, remove=False):
        t = self._xml('[Content_Types].xml')
        root = t.getroot()
        name = '/' + part
        for o in root.findall('{%s}Override' % CTNS):
            if o.get('PartName') == name:
                if remove:
                    root.remove(o)
                self._write('[Content_Types].xml', t)
                return
        if not remove:
            etree.SubElement(root, '{%s}Override' % CTNS, PartName=name, ContentType=ctype)
            self._write('[Content_Types].xml', t)

    def duplicate(self, part, after):
        """Copy slide `part` (without its notes) and insert it after slide `after`."""
        nums = [int(re.search(r'(\d+)', os.path.basename(f)).group(1)) for f in glob.glob(self.p('ppt/slides/slide*.xml'))]
        new = f'ppt/slides/slide{max(nums) + 1}.xml'
        shutil.copy(self.p(part), self.p(new))
        rt = self._xml(self.rels_of(part))
        for r in list(rt.getroot()):
            if r.get('Type') == RT + 'notesSlide':
                rt.getroot().remove(r)
        os.makedirs(os.path.dirname(self.p(self.rels_of(new))), exist_ok=True)
        self._write(self.rels_of(new), rt)
        self._ct_override(new, 'application/vnd.openxmlformats-officedocument.presentationml.slide+xml')
        prt = self._xml('ppt/_rels/presentation.xml.rels')
        rid = 'rId%d' % (max(int(r.get('Id')[3:]) for r in prt.getroot() if r.get('Id')[3:].isdigit()) + 1)
        etree.SubElement(prt.getroot(), '{%s}Relationship' % RELNS, Id=rid, Type=RT + 'slide', Target=new[4:])
        self._write('ppt/_rels/presentation.xml.rels', prt)
        pres = self._xml('ppt/presentation.xml')
        lst = pres.find('p:sldIdLst', NS)
        rels = {r.get('Target'): r.get('Id') for r in prt.getroot()}
        sid = max(int(s.get('id')) for s in lst) + 1
        el = etree.Element('{%s}sldId' % NS['p'], id=str(sid))
        el.set('{%s}id' % NS['r'], rid)
        for s in lst:
            if s.get('{%s}id' % NS['r']) == rels[after[4:]]:
                s.addnext(el)
                break
        self._write('ppt/presentation.xml', pres)
        return new

    def remove(self, part):
        prt = self._xml('ppt/_rels/presentation.xml.rels')
        rid = [r for r in prt.getroot() if r.get('Target') == part[4:]][0]
        pres = self._xml('ppt/presentation.xml')
        lst = pres.find('p:sldIdLst', NS)
        for s in lst:
            if s.get('{%s}id' % NS['r']) == rid.get('Id'):
                lst.remove(s)
        self._write('ppt/presentation.xml', pres)
        prt.getroot().remove(rid)
        self._write('ppt/_rels/presentation.xml.rels', prt)
        for r in self._xml(self.rels_of(part)).getroot():
            if r.get('Type') == RT + 'notesSlide':
                notes = 'ppt/notesSlides/' + os.path.basename(r.get('Target'))
                for f in (notes, self.rels_of(notes)):
                    if os.path.exists(self.p(f)):
                        os.remove(self.p(f))
                self._ct_override(notes, remove=True)
        for f in (part, self.rels_of(part)):
            os.remove(self.p(f))
        self._ct_override(part, remove=True)

    def prune_media(self):
        """Delete media no relationship points at (left behind by removed slides)."""
        used = set()
        for rels in glob.glob(os.path.join(self.d, '**', '_rels', '*.rels'), recursive=True):
            base = os.path.dirname(os.path.dirname(rels))
            for r in etree.parse(rels).getroot():
                if r.get('TargetMode') != 'External':
                    used.add(os.path.normcase(os.path.normpath(os.path.join(base, r.get('Target')))))
        gone = []
        for f in glob.glob(self.p('ppt/media/*')):
            if os.path.normcase(os.path.normpath(f)) not in used:
                os.remove(f)
                gone.append(os.path.basename(f))
        return gone

    def add_png(self, slide_part, png):
        os.makedirs(self.p('ppt/media'), exist_ok=True)
        k = 1
        while os.path.exists(self.p(f'ppt/media/kom_img{k}.png')):
            k += 1
        shutil.copy(png, self.p(f'ppt/media/kom_img{k}.png'))
        t = self._xml('[Content_Types].xml')
        if not any(d.get('Extension', '').lower() == 'png' for d in t.getroot().findall('{%s}Default' % CTNS)):
            etree.SubElement(t.getroot(), '{%s}Default' % CTNS, Extension='png', ContentType='image/png')
            self._write('[Content_Types].xml', t)
        rt = self._xml(self.rels_of(slide_part))
        rid = 'rId%d' % (max([int(r.get('Id')[3:]) for r in rt.getroot() if r.get('Id')[3:].isdigit()] + [0]) + 1)
        etree.SubElement(rt.getroot(), '{%s}Relationship' % RELNS, Id=rid, Type=RT + 'image', Target=f'../media/kom_img{k}.png')
        self._write(self.rels_of(slide_part), rt)
        return rid

    def zip(self, out):
        if os.path.exists(out):
            os.remove(out)
        with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
            z.write(self.p('[Content_Types].xml'), '[Content_Types].xml')
            for root, _, files in os.walk(self.d):
                for f in files:
                    full = os.path.join(root, f)
                    arc = os.path.relpath(full, self.d).replace(os.sep, '/')
                    if arc != '[Content_Types].xml':
                        z.write(full, arc)


# ================================================================ slide roles
def slide_info(pkg, part):
    t = L.load(pkg.p(part))
    def txt(i):
        try:
            return L.text_of(L.shape(t, i)).strip()
        except KeyError:
            return ''
    return t, txt(2), txt(3), L.text_of(L.tree_of(t))


def role_of(i, label, title, alltext):
    if i == 0:
        return 'cover'
    if i == 1 and 'KICK OFF MEETING' in alltext.upper():
        return 'title'
    if 'Terima Kasih' in alltext and not title:
        return 'closing'
    if 'RUANG LINGKUP' in label.upper():
        return 'rl'
    for key, role in (('Latar Belakang', 'latar'), ('Maksud dan Tujuan', 'tujuan'), ('Tahap Administrasi', 'admin'),
                      ('Syarat Penyerahan', 'syarat'), ('Schedule Maintenance', 'schedule'), ('Struktur Organisasi', 'struktur')):
        if title.startswith(key):
            return role
    return 'other'


def roles(pkg):
    out = []
    for i, part in enumerate(pkg.slide_parts()):
        _, label, title, alltext = slide_info(pkg, part)
        out.append((part, role_of(i, label, title, alltext), title or alltext.strip()[:50]))
    return out


def old_name(pkg):
    for part in pkg.slide_parts():
        t = L.load(pkg.p(part))
        try:
            s = L.text_of(L.shape(t, 7)).strip()
        except KeyError:
            continue
        m = re.match(re.escape(FOOTER_PREFIX) + r'\s*\|\s*Kick Off Meeting\s*[—-]\s*(.*?)\s+(\d{4})\s*[–-]\s*(\d{4})$', s)
        if m:
            return m.group(1), (m.group(2), m.group(3))
    return None, None


# ================================================================ content builders
def mk_card(c, sz):
    return Card(c['title'], c.get('items'), c.get('sz', sz), c.get('start'), c.get('text'), c.get('oval'))


def tail_cards(spec, sl, sz):
    tl = dict(spec['tail'])
    tl.update(sl.get('tail', {}))
    l0 = tl.get('letter', 'b')
    letters = [chr(ord(l0) + i) for i in range(3)]
    return [Card(f'{letters[0]}. Corrective Maintenance', text=tl['cor'], sz=sz),
            Card(f'{letters[1]}. Dokumentasi & Report', text=tl['dok'], sz=sz),
            Card(f'{letters[2]}. {tl["sop_title"]}', text=tl['sop'], sz=sz)]


def cards_of(spec, sl, key, sz):
    v = sl[key]
    return tail_cards(spec, sl, sz) if v == 'tail' else [mk_card(c, sz) for c in v]


def mk_panel(pd):
    return Panel(pd['num'], pd.get('name'), [tuple(f) for f in pd.get('fields', [])], pd.get('vsz', 13))


def rl_shapes(spec, sl, sz, ids):
    lay = sl['layout']
    PW, GAP = 212, 13
    CX = X0 + PW + 17
    H = Y1 - Y0
    out = []
    if lay == 'num_stack':                            # narrow number | middle card | stacked cards
        out += Panel(sl['num'], None).emit(ids, X0, Y0, 94, H, 'L')
        mx, mw = X0 + 94 + GAP, sl.get('mid_w', 374)
        out += mk_card(sl['mid'], sz).emit(ids, mx, Y0, mw, H, 'M')
        rx = mx + mw + GAP
        out += L.stack(ids, cards_of(spec, sl, 'right', sz), rx, Y0, X1 - rx, H, 'R')
        return out
    out += mk_panel(sl['panel']).emit(ids, X0, Y0, PW, H, 'L')
    if lay == 'panel_card':                           # panel | one big card
        out += mk_card(sl['mid'], sz).emit(ids, CX, Y0, X1 - CX, H, 'M')
    elif lay == 'lmr':                                # panel | middle card | stacked cards
        mw = sl.get('mid_w', 360)
        out += mk_card(sl['mid'], sz).emit(ids, CX, Y0, mw, H, 'M')
        rx = CX + mw + GAP
        out += L.stack(ids, cards_of(spec, sl, 'right', sz), rx, Y0, X1 - rx, H, 'R')
    elif lay == 'panel_two':                          # panel | card | card
        a, b = [mk_card(c, sz) for c in sl['cards']]
        w0 = sl['cards'][0].get('w', 290)
        out += a.emit(ids, CX, Y0, w0, H, 'M')
        rx = CX + w0 + GAP
        out += b.emit(ids, rx, Y0, X1 - rx, H, 'R')
    elif lay == 'panel_top_row':                      # panel | wide card over a row of cards
        top = mk_card(sl['top'], sz)
        bottoms = cards_of(spec, sl, 'row', sz)
        n = len(bottoms)
        widths = sl.get('row_widths') or [(X1 - CX - 12 * (n - 1)) / n] * n
        bh = max(c.need(w) for c, w in zip(bottoms, widths))
        th = top.need(X1 - CX)
        extra = H - 12 - bh - th
        if extra < 0:
            L.WARN.append(f'top+row short by {-extra:.0f}pt')
            extra = 0
        out += top.emit(ids, CX, Y0, X1 - CX, th + extra / 2, 'T')
        out += L.row(ids, bottoms, widths, CX, Y0 + th + extra / 2 + 12, bh + extra / 2, 'B')
    else:
        raise SystemExit(f'unknown layout {lay!r}')
    return out


def build_rl(spec, sl, t):
    sizes = sl.get('sizes', [15, 14, 13, 12])
    for sz in sizes:
        L.WARN.clear()
        frags = rl_shapes(spec, sl, sz, itertools.count(9).__next__)
        if not L.WARN:
            break
    warn = list(L.WARN)
    L.keep_only(t, HEADER_IDS)
    L.set_texts(L.shape(t, 3), [sl['title']])
    L.append_xml(t, frags)
    return sz, warn


def org_chart(st, ids):
    """PM, admin, K3, leader, then one column per team."""
    def box(x, y, w, label, name, fill, line, lab_col, name_col):
        nsz = 13
        while nsz > 10 and L.n_lines(name, w - 11.5, nsz, True) > 1:
            nsz -= 1
        inner = (f'<a:p><a:pPr algn="ctr"/>{L.run(label, 10, True, lab_col, spc=100)}</a:p>'
                 f'<a:p><a:pPr algn="ctr"/>{L.run(name, nsz, True, name_col)}</a:p>')
        return L.rrect(ids(), label, x, y, w, 54, fill=fill, line=line, adj=10000, inner=inner)

    out = [L.line(ids(), 'Garis PM', 480, 169, 0, 90), L.line(ids(), 'Garis Admin-K3', 263, 215, 434, 0),
           box(365, 115, 230, st.get('pm_label', 'PROJECT MANAGER'), st['pm'], L.C_HEAD, None, 'CFE8EC', 'FFFFFF'),
           box(47, 187, 216, st.get('admin_label', 'ADMIN & FINANCE'), st['admin'], L.C_CARD, L.C_LINE, L.C_NUM, L.C_HEAD),
           box(697, 187, 216, st.get('k3_label', 'PENGAWAS AHLI K3 LISTRIK'), st['k3'], L.C_CARD, L.C_LINE, L.C_NUM, L.C_HEAD),
           box(365, 259, 230, st.get('leader_label', 'LEADER'), st['leader'], L.C_NUM, None, 'CFE8EC', 'FFFFFF'),
           L.line(ids(), 'Garis Leader', 480, 313, 0, 18)]
    teams = st['teams']
    n = len(teams)
    gap = 16
    w = (874 - gap * (n - 1)) / n
    xs = [43 + i * (w + gap) for i in range(n)]
    if n > 1:
        out.append(L.line(ids(), 'Garis Tim', xs[0] + w / 2, 331, xs[-1] - xs[0], 0))
    for x, tm in zip(xs, teams):
        members = tm['members']
        msz = 12 if len(members) <= 5 else 10
        if len(members) > 6:
            L.WARN.append(f'team {tm["name"]}: {len(members)} members, more than fit')
        head = (f'<a:p><a:pPr algn="ctr"/>{L.run(tm.get("role", "ENGINEER"), 9, True, L.C_NUM, spc=100)}</a:p>'
                f'<a:p><a:pPr algn="ctr"/>{L.run(tm["name"], 12, True, L.C_HEAD)}</a:p>')
        names = ''.join(f'<a:p><a:pPr algn="ctr"/>{L.run(m, msz)}</a:p>' for m in members)
        out += [L.line(ids(), 'Garis ' + tm['name'], x + w / 2, 331, 0, 18),
                L.rrect(ids(), tm['name'] + ' Card', x, 349, w, 137, fill='FFFFFF', line=L.C_LINE, adj=6000),
                L.rrect(ids(), tm['name'] + ' Judul', x, 349, w, 45, fill=L.C_PANEL, line=None, adj=12000, inner=head,
                        ins=(36576, 36576)),
                L.tbox(ids(), tm['name'] + ' Nama', x + 9, 400, w - 17, 79, names)]
    return out


def fill_admin(t, rows):
    tbl = t.find('.//a:tbl', NS)
    trs = tbl.findall('a:tr', NS)
    header, data = trs[0], trs[1:]
    tmpl = [data[0], data[1] if len(data) > 1 else data[0]]
    for tr in data:
        tbl.remove(tr)
    hh = int(header.get('h'))
    each = min(int(tmpl[0].get('h')), int((L.E(Y1 - Y0) - hh) / len(rows)))
    import copy
    for i, r in enumerate(rows):
        tr = copy.deepcopy(tmpl[i % 2])
        tr.set('h', str(each))
        c0, c1, c2 = tr.findall('a:tc', NS)
        L.set_texts(c0, [r['tahap']])
        L.set_texts(c1, [f'{k}. {d}' for k, d in enumerate(r['dokumen'], 1)])
        L.set_texts(c2, [r['persen']])
        tbl.append(tr)
    frame = t.find('.//p:graphicFrame', NS)
    frame.find('p:xfrm/a:ext', NS).set('cy', str(hh + each * len(rows)))


def fill_syarat(t, sy):
    """Left column: Dokumen Wajib over Bentuk Penyerahan. Right column: Isi Minimal Laporan, full height."""
    def group(title):
        tsp = L.find_text(t, lambda s: s == title)
        if not tsp:
            raise SystemExit(f'syarat slide: no card titled {title!r}')
        tid = L.shape_id(tsp[0])
        return [L.shape(t, tid + k) for k in (-3, -2, -1, 0, 1)]     # card, oval, icon, title, body

    dok, isi, ben = group('Dokumen Wajib Setiap Tahap'), group('Isi Minimal Laporan'), group('Bentuk Penyerahan')
    dok_p = [sy['dokumen_intro']] + [f'{k}. {d}' for k, d in enumerate(sy['dokumen'], 1)]
    isi_p = [sy['isi_intro']] + [f'• {x}' for x in sy['isi']]
    ben_p = [sy['bentuk']]
    for g, ps in ((dok, dok_p), (isi, isi_p), (ben, ben_p)):
        L.set_texts(g[4], ps)
    plain = lambda ps: [('p', x) for x in ps]
    H = Y1 - Y0

    def place(g, x, y, w, h, sz):
        L.move(g[0], x, y, w, h)
        L.move(g[1], x + 16, y + 8)
        L.move(g[2], x + 22, y + 14)
        L.move(g[3], x + 52, y + 7, w - 68)
        L.move(g[4], x + 16, y + 40, w - 32, h - 48)
        L.set_size(g[4], sz)

    isz = next((s for s in (15, 14, 13, 12) if L.measure(plain(isi_p), 479 - 32, s) <= H - 48), 12)
    best = None
    for ds in (15, 14, 13):
        for bs in (14, 13, 12):
            need = (48 + L.measure(plain(dok_p), 350, ds)) + 11 + (48 + L.measure(plain(ben_p), 350, bs))
            if need <= H and best is None:
                best = (ds, bs, need)
    if best is None:
        L.WARN.append('syarat slide: left column does not fit at 13/12 pt')
        best = (13, 12, H)
    ds, bs, need = best
    dh = 48 + L.measure(plain(dok_p), 350, ds) + (H - need) / 2
    place(dok, 43, Y0, 382, dh, ds)
    place(ben, 43, Y0 + dh + 11, 382, H - dh - 11, bs)
    place(isi, 438, Y0, 479, H, isz)


def fill_latar(t, items):
    assert len(items) == 2, 'latar: the base slide has two cards'
    need = max(L.measure([('p', it['text'])], 397, 18) for it in items) + 72
    h = max(234, min(371, need))
    y = 192 if h <= 234 else Y0
    for (rect, ov, ttl, body), it in zip(((9, 10, 11, 12), (13, 14, 15, 16)), items):
        L.move(L.shape(t, rect), y=y, h=h)
        L.move(L.shape(t, ov), y=y + 14)
        L.move(L.shape(t, ttl), y=y + 14)
        L.move(L.shape(t, body), y=y + 59, h=h - 72)
        L.set_texts(L.shape(t, ttl), [it['title']])
        L.set_texts(L.shape(t, body), [it['text']])


def fill_tujuan(t, tj):
    assert len(tj['items']) == 3, 'tujuan: the base slide has three cards'
    L.set_texts(L.shape(t, 9), [tj['intro']])
    for (ttl, body), it in zip(((12, 13), (16, 17), (20, 21)), tj['items']):
        L.set_texts(L.shape(t, ttl), [it['title']])
        L.set_texts(L.shape(t, body), [it['text']])


def fill_cover(t, cover_title, years):
    box = L.find_text(t, lambda s: 'KICKOFF' in s.upper() or 'KICK OFF' in s.upper())[0]
    body = box.find('.//p:txBody', NS)

    def yellow(p):
        for r in p.findall('a:r', NS):
            rp = r.find('a:rPr', NS)
            fill = rp.find('a:solidFill/*', NS) if rp is not None else None
            if rp is not None and rp.get('sz') == '3600' and fill is not None and fill.get('val') in ('FFC000', 'accent4'):
                return True
        return False

    ys = [p for p in body.findall('a:p', NS) if yellow(p)]
    if not ys:
        raise SystemExit('cover: no yellow 36 pt title paragraph found')
    import copy
    runs = ys[0].findall('a:r', NS)
    for r in runs[1:]:
        ys[0].remove(r)
    runs[0].find('a:rPr', NS).attrib.pop('err', None)
    for p in ys[1:]:
        body.remove(p)
    # one paragraph per "\n" line, so the break falls where the spec says, not mid-phrase
    box_w = L.geom(box)[2] - 15
    prev = ys[0]
    for k, ln in enumerate(cover_title.split('\n')):
        p = ys[0] if k == 0 else copy.deepcopy(ys[0])
        p.find('a:r/a:t', NS).text = ln
        if k:
            prev.addnext(p)
        prev = p
        if L.text_w(ln, 36, True) > box_w:
            L.WARN.append(f'cover line wraps: {ln!r} ({L.text_w(ln, 36, True):.0f} > {box_w:.0f} pt); add a \\n')
    for i, p in enumerate(body.findall('a:p', NS)):
        if L.text_of(p).strip().upper().startswith('PERIODE'):
            L.set_para(box, i, f'PERIODE : {years[0]} - {years[1]}')


def build(spec_path, out, base=None):
    spec = json.load(open(spec_path, encoding='utf8'))
    base = base or spec['base']
    work = os.path.join(tempfile.gettempdir(), 'kom_build_' + os.path.splitext(os.path.basename(out))[0])
    pkg = Pkg(base, work)
    oname, oyears = old_name(pkg)
    years = spec['years']
    name = spec['name']
    report = []

    # ---- structure first: drop slides, then match the number of ruang-lingkup and schedule slides
    for part, role, title in roles(pkg):
        if any(title.startswith(d) for d in spec.get('drop', [])):
            pkg.remove(part)
            report.append(f'dropped: {title}')
    for role, want in (('rl', len(spec['ruang_lingkup'])),
                       ('schedule', len(spec['schedule']['titles']) if spec.get('schedule', {}).get('titles') else None)):
        if want is None:
            continue
        parts = [p for p, r, _ in roles(pkg) if r == role]
        if not parts:
            raise SystemExit(f'base deck has no {role} slide')
        while len(parts) < want:
            parts.append(pkg.duplicate(parts[-1], parts[-1]))
        while len(parts) > want:
            pkg.remove(parts.pop())

    # ---- content
    rl_i = sch_i = 0
    for part, role, title in roles(pkg):
        t = L.load(pkg.p(part))
        if role == 'cover':
            L.WARN.clear()
            fill_cover(t, spec.get('cover_title', name.upper()), years)
            report += L.WARN
        elif role == 'title':
            sp = L.find_text(t, lambda s: s == oname)
            if not sp:
                raise SystemExit(f'title slide: no box with the old name {oname!r}')
            L.set_texts(sp[0], [name])
            for sp in L.find_text(t, lambda s: s.upper().startswith('PERIODE')):
                L.set_texts(sp, [f'PERIODE : {years[0]} – {years[1]}'])
        elif role == 'latar':
            fill_latar(t, spec['latar'])
        elif role == 'tujuan':
            fill_tujuan(t, spec['tujuan'])
        elif role == 'rl':
            sz, warn = build_rl(spec, spec['ruang_lingkup'][rl_i], t)
            report.append(f'ruang lingkup {rl_i + 1}: body {sz} pt' + (f'  OVERFLOW {warn}' if warn else ''))
            rl_i += 1
        elif role == 'admin':
            fill_admin(t, spec['tahap_admin'])
        elif role == 'syarat':
            L.WARN.clear()
            fill_syarat(t, spec['syarat'])
            report += L.WARN
        elif role == 'schedule':
            sch = spec.get('schedule') or {}
            L.keep_only(t, HEADER_IDS)
            if sch.get('titles'):
                L.set_texts(L.shape(t, 3), [sch['titles'][sch_i]])
            imgs = sch.get('images') or []
            if sch_i < len(imgs):
                from PIL import Image
                iw, ih = Image.open(imgs[sch_i]).size
                k = min((X1 - X0) / iw, (Y1 - Y0) / ih)
                w, h = iw * k, ih * k
                rid = pkg.add_png(part, imgs[sch_i])
                L.append_xml(t, [L.picture(L.max_id(t) + 1, 'Schedule', rid, X0 + (X1 - X0 - w) / 2, Y0, w, h)])
            sch_i += 1
        elif role == 'struktur' and spec.get('struktur'):
            L.WARN.clear()
            L.keep_only(t, HEADER_IDS)
            L.append_xml(t, org_chart(spec['struktur'], itertools.count(9).__next__))
            report += L.WARN
        # footer on every content slide
        try:
            f = L.shape(t, 7)
            if L.text_of(f).strip().startswith(FOOTER_PREFIX):
                L.set_texts(f, [f'{FOOTER_PREFIX}   |   Kick Off Meeting — {name} {years[0]}–{years[1]}'])
        except KeyError:
            pass
        L.save(pkg.p(part), t)

    # ---- document properties
    core = pkg.p('docProps/core.xml')
    s = open(core, encoding='utf8').read()
    s = re.sub(r'<dc:title>.*?</dc:title>', f'<dc:title>Kick Off Meeting — {name} {years[0]}–{years[1]}</dc:title>'.replace('&', '&amp;'), s)
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    s = re.sub(r'(<dcterms:modified[^>]*>)[^<]*', r'\g<1>' + now, s)
    open(core, 'w', encoding='utf8').write(s)
    app = pkg.p('docProps/app.xml')
    a = open(app, encoding='utf8').read()
    a = re.sub(r'<Slides>\d+</Slides>', f'<Slides>{len(pkg.slide_parts())}</Slides>', a)
    open(app, 'w', encoding='utf8').write(a)

    # ---- leftovers from the base
    words = [w for w in [oname] + spec.get('forbid', []) if w and w.lower() not in name.lower()]
    for i, part in enumerate(pkg.slide_parts(), 1):
        txt = open(pkg.p(part), encoding='utf8').read()
        txt = re.sub(r'<[^>]+>', '', txt)
        for w in words:
            if w.lower() in txt.lower():
                report.append(f'LEFTOVER slide {i}: {w!r}')
    n_slides = len(pkg.slide_parts())
    gone = pkg.prune_media()
    if gone:
        report.append(f'removed unused media: {", ".join(gone)}')
    pkg.zip(out)
    shutil.rmtree(work)
    print(f'base: {base}\nold name: {oname} {oyears}\nslides: {n_slides}')
    print('\n'.join(report))
    print(f'written: {out}')


# ================================================================ inspect / check / schedule images
def inspect(deck):
    work = os.path.join(tempfile.gettempdir(), 'kom_inspect')
    pkg = Pkg(deck, work)
    core = open(pkg.p('docProps/core.xml'), encoding='utf8').read()
    g = lambda tag: (re.search(f'<{tag}[^>]*>([^<]*)</{tag}>', core) or [None, '-'])[1]
    print(f'title: {g("dc:title")}\nlast saved by: {g("cp:lastModifiedBy")}   revision: {g("cp:revision")}   saved: {g("dcterms:modified")} (UTC)')
    on, oy = old_name(pkg)
    print(f'name in footer: {on} {oy}')
    for i, (part, role, title) in enumerate(roles(pkg), 1):
        print(f'{i:>3}  {role:<9} {title[:70]}')
    shutil.rmtree(work)


def check(deck, slides, outdir):
    from PIL import Image
    os.makedirs(outdir, exist_ok=True)
    for f in glob.glob(os.path.join(outdir, 's*.png')):
        os.remove(f)
    r = subprocess.run(['powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', os.path.join(HERE, 'fitcheck.ps1'),
                        '-deck', os.path.abspath(deck), '-outdir', os.path.abspath(outdir), '-slides', slides or ''],
                       capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip())
    pngs = sorted(glob.glob(os.path.join(outdir, 's*.png')))
    for g in range(0, len(pngs), 4):
        sheet = Image.new('RGB', (1920, 1080), 'white')
        for k, f in enumerate(pngs[g:g + 4]):
            sheet.paste(Image.open(f).resize((960, 540)), ((k % 2) * 960, (k // 2) * 540))
        path = os.path.join(outdir, f'sheet{g // 4 + 1}.png')
        sheet.save(path)
        print('sheet:', path, '<-', ', '.join(os.path.basename(p) for p in pngs[g:g + 4]))


def schedule_img(xlsx, outdir, sheet, ranges):
    import pymupdf
    import win32com.client
    from PIL import Image, ImageChops
    os.makedirs(outdir, exist_ok=True)
    before = set(_pids('EXCEL.EXE'))
    xl = win32com.client.DispatchEx('Excel.Application')
    xl.DisplayAlerts = False
    try:
        wb = xl.Workbooks.Open(os.path.abspath(xlsx), 0, True)
        ws = wb.Worksheets(sheet)
        for i, rng in enumerate(ranges, 1):
            ps = ws.PageSetup
            ps.PrintArea = rng
            ps.Orientation = 2
            ps.Zoom = False
            ps.FitToPagesWide = 1
            ps.FitToPagesTall = 1
            pdf = os.path.abspath(os.path.join(outdir, f'periode{i}.pdf'))
            ws.ExportAsFixedFormat(0, pdf)
            pix = pymupdf.open(pdf)[0].get_pixmap(dpi=220)
            png = os.path.join(outdir, f'periode{i}.png')
            pix.save(png)
            im = Image.open(png).convert('RGB')
            bbox = ImageChops.difference(im, Image.new('RGB', im.size, 'white')).getbbox()
            if bbox:
                im.crop((max(0, bbox[0] - 8), max(0, bbox[1] - 8), min(im.width, bbox[2] + 8), min(im.height, bbox[3] + 8))).save(png)
            os.remove(pdf)
            print(f'{rng} -> {png}')
        wb.Close(False)
    finally:
        xl.Quit()
        for pid in set(_pids('EXCEL.EXE')) - before:     # only the Excel this script started
            subprocess.run(['taskkill', '/F', '/PID', str(pid)], capture_output=True)


def _pids(image):
    r = subprocess.run(['tasklist', '/FI', f'IMAGENAME eq {image}', '/FO', 'CSV', '/NH'], capture_output=True, text=True)
    return [int(l.split('","')[1]) for l in r.stdout.splitlines() if l.startswith('"')]


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    a = sub.add_parser('inspect'); a.add_argument('deck')
    a = sub.add_parser('build'); a.add_argument('spec'); a.add_argument('out'); a.add_argument('--base')
    a = sub.add_parser('check'); a.add_argument('deck'); a.add_argument('--slides', default=''); a.add_argument('--out')
    a = sub.add_parser('schedule-img'); a.add_argument('xlsx'); a.add_argument('outdir'); a.add_argument('--sheet', required=True)
    a.add_argument('--ranges', nargs='+', required=True)
    args = ap.parse_args()
    if args.cmd == 'inspect':
        inspect(args.deck)
    elif args.cmd == 'build':
        build(args.spec, args.out, args.base)
    elif args.cmd == 'check':
        # default output goes to temp, never next to the deck in Bryan's work folder
        check(args.deck, args.slides, args.out or os.path.join(tempfile.gettempdir(), 'kom_check_' + os.path.splitext(os.path.basename(args.deck))[0]))
    else:
        schedule_img(args.xlsx, args.outdir, args.sheet, args.ranges)
