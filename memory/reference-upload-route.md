---
name: reference-upload-route
description: How to upload and schedule @rupanya.gini films through Claude in Chrome (chunked file upload, right YouTube channel, platform limits) and copy films to his phone over USB; learned 3 Nov 2026
metadata:
  type: reference
---

Learned while scheduling kartu, helm-jatuh and bensin-lama on 3 Nov 2026 (see [[project-konten-edukasi-sekitar]]).

- **Files over 10 MB:** Chrome's `file_upload` refuses more than 10 MB per call, and a browser_batch counts all its uploads together. Split the mp4 with `split -n <k> -d` into ~5 MB parts in the scratchpad, add a hidden `<input type=file id=claude-stage>` to the page that stores each file in `window.__chunks`, upload one part per call, rebuild with `new File([...parts])`, compare its SHA-256 with `sha256sum` of the original, then set it on the site's own file input through `DataTransfer` and dispatch `change`. Worked on YouTube Studio, TikTok Studio and instagram.com. Staged parts are lost when the page navigates.
- **YouTube:** `youtube.com/upload` can open a channel that is not his content channel. Check the avatar is the orange "r." / Rupanya Gini before uploading, or go straight to `studio.youtube.com/channel/UCwBcNfWiZ7y3tolo-hnanuw/videos/upload?d=ud`. Custom thumbnails need the channel's phone verification (his to do; not done as of 3 Nov 2026); "Select from video" offers only 3 automatic frames. Schedule time is a 15-minute list; pick "(GMT+0700) Local Time". Type title/description with the type action, then compare SHA-256 of `#textbox` text with the upload.md block.
- **TikTok Studio:** the Draft.js caption reads back correctly as the `[data-block=true]` texts joined by `\n` (innerText adds extra blank lines). Cover: Edit cover → image input → Save (the Save button sits above the viewport in a short window; click it with JS). AI-generated content sits under "Show more". **Scheduled posts can't be edited**, so settle everything before pressing Schedule.
- **Instagram:** instagram.com has no schedule option and no drafts. Meta Business Suite can schedule but needs him to log in ("Continue with Instagram") himself; on 3 Nov 2026 he chose to post from his phone instead.
- **Phone (Samsung A36, shown as "Bryan's A36"):** PowerShell `Shell.Application` → Namespace(17) → "Bryan's A36" → Internal storage → Movies → `CopyHere`, then check `ExtendedProperty("System.Size")` against the original bytes.
