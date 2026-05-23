Remove the Q&A act from the keynote agenda on `src/pages/keynote/SilosToSignalsKeynote.tsx`.

## Changes

1. Delete the `qa` entry from the `acts` array (lines ~111–118).
2. Update the hero subhead from "Seven acts, one 2-minute film, one ask of the room." — keep as is (already accurate).
3. Update the EnergyBar header from "35 min on stage · 5 min Q&A" → "35 min on stage".
4. Update the energy curve total: the bar widths divide by 40 minutes. Either re-base to 35 min, or extend the final act `call-to-arms` end to 35 and rebase divisor to 35. Cleanest: change the divisor from 40 → 35 and the bottom timeline markers from "0:00 / 10:00 / 20:00 / 30:00 / 40:00" → "0:00 / 10:00 / 20:00 / 30:00 / 35:00".
5. Remove the unused `Users` icon import (only Q&A used it).

No other files affected.
