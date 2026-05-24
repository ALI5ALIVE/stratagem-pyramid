## Goal
Rejig the keynote so the 2-minute hero film opens the talk — the audience sees the film first, then the CEO walks on. Reorder both the on-page acts and the script so the film is Act 01.

## New 7-act order

```
01  The film              (was 05)  — 2 min   cinematic
02  Cold open             (was 01)  — 2 min   build       CEO walks on after the film fades
03  The silo era          (was 02)  — 4.5 min high
04  What the research told us (was 03) — 6 min  high
05  Naming the new game   (was 04)  — 5 min   peak
06  The intelligence layer (was 06) — 10 min  peak
07  The call to arms      (was 07)  — 5 min   resolve
```

Total stays 35 min. Timecodes recompute from the new order (Act 01 = 0:00–2:00, Act 02 = 2:00–4:00, etc.).

## Script changes (`src/data/silosToSignalsScript.ts`)

- Reorder the `silosToSignalsScript` array so `film` is first and `cold-open` is second.
- Rewrite **Act 01 (film)** stage direction + paragraphs to fit the new opener role: house lights down, no introduction, film rolls cold. Script becomes the director's note for the film — the CEO is not speaking yet. Cue: "Film ends on black card → hold 3 sec → spotlight up on CEO."
- Rewrite **Act 02 (cold-open)** opening paragraph so it follows the film instead of opening the talk. New first line lands directly off the black card (e.g. "That film is not aspirational. Every signal you just saw is already moving through your operation tonight — most of them invisible."). Keep the rest of the cold-open beats intact.
- Light edits to **Act 03 (silo-era)** opening sentence so it follows the cold-open naturally rather than the film.
- All other acts unchanged in content; only their `actId` order in the array changes.

## Page changes (`src/pages/keynote/SilosToSignalsKeynote.tsx`)

- Reorder the `acts` array to match the new sequence above. Renumber the `number` field (`"01"`–`"07"`) and recompute each act's `start` / `end` minutes so they're contiguous from 0 to 35.
- Update Act 01 (film) `intent`, `onStage`, `onScreen`, and `beats` to reflect "opener, not midpoint pivot":
  - intent: "Open cold. Let the room feel the category before a single word is spoken."
  - onStage: "House lights down as doors close. No introduction, no walk-on. 120 seconds of film, then the CEO appears in a single spotlight."
  - onScreen: unchanged film description.
  - First beat becomes `0:00 – 0:10 · House lights down, film rolls cold — no host intro.`
- Update Act 02 (cold-open) `onStage` so the CEO walks on *after* the film fades, not in silence from the start.
- Move the embedded `<video>` block out of the Act-05 `ActSection` and render it inside the new Act 01 (film) section. The block stays visually identical (aspect-video player + download button), just attached to the new first act.
- Update the hero copy:
  - Tagline becomes: "Open with the film. Then seven acts and one ask of the room."
  - Add a second hero CTA "Watch the film" that anchors to `#film` alongside the existing "Read full script" and "Print / save as PDF" buttons.
- Update the master-message section's surrounding prose to reference "the film opens the room" rather than "every act ladders to one sentence" (one-sentence tweak).
- `EnergyBar` automatically reflows from the reordered `acts` array — no separate change needed beyond confirming the film bar still gets its "2 min" pill (logic already keyed on `act.id === "film"`).

## Out of scope
- No Remotion / VO / audio changes.
- No new routes, no backend changes.
- No restructuring of `ScriptBlock`, downloads grid, or print CSS.

## Files touched
- **Edit** `src/data/silosToSignalsScript.ts` — reorder + rewrite Act 01 (film) and Act 02 (cold-open) opening; tweak Act 03 first line.
- **Edit** `src/pages/keynote/SilosToSignalsKeynote.tsx` — reorder `acts`, renumber, recompute timecodes, move video block to film act, refresh hero copy + add "Watch the film" CTA.
