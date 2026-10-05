---
name: reference-catering-tracker
description: Bryan's kost catering terms (Rp 450.000 = 48 menu) and the claude.ai tracker page that counts menus received per payment
metadata:
  type: reference
---

Tracker: https://claude.ai/artifact/HpaApuEoa2NmXf5E1u9dcW ("Kartu Catering", private,
built 5 October 2026). Its data lives in the artifact's `db`, readable with `ArtifactData`:
`periods/{YYYY-MM-DD start}` → `{start, price, menus, carried}`, and `days/{YYYY-MM-DD}` →
`{menu: 1|2}`. Used = `carried` + sum of `menu` from that period's start up to the next
period's start. When he asks "sisa berapa?", read it from there instead of guessing.

Catering terms he gave: **Rp 450.000 per payment = 24 days × 2 menu = 48 menu**, both menus
delivered together, normally off on Sunday. He wants it counted **per menu**, and the only
question is how many menus he has received in the current payment. A day the catering
doesn't come (owner sick etc.) simply isn't recorded; he rejected a separate "gak dateng"
status as unnecessary.

The artifact belongs to his current Claude account. If he moves to his other account
(see [[user-claude-account-context]]), read the `db` out and move it before he loses access.

Related: [[project-gym-nutrition-bulking]]
