

## Customer 10-Slide Overview Deck — "From Where You Are Today to Measurable Outcomes"

A short, customer-facing pitch built for a single 20-minute sales conversation. Goal: take a prospect from *"this is our reality today"* → *"here's the shift"* → *"here's what it looks like in practice"* → *"here's what we'd do first together"* — without overwhelming them with the full platform stack.

### Who it's for
A customer/prospect (Head of Safety, Director of Ops, VP Compliance) sitting in a first or second meeting. They have ~20 minutes. They don't need every layer, every capability, or every persona — they need to **feel understood, see the shift, believe the outcome, and know the first step**.

### Design principle: less is more
- **No 5-layer architecture diagram.** Replaced by one simple "connected platform" visual.
- **No DTOP acronym front-and-centre.** Embedded inside the use cases as a story, not a framework.
- **No competitive matrix, no objection slides.** Those live in the sales enablement deck for rep prep — not in the customer room.
- **One clear CTA at the end** — a discovery workshop, not "buy now."

### The 10-slide arc

```text
ACT 1 — Where you are today (slides 1-3)
ACT 2 — The shift we enable (slides 4-6)
ACT 3 — What it looks like for you (slides 7-9)
ACT 4 — Where we go next (slide 10)
```

| # | Slide | Component | Why it's here |
|---|---|---|---|
| **ACT 1 — Where you are today** ||||
| 1 | Title — *"The Operational Performance Platform"* with subtitle *"From cost centre to performance engine"* | **NEW** `COSlide0Title` | Customer-styled hero, no agenda grid |
| 2 | The reality today — fragmented systems, missed signals, rising cost | `TechSlide2IndustryChallenge` | reuse — pain landscape with industry-grounded numbers |
| 3 | The strategic shift the industry is making | `TechSlide1StrategicShift` | reuse — "you're not alone, this is the direction" |
| **ACT 2 — The shift we enable** ||||
| 4 | What the platform is, in one sentence | `PFSlide2WhatIs` | reuse — plain-English definition |
| 5 | The transformation — before vs. after | `Slide4Transformation` | reuse — visceral "today vs. tomorrow" |
| 6 | The value you unlock — 5 shifts | `PFSlide9Value` | reuse — outcome-led, not feature-led |
| **ACT 3 — What it looks like for you** ||||
| 7 | Use cases in action — 3 concrete scenarios | `SlideUseCases` | reuse — DTOP shown as a *story*, not a framework |
| 8 | Customer outcomes — proof from operators like you | `CustomerOutcomesSlide` | reuse — credibility anchor |
| 9 | Your maturity roadmap — where you start, where you go | `Slide5MaturityCurve` | reuse — shows the journey is staged, not big-bang |
| **ACT 4 — Where we go next** ||||
| 10 | Your first 90 days with us — *"Let's start with one use case"* | **NEW** `COClosingFirst90Days` | Three concrete next steps + single CTA |

Total: **10 slides**, ~20-minute conversation.

### What's actually new

Two small components in a new folder `src/components/customer-overview-slides/`:

1. **`COSlide0Title.tsx`** — Customer-facing title. Headline + one-line value prop + small "prepared for [customer]" badge slot. No agenda chips (avoids the "this is going to be long" feeling).

2. **`COClosingFirst90Days.tsx`** — Three numbered cards laid out left-to-right:
   - **Days 1-30** — Discovery workshop: pick one use case, baseline today's cost
   - **Days 31-60** — Pilot: deploy DTOP loop on that use case, measure
   - **Days 61-90** — Prove & expand: present results, define rollout
   
   Bottom: single CTA — *"Book a 60-minute discovery workshop"*.

### Page + routing

- **NEW** `src/pages/CustomerOverview.tsx` — same scroll-snap scaffold as `ExecutivePitch3.tsx` (sidebar nav, keyboard arrows). No narration in v1 — this deck is always rep-led live.
- **EDIT** `src/App.tsx` — add route `/customer-overview`.
- **EDIT** `src/pages/HomePage.tsx` — add a card under the existing Pitch Decks section with title *"Customer Overview"*, badge *"10 slides · ~20 min"*, icon `Presentation`, and a clear "Customer-facing · Sales-led" tag.

### Why this deck works (vs. the existing pitches)

- **10 slides, not 20.** A 20-slide deck signals "we're going to talk at you." 10 signals "we want a conversation."
- **No layer divider slides.** The 5-layer stack is *internal vocabulary*. Customers care about the outcome, not the architecture.
- **DTOP shown as a story** (in the use cases slide), not as a framework slide. Customers don't need to learn the acronym — they need to recognise the pattern.
- **Closing is a starting point, not a summary.** Ends on "here's what we'd do together in 90 days," which is the only thing the customer actually needs to decide on in the room.
- **All reused slides are already battle-tested** in other decks — no risk of new content drifting from agreed messaging.

### Files touched

**NEW**
- `src/pages/CustomerOverview.tsx`
- `src/components/customer-overview-slides/COSlide0Title.tsx`
- `src/components/customer-overview-slides/COClosingFirst90Days.tsx`

**EDITED**
- `src/App.tsx` — add route `/customer-overview`.
- `src/pages/HomePage.tsx` — add card in Pitch Decks section.

### Not touched

- Any existing slide components, narration, or playbook data.
- Existing pitch decks (Executive 1/2/3, Operational, Technical, CoAnalyst).
- PPTX exporters.

### Out of scope

- Narration / audio.
- PPTX export for this deck.
- A customer-name personalisation flow on the title slide (placeholder slot only — fill manually for v1).
- Industry-specific variants (Airlines / Defense / Rail) — can be a follow-up if the deck lands well.

### QA

- Open `/customer-overview`, scroll all 10 slides, confirm the arc reads cleanly Today → Shift → Proof → Next Step.
- Confirm no DTOP framework slide, no architecture diagram, no objection/competitive content appears.
- Confirm Home Page lists the new card with the "Customer-facing · Sales-led" tag and a 10-slide / 20-min badge.
- Sidebar slide navigator lists exactly 10 entries.

