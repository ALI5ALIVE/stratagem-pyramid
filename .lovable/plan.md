

# Plan: Update AI Vision Slide to Align with Maturity Model Stages

## Summary

Reframe the "Becoming an AI Company" slide to use the maturity model stage terminology, changing from generic AI evolution labels to the specific stage names that align with the Operational Performance Ladder.

---

## Current vs. Proposed Stage Names

| Timeline | Current Title | Current Stage | Proposed Title | Proposed Stage |
|----------|--------------|---------------|----------------|----------------|
| Today | Embedded Intelligence | Stage 3-4 | Connected Governance | Stage 3 |
| Near-term | Predictive Operations | Stage 4-5 | Intelligent Operations | Stage 4 |
| Future | Agentic Reliability | Stage 5+ | Predictive Intelligence | Stage 5 |

---

## Technical Changes

**File:** `src/components/slides/SlideAIVision.tsx`

### Change 1: Update Stage 1 (Today) - Lines 6-22

```tsx
// From:
{
  id: "today",
  label: "Today",
  stage: "Stage 3-4",
  status: "Active",
  statusColor: "bg-emerald-500",
  title: "Embedded Intelligence",
  ...
}

// To:
{
  id: "today",
  label: "Today",
  stage: "Stage 3",
  status: "Active",
  statusColor: "bg-emerald-500",
  title: "Connected Governance",
  icon: Zap,
  capabilities: [
    "Unified data across Safety, Content, and Training",
    "Governance-aware workflows with audit trails",
    "Pattern detection from FOQA/ASAP/crew reports",
    "Coordinated change management"
  ],
  gradient: "from-primary to-accent"
}
```

### Change 2: Update Stage 2 (Near-term) - Lines 23-38

```tsx
// From:
{
  id: "nearterm",
  label: "Near-term",
  stage: "Stage 4-5",
  status: "In Development",
  statusColor: "bg-amber-500",
  title: "Predictive Operations",
  ...
}

// To:
{
  id: "nearterm",
  label: "Near-term",
  stage: "Stage 4",
  status: "In Development",
  statusColor: "bg-amber-500",
  title: "Intelligent Operations",
  icon: Lightbulb,
  capabilities: [
    "AI-assisted drafting and execution",
    "Recommended actions with context awareness",
    "Automated trigger orchestration",
    "Compressed decision cycles"
  ],
  gradient: "from-accent to-cyan-400"
}
```

### Change 3: Update Stage 3 (Future) - Lines 39-55

```tsx
// From:
{
  id: "future",
  label: "Future",
  stage: "Stage 5+",
  status: "Vision",
  statusColor: "bg-purple-500",
  title: "Agentic Reliability",
  ...
}

// To:
{
  id: "future",
  label: "Future",
  stage: "Stage 5",
  status: "Vision",
  statusColor: "bg-purple-500",
  title: "Predictive Intelligence",
  icon: Brain,
  capabilities: [
    "Weak signal detection before incidents",
    "Proactive intervention recommendations",
    "Risk forecasting models",
    "Self-optimizing operational workflows"
  ],
  gradient: "from-cyan-400 to-emerald-400"
}
```

### Change 4: Update Section Header - Line 110

```tsx
// From:
<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">AI Evolution Journey</h3>

// To:
<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Intelligence Maturity Roadmap</h3>
```

### Change 5: Update Right Column Callout Text - Line 251

```tsx
// From:
The Operational Intelligence Layer powers Stage 3 → 4 → 5 progression. AI compresses decision and execution time while keeping humans in control.

// To:
Connected Governance → Intelligent Operations → Predictive Intelligence. AI compresses decision and execution time while keeping humans in control.
```

---

## Visual Impact

The updated slide will now show a clear progression that directly maps to the Operational Performance Ladder:

| Stage | Title | Focus |
|-------|-------|-------|
| **Stage 3** | Connected Governance | Data unification + governance foundation |
| **Stage 4** | Intelligent Operations | AI-assisted execution + automation |
| **Stage 5** | Predictive Intelligence | Anticipatory + self-optimizing |

This creates a seamless narrative connection between:
- **Slide 6** (Operational Performance Ladder)
- **Slide 7** (Operational Performance Roadmap)
- **Slide 10** (Becoming an AI Company)

---

## Narrative Alignment

The updated terminology reinforces that AI is the **mechanism** for moving customers up the maturity ladder:

1. **Connected Governance (Stage 3)** - The platform creates the data foundation
2. **Intelligent Operations (Stage 4)** - AI starts assisting and automating
3. **Predictive Intelligence (Stage 5)** - AI becomes anticipatory and proactive

This positions Comply365's AI story as integral to the operational performance transformation, not a separate capability.

