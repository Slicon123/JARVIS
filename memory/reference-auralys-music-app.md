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

Chrome's YouTube Music was left switched to the "bryan putra" account — see [[reference-upload-route]] before uploading as @rupanya.gini.
