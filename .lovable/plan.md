

# Insights & Recommendations Playbook

## Summary
A new playbook (`/insights-playbook`) following the same pattern as the DTOP and Regulation Management playbooks — 11 vertical snap slides, sidebar nav, branded title slide.

## Narrative Arc (11 slides)
1. **Title** — "Platform-wide Insights & Recommendations" + tagline "From data to intelligence — just by asking."
2. **Why It Exists** — fragmented data, manual reporting, siloed insight, reactive compliance
3. **What It Is** — elevator pitch; natural-language querying across Safety/Training/Content/Compliance with AI-generated insights, correlations, recommendations
4. **How It Works** — 4-step flow: Unified Data Lake → Natural Language Question → AI Insight Engine → Insights + Recommendations
5. **Use Case 1: DG Risk Query** — "Are dangerous goods incidents linked to training gaps?" — DTOP-style timeline
6. **Use Case 2: Audit Readiness** — gap detection vs IATA DG / ICAO before findings occur
7. **Use Case 3: Faster Investigations** — instantly correlate incidents + procedures + training + external context
8. **Value Unlocked** — 5 external value pillars (Data→Intelligence, Break Silos, Proactive Risk, Compliance Readiness, Targeted Action) + internal value (Platform Vision, System of Intelligence narrative, foundation for future AI)
9. **Persona Messaging** — COO, Head of Safety, Compliance Lead, CIO — what each cares about + opener
10. **Why Only Comply365** — connected foundation, cross-domain reasoning, intelligence layer strategy vs static dashboards / point BI tools
11. **Talking Points & Close** — positioning line "From reports → real-time insights", elevator pitch, discovery questions, next steps

## Key Messaging (per source doc)
- Primary positioning: *"Turn operational data into real-time intelligence — simply by asking questions."*
- Five shifts: reports→insights, siloed→connected, hindsight→foresight, manual→AI-driven, complexity→simplicity
- Status framing: POC, completion Q2 2026 → foundation for the **Comply365 Intelligence Layer**
- Disclaimer: position as POC / forward-looking capability (consistent with pitch-deck disclaimer memory)

## Files to Create
1. `src/data/insightsPlaybook.ts` — typed content arrays (painPoints, howItWorksSteps, useCases, valueCategories, personaMessages, objections, talkingPoints, discoveryQuestions, etc.) following the same shape as `dtopPlaybook.ts` / `regulationManagementPlaybook.ts`
2. `src/components/insights-slides/` — 11 slide components (`IRSlide0Title.tsx` … `IRSlide10Closing.tsx`) reusing `SlideContainer`, `SlideNarrationProps`, lucide icons, brand colors
3. `src/pages/InsightsPlaybook.tsx` — page shell mirroring `DTOPPlaybook.tsx` (snap scroll, keyboard nav, slide registration, no password gate)
4. `src/App.tsx` — register route `/insights-playbook`
5. `src/components/AppSidebar.tsx` — add "Insights & Recommendations" entry to `toolItems` (icon: `Sparkles` or `Lightbulb`)

## Design
- Dark theme, brand blue primary, follows existing `mem://ui/layout-standards` and `mem://design/template-style`
- Title slide mirrors `DTOPSlide0Title` hero pattern (no download button — no PDF asset yet)
- Use case slides use vertical timeline format per `mem://ui/use-case-timeline-standardization`
- Use "Generative AI", "Recommended Actions", "Operational Data" terminology per Core memory
- Mark capability as POC / future-forward where appropriate

## Out of Scope
- PDF 1-pager (can be added later like DTOP)
- Narration audio
- Interactive data lake demo

