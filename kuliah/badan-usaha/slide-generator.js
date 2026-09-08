const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";           // 13.333 x 7.5
pres.author = "Kelompok Pengantar Manajemen dan Bisnis";
pres.title  = "Pengertian dan Bentuk-Bentuk Badan Usaha di Indonesia";

const W = 13.333, H = 7.5, M = 0.7;
const CW = W - 2 * M;                   // content width 11.933

// ---- palette (ink/amber: legal-document feel, not default blue) ----
const INK    = "16233A";  // deep ink navy  (dominant)
const INK2   = "24375C";  // lighter ink
const BLUE   = "2B4C7E";  // supporting
const AMBER  = "E0A458";  // sharp accent
const AMBERD = "9C6B22";  // amber, readable on white
const GREEN  = "2C7A5B";  // "terlindungi" / badan hukum
const RED    = "B3402F";  // "tidak terlindungi" / bukan badan hukum
const TXT    = "1A1A1A";
const MUT    = "5A6577";
const CARD   = "F2F4F7";
const WHITE  = "FFFFFF";

const HFONT = "Cambria";
const BFONT = "Calibri";

const sh = () => ({ type: "outer", color: "16233A", blur: 8, offset: 2, angle: 90, opacity: 0.12 });

// ---------- helpers ----------
function darkSlide(notes) {
  const s = pres.addSlide();
  s.background = { color: INK };
  if (notes) s.addNotes(notes);
  return s;
}
function lightSlide(title, notes, kicker) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: M, y: 0.36, w: CW, h: 0.28, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 11, bold: true, charSpacing: 1.6, color: AMBERD,
    });
  }
  s.addText(title, {
    x: M, y: kicker ? 0.66 : 0.45, w: CW, h: 0.75, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 32, bold: true, color: INK, valign: "top",
  });
  if (notes) s.addNotes(notes);
  return s;
}
// numbered circle badge — the deck's repeated motif
function badge(s, n, x, y, d, fill) {
  d = d || 0.42;
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d, fill: { color: fill || INK }, line: { color: fill || INK, width: 0 },
  });
  s.addText(String(n), {
    x, y, w: d, h: d, isTextBox: true, margin: 0, align: "center", valign: "middle",
    fontFace: BFONT, fontSize: 14, bold: true, color: WHITE,
  });
}
function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: fill || CARD }, line: { color: fill || CARD, width: 0 }, shadow: sh(),
  });
}
// icon+text row list with numbered badges
function badgeList(s, items, x, y, w, gap, opts) {
  opts = opts || {};
  items.forEach((it, i) => {
    const yy = y + i * gap;
    badge(s, i + 1, x, yy + 0.03, 0.4, opts.badgeFill || INK);
    s.addText(it.h, {
      x: x + 0.62, y: yy, w: w - 0.62, h: 0.32, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: opts.hSize || 17, bold: true, color: opts.hColor || INK,
    });
    if (it.b) s.addText(it.b, {
      x: x + 0.62, y: yy + 0.34, w: w - 0.62, h: gap - 0.42, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: opts.bSize || 13.5, color: opts.bColor || MUT, lineSpacing: 17,
    });
  });
}
function statusPill(s, x, y, w, text, color) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h: 0.36, rectRadius: 0.18,
    fill: { color }, line: { color, width: 0 },
  });
  s.addText(text, {
    x, y, w, h: 0.36, isTextBox: true, margin: 0, align: "center", valign: "middle",
    fontFace: BFONT, fontSize: 12.5, bold: true, color: WHITE,
  });
}
function footNote(s, text) {
  s.addText(text, {
    x: M, y: H - 0.62, w: CW, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 10.5, italic: true, color: MUT,
  });
}

// =====================================================================
// 1 — TITLE
// =====================================================================
{
  const s = darkSlide("Bryan membuka. Jangan perkenalan dulu — langsung ke Slide 2.");
  s.addShape(pres.ShapeType.ellipse, { x: 10.6, y: -1.5, w: 4.6, h: 4.6, fill: { color: INK2 }, line: { width: 0 } });
  s.addShape(pres.ShapeType.ellipse, { x: 11.9, y: 5.2, w: 2.6, h: 2.6, fill: { color: BLUE }, line: { width: 0 } });
  s.addText("PENGANTAR MANAJEMEN DAN BISNIS", {
    x: M, y: 1.75, w: 9.6, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 2, color: AMBER,
  });
  s.addText("Pengertian dan\nBentuk-Bentuk\nBadan Usaha di Indonesia", {
    x: M, y: 2.2, w: 9.6, h: 2.6, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 42, bold: true, color: WHITE, lineSpacing: 50,
  });
  s.addText("Kelompok 3 orang  ·  Universitas Kristen Satya Wacana", {
    x: M, y: 5.35, w: 9.6, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 15, color: "B9C4D6",
  });
  s.addText("Rujukan: Solihin & Sucipto (2014) · Brantas (2009) · Kotler (2003)\ndiperbarui dengan UU Cipta Kerja, PP 8/2021 dan UU 1/2025", {
    x: M, y: 5.85, w: 9.6, h: 0.7, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 11.5, italic: true, color: "8A98AE", lineSpacing: 16,
  });
}

// =====================================================================
// 2 — AKTIVITAS 1: PUNYA SIAPA INI?
// =====================================================================
{
  const s = lightSlide("Punya siapa usaha-usaha ini?", "Aktivitas 1. Tanya dua kali: (1) mana yang milik negara, (2) mana yang pemiliknya bisa kehilangan rumah pribadi. Jangan dijawab.", "Aktivitas 1 · angkat tangan");
  const names = ["Indomaret", "PT KAI", "Gojek", "Warung nasi\ndepan kampus", "Kopma UKSW", "Perumda\nAir Minum"];
  const cw = 3.72, ch = 1.55, gx = 0.38, gy = 0.36;
  names.forEach((n, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (cw + gx), y = 2.15 + row * (ch + gy);
    card(s, x, y, cw, ch);
    s.addText(n, {
      x: x + 0.2, y, w: cw - 0.4, h: ch, isTextBox: true, margin: 0,
      align: "center", valign: "middle", fontFace: HFONT, fontSize: 20, bold: true, color: INK,
    });
  });
  s.addText("Kalau salah satunya bangkrut dengan utang Rp3 miliar — pemiliknya bisa kehilangan rumah pribadi atau tidak?", {
    x: M, y: 6.1, w: CW, h: 0.5, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 15, bold: true, color: AMBERD,
  });
}

// =====================================================================
// 3 — PETA MATERI
// =====================================================================
{
  const s = lightSlide("Yang kita bahas hari ini", "Tunjuk tiap kotak sambil ngomong. Sebutkan ada 3 aktivitas.", "Peta materi");
  const items = [
    { n: "1", h: "Apa itu badan usaha", b: "Definisi, unsur, dan kenapa badan usaha berbeda dari perusahaan" },
    { n: "2", h: "Bentuk-bentuknya", b: "Dari warung, CV, PT, koperasi, sampai BUMN dan BUMD" },
    { n: "3", h: "Cara memilihnya", b: "Studi kasus — bagian ini kalian yang kerja, bukan kami" },
  ];
  const cw = 3.72, gx = 0.38;
  items.forEach((it, i) => {
    const x = M + i * (cw + gx);
    card(s, x, 2.0, cw, 3.0);
    badge(s, it.n, x + 0.35, 2.35, 0.5, INK);
    s.addText(it.h, {
      x: x + 0.35, y: 3.05, w: cw - 0.7, h: 0.8, isTextBox: true, margin: 0,
      fontFace: HFONT, fontSize: 20, bold: true, color: INK,
    });
    s.addText(it.b, {
      x: x + 0.35, y: 3.85, w: cw - 0.7, h: 1.0, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 13.5, color: MUT, lineSpacing: 18,
    });
  });
  s.addText("3 aktivitas  ·  95 menit  ·  di aktivitas terakhir kalian mendirikan usaha di atas kertas", {
    x: M, y: 5.4, w: CW, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 14, bold: true, color: AMBERD,
  });
}

