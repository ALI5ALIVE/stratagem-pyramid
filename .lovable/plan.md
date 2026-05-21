## Change

Single-file edit to `src/components/sales-enablement-slides/SEDiscoveryCallRunbook.tsx`.

## Problem

Current slide reads like a runbook *description* — "Do this: thank them, state the agenda, ask permission". The rep gets the shape of the call but no live script. User wants a **simulation**: drop into the call at minute 0 and read it out loud.

## New structure (same 5 time-boxed blocks, rewritten)

Each block keeps `minutes / title / icon / accent`. Rewrite the two columns so they are a moment-by-moment script, not an overview:

- **Do (left column) → "Move"**: the physical/tactical action in 1 short imperative sentence ("Camera on. Notebook visible. No deck shared yet."). No meta-commentary about why.
- **Say (right column) → "Script"**: verbatim words in quotes, in the **actual order they come out of the rep's mouth**, including the pauses and the follow-up question. Multi-line where the call has multiple beats.

### Block-by-block rewrite

1. **0–2 min · Open**
   - Move: "Camera on. Smile. Don't share screen yet."
   - Script: greeting → one-line agenda → permission-to-ask → silent pause.

2. **2–10 min · Frame**
   - Move: "Share one slide only — the DTOP loop. Point at Detect."
   - Script: plain-English framing of prescriptive→performance shift, ending with "Does that match what you see?" then **stop talking**.

3. **10–35 min · Discover** (55% of the call)
   - Move: "Stop sharing. Open notebook. Ask one question, then count to ten before speaking."
   - Script: three discovery questions delivered in order, each with the **silence instruction** between them ("…wait. Don't fill the gap.").

4. **35–45 min · Qualify + Next step**
   - Move: "Reflect back the use case that hurt most. Put the calendar on screen."
   - Script: the playback line ("Based on what you said…") → the named next step → the calendar ask, with the date in brackets.

5. **Anytime · If they push back**
   - Move: "Don't defend. Trade."
   - Script: 2–3 verbatim objection→response pairs as they would actually be spoken back, not bullet summaries.

## Keep

- Slide id, title, subtitle, container, layout grid, icons, accent colors, narration props.
- Header labels can change from "Do this / Say this" to **"Move" / "Script"** to reinforce the simulation framing.

## Out of scope

- No narration script changes.
- No other slides touched.
- No visual / layout / color changes beyond the two header labels.
