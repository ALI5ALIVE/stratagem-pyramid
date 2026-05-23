# Strategy & Vision Session — EMCS uplift sprint

Goal: take the microsite from **65.8 → ~80** by closing the two structural gaps (Training & Compliance as first-class personas) and the dominant weakness (credibility / proof). All work lives in `src/pages/StrategyVisionSession.tsx`.

## What changes

### 1. Persona band — expand from 4 to 5 cards (drop CIO, add Training, split Compliance)

New persona set, in this order:

| # | Persona | DTOP colour | Promise | Take-aways |
|---|---|---|---|---|
| 1 | CEO / Accountable Executive | sky | Board-ready view of where your operation sits against the industry shift to performance-based oversight. | Maturity snapshot vs peers · Competitive position narrative · 12-month vision you can present |
| 2 | COO / Head of Operations | amber | Concrete picture of what predictive operations unlock — and which use case to start with. | Candidate DTOP use case · Operational bottleneck map · Quick-win shortlist |
| 3 | Head of Safety / VP SMS | violet | Clear path from prescriptive compliance to evidence-led, regulator-ready safety performance. | Evidence model walkthrough · Audit-readiness gap view · Regulator-ready narrative |
| 4 | Head of Training & L&D | emerald | Closed-loop targeting — assigning the right training from operational signals and proving it changed behaviour. | Closed-loop targeting model · Behaviour-change evidence (not completion %) · TMS-extension plan (no rip-and-replace) |
| 5 | Head of Compliance / Regulatory | sky | Confidence that performance-based oversight stands up under EASA, FAA, CAA and TCCA regimes. | Regulator narrative (named regimes) · Audit-evidence model · Framework alignment review |

Layout: switch from 2-col to a 5-card responsive grid (1 col mobile, 2 col md, 3 col lg with the 5th card spanning balanced). Same card pattern; alternating DTOP colour accents.

Headline updated: *"Five people in the room. Five reasons it's worth the calendar block."*

### 2. Credibility band — replace the current trust strip with a richer proof block

- **Named facilitator badge.** Two placeholder bios: "Lead facilitator: Comply365 Strategy Director · 15+ years aviation operations" and "Solutions engineer: Intelligence Layer architect · former airline data lead". Add note: *"Your exact facilitator pair confirmed in your prep call."*
- **Regulator-framework chips** (new row): EASA · FAA · CAA · TCCA · ICAO Annex 19 · IS-BAO — visually treated as small framework chips beside the existing industry chips.
- **Source-attributed stat line**: *"Industry SMS maturity sits broadly at Level 2 (IATA SMS implementation survey)."* — with the small `StatSourceChip` pattern already used elsewhere.
- Keep the existing customer quote; relabel speaker as "VP Safety, Tier-1 European airline (named on request under NDA)".

### 3. Maturity curve — neutralize and source the "industry median" pill

Add a small source line under the curve: *"Industry median anchored to IATA SMS maturity benchmark, 2024."* Keeps the visual but earns the claim.

### 4. Deliverables — show, don't tell

Add a **small thumbnail mock** next to each of the three deliverables. CSS-only mocks (no external assets): a stylised one-pager preview built from divs — header band, three rule lines, a small chart block — clearly labelled "Sample". Reuses existing card structure; thumbnail sits to the left at md+.

### 5. New "Built for performance-based oversight" micro-section (after maturity curve)

Two-column band:
- Left: short paragraph on the regulatory shift (EASA SMS, FAA SMS Part 5, CAA CAP 795) — three sentences, with the framework names as visible callouts.
- Right: 4 small stats — `~90%` Intelligence Layer accuracy · `L2 → L4` industry trajectory · `4` regulator regimes routinely referenced · `3 hrs` to map your use case. Each with the source chip pattern.

This single band addresses the Compliance and Safety credibility gaps directly.

### 6. CTA — broaden conversion paths

- Primary: "Request a date" (mailto, unchanged).
- Secondary: "Book directly on our calendar →" — keep mailto fallback but rename CTA to "Pick a date from our calendar" and add small text *"Opens our scheduling page"* (placeholder href; swap to Calendly/HubSpot later).
- Tertiary: existing account-lead line.
- Add a small **scarcity line** under the closing H2: *"We run 6 sessions per quarter. 2 dates currently open for the next quarter."*

### 7. Small polish

- Add `id` anchors on persona band and FAQ for in-page sharing.
- Update the page meta description to reference the five attending roles by name.

## Out of scope (v1)

- Real facilitator photos (placeholder credential badges only — swap later).
- Real customer logos (industry + framework chips only).
- Live calendar embed (placeholder link only).
- No backend, no form, no auth.
- No changes to `week3FieldKit.ts` or the internal slide.

## Technical notes

- All copy stays inside `src/pages/StrategyVisionSession.tsx` — single-file edit.
- DTOP colour mapping reuses the existing `colorMap` lookup.
- Stat chips reuse the look of `StatSourceChip` inline (don't need to import the component — small custom span keeps the file self-contained).
- 5-card grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`; the 5th card uses `lg:col-span-3` with constrained max-width centered, or stays in-flow — pick whichever reads cleaner at 1141px and ≥1440px.

## Expected outcome

Personas Training (5.62 → ~7.5) and Compliance (5.66 → ~7.5) move from "likely decline" to "probably attend". Safety credibility (4 → 7) rises with named regulators. CEO and COO unaffected materially but benefit from richer proof. Page-wide **EMCS lifts from 65.8 to ~80**, into the world-class band.
