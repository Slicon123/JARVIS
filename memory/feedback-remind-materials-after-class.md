---
name: feedback-remind-materials-after-class
description: "At the start of every session, check if Bryan's most recent class has ended and remind him to upload that class's materials if he hasn't yet"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cc479f6a-a31d-4d36-8245-393c32bd5c9c
  modified: 2026-09-03T04:08:14.476Z
---

Every time a new conversation starts, check whether Bryan's most recent scheduled class (per [[project-uksw-digital-business]], or the live Google Calendar on `bryanputra2710@gmail.com`) has already ended for the day. If it has, and he hasn't uploaded/pasted that class's materials to Claude yet, remind him at the start of the reply to send the materials from that class.

**Why:** Bryan wants to build a record of his class materials in Claude but will forget to do it unprompted. He explicitly asked to be reminded "every time I open Claude" after a class ends — this is per-session behavior tied to opening a conversation, not a background/push notification (a cloud cron routine was considered and rejected as the wrong fit since it can't tell "did he already give me the materials").

**How to apply:**
- Compare current WIB time against the class schedule in [[project-uksw-digital-business]] (Selasa/Rabu/Kamis/Jumat blocks) to figure out which class, if any, just ended.
- Once he supplies materials for a given class in a session, stop reminding for that class — only remind again after the *next* class ends.
- Keep the reminder to one short line; don't block on it if he's clearly asking about something unrelated.

Related: [[project-uksw-digital-business]]
