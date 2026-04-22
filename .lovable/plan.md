

## Executive-grade redesign — Persona & DTOP one-pagers

Rebuild both downloadable one-pagers so they look like a McKinsey/Bain leave-behind: confident hierarchy, generous whitespace, on-brand Comply365 identity, and printed at crisp landscape Letter (1056×816 @ scale 2 → ~2112×1632 px).

### Shared brand system (applied to both)

Centralised in a new `src/components/print/printBrand.ts`:
- **Palette:** Ink `#0B1220`, slate text `#1F2937`, muted `#5B6776`, hairline `#E5EAF0`, paper `#FAFBFD`, brand blue `#0066FF`, accent navy `#0B1A4A`, success `#0F766E`, signal amber `#B45309`, alert rose `#9F1239`.
- **Type:** Space Grotesk (display) + Inter (body) loaded via Google Fonts link injected before render to guarantee html2canvas captures the right glyphs.
- **Spatial system:** 8 px grid, 28 px outer margin, 16 px gutters, 1 px hairline rules instead of heavy borders.
- **Rule-based hierarchy** (not boxed cards everywhere) — replaces today's "every section has a coloured top-bar" look that reads as templated.
- **Header lockup:** real Comply365 wordmark (use `src/assets/comply365-logo-white.png` inverted on white → swap to existing dark variant if present, else render type-only "Comply365" with brand dot). Right side: thin uppercase "Sales Enablement · Confidential" + date.
- **Footer:** doc id + page label + version, hairline rule above.

### 1. Persona One-Pager (`PersonaPrintablePage.tsx` — rewrite)

**Layout (landscape, 1056×816):**

```text
┌──────────────────────────────────────────────────────────────────┐
│  Comply365 ●                       PERSONA BRIEF · CONFIDENTIAL  │
│  ──────────────────────────────────────────────────────────────  │
│                                                                  │
│  CEO / COO                                            ┌────────┐ │
│  Chief Executive Officer · Chief Operating Officer    │ ICON   │ │
│  C-Suite                                              └────────┘ │
│                                                                  │
│  One-line executive summary (large, 18pt, ink, max 2 lines).     │
│                                                                  │
│  REPORTS TO        │ ORG CONTEXT        │ BUDGET INFLUENCE       │
│  Board / Share…    │ 2,000–50,000 emp…  │ Final sign-off >$500K  │
│  ──────────────────────────────────────────────────────────────  │
│                                                                  │
│  STRATEGIC PRIORITIES        │  DAILY PAIN POINTS                │
│  • …                         │  • …                              │
│  • …                         │  • …                              │
│  • …                         │  • …                              │
│                                                                  │
│  BUYING TRIGGERS             │  DECISION CRITERIA                │
│  • …                         │  • …                              │
│                                                                  │
│  ──────────────────────────────────────────────────────────────  │
│  VALUE PROPOSITION                                               │
│  ▎ Pull-quote in display font, 14pt, persona accent left rule.   │
│  ──────────────────────────────────────────────────────────────  │
│                                                                  │
│  KEY MESSAGES                │  METRICS THAT MATTER              │
│  • …                         │  • …                              │
│                                                                  │
│  TOP DISCOVERY QUESTION      │  TOP OBJECTION → RESPONSE         │
│  "…"                         │  "…"  →  Response in success tone │
│                                                                  │
│  ──────────────────────────────────────────────────────────────  │
│  © 2026 Comply365 · Sales Enablement      Persona Brief · v2.0   │
└──────────────────────────────────────────────────────────────────┘
```

**Key changes vs today:**
- Drop the coloured background block under the header; persona accent appears only as a 4 px left rule on the title and a single dot beside "Comply365" — much more executive.
- Bigger title (28pt Space Grotesk), seniority as small caps chip in muted ink (no colour fill).
- 3-up meta strip uses hairline dividers, no boxes.
- Section titles: 9pt, tracking 0.12em, uppercase, muted ink — pure typographic hierarchy.
- Bullets: 1.5 px square markers in persona accent, 10.5pt body, 1.5 line-height.
- Value proposition becomes the visual centrepiece (pull-quote with thicker left rule).
- Objection block uses success-tone response line instead of green box.
- All cards replaced with rule-separated sections — fewer borders, more air.

### 2. DTOP One-Pager (NEW React component + dynamic generation)

Currently `/Comply365-DTOP-Operating-Model-1-Pager.pdf` is a static ReportLab PDF that doesn't match the brand. Replace it.

**New files:**
- `src/components/print/DTOPPrintablePage.tsx` — React print page.
- `src/components/DTOPDownloadButton.tsx` — html2canvas + jsPDF generator (mirrors `PersonaDownloadButton`).

