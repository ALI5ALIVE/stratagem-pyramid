## Goal
Simplify the narration for **"Sell the Whole Vision — One Whiteboard"** so a rep can follow it without re-reading. The slide already does the heavy lifting: 4 numbered beats + a close line. The script should mirror that 1:1 — not invent a parallel essay.

## Problem with the current script
- ~600 words, one paragraph, no structure a rep can latch onto.
- Repeats the "standalone / together" frame 5 times — reads as theory, not a play.
- Mentions layers (Unified Mobile as its own layer, "every layer a deal on its own") that don't match the 4 beats actually drawn on the whiteboard (Core Apps → Insights & Intelligence → Recommendations → Automation + Unified Mobile).
- Buries the close line and the transition.

## New structure (still 5-part Coach Script Standard, just tighter)
Rewrite the `script` field for `se-w3-whole-vision-whiteboard` into ~250 words with this shape:

1. **Hook (1 sentence)** — fresh opener, not "Why this slide matters". E.g. *"One marker. Ninety seconds. Bottom-up. That's the whole drill."*
2. **Core message (1 sentence, verbatim)** — *"Every layer is a deal on its own. Stacked, they're the only loop that closes itself."*
3. **The four moves** — read the 4 beats from the slide in order, one short sentence of framing each, pointing the rep at the on-screen "Say-it" quote rather than rewriting it:
   - Beat 1 — Core Apps (foundation, Detect)
   - Beat 2 — Insights & Intelligence (Detect → Trigger, the ~90 vs ~35 line)
   - Beat 3 — Recommendations & Prescriptive Actions (closes Trigger)
   - Beat 4 — Automation + Unified Mobile (Orchestrate & Prove, loop closes)
4. **The walk** — one sentence: after the four, trace the Madrid unstable approach trend up through all four boxes in one breath.
5. **Close + guardrails + transition** — the on-slide close line verbatim, the approved-terminology reminder in one clause, then the existing transition into the Recap slide.

## Out of scope
- No changes to the slide component (`SEW3WholeVisionWhiteboard.tsx`), the beats, the whiteboard SVG, or the subtitle.
- No changes to neighbouring slides' narrations or the transition wording into/out of this slide beyond what's needed to keep the handoff to the Recap slide intact.
- No voice-settings changes.

## Files to touch
- `src/data/salesEnablementNarration.ts` — replace the `script` string for `se-w3-whole-vision-whiteboard` only.
