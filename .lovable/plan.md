## Goal

Create a dedicated **Market Development** hub at `/market-development` that brings together every asset we've built to *create and validate the category* — research, positioning, messaging, content strategy, thought-leadership, brand homepages — separate from the sales enablement portal (which is for closing deals on existing pipeline).

This becomes the home for the "outside-in" workstream: how we shape the market, not how we sell into it.

## What goes on the page

Assets are grouped into 5 workstreams. Each item is a card with title, one-line purpose, status chip (Live / Draft / In Research), and a deep-link.

**1. Research & Evidence**
- Category Research Programme (`/category-research-programme`) — McKinsey-style mixed-methods study
- Line of Sight ROI model (`/line-of-sight`) — quant proof of operational cost
- Maturity Curve (`/maturity-curve`) — diagnostic instrument

**2. Positioning & Category Design**
- Positioning Playbook (`/positioning-playbook`) — category narrative source of truth
- DTOP Packaging POV (`/dtop-packaging-pov`) — how we package the operating model
- Strategy Vision Session (`/strategy-vision-session`) — 3-hour executive whiteboard

**3. Messaging & Narrative**
- Signals Playbook (`/signals-playbook`) — core "signals" narrative
- CoAnalyst Intelligence Layer (`/coanalyst`) — intelligence-layer story
- Personas Deep Dive (`/personas`) — buyer/user persona narratives

**4. Content Strategy & Thought Leadership**
- Content Strategy (`/content-strategy`) — editorial plan and pillars
- AI Infographic (`/ai-infographic`) — visual thought-leadership asset
- From Signals to Control event (`/events/from-signals-to-control`) — flagship event
- Event brief (`/events/from-signals-to-control/brief`)

**5. Brand & Category Homepages**
- Comply365 Home (`/comply365-home`) — flagship brand home
- Operational Platform Home (`/operational-platform`)
- Platform Mockup (`/platform-mockup`) — exploratory brand surface
- Homepage Mockup (`/homepage-mockup`)
- Industry pages: Airlines, Defense, Rail

## Page structure

```
Hero band            — "Market Development" eyebrow, H1 on creating the category, short subhead
Workstream nav strip — 5 anchor links to sections below
Programme map (1 band) — visual: how research → positioning → messaging → content → brand fit together
Section per workstream (×5) — short framing paragraph + card grid of assets
Operating rhythm band — cadence (quarterly research cut, monthly narrative review, etc.)
CTA band             — "Contribute / commission new asset" — links to Strategy Vision Session
```

All sections `h-screen`-friendly with asymmetrical padding, DTOP color tokens, dark theme, Space Grotesk / Inter per design system.

## Navigation & integration

- **`App.tsx`** — register `/market-development` route
- **`AppSidebar.tsx`** — new top-level "Market Development" group containing this hub link (keeps it visibly distinct from the existing sales enablement group)
- **`HomePage.tsx`** — add a primary card linking to the hub (alongside Sales Enablement, Strategy Vision Session, Category Research Programme)

## Files

- `src/pages/MarketDevelopmentHub.tsx` (new)
- `src/data/marketDevelopmentAssets.ts` (new) — typed array of asset records grouped by workstream
- `src/App.tsx` (edit) — add route
- `src/components/AppSidebar.tsx` (edit) — add nav group
- `src/pages/HomePage.tsx` (edit) — add hub card

## Out of scope

- No backend / auth
- No edits to enablement portal pages
- No new deck or playbook content — this is a *catalog and hub*, not new artefacts
- No PDF export
