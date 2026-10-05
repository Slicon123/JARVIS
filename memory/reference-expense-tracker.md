---
name: reference-expense-tracker
description: Bryan's "Dompet Bryan" expense tracker — claude.ai artifact URL, db schema, and how to read his spending when he asks
metadata:
  type: reference
---

App: https://claude.ai/artifact/6xN8zfA4fNfVA1LVdsJR1D ("Dompet Bryan", private, built
5 October 2026 to the `ui-ux` skill). He uses it on his Android phone via a Chrome
home-screen shortcut. Files: `index.html` (page + CSS), `core.js` (pure logic), `app.js` (UI).
To edit, `Artifact` read the URL and rebuild from those files.

Data lives in the artifact's `db`, readable with `ArtifactData`:
- `meta/wallets|categories|budgets|recurring|goals|debts` → `{list: {id: {...}}}`. A recurring item is either
  monthly (`day`, `lastDone: YYYY-MM`; no `freq` also means monthly) or `freq: "days"` (`every`, `next: YYYY-MM-DD`).
- `meta/settings` → `{lastBackup, lang: id|en, gapReminder}` (the app switches between Indonesian and English, under Lainnya; default categories show English names while their stored name is the Indonesian default).
- `months/{YYYY-MM}` → `{tx: {id: {date, type: out|in|transfer, amount, wallet, toWallet, category, fee, note, debt, debtRole, recurring, adjust, createdAt, deleted}}}`.
- Amounts are whole rupiah. `deleted: true` is a tombstone (ignore it). Wallet balance = `initial` + in − out −
  transfer out − fee + transfer in, across all months.
- Reports leave out transfers, `adjust` (balance corrections) and `debt` movements, and count
  transfer `fee` as spending in category `admin`.

When he asks "bulan ini habis berapa?" or something similar, read `months/<YYYY-MM>` and work it out
the same way. Don't guess. **Never copy his balances or amounts into memory: this repo is public.**

It belongs to his current Claude account. Before he moves accounts ([[user-claude-account-context]]),
he should use Lainnya → Backup & pindah data → Download backup on the old account, then use
Pulihkan dari file on a new copy of the app.

Related: [[reference-catering-tracker]]
