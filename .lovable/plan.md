

# Microsites Feedback — March 2026 (KG + CK Edits)

Full review of the uploaded PDF against the current codebase. Below is every actionable item, grouped by scope.

---

## A. General Changes (All Three Decks)

### 1. Product Name Spacing
**Feedback**: Remove spaces — use ContentManager365, SafetyManager365, TrainingManager365 (no spaces).
**Current state**: Mixed. Some files use "Safety Manager365" with a space, others don't.
**Files affected**: `ExecSlide3Platform.tsx`, `OpsSlide4Platform.tsx`, `TechSlide4Platform.tsx`, `TechSlide4aSafetyManager.tsx`, `TechSlide4bContentManager.tsx`, `TechSlide4cTrainingManager.tsx`, and any slide referencing module names.

### 2. Update Product Descriptions
**Feedback**: Use these exact descriptions:
- **SafetyManager365**: "Advanced Safety, Quality, and Risk Management solution for utmost audit readiness and highest standards of compliance"
- **ContentManager365**: "Next Gen Operational Content Management solution for authoring, publishing, distributing, and viewing enterprise-wide operational content."
- **TrainingManager365**: "Higher-quality training with less effort, optimized schedules, readiness through automated qualification tracking, and continuous improvement."

**Files affected**: Module description text in `ExecSlide3Platform.tsx`, `OpsSlide4Platform.tsx` (Slide 4), `TechSlide4Platform.tsx` module cards.

### 3. Intelligence Layer Naming
**Feedback**: Change "CoAnalyst — Intelligence Layer" to "The Intelligence Layer — CoAnalyst — CoAuthor — CoTrainer"
**Files affected**: `ExecSlide3Platform.tsx` (line 57), `OpsSlide4Platform.tsx`, `TechSlide4Platform.tsx`, `ExecSlide4Intelligence.tsx`.

### 4. Intelligence Layer Description
**Feedback**: Use this wording: "Embedding intelligence across the platform to move from reactive compliance to predictive insights, from managing documents and processes to anticipating issues before they escalate. Empowering better decision-making, strengthened operational resilience, and enhanced safety at scale."
**Files affected**: Intelligence layer card description in platform slides.

### 5. "Why Comply365" Slide — All Decks
**Feedback**: Update three differentiator sections:
- **Connected Foundation**: "Operational content, training, safety and compliance – unified in one connected platform that detects operational signals across all, triggers the right response automatically, driving performance and predictive insights for safer outcomes."
- **Embedded Intelligence**: "Accelerated decisioning and organizational agility with industry specific AI innovation across our platform – CoAnalyst, CoAuthor and CoTrainer – so that airlines can operate smarter, faster, and safer."
- **Superior Performance** (replaces "Proof by Default"): "A connected, intelligent ecosystem that means fewer disruptions, protected revenue & schedules, lower operating costs, and higher trust – when operational performance becomes a growth enabler, not just a compliance function."

**Files affected**: `ExecSlide6WhyUs.tsx`, `OpsSlide10WhyUs.tsx`, `TechSlide17WhyUs.tsx`.

### 6. Add CTA to "Why Comply365"
**Feedback**: "Learn more about the Comply365 Operational Performance Platform for your organization – Book a workshop today"
**Files affected**: Same WhyUs slides.

### 7. Add Team Expertise Block
**Feedback**: Add somewhere at the end: "AI-First, Market-Leading Team, Extensive Industry Expertise — A world-class team at the forefront of fusing technology and the latest AI innovation with our deep aviation industry expertise..."
**Files affected**: WhyUs slides or final slides in each deck.

### 8. Trust Bar Stats — Tech Deck
**Current (TechSlide17WhyUs)**: Still shows old stats: "50+ Airlines", "7/10 Top NA Carriers", "300K+ Users"
**Should be**: "550+ Airlines", "6 Continents", "Global Experts" (already correct in Exec and Ops)
**File**: `TechSlide17WhyUs.tsx` (lines 13-17).

### 9. Font Sizing
**Feedback**: "Font sizing is quite small in places – lets increase where we can"
**Action**: Audit the smallest text (10px/9px classes) across slides and bump where practical. This is a general pass — will target the most egregious cases.

---

## B. Executive Deck Changes

### 10. Slide Order — Platform Before DTOP
**Feedback**: "Slide 4 on The Platform to come before Slide 3 on the DTOP Operating Model"
**Current**: Already correct in `ExecutivePitch.tsx` — DTOP is slide 3, Platform is slide 4. The feedback wants Platform first, DTOP second.
**Fix**: Swap indices 3 and 4 in the `slides` array:
```
{ id: "exec-slide-3", label: "The Platform", component: ExecSlide3Platform },
{ id: "exec-slide-4", label: "The New Operating Model", component: ExecSlide4DTOP },
```
**File**: `ExecutivePitch.tsx` (lines 19-20).

---

## C. Operational Deck Changes

