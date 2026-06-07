## Problem

In the Academy, lessons 2 (Week 2 · Capabilities) and 3 (Week 3 · Sell & Win) show slides but no narration control bar / no voiceover. Lessons 4–10 (specialist playbooks) work fine. Week 1 has the same underlying bug and is also silent.

## Root cause

`src/pages/academy/ModuleLesson.tsx` decides whether to show the narration bar with:

```ts
const hasNarration = !!PLAYBOOK_NARRATIONS[activeSlideId];
```

`PLAYBOOK_NARRATIONS` (in `src/data/playbookNarrations.ts`) only contains the specialist-playbook slide ids (`dtop-*`, `au-*`, `ir-*`, `mo-*`, `pf-*`, `sig-*`, `rm-*`). The Sales Enablement slide ids used by `m-w1` / `m-w2` / `m-w3` (`se-slide-shift`, `se-week-2-overview`, `se-platform-insights-intelligence`, `se-discovery-to-close`, …) live in a separate registry, `salesEnablementNarrations` in `src/data/salesEnablementNarration.ts`. That registry is consumed by `SalesEnablement.tsx` via `useSalesEnablementNarration` but is never seen by `usePlaybookNarration`, so in the Academy path the bar never renders and no audio is fetched.

## Fix

Bridge the two narration registries behind a single lookup that the Academy already uses, without touching the working specialist playbook pages.

### 1. `src/data/playbookNarrations.ts`
- Import `salesEnablementNarrations` from `./salesEnablementNarration`.
- Extend `PlaybookNarration` to optionally carry `segments` (matches the shape the `elevenlabs-tts` edge function already accepts).
- Update `getPlaybookNarration(slideId)` to:
  1. Return the matching entry from `PLAYBOOK_NARRATIONS` if present.
  2. Otherwise, find a `salesEnablementNarrations` entry with the same `slideId` and return `{ script, voiceId, segments }`.
- Export a small helper, e.g. `hasPlaybookNarration(slideId)`, that uses the same combined lookup.

### 2. `src/hooks/usePlaybookNarration.ts`
- When the narration has `segments`, POST `{ segments }` to `elevenlabs-tts` instead of `{ text, voiceId }` (the edge function already handles both branches and stitches the audio).
- Otherwise keep the current `{ text, voiceId }` request.
- No other behaviour change — caching, play/pause/stop, progress, completion all stay the same.

### 3. `src/pages/academy/ModuleLesson.tsx`
- Replace the direct `PLAYBOOK_NARRATIONS[activeSlideId]` check with `hasPlaybookNarration(activeSlideId)` so Weeks 1–3 slides surface the narration bar.

No database, edge function, or slide-component changes are needed; the edge function already supports the `segments` payload and the slide components don't own narration UI.

## Verification

1. Open `/academy/m-w2` (Lesson 2 · Capabilities) — the glassmorphism narration bar appears, Play streams audio for `se-week-2-overview`, and scrolling to the next slide switches to that slide's script.
2. Same on `/academy/m-w3` (Lesson 3) for `se-discovery-to-close` and `/academy/m-w1` for `se-slide-shift`.
3. Open `/academy/m-dtop` (Lesson 5) and confirm specialist-playbook narration still plays (regression check).
4. Watch the network tab: SE slides hit `functions/v1/elevenlabs-tts` with a `segments` body when the narration entry defines segments, and a `{ text, voiceId }` body otherwise, returning `audio/mpeg`.
