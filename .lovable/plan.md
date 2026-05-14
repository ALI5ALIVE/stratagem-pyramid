## Goal
Show buyer-specific coaching prompts on the **opening Title slide** (`exec3-slide-0`) of the executive pitch in the Practice Center. Today the Title is treated as a transition slide, so the "Prompts for this slide" panel is hidden — even though the prompt data already exists per persona.

## Changes

### 1. `src/pages/PracticeCenter.tsx`
- In the prompt-panel render (around line 405), stop suppressing prompts for the Title slide. Treat a slide as "no prompts" only when it is a transition **and** has no entry in `practiceSlidePrompts`. Effectively: if `slidePrompts` exists, render the panel (opener + talking points + buyer questions); otherwise show the existing "section divider — no prompts" hint.
- Update the panel header subtitle so the opener shows guidance like "Use this to set the room before slide 1." (small copy tweak only).
- No changes to the AI-buyer notification logic (Title still stays silent for the buyer agent — only the rep-facing coaching panel changes).

### 2. `src/data/practiceSlidePrompts.ts`
- Audit the existing `exec3-slide-0` entries for each of the five personas (CEO/COO, VP Safety, VP Ops, Training Director, CIO/IT) and rewrite them so each is a true **opening-slide** prompt set tailored to that buyer:
  - **opener**: a one-line room-setter the rep can say out loud to frame the meeting for that persona (e.g. CEO/COO → portfolio bet and operating leverage; VP Safety → SMS maturity and audit posture; VP Ops → OTP, disruption recovery and crew clicks; Training Director → competency, currency, regulator-ready evidence; CIO/IT → tenant isolation, SSO, integration surface).
  - **talkingPoints**: 2–3 framing points that set up the deck for that persona (what we'll prove, in what order, and what "good" looks like for them).
  - **buyerQuestions**: 2–3 likely opening questions from that persona so the rep can rehearse the first exchange (e.g. CIO/IT: "Before we go further, where does our data live and who can see it?").
- Keep the `getSlidePrompts(personaId, slideId)` signature and CEO/COO fallback unchanged.

## Out of scope
- No changes to `practiceScenarios.ts`, persona profiles, the ElevenLabs agent prompt builder, or scoring.
- No changes to divider slides (`exec3-divider-*`) — they keep the "no prompts" hint.
- No backend, DB, or edge-function changes.

## Verification
- Open Practice Center, pick each of the 5 buyer cards, land on the Title slide: the prompts panel renders with persona-tailored opener, talking points, and buyer questions; copy buttons work.
- Advance to a divider slide (e.g. `▸ DTOP`): panel still shows the "section divider — no prompts" hint.
- Advance to a normal content slide: existing per-persona prompts still render unchanged.