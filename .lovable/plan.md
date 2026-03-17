

# Simplify "How CoAnalyst Works" — Focus on Intelligence Tiers

## Change

**File:** `src/components/coanalyst-slides/CASlide6HowItWorks.tsx`

### Replace the 5-step pipeline with a single-line minimal reference
- Remove the `steps` array and the full pipeline card grid
- Replace with a single compact line at the top: **"Data → AI Enrichment → Intelligence → Operational Systems"** styled as small inline pills with arrows — one line, no cards, no descriptions
- This acknowledges the pipeline exists without competing with DTOP's Detect → Trigger → Orchestrate → Prove

### Promote the 4 intelligence tiers to be the hero content
- Make the tier cards larger — increase padding, bump font sizes up slightly, give them more vertical space
- Update subtitle from "From data ingestion to proactive control management" to **"Four levels of intelligence — from hindsight to foresight"**

### Keep
- The "Intelligence Maturity" label and gradient progression line
- The positioning callout at the bottom
- All tier data (Historical, Reactive, Proactive, Predictive) unchanged

### Remove
- `steps` array, `Database`, `Sparkles`, `Search`, `Brain`, `ShieldCheck`, `ArrowRight` icon imports

