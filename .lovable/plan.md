

# Plan: Create Industry-Tailored Hero Copy for Solution Pages

## Goal

Update the hero subhead on each solution page to be tailored to the specific pains and value of that industry, while maintaining alignment with the core platform positioning (Operational Performance Platform for Safety, Content, and Training).

---

## Current State (Generic Copy)

All three solution pages currently use nearly identical hero subheads with only the industry name changed:

| Page | Current Subhead |
|------|-----------------|
| Airlines | "Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes **for airlines**." |
| Defense | "Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes **for defense operations**." |
| Rail | "Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes **for rail**." |

**Problem**: These are too generic and don't speak to the specific pains each industry faces.

---

## Proposed Industry-Tailored Hero Copy

### Airlines Page

**Pain points** (from challenges):
- FOQA data isolation
- Manual coordination between safety/content/training teams
- Audit scrambles before FAA/EASA inspections
- Reactive training schedules

**Proposed subhead**:
> "From FOQA signal to crew action — automatically. Connect safety events, procedure updates, and targeted training into one governed system. Close investigations faster, eliminate audit scrambles, and prove continuous improvement to FAA and EASA."

---

### Defense Page

**Pain points** (from challenges):
- Maintenance data disconnected from training
- Manual airworthiness documentation
- Disparate training across units/platforms
- Reactive maintenance schedules

**Proposed subhead**:
> "Mission readiness demands connected systems. Unify maintenance signals, technical orders, and qualification management across platforms. Maintain continuous airworthiness, accelerate time-to-qualified, and deliver authority-ready compliance evidence."

---

### Rail Page

**Pain points** (from challenges):
- Signal failures logged separately from procedures
- Manual driver competency tracking
- Disparate safety reporting and training
- Reactive audit preparation for ORR/ERA

**Proposed subhead**:
> "From SPAD incident to driver action — governed and traceable. Connect safety events, rule book updates, and route competency management across your network. Reduce response times, maintain driver readiness, and stay inspection-ready for ORR and ERA."

---

## Files to Modify

### 1. `src/pages/solutions/AirlinesPage.tsx` (Line 83)

**Current:**
```tsx
subhead="Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes for airlines."
```

**Updated:**
```tsx
subhead="From FOQA signal to crew action — automatically. Connect safety events, procedure updates, and targeted training into one governed system. Close investigations faster, eliminate audit scrambles, and prove continuous improvement to FAA and EASA."
```

---

### 2. `src/pages/solutions/DefensePage.tsx` (Line 102)

**Current:**
```tsx
subhead="Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes for defense operations."
```

**Updated:**
```tsx
subhead="Mission readiness demands connected systems. Unify maintenance signals, technical orders, and qualification management across platforms. Maintain continuous airworthiness, accelerate time-to-qualified, and deliver authority-ready compliance evidence."
```

---

### 3. `src/pages/solutions/RailPage.tsx` (Line 102)

**Current:**
```tsx
subhead="Connect safety, content, and training into an intelligent operating platform. Turn signals into orchestrated change and measurable outcomes for rail."
```

**Updated:**
```tsx
subhead="From SPAD incident to driver action — governed and traceable. Connect safety events, rule book updates, and route competency management across your network. Reduce response times, maintain driver readiness, and stay inspection-ready for ORR and ERA."
```

---

## Copy Comparison Summary

| Industry | Pain Hook | Value Proposition | Proof/Regulatory |
|----------|-----------|-------------------|------------------|
| **Airlines** | FOQA signal to crew action | Close investigations faster, eliminate audit scrambles | FAA and EASA |
| **Defense** | Mission readiness demands | Maintain airworthiness, accelerate time-to-qualified | Authority-ready evidence |
| **Rail** | SPAD incident to driver action | Reduce response times, maintain driver readiness | ORR and ERA |

---

## Alignment with Platform Positioning

Each tailored subhead maintains alignment with the core platform narrative:

1. **"Operational Performance"** - Each speaks to performance outcomes (faster closure, readiness, reduced response times)
2. **"for Safety, Content, and Training"** - Each mentions the three domains in industry-specific terms
3. **"Turn signals into orchestrated change"** - Each starts with a signal and ends with coordinated action
4. **"Measurable outcomes"** - Each includes specific, tangible results (investigations, airworthiness, driver readiness)

