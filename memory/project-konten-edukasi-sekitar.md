---
name: project-konten-edukasi-sekitar
description: "Bryan's planned education account about everyday things, modelled on TikTok kitabedah.idn; the sekitar skill built 1 Nov 2026, voice key and account name pending"
metadata:
  node_type: memory
  type: project
  originSessionId: b1bd199b-65f7-40c2-abb6-2f2967ca87e4
  modified: 2026-11-01T06:19:30.097Z
---

On 1 Nov 2026 Bryan planned a social account teaching what happens in everyday surroundings, with TikTok
@kitabedah.idn ("Kita Bedah • Anatomi Produk", 127.1K followers, 2M likes, 127 videos that day) as the reference. He asked for a
skill that produces similar output from his ideas: the `sekitar` skill at `claude-config/skills/sekitar/`,
project at `C:\Bryan De Great\Animasi\sekitar\`. Reference numbers and what's proven are in its `STYLE.md`.

- **Reference stack:** their pages state Claude skills, a Google Cloud AI voice, an AI judge, NVIDIA SimReady
  models, a Poly Haven HDRI, Inter + JetBrains Mono. Bryan's guess of Remotion is unconfirmed; never state it as fact.
- **Their paid guide is Rp200rb** (kitabedah.id/panduan, 10-part class). Their terms say class videos can't be
  recorded or downloaded, so even free Bagian 0 (7:29) was left out of the analysis; Bryan can watch it on the page.
- **Account: @rupanya.sih** (decided 1 Nov 2026; he creates it himself). Sign-off line **"Rupanya gini."** No brand
  colour yet; the skill must not use their brand or "kita bedah".
- **Voice:** Gemini **Sadaltager**, his pick. `GEMINI_API_KEY` is set in the Windows user environment and works
  (tested 1 Nov 2026); `tools/voice.py` reads it from there, so no VS Code restart is needed.
- **Monetisation researched 1 Nov 2026:** TikTok Creator Rewards appears not open in Indonesia (not read on TikTok's own
  page, which wouldn't load; confirm in TikTok Studio). YouTube YPP lists Indonesia: Shopping at 500 subs + 3M Shorts views/90 days,
  ads at 1,000 + 10M, rising to 20M for applicants from 1 Feb 2027. Start with Shopee/TikTok Shop affiliate. Rule details belong
  to the platforms and change; recheck before advising.
- **Skills stay local for now:** on 1 Nov 2026 he said not to push `sekitar` to GitHub. Don't commit `claude-config/skills/sekitar/`
  or `claude-config/skills/riset-sekitar/` until he asks.
- **Keranjang kuning planned for some videos (1 Nov 2026).** `riset-sekitar` skill built that day, also local-only, for ideas: at least 3 without a product + at least 3 with. His choices: categories listrik & elektronik, rumah & dapur, motor & kendaraan (no health/beauty); free web data plus his screenshots; video shows advantages only, weaknesses reported to him; ideas logged in `Animasi\sekitar\ide\log.md`.
- **TikTok @rupanya.sih exists and is switched to TikTok Shop for Creator (his report, 1 Nov 2026; profile confirmed public).** Identity/payout verification and whether the keranjang is active or it's in Link-Share Only mode are unknown until he checks the app. Nothing posted yet.
- **He wants the small habits repeated at every new video** (play outside VS Code, leave the laptop alone during the
  render, internet for research and voice, no edge-tts on monetised uploads). The list is in the skill.
- **No MCP needed:** the hosted Remotion MCP was shut down 26 Oct 2026, replaced by the official Agent Skills,
  installed in the project only, so 12 extra skills don't load in every session or land in the public repo.

**Why:** content income is his longer-term goal; see [[project-content-clipping-automation]]. Sits beside [[project-animate-skill]].
**How to apply:** when he gives a content idea, use the skill: facts and script check-in first. Record real view
counts per film before adding rules. Word timing relies on [[reference-local-transcription]]; warn before the render.
