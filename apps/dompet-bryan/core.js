/* Dompet Bryan — pure logic. No DOM, no db: testable in node. */
(function (root) {
  'use strict';

  var NAMES = {
    id: {
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      wk: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
    },
    en: {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      wk: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  };
  var LANG = 'id';
  function setLang(l) { LANG = l === 'en' ? 'en' : 'id'; }
  function lang() { return LANG; }
  function N() { return NAMES[LANG]; }
  function T(id, en) { return LANG === 'en' ? en : id; }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // ---- dates: always local calendar dates as 'YYYY-MM-DD', never toISOString (UTC shifts WIB by 7h)
  function dateKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function todayKey(now) { return dateKey(now || new Date()); }
  function parseKey(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +(p[2] || 1)); }
  function ymOf(k) { return k.slice(0, 7); }
  function addMonths(ym, n) {
    var y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1 + n;
    y += Math.floor(m / 12); m = ((m % 12) + 12) % 12;
    return y + '-' + pad(m + 1);
  }
  function daysInMonth(ym) { return new Date(+ym.slice(0, 4), +ym.slice(5, 7), 0).getDate(); }
  function addDays(k, n) { var d = parseKey(k); d.setDate(d.getDate() + n); return dateKey(d); }
  function daysBetween(a, b) { return Math.round((parseKey(b) - parseKey(a)) / 864e5); }
  function monthLabel(ym, short) { return N()[short ? 'short' : 'months'][+ym.slice(5, 7) - 1] + ' ' + ym.slice(0, 4); }
  function monthName(ym, short) { return N()[short ? 'short' : 'months'][+ym.slice(5, 7) - 1]; }
  function dayName(k) { return N().days[parseKey(k).getDay()]; }
  function weekHeads() { return N().wk.slice(); }
  function dayLabel(k, withYear) {
    var d = parseKey(k);
    return N().days[d.getDay()] + ', ' + d.getDate() + ' ' + N().short[d.getMonth()] + (withYear ? ' ' + d.getFullYear() : '');
  }
  function dayLong(k) { var d = parseKey(k); return N().days[d.getDay()] + (LANG === 'en' ? ', ' : ' ') + d.getDate() + ' ' + N().months[d.getMonth()] + ' ' + d.getFullYear(); }
  function weekdayMon(k) { return (parseKey(k).getDay() + 6) % 7; } // 0 = Senin

  // ---- money: whole rupiah integers
  var nf = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 });
  function num(n) { return nf.format(Math.abs(Math.round(n || 0))); }
  function rp(n) { n = Math.round(n || 0); return (n < 0 ? '−' : '') + 'Rp ' + num(n); }
  function rpSigned(n) { n = Math.round(n || 0); return (n > 0 ? '+' : n < 0 ? '−' : '') + 'Rp ' + num(n); }
  function trim1(x) { var r = x >= 100 ? Math.round(x) : Math.round(x * 10) / 10; return LANG === 'en' ? String(r) : String(r).replace('.', ','); }
  function compact(n) {
    var a = Math.abs(Math.round(n || 0));
    if (a >= 1e9) return trim1(a / 1e9) + T('M', 'B');
    if (a >= 1e6) return trim1(a / 1e6) + T('jt', 'M');
    if (a >= 1e3) return trim1(a / 1e3) + T('rb', 'k');
    return String(a);
  }
  function decimal(x) { return LANG === 'en' ? String(x) : String(x).replace('.', ','); }
  function parseAmount(s) {
    var d = String(s == null ? '' : s).replace(/[^\d]/g, '').slice(0, 13);
    return d ? parseInt(d, 10) : 0;
  }
  function formatInput(s) { var n = parseAmount(s); return n ? nf.format(n) : ''; }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  // ---- transactions
  // months: { 'YYYY-MM': { tx: { id: {...} } } }  ->  live tx list, newest first
  function flatten(months) {
    var out = [];
    for (var ym in months) {
      var tx = (months[ym] && months[ym].tx) || {};
      for (var id in tx) {
        var t = tx[id];
        if (!t || t.deleted || !t.date || !(t.amount > 0)) continue;
        var o = { id: id, ym: ym };
        for (var k in t) o[k] = t[k];
        out.push(o);
      }
    }
    out.sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
    return out;
  }

  function balances(wallets, txs) {
    var b = {};
    for (var id in wallets) if (wallets[id]) b[id] = Math.round(wallets[id].initial || 0);
    function add(w, v) { if (w == null) return; b[w] = (b[w] || 0) + v; }
    for (var i = 0; i < txs.length; i++) {
      var t = txs[i];
      if (t.type === 'out') add(t.wallet, -t.amount);
      else if (t.type === 'in') add(t.wallet, t.amount);
      else if (t.type === 'transfer') { add(t.wallet, -t.amount - (t.fee || 0)); add(t.toWallet, t.amount); }
    }
    return b;
  }

  // What counts as spending/income in reports: plain in/out plus transfer fees.
  // Transfers, balance adjustments and debt movements change balances but are not income or spending.
  function flows(txs) {
    var f = [];
    for (var i = 0; i < txs.length; i++) {
      var t = txs[i];
      if ((t.type === 'out' || t.type === 'in') && !t.adjust && !t.debt) {
        f.push({ id: t.id, type: t.type, amount: t.amount, category: t.category || '_none', wallet: t.wallet, date: t.date, note: t.note || '' });
      } else if (t.type === 'transfer' && t.fee > 0) {
        f.push({ id: t.id, type: 'out', amount: t.fee, category: 'admin', wallet: t.wallet, date: t.date, note: 'Biaya admin transfer', fee: true });
      }
    }
    return f;
  }

  function summarize(fl, pred) {
    var s = { out: 0, in: 0, count: 0, byCat: { out: {}, in: {} }, byDay: {}, byWallet: {}, maxOut: null };
    for (var i = 0; i < fl.length; i++) {
      var f = fl[i];
      if (pred && !pred(f)) continue;
      s[f.type] += f.amount; s.count++;
      var bc = s.byCat[f.type]; bc[f.category] = (bc[f.category] || 0) + f.amount;
      var d = s.byDay[f.date] || (s.byDay[f.date] = { out: 0, in: 0 }); d[f.type] += f.amount;
      var w = s.byWallet[f.wallet] || (s.byWallet[f.wallet] = { out: 0, in: 0 }); w[f.type] += f.amount;
      if (f.type === 'out' && (!s.maxOut || f.amount > s.maxOut.amount)) s.maxOut = f;
    }
    return s;
  }

  function topDay(byDay) {
    var best = null;
    for (var k in byDay) if (byDay[k].out > 0 && (!best || byDay[k].out > best.out)) best = { date: k, out: byDay[k].out };
    return best;
  }

  // Days to divide by for "rata-rata per hari".
  function periodDays(mode, key, today, firstDate) {
    var tYM = ymOf(today), tY = today.slice(0, 4);
    if (mode === 'month') {
      if (key === tYM) return +today.slice(8, 10);
      return key < tYM ? daysInMonth(key) : 0;
    }
    if (mode === 'year') {
      if (key === tY) return daysBetween(key + '-01-01', today) + 1;
      if (key > tY) return 0;
      return daysBetween(key + '-01-01', (+key + 1) + '-01-01');
    }
    return firstDate ? daysBetween(firstDate, today) + 1 : 0;
  }

  function niceMax(v) {
    if (!(v > 0)) return 1;
    var e = Math.pow(10, Math.floor(Math.log10(v))), f = v / e;
    var n = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
    return n * e;
  }

  // ---- budgets, debts, recurring, goals
  function budgetStatus(spent, limit) {
    if (!(limit > 0)) return null;
    var pct = spent / limit;
    return { spent: spent, limit: limit, pct: pct, level: pct > 1 ? 'over' : pct >= 0.8 ? 'near' : 'ok', left: limit - spent };
  }

  function debtState(debt, debtId, txs) {
    var paid = 0, pays = [];
    for (var i = 0; i < txs.length; i++) {
      var t = txs[i];
      if (t.debt === debtId && t.debtRole === 'pay') { paid += t.amount; pays.push(t); }
    }
    var left = Math.max(0, (debt.amount || 0) - paid);
    return { paid: paid, left: left, settled: left <= 0, pays: pays };
  }

  function recurringFirstYM(day, today) {
    // created on/after this month's due day -> first shows next month
    var ym = ymOf(today), due = Math.min(day, daysInMonth(ym));
    return +today.slice(8, 10) >= due ? addMonths(ym, 1) : ym;
  }

  function dueRecurring(recurring, today) {
    var ym = ymOf(today), d = +today.slice(8, 10), out = [];
    for (var id in recurring) {
      var r = recurring[id];
      if (!r || r.deleted || r.active === false) continue;
      if (r.freq === 'days') {
        // every N days: due once today reaches r.next
        if (r.next && r.next <= today) {
          var od = { id: id, dueDate: r.next };
          for (var kk in r) od[kk] = r[kk];
          out.push(od);
        }
        continue;
      }
      if ((r.lastDone || '') >= ym) continue;
      var dueDay = Math.min(r.day || 1, daysInMonth(ym));
      if (d >= dueDay) {
        var o = { id: id, dueDate: ym + '-' + pad(dueDay) };
        for (var k in r) o[k] = r[k];
        out.push(o);
      }
    }
    return out.sort(function (a, b) { return a.dueDate < b.dueDate ? -1 : 1; });
  }

  function nextDue(r, today) {
    if (r.freq === 'days') return r.next || today;
    var ym = ymOf(today);
    var target = (r.lastDone || '') >= ym ? addMonths(ym, 1) : ym;
    return target + '-' + pad(Math.min(r.day || 1, daysInMonth(target)));
  }

  function goalState(goal, bal, today) {
    var have = Math.max(0, bal || 0), target = goal.target || 0;
    var pct = target > 0 ? Math.min(1, have / target) : 0;
    var res = { have: have, pct: pct, left: Math.max(0, target - have), done: target > 0 && have >= target, perMonth: null, monthsLeft: null };
    if (goal.deadline && !res.done && goal.deadline >= today) {
      var months = (+goal.deadline.slice(0, 4) - +today.slice(0, 4)) * 12 + (+goal.deadline.slice(5, 7) - +today.slice(5, 7));
      months = Math.max(1, months);
      res.monthsLeft = months;
      res.perMonth = Math.ceil(res.left / months);
    }
    return res;
  }

  // ---- calculator: digits and + − × ÷; × ÷ before + −; result in whole rupiah
  var OPS = { '+': 1, '−': 1, '×': 2, '÷': 2 };
  function tokenize(expr) {
    var t = [], n = '';
    for (var i = 0; i < expr.length; i++) {
      var ch = expr.charAt(i);
      if (ch >= '0' && ch <= '9') n += ch;
      else if (OPS[ch]) { if (n) { t.push(+n); n = ''; } t.push(ch); }
    }
    if (n) t.push(+n);
    return t;
  }
  function evalExpr(expr) {
    var t = tokenize(String(expr || ''));
    while (t.length && typeof t[t.length - 1] === 'string') t.pop();
    while (t.length && typeof t[0] === 'string') t.shift();
    if (!t.length) return 0;
    var s = [t[0]];
    for (var i = 1; i + 1 < t.length; i += 2) {
      var op = t[i], v = t[i + 1];
      if (op === '×') s[s.length - 1] *= v;
      else if (op === '÷') s[s.length - 1] = v ? s[s.length - 1] / v : NaN;
      else s.push(op, v);
    }
    var r = s[0];
    for (var j = 1; j + 1 < s.length; j += 2) r = s[j] === '+' ? r + s[j + 1] : r - s[j + 1];
    return isFinite(r) ? Math.round(r) : NaN;
  }
  function fmtExpr(expr) {
    return tokenize(String(expr || '')).map(function (x) { return typeof x === 'number' ? nf.format(x) : ' ' + x + ' '; }).join('').trim();
  }
  function hasOp(expr) { return /[+−×÷]/.test(String(expr || '')); }

  // ---- habits: what he records again and again (last 90 days)
  function favorites(txs, today, limit) {
    var since = addDays(today, -90), by = {}, out = [];
    for (var i = 0; i < txs.length; i++) {
      var t = txs[i];
      if (t.date < since || (t.type !== 'out' && t.type !== 'in') || t.debt || t.adjust) continue;
      var note = (t.note || '').trim();
      var k = [t.type, t.category, t.wallet, t.amount, note.toLowerCase()].join('|');
      var f = by[k] || (by[k] = { type: t.type, category: t.category, wallet: t.wallet, amount: t.amount, note: note, count: 0, last: '' });
      f.count++;
      if (t.date > f.last) f.last = t.date;
    }
    for (var key in by) if (by[key].count >= 2) out.push(by[key]);
    out.sort(function (a, b) { return b.count - a.count || (a.last < b.last ? 1 : a.last > b.last ? -1 : 0); });
    return out.slice(0, limit || 6);
  }
  function categoryUsage(txs, today) {
    var since = addDays(today, -90), c = {};
    for (var i = 0; i < txs.length; i++) {
      var t = txs[i];
      if (t.date >= since && t.category) c[t.category] = (c[t.category] || 0) + 1;
    }
    return c;
  }
  // per-category change between two periods, biggest move first
  function categoryChanges(fl, curPred, prevPred, type) {
    var a = summarize(fl, curPred).byCat[type], b = summarize(fl, prevPred).byCat[type], keys = {}, rows = [];
    for (var k in a) keys[k] = 1;
    for (var k2 in b) keys[k2] = 1;
    for (var id in keys) {
      var now = a[id] || 0, prev = b[id] || 0;
      if (now !== prev) rows.push({ id: id, now: now, prev: prev, diff: now - prev, pct: prev ? (now - prev) / prev : null });
    }
    return rows.sort(function (x, y) { return Math.abs(y.diff) - Math.abs(x.diff); });
  }
  // end-of-month balance for each month in `months` (ascending), counting only wallets inc(id) accepts
  function balanceSeries(wallets, txs, months, inc) {
    var run = 0, deltas = {};
    for (var id in wallets) if (wallets[id] && inc(id)) run += Math.round(wallets[id].initial || 0);
    for (var i = 0; i < txs.length; i++) {
      var t = txs[i], d = 0;
      if (t.type === 'out') { if (inc(t.wallet)) d = -t.amount; }
      else if (t.type === 'in') { if (inc(t.wallet)) d = t.amount; }
      else if (t.type === 'transfer') { if (inc(t.wallet)) d -= t.amount + (t.fee || 0); if (inc(t.toWallet)) d += t.amount; }
      if (d) { var ym = t.date.slice(0, 7); deltas[ym] = (deltas[ym] || 0) + d; }
    }
    var keys = Object.keys(deltas).sort(), ki = 0, out = [];
    for (var m = 0; m < months.length; m++) {
      while (ki < keys.length && keys[ki] <= months[m]) run += deltas[keys[ki++]];
      out.push({ ym: months[m], bal: run });
    }
    return out;
  }

  // ---- export
  function exportRows(txs, wallets, categories, debts, catName) {
    function wn(id) { return id && wallets[id] ? wallets[id].name : ''; }
    function cn(id) { if (catName) return id ? catName(id) : ''; return id && categories[id] ? categories[id].name : (id === 'admin' ? T('Biaya Admin', 'Admin Fees') : ''); }
    var K = LANG === 'en'
      ? ['Date', 'Day', 'Type', 'Wallet', 'To wallet', 'Category', 'Amount', 'Admin fee', 'Note', 'Flag']
      : ['Tanggal', 'Hari', 'Jenis', 'Wallet', 'Ke wallet', 'Kategori', 'Jumlah', 'Biaya admin', 'Keterangan', 'Tanda'];
    var rows = [];
    var sorted = txs.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.createdAt || 0) - (b.createdAt || 0); });
    for (var i = 0; i < sorted.length; i++) {
      var t = sorted[i];
      var jenis = t.type === 'out' ? T('Pengeluaran', 'Expense') : t.type === 'in' ? T('Pemasukan', 'Income') : 'Transfer';
      var tanda = t.adjust ? T('Penyesuaian saldo', 'Balance adjustment') : t.debt ? (T('Utang-piutang', 'Debt') + (debts && debts[t.debt] ? ': ' + debts[t.debt].person : '')) : t.recurring ? T('Rutin', 'Recurring') : '';
      var vals = [t.date, dayName(t.date), jenis, wn(t.wallet), t.type === 'transfer' ? wn(t.toWallet) : '', t.type === 'transfer' ? '' : cn(t.category),
        t.type === 'out' ? -t.amount : t.amount, t.fee || 0, t.note || '', tanda];
      var row = {};
      for (var j = 0; j < K.length; j++) row[K[j]] = vals[j];
      rows.push(row);
    }
    return rows;
  }

  function monthlyRows(fl) {
    var by = {};
    for (var i = 0; i < fl.length; i++) {
      var f = fl[i], ym = ymOf(f.date);
      var r = by[ym] || (by[ym] = { out: 0, in: 0 });
      r[f.type] += f.amount;
    }
    var K = LANG === 'en' ? ['Month', 'Income', 'Expense', 'Net'] : ['Bulan', 'Pemasukan', 'Pengeluaran', 'Selisih'];
    return Object.keys(by).sort().map(function (ym) {
      var r = {};
      r[K[0]] = monthLabel(ym); r[K[1]] = by[ym].in; r[K[2]] = by[ym].out; r[K[3]] = by[ym].in - by[ym].out;
      return r;
    });
  }

  function toCSV(rows) {
    if (!rows.length) return '';
    var cols = Object.keys(rows[0]);
    function cell(v) {
      var s = String(v == null ? '' : v);
      return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    var lines = [cols.join(';')];
    for (var i = 0; i < rows.length; i++) lines.push(cols.map(function (c) { return cell(rows[i][c]); }).join(';'));
    return '﻿' + lines.join('\r\n');
  }

  // ---- backup
  var META_DOCS = ['wallets', 'categories', 'budgets', 'recurring', 'goals', 'debts', 'settings'];
  function makeBackup(meta, months, now) {
    return { app: 'dompet-bryan', version: 1, exportedAt: (now || new Date()).toISOString(), meta: meta, months: months };
  }
  function readBackup(text) {
    var b;
    try { b = JSON.parse(text); } catch (e) { return { error: T('File ini bukan file backup Dompet Bryan (isinya gak bisa dibaca).', 'This isn’t a Dompet Bryan backup file (it can’t be read).') }; }
    if (!b || b.app !== 'dompet-bryan' || !b.meta || !b.months) return { error: T('File ini bukan file backup Dompet Bryan.', 'This isn’t a Dompet Bryan backup file.') };
    var ymRe = /^\d{4}-\d{2}$/, nTx = 0, yms = [];
    for (var ym in b.months) {
      if (!ymRe.test(ym) || !b.months[ym] || typeof b.months[ym].tx !== 'object') return { error: T('Isi file backup rusak di bulan ', 'The backup file is damaged at month ') + ym + '.' };
      yms.push(ym);
      for (var id in b.months[ym].tx) { var t = b.months[ym].tx[id]; if (t && !t.deleted) nTx++; }
    }
    yms.sort();
    var count = function (o) { var n = 0; for (var k in (o || {})) if (o[k] && !o[k].archived && !o[k].deleted) n++; return n; };
    return {
      data: b,
      summary: { wallets: count(b.meta.wallets), categories: count(b.meta.categories), tx: nTx, from: yms[0] || null, to: yms[yms.length - 1] || null, exportedAt: b.exportedAt || null }
    };
  }

  var api = {
    NAMES: NAMES, setLang: setLang, lang: lang, T: T, pad: pad, dayName: dayName, weekHeads: weekHeads, decimal: decimal,
    dateKey: dateKey, todayKey: todayKey, parseKey: parseKey, ymOf: ymOf, addMonths: addMonths, daysInMonth: daysInMonth,
    addDays: addDays, daysBetween: daysBetween, monthLabel: monthLabel, monthName: monthName, dayLabel: dayLabel, dayLong: dayLong, weekdayMon: weekdayMon,
    num: num, rp: rp, rpSigned: rpSigned, compact: compact, parseAmount: parseAmount, formatInput: formatInput, uid: uid,
    flatten: flatten, balances: balances, flows: flows, summarize: summarize, topDay: topDay, periodDays: periodDays, niceMax: niceMax,
    budgetStatus: budgetStatus, debtState: debtState, recurringFirstYM: recurringFirstYM, dueRecurring: dueRecurring, nextDue: nextDue, goalState: goalState,
    evalExpr: evalExpr, fmtExpr: fmtExpr, hasOp: hasOp, favorites: favorites, categoryUsage: categoryUsage, categoryChanges: categoryChanges, balanceSeries: balanceSeries,
    exportRows: exportRows, monthlyRows: monthlyRows, toCSV: toCSV, META_DOCS: META_DOCS, makeBackup: makeBackup, readBackup: readBackup
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Core = api;
})(this);
