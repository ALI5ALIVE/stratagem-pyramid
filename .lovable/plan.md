

# Add Intelligence Tiers to "How CoAnalyst Works" Slide

## Change

**File:** `src/components/coanalyst-slides/CASlide6HowItWorks.tsx`

Add a 4-phase intelligence tier strip below the existing 5-step pipeline, showing the progression from Historical → Reactive → Proactive → Predictive. Each tier gets a compact card with icon, label, one-line description, and an example query/output.

### Layout
- **Top:** Existing 5-step pipeline (Ingest → Enrich → Detect → Intelligence → Activate) — kept as-is
- **Middle (new):** 4 intelligence tiers in a horizontal row with a gradient progression indicator: Historical (blue) → Reactive (amber) → Proactive (purple) → Predictive (emerald). Each card: icon, tier name, one-liner, example in italic.
- **Bottom:** Existing positioning callout — update to remove the Palantir reference (aligns with the intelligence layer reframing already done)

### Intelligence Tiers Data
1. **Historical** — "What happened?" — Query past events across years of data — _"How did we perform at Gate 14 over the last 4 years?"_
2. **Reactive** — "What's happening now?" — Real-time alerts and situational awareness — _"What happened at Dubai airport 10 minutes ago?"_
3. **Proactive** — "What should we watch?" — Pattern detection and emerging hazard indicators — _"Increasing bird strike reports on RWY 27L this quarter"_
4. **Predictive** — "What's likely next?" — Likelihood modelling and forward-looking risk — _"68% probability of fatigue-related event on this route pattern"_

### Visual Treatment
- A subtle label "Intelligence Maturity" on the left
- 4 cards in a single row with a connecting gradient line underneath progressing from cool to warm
- Icons: Clock, Zap, Eye, TrendingUp (from lucide-react)

