---
name: Strategy Vision Session Microsite
description: Customer-facing shareable page at /strategy-vision-session selling the complimentary 3-hour workshop
type: feature
---
Route: `/strategy-vision-session` (public, no auth gate — must be shareable).
Component: `src/pages/StrategyVisionSession.tsx`.

Purpose: A world-class, customer-facing microsite the sales team forwards to prospect execs to sell the value of the complimentary 3-hour Strategy & Vision Session. Customer-facing tone — never rep-coaching tone.

Sources its content from `src/data/week3FieldKit.ts` (`visionSessionAgenda`, `visionSessionAttendees`, `visionSessionLeaveBehind`) — do NOT duplicate copy. The rep talk track is intentionally excluded.

Sections (in order): Hero · Why this session exists · What makes it different (3 cards) · 3-hour agenda timeline (DTOP-colored) · DTOP loop preview (4 cards) · Operational Performance maturity curve (L1–L5) · Who should be in the room · What you'll leave with · Logistics strip · Closing CTA (mailto [email protected]).

Tone rules: address the customer ("you'll leave with"), never the rep. The agenda block details are taken verbatim from `visionSessionAgenda` — if those become too rep-internal, update the source data, not just the microsite.

Discoverability: No nav entry, no homepage card. Linked from `SEStrategyVisionSession.tsx` slide footer ("Open customer-facing page to share with the prospect") so reps can grab the URL from inside enablement.

CTA: mailto:[email protected] (no backend form in v1).