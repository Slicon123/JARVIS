---
name: ui-ux
description: Research-backed UI/UX rules for building or redesigning a landing page, website, web app, tool, tracker, dashboard or form, covering the first screen, touch targets, feedback and undo, forms and errors, readability, accessibility numbers, and a pre-ship check. Use whenever Bryan asks to make or redesign a landing page, website, web app, app screen, artifact tool or form, or says "bikin landing page", "bikin aplikasi", "bikin web", "desain ulang", "rombak UI", "perbaiki UI/UX", "biar enak dipakai". Complements artifact-design, which sets the visual identity; this sets how the page behaves and reads.
---

# UI/UX from research

Every rule below comes from a study, a standard, or a large observational dataset; the
sources are in [SOURCES.md](SOURCES.md). Apply them by default without being asked. Bryan's
explicit request wins: if it conflicts with a rule (an auto-playing carousel, all-caps
paragraphs), say so once with the reason, then build what he asked.

## How to work

1. Before any layout, write down for yourself the page's **one job** and its **primary
   action**: the thing a visitor or user must be able to do in the first screen.
2. Decide the page type. **App/tool**: used again and again, so speed of the repeated task
   wins. **Landing page**: judged once in seconds, so clarity of the offer wins. Apply
   "Every page" plus that type's section.
3. Build. Then run **Check before shipping** and fix what fails. A failed check is a bug,
   not a style choice.
4. When Bryan asks why the page looks the way it does, map each decision to its source in a
   short table. Don't write that table unprompted.

## Every page

**First screen and scanning**
- People spend 57% of viewing time in the first screen and 74% in the first two. Put the
  status and the primary action in the first screen at phone height (about 640px of
  usable viewport).
- People scan rather than read, often in an F shape. Start headings, list rows and
  buttons with the word that carries the meaning. Left-align body text. Never centre a
  paragraph longer than two lines.
- The first impression forms in about 50 ms and rarely changes. Low visual complexity and a
  conventional ("prototypical") layout score best. Put things where people expect them:
  logo top-left, navigation at the top, actions where the genre puts them. Spend the
  originality on visuals, not on where things are.
- Anything that looks like an ad gets skipped: a boxed banner at the top or right, motion,
  a loud colour block. Put important messages inline, styled like the content around them.

**Targets (phones first)**
- Every tap target is at least **48×48 CSS px**, never below 44, with at least 8px between
  targets. The primary action is 56px tall. Padding counts, so the hit area can be bigger
  than what's drawn.
- Touch is most accurate in the middle of the screen. Keep primary content in the middle
  half to two-thirds. Targets along the top and bottom edges need more size and spacing:
  about 7 mm apart in the centre, 10–12 mm at the edges.
- Keep a destructive action away from the frequent one, styled differently. Never put
  "Hapus" next to "Simpan" with the same look.

**Feedback, errors, control**
- Every action shows a result within **0.1 s**: a pressed state or an optimistic update.
  Over 1 s, show that work is in progress ("Menyimpan…"). Over 10 s, show percent done
  and let the user keep working. 86% of people prefer a progress bar even when it saves
  no time.
- **Undo beats confirmation.** A reversible action happens at once and offers "Batalkan".
  People click through warnings out of habit. Confirm only rare actions that can't be
  undone, inside the page; `alert()` and `confirm()` don't run in artifacts anyway.
- Prevent errors before reporting them. Disable submit after the first tap, block
  impossible values such as future dates, and make a repeated tap do nothing rather than
  count twice.
- Error messages are plain words: what went wrong and how to fix it. Place them next to
  the field, marked with colour, an icon and text together. No error codes.
- Recognition over recall. Show the current state, the options and the dates. Never make
  the user remember what they entered last week.
- The main screen shows only the choices that matter now; each extra option slows the
  decision. Settings and rare actions go behind a disclosure (`<details>`, a "Lainnya"
  section).

**Reading**
- Body text at least 16px. Lines about 55–75 characters long (`max-width` around 34–40rem
  at 16px). 55 characters per line gave the best comprehension when reading on screen.
- No ALL CAPS for anything longer than one or two words. Capitals only help for a single
  glanced word. Condensed type reads about 11% slower at a glance, so key numbers are set
  at regular width.
- Short sentences, everyday words, the user's own terms. For Bryan's pages, Indonesian
  copy is casual: aku/kamu, never saya/Anda.

**Accessibility (WCAG 2.2 AA, the numbers to hit)**
- Text contrast at least **4.5:1**, or 3:1 for text at 24px+ or 19px+ bold. Meaningful
  graphics and control boundaries at least **3:1**: input borders, empty progress dots,
  icons that carry meaning.
- Colour is never the only signal. Pair it with a shape, an icon or a word.
- Visible keyboard focus. Every input has a `<label>`. Status messages go to an
  `aria-live` region.