// =====================================================================
// 4 — DEFINISI
// =====================================================================
{
  const s = lightSlide("Apa itu badan usaha?", "Anggota 2. Baca definisinya, lalu pecah tiga bagian.", "Materi 1 · Pengertian");
  card(s, M, 1.55, CW, 1.35, INK);
  s.addText("Kesatuan yuridis dan ekonomis yang menggunakan faktor-faktor produksi untuk mencari laba atau memberi layanan kepada masyarakat.", {
    x: M + 0.45, y: 1.55, w: CW - 0.9, h: 1.35, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HFONT, fontSize: 19, bold: true, color: WHITE, lineSpacing: 28,
  });
  const items = [
    { h: "Kesatuan yuridis", b: "Punya identitas di mata hukum. Dia yang tanda tangan kontrak, punya NPWP, bayar pajak, dan bisa digugat." },
    { h: "Kesatuan ekonomis", b: "Dia yang mengatur modal, tenaga kerja, dan sumber daya untuk menghasilkan nilai." },
    { h: "Faktor produksi", b: "Alam · tenaga kerja · modal · keahlian" },
  ];
  badgeList(s, items, M, 3.3, CW * 0.62, 1.15);
  card(s, M + CW * 0.66, 3.3, CW * 0.34, 3.0);
  s.addText("Unsur badan usaha", {
    x: M + CW * 0.66 + 0.35, y: 3.55, w: CW * 0.34 - 0.7, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, bold: true, charSpacing: 1.2, color: AMBERD,
  });
  s.addText([
    { text: "Modal", options: { bullet: true, breakLine: true } },
    { text: "Tenaga kerja", options: { bullet: true, breakLine: true } },
    { text: "Organisasi", options: { bullet: true, breakLine: true } },
    { text: "Bentuk hukum", options: { bullet: true, breakLine: true } },
    { text: "Tujuan", options: { bullet: true } },
  ], {
    x: M + CW * 0.66 + 0.35, y: 4.0, w: CW * 0.34 - 0.7, h: 2.1, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 15, color: INK, paraSpaceAfter: 8,
  });
}

// =====================================================================
// 5 — BADAN USAHA ≠ PERUSAHAAN
// =====================================================================
{
  const s = lightSlide("Badan usaha bukan perusahaan", "Ini bagian paling sering ketuker. Kasih jeda setelah judul.", "Materi 1 · Pengertian");
  const cw = (CW - 0.45) / 2;
  const cols = [
    { t: "BADAN USAHA", q: '"Siapa"-nya', rows: [["Sifatnya", "Kesatuan yuridis dan ekonomis"], ["Isinya", "Identitas hukum, modal, organisasi"], ["Tujuannya", "Mencari laba / memberi layanan"], ["Wujudnya", "Abstrak — ada di akta dan dokumen"]], c: INK },
    { t: "PERUSAHAAN", q: '"Di mana dan pakai apa"-nya', rows: [["Sifatnya", "Kesatuan teknis produksi"], ["Isinya", "Tempat, mesin, alat, gudang, pekerja"], ["Tujuannya", "Menghasilkan barang dan jasa"], ["Wujudnya", "Nyata — bisa didatangi dan dilihat"]], c: BLUE },
  ];
  cols.forEach((col, i) => {
    const x = M + i * (cw + 0.45);
    card(s, x, 1.6, cw, 4.55);
    s.addText(col.t, {
      x: x + 0.4, y: 1.9, w: cw - 0.8, h: 0.42, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 13, bold: true, charSpacing: 1.6, color: col.c,
    });
    s.addText(col.q, {
      x: x + 0.4, y: 2.3, w: cw - 0.8, h: 0.55, isTextBox: true, margin: 0,
      fontFace: HFONT, fontSize: 26, bold: true, color: col.c,
    });
    col.rows.forEach((r, j) => {
      const y = 3.15 + j * 0.72;
      s.addText(r[0], {
        x: x + 0.4, y, w: 1.35, h: 0.3, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 12, bold: true, color: MUT,
      });
      s.addText(r[1], {
        x: x + 1.8, y: y - 0.03, w: cw - 2.2, h: 0.6, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 13.5, color: TXT, lineSpacing: 17,
      });
    });
  });
  s.addText("Badan usaha itu \"siapa\"-nya. Perusahaan itu \"di mana dan pakai apa\"-nya.", {
    x: M, y: 6.4, w: CW, h: 0.45, isTextBox: true, margin: 0, align: "center",
    fontFace: HFONT, fontSize: 18, bold: true, italic: true, color: AMBERD,
  });
}

// =====================================================================
// 6 — CONTOH UNILEVER
// =====================================================================
{
  const s = lightSlide("Satu badan usaha, banyak perusahaan", "Contoh konkret. Setelah ini cek paham lewat warung nasi — think-pair-share 20 detik.", "Materi 1 · Contoh");
  card(s, M + 3.4, 1.7, 5.1, 1.1, INK);
  s.addText("PT Unilever Indonesia Tbk", {
    x: M + 3.4, y: 1.7, w: 5.1, h: 1.1, isTextBox: true, margin: 0, align: "center", valign: "middle",
    fontFace: HFONT, fontSize: 20, bold: true, color: WHITE,
  });
  s.addText("1 BADAN USAHA", {
    x: M + 3.4, y: 2.85, w: 5.1, h: 0.3, isTextBox: true, margin: 0, align: "center",
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1.6, color: AMBERD,
  });
  const kids = ["Pabrik\nRungkut", "Pabrik\nCikarang", "Kantor pusat\nTangerang"];
  const kw = 3.35, gx = 0.45;
  kids.forEach((k, i) => {
    const x = M + i * (kw + gx) + 0.35;
    card(s, x, 4.0, kw, 1.5);
    s.addText(k, {
      x, y: 4.0, w: kw, h: 1.5, isTextBox: true, margin: 0, align: "center", valign: "middle",
      fontFace: BFONT, fontSize: 16, bold: true, color: BLUE,
    });
  });
  s.addText("3 PERUSAHAAN", {
    x: M, y: 5.6, w: CW, h: 0.3, isTextBox: true, margin: 0, align: "center",
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1.6, color: AMBERD,
  });
  s.addText("Yang membuat kontrak dan membayar pajak tetap satu: badan usahanya.", {
    x: M, y: 6.1, w: CW, h: 0.4, isTextBox: true, margin: 0, align: "center",
    fontFace: BFONT, fontSize: 15, italic: true, color: MUT,
  });
}

// =====================================================================
// 7 — KENAPA PENTING
// =====================================================================
{
  const s = lightSlide("Kenapa bentuk badan usaha penting", "Anggota 2. Tekankan nomor 1 — nanti diulang terus.", "Materi 1 · Kenapa penting");
  const items = [
    { h: "Sampai mana harta pribadi ikut menanggung kalau usaha rugi", b: "Ini yang paling nyata, dan ini yang akan kita ulang sepanjang sesi." },
    { h: "Seberapa mudah mencari modal", b: "Investor tidak akan masuk ke usaha perseorangan — tidak ada saham yang bisa dibeli." },
    { h: "Berapa mahal dan ribet mendirikannya", b: "Dari gratis lewat OSS sampai akta notaris dan modal disetor." },
    { h: "Bisa ikut proyek besar atau tidak", b: "Banyak tender dan kerja sama korporat mensyaratkan berbadan hukum." },
  ];
  badgeList(s, items, M, 1.95, CW, 1.15);
}

// =====================================================================
// 8 — KLASIFIKASI: LAPANGAN USAHA
// =====================================================================
{
  const s = lightSlide("Menurut lapangan usaha", "Tekankan beda ekstraktif vs agraris — ini yang paling sering ketuker.", "Materi 1 · Klasifikasi 1 dari 3");
  const items = [
    ["Ekstraktif", "Mengambil langsung dari alam", "Tambang, menangkap ikan di laut"],
    ["Agraris", "Mengolah alam untuk menghasilkan", "Pertanian, perkebunan, peternakan"],
    ["Industri", "Mengubah bahan baku jadi barang jadi", "Pabrik semen, konveksi, pabrik makanan"],
    ["Perdagangan", "Beli lalu jual tanpa mengubah bentuk", "Indomaret, grosir, e-commerce"],
    ["Jasa", "Menjual layanan, bukan barang", "Bank, rumah sakit, Gojek"],
  ];
  items.forEach((it, i) => {
    const y = 1.8 + i * 0.78;
    card(s, M, y, CW, 0.66, i < 2 ? "EAEFF6" : CARD);
    s.addText(it[0], {
      x: M + 0.35, y, w: 2.3, h: 0.66, isTextBox: true, margin: 0, valign: "middle",
      fontFace: BFONT, fontSize: 16, bold: true, color: INK,
    });
    s.addText(it[1], {
      x: M + 2.75, y, w: 4.6, h: 0.66, isTextBox: true, margin: 0, valign: "middle",
      fontFace: BFONT, fontSize: 13.5, color: TXT,
    });
    s.addText(it[2], {
      x: M + 7.5, y, w: CW - 7.85, h: 0.66, isTextBox: true, margin: 0, valign: "middle",
      fontFace: BFONT, fontSize: 13, italic: true, color: MUT,
    });
  });
  footNote(s, "Ekstraktif mengambil yang sudah ada di alam. Agraris menanam atau membudidayakan dulu, baru memanen.");
}

