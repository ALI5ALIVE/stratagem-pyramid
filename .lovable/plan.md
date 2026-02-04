

# Plan: Implement Option A - Metric Cards Transformation

## Overview

Replace the current `FragmentationIllustration → PlatformEcosystemDiagram` visual with a **value-focused metric cards transformation** that shows concrete pain metrics shifting to value outcomes.

---

## Visual Design

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│   ┌─────────────────────┐              ┌─────────────────────┐                 │
│   │      TODAY          │      →       │      TOMORROW       │                 │
│   │  (Pain Metrics)     │              │  (Value Outcomes)   │                 │
│   ├─────────────────────┤              ├─────────────────────┤                 │
│   │ ✗ 3 weeks           │              │ ✓ 48 hours          │                 │
│   │   to investigate    │              │   to resolution     │                 │
│   ├─────────────────────┤              ├─────────────────────┤                 │
│   │ ✗ 60% time on       │              │ ✓ 70% time on       │                 │
│   │   coordination      │              │   improvement       │                 │
│   ├─────────────────────┤              ├─────────────────────┤                 │
│   │ ✗ Months of         │              │ ✓ 2 hours           │                 │
│   │   audit prep        │              │   audit-ready       │                 │
│   └─────────────────────┘              └─────────────────────┘                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Changes

### File: `src/components/sales-slides/SalesSlide0Title.tsx`

**1. Update imports:**
```typescript
// Remove
import FragmentationIllustration from "@/components/FragmentationIllustration";
import PlatformEcosystemDiagram from "@/components/PlatformEcosystemDiagram";

// Add
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
```

**2. Replace visual transformation section (lines 70-93):**

Replace with metric cards showing:

| Today (Pain) | Tomorrow (Value) |
|--------------|------------------|
| 3 weeks to investigate | 48 hours to resolution |
| 60% coordination time | 70% improvement time |
| Months of audit prep | 2 hours audit-ready |

**3. New component structure:**

```tsx
{/* Visual transformation: Pain Metrics → Value Outcomes */}
<div className="flex items-center justify-center gap-6 sm:gap-10 py-6">
  {/* Today: Pain Metrics */}
  <div className="flex flex-col items-center">
    <div className="text-xs text-destructive font-semibold uppercase tracking-wide mb-3">Today</div>
    <div className="space-y-2">
      {/* Pain metric card 1 */}
      <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2">
        <XCircle className="w-4 h-4 text-destructive" />
        <div className="text-left">
          <div className="text-lg font-bold text-destructive">3 weeks</div>
          <div className="text-xs text-muted-foreground">to investigate</div>
        </div>
      </div>
      {/* Pain metric card 2 */}
      <div className="...">60% / coordination time</div>
      {/* Pain metric card 3 */}
      <div className="...">Months / audit prep</div>
    </div>
  </div>

  {/* Arrow */}
  <div className="flex flex-col items-center gap-1">
    <ArrowRight className="w-8 h-8 text-primary" />
    <span className="text-xs text-muted-foreground">Transform</span>
  </div>

  {/* Tomorrow: Value Outcomes */}
  <div className="flex flex-col items-center">
    <div className="text-xs text-emerald-500 font-semibold uppercase tracking-wide mb-3">Tomorrow</div>
    <div className="space-y-2">
      {/* Value card 1 */}
      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <div className="text-left">
          <div className="text-lg font-bold text-emerald-500">48 hours</div>
          <div className="text-xs text-muted-foreground">to resolution</div>
        </div>
      </div>
      {/* Value card 2 */}
      <div className="...">70% / improvement time</div>
      {/* Value card 3 */}
      <div className="...">2 hours / audit-ready</div>
    </div>
  </div>
</div>
```

---

## Metric Cards Data

| Position | Pain Label | Pain Sublabel | Value Label | Value Sublabel |
|----------|------------|---------------|-------------|----------------|
| 1 | 3 weeks | to investigate | 48 hours | to resolution |
| 2 | 60% | coordination time | 70% | improvement time |
| 3 | Months | audit prep | 2 hours | audit-ready |

---

## Styling Details

- **Pain cards**: `bg-destructive/10`, `border-destructive/30`, red icons and text
- **Value cards**: `bg-emerald-500/10`, `border-emerald-500/30`, green icons and text
- **Card layout**: Consistent width, left-aligned text within cards
- **Responsive**: Stack vertically on very small screens if needed

---

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| Left visual | FragmentationIllustration (abstract tools) | Concrete pain metrics with numbers |
| Right visual | PlatformEcosystemDiagram (product) | Value outcomes customers care about |
| Message | "We connect your tools" | "We save you time and reduce risk" |
| Emotional impact | Technical/abstract | Tangible/relatable |

