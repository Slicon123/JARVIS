"""Shape, text-fit and card-layout helpers for KOM decks (16:9, 960 x 540 pt).

Every size is in points; E() converts to EMU. Colours, fonts and box styles copy the
teal KOM design so generated slides match the slides kept from the base deck.
"""
import copy
import re
from xml.sax.saxutils import escape

from lxml import etree
from PIL import ImageFont

EMU = 12700
LINE = 1.2207                  # Calibri line height / font size
FONTS = {False: 'C:/Windows/Fonts/calibri.ttf', True: 'C:/Windows/Fonts/calibrib.ttf'}
_fcache = {}

C_PANEL, C_CARD, C_LINE = 'E3F0F2', 'F2F7F8', 'D2E0E4'
C_NUM, C_HEAD, C_BODY, C_LABEL = '0E7888', '0A3D4D', '1F2A33', '6B7B86'
C_CONN = '9FB8BF'

# content area shared by every content slide
X0, X1, Y0, Y1 = 43, 916, 115, 486

NS = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
A = '{%s}' % NS['a']
DECL = ' '.join(f'xmlns:{k}="{v}"' for k, v in NS.items())
STYLE = ('<p:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef>'
         '<a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></p:style>')
WARN = []                      # layout overflows found while emitting; caller clears and reads it


def E(pt):
    return int(round(pt * EMU))


# ---------------------------------------------------------------- text measuring
def _font(sz, bold):
    k = (sz, bold)
    if k not in _fcache:
        _fcache[k] = ImageFont.truetype(FONTS[bold], size=int(sz * 20))
    return _fcache[k]


def text_w(s, sz, bold=False):
    return _font(sz, bold).getlength(s) / 20


def n_lines(s, width, sz, bold=False):
    lines, cur = 1, ''
    for w in s.split(' '):                     # a no-break space keeps its pair together
        t = (cur + ' ' + w) if cur else w
        if text_w(t, sz, bold) <= width:
            cur = t
        else:
            if cur:
                lines += 1
            cur = w
    return lines


# ---------------------------------------------------------------- paragraphs
# item kinds: n numbered, a lettered sub-item, b bullet sub-item, bb top-level bullet, p plain, h bold heading
NUM_IND = 24                   # room for "12." at 15 pt; 20 made two-digit numbers touch the text
SUB_IND = 15


def indent(kind):
    return {'p': 0, 'h': 0, 'n': NUM_IND, 'a': NUM_IND + SUB_IND, 'b': NUM_IND + SUB_IND, 'bb': 12}[kind]


def nbsp_units(text):
    # keep "3150 kVA", "80 %" etc. on one line
    return re.sub(r'(\d) (kVA|KVA|kW|KW|kWh|PK|Ah|menit|jam|unit|rak)\b', lambda m: m.group(1) + '\u00a0' + m.group(2), text)


def run(text, sz, bold=False, color=C_BODY, spc=None):
    b = ' b="1"' if bold else ' b="0"'
    sp = f' spc="{spc}"' if spc else ''
    return (f'<a:r><a:rPr lang="id-ID" sz="{int(sz*100)}"{b} i="0"{sp} dirty="0"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill>'
            f'<a:latin typeface="Calibri"/></a:rPr><a:t>{escape(nbsp_units(text))}</a:t></a:r>')


def para(kind, text, sz, bold=False, color=C_BODY, aft=3, start=None, algn='l'):
    sa = f'<a:spcAft><a:spcPts val="{int(aft*100)}"/></a:spcAft>'
    st = f' startAt="{start}"' if start else ''
    if kind in ('p', 'h'):
        ppr = f'<a:pPr algn="{algn}">{sa}<a:buNone/></a:pPr>'
        bold = bold or kind == 'h'
    elif kind == 'n':
        ppr = (f'<a:pPr marL="{E(NUM_IND)}" indent="{-E(NUM_IND)}">{sa}<a:buClr><a:srgbClr val="{C_NUM}"/></a:buClr>'
               f'<a:buFont typeface="+mj-lt"/><a:buAutoNum type="arabicPeriod"{st}/></a:pPr>')
    elif kind == 'a':
        ppr = (f'<a:pPr marL="{E(NUM_IND+SUB_IND)}" lvl="1" indent="{-E(SUB_IND)}">{sa}'
               f'<a:buFont typeface="+mj-lt"/><a:buAutoNum type="alphaLcPeriod"/></a:pPr>')
    elif kind == 'b':
        ppr = (f'<a:pPr marL="{E(NUM_IND+SUB_IND)}" lvl="1" indent="{-E(11)}">{sa}<a:buClr><a:srgbClr val="{C_NUM}"/></a:buClr>'
               f'<a:buFont typeface="Arial"/><a:buChar char="&#8226;"/></a:pPr>')
    elif kind == 'bb':
        ppr = (f'<a:pPr marL="{E(12)}" indent="{-E(12)}">{sa}<a:buClr><a:srgbClr val="{C_NUM}"/></a:buClr>'
               f'<a:buFont typeface="Arial"/><a:buChar char="&#8226;"/></a:pPr>')
    else:
        raise ValueError(f'unknown item kind {kind!r}')
    end = f'<a:endParaRPr lang="id-ID" sz="{int(sz*100)}" dirty="0"/>'
    return f'<a:p>{ppr}{run(text, sz, bold, color)}{end}</a:p>'


