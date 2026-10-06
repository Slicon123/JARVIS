# Dompet Bryan

Bryan's personal expense tracker. It runs as a private claude.ai artifact:
https://claude.ai/artifact/6xN8zfA4fNfVA1LVdsJR1D

This folder is the source of truth for the page. His records are not here: they live in
the artifact's database (see `memory/reference-expense-tracker.md`).

| File | Role |
|---|---|
| `index.html` | Page markup and all CSS (theme tokens, light and dark) |
| `core.js` | Pure logic with no DOM or db: dates, rupiah, balances, reports, calculator |
| `app.js` | UI, db reads and writes, Indonesian/English text via `L('id', 'en')` |
| `test/` | `core.test.js` checks the logic; `e2e.test.js` drives the page in jsdom with a fake db; `offline.test.js` cuts that db's connection |

## Bad signal

The page keeps two things in the browser's `localStorage`:

- `dompet:cache` holds the db's docs as last seen, so the page opens at once on a slow line. A pill at the top
  says when that copy is from.
- `dompet:outbox` holds every write until the db confirms it. A write that fails for lack of signal stays there
  and is sent again later, including on the next visit. Writes are only sent after the db has answered once in
  that visit. A write the db refuses for good (storage full, doc too large) is dropped and shown as an error.

Because of the outbox, a change Bryan made with no signal can be on his phone and not yet in the db.

## Change it

1. Edit the files here, then run `npm install` once and `npm test`.
2. Publish with the Artifact tool. Pass `url` set to the link above, `file_path` set to `index.html`,
   and `files` set to `{"core.js": …, "app.js": …}`. Without `url`, the publish creates a new artifact,
   and the new one has an empty database.
3. Commit the change here.
