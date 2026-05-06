# Operational Performance Platform — Industry-Agnostic Page

## Goal
Take the strongest beats of the Medium Pitch (Executive Pitch 3) and reframe them as a single-scroll marketing-style **Platform page** — not a deck. Industry-agnostic language (no aviation, no FOQA/ASAP), focused on capability + value. Then surface it as a card on the Home Page so prospects/partners can self-serve a clean overview before a sales conversation.

## UX framing — the narrative arc

The Medium pitch tells a 5-beat story. The new page mirrors that arc, but as scrollable web sections (large hero, alternating layouts, sticky in-page nav), not 16:9 slides:

```text
1. Hero            — "Turn operational data into operational performance."
2. The Shift       — Today (fragmented, reactive) → Tomorrow (connected, prescriptive)
3. Outcomes        — 3 outcome pillars with proof metrics (industry-agnostic)
4. The Platform    — One canvas: Core Apps · DTOP · Intelligence · Mobile
5. DTOP            — Detect → Trigger → Orchestrate → Prove (the operating model)
6. Intelligence    — Automation · Insights · CoAnalyst (Recommendations)
7. Mobile          — One trusted shell for the frontline
8. Why It Works    — 3 differentiators + trust band
9. CTA             — Talk to us / view tailored deep dives by industry
```

Sections 5–7 follow the same **module pattern**: eyebrow tag · headline · 1-line promise · 3 capability bullets · 1 outcome stat. This gives a strong rhythm and lets a visitor scan in 60 seconds or read in 5 minutes.

## Page design (industry-agnostic)

### Hero
- H1: **The Operational Performance Platform**
- Sub: "Detect signals, trigger the right work, orchestrate across teams, prove every outcome — on one connected platform."
- Today vs Tomorrow split graphic (reuse pattern from `TechSlide1StrategicShift`, but with neutral language: "fragmented systems, reactive teams, manual proof" → "connected data, prescriptive actions, automatic proof").
- Primary CTA: *Book a walkthrough*  ·  Secondary: *See it in the Medium Pitch*.

### The Shift (industry-agnostic Before/After)
Two columns, `Today` (muted) vs `Tomorrow` (primary). Bullets phrased for any regulated, operationally complex industry (aviation, rail, defense, energy, healthcare ops):
- Disconnected content / training / safety silos → One connected operational data model
- Lagging KPIs after the fact → Weak signals detected early
- Manual investigations → Recommended actions with evidence
- Audit prep as a project → Proof produced as a byproduct

### Outcomes (3 pillars, industry-agnostic stats)
| Pillar | Promise | Proof |
|---|---|---|
| Revenue & Risk Protection | Fewer disruptions, less exposure | Up to **40% fewer recurrent issues** |
| Operational Efficiency | Faster change, less rework | **70% faster** time-to-change |
| Workforce Performance | Right info, right person, right moment | **~90%** domain accuracy on operational queries (vs ~35% generic AI) |

Each pillar links down to the platform module that delivers it.

### The Platform — modules grid
Centered ecosystem visual on the left (reuse `PlatformEcosystemDiagram` / `PlatformArchitectureDiagramV4 compact`), capability cards on the right. Four cards using the canonical DTOP color tokens:

1. **Core Operational Apps** (blue) — ContentManager365 · TrainingManager365 · SafetyManager365. *One Connected Data Model across content, training, and safety.*
2. **DTOP Operating Model** (emerald) — Detect → Trigger → Orchestrate → Prove. *The way of working that wraps the stack.*
3. **Intelligence & Orchestration** (amber) — Automation · Insights · CoAnalyst. *Turns operational data into recommended actions.*
4. **Unified Mobile** (violet) — One frontline shell for content, training and safety.

Each card is clickable and scrolls to its dedicated section below (mirrors the "jump-to" interaction the Medium pitch already has on `TechV4PlatformOverview`).

### DTOP section
Horizontal 4-step ribbon (D · T · O · P) with one-line scenario in plain ops language: *"A weak signal appears → the platform triggers a workflow → the right teams orchestrate the response → the audit trail is produced automatically."* Industry-agnostic example (e.g., a high-risk operational anomaly), not aviation-specific.

### Intelligence section
Three sub-tiles: **Automation** · **Insights & Intelligence** · **CoAnalyst (Recommendations)**.
Headline: *"Generative AI built on your operational corpus — not a generic model with a wrapper."*
Anchor stat: **~90% domain accuracy at L4–5 vs ~35% generic AI.** With the disclaimer chip we already use (`StatSourceChip`).

### Mobile section
Phone mock + 3 bullets: one app for the frontline · works offline · contextual to role and shift.

### Why It Works (3 differentiators + trust)
Reuse the structure of `TechSlideWhyComply` but **strip aviation framing**:
- Connected Foundation
- Domain-Trained Intelligence
- Proof by Design

Trust band: 550+ customers · ~2.5M users · 6 continents (kept — already industry-agnostic and on-brand).

### CTA footer
- *Book a walkthrough* (primary)
- *See the Medium Pitch* → `/pitch-executive-3`
- *Industry deep dives* → links to `/solutions/airlines`, `/solutions/rail`, `/solutions/defense`

## Home page integration

Add a new card to the existing `pitchDecks` row (or a new "Platform" mini-section above it) on `src/pages/HomePage.tsx`:

- Title: **Platform Overview — Industry Agnostic**
- Description: "A clean, industry-agnostic walkthrough of the Operational Performance Platform — capabilities, DTOP, intelligence, and value."
- Badge: "Marketing page · self-serve"
- Icon: `Layers` (or `Sparkles`)
- Route: `/platform`

## Technical notes

- New route: `/platform` → `src/pages/PlatformOverview.tsx` (a normal scroll page, **not** a `SlideNavigationContext` deck).
- New folder `src/components/platform-page/` for sections: `PlatformHero`, `PlatformShift`, `PlatformOutcomes`, `PlatformModulesGrid`, `PlatformDTOP`, `PlatformIntelligence`, `PlatformMobile`, `PlatformWhy`, `PlatformCTA`.
- Reuse existing assets: `PlatformEcosystemDiagram`, `PlatformArchitectureDiagramV4` (compact), DTOP color mapping memory, trust signals memory.
- Sticky in-page nav (anchor links: Shift · Platform · DTOP · Intelligence · Mobile · Why) following the Medium pitch reading order.
- Add route in `src/App.tsx`. Add card in `src/pages/HomePage.tsx`.
- All text must follow `mem://content/terminology-rules` and `mem://content/platform-terminology-standards` (Generative AI, Recommended Actions, Operational Data — no FOQA/FDM/ASAP).
- No backend, no narration, no PPTX/PDF export — this is a marketing-style landing page.

## Out of scope
- Editing the Medium pitch deck itself.
- Industry-specific content (the existing `/solutions/*` pages already do this).
- New brand/visual identity — reuse existing tokens and components.
