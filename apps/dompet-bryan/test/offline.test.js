// Bad signal: the page opens from its local copy, and changes made without a connection wait in the outbox.
const { JSDOM } = require('jsdom'); const fs = require('fs'); const path = require('path'); const assert = require('assert');
const dir = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/<script src="[^"]+"><\/script>/g, '').replace(/<link[^>]*>/g, '');
const coreSrc = fs.readFileSync(path.join(dir, 'core.js'), 'utf8'), appSrc = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');
const clone = o => JSON.parse(JSON.stringify(o));
function merge(a, b) { for (const k in b) { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = clone(b[k]); } return a; }
const tick = (ms = 30) => new Promise(r => setTimeout(r, ms));

// --- the db as the server holds it. net.verbs: reads and writes get through; net.subs: live updates arrive
const store = {}, net = { verbs: true, subs: true, fail: null };
const offline = () => { const e = new Error('offline'); e.code = 'unavailable'; return Promise.reject(e); };
function failOnce() { if (!net.fail) return; const e = new Error(net.fail); e.code = net.fail; net.fail = null; throw e; }

function page(ls) {
  const dom = new JSDOM('<!doctype html><html><head></head><body>' + html + '</body></html>', { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://claude.ai/' });
  const w = dom.window, d = w.document, errors = [];
  w.addEventListener('error', e => errors.push(e.message));
  if (!w.HTMLDialogElement.prototype.showModal) {
    w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
    w.HTMLDialogElement.prototype.close = function () { if (!this.hasAttribute('open')) return; this.removeAttribute('open'); this.dispatchEvent(new w.Event('close')); };
  }
  w.CSS = { escape: s => String(s).replace(/[^a-zA-Z0-9_-]/g, c => '\\' + c) };
  w.scrollTo = () => {};
  w.Element.prototype.scrollIntoView = function () {};
  Object.entries(ls || {}).forEach(([k, v]) => w.localStorage.setItem(k, v));
  const subs = {};
  const snapOf = col => { const docs = Object.keys(store).filter(p => p.split('/')[0] === col).map(p => ({ id: p.split('/')[1], exists: true, data: () => clone(store[p]) })); return { docs, size: docs.length, empty: !docs.length }; };
  const deliver = col => (subs[col] || []).forEach(fn => fn(snapOf(col)));
  const notify = col => { if (net.subs) setTimeout(() => deliver(col), 0); };
  const docRef = p => {
    const col = p.split('/')[0];
    return {
      get: async () => { if (!net.verbs) return offline(); return { id: p.split('/')[1], exists: !!store[p], data: () => store[p] && clone(store[p]) }; },
      set: async v => { if (!net.verbs) return offline(); failOnce(); store[p] = clone(v); notify(col); },
      update: async v => { if (!net.verbs) return offline(); failOnce(); if (!store[p]) { const e = new Error('missing'); e.code = 'invalid_argument'; throw e; } merge(store[p], v); notify(col); },
      delete: async () => { if (!net.verbs) return offline(); delete store[p]; notify(col); }
    };
  };
  const db = { doc: docRef, collection: col => ({ limit() { return this; }, onSnapshot(fn) { (subs[col] = subs[col] || []).push(fn); if (net.subs) setTimeout(() => fn(snapOf(col)), 5); return () => {}; } }) };
  w.claude = { use: async n => n === 'db' ? db : n === 'user' ? { can: async () => true } : null };
  w.eval(coreSrc); w.eval(appSrc);
  const $ = s => d.querySelector(s);
  const click = el => { assert.ok(el, 'missing element to click'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
  return {
    w, $, errors, C: w.Core,
    hero: () => $('#hero-total') && $('#hero-total').dataset.v,
    pill: () => ($('.sync') || { textContent: '' }).textContent,
    toast: () => $('#toast').textContent,
    spend(amount) {
      click($('.fab'));
      for (const ch of String(amount)) click($('[data-act="kp"][data-v="' + ch + '"]'));
      $('#sheet input[name="category"][value="makan"]').checked = true;
      $('#sheet form').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
    },
    dropLine() { net.verbs = net.subs = false; w.dispatchEvent(new w.Event('offline')); },
    reconnect() { net.verbs = net.subs = true; w.dispatchEvent(new w.Event('online')); Object.keys(subs).forEach(deliver); },
    storage() { const o = {}; for (let i = 0; i < w.localStorage.length; i++) { const k = w.localStorage.key(i); o[k] = w.localStorage.getItem(k); } return o; }
  };
}

store['meta/categories'] = { list: { makan: { name: 'Makan & Minum', type: 'out', icon: 'utensils', color: 2, order: 1 } } };
store['meta/wallets'] = { list: { w1: { name: 'Cash', kind: 'cash', color: 'oranye', initial: 100000, order: 1, createdAt: 1, archived: false } } };
const amounts = () => Object.keys(store).filter(p => p.startsWith('months/')).flatMap(p => Object.values(store[p].tx)).filter(t => !t.deleted).map(t => t.amount).sort((a, b) => a - b);

(async () => {
  const A = page();
  const today = A.C.todayKey();
  store['meta/settings'] = { lastBackup: today, gapReminder: false };
  await tick(80);
  assert.strictEqual(A.hero(), '100000');
  assert.strictEqual(A.pill(), '', 'no pill while connected');

  // 1. the line drops with the page open: the expense stays on screen and waits
  A.dropLine();
  A.spend(25000); await tick(60);
  assert.strictEqual(A.hero(), '75000', 'shown at once');
  assert.deepStrictEqual(amounts(), [], 'not on the server yet');
  assert.ok(A.storage()['dompet:outbox'], 'kept in the outbox');
  assert.ok(A.pill().includes('Belum tersambung') && A.pill().includes('1 perubahan belum terkirim'), 'pill says so: ' + A.pill());
  await tick(1500); // first try and its retry both fail
  assert.strictEqual(A.hero(), '75000', 'a failed send does not take it off the screen');

  // 2. the line comes back: it is sent by itself
  A.reconnect(); await tick(300);
  assert.deepStrictEqual(amounts(), [25000], 'sent once back online');
  assert.ok(!A.storage()['dompet:outbox'], 'outbox empty');
  assert.ok(A.toast().includes('Semua perubahan sudah terkirim'), 'told it went out');
  assert.strictEqual(A.pill(), '');
  await tick(1100); // local copy saved

  // 3. the line drops again and the page is closed with a change still waiting
  A.dropLine();
  A.spend(10000); await tick(60);
  A.w.dispatchEvent(new A.w.Event('pagehide'));
  const saved = A.storage();
  assert.ok(saved['dompet:cache'] && saved['dompet:outbox']);
  A.w.close();

  // 4. reopened on a slow line: writes would get through but the data has not arrived yet
  net.verbs = true; net.subs = false;
  const B = page(saved);
  await tick(30);
  assert.strictEqual(B.hero(), '65000', 'opens from the local copy with the waiting change on top');
  assert.ok(B.pill().includes('Menyambung') && B.pill().includes('data terakhir jam') && B.pill().includes('1 perubahan belum terkirim'), 'pill: ' + B.pill());
  B.spend(5000); await tick(60);
  assert.strictEqual(B.hero(), '60000');
  assert.deepStrictEqual(amounts(), [25000], 'nothing is sent before the db has answered once');
  assert.ok(B.pill().includes('2 perubahan belum terkirim'), 'pill: ' + B.pill());

  // 5. the data arrives: both waiting expenses go out
  B.reconnect(); await tick(300);
  assert.deepStrictEqual(amounts(), [5000, 10000, 25000], 'both sent');
  assert.ok(!B.storage()['dompet:outbox'], 'outbox empty');
  assert.ok(B.toast().includes('Semua perubahan sudah terkirim'));
  assert.strictEqual(B.pill(), '');
  assert.strictEqual(B.hero(), '60000');

  // 6. a write the db refuses for good is dropped and the screen shows the db's data again
  net.fail = 'quota_exceeded';
  B.spend(7000); await tick(100);
  assert.strictEqual(B.hero(), '60000', 'refused expense taken back off');
  assert.ok(B.toast().includes('Penyimpanan penuh'), 'told why');
  assert.ok(!B.storage()['dompet:outbox'], 'not retried forever');
  assert.deepStrictEqual(amounts(), [5000, 10000, 25000]);

  assert.deepStrictEqual(A.errors.concat(B.errors), [], 'no page errors');
  console.log('offline: all checks passed');
  process.exit(0);
})().catch(e => { console.error('FAIL:', e.message); process.exit(1); });
