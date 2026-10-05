const C = require('../core.js'); const assert = require('assert');
// formatting
assert.strictEqual(C.rp(25000), 'Rp 25.000');
assert.strictEqual(C.rp(-1500), '−Rp 1.500');
assert.strictEqual(C.rpSigned(500000), '+Rp 500.000');
assert.strictEqual(C.compact(43000), '43rb'); assert.strictEqual(C.compact(1200000), '1,2jt'); assert.strictEqual(C.compact(43500), '43,5rb'); assert.strictEqual(C.compact(1.5e9), '1,5M');
assert.strictEqual(C.parseAmount('1.250.000'), 1250000); assert.strictEqual(C.parseAmount(''), 0); assert.strictEqual(C.formatInput('1250000'), '1.250.000');
// dates: local, WIB-safe
assert.strictEqual(C.todayKey(new Date(2026, 9, 5, 0, 30)), '2026-10-05');
assert.strictEqual(C.addMonths('2026-01', -1), '2025-12'); assert.strictEqual(C.addMonths('2026-12', 1), '2027-01'); assert.strictEqual(C.addMonths('2026-10', -14), '2025-08');
assert.strictEqual(C.daysInMonth('2028-02'), 29); assert.strictEqual(C.weekdayMon('2026-10-05'), 0); // Monday
assert.strictEqual(C.dayLabel('2026-10-05'), 'Senin, 5 Okt');
// data
const wallets = { cash: { name: 'Cash', initial: 100000 }, bca: { name: 'BCA', initial: 2000000 }, tab: { name: 'Tabungan Laptop', initial: 0 } };
const months = {
  '2026-09': { tx: {
    a: { date: '2026-09-30', type: 'out', amount: 50000, wallet: 'cash', category: 'makan', createdAt: 1 },
    gone: { date: '2026-09-29', type: 'out', amount: 999999, wallet: 'cash', category: 'makan', deleted: true }
  } },
  '2026-10': { tx: {
    b: { date: '2026-10-01', type: 'out', amount: 1200000, wallet: 'bca', category: 'kost', createdAt: 2 },
    c: { date: '2026-10-02', type: 'transfer', amount: 500000, fee: 2500, wallet: 'bca', toWallet: 'cash', createdAt: 3 },
    d: { date: '2026-10-03', type: 'in', amount: 300000, wallet: 'bca', category: 'saku', createdAt: 4 },
    e: { date: '2026-10-04', type: 'out', amount: 150000, wallet: 'cash', debt: 'd1', debtRole: 'start', createdAt: 5 },
    f: { date: '2026-10-05', type: 'in', amount: 50000, wallet: 'cash', debt: 'd1', debtRole: 'pay', createdAt: 6 },
    g: { date: '2026-10-05', type: 'out', amount: 20000, wallet: 'cash', adjust: true, createdAt: 7 },
    h: { date: '2026-10-05', type: 'transfer', amount: 400000, wallet: 'bca', toWallet: 'tab', createdAt: 8 }
  } }
};
const txs = C.flatten(months);
assert.strictEqual(txs.length, 8); assert.strictEqual(txs[0].id, 'h'); // newest first, tombstone dropped
const bal = C.balances(wallets, txs);
assert.strictEqual(bal.cash, 100000 - 50000 + 500000 - 150000 + 50000 - 20000);   // 430000
assert.strictEqual(bal.bca, 2000000 - 1200000 - 500000 - 2500 + 300000 - 400000); // 197500
assert.strictEqual(bal.tab, 400000);
const fl = C.flows(txs);
const oct = C.summarize(fl, f => f.date.startsWith('2026-10'));
assert.strictEqual(oct.out, 1200000 + 2500); // kost + admin fee only; debt/adjust/transfer excluded
assert.strictEqual(oct.in, 300000);
assert.strictEqual(oct.byCat.out.admin, 2500);
assert.strictEqual(C.topDay(oct.byDay).date, '2026-10-01');
assert.strictEqual(C.periodDays('month', '2026-10', '2026-10-05'), 5);
assert.strictEqual(C.periodDays('month', '2026-09', '2026-10-05'), 30);
assert.strictEqual(C.periodDays('year', '2026', '2026-01-03'), 3);
assert.strictEqual(C.niceMax(1.2e6), 2e6); assert.strictEqual(C.niceMax(2.3e6), 2.5e6); assert.strictEqual(C.niceMax(0), 1);
// debt
const ds = C.debtState({ amount: 150000 }, 'd1', txs); assert.strictEqual(ds.left, 100000); assert.strictEqual(ds.settled, false);
// budget
assert.strictEqual(C.budgetStatus(850000, 1000000).level, 'near'); assert.strictEqual(C.budgetStatus(1100000, 1000000).level, 'over'); assert.strictEqual(C.budgetStatus(1, 0), null);
// recurring
const rec = { k: { day: 1, amount: 1200000, lastDone: '2026-09' }, j: { day: 31, lastDone: '2026-09' }, x: { day: 1, lastDone: '2026-10' }, z: { day: 1, active: false } };
const due = C.dueRecurring(rec, '2026-10-05'); assert.deepStrictEqual(due.map(r => r.id), ['k']); assert.strictEqual(due[0].dueDate, '2026-10-01');
assert.deepStrictEqual(C.dueRecurring({ j: { day: 31, lastDone: '2026-10' } }, '2026-11-30').map(r => r.dueDate), ['2026-11-30']); // clamp to 30 Nov
assert.strictEqual(C.recurringFirstYM(1, '2026-10-05'), '2026-11'); assert.strictEqual(C.recurringFirstYM(10, '2026-10-05'), '2026-10');
assert.strictEqual(C.nextDue({ day: 31, lastDone: '2026-10' }, '2027-01-05'), '2027-01-31');
// goal
const gs = C.goalState({ target: 8000000, deadline: '2027-04-30' }, 2400000, '2026-10-05');
assert.strictEqual(gs.left, 5600000); assert.strictEqual(gs.monthsLeft, 6); assert.strictEqual(gs.perMonth, 933334);
// export + backup round trip
const rows = C.exportRows(txs, wallets, { makan: { name: 'Makan & Minum' }, kost: { name: 'Kost & Tagihan' }, saku: { name: 'Uang Saku' } }, { d1: { person: 'Andi' } });
assert.strictEqual(rows[0].Tanggal, '2026-09-30'); assert.strictEqual(rows[0].Jumlah, -50000);
assert.ok(rows.some(r => r.Tanda === 'Utang-piutang: Andi'));
assert.ok(C.toCSV(rows).startsWith('\ufeffTanggal;Hari;Jenis'));
const mr = C.monthlyRows(fl); assert.deepStrictEqual(mr.map(r => r.Bulan), ['September 2026', 'Oktober 2026']); assert.strictEqual(mr[1].Selisih, 300000 - 1202500);
const bk = JSON.stringify(C.makeBackup({ wallets, categories: {} }, months));
const rd = C.readBackup(bk); assert.ok(!rd.error); assert.strictEqual(rd.summary.tx, 8); assert.strictEqual(rd.summary.wallets, 3); assert.strictEqual(rd.summary.from, '2026-09');
assert.ok(C.readBackup('{"app":"lain"}').error); assert.ok(C.readBackup('not json').error);
console.log('core: all checks passed');
// --- calculator
assert.strictEqual(C.evalExpr('25000+12000'), 37000);
assert.strictEqual(C.evalExpr('120000÷3'), 40000);
assert.strictEqual(C.evalExpr('10000+2×5000'), 20000);
assert.strictEqual(C.evalExpr('50000−'), 50000);
assert.ok(isNaN(C.evalExpr('5÷0')));
assert.strictEqual(C.fmtExpr('25000+12000'), '25.000 + 12.000');
assert.ok(C.hasOp('1+2') && !C.hasOp('12'));
// --- favorites + usage
const fav = C.favorites([
  { date: '2026-10-05', type: 'out', category: 'makan', wallet: 'cash', amount: 25000, note: 'Makan siang' },
  { date: '2026-10-04', type: 'out', category: 'makan', wallet: 'cash', amount: 25000, note: 'makan siang ' },
  { date: '2026-10-03', type: 'out', category: 'transport', wallet: 'cash', amount: 18000, note: 'Gojek' },
  { date: '2026-06-01', type: 'out', category: 'transport', wallet: 'cash', amount: 18000, note: 'Gojek' }
], '2026-10-06');
assert.strictEqual(fav.length, 1); assert.strictEqual(fav[0].count, 2); assert.strictEqual(fav[0].amount, 25000);
assert.deepStrictEqual(C.categoryUsage([{ date: '2026-10-01', category: 'makan' }, { date: '2026-10-02', category: 'makan' }], '2026-10-06'), { makan: 2 });
// --- category change and balance series
const ch = C.categoryChanges(fl, f => f.date.startsWith('2026-10'), f => f.date.startsWith('2026-09'), 'out');
assert.strictEqual(ch[0].id, 'kost'); assert.strictEqual(ch[0].pct, null);
assert.ok(ch.some(r => r.id === 'makan' && r.diff === -50000 && r.pct === -1));
const ser = C.balanceSeries(wallets, txs, ['2026-08', '2026-09', '2026-10'], () => true);
assert.deepStrictEqual(ser.map(s => s.bal), [2100000, 2050000, 2050000 - 1200000 - 2500 + 300000 - 150000 + 50000 - 20000]);
const serCash = C.balanceSeries(wallets, txs, ['2026-10'], id => id === 'cash');
assert.strictEqual(serCash[0].bal, bal.cash);
// --- recurring every N days
const rdays = { c: { freq: 'days', every: 28, next: '2026-10-06', amount: 450000 } };
assert.strictEqual(C.dueRecurring(rdays, '2026-10-06')[0].dueDate, '2026-10-06');
assert.strictEqual(C.dueRecurring(rdays, '2026-10-05').length, 0);
assert.strictEqual(C.nextDue(rdays.c, '2026-10-01'), '2026-10-06');
console.log('core extras: all checks passed');