// =====================================================================
// 9 — KLASIFIKASI: KEPEMILIKAN MODAL
// =====================================================================
{
  const s = lightSlide("Menurut kepemilikan modal", "Cepat saja — ini yang paling intuitif.", "Materi 1 · Klasifikasi 2 dari 3");
  const items = [
    ["BUMN", "Negara", "Pertamina, PLN, KAI, BRI"],
    ["BUMD", "Pemerintah daerah", "Bank Jateng, Perumda Air Minum"],
    ["BUMS", "Swasta", "Indofood, Djarum, warung"],
    ["Koperasi", "Anggota", "Kopma, KUD, koperasi karyawan"],
    ["Campuran", "Negara + swasta", "BUMN yang sudah go public"],
  ];
  const cw = (CW - 4 * 0.3) / 5;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.3);
    card(s, x, 1.95, cw, 4.0);
    s.addText(it[0], {
      x: x + 0.2, y: 2.45, w: cw - 0.4, h: 0.5, isTextBox: true, margin: 0, align: "center",
      fontFace: HFONT, fontSize: 22, bold: true, color: INK,
    });
    s.addText("modalnya dari", {
      x: x + 0.2, y: 3.2, w: cw - 0.4, h: 0.28, isTextBox: true, margin: 0, align: "center",
      fontFace: BFONT, fontSize: 10.5, color: MUT,
    });
    s.addText(it[1], {
      x: x + 0.2, y: 3.5, w: cw - 0.4, h: 0.6, isTextBox: true, margin: 0, align: "center",
      fontFace: BFONT, fontSize: 15, bold: true, color: BLUE, lineSpacing: 19,
    });
    s.addText(it[2], {
      x: x + 0.2, y: 4.4, w: cw - 0.4, h: 1.1, isTextBox: true, margin: 0, align: "center",
      fontFace: BFONT, fontSize: 12, italic: true, color: MUT, lineSpacing: 16,
    });
  });
}

// =====================================================================
// 10 — BADAN HUKUM VS BUKAN  (slide paling penting)
// =====================================================================
{
  const s = lightSlide("Berbadan hukum atau bukan", "SLIDE PALING PENTING. Pelan-pelan. Jeda 3 detik setelah kalimat kuncinya.", "Materi 1 · Klasifikasi 3 dari 3");
  const cw = (CW - 0.45) / 2;
  const cols = [
    { t: "BERBADAN HUKUM", c: GREEN, who: "PT · PT Perorangan · Koperasi\nYayasan · Perum · Perumda · Perseroda",
      rows: [["Harta usaha & harta pribadi", "Terpisah"], ["Kalau usaha berutang", "Ditagih ke perusahaan saja"], ["Di mata hukum", "Subjek hukum sendiri, terpisah dari pemiliknya"]] },
    { t: "BUKAN BADAN HUKUM", c: RED, who: "Perusahaan perseorangan · Firma\nCV · Persekutuan Perdata",
      rows: [["Harta usaha & harta pribadi", "Menyatu"], ["Kalau usaha berutang", "Bisa ditagih sampai harta pribadi pemilik"], ["Di mata hukum", "Melekat pada orang-orangnya"]] },
  ];
  cols.forEach((col, i) => {
    const x = M + i * (cw + 0.45);
    card(s, x, 1.6, cw, 4.05);
    statusPill(s, x + 0.4, 1.9, cw - 0.8, col.t, col.c);
    s.addText(col.who, {
      x: x + 0.4, y: 2.4, w: cw - 0.8, h: 0.7, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 12.5, bold: true, color: col.c, lineSpacing: 17,
    });
    col.rows.forEach((r, j) => {
      const y = 3.2 + j * 0.78;
      s.addText(r[0], {
        x: x + 0.4, y, w: cw - 0.8, h: 0.26, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 11, bold: true, charSpacing: 0.8, color: MUT,
      });
      s.addText(r[1], {
        x: x + 0.4, y: y + 0.26, w: cw - 0.8, h: 0.5, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 14, color: TXT, lineSpacing: 18,
      });
    });
  });
  card(s, M, 5.85, CW, 0.95, INK);
  s.addText("Badan hukum artinya perusahaannya dianggap \"orang\" sendiri oleh hukum. Kalau dia bangkrut, yang bangkrut dia — bukan kamu. Kalau bukan badan hukum, yang bangkrut kamu.", {
    x: M + 0.45, y: 5.85, w: CW - 0.9, h: 0.95, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HFONT, fontSize: 15.5, bold: true, color: WHITE, lineSpacing: 22,
  });
}

// =====================================================================
// 11 — KUNCI SORTIR 1
// =====================================================================
{
  const s = lightSlide("Kunci sortir — kepemilikan", "Tanya dulu kartu mana yang bikin kelompok berantem, baru tampilkan ini.", "Aktivitas 2 · tahap 1");
  const cols = [
    { t: "Milik Negara", c: INK, items: ["PT Pertamina (Persero)", "PT KAI (Persero)", "Perum BULOG"] },
    { t: "Milik Daerah", c: BLUE, items: ["Perumda Air Minum", "Bank Jateng (Perseroda)"] },
    { t: "Milik Swasta", c: AMBERD, items: ["Indomaret", "Gojek", "Warung Nasi Bu Sri", "CV Maju Jaya", "Firma Santoso & Rekan", "Kopma UKSW"] },
  ];
  const cw = (CW - 2 * 0.4) / 3;
  cols.forEach((col, i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, 1.85, cw, 4.3);
    statusPill(s, x + 0.35, 2.15, cw - 0.7, col.t.toUpperCase(), col.c);
    col.items.forEach((it, j) => {
      s.addText(it, {
        x: x + 0.35, y: 2.75 + j * 0.5, w: cw - 0.7, h: 0.42, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 13.5, color: TXT,
      });
    });
  });
  footNote(s, "Kopma UKSW milik anggotanya — mahasiswa. Jadi masuk swasta, bukan milik negara atau kampus.");
}

// =====================================================================
// 12 — KUNCI SORTIR 2
// =====================================================================
{
  const s = lightSlide("Kunci sortir — badan hukum", "Fokus ke dua kesalahan yang paling sering: CV dikira badan hukum, Kopma dikira bukan.", "Aktivitas 2 · tahap 2");
  const cw = (CW - 0.45) / 2;
  const cols = [
    { t: "BERBADAN HUKUM", c: GREEN, items: ["PT Pertamina (Persero)", "PT KAI (Persero)", "Perum BULOG", "Perumda Air Minum", "Bank Jateng (Perseroda)", "Gojek (PT)", "Kopma UKSW"] },
    { t: "BUKAN BADAN HUKUM", c: RED, items: ["Warung Nasi Bu Sri", "CV Maju Jaya", "Firma Santoso & Rekan"] },
  ];
  cols.forEach((col, i) => {
    const x = M + i * (cw + 0.45);
    card(s, x, 1.75, cw, 3.6);
    statusPill(s, x + 0.4, 2.05, cw - 0.8, col.t, col.c);
    col.items.forEach((it, j) => {
      s.addText(it, {
        x: x + 0.4, y: 2.62 + j * 0.37, w: cw - 0.8, h: 0.32, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 13.5, color: TXT,
      });
    });
  });
  card(s, M, 5.6, CW, 1.15, "FBF1E3");
  s.addText([
    { text: "Dua yang paling sering salah.  ", options: { bold: true, color: AMBERD } },
    { text: "CV bukan badan hukum ", options: { bold: true, color: RED } },
    { text: "— walaupun punya akta notaris dan NPWP.  ", options: { color: TXT } },
    { text: "Koperasi badan hukum ", options: { bold: true, color: GREEN } },
    { text: "— statusnya sama kuatnya dengan PT.", options: { color: TXT } },
  ], {
    x: M + 0.45, y: 5.6, w: CW - 0.9, h: 1.15, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 15, lineSpacing: 22,
  });
}

