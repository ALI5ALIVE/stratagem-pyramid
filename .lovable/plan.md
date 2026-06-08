
## Scope

Apply the three changes from Kathrina's email:

1. **Roadmap slide edits** (Medium + Long pitch decks)
2. **Broad terminology rename** across the rest of the Lovable site
3. **Delete the Short Deck** (Customer Overview) end-to-end

Both decks share the same component, so a single edit covers both.

---

## 1. Roadmap slide — `src/components/tech-slides/TechSlide15Roadmap2026.tsx`

### H1 2026 — remove three lines

Delete:
- `✅ Regulation Database Replatforming POC (Operational Data Foundation)`
- `✅ Platform Proof of Concept — Automation (Intelligence & Orchestration Layer)`
- `✅ Platform Proof of Concept — Platform-wide Insights (...) — POC only, not yet customer-deliverable`

Result: H1 2026 keeps Training↔Documents link, Regulation Database↔ContentManager365 integration, and All-in-One Mobile Phase 1.

### H2 2026 — rename two lines

- `Platform-wide Insights — production rollout (...)` → **`Platform Intelligence Rollout (Intelligence & Orchestration Layer)`**
- `Roll-out of Platform-wide Automation engine (...)` → **`Platform Automation Rollout (Intelligence & Orchestration Layer)`**

### 2027 & Beyond — rename three lines

- `Recommendations & Prescriptive Actions — Future Vision (...)` → **`Platform Recommendations — Future Vision (Intelligence & Orchestration Layer)`**
- `Continued roll-out of Platform-wide Insights (...)` → **`Continued Roll Out of Platform Intelligence (Intelligence & Orchestration Layer)`**
- `Continued roll-out of Platform-wide Automation capability (...)` → **`Continued Roll Out of Platform Automation (Intelligence & Orchestration Layer)`**

No layout, no styling, no narration script changes here — strings only.

---

## 2. Broad rename across the site

Kathrina asked for the new wording to be reflected "broadly across the Lovable site". Applied as a controlled find-and-replace in these files (titles, narration scripts, study notes, layer badges, exporters):

- `src/data/roadmapUseCases.ts` (titles + one-liners for the standalone Roadmap deck)
- `src/components/tech-slides/ArchitectureLayerBadge.tsx`
- `src/components/tech-slides/TechSlideInsights.tsx`
- `src/components/tech-slides/v4/TechV4SlideInsights.tsx`
- `src/components/platform-slides/PlatformArchitectureDiagramV4.tsx`
- `src/components/sales-enablement-slides/SECapabilityUseCases.tsx`
- `src/data/execPitch3Slides.ts` (label only)
- `src/data/executivePitchNarration.ts`
- `src/data/technicalPitchNarration.ts`
- `src/data/salesEnablementNarration.ts`
- `src/data/salesEnablementStudyNotes.ts`
- `src/data/insightsPlaybook.ts` (`heroTitle` + header comment)
- `src/data/automationPlaybook.ts` (`heroTitle` + header comment)

Mapping applied uniformly:

| Old phrase | New phrase |
|---|---|
| `Recommendations & Prescriptive Actions` | `Platform Recommendations` |
| `Recommendations and Prescriptive Actions` (narration prose) | `Platform Recommendations` |
| `Prescriptive Action Plans` (the V4 Insights tile) | `Platform Recommendation Plans` |
| `Platform-wide Insights & Recommendations` (playbook/section titles) | `Platform Intelligence` |
| `Platform-wide Insights` | `Platform Intelligence` |
| `Platform-wide Automation & Orchestration` / `Platform-wide Automation` | `Platform Automation` |
| `Regulation Database Replatforming — POC` / `… — Rollout` (in `roadmapUseCases.ts`) | removed POC entry; rollout entry renamed to `Regulation Database — Modernisation Rollout` (the POC is no longer surfaced anywhere) |

Narration scripts and study-note prose are updated to use the new short names. No memory entries need rewriting — `mem://product/roadmap-dates` doesn't carry these phrases.

---

## 3. Delete the Short Deck (Customer Overview)

Remove the deck entirely so it stops appearing in nav, home, sidebar, exporters, and analytics:

- **Routing**: in `src/App.tsx`, remove the import of `CustomerOverview` and the `<Route path="/customer-overview" …>` entry.
- **Home**: in `src/pages/HomePage.tsx`, drop the "Short — Customer Overview" card from `pitchDecks`.
- **Sidebar**: in `src/components/AppSidebar.tsx`, remove the "Short — Customer Overview" link.
- **Marketing nav**: in `src/components/home/TopNav.tsx`, drop the `Customers → /customer-overview` link; in `src/components/home/Footer.tsx`, remove the "Customer overview" footer link.
- **PPTX exporter**: in `src/exporters/pptx/index.ts`, remove the `"customer-overview"` entry from the deck map and update the union type.
- **Practice scenarios**: in `src/data/practiceScenarios.ts`, drop `"customerOverview"` from the union and any scenario records that target it; in `src/lib/practice/buildKnowledgeDocs.ts`, remove the corresponding knowledge-doc registration.
- **Analytics**: in `src/hooks/usePageViewTracker.ts`, delete the `/^\/customer-overview/` matcher.
- **Files**: delete `src/pages/CustomerOverview.tsx`, the `src/components/customer-overview-slides/` directory, `src/data/customerOverviewNarration.ts`, `src/hooks/useCustomerOverviewNarration.ts`, and `src/exporters/pptx/buildCustomerOverviewDeck.ts`.

Anything else that imports from those files will be fixed in the same pass.

---

## Out of scope (explicitly not changing)

- No edits to `mem://`, no DB migrations, no edge-function changes.
- No tone/structure changes to narration beyond the phrase swaps.
- The 5-layer architecture diagram still has a "Platform Recommendations" tile in the Intelligence layer — only the label changes.

## Verification

1. Open `/pitch-executive-medium` and `/pitch-executive-3` → the Roadmap slide reflects all H1/H2/2027 edits.
2. `/customer-overview` returns Not Found; sidebar, home, marketing nav, and footer no longer surface it.
3. `rg -n "Platform-wide Insights|Platform-wide Automation|Prescriptive Action|Regulation Database Replat|Platform Proof of Concept" src/` returns no matches.
4. Spot-check `/pitch-technical-v4`, `/sales-enablement`, and `/roadmap-deck` to confirm renamed copy reads cleanly and narration still references the new names.
