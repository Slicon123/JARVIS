---
name: project-freqtrade-turtle-swing
description: Bryan's crypto swing-trading bot — Freqtrade + TurtleSwing rule card (1% and 2% risk), dry-running since 16 Nov 2026 with Telegram and auto-start; backtest vs hold vs DCA; only Gate.io reachable; review ~16 Dec 2026
metadata:
  type: project
---

Started 16 Nov 2026. Bryan wanted "AI day trading"; clarified he means trades lasting days–weeks
(swing trading), not minute-by-minute. Tool: Freqtrade 2026.10 (native Windows, Python 3.14, no
WSL/Docker) in `C:\Bryan De Great\Trading\freqtrade\` (outside any git repo): `.venv`, `config.json`,
`user_data\strategies\TurtleSwing.py` + `TurtleSwing2pct.py` (subclass, only `risk_per_trade = 0.02`).

**Rule card** (Turtle System 1, crypto spot, long only, daily candles, BTC/USDT + ETH/USDT):
close above SMA200 filter; buy on close > previous 20-day high; sell on close < previous 10-day low;
stoploss 2×ATR(20) fixed at entry; size = 1% (or 2%) account risk per trade; max 2 open trades;
no shorting/leverage/pyramiding.

**Exchange:** from his home internet only Gate.io's API answered; Binance, OKX, Bybit and Kraken
all timed out (likely ISP block). Config uses `gate`. Which exchange is legal in Indonesia AND
reachable for real money is still unchecked.

**Backtests (Gate data, 1000 USDT, rules set before seeing data, not tuned):**
| | 2020-01-01→2026-11-15 | from 8 Nov 2021 top |
|---|---|---|
| Card 1% risk | +178.6%, worst drop 15.0% | +22.6%, 10.9% |
| Card 2% risk (same 50 trades, only size changes) | +478.7%, 19.7% | +47.0%, 19.5% |
| Hold 50/50 lump | +1054.5%, 77.8% | −32.6%, 76.8% |
| DCA monthly 50/50 (0.2% fee) | +104.0%, 75.8% | +16.2%, 54.0% |
My recommendation: the 2% card, the only one that held up in both periods. Caveat: 50 trades is a
small sample. `lookahead-analysis` clean for both (20 signals, no bias); `recursive-analysis` stable.

**Dry-run (live since 16 Nov 2026 13:12 WIB):** both robots via `Mulai dry-run.bat`, separate
`user_data\dryrun_1pct.sqlite` / `dryrun_2pct.sqlite` and logs in `user_data\logs\`. On 15 Nov BTC
(65,350) and ETH (1,835) were both below SMA200 (72,977 / 2,144), so no trades expected for a while.
- Telegram: bot "Turtle Swing" → 1% robot, "Turtle Swing 2" → 2% robot, chat to Bryan. Tokens only
  in local `config-telegram-1pct.json` / `-2pct.json` (second `--config`), never in this public repo.
  One token per robot (shared tokens conflict). "Chat not found" = Start not pressed in the bot.
  He was told: use `/status` `/profit` `/balance` `/daily`; never `/forcebuy` `/forceexit` `/stop`.
- Auto-start: `Turtle Swing dry-run.lnk` in the user Startup folder (`shell:startup`) → the bat. The
  bat skips launching if any freqtrade.exe already runs, and waits up to 5 min for Gate to answer
  (WiFi after login) before starting. Starts only after Windows login. Delete the shortcut to undo.

**Next:** around 16 Dec 2026 (or after a few trades), compare the 1% and 2% dry-runs from their
sqlite files. Real money only after that: exchange account, API key with withdrawals off, start small.

**Why:** Bryan explicitly asked that results be real — the bot decides only from the rule card,
never from knowing where the chart went. Always rerun `lookahead-analysis` after any strategy change
and show him the table.

**How to apply:** if he changes a rule, change one at a time and warn about overfitting. After any
config or bat change, restart the robots and check both logs for heartbeat and Telegram errors.
Ties to [[user-investing-approach]] (fundamentals, bear cases).
