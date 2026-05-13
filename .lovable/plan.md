# Practice Center — easier to use + full persona roster

## Goals
1. Make the Practice Center frictionless for delivering the Medium Executive Pitch.
2. Let the user toggle between the **5 real buyer personas** (CEO/COO, VP Safety, VP Ops, Training Director, CIO/IT) and feel a genuinely different conversation each time — different voice, lens, objections, and scorecard.

---

## Part 1 — UX simplification (Practice Center page)

Today the page works but is busy: two button rows, a sync button, an external open-deck link, a small slide stage, and a tall right column.

Changes:
- **Single guided header strip**: replace the two separate rows ("Buyer" + "Difficulty") with one compact horizontal control with three dropdown-style segments — `Persona ▾`, `Difficulty ▾`, `Voice ▾` — plus a single primary **Start call** button on the right. State of the rest of the UI defers to this strip.
- **First-run coach panel**: when no session has started, the right column shows a 3-step "How this works" card (1. Pick a buyer · 2. Hit Start and allow mic · 3. Deliver each slide, advance with → key). Disappears once a session starts — replaced by transcript.
- **Bigger slide stage**: switch grid from `1.6fr,1fr` to `2fr,1fr` on `lg`, and let the stage column expand to fill the viewport height (min `70vh`) so slides are readable. Drop the fixed 16:9 aspect cap.
- **Slide rail underneath**: a thin horizontal scrollable strip of slide labels (clickable chips) under the stage, with the current one highlighted, so the rep can jump without arrowing through 19 slides. Keyboard ←/→ still works.
- **Move "Sync knowledge base" + "Open deck full screen"** into a small overflow `…` menu in the header — they're admin/utility, not core flow.
- **Persistent footer hint** while connected: "Press → for next slide · the buyer is reacting to: *<current slide label>*." Reinforces the link between slide and buyer behavior.
- **Auto-scroll the transcript** (already present) + show the buyer's persona avatar/initials at the top of the transcript card so it's clear *who* you're talking to.
- **Scorecard** stays where it is but collapses by default until the session ends.

## Part 2 — Add all 5 personas as scenarios

`src/data/practiceScenarios.ts` currently has 2 scenarios that both target `ceo-coo`. Replace with **one scenario per persona** (all bound to the Medium Executive Pitch deck, route `/pitch-executive-3`):

| Scenario id | Persona | Voice | Default difficulty hint |
|---|---|---|---|
| `exec-medium-ceo-coo` | CEO / COO | George (measured exec male) | Skeptical |
| `exec-medium-vp-safety` | VP Safety | Laura (analytical female) | Skeptical |
| `exec-medium-vp-ops` | VP Operations | Brian (commanding male) | Hostile (time-pressed) |
| `exec-medium-training` | Training & L&D Director | Jessica (engaging female) | Friendly |
| `exec-medium-cio-it` | CIO / IT Director | Eric (technical male) | Skeptical |

Each scenario pulls its `keyMessages` from the matching persona's existing `decisionCriteria` + top 2 strategic priorities so the scorer grades the *right* messages for *that* buyer (e.g. CIO scenario rewards integration/security mentions, Training scenario rewards adoption/competency mentions).

`buyerLabel` becomes the persona title (e.g. "VP Safety — risk & compliance lens"). The persona tab UI in the header uses the persona's existing `iconName` + `color` from `personaProfiles.ts` for visual differentiation.

## Part 3 — Distinct AI behavior per persona

`src/lib/practice/buildAgentPrompt.ts` already loads persona profile and injects priorities, pains, objections, and discovery questions. Tighten so persona truly drives behavior:

- Add an explicit **"YOUR LENS"** line at the top of the persona block: e.g. *"You evaluate everything through cost & ROI"* (CEO), *"…through systemic risk and audit findings"* (Safety), *"…through delay/cancellation impact and crew workflow"* (Ops), *"…through learner adoption and competency outcomes"* (Training), *"…through integration, identity, and security"* (CIO).
- Inject **2 of the persona's `objections` as required pushbacks** the agent must raise during the call.
- Inject **3 of the persona's `discoveryQuestions`** as questions the agent should ask if the rep doesn't volunteer the answer.
- The slide-context note (already sent on slide change) gets a per-persona suffix: e.g. CIO asks an integration/security flavored question on every slide; Training asks an adoption/rollout flavored question.

This is what makes the toggle feel *different* — same deck, fundamentally different conversation.

## Part 4 — Voice routing

Voice id is already on the scenario (`voiceId`), but the ElevenLabs agent currently uses its own configured voice. Two options:
- **A (preferred, no agent edit)**: pass `overrides.tts.voice_id = scenario.voiceId` to `Conversation.startSession`. Update `useRoleplaySession.start` to accept and forward the voice override.
- **B**: leave voice fixed and drop the per-persona voice column. Less differentiation.

Plan is **A** — small change in the hook, the agent already supports voice override.

## Part 5 — Scorer per persona

`elevenlabs-roleplay-score` already takes `personaTitle` and `keyMessages`. No edge function changes needed — the new persona-specific `keyMessages` flow through automatically and the rubric will grade against them.

---

## Files to touch
- `src/data/practiceScenarios.ts` — replace 2 scenarios with 5 persona-bound scenarios; pull keyMessages from `personaProfiles`.
- `src/lib/practice/buildAgentPrompt.ts` — add persona LENS, required objections, required discovery questions; richer slide-change context.
- `src/hooks/useRoleplaySession.ts` — accept and forward `voiceId` as ElevenLabs `overrides.tts.voice_id`.
- `src/pages/PracticeCenter.tsx` — UX rework: single control strip, larger stage, slide chip rail, first-run coach card, overflow menu for sync/open-deck, collapsible scorecard, persona avatar on transcript header.

## Out of scope
- No changes to the Medium pitch deck slides themselves.
- No changes to scoring edge function or KB sync function.
- No new database tables (session history persistence is a separate ask).
