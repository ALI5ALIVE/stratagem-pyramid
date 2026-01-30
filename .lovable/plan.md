

# Plan: Create Platform Page with Z-Page Format

## Goal

Create a dedicated `/platform` page that showcases the platform capabilities in a Z-page scrolling format, incorporating all key messages from the slide deck. This page will serve as the primary platform marketing page, distinct from the industry-specific solution pages.

---

## What is a Z-Page Format?

A "Z-page" layout creates a natural reading pattern with alternating left-right content sections as users scroll. Each section features:
- A visual/diagram on one side
- Descriptive copy on the other side
- The visual and copy alternate sides as users scroll down

---

## Page Structure

| Section | Visual Side | Copy Side | Key Message Source |
|---------|-------------|-----------|-------------------|
| **Hero** | Platform Ecosystem Diagram | Category positioning + value prop | Slide 0, Messaging House |
| **The Problem** | Fragmentation illustration | Before/after bullets | Slide 1, Slide 2 |
| **Operating Model** | Infinity loop visual | DTOP explanation | Slide 3 |
| **Platform Capabilities** | Three pillars visual | Data, Automation, AI cards | Slide 4 |
| **Value Ladder** | Maturity curve graphic | 5 stages explained | Slide 6, Slide 7 |
| **Transformation** | Time allocation bars | Before/after outcomes | Slide 5 |
| **AI Story** | AI roadmap timeline | Today/Near-term/Future | Slide 11 (AI Vision) |
| **Proof Points** | Customer logos/metrics | Trust signals + stats | Slide 9 (Customers) |
| **CTA** | N/A | Final call to action | Standard |

---

## Files to Create

### 1. `src/pages/PlatformPage.tsx` (NEW - Main Page)

The main platform page that imports and composes all section components.

```tsx
import MainNavigation from "@/components/MainNavigation";
import PlatformHero from "@/components/platform/PlatformHero";
import PlatformProblem from "@/components/platform/PlatformProblem";
import PlatformOperatingModel from "@/components/platform/PlatformOperatingModel";
import PlatformCapabilities from "@/components/platform/PlatformCapabilities";
import PlatformValueLadder from "@/components/platform/PlatformValueLadder";
import PlatformTransformation from "@/components/platform/PlatformTransformation";
import PlatformAIStory from "@/components/platform/PlatformAIStory";
import PlatformProofPoints from "@/components/platform/PlatformProofPoints";
import PlatformCTA from "@/components/platform/PlatformCTA";

const PlatformPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <PlatformHero />
      <PlatformProblem />
      <PlatformOperatingModel />
      <PlatformCapabilities />
      <PlatformValueLadder />
      <PlatformTransformation />
      <PlatformAIStory />
      <PlatformProofPoints />
      <PlatformCTA />
    </div>
  );
};

export default PlatformPage;
```

---

### 2. `src/components/platform/PlatformHero.tsx`

**Layout**: Full-width hero with ecosystem diagram
**Content**: Category positioning from messaging house
- Headline: "The Operational Performance Platform"
- Scope line: "for Safety, Content, and Training"
- Definition: "A connected, intelligent, and predictive platform..."
- Trust bar with cross-industry signals

---

### 3. `src/components/platform/PlatformProblem.tsx`

**Layout**: Visual LEFT, Copy RIGHT (first Z)
**Content**: From Slide 1 (Strategic Shift) and Slide 2 (Before/After)
- Headline: "The Fragmentation Problem"
- Visual: Siloed tools illustration (Safety/Manuals/TMS boxes)
- Bullets: The 5 operational gaps point tools can't close
- Stat callout: "$2.3M lost annually"

---

### 4. `src/components/platform/PlatformOperatingModel.tsx`

**Layout**: Copy LEFT, Visual RIGHT (second Z)
**Content**: From Slide 3 (Operating Model)
- Headline: "The Continuous Improvement Operating Model"
- Subhead: "Detect → Trigger → Orchestrate → Prove"
- Visual: Core Solutions Infinity loop diagram
- DTOP steps with metrics (12K signals/mo, etc.)
- Value Generated metrics bar

---

### 5. `src/components/platform/PlatformCapabilities.tsx`

