## Consistency Audit — Decks & Capabilities

A full pass across all customer pitch decks (excl. CEO pitch), capability playbooks (Platform, CoAnalyst, DTOP, Insights, Automation, Mobile, Regulation Management), the Sales Enablement deck and Academy, and supporting components. Below is what's misleading, contradictory or off-brand today, and exactly how we'll align it. One implementation pass — no UX redesign, just content/terminology fixes.

---

### 1. Forbidden terminology still in play (memory rule violation)

Memory rule: use **"Generative AI"**, **"Recommended Actions"**, **"Operational Data"** — never FOQA / FDM / Foqua / ASAP raw acronyms in customer-facing copy.

Violations found:
- `src/components/slides/Slide3OperatingModel.tsx` — "FOQA exceedance triggers automatic alert", `dataSources` chips `FOQA`, `ASAP`.
- `src/components/slides/SlideUseCases.tsx` — "FOQA data shows elevated hard landing rates… Flight Operations Quality Assurance".
- `src/components/shared/CustomerOutcomesSlide.tsx`, `src/components/slides/Slide7Customers.tsx` — "Hard landing trend detected in FOQA data".
- `src/components/slides/SlideMessagingContext.tsx` — "FOQA exceedance detected".
- `src/pages/HomepageMockup.tsx` — "FOQA, ASAP, audit finding captured" (×2).
- `src/pages/solutions/AirlinesPage.tsx` — multiple FOQA references including hero subhead "From FOQA signal to crew action".
- `src/exporters/pptx/buildTechnicalDeck.ts` — "FOQA exceedance detected", "FOQA exceedance trends".
- `src/data/dtopPlaybook.ts` — `dataSources: ["Safety reports (ASR/ASAP)", "Flight data (FOQA/FDM)", …]`, competitor row `"Flight Data Analytics (e.g., GE FDM)"`.
- `src/data/operationalPitchNarration.ts` — "Foqua, Aviation Safety Action Program reports".
- `src/data/lineOfSightData.ts` — methodology copy refers to "FOQA trend detection", "ASAP/injury report pattern".
- `src/data/technicalPitchNarration.ts` — "ingesting FOQA, ASAP, voluntary reports".

Fix: global swap to neutral language:
- "FOQA" / "FDM" / "Foqua" → **"flight operational data"** (or **"Operational Data signals"** in chip context).
- "ASAP / ASR" raw chips → **"Crew safety reports"**.
- "Hard landing detected in FOQA data" → **"Hard landing trend detected in operational data"**.
- Competitor row "GE FDM" → **"Flight data analytics tools"**.
- Narration scripts: same substitutions, re-record-safe (just text).

### 2. Product naming drift (memory rule: BrandNumber, no spaces)

Rule: `Comply365`, `SafetyManager365`, `ContentManager365`, `TrainingManager365` — no spaces, no "365" gap.

Violations:
- `src/components/ops-slides/OpsSlide4DTOP.tsx` — `Safety Manager365`, `Content Manager365`, `Training Manager365` (space before 365).
- `src/components/coanalyst-slides/CASlide14DeckStructure.tsx`, `CASlide2CategoryNarrative.tsx` — "Safety, Content, Training Manager 365" / "Training Manager 365".
- `src/components/coanalyst-slides/CASlide11Taglines.tsx` — "Safety, Content, and Training Manager 365".
- `src/data/executivePitchNarration.ts` — "Safety Manager", "Content Manager", "Training Manager" (no 365).
- `src/data/operationalPitchNarration.ts` — "Safety Manager three six five" (acceptable for narration phonetics — keep), but also "Safety Manager", "Content Manager", "Training Manager" used loosely elsewhere — normalize to "SafetyManager365" in non-narration copy.
- `src/data/technicalPitchNarration.ts` — "Safety Manager", "Content Manager", "Training Manager", and slide title `"Safety Manager 365"` — align in titles to `SafetyManager365`. (Inside narration scripts, keep phonetic spelling "three six five" but tighten to "Safety Manager three six five" consistently — already correct in ops, drift in exec.)
- `src/pages/HomepageMockup.tsx` nav links list "Safety Manager", "Content Manager", "Training Manager" — fix to `SafetyManager365`, etc.

Fix: normalize all visible UI strings to `SafetyManager365` / `ContentManager365` / `TrainingManager365`. Narration `script` strings keep the phonetic `"three six five"` form for TTS quality, but standardize to "Safety Manager three six five", etc., everywhere.

### 3. Category / platform naming conflict

Two competing platform names live in different parts of the app:
- **"Operational Performance Platform"** — the canonical name (memory + platform playbook + customer overview + tech v4).
- **"Operational Excellence Platform" / "Operational Orchestration Platform" / "Operational Assurance Platform"** — alternative category options in `src/components/slides/category-options/categoryOptionData.ts`, surfaced via `Slide9CategoryRationale` / `SlideCategoryAssurance` etc.

