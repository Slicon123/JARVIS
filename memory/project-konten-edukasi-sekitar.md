---
name: project-konten-edukasi-sekitar
description: "Bryan's education account @rupanya.gini about everyday things, modelled on TikTok kitabedah.idn; sekitar and riset-sekitar skills built 1 Nov 2026; TikTok account created, first video not posted, no written vision/mission yet"
metadata:
  node_type: memory
  type: project
  originSessionId: b1bd199b-65f7-40c2-abb6-2f2967ca87e4
  modified: 2026-11-01T14:20:47.323Z
---

On 1 Nov 2026 Bryan planned a social account teaching what happens in everyday surroundings, with TikTok
@kitabedah.idn ("Kita Bedah • Anatomi Produk", 127.1K followers, 2M likes, 127 videos that day) as the reference. He asked for a
skill that produces similar output from his ideas: the `sekitar` skill at `claude-config/skills/sekitar/`,
project at `C:\Bryan De Great\Animasi\sekitar\`. Reference numbers and what's proven are in its `STYLE.md`.

- **Reference stack:** their pages state Claude skills, a Google Cloud AI voice, an AI judge, NVIDIA SimReady
  models, a Poly Haven HDRI, Inter + JetBrains Mono. Bryan's guess of Remotion is unconfirmed; never state it as fact.
- **Their paid guide is Rp200rb** (kitabedah.id/panduan, 10-part class). Their terms say class videos can't be
  recorded or downloaded, so even free Bagian 0 (7:29) was left out of the analysis; Bryan can watch it on the page.
- **Account: @rupanya.gini** (first @rupanya.sih; renamed 1 Nov 2026 so the name matches the sign-off, before any post). Sign-off line **"Rupanya gini."** Profile
  colour `#E8502A`; the skill must not use their brand or "kita bedah".
- **Voice:** Gemini **Sadaltager**, his pick. From 1 Nov 2026 he said to always use Gemini: pass `--engine gemini` explicitly and never fall back to edge-tts, even for drafts; if Gemini fails, stop and tell him. `GEMINI_API_KEY` is set in the Windows user environment and works
  (tested 1 Nov 2026); `tools/voice.py` reads it from there, so no VS Code restart is needed.
