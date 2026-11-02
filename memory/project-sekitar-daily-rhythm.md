---
name: project-sekitar-daily-rhythm
description: Daily production rhythm for 5 sekitar films a day, built around the Gemini TTS limit of 10 requests per quota day that resets at 15.00 WIB; written 2 Nov 2026
metadata:
  type: project
---

On 2 Nov 2026 Bryan asked for a schedule that keeps 5 videos a day consistent now that the Gemini voice limit is known (10 requests per day on the free tier, quota day resets at 15.00 WIB; facts in [[project-konten-edukasi-sekitar]]). Full text in `C:\Bryan De Great\Animasi\sekitar\ide\jadwal.md`, sections "Kuota suara Gemini" and "Ritme harian".

- **Arithmetic:** 1 film = 2 takes = 2 requests, so 5 films = 10 requests, no spare. Unused requests expire at 15.00 WIB.
- **Rhythm:** before 15.00 research, facts and scripts for the 5 films that publish tomorrow (no Gemini); at 15.00 check the guard's counter rolled to a new day, then one voice batch of 10 requests; after that render, check, schedule for 07/10/13/16/19 the next day; evening report to me. Films made today publish tomorrow, so there is always a one-day buffer.
- **Short on time or quota:** drop the last slot first (19.00), never fact-checking or quality. Gemini failure = stop and tell him, no edge-tts.
- **Transition:** 2 Nov quota locked until 15.00; bau-elpiji voice at 15.00 (takes 16.00 if scheduled before then, else 19.00); 3 Nov publishes only films voiced in the 2 Nov 15.00 to 3 Nov 14.59 quota day (at most 4 more); full rhythm from 3 Nov 15.00 for 4 Nov.
- **Unconfirmed:** the 15.00 reset is inferred from Pacific midnight and one 429 retry time. The first batch on 2 Nov at 15.00 tests it; if the first request still gets 429, record the real reset time here. The reset moves to 14.00 WIB from 14 Mar 2027 (Pacific daylight time).
- **Paid tier: no, for now (his answer, 2 Nov 2026).** It would have cost roughly $4.5 a month at 10 takes a day ($9 per 1M audio tokens through 31 Dec 2026, $18 from 1 Jan 2027). Don't raise it again unless the free limit becomes the thing blocking him.
- **Log every Gemini use (his rule, 2 Nov 2026):** so used and left are known. `voice.py` now logs each attempt to `~/.claude/sekitar-gemini-log.jsonl` (WIB time, film, result, used/limit) and prints the running count; `tools/quota.py` shows status; requests sent any other way get `quota.py add 1 "<why>"`. Before and after each voice batch, tell him used and left. Seeded 2 Nov 2026 with two rows from memory (11.16 test ok, 11.29 bau-elpiji 429, times approximate); earlier requests of that Pacific day were not logged. Local skill only, not pushed.

**Why:** the stock of ideas and production hours were already known limits; the voice quota is the hard daily cap, and an unplanned 429 mid-film wastes the take budget of the whole day.
**How to apply:** at session start on a film day, check the clock against the 15.00 anchor and the guard file `~/.claude/sekitar-gemini-usage.json`; start the voice batch only for finished scripts; fill the table in `jadwal.md` ("Permintaan Gemini terpakai") as films finish. Related: [[feedback-say-time-before-long-steps]].
