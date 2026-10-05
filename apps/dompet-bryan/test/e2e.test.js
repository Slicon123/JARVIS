const { JSDOM } = require('jsdom'); const fs = require('fs'); const path = require('path'); const assert = require('assert');
const dir = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/<script src="[^"]+"><\/script>/g, '').replace(/<link[^>]*>/g, '');
const dom = new JSDOM('<!doctype html><html><head></head><body>' + html + '</body></html>', { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://claude.ai/' });
const w = dom.window, d = w.document;
const errors = []; w.addEventListener('error', e => errors.push(e.message));
// --- jsdom gaps
if (!w.HTMLDialogElement.prototype.showModal) {
  w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  w.HTMLDialogElement.prototype.close = function () { if (!this.hasAttribute('open')) return; this.removeAttribute('open'); this.dispatchEvent(new w.Event('close')); };
}
w.CSS = { escape: s => String(s).replace(/[^a-zA-Z0-9_-]/g, c => '\\' + c) };
w.scrollTo = () => {};
w.Element.prototype.scrollIntoView = function () {};
// --- fake db
const store = {}; const subs = {};
const clone = o => JSON.parse(JSON.stringify(o));
function merge(a, b) { for (const k in b) { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = clone(b[k]); } return a; }
function notify(col) { setTimeout(() => (subs[col] || []).forEach(fn => fn(snapOf(col))), 0); }
function snapOf(col) { const docs = Object.keys(store).filter(p => p.split('/')[0] === col).map(p => ({ id: p.split('/')[1], exists: true, data: () => clone(store[p]) })); return { docs, size: docs.length, empty: !docs.length }; }
const writes = [];
function docRef(p) {
  const col = p.split('/')[0];
  return {
    get: async () => ({ id: p.split('/')[1], exists: !!store[p], data: () => store[p] && clone(store[p]) }),
    set: async v => { writes.push(['set', p]); store[p] = clone(v); notify(col); },
    update: async v => { writes.push(['update', p]); if (!store[p]) { const e = new Error('missing'); e.code = 'invalid_argument'; throw e; } merge(store[p], v); notify(col); },
    delete: async () => { delete store[p]; notify(col); }
  };
}
const db = { doc: docRef, collection: col => ({ limit() { return this; }, onSnapshot(fn) { (subs[col] = subs[col] || []).push(fn); setTimeout(() => fn(snapOf(col)), 5); return () => {}; } }) };
store['meta/categories'] = { list: {
  makan: { name: 'Makan & Minum', type: 'out', icon: 'utensils', color: 2, order: 1 },
  transport: { name: 'Transportasi', type: 'out', icon: 'bus', color: 1, order: 2 },
  saku: { name: 'Uang Saku / Kiriman', type: 'in', icon: 'coins', color: 1, order: 1 }
} };
w.claude = { use: async n => n === 'db' ? db : n === 'user' ? { can: async () => true } : n === 'downloads' ? { save: async () => ({ status: 'saved' }) } : null };
w.eval(fs.readFileSync(path.join(dir, 'core.js'), 'utf8'));
w.eval(fs.readFileSync(path.join(dir, 'app.js'), 'utf8'));
const C = w.Core;
const tick = (ms = 30) => new Promise(r => setTimeout(r, ms));
const $ = s => d.querySelector(s);
const $$ = s => [...d.querySelectorAll(s)];
const click = el => { assert.ok(el, 'missing element to click'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
const type = (el, v) => { el.value = v; el.dispatchEvent(new w.Event('input', { bubbles: true })); };
const submit = f => f.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
const pick = el => { el.checked = true; el.dispatchEvent(new w.Event('change', { bubbles: true })); };
const kp = s => { for (const ch of s) click($('[data-act="kp"][data-v="' + ch + '"]')); };
const tab = t => click($('.tab[data-v="' + t + '"]'));
const more = v => click($('[data-act="more"][data-v="' + v + '"]'));
const back = () => click($('[data-act="more-back"]'));
const txList = () => Object.values(store).filter((v, i) => Object.keys(store)[i].startsWith('months/')).flatMap(m => Object.values(m.tx));
const today = C.todayKey();
(async () => {
  await tick(60);
  assert.ok($('#view').textContent.includes('Bikin wallet pertama'), 'onboarding shown');
  // 1. first wallet
  click($('[data-act="w-suggest"][data-v="0"]'));
  type($('#ob-initial'), '100000'); assert.strictEqual($('#ob-initial').value, '100.000');
  submit($('form[data-submit="wallet"]')); await tick(60);
  const wid = Object.keys(store['meta/wallets'].list)[0];
  assert.strictEqual($('#hero-total').dataset.v, '100000');
  assert.ok($('[data-act="bk-later"]'), 'backup nudge on Home when never backed up');

  // 2. + opens the sheet with a number pad; closing leaves the + button clean
  click($('.fab')); assert.ok($('#sheet').hasAttribute('open'));
  assert.strictEqual($$('.keypad .key').length, 16, 'number pad');
  const fcat = $('#f-cat'), fwal = $('#t-wallet-l').closest('.field');
  assert.ok(fcat.compareDocumentPosition(fwal) & w.Node.DOCUMENT_POSITION_FOLLOWING, 'category comes before wallet');
  click($('[data-act="sheet-close"]'));
  assert.ok(!$('#sheet').hasAttribute('open'));
  assert.ok(!$('.fab').classList.contains('spin') && d.activeElement !== $('.fab'), 'no stuck state on +');

  // 3. validation, then calculator 25000+12000 = 37000
  click($('.fab')); submit($('#sheet form'));
  assert.ok($('#t-amount-err').classList.contains('on') && $('#t-cat-err').classList.contains('on'), 'errors shown');
  kp('25000'); click($('[data-act="kp"][data-v="+"]')); kp('12000');
  assert.strictEqual($('#t-amt').textContent, '37.000'); assert.strictEqual($('#t-expr').textContent, '25.000 + 12.000 =');
  click($('[data-act="kp"][data-v="⌫"]')); assert.strictEqual($('#t-amt').textContent, '26.200', 'backspace edits the sum');
  kp('0');
  $('#sheet input[name="category"][value="makan"]').checked = true;
  $('#t-note').value = 'Makan siang';
  submit($('#sheet form')); await tick(60);
  assert.ok(txList().some(t => t.amount === 37000 && t.category === 'makan'), 'calculated amount stored');
  assert.strictEqual($('#hero-total').dataset.v, '63000');

  // 4. same thing again -> it becomes a one-tap favourite on Home
  click($('.fab')); kp('37000'); $('#sheet input[name="category"][value="makan"]').checked = true; $('#t-note').value = 'Makan siang'; submit($('#sheet form')); await tick(60);
  const fav = $('[data-act="fav-save"]'); assert.ok(fav, 'favourite chip on Home');
  click(fav); await tick(60);
  assert.strictEqual(txList().filter(t => t.amount === 37000).length, 3, 'one-tap favourite saved');
  // categories now ordered by use: makan first
  click($('.fab')); assert.strictEqual($('#sheet [data-cats="out"] input').value, 'makan', 'most used category first'); click($('[data-act="sheet-close"]'));

  // 5. an expense from 3 days ago -> gap reminder appears; turn it off
  click($('.fab')); kp('5000'); $('#sheet input[name="category"][value="transport"]').checked = true;
  $('#t-date').value = C.addDays(today, -3); submit($('#sheet form')); await tick(60);
  if (!txList().some(t => t.date === C.addDays(today, -1))) {
    assert.ok($('[data-act="gap-off"]'), 'gap reminder shown');
    click($('[data-act="gap-off"]')); await tick(60);
    assert.strictEqual(store['meta/settings'].gapReminder, false); assert.ok(!$('[data-act="gap-off"]'), 'gap reminder off');
  }

  // 6. overspend -> negative balance banner and badge
  click($('.fab')); kp('200000'); $('#sheet input[name="category"][value="transport"]').checked = true; submit($('#sheet form')); await tick(60);
  assert.ok($('[data-act="neg-in"]') && $('.neg-badge'), 'negative balance flagged');
  click($('[data-act="neg-in"]')); assert.ok($('#sheet').hasAttribute('open') && $('#sheet input[name="type"][value="in"]').checked, 'income sheet opens');
  kp('500000'); $('#sheet [data-cats="in"] input[value="saku"]').checked = true; submit($('#sheet form')); await tick(60);
  assert.ok(!$('.neg-badge'), 'badge gone once positive');

  // 7. history: delete + undo, search, hide amounts
  tab('hist'); await tick();
  const anyRow = $('.tx'); const tid = anyRow.dataset.id, tym = anyRow.dataset.v;
  click(anyRow); click($('[data-act="tx-del"]')); await tick(60);
  assert.strictEqual(store['months/' + tym].tx[tid].deleted, true);
  click($('#toast-act')); await tick(60); assert.strictEqual(store['months/' + tym].tx[tid].deleted, false);
  click($('.page-head [data-act="hide"]')); await tick();
  assert.ok($('.tx-amt').textContent.includes('••'), 'amounts hidden in History');
  click($('.page-head [data-act="hide"]')); await tick();

  // 8. recurring every N days, due today -> record from Home, delete brings it back
  tab('more'); more('recurring'); click($('[data-act="rec-new"]'));
  $('#r-note').value = 'Catering'; type($('#r-amount'), '450000'); $('#sheet [data-cats="out"] input[value="makan"]').checked = true;
  pick($('#sheet input[name="rfreq"][value="days"]')); assert.ok(!$('#r-days').hidden, 'days fields shown');
  $('#r-every').value = '28'; $('#r-next').value = today; submit($('#sheet form')); await tick(60);
  const rid = Object.keys(store['meta/recurring'].list)[0];
  assert.strictEqual(store['meta/recurring'].list[rid].freq, 'days');
  tab('home'); await tick();
  click($('[data-act="rec-do"][data-id="' + rid + '"]')); await tick(60);
  assert.strictEqual(store['meta/recurring'].list[rid].next, C.addDays(today, 28), 'next date moved by 28 days');
  const recTx = txList().find(t => t.recurring === rid); assert.ok(recTx);
  tab('hist'); await tick();
  const recRow = $$('.tx').find(r => r.textContent.includes('Rutin') || r.textContent.includes('Recurring')); click(recRow); click($('[data-act="tx-del"]')); await tick(60);
  assert.strictEqual(store['meta/recurring'].list[rid].next, today, 'reminder back after delete');

  // 9. reports: balance chart + changes; Lainnya: settings, theme, reorder
  tab('rep'); await tick();
  assert.ok($('.bline') && $('.donut'), 'balance chart and donut');
  tab('more'); more('goals'); click($('[data-act="goal-new"]')); $('#g-name').value = 'Laptop'; type($('#g-target'), '8000000'); submit($('#sheet form')); await tick(60);
  back(); more('wallets');
  const firstName = $('.wrow .mrow-t').textContent;
  click($('.wrow [data-act="w-down"]')); await tick(60);
  assert.notStrictEqual($('.wrow .mrow-t').textContent, firstName, 'wallet moved down');
  back(); pick($('input[name="theme"][value="dark"]')); assert.strictEqual(d.documentElement.getAttribute('data-theme'), 'dark');
  pick($('input[name="theme"][value="auto"]')); assert.ok(!d.documentElement.hasAttribute('data-theme'), 'auto restores host theme');

  // 10. backup clears the nudge; English pass
  more('backup'); click($('[data-act="backup-json"]')); await tick(80);
  assert.ok(store['meta/settings'].lastBackup, 'lastBackup recorded');
  tab('home'); await tick(); assert.ok(!$('[data-act="bk-later"]'), 'backup nudge gone');
  tab('more'); pick($('input[name="lang"][value="en"]')); await tick(60);
  assert.strictEqual($('.tab[data-v="home"] span').textContent, 'Home');
  click($('.fab')); assert.ok($('#sheet').textContent.includes('Add transaction') && $('.key[aria-label="plus"]'), 'sheet and pad in English'); click($('[data-act="sheet-close"]'));
  tab('rep'); await tick(); assert.ok($('#view').textContent.includes('Total balance month by month'), 'chart title in English');
  tab('more'); pick($('input[name="lang"][value="id"]')); await tick(60);
  assert.deepStrictEqual(errors, [], 'no page errors');
  console.log('e2e: all checks passed;', Object.keys(store).length, 'docs,', txList().length, 'transactions,', writes.length, 'writes');
  process.exit(0);
})().catch(e => { console.error('FAIL:', e.message, errors); process.exit(1); });
