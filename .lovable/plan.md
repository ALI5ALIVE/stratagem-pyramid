

# Plan: Transform "What This Means for Customers" Slide (Slide 10)

## Problem Analysis

Based on the transcript, the current slide is "too theoretical" and needs to:
1. Replace abstract KPI gauges with tangible business value stories
2. Connect platform capabilities to real business outcomes customers can relate to
3. Add **Cost Savings** as a 4th value pillar (currently missing)
4. Reframe metrics as: Schedule Protection, Revenue Protection, Cost Savings, Customer Loyalty
5. Ground value in specific examples (like the use cases on the previous slide)

---

## New Slide Design: Four Value Boxes

Replace the three abstract gauge cards with **four concrete value boxes** that tell a story customers can immediately understand:

```text
+------------------+------------------+------------------+------------------+
|  SCHEDULE        |  REVENUE         |  COST            |  CUSTOMER        |
|  PROTECTION      |  PROTECTION      |  SAVINGS         |  LOYALTY         |
|                  |                  |                  |                  |
|  Fewer cancelled |  Protected $$    |  Less wear &     |  Trust through   |
|  flights, faster |  through fewer   |  tear, fewer     |  consistent      |
|  recovery        |  disruptions     |  claims, less    |  operations      |
|                  |                  |  rework          |                  |
|  Example:        |  Example:        |  Example:        |  Example:        |
|  Hard landing    |  Charlotte hub   |  Landing gear    |  On-time =       |
|  trend detected  |  de-icing fixed  |  savings from    |  repeat          |
|  → fewer delays  |  → schedule kept |  better training |  bookings        |
+------------------+------------------+------------------+------------------+
```

---

## Technical Implementation

### File: `src/components/slides/Slide7Customers.tsx`

### 1. Replace KPI categories with value outcomes

Replace the current `kpiCategories` array (lines 14-53) with a new `valueOutcomes` structure:

```tsx
const valueOutcomes = [
  {
    title: "Schedule Protection",
    subtitle: "Fewer disruptions, faster recovery",
    icon: Clock,
    color: "bg-primary",
    borderColor: "border-primary/30",
    bgColor: "bg-primary/5",
    textColor: "text-primary",
    example: {
      signal: "Hard landing trend detected in FOQA data",
      action: "Targeted pilot retraining deployed",
      result: "Fewer maintenance delays, protected departures",
    },
    metrics: ["Reduced delays", "Faster recovery", "Protected departures"],
  },
  {
    title: "Revenue Protection",
    subtitle: "Protect the schedule, protect the revenue",
    icon: TrendingUp,
    color: "bg-emerald-500",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    textColor: "text-emerald-400",
    example: {
      signal: "Smoke & fumes cluster at regional hub",
      action: "De-icing procedure revised, ground crew retrained",
      result: "92% fewer incidents, schedule maintained",
    },
    metrics: ["Protected revenue", "Maintained schedule", "Reduced cancellations"],
  },
  {
    title: "Cost Savings",
    subtitle: "Less wear, fewer claims, less rework",
    icon: DollarSign,
    color: "bg-amber-500",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/5",
    textColor: "text-amber-400",
    example: {
      signal: "Training gaps identified via performance data",
      action: "Personalized competency modules assigned",
      result: "Reduced tire wear, fewer landing gear repairs",
    },
    metrics: ["Equipment savings", "Reduced workers comp", "Less damage"],
  },
  {
    title: "Customer Loyalty",
    subtitle: "Trust through consistent operations",
    icon: Heart,
    color: "bg-violet-500",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/5",
    textColor: "text-violet-400",
    example: {
      signal: "Procedure confusion pattern detected",
      action: "SOP rewritten with clarity, crew retrained",
      result: "Zero incidents, on-time performance maintained",
    },
    metrics: ["Customer satisfaction", "Repeat bookings", "Brand trust"],
  },
];
```

### 2. Redesign the value cards layout

Replace the gauge-based cards with story-driven value boxes:
- Each box shows: Title, subtitle, a mini "Signal → Action → Result" flow, and key metrics
- More compact, fitting 4 cards in a 2x2 or 4-column grid
- Uses icons and color coding for quick scanning

### 3. Update Executive Value Proposition (line 77-84)

Simplify the value prop to focus on outcomes:
```tsx
<p className="text-base text-foreground leading-relaxed">
  Connect <span className="text-primary font-semibold">safety signals to business outcomes</span>: 
  protected schedules, protected revenue, lower costs, and loyal customers.
</p>
```

### 4. Simplify the Cost Center → Revenue flow

Keep the 3-stage visual but make it more compact (reduce padding).

### 5. Remove or simplify the Benchmarking section

The benchmarking program at the bottom can be made more compact or moved to a small footnote, freeing space for the new value boxes.

---

## Summary of Changes

| Current Element | New Element | Why |
|-----------------|-------------|-----|
| 3 abstract KPI gauges | 4 value outcome boxes | More tangible, connected to real examples |
| Generic metrics (OTP ↑, Delay ↓) | Specific value stories | Shows platform → outcome connection |
| Missing Cost Savings | Added Cost Savings pillar | Key business value was missing |
| "Reliability & Disruption" | "Schedule Protection" | Customer-centric language |
| Gauge percentages | Mini Signal → Action → Result | Grounds value in platform capability |

---

## Visual Layout

```text
┌────────────────────────────────────────────────────────────────────────┐
│  "Connect safety signals to business outcomes"                          │
└────────────────────────────────────────────────────────────────────────┘

┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Cost Center  │ → │ Operational  │ → │ Revenue      │
│              │   │ Performance  │   │ Generation   │
└──────────────┘   └──────────────┘   └──────────────┘

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ SCHEDULE        │ │ REVENUE         │ │ COST            │ │ CUSTOMER        │
│ PROTECTION      │ │ PROTECTION      │ │ SAVINGS         │ │ LOYALTY         │
│                 │ │                 │ │                 │ │                 │
│ Signal:         │ │ Signal:         │ │ Signal:         │ │ Signal:         │
│ Hard landing    │ │ Smoke cluster   │ │ Training gaps   │ │ Procedure       │
│ trend           │ │ at hub          │ │ identified      │ │ confusion       │
│                 │ │                 │ │                 │ │                 │
│ Result:         │ │ Result:         │ │ Result:         │ │ Result:         │
│ Protected       │ │ 92% fewer       │ │ Equipment       │ │ Zero incidents  │
│ departures      │ │ incidents       │ │ savings         │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│  Benchmarking Program (compact single line)                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## File Changed

| File | Change |
|------|--------|
| `src/components/slides/Slide7Customers.tsx` | Complete redesign with 4 value outcome boxes featuring Signal → Result stories |