// =====================================================================
// 13 — DIVIDER: BADAN USAHA SWASTA
// =====================================================================
{
  const s = darkSlide("Anggota 3 mulai. Urutan: dari yang paling gampang bikinnya ke yang paling ribet.");
  s.addShape(pres.ShapeType.ellipse, { x: 11.0, y: 4.4, w: 3.8, h: 3.8, fill: { color: INK2 }, line: { width: 0 } });
  s.addText("BAGIAN 2", {
    x: M, y: 2.4, w: 9.5, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, bold: true, charSpacing: 2.2, color: AMBER,
  });
  s.addText("Bentuk Badan Usaha Swasta", {
    x: M, y: 2.85, w: 9.8, h: 1.0, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 40, bold: true, color: WHITE,
  });
  s.addText("Perseorangan  ·  Firma  ·  CV  ·  PT  ·  PT Perorangan", {
    x: M, y: 4.0, w: 9.8, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 17, color: "B9C4D6",
  });
  s.addText("Di setiap bentuk, pertanyaannya selalu sama: kalau rugi, siapa yang menanggung?", {
    x: M, y: 4.65, w: 9.8, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 14, italic: true, color: AMBER,
  });
}

// =====================================================================
// helper: slide bentuk badan usaha
// =====================================================================
function bentukSlide(opts) {
  const s = lightSlide(opts.title, opts.notes, opts.kicker);
  statusPill(s, M, 1.62, 2.55, opts.bh ? "BADAN HUKUM" : "BUKAN BADAN HUKUM", opts.bh ? GREEN : RED);
  s.addText(opts.dasar, {
    x: M + 2.8, y: 1.62, w: CW - 2.8, h: 0.36, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 12.5, italic: true, color: MUT,
  });
  s.addText(opts.lead, {
    x: M, y: 2.2, w: CW, h: 0.75, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 15.5, color: TXT, lineSpacing: 22,
  });
  const cw = (CW - 0.45) / 2;
  const groups = [
    { t: "KELEBIHAN", c: GREEN, items: opts.plus },
    { t: "KEKURANGAN", c: RED, items: opts.minus },
  ];
  groups.forEach((g, i) => {
    const x = M + i * (cw + 0.45);
    card(s, x, 3.1, cw, 2.75);
    s.addText(g.t, {
      x: x + 0.4, y: 3.35, w: cw - 0.8, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1.6, color: g.c,
    });
    s.addText(g.items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < g.items.length - 1 } })), {
      x: x + 0.4, y: 3.72, w: cw - 0.8, h: 2.0, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 13.5, color: TXT, paraSpaceAfter: 7, lineSpacing: 17,
    });
  });
  if (opts.key) {
    card(s, M, 6.05, CW, 0.85, INK);
    s.addText(opts.key, {
      x: M + 0.45, y: 6.05, w: CW - 0.9, h: 0.85, isTextBox: true, margin: 0, valign: "middle",
      fontFace: BFONT, fontSize: 14, bold: true, color: WHITE, lineSpacing: 19,
    });
  }
  return s;
}

// 14 — PERUSAHAAN PERSEORANGAN
bentukSlide({
  title: "Perusahaan Perseorangan (UD / PD)", kicker: "Materi 2 · bentuk 1 dari 5", bh: false,
  dasar: "Tidak ada undang-undang khusus — cukup izin usaha lewat NIB di sistem OSS",
  lead: "Dimiliki dan dijalankan satu orang, modal dari kantong sendiri. Warung, bengkel, toko kelontong.",
  plus: ["Paling murah dan paling cepat didirikan", "Semua keuntungan milik sendiri", "Keputusan cepat, tidak perlu rapat", "Rahasia usaha terjaga"],
  minus: ["Tanggung jawab tidak terbatas", "Modal terbatas kemampuan satu orang", "Sulit berkembang besar", "Umur usaha bergantung pemiliknya"],
  key: "Kalau usahanya berutang dan kas usaha tidak cukup, penagih boleh masuk ke harta pribadi — motor, rumah, tabungan.",
  notes: "Anggota 3. Bentuk paling sederhana. Tekankan tanggung jawab tidak terbatas.",
});

// 15 — FIRMA
bentukSlide({
  title: "Firma (Fa)", kicker: "Materi 2 · bentuk 2 dari 5", bh: false,
  dasar: "KUHD Pasal 16–35  ·  akta notaris, didaftarkan lewat sistem SABU (Permenkumham 17/2018)",
  lead: "Dua orang atau lebih menjalankan usaha di bawah satu nama bersama, dan semua sekutunya aktif menjalankan usaha.",
  plus: ["Modal lebih besar dari perseorangan", "Ada pembagian kerja dan keahlian", "Lebih dipercaya pihak ketiga", "Cocok untuk profesi: akuntan, hukum, konsultan"],
  minus: ["Tanggung renteng — kesalahan satu orang ditanggung semua", "Tanggung jawab tetap tidak terbatas", "Rawan konflik antar sekutu", "Keluarnya satu sekutu bisa membubarkan firma"],
  key: "Tanggung renteng: kalau rekan firma berutang atas nama firma tanpa memberi tahu kamu, penagihnya boleh datang ke rumah kamu.",
  notes: "Anggota 3. Poin tanggung renteng bikin kelas kaget — itu bagus, pelan-pelan di situ.",
});

// =====================================================================
// 16 — CV
// =====================================================================
bentukSlide({
  title: "CV — Persekutuan Komanditer", kicker: "Materi 2 · bentuk 3 dari 5", bh: false,
  dasar: "KUHD Pasal 19–21  ·  akta notaris, didaftarkan lewat SABU  ·  paling banyak dipakai UMKM Indonesia",
  lead: "Sama seperti firma, tapi sekutunya ada dua jenis — dan tanggung jawab keduanya berbeda.",
  plus: ["Lebih mudah menarik pemodal daripada firma", "Pendirian lebih murah dan cepat daripada PT", "Tidak ada syarat modal minimum", "Ada tempat untuk investor yang tidak mau repot"],
  minus: ["Tetap bukan badan hukum", "Sekutu aktif menanggung risiko penuh", "Sekutu pasif tidak punya suara dalam pengelolaan", "Tidak punya saham — sulit untuk pendanaan lanjutan"],
  key: "Commanditaire Vennootschap. Dua jenis sekutu, dua tingkat tanggung jawab — lihat slide berikutnya.",
  notes: "Anggota 3. Jangan lama di slide ini, inti CV ada di slide berikutnya.",
});

// =====================================================================
// 17 — CV: DUA SEKUTU
// =====================================================================
{
  const s = lightSlide("Dua jenis sekutu di CV", "Tunjuk kolom kiri, lalu kolom kanan. Tutup dengan aturan 'kalau ikut campur, perlindungan hilang'.", "Materi 2 · CV");
  const cw = (CW - 0.45) / 2;
  const cols = [
    { t: "SEKUTU AKTIF", sub: "Komplementer", c: RED,
      rows: [["Perannya", "Menjalankan dan mengurus usaha"], ["Tanggung jawabnya", "Tidak terbatas — sampai harta pribadi"], ["Boleh mengurus?", "Ya, memang tugasnya"]] },
    { t: "SEKUTU PASIF", sub: "Komanditer", c: GREEN,
      rows: [["Perannya", "Hanya menyetor modal"], ["Tanggung jawabnya", "Terbatas sebesar modal yang disetor"], ["Boleh mengurus?", "Tidak boleh sama sekali"]] },
  ];
  cols.forEach((col, i) => {
    const x = M + i * (cw + 0.45);
    card(s, x, 1.7, cw, 3.9);
    statusPill(s, x + 0.4, 2.0, cw - 0.8, col.t, col.c);
    s.addText(col.sub, {
      x: x + 0.4, y: 2.48, w: cw - 0.8, h: 0.35, isTextBox: true, margin: 0,
      fontFace: HFONT, fontSize: 18, bold: true, italic: true, color: INK,
    });
    col.rows.forEach((r, j) => {
      const y = 3.0 + j * 0.8;
      s.addText(r[0], {
        x: x + 0.4, y, w: cw - 0.8, h: 0.26, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 11, bold: true, charSpacing: 0.8, color: MUT,
      });
      s.addText(r[1], {
        x: x + 0.4, y: y + 0.26, w: cw - 0.8, h: 0.5, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 14, color: TXT, lineSpacing: 18,
      });
    });
  });
  card(s, M, 5.85, CW, 0.95, "F7E9E6");
  s.addText([
    { text: "Aturan penting.  ", options: { bold: true, color: RED } },
    { text: "Kalau sekutu pasif ikut campur mengurus usaha, perlindungannya hilang — tanggung jawabnya langsung berubah jadi tidak terbatas, seperti sekutu aktif.", options: { color: TXT } },
  ], {
    x: M + 0.45, y: 5.85, w: CW - 0.9, h: 0.95, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 14.5, lineSpacing: 21,
  });
}

