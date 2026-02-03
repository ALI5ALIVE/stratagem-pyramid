

# Plan: Fix Use Cases Narration-Animation Sync and Layout Issues

## Issues Identified

1. **DTOP not read out fully**: The script says "DTOP operating model" which TTS will read as individual letters
2. **Animation timing mismatch**: Current thresholds (20%, 45%, 70%) don't align with the new longer script
3. **Bottom callout overlap**: The stat box overlaps expanded card content due to `flex-1` on the grid

---

## Changes Required

### File 1: `src/data/slideNarration.ts`

#### Update DTOP pronunciation (line 40)

Replace "DTOP operating model" with "Detect, Trigger, Orchestrate, Prove operating model" so TTS reads it naturally.

**Current:**
```
"Let me show you what the DTOP operating model looks like in practice..."
```

**New:**
```
"Let me show you what the Detect, Trigger, Orchestrate, Prove operating model looks like in practice..."
```

Also at the end of the script, update the closing line from:
```
"Notice the pattern: each use case follows Detect, Trigger, Orchestrate, Prove."
```
This is already spelled out, so no change needed there.

---

### File 2: `src/components/slides/SlideUseCases.tsx`

#### Change 1: Refine animation timing thresholds (lines 138-143)

The new script is approximately 90 seconds long. Based on the content timing:
- **0-8%**: Introduction ("Let me show you what the Detect, Trigger, Orchestrate, Prove operating model looks like...")
- **8-35%**: First use case (Personalized Pilot Training) - starts around "First: Personalized Pilot Training"
- **35-62%**: Second use case (Smoke & Fumes) - starts around "Second: Smoke and Fumes Detection"
- **62-88%**: Third use case (Hydraulic Switch) - starts around "Third: Hydraulic Switch Error"
- **88-100%**: Closing ("Notice the pattern...")

**Current code:**
```tsx
const getActiveIndex = () => {
  if (progress < 20) return -1;
  if (progress < 45) return 0;
  if (progress < 70) return 1;
  return 2;
};
```

**New code:**
```tsx
const getActiveIndex = () => {
  if (progress < 8) return -1;   // Introduction
  if (progress < 35) return 0;   // Pilot Training
  if (progress < 62) return 1;   // Smoke & Fumes
  if (progress < 88) return 2;   // Hydraulic Switch
  return -1;                     // Closing - all cards visible
};
```

#### Change 2: Fix bottom callout overlap (lines 162, 187, 320-326)

The issue is that the grid has `flex-1` which makes it grow to fill space, but when cards expand they can push the bottom callout off-screen or overlap.

**Solution**: 
1. Give the Use Cases Grid a `max-h` constraint
2. Move the bottom callout outside the flex container to prevent overlap
3. Add `pb-4` padding to ensure space for the callout

**Current structure:**
```tsx
<div className="h-full flex flex-col gap-4">
  {/* DTOP Legend */}
  <div>...</div>
  
  {/* Use Cases Grid - flex-1 causes it to grow */}
  <div className="grid ... flex-1 min-h-0 overflow-y-auto">
    ...
  </div>
  
  {/* Bottom callout - can overlap */}
  <div className="bg-gradient-to-r ...">
    ...
  </div>
</div>
```

**New structure:**
```tsx
<div className="h-full flex flex-col gap-3">
  {/* DTOP Legend */}
  <div>...</div>
  
  {/* Use Cases Grid - constrained height */}
  <div className="grid ... flex-1 min-h-0 overflow-visible">
    ...
  </div>
  
  {/* Bottom callout - more padding, always visible */}
  <div className="bg-gradient-to-r ... mt-auto shrink-0">
    ...
  </div>
</div>
```

#### Change 3: Update slideNumber prop (line 153)

The slide is currently showing `slideNumber={6}` but it's at deck position 5.

**Current:**
```tsx
slideNumber={6}
```

**New:**
```tsx
slideNumber={5}
```

---

## Summary of Changes

| File | Change | Purpose |
|------|--------|---------|
| `src/data/slideNarration.ts` | Replace "DTOP" with "Detect, Trigger, Orchestrate, Prove" | TTS reads full phrase |
| `src/components/slides/SlideUseCases.tsx` | Update `getActiveIndex()` thresholds to 8%, 35%, 62%, 88% | Sync card highlights with narration |
| `src/components/slides/SlideUseCases.tsx` | Fix bottom callout with `mt-auto shrink-0` | Prevent overlap with expanded cards |
| `src/components/slides/SlideUseCases.tsx` | Update slideNumber from 6 to 5 | Correct slide numbering |

---

## Visual Animation Flow

| Progress | Active Card | Visual State |
|----------|-------------|--------------|
| 0-8% | None | All cards dimmed, intro plays |
| 8-35% | Pilot Training | Card 1 highlighted + expanded |
| 35-62% | Smoke & Fumes | Card 2 highlighted + expanded |
| 62-88% | Hydraulic Switch | Card 3 highlighted + expanded |
| 88-100% | None | All cards visible, closing summary |

