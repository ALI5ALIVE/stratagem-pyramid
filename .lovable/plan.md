## Hide Deal-Stage slide & fix W3 transitions

After removing Objections, Competitive Cheat Sheet, and Deal-Stage Next-Step Language, the remaining tail of Week 3 will be:

```
... → Persona Playbook → Customer Outcomes → Strategy & Vision Session → Capstone
```

### 1. Remove the Deal-Stage slide
**File:** `src/pages/SalesEnablement.tsx`
- Delete the slide entry `{ id: "se-deal-stage-language", ... }` (line 165).
- Delete the now-unused `import SEDealStageLanguage ...` line.

### 2. Fix the one broken transition: Customer Outcomes → ?
The Customer Outcomes narration currently ends with:
> "Next: objections — the eight pushbacks you'll hear, with Acknowledge, Reframe, Bridge, and the proof artifact to send within the hour."

It needs to lead into **Strategy & Vision Session** instead. New ending:
> "Next: the Strategy and Vision Session — the complimentary three-hour workshop you can offer in the room, the one that lifts the conversation from features to operating model."

**File:** `src/data/salesEnablementNarration.ts` (slide `se-slide-outcomes`).

### 3. Other transitions — already clean
- **Persona Playbook** already ends teeing up Customer Outcomes (fixed in the previous turn).
- **Strategy & Vision Session** already ends with "Next, and last in Week 3 — the capstone…" — matches the new flow.
- **Capstone** is terminal — no change needed.

No other narrations reference the removed slides.