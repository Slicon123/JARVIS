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

Search `"<song> <artist> chords"`, and for Indonesian songs also `"kunci gitar <lagu>"`.
Fetch the actual page rather than trusting a search snippet; snippets shred the alignment.
Good sources: Ultimate Guitar, Chordify's text view, chordtela, kunci-gitar sites, the
artist's own transcription. Cross-check the chorus against a second source when the first
looks thin or the song is obscure — wrong chords cost him more time than a second fetch.

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