// =====================================================================
// 18 — PT
// =====================================================================
bentukSlide({
  title: "Perseroan Terbatas (PT)", kicker: "Materi 2 · bentuk 4 dari 5", bh: true,
  dasar: "UU No. 40 Tahun 2007, diubah oleh UU Cipta Kerja (UU No. 6 Tahun 2023)  ·  minimal 2 pendiri",
  lead: "Badan hukum persekutuan modal. Modalnya terbagi atas saham, dan pemegang saham hanya bertanggung jawab sebesar sahamnya.",
  plus: ["Tanggung jawab terbatas — harta pribadi aman", "Paling mudah menarik modal besar", "Umur perusahaan tidak bergantung pemiliknya", "Kepemilikan mudah dipindah lewat jual saham"],
  minus: ["Pendirian paling mahal dan rumit", "Kewajiban administrasi dan pelaporan banyak", "Pajak berlapis: PT kena pajak, dividen kena pajak lagi", "Rahasia perusahaan lebih terbuka"],
  key: "Kata \"terbatas\" itu bukan hiasan. PT bangkrut berutang Rp10 miliar dan sahammu Rp50 juta? Rugimu Rp50 juta. Rumahmu tidak bisa disentuh.",
  notes: "Anggota 3. Jelaskan arti kata 'terbatas' — ini yang paling sering nggak dipahami.",
});

// =====================================================================
// 19 — TIGA ORGAN PT
// =====================================================================
{
  const s = lightSlide("Tiga organ Perseroan Terbatas", "Hampir pasti keluar ujian — bilang begitu ke kelas.", "Materi 2 · PT");
  const items = [
    { n: "1", t: "RUPS", sub: "Rapat Umum Pemegang Saham", b: "Kekuasaan tertinggi di PT. Mengangkat dan memberhentikan direksi serta dewan komisaris." },
    { n: "2", t: "Direksi", sub: "Pengurus", b: "Menjalankan perusahaan sehari-hari dan mewakili PT dalam hubungan dengan pihak luar." },
    { n: "3", t: "Dewan Komisaris", sub: "Pengawas", b: "Mengawasi kebijakan dan jalannya pengurusan oleh direksi, serta memberi nasihat." },
  ];
  const cw = (CW - 2 * 0.4) / 3;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, 1.95, cw, 4.15);
    badge(s, it.n, x + 0.4, 2.3, 0.5, INK);
    s.addText(it.t, {
      x: x + 0.4, y: 3.0, w: cw - 0.8, h: 0.5, isTextBox: true, margin: 0,
      fontFace: HFONT, fontSize: 24, bold: true, color: INK,
    });
    s.addText(it.sub, {
      x: x + 0.4, y: 3.5, w: cw - 0.8, h: 0.32, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1, color: AMBERD,
    });
    s.addText(it.b, {
      x: x + 0.4, y: 3.9, w: cw - 0.8, h: 2.0, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 13.5, color: MUT, lineSpacing: 18,
    });
  });
  s.addText("Jenis PT:  PT Tertutup (saham tidak dijual ke publik)  ·  PT Terbuka / Tbk (saham dijual di bursa)  ·  PT Persero (saham dimiliki negara)", {
    x: M, y: 6.45, w: CW, h: 0.5, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 14, color: TXT,
  });
}

// =====================================================================
// 20 — KOREKSI MODAL DASAR PT
// =====================================================================
{
  const s = lightSlide("Yang berubah: modal dasar PT", "Sebut ini dengan percaya diri. Buku 2014 masih tulis Rp50 juta.", "Materi 2 · koreksi buku");
  const cw = (CW - 0.6) / 2;
  card(s, M, 1.95, cw, 2.9, CARD);
  s.addText("DULU", {
    x: M + 0.4, y: 2.25, w: cw - 0.8, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1.8, color: MUT,
  });
  s.addText("Rp50 juta", {
    x: M + 0.4, y: 2.68, w: cw - 0.8, h: 0.9, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 44, bold: true, color: MUT, strike: true,
  });
  s.addText("Modal dasar minimum menurut UU PT No. 40 Tahun 2007", {
    x: M + 0.4, y: 3.7, w: cw - 0.8, h: 0.8, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13.5, color: MUT, lineSpacing: 18,
  });

  card(s, M + cw + 0.6, 1.95, cw, 2.9, INK);
  s.addText("SEKARANG", {
    x: M + cw + 1.0, y: 2.25, w: cw - 0.8, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1.8, color: AMBER,
  });
  s.addText("Tidak ada\nminimum", {
    x: M + cw + 1.0, y: 2.62, w: cw - 0.8, h: 1.0, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 30, bold: true, color: WHITE, lineSpacing: 34,
  });
  s.addText("Ditentukan kesepakatan para pendiri (UU Cipta Kerja · PP No. 8 Tahun 2021)", {
    x: M + cw + 1.0, y: 3.75, w: cw - 0.8, h: 0.8, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13.5, color: "B9C4D6", lineSpacing: 18,
  });

  card(s, M, 5.25, CW, 1.05, "FBF1E3");
  s.addText([
    { text: "Yang tetap berlaku:  ", options: { bold: true, color: AMBERD } },
    { text: "minimal 25% dari modal dasar harus ditempatkan dan disetor penuh, dibuktikan dengan bukti penyetoran yang sah.", options: { color: TXT } },
  ], {
    x: M + 0.45, y: 5.25, w: CW - 0.9, h: 1.05, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 15, lineSpacing: 21,
  });
  footNote(s, "Kalau kelas menemukan angka Rp50 juta di buku terbitan sebelum 2021 — itu sudah tidak berlaku.");
}

// =====================================================================
// 21 — PT PERORANGAN
// =====================================================================
{
  const s = lightSlide("Perseroan Perorangan", "Bagian paling relevan buat mahasiswa. Kasih penekanan.", "Materi 2 · bentuk 5 dari 5 · yang paling baru");
  statusPill(s, M, 1.62, 2.55, "BADAN HUKUM", GREEN);
  s.addText("Lahir dari UU Cipta Kerja  ·  diatur PP No. 8 Tahun 2021", {
    x: M + 2.8, y: 1.62, w: CW - 2.8, h: 0.36, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 12.5, italic: true, color: MUT,
  });
  card(s, M, 2.2, CW, 1.0, INK);
  s.addText("Satu orang saja — tapi tetap badan hukum, jadi tanggung jawabnya terbatas.", {
    x: M + 0.45, y: 2.2, w: CW - 0.9, h: 1.0, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HFONT, fontSize: 19, bold: true, color: WHITE,
  });
  const items = [
    { h: "Syarat pendiri", b: "WNI · minimal 17 tahun · cakap hukum" },
    { h: "Cara mendirikan", b: "Cukup mengisi Surat Pernyataan Pendirian secara elektronik — tidak perlu akta notaris" },
    { h: "Syarat usaha", b: "Masuk kriteria Usaha Mikro dan Kecil · wajib lapor keuangan" },
  ];
  badgeList(s, items, M, 3.42, CW * 0.58, 0.88, { bSize: 13 });
  const bx = M + CW * 0.62, bw = CW * 0.38;
  card(s, bx, 3.4, bw, 2.55);
  s.addText("Kriteria UMK (PP 7/2021)", {
    x: bx + 0.35, y: 3.6, w: bw - 0.7, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1, color: AMBERD,
  });
  const umk = [
    ["Mikro", "modal ≤ Rp1 M", "omzet ≤ Rp2 M / tahun"],
    ["Kecil", "modal Rp1–5 M", "omzet Rp2–15 M / tahun"],
  ];
  umk.forEach((r, i) => {
    const y = 4.02 + i * 0.82;
    s.addText(r[0], {
      x: bx + 0.35, y, w: 1.1, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 15, bold: true, color: INK,
    });
    s.addText(r[1] + "   atau   " + r[2], {
      x: bx + 0.35, y: y + 0.3, w: bw - 0.7, h: 0.5, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 12.5, color: MUT, lineSpacing: 16,
    });
  });
  s.addText("di luar tanah dan bangunan tempat usaha", {
    x: bx + 0.35, y: 5.5, w: bw - 0.7, h: 0.28, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 10.5, italic: true, color: MUT,
  });
  card(s, M, 6.15, CW, 0.85, "E9F2ED");
  s.addText([
    { text: "Artinya buat kalian:  ", options: { bold: true, color: GREEN } },
    { text: "kalau nanti mau buka usaha sendiri, sekarang bisa langsung punya badan hukum tanpa partner dan tanpa notaris.", options: { color: TXT } },
  ], {
    x: M + 0.45, y: 6.15, w: CW - 0.9, h: 0.85, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 15, lineSpacing: 21,
  });
}

