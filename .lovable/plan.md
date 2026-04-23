

## Comment review — consolidated change plan

27 open comments across 4 decks. Below: every comment grouped by deck, with the change, scope and effort. Test/duplicate comments are flagged for resolve-only.

### A. Tech Deep Dive (`/pitch-technical`) — 17 comments

**Title slide (`tech-slide-0`)**
1. Add `2.5M+ Users` after `6 Continents` in trust strip.
2. *Test comments* — resolve only (no change).
3. Use Platform Playbook Slide 1 (`pf-why`, "Why It Exists") as the new opening slide before Title. → Insert a tech-deck variant (`tech-slide-opener`) reusing the same problem-grid content from `whyItExists`.

**Strategic Shift (`tech-slide-1`)**
4–5. *Test 1, Test 2* — resolve only.

**Architecture Diagram (`tech-slide-4`)**
6. Make the 5-layer diagram **clickable** — each layer band scrolls the deck to the matching divider (Layer 1 → `tech-divider-core`, Layer 5 → `tech-divider-dtop`, etc.). Add a small "click to jump" hover hint.

**Insights & Intelligence (`tech-slide-coanalyst`)**
7. Add **CoAnalyst** to the heading until naming changes — title becomes `Layer 3 · Intelligence & Orchestration — Insights & Intelligence (CoAnalyst)`.
8. Add a "Deep dive: CoAnalyst →" link button that opens the 2 CoAnalyst slides (modal or in-deck side-trip) with a clear **← Back to Tech Deep Dive** button (mirrors Exec Pitch 2 pattern).

**Data Foundation (`tech-slide-data-foundation`)**
9. *@paul confirm content* — leave a note; no code change. Resolve once Paul confirms.

**Tiers vs Generic AI (`tech-slide-tiers-vs-ai`)**
10. Heading → `Layer 3 · Intelligence & Orchestration — CoAnalyst Intelligence Tiers vs Generic AI`.
11. **Reorder**: move this slide to sit *before* Mobile (L4) and DTOP (L5) — i.e. immediately after Automation, still inside the Layer 3 group. Sidebar grouping stays clean.

**Automation (`tech-slide-automation`)**
12. Add a "Deep dive: Automation →" link with clear **← Back** button (same pattern as CoAnalyst link). Target: existing Automation Playbook deck.

**Mobile (`tech-slide-mobile`)**
13. Pillar 1 title `Less Context Shifting` → **`Less Context Shifting, Reduced Cognitive Load`**.
14. Pillar 4 (Simpler Deployment) — add MDM expansion and IT Efficiency point. Update copy to: *"One **MDM (Mobile Device Management)** footprint, one certification, one approval cycle through customer mobile estates — instead of three. **Drives IT efficiency.**"*
15. Add "Deep dive: Unified Mobile →" link with **← Back** button. Target: Platform Playbook `pf-mobile` slide (or a dedicated Mobile section if expanded later).

**DTOP (`tech-slide-5`)**
16. Improve readability of the grey row at the bottom of the table — bump contrast from `text-muted-foreground/60` to `text-muted-foreground`, normalise vertical alignment so all cells sit at the same baseline. Add a footnote/legend: **"DG = Dangerous Goods"** (small chip below the table).

**Platform Integrations (`tech-slide-6`)**
17. Insert a **dedicated Regulation Solution section** immediately after this slide. Scope: pull `RMSlide0Title`, `RMSlide1Overview`, `RMSlide2Problem`, `RMSlide4ValuePillars`, `RMSlide5HowItWorks`, `RMSlide6UseCases` from the Regulation Mgmt Playbook (6 slides). Wrap them in a new sub-divider `▸ Regulation Solution` and add a "Full Playbook →" link to `/playbook-regulation-management` with **← Back**.

**2026 Roadmap (`tech-slide-15`)**
18. *Revisit with Paul* — add task placeholder to update with latest Regulation Solution, Automation, Intelligence & Recommendations, CoAnalyst content. No code change yet — note it on the slide as `[Pending refresh – Apr 22]`.

**Partnership (`tech-slide-18`)**
19. **Replace** with a generic CTA slide: *"Find out more about the Comply365 Operational Performance Platform"* — single hero CTA + contact details + "Request a deep-dive" button. Rename id to `tech-slide-cta`, sidebar label `CTA — Find Out More`.

### B. Platform Playbook (`/playbook-platform`) — 3 comments

20. **`pf-what`** — table is too "deep" (lots of empty space). Tighten row padding, reduce min-row-height; let the table size to content rather than stretching to fill the viewport. Move trailing whitespace into a small caption beneath.
21. **`pf-what`** — flagged as a great slide to insert in the Tech Deep Dive after current Slide 3 (Industry Challenge). Action: **clone** this slide into the tech deck as `tech-slide-3b-platform-snapshot` (read-only fork — no shared state).
22. **`pf-competitive`** — flagged as a great slide to add **before the end of Tech Deep Dive & CTA**. Action: **clone** as `tech-slide-why-only-comply365`, insert immediately before the new CTA slide (replacing the slot vacated by `tech-slide-18`/Partnership).

### C. DTOP Playbook (`/playbook-dtop`) — 4 comments

