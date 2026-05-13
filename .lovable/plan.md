## Goal
Clean up the Sales Enablement narration so it consistently refers to **three weeks** of learning, with no leftover "Module 2", "Module 3", "M1/M2/M3/M4/M5/M6" wording. The page UI already uses Week 1/2/3 — this is a narration-only alignment pass.

## Mapping (from existing slide order)
- **Week 1 · Foundation** → Strategic Shift, Plain-English Why, Platform, DTOP, Value, Recap
- **Week 2 · Capabilities** → SafetyManager365, ContentManager365, TrainingManager365, CoAnalyst, Insights & Recommendations, Automation, CoAnalyst vs Generic AI, Unified Mobile, Capability Talk Track
- **Week 3 · Sell & Win** → Discovery → Walkthrough → Close, Use Case Cheat Sheet, Regulation Management, Customer Outcomes, Objections, Why Comply365, Your First 7 Days

## Changes — `src/data/salesEnablementNarration.ts`

### Slide title prefix rewrites (cosmetic, used in playback bar)
- `M1 · …` → `Week 1 · …`
- `M2 · The Platform / Value Unlocked / Recap Talk Track / DTOP` → `Week 1 · …`
- `M3 · …` (all 9 capability slides) → `Week 2 · …`
- `M4 · Discovery → Walkthrough → Close` → `Week 3 · …`
- `M5 · Module Intro / Use Case Cheat Sheet / Regulation Management / Customer Outcomes` → `Week 3 · …`
- `M6 · Module Intro / Objections Cheat Sheet / Why Comply365 / Your First 7 Days` → `Week 3 · …`

### In-script wording rewrites (the actual spoken text)
Edit each script to remove the words "module" / "Module N" when used to refer to academy structure, replacing with the week it belongs to. Specific edits:

- **se-plain-english-shift** — "transition into Module 2, where we make the platform itself plain English" → "stay in Week 1 — next we make the platform itself plain English."
- **se-slide-recap-m2** — "Otherwise, Module 3 goes capability by capability." → "Otherwise, Week 2 goes capability by capability."
- **se-slide-talktrack** — "Next we move into Module 4: how we sell it." → "Next we move into Week 3: how we sell it."
- **se-module-5** (intro) — Rewrite first line: "Module 5 is where messaging becomes value." → "This stretch of Week 3 is where messaging becomes value."
- **se-slide-outcomes** — "Next module: why we win." → "Next: why we win."
- **se-module-6** (intro) — Already starts "This is the closing arc of Week 3." Keep as-is; no module wording to remove.
- **se-slide-4a** (SafetyManager365) — "until it actually changes a procedure or a training module" — keep (real product term, not academy structure).
- **se-slide-regmgmt** — "every affected procedure and training module" — keep (product reference).
- **se-slide-mobile** — "Training screens" mention is fine; no module reference.

### Slide IDs
Leave `slideId` values (`se-slide-recap-m2`, `se-module-5`, `se-module-6`) untouched to avoid breaking the registry/page wiring. Only spoken text and human-facing titles change.

## Out of scope
- No UI/component changes (page already uses Week labels).
- No changes to slide IDs, hooks, or registry.
- No edits to other narration files.
- "Training module" as a product noun stays where it appears.

## Acceptance
- Searching `src/data/salesEnablementNarration.ts` for `\bModule\b` or `\bM[1-6] · ` returns no matches in titles or scripts (except product-noun "training module").
- All voice-over scripts mention only Week 1, Week 2, or Week 3 when referring to academy structure.
- Playback bar shows `Week N · …` on every slide.
- No TypeScript or build errors.
