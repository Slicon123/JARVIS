import type { EngineInterface, Register } from 'claude-code'

// Memory notes record an artifact as its URL with its name quoted after it on
// the same line: `App: https://claude.ai/artifact/… ("Dompet Bryan", private`.
const URL_PATTERN = /https:\/\/claude\.ai\/(?:code\/)?artifact\/[A-Za-z0-9-]+/g
const TITLE_PATTERN = /["“]([^"”]+)["”]/

type Artifact = { title: string; url: string; source: string }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'link',
      description: 'Link artifact yang tercatat di memory (Dompet Bryan, catering, ...)',
      argumentHint: '[kata kunci]',
    })

    return next(e)
  })

  on('command.run', { command: 'link' }, async ($, e) => {
    const dir = await findMemoryDir($)
    if (dir === undefined) return { text: 'Folder memory tidak ketemu.' }

    const query = (e.args ?? '').trim()
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    const found = (await readArtifacts($, dir)).filter(one => {
      const haystack = `${one.title} ${one.source}`.toLowerCase()
      return words.every(word => haystack.includes(word))
    })

    if (found.length === 0) {
      return {
        text: words.length > 0
          ? `Tidak ada artifact yang cocok dengan "${query}".`
          : 'Belum ada link artifact di memory.',
      }
    }

    return { text: found.map(one => `- ${one.title}: ${one.url}`).join('\n') }
  })
}

// The kept copy lives at <repo>/claude-config/mods/link, so the repo's memory
// is three folders up from it on any device; a copy elsewhere falls back to
// the folder the session was opened in.
async function findMemoryDir($: EngineInterface): Promise<string | undefined> {
  const repo = $.plugin.root.split(/[\\/]/).slice(0, -3).join('/')
  if (await $.fs.exists(`${repo}/memory/MEMORY.md`)) return `${repo}/memory`

  const here = `${await $.session.cwd()}/memory`
  if (await $.fs.exists(`${here}/MEMORY.md`)) return here

  return undefined
}

async function readArtifacts($: EngineInterface, dir: string): Promise<Artifact[]> {
  const files = (await $.fs.list(dir)).filter(f => f.kind === 'file' && f.name.endsWith('.md'))
  const texts = await Promise.all(
    files.map(f => $.fs.read(`${dir}/${f.name}`).then(t => (typeof t === 'string' ? t : ''), () => '')),
  )

  const byUrl = new Map<string, Artifact>()
  files.forEach((file, i) => {
    const source = file.name.replace(/\.md$/, '')
    for (const line of (texts[i] ?? '').split('\n')) {
      for (const match of line.matchAll(URL_PATTERN)) {
        const url = match[0]
        if (byUrl.has(url)) continue
        const title = line.slice((match.index ?? 0) + url.length).match(TITLE_PATTERN)?.[1] ?? source
        byUrl.set(url, { title, url, source })
      }
    }
  })

  return [...byUrl.values()].sort((a, b) => a.title.localeCompare(b.title))
}
