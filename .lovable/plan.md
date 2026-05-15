# Add 3 Use-Case slides after each Intelligence Layer capability (Week 2)

Add a dedicated "Use Cases" slide after each of the three Intelligence Layer capability slides in the Sales Enablement Week 2 deck. Each new slide pairs **Per Solution** examples (Safety / Content / Training) with **Platform** examples, using the user-supplied copy verbatim.

## Mapping (existing slide → new use-case slide that follows it)

| # | Existing capability slide | Title shown today | New slide that follows |
|---|---|---|---|
| 1 | `se-slide-coanalyst` (`TechV4Slide7CoAnalyst`) | "In-Product · Insights & Intelligence" | **W2 · Intelligence & Insights — Use Cases** |
| 2 | `se-slide-automation` (`TechV4SlideAutomation`) | "The Platform · Automation" | **W2 · Automation — Use Cases** |
| 3 | `se-slide-insights` (`TechV4SlideInsights`) | "The Platform · Recommendations & Prescriptive Actions" | **W2 · Recommendations & Prescriptive Actions — Use Cases** |

(Note: the file names are slightly counter-intuitive — `TechV4SlideInsights.tsx` actually renders the *Recommendations* slide. Going by rendered title, not filename.)

## Slide layout (one shared component, three data variants)

Each new slide renders inside `SalesSlideContainer` with the same two-column structure so the trio feels like a set:

```text
┌──────────────────────────────────────────────────────────────────────┐
│  Title: <Capability> — Use Cases                                     │
│  Subtitle: How this shows up per solution and across the platform    │
├──────────────────────────┬───────────────────────────────────────────┤
│  PER SOLUTION (left)     │  PLATFORM (right)                         │
│  3 stacked cards:        │  3 stacked cards (numbered)               │
│   • Safety (emerald)     │   1. …                                    │
│   • Content (violet)     │   2. …                                    │
│   • Training (amber)     │   3. …                                    │
│                          │                                           │
│  Each card: solution     │  Each card: a single-sentence use case    │
│  badge + 1-3 lines       │  with a short DTOP-cycle annotation       │
│  of use-case copy.       │  where the user provided one              │
└──────────────────────────┴───────────────────────────────────────────┘
```

For the **Automation** slide, the left column collapses to a single muted card stating "Per Solution: not universally available — handled at the platform layer" so the right column can breathe and show all 3 platform automations larger.

Per-solution cards reuse existing module accent colors (Safety = emerald, Content = violet, Training = amber) to match the Core Apps slides. Platform cards use the primary blue accent. No new colors introduced.

## Content (verbatim from the user, lightly tightened only where wording was incomplete)

### 1. Intelligence & Insights — Use Cases
- **Per Solution**
  - Safety — Generate a list of safety reports for a specific aircraft for the lessor, formatted to their spec and sent electronically on schedule.
  - Content — List flight crew who haven't synced their mobile devices in the last 30 days; send to fleet captains for follow-up.
  - Training — List crew with upcoming training renewals at a specific base to schedule classroom training.
- **Platform**
  1. "Show me the correlation between recent safety trends and training deficiencies."
  2. "How are we performing against the recent updates to the Dangerous Goods manual? Has the resulting training reduced incidents?"
  3. "Are we ready for the upcoming Part 145 audit?"

### 2. Automation — Use Cases
- **Per Solution** — *Not universally available; handled at the platform layer.*
- **Platform**
  1. **Trigger Training Updates on Procedure Revision** — When a new procedure revision is published, notify owners of linked training modules and create a review-and-update task in TrainingManager365. *(One step in the DTOP cycle.)*
  2. **Trigger Document Updates on Regulation Amendment** — When a regulation revision is published, draft updated procedures with AI-generated content for document-owner review. *(Another step in the DTOP cycle.)*
  3. **Trigger Risk Control Review on Deteriorating Training Results** — When training evaluations fall below a threshold, trigger a SafetyManager365 risk review for the controls linked to that training module.

### 3. Recommendations & Prescriptive Actions — Use Cases
- **Per Solution**
  - Safety — "What risk controls would you recommend to mitigate unstable approach at location X?"
  - Content — "Based on how users search the OMA, what updates would make search faster and easier?"
  - Training — "What updates would you recommend to our Dangerous Goods training to improve engagement?"
- **Platform**
  1. **"Where should my attention be focused today?"** — surfaces emerging risk patterns and recommended actions.
  2. **"How successful was our Just Culture campaign?"** — measures outcomes vs. intended benefits, identifies improvement patterns, and recommends next actions.
  3. **"If we were audited today, where would attention focus?"** — identifies areas of concern and proposes rectification and preventative action.

## Technical changes

- **New file**: `src/components/sales-enablement-slides/SECapabilityUseCases.tsx` — one shared component that takes `{ capability: "intelligence" | "automation" | "recommendations" }` and renders the right data set. Uses `SalesSlideContainer`, lucide icons (`ShieldCheck`, `FileText`, `GraduationCap`, `Workflow`, `Sparkles`), and existing semantic tokens / module color classes already in use on Core Apps slides.
- **Edit**: `src/pages/SalesEnablement.tsx`
  - Import the new component.
  - Insert three new entries into the slide list with ids `se-slide-coanalyst-usecases`, `se-slide-automation-usecases`, `se-slide-insights-usecases` immediately after their parent capability slides.
  - Append the three new slide titles to the `weekProps.w2.upNext` array so the Week 2 divider preview lists them.
- **Edit**: `src/data/salesEnablementNarration.ts`
  - Add three short coach-script narrations following the project's 5-part teaching format (one per new slide). Each ~120-160 words. They reference the parent capability and frame the use cases as "what to say in discovery".

## Out of scope

- No edits to the three existing capability slides themselves (titles, copy, visuals untouched).
- No new images, no PPTX export, no narration audio re-recording (TTS regenerates on next playback).
- No changes to Week 1 or Week 3 deck order.
- No memory writes — these are content additions, not new conventions.
