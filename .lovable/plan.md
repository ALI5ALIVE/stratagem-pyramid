## Goal
Insert a **DTOP Whiteboard Coaching Session** — two new slides immediately after the existing `se-slide-dtop` in the Sales Enablement Academy — that teach reps *how to draw and run* the DTOP loop on a whiteboard in front of a live customer. This is "learn by drawing", not "look at a diagram".

## Why a whiteboard session for DTOP
The DTOP slide already explains *what* DTOP is. What reps actually fail at in the room is **drawing it themselves** when the customer asks "show me what you mean." A whiteboard ritual gives them:
- A muscle-memory sequence (4 boxes, 1 loop arrow, 6 signal chips)
- A scripted line per stroke (so they speak while they draw)
- A built-in discovery question that turns the drawing into a conversation
- A failure mode list (what to do when they freeze)

## Slide 1 — `se-slide-dtop-whiteboard` · "DTOP on a Whiteboard — The 6-Stroke Drill"
A **visual whiteboard mockup** rendered in-app (off-white "marker board" panel, hand-drawn font feel via existing fonts, marker-blue/amber/violet/emerald strokes matching DTOP color tokens). It teaches the *exact* drawing sequence reps must memorise.

**Layout (1920x1080):**
- Left 60% — a faux whiteboard SVG showing the finished drawing:
  - Stroke 1 (blue): "Detect" box, top-left
  - Stroke 2 (amber): "Trigger" box, top-right, with arrow → from Detect
  - Stroke 3 (violet): "Orchestrate" box, bottom-right, arrow ↓
  - Stroke 4 (emerald): "Prove" box, bottom-left, arrow ←
  - Stroke 5: closing loop arrow Prove → Detect (dashed)
  - Stroke 6: six signal chips listed below Detect — Safety Reports · Operational Data · Maintenance · Crew Logs · Regulatory · Audit
- Right 40% — numbered "Stroke Script" panel: each of the 6 strokes paired with the **one sentence the rep says out loud** while drawing it. E.g.
  1. "We start with **Detect** — the operational signals we listen to." (draw blue box)
  2. "Each signal **Triggers** the right next action." (draw amber box + arrow)
  3. "We then **Orchestrate** the work across procedures, training, comms." (violet)
  4. "And we **Prove** it closed — auditable, evidence-backed." (emerald)
  5. "And it loops — every Prove feeds the next Detect." (dashed loop)
  6. "These six are the signal sources we listen to." (chip row)

**Footer band:** "Practice this drill three times before your next call. Time-box yourself to 90 seconds end-to-end."

## Slide 2 — `se-slide-dtop-whiteboard-runbook` · "Running the Whiteboard in the Room"
A **coaching runbook** — pure structured text, no fancy SVG — covering *how to use* the drill in a live meeting.

**Layout (1920x1080), 3 columns:**

**Column A — Setup (Before)**
- When to use it: any time the customer says "I don't get how this connects" or "show me"
- What to bring: a real whiteboard, an iPad, or screen-share annotation. Never PowerPoint.
- Pre-line: "Can I take 90 seconds at the board? It'll save us an hour of slides."

**Column B — Run (During)**
- Draw the 6 strokes in order, narrating each (reference the drill on the previous slide)
- After Stroke 4, **stop and point**, then ask the discovery question: *"Which of these four steps breaks first for you today?"*
- After Stroke 6 (signals), ask: *"Which of these six signal sources is hardest for you to reach right now?"*
- Write **their answer** on the board next to the broken step. That single act earns you the walkthrough.

**Column C — Recover (When it goes sideways)**
- If you blank: redraw Detect and say "let me restart from the signal." Resets without losing face.
- If they push for technical depth: say "that's the Signals Specialist Playbook — happy to bring our solutions architect for that one." Hand off, don't bluff.
- If they say "we already have this": ask "which of these four steps is actually closed today, with auditable proof?" — almost no-one can answer Prove honestly.

**Footer:** "The whiteboard is the single highest-conviction artefact in this academy. Practice it weekly with your team."

## Narration (added to `salesEnablementNarration.ts`)

**`se-slide-dtop-whiteboard`** — coaching tone, ~75 sec:
> "This is the most important drill in Week 1. The reason DTOP wins deals is not because the slide is good — it is because the rep can draw it on any surface in 90 seconds and turn the room into a conversation. Memorise the six strokes in order: Detect in blue, Trigger in amber, Orchestrate in violet, Prove in emerald, the closing loop arrow back to Detect, and the six signal chips below Detect — Safety Reports, Operational Data, Maintenance, Crew Logs, Regulatory, Audit. Each stroke has one sentence — the line on the right of the slide is the line you say out loud as you draw. Do not draw silently. Do not draw out of order. The colour story matters because it matches every diagram in the deck — your whiteboard then matches our slides, and the customer's brain stitches the two together. Practice this three times today. Time yourself. Ninety seconds, end to end. Next slide is how to use this drill in a live customer meeting."

**`se-slide-dtop-whiteboard-runbook`** — coaching tone, ~75 sec:
> "Setup: use the whiteboard the moment a customer says 'I don't get how this connects' or 'show me'. The pre-line earns you the right to draw — 'can I take 90 seconds at the board, it'll save us an hour of slides'. Customers always say yes. Run: draw the four boxes and the loop, then stop and point and ask the question — which of these four steps breaks first for you today. Then add the six signal chips and ask the second question — which signal source is hardest to reach. Write their answers on the board next to the broken step. That single act — writing their words on your drawing — is what converts a pitch into a discovery. Recover: if you blank, redraw Detect and restart from the signal — it looks deliberate, not lost. If they push for technical depth, hand off to the Signals Specialist Playbook and offer a solutions architect. If they say 'we already have this', ask which of the four steps is actually closed today with auditable proof — almost no-one can answer Prove honestly, and that is your wedge. Practise this drill weekly with your team. The whiteboard is the highest-conviction artefact in this entire academy."

Both narrations follow the existing 5-part Coach Script Standard (why → core → pain/value → delivery → transition).

## Files

### New
- `src/components/sales-enablement-slides/SEDtopWhiteboardDrill.tsx` — the 6-stroke drill slide with SVG whiteboard
- `src/components/sales-enablement-slides/SEDtopWhiteboardRunbook.tsx` — the 3-column runbook slide

Both use existing `SlideShell` / page slide layout pattern, `h-screen` with asymmetrical padding (per layout standards memory), DTOP color tokens from `mem://content/dtop/color-mapping`.

### Edited
- `src/pages/SalesEnablement.tsx` — import the two new components, insert in the slides array immediately after `se-slide-dtop`, before `se-slide-value`. Update `weekProps.w1.upNext` to mention "DTOP whiteboard drill".
- `src/data/salesEnablementNarration.ts` — append the two new narration entries.

### Out of scope
- No edits to `TechV4Slide5DTOP` itself
- No changes to Week 2/3, no other decks, no slide-id renames
- Not building a Practice Center role-play — that's a separate feature

## Acceptance
- Two new slides appear between DTOP and Value Unlocked in Sales Enablement
- Both render at h-screen with no clipping at 1415x865 viewport
- Whiteboard SVG uses canonical DTOP colors (D blue · T amber · O violet · P emerald)
- Both slides have voice-over scripts that play from the narration bar
- Week 1 `upNext` reflects the new drill
- No "Module" / "M1–M6" wording in the new copy (Week 1 only)
