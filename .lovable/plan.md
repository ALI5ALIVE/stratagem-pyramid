# Operational Performance Pitch — Sign-Off Call Changes

Apply ALL the decisions from the April 28 "Platform Enablement — Material Sign-Off" call to the **Operational Pitch** (`/operational-pitch`). The call refers to this as the "medium pitch" / "platform pitch" — same deck.

## Decisions captured from the transcript (slide-by-slide)

### 1. Hide / remove "The Cost of Fragmentation" (red bars slide) — `OpsSlide2CostOfFragmentation`
- *"I'm open to taking this out for now."* — Chris. *"Let's kill it."* — Kathrina. *"Again in the future. We might need it again, but currently let's hide it."* — Barak.
- Action: **remove** `OpsSlide2CostOfFragmentation` from the deck slide list (keep the file in case we restore it later).

### 2. Strategic shift → straight into the platform
- After removing the Cost slide, flow becomes: Title → Daily Reality → Before & After → **Platform diagram** → DTOP → …
- The "couple of slides at the end that show impact" (cost / time savings) stay — those are CustomerOutcomes & Maturity Roadmap.

### 3. Platform diagram (`PlatformArchitectureDiagramV4` used by `OpsSlide4Platform`) — solution-agnostic
- **Reorder L2 cells**: Automation → Insights & Intelligence → Recommendations & Prescriptive Actions (Future Vision). Already correct order — keep.
- **Make the Intelligence layer solution-agnostic** — strip CoAnalyst branding from the diagram itself. *"Resist the urge to label this curvy co analyst… keep it solution agnostic."* — Chris.
  - Remove "CoAnalyst — CoAuthor — CoTrainer" from the OpsSlide4Platform side-panel intelligence card heading; rename to **"The Intelligence & Orchestration Layer"** with a solution-agnostic value paragraph.
- **Add a small footnote inside the Insights & Intelligence cell**: *"CoAnalyst available across the platform — single-product capability live for SafetyManager365; Content & Training coming."* (Paul: *"It's almost like a footnote in that middle block."*)
- **Reinforce "Future Vision" badge** on the Recommendations cell (already present — bump prominence slightly).
- Do **not** restructure into intra/inter cells, do **not** add a new "Coming Soon" big slide. Decision in transcript was to keep the diagram clean and put the nuance into a footnote (final agreement at minute 50).

### 4. CoAnalyst slide (`OpsSlide5Intelligence`) — pivot to "why proprietary domain-trained AI beats generic AI"
- *"Co analyst versus generic AI is important — keep it… turn the co analyst slide into here's why proprietary AI is better than the generic stuff."* — Chris.
- Keep the 90% vs 35% headline (this is the legitimate CoAnalyst positioning, not a generic platform claim).
- **Replace the "7-figure R&D investment since 2023"** caption — *"don't say since 2023, it's not a lot."* — Barak. Use: *"A multi-year R&D investment — ML + LLMs trained on millions of historical aviation reports."*
- **Adopt the term "Domain-Trained Intelligence"** as a sub-headline / pill on this slide. *"Domain trained intelligence is a really good term… could be used on our co analyst slide especially as it relates to general AI."* — Chris.
- Update subtitle from *"Aviation-specific AI that generative AI can't replicate"* to *"Domain-trained intelligence — purpose-built for aviation, where generic AI falls short."*
- Strip any "co analyst is the platform-wide insights engine" framing; this slide is now strictly *CoAnalyst (single-product, live on Safety) vs generic AI*.

### 5. Add a NEW slide: Platform Insights & Intelligence (cross-product, solution-agnostic)
- *"We need to tell the agnostic insight and intelligence across the whole platform… what's the problem we're solving by being able to look across all three things."* — Chris/Paul.
- **New slide** inserted between the Platform diagram and the CoAnalyst slide: `OpsSlidePlatformInsights`.
  - Title: **"Platform Insights & Intelligence"**
  - Subtitle: *"Ask anything across Safety, Content & Training — in plain English."*
  - Content: cross-product question examples (e.g. *"Which procedures correlate with the most safety occurrences this quarter?"*), a small visual showing queries spanning the three apps, and the value: *unified data substrate · taxonomy · graph · aviation LLMs*.
  - Footer note: *"Powered by the platform's intelligence layer — independent of any single product line."*

