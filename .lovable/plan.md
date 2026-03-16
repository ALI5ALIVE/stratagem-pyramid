

# CoAnalyst Positioning Playbook Deck

## Overview

Build a new `/coanalyst` route containing a 15-slide positioning and messaging playbook for CoAnalyst as a standalone aviation data intelligence product. Follows the exact same architecture as the Content Strategy deck.

## Scope

This is a large build: **1 page component, 1 title slide, 14 content slides, sidebar + routing updates**. All slides use the existing `SlideContainer` component and `SlideNarrationProps` pattern.

## File Structure

```text
src/
  pages/
    CoAnalystDeck.tsx              # Page shell (clone of ContentStrategyPage)
  components/
    coanalyst-slides/
      CASlide0Title.tsx            # Title + contents grid
      CASlide1ExecutiveSummary.tsx  # Category, positioning, value, why now
      CASlide2CategoryNarrative.tsx # Market problem, reactive→proactive shift
      CASlide3StrategicNarrative.tsx# Bold category-creation story
      CASlide4ProductPositioning.tsx# Category, audience, problem, proof points
      CASlide5MessagingArchitecture.tsx # Master message + 5 pillars
      CASlide6HowItWorks.tsx       # 5-step pipeline visual
      CASlide7BusinessOutcomes.tsx  # Outcome cards with metrics
      CASlide8VsGenericAI.tsx       # Comparison table + build vs buy
      CASlide9PersonaMessaging.tsx  # 5 persona cards with tailored messaging
      CASlide10ObjectionHandling.tsx# Objection/response pairs
      CASlide11Taglines.tsx         # Taglines, headlines, elevator pitches
      CASlide12WebsiteMessaging.tsx # Hero, value prop, CTA copy
      CASlide13VisualNarrative.tsx  # 8 visual concept cards
      CASlide14DeckStructure.tsx    # Recommended slide flow + final positioning
```

## Routing & Navigation Changes

- **`src/App.tsx`**: Add route `/coanalyst` → `CoAnalystDeck`
- **`src/components/AppSidebar.tsx`**: Add "CoAnalyst Playbook" nav item with `Brain` icon

## Slide Content Summary

| # | Slide | Key Content |
|---|-------|------------|
| 0 | Title | "Aviation Data Intelligence" headline, 14-section contents grid |
| 1 | Executive Summary | One-line positioning, expanded statement, why now |
| 2 | Category Narrative | Reactive event mgmt → proactive control mgmt shift |
| 3 | Strategic Narrative | Bold category-creation story arc |
| 4 | Product Positioning | Sharp positioning framework (category/audience/problem/value/proof) |
| 5 | Messaging Architecture | Master message + 5 pillars with supporting points |
| 6 | How It Works | 5-step pipeline: Ingest → Enrich → Detect → Intelligence → Control |
| 7 | Business Outcomes | 8 outcome cards (delays, injuries, reliability, revenue protection) |
| 8 | vs Generic AI | Comparison table + build vs buy economics |
| 9 | Persona Messaging | 5 personas (Safety, Ops, MRO, Executive, Innovation) |
| 10 | Objection Handling | 6 objections with strategic responses |
| 11 | Taglines & Lines | 10 taglines, 10 headlines, 5 elevator pitches |
| 12 | Website Messaging | Hero, subheadline, value props, CTA copy blocks |
| 13 | Visual Narrative | 8 visual concept cards with purpose/layout/headline |
| 14 | Deck Structure & Final | Recommended slide flow + final positioning statement |

## Technical Approach

- **Page component** (`CoAnalystDeck.tsx`): Direct clone of `ContentStrategyPage.tsx` pattern with 15 slides, scroll-snap navigation, progress bar, keyboard nav, sidebar registration
- **All slides** use `SlideContainer` with dark variant, narration props pass-through
- **Slides with dense content** (Messaging Architecture, Persona, Taglines, Visual Narrative) use `!h-auto !min-h-screen !overflow-visible` for scrollable overflow, matching the Quarterly Strategy pattern
- **Data is co-located** in each slide component (no separate data files needed)
- **No new dependencies** required

## Key Positioning Content

- **Category**: Aviation Data Intelligence
- **One-line**: "CoAnalyst transforms aviation data into operational intelligence, enabling airlines to move from reactive event management to proactive control management."
- **Master message**: "From Reports to Intelligence. From Events to Control."
- **5 Pillars**: Reporting→Intelligence / Events→Controls / Aviation-Trained AI / Operational Performance / Scalable Precision
- **Core differentiator**: Purpose-built aviation intelligence vs generic AI tools

