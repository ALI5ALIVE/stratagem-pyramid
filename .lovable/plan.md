## Goal

Upgrade the per-week **Field Kit PDF** download from a plain helvetica list into a polished, branded, content-rich coaching guide reps actually want to print.

## What's wrong today

- Plain helvetica throughout, no brand styling
- Tiny gray labels left of paragraph text — visually flat, hard to scan
- Only the 4 coach card fields per slide — narration, talk-track, terminology rules are missing
- No cover page beyond a header, no week overview, no closing checklist
- No visual hierarchy between sections (Foundation vs Capabilities), no color coding for the 4 field types
- No page header/footer brand, no anchor "say-it" callout, no objection/terminology callouts

## New PDF structure (per week)

**1. Cover page**
- Dark navy hero block, Comply365 wordmark, "Week N Field Kit" title, week subtitle, one-line learning outcome
- "What you'll be able to do by Friday" — 3 bullet outcomes pulled from the week intro narration
- Color legend: the 4 coach card field types (Remember / Say / Watch out / Bridge) with their accent colors
- Locked-terminology mini reference (Generative AI, Recommended Actions, Operational Data, BrandNumber rule, no FOQA/FDM/ASAP)

**2. Week-at-a-glance spread**
- Numbered list of every slide in the week with its title and a one-line "what this teaches"
- DTOP color dots next to relevant slides (D blue / T amber / O violet / P emerald) so reps see the loop structure

**3. Slide cards (one per slide, 1–2 pages)**
For each slide:
- Slide number chip + title (brand blue header bar)
- **The core idea** — 2-line distilled takeaway derived from the narration's "core message" beat
- 4 color-coded coach card panels in a 2x2 grid (not a label-left list):
  - Amber — Remember this
  - Emerald — Say it like this (rendered as a quote block with quote glyphs)
  - Rose — Watch out for
  - Sky — Bridge to next slide
- Bottom strip: "Time to drill" suggestion + the slide's transition cue

**4. Closing page**
- 60-second elevator drill (week's core line)
- Self-check: 5 yes/no questions a rep should be able to answer
- Cross-reference: "Practice this in the Practice Center with persona X"
- Footer: rep-only, do not distribute to customers

## Visual system

- Brand palette pulled from `printBrand` where possible: dark navy paper, off-white text on covers, white pages for slide cards
- Typography: bold display sizes on cover/section dividers, clear body text with proper leading
- Field type accents using fixed hex tokens that match the on-screen panel ring colors (amber 500, emerald 500, rose 500, sky 500)
- Page header (every interior page): small Comply365 mark + "Week N · {Week title}" left, slide range right
- Page footer: page X of Y centered, "Rep-facing · Not for customer distribution" right
- Soft horizontal rules instead of hard black lines
- Generous margins (56pt), comfortable line height, no run-on paragraphs

## Technical approach

- Keep `jsPDF` (no new heavy deps)
- Add a `buildWeekFieldKitPdf(week)` helper inside `CoachCardPanel.tsx` (or extract to `src/lib/fieldKitPdf.ts` for cleanliness)
- Introduce small drawing helpers:
  - `drawCoverPage(pdf, week)`
  - `drawWeekOverview(pdf, week, slides)`
  - `drawSlideCard(pdf, slide, card, narrationCoreLine)`
  - `drawClosingPage(pdf, week)`
  - `drawPageChrome(pdf, week, pageNumberInfo)` — header + footer
  - `drawFieldPanel(pdf, x, y, w, h, kind, text)` — rounded rect + colored side bar + label + body
- Auto page-break helper that re-draws chrome on every new page
- Extract the "core line" per slide from `salesEnablementNarrations[].script` (first sentence after `core message:` or first sentence of the script as fallback) so we surface real content, not just coach card text
- Add a small `WEEK_OUTCOMES` map (Week 1/2/3 → 3 bullets) — short, hand-curated so it reads well
- Add a small `WEEK_DRILLS` map (closing self-check questions per week)

## Files

- `src/components/sales-enablement-slides/CoachCardPanel.tsx` — rewrite the `downloadWeekKit` body
- `src/lib/fieldKitPdf.ts` — new, all drawing logic
- `src/data/salesEnablementCoachCards.ts` — extend `CoachCardWeek` (or a sibling const) with `outcomes: string[]`, `drillQuestions: string[]`, `closingLine: string`
- No changes to narration, no changes to on-screen UI

## Out of scope

- Per-slide individual PDF downloads (we agreed weekly is the right unit)
- Replacing jsPDF with html2canvas/react renderer (overkill for a text-led document)
- Coaching content rewrites — only formatting and density change