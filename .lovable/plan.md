

# Apply Executive Pitch Feedback (Items 2, 3, 4)

Skipping item 1 (trust bar numbers) per your request.

---

## Changes

### 1. Reframe Fuel Cost as Human-Factor Controllable
**File: `src/data/lineOfSightData.ts`** (lines 150-179)

- Rename `uc4` label from "Fuel Performance Degradation" → **"Human-Factor Fuel Variance"**
- Update description to focus on the procedural/training-controllable portion
- Reduce `costMidpoint` from `12,500,000` → **`2,000,000`** (the defensible subset: go-arounds, crew technique, procedural non-compliance)
- Update `costComponents` to reflect human-factor items only (e.g., "Procedural non-compliance burn", "Crew technique variance", "Go-around fuel impact")
- Update `costPerEvent` string accordingly

This will automatically reduce the computed total across all slides that use `useCases` (exec, ops, tech decks).

### 2. Update Narration Scripts
**File: `src/data/executivePitchNarration.ts`**

- **exec-slide-1** (line 22-23): Rewrite to frame the total as "human-factor controllable operational cost" — the cost of disconnection your people and processes can influence. Reference the methodology as the sell: "We help you identify your biggest human-factor cost driver and show what a small improvement is worth."
- **exec-slide-6** (line 57-58): Update the "one hundred and ten million" reference to match the new lower total.
- **exec-slide-7** (line 64-65): Remove the specific "fifty-plus airlines" and "one million frontline users" claims from the narration since trust bar is deferred — use softer language like "leading carriers across North America."

### 3. Update Slide Subtitle
**File: `src/components/exec-slides/ExecSlide1Problem.tsx`** (line 43)

- Change subtitle from "The annual cost of fragmented operations — calculated from real use cases, industry benchmarks, and defensible data." → **"The annual cost of operational disconnection — the human-factor costs your people and processes can influence."**

### 4. Phase vs Year Labels (Ops/Tech Decks)
**File: `src/components/ops-slides/OpsSlide7SteppingStones.tsx`** (lines 18, 28, 38)

- Change `year` values from "Year 1" / "Year 2" / "Year 3" → **"Phase 1"** / **"Phase 2"** / **"Phase 3"**

---

## Impact
- The dynamically computed total on `ExecSlide1Problem` will drop significantly (from ~$110M to a lower, defensible figure) since `uc4` cost drops from $40M to $6.4M annually
- All other slides referencing `useCases` (tech deck cost waterfall, ops outcomes, line of sight) will automatically reflect the new numbers
- No routing or structural changes

**4 files modified.**

