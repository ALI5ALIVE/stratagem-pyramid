## Sales Enablement narration cleanup

Reviewed `src/data/salesEnablementNarration.ts` against the live slide order in `src/pages/SalesEnablement.tsx`. Several scripts still reference slides that have been removed or reordered (most notably the old "cost-of-inaction" slide in the Strategic Shift transition), and there are two orphan narration entries for divider slides that no longer exist.

### Fixes

**1. `se-slide-shift` — remove "what it costs them" reference**
Current closing line: *"The next slide quantifies what it costs them to live in the old model."*
The cost-of-inaction slide was removed; the next slide is now the plain-English "Why This Matters" slide.
→ Replace with: *"The next slide says it in plain English — why this shift matters to them, in three lines you can repeat in any room."*

**2. `se-slide-dtop` — fix transition to whiteboard drill**
Current closing line: *"Next: the value this loop unlocks."*
DTOP is no longer followed by Value — it's followed by the whiteboard drill, then the runbook, then signals.
→ Replace with: *"Next we drill the loop on a whiteboard — because the rep who can draw DTOP in ninety seconds wins the room."*
Also keep the existing Signals Specialist Playbook pointer at the end.

**3. `se-slide-dtop-whiteboard-runbook` — add transition to signals slide**
Currently ends with no bridge.
→ Append: *"Next we zoom into the Detect layer — the six signal sources behind every trigger."*

**4. `se-slide-outcomes` — fix transition to objections**
Current closing line: *"Next: why we win."*
Customer Outcomes is now followed by Objections, not Why Comply365.
→ Replace with: *"Next: the three objections every prospect raises, and how to answer them in three steps."*

**5. `se-slide-mobile` — tighten transition**
Current closing references "the capability cheat sheet — your study page before every call." The next slide is the Capability Talk Track. Talk Track *is* the cheat-sheet rehearsal slide so this is acceptable, but rename for clarity.
→ Replace final sentence with: *"Next: the capability talk track — one plain-English line and one discovery question per capability, ready to rehearse."*

**6. Remove orphan narration entries**
`se-module-5` and `se-module-6` are narrations for divider slides that no longer exist in the deck (the deck only has `se-week-1`, `se-week-2`, `se-week-3` dividers). Delete both entries.

### Out of scope
- No slide additions/removals in `SalesEnablement.tsx` — narration only.
- No changes to other narration files (Exec/Tech/Ops decks).
- No copy edits beyond fixing stale slide references and broken transitions.

### Verification
After edits, every script's "Next: …" line will point at a slide that actually exists in the current `slides[]` array, and no narration entries reference removed dividers.
