
## Why

The keynote slides were retuned (50–100K range, ~40% with 90-day-closure definition, $25–35B scoped as controllable-cost envelope, 90% vs 35% reframed with guardrail caption, n=21 interviews, "What we're not claiming" appendix). The rendered video (`public/keynote/silos-to-signals.mp4`) still shows the old, unscoped numbers — most visibly in Act 2 — and never carries the methodology guardrails. A customer or investor who watches the video and then reads the deck will see a mismatch.

## What's currently on screen vs. what the deck now says

| Where | Video says | Deck now says |
|---|---|---|
| Act 2 stat 1 | `~65%` "operational signals never make it home" | "~40% of operational reports without documented closure within 90 days" |
| Act 2 stat 2 | `$25–35B` "annual industry exposure" | Same headline, but scoped as "addressable controllable-cost envelope, industry-wide" |
| Act 2 stat 3 | `5–7 days` "average time to resolve a cross-silo signal" | Demoted in deck to "2–4 weeks typical signal-to-decision, Comply365 baselines (composite, anonymised)" |
| Act 5 outcomes | `–70% time`, `–30% cost`, `3× interventions` | Deck frames outcomes as modelled, with a methodology caveat |
| Anywhere | No accuracy claim shown | Deck headline: ~90% vs ~35% with "recommendation accuracy on a defined operational decision set, benchmarked against a human-expert panel" |
| Anywhere | No "what we're not claiming" beat | Deck has appendix block |

## Changes

### 1. `remotion/src/scenes/Act2_Challenge.tsx`
Replace the `STATS` array:
- `~40%` — "operational reports without documented closure within 90 days" — source caption "IATA SMS 2023 · FSF 2023 · Comply365 baselines"
- `$25–35B` — "addressable controllable-cost envelope, industry-wide" — caption "modelled bottom-up from per-operator baselines"
- `2–4 wks` — "typical signal-to-decision time" — caption "Comply365 customer baselines (composite, anonymised)"

Add a small caption row under each stat using existing `BODY` font at 13px, `COLORS.typeDim` at 60% opacity. Reuse current entrance timing.

### 2. `remotion/src/scenes/Act4_Insight.tsx`
Add a single guardrail line at the bottom of the Intelligence Layer beat (after the DTOP rail), shown ~frame 600–880:
> "Recommendation accuracy on a defined operational decision set at L4–L5, benchmarked against a human-expert panel. Methodology published."

Render in `BODY` 14px, `COLORS.typeDim`, max-width 980, centered. Fades in with the existing outO curve.

### 3. `remotion/src/scenes/Act5_Value.tsx`
Keep the three outcome tiles, but add a 14px caption under the row: "Modelled, not measured. Held lightly enough to revise." Same fade timing as the tiles' final stagger.

### 4. `remotion/src/scenes/Act6_Resolve.tsx`
Add a one-line super at the bottom before the Comply365 lockup: "Research base: 21 executive interviews across 5 countries and 3 industries." Plain `BODY` 13px, `typeDim`.

### 5. Re-render
- `cd remotion && node scripts/render-remotion.mjs`
- Output `public/keynote/silos-to-signals.mp4` (overwrite in place — same filename so the page just picks it up)
- Spot-check frames at the Act 2 stat reveal (~frame 220, 360, 500), the Act 4 guardrail (~frame 750), the Act 5 caption (~frame 380), and the Act 6 super (~frame 200 of that scene) via `bunx remotion still`

## What does NOT change

- Scene structure, durations, transitions, motion system, color tokens, fonts
- DTOP framework, Tuesday-morning cold open, master message, hero film concept
- Audio / narration track (none in current render)
- The deck — already updated in the prior turn
- No new sources cited; only the captions that were already added to the deck

## Open question

The video currently has no narration. The deck's 90/35 reframing is a spoken beat in the script. Do you want the video to:
- (a) carry only the on-screen guardrail caption proposed in step 2, or
- (b) add a full title card before the DTOP rail that reads "~90% vs ~35% · recommendation accuracy on a defined decision set · methodology published"?

Recommend (a) — keeps the video's pacing intact and lets the deck do the heavy framing.
