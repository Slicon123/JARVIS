---
name: project-freqtrade-turtle-swing
description: Bryan's crypto swing-trading bot — Freqtrade + TurtleSwing rule card, installed 16 Nov 2026; backtest results vs buy-and-hold; only Gate.io reachable from his internet; dry-run not started
metadata:
  type: project
---

Started 16 Nov 2026. Bryan wanted "AI day trading"; clarified he means trades lasting days–weeks
(swing trading), not minute-by-minute. Chosen tool: Freqtrade (native Windows install, Python 3.14,
no WSL/Docker) in `C:\Bryan De Great\Trading\freqtrade\` (`.venv`, `config.json`,
`user_data\strategies\TurtleSwing.py`).

Rule card (Turtle System 1, crypto spot, long only, daily candles, BTC/USDT + ETH/USDT):
close above SMA200 filter; buy on close > previous 20-day high; sell on close < previous 10-day low;
stoploss 2×ATR(20) fixed at entry; size = 1% account risk per trade; max 2 open trades; no
shorting/leverage/pyramiding.

**Exchange:** from his home internet only Gate.io's API answered; Binance, OKX, Bybit and Kraken
all timed out (likely ISP block). Config uses `gate`.

**Backtest 2020-01-01 → 2026-11-15 (Gate data, 1000 USDT):** +178.6% (CAGR 16.1%), 50 trades,
54% win, profit factor 4.9, worst wallet drop 15.0%. Buy-and-hold over the same period:
BTC +808% (worst drop −76.6%), ETH +1306% (−79.3%). So the card lost badly to holding on return
but cut the worst drop from ~77% to 15%. Rules were set before seeing data, not tuned.
`lookahead-analysis`: no bias (20 signals); `recursive-analysis`: indicators stable.

**Three options compared 16 Nov 2026** (also from the 8 Nov 2021 top, as a bear case):
| | 2020→now | top 2021→now |
|---|---|---|
| Card 1% risk | +178.6%, worst drop 15.0% | +22.6%, 10.9% |
| Card 2% risk (`TurtleSwing2pct`, same 50 trades, only size changes) | +478.7%, 19.7% | +47.0%, 19.5% |
| Hold 50/50 lump | +1054.5%, 77.8% | −32.6%, 76.8% |
| DCA monthly 50/50 (0.2% fee) | +104.0%, 75.8% | +16.2%, 54.0% |
2% card was the best overall fit (only one that held up in both periods); lookahead clean too.

**Dry-run started 16 Nov 2026 13:12 WIB:** both bots (1% and 2%) via `Mulai dry-run.bat`, separate
`user_data\dryrun_1pct.sqlite` / `dryrun_2pct.sqlite` and logs. On 15 Nov BTC (65,350) and ETH (1,835)
were both below SMA200 (72,977 / 2,144), so expect no trades for a while. Telegram NOT set up: each
bot needs its own BotFather token (one token can't serve two bots) plus his chat_id; keep tokens in
local config only, never in this public repo.

**Why:** Bryan explicitly asked that results be real — the bot decides only from the rule card,
never from knowing where the chart went. Always rerun `lookahead-analysis` after any strategy change
and show him the table.

**How to apply:** next steps were his choice (dry-run on laptop needs it on and online; Telegram not
set up; no exchange account/API key yet). If he changes a rule, change one at a time and warn about
overfitting. Ties to [[user-investing-approach]] (fundamentals, bear cases).
