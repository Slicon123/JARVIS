---
name: project-valorant-connection
description: Valorant lag/disconnects on his laptop — phone hotspot (Redmi Note 10S) relaying router home-5G; test results and fixes tried
metadata:
  type: project
---

Bryan plays Valorant on his laptop (Intel AX201 Wi-Fi). The laptop sits where the router's **home-5G**
signal is weak (40–50%), and he hasn't run a LAN cable yet. So he relays: laptop → hotspot of his
**Redmi Note 10S** → home-5G, placing the phone where the router signal is better. Problem: the laptop
randomly shows "No internet" on the hotspot, or drops off it. Direct home-5G gives random high ping.

The router also broadcasts **home-2.4** (2.4 GHz, ch 1, same box) plus a second home-2.4 on ch 10 (another device).

**Test 28 Oct 2026** (phone near the laptop, where 5G is weak; **he moved the phone mid-test without
knowing a test was running, so this result is unreliable. Re-test with the phone held still**):
- Direct home-5G, 30 pings: 0% loss, Google median 26 ms, max 61 ms.
- Phone hotspot (5 GHz ch 161, 99% signal): the link to the laptop never dropped, but internet ran in
  bursts: ~5 s working, then 30–50 s dead, repeating about once a minute. Even the phone itself (gateway)
  stopped answering, so the phone's one Wi-Fi radio was going quiet, most likely scanning or
  hopping between home-2.4 and home-5G. The hotspot has to follow whichever channel the phone uses.
- Windows log that day: two "disconnected by the driver" drops from the phone (13:55, 14:43).

**Re-test 28 Oct 2026, phone held still in a good spot:** same pattern, about 68% loss: 2–8 s up, then
30–70 s down, over 3 min. Bryan then spotted it himself: **the drops happen when the phone's screen turns off**
(MIUI putting Wi-Fi/hotspot to sleep). That is the leading cause. Untested fix: phone on the charger plus
Developer options → "Stay awake" so the screen never sleeps while he plays.
Careful: the test moves the laptop onto the hotspot, so a dead hotspot also cuts off Claude's own session.
On 28 Oct the switch back failed and he got ECONNREFUSED. Make the switch back retry.

**Third test 28 Oct 2026, screen kept on** (Sleep set to 10 min, since MIUI has no "Never"; Stay awake not found in
Developer options): **still 78% loss**, with dead spells of up to 3 min. So the screen turning off is ruled out.
The hotspot relay fails at the phone whatever we do. Direct home-5G was clean in all three 30-second baselines (0% loss, ~25 ms).
Next options offered: tune the laptop for direct 5G (no roaming, no auto-hop to home-2.4 2.4, Wi-Fi power
saving off) and log ping during a real match; USB tethering; LAN cable.
Note: dead pings make the test run long (3 timeouts per sample), so the "3 min" test took 7. Use a time-based loop.

**Laptop Wi-Fi state, 28 Oct 2026** (Intel AX201, "Wi-Fi 2"). Already set before this session: Roaming Aggressiveness
Lowest, Prefer 5 GHz band, profiles home-2.4 and Redmi Note 10S on "connect manually". Set this session through
UAC: MIMO Power Save Mode → No SMPS (was Auto SMPS), Packet Coalescing → Disabled (was Enabled).
Not done yet, and he has to approve it first: `netsh wlan set autoconfig enabled=no` during matches, which stops
background scans but also stops auto-reconnect. Then a 60-minute ping log started while he plays on direct 5G.

**Direct 5G test without playing, 28 Oct 2026 ~18:00** (laptop signal 29–53%, internet ~22 Mbps):
- Idle: AWS Singapore (stand-in for Valorant SG) median 30 ms, but 5 of 160 samples >100 ms (max 737);
  3–5% of pings lost, one every 20–30 s, including 1.3% lost to the router itself. Cause: the weak Wi-Fi link.
- During a full-speed download on the laptop: Singapore median 88 ms, 44% of samples >100 ms, max 693; 13% lost
  even to the router. So the weak link chokes under load: anything downloading on the laptop = high ping.
- Conclusion given: the "random high ping" comes from weak signal plus load. Fix = better signal (move laptop/router,
  LAN cable, repeater), and stop downloads/updates/sync while playing. Not measured: load from other people in the house.

**2.4 vs 5 GHz, back to back, 28 Oct 2026 ~18:15** (90 s normal use + 45 s download each). home-5G set to metered (cost=Fixed) the same day.
- home-2.4 2.4 joined (ch 10, 85%), a **different box** from the 5G router.
  Normal use: 0% lost to the router, Singapore median 27 ms, 1 spike. Download: **73 Mbps**, still 0% lost to the router, but
  Singapore median 141 ms. The internet line itself fills up when the laptop downloads at full speed.
- home-5G (29% signal): normal use 1.1% lost to the router, Singapore 29 ms, 2 spikes; download 25 Mbps, 9% lost to the router,
  Singapore median 106 ms.
- Read: the 2.4 box has the healthier Wi-Fi link (no loss, 3× the speed). Both get high ping only during heavy downloads.
  Valorant itself uses well under 1 Mbps. Suggested making home-2.4 the auto network and 5G manual, and asked
  whether the 2.4 box near his room has LAN ports (a short cable to it would be the real fix).

**Fixes suggested, not yet confirmed:** on the phone, forget home-2.4 (2.4 GHz) so it can't hop; turn off
MIUI's automatic network switching; battery saver off and the phone charging while he plays; keep the phone
where 5G is strong; USB tethering (with a long cable) instead of the hotspot. The real fix is a LAN cable.
Re-test with `hotspot-test.ps1` (ping logger) after each change. The script was only in the session scratchpad, so rewrite it if needed.

**Why:** Valorant needs steady ping; a few seconds of loss is a disconnect or a lost round.
**How to apply:** start from these results; ask which fixes he has already done before suggesting them again.