**Layout**: Visual LEFT, Copy RIGHT (third Z)
**Content**: From Slide 4 (Platform Capabilities)
- Headline: "The Platform That Powers It"
- Visual: Platform ecosystem diagram
- Three capability cards:
  - Data That Connects
  - Automation That Adapts
  - AI That Drives
- Outcome metrics: Revenue Protection, Efficiency, Advantage

---

### 6. `src/components/platform/PlatformValueLadder.tsx`

**Layout**: Copy LEFT, Visual RIGHT (fourth Z)
**Content**: From Slides 6 & 7 (Value Pyramid, Maturity Curve)
- Headline: "The Operational Performance Ladder"
- Visual: Simplified maturity curve graphic
- 5 stages with brief descriptions:
  1. Fragmented & Reactive
  2. Managed Compliance
  3. Connected Governance ← Platform shift
  4. Intelligent Operations
  5. Predictive Operations
- Note about individual products vs full platform

---

### 7. `src/components/platform/PlatformTransformation.tsx`

**Layout**: Visual LEFT, Copy RIGHT (fifth Z)
**Content**: From Slide 5 (Transformation)
- Headline: "The Transformation"
- Subhead: "From cost center to competitive advantage"
- Visual: Time allocation before/after bars
- Before/after comparison grid
- "New Possibilities Unlocked" metrics

---

### 8. `src/components/platform/PlatformAIStory.tsx`

**Layout**: Copy LEFT, Visual RIGHT (sixth Z)
**Content**: From Slide 11 (AI Vision)
- Headline: "Becoming an AI Company"
- Subhead: "Intelligence that's embedded, not bolted on"
- Visual: AI maturity timeline (Today → Near-term → Future)
- Already deployed capabilities
- Key message: "More than a platform company — an AI company"

---

### 9. `src/components/platform/PlatformProofPoints.tsx`

**Layout**: Full-width section
**Content**: From Slides 9 (Customers) and trust signals
- Headline: "Trusted Across Industries"
- Cross-industry trust bar (Aviation, Rail, Defense)
- Metrics: 1M+ frontline workers, 99.9% uptime, 50+ airlines
- Optional: Customer testimonial quote

---

### 10. `src/components/platform/PlatformCTA.tsx`

**Layout**: Centered full-width
**Content**: Final call to action
- Headline: "Ready to transform operational performance?"
- Two CTAs: "See the Platform" / "Calculate Your Impact"

---

## File to Modify

### `src/App.tsx`

Add route for the new platform page:

```tsx
import PlatformPage from "./pages/PlatformPage";

// In Routes:
<Route path="/platform" element={<PlatformPage />} />
```

---

## Key Design Patterns

1. **Z-Pattern Layout**: Alternating `grid lg:grid-cols-2` with visual/copy flipping sides
2. **Scroll Animations**: Reuse `AnimatedSection` pattern from HomepageMockup
3. **Consistent Styling**: Follow existing solution page section patterns
4. **Responsive**: Mobile stacks vertically, desktop alternates
5. **Brand Consistency**: Use existing color tokens and typography

---

## Content Mapping from Slides

| Platform Section | Slide Source(s) | Key Messages |
|------------------|-----------------|--------------|
| Hero | Slide 0, Messaging House | Category definition, scope line |
| Problem | Slide 1, 2 | 5 gaps, fragmentation cost |
| Operating Model | Slide 3 | DTOP framework, infinity visual |
| Capabilities | Slide 4 | Data, Automation, AI pillars |
| Value Ladder | Slide 6, 7 | 5 maturity stages, platform shift |
| Transformation | Slide 5 | Before/after, time allocation |
| AI Story | Slide 11 | Today/Near-term/Future roadmap |
| Proof Points | Slide 9 | Trust signals, metrics |

---

## Technical Implementation Notes

1. **Reuse Existing Components**: Where possible, adapt components like `PlatformEcosystemDiagram`, `CoreSolutionsInfinity`, and visual elements from slides
2. **New Section Components**: Create dedicated `/platform` folder for clean organization
3. **Scroll Reveal**: Apply the existing `useScrollReveal` hook pattern from HomepageMockup
4. **Mobile-First**: Ensure all Z-sections stack properly on mobile

