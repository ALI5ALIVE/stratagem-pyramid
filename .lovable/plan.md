

# Plan: Add Orchestrate Step to Use Cases Slide

## Problem

The current Use Cases slide only shows 3 steps per use case:
1. **Signal Detected** (Detect)
2. **Action Triggered** (Trigger) 
3. **Outcome Proven** (Prove)

The **Orchestrate** step is missing, which breaks alignment with the full DTOP framework (Detect → Trigger → Orchestrate → Prove) shown in the legend at the top of the slide and used consistently in the Operating Model slide.

---

## Solution

Add an explicit **Orchestrate** step to each use case, positioned between Trigger and Prove.

---

## Changes to `src/components/slides/SlideUseCases.tsx`

### 1. Update the UseCase interface

Add a new `orchestrate` property to the interface:

```typescript
interface UseCase {
  id: string;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  signal: {
    label: string;
    description: string;
    source: string;
  };
  action: {
    label: string;
    description: string;
    trigger: string;
  };
  orchestrate: {           // NEW
    label: string;
    description: string;
    deliverable: string;
  };
  outcome: {
    label: string;
    description: string;
    metric?: string;
  };
}
```

### 2. Add orchestrate data for each use case

| Use Case | Orchestrate Label | Description | Deliverable |
|----------|------------------|-------------|-------------|
| **Personalized Pilot Training** | Training Deployment | Personalized training module created and assigned to affected pilots | 47 pilots enrolled in targeted program |
| **Smoke & Fumes Detection** | Procedure Update | De-icing SOP updated with new ventilation protocols | SOP v2.3 published → 120 ground crew notified |
| **Hydraulic Switch Error** | Content Revision | Procedure rewritten with clearer step-by-step sequence and visual aids | Checklist v4.1 deployed to all 737 crew |

### 3. Add Orchestrate visual section in the card

Insert a new step between "Action Triggered" and "Outcome Proven":

```text
┌─────────────────────────────────────┐
│  ● Signal Detected (Detect)         │  ← primary color
│  ● Action Triggered (Trigger)       │  ← accent/orange color
│  ● Change Orchestrated (Orchestrate)│  ← cyan color  ← NEW
│  ● Outcome Proven (Prove)           │  ← emerald color
└─────────────────────────────────────┘
```

---

## Updated Use Case Data

### Use Case 1: Personalized Pilot Training
```typescript
orchestrate: {
  label: "Training Deployment",
  description: "Personalized competency module created, assigned to affected pilots with completion deadline",
  deliverable: "47 pilots enrolled in targeted program",
}
```

### Use Case 2: Smoke & Fumes Detection
```typescript
orchestrate: {
  label: "Procedure Update",
  description: "De-icing SOP updated with new ventilation protocols and ground crew positioning requirements",
  deliverable: "SOP v2.3 published → 120 ground crew notified",
}
```

### Use Case 3: Hydraulic Switch Error
```typescript
orchestrate: {
  label: "Content Revision",
  description: "Hydraulic switch procedure rewritten with clearer step sequence, visual aids, and confirmation checkpoints",
  deliverable: "Checklist v4.1 deployed to all 737 crew",
}
```

---

## Visual Styling for Orchestrate Step

Matching the legend and Operating Model slide:
- **Border color**: `border-cyan-500/50`
- **Dot color**: `bg-cyan-500`
- **Text color**: `text-cyan-500`
- **Icon**: `GitBranch` (same as Operating Model)

---

## Summary

| File | Change |
|------|--------|
| `src/components/slides/SlideUseCases.tsx` | Add `orchestrate` property to interface, add data for each use case, add visual section in card |

This ensures each use case follows the complete **Detect → Trigger → Orchestrate → Prove** loop, matching the DTOP legend at the top and maintaining consistency with the Operating Model slide.