These category-options slides were exploration artifacts. They contradict the "Operational Performance Platform" we use everywhere customer-facing.

Fix: the 4 category-option slides remain in the codebase but are **not referenced from any active deck route**. Verify (search for imports) and, if any active deck imports them, drop those slides. Keep the data file for internal reference but add a top-of-file comment marking it as superseded by "Operational Performance Platform".

### 4. Accuracy stat inconsistencies (CoAnalyst)

The "domain accuracy" headline number drifts:
- Platform playbook: **">90% accuracy"** (CoAnalyst card).
- Tech deck `TechSlide8IntelligenceTiers.tsx`: rows show "**90%** accuracy at granular categorization" + Level 4–5 `~90%` vs `30–40%`.
- Operational narration: "**over ninety percent** … vs roughly **thirty-five percent**".
- PPTX exporter: stat tile "**90%** … vs ~35% generic AI" and bullet "90% vs 35% accuracy" — but bullet just below says "fine-tuned… since 2023".
- CoAnalyst narration slide 8: ranges are "70–80%" generic at L1–L2, "30–40%" at L4–L5, vs CoAnalyst ">90%" — internally consistent but framing differs from the ops/tech "35%" generic baseline.

Fix: lock the canonical line everywhere customer-facing as:
> **"~90% domain accuracy at deep classification (Level 4–5) — vs ~35% for generic AI."**

Update:
- Tech `TechSlide8IntelligenceTiers.tsx` accuracy table — keep, it's the most precise breakdown; reword summary row to match.
- Platform playbook `intelligenceCapabilities[CoAnalyst].bullets[0]` "Aviation-trained AI (>90% accuracy)" → **"Aviation-trained AI · ~90% domain accuracy (vs ~35% generic)"**.
- CoAnalyst narration scripts: keep "over ninety percent" but replace the "70–80% generic at L1–L2" framing with the canonical 90% vs 35% headline; preserve the L4–L5 detail for the comparison slide only.

### 5. Roadmap dates — pick one source of truth

Mixed dates across files for the same milestones:
- Mobile Phase 1 (TrainingManager365 in shell): platform playbook "**Q2 2026**", mobile playbook "**Phase 1 · Q2 2026**", PPTX "Phase 1 · Q2 2026" — ✅ consistent.
- Mobile Phase 2 (Safety in shell): "**Q4 2026**" everywhere — ✅.
- Mobile Phase 3: "**2027+**" everywhere — ✅.
- Insights & Recommendations: platform playbook **"POC · Targeted Q2 2026"**, insights playbook **"Q2 2026"** — ✅.
- Automation: platform playbook **"POC · Targeted April 2026"**, automation playbook **"April 2026"** — ✅ (but note: April 2026 is *before* Q2 2026 — Insights ships *after* Automation, which is fine but should be acknowledged in any roadmap visual).
- Tech V4 PPTX `buildTechnicalDeck.ts` roadmap — uses "H1 2026 / H2 2026 / 2027+". Acceptable abstraction, but the H1/H2 mapping doesn't show Automation (April) vs Insights (Q2) — keep but verify slide doesn't claim Insights ships before Automation.

Fix: no date changes needed. **Add a single roadmap memory** `mem://product/roadmap-dates` so future slides don't drift. Audit `buildTechnicalDeck.ts` roadmap section to ensure ordering (Automation → Insights → Mobile P2) is right.

### 6. DTOP framing inconsistencies

- Platform playbook `dtopModel.steps[O]`: **Orchestrate = violet**, **Prove = emerald**.
- DTOP playbook `dtopSteps`: **Orchestrate = emerald**, **Prove = violet**.
- Memory `mem://ui/dtop-visual-prominence` doesn't fix colors per step but visualizations across slides use both mappings inconsistently.

Fix: lock canonical DTOP color mapping (matches what most exec/tech slides already use):
- D = blue · T = amber · O = violet · P = emerald

Update `src/data/dtopPlaybook.ts` `dtopSteps` to swap O/P colors to match the platform playbook (violet for O, emerald for P). Audit any per-slide overrides (`OpsSlide4DTOP`, `RMSlide4bDTOP`, exec slides) and conform.

### 7. DTOP industry exposure figure

- DTOP playbook: **"$25–35B"** with citation stack — ✅ matches `mem://content/dtop/industry-exposure-figure`.
- Verify no slide still uses the legacy **"$4.1B"** figure. Quick grep shows none in active files; will re-confirm in the implementation pass.

### 8. Trust signals drift

Memory rule: **"550+ Airlines Worldwide", "~2.5M Users", "6 Continents"**.

Spot checks:
- `COSlide0Title` trust stats — verify exact labels match.
- `personaProfiles.ts` says "550+ airlines" ✅.
- Various CTA / footer slides — confirm same numbers everywhere.

Fix: scan every component using these stats and align to the three canonical strings.

### 9. Sales Enablement Academy ↔ Source decks

