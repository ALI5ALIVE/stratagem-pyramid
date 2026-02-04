
# Plan: Address Stakeholder Feedback

## Summary of Feedback

The stakeholder feedback covers four areas:

1. **Replace "Charlotte" with "LaGuardia"** - Charlotte is a hub for one specific airline (American Airlines), which could reveal the customer. LaGuardia has three major airlines (Delta, American, United) plus others, making it safer.

2. **Check product name spacing** - Ensure consistency between "Comply365" (no space) and "Manager 365" (has a space). The recommendation is to use "Manager365" without a space.

3. **Replace "FOQA" with "Foqua" in narration** - For text-to-speech pronunciation. The acronym should remain "FOQA" in visible UI text but be spelled phonetically as "Foqua" in narration scripts so the TTS engine pronounces it correctly.

4. **"OPP" abbreviation concern** - Good news: The abbreviation "OPP" is **not used anywhere** in the current codebase. The platform is always referred to by its full name "Operational Performance Platform." No changes required, but this should remain a "do not use" rule going forward.

---

## Files to Modify

### 1. `src/data/slideNarration.ts`

**Charlotte to LaGuardia** (2 changes):
- Line 40: `"...uncovers a cluster around Charlotte hub during de-icing operations..."` → `"...uncovers a cluster around LaGuardia hub during de-icing operations..."`
- Line 58: `"...When smoke and fumes cluster at Charlotte hub, de-icing procedures are revised..."` → `"...When smoke and fumes cluster at LaGuardia hub, de-icing procedures are revised..."`

**FOQA to Foqua** (4 changes):
- Line 34: `"...from Flight Ops Quality Assurance..."` (already expanded - keep as is for explanation)
- Line 40: `"Detect: FOQA data reveals..."` → `"Detect: Foqua data reveals..."`
- Line 52: `"Flight Ops Quality Assurance data flags..."` (already expanded - keep as is)
- Line 58: `"When FOQA detects..."` → `"When Foqua detects..."`
- Line 64: `"Pattern detection from FOQA/ASAP/crew reports..."` → `"Pattern detection from Foqua, ASAP, and crew reports..."`

### 2. `src/data/salesDeckNarration.ts`

**FOQA to Foqua** (3 changes):
- Line 13: `"FOQA flags a hard landing trend on Monday..."` → `"Foqua flags a hard landing trend on Monday..."`
- Line 25: `"...Detect surfaces signals from across your operation — FOQA, ASAP, audits, ops data..."` → `"...Detect surfaces signals from across your operation — Foqua, ASAP, audits, ops data..."`
- Line 29: `"Hard landing detection: FOQA flags a trend..."` → `"Hard landing detection: Foqua flags a trend..."`

### 3. `src/components/PlatformEcosystemDiagram.tsx`

**Manager 365 to Manager365** (3 changes):
- Line 24: `subtitle: "Manager 365"` → `subtitle: "Manager365"`
- Line 32: `subtitle: "Manager 365"` → `subtitle: "Manager365"`
- Line 40: `subtitle: "Manager 365"` → `subtitle: "Manager365"`

---

## What Stays the Same

The following **UI components** display "FOQA" as visible text and should **remain unchanged** (only narration scripts get the phonetic spelling):

| File | Context |
|------|---------|
| `src/pages/HomepageMockup.tsx` | DTOP step detail |
| `src/pages/solutions/AirlinesPage.tsx` | Industry-specific content |
| `src/components/slides/Slide3OperatingModel.tsx` | DTOP operating model |
| `src/components/slides/SlideUseCases.tsx` | Use case cards |
| `src/components/slides/SlideAIVision.tsx` | AI vision slide |
| `src/components/sales-slides/SalesSlide1Problem.tsx` | Problem timeline |
| `src/components/sales-slides/SalesSlide4Solution.tsx` | Solution slide |
| `src/components/sales-slides/SalesSlide5UseCase.tsx` | Use case slide |

These use "FOQA" as a professional industry acronym in the visual presentation - it's only the spoken narration that needs the phonetic spelling.

---

## "OPP" Abbreviation Status

**Current state:** Not used in the codebase.

**Recommendation:** The platform is consistently referred to as:
- "Operational Performance Platform" (full name)
- "The platform" (shorthand)
- "DTOP" (for the operating model: Detect, Trigger, Orchestrate, Prove)

No code changes needed, but this feedback should inform future content decisions. The abbreviation "OPP" should be avoided.

---

## Summary of Changes

| File | Change Type | Count |
|------|-------------|-------|
| `src/data/slideNarration.ts` | Charlotte → LaGuardia | 2 |
| `src/data/slideNarration.ts` | FOQA → Foqua | 3 |
| `src/data/salesDeckNarration.ts` | FOQA → Foqua | 3 |
| `src/components/PlatformEcosystemDiagram.tsx` | Manager 365 → Manager365 | 3 |
| **Total** | | **11 text changes** |
