# Practice Center — slide↔buyer alignment review

## What's wrong today

Walking through the deck while the agent is live, four issues hurt the experience:

1. **Initial-slide noise.** The slide-change effect fires the moment the session connects on slide 0 (Title). The buyer is already mid-greeting ("Hi, I'm Alex…"), so it gets a *second* "rep just moved to slide 1: Title — stay silent" instruction on top of its opening. Confusing and duplicated.
2. **Divider slides treated like content slides.** Slides like `▸ DTOP`, `▸ Mobile`, `▸ Intelligence Layer`, `▸ Regulation Management`, `▸ 2026 Phased Roadmap` are 2-second transitions. The buyer should not ask "tell me more about ▸ DTOP" — they should wait for the next real slide. Today the silence timer fires on these and the buyer asks a question about a divider.
3. **Slide context is too thin.** The buyer only gets the slide *label* ("CoAnalyst"). It has no slide-specific focus, so questions drift to whatever the persona last cared about, not what's on screen. The HOUSE_RULES say "anchor to the slide's topic" but the agent has no topic to anchor to.
4. **Rapid slide flipping spams the agent.** If the rep clicks Next three times to skip dividers, three context updates get queued and the agent reacts to a stale slide. There's no debounce.
5. **No UI feedback.** The rep can't tell whether the buyer is "tracking" the current slide, listening, or about to ask a question. Silent until it talks.

## Goal

When the rep advances a slide, the buyer is **always aligned to what's on screen**, never asks about transition slides, never duplicates the opening, and the rep can *see* it's tracking.

## Changes

All frontend, no backend or agent-prompt changes other than data.

### 1. `src/data/execPitch3Slides.ts` — add per-slide focus

Add an optional `buyerFocus?: string` and `isTransition?: boolean` field to each slide. Examples:

- Title → `isTransition: true` (no buyer prompt; opening line covers it)
- Strategic Shift → focus: "the operational gap between data volume and decision speed"
- Customer Outcomes → focus: "named customer outcomes — push for proof and named references"
- The Platform → focus: "the unified platform vs point tools — push on integration, not features"
- ▸ DTOP / ▸ Mobile / ▸ Intelligence / ▸ Regulation / ▸ Roadmap → `isTransition: true`
- DTOP — System of Work → focus: "Detect → Trigger → Orchestrate → Prove and how it lands in the OCC"
- Unified Mobile → focus: "one shell for crew — adoption, offline, and clicks per task"
- Automation → focus: "what gets automated end-to-end and the human-in-the-loop boundary"
- Insights — Just Ask → focus: "natural-language access to operational data — who can ask what"
- CoAnalyst → focus: "~90% domain accuracy at L4–5 vs ~35% generic AI — push on how that's measured"
- CoAnalyst vs Generic AI → focus: "why generic AI fails on aviation context — proof, not claims"
- Recommendations & Prescriptive Actions → focus: "from recommendation to action — approval, audit, rollback"
- Regulation Management → focus: "tracing a reg change to an in-app procedure update"
- 2026 Phased Roadmap → focus: "locked dates, committed phases, and what's POC vs GA"
- Why Comply365 → focus: "the three differentiators — push for the next step / commercial path"

### 2. `src/pages/PracticeCenter.tsx` — fix the slide-change effect

Replace the current `useEffect` (lines 84–109):

- **Skip on first connect for slide 0.** Track `firstSlideAfterConnectRef`; if `currentSlide === 0` and the buyer's opening hasn't been heard yet (transcript has 0 buyer turns OR `lastNotifiedSlideRef.current === -1`), do not send a context update. Just `trackSlide` and arm the silence timer with a *longer* threshold (12s) so the opening can complete.
- **Skip transition slides entirely.** If `slide.isTransition`, just `trackSlide(slide.label)` for scoring telemetry and return — no context message, no silence timer. Buyer keeps listening for the next real slide.
- **Debounce rapid clicks.** Wrap the context send + timer arm in a 600ms debounce keyed on `currentSlide`. If the rep advances again within 600ms, the previous send is cancelled. Guarantees the agent only ever gets context for the slide the rep actually rests on.
- **Richer context message.** Use `slide.buyerFocus` when present:
  > "The rep just moved to slide N of M: '<label>'. Focus area: <buyerFocus>. Stay silent and let the rep walk you through it. Only respond when they speak."
- **Silence timer.** Same 8s threshold for content slides, 12s for slide 0. Skip if buyer is currently speaking (already done) and skip if `transcript.length` grew (already done). Add: skip if `currentSlide` is a transition (defensive — debounce should already prevent it).
- **Cleanup.** Both the debounce timeout and silence timeout cleared on slide change, disconnect, and unmount.

### 3. `src/pages/PracticeCenter.tsx` — small UI alignment cues

In the slide footer (the "Slide X / Y — Label" row at line ~277), add a subtle status pill on the right when connected:

- "● Buyer following" (emerald, when slide just changed and timer is armed)
- "● Buyer listening" (muted, default)
- "● Buyer speaking" (amber, when `session.isSpeaking`)
- Hide entirely on transition slides — replace with muted text "Section divider — buyer is waiting".

This is the only signal the rep needs; no countdown, no extra chrome.

### 4. Quick prompt nudge (no edge-function change)

In `src/lib/practice/buildAgentPrompt.ts` HOUSE_RULES, replace the slide-tracking line with:
> "When you receive a system note that the rep moved to a new slide, anchor your *next* question or reaction to that slide's topic and focus area. If a system note says the slide is a section divider, do nothing and wait for the next real slide."

That's it. No persona, scenario, or scoring changes.

## Verification (manual — Practice Center is voice-driven, no automated harness)

Run through these once after the change:

1. **Cold start.** Connect on Title slide → buyer greets and finishes; no duplicate "stay silent" context arrives; no silence question fires before the rep speaks.
2. **Skip three dividers fast.** Click Next four times across `▸ DTOP → DTOP slide → ▸ Mobile → Mobile slide`. Confirm only one context message lands (for the final slide rested on) and nothing about the dividers.
3. **Sit on a content slide silently.** Stay quiet 10s on Customer Outcomes → buyer asks a customer-outcomes-flavoured question (cite a named customer / proof).
4. **Pitch immediately after advancing.** Move to The Platform and start talking within 3s → no canned silence prompt fires; buyer reacts to what you said.
5. **Backwards navigation.** Press Left arrow back to a slide already shown → buyer gets a context update for the new slide; silence timer behaves the same.
6. **End mid-arming.** Move to a slide, immediately End the session → no stray context messages fire after disconnect.
7. **UI cues.** While connected, the footer pill cycles between "Buyer listening / following / speaking" correctly and shows "Section divider — buyer is waiting" on dividers.

## Out of scope

- No edge-function changes (`elevenlabs-roleplay-token`, `-score`, `-kb-sync` untouched).
- No `useRoleplaySession` API changes.
- No new scenarios, personas, or voice routing.
- No slide content rewrites.
