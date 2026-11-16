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

**Why:** Bryan explicitly asked that results be real — the bot decides only from the rule card,
never from knowing where the chart went. Always rerun `lookahead-analysis` after any strategy change
and show him the table.

**How to apply:** next steps were his choice (dry-run on laptop needs it on and online; Telegram not
set up; no exchange account/API key yet). If he changes a rule, change one at a time and warn about
overfitting. Ties to [[user-investing-approach]] (fundamentals, bear cases).
