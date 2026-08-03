---
name: instagram-ideas
description: Use when brainstorming an Instagram (Reels, feed, or Stories) content idea for Deskeeper's @deskeeper_ai account. Either expand a specific seed the user brings ("today I did X, turn it into a post") or, if nothing is given, generate a fresh batch spanning different content pillars and formats. Always reads the project's sns/strategy.md first, including the account's current public/private status.
user-invocable: true
argument-hint: optional — a topic, moment, or raw idea to build into a post; leave blank for a fresh batch
---

# Instagram content ideas

A repeatable way to turn either (a) a specific thing that happened, or (b) nothing at all, into a
concrete, postable Instagram idea for `@deskeeper_ai` — Reels first (same footage as TikTok), but
also feed posts/carousels and Stories where those fit better.

## Before generating anything

Read `sns/strategy.md` in the current project (if it exists) for the current:
- **Instagram's role** (§1) — currently the primary near-term acquisition channel (Reels), unlike
  TikTok which is reach-gated until age 16. Ideas here should feel free to aim for real
  non-follower discovery via Explore, not just bank content for later.
- **Account status** (§9) — the private-account unlock (Family Center approval) was completed
  2026-08-02, so Reels-for-discovery ideas are no longer blocked on it. Still check §9 for the
  current state (e.g. bio link pending LP) rather than assuming.
- **Content pillars** (§3) — pull from all of them over a batch, not just one repeatedly
- **Persona policy** (§6) — Option D: mascot for dev-log/world-building, faceless screen-recording
  for demo/proof content, no AI-fictional persona. Specify which mode each idea needs.
- **International-reach rules** (§5) — English only, captions/hashtags aimed at the study-with-me /
  studytok audience
- **Voice/persona** (§1/§2) — the account is presented as a person: pseudonym **Santo**, a 14yo
  solo dev building in public. Captions are written first-person as Santo, not brand-speak.
- **Minor-related constraints** (§8) — age (14) is deliberately public in the bio and fine to use
  as a hook; **school/grade/location/real name/face stay off-limits**
- **Brand principles** (from `lp/design.md` if present) — no fake stats/social proof, turn shame
  into pride rather than fear-mongering

If `sns/strategy.md` doesn't exist in this project, ask once for the equivalent context (audience,
pillars, current account status) rather than inventing brand voice from nothing.

## If a seed is given

Treat the user's input as the anchor — expand it into one concrete idea:

1. **Format call**: Reel (video), feed post/carousel (image-first), or Story (ephemeral,
   behind-the-scenes/casual). Reels is the default for anything meant to reach non-followers;
   Stories suits raw/low-effort updates to the existing circle.
2. **If Reel**: hook (first 1–2 sec, spoken or on-screen text), beat structure to a 15–30 sec
   payoff, persona mode per §6.
   **If feed/carousel**: what each slide shows, in order.
   **If Story**: the single beat/moment, and whether it uses an interactive sticker (poll,
   question, quiz) to invite engagement despite low follower count.
3. **Which pillar** it maps to (§3).
4. **Caption** — first line is what shows before "more" truncates it, so it must work standalone.
5. **Hashtags** — a handful of specific/relevant ones over a large generic block.
6. **Status**: postable now / blocked on <thing, e.g. an unbuilt app screen or missing asset>.

## If no seed is given

Generate 3–5 ideas as a batch, mixing formats (not all Reels) and spread across different pillars.
Order by how ready-to-post they are today, with anything blocked (private account, missing asset)
clearly marked last.

## Output shape

A numbered list, one idea per entry:

```
N. [Pillar] — one-line concept
   Format: Reel / feed-carousel / Story
   Hook/Structure (if Reel): ...
   Slides (if carousel): ...
   Persona: mascot / faceless screen-record / n/a
   Caption: "..."
   Tags: #..., #...
   Status: postable now / blocked on <thing>
```

A vague "post something about privacy" is not a valid output — always produce the actual draft.
