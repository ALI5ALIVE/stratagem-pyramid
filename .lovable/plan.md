## Goal

Reimagine **comply365.com's public homepage** as a bolder, more provocative front door that funnels visitors into the existing `/platform` page (which already plays the Medium Pitch story — DTOP, Intelligence, Mobile, Why It Works).

Today's comply365.com is a polished but conventional product-marketing page: AI-powered hero → "One Platform, One Vision" paragraph → three module logos → six generic differentiator cards → customer logos → blog tiles → CTA. It tells you *what* Comply365 is, not *why now*.

The redesign leads with **tension and proof**, not a tagline.

---

## Narrative Arc (8 sections)

```text
1. Provocative Hero        →  the operational gap
2. The Stakes              →  what fragmentation costs
3. From Reaction → Control →  Today vs Tomorrow split
4. The Platform (modules)  →  ContentManager365 · SafetyManager365 · TrainingManager365
5. The Intelligence Edge   →  ~90% domain accuracy vs ~35% generic AI
6. DTOP in 60 seconds      →  Detect → Trigger → Orchestrate → Prove ribbon
7. Proof & Trust           →  customer logos + headline metrics
8. CTA                     →  Book a walkthrough · Explore the Platform
```

Each section ends with a clear hand-off into `/platform` (or its anchors).

---

## Section-by-section blueprint

**1. Hero — "Operations runs on signals nobody acts on."**
- Eyebrow: *The Operational Performance Platform*
- H1 (two-line, Space Grotesk, oversized): *"Operations runs on signals — nobody acts on."* with the strikethrough revealing the second line.
- Sub: One sentence — *"Comply365 turns operational signals into prescriptive action across Content, Safety, and Training."*
- Two CTAs: **Explore the Platform** (`/platform`) · **Book a walkthrough**
- Background: subtle animated grid + DTOP color particles (D blue · T amber · O violet · P emerald) — replaces the generic looping video.
- No nav-style module name reveal in the H1 (current site cycles ContentManager365/SafetyManager365/TrainingManager365 — we move that to section 4 where it earns its place).

**2. The Stakes — "The cost of disconnected operations"**
- 3 stat cards in a row, each citing a defensible metric we already use:
  - **$25–35B** systemic industry exposure from disconnected ops (sourced via `mem://content/dtop/industry-exposure-figure`)
  - **~65%** of operational signals never trigger an action
  - **Days → minutes** typical detection-to-action gap
- Below: a single line — *"This is what happens when Content, Safety and Training don't talk to each other."*
- Visual: faint horizontal flow lines that fragment mid-screen.

**3. From Reaction → Control — Today vs Tomorrow**
- Split-screen layout (already a memorized pattern: `mem://ui/sales-deck-title-visual-strategy`).
- Left ("Today"): muted greys, words like *Siloed · Reactive · Manual · Unverified*.
- Right ("Tomorrow"): full color, *Connected · Predictive · Automated · Provable*.
- Single sentence under: *"The shift isn't more software. It's a connected operating model."*

**4. The Platform — three modules, one model**
- Echoes comply365.com's strongest move (the three product names) but reframes them as **one connected data model**, not three logos.
- 3 cards in a row, each in module color:
  - **ContentManager365** — operational content as living, queryable knowledge.
  - **SafetyManager365** — safety, quality, risk in one prescriptive layer.
  - **TrainingManager365** — competency tied to operational reality.
- Beneath: a thin connector graphic with the label *"One connected data model"* — leads the eye into section 5.
- Each card links to its `/platform` anchor.

**5. The Intelligence Edge — CoAnalyst**
- Single hero stat, treated like a billboard:
  - **~90%** domain accuracy at L4–5 vs **~35%** generic AI (per `mem://content/coanalyst/accuracy-headline`).
- Sub: *"CoAnalyst is the only operational AI that understands your manuals, your safety reports, and your training records — together."*
- 3 inline chips: *Generative AI · Recommended Actions · Operational Data* (locked terminology per `mem://content/terminology-rules`).
- CTA: *"See how CoAnalyst works →"* deep-links to `/platform#intelligence`.

**6. DTOP in 60 seconds**
- The 4-step ribbon (Detect blue · Trigger amber · Orchestrate violet · Prove emerald) reused from `ExecSlide3DTOP` styling.
- One short scenario line per step (industry-agnostic).
- CTA: *"See the full operating model →"* → `/platform#dtop`.

**7. Proof & Trust**
- Headline: *"Trusted to run mission-critical operations."*
- Customer logo strip (Qantas, RAF, MoD, BA, Delta — same set comply365.com uses today).
- 3 trust metrics from `mem://brand/trust-signals` (550+ customers · ~2.5M users · 6 continents).

**8. CTA — "What would you do with control?"**
- Big two-up: **Book a walkthrough** (primary) · **Explore the Platform** (secondary → `/platform`).
- Footer-light: tertiary links to industry pages (Airlines / Defense / Rail / MRO) and Resources.

---

## Why this is bolder than comply365.com today

| comply365.com today | Redesign |
|---|---|
| Hero leads with a brand claim ("Industry's First AI-Powered Platform") | Hero leads with a tension ("signals nobody acts on") |
| Six generic differentiator cards (Enterprise-Wide, Configurability, Data Empowered…) | One sharp proof point: 90% vs 35% |
| Modules shown as logos | Modules shown as one connected data model |
| DTOP not visible | DTOP gets its own 60-second section |
| Resources/blog tiles in the middle | Resources demoted; CTA earns the closing |
| No measurable claim above the fold | Stakes section quantifies the problem |

---

## Technical notes (for the build phase, not this plan)

- New page at a non-destructive route (e.g. `/comply365-home`) so we can A/B against current Command Centre at `/`.
- Reuse: `tailwind.config.ts` tokens, DTOP color mapping, `ExecSlide3DTOP` ribbon styling, `IndustryHero` patterns, `StickyNav` (optional), customer logos from `IndustryTrustBar`.
- All copy follows `mem://content/terminology-rules` and `mem://content/platform-terminology-standards`.
- No backend, no narration, no PPTX/PDF export — pure marketing page.
- Dark theme, Space Grotesk headings, Inter body — consistent with the rest of Stratagem.

---

## Out of scope

- Editing `/platform` itself (it stays as the deeper story).
- Touching the internal Command Centre at `/` until we approve replacement.
- Industry sub-pages, Resources index, Contact form wiring.

---

## Deliverable

This plan only. Once approved, the build phase will scaffold the 8 sections as components under `src/components/comply365-home/` and mount them at `/comply365-home`.
