## Goal

Reduce the Strategy & Vision Session workshop from a 4-hour ("half-day") agenda to a fixed 3-hour agenda, and propagate the wording everywhere it appears.

## New 3-hour agenda

Replace `visionSessionAgenda` in `src/data/week3FieldKit.ts` with seven blocks totalling 3:00:

```text
0:00 – 0:20  Where the industry is going
0:20 – 0:50  The platform story
0:50 – 1:25  Capabilities deep-dive
1:25 – 1:35  Break
1:35 – 2:05  Operational Performance Roadmap
2:05 – 2:45  Their DTOP loop, end-to-end
2:45 – 3:00  Agreed next step
```

Detail copy for each block stays as-is (still accurate at the new lengths).

## Wording updates

Change "half-day" / "4-hour" / "four-hour" → "3-hour" (and drop "half-day" framing) in:

- `src/components/sales-enablement-slides/SEStrategyVisionSession.tsx`
  - Title: "The Strategy & Vision Session — a complimentary 3-hour workshop"
  - Subtitle: "…Fixed 3-hour agenda, on-site or virtual."
  - Agenda header chip: "Fixed 3-hour agenda"
- `src/data/week3FieldKit.ts`
  - Section comment (line 524)
  - Persona `nextStep` / `coaching` lines referencing "half-day" (lines 484, 494, 503, 504) → "3-hour Strategy & Vision Session"
  - `visionSessionRepTalkTrack` "Propose" line → "complimentary 3-hour Strategy & Vision Session"
- `src/data/salesEnablementNarration.ts`
  - `se-deal-stage-language` closing line ("complimentary half-day workshop" → "complimentary 3-hour workshop")
  - `se-strategy-vision-session` script: "complimentary half-day workshop" → "complimentary 3-hour workshop"; "fixed four-hour agenda" → "fixed 3-hour agenda"
- `src/pages/SalesEnablement.tsx`
  - Week 3 summary line (83): "complimentary half-day Strategy & Vision Session" → "complimentary 3-hour Strategy & Vision Session"
- `src/pages/PositioningPlaybook.tsx`
  - Heading (456): "Strategy & Vision session — 3-hour agenda"
  - Body (458): "Complimentary, on-site or virtual. Fixed 3-hour agenda…"
- `src/data/positioningPlaybook.ts`
  - Objection responses (243, 247): "half-day" → "3-hour"
  - Discovery question (275): "Who else needs to be in the room for the 3-hour session?"
  - Email template (292–294): subject "Complimentary 3-hour: Operational Performance Vision"; body "complimentary 3-hour Strategy & Vision session… Fixed 3-hour agenda…"
  - Tier 1 action (308) unchanged wording
  - Disclaimer (359) unchanged

## Out of scope

- No changes to attendees list, leave-behind deliverables, or rep talk-track structure beyond the duration phrasing.
- No slide additions/removals; no design changes.
- Memory file `mem/content/sales-enablement/week3-field-kit.md` will be updated to note the 3-hour duration.
