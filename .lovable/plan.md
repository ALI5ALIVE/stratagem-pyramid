

# Microsites Feedback — Action Plan

Based on KG's feedback document, here are the identified changes organized by theme.

---

## Feedback Summary

### 1. Trust Bar Stats — All Title Slides
**Current**: "50+ Airlines Worldwide", "20+ Years in Aviation", "300K+ Operational Users"
**Requested**: "550+ Airlines Worldwide", "6 Continents", "Global Team of Aviation & AI Experts"

### 2. Platform Title — Exec + Ops + Tech
**Current**: "The Application Platform" (Ops + Tech slides)
**Requested**: "The Operational Performance Platform"

### 3. Remove "Near-Term Use Cases" Slide (Ops Deck)
**Feedback**: "We cannot back it up." The 2026 Roadmap slide is a better/safer option. Remove `OpsSlide6NearTermUseCases` from the Operational Pitch deck. Keep the 2026 Roadmap.

### 4. Tech Deck — Content Manager & Training Manager Slides: Replace CoAnalyst with CoAuthor/CoTrainer
**Feedback**: On the longer (Technical) version, the ContentManager365 and TrainingManager365 deep-dive slides should focus on **CoAuthor** and **CoTrainer** respectively, not CoAnalyst.

- **ContentManager365 (`TechSlide4bContentManager.tsx`)**: Replace "How CoAnalyst Activates Content Data" with **"How CoAuthor Transforms Content Management"** — focusing on AI-powered authoring, regulatory change analysis, smart insights, and proposed revisions.
- **TrainingManager365 (`TechSlide4cTrainingManager.tsx`)**: Replace "How CoAnalyst Activates Training Data" with **"How CoTrainer Elevates Instruction"** — focusing on automated grading, debrief transcription, personalized coaching cues, and feedback enhancement.

### 5. Include Interactive Calculator in All Deck Versions
**Feedback**: The Line of Sight calculator should be included/linked in each version of the microsite. Reduce the number of use case examples to 2 or 3. Keep: Flight Delays & OTP, Insurance Premium Escalation, Go-Around Events.

### 6. Weave in "Operational Performance — In Context" Slide
**Feedback**: The "Messaging in Context" slide (slide 13/15 from Master Strategy) that defines Operational Performance across Safety, Content, and Training domains works well. Consider weaving it into the pitch decks.

### 7. Roadmap H1 2026 — Remove "Hard Landing" Reference
**Current** (`TechSlide15Roadmap2026.tsx` line 10): "Hard landing retraining pipeline"
**Should be**: Updated to match the Dangerous Goods use case or a generic "DTOP pipeline for priority use case"

---

## Proposed Code Changes

### Files to Modify

| # | Change | File(s) |
|---|--------|---------|
| 1 | Trust bar: 550+ Airlines, 6 Continents, Global Aviation & AI Team | `ExecSlide0Title.tsx`, `ExecSlide6WhyUs.tsx`, `TechSlide0Title.tsx`, `OpsSlide10WhyUs.tsx` |
| 2 | "The Application Platform" → "The Operational Performance Platform" | `OpsSlide4Platform.tsx`, `TechSlide4Platform.tsx` |
| 3 | Remove Near-Term Use Cases slide from Ops deck | `OperationalPitch.tsx` (remove from slides array + import) |
| 4a | Content Manager slide: CoAnalyst → CoAuthor | `TechSlide4bContentManager.tsx` |
| 4b | Training Manager slide: CoAnalyst → CoTrainer | `TechSlide4cTrainingManager.tsx` |
| 5 | Add calculator link/CTA to Exec and Ops decks (already in ExecSlide5Value; add to OpsSlide9Outcomes or similar) | `OpsSlide9Outcomes.tsx` |
| 6 | Roadmap: "Hard landing retraining pipeline" → "DG incident reduction pipeline" | `TechSlide15Roadmap2026.tsx` |

### Detail

**Change 1 — Trust Bar** (4 files)
Replace trust stats across all title/footer slides:
- `{ value: "550+", label: "Airlines Worldwide" }`
- `{ value: "6", label: "Continents" }` (use Globe icon)
- `{ value: "Global", label: "Aviation & AI Experts" }` (use Users icon)

**Change 2 — Platform Title** (2 files)
- `OpsSlide4Platform.tsx` line 56: `title="The Operational Performance Platform"`
- `TechSlide4Platform.tsx` line 15: `title="The Operational Performance Platform"`

**Change 3 — Remove Near-Term Use Cases** (1 file)
- `OperationalPitch.tsx`: Remove the `OpsSlide6NearTermUseCases` entry from the slides array and its import. This drops the slide from the Ops deck navigation and rendering.

**Change 4a — ContentManager365 → CoAuthor focus** (`TechSlide4bContentManager.tsx`)
- Replace the right-column "How CoAnalyst Activates Content Data" section with **"CoAuthor — AI-Powered Content Intelligence"**
- Update the 4-step data flow to CoAuthor capabilities:
  1. "Regulatory Analysis" / "Analyzes regulatory changes and identifies impacted manual sections"
  2. "Smart Revisions" / "Proposes revised language, ready to merge and route for approval"
  3. "Impact Cascades" / "Identifies all downstream impacts across manuals and SOPs"
  4. "Audit-Ready Output" / "Policies and procedures become clearer, safer, and always audit-ready"

**Change 4b — TrainingManager365 → CoTrainer focus** (`TechSlide4cTrainingManager.tsx`)
- Replace the right-column "How CoAnalyst Activates Training Data" section with **"CoTrainer — Intelligence Before Instruction"**
- Update the 4-step data flow to CoTrainer capabilities:
  1. "Debrief Transcription" / "Transcribes every debrief, generates summaries, coaching cues, and improvement areas"
  2. "Automated Grading" / "Accelerates grading and generates rich, actionable trainee feedback"
  3. "Feedback Enhancement" / "Analyzes instructor feedback to improve clarity, tone, and constructiveness"
  4. "Personalised Training" / "Prior performance data personalises each session for improved crew readiness"

**Change 5 — Calculator CTA** (`OpsSlide9Outcomes.tsx`)
- Add a link/CTA to the Interactive Calculator (`/line-of-sight`) at the bottom of the Outcomes slide, mirroring the pattern already used in `ExecSlide5Value.tsx`.

**Change 6 — Roadmap hard landing reference** (`TechSlide15Roadmap2026.tsx`)
- Line 10: Change "Hard landing retraining pipeline" → "DG incident reduction pipeline"

---

## What This Does NOT Change
- The "Messaging in Context" slide already exists in the Master Strategy deck. Weaving it into pitch decks is noted but deferred as it requires adding a new slide component to the Exec/Ops/Tech registries — recommend as a follow-up.
- The calculator use case reduction (to 3 examples) applies to the Line of Sight data model and is a separate scope item.
- The Exec deck title "The Operational Performance Platform" is already correct (line 46 of ExecSlide0Title.tsx).

**~10 files modified. No routing changes except removing one slide from the Ops deck.**

