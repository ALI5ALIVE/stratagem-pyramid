

# Plan: Reframe Y-Axis to Tell the Data/AI/Intelligence Value Story

## Summary

Update the Strategic Matrix Y-axis from "Cost Center -> Revenue Generation" to "Manual Reporting -> Intelligent Operations" to better communicate the platform's intelligence-driven value differentiation.

---

## Changes Overview

| Element | Current | New |
|---------|---------|-----|
| Y-Axis Label | "Cost Center -> Revenue Generation" | "Manual Reporting -> Intelligent Operations" |
| Y-Axis Name | "Strategic Value" | "Intelligence Maturity" |
| Tooltip Field | "Depth: X/4.0" | "Intelligence: X/10" |
| Bottom-Left Quadrant | "Task-level Value" | "Static Compliance" |
| Bottom-Right Quadrant | "Breadth without Depth" | "Data without Intelligence" |
| Top-Left Quadrant | "High Value, Narrow Domain" | "Deep Intelligence, Limited Scope" |
| Top-Right Quadrant | "Full Capability + Strategic" | "Full Intelligence + Full Coverage" |

---

## Technical Changes

**File:** `src/components/slides/Slide8PositioningMap.tsx`

### Change 1: Update Tooltip (Lines 72-74)
Change the tooltip label from "Depth" to "Intelligence" and update the scale display:

```tsx
// From:
Depth: <span className="text-foreground">{data.depth.toFixed(1)}/4.0</span>

// To:
Intelligence: <span className="text-foreground">{data.depth.toFixed(1)}/10</span>
```

### Change 2: Update Y-Axis Configuration (Lines 221-236)
Update the axis name and label to reflect intelligence maturity:

```tsx
// From:
name="Strategic Value"
label={{ value: "Cost Center → Revenue Generation", ... }}

// To:
name="Intelligence Maturity"
label={{ value: "Manual Reporting → Intelligent Operations", ... }}
```

### Change 3: Update Quadrant Labels (Lines 241-272)
Update each quadrant's sublabel to reinforce the intelligence narrative:

- **Basic Tools** (bottom-left): "Task-level Value" -> "Static Compliance"
- **Broad Tools** (bottom-right): "Breadth without Depth" -> "Data without Intelligence"
- **Specialists** (top-left): "High Value, Narrow Domain" -> "Deep Intelligence, Limited Scope"
- **Leaders** (top-right): "Full Capability + Strategic" -> "Full Intelligence + Full Coverage"

---

## Visual Impact

The updated Y-axis will communicate a clear intelligence maturity progression:

| Y Position | Intelligence Level | Description |
|------------|-------------------|-------------|
| 0-3 | Manual Reporting | Static data, manual processes, reactive compliance |
| 4-6 | Connected Data | Integrated systems, emerging automation, basic analytics |
| 7-10 | Intelligent Operations | AI-driven orchestration, predictive signals, closed-loop improvement |

This positions Comply365 at the apex of intelligence maturity (8/10), reinforcing why competitors lack the platform architecture for true operational intelligence.

