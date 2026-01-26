

# Plan: Campaign Ideas Slide - Cementing Operational Performance Positioning

## Overview

Create a new "Campaign Ideas" slide (Slide 14) that showcases 10 campaign themes to cement the "Operational Performance Platform" category in the market. This slide bridges strategic messaging with tactical go-to-market execution.

---

## Slide Design Concept

### Layout Strategy

Given 10 campaigns + supporting content, the slide uses a **hierarchical visual structure**:

1. **Campaign Hierarchy Strip** (top) - Shows funnel stages
2. **Primary Campaign Cards** (3 flagship campaigns in top row)
3. **Supporting Campaign Grid** (6 supporting campaigns in 2x3 grid)
4. **Internal Rule Banner** (bottom)

```text
+--------------------------------------------------+
|  Title: Cementing the Category                    |
|  Subtitle: Campaigns that define Operational...   |
+--------------------------------------------------+
|                                                   |
|  [Campaign Hierarchy: Top → Mid → Bottom]        |
|                                                   |
|  [3 Flagship Campaign Cards - Large]             |
|  ┌──────────────┐ ┌──────────────┐ ┌────────────┐|
|  │ Performance  │ │ Signals to   │ │ Perf Index │|
|  │ Is Broken    │ │ Performance  │ │ Benchmark  │|
|  └──────────────┘ └──────────────┘ └────────────┘|
|                                                   |
|  [6 Supporting Campaigns - Smaller Grid]         |
|  ┌─────────┐ ┌─────────┐ ┌─────────┐            |
|  │Before/  │ │Value/   │ │AI       │            |
|  │After    │ │ROI      │ │Reframe  │            |
|  └─────────┘ └─────────┘ └─────────┘            |
|  ┌─────────┐ ┌─────────┐ ┌─────────┐            |
|  │COO      │ │Safety/  │ │Analyst  │            |
|  │Persona  │ │Compliance│ │Campaign │            |
|  └─────────┘ └─────────┘ └─────────┘            |
|                                                   |
|  [Internal Rule Banner]                          |
+--------------------------------------------------+
```

---

## Campaign Data Structure

### Primary Campaigns (Top of Funnel - Category Education)

| # | Campaign | Tagline | Purpose | Icon |
|---|----------|---------|---------|------|
| 1 | Operational Performance Is Broken | "Most have a disconnected model, not a tool problem" | Create the problem the category solves | AlertTriangle |
| 2 | From Signals to Performance | "Detect → Trigger → Orchestrate → Prove" | Introduce the operating model | Workflow |
| 3 | The Operational Performance Index | "Where do you stand?" | Make the category measurable | BarChart3 |

### Supporting Campaigns (Mid & Bottom Funnel)

| # | Campaign | Tagline | Purpose | Icon |
|---|----------|---------|---------|------|
| 4 | From Firefighting to Performance | "Before/After transformation" | Visual & emotional transformation | ArrowLeftRight |
| 5 | The Cost of Poor Performance | "Silent profit killers" | Tie to economic outcomes | DollarSign |
| 6 | AI That Improves Performance | "Not just insight — outcomes" | Differentiate AI story | Brain |
| 7 | COO: Performance = CX | "Operations is the new moat" | COO persona focus | Briefcase |
| 8 | Compliance to Assurance | "Reducing recurrence, closing loop" | Safety/Compliance persona | ShieldCheck |
| 9 | Readiness Drives Performance | "Time-to-competency + proof" | Training persona | GraduationCap |
| 10 | Defining the Category | "Lock externally with analysts" | Analyst/Influencer relations | Award |

---

## Visual Components

### 1. Campaign Hierarchy Strip

Shows the funnel alignment:

```text
TOP OF MARKET          MID-FUNNEL              BOTTOM-FUNNEL
├─ Is Broken           ├─ Before/After         ├─ Cost of Poor
├─ Signals to Perf     └─ Perf Index           └─ ROI Tools
```

### 2. Flagship Campaign Cards

Each card includes:
- Campaign icon (colored circle)
- Campaign name (bold)
- Tagline (italicized quote)
- Key message (one sentence)
- Asset badges (Video, Article, Tool, etc.)

### 3. Supporting Campaign Grid

Compact cards with:
- Icon
- Campaign name
- Tagline
- Purpose (one line)

### 4. Internal Rule Banner

```text
Every campaign must teach the market what Operational Performance 
really is, why it's broken today, and why a platform is required.
```

---

## Files to Create/Update

| File | Action | Description |
|------|--------|-------------|
| `src/components/slides/SlideCampaignIdeas.tsx` | **Create** | New campaign slide component |
| `src/pages/SlideDeck.tsx` | Update | Import new slide, update slides array, add to render |
| `src/components/slides/Slide0Title.tsx` | Update | Add agenda item for Campaign Ideas (Slide 14) |
| `src/data/slideNarration.ts` | Update | Add narration for slide 14, update slideIds for 15-17 |

---

## Technical Implementation

### SlideCampaignIdeas.tsx Structure

