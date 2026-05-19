## Goal
Refocus Week 2 of the Sales Enablement deck on **the Intelligence layer and platform-wide capabilities**, by:
1. Adding a new **"The Platform · Insights & Intelligence"** slide (using the copy you supplied, plus the 6-stage "how it works" pipeline).
2. Removing the three Core Apps slides (SafetyManager365 / ContentManager365 / TrainingManager365) so Week 2 isn't app-by-app, it's capability-by-capability.

Core Apps are still named on the existing Week 2 platform-map slide so reps don't lose the picture — they just don't get their own deep-dive slides any more.

## Changes

### 1. New slide — `src/components/sales-enablement-slides/SEPlatformInsightsIntelligence.tsx`
Wraps `PitchSlideContainer` with:
- Title: **The Platform · Insights & Intelligence**
- Subtitle: **A platform-wide intelligence capability — just by asking**
- Lead paragraph: the platform-wide capability description (ask plain-English ops questions, get insights/correlations/recommended actions across Safety, Training, Content, Compliance).
- Two-column **Ask / Get back** panel:
  - Ask: *"Are dangerous goods incidents linked to training gaps?"*
  - Get back: *3 stations show DG handling spikes — all three correlate with overdue DG recurrent training. Recommended actions generated.*
- Section header: **How it works · behind the answer** — meta label: *reactive — you ask, the platform answers · 6 stages · seconds end-to-end*.
- **6-stage pipeline** (DTOP-token colors, lucide icons):
  1. Plain-English question — captured in-app, parsed against aviation taxonomy
  2. Connected operational data — Safety/content/training/ops in unified tenant-isolated context
  3. Domain knowledge graph — 4,000+ aviation categories at 5 levels
  4. Domain-trained reasoning — aviation ML guides the LLM, cited evidence, no hallucinated micro-classifications
  5. Guardrails & audit trail — tenant isolation, source citations, full traceability
  6. **Answer + recommended actions** — cross-domain insight + prescriptive next steps (added to honour the "6 stages" header; your source copy stopped at 5)

### 2. `src/pages/SalesEnablement.tsx`
- Import the new slide; drop unused imports for the three Core Apps slides (`TechV4Slide4aSafetyManager`, `TechV4Slide4bContentManager`, `TechV4Slide4cTrainingManager`).
- Replace the Week 2 sequence so it reads:

```text
▸ Week 2 · Capabilities                       (divider)
W2 · The Platform (map)                       (existing overview)
W2 · Platform · Insights & Intelligence       (NEW)
W2 · Intelligence — Intelligence Layer
W2 · Intelligence & Insights — Use Cases
W2 · Intelligence — Insights
W2 · Recommendations — Use Cases
W2 · Intelligence — Automation
W2 · Automation — Use Cases
W2 · Intelligence Layer vs Generic AI
W2 · Mobile
W2 · Capability Talk Track
```

(Removed: `se-slide-4a`, `se-slide-4b`, `se-slide-4c`.)

- Update `weekProps.w2.upNext` to reflect the new flow: `["The Platform map", "Insights & Intelligence", "Intelligence Layer", "Insights", "Automation", "Intelligence Layer vs Generic AI", "Mobile", "Capability cheat sheet"]`.
- Update `weekProps.w2.learningGoal` to drop "describe each capability in 60 seconds" framing where it implies Core Apps deep-dives, and lead with the Intelligence layer.

### 3. `src/data/salesEnablementNarration.ts`
- Add a 5-part coach script entry for `se-platform-insights-intelligence` (why it matters → core message → pain→value pivot → how to deliver → transition into Intelligence Layer).
- Remove narration entries for `se-slide-4a`, `se-slide-4b`, `se-slide-4c`.
- Edit the existing `se-week-2-overview` narration: change the closing transition line from *"…starting with SafetyManager365."* to *"…starting with the platform-wide Insights & Intelligence capability that sits on top of all three Core Apps."*

### 4. Optional cleanup (will do unless you object)
- Leave `SEWeek2PlatformOverview` as-is (it still names the three Core Apps in the map — that's correct; they exist, we just don't dwell on them slide-by-slide).
- No academy DB or PPTX exporter changes needed.

## Out of scope
- No edits to `TechV4Slide4a/b/c…` files themselves — they remain in the Tech deck.
- No new diagrams.
- No changes to Week 1 or Week 3.