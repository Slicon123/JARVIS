#!/usr/bin/env node
// Animatic: the storyboard played at its real timing, with sound — the step between an approved board and the build.
// A board says what each beat looks like; an animatic says whether the piece breathes: whether a beat is held too
// long, whether the payoff comes too late, whether the voice has room. It is cheap: only the key frames are drawn.
// Each panel of TIMELINE.board is held from where its beat starts until the next one starts: a panel's own `t0` when
// given, else the start of the shot it sits in, or halfway between two panels in the same shot. Sound: the score as it
// stands (renderAudioWav) with the voice (piece.json "voice") on top when it exists, so a scratch voice works here.
//   usage: node tools/animatic.mjs <piece dir> [--scale 0.5] [--no-audio] [--format 16:9]   -> <piece>/renders/animatic.mp4
import { createRequire } from 'node:module';
import { execSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = (() => { try { return require('playwright'); } catch { return require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); } })();

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : d; };
const scale = Number(opt('--scale', '0.5')), format = opt('--format', null), noAudio = args.includes('--no-audio');
const src = args.find((a) => !a.startsWith('--'));
if (!src) { console.error('usage: node tools/animatic.mjs <piece dir> [--scale 0.5] [--no-audio] [--format 16:9]'); process.exit(2); }
const ROOT = path.resolve(src), RENDERS = path.join(ROOT, 'renders'), TMP = path.join(RENDERS, 'animatic-panels');
const PIECE = fs.existsSync(path.join(ROOT, 'piece.json')) ? JSON.parse(fs.readFileSync(path.join(ROOT, 'piece.json'), 'utf8')) : {};
fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(TMP, { recursive: true });

const browser = await chromium.launch(), page = await browser.newPage();
page.on('pageerror', (e) => { console.error('PAGE ERROR:', e.message); process.exitCode = 1; });
await page.goto(pathToFileURL(path.join(ROOT, 'index.html')).href + '?export=1' + (format ? `&format=${encodeURIComponent(format)}` : ''));
await page.waitForFunction(() => window.TIMELINE && window.renderFrame);
await page.evaluate(() => document.fonts.ready);

// each panel drawn at its key time, with a strip on top: panel number, start, title
const res = await page.evaluate((k) => {
  const T = window.TIMELINE, BD = T.board || [], dur = T.frames / T.fps;
  const shotAt = (t) => (T.shots || []).find((s) => t >= s.t0 - 1e-6 && t < s.t1 - 1e-6);
  const starts = BD.map((b, i) => {
    if (b.t0 != null) return b.t0;
    if (i === 0) return 0;
    const s = shotAt(b.t), p = shotAt(BD[i - 1].t);
    return s && s !== p ? s.t0 : (BD[i - 1].t + b.t) / 2;
  });
  const c = document.createElement('canvas'); c.width = T.width; c.height = T.height;
  const w = Math.round(T.width * k / 2) * 2, h = Math.round(T.height * k / 2) * 2, o = document.createElement('canvas'); o.width = w; o.height = h;
  const g = o.getContext('2d'), pad = Math.round(14 * w / 540), fsz = Math.round(22 * w / 540);
  const panels = BD.map((b, i) => {
    window.renderFrame(Math.round(b.t * T.fps) / T.fps, c);
    g.drawImage(c, 0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,0.72)'; g.fillRect(0, 0, w, fsz + pad * 2);
    g.fillStyle = '#ffd27a'; g.font = `700 ${fsz}px "Segoe UI", Arial, sans-serif`; g.textBaseline = 'top';
    let label = `${i + 1} · ${starts[i].toFixed(1)}s · ${b.title || ''}`;
    while (label.length > 4 && g.measureText(label).width > w - pad * 2) label = label.slice(0, -2) + '…';
    g.fillText(label, pad, pad);
    return { png: o.toDataURL('image/png').split(',')[1], t0: starts[i], t1: i + 1 < BD.length ? starts[i + 1] : dur };
  });
  return { panels, fps: T.fps, dur };
}, scale);
if (!res.panels.length) { console.error('TIMELINE.board is empty: fill it first (SKILL.md step 3)'); process.exit(1); }

let wav = null;
if (!noAudio) {
  const b64 = await page.evaluate(async () => (typeof window.renderAudioWav === 'function' ? await window.renderAudioWav() : null)).catch(() => null);
  if (b64) { wav = path.join(TMP, 'score.wav'); fs.writeFileSync(wav, Buffer.from(b64, 'base64')); }
}
await browser.close();

// the voice on top of the score (the score 12 dB down), when the piece has one
const voice = PIECE.voice?.file ? path.resolve(ROOT, PIECE.voice.file) : null;
if (!noAudio && voice && fs.existsSync(voice)) {
  const mixed = path.join(TMP, 'mix.wav');
  const r = wav
    ? spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', wav, '-i', voice, '-filter_complex', `[0:a]volume=${PIECE.voice.music ?? -12}dB[m];[1:a]aresample=48000,aformat=channel_layouts=stereo[v];[m][v]amix=inputs=2:normalize=0:duration=longest[o]`, '-map', '[o]', mixed])
    : spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', voice, '-ac', '2', '-ar', '48000', mixed]);
  if (r.status === 0) wav = mixed;
}

// hold each panel for its beat (concat demuxer), then the sound under it
const list = res.panels.map((p, i) => { const f = path.join(TMP, `p${String(i + 1).padStart(2, '0')}.png`); fs.writeFileSync(f, Buffer.from(p.png, 'base64')); return `file '${f.replace(/\\/g, '/')}'\nduration ${Math.max(1 / res.fps, p.t1 - p.t0).toFixed(4)}`; });
list.push(`file '${path.join(TMP, `p${String(res.panels.length).padStart(2, '0')}.png`).replace(/\\/g, '/')}'`);   // the concat demuxer drops the last duration without this
fs.writeFileSync(path.join(TMP, 'list.txt'), list.join('\n') + '\n');
const out = path.join(RENDERS, 'animatic.mp4');
const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(TMP, 'list.txt'), ...(wav ? ['-i', wav] : []),
  '-vf', `fps=${res.fps},scale=out_color_matrix=bt709:out_range=tv`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', '-x264-params', 'colorprim=bt709:transfer=bt709:colormatrix=bt709',
  ...(wav ? ['-c:a', 'aac', '-b:a', '160k'] : []), '-t', res.dur.toFixed(3), '-movflags', '+faststart', out], { stdio: 'inherit' });
if (r.status !== 0) { console.error('animatic encode failed'); process.exit(1); }
fs.rmSync(TMP, { recursive: true, force: true });
console.log(`animatic ${path.relative(process.cwd(), out)}: ${res.panels.length} panels over ${res.dur.toFixed(2)}s, ${wav ? (voice && fs.existsSync(voice) ? 'score + voice' : 'score') : 'no sound'}`);
for (const [i, p] of res.panels.entries()) console.log(`  ${String(i + 1).padStart(2)}  ${p.t0.toFixed(2)}-${p.t1.toFixed(2)}s  (${(p.t1 - p.t0).toFixed(2)}s held)`);