// =====================================================================
// 22 — THINK-PAIR-SHARE
// =====================================================================
{
  const s = darkSlide("Anggota 3. Kasih 30 detik diskusi berpasangan. Tunjuk DUA kelompok, jangan cuma satu.");
  s.addShape(pres.ShapeType.ellipse, { x: -1.4, y: 5.0, w: 4.2, h: 4.2, fill: { color: INK2 }, line: { width: 0 } });
  s.addText("DISKUSI 30 DETIK DENGAN SEBELAHMU", {
    x: M, y: 1.75, w: CW, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, bold: true, charSpacing: 2.2, color: AMBER,
  });
  s.addText("Kalau PT jelas lebih aman —\nharta pribadi terlindungi —\nkenapa masih banyak orang bikin CV?", {
    x: M, y: 2.4, w: CW - 0.5, h: 2.7, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 36, bold: true, color: WHITE, lineSpacing: 50,
  });
  s.addText("Bukan mikir sendiri — ngomong ke orang di sebelahmu.", {
    x: M, y: 5.5, w: CW, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 16, italic: true, color: "B9C4D6",
  });
}

// =====================================================================
// 23 — DIVIDER: KOPERASI, BUMN, BUMD
// =====================================================================
{
  const s = darkSlide("Bryan mulai. Buka dengan: sampai sini yang punya modal terbesar paling berkuasa. Koperasi kebalikannya.");
  s.addShape(pres.ShapeType.ellipse, { x: 10.8, y: -1.2, w: 4.2, h: 4.2, fill: { color: INK2 }, line: { width: 0 } });
  s.addText("BAGIAN 3", {
    x: M, y: 2.4, w: 9.5, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, bold: true, charSpacing: 2.2, color: AMBER,
  });
  s.addText("Koperasi, BUMN, BUMD\ndan Yayasan", {
    x: M, y: 2.85, w: 10.2, h: 1.6, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 40, bold: true, color: WHITE, lineSpacing: 48,
  });
  s.addText("Semua bentuk tadi punya satu kesamaan: yang punya modal terbesar paling berkuasa.\nKoperasi dirancang persis sebaliknya.", {
    x: M, y: 4.65, w: 10.2, h: 0.9, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 16, color: "B9C4D6", lineSpacing: 24,
  });
}

// =====================================================================
// 24 — KOPERASI: DASAR
// =====================================================================
{
  const s = lightSlide("Koperasi", "Bryan. Sebut Pasal 33 UUD 1945 dan koreksi 20 → 9 orang.", "Materi 3 · Koperasi");
  statusPill(s, M, 1.62, 2.55, "BADAN HUKUM", GREEN);
  s.addText("UU No. 25 Tahun 1992, diubah oleh UU Cipta Kerja dan UU No. 4 Tahun 2023", {
    x: M + 2.8, y: 1.62, w: CW - 2.8, h: 0.36, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 12.5, italic: true, color: MUT,
  });
  card(s, M, 2.2, CW, 1.1, INK);
  s.addText("“Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan.”   —  Pasal 33 ayat (1) UUD 1945", {
    x: M + 0.45, y: 2.2, w: CW - 0.9, h: 1.1, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HFONT, fontSize: 17, italic: true, color: WHITE, lineSpacing: 24,
  });
  const cw = (CW - 0.5) / 2;
  card(s, M, 3.6, cw, 1.55, CARD);
  s.addText("DULU", {
    x: M + 0.4, y: 3.8, w: cw - 0.8, h: 0.28, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 11, bold: true, charSpacing: 1.8, color: MUT,
  });
  s.addText("20 orang", {
    x: M + 0.4, y: 4.1, w: cw - 0.8, h: 0.55, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 30, bold: true, color: MUT, strike: true,
  });
  s.addText("minimal pendiri koperasi primer (UU 25/1992)", {
    x: M + 0.4, y: 4.68, w: cw - 0.8, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, color: MUT,
  });
  card(s, M + cw + 0.5, 3.6, cw, 1.55, INK);
  s.addText("SEKARANG", {
    x: M + cw + 0.9, y: 3.8, w: cw - 0.8, h: 0.28, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 11, bold: true, charSpacing: 1.8, color: AMBER,
  });
  s.addText("9 orang", {
    x: M + cw + 0.9, y: 4.1, w: cw - 0.8, h: 0.55, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 30, bold: true, color: WHITE,
  });
  s.addText("minimal pendiri koperasi primer, diturunkan oleh UU Cipta Kerja", {
    x: M + cw + 0.9, y: 4.68, w: cw - 0.8, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, color: "B9C4D6",
  });
  s.addText("Koperasi sekunder didirikan oleh minimal 3 koperasi.", {
    x: M, y: 5.4, w: CW, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 14.5, color: TXT,
  });
  footNote(s, "RUU Perkoperasian yang baru masih dibahas DPR sampai 2026 dan belum berlaku — yang dipakai tetap UU 25/1992 beserta perubahannya.");
}

// =====================================================================
// 25 — PT VS KOPERASI (tabel)
// =====================================================================
{
  const s = lightSlide("Koperasi dibanding PT", "Ini inti blok koperasi. Tunjukkan polanya: di koperasi pemilik = pengguna.", "Materi 3 · Koperasi");
  const rows = [
    [{ text: "", options: { fill: { color: WHITE } } },
     { text: "PT", options: { bold: true, color: WHITE, fill: { color: BLUE }, align: "center" } },
     { text: "KOPERASI", options: { bold: true, color: WHITE, fill: { color: GREEN }, align: "center" } }],
    [{ text: "Siapa pemiliknya" }, { text: "Pemegang saham" }, { text: "Anggota" }],
    [{ text: "Siapa penggunanya" }, { text: "Konsumen — orang lain" }, { text: "Anggota sendiri — pemilik = pengguna", options: { bold: true } }],
    [{ text: "Cara voting" }, { text: "1 saham 1 suara — modal besar, suara besar" }, { text: "1 anggota 1 suara — berapa pun simpanannya", options: { bold: true } }],
    [{ text: "Pembagian hasil" }, { text: "Dividen, sesuai besar saham" }, { text: "SHU, sesuai jasa / transaksi anggota", options: { bold: true } }],
    [{ text: "Tujuan utama" }, { text: "Laba maksimal" }, { text: "Kesejahteraan anggota" }],
  ];
  s.addTable(rows, {
    x: M, y: 1.95, w: CW, colW: [3.0, 4.4665, 4.4665],
    border: { type: "solid", color: "DDE3EC", pt: 1 },
    fontFace: BFONT, fontSize: 14, color: TXT, valign: "middle",
    rowH: 0.64, margin: 0.12, autoPage: false,
  });
  card(s, M, 6.15, CW, 0.85, "E9F2ED");
  s.addText("Di koperasi, yang paling banyak berbelanja di koperasi itu yang paling banyak dapat SHU — bukan yang paling banyak modal.", {
    x: M + 0.45, y: 6.15, w: CW - 0.9, h: 0.85, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 15, bold: true, color: GREEN,
  });
}