def norm_items(items):
    """spec items -> [(kind, text)]; a bare string is a numbered item."""
    out = []
    for it in items:
        if isinstance(it, str):
            out.append(('n', it))
        else:
            out.append((it[0], it[1]))
    return out


def measure(paras, width, sz):
    h = 0
    for i, (kind, text) in enumerate(paras):
        h += n_lines(nbsp_units(text), width - indent(kind) - 1, sz, kind == 'h') * sz * LINE
        if i < len(paras) - 1:
            h += 3
    return h + 2.9


def body_xml(paras, sz, start=None):
    # PowerPoint restarts a numbered list after a sub-item unless every numbered paragraph
    # carries the same startAt, so it goes on all of them, not just the first
    return ''.join(para(k, t, sz, start=start if k == 'n' else None) for k, t in paras)


# ---------------------------------------------------------------- shapes
def rrect(id_, name, x, y, w, h, fill=C_CARD, line=C_LINE, adj=3500, inner=None, ins=None):
    ln = (f'<a:ln w="9525"><a:solidFill><a:srgbClr val="{line}"/></a:solidFill></a:ln>' if line else '<a:ln><a:noFill/></a:ln>')
    if inner is None:
        tx = '<p:txBody><a:bodyPr rtlCol="0" anchor="ctr"/><a:lstStyle/><a:p><a:pPr algn="ctr"/><a:endParaRPr/></a:p></p:txBody>'
    else:
        li, ti = ins or (73152, 36576)
        tx = (f'<p:txBody><a:bodyPr wrap="square" lIns="{li}" tIns="{ti}" rIns="{li}" bIns="{ti}" rtlCol="0" anchor="ctr"><a:noAutofit/></a:bodyPr>'
              f'<a:lstStyle/>{inner}</p:txBody>')
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{id_}" name="{escape(name)}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr>'
            f'<a:xfrm><a:off x="{E(x)}" y="{E(y)}"/><a:ext cx="{E(w)}" cy="{E(h)}"/></a:xfrm>'
            f'<a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val {adj}"/></a:avLst></a:prstGeom>'
            f'<a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>{ln}<a:effectLst/></p:spPr>{STYLE}{tx}</p:sp>')


def oval(id_, name, x, y, d, label):
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{id_}" name="{escape(name)}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr>'
            f'<a:xfrm><a:off x="{E(x)}" y="{E(y)}"/><a:ext cx="{E(d)}" cy="{E(d)}"/></a:xfrm><a:prstGeom prst="ellipse"><a:avLst/></a:prstGeom>'
            f'<a:solidFill><a:srgbClr val="{C_NUM}"/></a:solidFill><a:ln><a:noFill/></a:ln><a:effectLst/></p:spPr>{STYLE}'
            f'<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="36576" rIns="0" bIns="36576" rtlCol="0" anchor="ctr"><a:noAutofit/></a:bodyPr>'
            f'<a:lstStyle/><a:p><a:pPr algn="ctr"/>{run(label, 13, True, "FFFFFF")}</a:p></p:txBody></p:sp>')


def tbox(id_, name, x, y, w, h, inner, anchor='t', autofit=True):
    af = '<a:normAutofit/>' if autofit else '<a:noAutofit/>'
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{id_}" name="{escape(name)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr>'
            f'<a:xfrm><a:off x="{E(x)}" y="{E(y)}"/><a:ext cx="{E(w)}" cy="{E(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
            f'<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="18288" rIns="0" bIns="18288" anchor="{anchor}">{af}</a:bodyPr><a:lstStyle/>{inner}</p:txBody></p:sp>')


