import type { On } from 'claude-code'
import { expect, test } from 'claude-code/testing'

const FILES: Record<string, string> = {
  'MEMORY.md': '- [Catering tracker](reference-catering-tracker.md) — no link on this line\n',
  'reference-expense-tracker.md': 'App: https://claude.ai/artifact/AAA111 ("Dompet Bryan", private, built\n',
  'project-skincare-acne-plan.md': 'https://claude.ai/artifact/BBB222 — "Barrier First Protocol", published\n',
  'reference-catering-tracker.md':
    'Tracker: https://claude.ai/artifact/CCC333 ("Kartu Catering", private,\nsee https://claude.ai/artifact/CCC333 again\n',
  'reference-untitled.md': 'Link: https://claude.ai/code/artifact/DDD-444\n',
  'user-bryan-profile.md': 'No artifacts here.\n',
}

const SESSION_DIR = 'D:/Elsewhere/JARVIS'

// `/link <args>` as the engine stamps it when typed at the prompt.
const typed = (args = '') => ({
  command: 'link',
  args,
  origin: { kind: 'composer' as const },
  presentation: { isFullscreen: false, columns: 80 },
})

// `has` says which MEMORY.md paths exist; by default any of them does.
const fakeMemory = (on: On, has = (path: string) => /[\\/]memory[\\/]MEMORY\.md$/.test(path)) => {
  on('session.cwd', async () => ({ value: SESSION_DIR }))
  on('fs.exists', async ($, e) => ({ value: has(e.path) }))
  on('fs.list', async () => ({
    value: Object.keys(FILES).map(name => ({ name, kind: 'file' as const, size: 1, mtimeMs: 0, isLink: false })),
  }))
  on('fs.read', async ($, e) => ({ value: FILES[e.path.split(/[\\/]/).pop() ?? ''] ?? '' }))
}

test('lists every artifact once, sorted by name', async ($, on) => {
  fakeMemory(on)
  const { text } = await $.command.run(typed())
  expect(text).toBe(
    [
      '- Barrier First Protocol: https://claude.ai/artifact/BBB222',
      '- Dompet Bryan: https://claude.ai/artifact/AAA111',
      '- Kartu Catering: https://claude.ai/artifact/CCC333',
      '- reference-untitled: https://claude.ai/code/artifact/DDD-444',
    ].join('\n'),
  )
})

test('filters by name or by memory file name', async ($, on) => {
  fakeMemory(on)
  expect((await $.command.run(typed('catering'))).text).toBe(
    '- Kartu Catering: https://claude.ai/artifact/CCC333',
  )
  expect((await $.command.run(typed('SKIN'))).text).toBe(
    '- Barrier First Protocol: https://claude.ai/artifact/BBB222',
  )
})

test('says so when nothing matches', async ($, on) => {
  fakeMemory(on)
  expect((await $.command.run(typed('gym'))).text).toBe(
    'Tidak ada artifact yang cocok dengan "gym".',
  )
})

test('falls back to the memory folder of the session', async ($, on) => {
  // The engine hands hooks native paths, so compare with the slashes evened out.
  const asked: string[] = []
  fakeMemory(on, path => {
    asked.push(path.replace(/\\/g, '/'))
    return asked.at(-1) === `${SESSION_DIR}/memory/MEMORY.md`
  })
  expect((await $.command.run(typed('dompet'))).text).toBe(
    '- Dompet Bryan: https://claude.ai/artifact/AAA111',
  )
  expect(asked).toHaveLength(2)
})

test('says so when the memory folder is missing', async ($, on) => {
  fakeMemory(on, () => false)
  expect((await $.command.run(typed())).text).toBe('Folder memory tidak ketemu.')
})
