
# Plan: Reverse Stage Order on AI Vision Slide (Slide 10)

## Current Order

The `aiStages` array currently displays stages from top to bottom as:
1. **Stage 3** - Connected Governance (Today/Active)
2. **Stage 4** - Intelligent Operations (In Development)
3. **Stage 5** - Predictive Operations (Vision)

## New Order

Reverse the array so stages display from top to bottom as:
1. **Stage 5** - Predictive Operations (Vision) - at top
2. **Stage 4** - Intelligent Operations (In Development) - middle
3. **Stage 3** - Connected Governance (Today/Active) - at bottom

---

## Changes to `src/components/slides/SlideAIVision.tsx`

### 1. Reverse the `aiStages` array order (lines 6-55)

Reorder the array elements so Stage 5 comes first, then Stage 4, then Stage 3:

```tsx
const aiStages = [
  {
    id: "future",
    label: "Where You're Headed",
    stage: "Stage 5",
    status: "Vision",
    statusColor: "bg-purple-500",
    title: "Predictive Operations",
    icon: Brain,
    capabilities: [
      "Early warning before incidents occur",
      "Proactive intervention recommendations",
      "Risk forecasting and prevention",
      "Continuous improvement on autopilot"
    ],
    gradient: "from-cyan-400 to-emerald-400"
  },
  {
    id: "nearterm",
    label: "What's Coming",
    stage: "Stage 4",
    status: "In Development",
    statusColor: "bg-amber-500",
    title: "Intelligent Operations",
    icon: Lightbulb,
    capabilities: [
      "AI-assisted procedure drafting",
      "Recommended actions with full context",
      "Automated workflow orchestration",
      "60% faster time-to-change"
    ],
    gradient: "from-accent to-cyan-400"
  },
  {
    id: "today",
    label: "What You Get Today",
    stage: "Stage 3",
    status: "Active",
    statusColor: "bg-emerald-500",
    title: "Connected Governance",
    icon: Zap,
    capabilities: [
      "Unified view across Safety, Content, and Training",
      "Automatic audit trails for every change",
      "Pattern detection from FOQA/ASAP/crew reports",
      "One source of truth for operational decisions"
    ],
    gradient: "from-primary to-accent"
  }
];
```

The narration progress logic (`getActiveStageIndex`) can remain unchanged since it uses array indices. The animation will now progress from Stage 5 (index 0) → Stage 4 (index 1) → Stage 3 (index 2), which creates a visual journey from future vision down to current foundation.

---

## Visual Result

The timeline will now show the journey from aspiration to current state:

```text
┌─ Stage 5: Predictive Operations (Vision) ────────┐  ← Top
│                                                   │
├─ Stage 4: Intelligent Operations (In Dev) ───────┤  ← Middle
│                                                   │
└─ Stage 3: Connected Governance (Active) ─────────┘  ← Bottom
```

This creates a visual hierarchy where the ultimate goal is at the top and the current foundation is at the bottom.

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/slides/SlideAIVision.tsx` | Reverse `aiStages` array order (Stage 5 first, Stage 3 last) |
