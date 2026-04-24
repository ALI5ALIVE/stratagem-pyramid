

## Sales Enablement — Promote Use Cases to a dedicated DTOP-led module

Right now use cases live as two slides tucked inside Module 4 ("How we sell it"), mixed with Before/After, Maturity and Outcomes. This makes it hard for a rep to anchor a value conversation on the DTOP loop. This plan promotes use cases to their own module so each one walks the prospect through Detect → Trigger → Orchestrate → Prove with a clear cost story.

### New module structure

Renumber to 6 modules. New **Module 5 — Use Cases & Value through DTOP** sits between today's M4 and M5.

| # | Module | Purpose |
|---|---|---|
| 1 | The Shift | (unchanged) |
| 2 | What the platform is | (unchanged) |
| 3 | How the capabilities fit together | (unchanged) |
| 4 | How we sell it | Trimmed: Before/After + Maturity + Outcomes only |
| **5** | **Use Cases & Value through DTOP** | **NEW — dedicated value-articulation section** |
| 6 | Why we win | (was M5) |

### Module 5 contents (NEW)

A short opener, then one slide per value domain, each following the DTOP loop and grounded in cost data. Reuses existing v4-aligned use-case slides — no new components needed.

| Slide | Component | Purpose |
|---|---|---|
| M5 divider | `SEModuleDivider` | Frames "every use case = same DTOP loop, different domain" |
| M5 · Use Case Framework (DTOP overview) | `SlideUseCases` | Generic 3-up DTOP intro — sets the pattern |
| M5 · Safety Use Cases | `TechSlide10SafetyUseCases` | Detect→Prove for safety signals + cost exposure |
| M5 · Operations Use Cases | `TechSlide11OpsUseCases` | AOG, delays, fuel, baggage through DTOP |
| M5 · Financial Use Cases | `TechSlide12FinancialUseCases` | Insurance + revenue protection through DTOP |
| M5 · Regulation Management Use Case | `TechSlideRegulationSummary` | Flagship regulation play (moved from M4) |
| M5 · Customer Outcomes | `CustomerOutcomesSlide` | Proof points tying use cases to outcomes (moved from M4) |

Module 5 divider props:
- `title`: "Use cases & value through DTOP"
- `learningGoal`: "By the end of this module you can pick the right use case for the prospect's pain and walk them through Detect → Trigger → Orchestrate → Prove with a defensible cost figure."
- `estimatedMinutes`: 12
- `upNext`: ["DTOP framework", "Safety use cases", "Operations use cases", "Financial use cases", "Regulation Management", "Customer outcomes"]

### Module 4 trimmed

Remove from M4: `se-slide-usecases`, `se-slide-regmgmt`, `se-slide-outcomes`. M4 keeps Before/After and Maturity Roadmap only. Update `moduleProps.m4.upNext` to `["Before vs After", "Maturity roadmap"]` and shorten learning goal to focus on the sell motion (discovery → demo → close), with use-case articulation handed off to M5.

### Module renumbering

Today's M5 (Why we win) becomes **M6**:
- Update `moduleProps.m5` → `moduleProps.m6` (moduleNumber: 6)
- Re-label `se-slide-objections`, `se-slide-why`, `se-slide-closing` from `M5 ·` → `M6 ·`
- Divider id `se-module-5` (Why we win) → `se-module-6`; new use-case divider takes `se-module-5`

### Files

**EDITED**
- `src/pages/SalesEnablement.tsx` — add 3 new imports (`TechSlide10SafetyUseCases`, `TechSlide11OpsUseCases`, `TechSlide12FinancialUseCases`), add `m5` (use cases) module props, renumber existing M5 → M6, restructure the `slides` array as above.

**NOT TOUCHED**
- All slide components themselves — pure reuse.
- Other decks (`/customer-overview`, `/pitch-technical-v4`, `/pitch-executive-3`).
- Navigation/scroll/keyboard logic.

### QA

- `/sales-enablement` sidebar shows 6 modules; M5 is "Use Cases & Value through DTOP" with 6 slides + divider.
- Each M5 use-case slide renders the DTOP four-step pattern with cost exposure.
- M4 contains only Before/After and Maturity Roadmap.
- M6 (formerly M5) labels read "M6 · Objections / Why Comply365 / Your First 7 Days".
- No duplicate Regulation Management or Customer Outcomes slides.

