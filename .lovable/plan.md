# Practice Center — Buyer agent realism + ROI gating

## Problem

Two issues observed on the skeptical CEO/COO scenario:

1. **The buyer defaults to ROI on every slide.** The skeptical persona prompt + `keyMessages` ("Measurable ROI within 12 months") + `PERSONA_LENS` ("revenue protection… so what for the P&L") + `PERSONA_SLIDE_FLAVOR.ceo-coo` ("board-level value, revenue impact") all push the agent toward money questions regardless of what's on screen. The result: even on slide 1 (Strategic Shift) the buyer asks about payback.
2. **The agent feels scripted.** It always ends with a question, asks one objection per turn at the same cadence, never reacts emotionally, never references its own world (yesterday's incident, recent reg change, fleet size), and stacks 2–3 asks in one breath. It also ignores the rep's energy.

Plus a small runtime bug discovered while reading the slide-change effect: `(debounce as any)._silenceTimer = silenceTimer` crashes because `setTimeout` returns a `number`. Fix it with a `useRef`.

## Goal

- Until the rep reaches **slide 2 — Customer Outcomes** (`exec3-slide-outcomes`), the buyer must **not** ask about ROI, payback, business case, dollars, total cost, pricing, or "tangible benefits." On those early slides, questions stay anchored to the topic of the slide (problem framing, platform shape, DTOP if shown later).
- From `exec3-slide-outcomes` onward, ROI/proof/business-case questions are **unlocked** and expected when the slide warrants them.
- Make the buyer feel closer to a real exec: varied cadence, occasional silence, short reactions, references their own world, single thread per turn, allowed to concede points, only sometimes ends with a question.

## Scope (frontend only, no backend)

- `src/lib/practice/buildAgentPrompt.ts` — add a slide-aware ROI gate to `HOUSE_RULES`, add a "REALISM RULES" block, soften persona pushbacks so they're not all money-flavored, and change `PERSONA_SLIDE_FLAVOR.ceo-coo` so it does not say "revenue impact" by default.
- `src/pages/PracticeCenter.tsx` —
  - Send the **slide id**, **slide index**, and an explicit **ROI unlocked: yes/no** flag in every `sendContext` call (both the initial slide-change note and the silence-ask note).
  - Replace the broken `(debounce as any)._silenceTimer` stash with a `useRef<number | null>` so the runtime errors stop.
- `src/data/execPitch3Slides.ts` — add a small `unlocksROI: true` marker on the Customer Outcomes slide so the page logic doesn't hard-code an id.

No changes to: scoring edge function, `useRoleplaySession`, scenarios list, voices, narration data, or slide components.

## Behaviour rules added to the agent prompt

A new block appended to `HOUSE_RULES`:

```text
SLIDE-AWARE TOPIC GATE
- Every system note tells you the slide id, slide index and whether ROI is unlocked.
- Until ROI is explicitly unlocked, you MUST NOT ask about ROI, payback period,
  business case, total cost, price, licensing, "tangible benefits", or the board case.
  If those topics are on your mind, hold them. The rep gets to that slide.
- Until ROI is unlocked, anchor every question to the topic of the current slide:
  the problem on slide 1, customer outcomes on slide 2, the platform on slide 3,
  DTOP on slide 5, mobile, intelligence, regulation, roadmap.
- Once ROI is unlocked, you may probe proof, named references, payback, and
  the commercial path — but still anchored to the slide on screen.

REALISM RULES (act like a real executive, not a chatbot)
- Vary your cadence. Sometimes a one-word reaction ("hmm", "okay", "go on")
  instead of a question. Sometimes a short statement instead of a question.
  Only ~60% of your turns should end with a question.
- One thread per turn. Never stack two or three questions in a single reply.
- Use your own world. Reference yesterday's incident, last week's audit, your
  fleet size, a recent reg change — the kind of texture a real buyer brings.
- React to the rep's energy. If they sound rushed, slow them down. If they
  oversell, get drier. If they land a strong point, you may concede ("fair
  point") — you are not obliged to push back on everything.
- Speak naturally for voice. Contractions, half-sentences, the occasional
  trailing thought are fine. Avoid bullet-point speech and corporate jargon
  dumps.
- Stay in your persona's lens, but apply it through the slide on screen,
  not through ROI by default.
```

The CEO/COO persona block also gets a softened slide flavor:

```text
PERSONA_SLIDE_FLAVOR.ceo-coo:
"Frame your question around the strategic shift, the operating model, or
competitive separation — not ROI — until the rep reaches the Customer
Outcomes slide."
```

`difficultyDirective("skeptical")` updated so "push back on numbers" only fires once ROI is unlocked.

## Page-side wiring

In `PracticeCenter.tsx`:

1. Add `const silenceTimerRef = useRef<number | null>(null);` and use it in place of the broken `(debounce as any)._silenceTimer` stash. Clear it on debounce, on slide change, on disconnect, and on unmount.
2. Compute `roiUnlocked = execPitch3Slides.slice(0, currentSlide + 1).some(s => (s as any).unlocksROI)` and append it to both context messages:

```text
Context for the buyer (do not read aloud):
- slide_id: exec3-slide-1
- slide_index: 1 of 18
- slide_label: "Strategic Shift"
- focus: the operational gap between data volume and decision speed
- roi_unlocked: NO  ← do not ask about ROI, payback, business case, price
```

and the silence-ask note appends:

```text
Ask ONE short buyer-style question that probes THIS slide's topic.
roi_unlocked: NO — do not ask about ROI, payback or business case. Stay
on the slide topic.
```

When `roiUnlocked === true` the same message switches to:

```text
roi_unlocked: YES — proof, named references and payback are now fair game,
but anchor your question to the slide on screen.
```

3. The `unlocksROI: true` marker is added to `exec3-slide-outcomes` only. Slide 1 (Strategic Shift) and the title remain locked.

## Verification

- Cold start the CEO/COO skeptical scenario. On slides 0 and 1, sit silent past the 8s timer; the buyer's question must be about the strategic shift / operational gap, not money. Repeat on the platform slide before reaching outcomes.
- Advance to Customer Outcomes; sit silent; the buyer should now feel free to ask "who specifically — and what was the payback?" or similar.
- Skip dividers fast — no buyer prompt fires, no console errors.
- Confirm the runtime error `Cannot create property '_silenceTimer' on number` is gone after navigating across several slides.
- Spot-check the VP Ops and CIO scenarios on slide 1 to confirm they also stay off ROI early (ops should ask about disruption / OCC; CIO about integration / identity).

## Out of scope

- No new scenarios, no new voices, no scoring changes.
- No edits to `useRoleplaySession`, edge functions, or knowledge base.
- No rework of slide order or content.
