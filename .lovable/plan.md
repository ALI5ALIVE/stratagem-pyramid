# Event Positioning & Messaging 1-Pager

A second, tighter web 1-pager focused purely on the **positioning and messaging brief** for the "From Signals to Control" event — the kind of page you'd send to marketing, sponsors, or internal stakeholders to align everyone on the story. Tracks are reframed by **department** (Operations, Content, Safety, Training) instead of by DTOP step.

## Route

- New route: `/events/from-signals-to-control/brief`
- New page file: `src/pages/events/SignalsEventBrief.tsx`
- Registered in `src/App.tsx`
- Sibling to the existing `SignalsEvent.tsx` (the public-facing 1-pager)
- Cross-link: small "View public page" link in header; existing public page gets no change

## Page sections (top → bottom, single scroll)

**1. Header strip**
- Eyebrow: "Event Positioning & Messaging Brief"
- H1: **From Signals to Control**
- One-line standfirst: "The positioning, narrative, and messaging architecture for the Operational Performance Platform event."
- Small meta row: Audience · Format · Status (placeholder tokens)

**2. The Big Idea (hero message block)**
- Headline: "Aviation isn't short on data. It's short on signals it can act on."
- 2–3 sentence narrative paragraph anchoring the event theme.
- Pull-quote tile: **"From Signals to Control."**

**3. Category Positioning**
Compact 2-column block:
- **Category:** The Operational Performance Platform
- **Position:** The system of record + system of intelligence that turns operational signals into measurable control across safety, content, and training.
- **Wedge vs. competitors:** purpose-built domain AI (~90% accuracy vs ~35% generic), unified across the three Systems of Record, DTOP operating model.

**4. Messaging architecture (table)**
6-row table — reuses the architecture already approved in the brief:
| Layer | Message |
|---|---|
| Category | Built for the signal age of aviation |
| Problem | Operators are drowning in unacted signals |
| Shift | Event management → signal management → control management |
| Solution | Three Systems of Record + CoAnalyst + DTOP |
| Proof | ~90% domain AI accuracy vs ~35% generic · continuous audit evidence |
| Outcome | Fewer surprises, faster response, provable control |

**5. Taglines & hooks**
Small grid of 4 cards, each a candidate line with a 1-line use:
- "From Signals to Control" — master theme
- "Every Signal Counts" — emotional / safety-anchored
- "The Signals Are There. Are You Listening?" — keynote provocation
- "Operate at the Speed of Signals" — performance / ops angle

**6. Audience & departmental tracks (REVISED)**
Headline: "Four departments. One signal, end to end."
Grid of 4 track cards — color-coded but mapped to **departments**, not DTOP letters:

- **Operations** (blue) — Turn daily ops signals into faster, safer decisions. Audience: Heads of Flight Ops, Ops Control, Crew Ops.
- **Content** (violet) — Make manuals, procedures, and tech pubs respond to live operational signals. Audience: Tech Pubs, Content Ops, Documentation leads.
- **Safety** (emerald) — Detect weak signals before they become events; prove control to regulators. Audience: Heads of Safety, SMS, Compliance.
- **Training** (amber) — Translate operational signals into targeted competency and recurrent training. Audience: Heads of Training, Standards, Check & Training.

Each card: department name, 1-line promise, "Who it's for" line, 1 sample session title placeholder.

**7. Narrative arc for the event (3-step strip)**
- **Open** — The signal problem (industry frame)
- **Middle** — The platform answer (category + DTOP + CoAnalyst, told through the 4 departments)
- **Close** — The control outcome (provable, continuous, board-ready)

**8. Tone & language guardrails**
Two-column do / don't list:
- **Use:** signals, control, operational performance, Systems of Record, CoAnalyst, DTOP, Generative AI, Recommended Actions, Operational Data
- **Avoid:** FOQA, FDM, ASAP, "AI copilot", "single pane of glass", over-claiming ROI without disclaimers

**9. Footer**
Comply365 wordmark + small print + link back to the public event page.

## Design / implementation notes

- Reuse existing dark theme tokens — no new colors
- Department colors: Operations=blue (sky), Content=violet, Safety=emerald, Training=amber (kept consistent with DTOP color palette already in memory so visuals stay on-system, but labels are department-led, not DTOP-letter-led)
- Single-file page mirroring `SignalsEvent.tsx` structure; smaller hero, more dense layout — this is a brief, not a marketing page
- SEO: `<title>` "From Signals to Control — Event Positioning Brief", meta description, single H1
- Presentational only; no backend, no forms, no PDF export this round

## Out of scope

- No edits to the existing `/events/from-signals-to-control` public page
- No PDF/PPTX export (can be added later)
- No nav/home changes
- No event date/venue locked in (placeholder tokens)

## Open items (non-blocking)

- Confirm department list (Ops / Content / Safety / Training) — assumed from your message; happy to add a 5th (e.g. Digital/Data) if useful
- Whether to surface 1–2 sample session titles per department now, or leave as placeholders
