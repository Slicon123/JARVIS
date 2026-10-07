# Local changes

Adapted from [cth9191/animate](https://github.com/cth9191/animate) (MIT, see [LICENSE](LICENSE)), commit `7e5eb56` (v0.4.0, 5 Oct 2026).
Changes made on 7 Oct 2026, so an upstream update can be merged by hand:

- **Colour:** `tools/export.mjs` converts the PNG frames with the BT.709 matrix and tags every encode (final, captions, share) as BT.709 in the H.264 stream. Before, ffmpeg used BT.601 untagged and players decoded it as BT.709: `#e8613a` came out as `242,105,51`, a mid green lost 18 of 180. Now within 2 of the source.
- **Language per piece:** `piece.json` `"lang"` (`en` / `id`). `tools/voice_words.py` takes `--lang` and uses the multilingual Whisper model for anything but English (it was hard-coded to English). `tools/voice.mjs` passes the language, picks a scratch voice in it when Windows has one, and matches words with Unicode letters. New `tools/speech.mjs`: narration pace in syllables/s per language (Indonesian 6.0 is an estimate, to calibrate). `review.mjs` → NARRATION uses it.
- **faster-whisper with PyAV 19:** `voice_words.py` reads the 16-bit WAV itself (stdlib + numpy), because faster-whisper 1.2.1's decoder passes an argument PyAV 19 removed.
- **New review checks** (`tools/review.mjs`): HOOK (feed formats move by 0.5s; `review/hook.jpg`), FLASHES (WCAG 2.3.1 approximated per area; a strobe at 8 changes/s fails, morphs and the beat-cut template pass), COMPRESSION (a 2500 kbps re-encode vs the master, SSIM per second; `review/stress.jpg`).
- **Text contrast** (`tools/textcheck.mjs`): each string's ink against what is behind it, found by drawing the frame a second time without text, so it works for riso plates and halos too. Median over the string's frames; under 3:1 fails, under 4.5:1 warns. Checked against the isometric demo's `#9a9aa2` labels on white: measured 2.8:1, computed 2.79:1.
- **Animatic:** new `tools/animatic.mjs`, and a step in SKILL.md between the storyboard and the build.
- **Motion helpers** in `kit/core.js`: `anticipate`, `delayed`, `stagger` (existing pieces render pixel-identical, checked with `framehash.mjs`).
- **Docs:** feed hook rule (craft.md, STORY.md, FORMATS.md), animation principles, contrast, compression, flash and 60fps rules in craft.md, language in intake.md and SKILL.md, cover still at delivery, Bryan's project folder.
