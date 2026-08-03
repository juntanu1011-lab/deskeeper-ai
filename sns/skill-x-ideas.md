---
name: x-ideas
description: Use when brainstorming an X (Twitter) post for Deskeeper's @deskeeper_ai account. Either expand a specific seed the user brings ("today I did X, turn it into a post") or, if nothing is given, generate a fresh batch spanning different content pillars. Always reads the project's sns/strategy.md first so posts stay on-brand and match X's role as the build-in-public hub.
user-invocable: true
argument-hint: optional — a topic, moment, or raw idea to build into a post/thread; leave blank for a fresh batch
---

# X (Twitter) post ideas

A repeatable way to turn either (a) a specific thing that happened, or (b) nothing at all, into a
concrete, postable tweet or thread for `@deskeeper_ai` — text-first, not a video-content skill.

## Before generating anything

Read `sns/strategy.md` in the current project (if it exists) for the current:
- **X's role** (§1) — the build-in-public hub: dev-log, decisions, metrics, daily cadence. This is
  the account's primary job, more than pure growth-hacking.
- **Content pillars** (§3) — pull from all of them over a batch, not just dev-log every time
- **International-reach rules** (§5) — English only; initial replies/quote-tweets matter more than
  follower count for a new account; schedule for the target audience's active hours if the post
  will be scheduled
- **Voice/persona** (§1/§2) — the account is presented as a person: pseudonym **Santo**, display
  name "Santo — building Deskeeper". Posts are written first-person as Santo, not brand-speak.
- **Minor-related constraints** (§8) — decided 2026-08-02: the age IS the hook — `14yo solo dev`
  leads the bio, and posts may lean on it; **school/grade/location/real name/face stay off-limits**
- **Brand principles** (from `lp/design.md` if present) — no fake stats/social proof, honest about
  what's built vs. not-yet-built, turn shame into pride rather than fear-mongering
- **Current reach reality** (§8/§9 if present) — X's algorithmic reach for this account may be
  unconfirmed/still building a following base. Favor ideas that are genuinely worth replying to or
  quote-tweeting (a concrete number, a real mistake, a clear opinion) over ideas that only work if
  the algorithm pushes them — reply-worthy content is the thing actually in the user's control
  right now.

If `sns/strategy.md` doesn't exist in this project, ask once for the equivalent context (audience,
pillars, current account stage) rather than inventing brand voice from nothing.

## If a seed is given

Treat the user's input as the anchor — expand it into one concrete post:

1. **Format call**: single tweet (fits ≤280 chars) or thread (2+ tweets). Don't default to a
   thread just because more could be said — only thread if the idea genuinely needs the beats.
2. **Draft text**, tweet by tweet if a thread, each within the character limit.
3. **Which pillar** it maps to (§3).
4. **Why someone would reply/quote it** — name the actual hook (a specific number, a contrarian
   take, a relatable mistake, a direct question) rather than assuming visibility alone will work.
5. **Optional media note** — flag if a screenshot/image would meaningfully help and what it should
   show, without requiring one.

## If no seed is given

Generate 3–5 ideas as a batch, each in the same shape as above, spread across different pillars —
not five variations on the same angle. Order by how ready-to-post they are today (nothing blocked
first; ideas needing something not built yet, last and clearly marked).

## Output shape

A numbered list, one idea per entry:

```
N. [Pillar] — one-line concept
   Format: single tweet / thread (n tweets)
   Text: "..." (or tweet 1/2/3... if a thread)
   Reply-hook: why this earns a reply/quote, specifically
   Media: none / suggested screenshot of X
   Status: postable now / blocked on <thing>
```

A vague "post about progress" is not a valid output — always produce the actual draft text.
