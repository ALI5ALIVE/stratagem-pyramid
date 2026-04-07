

# Add Narration Scripts to Executive Pitch 2

## Problem
The Executive Pitch 2 deck has empty narration scripts, and the page incorrectly imports `useExecPitchNarration` (which reads Exec Pitch 1 data). Need to write compelling sales storytelling scripts and wire them up correctly.

## Changes

### 1. `src/data/executivePitch2Narration.ts` — Write all 11 narration scripts

Conversational, world-class sales storytelling tone. Not reading slides verbatim — delivering key messages with conviction and flow. Each script ~20–40 seconds of speech.

| Slide | Key Message |
|-------|-------------|
| **0 — Title** | Hook: "What if every signal your operation generates actually reached the right person, at the right time, before the next event?" Sets up the 4-minute journey. |
| **1 — Before** | Paint the pain: three siloed systems, data locked in separate tools, safety teams emailing spreadsheets while ops flies blind. The cost isn't theoretical — it's hiding in every go-around, every grounding, every audit scramble. |
| **2 — The After** | The connected picture: same three domains, now sharing one data model. A safety signal detected Tuesday triggers a procedure update Wednesday and crew retraining Thursday. That's not a vision — that's what a connected platform delivers today. |
| **3 — DTOP Operating Model** | Introduce Detect, Trigger, Orchestrate, Prove as the rhythm of operational performance. Not a framework on paper — a living loop that runs continuously across safety, content, and training. |
| **4 — The Platform** | Three applications, one platform: SafetyManager365 detects, ContentManager365 orchestrates, TrainingManager365 ensures readiness. CoAnalyst connects them all — turning 65,000 monthly data points into decisions. |
| **5 — Use Cases in Action** | Walk through real scenarios: smoke and fumes cluster resolved in 48 hours, hydraulic switch confusion eliminated before an incident, pilot retraining targeted to specific airports. These aren't hypotheticals. |
| **6 — The Transformation** | The shift from reactive cost centre to strategic performance engine. Time moves from firefighting to prevention. The cultural shift is as important as the technical one. |
| **7 — Performance Ladder** | Five stages from fragmented to predictive. Most carriers are at stage one or two. The ladder shows what's possible — and each rung delivers measurable value before you climb to the next. |
| **8 — Intelligence Journey** | AI that's purpose-built for aviation, not generic. Over 90% accuracy vs 35% from general-purpose tools. The difference between intelligence that drives action and noise that wastes your safety team's time. |
| **9 — Maturity Roadmap** | A phased journey — not a cliff edge. Start with quick wins in safety reporting, build toward predictive operations. Each phase proves value before committing to the next. |
| **10 — Customer Outcomes** | Anchor on what matters: schedule protection, revenue protection, cost savings, regulatory confidence. Every signal connects to an outcome your board cares about. Close with CTA for discovery session. |

### 2. `src/hooks/useExecPitch2Narration.ts` — New hook (copy of useExecPitchNarration)
- Identical to `useExecPitchNarration` but imports `getExecPitch2Narration` from the pitch 2 data file

### 3. `src/pages/ExecutivePitch2.tsx` — Wire up the new hook
- Change import from `useExecPitchNarration` to `useExecPitch2Narration`
- Update the hook call accordingly

**1 new file, 2 modified files.**

