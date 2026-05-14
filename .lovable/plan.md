## Goal

Replace the current `/` route with a new public marketing homepage for the **Comply365 Operational Performance Platform**, built from 15 modular sections under `src/components/home/`. Keep all existing pitch decks, Practice Center, and playbook routes untouched.

## Files

### New
- `src/pages/OperationalPlatformHome.tsx` — page shell that imports every section in order and applies the dark-theme background.
- `src/components/home/TopNav.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/CustomerTrustBar.tsx`
- `src/components/home/TheShift.tsx`
- `src/components/home/PlatformPicture.tsx`
- `src/components/home/DTOPStrip.tsx`
- `src/components/home/ProductPillars.tsx`
- `src/components/home/SolutionsByIndustry.tsx`
- `src/components/home/CoAnalystSpotlight.tsx`
- `src/components/home/CustomerOutcomes.tsx`
- `src/components/home/WhyComply365.tsx`
- `src/components/home/SecurityTrust.tsx`
- `src/components/home/ResourcesStrip.tsx`
- `src/components/home/FinalCTA.tsx`
- `src/components/home/Footer.tsx`

### Edited
- `src/App.tsx` — swap `<Route path="/" element={<HomePage />} />` to `<OperationalPlatformHome />`. Keep the old `HomePage` component file in place but route it to `/home-legacy` so nothing else breaks.

## Section content (operator-grade copy, locked)

**TopNav** — sticky, translucent dark. Logo · Platform · Solutions ▾ (Airlines, Defense, Rail) · Customers · Resources · Pricing · primary CTA `Book a working session`.

**Hero** — left column: eyeline "The Operational Performance Platform" · H1 "Turn operational data into operational control." · sub "Comply365 unifies safety, ops, training and regulation into one closed loop — Detect → Trigger → Orchestrate → Prove." · CTAs `Book a working session` (primary blue) + `See the platform` (ghost). Right column: layered product collage (OCC card + mobile shell + CoAnalyst answer card). No autoplay, no narration bar.

**CustomerTrustBar** — one line "Trusted by operators flying, running and certifying mission-critical operations." · 8–10 monochrome operator logos in a single row (placeholder text-mark logos initially).

**TheShift** — two-column. Left "Today" (fragmented tools, reactive investigation, slow loop, controllable cost lost). Right "Tomorrow" (one platform, predictive, closed loop, systemic risk reduced). Anchors on controllable cost and systemic risk per the messaging-refinement memory.

**PlatformPicture** — `/src/assets/comply365-platform-ecosystem.png` rendered full-width with caption "One platform. Four layers. One closed loop."

**DTOPStrip** — four chips with the canonical DTOP colour mapping:
- Detect (blue) — surface the signal across operations.
- Trigger (amber) — turn signal into a workflow, not a ticket.
- Orchestrate (violet) — drive the work across teams, mobile and OCC.
- Prove (emerald) — auditable evidence the loop closed.

**ProductPillars** — four cards linking to existing routes:
- DTOP — System of Work → `/platform`
- Unified Mobile Shell → `/mobile` (or closest existing route)
- CoAnalyst — Intelligence Layer → `/coanalyst`
- Regulation Management → `/regulation` (or closest existing route)

**SolutionsByIndustry** — three large cards: Airlines → `/solutions/airlines`, Defense → `/solutions/defense`, Rail → `/solutions/rail`. One outcome line each.

**CoAnalystSpotlight** — answer-card screenshot (use an existing CoAnalyst visual or a styled mock card). Headline "Generative AI tuned to your operation, not the open web." · proof line "~90% domain accuracy at L4–5 vs ~35% generic AI." · CTA `See CoAnalyst in action` → `/coanalyst`.

**CustomerOutcomes** — three stat tiles pulled only from the standardized trust-signals memory · one short pull quote · ROI-modelling disclaimer footnote per the pitch-deck-disclaimer memory.

**WhyComply365** — three differentiators per the closing-strategy memory: domain-tuned intelligence (not generic AI) · one operating model (DTOP) · auditable by design.

**SecurityTrust** — badge row: SOC 2 · ISO 27001 · regional data residency · tenant isolation · SSO/SAML. One architecture line: "Tenant-isolated by design, integrated with your IdP, deployable to your region."

**ResourcesStrip** — three cards: a customer story, an analyst/regulator reference, a CoAnalyst technical brief. Cards are placeholders linking to `#` until real assets exist.

**FinalCTA** — full-width band: "Bring us your hardest operational loop. We'll show you it closed in 20 minutes." Primary `Book a working session` · secondary `Talk to sales`.

**Footer** — four columns (Platform, Solutions, Customers, Company), legal row, status link, small certifications strip.

## Design rules (enforced)

- Dark theme `hsl(222 47% 6%)`, Space Grotesk headings, Inter body, primary `#0066FF`, semantic Tailwind tokens only.
- DTOP colour mapping: D blue · T amber · O violet · P emerald.
- Product names with no spaces: Comply365, SafetyManager365, ContentManager365.
- Approved AI terminology only: Generative AI · Recommended Actions · Operational Data. No FOQA / FDM / ASAP.
- CoAnalyst accuracy framing exactly: "~90% domain accuracy at L4–5 vs ~35% generic AI".
- Use the existing platform ecosystem PNG; do not generate a dynamic SVG.
- No emojis. No gradient text headlines. No autoplay. No narration bar.
- Sections are full-viewport where appropriate, with asymmetrical padding and no clipping. Mobile-responsive at all breakpoints.

## Out of scope

- No backend, auth, or DB changes.
- No edits to existing pitch decks, Practice Center, playbooks, or industry pages.
- No new ecosystem PNG generation — reuse the existing asset.
- Real customer logos, screenshots, and resource links come later; first pass uses styled placeholders.

## Verification

- Visit `/` → new homepage renders top-to-bottom in the order above with no clipping at 1381×865 and at mobile breakpoints.
- Every CTA / pillar / solution card navigates to an existing route (no dead links inside the app).
- All copy matches the locked terminology rules; no forbidden acronyms appear.
- Existing routes (`/practice-center`, `/pitch-executive-3`, `/coanalyst`, `/solutions/*`, etc.) still work unchanged.