# Slide-change behavior: rep speaks first, buyer waits

## Today
On every slide change, `PracticeCenter.tsx` immediately tells the buyer agent: "Ask ONE short buyer-style question about this slide." The buyer talks first, every slide. That's not how a real meeting works — the rep should introduce the slide; the buyer reacts.

## Goal
When the rep advances a slide:
1. Tell the buyer the new slide context, but instruct it to **stay silent and listen** for the rep's pitch on this slide.
2. If the rep speaks within a short window, the buyer just reacts naturally (existing behavior — no extra prompt needed).
3. If the rep stays silent for ~8 seconds after advancing, prompt the buyer to ask one short question about the slide.

Applies to every slide change while the session is connected.

## Changes (frontend only)

**`src/pages/PracticeCenter.tsx`** — replace the current slide-change `useEffect` (lines ~83–94):

- On slide change while connected:
  - `session.trackSlide(slide.label)` (unchanged).
  - `session.sendContext(...)` with a **listen-first** instruction, e.g.:
    > "The rep just moved to slide N of M: '<label>'. Stay silent and let the rep walk you through this slide. Only respond when they speak. If they ask you something, react in character."
  - Capture `transcript.length` at that moment as `baselineLen`.
  - Start an 8-second `setTimeout`. When it fires, check:
    - session still connected, still on the same slide, and
    - `session.transcript.length === baselineLen` (rep hasn't spoken — no new turns at all), and
    - not currently speaking (`!session.isSpeaking`).
  - If all true, `session.sendContext(...)` with the existing "Ask ONE short buyer-style question that probes THIS slide's topic. <flavor> Stay in character." prompt.
  - Cleanup: clear the timeout on slide change, disconnect, or unmount.

- Keep the existing `lastNotifiedSlideRef` reset effect.

Silence threshold: **8 seconds** (tunable constant `REP_SILENCE_MS = 8000` at top of file).

## Out of scope
- No edge-function changes.
- No changes to `useRoleplaySession` API — uses existing `sendContext`, `trackSlide`, `transcript`, `status`, `isSpeaking`.
- No new persona/voice configuration.

## Verification
1. Start a session, advance a slide, stay silent → buyer asks a question after ~8s.
2. Advance a slide and immediately start pitching → buyer listens, reacts naturally, no canned question fires.
3. Advance two slides quickly → only the latest slide's silence timer is active; earlier timer is cancelled.
4. End session → no pending timers fire.
