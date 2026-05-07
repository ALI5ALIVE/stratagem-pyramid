# Event 1-Pager: "From Signals to Control"

A new standalone web page positioning **Signals** as the anchoring theme for an event around the Operational Performance Platform category. Built as a single scrollable route in the existing dark Comply365 theme.

## Route

- New route: `/events/from-signals-to-control`
- New page file: `src/pages/events/SignalsEvent.tsx`
- Registered in `src/App.tsx`
- Not added to main nav (event page = direct-link/share asset)

## Page Sections (top → bottom)

**1. Hero**
- Eyebrow: "The Operational Performance Event"
- H1: **From Signals to Control**
- Sub: "Aviation generates 12,000+ operational signals every month. Most go unheard. The leaders of the next decade will be the operators who can detect, act on, and prove control over every one that matters."
- Primary CTA: "Reserve your seat" · Secondary: "Request the agenda"
- Visual: animated signal-wave / pulse motif using primary blue + DTOP color accents

**2. The Premise — 3 stat cards**
- ~12K monthly signals per mid-size carrier — most orphaned
- ~35% accuracy from generic AI on aviation categorisation
- ~90% accuracy with purpose-built domain AI (CoAnalyst)
- Pulled from existing trust-signals + CoAnalyst accuracy headline memory

**3. The Shift (Today → Tomorrow strip)**
- Today: Event management — reactive, fragmented, unread signals
- Tomorrow: Signal management → Control management — proactive, unified, provable
- Mirrors the existing Today/Tomorrow visual pattern from sales decks

**4. Category frame: The Operational Performance Platform**
- One platform · Three Systems of Record · One operating model
- Three module chips: ContentManager365 · SafetyManager365 · TrainingManager365
- Unified by CoAnalyst intelligence + DTOP operating model
- Small DTOP pipeline strip (D/T/O/P) using canonical color tokens

**5. Four Event Tracks (signal-themed)**
Grid of 4 cards, each color-coded to a DTOP step:
- **Detect** (blue) — the signals others miss · CoAnalyst, Insights
- **Trigger** (amber) — the right action automatically · Automation, DTOP
- **Orchestrate** (violet) — safety, content, training as one system · Platform Foundation
- **Prove** (emerald) — continuous control to regulators and the board · Audit, Line of Sight

**6. Who Should Attend**
Horizontal row of role chips: Heads of Safety · Flight Ops · Compliance · Training · Digital/Data leaders

**7. Closing promise + CTA band**
- "Walk in with a backlog of unread signals. Walk out with a model for turning every one of them into measurable control."
- Buttons: Reserve your seat · Request the agenda
- Placeholder fields for date/location/venue (TBD — left as `{Event Date}` / `{Venue}` tokens so easy to fill later)

**8. Footer**
- Lightweight: Comply365 wordmark + small print

## Design / Implementation notes (technical)

- Reuse existing dark theme tokens from `index.css` and `tailwind.config.ts` — no new colors
- Use Space Grotesk for headings, Inter for body (already configured)
- DTOP color mapping per memory: D=blue, T=amber, O=violet, P=emerald
- Build presentational only — no backend, no forms wired up yet (CTAs are anchor links / mailto placeholders we can swap later)
- Single-file page composition with small inline section components, mirroring `PlatformOverview.tsx` pattern
- SEO: page-level `<title>` ~"From Signals to Control — The Operational Performance Event", meta description, single H1, semantic sections

## Out of scope (this round)

- No event date/venue locked in (left as placeholders)
- No registration backend, form, or email capture
- No PDF/PPTX export of the 1-pager (can be added later)
- No changes to home/nav or existing pages

## Open items the user can answer later (not blocking)

- Event date, location, venue
- Whether to wire CTAs to a real registration link or a mailto
- Whether to add the page to the main nav or keep as direct-share only
