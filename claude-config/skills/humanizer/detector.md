# Detector mode

Read this when Bryan mentions Turnitin, an AI detector or a detector score, or shares a
detector result. Run the normal process in SKILL.md, then everything below on top.

## What is known (checked 23 Oct 2026; recheck the Turnitin line after three months)

- **Turnitin's AI detection does not read Indonesian.** It covers English, Spanish, Japanese
  and Arabic (Arabic added Aug 2026); a paper in another language gets no AI score at all.
  Sites with "turnitin" in the name, such as turnitindetector.ai (T-Checker), are third-party
  tools, not Turnitin.
- **What detectors score.** Most measure how predictable each word is from the words before it,
  and how evenly that predictability runs across sentences. Classifiers such as Turnitin and
  Pangram learn the same signal from labelled text. AI text is predictable and even.
- **Plain words read as AI.** Liang et al. (2023) found detectors flagged plain-vocabulary human
  essays as AI, and richer word choice flipped most of them to human. The plain-word
  replacements in §18, §30 and §35 therefore push a score the wrong way.
- **Measured here.** On 23 Oct 2026 a tells-only pass moved an Indonesian essay on T-Checker
  from 46% human / 50% mixed / 4% AI to 41 / 55 / 4. The sentences it highlighted were
  definitions and textbook-style summaries.
- Pangram still flagged every Claude writing style. Expect a better score, never a sure pass.

## What to do, strongest first

1. **Concrete public specifics.** Bryan does not want to add his own sentences (said 23 Oct
   2026), so return text that needs no input from him. Where a paragraph runs on generalities,
   add one specific that a reader can check: a named Indonesian company doing the thing
   described, a regulation, a figure from a source you looked up this session. Verify each one
   first. Never write a personal experience, opinion of his, or detail about his life; the
   essay's existing "menurut saya" stance is enough. Offer `[TAMBAH: ...]` spots for his own
   details only if he asks for them.
2. **The exact word, not the default word.** For each sentence, ask whether the key word is
   the first one any writer would reach for. Where the subject has a precise term, or a less
   common baku word fits the register (*menggerus* for *mengurangi*, *menyedot* for *mengambil*),
   use it. In this mode that overrides the plain-word swaps in §18, §30 and §35. The stock AI
   words in §12 and §35 still go, because they are predictable too.
3. **Uneven rhythm.** Every paragraph gets at least one sentence under 8 words and one over 25.
   Paragraph lengths differ. List items do not all share one length and shape; where the
   format allows, merge two items or turn a short list into prose.
4. **Textbook sentences.** Definitions and theory summaries score as AI whoever writes them.
   Keep the definition short, cite it, and tie it to the case in the same sentence or the next.
5. **Limits.** Keep the register (a makalah stays formal). Never add typos or grammar errors on
   purpose; the dosen notices those before any detector does.

## Before returning

- List the first words of every paragraph and list item: no two in a row alike.
- Each paragraph has one short and one long sentence.
- Every added specific is listed back to Bryan with its source.

## What to tell Bryan

- Once per session: no method guarantees a pass, and if the course bans AI (PTI does),
  passing a detector does not change that rule.
- How to test: the same detector, the whole text, before and after. A gap of about 5 points
  between runs is noise; compare which sentences are highlighted, not only the percentage.
