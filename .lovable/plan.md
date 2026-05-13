## Homepage refinement plan

Scope: `src/pages/Comply365Home.tsx` and components under `src/components/home/`. No other pages, no routing, no backend.

### 1. Drop "CoAnalyst" branding from the homepage

Replace every customer-facing mention of "CoAnalyst" with **"Intelligence Layer"** (positioned as the intelligence layer of the system of intelligence). The CoAnalyst product name continues to exist elsewhere (decks, playbooks) — this only affects the public homepage.

Files:
- `src/components/home/CoAnalystComparison.tsx` → rename to `IntelligenceLayer.tsx`. Update copy:
  - Eyebrow: "The intelligence layer — built on your operational data"
  - Right-hand answer card label: "Intelligence Layer" (was "CoAnalyst")
  - Closing line: "The intelligence layer of the system of intelligence — the only operational AI that understands your manuals, your safety reports and your training records together."
  - Keep the 90% vs 35% stat and `StatSourceChip` attribution intact.
- `src/components/home/ProductShowcase.tsx` → rename the first tab from "CoAnalyst" to "Ask the Intelligence Layer". Update pin labels and any in-tab body copy.
- `src/pages/Comply365Home.tsx` → swap import + component name, update any section headings/anchors that say "CoAnalyst".
- `SeoHead.tsx` → strip "CoAnalyst" from `<title>`, meta description, and JSON-LD; replace with "intelligence layer".

### 2. Reorder sections — DTOP right after the trust bar

New order:

```text
Hero
Trust bar
DTOP (operating model — anchors the new way of working)
Product showcase (3 Tuesday vignettes)
Why now
Intelligence Layer (90% vs 35% + before/after)
Customer proof
Personas
Final CTA
Footer
```

Implementation: reorder JSX in `Comply365Home.tsx`. No component changes required for this step beyond moving `<AnimatedDTOP />` above `<ProductShowcase />`.

Add a one-line bridge under the DTOP heading so it lands cleanly after the hero:
> "Every signal travels the same path — here's what that looks like for the people running it."
This sentence becomes the visual handoff into the product showcase.

### 3. Rewrite the product showcase — three concrete Tuesday vignettes

Replace the current three abstract tabs (CoAnalyst / Safety / Manuals) with three **role-based vignettes**, each tied to a real Tuesday-morning event, action, and outcome. Same tabbed structure; sharper content.

| Tab | Role | Event (8:42am) | Action | Outcome |
|---|---|---|---|---|
| 1 | **Director of Safety** | Crew report flags repeat altitude deviation on approach into LHR | Intelligence Layer surfaces 3 similar reports in 14 days, links to current SOP rev, drafts a recommended action | Investigation opened, Tech Pubs + Training auto-notified, audit trail started |
| 2 | **Head of Training** | 42 crews flagged as not yet recurrent on QRH 7.12 r.14 (effective 14 Mar) | One click assigns the delta module in TrainingManager365, sets due date, notifies line managers | Compliance gap closed before next ops review; evidence filed |
| 3 | **Tech Pubs Manager** | Regulator publishes EASA AD 2026-0098 affecting 2 fleet types | System maps the AD to 7 affected procedures, drafts revisions for review, flags downstream training impact | Revision cycle drops from 6 weeks to 4 days; nothing falls through the cracks |

Each tab card shows:
- Top: time chip ("Tuesday 08:42") + role chip
- Middle: a realistic-looking UI panel (inbox row → expanded card → action button) — reuse the annotated-pin pattern already in `ProductShowcase.tsx`, but simplify pins to **one per panel** for clarity
- Bottom: a single outcome line with a metric (e.g. "6 weeks → 4 days", "42 crews assigned in 1 click")

Section heading rewrite:
- H2: "Tuesday morning, before coffee."
- Sub: "Three roles. Three signals. Three resolved by lunch."

This replaces the current "What it actually looks like on Tuesday morning" wording, which tested as confusing.

### 4. Memory updates

After implementation, update:
- `mem://index.md` Core: add rule "Public homepage uses 'Intelligence Layer' — never 'CoAnalyst'."
- New memory `mem://content/homepage/terminology` capturing the rename + scope (homepage only; decks unaffected).

### Out of scope

- Decks, playbooks, persona pages, sales enablement (CoAnalyst stays there).
- Any new screenshots/illustrations beyond reusing the existing pin pattern.
- Routing, auth, password gate, backend, narration.

### Acceptance

- No occurrence of "CoAnalyst" in `src/pages/Comply365Home.tsx` or `src/components/home/**`.
- DTOP section renders immediately after the trust bar.
- Three vignette tabs render with role chip, time chip, single annotated panel, and outcome metric.
- Lighthouse SEO unaffected; JSON-LD still valid.
- Mobile (375px) and current viewport (1372px) both verified.