- **Every film must say "Rupanya gini." (his rule, 1 Nov 2026):** at the end of the hook, starting by second 8, no effect on top of it. He found it missing from keran: the old `out/keran/` files really lack it (the skill's example did too, now fixed), and `keran-polished_v2` had it under a whoosh. `voice.py` now refuses a script without it, and `check.py` fails a film where the recogniser can't hear it.
- **Keran remade 1 Nov 2026 at his request:** `out/keran-polished/keran-polished_v3.mp4` (slug `keran-polished`) is the version to upload, not `_v2` or the older `out/keran/` files; he has not yet reported listening to it, and nothing is uploaded.
- **Laron film built 1 Nov 2026:** `out/laron/laron.mp4`, 69.3 s, all checks pass, upload text in `out/laron/upload.md`; he asked to skip the look check-in and clip for this film (not a standing rule). He reports uploading it to YouTube, Instagram and TikTok on 1 Nov 2026, without the header fix below. From 8 Nov 2026, ask him for its 7-day views and record them in `src/pieces/laron/LOG.md`.
- **Keran scheduled 1 Nov 2026 (his report):** TikTok and YouTube are scheduled. Instagram wouldn't let him schedule, so it sits as a draft and he uploads it manually on 2 Nov 2026. Which file he scheduled (`_v3` or older) is unconfirmed. Ask on 2 Nov whether the Instagram upload went out.
- **TikTok softness: higher bitrate didn't help (tested 1 Nov 2026):** the upload looked soft on his phone in TikTok, while YouTube 1080p and Instagram's public 720p copy stayed close to the 1.84 Mbps file. A re-upload at 11.06 Mbps (`out/laron/laron_12mbps.mp4`) measured about the same on his phone: KRAUK edge sharpness 1191 before, 1286 after, against 5140 for the file scaled to the same size. So crf 18 stays the default. One film, one phone, and whether Data Saver was off is unconfirmed; TikTok's own processing vs what his phone receives is not separated yet.
- **Header moved down 64 px in the kit (1 Nov 2026, his yes):** the kicker hit TikTok's LIVE icon and the logo sat tight under search in a preview. On the re-upload both are clear in the profile-opened view; the For You view is unconfirmed.
- **ElevenLabs dropped (his call, 1 Nov 2026); Sadaltager stays.** Reasons on record: free accounts get 402 on Voice Library voices over the API, so Indonesian voices need a paid plan, and 5 films a day at one take is about 138,000 credits a month, above the Creator plan's 121,000. `voice.py --engine elevenlabs` still works; `ELEVENLABS_API_KEY` remains in his Windows environment until he removes it.
- **Monetisation researched 1 Nov 2026:** TikTok Creator Rewards appears not open in Indonesia (not read on TikTok's own
  page, which wouldn't load; confirm in TikTok Studio). YouTube YPP lists Indonesia: Shopping at 500 subs + 3M Shorts views/90 days,
  ads at 1,000 + 10M, rising to 20M for applicants from 1 Feb 2027. Start with Shopee/TikTok Shop affiliate. Rule details belong
  to the platforms and change; recheck before advising.
- **Skills stay local for now:** on 1 Nov 2026 he said not to push `sekitar` to GitHub. Don't commit `claude-config/skills/sekitar/`
  or `claude-config/skills/riset-sekitar/` until he asks.
- **Posting plan under discussion (1 Nov 2026):** I first advised 1 video a day from Buffer's averages; he pointed at the reference, and its 127 Shorts in 17 days (scheduled slots about 2 hours apart, numbers in the skill's `STYLE.md`) showed that advice was too cautious. Revised advice: schedule, never bulk-post; slots 07, 10, 13, 16, 19 WIB; more motor/fuel-type everyday topics with his own angles. Limit is production: at laron's pace 5 a day is about 29 hours a week, and fact-checking stays. He said yes on 1 Nov 2026: a 2-week trial from Mon 2 Nov to Sun 15 Nov 2026, up to 5 a day, plan and film order in `Animasi\sekitar\ide\jadwal.md`. Start by counting how many films really finish on 2 Nov, then fit the slots to that number.
- **Keranjang kuning paused; 5 uploads a day is his target (1 Nov 2026).** He said affiliate ideas aren't usable yet, so `riset-sekitar` keeps at least 10 unused no-product ideas ready until he turns it back on, each as a standalone block he pastes into a new chat to start `sekitar`. He expects to make only some of them (about 3 of 10) and worried about usage, so it counts unused blocks in `Animasi\sekitar\ide\saran-*.md` first and researches only the shortfall. I objected once to the 5/day pace (fact-checking load, YouTube's mass-production rule); he owns the call. Skill built that day, also local-only. His choices when affiliate returns: categories listrik & elektronik, rumah & dapur, motor & kendaraan (no health/beauty); free web data plus his screenshots; video shows advantages only, weaknesses reported to him; ideas logged in `Animasi\sekitar\ide\log.md`.
- **TikTok @rupanya.gini exists and is switched to TikTok Shop for Creator (his report, 1 Nov 2026; profile confirmed public).** His app on 1 Nov 2026: 0 followers, "Hidden showcase" until 600 followers + a post in the past 28 days + Community Guidelines OK. Bio set; display name and profile picture still empty. Affiliate Center on 1 Nov 2026: Lv. 0, health "Healthy", new-creator steps 1 of 3, and "Confirm your age within 30 days" still open (so roughly by 1 Dec 2026); payout setup not confirmed. Nothing posted yet.
- **Other accounts (his report, 1 Nov 2026):** Instagram `rupanya.gini`, YouTube `@rupanya_gini`. TikTok's display name is still `Rupanya Sih` because TikTok limits name changes; change it to `Rupanya Gini` when allowed. It is not his real name.
- **Logo: "r." (design 1 Titik, his pick 1 Nov 2026).** He rejected the tap design because the logo must fit every topic, not one. Profile picture is `Animasi\sekitar\brand\Foto profil rupanya.sih.png`, not yet uploaded as far as he has said. The soft watermark is built into the `sekitar` kit, so new films get it; the old `keran` film doesn't have it, and its position under the app icons is untested until the first upload. I read his "diblur" as soft (42% opacity, 1.4 px blur); he didn't correct it. YouTube banner built the same day, `brand\Banner YouTube rupanya.sih.png`: one line runs from a dotless "?" through everyday things to the logo's dot after "rupanya gini"; not yet uploaded as far as he has said. The other five candidates remain in `brand\` and `brand\Ronde 2\`. The reference's logo is an isometric cube cut open with a yellow inside, so avoid cubes, cutaway marks and yellow as his brand.
- **He wants the small habits repeated at every new video** (play outside VS Code, leave the laptop alone during the
  render, internet for research and voice, no edge-tts on monetised uploads). The list is in the skill.
- **No MCP needed:** the hosted Remotion MCP was shut down 26 Oct 2026, replaced by the official Agent Skills,
  installed in the project only, so 12 extra skills don't load in every session or land in the public repo.

**Why:** content income is his longer-term goal; see [[project-content-clipping-automation]]. Sits beside [[project-animate-skill]].
**How to apply:** when he gives a content idea, use the skill: facts and script check-in first. Record real view
counts per film before adding rules. Word timing relies on [[reference-local-transcription]]; warn before the render.