The Academy registry (`src/components/academy/slideRegistry.ts`) reuses live slide components. After the fixes above (FOQA → operational data, naming, accuracy stat, DTOP colors), the Academy modules will inherit the corrected content automatically. **No separate Academy-content edits required**, but the **quiz seed in the migration** may reference outdated specifics (e.g. "FOQA", "Operational Excellence"). I'll review the seed migration and update questions/answers to match the corrected canonical messaging — via a new follow-on migration, not by editing the historical one.

### 10. Smaller copy inconsistencies

- `src/data/insightsPlaybook.ts` describes Insights as *"Generative AI on connected data"* (good — matches memory). Other places still say "AI" generically — tighten to **"Generative AI"** when describing Insights & CoAnalyst.
- `automationPlaybook.ts` `objections` mentions "Prismatic" is correctly NOT named externally (memory says don't name underlying engine) — ✅ already abstracted.
- `regulationManagementPlaybook.ts` references "1,400+ regulations" tied to "British Airways" — remove the named customer; rephrase to **"At a major flag carrier, ~1,100 people interact with regulatory content daily"** stays but drop "British Airways" specifically (avoid unverified named-customer claim in playbook copy).

---

## Files to be edited (single remediation pass)

**Data / playbooks**
- `src/data/dtopPlaybook.ts` — rewrite FOQA/FDM/ASAP refs; swap O/P colors; replace "GE FDM" competitor row label.
- `src/data/platformPlaybook.ts` — tighten CoAnalyst accuracy bullet.
- `src/data/insightsPlaybook.ts` — minor "Generative AI" tightening.
- `src/data/regulationManagementPlaybook.ts` — remove "British Airways" name.
- `src/data/lineOfSightData.ts` — methodology strings: FOQA → "flight operational data".
- `src/data/operationalPitchNarration.ts`, `src/data/technicalPitchNarration.ts`, `src/data/executivePitchNarration.ts`, `src/data/coanalystNarration.ts` — terminology + accuracy stat alignment; product-name normalization (phonetic OK in TTS).

**Slides**
- `src/components/slides/Slide3OperatingModel.tsx`
- `src/components/slides/SlideUseCases.tsx`
- `src/components/slides/Slide7Customers.tsx`
- `src/components/slides/SlideMessagingContext.tsx`
- `src/components/shared/CustomerOutcomesSlide.tsx`
- `src/components/ops-slides/OpsSlide4DTOP.tsx`
- `src/components/coanalyst-slides/CASlide14DeckStructure.tsx`
- `src/components/coanalyst-slides/CASlide2CategoryNarrative.tsx`
- `src/components/coanalyst-slides/CASlide11Taglines.tsx`
- `src/components/tech-slides/TechSlide8IntelligenceTiers.tsx` — accuracy summary line.
- Any slide importing the 4 category-option slides (`SlideCategoryAssurance`, `SlideCategoryExcellence`, `SlideCategoryOrchestration`, `Slide9CategoryRationale`) — verify and remove if surfaced anywhere customer-facing.

**Pages**
- `src/pages/HomepageMockup.tsx` — FOQA → operational data; product names.
- `src/pages/solutions/AirlinesPage.tsx` — FOQA → operational data (incl. hero subhead).

**PPTX exporters**
- `src/exporters/pptx/buildTechnicalDeck.ts` — FOQA refs; CoAnalyst accuracy line; roadmap ordering check.
- `src/exporters/pptx/buildExecutiveDeck.ts` — quick scan for same drift.

**Academy seed alignment**
- New Supabase migration only if quiz questions reference outdated terms.

**Memory updates**
- New: `mem://product/roadmap-dates` — locks Mobile P1 Q2 2026, P2 Q4 2026, P3 2027+; Insights Q2 2026; Automation April 2026.
- New: `mem://content/dtop/color-mapping` — D blue · T amber · O violet · P emerald.
- Update: `mem://index.md` Core line for AI terminology to also include the canonical "~90% vs ~35%" stat.

---

## Out of scope

- CEO Pitch (`/pitch-executive-2`) — explicitly excluded.
- Visual redesign / layout changes — content-only pass.
- Re-recording narration audio — text fixes only; existing audio stays until next regeneration.
- New slides or new decks.

---

## QA after the pass

1. Repo-wide grep: `FOQA|FDM|Foqua|ASAP\b` → only allowed inside narration phonetic spellings or removed entirely.
2. Repo-wide grep for product-name spacing: `Safety Manager 365|Content Manager 365|Training Manager 365|Safety Manager365` → zero hits.
3. Repo-wide grep: `Operational Excellence Platform|Operational Assurance Platform|Operational Orchestration Platform` → only inside `categoryOptionData.ts` (marked superseded).
4. Spot-check 5 representative slides in the preview (Customer Overview title, Tech V4 platform overview, Platform Playbook DTOP slide, Ops DTOP, CoAnalyst tagline) for visible terminology consistency.
5. Confirm Academy lessons render the corrected slides (registry passthrough — should be automatic).
