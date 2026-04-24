## Goal

Give the **Sales Enablement Academy** deck (`/sales-enablement`, 31 slides across 6 modules) a complete set of sales-coach voice-over scripts. Unlike the customer-facing decks, these narrations teach the rep **how to think, message, and counter pain with value** — they're internal training, not customer-delivered.

## What "Sales-Coach Training Voice-Over" Means Here

Every slide gets a script in a 5-part format (one tighter step than customer decks because this is *teaching*, not *delivering*):

1. **Why this slide matters** — what concept the rep needs to internalise.
2. **The core message** — the one-sentence version they should be able to repeat back.
3. **The pain → value pivot** — the specific customer pain this slide addresses and the value lever to pull against it.
4. **How to deliver it** — tone, pacing, what to point at on the slide, what *not* to say.
5. **Transition / what's next** — bridge into the next slide so modules feel connected.

Module dividers (M2–M6) get a slightly different "coach intro" script: learning goal, why this module exists, and how it connects to the previous one.

All scripts respect locked memory rules (terminology, BrandNumber naming, DTOP color story, ~90% vs ~35% accuracy headline, locked roadmap dates, no FOQA/FDM/ASAP).

## Deliverables

### 1. New narration data file
**`src/data/salesEnablementNarration.ts`** — one entry per slide ID, all 31 slides:
- M1 (3): `se-slide-0`, `se-slide-shift`, `se-slide-challenge`
- M2 (4): `se-module-2`, `se-slide-whatis`, `se-slide-value`, `se-slide-recap-m2`
- M3 (10): `se-module-3`, `se-slide-4a/4b/4c`, `se-slide-coanalyst`, `se-slide-insights`, `se-slide-automation`, `se-slide-tiers-vs-ai`, `se-slide-mobile`, `se-slide-dtop`, `se-slide-talktrack`
- M4 (3): `se-module-4`, `se-slide-transform`, `se-slide-maturity`
- M5 (7): `se-module-5`, `se-slide-usecases`, `se-slide-safety-uc`, `se-slide-ops-uc`, `se-slide-financial-uc`, `se-slide-regmgmt`, `se-slide-outcomes`
- M6 (4): `se-module-6`, `se-slide-objections`, `se-slide-why`, `se-slide-closing`

Plus a `getSalesEnablementNarration(slideId)` helper.

### 2. Wire Speaker Notes panel into the deck
**`src/pages/SalesEnablement.tsx`** — add the existing `SpeakerNotesPanel` (already built and used on the four customer decks), wired to `getSalesEnablementNarration` and the current slide index. No new component needed.

### 3. Wire TTS audio playback
The `SESlide*` components already accept `SlideNarrationProps` (isPlaying, onPlay, etc.) but the page currently doesn't pass them. Add a lightweight `useSalesEnablementNarration` hook (clone of the existing `useOpsPitchNarration` hook) that:
- Calls the existing `elevenlabs-tts` edge function (no backend changes).
- Looks up the script for the active slide ID.
- Returns `{ isPlaying, isLoading, progress, hasCompleted, onPlay, onPause }` to pass into each slide.

### 4. No backend / migration / secret changes
Reuses existing `supabase/functions/elevenlabs-tts` and the already-configured `ELEVENLABS_API_KEY`.

## Out of Scope

- The four customer decks (already done in the previous pass).
- The CEO Overview deck (`/pitch-executive-2`) — explicit user instruction.
- The capability playbook pages (Insights, Automation, Mobile, DTOP, Platform, RegMgmt) — those are reference pages, not training decks.
- Quiz / Module / Certificate pages under `/academy` — those are interactive flows, not slide decks.

## Memory Updates

Add one new memory:
- `mem://content/sales-enablement/coach-script-standard` — defines the 5-part *coach* script format and rules so future drift is prevented.

## Acceptance Criteria

- All 31 Sales Enablement Academy slides have a coach voice-over script available in both the Speaker Notes panel and the audio play bar.
- Each script teaches the rep the concept, the pain → value pivot, and how to deliver it.
- All scripts comply with terminology, branding, accuracy and roadmap memory rules.
- Speaker Notes panel collapses cleanly, doesn't overlap navigation, and is hidden in print exports.
- No changes to other decks, playbooks, or academy quiz/lesson pages.

## Files Touched

- **New**: `src/data/salesEnablementNarration.ts`, `src/hooks/useSalesEnablementNarration.ts`, `mem://content/sales-enablement/coach-script-standard`.
- **Modified**: `src/pages/SalesEnablement.tsx` (add hook + Speaker Notes panel + pass narration props into each slide).
- **Memory index**: `mem://index.md` (add reference to the new memory).
