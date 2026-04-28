## Redesign "The Platform · Insights & Intelligence" slide

### Goal
Take the user from the platform-wide "ask anything" capability (previous slide) down to the **functional level** — show how the same intelligence layer manifests as **3 core capabilities**, each delivered inside Safety, Content and Training. Combined, they produce the cross-product capability shown on the previous slide. The CoAnalyst product name is not used on this slide.

### Three core capabilities (rows)
1. **Plain-English Q&A on your operational data** — natural-language questions answered with cited evidence drawn from the application's data (events, manuals, competency records).
2. **Cross-domain correlation & root cause** — connecting signals across procedure changes, training status and safety occurrences to surface why something is happening, not just what.
3. **Recommended next actions** — turning insight into prescriptive guidance the team can act on immediately (procedure update, training assignment, audit trigger).

### Three application contexts (columns)
- **SafetyManager365** — occurrences, audits, risk register
- **ContentManager365** — procedures, manuals, revisions
- **TrainingManager365** — competency, recurrency, gaps

Each cell shows a short, app-specific example of that capability so the audience can immediately picture it inside the product they already use.

### Layout
```text
[ Header strip: "Same intelligence layer · expressed inside every core application" ]

                       Safety              Content             Training
  Ask in plain English | Q&A example    | Q&A example       | Q&A example
  Cross-domain insight | Correlation ex.| Correlation ex.   | Correlation ex.
  Recommended action   | Action example | Action example    | Action example

[ Footer callout: "Combined across all three → the cross-product intelligence
  you saw on the previous slide." ]
```

- 3×3 matrix of compact cards, each card ~2 lines.
- Row labels carry an icon + capability name on the left edge.
- Column headers use the existing app colour palette (Safety rose, Content blue, Training emerald — matching the Insights summary slide).
- Matches existing dark-theme tokens, Space Grotesk headings, h-screen container with asymmetrical padding.

### Technical changes
- **Edit `src/components/tech-slides/v4/TechV4Slide7CoAnalyst.tsx`**:
  - Replace pipeline + hybrid-architecture + stats blocks with the 3×3 capability matrix.
  - Keep the slide id (`tech-slide-coanalyst`) and title prop ("The Platform · Insights & Intelligence") so existing routing, narration keys and the recently-renamed title are preserved.
  - Remove the master-message banner that quotes "From Reports to Intelligence. From Events to Control." and the DeepDiveLink to `/coanalyst` — those reintroduce the CoAnalyst brand.
  - Remove unused imports (Quote, Database, Search, Brain, Zap, Languages, Sparkles, DeepDiveLink) and add the three product icons (ShieldCheck, FileText, GraduationCap) plus capability icons (MessageSquare, Network, Lightbulb).
- No changes to the deck file, narration data, or other slides. Existing usages of `TechV4Slide7CoAnalyst` (Technical Deep Dive V4 and Executive Pitch 3) inherit the new design automatically — confirm acceptable, since the redesign is on-message for both decks.
