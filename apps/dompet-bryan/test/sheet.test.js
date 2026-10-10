// The sheet as Chrome runs it: close() hands focus back to the button that opened the sheet, and the close event
// comes a frame later. A new sheet opened in that gap used to be emptied by the late event, leaving an invisible
// modal that blocked the whole page (the phone keyboard's Go key, then a second Enter, did it).
const { JSDOM } = require('jsdom'); const fs = require('fs'); const path = require('path'); const assert = require('assert');
const dir = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/<script src="[^"]+"><\/script>/g, '').replace(/<link[^>]*>/g, '');
const dom = new JSDOM('<!doctype html><html><head></head><body>' + html + '</body></html>', { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://claude.ai/' });
const w = dom.window, d = w.document;
const errors = []; w.addEventListener('error', e => errors.push(e.message));
w.HTMLDialogElement.prototype.showModal = function () { if (this.hasAttribute('open')) return; this._prev = d.activeElement; this.setAttribute('open', ''); };
w.HTMLDialogElement.prototype.close = function () {
  if (!this.hasAttribute('open')) return;
  this.removeAttribute('open');
  if (this._prev && this._prev.isConnected) this._prev.focus();
  setTimeout(() => this.dispatchEvent(new w.Event('close')), 16);
};
Object.defineProperty(w.HTMLDialogElement.prototype, 'open', { get() { return this.hasAttribute('open'); } });
w.CSS = { escape: s => String(s).replace(/[^a-zA-Z0-9_-]/g, c => '\\' + c) };
w.scrollTo = () => {};
w.Element.prototype.scrollIntoView = function () {};
// --- fake db
const clone = o => JSON.parse(JSON.stringify(o));
function merge(a, b) { for (const k in b) { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = clone(b[k]); } return a; }
const store = {}, subs = {};
const snapOf = col => { const docs = Object.keys(store).filter(p => p.split('/')[0] === col).map(p => ({ id: p.split('/')[1], exists: true, data: () => clone(store[p]) })); return { docs, size: docs.length, empty: !docs.length }; };
const notify = col => setTimeout(() => (subs[col] || []).forEach(fn => fn(snapOf(col))), 0);
const docRef = p => {
  const col = p.split('/')[0];
  return {
    get: async () => ({ id: p.split('/')[1], exists: !!store[p], data: () => store[p] && clone(store[p]) }),
    set: async v => { store[p] = clone(v); notify(col); },
    update: async v => { if (!store[p]) { const e = new Error('missing'); e.code = 'invalid_argument'; throw e; } merge(store[p], v); notify(col); },
    delete: async () => { delete store[p]; notify(col); }
  };
};
const db = { doc: docRef, collection: col => ({ limit() { return this; }, onSnapshot(fn) { (subs[col] = subs[col] || []).push(fn); setTimeout(() => fn(snapOf(col)), 5); return () => {}; } }) };
store['meta/wallets'] = { list: { w1: { name: 'Cash', kind: 'cash', color: 'oranye', initial: 500000, order: 1, createdAt: 1 } } };
store['meta/categories'] = { list: {
  makan: { name: 'Makan & Minum', type: 'out', icon: 'utensils', color: 2, order: 1 },
  kost: { name: 'Kost & Tagihan', type: 'out', icon: 'home', color: 3, order: 2, archived: true }
} };
store['meta/settings'] = { lastBackup: '2099-01-01' };
store['meta/recurring'] = { list: { r1: { type: 'out', note: 'Kost', amount: 900000, wallet: 'w1', category: 'kost', freq: 'monthly', day: 1, lastDone: '2000-01', active: true } } };
w.claude = { use: async n => n === 'db' ? db : n === 'user' ? { can: async () => true } : null };
w.eval(fs.readFileSync(path.join(dir, 'core.js'), 'utf8'));
w.eval(fs.readFileSync(path.join(dir, 'app.js'), 'utf8'));
const tick = (ms = 30) => new Promise(r => setTimeout(r, ms));
const $ = s => d.querySelector(s);
const sheet = $('#sheet');
// a finger: pointerdown, focus (Chrome focuses a tapped button or field), click
const tap = el => { assert.ok(el, 'missing element to tap'); el.dispatchEvent(new w.Event('pointerdown', { bubbles: true })); el.focus(); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
// Enter as the browser handles it: the page's keydown handlers, then the default action
// (in a text field: submit the form; on a button: press it)
const enter = () => {
  const t = d.activeElement;
  if (!t.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))) return;
  if (t.tagName === 'INPUT' && t.form) t.form.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
  else if (t.tagName === 'BUTTON') t.click();
};
const kp = s => { for (const ch of s) tap($('[data-act="kp"][data-v="' + ch + '"]')); };
const stuck = () => sheet.open && !sheet.querySelector('form');
(async () => {
  await tick(60);
  assert.ok($('.qchip[data-type="out"]'), 'Home shows the quick Expense chip');

  // 1. Expense chip -> amount, category, note, then Go on the phone keyboard, and a second Enter right behind it
  tap($('.qchip[data-type="out"]'));
  kp('25000'); tap($('#sheet input[name="category"][value="makan"]'));
  tap($('#t-note')); $('#t-note').value = 'nasi padang';
  enter(); enter();
  await tick(60);
  assert.ok(!stuck(), 'no empty sheet left open over the page');
  assert.ok(!sheet.open, 'the second Enter does not open the sheet again');
  const saved = Object.keys(store).filter(k => k.startsWith('months/')).flatMap(k => Object.values(store[k].tx));
  assert.ok(saved.length === 1 && saved[0].amount === 25000 && saved[0].note === 'nasi padang', 'saved once');

  // 2. editing a row, Go: the row that opened the sheet must not open it again
  tap($('.tx[data-act="tx-edit"]'));
  tap($('#t-note')); $('#t-note').value = 'nasi padang enak';
  enter(); enter();
  await tick(60);
  assert.ok(!stuck() && !sheet.open, 'edit closes cleanly');

  // 3. "Catat sekarang" on a recurring item whose category is archived: one sheet closes, the record sheet opens
  tap($('.tab[data-v="more"]')); tap($('[data-act="more"][data-v="recurring"]'));
  tap($('[data-act="rec-edit"][data-id="r1"]'));
  tap($('[data-act="rec-now"]'));
  await tick(60);
  assert.ok(sheet.open && $('#t-amt') && $('#t-amt').textContent === '900.000', 'record sheet stays filled after the late close event');
  tap($('[data-act="sheet-close"]')); await tick(60);

  // 4. the number pad steps aside for the keyboard, not for the date picker
  tap($('.tab[data-v="home"]')); tap($('.fab'));
  tap($('#t-date')); assert.ok(!sheet.classList.contains('kp-off'), 'number pad stays for the date field');
  tap($('#t-note')); assert.ok(sheet.classList.contains('kp-off'), 'number pad steps aside for the note');
  tap($('[data-act="sheet-close"]')); await tick(60);

  assert.deepStrictEqual(errors, [], 'no page errors');
  console.log('sheet: all checks passed');
  process.exit(0);
})().catch(e => { console.error('FAIL:', e.message, errors); process.exit(1); });
