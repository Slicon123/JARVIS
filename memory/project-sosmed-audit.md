---
name: project-sosmed-audit
description: "sosmed-audit skill for @rupanya.gini only, built 2 Nov 2026; reads Studio via Claude in Chrome instead of screenshots; ends in a 7-day plan; first plan and open TikTok fault inside"
metadata:
  node_type: memory
  type: project
  originSessionId: 85c93808-aecd-4e02-8de3-a45c23105852
  modified: 2026-11-06T18:30:52.030Z
---

On 2 Nov 2026 Bryan asked for a deep dive on his social media as a report. He refused an artifact and asked for a skill: `claude-config/skills/sosmed-audit/`, reports as local files in `C:\Bryan De Great\Konten\Sosmed Audit\`. Not committed; he hasn't asked to push it.

**His rules, 2 Nov 2026:**
- Only @rupanya.gini. His personal accounts are out of scope: don't open, search or mention them.
- After the stats, always give the best plan for what's next.
- Screenshots take him too long. Read Studio pages through Claude in Chrome (he types `@browser` in VS Code; the extension's icon was in his toolbar). Later on 2 Nov he asked that every audit uses `@browser`, so the skill now connects Chrome before anything else and waits for `@browser` rather than falling back to a public-only report. Read-only, reading pace, stop at any captcha or login. The first run used his screenshots. First Chrome run, Instagram only, 2 Nov 2026 16.10 WIB: it works, but IG's web insights have no watch time or skip rate (app only), `get_page_text` returns nothing there, and screenshots time out right after a scroll, so read numbers with `find` and retry the zoom on its own.

**IG at 16.10 WIB, 2 Nov 2026:** each reel gets about 1,400 to 1,600 views in its first 3 hours, then stops (keran +3 in 3 hours). 2 follows from 6,048 views (0.33 per 1,000). Segitiga ban was fastest (1,606 in 3 h) and most saved (5).

**YT + TikTok at 17.40 WIB, 2 Nov 2026 (Chrome):** YouTube now matches or beats IG (laron 2,638 and still rising vs IG's flat 1,603; about 6,700 total) and converts best (7 subs, about 1 per 1,000 views), so his "IG gets the most traffic" no longer holds; plan now puts YouTube first. Segitiga ban held longest on YT (61 s of 69 per engaged view). About half of viewers swipe away early on every film. TikTok: minyak, segitiga and hujan all at 0 views, so the fault is the account, not one film; asked him to read Account status in the app. **His check, 2 Nov 2026 evening:** no Account status item in Settings > Account (my path was wrong), and nothing in Settings and privacy, Inbox system notifications, or the 0-view video's menu. So it's a silent hold with no stated cause. Scheduling is ruled out: he posted hujan-pertama straight from the app, not scheduled (his report), and it still had 0 views about 2 hours later. Treat it as an account hold: keep posting normally, no deletes or re-uploads, recheck on 8 Nov. YT Studio's engagement tab URL is `tab-interest_viewers`; the content list lags the analytics pages.

**First run, 2 Nov 2026, about 12.55 WIB:** about 9,300 views on 3 films in under 18 hours: Instagram 4,414 (99%+ non-followers), YouTube about 3,850, TikTok 1,080. YouTube average watched 19 to 21 s. At most 5 followers in total.

**Open:**
- TikTok Minyak terbakar at 0 views after almost 3 hours, against 1,460 on Instagram, so it isn't the film. He found no notice in his notifications (2 Nov 2026). Compare with Segitiga ban tonight. Don't delete or re-upload until known.

**His answers, 2 Nov 2026:**
- Shorter films (45 to 55 s): no. Don't raise it again without new evidence.
- Follow line in caption and first comment: yes, now in `sekitar` and enforced by `upload_check.py`, for the next 5 films starting with bau-elpiji and hujan-pertama. As of 2 Nov 2026 he had never posted a first comment on any film (his report), so the trial so far covers the caption only; I gave him comment text for all 6. Ask him on 9 Nov whether it stays; if not, remove the rule and the check.
- Motor and fuel topics next: he didn't answer it directly, so `jadwal.md` is unchanged.

**7 Nov 2026:** Bryan asked to add Facebook (the Rupanya Gini Page) to the skill. It is read in Meta Business Suite only, not in `akun.json`; the Business Suite insights row in SKILL.md is untested, so fix it on the first run. He also made a YouTube Data API key (project `rupanya-gini`, free, public data only). It is not wired in: the key was never shared with me, and no private analytics without OAuth. If used, keep it in a user environment variable, never in this public repo. I told him the browser route stays the main one.

**7 Nov 2026, 01.23 to 02.10 WIB, test run of the skill (report `Laporan\2026-11-07.md`):** works end to end through `@browser`. About 415,000 views in 6 days on 26 films (YouTube about 230,000, Instagram about 128,000, TikTok about 57,000, Facebook 8,600 in 28 days). Followers: YouTube 356, Instagram 278, Facebook 130, TikTok 22 (was at most 5). Follows per 1,000 views: YouTube 1.5, Instagram 2.2 (two viral reels), TikTok 0.4. Breakouts don't carry across platforms: Truk tangki 52K on YouTube but 4.8K on IG; Jarum APAR 37K on IG but 6.8K on YouTube; Rantai 32K IG and 17K YouTube; Polisi tidur 44K YouTube. TikTok fault: lifted; only the 5 films posted 1 Nov to 2 Nov 19.00 are still at 3 to 10 views, everything since 3 Nov gets 600 to 4,400. Display name still "Rupanya Sih". Plan given: keep 5 a day, YouTube + IG first, TikTok post-only, pin first comments on the 4 breakout films, one follow-up-to-a-breakout test (decide 15 Nov). SKILL.md fixed: Studio opens on a personal channel, so go to the `@rupanya_gini` channel URL directly (never read the other); Facebook row tested (account level only); TikTok list is virtual, scroll in steps. Instagram insights pages not opened this run, so non-follower % is stale. Open: did first comments go out (unknown), 7 unanswered comments on the Facebook Page, follow line decision 9 Nov.

**Why:** content income is his longer-term goal, and only Studio numbers show why films stall.
**How to apply:** rerun on 8, 9 and 15 Nov 2026 (first 7-day numbers, then the end of the trial in [[project-konten-edukasi-sekitar]]). Treat anything under 7 days or 10 films as a hint.
