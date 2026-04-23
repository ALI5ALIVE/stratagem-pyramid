

## Sales Enablement Training Deck — "Selling the Operational Performance Platform"

A new **training-first deck** built for the sales team. Purpose: walk a new rep through the platform in plain English, in the order that builds intuition — *what is it → why does it matter → how does it work → how do I sell it*. Reuses existing slides from across the app; zero new content components beyond a few light "trainer" framing slides.

### Who it's for
A new sales rep, SDR, or partner-channel seller in their first week. They've never heard of DTOP, don't know an FOQA from a hard landing, and need to be able to explain the platform on a discovery call by Friday.

### The training arc — 5 modules, 24 slides

The deck is structured as **5 short modules** (think: chapters of a training course), each opening with a "Module" divider that tells the trainee what they're about to learn and ending with a "what you should now be able to say" beat.

```text
MODULE 1 — The market shift (why this exists at all)         3 slides
MODULE 2 — What the platform is, in plain English            5 slides
MODULE 3 — How the 5 layers fit together                     8 slides
MODULE 4 — How we sell it (DTOP + use cases + outcomes)      5 slides
MODULE 5 — Why we win (objections, differentiators, CTA)     3 slides
```

### Slide-by-slide composition

| # | Slide | Component | Notes |
|---|---|---|---|
| **MODULE 1 — The market shift** |||
| 1 | Title — *"Selling the Operational Performance Platform"* | **NEW** `SE Slide0Title` | Trainer-styled title with module map |
| 2 | The strategic shift (industry context) | `TechSlide1StrategicShift` | reuse |
| 3 | The industry challenge in plain terms | `TechSlide2IndustryChallenge` | reuse |
| **MODULE 2 — What the platform is** |||
| 4 | Module 2 divider — *"What you'll learn: the one-sentence pitch"* | **NEW** `SEModuleDivider` | reuse-friendly small wrapper |
| 5 | Plain-English platform definition | `PFSlide2WhatIs` (from `platform-slides`) | reuse |
| 6 | The 5-layer map (the mental model) | `TechSlide4Platform` | reuse |
| 7 | Value unlocked (5 shifts) | `PFSlide9Value` | reuse |
| 8 | "What you should now be able to say" recap | **NEW** `SE RecapSlide` | rep-facing talk track |
| **MODULE 3 — How the 5 layers fit** |||
| 9 | Module 3 divider — *"What you'll learn: each layer in 60 seconds"* | NEW divider | |
| 10 | Layer 1 — Core Apps (table stakes) | `ExecCoreAppsSummary` | reuse |
| 11 | Layer 2 — Operational Data Foundation | `TechSlideDataFoundation` | reuse |
| 12 | Layer 3 — Intelligence (CoAnalyst) | `TechSlide7CoAnalyst` | reuse |
| 13 | Layer 4 — Unified Mobile | `TechSlideMobile` | reuse |
| 14 | Layer 5 — DTOP (system of work) | `TechSlide5DTOP` | reuse |
| 15 | "How to talk about each layer" cheat sheet | **NEW** `SE LayerTalkTrack` | one-line tagline + the *one* question to ask the prospect per layer |
| **MODULE 4 — How we sell it** |||
| 16 | Module 4 divider — *"What you'll learn: the discovery → demo → close motion"* | NEW divider | |
| 17 | Before vs After (the customer story) | `Slide4Transformation` | reuse |
| 18 | Use cases in action | `SlideUseCases` | reuse |
| 19 | Maturity roadmap (where the customer is today → tomorrow) | `Slide5MaturityCurve` | reuse |
| 20 | Customer outcomes (proof points) | `CustomerOutcomesSlide` | reuse |
| **MODULE 5 — Why we win** |||
| 21 | Module 5 divider — *"What you'll learn: how to handle objections + close"* | NEW divider | |
| 22 | Objections cheat sheet (top 5 + how to reframe) | **NEW** `SE Objections` | sourced from `dtopPlaybook.objections` and `coanalyst objection memory` |
| 23 | Why Comply365 — the 3 differentiators | `TechSlideWhyComply` | reuse |
| 24 | Closing / next steps for the rep — *"Your first 7 days"* | **NEW** `SE ClosingForReps` | trainer-style: practice script, recommended demo path, who to shadow |

