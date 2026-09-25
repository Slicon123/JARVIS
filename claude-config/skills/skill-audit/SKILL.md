---
name: skill-audit
description: Audit one of Bryan's Claude Code skills or slash commands and trim it to what its job actually needs. Cuts lines that cost context without changing behaviour, fixes what is broken or stale, and adds only what real requests would miss. Use when Bryan asks to audit, review, check, clean up, slim down, or improve a skill or command, or says "audit skill", "cek skill", "rapikan skill", "skill ini kepanjangan", "bikin skill lebih efisien".
---

# Skill audit

A skill costs context twice. Its description sits in every session, whether it fires or not.
Its body loads every time it fires. An audit makes both earn their place, measured against
one question for every line: **would Claude act differently on Bryan's real requests without
it?** If not, it goes. If a real request would go wrong, something is missing.

## Scope

Bryan's own skills and commands: `~/.claude/skills/*/` and `~/.claude/commands/*.md`, which
are junctions into `claude-config/` in the JARVIS repo, plus any project `.claude/skills/`.

Not `skills/synced/` or `anthropic-skills:*`. Those are Anthropic's, overwritten on every
sync, so an edit there is lost. If he names one, say that in one line.

No skill named: list his skills with their description sizes and ask which, in one line.

## 1. Measure

```bash
python ~/.claude/skills/skill-audit/scripts/measure.py <skill-dir | command.md>
```

It prints the frontmatter, the context cost (description every session, body per invoke,
and the total always-on bill across his skills), files nothing references, references to
files that don't exist, over-limit fields, Windows paths, and dated lines. Every `!` is a
lead to confirm, not a verdict: a `<song>` placeholder in a description trips the XML check
but is harmless in Claude Code.

## 2. Pin down the job

Before judging any line, write one sentence for yourself: what Bryan uses this for, and what
a good result looks like. Sources, in order: the description, the body's opening, memory
files that mention it, and `git log --oneline -- claude-config/<path>`, whose messages often
say why a rule was added.

A rule that came from a real failure stays. Wording like "measured", "real failure", or a
commit that fixed a specific incident marks these. Ask Bryan only if the job is still unclear
after that, as one question.

## 3. Read it as the skill's user

Pick two real requests: a typical one and an edge case, from memory files or what he has
asked before. Read the whole skill once as Claude would when handling each, step by step.
Note where it would stall, guess, contradict itself, or do something he doesn't want.

## 4. What to check

**Trigger (the description, paid every session)**

- Says what it does *and* when, in the words Bryan actually types, in both his languages.
- No overlap with another skill's triggers: compare the siblings from step 1 and the skill
  list in the system prompt. Overlap means the wrong one fires.
- A catalogue of features belongs in the body. The description needs triggers.
- Only ever typed as `/name`? `disable-model-invocation: true` removes the description from
  context entirely.

**Body (paid every invoke)**

Cut:
- What Claude already knows: how git works, what a PDF is, generic writing advice.
- A rule said twice. A motivation paragraph longer than the rule. The skill's own history,
  which git already records.
- Branches for situations Bryan never hits.
- "You could use A or B" with no default.

Keep:
- Bryan's preferences and conventions.
- Measured facts and gotchas from real failures. The site table in `chords` is the model.
- Exact commands, formats, limits, budgets, stop conditions.
- A short *why*, when it lets Claude handle cases the rule doesn't name.

**Structure**

- Over 500 lines, or a large section only some requests need: move it to a reference file
  linked straight from SKILL.md with a "read X when Y" line. One level deep, never a file
  that links to another file.
- Deterministic work repeated every run (parsing, counting, converting): a script. Only its
  output costs tokens.
- Workflow first, reference tables after.

**Correctness**

- Every file, script, tool, and path it names exists. Deferred tools (WebSearch, WebFetch)
  are loaded via ToolSearch first. Scripts actually run; dependencies are stated.
- A dated fact the skill leans on, more than about three months old: look it up again.
- Nothing contradicts CLAUDE.md, the JARVIS output style, or feedback memories such as
  plain language and mirroring his language.
- `claude-config/` is a public repo: no credentials, ID numbers, or client material.

**Gaps**, only where one of the step 3 requests would actually hit them: no output format,
no budget or stop point for open-ended searching, no failure path (what to say when it
can't), no rule for Indonesian requests.

## 5. Report

In Bryan's language, plain words. First line is the verdict with numbers:

```
chords: body ~1.360 tok, description ~76 tok. Bisa jadi ~950 tok. 1 bug.
```

Then the findings, most valuable first, at most ten:

```
[Fix]  L14       Nyebut scripts/fetch.py, filenya gak ada.
[Cut]  L40-52    Penjelasan cara kerja WebFetch. Claude udah tahu.        -180 tok
[Move] L200-420  Tabel referensi docx -> docx.md, dibaca kalau perlu aja.  -5.500 tok per invoke
[Add]  -         Gak ada aturan kalau search kosong.
[Keep] L45-56    Tabel situs: hasil ukur, jangan dipotong.
```

`Keep` only for something he might expect to be cut. Token figures are chars / 4, rounded.
A skill that is already lean gets a short report that says so. Never pad the list to look
thorough.

Then ask whether to apply. If he already asked for a fix ("rapikan", "perbaiki", "bikin
efisien"), skip the question and apply.

## 6. Apply

1. Edit in place. Keep his voice and structure; touch only what a finding names.
2. Rerun `measure.py` and report before and after.
3. Walk the two step 3 requests through the new version. Nothing that worked may break.
4. If the description changed, check three phrases that should fire it and one that
   shouldn't against the new text and its siblings.
5. Offer to commit and push. Other devices only get the change after a push.
