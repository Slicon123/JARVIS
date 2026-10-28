---
name: project-valorant-connection
description: Valorant lag/disconnects on his laptop — solved 28 Oct 2026 with a LAN cable (USB adapter); earlier Wi-Fi/hotspot test results kept for reference
metadata:
  node_type: memory
  type: project
  originSessionId: b2533ab9-1009-4373-94dd-03ca9c7ad880
  modified: 2026-10-28T14:45:43.477Z
---

**Solved 28 Oct 2026 (evening): Bryan plugged in a LAN cable.** The laptop now plays on **Ethernet 3**, a Realtek USB
GbE adapter (RTL8153, USB\VID_0BDA&PID_8153). Gateway 192.168.0.1. Windows prefers it over Wi-Fi (metric 35).
60-second test on the cable: router 60/60, avg <1 ms, max 11; Google 8.8.8.8 0% loss, 23–29 ms;
AWS Singapore (TCP connect to dynamodb.ap-southeast-1:443) median 24 ms, max 74, none >100, 0 failed.
- The link negotiated **100 Mbps, not 1 Gbps** (the adapter can do 1 Gbps). Likely a 2-pair cable, a bad crimp, or a 100 Mbps
  router port. Harmless while his internet tops out around 73 Mbps; fix it only if the plan goes above 100 Mbps.
- Still true on the cable: a full-speed download fills the internet line itself (Singapore median 141 ms during a 73 Mbps
  download on the 2.4 box). No downloads/updates/sync on any device in the house while he plays.
- 29 Oct 2026: that "adapter" is really a USB-C hub (Genesys GL3510 hub + RTL8153 + HDMI). Bryan asked what LAN adapter to
  buy; whose the hub is wasn't said. The L13 Yoga Gen 1 also has Lenovo's Ethernet extension connector wired to a built-in
  Intel I219-LM (gigabit), used via the ThinkPad Ethernet Extension Adapter Gen 2 (4X90Q84427, ~Rp 570k original on
  Tokopedia). Both USB-A ports hold his external keyboard and mouse, and one USB-C holds the
  charger, so the pick became TP-Link UE300C (USB-C, ~Rp 164–272k, official store on Tokopedia) over the USB-A UE300; MeTiko 5in1 hub (Rp 38.2k) is
  100 Mbps LAN only; its Shopee reviews (read 29 Oct) show dead-on-arrival units, one dead in 2 days, a refused
  return, and one gamer reporting the plug works loose and disconnects mid-game, so advised against it.
  He believes his cable is what limits the link to 100 Mbps.
- Ping tools: `ec2.ap-southeast-1.amazonaws.com` does not answer ICMP. Time TCP connects to
  `dynamodb.ap-southeast-1.amazonaws.com:443` instead, and use a time-based loop.

**Heat, 28 Oct 2026:** laptop is a Lenovo ThinkPad (model 20R6), i5-10310U, integrated graphics only. He worried about
overheating with Valorant + Discord. Windows logged no thermal events in 60 days; one Kernel-Power 41 unexpected
shutdown on 18 Oct 2026 21:24, cause unknown. He has done: FPS cap, hard flat surface, charger in, apps closed, vents
cleaned. No cooling pad. Temps never measured (needs admin or HWiNFO); target: CPU max under 90 °C in a match.

**Low FPS, 28 Oct 2026 (checked mid-match):** CPU ran at only 50–69% of its 1.7 GHz base (~0.9–1.2 GHz) on AC,
because the Windows power slider overlay was **Better Battery** (961cc777…) on both AC and DC. Not heat: ACPI zone 61 °C,
passive limit 100%. Other drags: Discord (most CPU time of any process), FxSound (pushes audiodg CPU), Rainmeter, Chrome
open; Intel UHD driver 30.0.101.1692 from Apr 2022. RAM is fine (2×8 GB dual channel, 2667). Valorant at 1600×900 fullscreen.
Told him: slider to Best performance first, then close the extras, then update the driver.

**History, before the cable** (laptop Intel AX201 "Wi-Fi 2", where the router's home-5G is weak, 29–53%):
- Phone hotspot relay (Redmi Note 10S → home-5G) failed in three tests on 28 Oct: 68–78% loss, internet in bursts of a
  few seconds then 30 s–3 min dead. Screen-on did not help. Cause sits in the phone (one radio, MIUI). Abandoned.
- Direct home-5G: Singapore median 30 ms but 3–5% loss and spikes to 737 ms idle; under download, median 106 ms, 9–13% loss
  even to the router. Weak signal + load.
- home-2.4 (ch 10, a different box near his room, 85%): 0% loss to the router, 27 ms, 73 Mbps. Was his auto network before the cable.
- Laptop Wi-Fi settings changed that day and still in place: Roaming Aggressiveness Lowest, Prefer 5 GHz, MIMO Power Save
  No SMPS, Packet Coalescing Disabled; home-2.4 auto/top priority, home-5G and the Redmi hotspot manual; home-2.4 and
  home-5G set to metered. Not done: `netsh wlan set autoconfig enabled=no`.

**Why:** Valorant needs steady ping; a few seconds of loss is a disconnect or a lost round.
**How to apply:** if lag comes back, first check he's actually on Ethernet 3 and nothing is downloading, then re-run the
60 s cable test above and compare. Don't re-suggest the hotspot or Wi-Fi tuning.