### 6. Slide order rework — Insights first, then Recommendations (Future Vision)
- *"The flow needs to change that the insights comes first and then the recommendations."* — Kathrina.
- Reorder operational pitch to: Platform diagram → **Platform Insights & Intelligence (new)** → **CoAnalyst vs Generic AI** → Recommendations (Future Vision) note already in diagram + downstream slides.
- (Note: the deck doesn't currently have a standalone "Recommendations" slide; the Future Vision flag stays inside the diagram and use-case slides — matching what the call agreed.)

### 7. DTOP placement — keep DTOP before any use cases
- *"DTOP has to go before any of the use cases… that's the North Star."* — Chris/Paul.
- Verify slide order: Platform → Insights → CoAnalyst → **DTOP** → Stepping Stones / Maturity → Outcomes → Why Comply365 → Getting Started.
- Currently DTOP (`OpsSlide4DTOP`) sits AFTER `OpsSlide4Platform` and before `OpsSlide5Intelligence`. New order: Platform diagram → Platform Insights → CoAnalyst → DTOP → Stepping Stones …

### 8. Customer Outcomes slide (`CustomerOutcomesSlide`) — strip hard numbers
- *"Take away the 92, anything with a flavour for…"* — Kathrina; *"It's okay if we're not quantifying the result if we're saying like 'fewer' instead of 92 or 0."* — Chris.
- Edit the four outcome cards in `CustomerOutcomesSlide.tsx`:
  - "92% fewer incidents, schedule maintained" → **"Fewer incidents, schedule maintained"**
  - Any "Zero incidents" / hard percentages → **"Fewer incidents"** / **"Improved on-time performance"**
  - Keep signal/action narrative; only soften the quantified result line.
- *Reasoning: keep generic, defensible language since we can't verify these numbers yet.*
- **Remove the "Learn More about the Platform ROI" / Interactive Calculator CTA** from this slide — *"remove the ROI calculator for now until we're ready to use that."*

### 9. `OpsSlide9Outcomes` — also strip hard numbers (it's not in the live deck list but exists; leave file alone)
- File not in slide registry; no action needed.

### 10. Roadmap (`OpsSlide8MaturityRoadmap`) — strengthen 2027+, balanced layout
- Already updated per Paul; verify post-2027 framing is firm. No code change unless inspection shows a regression.

### 11. Closing slide — add a clean call-to-action
- *"We'll put a call to action here trying to find out more about the platform… contact us / your account director."*
- `OpsSlide11GettingStarted` — verify it ends with a simple CTA: *"Contact your account director to learn more about the Comply365 platform."* Update CTA copy if missing.

## Files to change

```text
src/pages/OperationalPitch.tsx
  — remove ops-slide-2 from the slides array
  — insert new ops-slide-platform-insights between ops-slide-3b (Platform) and ops-slide-5 (CoAnalyst)
  — reorder so DTOP sits AFTER CoAnalyst and BEFORE Stepping Stones (current order already has DTOP early; confirm and adjust)

src/components/platform-slides/PlatformArchitectureDiagramV4.tsx
  — add a small italic footnote line inside the Insights & Intelligence cell:
    "CoAnalyst across the platform · live on SafetyManager365 · Content & Training coming"
  — bump the "Future Vision" eyebrow on the Recommendations cell (slightly larger, more visible)

src/components/ops-slides/OpsSlide4Platform.tsx
  — rename intelligence panel heading to "The Intelligence & Orchestration Layer" (drop CoAnalyst/CoAuthor/CoTrainer name list)
  — rewrite the paragraph in solution-agnostic language

src/components/ops-slides/OpsSlide5Intelligence.tsx
  — update subtitle to "Domain-trained intelligence — purpose-built for aviation, where generic AI falls short."
  — add a small "Domain-Trained Intelligence" pill near the hero stat
  — replace the "since 2023" caption with multi-year wording
  — keep all other content (90% vs 35%, precision gap, intelligence tiers)

src/components/ops-slides/OpsSlidePlatformInsights.tsx  (NEW)
  — cross-product Insights & Intelligence slide with 3-4 example questions spanning Safety + Content + Training
  — ID: ops-slide-platform-insights
  — uses SalesSlideContainer; visual: data-substrate band on top, three product columns feeding a "Plain-English query" box

src/components/shared/CustomerOutcomesSlide.tsx
  — soften quantified result strings ("92% fewer" → "fewer"; "Zero incidents" → "fewer incidents")
  — remove the Platform ROI / Interactive Calculator CTA block at the bottom
  — replace removed CTA area with a short generic line: "Connecting safety signals to schedule, revenue, cost and loyalty outcomes."

src/components/ops-slides/OpsSlide11GettingStarted.tsx
  — verify and, if missing, add CTA: "Contact your account director to learn more about the Comply365 platform."
```

Other decks (`ExecSlide3Platform`, `TechSlide4Platform`, `TechV4PlatformOverview`, `PFSlide3Architecture`, Customer Overview) consume `PlatformArchitectureDiagramV4`. The footnote and Future Vision badge bump will appear there too — this is desirable (one canonical platform picture).

## Out of scope

- No narration audio re-recording. Updating the on-screen text only; narration scripts can be refreshed in a follow-up if you want.
- No PPTX exporter changes — the operational pitch is delivered live, not exported.
- No changes to the Executive Pitch, Customer Overview, or Technical decks beyond the diagram footnote inherited from `PlatformArchitectureDiagramV4`.
- No re-add of the Cost of Fragmentation slide; file kept on disk for future use.

## Acceptance

- `/operational-pitch` flow: Title → Daily Reality → Before & After → Platform diagram → **Platform Insights & Intelligence (new)** → **CoAnalyst vs Generic AI** → DTOP → Stepping Stones → Maturity → Customer Outcomes → Why Comply365 → Getting Started.
- Cost of Fragmentation slide is gone.
- Platform diagram shows solution-agnostic Intelligence layer with a small CoAnalyst footnote and prominent Future Vision tag on Recommendations.
- CoAnalyst slide leads with "Domain-Trained Intelligence" framing; no "since 2023" text.
- Customer Outcomes uses generic "fewer / improved" language; ROI calculator CTA removed.
- All slides remain `h-screen` with no clipping at 1292×885.