23. **`dtop-why`** — increase font size in the boxes (bump from `text-xs/text-sm` to `text-sm/text-base`).
24. **`dtop-why`** — DTOP one-pager download: re-skin to **Comply365 branding** (use brand blue `#0066FF`, Space Grotesk headers, brand logo lockup, brand footer). Edit `DTOPDownloadButton.tsx` / `DTOPPrintablePage.tsx` and `printBrand.ts`.
25. **`dtop-uc2`** — opening line: `EASA publishes a new Safety Directive` → **`EASA or FAA publishes a new Safety Directive`** (US + EU coverage).
26. **`dtop-value`** — **remove the percentages** from the value slide (replace with qualitative phrasing — e.g. "Faster directive close-out", "Shorter detect-to-action cycle"). Avoids unprovable claims pushback.

### D. Personas (`/personas`) — 2 comments (slide `vp-safety` = VP Safety persona)

27. **Value Proposition statement** — currently CoAnalyst-only. Rewrite to lead with **Platform value first**, then layer in CoAnalyst as the intelligence accelerator.
28. **Objection Handling** — add a new objection card: *"Why CoAnalyst over generic AI?"* — concise answer pulling from existing `mem://content/coanalyst/objection-handling` + tiered intelligence framing.

### Cross-cutting pattern: "Deep dive →" + "← Back" links

Comments 8, 12, 15, 17, 22 all need the same UX. Build **one reusable component** `DeepDiveLink.tsx`:
- Renders a button on the source slide (`Deep dive: <name> →`).
- On click, navigates to the target deck/slide and stores the return path in `sessionStorage`.
- Target decks render a **`← Back to Tech Deep Dive`** floating button when a return path is present in session.

This avoids duplicating navigation logic 5 times.

### Files touched (summary)

**New**
- `src/components/shared/DeepDiveLink.tsx` (+ companion `BackToDeckButton.tsx`)
- `src/components/tech-slides/TechSlideOpener.tsx` (clone of `pf-why` for tech deck)
- `src/components/tech-slides/TechSlidePlatformSnapshot.tsx` (clone of `pf-what`)
- `src/components/tech-slides/TechSlideWhyOnlyComply365.tsx` (clone of `pf-competitive`)
- `src/components/tech-slides/TechSlideRegulationSection.tsx` (wrapper + 6 reused RM slides)
- `src/components/tech-slides/TechSlideCTA.tsx` (replaces Partnership slide)

**Edited**
- `src/pages/TechnicalDeepDive.tsx` — register opener, platform-snapshot, regulation section, why-only-comply, CTA; reorder Tiers slide before Mobile.
- `src/components/tech-slides/TechSlide0Title.tsx` — add `2.5M+ Users` chip.
- `src/components/tech-slides/TechSlide4Platform.tsx` — clickable layer bands.
- `src/components/tech-slides/TechSlide7CoAnalyst.tsx` — title `(CoAnalyst)`, add DeepDiveLink.
- `src/components/tech-slides/TechSlideTiersVsAI.tsx` — title prefix `CoAnalyst Intelligence Tiers vs Generic AI`.
- `src/components/tech-slides/TechSlideAutomation.tsx` — add DeepDiveLink to Automation Playbook.
- `src/components/tech-slides/TechSlideMobile.tsx` — pillar 1 + 4 copy edits, add DeepDiveLink.
- `src/components/tech-slides/TechSlide5DTOP.tsx` — fix grey row contrast, add DG legend.
- `src/components/platform-slides/PFSlide2WhatIs.tsx` — tighten table density.
- `src/components/dtop-slides/DTOPSlide1WhyExists.tsx` — bump font sizes.
- `src/components/dtop-slides/DTOPSlide5UseCase2.tsx` — `EASA or FAA`.
- `src/components/dtop-slides/DTOPSlide7Value.tsx` — remove percentages.
- `src/components/print/DTOPPrintablePage.tsx` + `printBrand.ts` — Comply365 brand.
- `src/data/personaProfiles.ts` (or VP Safety profile) — value prop rewrite + new objection card.
- `src/exporters/pptx/buildTechnicalDeck.ts` — mirror all new/reordered slides.

**Resolve only (no code change)**
- `tech-slide-0` test comment, `tech-slide-1` Test, Test 2 — resolve.
- `tech-slide-data-foundation` @paul confirm — leave note, awaiting Paul.
- `tech-slide-15` revisit-with-Paul — add `[Pending refresh]` chip + leave note.

### Suggested execution order (3 batches to keep PRs reviewable)

1. **Batch 1 — Quick text/visual fixes**: comments 1, 13, 14, 16, 23, 25, 26, 27, 28. Fast wins, no nav changes.
2. **Batch 2 — Reusable DeepDiveLink + back button + cross-deck inserts**: comments 7, 8, 10, 11, 12, 15, 21, 22. Introduces shared nav component.
3. **Batch 3 — Bigger structural inserts**: comments 3, 6, 17, 19, 20, 24. New opener, clickable diagram, Regulation section, CTA replacement, table tightening, branded one-pager.

### Out of scope

- Renaming CoAnalyst globally (deferred per existing decision).
- Other decks (Executive Pitch, Operational Pitch).
- Regenerating narration audio for new/changed slides — handle in a follow-up pass.

