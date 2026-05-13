# Practice Center — Medium Pitch Focus + Live Slides + Mic Fix

## Goal

Make the Practice Center a single, working role-play around the **Medium — Executive Pitch** deck:
- Only Medium scenarios are listed
- The Medium pitch slides display live next to the transcript so the rep can present while talking
- The voice agent reliably hears the rep's replies (currently only the agent talks; rep audio doesn't get picked up)

## Scope

### 1. Trim scenarios to Medium only
In `src/data/practiceScenarios.ts`, keep only the two Medium Executive Pitch scenarios (`exec-medium-cfo` and `exec-medium-ceo`) and remove the Operational, Technical, CoAnalyst, Customer Overview, and Playbook entries. Default selection becomes `exec-medium-cfo`.

If you'd rather see a single scenario in the list, we can collapse to just CFO — call it out and I'll cut to one.

### 2. Embed the Medium pitch slides in Practice Center
Restructure `src/pages/PracticeCenter.tsx` into a 3-column layout on large screens:

```text
┌──────────────┬──────────────────────────┬──────────────┐
│  Scenario +  │   Live Pitch Slides      │  Transcript  │
│  Difficulty  │   (Medium Exec Pitch)    │  + Controls  │
│  + Setup     │   prev / next / counter  │  + Score     │
└──────────────┴──────────────────────────┴──────────────┘
```

- Reuse the existing slide components from `src/pages/ExecutivePitch3.tsx` (same `slides[]` array). Extract that array into a small shared module (e.g. `src/data/execPitch3Slides.ts`) so both the full deck page and the Practice Center render the same slides — no duplication.
- Practice Center mounts one slide at a time inside a fixed-aspect container (16:9) with simple ◀ / ▶ controls and a `Slide X / N` counter. No sidebar, no narration bar — just the visual.
- On medium screens, slides stack above the transcript; on mobile, slides hide behind a "Show slides" toggle.

### 3. Fix the agent not hearing the rep
Two suspected causes, both addressed:

a. **Mic not pre-warmed.** The current `start()` hands straight to `Conversation.startSession` without calling `navigator.mediaDevices.getUserMedia({ audio: true })` first. On some browsers the SDK's internal mic acquisition silently fails or attaches to the wrong stream. Re-add the explicit `getUserMedia` call before `startSession` and keep the stream alive for the duration of the session (stop tracks only in `end()`).

b. **Contextual update colliding with first turn.** Right now we fire `sendContextualUpdate(prompt)` inside `onConnect`, which on some agent configs suppresses the first user turn detection. Move the contextual update to fire **after** the agent's first message arrives (detect via `onMessage` with `source === "ai"`, send once, then no more). This keeps the persona context but doesn't interfere with VAD / turn-taking on connect.

If the agent still doesn't hear the rep after both fixes, the next step is to switch `connectionType` from `"websocket"` to `"webrtc"` (lower-latency path with native mic handling) — leaving that as a fallback toggle, not the default.

### 4. UI cleanup
- Remove the "Add agent ID" empty-state and the Agent Setup panel from the default view (the agent ID is hardcoded now). Move it behind a small "Advanced" link in case we need to override later.
- Update the page subtitle to: "Present the Medium Executive Pitch live to an AI buyer. Slides on the left, transcript on the right."

## Acceptance criteria

- `/practice-center` lists only Medium Executive Pitch scenarios.
- The Medium pitch slides render inside Practice Center with prev/next controls and stay in sync regardless of role-play state.
- Pressing Start opens the call; the rep speaks and **the agent responds to what was said** (transcript shows both `You` and `Buyer` turns).
- Ending the session and pressing Score still produces a scorecard.

## Out of scope

- Auto-advancing slides based on transcript content
- Changes to the actual slide components themselves
- Other pitch decks (Operational, Technical, etc.) — they stay in the codebase, just not surfaced in Practice Center