def line(id_, name, x, y, w, h):
    return (f'<p:cxnSp><p:nvCxnSpPr><p:cNvPr id="{id_}" name="{escape(name)}"/><p:cNvCxnSpPr/><p:nvPr/></p:nvCxnSpPr><p:spPr>'
            f'<a:xfrm><a:off x="{E(x)}" y="{E(y)}"/><a:ext cx="{E(w)}" cy="{E(h)}"/></a:xfrm><a:prstGeom prst="line"><a:avLst/></a:prstGeom>'
            f'<a:ln w="15875"><a:solidFill><a:srgbClr val="{C_CONN}"/></a:solidFill></a:ln></p:spPr>'
            '<p:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef>'
            '<a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></p:style></p:cxnSp>')


def picture(id_, name, rid, x, y, w, h):
    return (f'<p:pic><p:nvPicPr><p:cNvPr id="{id_}" name="{escape(name)}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>'
            f'<p:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>'
            f'<p:spPr><a:xfrm><a:off x="{E(x)}" y="{E(y)}"/><a:ext cx="{E(w)}" cy="{E(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>')


# ---------------------------------------------------------------- cards and panels
PAD_T, PAD_B, PAD_X, TITLE_SZ = 9, 9, 16, 15


class Card:
    """Light card: bold title, then a list. items: see norm_items; text: one plain paragraph."""

    def __init__(self, title, items=None, sz=13, start=None, text=None, oval_label=None):
        self.title, self.sz, self.start, self.oval = title, sz, start, oval_label
        self.paras = [('p', text)] if text is not None else norm_items(items or [])

    def title_h(self, w):
        tw = w - 2 * PAD_X - (43 if self.oval else 0)
        return max(29, n_lines(self.title, tw, TITLE_SZ, True) * TITLE_SZ * LINE + 6)

    def need(self, w):
        return PAD_T + self.title_h(w) + 3 + measure(self.paras, w - 2 * PAD_X, self.sz) + PAD_B

    def emit(self, ids, x, y, w, h, tag):
        out = [rrect(ids(), f'{tag} Card', x, y, w, h)]
        th = self.title_h(w)
        tx = x + PAD_X
        if self.oval:
            out.append(oval(ids(), f'{tag} Oval', x + PAD_X, y + PAD_T + (th - 33) / 2, 33, self.oval))
            tx += 43
        out.append(tbox(ids(), f'{tag} Judul', tx, y + PAD_T, x + w - PAD_X - tx, th,
                        para('p', self.title, TITLE_SZ, True, C_HEAD, aft=0), anchor='ctr', autofit=False))
        by = y + PAD_T + th + 3
        bh = y + h - PAD_B - by
        need = measure(self.paras, w - 2 * PAD_X, self.sz)
        if need > bh + 0.5:
            WARN.append(f'{tag}: body needs {need:.0f}pt, has {bh:.0f}pt')
        out.append(tbox(ids(), f'{tag} Isi', x + PAD_X, by, w - 2 * PAD_X, bh, body_xml(self.paras, self.sz, self.start)))
        return out


class Panel:
    """Teal left panel: big number, job name, then LABEL / value fields."""

    def __init__(self, num, name=None, fields=(), vsz=13):
        self.num, self.name, self.vsz = num, name, vsz
        # a field value is a plain string or an item list (use ["bb", ...] for bullets)
        self.fields = [(label, [('p', v)] if isinstance(v, str) else norm_items(v)) for label, v in fields]

    def emit(self, ids, x, y, w, h, tag):
        out = [rrect(ids(), f'{tag} Panel', x, y, w, h, fill=C_PANEL, line=None, adj=4000)]
        ix, iw = (x + 18, w - 32) if w > 120 else (x + 9, w - 15)
        out.append(tbox(ids(), f'{tag} Nomor', ix, y + 11, iw, 68, para('p', self.num, 54, True, C_NUM, aft=0), autofit=False))
        if not self.name:
            return out
        nh = n_lines(self.name, iw, 16, True) * 16 * LINE + 4
        out.append(tbox(ids(), f'{tag} Nama', ix, y + 81, iw, nh, para('p', self.name, 16, True, C_HEAD, aft=0), autofit=False))
        cy = y + 81 + nh + 14
        for label, paras in self.fields:
            out.append(tbox(ids(), f'{tag} Label', ix, cy, iw, 20,
                            f'<a:p><a:pPr algn="l"/>{run(label, 10, True, C_LABEL, spc=100)}</a:p>', autofit=False))
            cy += 21
            vh = measure(paras, iw, self.vsz) + 1
            out.append(tbox(ids(), f'{tag} Nilai', ix, cy, iw, vh, body_xml(paras, self.vsz)))
            cy += vh + 10
        if cy - 10 > y + h - 8:
            WARN.append(f'{tag}: panel content ends {cy-10:.0f}, panel bottom {y+h-8:.0f}')
        return out