// =====================================================================
// 26 — PERANGKAT & MODAL KOPERASI
// =====================================================================
{
  const s = lightSlide("Perangkat dan modal koperasi", "Tutup dengan contoh Kopma UKSW — paling dekat dengan mereka.", "Materi 3 · Koperasi");
  const org = [
    { n: "1", t: "Rapat Anggota", b: "Kekuasaan tertinggi" },
    { n: "2", t: "Pengurus", b: "Menjalankan koperasi sehari-hari" },
    { n: "3", t: "Pengawas", b: "Mengawasi kerja pengurus" },
  ];
  s.addText("PERANGKAT ORGANISASI", {
    x: M, y: 1.85, w: CW * 0.55, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1.6, color: AMBERD,
  });
  org.forEach((o, i) => {
    const y = 2.3 + i * 0.95;
    card(s, M, y, CW * 0.55, 0.8);
    badge(s, o.n, M + 0.3, y + 0.19, 0.42, INK);
    s.addText(o.t, {
      x: M + 0.9, y: y + 0.1, w: CW * 0.55 - 1.2, h: 0.32, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 16, bold: true, color: INK,
    });
    s.addText(o.b, {
      x: M + 0.9, y: y + 0.42, w: CW * 0.55 - 1.2, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 13, color: MUT,
    });
  });
  const bx = M + CW * 0.59, bw = CW * 0.41;
  s.addText("MODAL KOPERASI", {
    x: bx, y: 1.85, w: bw, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12, bold: true, charSpacing: 1.6, color: AMBERD,
  });
  card(s, bx, 2.3, bw, 2.7);
  s.addText([
    { text: "Simpanan pokok", options: { bold: true, breakLine: true } },
    { text: "dibayar sekali saat masuk, besarnya sama untuk semua anggota", options: { color: MUT, breakLine: true } },
    { text: "Simpanan wajib", options: { bold: true, breakLine: true } },
    { text: "dibayar rutin selama jadi anggota", options: { color: MUT, breakLine: true } },
    { text: "Simpanan sukarela · dana cadangan · hibah", options: { bold: true } },
  ], {
    x: bx + 0.4, y: 2.6, w: bw - 0.8, h: 2.2, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13.5, color: INK, lineSpacing: 19, paraSpaceAfter: 5,
  });
  card(s, M, 5.65, CW, 1.3, INK);
  s.addText("Contoh yang paling dekat: Kopma UKSW.", {
    x: M + 0.45, y: 5.85, w: CW - 0.9, h: 0.4, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 20, bold: true, color: WHITE,
  });
  s.addText("Anggotanya mahasiswa. Yang belanja di situ mahasiswa juga. Dan SHU-nya kembali ke mahasiswa.", {
    x: M + 0.45, y: 6.32, w: CW - 0.9, h: 0.45, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 14.5, color: "B9C4D6",
  });
  s.addText("Jenis koperasi: konsumen · produsen · jasa · simpan pinjam · pemasaran", {
    x: M, y: 5.15, w: CW, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 12.5, italic: true, color: MUT,
  });
}

// =====================================================================
// 27 — BUMN: PERSERO VS PERUM
// =====================================================================
{
  const s = lightSlide("BUMN — Persero dan Perum", "Cara ingat: nama diawali 'PT ... (Persero)' = cari untung. Diawali 'Perum' = melayani publik.", "Materi 3 · BUMN");
  s.addText("Badan usaha yang seluruh atau sebagian besar modalnya dimiliki negara.  ·  UU No. 19 Tahun 2003, diubah terakhir oleh UU No. 1 Tahun 2025", {
    x: M, y: 1.6, w: CW, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, italic: true, color: MUT,
  });
  const cw = (CW - 0.45) / 2;
  const cols = [
    { t: "PERSERO", c: BLUE, rows: [["Bentuk hukumnya", "Berbentuk PT"], ["Modalnya", "Terbagi atas saham, minimal 51% milik negara"], ["Tujuan utamanya", "Mengejar keuntungan"], ["Contoh", "PT Telkom Indonesia (Persero) Tbk, PT BRI (Persero) Tbk, PT KAI (Persero)"]] },
    { t: "PERUM", c: GREEN, rows: [["Bentuk hukumnya", "Bukan PT"], ["Modalnya", "Seluruhnya milik negara, tidak terbagi atas saham"], ["Tujuan utamanya", "Kemanfaatan umum, sekaligus mengejar keuntungan"], ["Contoh", "Perum BULOG, Perum Peruri, Perum DAMRI"]] },
  ];
  cols.forEach((col, i) => {
    const x = M + i * (cw + 0.45);
    card(s, x, 2.15, cw, 3.95);
    statusPill(s, x + 0.4, 2.42, cw - 0.8, col.t, col.c);
    col.rows.forEach((r, j) => {
      const y = 2.98 + j * 0.78;
      s.addText(r[0], {
        x: x + 0.4, y, w: cw - 0.8, h: 0.24, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 10.5, bold: true, charSpacing: 0.8, color: MUT,
      });
      s.addText(r[1], {
        x: x + 0.4, y: y + 0.24, w: cw - 0.8, h: 0.52, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 13, color: TXT, lineSpacing: 16,
      });
    });
  });
  card(s, M, 6.3, CW, 0.8, "FBF1E3");
  s.addText("Cara ingat: kalau namanya diawali \"PT\" dan ada \"(Persero)\", itu mencari untung. Kalau diawali \"Perum\", itu melayani publik.", {
    x: M + 0.45, y: 6.3, w: CW - 0.9, h: 0.8, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 14, bold: true, color: AMBERD,
  });
}

// =====================================================================
// 28 — UU 1/2025 & DANANTARA
// =====================================================================
{
  const s = lightSlide("Yang berubah di BUMN tahun 2025", "Berita baru — ini bikin materi kerasa hidup, bukan hafalan buku.", "Materi 3 · BUMN · pembaruan");
  card(s, M, 1.8, CW, 1.15, INK);
  s.addText("UU No. 1 Tahun 2025 — Perubahan Ketiga atas UU No. 19 Tahun 2003 tentang BUMN", {
    x: M + 0.45, y: 1.8, w: CW - 0.9, h: 1.15, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HFONT, fontSize: 21, bold: true, color: WHITE,
  });
  const items = [
    { h: "Membentuk BPI Danantara", b: "Badan Pengelola Investasi Daya Anagata Nusantara — badan hukum Indonesia yang sepenuhnya dimiliki Pemerintah." },
    { h: "Tugasnya", b: "Meningkatkan dan mengoptimalkan investasi serta operasional BUMN dan sumber dana lain." },
    { h: "Kewenangannya", b: "Presiden mendelegasikan sebagian kewenangan pengelolaan BUMN kepada Danantara (Pasal 3E)." },
    { h: "Juga diatur", b: "Holding investasi, holding operasional, restrukturisasi, dan pendirian anak perusahaan BUMN." },
  ];
  badgeList(s, items, M, 3.2, CW, 0.92, { hSize: 16, bSize: 13 });
  footNote(s, "Ditandatangani 24 Februari 2025. Kalau buku pengantar bisnis terbitan lama menjelaskan struktur pengelolaan BUMN, bagian itu sudah berubah.");
}

// =====================================================================
// 29 — BUMD
// =====================================================================
{
  const s = lightSlide("BUMD — Perumda dan Perseroda", "Polanya persis sama dengan BUMN. Tunjukkan kesejajarannya.", "Materi 3 · BUMD");
  s.addText("Polanya persis sama dengan BUMN, hanya pemiliknya pemerintah daerah.  ·  UU No. 23 Tahun 2014 dan PP No. 54 Tahun 2017", {
    x: M, y: 1.6, w: CW, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, italic: true, color: MUT,
  });
  const cw = (CW - 0.45) / 2;
  const cols = [
    { t: "PERUMDA", sub: "Perusahaan Umum Daerah", c: GREEN, par: "sejajar dengan Perum",
      rows: [["Modalnya", "Seluruhnya milik satu daerah, tidak terbagi atas saham"], ["Bentuknya", "Bukan PT"], ["Contoh", "Perumda Air Minum — yang dulu kita kenal sebagai PDAM"]] },
    { t: "PERSERODA", sub: "Perusahaan Perseroan Daerah", c: BLUE, par: "sejajar dengan Persero",
      rows: [["Modalnya", "Terbagi atas saham, minimal 51% milik daerah"], ["Bentuknya", "Berbentuk PT"], ["Contoh", "Bank Jateng, Bank DKI"]] },
  ];
  cols.forEach((col, i) => {
    const x = M + i * (cw + 0.45);
    card(s, x, 2.15, cw, 4.0);
    statusPill(s, x + 0.4, 2.42, cw - 0.8, col.t, col.c);
    s.addText(col.sub, {
      x: x + 0.4, y: 2.92, w: cw - 0.8, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 13, bold: true, color: INK,
    });
    s.addText(col.par, {
      x: x + 0.4, y: 3.2, w: cw - 0.8, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BFONT, fontSize: 12, italic: true, color: AMBERD,
    });
    col.rows.forEach((r, j) => {
      const y = 3.68 + j * 0.8;
      s.addText(r[0], {
        x: x + 0.4, y, w: cw - 0.8, h: 0.24, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 10.5, bold: true, charSpacing: 0.8, color: MUT,
      });
      s.addText(r[1], {
        x: x + 0.4, y: y + 0.24, w: cw - 0.8, h: 0.55, isTextBox: true, margin: 0,
        fontFace: BFONT, fontSize: 13.5, color: TXT, lineSpacing: 17,
      });
    });
  });
}

