## Goal

Rework the Remotion keynote video at `/keynote/silos-to-signals` so the message centers on operational time, cost and outcomes rather than AI accuracy.

## Changes

### 1. Act 1 — Opening slide (`remotion/src/scenes/Act1_Pain.tsx`)
- Strengthen the red "signal" dot pulse so it reads clearly as a heartbeat: increase the base glow, widen the scale range (e.g. 0.7 → 1.4), and keep a steady on-beat rhythm. No layout change.

### 2. Act 2 — "The silo era" (`remotion/src/scenes/Act2_Challenge.tsx`)
- Keep the first two stats (`~65%` signals never make it home, `$25–35B` exposure).
- Replace the third stat (currently `~35%` generic AI accuracy) with an operational pain stat about reactive operations. New stat:
  - Value: `5–7 days`
  - Label: `average time to resolve a cross-silo operational signal — reacting to events, not controlling the operation`
- Optionally also reframe the headline supporting copy to keep the architecture-vs-tooling beat, but no layout changes.

### 3. Act 5 — "Operation finally in concert" (`remotion/src/scenes/Act5_Value.tsx`)
- Remove the entire accuracy comparator block (counter 35→90, the two bars, "Domain accuracy at L4–5", "Operational intelligence vs generic AI").
- Replace with a 3-up outcomes panel showing the benefits of the new operating model:
  1. **Time** — `–70%` · time-to-resolve cross-silo signals
  2. **Cost** — `–30%` · operational coordination cost
  3. **Outcomes** — `+3x` · proactive interventions before incident
- Keep the existing "Frontline / Flight deck / Control room / Rail platform" row above unchanged.
- Use existing DTOP color tokens (detect blue / trigger amber / orchestrate violet / prove emerald) for the three metric cards.

### 4. Voiceover script (`remotion/scripts/generate-audio.mjs`)
Update the `ACTS` array so the narration matches the new on-screen content:
- **act2** — Replace the "generic A I … thirty-five percent" sentence with: `Today, a single cross-silo signal takes five to seven days to resolve, pulling people from every team — the operation is reacting to events, not controlling them.`
- **act5** — Replace the accuracy sentence with: `Time-to-resolve drops by around seventy percent. Coordination cost falls by a third. And teams act on three times more signals before they become incidents. Not a faster silo. A different operation.`
- Note for the user: audio MP3s under `remotion/public/audio/vo/` will need to be re-rendered via the existing `generate-audio.mjs` script (requires `ELEVENLABS_API_KEY`) for the spoken track to match the new visuals. The video visuals will update immediately; the old MP3s will play until regenerated.

## Out of scope
- No changes to Act 3, Act 4, Act 6, music bed, durations, or composition timing.
- No changes outside the `remotion/` folder.