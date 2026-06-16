Two edits to the downloadable PowerPoint, both in `src/exporters/pptx/buildTechnicalDeck.ts`. Both slides are shared specs reused by the Medium, Long, and Technical decks via `byLabel(...)`, so this single edit propagates to every PPT export that includes them — which matches the "align with the Lovable version" intent.

## 1. Roadmap slide (`label: "2026 Roadmap"`, ~lines 2218–2311)

Replace the three `phases[].items` arrays with the live web copy from `TechSlide15Roadmap2026.tsx`, **with the `(Intelligence & Orchestration Layer)` parentheticals stripped** per the email. All other "(...)" tags (Operational Data Foundation, Unified Mobile Experience, Unified Web Experience) stay — only the Intelligence & Orchestration Layer ones are removed.

PPTX doesn't render emoji glyphs reliably, so map the live status emoji to the existing PPTX status convention: `✅`/`✓` → green check bullet (`2713`, color `C.prove`); `🔄` → in-progress circle bullet (`25CB`, color `C.amber`); `📋` → planned bullet (`25A1`, color `C.subtle`); items with no prefix → existing `25CF` filled dot.

Final items per column:

**H1 2026 — In Production & Quick Wins** (sky)
- ✓ Link Training Modules to Documents (Operational Data Foundation)
- 🔄 Regulation Database integration with ContentManager365 (Operational Data Foundation)
- 🔄 All-in-One Mobile Experience — Phase 1: Training screens in the Comply iOS Mobile app (Unified Mobile Experience)

**H2 2026 — Connected Operations** (violet)
- 🔄 Standardise UI Fonts & Colors (Unified Web Experience)
- 🔄 Regulation Database Replatforming (Operational Data Foundation)
- 🔄 All-in-One Mobile Experience — Phase 2: Safety Reporting in the Comply iOS Mobile app (Unified Mobile Experience)
- 📋 Platform Intelligence Rollout
- 📋 Next-Phase Regulation Management Integration — sync compliance mappings, TM365 integration, automation triggers (Operational Data Foundation)
- 📋 Platform Automation Rollout

**2027 and Beyond — Intelligent Operations** (prove/emerald)
- Platform Recommendations — Future Vision
- All-in-One Mobile Experience — Phase 3: Unified Experience across OCM, Training & Safety
- Contextual Document Viewing from TrainingManager365 (Operational Data Foundation)
- Continued Roll Out of Platform Intelligence
- Continued Roll Out of Platform Automation
- Future Platform PoCs — to be defined with customer input

Also add a small legend strip below the cards (mirrors the web): `✓ Done · ○ In Progress · ▢ Planned · POC = internal prototype · Specific deliverables refined during discovery`. Keep the existing amber "illustrative" note.

## 2. Why Comply365 slide (`label: "Why Comply365"`, ~lines 2315–2385)

Rebuild to mirror `TechSlideWhyComply.tsx`:

- New header: title `Why Comply365`, subtitle `Point solutions manage silos. Generic AI creates noise. We close the loop with the Comply365 Operational Performance Platform.`
- **Remove** the four-stat outcomes strip (78%, 6 wks → 48 hrs, 5 days, 90% vs 35%) and the bottom italic quote — they aren't on the web slide.
- Keep the 3 differentiator cards, vertically centred, with copy updated to match the web:
  - **Connected Foundation** — "One Connected Data Model, three core apps, one intelligence layer for Content, training and safety."
  - **Domain-Trained Intelligence** — "Insights & Intelligence built on aviation data. Not a generic AI with an aviation wrapper — purpose-built for the operational corpus."
  - **Proof by Design** — "Every action logged automatically. The audit trail is a byproduct, not a report. Closed loop — Detect, Trigger, Orchestrate, Prove."
- Trust strip below: `550+ Airlines Worldwide · ~2.5M Users · 6 Continents`, right-aligned chip reading `Deep dive · Platform & Use Cases →` (visual only — PPT can't open the in-app route).

## Scope / out of scope

- Only `src/exporters/pptx/buildTechnicalDeck.ts` changes. No web slide, narration, data, or routing edits.
- Both Medium and Long executive PPT exports pick up these changes (shared specs). The user requested Medium; matching the Lovable web version means the Long deck is corrected the same way — flagging here in case that's not desired.
- Re-export and visually QA the Medium PPT after the edit (convert to PDF → images, inspect both slides).
