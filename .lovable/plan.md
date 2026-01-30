

# Plan: Strengthen "Operational Performance Platform" Positioning

Based on the GM feedback document and codebase review, this plan addresses three key areas:
1. Add scope clarity to prevent confusion with airline ops metrics
2. Ground the DTOP framework in concrete, auditable examples
3. Elevate the key differentiator earlier in the narrative

---

## Summary of Changes

| Area | Current Issue | Solution |
|------|---------------|----------|
| Category clarity | "Operational Performance" risks confusion with OTP/fuel metrics | Add "for Safety, Content, and Training" scope line immediately after category name |
| DTOP framework | Abstract steps without auditable context | Add concrete airline examples showing the audit trail at each step |
| Differentiation | Key differentiator appears late (Slide 12) | Elevate "Unlike point solutions..." line to Title slide and Slide 1 |
| Definition consistency | Some slides use "audit-ready proof", others "measurable outcomes" | Standardize to "measurable outcomes" per existing alignment |

---

## Files to Modify

### 1. `src/components/slides/Slide0Title.tsx`

**Lines 94-98** - Add scope clarification and differentiation line after the category tagline:

```tsx
<p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
  Connect safety, content, and training into an intelligent operating platform.
  <br className="hidden sm:block" />
  <span className="text-primary font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
</p>
```

This aligns the title slide with the homepage hero copy that was just updated.

---

### 2. `src/components/slides/Slide1StrategicShift.tsx`

**Lines 77-82** - Add scope subtitle under category name:

```tsx
<span className="text-lg font-bold text-foreground block mb-1">
  Operational Performance
</span>
<span className="text-sm text-primary font-medium">
  Platform
</span>
<span className="text-xs text-muted-foreground mt-2 block">
  for Safety, Content, and Training
</span>
```

**Lines 105-113** - Add differentiation line to the category callout box:

```tsx
<div className="bg-primary/10 border border-primary/30 rounded-lg p-5">
  <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Category we're defining:</p>
  <p className="text-xl font-bold text-foreground mb-2">
    Operational Performance Platform
  </p>
  <p className="text-sm text-muted-foreground mb-3">
    A connected, intelligent, and predictive platform that turns signals into 
    orchestrated change and measurable outcomes.
  </p>
  <p className="text-xs text-foreground/80 italic border-t border-primary/20 pt-3">
    Unlike point solutions that manage safety, content, or training in isolation, 
    Comply365 connects all three into one governed platform.
  </p>
</div>
```

---

### 3. `src/components/slides/Slide3OperatingModel.tsx`

**Lines 45-90** - Update DTOP steps with concrete auditable examples:

```tsx
const steps = [
  {
    id: "detect",
    icon: Radio,
    label: "Detect",
    description: "FOQA exceedance triggers automatic alert. Signal captured with flight ID, crew, and timestamp.",
    metric: "12K",
    metricLabel: "signals/mo",
    auditTrail: "Signal ID: FOQA-2024-00847 logged",
    // ... existing colors
  },
  {
    id: "trigger",
    icon: Bell,
    label: "Trigger",
    description: "Procedure review workflow initiated. Linked to source signal, assigned owner, due date set.",
    metric: "850",
    metricLabel: "actions",
    auditTrail: "Workflow WF-3421 created → Owner: J.Smith",
    // ... existing colors
  },
  {
    id: "orchestrate",
    icon: GitBranch,
    label: "Orchestrate",
    description: "SOP 4.2.1 updated. Training module activated for affected crew. All changes version-controlled.",
    metric: "340",
    metricLabel: "changes",
    auditTrail: "SOP v4.2.1 published → 47 crew assigned",
    // ... existing colors
  },
  {
    id: "prove",
    icon: ShieldCheck,
    label: "Prove",
    description: "Complete audit trail generated. Signal → change → training → completion linked and exportable.",
    metric: "100%",
    metricLabel: "tracked",
    auditTrail: "Audit report AR-2024-0847 ready",
    // ... existing colors
  },
];
```

Add audit trail display to each step card (around line 205):

```tsx
{/* Description */}
<p className={`text-[10px] text-center transition-colors duration-300 ${isStepActive ? 'text-foreground' : 'text-muted-foreground/50'}`}>
  {step.description}
</p>

{/* Audit Trail - NEW */}
{isStepActive && step.auditTrail && (
  <p className="text-[9px] text-center mt-1 font-mono text-primary/80 bg-primary/5 rounded px-1 py-0.5">
    {step.auditTrail}
  </p>
)}
```

---

### 4. `src/components/slides/SlideMessagingHouse.tsx`

**Lines 22-26** - Update category definition to use "measurable outcomes":

```tsx
const categoryPosition = {
  name: "Operational Performance Platform",
  scope: "for Safety, Content, and Training",
  definition: "A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes.",
  operatingModel: "Continuous Improvement Operating Model",
  narrativeSpine: ["Detect", "Trigger", "Orchestrate", "Prove"]
};
```

**Lines 212-215** - Display scope in the rooftop section:

```tsx
<h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
  {categoryPosition.name}
</h3>
<p className="text-[10px] text-muted-foreground mt-0.5">
  {categoryPosition.scope}
</p>
```

---

### 5. `src/pages/HomepageMockup.tsx`

**Lines ~190-200** - Add scope line under the main headline (no code change needed - hero copy already updated, but add scope clarification):

```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
  The Operational Performance
  <br />
  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
    Platform
  </span>
</h1>
<p className="text-sm text-primary font-medium mb-4">
  for Safety, Content, and Training
</p>
```

---

## Rationale Alignment with GM Feedback

| Feedback Point | How Addressed |
|----------------|---------------|
| Neil: "Operational Performance" confusion with OTP | Scope line "for Safety, Content, and Training" immediately clarifies domain |
| Alan: DTOP needs concrete examples | Each step now includes an "audit trail" showing the actual record created |
| Team: Differentiation not prominent | "Unlike point solutions..." line now appears on Slide 1, not just Slide 12 |
| Team: Consistency | "Measurable outcomes" used consistently (not "audit-ready proof") |

---

## Visual Summary

```text
Title Slide (0)
┌─────────────────────────────────────────┐
│   Operational Performance Platform      │
│   for Safety, Content, and Training     │  ← NEW scope line
│                                         │
│   Connect safety, content, and training │  ← Updated tagline
│   into an intelligent operating platform│
└─────────────────────────────────────────┘

Strategic Shift (1)
┌─────────────────────────────────────────┐
│   Category: Operational Performance     │
│            Platform                     │
│   for Safety, Content, and Training     │  ← NEW scope line
│                                         │
│   Unlike point solutions that manage    │  ← NEW differentiator
│   safety, content, or training in       │
│   isolation, Comply365 connects all     │
│   three into one governed platform.     │
└─────────────────────────────────────────┘

Operating Model (3)
┌─────────────────────────────────────────┐
│   Detect → Trigger → Orchestrate → Prove│
│                                         │
│   Each step now shows:                  │
│   • Concrete airline scenario           │
│   • Audit trail record created          │  ← NEW audit visibility
└─────────────────────────────────────────┘
```

---

## Implementation Notes

- All changes maintain existing visual styling and component structure
- Narration timings in Slide3OperatingModel remain unchanged
- Memory context should be updated after implementation to reflect new scope line pattern

