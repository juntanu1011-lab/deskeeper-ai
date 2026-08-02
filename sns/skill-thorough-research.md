---
name: thorough-research
description: Use when researching a policy, restriction, or constraint that will inform a real decision (platform rules, legal/age limits, API limits, ToS, pricing tiers, etc.) — especially when the user asks "is that really everything?" or "are you sure?", or when a claim of completeness matters (e.g. "the only impact is X"). Forces enumerating the decision-relevant dimensions up front and verifying each one independently, instead of trusting one broad search.
user-invocable: true
argument-hint: what you're researching and the decision it will inform
---

# Thorough research

Triggered by a real incident: researching TikTok's age restrictions for a minor's marketing account, a search for
"under 16 account default private restrictions teen account settings" surfaced privacy/DM/screen-time limits and missed
a separate, more important restriction — that under-16 creators' posts are ineligible for For You feed recommendation
to non-followers. That's the single restriction that mattered most for a growth account, and it was missed because
the search query was framed around "consumer safety settings," not "does this block the thing we're trying to do."
The same blind spot was then found to plausibly apply to a second platform (X) only when re-checked after the fact,
and a third (Instagram) was checked properly with this method from the start and turned out fine.

## The failure mode this prevents

Running one broadly-worded search, getting a plausible-looking set of results, and answering as if the topic is
covered — without first asking "what are the 4-5 things that would actually matter for the decision at hand, and did
I search for each of them specifically?"

Secondary/consumer-facing sources (parenting blogs, "how to" listicles) cluster around a narrow set of popular topics
(privacy defaults, screen time, DMs) because that's what parents search for. Primary/official sources (a platform's
own creator guidelines, developer docs, community guidelines) contain the business-relevant policies (algorithmic
reach eligibility, monetization gates, API rate limits) but use different terminology and don't surface from a
generic query. If the decision is business/goal-oriented, the search has to be too.

## Method

1. **Before searching, write down what the decision actually depends on.** Not "what restrictions exist" but "what
   specific dimensions, if restricted, would change what we do." For an account meant to drive growth, that's
   reach/discoverability, posting ability, contact/DM, monetization/payment, and content/ban risk — as a starting
   checklist, adapted to the actual goal. Do this enumeration explicitly, in the open, before the first search.

2. **Search each dimension as its own query**, worded around the dimension, not the entity. Not "X age restrictions
   2026" — "X algorithm reach discoverability restriction based on creator age." Not "TikTok teen settings" —
   "TikTok minor creator For You feed eligibility policy." A single broad query is not a substitute for this; it
   reliably surfaces the popular subset, not the complete set.

3. **Prefer the platform's own policy/help/creator pages over aggregator blogs** for anything a decision will lean
   on. If a claim only shows up in secondary sources, say so and treat it as provisional. If the primary source is
   unreachable (paywall, 403, requires auth), say that explicitly rather than letting the secondary-source synthesis
   stand in as settled fact.

4. **State completeness honestly.** Don't say "the only real impact is X" unless dimension-by-dimension coverage
   (step 2) actually happened. If it didn't, say what was checked and what wasn't, e.g. "confirmed no privacy/DM
   issue; have not specifically checked reach/discoverability."

5. **Re-verify on push-back, don't re-assert from memory.** When asked "are you sure / is that really everything?",
   treat it as a signal to run new, differently-worded searches — not to restate the previous answer with more
   confidence. Different phrasing surfaces different sources.

6. **When a gap is found in one entity, immediately re-check sibling entities for the same class of gap.** If
   researching three similar things (three platforms, three vendors, three plans) and a missed dimension turns up in
   one, go back and apply the same specific check to the other two before moving on — don't wait to be asked.

7. **When search-based verification is inconclusive, say so and switch to empirical verification** if available
   (the platform's own analytics/insights, a direct test, a support ticket) rather than continuing to search
   indefinitely or guessing.

## Output shape

When reporting research that will inform a decision, lead with a short checklist of the dimensions considered and
the confidence on each (confirmed via primary source / confirmed via secondary source only / unconfirmed —
recommend verifying via X), not just a narrative summary. This makes gaps visible to the reader instead of hidden
inside prose.
