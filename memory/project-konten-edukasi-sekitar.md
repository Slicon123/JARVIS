---
name: project-konten-edukasi-sekitar
description: "Bryan's planned education account about everyday things, modelled on TikTok kitabedah.idn; the sekitar skill built 1 Nov 2026, voice key and account name pending"
metadata:
  node_type: memory
  type: project
  originSessionId: b1bd199b-65f7-40c2-abb6-2f2967ca87e4
  modified: 2026-11-01T04:33:59.325Z
---

On 1 Nov 2026 Bryan planned a social account teaching what happens in everyday surroundings, with TikTok
@kitabedah.idn ("Kita Bedah • Anatomi Produk", 127.1K followers, 2M likes, 127 videos that day) as the reference. He asked for a
skill that produces similar output from his ideas: the `sekitar` skill at `claude-config/skills/sekitar/`,
project at `C:\Bryan De Great\Animasi\sekitar\`. Reference numbers and what's proven are in its `STYLE.md`.

- **Reference stack:** their pages state Claude skills, a Google Cloud AI voice, an AI judge, NVIDIA SimReady
  models, a Poly Haven HDRI, Inter + JetBrains Mono. Bryan's guess of Remotion is unconfirmed; never state it as fact.
- **Their paid guide is Rp200rb** (kitabedah.id/panduan, 10-part class). Their terms say class videos can't be
  recorded or downloaded, so even free Bagian 0 (7:29) was left out of the analysis; Bryan can watch it on the page.
- **Open:** account name and sign-off (the skill must not use their brand or "kita bedah"); `GEMINI_API_KEY`
  from aistudio.google.com, because the Gemini voice path in `tools/voice.py` is untested without it. The test piece
  `keran` uses the unofficial edge-tts draft voice and shouldn't be published monetised.
- **No MCP needed:** the hosted Remotion MCP was shut down 26 Oct 2026, replaced by the official Agent Skills,
  installed in the project only, so 12 extra skills don't load in every session or land in the public repo.

**Why:** content income is his longer-term goal; see [[project-content-clipping-automation]]. Sits beside [[project-animate-skill]].
**How to apply:** when he gives a content idea, use the skill: facts and script check-in first. Record real view
counts per film before adding rules. Word timing relies on [[reference-local-transcription]]; warn before the render.
