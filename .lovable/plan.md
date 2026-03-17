

# Update TechSlide14MaturityRoadmap to Match OpsSlide8

## Change
Replace the sparse `TechSlide14MaturityRoadmap.tsx` with the same rich data model and layout used in `OpsSlide8MaturityRoadmap.tsx`. The technical slide currently only shows a one-liner per stage — the ops version has behavioral shifts, time allocation bars, value proof metrics, and detailed "what it looks like" bullets.

## File: `src/components/tech-slides/TechSlide14MaturityRoadmap.tsx`
- Replace the thin `stages` array with the full `StageData` interface and 5-stage dataset (same structure as ops slide, same content since it's the same maturity model)
- Replace the right panel (currently just 5 buttons with one-liners) with the rich detail panel: header, "What it looks like" bullets, behavioral shift from→to, time allocation stacked bar, result + value proof grid
- Replace the small 100×100 SVG with the larger 500×200 viewBox curve with labeled dots and stage pills below
- Keep the slide ID as `tech-slide-14` and export name as `TechSlide14MaturityRoadmap`
- Add imports for `ArrowRight, Check, Eye, Target, TrendingUp, Clock` from lucide-react

The data content (whatItLooksLike, behavioralShift, timeAllocation, valueProof, result) will be identical to the ops slide since it describes the same platform maturity journey.