```tsx
// Campaign data structures
const campaignHierarchy = {
  topOfMarket: ["Broken", "Signals"],
  midFunnel: ["Index", "Before/After"],
  bottomFunnel: ["Cost", "ROI Tools"]
};

const flagshipCampaigns = [
  {
    name: "Operational Performance Is Broken",
    tagline: "You can't improve performance if safety, procedures, and training don't work as one system.",
    keyMessage: "Create the problem the category exists to solve",
    assets: ["POV Article", "Video", "Board Slide", "Sales Opener"],
    successMetric: "Market talks about performance as a system problem",
    icon: AlertTriangle
  },
  // ... 2 more flagship campaigns
];

const supportingCampaigns = [
  // ... 7 supporting campaigns
];

const internalRule = "Every campaign must teach the market what Operational Performance really is, why it's broken today, and why a platform (not a tool) is required to fix it.";
```

### Component Layout

```tsx
<SlideContainer
  id="slide-14"
  title="Cementing the Category"
  subtitle="10 campaigns that define Operational Performance in the market"
  variant="dark"
  slideNumber={14}
>
  {/* Campaign Hierarchy Strip */}
  <div className="bg-card/40 rounded-lg p-3 mb-4">
    {/* 3-column funnel stages */}
  </div>

  {/* Flagship Campaigns Row */}
  <div className="grid grid-cols-3 gap-3 mb-4">
    {/* 3 large campaign cards */}
  </div>

  {/* Supporting Campaigns Grid */}
  <div className="grid grid-cols-6 gap-2 mb-4">
    {/* 6 compact campaign cards (+ 1 for Analyst) */}
  </div>

  {/* Internal Rule Banner */}
  <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center">
    <p className="text-xs italic">{internalRule}</p>
  </div>
</SlideContainer>
```

### SlideDeck.tsx Updates

```tsx
// Add import
import SlideCampaignIdeas from "@/components/slides/SlideCampaignIdeas";

// Update slides array
const slides = [
  // ... slides 0-13 unchanged
  { id: "slide-14", label: "Campaign Ideas" },  // NEW
  { id: "slide-15", label: "Category: Excellence" },  // was 14
  { id: "slide-16", label: "Category: Orchestration" },  // was 15
  { id: "slide-17", label: "Category: Assurance" },  // was 16
];

// Add to render after SlideMessagingHouse
<SlideCampaignIdeas {...getNarrationProps(14)} />
```

### Slide0Title.tsx Update

Add agenda item at position 14:

```tsx
{ num: 14, label: "Campaign Ideas", summary: "Cementing category leadership" },
```

Shift existing items 14-16 to 15-17.

### slideNarration.ts Update

Add narration for slide 14:

```typescript
{
  slideId: 14,
  title: "Campaign Ideas",
  voiceId: DEFAULT_VOICE_ID,
  script: "Now that we've defined positioning and messaging, how do we cement 'Operational Performance Platform' in the market? Ten campaign themes, organized by funnel stage, each reinforcing a different dimension of category leadership. At the top of the market, we lead with category education. First: 'Operational Performance Is Broken.' Most organisations think they have a tooling problem — but what they actually have is a disconnected operating model. You can't improve performance if safety, procedures, and training don't work as one system. Second: 'From Signals to Performance.' This campaign introduces our operating model — Detect, Trigger, Orchestrate, Prove. Performance doesn't improve at the point of insight. It improves at the point of execution. Third: 'The Operational Performance Index.' If you can't benchmark maturity, you can't improve it. A self-assessment tool that lets buyers see where they stand versus peers. In the mid-funnel, we shift to transformation stories. 'From Firefighting to Performance' uses before-and-after visuals to show how work actually changes. Then 'The Cost of Poor Performance' ties the category directly to economic outcomes — delays, repeat issues, and audit scrambles are performance failures, not compliance problems. Our AI campaign, 'AI That Improves Performance — Not Just Insight,' differentiates our story from hype. AI only matters if it changes outcomes. Persona-specific campaigns layer on top. For COOs: 'Operational Performance Is Customer Experience.' For Safety and Compliance: 'From Compliance to Performance Assurance.' For Training: 'Readiness Drives Performance.' Finally, our analyst campaign, 'Defining the Operational Performance Platform,' locks the category externally with Gartner, Forrester, and industry influencers. One internal rule governs all campaigns: every message must teach the market what Operational Performance really is, why it's broken today, and why a platform — not a tool — is required to fix it. This is how we move from positioning to category ownership."
}
```

Update slideIds for slides 15-17.

---

## Summary

| Metric | Value |
|--------|-------|
| Files created | 1 |
| Files updated | 3 |
| New slide position | 14 |
| Total campaigns | 10 |
| Funnel stages covered | 3 (Top, Mid, Bottom) |
| Persona campaigns | 3 (COO, Safety/Compliance, Training) |

This slide provides a comprehensive view of how the "Operational Performance Platform" category will be activated across campaigns, content, and go-to-market motions — giving the board visibility into the tactical execution plan that follows the strategic positioning.

