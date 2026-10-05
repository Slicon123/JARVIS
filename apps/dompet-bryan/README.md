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
| `test/` | `core.test.js` checks the logic; `e2e.test.js` drives the page in jsdom with a fake db |

## Change it

1. Edit the files here, then run `npm install` once and `npm test`.
2. Publish with the Artifact tool. Pass `url` set to the link above, `file_path` set to `index.html`,
   and `files` set to `{"core.js": …, "app.js": …}`. Without `url`, the publish creates a new artifact,
   and the new one has an empty database.
3. Commit the change here.
