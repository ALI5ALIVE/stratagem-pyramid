## Problem

The `se-w3-whole-vision-whiteboard` narration is ~470 words — roughly 3 minutes at the current voice speed (1.0). Target is **under 90 seconds**, which means ~180–200 words max.

## Fix

Rewrite the `script` field for `se-w3-whole-vision-whiteboard` in `src/data/salesEnablementNarration.ts` to ~180 words, keeping the same shape but cutting hard:

1. **Hook (1 line)** — "One marker. Ninety seconds. Bottom-up."
2. **Core line verbatim (1 line)** — "Every layer is a deal on its own. Stacked, they're the only loop that closes itself."
3. **Four beats (1 short sentence each, ~10 words)** — name the layer + the DTOP step, drop the supporting prose; reps read the on-slide say-it lines themselves.
   - Core Apps → Detect.
   - Insights + Intelligence → Trigger. Keep the 90 vs 35 number, one phrase only.
   - Recommendations → closes Trigger.
   - Automation + Unified Mobile → Orchestrate + Prove.
4. **The walk (1 line)** — Madrid unstable approach, Detect day one through Prove day five, one breath.
5. **Close verbatim + transition (1 line each)** — "One foundation, one intelligence, one loop." then one-sentence handoff to Recap.

Drop: the "pain you're addressing" paragraph, the explicit guardrails paragraph (terminology and accuracy headline are baked into the four beats), and the "what buyers ask next" preamble in the transition.

No changes to the slide component, beats on screen, voice settings, or any other narration.

## File touched

- `src/data/salesEnablementNarration.ts` — `script` field of the `se-w3-whole-vision-whiteboard` entry only.