- Honour `prefers-reduced-motion`. UI animation lasts 100–300 ms with ease-out, never past
  500 ms. Feedback on small elements takes about 100 ms.
- A message that disappears (a toast) pauses while hovered or focused, and its action is
  also reachable somewhere permanent.

**Forms** (20 guidelines, validated in a controlled CHI 2014 study)
- Ask only what's needed. One column, one question per row, labels **above** fields.
  Field width roughly matches the answer's length.
- State format rules before the input ("angka saja, tanpa titik"), not only in the error.
- Up to 4 options: visible radio buttons or a segmented control. More: a dropdown.
- Validate on submit. For hard fields such as a new password or username, validate when
  the user leaves the field. Never validate while someone is still typing. Show all errors
  at once, inline. Never clear what the user already filled in.
- Disable submit once tapped. Afterwards, confirm what happened and what comes next. No
  reset buttons.

**Charts and progress**
- Accuracy ranks position on a common scale first, then length, angle, area, and colour
  last. Compare with bars or dots on one axis, not pies or bubbles. Load the `dataviz`
  skill for anything beyond a simple progress display.

**Honesty**
- No dark patterns. A crawl of 11K shopping sites found 1,818 instances of 15 types. That
  rules out: fake urgency or countdowns, fake scarcity, confirmshaming ("Gak, aku gak mau
  hemat"), pre-ticked add-ons, costs revealed at the last step, and cancel flows harder
  than sign-up.
- Progress shown must be real. "Bonus" head-start progress measurably changes behaviour,
  which is exactly why it must never be faked.

## Apps and tools (used repeatedly)

- **Capturing data must take one tap.** Personal trackers fail at the collection stage
  when logging is effort. The repeated action is the biggest button in the first screen.
- **Plan for lapses.** People drop tracking mostly by forgetting. Make it easy to add a
  missed entry for a past date, point out the most recent gap once with a one-tap fix and
  a way to dismiss it, and never punish a gap.
- **Support looking back.** Keep a dated history, newest first, grouped by week or month
  with subtotals, every row editable in place.
- **Summary before detail.** The number that answers the user's actual question is the
  largest thing on screen, followed by what explains it.
- **Show progress toward a fixed goal** as a filling bar or a unit chart (one mark per
  unit, grouped in fives or sixes so it can be counted). Visible progress motivates more
  as the goal nears.
- **Use desktop width.** At 880px and up, put the summary in a sticky column and the
  detail beside it; don't just centre a phone column. At phone width, use one column.
- Writes are optimistic and idempotent (set a value, don't increment a counter), so a
  double tap or a retry can't double-count.

## Landing pages (judged once)

- **The first 10 seconds decide whether people stay.** Leaving is most likely in that
  window and flattens out after about 30 s. The first screen must say what it is, who it
  is for, and what to do next, through one headline, one supporting line, and one primary
  CTA.
- **One primary CTA**, visually the strongest element and repeated at the end of the
  page. Secondary actions look clearly weaker.
- **Specific beats fancy.** Use real numbers, real screenshots and concrete benefits.
  Promotional styling and buzzwords look like ads and get skipped.
- **No auto-advancing carousels.** People ignore them and find them annoying. If several
  items must share a spot, show them as a static grid or let the user advance them.
- **Polish raises perceived usability, but not actual usability.** People rate a nicer
  interface as easier to use. So test the real task (can someone find the price, sign up
  or contact you) and don't stop at "it looks good".
- Keep the first paint fast: no autoplaying hero video, and images sized to their slot.

## Check before shipping

- [ ] Phone width (~400px): the primary action and the key status are visible without
      scrolling, and nothing scrolls sideways.
- [ ] Every target is ≥48px tall (≥44 at worst) with ≥8px between targets; destructive
      actions are separated.
- [ ] Every action gives feedback within 0.1 s; reversible actions have undo, and
      irreversible ones have an in-page confirm.
- [ ] Contrast: text ≥4.5:1, meaningful graphics and borders ≥3:1, in **both** light and
      dark themes. Compute the ratio for every token pair you actually use rather than
      eyeballing it.
- [ ] No state relies on colour alone. No all-caps runs. Body ≥16px. Lines ≤75 characters.
- [ ] Forms: labels above, format stated up front, errors inline after submit, submit
      disabled while saving, fields never cleared.
- [ ] Empty, loading, error and "done" states are all designed, not blank.
- [ ] Keyboard path works: visible focus, logical order, focus kept after a re-render.
- [ ] Reduced motion respected; no animation longer than 500 ms.
- [ ] Landing page: offer, audience and CTA are clear in the first screen; there is no
      carousel and no dark pattern.
- [ ] Run the real task once end-to-end with realistic data before handing over the link,
      for example in jsdom with a fake data store when the page uses one.
