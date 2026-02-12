

# Change KPI Tree Line Colouring to Use Hovered Executive's Colour

## What Changes

When hovering an executive outcome (CFO/CEO/COO), **all** connected lines -- both the LM-to-EO lines and the UC-to-LM lines -- will use that executive's single colour (green for CFO, orange for CEO, blue for COO). This replaces the current "dominant stakeholder" approach where UC-to-LM lines could show mixed colours.

## Technical Details

### File: `src/components/slides/LineOfSightTree.tsx`

**1. Update UC-to-LM line stroke colour (lines 206-215)**

Currently the stroke uses `getLmColor(lmId)` which picks the dominant stakeholder colour. The change adds logic to check if an EO is highlighted -- if so, use that EO's accent colour for all connected lines instead.

```
// Current
stroke={getLmColor(lmId)}

// New logic
stroke={
  highlighted?.type === "eo"
    ? accentColors[executiveOutcomes.find(e => e.id === highlighted.id)?.accentColor ?? ""]?.line ?? getLmColor(lmId)
    : getLmColor(lmId)
}
```

This means:
- **No hover**: lines use the dominant-stakeholder colour (unchanged default)
- **Hovering CFO**: all visible UC-to-LM lines turn green
- **Hovering CEO**: all visible UC-to-LM lines turn orange
- **Hovering COO**: all visible UC-to-LM lines turn blue
- **Hovering a UC or LM**: lines still use dominant-stakeholder colour (only EO hover triggers the override)

**2. No other changes needed**

The LM-to-EO lines already use the EO's own colour via `accentColors[color]?.line`, so they naturally show the correct colour. The highlight visibility logic (`isConnectionHighlighted`) already correctly filters which lines are visible, so only the stroke colour needs updating.

