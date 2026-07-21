## Problem

All three downloaded pitch scripts (Short, Medium, Long) come out with no narration under each slide heading.

## Root cause (confirmed)

`src/lib/pitchScriptDocx.ts` looks up narrations with:

```ts
const execNarr = (id) => executivePitchNarrations.find(n => n.slideId === id)?.script;
```

But the Medium and Long decks use `exec3-slide-*` / `exec3-divider-*` IDs, and those scripts live in a *separate* array `exec3PitchNarrations` inside the same file (`src/data/executivePitchNarration.ts`). `execNarr` never searches that array, so every Medium/Long slide falls through to "(No narration script recorded)", and because the totals filter drops empty scripts, the doc renders as bare headings.

Short deck (`exec-slide-*`) mostly resolves, except `exec-slide-6b` (Customer Outcomes) which has no narration entry at all.

## Fix

1. In `src/lib/pitchScriptDocx.ts`, import both `executivePitchNarrations` and `exec3PitchNarrations` (plus keep the exec2 fallback) and change `execNarr` to search all three in order:
   - `executivePitchNarrations` → `exec3PitchNarrations` → `executivePitch2Narrations`.
2. Leave the Short deck's `exec-slide-6b` gap as-is for now (it will still render the "no narration" note); flag it in the reply so we can add copy separately if you want.
3. Verify by running the build and, if needed, a quick Node script that calls the lookup for each Medium/Long slide id to confirm scripts resolve before we hand it back.

No UI or route changes — this is a one-file logic fix.
