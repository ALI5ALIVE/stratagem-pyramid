

## Redesign DTOP & Persona PDF one-pagers — dark theme + persona example

Both downloads currently render on near-white paper. The user wants a **dark background** for both with text remaining clearly legible, **same structural sections preserved**, and the **Persona brief enhanced** with a visual element / a "real-world example" persona vignette to bring it to life.

### 1. Add a dark palette to `printBrand.ts`

Extend `printBrand.color` with a dark print palette (no breaking changes — existing light tokens remain):

```ts
darkPaper:      "#0B1220"   // page background (matches app dark theme ink)
darkPaperWarm:  "#111A2E"   // raised surface (cards, tiles)
darkPaperRaised:"#16223C"   // double-raised (callouts)
darkInk:        "#F4F7FB"   // primary text
darkSlate:      "#C9D3E2"   // body text
darkMuted:      "#8FA0B8"   // labels
darkSubtle:     "#5E6E87"   // micro-copy
darkHairline:   "rgba(255,255,255,0.10)"
```

Step-accent colours stay (deep blue / amber / emerald / violet) but get **brightened variants** for dark surfaces:

```ts
stepAccentsDark = ["#3D8BFF", "#F59E0B", "#10B981", "#8B5CF6"]
```

### 2. Repaint `DTOPPrintablePage.tsx` (structure unchanged)

Same 5-block layout — Header / Title / DTOP pipeline (4 cards) / Why It Exists stat / Proof loops / What It Unlocks / Footer — repainted on dark:

- Page background: `darkPaper` with a subtle radial wash in the top-left (brand blue at 8% opacity) to add depth without distracting.
- Header: white "Comply" + brand-blue "365", uppercase metadata in `darkMuted`.
- Title bar: 4px brand-blue left rule, eyebrow in brand blue, white headline `Detect → Trigger → Orchestrate → Prove`, italic tagline in `darkSlate`.
- **DTOP pipeline cards**: each card on `darkPaperWarm` with a 3px top accent in its brightened step colour, glowing letter (D/T/O/P) in the accent colour, label/tagline/in-out lines in light tokens. Chevron separators in `darkSubtle`.
- **Why It Exists** stat strip: dark band between hairlines, the big `$25–35B` figure rendered in white with a brand-blue underline accent; methodology footnote in `darkSubtle`.
- **Proof — Three Closed Loops**: each metric coloured by its step accent, title in white, scenario in `darkSlate`.
- **What It Unlocks** 4-tile row: vertical hairline dividers in `darkHairline`, tile titles in their step accent, body in `darkSlate`.
- Footer: 2px brand-blue rule, micro-caps in `darkSubtle`.

### 3. Repaint `PersonaPrintablePage.tsx` + add the "Persona Vignette"

Keep every existing section: Header / Title block / Executive summary / Meta strip / Priorities + Pains / Triggers + Criteria / Value Proposition / Key Messages + Metrics / Discovery + Objection / Footer.

**Visual upgrades:**

- Dark background (`darkPaper`) with a soft accent-coloured wash (the persona's accent at ~6%) bleeding from the top-right, so each persona brief has a unique mood (violet for CEO, rose for Safety, blue for Ops, emerald for Training, amber for IT).
- Title block: replace the small bordered icon square with a **larger 80×80 "persona medallion"** — a filled circle in the persona accent colour at 18% opacity, hairline ring in the accent at 60%, the Lucide icon centred at 36px in the accent colour. This becomes the visual anchor of the page.
- All copy retuned for dark: white headlines, `darkSlate` body, accent-coloured eyebrows and bullets.
- Value-proposition pull-quote: thicker accent left rule, white display type, slight text-shadow / accent-coloured underline glyph for executive feel.

**New "Persona Vignette" panel (the requested example to bring it to life):**

Insert a single new band immediately after the Executive Summary (before the meta strip). Compact, ~70px tall, full width:

```text
┌──────────────────────────────────────────────────────────────┐
│  MEET [NAME]               “One-line persona quote”          │
│  [Title] · [Airline archetype]   — italic, accent-coloured   │
│  [3 micro-stats: fleet size · daily ops · years in role]     │
└──────────────────────────────────────────────────────────────┘
```

A **fictional but realistic exemplar** for each persona (hard-coded inside `PersonaPrintablePage.tsx`, keyed by `persona.id`), e.g.:

| Persona | Exemplar | Quote (drawn from existing `keyMessages`/`discoveryQuestions`) |
|---|---|---|
| `ceo-coo` | "Margaret Chen · COO, mid-size European carrier · 180 aircraft · 14 yrs ops" | "I need to know our controllable risk is going down quarter over quarter." |
| `vp-safety` | "James Okafor · VP Safety, long-haul carrier · 240 aircraft · ex-Captain" | "When the regulator asks 'did this fix work?', I want one answer, not five." |
| `vp-ops` | "Anika Patel · VP Flight Ops, low-cost carrier · 120 aircraft · 1.4M sectors/yr" | "Every grounded aircraft is a six-figure decision — I need the loop closed by lunch." |
| `training-director` | "Lukas Bergström · Training Director, regional carrier · 90 pilots/yr · CRM lead" | "Show me the line between a published procedure and a competent crew." |
| `cio-it` | "Priya Raman · CIO, network carrier · 320 aircraft · 9 systems modernisation" | "I'm consolidating 14 vendors — show me one platform that closes the loop." |

The exemplar quote, role, and three micro-stats render in the persona accent colour, giving each PDF a "real human" anchor so a salesperson can read it and immediately picture the buyer.

All quote text is fictional but plausible; clearly framed as **"Composite exemplar — illustrative buyer profile"** in a tiny `darkSubtle` footnote so it's never mistaken for a named customer.

### 4. Verify download buttons still work

`DTOPDownloadButton.tsx` and `PersonaDownloadButton.tsx` need no logic changes. Confirm `html2canvas` `backgroundColor` is updated from `printBrand.color.paper` to `printBrand.color.darkPaper` in both buttons so the canvas matches the new page background (otherwise the page edges fringe white).

### Files touched

**Edited**
- `src/components/print/printBrand.ts` — add `dark*` colour tokens + `stepAccentsDark`.
- `src/components/print/DTOPPrintablePage.tsx` — swap to dark tokens, retune accents, add subtle radial wash. Structure unchanged.
- `src/components/PersonaPrintablePage.tsx` — swap to dark tokens, enlarge persona medallion, add the new "Persona Vignette" exemplar band, retune typography for dark.
- `src/components/DTOPDownloadButton.tsx` — `backgroundColor: printBrand.color.darkPaper` in `html2canvas`.
- `src/components/PersonaDownloadButton.tsx` — same one-line `backgroundColor` swap.

**New**
- (none) — the persona exemplars live as a small `personaExemplars` const inside `PersonaPrintablePage.tsx` so the data sits next to the rendering code.

### Out of scope

- No changes to slide layouts in any deck (only the printable PDF templates).
- No new persona records in `personaProfiles.ts` — exemplars are render-time vignettes, not new app data.
- Light/printable variants are not removed — the light tokens remain in `printBrand.ts` for any future use.
- No changes to PPTX exporters (`buildTechnicalDeck.ts` etc.).