Total: **24 slides**, ~30-40 min walkthrough.

### What's actually new

Five small, simple slide components in a new folder `src/components/sales-enablement-slides/`:

1. **`SE Slide0Title.tsx`** — Title + module overview (5 chips for the 5 modules).
2. **`SEModuleDivider.tsx`** — Reusable divider taking `moduleNumber`, `title`, `learningGoal`, `estimatedMinutes` props. Used 4× (modules 2-5).
3. **`SE RecapSlide.tsx`** — End-of-module recap: "If a prospect asks X, you say Y." Two-column: question on left, recommended answer on right.
4. **`SE LayerTalkTrack.tsx`** — 5-row cheat sheet, one row per layer: layer name · plain-English description · the *one* discovery question to ask.
5. **`SE Objections.tsx`** — Top 5 objections with a 3-part response pattern (Acknowledge → Reframe → Bridge to demo). Sourced from existing `dtopPlaybook.objections` and CoAnalyst objection memory.
6. **`SE ClosingForReps.tsx`** — "Your first 7 days" plan: 3 demos to watch, 2 calls to shadow, 1 practice scenario, where to find collateral.

### Page + routing

- **NEW** `src/pages/SalesEnablement.tsx` — same scaffold as `ExecutivePitch3.tsx` (scroll-snap container, sidebar nav, keyboard arrows). No narration hook required for v1 — sales enablement is typically read or trainer-led.
- **EDIT** `src/App.tsx` — add route `/sales-enablement`.
- **EDIT** `src/pages/HomePage.tsx` — add a new card in a new section "**Sales Enablement & Training**" (positioned between Pitch Decks and Strategy Decks). Card title: *"Sales Enablement Training"*, badge: *"24 slides · ~35 min"*, icon: `GraduationCap`.

### Why this works for sales enablement (vs a customer pitch)

- **Module structure with learning goals** — a rep knows exactly what they should walk away knowing after each section. Pitches don't do this; training decks do.
- **Recap + cheat sheet slides** between content blocks — trainee leaves with talk tracks, not just slides they saw.
- **Plain-English ordering** — "what is it" *before* "how it works" *before* "how to sell it." Pitches often invert this for drama; training cannot.
- **Objection handling and "your first 7 days" close** — turns the deck into something a rep actually uses in week 1, not a one-time presentation.
- **Reuses customer-facing visuals** — when the rep does their first demo, the slides they're presenting are slides they were *trained on*, not ones they saw for the first time.

### Files touched

**NEW**
- `src/pages/SalesEnablement.tsx`
- `src/components/sales-enablement-slides/SE Slide0Title.tsx`
- `src/components/sales-enablement-slides/SEModuleDivider.tsx`
- `src/components/sales-enablement-slides/SE RecapSlide.tsx`
- `src/components/sales-enablement-slides/SE LayerTalkTrack.tsx`
- `src/components/sales-enablement-slides/SE Objections.tsx`
- `src/components/sales-enablement-slides/SE ClosingForReps.tsx`

**EDITED**
- `src/App.tsx` — add route.
- `src/pages/HomePage.tsx` — add new "Sales Enablement & Training" section + card.

### Not touched

- All existing pitch decks, slide components, narration, PPTX exporters.
- All playbook data files — purely consumed.

### Out of scope

- Narration / audio for the training deck (can be added later if requested).
- A PPTX export for the training deck.
- A quiz / knowledge-check feature at the end of each module (can be a follow-up).
- Editing existing customer-facing slides to be "training-friendly" — they're left intact.

### QA

- Open `/sales-enablement`, scroll all 24 slides, confirm 5 module dividers appear in the right places.
- Confirm each reused customer slide still renders correctly at 1260px viewport.
- Confirm Home Page lists the new card under a new "Sales Enablement & Training" section, with a `GraduationCap` icon and "24 slides · ~35 min" badge.
- Sidebar slide navigator lists 24 entries in the order above.

