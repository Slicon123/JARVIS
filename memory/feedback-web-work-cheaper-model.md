---
name: feedback-web-work-cheaper-model
description: Any task that opens the web (search, page reads, Chrome, Agent Reach, Shopee links) goes to a subagent on Sonnet, not the main model (20 Nov 2026)
metadata:
  type: feedback
---

Web work runs in a subagent with `model: "sonnet"` (Sonnet 5.5), never on the main session's model. That covers WebSearch, WebFetch, page reading, Claude in Chrome (Shopee affiliate links, uploads, sosmed-audit reads), Agent Reach / Tokopedia prices, and yt-dlp title lists. Brief the subagent with exactly what to find or do, and have it return only the facts, URLs and dates. Claude itself still judges and writes the result: idea blocks, scripts, reports.

**Why:** Bryan said on 20 Nov 2026 that opening web pages on the top model burns his usage too fast. He wants this in every session, including film chats started from riset-sekitar.

**How to apply:** Before the first web step in any skill (riset-sekitar, riset-produk, sekitar's link step, unggah-sekitar, sosmed-audit, deep research), spawn the subagent with `model: "sonnet"`. When starting a side session whose work is mostly web, pass a Sonnet `model` too. Group several lookups into one subagent so it doesn't start cold many times. A web-fetch agent type with no model setting counts as web work too, so give it `model: "sonnet"`.

On 21 Nov 2026 he saw product lookups still running on Opus, because the skills said "open Chrome" directly and the skill text won over this memory. The rule is now written into riset-produk (step 0), sekitar (product photos + link) and riset-sekitar (top). Sonnet, not Haiku: Chrome navigation and Shopee's anti-bot pages need it.

Related: [[reference-agent-reach]], [[feedback-make-affiliate-link]], [[project-konten-edukasi-sekitar]].