**Wire-up:**
- `DTOPSlide0Title.tsx` — replace the `fetch("/Comply365-DTOP-Operating-Model-1-Pager.pdf")` handler with `<DTOPDownloadButton />` so the PDF is generated live from `dtopPlaybook.ts` (always in sync with the deck).
- Delete `public/Comply365-DTOP-Operating-Model-1-Pager.pdf` (no longer referenced).

**Layout (landscape, 1056×816):**

```text
┌──────────────────────────────────────────────────────────────────┐
│  Comply365 ●               OPERATING MODEL · CONFIDENTIAL        │
│  ──────────────────────────────────────────────────────────────  │
│                                                                  │
│  The DTOP Operating Model                                        │
│  The only closed-loop operating model in aviation.               │
│                                                                  │
│  ┌──────────┐  →  ┌──────────┐  →  ┌──────────┐  →  ┌──────────┐ │
│  │ D DETECT │     │ T TRIGGER│     │O ORCHEST.│     │ P PROVE  │ │
│  │ Noise →  │     │ Signal → │     │ Plan →   │     │ Action → │ │
│  │ Signal   │     │ Action   │     │ Execution│     │ Evidence │ │
│  └──────────┘     └──────────┘     └──────────┘     └──────────┘ │
│  blue            amber             emerald          violet       │
│                                                                  │
│  Per-step micro-row: 3 chips · "Inputs · Actions · Outputs"      │
│  ──────────────────────────────────────────────────────────────  │
│                                                                  │
│  WHY IT EXISTS                                                   │
│  $25–35B  annual addressable cost across global commercial       │
│           aviation from fragmented safety, content & training.   │
│  Citation footnote in 7pt muted.                                 │
│                                                                  │
│  ──────────────────────────────────────────────────────────────  │
│  PROOF — THREE CLOSED LOOPS                                      │
│  ┌────────────────────┬────────────────────┬──────────────────┐  │
│  │ DG Incident        │ Reg Change Mgmt    │ Training Loop    │  │
│  │ 72% incident ↓     │ 98.5% completion   │ 73% failure ↓    │  │
│  │ 1-line scenario    │ 1-line scenario    │ 1-line scenario  │  │
│  └────────────────────┴────────────────────┴──────────────────┘  │
│                                                                  │
│  WHAT IT UNLOCKS                                                 │
│  Risk ↓ · Efficiency ↑ · Continuous Compliance · Performance     │
│  (4 stat tiles, big number + label)                              │
│  ──────────────────────────────────────────────────────────────  │
│  © 2026 Comply365 · DTOP Operating Model         Brief · v2.0    │
└──────────────────────────────────────────────────────────────────┘
```

**Visual signature:**
- Four-step DTOP pipeline rendered as equal-width tiles with thin top accent bar in step colour, 36pt letter glyph, label in display font, tagline below — this is the "hero" of the page.
- Connectors between tiles are simple chevrons in muted ink.
- "$25–35B" set huge (44pt Space Grotesk, ink) with the descriptor running alongside in body — instant executive anchor.
- Three-loop proof row uses the metric as the visual lead (big number, small scenario beneath).
- Stat tiles at the bottom mirror the slide deck's value categories.

### Generation pipeline (both)

- Render off-screen at exact 1056×816 → `html2canvas({ scale: 2, useCORS: true, backgroundColor: "#FAFBFD" })` → `jsPDF("landscape","px",[816,1056])` → save.
- Pre-load Space Grotesk + Inter via injected `<link>` and await `document.fonts.ready` before capture (fixes font fallback on first export).
- Filenames: `Comply365-Persona-{id}-Brief.pdf`, `Comply365-DTOP-Operating-Model-Brief.pdf`.

### QA (post-implementation)

1. Export every persona (5) + DTOP → open each PDF, verify: no clipped text, fonts render as Space Grotesk/Inter (not Times fallback), accent colour matches persona, hairlines visible, margins even.
2. Diff-render at 1366×768 vs 1920×1080 source viewport → output is byte-identical (off-screen render is viewport-independent).
3. File size sanity: 200–500 KB per PDF.

### Files

**New**
- `src/components/print/printBrand.ts` — palette, type, spacing tokens, font preload helper.
- `src/components/print/DTOPPrintablePage.tsx`
- `src/components/DTOPDownloadButton.tsx`

**Edited**
- `src/components/PersonaPrintablePage.tsx` — full rewrite to new brand system.
- `src/components/PersonaDownloadButton.tsx` — use shared font preload helper, update filename to `…-Brief.pdf`.
- `src/components/dtop-slides/DTOPSlide0Title.tsx` — swap static PDF download for `<DTOPDownloadButton />`.

**Deleted**
- `public/Comply365-DTOP-Operating-Model-1-Pager.pdf` (replaced by live React generation).

### Out of scope

- No changes to slide deck visuals or `personaProfiles.ts` content.
- No new persona data; redesign is presentation-only.
- No multi-page briefs (deliberately keeping each as a single landscape page).

