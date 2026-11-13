---
name: reference-auralys-music-app
description: Auralys "free music streaming" app he installed on his phone 13 Nov 2026 — what it really is, the safety verdict, and how his Liked Music got into it
metadata:
  type: reference
---

Auralys (auralys.my.id, dev "DAPZ DEV", Telegram/TikTok only, files on MediaFire) was checked 13 Nov 2026 by reading the files, not running them.

- Android APK 4.3.3 = **Metrolist** (open-source YouTube Music client, github.com/MetrolistGroup/Metrolist, GPL-3.0) rebranded; package `com.auralyst.app`, code still `com.metrolist.music`. Extras over Metrolist: video mode, official-version swap, ambient mode, EQ wizard, PC sync, themes/icons/widgets.
- Windows MSI 1.9.3 = his own Compose Desktop app on Metrolist's innertube library; standard jpackage installer, optional autostart, update check at a Vercel URL (dead on 13 Nov).
- No malware patterns found in either. Both unsigned. "Free" = it pulls music from YouTube Music (against YouTube ToS); dev earns from QRIS donations.
- Advice given: use without logging in (or a spare Google account); Metrolist upstream is the lower-risk choice.

His Liked Music (162 songs, YouTube Music account "bryan putra") was copied to an unlisted playlist "Liked Music Bryan" and imported into Auralys on his A36. Samsung's file picker greys out `.m3u` under Import M3U (wants `audio/*`); **Import CSV** with Title/Artist columns worked. Files kept in his PC Downloads folder.

**PC ↔ phone sync (done 13 Nov 2026):** manual, by QR over the local network, no YouTube login needed, merges both ways, downloads don't move. PC: Settings > Backup > Sinkron dengan HP (QR expires in 3 min); phone: Settings > Backup & import > Sync with Auralys PC. What blocked it, in order:
1. He closed the Windows Firewall popup with X, which makes Windows create two **Block** rules (TCP and UDP, Public profile) for `Auralys.exe`; Block beats Allow. Fix = delete rules named `auralys.exe`, keep the Allow rule "Auralys Sync" (admin PowerShell; I can't change firewall myself, he runs it).
2. The laptop was on cable and Wi-Fi at once, on two different home subnets; unplug the cable so only one network is active.
3. Even on the same subnet, the laptop couldn't see the phone at all (no ARP entry) = router client isolation. **Phone hotspot with the laptop joined to it worked**; sync needs no internet.

Chrome's YouTube Music was left switched to the "bryan putra" account — see [[reference-upload-route]] before uploading as @rupanya.gini.
