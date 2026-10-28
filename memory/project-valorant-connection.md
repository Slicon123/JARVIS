---
name: project-valorant-connection
description: Valorant lag/disconnects on his laptop — phone hotspot (Redmi Note 10S) relaying router BedJam34 5G; test results and fixes tried
metadata:
  type: project
---

Bryan plays Valorant on his laptop (Intel AX201 Wi-Fi). The laptop sits where the router's **BedJam34 5G**
signal is weak (40–50%), and he hasn't run a LAN cable yet. So he relays: laptop → hotspot of his
**Redmi Note 10S** → BedJam34 5G, placing the phone where the router signal is better. Problem: the laptop
randomly shows "No internet" on the hotspot, or drops off it. Direct BedJam34 5G gives random high ping.

The router also broadcasts **BedJam34** (2.4 GHz, ch 1, same box) plus a second BedJam34 on ch 10 (another device).

**Test 28 Oct 2026** (phone near the laptop, where 5G is weak; **he moved the phone mid-test without
knowing a test was running, so this result is unreliable. Re-test with the phone held still**):
- Direct BedJam34 5G, 30 pings: 0% loss, Google median 26 ms, max 61 ms.
- Phone hotspot (5 GHz ch 161, 99% signal): the link to the laptop never dropped, but internet ran in
  bursts: ~5 s working, then 30–50 s dead, repeating about once a minute. Even the phone itself (gateway)
  stopped answering, so the phone's one Wi-Fi radio was going quiet, most likely scanning or
  hopping between BedJam34 and BedJam34 5G. The hotspot has to follow whichever channel the phone uses.
- Windows log that day: two "disconnected by the driver" drops from the phone (13:55, 14:43).

**Re-test 28 Oct 2026, phone held still in a good spot:** same pattern, about 68% loss: 2–8 s up, then
30–70 s down, over 3 min. Bryan then spotted it himself: **the drops happen when the phone's screen turns off**
(MIUI putting Wi-Fi/hotspot to sleep). That is the leading cause. Untested fix: phone on the charger plus
Developer options → "Stay awake" so the screen never sleeps while he plays.
Careful: the test moves the laptop onto the hotspot, so a dead hotspot also cuts off Claude's own session.
On 28 Oct the switch back failed and he got ECONNREFUSED. Make the switch back retry.

**Third test 28 Oct 2026, screen kept on** (Sleep set to 10 min, since MIUI has no "Never"; Stay awake not found in
Developer options): **still 78% loss**, with dead spells of up to 3 min. So the screen turning off is ruled out.
The hotspot relay fails at the phone whatever we do. Direct BedJam34 5G was clean in all three 30-second baselines (0% loss, ~25 ms).
Next options offered: tune the laptop for direct 5G (no roaming, no auto-hop to BedJam34 2.4, Wi-Fi power
saving off) and log ping during a real match; USB tethering; LAN cable.
Note: dead pings make the test run long (3 timeouts per sample), so the "3 min" test took 7. Use a time-based loop.

**Fixes suggested, not yet confirmed:** on the phone, forget BedJam34 (2.4 GHz) so it can't hop; turn off
MIUI's automatic network switching; battery saver off and the phone charging while he plays; keep the phone
where 5G is strong; USB tethering (with a long cable) instead of the hotspot. The real fix is a LAN cable.
Re-test with `hotspot-test.ps1` (ping logger) after each change. The script was only in the session scratchpad, so rewrite it if needed.

**Why:** Valorant needs steady ping; a few seconds of loss is a disconnect or a lost round.
**How to apply:** start from these results; ask which fixes he has already done before suggesting them again.
