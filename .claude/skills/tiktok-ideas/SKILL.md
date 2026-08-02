---
name: tiktok-ideas
description: Use when brainstorming a TikTok (or Instagram Reels — same footage) content idea for Deskeeper AI. Either expand a specific seed the user brings ("today I did X, turn it into a video") or, if nothing is given, generate a fresh batch spanning different content pillars. Always reads the project's sns/strategy.md first so ideas stay on-brand instead of generic.
user-invocable: true
argument-hint: optional — a topic, moment, or raw idea to build into a script; leave blank for a fresh batch
---

# TikTok content ideas

A repeatable way to turn either (a) a specific thing that happened, or (b) nothing at all, into a
concrete, shootable short-video idea for `@deskeeper_ai` — without re-deriving the brand/audience/
constraints from scratch each time, and without defaulting to generic "study tips" content that
doesn't differentiate the product.

## Before generating anything

Read `sns/strategy.md` in the current project (if it exists) for the current:
- **Content pillars** (§3) — don't lean on just one pillar repeatedly across a batch
- **Persona policy** (§6) — currently Option D: mascot for dev-log/world-building, faceless
  screen-recording for demo/proof content, no AI-fictional persona. Every idea must specify which
  mode it needs.
- **International-reach rules** (§5) — English-only captions/hashtags/on-screen text, no
  Japan-specific references
- **Minor-related constraints** (§8) — no exact age/school/location if the idea touches on the
  founder being young; no claims implying features the product doesn't have yet
- **Brand principles** (from `lp/design.md` if present) — turn shame into pride, don't fear-monger,
  no fake social proof/stats
- **Current channel reality** (§1/§9) — TikTok is under a For You feed reach gate until age 16
  (content reaches followers/search/hashtags, not cold discovery). Favor ideas that work well via
  search/hashtag/profile-browse and hold up as evergreen, over ideas that only work if the
  algorithm pushes them to strangers. The same clip should double as an Instagram Reel.

If `sns/strategy.md` doesn't exist in this project, ask once for the equivalent context (audience,
pillars, persona rules) rather than inventing brand voice from nothing.

## If a seed is given

Treat the user's input as the anchor, not just a topic label. Expand it into one concrete idea:

1. **Hook (first 1–2 sec)** — the exact line spoken or on-screen. Must earn the next second; state
   a concrete/specific claim or tension, not a generic intro ("hey guys today I...").
2. **Structure** — 3–5 beats from hook to payoff, each with a rough time allocation, inside a
   15–30 sec runtime (product's own output videos are 15 sec; dev-log/talking content can run
   slightly longer but should stay tight).
3. **Which pillar** it maps to, and **which persona mode** (mascot / faceless screen-record) it
   needs per §6.
4. **Caption + hashtags** — English, mixing broad discovery tags (`#buildinpublic`, `#studytok`)
   with niche/specific ones, per §5.
5. **Shoot feasibility** — flag plainly if it depends on something not built yet (e.g. an app
   screen that doesn't exist), rather than quietly assuming it's shootable today.

## If no seed is given

Generate 3–5 ideas as a batch, each in the same shape as above, but deliberately **spread across
different pillars** — don't return five variations on the same angle. Order them by how shootable
they are *today* (nothing blocked first, ideas that need an unfinished asset last, clearly marked).

## Output shape

A numbered list, one idea per entry:

```
N. [Pillar] — one-line concept
   Hook: "..."
   Structure: beat1 (Xs) → beat2 (Xs) → ...
   Persona: mascot / faceless screen-record
   Caption: "..."
   Tags: #..., #...
   Status: shootable now / blocked on <thing>
```

Keep it concrete enough to shoot from directly — a vague "make a video about privacy" is not a
valid output; a hook line and beat structure are required every time.