// =====================================================================
// 30 — YAYASAN
// =====================================================================
{
  const s = lightSlide("Yayasan", "Singkat saja. Contoh: yayasan yang menaungi kampus ini.", "Materi 3 · pelengkap");
  statusPill(s, M, 1.62, 2.55, "BADAN HUKUM", GREEN);
  s.addText("UU No. 16 Tahun 2001 jo. UU No. 28 Tahun 2004", {
    x: M + 2.8, y: 1.62, w: CW - 2.8, h: 0.36, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 12.5, italic: true, color: MUT,
  });
  card(s, M, 2.2, CW, 1.15, INK);
  s.addText("Kekayaan yang dipisahkan untuk tujuan sosial, keagamaan, dan kemanusiaan — bukan untuk mencari laba yang dibagi.", {
    x: M + 0.45, y: 2.2, w: CW - 0.9, h: 1.15, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HFONT, fontSize: 19, bold: true, color: WHITE, lineSpacing: 26,
  });
  const items = [
    { h: "Tidak punya anggota dan tidak punya pemegang saham", b: "Organnya: Pembina, Pengurus, dan Pengawas." },
    { h: "Boleh punya badan usaha", b: "Tapi hasilnya harus kembali untuk tujuan yayasan — tidak boleh dibagi ke pengurus." },
    { h: "Contoh paling dekat", b: "Yayasan yang menaungi sekolah, universitas, dan rumah sakit." },
  ];
  badgeList(s, items, M, 3.6, CW, 1.0, { hSize: 16.5 });
}

// =====================================================================
// 31 — TABEL PERBANDINGAN BESAR
// =====================================================================
{
  const s = lightSlide("Rangkuman: enam bentuk berdampingan", "Slide ini dibiarkan nyala selama Aktivitas 3 — kelompok butuh referensinya.", "Rangkuman");
  const hdr = ["", "Perseorangan", "Firma", "CV", "PT", "PT Perorangan", "Koperasi"];
  const body = [
    ["Badan hukum?", "Bukan", "Bukan", "Bukan", "Ya", "Ya", "Ya"],
    ["Jumlah pendiri", "1", "≥ 2", "≥ 2", "≥ 2", "1", "≥ 9 (primer)"],
    ["Tanggung jawab", "Tidak terbatas", "Tidak terbatas, tanggung renteng", "Aktif: tidak terbatas · Pasif: sebatas modal", "Terbatas", "Terbatas", "Terbatas"],
    ["Modal minimum", "Tidak ada", "Tidak ada", "Tidak ada", "Sesuai kesepakatan pendiri", "Sesuai kesepakatan pendiri", "Simpanan pokok"],
    ["Akta notaris", "Tidak wajib", "Wajib", "Wajib", "Wajib", "Tidak wajib", "Wajib"],
    ["Dasar hukum", "Izin usaha (NIB/OSS)", "KUHD Ps. 16–35", "KUHD Ps. 19–21", "UU 40/2007 jo. UU 6/2023", "PP 8/2021", "UU 25/1992 dst."],
  ];
  const rows = [];
  rows.push(hdr.map((h, i) => ({
    text: h,
    options: { bold: true, color: WHITE, fill: { color: i === 0 ? INK : (i <= 3 ? RED : GREEN) }, align: i === 0 ? "left" : "center", fontSize: 11.5 },
  })));
  body.forEach((r, ri) => {
    rows.push(r.map((c, i) => ({
      text: c,
      options: {
        bold: i === 0, color: i === 0 ? INK : TXT,
        fill: { color: ri % 2 === 0 ? WHITE : "F7F9FC" },
        align: i === 0 ? "left" : "center", fontSize: i === 0 ? 11.5 : 10.5,
      },
    })));
  });
  s.addTable(rows, {
    x: M, y: 1.75, w: CW, colW: [1.85, 1.68, 1.68, 2.02, 1.55, 1.62, 1.53],
    border: { type: "solid", color: "DDE3EC", pt: 1 },
    fontFace: BFONT, color: TXT, valign: "middle", rowH: 0.59, margin: 0.09, autoPage: false,
  });
  card(s, M, 6.15, CW, 0.85, "FBF1E3");
  s.addText("Pertanyaan penentu di setiap kolom selalu sama: siapa yang menanggung kalau rugi, dan siapa yang menikmati kalau untung.", {
    x: M + 0.45, y: 6.15, w: CW - 0.9, h: 0.85, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BFONT, fontSize: 14.5, bold: true, color: AMBERD,
  });
}

// =====================================================================
// 32 — PENUTUP 3 POIN
// =====================================================================
{
  const s = darkSlide("Bryan. Tiga poin saja. Jangan tambah poin keempat.");
  s.addShape(pres.ShapeType.ellipse, { x: 11.4, y: 5.4, w: 3.4, h: 3.4, fill: { color: INK2 }, line: { width: 0 } });
  s.addText("KALAU CUMA BAWA PULANG TIGA HAL", {
    x: M, y: 0.85, w: CW, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, bold: true, charSpacing: 2.2, color: AMBER,
  });
  const items = [
    { n: "1", t: "Badan usaha itu “siapa”-nya.\nPerusahaan itu “di mana dan pakai apa”-nya." },
    { n: "2", t: "Yang paling menentukan itu badan hukum atau bukan —\nkarena itu yang menentukan harta pribadimu ikut kena atau tidak." },
    { n: "3", t: "Tidak ada bentuk yang paling bagus.\nYang ada bentuk yang paling cocok dengan risiko dan ukuran usahamu." },
  ];
  items.forEach((it, i) => {
    const y = 1.75 + i * 1.6;
    badge(s, it.n, M, y + 0.12, 0.6, AMBER);
    s.addText(it.t, {
      x: M + 0.95, y, w: CW - 1.3, h: 1.35, isTextBox: true, margin: 0,
      fontFace: HFONT, fontSize: 21, bold: true, color: WHITE, lineSpacing: 30,
    });
  });
}

// =====================================================================
// 33 — EXIT TICKET
// =====================================================================
{
  const s = darkSlide("Kasih 60 detik. Kalau pakai Mentimeter, baca 2-3 jawaban keras-keras. Jangan langsung duduk setelah ini.");
  s.addShape(pres.ShapeType.ellipse, { x: -1.6, y: -1.6, w: 4.6, h: 4.6, fill: { color: INK2 }, line: { width: 0 } });
  s.addText("SATU KALIMAT SEBELUM BUBAR", {
    x: M, y: 1.5, w: CW, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 13, bold: true, charSpacing: 2.2, color: AMBER,
  });
  s.addText("“Kalau saya buka usaha sendiri\ntahun depan, saya akan pilih\n________ karena ________.”", {
    x: M, y: 2.15, w: CW - 0.6, h: 2.8, isTextBox: true, margin: 0,
    fontFace: HFONT, fontSize: 34, bold: true, color: WHITE, lineSpacing: 52,
  });
  s.addText("Terima kasih.  Kami bertiga masih di sini kalau ada yang mau ditanyakan.", {
    x: M, y: 5.5, w: CW, h: 0.45, isTextBox: true, margin: 0,
    fontFace: BFONT, fontSize: 17, color: "B9C4D6",
  });
}

const OUT = process.argv[2] || "badan-usaha.pptx";
pres.writeFile({ fileName: OUT }).then(() => console.log("written:", OUT));
