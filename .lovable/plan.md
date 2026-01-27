
# Plan: Align Pyramid and Maturity Curve Stage Names with AI Vision Terminology

## Summary

Update the pyramid (Value Pyramid slides) and maturity curve components to use consistent stage naming that aligns with the AI Vision slide:

| Stage | Current Name | New Name |
|-------|--------------|----------|
| Stage 3 | Connected Governance | Connected Governance (no change) |
| Stage 4 | Closed-Loop Operational Improvement | Intelligent Operations |
| Stage 5 | Predictive & Agentic Reliability | Predictive Operations |

This removes "Agentic" from Stage 5 and renames "Closed-Loop" to "Intelligent Operations" for consistency with the Intelligence Maturity Roadmap on the AI Vision slide.

---

## Files to Update

### 1. MaturityCurveVisualization.tsx (Standalone page)
**Location:** `src/components/MaturityCurveVisualization.tsx`

| Line | Current | New |
|------|---------|-----|
| 137 | `headline: "Closed-Loop Operational Improvement"` | `headline: "Intelligent Operations"` |
| 138 | `sublabel: "Intelligent Ops"` | `sublabel: "AI-Assisted Execution"` |
| 170 | `id: "AGENTIC"` | `id: "PREDICTIVE"` |
| 172 | `headline: "Predictive & Agentic Reliability"` | `headline: "Predictive Operations"` |
| 173 | `sublabel: "Autonomous Reliability"` | `sublabel: "AI-Accelerated Performance"` |

### 2. Slide5MaturityCurve.tsx (Slide deck version)
**Location:** `src/components/slides/Slide5MaturityCurve.tsx`

| Line | Current | New |
|------|---------|-----|
| 115 | `headline: "Closed-Loop Operational Improvement"` | `headline: "Intelligent Operations"` |
| 116 | `sublabel: "Intelligent Ops"` | `sublabel: "AI-Assisted Execution"` |
| 148 | `id: "AGENTIC"` | `id: "PREDICTIVE"` |
| 150 | `headline: "Predictive & Agentic Reliability"` | `headline: "Predictive Operations"` |
| 151 | `sublabel: "Autonomous Reliability"` | `sublabel: "AI-Accelerated Performance"` |
| 438-439 | Short label `"Predictive"` | Already correct |

### 3. Slide4ValuePyramid.tsx (Pyramid slide in deck)
**Location:** `src/components/slides/Slide4ValuePyramid.tsx`

| Line | Current | New |
|------|---------|-----|
| 12 | `headline: "Predictive & Agentic Reliability"` | `headline: "Predictive Operations"` |
| 13 | `sublabel: "AI-Accelerated"` | `sublabel: "AI-Accelerated Performance"` |
| 48 | `headline: "Closed-Loop Operational Improvement"` | `headline: "Intelligent Operations"` |
| 49 | `sublabel: "Outcome Engine"` | `sublabel: "AI-Assisted Execution"` |

### 4. CategoryPyramid.tsx (Standalone pyramid page)
**Location:** `src/components/CategoryPyramid.tsx`

| Line | Current | New |
|------|---------|-----|
| 12 | `headline: "Predictive & Agentic Reliability"` | `headline: "Predictive Operations"` |
| 13 | `sublabel: "AI-Accelerated"` | `sublabel: "AI-Accelerated Performance"` |
| 48 | `headline: "Closed-Loop Operational Improvement"` | `headline: "Intelligent Operations"` |
| 49 | `sublabel: "Outcome Engine"` | `sublabel: "AI-Assisted Execution"` |

---

## Updated Stage Terminology Reference

| Stage | Headline | Sublabel | Key Theme |
|-------|----------|----------|-----------|
| **1** | Fragmented & Reactive | Manual / Reactive | Starting point |
| **2** | Managed (Siloed) Compliance | Silo Optimisation | Best-in-class products |
| **3** | Connected Governance | Closed Loop | Platform foundation |
| **4** | Intelligent Operations | AI-Assisted Execution | AI-assisted workflows |
| **5** | Predictive Operations | AI-Accelerated Performance | Predictive + proactive |

---

## Technical Details

### Change Summary by File

**MaturityCurveVisualization.tsx:**
- Line 137: Update Stage 4 headline
- Line 138: Update Stage 4 sublabel
- Line 170: Update Stage 5 id from "AGENTIC" to "PREDICTIVE_OPS"
- Line 172: Update Stage 5 headline
- Line 173: Update Stage 5 sublabel

**Slide5MaturityCurve.tsx:**
- Line 115: Update Stage 4 headline
- Line 116: Update Stage 4 sublabel
- Line 148: Update Stage 5 id from "AGENTIC" to "PREDICTIVE_OPS"
- Line 150: Update Stage 5 headline
- Line 151: Update Stage 5 sublabel

**Slide4ValuePyramid.tsx:**
- Line 12: Update Level 5 headline
- Line 13: Update Level 5 sublabel
- Line 48: Update Level 4 headline
- Line 49: Update Level 4 sublabel

**CategoryPyramid.tsx:**
- Line 12: Update Level 1 (apex) headline
- Line 13: Update Level 1 sublabel
- Line 48: Update Level 2 headline
- Line 49: Update Level 2 sublabel

---

## Narrative Alignment

After these changes, the full maturity progression will read:

```text
Stage 1: Fragmented & Reactive
Stage 2: Managed (Siloed) Compliance  
Stage 3: Connected Governance ← Platform foundation
Stage 4: Intelligent Operations ← AI-assisted execution
Stage 5: Predictive Operations ← AI-accelerated performance
```

This creates a seamless narrative connection between:
- **Slide 6** (Operational Performance Ladder / Pyramid)
- **Slide 7** (Operational Performance Roadmap / Curve)
- **Slide 10** (Becoming an AI Company / Intelligence Maturity Roadmap)

The terminology now consistently emphasizes "operations" and "intelligence" rather than "agentic" or "closed-loop", reinforcing the platform's value story of using data and AI to drive better operational performance.
