
## Sales Enablement Academy — feedback fixes

Scope is the Sales Enablement Academy training narrations + a couple of slide visuals. The Exec Pitch 3 deck and the Roadmap 2026 slide itself are mostly already correct (✅/🔄/📋 statuses, no fake "production" claims for POCs), but two cosmetic/wording items there are also addressed below.

Slide numbers referenced are the 1-indexed in-deck positions on `/sales-enablement` after the Week 1 divider splice.

---

### 1. Slide 12 (Insights & Recommendations) — roadmap dates wrong

Current narration (`se-slide-insights` in `src/data/salesEnablementNarration.ts`) says:
> "Roadmap-wise, this lands in the **early-2026** phase — keep that date locked, do not slip it."

That conflicts with what Paul/Barak pushed back on. Per locked roadmap (mem `roadmap-dates` + `TechSlide15Roadmap2026`):

- **Insights POC** — H1 2026 (already shipped as a *proof of concept*, not production)
- **Insights rollout** — H2 2026
- **Recommendations & Prescriptive Actions** — 2027+

Rewrite the `se-slide-insights` narration to:
- Split Insights vs Recommendations explicitly.
- Frame H1 2026 as a **POC** (internal prototype, not a customer-usable feature) — H2 2026 as the production rollout for Insights — Recommendations as 2027+ vision.
- Drop the "keep that date locked, do not slip it" line.

### 2. POC vs production language — distinction Paul wanted

Add a one-line clarification to:

- `se-slide-insights` narration (above).
- `se-slide-automation` narration — currently says "Automation is the **mid-2026 phase**". Update to: POC complete H1 2026; production rollout H2 2026. Keep the human-in-the-loop framing.
- `se-slide-mobile` narration — currently says "late-2026 phase". Replace with the actual locked phases: Phase 1 (Training in iOS) H1 2026; Phase 2 (Safety Reporting) H2 2026; Phase 3 (full unified shell) 2027+.

Memory update: extend `mem://product/roadmap-dates` with the POC-vs-production distinction so future narrations don't blur the two again.

No change needed to `TechSlide15Roadmap2026` itself — it already uses ✅/🔄/📋 status icons and labels POCs explicitly. The legend already says "Done / In Progress / Planned" — we'll add a one-line footnote: *"POC = internal prototype validating an approach, not a customer-deliverable feature."*

### 3. Slide 19 says "demo" — not ready yet

Slide 19 (1-indexed) is `se-discovery-to-close` (the Discovery → Demo → Close cheat sheet). Component: `src/components/sales-enablement-slides/SEDiscoveryToClose.tsx`.

Rename the middle stage from **Demo** to **Walkthrough** (and update icon label, the "Say this" copy, and the discovery question wording). Update the slide title from "Discovery → Demo → Close" to **"Discovery → Walkthrough → Close"**. Also update:
- `SESlide0Title.tsx` line "Discovery → demo → close, use cases, objections" → "Discovery → walkthrough → close, …".
- The narrations for `se-slide-0`, `se-week-3`, `se-discovery-to-close`, and `se-slide-closing` (all currently say "demo") — swap to "walkthrough" or "focused walkthrough".
- The objections "Bridge to demo" column header in `SEObjections.tsx` → "Bridge to next step", and the bridge copy that currently says "20-minute demo" → "20-minute walkthrough".

### 4. Slide 24 says "top 5 objections" but slide 25 shows 3

Two things:

a. **Wording.** The Week 3 / closing narrations say "the top objections" and "top three objections"; nothing in code literally says "top 5", but the user clearly saw a "top 5" cue somewhere. Audit and standardize to **"top 3 objections"** everywhere:
   - `se-module-6`/closing-arc narration (already says "top three" — keep).
   - `SEObjections.tsx` subtitle currently: *"Top 3 pushbacks · Acknowledge → Reframe → Bridge."* — keep.
   - `dtopPlaybook.ts` `objections` array has 5 entries; we keep all 5 in the data but the Academy slide already slices to 3. We'll add a code comment so this doesn't drift again.
   - If any "top 5" appears in a recently rebuilt narration audio cache, the script change here will regenerate it on next play.

b. **3rd objection cut off + general bottom-cutoff at 100% zoom.** Root cause is `PitchSlideContainer`:
   - `pt-10 sm:pt-14 pb-16 sm:pb-20` is aggressive vertical padding, and
   - the content area uses `flex-1 overflow-hidden`, so anything over the budget is clipped (no scroll fallback).

   Fixes:
   - Reduce default padding to `pt-8 sm:pt-10 pb-10 sm:pb-12` (still leaves room for the bottom slide number).
   - Move the slide-number marker up from `bottom-16/20` to `bottom-4/6` so the reduced padding still clears it.
   - On `SEObjections.tsx` specifically, tighten each row: drop `pt-3` on the outer wrapper, change row padding from `p-3` to `p-2.5`, and gap from `gap-2` to `gap-1.5`. This gives the 3rd row enough room at 1080×720 / 100% zoom.

   These container-padding changes are global. I'll spot-check the densest slides (`TechSlide15Roadmap2026`, `TechV4PlatformOverview`, `IRSlide2WhatIs`) in the preview after the change to make sure nothing else clips or shifts.

### 5. Exec Pitch 3 slide #17 (Roadmap 2026) — Insights+Recommendations in H1

Looking at `TechSlide15Roadmap2026.tsx`, H1 2026 currently lists:
> "✅ Platform Proof of Concept for Future Vision — Platform-wide Insights & Recommendations (Intelligence & Orchestration Layer)"

That single bullet conflates Insights (which IS in H1 as a POC) with Recommendations (which is **2027+**, per Paul/Barak). Fix:

- H1 2026: keep "✅ Platform Proof of Concept — **Insights**" (POC only, no Recommendations).
- H2 2026: already has "📋 Platform-wide Business Intelligence POC" — relabel to "📋 **Platform-wide Insights rollout (production)**" for clarity.
- 2027+: already says "Roll out of Platform-wide Insights & Recommendations — Future Vision" — keep, but add explicit "Recommendations & Prescriptive Actions (2027+)" so the split with Insights is unambiguous.

Add the POC-clarification footnote (item 2) under the roadmap status legend.

---

## Files to change

- `src/data/salesEnablementNarration.ts` — rewrite Insights, Automation, Mobile narrations; swap "demo" → "walkthrough" in Title/Week-3/Discovery/Closing scripts.
- `src/components/sales-enablement-slides/SEDiscoveryToClose.tsx` — Demo → Walkthrough (stage, copy, title).
- `src/components/sales-enablement-slides/SESlide0Title.tsx` — copy line.
- `src/components/sales-enablement-slides/SEObjections.tsx` — tighten layout, rename "Bridge to demo" → "Bridge to next step", update bridge copy.
- `src/components/shared/PitchSlideContainer.tsx` — reduce vertical padding, move slide-number marker.
- `src/components/tech-slides/TechSlide15Roadmap2026.tsx` — split Insights vs Recommendations across phases; POC footnote.
- `mem/product/roadmap-dates.md` — add POC-vs-production rule.

## Out of scope

- No DB / migration changes.
- No changes to Exec Pitch 3 ordering or other slides.
- Quiz question content stays as-is.

## Risks

- Reducing `PitchSlideContainer` padding affects every deck that uses it. I'll spot-check 3–4 of the densest slides post-change.
- "Walkthrough" replaces "demo" everywhere in Sales Enablement only — other decks keep their existing wording.
