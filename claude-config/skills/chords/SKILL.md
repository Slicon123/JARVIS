---
name: chords
description: Look up guitar chords for a song and print them in the terminal as a readable chord sheet — chords aligned over the lyrics, key and capo stated, no links to go click. Use whenever Bryan asks for the chords, kunci, or chord of a song, or says "chord <song>", "kunci gitar <lagu>", "how do I play <song>".
---

# Chord sheets, printed here

Bryan asks for a song's chords because he wants to play it *now*, on the screen in front of
him. A link to Ultimate Guitar is a failure. The whole deliverable is a chord sheet he can
read while holding a guitar.

## Find the chords

Load `WebSearch` and `WebFetch` via ToolSearch first — they are deferred.

**Budget: three web calls.** Two searches plus at most one fetch is the whole job. If you
are on your fifth call, stop looking and write the sheet from what you have, flagged as
partly your own reading. A sheet in thirty seconds with one uncertain verse beats a
perfect one four minutes later.

The method, in order:

1. **Search `"<song>" "<artist>" chords`** — for Indonesian songs also `kunci gitar <lagu>`.
   The search summary normally names the progression section by section: intro, verse,
   chorus, bridge. That is frequently the entire harmonic content of the song.
2. **Search a distinctive lyric fragment** — `"<song>" <artist> lyrics "<line you have>"`.
   Search summaries quote lyrics freely; this is how you get verse 2 and the bridge.
   Chain it: each fragment you learn seeds the next query.
3. **Fetch only if the progression is still unclear**, and only from a site in the "works"
   column below.

You align the chords over the lyrics yourself. No fetch will ever hand you a ready-made
chart — the fetch summariser flattens the alignment into prose even when the page has it.

**Lyric sites refuse full text through WebFetch on principle** — the summariser declines
to reproduce lyrics even four lines at a time, on any site, regardless of what the page
actually shows. That is a property of the fetch tool, not of the site, so retrying more
lyric URLs through WebFetch wastes calls. If Bryan asks for the lyrics themselves (not
just the progression), pull the raw page instead: `curl -s -A "Mozilla/5.0 ..." <url> -o
<scratchpad>/x.html`, then read the file directly with Grep/Read — you're reading HTML,
not asking a model to repeat copyrighted text, so it isn't refused. Delete the scratch
file once you've pulled the lines you need. This still counts against the call budget
below, and is worth the extra call specifically when lyrics were explicitly asked for.

### Sites — measured, not assumed

| Site | Verdict |
|---|---|
| `tabs.ultimate-guitar.com` | **Never fetch.** JS-rendered: returns the page title and nothing else. Useful as a search hit, worthless as a fetch. |
| `cifraclub.com` | Works. The best single fetch for section-by-section progressions. |
| `guitartabsexplorer.com` | Works. Good second source for cross-checking. |
| `wechords.com` | 301s to cifraclub — go to cifraclub directly and save a round trip. |
| `chordsbase.com`, `lyricsbox.com` | 403. |
| `lyricsdepot.com` | Expired certificate. |
| `readdork.com`, most lyrics sites | The fetch refuses to return full lyrics. Use search summaries instead. |

Cross-check the chorus against a second source when the first looks thin or the song is
obscure — wrong chords cost him more time than one extra search.

**Ambiguous titles: search before you ask.** "The Last Night" is Skillet *and* Bon Jovi.
One search surfaces the candidates, so either the artist is obvious and you proceed, or
your question is a single line naming both — never an open "which one?".

If the search genuinely turns up nothing usable, say so plainly and transcribe by ear from
what you know of the song, labelled as your own reading, not as a found version.

## Print it

Everything goes in **one fenced code block**. Markdown outside a fence collapses runs of
spaces and destroys the chord-over-lyric alignment — this is the single thing that makes
the output unreadable, so never render a sheet outside a fence.

Format:

```
Judul — Artis
Key: G   ·   Capo: 2 (chords shown relative to capo)   ·   4/4, ~92 bpm

[Verse 1]
G                  D
Baris lirik pertama di sini
Em                 C
Baris kedua menyusul

[Chorus]
...
```

Rules that keep it readable in a narrow VS Code panel:

- **Keep lines under ~60 characters.** Wrap a long lyric line early rather than let the
  terminal wrap it and slide every chord out of place.
- The chord sits directly above the syllable it changes on. Count the spaces.
- Section headers in square brackets: `[Intro]`, `[Verse 1]`, `[Chorus]`, `[Bridge]`,
  `[Outro]`. Blank line between sections, none inside one.
- State **key and capo** at the top, always, and say whether the chords are written
  relative to the capo or to concert pitch.
- Intro / riff lines that aren't sung: chords alone, or tab if the riff is the point.
- Repeats: `[Chorus] x2` beats pasting the same twelve lines twice.

After the fence, at most two lines: the strumming pattern, an awkward transition, or a
simpler voicing for a hard shape. Only if it earns its place — no essay, no "hope this
helps."

## If he asks for something else

- **Transpose** — reprint the whole sheet in the new key; never hand him a mapping table
  and make him do the substitution.
- **Capo somewhere specific** — recompute the shapes for that position and say what the
  sounding key is.
- **Simplify** — swap barre chords for open shapes and name the trade (`Bm → Bm7 open`,
  slightly thinner but playable).
- **Ukulele or piano** — same layout, different shapes; for piano give the chord symbols
  and, if he asks, the notes in each voicing.

Long songs: print the whole thing anyway. He asked for the song, not an excerpt.
