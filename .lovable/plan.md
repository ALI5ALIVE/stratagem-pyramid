## Goal

Make the Practice Center "Prompts for this slide" panel **persona-aware** — each of the 5 buyers (CEO/COO, VP Safety, VP Ops, Training Director, CIO) gets their own opener, talking points, and buyer questions for every content slide, so reps practise the right pitch for the right room.

## Approach

Restructure the prompts data from one shared map to a **persona × slide** map, with a sensible fallback so nothing breaks if a combination is missing.

### 1. Refactor `src/data/practiceSlidePrompts.ts`

New shape:

```ts
export interface SlidePrompts {
  opener: string;
  talkingPoints: string[];   // 2–3 items
  buyerQuestions: string[];  // 2–3 items
}

// First key = personaId from practiceScenarios.ts, second key = slide.id
export const practiceSlidePrompts: Record<string, Record<string, SlidePrompts>> = {
  "ceo-coo":           { /* 14 content slides */ },
  "vp-safety":         { /* 14 content slides */ },
  "vp-ops":            { /* 14 content slides */ },
  "training-director": { /* 14 content slides */ },
  "cio-it":            { /* 14 content slides */ },
};

// Generic fallback used if a persona/slide pair is somehow missing
export const defaultSlidePrompts: Record<string, SlidePrompts> = { /* current map */ };

export const getSlidePrompts = (
  personaId: string | undefined,
  slideId: string,
): SlidePrompts | undefined => {
  if (personaId && practiceSlidePrompts[personaId]?.[slideId]) {
    return practiceSlidePrompts[personaId][slideId];
  }
  return defaultSlidePrompts[slideId];
};
```

### 2. Persona lenses driving the content

Each persona's prompts must reflect their actual lens (already defined in `practiceScenarios.ts` and `personaProfiles.ts`):

| Persona | Lens emphasis |
|---|---|
| **CEO / COO** | Revenue protection, competitive moat, board-ready ROI, named references, total cost story |
| **VP Safety** | SMS maturity (L2→L4), hazard intelligence, audit readiness, ICAO taxonomy, ~90% vs ~35% accuracy |
| **VP Ops** | OTP, disruption prevention, OCC integration, crew workflow, no rip-and-replace |
| **Training Director** | Closed-loop safety→training, competency vs completion, mobile adoption, evidence of effectiveness |
| **CIO / IT** | Integration sprawl, SSO/SAML, tenant isolation, open APIs, predictable TCO, phased POC |

For every one of the **14 content slides** in `execPitch3Slides.ts` (skipping the 5 transition/divider slides) each persona gets:
- One persona-tuned **opener line** that lands the slide in their language
- 2–3 **talking points** that emphasise what *this* persona buys on
- 2–3 **buyer questions** the rep can ask to make *this* persona reveal pain

Examples to anchor tone:

`exec3-slide-coanalyst` for **VP Safety**:
- opener: "Your safety team is the one that has to trust the answer this thing gives — so let me show you why ours is built differently from generic AI."
- talking points:
  - "Tuned on ICAO taxonomy, ASR, MOR — not Reddit and Wikipedia."
  - "~90% accuracy at L4–5 reasoning vs ~35% generic — measured on the same prompts."
  - "Every answer cites the source report — your investigators can audit the chain."
- buyer questions:
  - "Has anyone on your safety team tried a generic AI on a real ASR? What happened?"
  - "What would have to be true for your investigators to trust an AI-generated narrative?"
  - "Where in your SMS would a 90%-accurate answer engine save the most hours?"

`exec3-slide-coanalyst` for **CIO / IT**:
- opener: "I want to spend a minute on how this is architected, because the difference from generic AI is mostly an integration and isolation story."
- talking points:
  - "Tenant-isolated — your operational data never trains a shared model."
  - "Domain tuning sits in your tenant; SSO/SAML and role-based access from day one."
  - "Auditable prompt and response trail — every answer traceable end to end."
  - buyer questions:
    - "What does your AI governance policy require before you can point a model at operational data?"
    - "Who in your team currently owns the line between 'AI assistant' and 'autonomous action'?"
    - "Would a tenant-isolated deployment satisfy your data-residency constraints?"

### 3. Update `src/pages/PracticeCenter.tsx`

- Change the import call: `getSlidePrompts(scenario.personaId, slide.id)` instead of `getSlidePrompts(slide.id)`
- Add a small persona chip next to the panel header so the rep sees *whose* prompts are loaded:
  ```
  Prompts for this slide · The Platform · for CEO / COO
  ```
- The collapsible UI, copy buttons, and transition-slide handling stay exactly as they are.

### 4. Out of scope

- No DB / backend / edge-function changes.
- No changes to `practiceScenarios.ts`, `personaProfiles.ts`, agent prompt builder, or scoring.
- No new shortcuts or layout shifts.
- No prompts for `isTransition` divider slides — they continue to show the existing "Section divider — no prompts" hint.

## Verification

- Switch buyer card → re-open the prompts panel → opener and questions reflect the new persona's lens.
- Cycle through every slide as each of the 5 personas → all 5 × 14 combinations render with no fallbacks visible (spot-check a few per persona).
- Copy buttons still work.
- Transition slides still show the divider hint.
- No regressions to the live AI-buyer flow (Start / Next / End / Score).