### 11. Add Platform Slide After Slide 3
**Feedback**: After Before & After (Slide 3), add a Platform slide using the Exec deck's platform layout with title "The Comply365 Operational Performance Platform".
**Current**: Ops deck goes: Before & After → DTOP + Platform (combined). The existing `OpsSlide4Platform` already exists but is the DTOP slide.
**Action**: Insert the Exec-style platform slide (reuse `ExecSlide3Platform` component or create a thin wrapper) into the Ops deck between Slide 3 (Before & After) and Slide 4 (DTOP). Update title to "The Comply365 Operational Performance Platform".
**File**: `OperationalPitch.tsx` — add import and insert into slides array.

### 12. Journey Slide Title & Content Update
**Feedback**: Rename "The Journey" to "The Customer Journey – A Phased Platform Value Realization Roadmap" and rewrite phase content:
- **Phase 1**: "Platform Foundations to Unlock Future Value" with new bullet content (unified UX, API-first, safety reporting in CM365, AI investment, platform PoCs)
- **Phase 2**: "Connected Intelligence & Workflow Orchestration" (end-to-end workflows, cross-domain visibility, automation, CoAnalyst as intelligence layer)
- **Phase 3**: "Fully Connected & Intelligent Operations" (predictive risk, automated improvement, closed-loop system)

**File**: `OpsSlide7SteppingStones.tsx` — update `phases` array and slide title/subtitle.

---

## D. Technical Deck Changes

### 13. Title Update — "The Operational Performance Platform"
**Feedback**: Change "The Application Platform" to "The Operational Performance Platform"
**Current**: `TechSlide4Platform.tsx` uses title "The Operational Performance Platform" — already correct.
**Action**: Verify subtitle matches: "Three connected applications, one intelligence layer, one operational performance platform". Update if needed.

### 14. Roadmap Slide — Reference Live Integration Use Cases
**Feedback**: Reference production and upcoming use cases:
- **In Prod**: Regulation Database Integration with ContentManager365; ContentManager365 to TrainingManager365 Integration
- **Coming Next**: Safety Report Submissions within ContentManager365; UI Unification across all solutions; Platform PoCs

**File**: `TechSlide15Roadmap2026.tsx` — update H1 items to reference actual production integrations.

### 15. CoAnalyst vs Generic AI — Add "So What" & Level Definitions
**Feedback (from both KG and CK)**: 
- Define what Level 1, 2, 3 etc. mean (it's taxonomy depth but audience won't know)
- Add a "so what" — what goes wrong when generic AI summarizes aviation data without aviation training? Needs a concrete example.

**Files affected**: `TechSlide9VsGenericAI.tsx`, `TechSlide8IntelligenceTiers.tsx`, `CASlide8VsGenericAI.tsx` — add level definitions (e.g., "Level 1 = Occurrence Type, Level 2 = Event Category, Level 3 = Specific Event...") and a risk example (e.g., "Generic AI classifies a repeated bird strike as a one-off wildlife event — missing the cluster pattern that signals a runway hazard trend").

---

## E. Deferred / Discussion Items

- **"What This Means for Customers" slide from Strategy Deck**: KG suggests bringing this into each pitch deck and linking to the ROI calculator. This would require creating a new shared slide component — recommend as a follow-up.
- **"Strategic Shift" and "Before & After" from original Strategy Deck**: KG notes these are better than current versions. Would need side-by-side comparison to decide — recommend reviewing in next iteration.
- **Brand colour alignment**: Requires design system review with brand palette. Noted for future pass.
- **Integration use case slides (Ops & Tech decks)**: KG wants a dedicated slide for the two live integrations (CM365→TM365, Reg DB→CM365). This is a new slide component — recommend as a follow-up task.

---

## Summary of File Changes

| File | Changes |
|------|---------|
| `ExecSlide3Platform.tsx` | Remove name spacing, update descriptions, rename intelligence layer |
| `ExecSlide4Intelligence.tsx` | Update intelligence layer naming |
| `ExecSlide6WhyUs.tsx` | Rewrite 3 differentiators, add CTA, add team expertise block |
| `ExecutivePitch.tsx` | Swap Platform/DTOP slide order |
| `OpsSlide4Platform.tsx` | Remove name spacing, update descriptions, rename intelligence layer |
| `OpsSlide7SteppingStones.tsx` | Rewrite title, phase names, and all phase content |
| `OpsSlide10WhyUs.tsx` | Rewrite 3 differentiators, add CTA, add team expertise block |
| `OperationalPitch.tsx` | Insert platform intro slide after Before & After |
| `TechSlide4Platform.tsx` | Remove name spacing, update descriptions, rename intelligence layer |
| `TechSlide9VsGenericAI.tsx` | Add level definitions, add "so what" example |
| `TechSlide8IntelligenceTiers.tsx` | Add level definitions, add "so what" example |
| `TechSlide15Roadmap2026.tsx` | Reference live integration use cases |
| `TechSlide17WhyUs.tsx` | Fix trust stats, rewrite differentiators, add CTA + team block |
| `CASlide8VsGenericAI.tsx` | Add level definitions, add "so what" example |

**~14 files modified. No routing changes. No new components needed (platform slide reused from Exec).**

