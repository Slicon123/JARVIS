// Fingers in real Chrome: jsdom has no touch, no gestures and no hit-testing, and these bugs live there.
// Drives headless Chrome over DevTools with a phone screen, touch input and a fake db. Run: npm run test:touch
// - a tap while another finger rests on the screen got no click (the thumb holding the phone)
// - two thumbs on the number pad read as a pinch and both taps were cancelled
// - a tap on the toast made it stay for good, eating every tap on that band of the screen
// - a double tap on + landed its second tap on Save, and a double tap on Save on +
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
if (!fs.existsSync(CHROME)) { console.log('touch: skipped, no Chrome at ' + CHROME + ' (set CHROME)'); process.exit(0); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

// --- the page, with a fake db in place of window.claude
const FAKE = `(function () {
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var merge = function (a, b) { for (var k in b) { if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') merge(a[k], b[k]); else a[k] = clone(b[k]); } return a; };
  var store = {
    'meta/wallets': { list: { w1: { name: 'Cash', kind: 'cash', color: 'oranye', initial: 500000, order: 1, createdAt: 1 } } },
    'meta/categories': { list: { makan: { name: 'Makan & Minum', type: 'out', icon: 'utensils', color: 2, order: 1 } } },
    'meta/settings': { lastBackup: '2099-01-01', gapReminder: false }
  };
  var subs = {}, sim = window.__sim = { store: store, log: [], errors: [] };
  function snapOf(col) { var docs = Object.keys(store).filter(function (p) { return p.split('/')[0] === col; }).map(function (p) { return { id: p.split('/')[1], exists: true, data: function () { return clone(store[p]); } }; }); return { docs: docs, size: docs.length, empty: !docs.length }; }
  function notify(col) { setTimeout(function () { (subs[col] || []).forEach(function (fn) { fn(snapOf(col)); }); }, 0); }
  function docRef(p) {
    var col = p.split('/')[0];
    return {
      get: function () { return Promise.resolve({ id: p.split('/')[1], exists: !!store[p], data: function () { return store[p] && clone(store[p]); } }); },
      set: function (v) { store[p] = clone(v); notify(col); return Promise.resolve(); },
      update: function (v) { if (!store[p]) { var e = new Error('missing'); e.code = 'invalid_argument'; return Promise.reject(e); } merge(store[p], v); notify(col); return Promise.resolve(); },
      delete: function () { delete store[p]; notify(col); return Promise.resolve(); }
    };
  }
  var db = { doc: docRef, collection: function (col) { return { limit: function () { return this; }, onSnapshot: function (fn) { (subs[col] = subs[col] || []).push(fn); setTimeout(function () { fn(snapOf(col)); }, 0); return function () {}; } }; } };
  window.claude = { use: function (n) { return Promise.resolve(n === 'db' ? db : n === 'user' ? { can: function () { return Promise.resolve(true); } } : null); } };
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('[data-act]'); sim.log.push(a ? a.dataset.act + (a.dataset.v ? ':' + a.dataset.v : '') : e.target.tagName); }, true);
  window.addEventListener('error', function (e) { sim.errors.push(e.message); });
})();`;
const page = () => '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script>' + FAKE + '</script></head><body>' +
  fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/<link[^>]*>/g, '') + '</body></html>';
