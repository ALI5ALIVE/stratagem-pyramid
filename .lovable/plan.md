## Goal

On `SEW3WholeVisionWhiteboard`, lead with a clear, detailed walkthrough of the **Madrid (MAD) unstable approach** use case mapped to DTOP, *then* keep the existing five-layer "say-it script" narration intact. Today the MAD scenario is only implied via small SVG cards on the whiteboard — there's no rep-facing explainer that anchors DTOP to the real story before the stack walk starts.

## Changes

### 1. `src/components/sales-enablement-slides/SEW3WholeVisionWhiteboard.tsx`

In the right column (currently: Say-it script → 5 beats → Close), insert a new **"Use case · Madrid (MAD) unstable approach"** opener block *above* the existing "Say-it script" header.

Opener structure:
- Small kicker label: `Open with the use case · 20 seconds`
- One-sentence scenario:
  *"Madrid approach has gone unstable on a 14-day window — same crews, same procedure, same airport. Three weeks ago this would have been an email chain. Today it's one closed loop in five days."*
- A compact 4-row DTOP timeline (Detect → Trigger → Orchestrate → Prove), each row using the canonical DTOP colour (blue / amber / violet / emerald), showing:
  - **Detect · Day 1** — Insights surfaces a 14-day MAD unstable-approach trend; no analyst pulled a report.
  - **Trigger · Day 2** — Intelligence Layer returns Recommended Actions: revise OMA section X, retrain the four affected crews, regulation + procedure + training cited.
  - **Orchestrate · Day 3** — Automation drafts the OMA revision, opens the review, assigns the training; Unified Mobile pushes to crew devices within 48 hours.
  - **Prove · Day 5** — Insights shows the trend flat; audit pack assembles itself in one click.
- A thin divider, then a one-line bridge: *"Now build the stack that made that possible — bottom-up, one line per layer."*

Then the existing 5 beats render exactly as today, followed by the existing Close card.

Layout notes:
- Keep the slide single-screen (`h-full`, no scroll). To make room, tighten beat padding from `p-2.5` to `p-2`, gap from `gap-1.5` to `gap-1`, and beat text from `text-[13px]` to `text-[12px]`.
- Right column becomes: kicker → MAD opener card → divider+bridge → "Say-it script" header → 5 beats → Close.
- Whiteboard SVG (left column) is untouched.

### 2. `src/data/salesEnablementNarration.ts` — `se-w3-whole-vision-whiteboard` script

Prepend a ~25-second detailed MAD walkthrough to the existing script, *before* the current "One marker. Ninety seconds…" opening. New opener (verbatim direction):

> "Before you touch the stack, tell the story. Madrid — airport code MAD — has gone unstable on approach: same procedure, same crews, fourteen-day trend. Walk it as DTOP, in days. Day one, Detect — Insights surfaces the trend itself; no analyst pulled the report. Day two, Trigger — the Intelligence Layer comes back with Recommended Actions, regulation, procedure and training all cited. Day three, Orchestrate — Automation drafts the OMA revision, opens the review, assigns the retraining; Unified Mobile lands it on crew devices inside forty-eight hours. Day five, Prove — Insights shows the trend flat, audit pack one click. Five days, one loop, no email chain. That is the answer. Now show them how the stack delivers it."

The rest of the existing script ("One marker. Ninety seconds…" through the verbatim close) stays exactly as-is and continues the flow already in the narration.

## Out of scope
- No changes to the whiteboard SVG.
- No changes to the 5-beat "say-it script" content or the Close card.
- No changes to other W3 slides, the roadmap-vision frame, or the W2 capstone whiteboard.
