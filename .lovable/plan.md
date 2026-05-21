## Recolor Insights & Intelligence and add a Prove box

You're right — the Insights & Intelligence box currently reads green (Prove) but it actually powers **Detect**. And Insights re-appears later for **Prove** (the audit pack), so it deserves its own green box.

### Edits in `src/components/sales-enablement-slides/SEW3WholeVisionWhiteboard.tsx`

**SVG — restructure the "Intelligence & Orchestration Layer" into 4 columns** (currently 3) across width 640:

1. **Insights** (Detect · blue) — fill `#dbeafe`, stroke `#2563eb`, header `#1e3a5f`
   - "trends surface themselves" · "domain-trained for ops"
2. **Intelligence** (Trigger · amber) — fill `#fef3c7`, stroke `#f59e0b`, header `#7c2d12`
   - "~90% vs ~35% generic" · "cited · reg · procedure" · "Recommended Actions"
   - Merges what was the standalone "Recommendations" box, since Recommendations = the output of the Intelligence Layer
3. **Automation** (Orchestrate · violet) — unchanged colors, keep `#ede9fe` / `#8b5cf6`
   - "runs the play" · "draft · review · assign · push"
4. **Insights · Prove** (Prove · green) — fill `#d1fae5`, stroke `#10b981`, header `#064e3b`
   - "trend flattened" · "audit pack cited" · "loop closed"

Each box ~150px wide with 10px gaps. Layer header stays.

**Say-it script (right column) — re-color and re-label the beats** to match:
- Beat 2 split into **2a · Insights** (blue dot `bg-sky-400`, accent `text-sky-300`, "powers Detect") and **2b · Intelligence** (amber dot, "powers Trigger — Recommended Actions with citations, ~90% vs ~35%"). The standalone Recommendations beat is folded into 2b.
- Beat 4 split into **3 · Automation** (violet, "delivers Orchestrate") and **4 · Insights · Prove** (green dot `bg-emerald-400`, accent `text-emerald-300`, "closes Prove — trend flat, audit pack cited").
- Result: 5 numbered beats (Core Apps · Insights · Intelligence · Automation · Insights·Prove) in DTOP-color order, matching the whiteboard left-to-right.

**DTOP loop band at top stays as-is** (Detect blue, Trigger amber, Orchestrate violet, Prove green) — now the box colors below mirror it cleanly.

No narration text changes needed (the `salesEnablementNarration.ts` script for this slide already walks Detect → Trigger → Orchestrate → Prove); only the visual + on-slide beat chips change.