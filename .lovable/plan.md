# Add signal definition to Frame block

**File:** `src/components/sales-enablement-slides/SEDiscoveryCallRunbook.tsx`
**Scope:** Frame block `say:` array only. No other blocks, no layout, no narration data, no other files.

## Change

Insert one new verbatim line at the **top** of the Frame block's `say:` array so the rep defines "signal" before using the term:

```
"By signal I just mean anything that should change what your team does next — a new reg, an audit finding, a safety event, an ops change. Could be one a week, could be ten a day."
```

The existing three lines remain in order beneath it:
1. *(new)* Signal definition (above)
2. "Most operators we talk to are strong at spotting safety and compliance signals."
3. "Where it usually breaks down is the middle bit — deciding what to change, getting that change into manuals and training, and then proving to a regulator it actually reached the crew."
4. "Does that match what you see?"
5. → Stop sharing the slide. Listen.

## Why

The Week 3 recap slide flags "what are signals?" as one of the two top customer questions. Defining it up front in Frame prevents the most common interruption and mirrors the answer already standardized elsewhere in the deck.

## Out of scope

- Open / Discover / Qualify / Pushback blocks
- The `do:` (Move) column
- Narration script in `salesEnablementNarration.ts`
- Any visual, layout, or styling change