const srv = http.createServer((req, res) => {
  const p = new URL(req.url, 'http://x').pathname;
  if (p === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(page()); }
  if (p === '/app.js' || p === '/core.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); return res.end(fs.readFileSync(path.join(dir, p))); }
  res.writeHead(404); res.end();
});
await new Promise(r => srv.listen(0, '127.0.0.1', r));

// --- Chrome, one tab as a 390 px phone with touch
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'dompet-touch-'));
const chrome = spawn(CHROME, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--remote-debugging-port=0', '--user-data-dir=' + prof, 'about:blank'], { stdio: 'ignore' });
let port = 0;
for (let i = 0; i < 100 && !port; i++) { await sleep(100); try { port = +fs.readFileSync(path.join(prof, 'DevToolsActivePort'), 'utf8').split('\n')[0]; } catch { /* starting */ } }
const finish = async code => { srv.close(); chrome.kill(); await sleep(400); try { fs.rmSync(prof, { recursive: true, force: true }); } catch { /* still locked */ } process.exit(code); };
if (!port) { console.error('FAIL: Chrome did not start'); await finish(1); }
const tab = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let n = 0; const waiting = {};
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && waiting[d.id]) { waiting[d.id](d); delete waiting[d.id]; } };
const cmd = (method, params = {}) => new Promise(r => { const id = ++n; waiting[id] = r; ws.send(JSON.stringify({ id, method, params })); });
const ev = async expr => { const d = await cmd('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (d.error || d.result.exceptionDetails) throw new Error(expr + ': ' + JSON.stringify(d.error || d.result.exceptionDetails.exception)); return d.result.result.value; };
const until = async expr => { for (let i = 0; i < 200; i++) { if (await ev('!!(' + expr + ')')) return; await sleep(25); } throw new Error('timed out waiting for ' + expr); };
const at = async sel => ev(`(function () { var r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
// touchStart lists every finger now down; touchEnd lists the fingers that lift
const touch = (type, pts) => cmd('Input.dispatchTouchEvent', { type, touchPoints: pts });
const tap = async (sel, id = 0) => { const p = await at(sel); await touch('touchStart', [{ ...p, id }]); await sleep(60); await touch('touchEnd', [{ ...p, id }]); await sleep(120); };
const clicks = async () => ev('window.__sim.log.splice(0)');
const sheetOpen = () => ev(`document.getElementById('sheet').open`);
const closeSheet = async () => { await ev(`(function () { var s = document.getElementById('sheet'); if (s.open) s.close(); })()`); await sleep(400); };

try {
  await cmd('Page.enable'); await cmd('Runtime.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: 390, height: 780, deviceScaleFactor: 2.75, mobile: true });
  await cmd('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cmd('Page.navigate', { url: `http://127.0.0.1:${srv.address().port}/` });
  await until(`document.querySelector('.fab') && document.querySelector('#hero-total')`);
  await sleep(500); await clicks();

  // 1. the thumb holding the phone rests on the screen while the other one taps; it lifts after, then before
  const grip = { x: 4, y: 300, id: 0 };
  for (const [sel, want] of [['.tab[data-v="hist"]', 'tab:hist'], ['.fab', 'add'], ['.qchip[data-type="out"]', 'add']]) {
    for (const gripFirst of [false, true]) {
      const p = { ...(await at(sel)), id: 1 };
      await touch('touchStart', [grip]); await sleep(500);
      await touch('touchStart', [grip, p]); await sleep(70);
      if (gripFirst) { await sleep(400); await touch('touchEnd', [grip]); await sleep(40); await touch('touchEnd', [p]); }
      else { await touch('touchEnd', [p]); await sleep(500); await touch('touchEnd', [grip]); }
      await sleep(300);
      assert.deepStrictEqual(await clicks(), [want], sel + ' answers a tap while another finger rests' + (gripFirst ? ' (that finger lifts first)' : ''));
      await closeSheet();
      if (want === 'tab:hist') { await tap('.tab[data-v="home"]'); await sleep(400); await clicks(); }
    }
  }

  // 2. two thumbs on the number pad, each landing before the last one lifts
  await tap('.fab'); await sleep(450); await clicks();
  let down = null;
  for (const [i, d] of [...'123456789012'].entries()) {
    const cur = { ...(await at(`[data-act="kp"][data-v="${d}"]`)), id: i % 2 };
    await touch('touchStart', down ? [down, cur] : [cur]); await sleep(60);
    if (down) { await touch('touchEnd', [down]); await sleep(30); }
    down = cur;
  }
  await touch('touchEnd', [down]); await sleep(400);
  assert.strictEqual(await ev(`document.getElementById('t-amt').textContent`), '123.456.789.012', 'every digit typed with two thumbs counts, once');

  // 3. save; a tap on the toast's text doesn't keep it up, and goes to what is under it
  await ev(`(function () { var s = document.getElementById('sheet'); s.querySelector('[data-act="kp-clear"]').click(); })()`);
  for (const d of '25000') await tap(`[data-act="kp"][data-v="${d}"]`);
  await tap('#sheet input[name="category"][value="makan"]');
  await tap('#sheet button[type=submit]');
  await until(`document.querySelector('#toast .toast-in')`);
  await sleep(400);
  const box = await ev(`(function () { var r = document.querySelector('#toast .toast-in p').getBoundingClientRect(); return { x: r.left + 60, y: r.top + r.height / 2 }; })()`);
  await clicks();
  await touch('touchStart', [{ ...box, id: 0 }]); await sleep(60); await touch('touchEnd', [{ ...box, id: 0 }]);
  await sleep(300);
  assert.ok(!(await ev(`document.elementFromPoint(${box.x}, ${box.y}).closest('#toast')`)), 'the toast text lets taps through on a touch screen');
  await closeSheet();
  await sleep(7500);
  assert.ok(!(await ev(`document.querySelector('#toast .toast-in')`)), 'the toast goes away after a tap on it');

  // 4. double taps: + then Save under the same finger, Save then + under the same finger
  await tap('.tab[data-v="home"]'); await sleep(400); await clicks();
  const fab = await at('.fab');
  await touch('touchStart', [{ ...fab, id: 0 }]); await sleep(30); await touch('touchEnd', [{ ...fab, id: 0 }]); await sleep(90);
  await touch('touchStart', [{ ...fab, id: 0 }]); await sleep(30); await touch('touchEnd', [{ ...fab, id: 0 }]); await sleep(500);
  assert.ok(await sheetOpen() && !(await ev(`!!document.querySelector('#t-amount-err.on')`)), 'a double tap on + opens the sheet without trying to save it');
  for (const d of '5000') await tap(`[data-act="kp"][data-v="${d}"]`);
  await tap('#sheet input[name="category"][value="makan"]');
  const before = await ev(`Object.keys(window.__sim.store[Object.keys(window.__sim.store).find(function (k) { return k.indexOf('months/') === 0; })].tx).length`);
  const save = await at('#sheet button[type=submit]');
  await touch('touchStart', [{ ...save, id: 0 }]); await sleep(30); await touch('touchEnd', [{ ...save, id: 0 }]); await sleep(90);
  await touch('touchStart', [{ ...save, id: 0 }]); await sleep(30); await touch('touchEnd', [{ ...save, id: 0 }]); await sleep(600);
  assert.ok(!(await sheetOpen()), 'a double tap on Save does not open a new sheet');
  assert.strictEqual(await ev(`Object.keys(window.__sim.store[Object.keys(window.__sim.store).find(function (k) { return k.indexOf('months/') === 0; })].tx).length`) - before, 1, 'and saves once');

  assert.deepStrictEqual(await ev('window.__sim.errors'), [], 'no page errors');
  console.log('touch: all checks passed');
  await finish(0);
} catch (e) {
  console.error('FAIL:', e.message);
  await finish(1);
}