def stack(ids, cards, x, y, w, h, tag, gap=12):
    """Cards stacked to fill height h; spare height shared equally."""
    needs = [c.need(w) for c in cards]
    extra = h - sum(needs) - gap * (len(cards) - 1)
    if extra < 0:
        WARN.append(f'{tag}: stack short by {-extra:.0f}pt')
        extra = 0
    out, cy = [], y
    for i, (c, n) in enumerate(zip(cards, needs)):
        ch = n + extra / len(cards)
        out += c.emit(ids, x, cy, w, ch, f'{tag}{chr(97 + i)}')
        cy += ch + gap
    return out


def row(ids, cards, widths, x, y, h, tag, gap=12):
    out, cx = [], x
    for i, (c, cw) in enumerate(zip(cards, widths)):
        if c.need(cw) > h + 0.5:
            WARN.append(f'{tag}{i}: needs {c.need(cw):.0f}pt, row is {h:.0f}pt')
        out += c.emit(ids, cx, y, cw, h, f'{tag}{chr(97 + i)}')
        cx += cw + gap
    return out


# ---------------------------------------------------------------- XML editing of existing slides
def load(path):
    return etree.parse(path)


def save(path, t):
    t.write(path, xml_declaration=True, encoding='UTF-8', standalone=True)


def tree_of(t):
    return t.find('.//p:cSld/p:spTree', NS)


def text_of(el):
    return ''.join(x.text or '' for x in el.iter(A + 't'))


def top_shapes(t):
    return [el for el in tree_of(t) if el.find('.//p:cNvPr', NS) is not None and not el.tag.endswith('nvGrpSpPr')]


def shape(t, id_):
    for el in top_shapes(t):
        if el.find('.//p:cNvPr', NS).get('id') == str(id_):
            return el
    raise KeyError(f'shape id {id_}')


def shape_id(el):
    return int(el.find('.//p:cNvPr', NS).get('id'))


def find_text(t, pred):
    return [el for el in top_shapes(t) if pred(text_of(el).strip())]


def keep_only(t, ids):
    st = tree_of(t)
    for el in top_shapes(t):
        if shape_id(el) not in ids:
            st.remove(el)


def max_id(t):
    return max([shape_id(el) for el in top_shapes(t)] + [1])


def append_xml(t, frags):
    st = tree_of(t)
    wrap = etree.fromstring(f'<p:spTree {DECL}>{"".join(frags)}</p:spTree>')
    for el in list(wrap):
        st.append(el)


def set_texts(sp, texts):
    """One paragraph per text, each copying the first paragraph's formatting (first run only).
    Works on text split into per-word runs, which string replacement misses."""
    body = sp.find('.//p:txBody', NS)
    if body is None:
        body = sp.find('.//a:txBody', NS)
    ps = body.findall('a:p', NS)
    tmpl = ps[0]
    for p in ps:
        body.remove(p)
    for tx in texts:
        p = copy.deepcopy(tmpl)
        runs = p.findall('a:r', NS)
        for r in runs[1:]:
            p.remove(r)
        if not runs:
            raise ValueError('template paragraph has no run')
        runs[0].find('a:rPr', NS).attrib.pop('err', None)
        runs[0].find('a:t', NS).text = tx
        body.append(p)


def set_para(sp, idx, text):
    """Replace the text of paragraph idx only, keeping its first run's formatting."""
    p = sp.find('.//p:txBody', NS).findall('a:p', NS)[idx]
    runs = p.findall('a:r', NS)
    for r in runs[1:]:
        p.remove(r)
    runs[0].find('a:rPr', NS).attrib.pop('err', None)
    runs[0].find('a:t', NS).text = text


def set_size(sp, sz):
    for r in sp.iter(A + 'rPr', A + 'endParaRPr'):
        r.set('sz', str(int(sz * 100)))


def geom(sp):
    off = sp.find('.//a:xfrm/a:off', NS)
    if off is None:
        off = sp.find('.//p:xfrm/a:off', NS)
    ext = off.getnext()
    return [int(off.get(k)) / EMU for k in ('x', 'y')] + [int(ext.get(k)) / EMU for k in ('cx', 'cy')]


def move(sp, x=None, y=None, w=None, h=None):
    off = sp.find('.//a:xfrm/a:off', NS)
    if off is None:
        off = sp.find('.//p:xfrm/a:off', NS)
    ext = off.getnext()
    if x is not None: off.set('x', str(E(x)))
    if y is not None: off.set('y', str(E(y)))
    if w is not None: ext.set('cx', str(E(w)))
    if h is not None: ext.set('cy', str(E(h)))
