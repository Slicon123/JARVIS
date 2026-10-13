---
name: reference-calendar-connector-timezone
description: Google Calendar connector reads times as UTC on update_event unless timeZone is passed; always pass Asia/Jakarta
metadata:
  type: reference
---

On 13 Oct 2026, `update_event` with `startTime` 09:00 and no `timeZone` set the event to
UTC, so it landed at 16:00 WIB. Passing `timeZone: "Asia/Jakarta"` put it right. Bryan's
calendar (`bryanputra2710@gmail.com`) runs on Asia/Jakarta.

**How to apply:** pass `timeZone: "Asia/Jakarta"` on every create/update, even though the
tool says to leave it unset, and check the returned `start` shows `+07:00` in Asia/Jakarta.
To move one class meeting, update that instance's id (`<recurringId>_<date>`); the series stays as it is.

Related: [[project-uksw-digital-business]]
