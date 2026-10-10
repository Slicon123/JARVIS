/* Dompet Bryan — UI. Data lives in the artifact db: meta/* and months/YYYY-MM. */
(function () {
  'use strict';
  var C = window.Core;

  // ================= icons =================
  var ICONS = {
    house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    pie: '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    landmark: '<path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    piggy: '<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>',
    banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    chevl: '<path d="m15 18-6-6 6-6"/>',
    chevr: '<path d="m9 18 6-6-6-6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
    arrowup: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    arrowdown: '<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
    swap: '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    sheet: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
    bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
    book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    dumbbell: '<path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/>',
    film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    laptop: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
    dots: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    sliders: '<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    wifioff: '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>'
  };
  ICONS.home = ICONS.house;
  function icon(name, cls) { return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.dots) + '</svg>'; }
  var CK = '<svg class="ic sm ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  ICONS.chevd = '<path d="m6 9 6 6 6-6"/>';
  ICONS.chevu = '<path d="m18 15-6-6-6 6"/>';
  ICONS.backspace = '<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/>';

  // ================= language =================
  // L('Indonesian', 'English'): every visible string goes through this.
  function L(id, en) { return S.lang === 'en' ? en : id; }

  // ================= constants =================
  var WK = {
    cash: [['Cash', 'Cash'], 'banknote'], bank: [['Bank', 'Bank'], 'landmark'], ewallet: [['E-wallet', 'E-wallet'], 'smartphone'],
    tabungan: [['Tabungan', 'Savings'], 'piggy'], lainnya: [['Lainnya', 'Other'], 'wallet']
  };
  var WC = [['oranye', 'Oranye', 'Orange'], ['merah', 'Merah', 'Red'], ['biru', 'Biru', 'Blue'], ['teal', 'Hijau tosca', 'Teal'], ['ungu', 'Ungu', 'Purple'], ['grafit', 'Grafit', 'Graphite'], ['pink', 'Pink', 'Pink'], ['hijau', 'Hijau', 'Green']];
  var SLOTS = [['Abu-abu', 'Grey'], ['Biru', 'Blue'], ['Oranye', 'Orange'], ['Tosca', 'Teal'], ['Kuning', 'Yellow'], ['Pink', 'Pink'], ['Hijau', 'Green'], ['Ungu', 'Purple'], ['Merah', 'Red']];
  var CAT_ICONS = ['utensils', 'coffee', 'bus', 'car', 'home', 'zap', 'wifi', 'book', 'bag', 'shirt', 'heart', 'dumbbell', 'film', 'receipt', 'gift', 'plane', 'coins', 'briefcase', 'laptop', 'piggy', 'smartphone', 'wallet', 'tag', 'dots'];
  var SUGGEST = [['Cash', 'Cash', 'cash'], ['BCA', 'BCA', 'bank'], ['BRI', 'BRI', 'bank'], ['Mandiri', 'Mandiri', 'bank'], ['BNI', 'BNI', 'bank'], ['GoPay', 'GoPay', 'ewallet'], ['OVO', 'OVO', 'ewallet'], ['DANA', 'DANA', 'ewallet'], ['ShopeePay', 'ShopeePay', 'ewallet'], ['Tabungan', 'Savings', 'tabungan']];
  // Built-in categories show in English while their name is still the Indonesian default.
  var DEF_CATS = {
    makan: ['Makan & Minum', 'Food & Drinks'], transport: ['Transportasi', 'Transport'], kost: ['Kost & Tagihan', 'Rent & Bills'],
    pulsa: ['Pulsa & Internet', 'Phone & Internet'], kuliah: ['Kuliah', 'College'], belanja: ['Belanja', 'Shopping'],
    kesehatan: ['Kesehatan & Perawatan', 'Health & Care'], gym: ['Gym & Olahraga', 'Gym & Sports'], hiburan: ['Hiburan', 'Entertainment'],
    admin: ['Biaya Admin', 'Admin Fees'], 'lainnya-out': ['Lainnya', 'Other'], saku: ['Uang Saku / Kiriman', 'Allowance'],
    gaji: ['Gaji', 'Salary'], freelance: ['Freelance & Proyek', 'Freelance & Projects'], hadiah: ['Hadiah & Bonus', 'Gifts & Bonus'], 'lainnya-in': ['Lainnya', 'Other']
  };
  var XLSX_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ================= small utils =================
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem('dompet:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('dompet:' + k, JSON.stringify(v)); } catch (e) { /* storage blocked: fine */ } }
  };
  function today() { return C.todayKey(); }
  function thisYM() { return C.ymOf(today()); }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function cvar(slot) { return 'var(--s' + (slot || 0) + ')'; }
  function pctTxt(v, total) { if (!total) return '0%'; var p = v / total * 100; return C.decimal(p >= 10 || p === 0 ? Math.round(p) : Math.round(p * 10) / 10) + '%'; }
  function errEl(id) { return '<p class="err" id="' + id + '-err" role="alert">' + icon('alert', 'sm') + '<span></span></p>'; }
  function selectHtml(id, label, options, attrs) {
    return '<div class="select"><label class="sr" for="' + id + '">' + esc(label) + '</label><select id="' + id + '" class="input"' + (attrs || '') + '>' + options + '</select>' + icon('chevd') + '</div>';
  }
  function opt(v, label, cur) { return '<option value="' + esc(v) + '"' + (cur === v ? ' selected' : '') + '>' + esc(label) + '</option>'; }

  // ================= state =================
  function emptyMeta() { return { wallets: {}, categories: {}, budgets: {}, recurring: {}, goals: {}, debts: {}, settings: {} }; }
  var S = {
    status: 'loading', db: null, canWrite: true,
    meta: emptyMeta(), months: {}, gotMeta: false, gotMonths: false,
    // live: both collections are server-fresh now; synced: they have been at least once this visit
    live: false, synced: false, liveMeta: false, liveMonths: false, slow: false, noLink: false, netOff: navigator.onLine === false, cacheAt: null,
    txs: [], flows: [], bal: {}, txIndex: {},
    tab: LS.get('tab', 'home'), more: null, debtTab: 'lent',
    hide: LS.get('hide', false), lang: LS.get('lang', 'id') === 'en' ? 'en' : 'id', langSetAt: 0, theme: LS.get('theme', 'auto'),
    hist: { mode: 'month', ym: thisYM(), day: null, q: '', wallet: '', cat: '', limit: 150 },
    rep: { mode: 'month', ym: thisYM(), year: today().slice(0, 4), kind: 'out', wallet: '', tsel: null },
    restore: null, restoring: null,
    animate: true, flashId: null, shownTotal: null, fx: null
  };
  if (['home', 'hist', 'rep', 'more'].indexOf(S.tab) < 0) S.tab = 'home';
  C.setLang(S.lang);

  function derive() {
    S.txs = C.flatten(S.months);
    S.flows = C.flows(S.txs);
    S.bal = C.balances(S.meta.wallets, S.txs);
    S.txIndex = {};
    for (var i = 0; i < S.txs.length; i++) S.txIndex[S.txs[i].id] = S.txs[i];
  }
  function byOrder(a, b) { return (a.order || 0) - (b.order || 0) || (a.createdAt || 0) - (b.createdAt || 0) || String(a.name).localeCompare(String(b.name)); }
  function listOf(obj, keep) { return Object.keys(obj || {}).map(function (id) { var o = { id: id }; for (var k in obj[id]) o[k] = obj[id][k]; return o; }).filter(keep).sort(byOrder); }
  function walletsList(all) { return listOf(S.meta.wallets, function (w) { return w.name && (all || !w.archived); }); }
  function catsList(type, all) { return listOf(S.meta.categories, function (c) { return c.name && c.type === type && (all || !c.archived); }); }
  function cat(id) {
    var c = S.meta.categories[id];
    if (c) return c;
    if (id === 'admin') return { name: 'Biaya Admin', icon: 'receipt', color: 4, type: 'out' };
    return { name: L('Tanpa kategori', 'No category'), icon: 'tag', color: 0 };
  }
  function catName(id, c) {
    c = c || cat(id);
    var d = DEF_CATS[id];
    if (d && S.lang === 'en' && c.name === d[0]) return d[1];
    return c.name;
  }
  function wname(id) { var w = S.meta.wallets[id]; return w ? w.name : L('Wallet terhapus', 'Deleted wallet'); }
  function kindIcon(k) { return (WK[k] || WK.lainnya)[1]; }
  function kindLabel(k) { var n = (WK[k] || WK.lainnya)[0]; return L(n[0], n[1]); }
  function money(n) { return S.hide ? 'Rp ••••••' : C.rp(n); }
  // amounts in views honour "hide balance" everywhere; forms and toasts show real numbers
  var M = money;
  function MS(n) { return S.hide ? (n < 0 ? '−' : n > 0 ? '+' : '') + 'Rp ••••' : C.rpSigned(n); }
  function MC(n) { return S.hide ? '••' : C.compact(n); }
  function eyeBtn(onHero) {
    return '<button class="icon-btn' + (onHero ? ' on-hero' : '') + '" data-act="hide" aria-pressed="' + S.hide + '" aria-label="' + (S.hide ? L('Tampilkan angka', 'Show amounts') : L('Sembunyikan angka', 'Hide amounts')) + '">' + icon(S.hide ? 'eyeoff' : 'eye') + '</button>';
  }
  // theme: 'auto' leaves the viewer's own setting alone
  var hostTheme = document.documentElement.getAttribute('data-theme');
  function applyTheme() {
    var root = document.documentElement, want = S.theme === 'light' || S.theme === 'dark' ? S.theme : hostTheme;
    if (want) { if (root.getAttribute('data-theme') !== want) root.setAttribute('data-theme', want); }
    else if (root.hasAttribute('data-theme')) root.removeAttribute('data-theme');
  }
  function liveList(obj) { return listOf(obj, function (x) { return !x.deleted; }); }
  function setLang(l) {
    S.lang = l === 'en' ? 'en' : 'id';
    C.setLang(S.lang);
    LS.set('lang', S.lang);
    S.langSetAt = Date.now();
    S.animate = true;
    render();
    if (S.status === 'ready') saveSettings({ lang: S.lang });
  }

  // ================= db writes =================
  // Every write waits in an outbox kept in this browser until the db confirms it, so a change made
  // while the signal is gone is sent once it's back instead of being lost. Pending writes to one doc
  // merge into one op. Sending an op twice is harmless: every patch is keyed by id.
  var known = {}, OB_KEY = 'dompet:outbox', CACHE_KEY = 'dompet:cache';
  var raw = { meta: {}, months: {} }; // the db's docs as last seen, before pending writes
  var obMem = {}, obLS = true, sending = {}, waits = {}, wn = 0, obDelay = 0, obTimer = null, obStuck = false, obBlocked = false;
  function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  // same as the db's update(): nested objects merge, anything else replaces
  function deepMerge(a, b) {
    var r = {}, k;
    for (k in a) r[k] = a[k];
    for (k in b) r[k] = isObj(b[k]) && isObj(r[k]) ? deepMerge(r[k], b[k]) : b[k];
    return r;
  }
  function applyOp(doc, op) { return op.k === 'del' ? undefined : op.k === 'set' || !doc ? op.d : deepMerge(doc, op.d); }
  function combine(a, b) {
    if (!a || b.k !== 'merge') return b;
    return a.k === 'del' ? { k: 'set', d: b.d } : { k: a.k, d: deepMerge(a.d, b.d) };
  }
  function obRead() {
    if (obLS) { try { var v = localStorage.getItem(OB_KEY); return v ? JSON.parse(v) : {}; } catch (e) { obLS = false; } }
    return obMem;
  }
  function obWrite(o) {
    obMem = o;
    if (!obLS) return;
    var s = JSON.stringify(o);
    try { if (s === '{}') localStorage.removeItem(OB_KEY); else localStorage.setItem(OB_KEY, s); return; } catch (e) { /* full: the outbox matters more than the copy */ }
    try { localStorage.removeItem(CACHE_KEY); localStorage.setItem(OB_KEY, s); } catch (e) { obLS = false; }
  }
  function obCount() {
    var o = obRead(), n = 0;
    for (var p in o) n += p.indexOf('months/') === 0 && o[p].k === 'merge' && isObj(o[p].d.tx) ? Object.keys(o[p].d.tx).length || 1 : 1;
    return n;
  }
  function queueWrite(path, op) {
    var o = obRead();
    op = combine(o[path], op); op.r = C.uid();
    o[path] = op; obWrite(o);
    var n = ++wn;
    var p = new Promise(function (res, rej) { (waits[path] = waits[path] || []).push({ n: n, res: res, rej: rej }); });
    flush(); syncChanged();
    return p;
  }
  function settle(path, upTo, err) {
    var keep = [];
    (waits[path] || []).forEach(function (w) { if (w.n > upTo) keep.push(w); else if (err) w.rej(err); else w.res(); });
    if (keep.length) waits[path] = keep; else delete waits[path];
  }
  function retry(fn) {
    return fn().catch(function (e) {
      if (e && e.code === 'unavailable') return sleep(400 + Math.random() * 700).then(fn);
      throw e;
    });
  }
  function writeOp(path, op) {
    var ref = S.db.doc(path);
    if (op.k === 'del') return retry(function () { return ref.delete(); }).then(function () { delete known[path]; });
    if (op.k === 'set') return retry(function () { return ref.set(op.d); }).then(function () { known[path] = true; });
    var viaGet = function () {
      return retry(function () { return ref.get(); }).then(function (snap) {
        return retry(function () { return snap.exists ? ref.update(op.d) : ref.set(op.d); });
      }).then(function () { known[path] = true; });
    };
    if (!known[path]) return viaGet();
    return retry(function () { return ref.update(op.d); }).catch(function (e) {
      if (e && e.code === 'invalid_argument') return viaGet();
      throw e;
    });
  }
  // sends wait until the db has answered once this visit, so `known` reflects real docs
  // and a pending merge never replaces a doc this browser hasn't seen
  function flush() {
    if (!S.db || !S.synced || obBlocked) return;
    var o = obRead();
    Object.keys(o).forEach(function (p) { if (!sending[p]) sendOne(p, o[p]); });
  }
  function sendLater() {
    if (obTimer) return;
    obDelay = Math.min(30000, obDelay ? obDelay * 2 : 2000);
    obTimer = setTimeout(function () { obTimer = null; flush(); }, obDelay);
  }
  function dropSent(path, op) {
    var o = obRead();
    if (o[path] && o[path].r === op.r) { delete o[path]; obWrite(o); }
    return o;
  }
  function sendOne(path, op) {
    var me = {}, upTo = wn;
    sending[path] = me;
    // a send that hangs on a bad line is retried; its late answer is ignored
    var timer = setTimeout(function () { if (sending[path] === me) { delete sending[path]; obStuck = true; sendLater(); syncChanged(); } }, 30000);
    function mine() { clearTimeout(timer); if (sending[path] !== me) return false; delete sending[path]; return true; }
    writeOp(path, op).then(function () {
      if (!mine()) return;
      var i = path.indexOf('/'), col = raw[path.slice(0, i)], id = path.slice(i + 1);
      if (col) { var v = applyOp(col[id], op); if (v === undefined) delete col[id]; else col[id] = v; }
      var o = dropSent(path, op);
      settle(path, upTo, null);
      obDelay = 0;
      saveCacheSoon();
      if (o[path]) sendOne(path, o[path]);
      else if (obStuck && !Object.keys(o).length) { obStuck = false; toast(L('Semua perubahan sudah terkirim.', 'All changes sent.'), null, 'ok'); }
      syncChanged();
    }, function (e) {
      if (!mine()) return;
      var code = e && e.code;
      if (code === 'invalid_argument' || code === 'quota_exceeded' || code === 'transform_error') {
        // can never succeed: drop it so it can't hold up the rest, and show the db's data again
        var o = dropSent(path, op);
        settle(path, upTo, e);
        if (!Object.keys(o).length) obStuck = false;
        rebuild(); render();
        if (o[path]) sendOne(path, o[path]);
      } else if (code === 'revoked' || code === 'not_granted' || code === 'capability_disabled' || code === 'capability_removed') {
        // kept for the next visit
        if (!obBlocked) toast(L('Akses ke data terputus. Tutup lalu buka lagi halaman ini.', 'Lost access to your data. Close this page and open it again.'), null, 'error');
        obBlocked = true; obStuck = true; S.live = false; syncChanged();
      } else { obStuck = true; sendLater(); syncChanged(); }
    });
  }
  function mergeDoc(path, patch) { return queueWrite(path, { k: 'merge', d: patch }); }
  function setDoc(path, data) { return queueWrite(path, { k: 'set', d: data }); }
  function delDoc(path) { return queueWrite(path, { k: 'del' }); }

  // ================= local copy =================
  // The db's docs as last seen, so the page opens at once on a slow line. Pending writes are not
  // in it; they are laid over it from the outbox.
  var cacheTimer = null;
  function saveCacheSoon() { if (!cacheTimer) cacheTimer = setTimeout(saveCacheNow, 1000); }
  function saveCacheNow() {
    clearTimeout(cacheTimer); cacheTimer = null;
    if (!S.synced) return;
    var at = S.live && !S.netOff ? Date.now() : S.cacheAt || Date.now();
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ v: 1, at: at, meta: raw.meta, months: raw.months })); S.cacheAt = at; }
    catch (e) { try { localStorage.removeItem(CACHE_KEY); } catch (e2) { /* storage blocked */ } }
  }
  function loadCache() {
    var c = null;
    try { c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) { c = null; }
    if (!c || c.v !== 1 || !isObj(c.meta) || !isObj(c.months)) return false;
    raw.meta = c.meta; raw.months = c.months; S.cacheAt = c.at || null;
    return true;
  }
  function overlay(col, docs) {
    var o = obRead(), out = {}, id;
    for (id in docs) out[id] = docs[id];
    Object.keys(o).forEach(function (p) {
      var i = p.indexOf('/');
      if (p.slice(0, i) !== col) return;
      id = p.slice(i + 1);
      var v = applyOp(out[id], o[p]);
      if (v === undefined) delete out[id]; else out[id] = v;
    });
    return out;
  }
  function docsToMeta(docs) {
    var m = emptyMeta();
    for (var id in docs) {
      var v = docs[id] || {};
      if (id === 'settings') m.settings = v;
      else if (m[id] !== undefined) m[id] = v.list || {};
    }
    return m;
  }
  function rebuild() {
    S.meta = docsToMeta(overlay('meta', raw.meta));
    S.months = overlay('months', raw.months);
    derive();
  }

  function writeFailed(e) {
    var code = e && e.code;
    var msg = code === 'quota_exceeded' ? L('Penyimpanan penuh. Download backup dulu, lalu bilang ke JARVIS.', 'Storage is full. Download a backup first, then tell JARVIS.')
      : (code === 'revoked' || code === 'not_granted' || code === 'capability_disabled' || code === 'capability_removed') ? L('Akses ke data terputus. Tutup lalu buka lagi halaman ini.', 'Lost access to your data. Close this page and open it again.')
      : L('Perubahan ini gagal disimpan. Bilang ke JARVIS ya.', 'This change couldn’t be saved. Tell JARVIS.');
    toast(msg, null, 'error');
  }
  var sizeWarned = {};
  function checkSize(ym) {
    var n = JSON.stringify(S.months[ym] || {}).length;
    if (n > 200 * 1024 && !sizeWarned[ym]) { sizeWarned[ym] = true; toast(L('Catatan bulan ini sudah lebih dari 200 KB, mendekati batas. Bilang ke JARVIS ya.', 'This month’s records are over 200 KB, close to the limit. Tell JARVIS.')); }
  }
  function putTxLocal(id, ym, tx) {
    var m = {}, old = S.months[ym] || {};
    for (var k in old) m[k] = old[k];
    var t = {}, ot = old.tx || {};
    for (var j in ot) t[j] = ot[j];
    t[id] = tx; m.tx = t; S.months[ym] = m;
  }
  function saveTx(id, tx) {
    var ym = C.ymOf(tx.date);
    putTxLocal(id, ym, tx); derive(); render();
    var patch = { tx: {} }; patch.tx[id] = tx;
    return mergeDoc('months/' + ym, patch).then(function () { checkSize(ym); }).catch(writeFailed);
  }
  function patchTx(id, ym, p) {
    var cur = S.months[ym] && S.months[ym].tx && S.months[ym].tx[id];
    if (cur) { var n = {}; for (var k in cur) n[k] = cur[k]; for (var q in p) n[q] = p[q]; putTxLocal(id, ym, n); }
    derive(); render();
    var patch = { tx: {} }; patch.tx[id] = p;
    return mergeDoc('months/' + ym, patch).catch(writeFailed);
  }
  function saveMeta(doc, key, val, replace) {
    var cur = S.meta[doc][key], next;
    if (replace || !cur || val === null) next = val;
    else { next = {}; for (var k in cur) next[k] = cur[k]; for (var q in val) next[q] = val[q]; }
    var m = {}; for (var x in S.meta[doc]) m[x] = S.meta[doc][x];
    m[key] = next; S.meta[doc] = m;
    derive(); render();
    var patch = { list: {} }; patch.list[key] = val;
    return mergeDoc('meta/' + doc, patch).catch(writeFailed);
  }
  function saveSettings(p) {
    var m = {}; for (var k in S.meta.settings) m[k] = S.meta.settings[k]; for (var q in p) m[q] = p[q];
    S.meta.settings = m; render();
    return mergeDoc('meta/settings', p).catch(writeFailed);
  }

  // ================= boot =================
  function init() {
    // open from the local copy at once; the db's answer replaces it when it comes
    if (loadCache()) { rebuild(); savedLang(); S.status = 'ready'; }
    obStuck = obCount() > 0; // left from an earlier visit
    render();
    setTimeout(function () {
      S.slow = true;
      if (S.status === 'loading') { S.status = 'slow'; render(); } else syncChanged();
    }, 15000);
    window.addEventListener('online', function () { S.netOff = false; obDelay = 0; flush(); syncChanged(); });
    window.addEventListener('offline', function () { S.netOff = true; syncChanged(); });
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') saveCacheNow(); else flush(); });
    window.addEventListener('pagehide', saveCacheNow);
    var use = window.claude && window.claude.use ? window.claude.use.bind(window.claude) : null;
    if (!use) { noLink(); return; }
    use('db').then(function (db) {
      if (!db) { noLink(); return; }
      S.db = db;
      use('user').then(function (u) {
        if (u && u.can) return u.can('data.write').then(function (c) { if (c === false) { S.canWrite = false; render(); } });
      }).catch(function () {});
      db.collection('meta').onSnapshot(function (snap) {
        var r = {};
        snap.docs.forEach(function (d) { if (!d.exists) return; known['meta/' + d.id] = true; r[d.id] = d.data() || {}; });
        raw.meta = r; S.gotMeta = true; S.liveMeta = fresh(snap); onData();
      }, dbErr);
      db.collection('months').limit(1000).onSnapshot(function (snap) {
        var r = {};
        snap.docs.forEach(function (d) { if (!d.exists) return; known['months/' + d.id] = true; r[d.id] = d.data() || {}; });
        raw.months = r; S.gotMonths = true; S.liveMonths = fresh(snap); onData();
      }, dbErr);
    }).catch(noLink);
  }
  function fresh(snap) { return !(snap.metadata && snap.metadata.fromCache); }
  // language follows the saved choice, so phone and laptop agree
  function savedLang() {
    var dl = S.meta.settings.lang;
    if ((dl === 'en' || dl === 'id') && dl !== S.lang && Date.now() - S.langSetAt > 5000) { S.lang = dl; C.setLang(dl); LS.set('lang', dl); }
  }
  function onData() {
    S.live = S.liveMeta && S.liveMonths && !obBlocked;
    if (S.gotMeta && S.gotMonths) {
      if (S.status !== 'ready') { S.status = 'ready'; S.animate = true; }
      if (S.live) { S.synced = true; S.noLink = false; saveCacheSoon(); }
    }
    rebuild(); savedLang(); render();
    flush();
  }
  function noLink() {
    S.noLink = true;
    if (S.status !== 'ready') S.status = 'nodb';
    render();
  }
  function dbErr(e) {
    S.live = S.liveMeta = S.liveMonths = false; S.noLink = true;
    if (S.status !== 'ready') S.status = 'nodb';
    toast(e && e.code === 'revoked' ? L('Akses ke data terputus. Tutup lalu buka lagi halaman ini.', 'Lost access to your data. Close this page and open it again.') : L('Koneksi ke data terputus. Tutup lalu buka lagi halaman ini.', 'Lost the connection to your data. Close this page and open it again.'), null, 'error');
    render();
  }

  // ================= render shell =================
  var view = document.getElementById('view');
  var lastTab = null;
  function focusKey(el) {
    if (el.id) return '#' + CSS.escape(el.id);
    var d = el.dataset || {};
    if (!d.act) return null;
    var k = '[data-act="' + d.act + '"]';
    if (d.id) k += '[data-id="' + CSS.escape(d.id) + '"]';
    if (d.v) k += '[data-v="' + CSS.escape(d.v) + '"]';
    return k;
  }
  function render() {
    document.documentElement.lang = S.lang;
    applyTheme();
    renderTabs();
    var a = document.activeElement, fk = null, sel = null, kept = [];
    if (a && view.contains(a)) {
      fk = focusKey(a);
      try { if (typeof a.selectionStart === 'number') sel = [a.selectionStart, a.selectionEnd]; } catch (e) { /* not a text input */ }
    }
    view.querySelectorAll('form[data-keep] [id]').forEach(function (el) {
      if (el.type === 'radio' || el.type === 'checkbox') kept.push([el.id, 'checked', el.checked]);
      else if ('value' in el) kept.push([el.id, 'value', el.value]);
    });
    var html;
    if (S.tab === 'home') html = viewHome();
    else if (S.tab === 'hist') html = viewHist();
    else if (S.tab === 'rep') html = viewRep();
    else html = viewMore();
    var entering = lastTab !== S.tab + '/' + S.more || S.animate;
    view.className = (S.tab === 'home' ? 'wide' : '') + (entering && !reduceMotion ? ' enter' : '') + (S.fx ? ' fx-' + S.fx : '');
    S.fx = null;
    lastTab = S.tab + '/' + S.more;
    view.innerHTML = syncHtml() + html;
    kept.forEach(function (k) { var el = document.getElementById(k[0]); if (el) el[k[1]] = k[2]; });
    if (fk) {
      var el = view.querySelector(fk);
      if (el) { el.focus({ preventScroll: true }); if (sel && el.setSelectionRange) { try { el.setSelectionRange(sel[0], sel[1]); } catch (e) { /* ignore */ } } }
    }
    afterRender();
    S.animate = false;
    S.flashId = null;
  }
  function afterRender() {
    // hero total rolls from the previous figure to the new one
    var h = document.getElementById('hero-total');
    if (h) {
      var target = +h.dataset.v;
      var from = S.shownTotal;
      S.shownTotal = target;
      if (!S.hide && !reduceMotion && from != null && from !== target) countUp(h, from, target);
    }
  }
  function countUp(el, from, to) {
    var t0 = performance.now(), dur = 450;
    function step(t) {
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = C.rp(Math.round(from + (to - from) * e));
      if (p < 1 && document.contains(el)) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function renderTabs() {
    function t(id, label, ic) {
      return '<button class="tab" data-act="tab" data-v="' + id + '"' + (S.tab === id ? ' aria-current="page"' : '') + '>' + icon(ic) + '<span>' + label + '</span><span class="tab-dot"></span></button>';
    }
    document.getElementById('tabbar').setAttribute('aria-label', L('Menu utama', 'Main menu'));
    document.getElementById('tabs').innerHTML = t('home', L('Beranda', 'Home'), 'house') + t('hist', L('Riwayat', 'History'), 'calendar') +
      '<div class="fab-cell"><button class="fab" data-act="add" aria-label="' + L('Catat transaksi baru', 'Add a new transaction') + '">' + icon('plus') + '</button><span class="fab-label" aria-hidden="true">' + L('Catat', 'Add') + '</span></div>' +
      t('rep', L('Laporan', 'Reports'), 'pie') + t('more', L('Lainnya', 'More'), 'grid');
  }
  function pageHead(title, back, eye) {
    return '<header class="page-head">' + (back ? '<button class="icon-btn" data-act="more-back" aria-label="' + L('Kembali ke Lainnya', 'Back to More') + '">' + icon('chevl') + '</button>' : '') + '<h1>' + esc(title) + '</h1>' + (eye ? eyeBtn(false) : '') + '</header>';
  }
  function segHtml(name, opts, cur, label, change) {
    return '<div class="seg" role="radiogroup" aria-label="' + esc(label) + '">' + opts.map(function (o) {
      return '<label><input type="radio" name="' + name + '" id="' + name + '-' + o[0] + '" value="' + o[0] + '"' + (cur === o[0] ? ' checked' : '') + (change ? ' data-change="' + change + '"' : '') + '><span>' + o[1] + '</span></label>';
    }).join('') + '</div>';
  }
  function statusView(title) {
    var body;
    if (S.status === 'loading') body = '<div class="card"><p class="loading"><span class="spin" aria-hidden="true"></span>' + L('Memuat data kamu…', 'Loading your data…') + '</p></div>';
    else if (S.status === 'slow') body = '<div class="card empty"><h3>' + L('Datanya belum kebuka', 'Your data hasn’t loaded yet') + '</h3><p class="ink2">' + L('Biasanya karena internet lambat. Cek koneksi kamu, lalu muat ulang.', 'Usually a slow connection. Check your internet, then reload.') + '</p><div><button class="btn sm" data-act="reload">' + L('Muat ulang', 'Reload') + '</button></div></div>';
    else body = '<div class="card empty"><h3>' + L('Data belum bisa dibuka', 'Can’t open your data') + '</h3><p class="ink2">' + L('Buka halaman ini dari link claude.ai-nya, dan pastikan kamu sudah login di browser ini. Kalau masih gagal, tutup lalu buka lagi.', 'Open this page from its claude.ai link and make sure you’re signed in on this browser. If it still fails, close it and open it again.') + '</p><div><button class="btn sm" data-act="reload">' + L('Muat ulang', 'Reload') + '</button></div></div>';
    return (title ? pageHead(title) : '') + body;
  }
  // a small pill on every tab while the page shows its local copy or has changes waiting to go out
  function whenLabel(ts) {
    var d = new Date(ts), k = C.dateKey(d), hm = (d.getHours() < 10 ? '0' : '') + d.getHours() + (S.lang === 'en' ? ':' : '.') + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (k === today()) return L('jam ', 'at ') + hm;
    if (k === C.addDays(today(), -1)) return L('kemarin ', 'yesterday ') + hm;
    return C.dayLabel(k) + ' ' + hm;
  }
  function syncHtml() {
    if (S.status !== 'ready') return '';
    var off = !S.live || S.netOff, n = obCount(), showN = n > 0 && (off || obStuck);
    if (!off && !showN) return '';
    var trying = off && !S.netOff && !S.slow && !S.noLink && !obBlocked, bits = [];
    if (off) bits.push(trying ? L('Menyambung…', 'Connecting…') : L('Belum tersambung', 'Not connected'));
    if (!S.live && S.cacheAt) bits.push(L('data terakhir ', 'last updated ') + whenLabel(S.cacheAt));
    if (showN) bits.push(L(n + ' perubahan belum terkirim', n + (n === 1 ? ' change' : ' changes') + ' not sent yet'));
    return '<p class="sync">' + (trying || !off ? '<span class="spin" aria-hidden="true"></span>' : icon('wifioff', 'sm')) +
      '<span>' + bits.join(' · ') + (showN ? '<small>' + L('Tersimpan di sini dulu, terkirim sendiri begitu ada sinyal.', 'Kept here for now and sent by itself once you’re back online.') + '</small>' : '') + '</span></p>';
  }
  function syncChanged() {
    var h = syncHtml(), el = view.firstElementChild;
    if (el && el.classList.contains('sync')) { if (!h) el.remove(); else el.outerHTML = h; }
    else if (h) view.insertAdjacentHTML('afterbegin', h);
  }
  function emptyCard(title, text, action) {
    return '<div class="card empty"><h3>' + esc(title) + '</h3>' + (text ? '<p class="ink2">' + text + '</p>' : '') + (action ? '<div>' + action + '</div>' : '') + '</div>';
  }

  // ================= transaction rows =================
  function txMeta(t) {
    var m = { tag: '', slot: 0, ic: 'tag' };
    var walletF = S.tab === 'hist' ? S.hist.wallet : '';
    if (t.type === 'transfer') {
      m.title = 'Transfer'; m.ic = 'swap'; m.slot = 0;
      m.sub = wname(t.wallet) + ' → ' + wname(t.toWallet) + (t.note ? ' · ' + t.note : '');
      if (walletF && t.wallet === walletF) { m.amt = MS(-t.amount); m.cls = 'out-t'; }
      else if (walletF && t.toWallet === walletF) { m.amt = MS(t.amount); m.cls = 'in-t'; }
      else { m.amt = M(t.amount); m.cls = ''; }
      return m;
    }
    if (t.adjust) { m.title = L('Penyesuaian saldo', 'Balance adjustment'); m.ic = 'sliders'; }
    else if (t.debt) {
      var d = S.meta.debts[t.debt], p = d ? d.person : L('seseorang', 'someone'), lent = d ? d.direction === 'lent' : t.type === 'out';
      m.title = t.debtRole === 'pay'
        ? (lent ? L(p + ' bayar utang', p + ' paid back') : L('Bayar utang ke ' + p, 'Paid back ' + p))
        : (lent ? L('Pinjamkan ke ' + p, 'Lent to ' + p) : L('Pinjam dari ' + p, 'Borrowed from ' + p));
      m.ic = 'users'; m.slot = 7; m.tag = L('Utang', 'Debt');
    } else {
      var c = cat(t.category); m.title = catName(t.category, c); m.ic = c.icon; m.slot = c.color; if (t.recurring) m.tag = L('Rutin', 'Recurring');
    }
    m.sub = [t.adjust || t.debt ? '' : t.note, wname(t.wallet)].filter(Boolean).join(' · ');
    m.amt = MS(t.type === 'out' ? -t.amount : t.amount);
    m.cls = t.type === 'out' ? 'out-t' : 'in-t';
    return m;
  }
  function txRow(t) {
    var m = txMeta(t);
    return '<button class="tx' + (S.flashId === t.id ? ' flash' : '') + '" data-act="tx-edit" data-id="' + esc(t.id) + '" data-v="' + t.ym + '">' +
      '<span class="tx-ic" style="--c:' + cvar(m.slot) + '">' + icon(m.ic) + '</span>' +
      '<span class="tx-main"><span class="tx-title">' + esc(m.title) + (m.tag ? '<span class="tag">' + m.tag + '</span>' : '') + '</span>' +
      (m.sub ? '<span class="tx-sub">' + esc(m.sub) + '</span>' : '') + '</span>' +
      '<span class="tx-amt ' + m.cls + '">' + m.amt + (t.fee > 0 ? '<small>+ admin ' + M(t.fee) + '</small>' : '') + '</span></button>';
  }
  function dayTotals(list) {
    var out = 0, inn = 0;
    list.forEach(function (t) {
      if (t.adjust || t.debt) return;
      if (t.type === 'out') out += t.amount; else if (t.type === 'in') inn += t.amount;
      if (t.type === 'transfer' && t.fee) out += t.fee;
    });
    return { out: out, in: inn };
  }
  function groupedByDay(list) {
    var html = '', i = 0;
    while (i < list.length) {
      var d = list[i].date, grp = [];
      while (i < list.length && list[i].date === d) grp.push(list[i++]);
      var tot = dayTotals(grp), bits = [];
      if (tot.out) bits.push(L('keluar ', 'out ') + M(tot.out));
      if (tot.in) bits.push(L('masuk ', 'in ') + M(tot.in));
      html += '<div class="group-head"><b>' + (d === today() ? L('Hari ini', 'Today') : d === C.addDays(today(), -1) ? L('Kemarin', 'Yesterday') : C.dayLabel(d, d.slice(0, 4) !== today().slice(0, 4))) + '</b><span class="num">' + bits.join(' · ') + '</span></div>' +
        '<div class="tx-wrap">' + grp.map(txRow).join('') + '</div>';
    }
    return html;
  }

  // ================= Beranda =================
  function viewHome() {
    if (S.status !== 'ready') {
      return '<section class="hero"><p class="hero-hello">' + L('Halo, Bryan', 'Hi, Bryan') + '</p><p class="hero-label">' + L('Total saldo semua wallet', 'Total balance across wallets') + '</p><p class="hero-amount" aria-busy="true">Rp …</p></section>' + statusView();
    }
    var ws = walletsList();
    if (!ws.length) return onboarding();
    var td = today(), ym = C.ymOf(td);
    var total = ws.reduce(function (s, w) { return s + (S.bal[w.id] || 0); }, 0);
    var ms = C.summarize(S.flows, function (f) { return f.date.slice(0, 7) === ym; });
    var shownTotal = S.shownTotal != null && !S.hide && !reduceMotion && S.shownTotal !== total ? S.shownTotal : total;

    var hero = '<section class="hero" aria-label="' + L('Ringkasan saldo', 'Balance summary') + '">' +
      '<div class="hero-top"><div class="grow"><p class="hero-hello">' + L('Halo, Bryan', 'Hi, Bryan') + '</p><p class="hero-label">' + L('Total saldo semua wallet', 'Total balance across wallets') + '</p></div>' +
      '<button class="icon-btn on-hero" data-act="hide" aria-pressed="' + S.hide + '" aria-label="' + (S.hide ? L('Tampilkan saldo', 'Show balance') : L('Sembunyikan saldo', 'Hide balance')) + '">' + icon(S.hide ? 'eyeoff' : 'eye') + '</button></div>' +
      '<p class="hero-amount' + (S.hide ? ' hidden-amt' : '') + '" id="hero-total" data-v="' + total + '">' + (S.hide ? money(total) : M(shownTotal)) + '</p>' +
      '<div class="hero-month"><span class="pill-glass">' + C.monthLabel(ym) + '</span>' +
      '<span class="pill-glass">' + icon('arrowup', 'sm') + L('Keluar', 'Out') + ' <b class="num">' + M(ms.out) + '</b></span>' +
      '<span class="pill-glass">' + icon('arrowdown', 'sm') + L('Masuk', 'In') + ' <b class="num">' + M(ms.in) + '</b></span></div></section>';

    var quick = '<div class="quick" role="group" aria-label="' + L('Catat cepat', 'Quick add') + '">' +
      qchip('add', 'out', L('Pengeluaran', 'Expense'), 'arrowup', 2) + qchip('add', 'in', L('Pemasukan', 'Income'), 'arrowdown', 6) + qchip('add', 'transfer', 'Transfer', 'swap', 1) +
      qchip('more', 'debts', L('Utang-piutang', 'Debts'), 'users', 7) + qchip('more', 'goals', L('Target', 'Goals'), 'target', 3) + '</div>';

    var banners = '';
    if (!S.canWrite) banners += '<div class="banner">' + icon('info') + '<div class="grow"><p><b>' + L('Kamu cuma bisa melihat.', 'You can only view this.') + '</b></p><p class="small ink2">' + L('Akun ini gak punya izin untuk mencatat.', 'This account isn’t allowed to add records.') + '</p></div></div>';
    C.dueRecurring(S.meta.recurring, td).forEach(function (r) {
      banners += '<div class="banner" role="group" aria-label="' + L('Transaksi rutin ', 'Recurring transaction ') + esc(r.note) + '">' + icon('repeat') + '<div class="grow"><p><b>' + esc(r.note || L('Transaksi rutin', 'Recurring transaction')) + '</b> · <span class="num">' + M(r.amount) + '</span></p>' +
        '<p class="small ink2">' + L('Jatuh tempo ', 'Due ') + C.dayLabel(r.dueDate) + ' · ' + esc(wname(r.wallet)) + '</p>' +
        '<div class="acts"><button class="btn sm" data-act="rec-do" data-id="' + esc(r.id) + '">' + icon('check', 'sm') + L('Catat', 'Record') + '</button><button class="btn sm soft" data-act="rec-skip" data-id="' + esc(r.id) + '">' + L('Lewati kali ini', 'Skip this time') + '</button></div></div></div>';
    });
    // a wallet below zero usually means income that was never recorded
    ws.filter(function (w) { return (S.bal[w.id] || 0) < 0; }).forEach(function (w) {
      banners += '<div class="banner warn" role="group" aria-label="' + L('Saldo minus', 'Negative balance') + '">' + icon('alert') + '<div class="grow"><p><b>' + L('Saldo ' + esc(w.name) + ' minus ', esc(w.name) + ' is below zero: ') + '<span class="num">' + M(S.bal[w.id]) + '</span></b></p>' +
        '<p class="small ink2">' + L('Biasanya ada pemasukan yang lupa dicatat.', 'Usually some income was never recorded.') + '</p>' +
        '<div class="acts"><button class="btn sm" data-act="neg-in" data-id="' + esc(w.id) + '">' + icon('arrowdown', 'sm') + L('Catat pemasukan', 'Add income') + '</button><button class="btn sm soft" data-act="wallet-edit" data-id="' + esc(w.id) + '">' + L('Sesuaikan saldo', 'Fix the balance') + '</button></div></div></div>';
    });
    // backup nudge: the data lives on one Claude account
    var lastBk = S.meta.settings.lastBackup;
    if ((!lastBk || C.daysBetween(lastBk, td) > 30) && LS.get('bkSnooze', '') < td) {
      banners += '<div class="banner" role="group" aria-label="Backup">' + icon('download') + '<div class="grow"><p><b>' + (lastBk ? L('Sudah ' + C.daysBetween(lastBk, td) + ' hari belum backup.', 'No backup for ' + C.daysBetween(lastBk, td) + ' days.') : L('Kamu belum pernah backup.', 'You haven’t made a backup yet.')) + '</b></p>' +
        '<p class="small ink2">' + L('Datamu nempel di akun Claude ini. File backup menjaganya kalau akunnya berubah.', 'Your data is tied to this Claude account. A backup file keeps it safe if the account changes.') + '</p>' +
        '<div class="acts"><button class="btn sm" data-act="backup-json">' + icon('download', 'sm') + L('Backup sekarang', 'Back up now') + '</button><button class="btn sm soft" data-act="bk-later">' + L('Nanti', 'Later') + '</button></div></div></div>';
    }
    var yd = C.addDays(td, -1);
    var hasY = S.txs.some(function (t) { return t.date === yd; });
    var recent = S.txs.some(function (t) { return t.date >= C.addDays(td, -8) && t.date < yd; });
    if (S.meta.settings.gapReminder !== false && !hasY && recent && LS.get('gapDismiss', '') !== yd) {
      banners += '<div class="banner">' + icon('calendar') + '<div class="grow"><p><b>' + L('Kemarin belum ada catatan.', 'Nothing recorded yesterday.') + '</b></p><p class="small ink2">' + C.dayLong(yd) + L('. Kalau memang gak ada transaksi, tutup aja.', '. If there really was nothing, just close this.') + '</p>' +
        '<div class="acts"><button class="btn sm" data-act="add" data-date="' + yd + '">' + L('Catat untuk kemarin', 'Add for yesterday') + '</button><button class="btn sm soft" data-act="gap-close" data-v="' + yd + '">' + L('Tutup', 'Close') + '</button></div>' +
        '<button class="link small-link" data-act="gap-off">' + L('Jangan ingatkan lagi', 'Stop reminding me') + '</button></div></div>';
    }

    // things he records again and again: one tap saves them for today
    var favs = favList();
    var favSec = favs.length ? '<section class="section"><div class="section-head"><h2>' + L('Sering dicatat', 'Frequent') + '</h2></div>' +
      '<div class="quick" role="group" aria-label="' + L('Catat sekali tap', 'One-tap add') + '">' + favs.map(function (f, i) {
        var c = cat(f.category);
        return '<button class="qchip fav" data-act="fav-save" data-v="' + i + '" aria-label="' + L('Catat ', 'Record ') + esc(favLabel(f)) + ', ' + C.rp(f.amount) + L(' hari ini', ' for today') + '"><span class="dot" style="color:color-mix(in srgb, ' + cvar(c.color) + ' 65%, var(--ink));background:color-mix(in srgb, ' + cvar(c.color) + ' 16%, var(--card))">' + icon(c.icon, 'sm') + '</span>' +
          '<span class="fav-t"><span>' + esc(favLabel(f)) + '</span><small class="' + (f.type === 'out' ? 'out-t' : 'in-t') + '">' + (f.type === 'out' ? '−' : '+') + MC(f.amount) + '</small></span></button>';
      }).join('') + '</div><p class="hint">' + L('Tap sekali langsung tercatat untuk hari ini. Ada tombol Batalkan kalau salah.', 'One tap records it for today. There’s an Undo if it was a mistake.') + '</p></section>' : '';

    var cards = ws.map(function (w, i) {
      var b = S.bal[w.id] || 0;
      return '<button class="wcard g-' + esc(w.color || 'oranye') + '" style="--i:' + i + '" data-act="wallet-hist" data-id="' + esc(w.id) + '" aria-label="' + esc(w.name) + ', ' + L('saldo ', 'balance ') + (S.hide ? L('disembunyikan', 'hidden') : M(b)) + (b < 0 ? L(', minus', ', below zero') : '') + L('. Lihat riwayatnya.', '. See its history.') + '">' +
        '<span class="wn">' + icon(kindIcon(w.kind), 'sm') + '<span>' + esc(w.name) + '</span>' + (b < 0 ? '<span class="neg-badge">' + icon('alert', 'sm') + L('Minus', 'Below 0') + '</span>' : '') + '</span>' +
        '<span><span class="wk">' + kindLabel(w.kind) + '</span><br><span class="wb num' + (S.hide ? ' hidden-amt' : '') + '">' + money(b) + '</span></span></button>';
    }).join('') + '<button class="wcard add" data-act="wallet-new">' + icon('plus') + '<span>' + L('Tambah wallet', 'Add wallet') + '</span></button>';
    var walletsSec = '<section class="section"><div class="section-head"><h2>Wallet</h2><button class="link" data-act="more" data-v="wallets">' + L('Kelola', 'Manage') + '</button></div><div class="wallets">' + cards + '</div></section>';

    var budgets = budgetRows(ms).sort(function (a, b) { return b.st.pct - a.st.pct; }).slice(0, 3);
    var budgetSec = budgets.length ? '<section class="section"><div class="section-head"><h2>' + L('Budget bulan ini', 'This month’s budget') + '</h2><button class="link" data-act="more" data-v="budgets">' + L('Atur', 'Edit') + '</button></div><div class="card stack">' + budgets.map(meterHtml).join('') + '</div></section>' : '';

    var last = S.txs.slice(0, 6);
    var recentSec = '<section class="section"><div class="section-head"><h2>' + L('Terakhir dicatat', 'Recent') + '</h2>' + (S.txs.length ? '<button class="link" data-act="tab" data-v="hist">' + L('Lihat semua', 'See all') + '</button>' : '') + '</div>' +
      (last.length ? groupedByDay(last) : emptyCard(L('Belum ada catatan', 'Nothing recorded yet'), L('Tekan tombol <b>Catat</b> di bawah untuk mencatat pengeluaran atau pemasukan pertama kamu.', 'Tap <b>Add</b> at the bottom to record your first expense or income.'))) + '</section>';

    var goals = liveList(S.meta.goals);
    var goalSec = goals.length ? '<section class="section"><div class="section-head"><h2>' + L('Target tabungan', 'Savings goals') + '</h2><button class="link" data-act="more" data-v="goals">' + L('Lihat', 'View') + '</button></div><div class="stack">' + goals.slice(0, 3).map(goalCard).join('') + '</div></section>' : '';

    var debtSec = '';
    var dsum = debtSummary();
    if (dsum.lentN || dsum.borN) {
      debtSec = '<section class="section"><div class="section-head"><h2>' + L('Utang-piutang', 'Debts') + '</h2><button class="link" data-act="more" data-v="debts">' + L('Lihat', 'View') + '</button></div><div class="card facts">' +
        (dsum.lentN ? '<div class="fact"><span>' + L('Orang utang ke kamu', 'Owed to you') + ' (' + dsum.lentN + ')</span><span class="num in-t">' + M(dsum.lent) + '</span></div>' : '') +
        (dsum.borN ? '<div class="fact"><span>' + L('Kamu utang', 'You owe') + ' (' + dsum.borN + ')</span><span class="num out-t">' + M(dsum.bor) + '</span></div>' : '') + '</div></section>';
    }

    return '<div class="home-grid"><div class="col">' + hero + quick + banners + favSec + walletsSec + budgetSec + '</div><div class="col">' + recentSec + goalSec + debtSec + '</div></div>';
  }
  // favourites whose wallet and category still exist
  function favList() {
    return C.favorites(S.txs, today(), 8).filter(function (f) {
      var w = S.meta.wallets[f.wallet], c = S.meta.categories[f.category];
      return w && !w.archived && c && !c.archived;
    }).slice(0, 6);
  }
  function favLabel(f) { return f.note || catName(f.category); }
  function qchip(act, v, label, ic, slot) {
    var attr = act === 'add' ? 'data-act="add" data-type="' + v + '"' : 'data-act="more" data-v="' + v + '"';
    return '<button class="qchip" ' + attr + '><span class="dot" style="color:color-mix(in srgb, ' + cvar(slot) + ' 65%, var(--ink));background:color-mix(in srgb, ' + cvar(slot) + ' 16%, var(--card))">' + icon(ic, 'sm') + '</span>' + label + '</button>';
  }
  function budgetRows(ms) {
    var rows = [];
    catsList('out', true).forEach(function (c) {
      var lim = S.meta.budgets[c.id];
      if (lim > 0 && (!c.archived || ms.byCat.out[c.id])) rows.push({ id: c.id, c: c, st: C.budgetStatus(ms.byCat.out[c.id] || 0, lim) });
    });
    return rows;
  }
  function meterHtml(r) {
    var st = r.st, p = Math.round(st.pct * 100);
    var label = st.level === 'over' ? icon('alert', 'sm') + L('Lewat budget ', 'Over budget by ') + M(-st.left)
      : st.level === 'near' ? icon('alert', 'sm') + L('Hampir habis · sisa ', 'Almost used up · ') + M(st.left) + L('', ' left')
      : icon('check', 'sm') + L('Aman · sisa ', 'On track · ') + M(st.left) + L('', ' left');
    return '<div class="meter"><div class="meter-top"><b>' + esc(catName(r.id, r.c)) + '</b><span class="small ink2 num">' + M(st.spent) + ' / ' + M(st.limit) + '</span></div>' +
      '<div class="bar ' + st.level + '" role="img" aria-label="' + p + L('% terpakai', '% used') + '"><i style="width:' + Math.min(100, p) + '%"></i></div>' +
      '<div class="row" style="justify-content:space-between"><span class="status ' + st.level + '">' + label + '</span><b class="small num">' + p + '%</b></div></div>';
  }
  function debtSummary() {
    var s = { lent: 0, lentN: 0, bor: 0, borN: 0 };
    liveList(S.meta.debts).forEach(function (d) {
      var st = C.debtState(d, d.id, S.txs);
      if (st.settled) return;
      if (d.direction === 'lent') { s.lent += st.left; s.lentN++; } else { s.bor += st.left; s.borN++; }
    });
    return s;
  }
  function goalCard(g) {
    var w = S.meta.wallets[g.wallet];
    var st = C.goalState(g, w ? S.bal[g.wallet] : 0, today());
    var p = Math.floor(st.pct * 100);
    var line = !w ? L('Wallet-nya sudah gak ada. Ubah target untuk pilih wallet lain.', 'Its wallet is gone. Edit the goal to pick another wallet.')
      : st.done ? L('Tercapai. Mantap.', 'Reached. Nice.')
      : st.perMonth ? L('Sisa ', '') + M(st.left) + L(' · sekitar ', ' to go · about ') + M(st.perMonth) + L(' per bulan sampai ', ' a month until ') + C.monthLabel(g.deadline.slice(0, 7))
      : L('Sisa ', '') + M(st.left) + L('', ' to go');
    return '<div class="card stack"><div class="row"><span class="tx-ic" style="--c:var(--s3)">' + icon('target') + '</span><div class="grow"><p class="tx-title">' + esc(g.name) + '</p><p class="small muted">Wallet: ' + esc(w ? w.name : '—') + '</p></div>' +
      '<button class="icon-btn" data-act="goal-edit" data-id="' + esc(g.id) + '" aria-label="' + L('Ubah target ', 'Edit goal ') + esc(g.name) + '">' + icon('pencil', 'sm') + '</button></div>' +
      '<div class="bar goal" role="img" aria-label="' + p + L('% tercapai', '% reached') + '"><i style="width:' + p + '%"></i></div>' +
      '<div class="row"><span class="grow num"><b>' + money(st.have) + '</b> <span class="muted">' + L('dari ', 'of ') + M(g.target) + '</span></span><b class="num">' + p + '%</b></div>' +
      '<p class="small ink2">' + line + '</p>' +
      (w && !st.done ? '<div><button class="btn sm" data-act="goal-deposit" data-id="' + esc(g.id) + '">' + icon('plus', 'sm') + L('Setor ke target', 'Add to goal') + '</button></div>' : '') + '</div>';
  }

  // ---- onboarding (no wallets yet)
  function onboarding() {
    return '<section class="hero"><p class="hero-hello">' + L('Halo, Bryan', 'Hi, Bryan') + '</p><h1 class="hero-amount" style="font-size:clamp(26px,7vw,34px);margin-top:8px">' + L('Selamat datang di Dompet Bryan', 'Welcome to Dompet Bryan') + '</h1>' +
      '<p class="hero-label">' + L('Langkah pertama: bikin wallet. Wallet itu tempat uangmu berada, misalnya uang tunai (Cash), rekening BCA, atau GoPay.', 'First step: make a wallet. A wallet is where your money sits, like cash, a BCA account or GoPay.') + '</p></section>' +
      langCard() +
      '<section class="card stack" aria-labelledby="ob-h"><h2 id="ob-h" style="font-size:19px">' + L('Bikin wallet pertama', 'Make your first wallet') + '</h2>' +
      '<form class="stack" novalidate data-submit="wallet" data-keep>' + walletFields({}, 'ob', true) +
      '<button class="btn primary" type="submit">' + icon('check') + L('Simpan wallet', 'Save wallet') + '</button></form></section>';
  }
  function langCard() {
    return '<section class="card lang-card" aria-labelledby="lang-h"><h2 id="lang-h" style="font-size:16px">Bahasa · Language</h2>' +
      segHtml('lang', [['id', 'Indonesia'], ['en', 'English']], S.lang, 'Bahasa · Language', 'lang') + '</section>';
  }
  function settingsCard() {
    return '<section class="card lang-card" aria-labelledby="set-h"><h2 id="set-h" style="font-size:18px">' + L('Pengaturan', 'Settings') + '</h2>' +
      '<p class="lbl small ink2">Bahasa · Language</p>' + segHtml('lang', [['id', 'Indonesia'], ['en', 'English']], S.lang, 'Bahasa · Language', 'lang') +
      '<p class="lbl small ink2">' + L('Tampilan', 'Appearance') + '</p>' + segHtml('theme', [['auto', L('Otomatis', 'Auto')], ['light', L('Terang', 'Light')], ['dark', L('Gelap', 'Dark')]], S.theme, L('Tampilan', 'Appearance'), 'theme') +
      '<p class="hint">' + L('Otomatis = ikut setelan HP.', 'Auto = follows your phone.') + '</p>' +
      '<label class="check"><input type="checkbox" id="set-gap" data-change="gap-toggle"' + (S.meta.settings.gapReminder !== false ? ' checked' : '') + '>' + L('Ingatkan kalau kemarin belum ada catatan', 'Remind me when yesterday has no records') + '</label></section>';
  }
  function walletFields(w, p, isNew) {
    var count = walletsList(true).length;
    var color = w.color || WC[count % WC.length][0];
    return (isNew ? '<div class="field"><span class="lbl">' + L('Pilihan cepat', 'Quick picks') + '</span><div class="chips">' + SUGGEST.map(function (s, i) {
      return '<button type="button" class="btn sm soft" data-act="w-suggest" data-v="' + i + '">' + esc(L(s[0], s[1])) + '</button>';
    }).join('') + '</div><p class="hint">' + L('Namanya tetap bisa kamu ganti.', 'You can still change the name.') + '</p></div>' : '') +
      '<div class="field"><label for="' + p + '-name">' + L('Nama wallet', 'Wallet name') + '</label><input class="input" id="' + p + '-name" name="name" maxlength="30" autocomplete="off" value="' + esc(w.name || '') + '" placeholder="' + L('Misal: Cash, BCA, GoPay', 'For example: Cash, BCA, GoPay') + '">' + errEl(p + '-name') + '</div>' +
      '<div class="field"><span class="lbl" id="' + p + '-kind-l">' + L('Jenis', 'Type') + '</span><div class="chips" role="radiogroup" aria-labelledby="' + p + '-kind-l">' + Object.keys(WK).map(function (k) {
        return '<label class="chip"><input type="radio" name="kind" id="' + p + '-kind-' + k + '" value="' + k + '"' + ((w.kind || 'cash') === k ? ' checked' : '') + '><span>' + icon(WK[k][1], 'sm') + kindLabel(k) + CK + '</span></label>';
      }).join('') + '</div></div>' +
      '<div class="field"><span class="lbl" id="' + p + '-color-l">' + L('Warna kartu', 'Card colour') + '</span><div class="colorpick" role="radiogroup" aria-labelledby="' + p + '-color-l">' + WC.map(function (c) {
        return '<label><input type="radio" name="color" id="' + p + '-color-' + c[0] + '" value="' + c[0] + '" aria-label="' + L(c[1], c[2]) + '"' + (color === c[0] ? ' checked' : '') + '><span class="g-' + c[0] + '">' + icon('check') + '</span></label>';
      }).join('') + '</div></div>' +
      '<div class="field"><label for="' + p + '-initial">' + L('Saldo awal', 'Starting balance') + '</label><div class="money"><span>Rp</span><input id="' + p + '-initial" name="initial" class="amt" inputmode="numeric" autocomplete="off" placeholder="0" value="' + (w.initial ? C.num(w.initial) : '') + '"></div>' +
      '<p class="hint">' + (isNew ? L('Isi saldo yang ada di wallet ini sekarang. Boleh 0.', 'Enter what’s in this wallet right now. 0 is fine.') : L('Mengubah saldo awal ikut mengubah saldo sekarang.', 'Changing the starting balance also changes the current balance.')) + '</p></div>';
  }

  // ================= Riwayat =================
  function txOk(t) {
    var h = S.hist;
    if (h.wallet && t.wallet !== h.wallet && t.toWallet !== h.wallet) return false;
    if (h.cat) {
      if (h.cat === '_transfer') { if (t.type !== 'transfer') return false; }
      else if (h.cat === '_debt') { if (!t.debt) return false; }
      else if (h.cat === '_adjust') { if (!t.adjust) return false; }
      else if (t.category !== h.cat && !(h.cat === 'admin' && t.fee > 0)) return false;
    }
    if (h.q) {
      var m = txMeta(t);
      var hay = (t.note + ' ' + m.title + ' ' + wname(t.wallet) + ' ' + (t.toWallet ? wname(t.toWallet) : '')).toLowerCase();
      if (hay.indexOf(h.q.toLowerCase()) < 0) return false;
    }
    return true;
  }
  function flowOk(f) {
    var h = S.hist;
    if (h.wallet && f.wallet !== h.wallet) return false;
    if (h.cat) { if (h.cat.charAt(0) === '_' || f.category !== h.cat) return false; }
    if (h.q) { var t = S.txIndex[f.id]; return t ? txOk(t) : false; }
    return true;
  }
  function viewHist() {
    if (S.status !== 'ready') return statusView(L('Riwayat', 'History'));
    var h = S.hist, tYM = thisYM();
    var html = pageHead(L('Riwayat', 'History'), false, true) + segHtml('hmode', [['month', L('Per bulan', 'By month')], ['all', L('Semua', 'All')]], h.mode, L('Tampilan riwayat', 'History view'), 'h-mode');
    if (h.mode === 'month') {
      html += '<div class="monthnav"><button class="icon-btn" data-act="h-prev" aria-label="' + L('Bulan sebelumnya', 'Previous month') + '">' + icon('chevl') + '</button><h2 aria-live="polite">' + C.monthLabel(h.ym) + '</h2>' +
        '<button class="icon-btn" data-act="h-next" aria-label="' + L('Bulan berikutnya', 'Next month') + '"' + (h.ym >= tYM ? ' disabled' : '') + '>' + icon('chevr') + '</button></div>';
    }
    html += histFilters() + '<div id="hist-body" class="stack">' + histBody() + '</div>';
    return html;
  }
  function histFilters() {
    var h = S.hist;
    var arch = L(' (arsip)', ' (archived)');
    var cats = function (type) { return catsList(type, true).map(function (c) { return opt(c.id, catName(c.id, c) + (c.archived ? arch : ''), h.cat); }).join(''); };
    return '<div class="filters"><div class="search"><label class="sr" for="h-q">' + L('Cari keterangan', 'Search notes') + '</label>' + icon('search') +
      '<input id="h-q" class="input" type="search" placeholder="' + L('Cari keterangan…', 'Search notes…') + '" autocomplete="off" value="' + esc(h.q) + '" data-input="h-q"></div>' +
      selectHtml('h-wallet', L('Filter wallet', 'Filter by wallet'), opt('', L('Semua wallet', 'All wallets'), h.wallet) +
        walletsList(true).map(function (w) { return opt(w.id, w.name + (w.archived ? arch : ''), h.wallet); }).join(''), ' data-change="h-wallet"') +
      selectHtml('h-cat', L('Filter kategori', 'Filter by category'), opt('', L('Semua kategori', 'All categories'), h.cat) +
        '<optgroup label="' + L('Pengeluaran', 'Expenses') + '">' + cats('out') + '</optgroup><optgroup label="' + L('Pemasukan', 'Income') + '">' + cats('in') + '</optgroup>' +
        '<optgroup label="' + L('Lainnya', 'Other') + '">' + opt('_transfer', 'Transfer', h.cat) + opt('_debt', L('Utang-piutang', 'Debts'), h.cat) + opt('_adjust', L('Penyesuaian saldo', 'Balance adjustments'), h.cat) + '</optgroup>', ' data-change="h-cat"') +
      '</div>';
  }
  function histBody() {
    var h = S.hist, td = today(), html = '';
    var filtered = h.wallet || h.cat || h.q;
    if (h.mode === 'month') {
      var fl = S.flows.filter(function (f) { return f.date.slice(0, 7) === h.ym && flowOk(f); });
      var sm = C.summarize(fl);
      html += '<div class="card stack"><div class="sumline num"><span>' + L('Keluar', 'Out') + ' <b class="out-t">' + M(sm.out) + '</b></span><span>' + L('Masuk', 'In') + ' <b class="in-t">' + M(sm.in) + '</b></span><span>' + L('Selisih', 'Net') + ' <b>' + MS(sm.in - sm.out) + '</b></span></div>' +
        calendar(h.ym, sm.byDay, td) + '</div>';
    }
    var txs = S.txs.filter(txOk);
    if (h.mode === 'month') txs = txs.filter(function (t) { return t.date.slice(0, 7) === h.ym; });
    if (h.mode === 'month' && h.day) {
      txs = txs.filter(function (t) { return t.date === h.day; });
      html += '<div class="row" style="justify-content:space-between;flex-wrap:wrap"><p><b>' + C.dayLong(h.day) + '</b></p><button class="btn sm soft" data-act="h-day-clear">' + L('Semua tanggal', 'All dates') + '</button></div>';
    }
    if (!txs.length) {
      return html + emptyCard(filtered ? L('Gak ada transaksi yang cocok', 'No matching transactions') : h.day ? L('Gak ada catatan di tanggal ini', 'Nothing recorded on this date') : h.mode === 'month' ? L('Belum ada catatan di bulan ini', 'Nothing recorded this month') : L('Belum ada catatan', 'Nothing recorded yet'),
        filtered ? L('Coba ganti kata kunci atau filternya.', 'Try a different search or filter.') : '',
        filtered ? '<button class="btn sm soft" data-act="h-reset">' + L('Hapus filter', 'Clear filters') + '</button>' : '<button class="btn sm" data-act="add"' + (h.day ? ' data-date="' + h.day + '"' : '') + '>' + icon('plus', 'sm') + L('Catat transaksi', 'Add a transaction') + '</button>');
    }
    var shown = txs.slice(0, h.limit);
    if (h.mode === 'all') {
      var i = 0;
      while (i < shown.length) {
        var ym = shown[i].ym, grp = [];
        while (i < shown.length && shown[i].ym === ym) grp.push(shown[i++]);
        var ms = C.summarize(S.flows, function (f) { return f.date.slice(0, 7) === ym && flowOk(f); });
        html += '<h3 class="group-head" style="font-size:16px;padding-top:18px"><b style="font-size:17px">' + C.monthLabel(ym) + '</b><span class="num">' + L('keluar ', 'out ') + M(ms.out) + ' · ' + L('masuk ', 'in ') + M(ms.in) + '</span></h3>' + groupedByDay(grp);
      }
    } else html += groupedByDay(shown);
    if (txs.length > shown.length) html += '<button class="btn soft" data-act="h-more">' + L('Tampilkan lebih banyak (', 'Show more (') + (txs.length - shown.length) + L(' lagi)', ' more)') + '</button>';
    return html;
  }
  function calendar(ym, byDay, td) {
    var lead = C.weekdayMon(ym + '-01'), n = C.daysInMonth(ym);
    var cells = C.weekHeads().map(function (d) { return '<div class="cal-h" aria-hidden="true">' + d + '</div>'; }).join('');
    for (var i = 0; i < lead; i++) cells += '<div class="cal-d blank" aria-hidden="true"></div>';
    for (var d = 1; d <= n; d++) {
      var k = ym + '-' + C.pad(d), v = byDay[k] || { out: 0, in: 0 }, fut = k > td;
      var label = C.dayLong(k) + (v.out ? L(', keluar ', ', out ') + M(v.out) : '') + (v.in ? L(', masuk ', ', in ') + M(v.in) : '') + (!v.out && !v.in ? L(', tidak ada catatan', ', nothing recorded') : '');
      cells += '<button class="cal-d' + (k === td ? ' today' : '') + '" style="--i:' + d + '" data-act="h-day" data-v="' + k + '" aria-pressed="' + (S.hist.day === k) + '"' + (fut ? ' disabled' : '') + ' aria-label="' + label + '">' +
        '<span class="dn">' + d + '</span>' + (v.out ? '<span class="cal-v out-t">−' + MC(v.out) + '</span>' : '') + (v.in ? '<span class="cal-v in-t">+' + MC(v.in) + '</span>' : '') + '</button>';
    }
    // legend: the same marks the cells use, each with its meaning beside it
    return '<div class="cal" role="group" aria-label="' + L('Kalender ', 'Calendar ') + C.monthLabel(ym) + '">' + cells + '</div>' +
      '<div class="cal-key">' +
      '<div class="ck-tile"><span class="ck-sample out-t">−' + C.compact(45000) + '</span><span class="ck-label">' + L('Uang keluar', 'Money out') + '</span></div>' +
      '<div class="ck-tile"><span class="ck-sample in-t">+' + C.compact(500000) + '</span><span class="ck-label">' + L('Uang masuk', 'Money in') + '</span></div>' +
      '<p class="ck-note">' + L('rb = ribu, jt = juta', 'k = thousand, M = million') + '</p>' +
      '<p class="ck-note">' + icon('info', 'sm') + L('Tap tanggal untuk lihat rincian hari itu.', 'Tap a date to see that day’s details.') + '</p></div>';
  }

  // ================= Laporan =================
  var repSegs = {}, repTotal = 0, repKindLabel = '';
  function repPred() {
    var r = S.rep;
    return function (f) {
      if (r.wallet && f.wallet !== r.wallet) return false;
      if (r.mode === 'month') return f.date.slice(0, 7) === r.ym;
      if (r.mode === 'year') return f.date.slice(0, 4) === r.year;
      return true;
    };
  }
  function viewRep() {
    if (S.status !== 'ready') return statusView(L('Laporan', 'Reports'));
    var r = S.rep, td = today(), tYM = thisYM(), tY = td.slice(0, 4);
    var html = pageHead(L('Laporan', 'Reports'), false, true) + segHtml('rmode', [['month', L('Bulan', 'Month')], ['year', L('Tahun', 'Year')], ['all', L('Semua', 'All')]], r.mode, L('Periode laporan', 'Report period'), 'r-mode');
    if (r.mode !== 'all') {
      var label = r.mode === 'month' ? C.monthLabel(r.ym) : L('Tahun ', 'Year ') + r.year;
      var atEnd = r.mode === 'month' ? r.ym >= tYM : r.year >= tY;
      html += '<div class="monthnav"><button class="icon-btn" data-act="r-prev" aria-label="' + L('Periode sebelumnya', 'Previous period') + '">' + icon('chevl') + '</button><h2 aria-live="polite">' + label + '</h2>' +
        '<button class="icon-btn" data-act="r-next" aria-label="' + L('Periode berikutnya', 'Next period') + '"' + (atEnd ? ' disabled' : '') + '>' + icon('chevr') + '</button></div>';
    }
    html += selectHtml('r-wallet', 'Wallet', opt('', L('Semua wallet', 'All wallets'), r.wallet) +
      walletsList(true).map(function (w) { return opt(w.id, w.name + (w.archived ? L(' (arsip)', ' (archived)') : ''), r.wallet); }).join(''), ' data-change="r-wallet"');

    var sm = C.summarize(S.flows, repPred());
    var first = null;
    for (var i = S.flows.length - 1; i >= 0; i--) { if (!r.wallet || S.flows[i].wallet === r.wallet) { first = S.flows[i].date; break; } }
    var cmp = '';
    if (r.mode !== 'all') {
      var prevKey = r.mode === 'month' ? C.addMonths(r.ym, -1) : String(+r.year - 1);
      var prev = C.summarize(S.flows, function (f) { return (!r.wallet || f.wallet === r.wallet) && (r.mode === 'month' ? f.date.slice(0, 7) === prevKey : f.date.slice(0, 4) === prevKey); });
      var prevLabel = r.mode === 'month' ? C.monthLabel(prevKey) : L('tahun ', '') + prevKey;
      if (prev.out > 0 && sm.out > 0) {
        var d = (sm.out - prev.out) / prev.out, pp = Math.round(Math.abs(d) * 100);
        cmp = pp === 0 ? L('Pengeluaran sama dengan ', 'Spending is the same as ') + prevLabel + '.'
          : L('Pengeluaran ' + pp + '% ' + (d < 0 ? 'lebih sedikit' : 'lebih banyak') + ' dari ', 'Spending is ' + pp + '% ' + (d < 0 ? 'lower' : 'higher') + ' than ') + prevLabel + '.';
      }
    } else if (first) cmp = L('Sejak ', 'Since ') + C.dayLong(first) + '.';
    html += '<section class="card stack" aria-label="' + L('Ringkasan', 'Summary') + '"><div class="stat3">' +
      '<div class="stat"><p class="k">' + icon('arrowup', 'sm') + L('Keluar', 'Out') + '</p><p class="v num out-t">' + M(sm.out) + '</p></div>' +
      '<div class="stat"><p class="k">' + icon('arrowdown', 'sm') + L('Masuk', 'In') + '</p><p class="v num in-t">' + M(sm.in) + '</p></div>' +
      '<div class="stat wide"><p class="k">' + L('Sisa (masuk − keluar)', 'Net (in − out)') + '</p><p class="v num">' + MS(sm.in - sm.out) + '</p></div></div>' +
      (cmp ? '<p class="ink2 small">' + cmp + '</p>' : '') + '</section>';

    var kind = r.kind, byCat = sm.byCat[kind], total = sm[kind];
    repKindLabel = kind === 'out' ? L('Total keluar', 'Total out') : L('Total masuk', 'Total in');
    html += '<section class="card stack" aria-labelledby="donut-h"><div class="section-head"><h2 id="donut-h">' + L('Per kategori', 'By category') + '</h2></div>' +
      segHtml('rkind', [['out', L('Pengeluaran', 'Expenses')], ['in', L('Pemasukan', 'Income')]], kind, L('Jenis', 'Type'), 'r-kind') +
      (total > 0 ? donutHtml(byCat, total) : '<p class="ink2">' + (kind === 'out' ? L('Belum ada pengeluaran di periode ini.', 'No expenses in this period yet.') : L('Belum ada pemasukan di periode ini.', 'No income in this period yet.')) + '</p>') + '</section>';

    var days = C.periodDays(r.mode, r.mode === 'month' ? r.ym : r.year, td, first);
    var top = C.topDay(sm.byDay);
    html += '<section class="card"><div class="facts">' +
      '<div class="fact"><span>' + L('Rata-rata pengeluaran per hari', 'Average spending per day') + '</span><span class="num">' + (days > 0 ? M(sm.out / days) : '—') + '</span></div>' +
      '<div class="fact"><span>' + L('Hari paling boros', 'Biggest spending day') + '</span><span class="num">' + (top ? C.dayLabel(top.date, r.mode !== 'month') + ' · ' + M(top.out) : '—') + '</span></div>' +
      '<div class="fact"><span>' + L('Pengeluaran terbesar', 'Largest expense') + '</span><span class="num">' + (sm.maxOut ? esc(sm.maxOut.note || catName(sm.maxOut.category)) + ' · ' + M(sm.maxOut.amount) : '—') + '</span></div>' +
      '</div></section>';

    var wrows = walletsList(true).filter(function (w) { return sm.byWallet[w.id]; });
    if (wrows.length > 1 && !r.wallet) {
      html += '<section class="card stack" aria-labelledby="pw-h"><h2 id="pw-h" style="font-size:18px">' + L('Per wallet', 'By wallet') + '</h2><div class="tablewrap"><table><thead><tr><th>Wallet</th><th class="n">' + L('Keluar', 'Out') + '</th><th class="n">' + L('Masuk', 'In') + '</th></tr></thead><tbody>' +
        wrows.map(function (w) { var v = sm.byWallet[w.id]; return '<tr><td>' + esc(w.name) + '</td><td class="n">' + M(v.out) + '</td><td class="n">' + M(v.in) + '</td></tr>'; }).join('') + '</tbody></table></div></section>';
    }

    html += changesHtml(sm);
    html += trendHtml();
    html += balanceHtml();

    if (r.mode === 'month' && !r.wallet) {
      var br = budgetRows(sm);
      html += '<section class="section"><div class="section-head"><h2>' + L('Budget vs realisasi', 'Budget vs actual') + '</h2><button class="link" data-act="more" data-v="budgets">' + L('Atur', 'Edit') + '</button></div>' +
        (br.length ? '<div class="card stack">' + br.map(meterHtml).join('') + '</div>'
          : emptyCard(L('Belum ada budget', 'No budgets yet'), L('Kasih batas pengeluaran per kategori biar kelihatan kapan mulai boros.', 'Set a spending limit per category so you can see when you start overspending.'), '<button class="btn sm" data-act="more" data-v="budgets">' + L('Atur budget', 'Set budgets') + '</button>')) + '</section>';
    }
    return html;
  }
  // which expense categories moved most against the previous period
  function changesHtml(sm) {
    var r = S.rep;
    if (r.mode === 'all') return '';
    var prevKey = r.mode === 'month' ? C.addMonths(r.ym, -1) : String(+r.year - 1);
    var inPeriod = function (key) {
      return function (f) { return (!r.wallet || f.wallet === r.wallet) && (r.mode === 'month' ? f.date.slice(0, 7) === key : f.date.slice(0, 4) === key); };
    };
    if (!sm.out || !C.summarize(S.flows, inPeriod(prevKey)).out) return '';
    var rows = C.categoryChanges(S.flows, inPeriod(r.mode === 'month' ? r.ym : r.year), inPeriod(prevKey), 'out').slice(0, 4);
    if (!rows.length) return '';
    var prevLabel = r.mode === 'month' ? C.monthLabel(prevKey) : prevKey;
    return '<section class="card stack" aria-labelledby="chg-h"><h2 id="chg-h" style="font-size:18px">' + L('Dibanding ', 'Compared with ') + prevLabel + '</h2><div class="facts">' + rows.map(function (x) {
      var up = x.diff > 0;
      var pct = x.pct == null ? L('baru', 'new') : (up ? '+' : '−') + Math.round(Math.abs(x.pct) * 100) + '%';
      return '<div class="fact chg"><span class="chg-l"><b>' + esc(catName(x.id)) + '</b><small class="muted num">' + M(x.prev) + ' → ' + M(x.now) + '</small></span>' +
        '<span class="status ' + (up ? 'over' : 'ok') + ' num">' + icon(up ? 'arrowup' : 'arrowdown', 'sm') + (up ? L('naik ', 'up ') : L('turun ', 'down ')) + M(Math.abs(x.diff)) + ' (' + pct + ')</span></div>';
    }).join('') + '</div><p class="hint">' + L('Pengeluaran per kategori, diurutkan dari perubahan terbesar.', 'Spending per category, biggest change first.') + '</p></section>';
  }
  // total balance at the end of each month
  function balanceHtml() {
    var r = S.rep, tYM = thisYM();
    var inc = r.wallet ? function (id) { return id === r.wallet; } : function (id) { var w = S.meta.wallets[id]; return !!w && !w.archived; };
    var firstYM = tYM;
    S.txs.forEach(function (t) { var ym = t.date.slice(0, 7); if (ym < firstYM) firstYM = ym; });
    Object.keys(S.meta.wallets).forEach(function (id) {
      var w = S.meta.wallets[id];
      if (w && w.createdAt && inc(id)) { var ym = C.dateKey(new Date(w.createdAt)).slice(0, 7); if (ym < firstYM) firstYM = ym; }
    });
    var start, end;
    if (r.mode === 'month') { end = r.ym; start = C.addMonths(end, -11); }
    else if (r.mode === 'year') { start = r.year + '-01'; end = r.year === tYM.slice(0, 4) ? tYM : r.year + '-12'; }
    else { start = firstYM; end = tYM; }
    if (start < firstYM) start = firstYM;
    if (start >= end) start = C.addMonths(end, -1);
    var months = [];
    for (var k = start; k <= end; k = C.addMonths(k, 1)) months.push(k);
    var ser = C.balanceSeries(S.meta.wallets, S.txs, months, inc), n = ser.length;
    var vals = ser.map(function (s) { return s.bal; });
    var hi = Math.max.apply(null, vals.concat([0])), lo = Math.min.apply(null, vals.concat([0]));
    var top = C.niceMax(hi > 0 ? hi : 1), bot = lo < 0 ? -C.niceMax(-lo) : 0, span = top - bot;
    var xs = function (i) { return (i + 0.5) / n * 100; }, ys = function (v) { return (top - v) / span * 100; };
    var pts = ser.map(function (s, i) { return xs(i).toFixed(2) + ',' + ys(s.bal).toFixed(2); });
    var zy = ys(0).toFixed(2);
    var area = 'M' + xs(0).toFixed(2) + ',' + zy + ' L' + pts.join(' L') + ' L' + xs(n - 1).toFixed(2) + ',' + zy + ' Z';
    var sel = r.bsel != null && r.bsel < n ? r.bsel : n - 1;
    var grid = [top, (top + bot) / 2, bot].map(function (v, i) {
      return '<div class="tgrid' + (i === 2 ? ' base' : '') + '" style="bottom:' + ((v - bot) / span * 100).toFixed(2) + '%"><span>' + (v < 0 ? '−' : '') + MC(Math.abs(v)) + '</span></div>';
    }).join('') + (bot < 0 ? '<div class="tgrid zero" style="bottom:' + ((0 - bot) / span * 100).toFixed(2) + '%"></div>' : '');
    var dots = ser.map(function (s, i) { return '<span class="bdot' + (i === sel ? ' on' : '') + '" style="left:' + xs(i).toFixed(2) + '%;top:' + ys(s.bal).toFixed(2) + '%"></span>'; }).join('');
    var cols = ser.map(function (s, i) {
      return '<button class="tcol' + (i === sel ? ' sel' : '') + '" data-act="rep-bal" data-v="' + i + '" aria-pressed="' + (i === sel) + '" aria-label="' + C.monthLabel(s.ym) + ': ' + M(s.bal) + '"></button>';
    }).join('');
    var every = n <= 7 ? 1 : n <= 14 ? 2 : n <= 36 ? 3 : 6;
    var labels = ser.map(function (s, i) { return '<span aria-hidden="true"' + (i === sel ? ' class="on"' : '') + '>' + (i % every === 0 ? C.monthName(s.ym, true) : '') + '</span>'; }).join('');
    var sp = ser[sel], prev = sel > 0 ? ser[sel - 1].bal : null;
    var delta = prev == null ? '' : ' · ' + MS(sp.bal - prev) + L(' dari bulan sebelumnya', ' from the month before');
    return '<section class="card trend" aria-labelledby="bal-h"><h2 id="bal-h" style="font-size:18px">' + (r.wallet ? L('Saldo ', 'Balance of ') + esc(wname(r.wallet)) : L('Total saldo dari bulan ke bulan', 'Total balance month by month')) + '</h2>' +
      '<div class="tplot bal"><svg class="bline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="barea" d="' + area + '"/><polyline class="bstroke" vector-effect="non-scaling-stroke" points="' + pts.join(' ') + '"/></svg>' +
      grid + '<span class="bcursor" style="left:' + xs(sel).toFixed(2) + '%"></span>' + dots + '<div class="tcols">' + cols + '</div></div><div class="tlabels">' + labels + '</div>' +
      '<p class="tcap num" aria-live="polite"><b>' + C.monthLabel(sp.ym) + '</b> · ' + M(sp.bal) + delta + '</p>' +
      '<p class="hint">' + L('Saldo di akhir tiap bulan. Bulan ini dihitung sampai hari ini.', 'Balance at the end of each month. This month counts up to today.') + '</p>' +
      '<details class="tbl"><summary>' + L('Lihat sebagai tabel', 'Show as a table') + '</summary><div class="tablewrap"><table><thead><tr><th>' + L('Bulan', 'Month') + '</th><th class="n">' + L('Saldo', 'Balance') + '</th></tr></thead><tbody>' +
      ser.map(function (s) { return '<tr><td>' + C.monthLabel(s.ym) + '</td><td class="n">' + M(s.bal) + '</td></tr>'; }).join('') + '</tbody></table></div></details></section>';
  }
  function donutHtml(byCat, total) {
    var entries = Object.keys(byCat).filter(function (k) { return byCat[k] > 0; }).map(function (k) { return [k, byCat[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
    var top = entries.slice(0, 5), rest = entries.slice(5);
    var restSum = rest.reduce(function (s, e) { return s + e[1]; }, 0);
    var used = {}, segs = [], slotOf = {};
    top.forEach(function (e) {
      var slot = cat(e[0]).color || 1;
      if (!slot || used[slot]) { for (var s = 1; s <= 8; s++) if (!used[s]) { slot = s; break; } }
      used[slot] = true; slotOf[e[0]] = slot;
      segs.push({ id: e[0], v: e[1], slot: slot, name: catName(e[0]) });
    });
    if (restSum > 0) segs.push({ id: '_rest', v: restSum, slot: 0, name: L('Lainnya (' + rest.length + ' kategori)', 'Other (' + rest.length + ' categories)') });
    repSegs = {}; repTotal = total;
    var R = 84, CIRC = 2 * Math.PI * R, GAP = segs.length > 1 ? 3 : 0, acc = 0;
    var arcs = segs.map(function (s, i) {
      repSegs[s.id] = s;
      var len = s.v / total * CIRC, dash = Math.max(0.6, len - GAP);
      var el = '<circle class="seg-arc" style="--d:' + dash.toFixed(2) + ';--i:' + i + '" data-act="rep-seg" data-v="' + esc(s.id) + '" cx="110" cy="110" r="' + R + '" fill="none" stroke="' + cvar(s.slot) + '" stroke-width="26" stroke-dasharray="' + dash.toFixed(2) + ' ' + (CIRC - dash).toFixed(2) + '" stroke-dashoffset="' + (-acc).toFixed(2) + '" transform="rotate(-90 110 110)"><title>' + esc(s.name) + ': ' + M(s.v) + ' (' + pctTxt(s.v, total) + ')</title></circle>';
      acc += len;
      return el;
    }).join('');
    var svg = '<svg class="donut' + (S.animate && !reduceMotion ? ' draw' : '') + '" viewBox="0 0 220 220" role="img" aria-label="' + (S.rep.kind === 'out' ? L('Diagram lingkaran pengeluaran per kategori. Rinciannya ada di daftar sebelahnya.', 'Pie chart of expenses by category. The details are in the list next to it.') : L('Diagram lingkaran pemasukan per kategori. Rinciannya ada di daftar sebelahnya.', 'Pie chart of income by category. The details are in the list next to it.')) + '">' +
      '<circle cx="110" cy="110" r="' + R + '" fill="none" stroke="var(--card-2)" stroke-width="26"/>' + arcs +
      '<text class="c1" x="110" y="96" text-anchor="middle" id="dn-1">' + repKindLabel + '</text><text class="c2" x="110" y="124" text-anchor="middle" id="dn-2">Rp ' + MC(total) + '</text><text class="c3" x="110" y="146" text-anchor="middle" id="dn-3"></text></svg>';
    var legend = '<div class="legend">' + entries.map(function (e) {
      var inTop = slotOf[e[0]] != null, nm = catName(e[0]);
      return '<button class="lrow" data-act="rep-cat" data-v="' + esc(e[0]) + '" data-seg="' + esc(inTop ? e[0] : '_rest') + '" aria-label="' + esc(nm) + ', ' + M(e[1]) + ', ' + pctTxt(e[1], total) + L('. Lihat transaksinya.', '. See its transactions.') + '">' +
        '<span class="sw" style="background:' + cvar(inTop ? slotOf[e[0]] : 0) + '"></span><span class="ln">' + esc(nm) + '</span><span class="lv">' + M(e[1]) + '</span>' +
        '<span class="lp"><span>' + pctTxt(e[1], total) + '</span><span>' + L('Lihat transaksi ›', 'See transactions ›') + '</span></span></button>';
    }).join('') + '</div>';
    return '<div class="donut-wrap">' + svg + legend + '</div>';
  }
  function highlight(id) {
    var svg = view.querySelector('.donut');
    if (!svg) return;
    svg.querySelectorAll('.seg-arc').forEach(function (a) { a.classList.toggle('hi', a.dataset.v === id); });
    view.querySelectorAll('.lrow').forEach(function (l) { l.classList.toggle('hi', !!id && l.dataset.seg === id); });
    svg.classList.toggle('focus', !!id);
    var s = id && repSegs[id];
    var t1 = document.getElementById('dn-1'), t2 = document.getElementById('dn-2'), t3 = document.getElementById('dn-3');
    if (!t1) return;
    if (s) { t1.textContent = s.name.length > 22 ? s.name.slice(0, 21) + '…' : s.name; t2.textContent = 'Rp ' + MC(s.v); t3.textContent = pctTxt(s.v, repTotal); }
    else { t1.textContent = repKindLabel; t2.textContent = 'Rp ' + MC(repTotal); t3.textContent = ''; }
  }
  function trendHtml() {
    var r = S.rep, tYM = thisYM(), periods = [];
    var byYM = {}, byY = {};
    S.flows.forEach(function (f) {
      if (r.wallet && f.wallet !== r.wallet) return;
      var ym = f.date.slice(0, 7), y = f.date.slice(0, 4);
      (byYM[ym] || (byYM[ym] = { out: 0, in: 0 }))[f.type] += f.amount;
      (byY[y] || (byY[y] = { out: 0, in: 0 }))[f.type] += f.amount;
    });
    var mp = function (ym) { var v = byYM[ym] || { out: 0, in: 0 }; return { key: ym, label: C.monthName(ym, true), long: C.monthLabel(ym), out: v.out, in: v.in }; };
    var title;
    if (r.mode === 'month') { for (var i = 5; i >= 0; i--) periods.push(mp(C.addMonths(r.ym, -i))); title = L('Tren 6 bulan', '6-month trend'); }
    else if (r.mode === 'year') { for (var m = 1; m <= 12; m++) periods.push(mp(r.year + '-' + C.pad(m))); title = L('Per bulan di ', 'Monthly in ') + r.year; }
    else {
      var firstYM = Object.keys(byYM).sort()[0] || tYM;
      var span = (+tYM.slice(0, 4) - +firstYM.slice(0, 4)) * 12 + (+tYM.slice(5, 7) - +firstYM.slice(5, 7)) + 1;
      if (span <= 24) { var start = span < 6 ? C.addMonths(tYM, -5) : firstYM; for (var k = start; k <= tYM; k = C.addMonths(k, 1)) periods.push(mp(k)); title = L('Per bulan', 'Monthly'); }
      else { for (var y = +firstYM.slice(0, 4); y <= +tYM.slice(0, 4); y++) { var v = byY[y] || { out: 0, in: 0 }; periods.push({ key: String(y), label: String(y), long: L('Tahun ', 'Year ') + y, out: v.out, in: v.in }); } title = L('Per tahun', 'Yearly'); }
    }
    var peak = Math.max.apply(null, periods.map(function (p) { return Math.max(p.out, p.in); }));
    var max = C.niceMax(peak);
    // default selection: this month if it is on the chart, else the last period
    var nowIdx = -1;
    periods.forEach(function (p, i) { if (p.key === tYM || p.key === tYM.slice(0, 4)) nowIdx = i; });
    var sel = r.tsel != null && r.tsel < periods.length ? r.tsel : nowIdx >= 0 ? nowIdx : periods.length - 1;
    // label every period while they fit; past 7, every 2nd; past 14, every 3rd
    var every = periods.length <= 7 ? 1 : periods.length <= 14 ? 2 : 3;
    var cols = periods.map(function (p, i) {
      return '<button class="tcol' + (i === sel ? ' sel' : '') + '" style="--i:' + i + '" data-act="rep-trend" data-v="' + i + '" aria-pressed="' + (i === sel) + '" aria-label="' + p.long + L(': keluar ', ': out ') + M(p.out) + L(', masuk ', ', in ') + M(p.in) + '"><span class="bars">' +
        '<i class="b o" style="height:' + (p.out / max * 100).toFixed(1) + '%"></i><i class="b i" style="height:' + (p.in / max * 100).toFixed(1) + '%"></i></span></button>';
    }).join('');
    var labels = periods.map(function (p, i) { return '<span aria-hidden="true"' + (i === sel ? ' class="on"' : '') + '>' + (i % every === 0 ? p.label : '') + '</span>'; }).join('');
    var ticks = peak > 0
      ? '<div class="tgrid base" style="bottom:0"><span>0</span></div><div class="tgrid" style="bottom:50%"><span>' + MC(max / 2) + '</span></div><div class="tgrid" style="bottom:100%"><span>' + MC(max) + '</span></div>'
      : '<div class="tgrid base" style="bottom:0"><span>0</span></div><p class="tempty">' + L('Belum ada transaksi di periode ini.', 'No transactions in this period yet.') + '</p>';
    var sp = periods[sel];
    return '<section class="card trend" aria-labelledby="tr-h"><h2 id="tr-h" style="font-size:18px">' + title + '</h2>' +
      '<div class="tkey"><span><i style="background:var(--out-mark)"></i>' + L('Keluar', 'Out') + '</span><span><i style="background:var(--in-mark)"></i>' + L('Masuk', 'In') + '</span></div>' +
      '<div class="tplot' + (S.animate && !reduceMotion ? ' grow-in' : '') + '">' + ticks +
      '<div class="tcols">' + cols + '</div></div><div class="tlabels">' + labels + '</div>' +
      '<p class="tcap num" aria-live="polite"><b>' + sp.long + '</b> · ' + L('keluar ', 'out ') + M(sp.out) + ' · ' + L('masuk ', 'in ') + M(sp.in) + '</p>' +
      '<details class="tbl"><summary>' + L('Lihat sebagai tabel', 'Show as a table') + '</summary><div class="tablewrap"><table><thead><tr><th>' + L('Periode', 'Period') + '</th><th class="n">' + L('Keluar', 'Out') + '</th><th class="n">' + L('Masuk', 'In') + '</th><th class="n">' + L('Sisa', 'Net') + '</th></tr></thead><tbody>' +
      periods.map(function (p) { return '<tr><td>' + p.long + '</td><td class="n">' + M(p.out) + '</td><td class="n">' + M(p.in) + '</td><td class="n">' + MS(p.in - p.out) + '</td></tr>'; }).join('') +
      '</tbody></table></div></details></section>';
  }

  // ================= Lainnya =================
  function moreTitle(k) {
    return {
      wallets: 'Wallet', categories: L('Kategori', 'Categories'), budgets: 'Budget', recurring: L('Transaksi rutin', 'Recurring'),
      goals: L('Target tabungan', 'Savings goals'), debts: L('Utang-piutang', 'Debts'), backup: L('Backup & pindah data', 'Backup & moving data')
    }[k];
  }
  function viewMore() {
    if (S.status !== 'ready') return statusView(L('Lainnya', 'More'));
    if (S.more && SUBVIEWS[S.more]) return pageHead(moreTitle(S.more), true) + SUBVIEWS[S.more]();
    var last = S.meta.settings.lastBackup;
    var stale = S.txs.length >= 10 && (!last || C.daysBetween(last, today()) > 30);
    var nb = Object.keys(S.meta.budgets).filter(function (k) { return S.meta.budgets[k] > 0; }).length;
    var ds = debtSummary();
    var rows = [
      ['wallets', 'wallet', 2, walletsList().length + L(' wallet aktif', ' active wallets')],
      ['categories', 'tag', 1, catsList('out').length + L(' pengeluaran · ', ' expense · ') + catsList('in').length + L(' pemasukan', ' income')],
      ['budgets', 'gauge', 4, nb + L(' kategori dibatasi', ' categories with a limit')],
      ['recurring', 'repeat', 3, liveList(S.meta.recurring).length + L(' transaksi rutin', ' recurring')],
      ['goals', 'target', 6, liveList(S.meta.goals).length + L(' target', ' goals')],
      ['debts', 'users', 7, ds.lentN + ds.borN ? (ds.lentN + ds.borN) + L(' belum lunas', ' not paid off') : L('Semua lunas', 'All paid off')],
      ['backup', 'download', 8, last ? L('Backup terakhir ', 'Last backup ') + C.dayLabel(last, true) : L('Belum pernah backup', 'Never backed up')]
    ];
    return pageHead(L('Lainnya', 'More')) + '<div class="tx-wrap">' + rows.map(function (r) {
      return '<button class="mrow" data-act="more" data-v="' + r[0] + '"><span class="tx-ic" style="--c:' + cvar(r[2]) + '">' + icon(r[1]) + '</span><span class="grow"><span class="mrow-t">' + moreTitle(r[0]) + '</span><br>' +
        '<span class="mrow-s">' + (r[0] === 'backup' && stale ? '<span class="status near">' + icon('alert', 'sm') + L('Sudah lama gak backup', 'No backup in a while') + '</span>' : esc(r[3])) + '</span></span>' + icon('chevr', 'chev') + '</button>';
    }).join('') + '</div>' +
      settingsCard() +
      '<div class="card stack small ink2"><p class="row">' + icon('info', 'sm') + '<span>' + L('Data kamu tersimpan di claude.ai dan cuma bisa dibuka akun kamu. JARVIS bisa bantu baca datanya kalau kamu tanya.', 'Your data is stored on claude.ai and only your account can open it. JARVIS can read it for you when you ask.') + '</span></p></div>';
  }
  function archDetails(title, items) {
    return '<details class="card"><summary class="mrow-t" style="min-height:44px;display:flex;align-items:center;cursor:pointer">' + title + '</summary><div class="stack" style="margin-top:8px">' + items + '</div></details>';
  }
  var SUBVIEWS = {
    wallets: function () {
      var ws = walletsList(), arch = walletsList(true).filter(function (w) { return w.archived; });
      var total = ws.reduce(function (s, w) { return s + (S.bal[w.id] || 0); }, 0);
      return '<div class="card row"><span class="grow ink2">' + L('Total saldo', 'Total balance') + '</span><b class="num">' + money(total) + '</b></div>' +
        '<div class="tx-wrap">' + ws.map(function (w, i) {
          var b = S.bal[w.id] || 0;
          return '<div class="wrow"><button class="mrow" data-act="wallet-edit" data-id="' + esc(w.id) + '"><span class="swatch g-' + esc(w.color || 'oranye') + '"></span><span class="grow"><span class="mrow-t">' + esc(w.name) + '</span><br><span class="mrow-s">' + kindLabel(w.kind) + '</span></span><b class="num' + (b < 0 ? ' out-t' : '') + '">' + money(b) + '</b></button>' +
            '<span class="reorder"><button class="icon-btn sm-btn" data-act="w-up" data-id="' + esc(w.id) + '" aria-label="' + L('Naikkan ', 'Move up ') + esc(w.name) + '"' + (i === 0 ? ' disabled' : '') + '>' + icon('chevu', 'sm') + '</button>' +
            '<button class="icon-btn sm-btn" data-act="w-down" data-id="' + esc(w.id) + '" aria-label="' + L('Turunkan ', 'Move down ') + esc(w.name) + '"' + (i === ws.length - 1 ? ' disabled' : '') + '>' + icon('chevd', 'sm') + '</button></span></div>';
        }).join('') + '</div><p class="hint">' + L('Urutan di sini = urutan kartu wallet di Beranda. Tap nama wallet untuk mengubahnya.', 'This order is the order of the wallet cards on Home. Tap a wallet to edit it.') + '</p><button class="btn primary" data-act="wallet-new">' + icon('plus') + L('Tambah wallet', 'Add wallet') + '</button>' +
        (arch.length ? archDetails(L('Wallet yang diarsipkan (', 'Archived wallets (') + arch.length + ')', arch.map(function (w) {
          return '<div class="row"><span class="grow">' + esc(w.name) + ' <span class="muted num">· ' + M(S.bal[w.id] || 0) + '</span></span><button class="btn sm soft" data-act="wallet-unarchive" data-id="' + esc(w.id) + '">' + L('Aktifkan lagi', 'Restore') + '</button></div>';
        }).join('')) : '');
    },
    categories: function () {
      var block = function (type, title, addLabel) {
        var cs = catsList(type);
        return '<section class="section"><div class="section-head"><h2>' + title + '</h2></div><div class="tx-wrap">' + cs.map(function (c) {
          return '<button class="mrow" data-act="cat-edit" data-id="' + esc(c.id) + '"><span class="tx-ic" style="--c:' + cvar(c.color) + '">' + icon(c.icon) + '</span><span class="grow mrow-t">' + esc(catName(c.id, c)) + '</span>' + icon('pencil', 'sm chev') + '</button>';
        }).join('') + '</div><button class="btn soft" data-act="cat-new" data-v="' + type + '">' + icon('plus', 'sm') + addLabel + '</button></section>';
      };
      var arch = listOf(S.meta.categories, function (c) { return c.name && c.archived; });
      return block('out', L('Pengeluaran', 'Expenses'), L('Tambah kategori pengeluaran', 'Add expense category')) + block('in', L('Pemasukan', 'Income'), L('Tambah kategori pemasukan', 'Add income category')) +
        (arch.length ? archDetails(L('Kategori yang diarsipkan (', 'Archived categories (') + arch.length + ')', arch.map(function (c) {
          return '<div class="row"><span class="grow">' + esc(catName(c.id, c)) + '</span><button class="btn sm soft" data-act="cat-unarchive" data-id="' + esc(c.id) + '">' + L('Aktifkan lagi', 'Restore') + '</button></div>';
        }).join('')) : '');
    },
    budgets: function () {
      var ym = thisYM();
      var ms = C.summarize(S.flows, function (f) { return f.date.slice(0, 7) === ym; });
      return '<p class="ink2">' + L('Batas pengeluaran per kategori, berlaku sama setiap bulan. Kosongkan kalau kategori itu gak perlu dibatasi.', 'A spending limit per category, the same every month. Leave it empty if a category needs no limit.') + '</p>' +
        '<form class="card stack" novalidate data-submit="budgets" data-keep>' + catsList('out').map(function (c) {
          var v = S.meta.budgets[c.id];
          return '<div class="field"><label for="b-' + esc(c.id) + '">' + esc(catName(c.id, c)) + '</label><div class="money"><span>Rp</span><input id="b-' + esc(c.id) + '" name="' + esc(c.id) + '" class="amt" inputmode="numeric" autocomplete="off" placeholder="' + L('Tanpa batas', 'No limit') + '" value="' + (v > 0 ? C.num(v) : '') + '"></div>' +
            '<p class="hint num">' + L('Terpakai ', 'Used in ') + C.monthLabel(ym) + ': ' + M(ms.byCat.out[c.id] || 0) + '</p></div>';
        }).join('') + '<button class="btn primary" type="submit">' + icon('check') + L('Simpan budget', 'Save budgets') + '</button></form>';
    },
    recurring: function () {
      var rs = liveList(S.meta.recurring), td = today();
      return '<p class="ink2">' + L('Untuk pembayaran yang jumlahnya sama dan berulang: tiap bulan (kost, langganan) atau tiap beberapa hari (catering). Di tanggalnya, Beranda menampilkan tombol <b>Catat</b> sekali tap. Aplikasi gak bisa kirim notifikasi, jadi pengingatnya muncul waktu kamu buka aplikasi.', 'For the same payment that repeats: every month (rent, subscriptions) or every few days (catering). On the due date, Home shows a one-tap <b>Record</b> button. The app can’t send notifications, so the reminder appears when you open it.') + '</p>' +
        (rs.length ? '<div class="tx-wrap">' + rs.map(function (r) {
          var when = r.freq === 'days' ? L('Tiap ' + r.every + ' hari', 'Every ' + r.every + ' days') : L('Tiap tanggal ' + r.day, 'Monthly on the ' + r.day + ordinal(r.day));
          var sub = r.active === false ? L('Nonaktif', 'Paused') : when + L(' · berikutnya ', ' · next ') + C.dayLabel(C.nextDue(r, td)) + ' · ' + wname(r.wallet);
          return '<button class="mrow" data-act="rec-edit" data-id="' + esc(r.id) + '"><span class="tx-ic" style="--c:' + cvar(cat(r.category).color) + '">' + icon(cat(r.category).icon) + '</span><span class="grow"><span class="mrow-t">' + esc(r.note) + '</span><br><span class="mrow-s">' + esc(sub) + '</span></span><b class="num ' + (r.type === 'out' ? 'out-t' : 'in-t') + '">' + MS(r.type === 'out' ? -r.amount : r.amount) + '</b></button>';
        }).join('') + '</div>' : emptyCard(L('Belum ada transaksi rutin', 'No recurring transactions yet'), '')) +
        '<button class="btn primary" data-act="rec-new">' + icon('plus') + L('Tambah transaksi rutin', 'Add recurring transaction') + '</button>';
    },
    goals: function () {
      var gs = liveList(S.meta.goals);
      return '<p class="ink2">' + L('Tiap target disambungkan ke satu wallet. Progresnya dihitung dari saldo wallet itu, jadi tinggal transfer uang ke sana.', 'Each goal is linked to one wallet. Progress is that wallet’s balance, so just transfer money into it.') + '</p>' +
        (gs.length ? '<div class="stack">' + gs.map(goalCard).join('') + '</div>' : emptyCard(L('Belum ada target', 'No goals yet'), L('Misalnya nabung buat laptop atau liburan.', 'For example, saving for a laptop or a trip.'))) +
        '<button class="btn primary" data-act="goal-new">' + icon('plus') + L('Tambah target tabungan', 'Add savings goal') + '</button>';
    },
    debts: function () {
      var ds = liveList(S.meta.debts).filter(function (d) { return d.direction === S.debtTab; });
      var open = [], done = [];
      ds.forEach(function (d) { var st = C.debtState(d, d.id, S.txs); (st.settled ? done : open).push([d, st]); });
      var row = function (x) {
        var d = x[0], st = x[1], p = d.amount ? Math.round(st.paid / d.amount * 100) : 0;
        var overdue = !st.settled && d.due && d.due < today();
        return '<button class="mrow" data-act="debt-open" data-id="' + esc(d.id) + '"><span class="tx-ic" style="--c:var(--s7)">' + icon('users') + '</span><span class="grow"><span class="mrow-t">' + esc(d.person) + '</span><br>' +
          '<span class="mrow-s">' + (st.settled ? L('Lunas', 'Paid off') : L('Dibayar ', 'Paid ') + p + '%' + (d.due ? L(' · jatuh tempo ', ' · due ') + C.dayLabel(d.due, true) : '')) + '</span>' + (overdue ? '<br><span class="status over">' + icon('alert', 'sm') + L('Lewat jatuh tempo', 'Overdue') + '</span>' : '') + '</span>' +
          '<b class="num">' + (st.settled ? CK : M(st.left)) + '</b></button>';
      };
      return segHtml('dtab', [['lent', L('Orang utang ke aku', 'Owed to me')], ['borrowed', L('Aku utang', 'I owe')]], S.debtTab, L('Jenis utang', 'Debt type'), 'd-tab') +
        (open.length ? '<div class="tx-wrap">' + open.map(row).join('') + '</div>' : emptyCard(S.debtTab === 'lent' ? L('Gak ada yang utang ke kamu', 'Nobody owes you money') : L('Kamu gak punya utang', 'You don’t owe anyone'), '')) +
        '<button class="btn primary" data-act="debt-new">' + icon('plus') + L('Catat utang-piutang baru', 'Add a debt') + '</button>' +
        (done.length ? '<details class="card"><summary class="mrow-t" style="min-height:44px;display:flex;align-items:center;cursor:pointer">' + L('Sudah lunas (', 'Paid off (') + done.length + ')</summary><div class="tx-wrap" style="box-shadow:none;margin-top:8px">' + done.map(row).join('') + '</div></details>' : '');
    },
    backup: function () {
      var last = S.meta.settings.lastBackup;
      var rs = S.restore, rg = S.restoring;
      return '<section class="card stack"><h2 style="font-size:18px">' + L('Download backup', 'Download a backup') + '</h2><p>' + L('Backup terakhir: ', 'Last backup: ') + '<b>' + (last ? C.dayLong(last) : L('belum pernah', 'never')) + '</b></p>' +
        '<p class="hint">' + L('File backup berisi semua wallet, kategori, budget, target, utang-piutang, dan transaksi. Simpan di Google Drive atau kirim ke email kamu sendiri. Bagus kalau dilakukan sebulan sekali.', 'The backup file holds every wallet, category, budget, goal, debt and transaction. Keep it in Google Drive or email it to yourself. Once a month is a good habit.') + '</p>' +
        '<button class="btn" data-act="backup-json">' + icon('download') + L('Download backup (.json)', 'Download backup (.json)') + '</button></section>' +
        '<section class="card stack"><h2 style="font-size:18px">' + L('Export ke Excel', 'Export to Excel') + '</h2><p class="hint">' + L('Untuk dibuka di Excel atau Google Sheets. Isinya semua transaksi, ditambah ringkasan per bulan.', 'To open in Excel or Google Sheets. It has every transaction plus a monthly summary.') + '</p>' +
        '<button class="btn soft" data-act="export-xlsx">' + icon('sheet') + L('Export ke Excel (.xlsx)', 'Export to Excel (.xlsx)') + '</button></section>' +
        '<section class="card stack"><h2 style="font-size:18px">' + L('Pulihkan dari file backup', 'Restore from a backup file') + '</h2><p class="hint">' + L('Pakai ini kalau pindah akun Claude. Semua data yang ada sekarang akan diganti dengan isi file.', 'Use this when moving to another Claude account. Everything here now is replaced by the file’s contents.') + '</p>' +
        (rg ? '<p class="loading"><span class="spin" aria-hidden="true"></span>' + L('Memulihkan… ', 'Restoring… ') + rg.done + L(' dari ', ' of ') + rg.total + '</p>' :
          rs ? '<div class="preview-box"><b>' + L('Isi file:', 'In the file:') + '</b><span>' + rs.summary.wallets + ' wallet · ' + rs.summary.categories + L(' kategori · ', ' categories · ') + rs.summary.tx + L(' transaksi', ' transactions') + '</span>' +
            (rs.summary.from ? '<span>' + L('Dari ', 'From ') + C.monthLabel(rs.summary.from) + L(' sampai ', ' to ') + C.monthLabel(rs.summary.to) + '</span>' : '') +
            (rs.summary.exportedAt ? '<span class="muted">' + L('Dibuat ', 'Made on ') + C.dayLong(C.dateKey(new Date(rs.summary.exportedAt))) + '</span>' : '') + '</div>' +
            '<p class="status near">' + icon('alert', 'sm') + L('Data sekarang (' + S.txs.length + ' transaksi) akan diganti.', 'Your current data (' + S.txs.length + ' transactions) will be replaced.') + '</p>' +
            '<div class="row" style="flex-wrap:wrap"><button class="btn soft" data-act="restore-cancel">' + L('Batal', 'Cancel') + '</button><button class="btn danger" data-act="restore-confirm">' + L('Pulihkan dan ganti data', 'Restore and replace data') + '</button></div>'
            : '<button class="btn ghost" data-act="restore-pick">' + icon('upload') + L('Pilih file backup', 'Choose a backup file') + '</button><p class="err" id="restore-err" role="alert">' + icon('alert', 'sm') + '<span></span></p>') + '</section>';
    }
  };
  function ordinal(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return s[(v - 20) % 10] || s[v] || s[0]; }

  // ================= sheets =================
  var sheet = document.getElementById('sheet');
  var ctx = null, opener = null;
  function openSheet(title, body, foot, c, submit, cls) {
    if (!sheet.open) opener = document.activeElement;
    ctx = c || {};
    sheet.className = 'sheet' + (cls ? ' ' + cls : '');
    sheet.innerHTML = '<form data-submit="' + submit + '" novalidate><div class="grab" aria-hidden="true"></div><div class="sheet-head"><h2 id="sheet-title">' + esc(title) + '</h2>' +
      '<button type="button" class="icon-btn" data-act="sheet-close" aria-label="' + L('Tutup', 'Close') + '">' + icon('x') + '</button></div><div class="sheet-body">' + body + '</div>' + (foot ? '<div class="sheet-foot">' + foot + '</div>' : '') + '</form>';
    if (!sheet.open) sheet.showModal();
    var af = sheet.querySelector('[data-autofocus]');
    if (af) af.focus(); else sheet.querySelector('.sheet-head .icon-btn').focus();
  }
  function closeSheet() {
    if (!sheet.open) return;
    sheet.close();
    // close() hands focus back to the button that opened the sheet. After a tap, let go of it now: an Enter
    // still on its way from the phone keyboard would press that button and open the sheet again.
    if (lastInput !== 'key' && document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
  }
  // keyboard users get focus back where they were; after a tap nothing stays focused (the + button kept a stuck look).
  // Enter or space while typing in a field is not keyboard navigation: the phone keyboard's Go key sends Enter.
  var lastInput = 'pointer';
  document.addEventListener('pointerdown', function () { lastInput = 'pointer'; }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Tab' || e.key === 'Escape' || ((e.key === 'Enter' || e.key === ' ') && !isTextField(e.target))) lastInput = 'key'; }, true);
  sheet.addEventListener('close', function () {
    // The close event arrives a frame after close(). If a new sheet opened in that gap, this event is not about it:
    // emptying it left an invisible modal that blocked the whole page.
    if (sheet.open) return;
    sheet.innerHTML = ''; ctx = null; sheet.className = 'sheet';
    if (opener && document.contains(opener) && lastInput === 'key') { try { opener.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    else if (document.activeElement && document.activeElement !== document.body) { try { document.activeElement.blur(); } catch (e) { /* ignore */ } }
    var fab = document.querySelector('.fab');
    if (fab) fab.classList.remove('spin', 'rippling');
  });
  sheet.addEventListener('click', function (e) { if (e.target === sheet) closeSheet(); });

  function setErr(scope, key, msg) {
    var e = scope.querySelector('#' + key + '-err');
    if (!e) return;
    e.querySelector('span').textContent = msg || '';
    e.classList.toggle('on', !!msg);
    var f = e.closest('.field');
    if (f) f.classList.toggle('bad', !!msg);
  }
  function clearErrs(scope) { scope.querySelectorAll('.err.on').forEach(function (e) { e.classList.remove('on'); var f = e.closest('.field'); if (f) f.classList.remove('bad'); }); }
  function focusFirstErr(scope) {
    var e = scope.querySelector('.err.on');
    if (!e) return;
    var f = e.closest('.field'), inp = f && f.querySelector('input:not([type=radio]), select, input:checked, input');
    if (inp) inp.focus();
  }
  function radioVal(form, name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : ''; }
  function walletChip(name, w, sel) {
    return '<label class="chip"><input type="radio" name="' + name + '" value="' + esc(w.id) + '"' + (sel === w.id ? ' checked' : '') + '><span>' + icon(kindIcon(w.kind), 'sm') + esc(w.name) + CK + '</span></label>';
  }
  function catChip(c, sel) {
    return '<label class="chip"><input type="radio" name="category" value="' + esc(c.id) + '"' + (sel === c.id ? ' checked' : '') + '><span><span class="cdot" style="--c:' + cvar(c.color) + '">' + icon(c.icon, 'sm') + '</span>' + esc(catName(c.id, c)) + CK + '</span></label>';
  }
  // A category picker ends with "+ Kategori baru", which adds one by name inside the same sheet:
  // only one sheet opens at a time, so leaving for the category sheet would lose the amount typed so far.
  function catChips(type, list, sel, show, labelId) {
    return '<div class="chips" role="radiogroup" aria-labelledby="' + labelId + '" data-cats="' + type + '"' + (show ? '' : ' hidden') + '>' + list.map(function (c) { return catChip(c, sel); }).join('') +
      '<button type="button" class="chip-add" data-act="cq-open">' + icon('plus', 'sm') + L('Kategori baru', 'New category') + '</button></div>';
  }
  function catQuickHtml() {
    return '<div class="cq" id="cq" hidden><div class="row"><input class="input grow" id="cq-name" maxlength="30" autocomplete="off" aria-label="' + L('Nama kategori baru', 'New category name') + '" placeholder="' + L('Nama kategori, misal: Laundry', 'Category name, e.g. Laundry') + '">' +
      '<button type="button" class="btn sm" data-act="cq-save">' + L('Tambah', 'Add') + '</button>' +
      '<button type="button" class="icon-btn" data-act="cq-close" aria-label="' + L('Batal bikin kategori', 'Cancel new category') + '">' + icon('x', 'sm') + '</button></div>' + errEl('cq-name') + '</div>' +
      '<p class="hint" id="cq-done" role="status"></p>';
  }
  function cqOpen(form) {
    form.querySelector('#cq').hidden = false;
    form.querySelector('#cq-done').textContent = '';
    form.querySelectorAll('.chip-add').forEach(function (b) { b.hidden = true; });
    form.querySelector('#cq-name').focus();
  }
  function cqClose(form) {
    var inp = form.querySelector('#cq-name');
    inp.value = '';
    setErr(form, 'cq-name', '');
    form.querySelector('#cq').hidden = true;
    form.querySelectorAll('.chip-add').forEach(function (b) { b.hidden = false; });
  }
  // makes the category (or reuses one with the same name) and picks it; returns its id
  function cqSave(form) {
    var inp = form.querySelector('#cq-name'), group = form.querySelector('[data-cats]:not([hidden])');
    if (!inp || !group) return null;
    var type = group.dataset.cats, name = inp.value.trim().replace(/\s+/g, ' ');
    setErr(form, 'cq-name', '');
    if (!name) { setErr(form, 'cq-name', L('Tulis nama kategorinya dulu.', 'Type the category name first.')); inp.focus(); return null; }
    var same = catsList(type, true).filter(function (c) { return catName(c.id, c).toLowerCase() === name.toLowerCase(); })[0];
    var id, msg;
    if (same) {
      id = same.id;
      if (same.archived) { saveMeta('categories', id, { archived: false }); msg = L('Kategori ' + catName(id, same) + ' diaktifkan lagi dari arsip.', 'Category ' + catName(id, same) + ' restored from the archive.'); }
      else msg = L('Kategori ' + catName(id, same) + ' sudah ada, jadi itu yang dipilih.', 'Category ' + catName(id, same) + ' already exists, so it’s picked.');
    } else {
      id = 'c' + C.uid();
      saveMeta('categories', id, { name: name, type: type, icon: 'tag', color: (catsList(type, true).length % 8) + 1, order: Date.now(), archived: false }, true);
      msg = L('Kategori ' + name + ' dibuat. Ikon dan warnanya bisa diganti di Lainnya → Kategori.', 'Category ' + name + ' created. Change its icon and colour in More → Categories.');
    }
    var pickEl = function () { return [].filter.call(group.querySelectorAll('input[name="category"]'), function (i) { return i.value === id; })[0]; };
    if (!pickEl()) group.querySelector('.chip-add').insertAdjacentHTML('beforebegin', catChip(catsList(type).filter(function (c) { return c.id === id; })[0], id));
    var chip = pickEl();
    chip.checked = true;
    setErr(form, 't-cat', ''); setErr(form, 'r-cat', '');
    cqClose(form);
    form.querySelector('#cq-done').textContent = msg;
    // after a tap, just let the phone keyboard go; a focus ring on the chip would look like an error
    if (lastInput === 'key') chip.focus();
    else if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    return id;
  }
  // a name typed but not yet added counts when the whole form is saved
  function cqPending(form) {
    var q = form.querySelector('#cq');
    if (q && !q.hidden && form.querySelector('#cq-name').value.trim()) cqSave(form);
  }
  function moneyField(id, name, label, val, hint, big, extra) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><div class="money' + (big ? ' big' : '') + '"><span>Rp</span><input id="' + id + '" name="' + name + '" class="amt" inputmode="numeric" autocomplete="off" placeholder="0" value="' + (val ? C.num(val) : '') + '"' + (extra || '') + '></div>' +
      (hint ? '<p class="hint">' + hint + '</p>' : '') + errEl(id) + '</div>';
  }
  var optional = function () { return ' <span class="muted">' + L('(boleh kosong)', '(optional)') + '</span>'; };

  // ---- transaction sheet
  // The amount uses an in-page number pad: the phone keyboard would cover the categories and the Save button.
  var KEYS = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '000', '0', '⌫', '+'];
  // Operators are drawn as icons: the font sets ÷ × − + on its math axis, below the key's centre.
  var OPKEYS = {
    '÷': '<path d="M5 12h14"/><circle cx="12" cy="6.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="17.5" r="1.6" fill="currentColor" stroke="none"/>',
    '×': '<path d="m6.5 6.5 11 11"/><path d="m17.5 6.5-11 11"/>',
    '−': '<path d="M5 12h14"/>',
    '+': ICONS.plus
  };
  function keyLabel(k) {
    return {
      '÷': L('bagi', 'divide'), '×': L('kali', 'times'), '−': L('kurang', 'minus'), '+': L('tambah', 'plus'),
      '⌫': L('hapus satu angka', 'delete one digit'), '000': L('tiga nol', 'three zeros')
    }[k] || k;
  }
  function catsByUse(type) {
    var use = C.categoryUsage(S.txs, today());
    return catsList(type).sort(function (a, b) { return (use[b.id] || 0) - (use[a.id] || 0) || byOrder(a, b); });
  }
  function openTx(o) {
    o = o || {};
    if (S.status !== 'ready') { toast(L('Tunggu sebentar, data masih dimuat.', 'One moment, your data is still loading.')); return; }
    var ws = walletsList();
    if (!ws.length) { S.tab = 'home'; render(); toast(L('Bikin wallet dulu, baru bisa mencatat.', 'Make a wallet first, then you can add records.')); return; }
    var ed = o.tx || null, base = ed || o.preset || {};
    var type = ed ? ed.type : (o.type || base.type || 'out');
    var locked = !!(base.debt || base.adjust);
    var wsAll = ed ? walletsList(true).filter(function (w) { return !w.archived || w.id === ed.wallet || w.id === ed.toWallet; }) : ws;
    var lastW = LS.get('lastWallet', null);
    var wSel = base.wallet || (ws.some(function (w) { return w.id === lastW; }) ? lastW : ws[0].id);
    var date = base.date || o.date || today();
    var head = '';
    if (!locked) head = segHtml('type', [['out', L('Pengeluaran', 'Expense')], ['in', L('Pemasukan', 'Income')], ['transfer', 'Transfer']], type, L('Jenis transaksi', 'Transaction type'), 't-type');
    else head = '<p class="banner small" style="box-shadow:none;background:var(--card-2)">' + icon('info', 'sm') + '<span>' + (base.adjust ? L('Ini penyesuaian saldo.', 'This is a balance adjustment.') : L('Ini terhubung ke catatan utang-piutang', 'This is linked to a debt record') + (S.meta.debts[base.debt] ? L(' dengan ', ' with ') + esc(S.meta.debts[base.debt].person) : '') + '.') + '</span></p>';
    var catsOut = catsByUse('out'), catsIn = catsByUse('in');
    // the type switch sits in the sheet's title row, which leaves room for categories above the number pad
    var body = (locked ? head : '') +
      '<div class="field amt-field"><span class="sr" id="t-amount-l">' + L('Jumlah', 'Amount') + '</span>' +
      '<div class="amt-view" role="group" aria-labelledby="t-amount-l"><span class="amt-expr" id="t-expr"></span>' +
      '<span class="amt-big"><span class="rp">Rp</span><output id="t-amt" aria-live="polite">0</output></span>' +
      '<button type="button" class="icon-btn amt-clear" data-act="kp-clear" aria-label="' + L('Hapus jumlah', 'Clear amount') + '" hidden>' + icon('x', 'sm') + '</button></div>' +
      errEl('t-amount') + '</div>' +
      '<div class="field" id="f-cat"' + (type === 'transfer' || locked ? ' hidden' : '') + '><span class="lbl" id="t-cat-l">' + L('Kategori', 'Category') + '</span>' +
      catChips('out', catsOut, base.category, type === 'out', 't-cat-l') + catChips('in', catsIn, base.category, type === 'in', 't-cat-l') +
      catQuickHtml() + errEl('t-cat') + '</div>' +
      '<div class="field"><span class="lbl" id="t-wallet-l">' + (type === 'in' ? L('Ke wallet', 'To wallet') : L('Dari wallet', 'From wallet')) + '</span><div class="chips" role="radiogroup" aria-labelledby="t-wallet-l">' + wsAll.map(function (w) { return walletChip('wallet', w, wSel); }).join('') + '</div>' + errEl('t-wallet') + '</div>' +
      '<div class="field" id="f-to"' + (type === 'transfer' ? '' : ' hidden') + '><span class="lbl" id="t-to-l">' + L('Ke wallet', 'To wallet') + '</span><div class="chips" role="radiogroup" aria-labelledby="t-to-l">' + wsAll.map(function (w) { return walletChip('toWallet', w, base.toWallet || ''); }).join('') + '</div>' + errEl('t-to') + '</div>' +
      '<div id="f-fee"' + (type === 'transfer' ? '' : ' hidden') + '>' + moneyField('t-fee', 'fee', L('Biaya admin', 'Admin fee') + ' <span class="muted">' + L('(kalau ada)', '(if any)') + '</span>', base.fee, L('Dicatat sebagai pengeluaran "Biaya Admin".', 'Recorded as an "Admin Fees" expense.')) + '</div>' +
      '<div class="field"><label for="t-date">' + L('Tanggal', 'Date') + '</label><div class="datechips"><button type="button" class="btn sm soft" data-act="t-date" data-v="' + today() + '">' + L('Hari ini', 'Today') + '</button><button type="button" class="btn sm soft" data-act="t-date" data-v="' + C.addDays(today(), -1) + '">' + L('Kemarin', 'Yesterday') + '</button>' +
      '<input type="date" id="t-date" name="date" class="input" max="' + today() + '" min="2000-01-01" value="' + date + '" data-input="t-date"></div><p class="hint" id="t-date-label">' + C.dayLong(date) + '</p>' + errEl('t-date') + '</div>' +
      '<div class="field"><label for="t-note">' + L('Keterangan', 'Note') + optional() + '</label><input id="t-note" name="note" class="input" maxlength="120" autocomplete="off" value="' + esc(base.note || '') + '" placeholder="' + L('Misal: nasi padang + es teh', 'For example: lunch with friends') + '"></div>' +
      (ed ? '<div class="stack" style="border-top:1px solid var(--line);padding-top:16px;margin-top:6px"><button type="button" class="btn danger" data-act="tx-del">' + icon('x', 'sm') + L('Hapus transaksi ini', 'Delete this transaction') + '</button></div>' : '');
    var keypad = '<div class="keypad" role="group" aria-label="' + L('Papan angka', 'Number pad') + '">' + KEYS.map(function (k) {
      return '<button type="button" class="key' + (OPKEYS[k] ? ' op' : k === '⌫' ? ' del' : '') + '" data-act="kp" data-v="' + k + '" aria-label="' + keyLabel(k) + '">' + (k === '⌫' ? icon('backspace') : OPKEYS[k] ? '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + OPKEYS[k] + '</svg>' : k) + '</button>';
    }).join('') + '</div>';
    var foot = keypad + '<button class="btn primary" type="submit">' + icon('check') + (ed ? L('Simpan perubahan', 'Save changes') : L('Simpan', 'Save')) + '</button>';
    openSheet(o.title || (ed ? L('Ubah transaksi', 'Edit transaction') : L('Catat transaksi', 'Add transaction')), body, foot,
      { ed: ed, base: base, locked: locked, after: o.after, expr: base.amount ? String(base.amount) : '' }, 'tx', 'tx-sheet');
    if (!locked) {
      var h2 = sheet.querySelector('.sheet-head h2');
      h2.classList.add('sr');
      h2.insertAdjacentHTML('afterend', head);
    }
    updateAmt();
  }
  function updateAmt() {
    var out = document.getElementById('t-amt'), ex = document.getElementById('t-expr');
    if (!out || !ctx || ctx.expr == null) return;
    var e = ctx.expr, v = C.evalExpr(e);
    out.textContent = isNaN(v) ? '—' : (v < 0 ? '−' : '') + C.num(v);
    out.classList.toggle('zero', !e);
    ex.textContent = C.hasOp(e) ? C.fmtExpr(e) + ' =' : '';
    var clr = sheet.querySelector('.amt-clear');
    if (clr) clr.hidden = !e;
  }
  function kpPress(k) {
    if (!ctx || ctx.expr == null) return;
    var e = ctx.expr, isOp = /[+−×÷]/;
    if (k === '⌫') e = e.slice(0, -1);
    else if (OPKEYS[k]) {
      if (!e) return;
      e = isOp.test(e.slice(-1)) ? e.slice(0, -1) + k : e + k;
    } else {
      var cur = (e.match(/(\d*)$/) || ['', ''])[1];
      if (k === '000' && (!cur || cur === '0')) return;
      if (cur === '0') { e = e.slice(0, -1); cur = ''; }
      if ((cur + k).length > 12) return;
      e += k;
    }
    ctx.expr = e;
    var form = sheet.querySelector('form');
    if (form) setErr(form, 't-amount', '');
    updateAmt();
  }
  function isTextField(t) {
    return !!t && ((t.tagName === 'INPUT' && ['radio', 'checkbox', 'button', 'submit'].indexOf(t.type) < 0) || t.tagName === 'TEXTAREA');
  }
  // typing a note or a fee uses the phone keyboard, so the number pad steps aside; a date field opens a calendar instead
  function usesKeyboard(t) { return isTextField(t) && t.type !== 'date'; }
  sheet.addEventListener('focusin', function (e) { sheet.classList.toggle('kp-off', usesKeyboard(e.target)); });
  sheet.addEventListener('focusout', function () {
    setTimeout(function () { if (!usesKeyboard(document.activeElement)) sheet.classList.remove('kp-off'); }, 0);
  });
  // Enter in the new-category box adds the category instead of saving the whole form; Escape closes only that box
  sheet.addEventListener('keydown', function (e) {
    if (e.target.id !== 'cq-name') return;
    if (e.key === 'Enter') { e.preventDefault(); cqSave(e.target.form); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); var f = e.target.form; cqClose(f); f.querySelector('[data-cats]:not([hidden]) .chip-add').focus(); }
  });
  // laptop: digits and + - * / work straight from the keyboard
  document.addEventListener('keydown', function (e) {
    if (!sheet.open || !ctx || ctx.expr == null) return;
    var t = e.target;
    if (isTextField(t) || (t && t.tagName === 'SELECT')) return;
    var map = { '/': '÷', '*': '×', 'x': '×', '-': '−', '+': '+', 'Backspace': '⌫' };
    var k = /^[0-9]$/.test(e.key) ? e.key : map[e.key];
    if (k) { e.preventDefault(); kpPress(k); return; }
    if (e.key === 'Enter' && !(t && t.tagName === 'BUTTON')) {
      e.preventDefault();
      var f = sheet.querySelector('form');
      if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  });
  function submitTx(form) {
    var c = ctx, base = c.base;
    var type = c.locked ? base.type : (radioVal(form, 'type') || 'out');
    var amount = C.evalExpr(c.expr);
    var wallet = radioVal(form, 'wallet');
    var toWallet = type === 'transfer' ? radioVal(form, 'toWallet') : '';
    var catEl = form.querySelector('[data-cats="' + type + '"] input:checked');
    var category = type === 'transfer' || c.locked ? null : (catEl ? catEl.value : '');
    var date = form.elements.date.value;
    var fee = type === 'transfer' ? C.parseAmount(form.elements.fee.value) : 0;
    if (type !== 'transfer' && !c.locked) { cqPending(form); catEl = form.querySelector('[data-cats="' + type + '"] input:checked'); category = catEl ? catEl.value : ''; }
    clearErrs(form);
    var bad = false;
    if (isNaN(amount)) { setErr(form, 't-amount', L('Hitungannya gak valid, misalnya ada bagi nol.', 'That sum doesn’t work, for example a division by zero.')); bad = true; }
    else if (amount < 0) { setErr(form, 't-amount', L('Hasil hitungannya minus. Cek lagi angkanya.', 'The result is below zero. Check the numbers again.')); bad = true; }
    else if (!(amount > 0)) { setErr(form, 't-amount', L('Isi jumlahnya dulu pakai papan angka di bawah.', 'Enter the amount first with the number pad below.')); bad = true; }
    else if (amount > 1e12) { setErr(form, 't-amount', L('Jumlahnya kebesaran. Cek lagi angkanya.', 'That amount is too large. Check the number again.')); bad = true; }
    if (!wallet) { setErr(form, 't-wallet', L('Pilih wallet-nya.', 'Pick a wallet.')); bad = true; }
    if (type === 'transfer') {
      if (!toWallet) { setErr(form, 't-to', L('Pilih wallet tujuannya.', 'Pick the wallet it goes to.')); bad = true; }
      else if (toWallet === wallet) { setErr(form, 't-to', L('Wallet asal dan tujuan harus beda.', 'The from and to wallets must be different.')); bad = true; }
      if (fee > 1e9) { setErr(form, 't-fee', L('Biaya admin kebesaran. Cek lagi angkanya.', 'That admin fee is too large. Check the number again.')); bad = true; }
    }
    if (type !== 'transfer' && !c.locked && !category) { setErr(form, 't-cat', L('Pilih kategorinya.', 'Pick a category.')); bad = true; }
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) { setErr(form, 't-date', L('Isi tanggalnya.', 'Enter the date.')); bad = true; }
    else if (date > today()) { setErr(form, 't-date', L('Tanggal gak boleh lewat dari hari ini.', 'The date can’t be later than today.')); bad = true; }
    if (bad) {
      var first = form.querySelector('.err.on');
      if (first) first.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      return;
    }
    form.querySelector('[type=submit]').disabled = true;
    var tx = {
      date: date, type: type, amount: amount, wallet: wallet, toWallet: type === 'transfer' ? toWallet : null,
      category: category || null, fee: fee || 0, note: form.elements.note.value.trim().slice(0, 120),
      debt: base.debt || null, debtRole: base.debtRole || null, recurring: base.recurring || null, adjust: !!base.adjust,
      createdAt: c.ed ? (c.ed.createdAt || Date.now()) : Date.now(), deleted: false
    };
    LS.set('lastWallet', wallet);
    var after = c.after;
    closeSheet();
    if (c.ed) {
      var oldYm = c.ed.ym, newYm = C.ymOf(date);
      if (oldYm === newYm) saveTx(c.ed.id, tx);
      else { patchTx(c.ed.id, oldYm, { deleted: true }); saveTx(C.uid(), tx); }
      toast(L('Perubahan disimpan.', 'Changes saved.'), null, 'ok');
      return;
    }
    recordNew(tx, after);
  }
  // save a brand-new transaction with an Undo toast
  function recordNew(tx, after, label) {
    var note = budgetNote(tx);
    var id = C.uid();
    flash(id);
    saveTx(id, tx);
    if (after) after(id, tx);
    toast((label || L('Tersimpan · ', 'Saved · ')) + wname(tx.wallet) + ' ' + (tx.type === 'in' ? '+' : tx.type === 'out' ? '−' : '') + C.rp(tx.amount) + (tx.type === 'transfer' ? L(' ke ', ' to ') + wname(tx.toWallet) : '') + note,
      { label: L('Batalkan', 'Undo'), fn: function () { patchTx(id, C.ymOf(tx.date), { deleted: true }); if (after && after.undo) after.undo(); } }, 'ok');
    return id;
  }
  function budgetNote(tx) {
    if (tx.type !== 'out' || tx.adjust || tx.debt || !tx.category) return '';
    var lim = S.meta.budgets[tx.category];
    if (!(lim > 0)) return '';
    var ym = C.ymOf(tx.date);
    var before = C.summarize(S.flows, function (f) { return f.date.slice(0, 7) === ym && f.category === tx.category && f.type === 'out'; }).out;
    var after = before + tx.amount, name = catName(tx.category);
    if (before <= lim && after > lim) return L('. ' + name + ' lewat budget.', '. ' + name + ' is over budget.');
    if (before < lim * 0.8 && after >= lim * 0.8) return L('. ' + name + ' sudah ' + Math.round(after / lim * 100) + '% dari budget.', '. ' + name + ' is at ' + Math.round(after / lim * 100) + '% of its budget.');
    return '';
  }
  function flash(id) { S.flashId = id; }

  // ---- wallet sheet
  function openWallet(id) {
    var w = id ? S.meta.wallets[id] : null;
    var body = walletFields(w || {}, 'ws', !w);
    if (w) {
      var bal = S.bal[id] || 0;
      body += '<div class="field" style="border-top:1px solid var(--line);padding-top:16px"><span class="lbl">' + L('Sesuaikan saldo', 'Fix the balance') + '</span><p class="hint">' + L('Saldo di aplikasi sekarang ', 'The app shows ') + '<b class="num">' + C.rp(bal) + '</b>' + L('. Kalau beda sama aslinya karena ada yang lupa dicatat, isi saldo aslinya di sini.', '. If that’s different from the real amount because something wasn’t recorded, enter the real balance here.') + '</p>' +
        '<div class="row" style="align-items:flex-start;flex-wrap:wrap"><div class="money grow" style="min-width:160px"><span>Rp</span><input id="ws-real" class="amt" inputmode="numeric" autocomplete="off" placeholder="' + L('Saldo asli', 'Real balance') + '" aria-label="' + L('Saldo asli sekarang', 'Real balance now') + '"></div><button type="button" class="btn" data-act="w-adjust">' + L('Sesuaikan', 'Fix') + '</button></div>' + errEl('ws-real') + '</div>' +
        '<div class="stack" style="border-top:1px solid var(--line);padding-top:16px"><p class="hint">' + L('Wallet yang diarsipkan hilang dari daftar dan dari total saldo, tapi riwayatnya tetap ada.', 'An archived wallet leaves the list and the total balance, but its history stays.') + (bal ? L(' Saldonya sekarang masih ', ' It still holds ') + C.rp(bal) + '.' : '') + '</p><button type="button" class="btn danger" data-act="w-archive">' + L('Arsipkan wallet', 'Archive wallet') + '</button></div>';
    }
    openSheet(w ? L('Ubah wallet', 'Edit wallet') : L('Wallet baru', 'New wallet'), body, '<button class="btn primary" type="submit">' + icon('check') + (w ? L('Simpan perubahan', 'Save changes') : L('Simpan wallet', 'Save wallet')) + '</button>', { id: id }, 'wallet');
  }
  function submitWallet(form) {
    var id = form.closest('dialog') && ctx ? ctx.id : null;
    var p = form.querySelector('[name=name]').id.split('-')[0];
    var name = form.elements.name.value.trim();
    clearErrs(form);
    if (!name) { setErr(form, p + '-name', L('Kasih nama wallet-nya dulu.', 'Give the wallet a name first.')); focusFirstErr(form); return; }
    var dup = walletsList().some(function (w) { return w.id !== id && w.name.toLowerCase() === name.toLowerCase(); });
    if (dup) { setErr(form, p + '-name', L('Nama ini sudah dipakai wallet lain.', 'Another wallet already uses this name.')); focusFirstErr(form); return; }
    var data = { name: name, kind: radioVal(form, 'kind') || 'cash', color: radioVal(form, 'color') || 'oranye', initial: C.parseAmount(form.elements.initial.value) };
    if (!id) {
      data.order = Date.now(); data.createdAt = Date.now(); data.archived = false;
      var first = !walletsList(true).length;
      saveMeta('wallets', 'w' + C.uid(), data, true);
      closeSheet();
      toast(first ? L('Wallet ' + name + ' dibuat. Tambah wallet lain lewat kartu "Tambah wallet".', 'Wallet ' + name + ' created. Add more with the "Add wallet" card.') : L('Wallet ' + name + ' dibuat.', 'Wallet ' + name + ' created.'), null, 'ok');
    } else {
      saveMeta('wallets', id, data);
      closeSheet();
      toast(L('Wallet disimpan.', 'Wallet saved.'), null, 'ok');
    }
  }

  // ---- category sheet
  function openCat(id, type) {
    var c = id ? S.meta.categories[id] : null;
    type = c ? c.type : (type || 'out');
    var color = c ? c.color : ((catsList(type, true).length % 8) + 1);
    var ic = c ? c.icon : 'tag';
    var body = (c ? '' : segHtml('ctype', [['out', L('Pengeluaran', 'Expense')], ['in', L('Pemasukan', 'Income')]], type, L('Jenis kategori', 'Category type'))) +
      '<div class="field"><label for="c-name">' + L('Nama kategori', 'Category name') + '</label><input class="input" id="c-name" name="name" maxlength="30" autocomplete="off" value="' + esc(c ? catName(id, c) : '') + '" placeholder="' + L('Misal: Catering, Skincare', 'For example: Catering, Skincare') + '"' + (c ? '' : ' data-autofocus') + '>' + errEl('c-name') + '</div>' +
      '<div class="field"><span class="lbl" id="c-icon-l">' + L('Ikon', 'Icon') + '</span><div class="iconpick" role="radiogroup" aria-labelledby="c-icon-l">' + CAT_ICONS.map(function (n) {
        return '<label><input type="radio" name="icon" value="' + n + '" aria-label="' + n + '"' + (ic === n ? ' checked' : '') + '><span>' + icon(n) + '</span></label>';
      }).join('') + '</div></div>' +
      '<div class="field"><span class="lbl" id="c-color-l">' + L('Warna di diagram', 'Chart colour') + '</span><div class="colorpick" role="radiogroup" aria-labelledby="c-color-l">' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (s) {
        return '<label><input type="radio" name="color" value="' + s + '" aria-label="' + L(SLOTS[s][0], SLOTS[s][1]) + '"' + (color === s ? ' checked' : '') + '><span style="background:' + cvar(s) + '">' + icon('check') + '</span></label>';
      }).join('') + '</div></div>' +
      (c ? '<div class="stack" style="border-top:1px solid var(--line);padding-top:16px"><p class="hint">' + L('Kategori yang diarsipkan gak muncul lagi waktu mencatat. Transaksi lamanya tetap aman.', 'An archived category no longer shows when you add records. Its old transactions stay safe.') + '</p><button type="button" class="btn danger" data-act="c-archive">' + L('Arsipkan kategori', 'Archive category') + '</button></div>' : '');
    openSheet(c ? L('Ubah kategori', 'Edit category') : L('Kategori baru', 'New category'), body, '<button class="btn primary" type="submit">' + icon('check') + L('Simpan kategori', 'Save category') + '</button>', { id: id, type: type }, 'cat');
  }
  function submitCat(form) {
    var id = ctx.id, type = id ? ctx.type : (radioVal(form, 'ctype') || ctx.type);
    var name = form.elements.name.value.trim();
    clearErrs(form);
    if (!name) { setErr(form, 'c-name', L('Kasih nama kategorinya dulu.', 'Give the category a name first.')); focusFirstErr(form); return; }
    if (catsList(type).some(function (c) { return c.id !== id && catName(c.id, c).toLowerCase() === name.toLowerCase(); })) { setErr(form, 'c-name', L('Nama ini sudah dipakai.', 'This name is already used.')); focusFirstErr(form); return; }
    var data = { icon: radioVal(form, 'icon') || 'tag', color: +radioVal(form, 'color') || 1 };
    // keep the stored default name unless he actually renamed it
    if (!id || name !== catName(id)) data.name = name;
    if (!id) { data.type = type; data.order = Date.now(); data.archived = false; saveMeta('categories', 'c' + C.uid(), data, true); }
    else saveMeta('categories', id, data);
    closeSheet();
    toast(L('Kategori ' + name + ' disimpan.', 'Category ' + name + ' saved.'), null, 'ok');
  }

  // ---- recurring sheet (monthly on a day, or every N days like catering)
  function openRec(id) {
    var r = id ? S.meta.recurring[id] : null;
    var type = r ? r.type : 'out', ws = walletsList();
    if (!ws.length) { toast(L('Bikin wallet dulu.', 'Make a wallet first.')); return; }
    var freq = r && r.freq === 'days' ? 'days' : 'monthly';
    var wSel = r ? r.wallet : ws[0].id;
    var day = r && r.day ? r.day : +today().slice(8, 10);
    var every = r && r.every ? r.every : '';
    var next = r && r.next ? r.next : today();
    var dayOpts = ''; for (var d = 1; d <= 31; d++) dayOpts += '<option value="' + d + '"' + (d === day ? ' selected' : '') + '>' + L('Tanggal ' + d, d + ordinal(d)) + '</option>';
    var body = segHtml('rtype', [['out', L('Pengeluaran', 'Expense')], ['in', L('Pemasukan', 'Income')]], type, L('Jenis', 'Type'), 'r-type') +
      '<div class="field"><label for="r-note">' + L('Nama', 'Name') + '</label><input class="input" id="r-note" name="note" maxlength="60" autocomplete="off" value="' + esc(r ? r.note : '') + '" placeholder="' + L('Misal: Kost, Catering, Spotify', 'For example: Rent, Catering, Spotify') + '"' + (r ? '' : ' data-autofocus') + '>' + errEl('r-note') + '</div>' +
      moneyField('r-amount', 'amount', L('Jumlah tiap kali bayar', 'Amount each time'), r && r.amount) +
      '<div class="field"><span class="lbl" id="r-wallet-l">Wallet</span><div class="chips" role="radiogroup" aria-labelledby="r-wallet-l">' + walletsList(true).filter(function (w) { return !w.archived || (r && w.id === r.wallet); }).map(function (w) { return walletChip('wallet', w, wSel); }).join('') + '</div>' + errEl('r-wallet') + '</div>' +
      '<div class="field"><span class="lbl" id="r-cat-l">' + L('Kategori', 'Category') + '</span>' +
      catChips('out', catsList('out'), r && r.category, type === 'out', 'r-cat-l') + catChips('in', catsList('in'), r && r.category, type === 'in', 'r-cat-l') +
      catQuickHtml() + errEl('r-cat') + '</div>' +
      '<div class="field"><span class="lbl">' + L('Seberapa sering', 'How often') + '</span>' + segHtml('rfreq', [['monthly', L('Tiap bulan', 'Monthly')], ['days', L('Tiap beberapa hari', 'Every few days')]], freq, L('Seberapa sering', 'How often'), 'r-freq') + '</div>' +
      '<div class="field" id="r-monthly"' + (freq === 'monthly' ? '' : ' hidden') + '><span class="lbl">' + L('Tiap tanggal', 'Day of the month') + '</span>' + selectHtml('r-day', L('Tiap tanggal', 'Day of the month'), dayOpts, ' name="day" data-change="r-day"') + '<p class="hint" id="r-day-hint">' + recHint(day, r && r.freq !== 'days' ? r : null) + '</p></div>' +
      '<div id="r-days"' + (freq === 'days' ? '' : ' hidden') + ' class="stack">' +
      '<div class="field"><label for="r-every">' + L('Tiap berapa hari', 'Every how many days') + '</label><input class="input" id="r-every" name="every" inputmode="numeric" autocomplete="off" maxlength="3" value="' + every + '" placeholder="' + L('Misal: 28', 'For example: 28') + '" style="max-width:10rem">' +
      '<p class="hint">' + L('Contoh: catering yang habis sekitar 4 minggu = 28 hari.', 'Example: catering that runs out in about 4 weeks = 28 days.') + '</p>' + errEl('r-every') + '</div>' +
      '<div class="field"><label for="r-next">' + L('Jatuh tempo berikutnya', 'Next due date') + '</label><input type="date" class="input" id="r-next" name="next" value="' + next + '" min="2000-01-01">' + errEl('r-next') + '</div></div>' +
      (r ? '<label class="check"><input type="checkbox" name="active"' + (r.active !== false ? ' checked' : '') + '>' + L('Aktif', 'Active') + '</label>' +
        '<div class="stack" style="border-top:1px solid var(--line);padding-top:16px"><p class="hint">' + L('Bayar lebih cepat dari jadwal? Catat sekarang, jadwal berikutnya ikut menyesuaikan.', 'Paid earlier than planned? Record it now and the next date adjusts.') + '</p>' +
        '<button type="button" class="btn soft" data-act="rec-now">' + icon('check', 'sm') + L('Catat sekarang', 'Record now') + '</button>' +
        '<button type="button" class="btn danger" data-act="rec-del">' + L('Hapus transaksi rutin', 'Delete recurring transaction') + '</button></div>' : '');
    openSheet(r ? L('Ubah transaksi rutin', 'Edit recurring transaction') : L('Transaksi rutin baru', 'New recurring transaction'), body, '<button class="btn primary" type="submit">' + icon('check') + L('Simpan', 'Save') + '</button>', { id: id }, 'rec');
  }
  function recHint(day, r) {
    var td = today();
    var first = r ? C.nextDue(r, td) : (function () { var ym = C.recurringFirstYM(day, td); return ym + '-' + C.pad(Math.min(day, C.daysInMonth(ym))); })();
    return (r ? L('Berikutnya muncul ', 'Next shows on ') : L('Pertama muncul ', 'First shows on ')) + C.dayLong(first) + L('. Kalau bulannya lebih pendek, dipakai tanggal terakhir.', '. In shorter months, the last day is used.');
  }
  function submitRec(form) {
    var id = ctx.id, r = id ? S.meta.recurring[id] : null;
    var type = radioVal(form, 'rtype') || 'out', freq = radioVal(form, 'rfreq') || 'monthly';
    var note = form.elements.note.value.trim(), amount = C.parseAmount(form.elements.amount.value), wallet = radioVal(form, 'wallet');
    var catEl = form.querySelector('[data-cats="' + type + '"] input:checked'), day = +form.elements.day.value;
    var every = parseInt(form.elements.every.value, 10), next = form.elements.next.value;
    cqPending(form); catEl = form.querySelector('[data-cats="' + type + '"] input:checked');
    clearErrs(form);
    var bad = false;
    if (!note) { setErr(form, 'r-note', L('Kasih nama, misalnya "Kost".', 'Give it a name, like "Rent".')); bad = true; }
    if (!(amount > 0)) { setErr(form, 'r-amount', L('Isi jumlahnya dulu.', 'Enter the amount first.')); bad = true; }
    if (!wallet) { setErr(form, 'r-wallet', L('Pilih wallet-nya.', 'Pick a wallet.')); bad = true; }
    if (!catEl) { setErr(form, 'r-cat', L('Pilih kategorinya.', 'Pick a category.')); bad = true; }
    if (freq === 'days') {
      if (!(every >= 1 && every <= 365)) { setErr(form, 'r-every', L('Isi angka 1 sampai 365.', 'Enter a number from 1 to 365.')); bad = true; }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(next)) { setErr(form, 'r-next', L('Isi tanggalnya.', 'Enter the date.')); bad = true; }
    }
    if (bad) { focusFirstErr(form); return; }
    var data = { type: type, note: note, amount: amount, wallet: wallet, category: catEl.value, freq: freq };
    if (freq === 'days') { data.every = every; data.next = next; data.day = null; }
    else {
      data.day = day; data.every = null; data.next = null;
      if (!r || r.freq === 'days' || !r.lastDone) data.lastDone = C.addMonths(C.recurringFirstYM(day, today()), -1);
    }
    if (r) { data.active = form.elements.active.checked; saveMeta('recurring', id, data); }
    else { data.active = true; data.createdAt = Date.now(); data.deleted = false; saveMeta('recurring', 'r' + C.uid(), data, true); }
    closeSheet();
    toast(L('Transaksi rutin ' + note + ' disimpan.', 'Recurring ' + note + ' saved.'), null, 'ok');
  }
  // the schedule fields a recording moves forward, and how to put them back
  function recAdvance(r, paidOn, fromDue) {
    if (r.freq === 'days') return { next: C.addDays(fromDue ? (r.next || paidOn) : paidOn, r.every || 1) };
    return { lastDone: thisYM() };
  }
  function recSnapshot(r) { return r.freq === 'days' ? { next: r.next || null } : { lastDone: r.lastDone || null }; }
  function doRecurring(id, now) {
    var r = S.meta.recurring[id];
    if (!r) return;
    var due = C.dueRecurring((function () { var o = {}; o[id] = r; return o; })(), today())[0];
    var date = !now && due ? due.dueDate : today(), prev = recSnapshot(r);
    var w = S.meta.wallets[r.wallet], c = S.meta.categories[r.category];
    var after = function () { saveMeta('recurring', id, recAdvance(r, date, !now)); };
    after.undo = function () { saveMeta('recurring', id, prev); };
    if (!w || w.archived || !c || c.archived) {
      openTx({ type: r.type, preset: { type: r.type, amount: r.amount, wallet: w && !w.archived ? r.wallet : '', category: c && !c.archived ? r.category : '', note: r.note, date: date, recurring: id }, after: after });
      return;
    }
    recordNew({ date: date, type: r.type, amount: r.amount, wallet: r.wallet, toWallet: null, category: r.category, fee: 0, note: r.note, debt: null, debtRole: null, recurring: id, adjust: false, createdAt: Date.now(), deleted: false },
      after, r.note + L(' dicatat · ', ' recorded · '));
  }
  // ---- goal sheet
  function openGoal(id) {
    var g = id ? S.meta.goals[id] : null;
    var ws = walletsList();
    var body = '<div class="field"><label for="g-name">' + L('Nama target', 'Goal name') + '</label><input class="input" id="g-name" name="name" maxlength="40" autocomplete="off" value="' + esc(g ? g.name : '') + '" placeholder="' + L('Misal: Laptop baru', 'For example: New laptop') + '"' + (g ? '' : ' data-autofocus') + '>' + errEl('g-name') + '</div>' +
      moneyField('g-target', 'target', L('Jumlah target', 'Target amount'), g && g.target) +
      '<div class="field"><label for="g-wallet">' + L('Wallet tabungannya', 'Savings wallet') + '</label>' + selectHtml('g-wallet', L('Wallet tabungannya', 'Savings wallet'),
        (g ? '' : '<option value="__new">' + L('Bikin wallet baru dengan nama target ini', 'Make a new wallet named after this goal') + '</option>') +
        ws.map(function (w) { return '<option value="' + esc(w.id) + '"' + (g && g.wallet === w.id ? ' selected' : '') + '>' + esc(w.name) + ' (' + C.rp(S.bal[w.id] || 0) + ')</option>'; }).join(''), ' name="wallet"') +
      '<p class="hint">' + L('Progres target = saldo wallet ini. Paling enak pakai wallet khusus.', 'Goal progress = this wallet’s balance. A dedicated wallet works best.') + '</p></div>' +
      '<div class="field"><label for="g-deadline">' + L('Tenggat', 'Deadline') + optional() + '</label><input type="date" id="g-deadline" name="deadline" class="input" min="' + today() + '" value="' + (g && g.deadline ? g.deadline : '') + '">' + errEl('g-deadline') + '</div>' +
      (g ? '<div class="stack" style="border-top:1px solid var(--line);padding-top:16px"><p class="hint">' + L('Menghapus target gak menghapus wallet dan uangnya.', 'Deleting a goal doesn’t delete its wallet or the money.') + '</p><button type="button" class="btn danger" data-act="goal-del">' + L('Hapus target', 'Delete goal') + '</button></div>' : '');
    openSheet(g ? L('Ubah target', 'Edit goal') : L('Target tabungan baru', 'New savings goal'), body, '<button class="btn primary" type="submit">' + icon('check') + L('Simpan target', 'Save goal') + '</button>', { id: id }, 'goal');
  }
  function submitGoal(form) {
    var id = ctx.id, name = form.elements.name.value.trim(), target = C.parseAmount(form.elements.target.value);
    var wallet = form.elements.wallet.value, deadline = form.elements.deadline.value || null;
    clearErrs(form);
    var bad = false;
    if (!name) { setErr(form, 'g-name', L('Kasih nama targetnya.', 'Give the goal a name.')); bad = true; }
    if (!(target > 0)) { setErr(form, 'g-target', L('Isi jumlah targetnya.', 'Enter the target amount.')); bad = true; }
    if (deadline && deadline < today()) { setErr(form, 'g-deadline', L('Tenggat harus hari ini atau nanti.', 'The deadline must be today or later.')); bad = true; }
    if (bad) { focusFirstErr(form); return; }
    if (wallet === '__new') {
      wallet = 'w' + C.uid();
      saveMeta('wallets', wallet, { name: name, kind: 'tabungan', color: 'hijau', initial: 0, order: Date.now(), createdAt: Date.now(), archived: false }, true);
    }
    var data = { name: name, target: target, wallet: wallet, deadline: deadline };
    if (id) saveMeta('goals', id, data);
    else { data.createdAt = Date.now(); data.deleted = false; saveMeta('goals', 'g' + C.uid(), data, true); }
    closeSheet();
    toast(L('Target ' + name + ' disimpan.', 'Goal ' + name + ' saved.'), null, 'ok');
  }

  // ---- debt sheets
  function debtWalletHint(dir) { return dir === 'lent' ? L('Uangnya keluar dari wallet ini, tapi gak dihitung sebagai pengeluaran.', 'The money leaves this wallet, but it doesn’t count as spending.') : L('Uangnya masuk ke wallet ini, tapi gak dihitung sebagai pemasukan.', 'The money goes into this wallet, but it doesn’t count as income.'); }
  function openDebt(id) {
    var d = id ? S.meta.debts[id] : null;
    var dir = d ? d.direction : S.debtTab;
    var body = segHtml('ddir', [['lent', L('Dia utang ke aku', 'They owe me')], ['borrowed', L('Aku utang ke dia', 'I owe them')]], dir, L('Arah utang', 'Who owes whom'), 'd-dir') +
      '<div class="field"><label for="d-person">' + L('Nama orangnya', 'Their name') + '</label><input class="input" id="d-person" name="person" maxlength="40" autocomplete="off" value="' + esc(d ? d.person : '') + '"' + (d ? '' : ' data-autofocus') + '>' + errEl('d-person') + '</div>' +
      moneyField('d-amount', 'amount', L('Jumlah', 'Amount'), d && d.amount) +
      '<div class="field"><label for="d-date">' + L('Tanggal pinjam', 'Date borrowed') + '</label><input type="date" id="d-date" name="date" class="input" max="' + today() + '" value="' + (d ? d.date : today()) + '">' + errEl('d-date') + '</div>' +
      '<div class="field"><label for="d-due">' + L('Jatuh tempo', 'Due date') + optional() + '</label><input type="date" id="d-due" name="due" class="input" value="' + (d && d.due ? d.due : '') + '"></div>' +
      '<div class="field"><label for="d-note">' + L('Keterangan', 'Note') + optional() + '</label><input class="input" id="d-note" name="note" maxlength="120" autocomplete="off" value="' + esc(d ? d.note || '' : '') + '"></div>' +
      (d ? '' : '<div class="field"><label for="d-wallet">' + L('Catat uangnya di wallet', 'Record the money in a wallet') + '</label>' + selectHtml('d-wallet', L('Catat uangnya di wallet', 'Record the money in a wallet'),
        '<option value="">' + L('Jangan dicatat (utang lama)', 'Don’t record it (an old debt)') + '</option>' +
        walletsList().map(function (w, i) { return '<option value="' + esc(w.id) + '"' + (i === 0 ? ' selected' : '') + '>' + esc(w.name) + '</option>'; }).join(''), ' name="wallet"') +
        '<p class="hint" id="d-wallet-hint">' + debtWalletHint(dir) + '</p></div>');
    openSheet(d ? L('Ubah utang-piutang', 'Edit debt') : L('Utang-piutang baru', 'New debt'), body, '<button class="btn primary" type="submit">' + icon('check') + L('Simpan', 'Save') + '</button>', { id: id }, 'debt');
  }
  function submitDebt(form) {
    var id = ctx.id, dir = radioVal(form, 'ddir') || 'lent';
    var person = form.elements.person.value.trim(), amount = C.parseAmount(form.elements.amount.value), date = form.elements.date.value;
    clearErrs(form);
    var bad = false;
    if (!person) { setErr(form, 'd-person', L('Isi nama orangnya.', 'Enter their name.')); bad = true; }
    if (!(amount > 0)) { setErr(form, 'd-amount', L('Isi jumlahnya.', 'Enter the amount.')); bad = true; }
    if (!date || date > today()) { setErr(form, 'd-date', L('Tanggal gak boleh kosong atau lewat dari hari ini.', 'The date can’t be empty or later than today.')); bad = true; }
    if (bad) { focusFirstErr(form); return; }
    var data = { person: person, direction: dir, amount: amount, date: date, due: form.elements.due.value || null, note: form.elements.note.value.trim() };
    var wallet = form.elements.wallet ? form.elements.wallet.value : '';
    closeSheet();
    if (id) { saveMeta('debts', id, data); toast(L('Disimpan.', 'Saved.'), null, 'ok'); return; }
    var did = 'd' + C.uid();
    data.createdAt = Date.now(); data.deleted = false;
    saveMeta('debts', did, data, true);
    if (wallet) {
      saveTx(C.uid(), { date: date, type: dir === 'lent' ? 'out' : 'in', amount: amount, wallet: wallet, toWallet: null, category: null, fee: 0, note: data.note, debt: did, debtRole: 'start', recurring: null, adjust: false, createdAt: Date.now(), deleted: false });
    }
    S.debtTab = dir;
    toast(dir === 'lent' ? L(person + ' utang ' + C.rp(amount) + ' dicatat.', person + ' owes ' + C.rp(amount) + '. Recorded.') : L('Utang ke ' + person + ' ' + C.rp(amount) + ' dicatat.', 'You owe ' + person + ' ' + C.rp(amount) + '. Recorded.'), null, 'ok');
  }
  function openDebtDetail(id) {
    var d = S.meta.debts[id];
    if (!d) return;
    var st = C.debtState(d, id, S.txs), lent = d.direction === 'lent';
    var pp = Math.round(st.paid / d.amount * 100);
    var body = '<p class="ink2">' + (lent ? L(esc(d.person) + ' utang ke kamu.', esc(d.person) + ' owes you.') : L('Kamu utang ke ' + esc(d.person) + '.', 'You owe ' + esc(d.person) + '.')) + (d.note ? ' ' + esc(d.note) : '') + '</p>' +
      '<div class="card facts" style="box-shadow:none;background:var(--card-2)"><div class="fact"><span>' + L('Jumlah awal', 'Original amount') + '</span><span class="num">' + C.rp(d.amount) + '</span></div>' +
      '<div class="fact"><span>' + L('Sudah dibayar', 'Paid so far') + '</span><span class="num">' + C.rp(st.paid) + '</span></div>' +
      '<div class="fact"><span>' + L('Sisa', 'Left') + '</span><span class="num" style="font-size:18px">' + (st.settled ? L('Lunas', 'Paid off') : C.rp(st.left)) + '</span></div>' +
      '<div class="fact"><span>' + L('Tanggal pinjam', 'Date borrowed') + '</span><span>' + C.dayLabel(d.date, true) + '</span></div>' +
      (d.due ? '<div class="fact"><span>' + L('Jatuh tempo', 'Due date') + '</span><span>' + C.dayLabel(d.due, true) + '</span></div>' : '') + '</div>' +
      '<div class="bar goal" role="img" aria-label="' + pp + L('% dibayar', '% paid') + '"><i style="width:' + Math.min(100, pp) + '%"></i></div>' +
      (st.pays.length ? '<div class="field"><span class="lbl">' + L('Riwayat pembayaran', 'Payment history') + '</span><div class="tx-wrap" style="box-shadow:none;border:1px solid var(--line)">' + st.pays.map(txRow).join('') + '</div></div>' : '<p class="hint">' + L('Belum ada pembayaran.', 'No payments yet.') + '</p>') +
      '<div class="row" style="flex-wrap:wrap;border-top:1px solid var(--line);padding-top:16px"><button type="button" class="btn soft grow" data-act="debt-edit" data-id="' + esc(id) + '">' + icon('pencil', 'sm') + L('Ubah', 'Edit') + '</button><button type="button" class="btn danger grow" data-act="debt-del" data-id="' + esc(id) + '">' + L('Hapus', 'Delete') + '</button></div>';
    var foot = st.settled ? '' : '<button type="button" class="btn primary" data-act="debt-pay" data-id="' + esc(id) + '">' + icon('plus') + (lent ? L('Catat pembayaran dari ' + esc(d.person), 'Record a payment from ' + esc(d.person)) : L('Catat pembayaran ke ' + esc(d.person), 'Record a payment to ' + esc(d.person))) + '</button>';
    openSheet(d.person, body, foot, { id: id }, 'none');
  }

  // ================= toast =================
  var toastTimer = null, toastHold = false;
  function toast(msg, action, kind) {
    var box = document.getElementById('toast');
    var mark = kind === 'ok' ? '<span class="tmark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>' : kind === 'error' ? '<span class="tmark err-mark" aria-hidden="true">' + icon('alert', 'sm') + '</span>' : '';
    box.innerHTML = '<div class="toast-in">' + mark + '<p>' + esc(msg) + '</p>' + (action ? '<button type="button" id="toast-act">' + esc(action.label) + '</button>' : '') + '</div>';
    var inner = box.firstChild;
    toastHold = false;
    if (action) document.getElementById('toast-act').onclick = function () { hideToast(); action.fn(); };
    inner.addEventListener('mouseenter', function () { toastHold = true; });
    inner.addEventListener('mouseleave', function () { toastHold = false; arm(); });
    inner.addEventListener('focusin', function () { toastHold = true; });
    inner.addEventListener('focusout', function () { toastHold = false; arm(); });
    function arm() { clearTimeout(toastTimer); toastTimer = setTimeout(function () { if (!toastHold) hideToast(); }, action ? 7000 : 4200); }
    arm();
  }
  function hideToast() { clearTimeout(toastTimer); var box = document.getElementById('toast'); box.innerHTML = ''; }

  // ================= backup / export / restore =================
  function useCap(name) { return window.claude && window.claude.use ? window.claude.use(name) : Promise.resolve(null); }
  function saveFile(filename, data) {
    return useCap('downloads').then(function (dl) {
      if (!dl) { toast(L('Download gak tersedia di tampilan ini. Coba buka halaman ini di browser.', 'Downloads aren’t available in this view. Try opening the page in a browser.'), null, 'error'); return false; }
      return dl.save({ filename: filename, data: data }).then(function () { return true; }, function (e) {
        var code = e && e.code;
        if (code === 'declined') return false;
        if (code === 'rejected_extension' || code === 'extension_not_enabled') toast(L('Format file ini gak tersedia di sini.', 'This file format isn’t available here.'), null, 'error');
        else if (code === 'rate_limited') toast(L('Masih ada jendela download yang terbuka. Tunggu sebentar.', 'A download window is still open. Wait a moment.'), null, 'error');
        else toast(L('Download gagal. Coba lagi.', 'Download failed. Try again.'), null, 'error');
        return false;
      });
    });
  }
  function busy(el, text) { if (!el) return function () {}; var old = el.innerHTML; el.disabled = true; el.textContent = text; return function () { el.disabled = false; el.innerHTML = old; }; }
  function doBackup(btn) {
    var done = busy(btn, L('Menyiapkan…', 'Preparing…'));
    var data = JSON.stringify(C.makeBackup(S.meta, S.months));
    saveFile('dompet-bryan-backup-' + today() + '.json', data).then(function (ok) {
      done();
      if (ok) { saveSettings({ lastBackup: today() }); toast(L('Backup tersimpan.', 'Backup saved.'), null, 'ok'); }
    });
  }
  function loadScript(src) {
    return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  function doExport(btn) {
    var rows = C.exportRows(S.txs, S.meta.wallets, S.meta.categories, S.meta.debts, function (id) { return catName(id); });
    if (!rows.length) { toast(L('Belum ada transaksi untuk di-export.', 'There are no transactions to export yet.')); return; }
    var done = busy(btn, L('Menyiapkan…', 'Preparing…'));
    (window.XLSX ? Promise.resolve() : loadScript(XLSX_SRC)).then(function () {
      var X = window.XLSX, wb = X.utils.book_new();
      var ws1 = X.utils.json_to_sheet(rows);
      ws1['!cols'] = [{ wch: 11 }, { wch: 9 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 20 }, { wch: 13 }, { wch: 11 }, { wch: 32 }, { wch: 20 }];
      X.utils.book_append_sheet(wb, ws1, L('Transaksi', 'Transactions'));
      var ws2 = X.utils.json_to_sheet(C.monthlyRows(S.flows));
      ws2['!cols'] = [{ wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
      X.utils.book_append_sheet(wb, ws2, L('Ringkasan per bulan', 'Monthly summary'));
      return saveFile('dompet-bryan-' + today() + '.xlsx', X.write(wb, { bookType: 'xlsx', type: 'array' }));
    }, function () {
      return saveFile('dompet-bryan-' + today() + '.csv', C.toCSV(rows));
    }).then(function (ok) { done(); if (ok) toast(L('File Excel tersimpan.', 'Excel file saved.'), null, 'ok'); }).catch(function () { done(); toast(L('Export gagal. Coba lagi.', 'Export failed. Try again.'), null, 'error'); });
  }
  document.getElementById('restore-file').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      var res = C.readBackup(String(rd.result || ''));
      if (res.error) { setErr(view, 'restore', res.error); return; }
      S.restore = res; render();
    };
    rd.onerror = function () { setErr(view, 'restore', L('File gak bisa dibaca. Coba pilih lagi.', 'Couldn’t read the file. Try choosing it again.')); };
    rd.readAsText(f);
  });
  function doRestore() {
    var b = S.restore.data, oldMonths = Object.keys(S.months);
    var jobs = [];
    C.META_DOCS.forEach(function (d) { var v = b.meta[d] || {}; jobs.push(['set', 'meta/' + d, d === 'settings' ? v : { list: v }]); });
    Object.keys(b.months).forEach(function (ym) { jobs.push(['set', 'months/' + ym, b.months[ym]]); });
    oldMonths.forEach(function (ym) { if (!b.months[ym]) jobs.push(['del', 'months/' + ym]); });
    S.restoring = { done: 0, total: jobs.length }; render();
    var i = 0;
    (function next() {
      if (i >= jobs.length) { S.restore = null; S.restoring = null; render(); toast(L('Data berhasil dipulihkan.', 'Your data has been restored.'), null, 'ok'); return; }
      var j = jobs[i++];
      (j[0] === 'set' ? setDoc(j[1], j[2]) : delDoc(j[1])).then(function () { S.restoring.done = i; render(); next(); }, function (e) {
        S.restoring = null; render(); writeFailed(e);
      });
    })();
  }

  // ================= actions =================
  function moveWallet(id, dir) {
    var ws = walletsList(), i = ws.findIndex(function (w) { return w.id === id; }), j = i + dir;
    if (i < 0 || j < 0 || j >= ws.length) return;
    // renumber everyone so equal or missing orders can't stall the swap
    ws.forEach(function (w, k) { w.order = (k + 1) * 10; });
    var a = ws[i], b = ws[j], t = a.order; a.order = b.order; b.order = t;
    ws.forEach(function (w) { if ((S.meta.wallets[w.id] || {}).order !== w.order) saveMeta('wallets', w.id, { order: w.order }); });
  }
  function txFrom(el) { var ym = el.dataset.v, id = el.dataset.id; var t = S.months[ym] && S.months[ym].tx && S.months[ym].tx[id]; if (!t) return null; var o = { id: id, ym: ym }; for (var k in t) o[k] = t[k]; return o; }
  function goTab(t) { S.tab = t; S.more = t === 'more' ? S.more : null; S.animate = true; LS.set('tab', t); render(); window.scrollTo(0, 0); }
  var ACTS = {
    tab: function (el) { var t = el.dataset.v; if (t === 'more' && S.tab === 'more') S.more = null; if (S.tab !== t) S.hist.limit = 150; goTab(t); popTab(t); },
    add: function (el) { spinFab(); openTx({ type: el.dataset.type, date: el.dataset.date }); },
    reload: function () { location.reload(); },
    hide: function () { S.hide = !S.hide; LS.set('hide', S.hide); S.fx = 'blur'; render(); },
    'gap-close': function (el) { LS.set('gapDismiss', el.dataset.v); render(); },
    'wallet-hist': function (el) { S.hist.mode = 'all'; S.hist.wallet = el.dataset.id; S.hist.cat = ''; S.hist.q = ''; S.hist.day = null; goTab('hist'); },
    'wallet-new': function () { openWallet(null); },
    'wallet-edit': function (el) { openWallet(el.dataset.id); },
    'wallet-unarchive': function (el) { saveMeta('wallets', el.dataset.id, { archived: false }); toast(L('Wallet aktif lagi.', 'Wallet restored.'), null, 'ok'); },
    'w-suggest': function (el) {
      var s = SUGGEST[+el.dataset.v], f = el.closest('form');
      f.elements.name.value = L(s[0], s[1]);
      var k = f.querySelector('input[name=kind][value="' + s[2] + '"]'); if (k) k.checked = true;
      f.elements.name.focus();
    },
    'w-adjust': function (el) {
      var f = el.closest('form'), inp = f.querySelector('#ws-real'), id = ctx.id;
      clearErrs(f);
      if (!/\d/.test(inp.value)) { setErr(f, 'ws-real', L('Isi saldo aslinya dulu. Boleh 0.', 'Enter the real balance first. 0 is fine.')); inp.focus(); return; }
      var real = C.parseAmount(inp.value), diff = real - (S.bal[id] || 0), name = wname(id);
      closeSheet();
      if (!diff) { toast(L('Saldonya sudah sama, gak ada yang diubah.', 'The balance already matches. Nothing changed.')); return; }
      var tid = C.uid(), date = today();
      saveTx(tid, { date: date, type: diff > 0 ? 'in' : 'out', amount: Math.abs(diff), wallet: id, toWallet: null, category: null, fee: 0, note: L('Penyesuaian saldo', 'Balance adjustment'), debt: null, debtRole: null, recurring: null, adjust: true, createdAt: Date.now(), deleted: false });
      toast(L('Saldo ' + name + ' sekarang ' + C.rp(real) + '.', name + ' balance is now ' + C.rp(real) + '.'), { label: L('Batalkan', 'Undo'), fn: function () { patchTx(tid, C.ymOf(date), { deleted: true }); } }, 'ok');
    },
    'w-archive': function () { var id = ctx.id; closeSheet(); saveMeta('wallets', id, { archived: true }); toast(L('Wallet ' + wname(id) + ' diarsipkan.', 'Wallet ' + wname(id) + ' archived.'), { label: L('Batalkan', 'Undo'), fn: function () { saveMeta('wallets', id, { archived: false }); } }); },
    'cat-new': function (el) { openCat(null, el.dataset.v); },
    'cq-open': function (el) { cqOpen(el.form); },
    'cq-save': function (el) { cqSave(el.form); },
    'cq-close': function (el) { cqClose(el.form); el.form.querySelector('[data-cats]:not([hidden]) .chip-add').focus(); },
    'cat-edit': function (el) { openCat(el.dataset.id); },
    'cat-unarchive': function (el) { saveMeta('categories', el.dataset.id, { archived: false }); toast(L('Kategori aktif lagi.', 'Category restored.'), null, 'ok'); },
    'c-archive': function () { var id = ctx.id; closeSheet(); saveMeta('categories', id, { archived: true }); toast(L('Kategori diarsipkan.', 'Category archived.'), { label: L('Batalkan', 'Undo'), fn: function () { saveMeta('categories', id, { archived: false }); } }); },
    'tx-edit': function (el) { var t = txFrom(el); if (t) openTx({ tx: t }); },
    'tx-del': function () {
      var t = ctx.ed; closeSheet();
      patchTx(t.id, t.ym, { deleted: true });
      var r = t.recurring && S.meta.recurring[t.recurring], rPrev = null;
      if (r) {
        if (r.freq === 'days' && r.next === C.addDays(t.date, r.every || 1)) { rPrev = recSnapshot(r); saveMeta('recurring', t.recurring, { next: t.date }); }
        else if (r.freq !== 'days' && r.lastDone === C.ymOf(t.date)) { rPrev = recSnapshot(r); saveMeta('recurring', t.recurring, { lastDone: C.addMonths(C.ymOf(t.date), -1) }); }
      }
      toast(L('Transaksi dihapus.', 'Transaction deleted.') + (rPrev ? L(' Pengingat rutinnya muncul lagi.', ' Its recurring reminder is back.') : ''),
        { label: L('Batalkan', 'Undo'), fn: function () { patchTx(t.id, t.ym, { deleted: false }); if (rPrev) saveMeta('recurring', t.recurring, rPrev); } });
    },
    kp: function (el) { kpPress(el.dataset.v); },
    'kp-clear': function () { if (ctx) { ctx.expr = ''; updateAmt(); } },
    'fav-save': function (el) {
      var f = favList()[+el.dataset.v];
      if (!f) return;
      recordNew({ date: today(), type: f.type, amount: f.amount, wallet: f.wallet, toWallet: null, category: f.category, fee: 0, note: f.note, debt: null, debtRole: null, recurring: null, adjust: false, createdAt: Date.now(), deleted: false });
    },
    'neg-in': function (el) { openTx({ type: 'in', preset: { type: 'in', wallet: el.dataset.id } }); },
    'bk-later': function () { LS.set('bkSnooze', C.addDays(today(), 7)); render(); toast(L('Oke, aku ingatkan lagi minggu depan.', 'OK, I’ll remind you again next week.')); },
    'gap-off': function () { saveSettings({ gapReminder: false }); toast(L('Pengingat dimatikan. Bisa dinyalakan lagi di Lainnya → Pengaturan.', 'Reminder turned off. Turn it back on in More → Settings.')); },
    'w-up': function (el) { moveWallet(el.dataset.id, -1); },
    'w-down': function (el) { moveWallet(el.dataset.id, 1); },
    'rep-bal': function (el) { S.rep.bsel = +el.dataset.v; render(); },
    't-date': function (el) { var f = el.closest('form'); f.elements.date.value = el.dataset.v; document.getElementById('t-date-label').textContent = C.dayLong(el.dataset.v); },
    'sheet-close': closeSheet,
    'rec-do': function (el) { doRecurring(el.dataset.id); },
    'rec-skip': function (el) {
      var id = el.dataset.id, r = S.meta.recurring[id], prev = recSnapshot(r);
      saveMeta('recurring', id, recAdvance(r, r.freq === 'days' ? r.next || today() : today(), true));
      toast(L('Dilewati untuk kali ini.', 'Skipped this time.'), { label: L('Batalkan', 'Undo'), fn: function () { saveMeta('recurring', id, prev); } });
    },
    'rec-now': function () { var id = ctx.id; closeSheet(); doRecurring(id, true); },
    'rec-new': function () { openRec(null); },
    'rec-edit': function (el) { openRec(el.dataset.id); },
    'rec-del': function () { var id = ctx.id; closeSheet(); saveMeta('recurring', id, { deleted: true }); toast(L('Transaksi rutin dihapus.', 'Recurring transaction deleted.'), { label: L('Batalkan', 'Undo'), fn: function () { saveMeta('recurring', id, { deleted: false }); } }); },
    'goal-new': function () { openGoal(null); },
    'goal-edit': function (el) { openGoal(el.dataset.id); },
    'goal-del': function () { var id = ctx.id; closeSheet(); saveMeta('goals', id, { deleted: true }); toast(L('Target dihapus.', 'Goal deleted.'), { label: L('Batalkan', 'Undo'), fn: function () { saveMeta('goals', id, { deleted: false }); } }); },
    'goal-deposit': function (el) {
      var g = S.meta.goals[el.dataset.id];
      var from = walletsList().filter(function (w) { return w.id !== g.wallet; })[0];
      openTx({ type: 'transfer', title: L('Setor ke ', 'Add to ') + g.name, preset: { type: 'transfer', toWallet: g.wallet, wallet: from ? from.id : '', note: L('Setor ', 'Saving for ') + g.name } });
    },
    'debt-new': function () { openDebt(null); },
    'debt-open': function (el) { openDebtDetail(el.dataset.id); },
    'debt-edit': function (el) { openDebt(el.dataset.id); },
    'debt-pay': function (el) {
      var id = el.dataset.id, d = S.meta.debts[id], st = C.debtState(d, id, S.txs), lent = d.direction === 'lent';
      openTx({ title: L('Catat pembayaran', 'Record a payment'), preset: { type: lent ? 'in' : 'out', debt: id, debtRole: 'pay', amount: st.left, note: lent ? L(d.person + ' bayar utang', d.person + ' paid back') : L('Bayar utang ke ' + d.person, 'Paid back ' + d.person) } });
    },
    'debt-del': function (el) {
      var id = el.dataset.id; closeSheet();
      var linked = S.txs.filter(function (t) { return t.debt === id; });
      saveMeta('debts', id, { deleted: true });
      linked.forEach(function (t) { patchTx(t.id, t.ym, { deleted: true }); });
      toast(L('Catatan utang dihapus', 'Debt deleted') + (linked.length ? L(' beserta ' + linked.length + ' transaksinya', ' with its ' + linked.length + ' transactions') : '') + '.', { label: L('Batalkan', 'Undo'), fn: function () { saveMeta('debts', id, { deleted: false }); linked.forEach(function (t) { patchTx(t.id, t.ym, { deleted: false }); }); } });
    },
    more: function (el) { S.tab = 'more'; S.more = el.dataset.v; S.animate = true; LS.set('tab', 'more'); render(); window.scrollTo(0, 0); },
    'more-back': function () { S.more = null; S.restore = null; render(); window.scrollTo(0, 0); },
    'h-prev': function () { S.hist.ym = C.addMonths(S.hist.ym, -1); S.hist.day = null; S.animate = true; render(); },
    'h-next': function () { if (S.hist.ym < thisYM()) { S.hist.ym = C.addMonths(S.hist.ym, 1); S.hist.day = null; S.animate = true; render(); } },
    'h-day': function (el) { S.hist.day = S.hist.day === el.dataset.v ? null : el.dataset.v; renderHistBody(); },
    'h-day-clear': function () { S.hist.day = null; renderHistBody(); },
    'h-reset': function () { S.hist.q = ''; S.hist.wallet = ''; S.hist.cat = ''; render(); },
    'h-more': function () { S.hist.limit += 150; renderHistBody(); },
    'r-prev': function () { S.rep.bsel = null; if (S.rep.mode === 'month') S.rep.ym = C.addMonths(S.rep.ym, -1); else S.rep.year = String(+S.rep.year - 1); S.rep.tsel = null; S.animate = true; render(); },
    'r-next': function () { S.rep.bsel = null; if (S.rep.mode === 'month') { if (S.rep.ym < thisYM()) S.rep.ym = C.addMonths(S.rep.ym, 1); } else if (S.rep.year < today().slice(0, 4)) S.rep.year = String(+S.rep.year + 1); S.rep.tsel = null; S.animate = true; render(); },
    'rep-seg': function (el) { var id = el.dataset.v; var cur = view.querySelector('.seg-arc.hi'); highlight(cur && cur.dataset.v === id ? null : id); },
    'rep-cat': function (el) {
      var r = S.rep;
      S.hist.cat = el.dataset.v; S.hist.wallet = r.wallet; S.hist.q = ''; S.hist.day = null;
      if (r.mode === 'month') { S.hist.mode = 'month'; S.hist.ym = r.ym; } else S.hist.mode = 'all';
      goTab('hist');
    },
    'rep-trend': function (el) { S.rep.tsel = +el.dataset.v; render(); },
    'backup-json': function (el) { doBackup(el); },
    'export-xlsx': function (el) { doExport(el); },
    'restore-pick': function () { document.getElementById('restore-file').click(); },
    'restore-cancel': function () { S.restore = null; render(); },
    'restore-confirm': function () {
      if (!S.live || S.netOff) { toast(L('Pulihkan data butuh internet. Coba lagi begitu tersambung.', 'Restoring needs a connection. Try again once you’re online.'), null, 'error'); return; }
      doRestore();
    }
  };
  var CHANGES = {
    lang: function (el) { setLang(el.value); },
    theme: function (el) { S.theme = el.value; LS.set('theme', S.theme); render(); },
    'gap-toggle': function (el) { saveSettings({ gapReminder: el.checked }); },
    'r-freq': function (el) {
      var f = el.form;
      f.querySelector('#r-monthly').hidden = el.value !== 'monthly';
      f.querySelector('#r-days').hidden = el.value !== 'days';
    },
    't-type': function (el) {
      var f = el.form, type = el.value;
      f.querySelector('#t-wallet-l').textContent = type === 'in' ? L('Ke wallet', 'To wallet') : L('Dari wallet', 'From wallet');
      f.querySelector('#f-to').hidden = type !== 'transfer';
      f.querySelector('#f-fee').hidden = type !== 'transfer';
      f.querySelector('#f-cat').hidden = type === 'transfer';
      f.querySelectorAll('[data-cats]').forEach(function (g) { g.hidden = g.dataset.cats !== type; });
      clearErrs(f);
    },
    'r-type': function (el) { el.form.querySelectorAll('[data-cats]').forEach(function (g) { g.hidden = g.dataset.cats !== el.value; }); },
    'r-day': function (el) { var r = ctx && ctx.id ? S.meta.recurring[ctx.id] : null; document.getElementById('r-day-hint').textContent = recHint(+el.value, r ? { day: +el.value, lastDone: r.lastDone } : null); },
    'd-dir': function (el) { var h = document.getElementById('d-wallet-hint'); if (h) h.textContent = debtWalletHint(el.value); },
    'h-mode': function (el) { S.hist.mode = el.value; S.hist.day = null; S.hist.limit = 150; S.animate = true; render(); },
    'h-wallet': function (el) { S.hist.wallet = el.value; render(); },
    'h-cat': function (el) { S.hist.cat = el.value; render(); },
    'r-mode': function (el) { S.rep.mode = el.value; S.rep.tsel = null; S.rep.bsel = null; S.animate = true; render(); },
    'r-kind': function (el) { S.rep.kind = el.value; S.animate = true; render(); },
    'r-wallet': function (el) { S.rep.wallet = el.value; S.rep.bsel = null; S.animate = true; render(); },
    'd-tab': function (el) { S.debtTab = el.value; render(); }
  };
  var histTimer = null;
  var INPUTS = {
    'h-q': function (el) { S.hist.q = el.value; clearTimeout(histTimer); histTimer = setTimeout(renderHistBody, 180); },
    't-date': function (el) { var l = document.getElementById('t-date-label'); if (l && /^\d{4}-\d{2}-\d{2}$/.test(el.value)) l.textContent = C.dayLong(el.value); }
  };
  var SUBMITS = {
    tx: submitTx, wallet: submitWallet, cat: submitCat, rec: submitRec, goal: submitGoal, debt: submitDebt, none: function () {},
    budgets: function (form) {
      var list = {};
      catsList('out').forEach(function (c) { var v = C.parseAmount(form.elements[c.id] ? form.elements[c.id].value : ''); list[c.id] = v > 0 ? v : null; });
      var m = {}; for (var k in S.meta.budgets) m[k] = S.meta.budgets[k]; for (var q in list) m[q] = list[q];
      S.meta.budgets = m; render();
      mergeDoc('meta/budgets', { list: list }).catch(writeFailed);
      toast(L('Budget disimpan.', 'Budgets saved.'), null, 'ok');
    }
  };
  function renderHistBody() { var b = document.getElementById('hist-body'); if (b && S.tab === 'hist') b.innerHTML = histBody(); else render(); }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    var fn = ACTS[el.dataset.act];
    if (fn) fn(el, e);
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.change && CHANGES[el.dataset.change]) CHANGES[el.dataset.change](el, e);
  });
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el.classList && el.classList.contains('amt')) {
      var f = C.formatInput(el.value);
      if (f !== el.value) {
        var pos = 0;
        try { pos = el.selectionStart || 0; } catch (x) { pos = el.value.length; }
        var digitsBefore = el.value.slice(0, pos).replace(/\D/g, '').length;
        el.value = f;
        var p = 0, seen = 0;
        while (p < f.length && seen < digitsBefore) { if (/\d/.test(f.charAt(p))) seen++; p++; }
        try { el.setSelectionRange(p, p); } catch (x) { /* ignore */ }
      }
    }
    if (el.dataset && el.dataset.input && INPUTS[el.dataset.input]) INPUTS[el.dataset.input](el, e);
  });
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f.dataset || !f.dataset.submit) return;
    e.preventDefault();
    if (!S.canWrite) { toast(L('Akun ini cuma bisa melihat.', 'This account can only view.'), null, 'error'); return; }
    var fn = SUBMITS[f.dataset.submit];
    if (fn) fn(f);
  });
  // donut: hover / focus on a legend row lights its slice
  view.addEventListener('mouseover', function (e) { var l = e.target.closest('.lrow'); if (l) highlight(l.dataset.seg); });
  view.addEventListener('mouseout', function (e) { var l = e.target.closest('.lrow'); if (l && !l.contains(e.relatedTarget)) highlight(null); });
  view.addEventListener('focusin', function (e) { var l = e.target.closest('.lrow'); if (l) highlight(l.dataset.seg); });

  // ================= motion =================
  var RIPPLE = '.btn, .chip-add, .qchip, .tx, .mrow, .wcard, .tab, .key, .icon-btn, .cal-d, .lrow, .tcol, .chip > span, .seg span, .colorpick span, .iconpick span';
  document.addEventListener('pointerdown', function (e) {
    if (reduceMotion || e.button > 0) return;
    var host = e.target.closest(RIPPLE);
    if (!host) { var lab = e.target.closest('.chip, .seg label, .colorpick label, .iconpick label'); host = lab && lab.querySelector('span'); }
    if (!host || host.disabled) return;
    var r = host.getBoundingClientRect(), size = Math.max(r.width, r.height) * 2.2;
    var dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = (e.clientX - r.left - size / 2) + 'px';
    dot.style.top = (e.clientY - r.top - size / 2) + 'px';
    host.classList.add('rippling');
    host.appendChild(dot);
    setTimeout(function () { dot.remove(); }, 480);
  }, { passive: true });
  function spinFab() {
    if (reduceMotion) return;
    var f = document.querySelector('.fab');
    if (!f) return;
    f.classList.remove('spin'); void f.offsetWidth; f.classList.add('spin');
    setTimeout(function () { f.classList.remove('spin'); }, 500);
  }
  function popTab(t) {
    if (reduceMotion) return;
    var b = document.querySelector('.tab[data-v="' + t + '"]');
    if (b) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
  }

  init();
})();
