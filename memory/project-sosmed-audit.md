---
name: project-sosmed-audit
description: sosmed-audit skill for @rupanya.gini only, built 2 Nov 2026; reads Studio via Claude in Chrome instead of screenshots; ends in a 7-day plan; first plan and open TikTok fault inside
metadata:
  type: project
---

On 2 Nov 2026 Bryan asked for a deep dive on his social media as a report. He refused an artifact and asked for a skill: `claude-config/skills/sosmed-audit/`, reports as local files in `C:\Bryan De Great\Konten\Sosmed Audit\`. Not committed; he hasn't asked to push it.

**His rules, 2 Nov 2026:**
- Only @rupanya.gini. His personal accounts are out of scope: don't open, search or mention them.
- After the stats, always give the best plan for what's next.
- Screenshots take him too long. Read Studio pages through Claude in Chrome (he types `@browser` in VS Code; the extension's icon was in his toolbar). Read-only, reading pace, stop at any captcha or login. The first run used his screenshots. First Chrome run, Instagram only, 2 Nov 2026 16.10 WIB: it works, but IG's web insights have no watch time or skip rate (app only), `get_page_text` returns nothing there, and screenshots time out right after a scroll, so read numbers with `find` and retry the zoom on its own.

**IG at 16.10 WIB, 2 Nov 2026:** each reel gets about 1,400 to 1,600 views in its first 3 hours, then stops (keran +3 in 3 hours). 2 follows from 6,048 views (0.33 per 1,000). Segitiga ban was fastest (1,606 in 3 h) and most saved (5).

**First run, 2 Nov 2026, about 12.55 WIB:** about 9,300 views on 3 films in under 18 hours: Instagram 4,414 (99%+ non-followers), YouTube about 3,850, TikTok 1,080. YouTube average watched 19 to 21 s. At most 5 followers in total.

**Open:**
- TikTok Minyak terbakar at 0 views after almost 3 hours, against 1,460 on Instagram, so it isn't the film. He found no notice in his notifications (2 Nov 2026). Compare with Segitiga ban tonight. Don't delete or re-upload until known.

**His answers, 2 Nov 2026:**
- Shorter films (45 to 55 s): no. Don't raise it again without new evidence.
- Follow line in caption and first comment: yes, now in `sekitar` and enforced by `upload_check.py`, for the next 5 films starting with bau-elpiji and hujan-pertama. As of 2 Nov 2026 he had never posted a first comment on any film (his report), so the trial so far covers the caption only; I gave him comment text for all 6. Ask him on 9 Nov whether it stays; if not, remove the rule and the check.
- Motor and fuel topics next: he didn't answer it directly, so `jadwal.md` is unchanged.

**Why:** content income is his longer-term goal, and only Studio numbers show why films stall.
**How to apply:** rerun on 8, 9 and 15 Nov 2026 (first 7-day numbers, then the end of the trial in [[project-konten-edukasi-sekitar]]). Treat anything under 7 days or 10 films as a hint.
