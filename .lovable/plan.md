

# Move "Line of Sight" Slide After "From Signal to Outcome"

## What's Changing

The "Line of Sight" slide currently sits at position 8 in the sales deck (after "Outcomes"). It will move to position 6, directly after "From Signal to Outcome" (currently position 5).

### New slide order:

| Position | Slide |
|----------|-------|
| 0 | Title |
| 1 | Problem |
| 2 | Why Now |
| 3 | Before/After |
| 4 | Solution |
| 5 | Use Case (From Signal to Outcome) |
| 6 | **Line of Sight** (moved up) |
| 7 | Journey |
| 8 | Outcomes |
| 9 | Why Us |
| 10 | Next Steps |

## Technical Details

### File: `src/pages/SalesDeck.tsx`

Move the Line of Sight entry in the `slides` array from index 8 to index 6 (right after the Use Case entry). No other file changes needed -- the slide numbers are assigned dynamically by array index.

