
# Comply365 Home Page — World-Class Refresh Plan

Goal: take the home page from "intellectually serious B2B" to **conversion-grade enterprise marketing** on par with Stripe, Datadog, Palantir, and Linear — without losing the differentiated DTOP / signals narrative that's already working.

Scope: `src/pages/Comply365Home.tsx` and a small set of new components under `src/components/home/`. No backend or routing changes.

---

## 1. New Section Order (product-first)

Current order buries the product behind 4 framing sections. New order surfaces it on the second scroll and front-loads trust.

```text
1. Hero                       (kept, refined)
2. Trust bar — real logos     (NEW position, moved up from §9)
3. Product showcase           (NEW — the missing piece)
4. The Shift / Why now        (merged Signals + Stakes + Today/Tomorrow)
5. Three modules              (kept, denser)
6. DTOP operating model       (kept, with motion)
7. CoAnalyst intelligence     (kept, with sourced stat)
8. Customer proof             (NEW — quotes + named outcome)
9. Personas / role deep-link  (kept, condensed)
10. Final CTA                 (kept, simplified to one primary CTA)
11. Footer                    (NEW — security, integrations, compliance, legal)
```

Net effect: 10 same-shaped sections become 9 differently-shaped sections with real visual variety.

---

## 2. Section-by-Section Changes

### Hero (refine)
- Keep the headline and DTOP strap.
- Replace the dual CTA with **one primary** ("Book a walkthrough" → opens scheduling modal) + one secondary text link ("See the platform →").
- Add an **inline product peek** on the right side at `lg:` breakpoint — a single annotated UI tile (CoAnalyst answering a manual question, or a DTOP control card) so the hero shows the product, not just words.
- Add `<title>`, meta description, OG image, and JSON-LD `Organization` + `SoftwareApplication` schema via a small `<SeoHead />` component.

### Trust bar (move up + upgrade)
- Replace the text-in-box logos with **real greyscale SVG logos** (Qantas, RAF, MoD, British Airways, Delta, plus 2 more).
- Single line, low-contrast, "Trusted by operators of mission-critical fleets" eyebrow.
- Add the 3 trust metrics (550+ customers, ~2.5M users, 6 continents) inline — small, not as a separate stat grid.

### Product showcase (NEW)
- Three-tab interactive showcase: **CoAnalyst · Safety control surface · Connected manuals**.
- Each tab shows a real annotated screenshot/UI mock with 2–3 callout pins explaining what the user is seeing.
- Built as a self-contained component: `src/components/home/ProductShowcase.tsx`.
- Uses real product screenshots if available, otherwise a high-fidelity Tailwind/SVG mock that matches the in-app aesthetic.

### The Shift (merge Signals + Stakes + Today/Tomorrow)
- Collapse three sections into one **"Why now"** section with a denser, two-column layout:
  - Left: signal definition + 4 signal-type chips (compressed from current 4 cards).
  - Right: the cost stats with **`StatSourceChip`** on each ($25–35B, ~65%, 70%) — sources already documented in `mem://content/dtop/industry-exposure-figure` and `mem://brand/trust-signals`.
- Drop the strikethrough Today/Tomorrow list — replace with a single horizontal "from → to" strip using the brand's existing pattern.

### Three modules (denser)
- Keep the 3-card row but add a **one-line outcome** per module (e.g. "Audit-ready in days, not weeks") instead of the abstract blurb.
- Add a tiny "Connected data model" diagram below the row (3 modules → shared substrate node) — replaces the current text-only "One Connected Data Model" line.

### DTOP (add motion)
- Keep the 4-step pipeline.
- Add a subtle **animated signal traveling D → T → O → P** on viewport-enter (Framer Motion, ~3s loop, respects `prefers-reduced-motion`).
- Add 1 short concrete example below each step (e.g. Detect: "Crew report flags a procedure deviation").

### CoAnalyst (add source + visual)
- Keep the 90% vs 35% comparison.
- Add `StatSourceChip` to both numbers (per `mem://content/coanalyst/accuracy-headline`).
- Add a small **before/after answer comparison** card: same question, generic LLM answer vs CoAnalyst answer with citations to operational manuals — visual proof of the 90% claim.

### Customer proof (NEW)
- 3 named customer quote cards with: portrait/initials, name, role, company, 1-sentence quote, 1 outcome metric.
- Use placeholder names if real testimonials aren't available yet, marked clearly as illustrative — or pull from the existing materials in the deck.

### Personas (condense)
- Keep the 4-card grid but compress padding by ~30% and remove the duplicate per-persona email chips at the bottom of the page (currently appears twice).

### Final CTA (simplify)
- One headline, one primary CTA, one secondary text link.
- Remove the persona email chips here (already covered in §9).
- **Replace `mailto:` with a real scheduling modal** (Calendly/Chili Piper iframe or a 3-field form posting to an edge function). Implementation: a `<BookWalkthroughDialog />` component triggered by every "Book a walkthrough" button on the page.

### Footer (NEW)
- 4 columns: Platform · Solutions · Trust (Security, Compliance, Integrations, Status) · Company.
- Pre-empts procurement/IT gatekeeper objections raised in the evaluation.
- Stub pages can be created later — the footer just needs the links visible.

---

## 3. New / Modified Files

| File | Action |
|---|---|
| `src/pages/Comply365Home.tsx` | Rewrite — new section order, simpler section components |
| `src/components/home/SeoHead.tsx` | NEW — title, meta, OG, JSON-LD |
| `src/components/home/ProductShowcase.tsx` | NEW — tabbed product visuals |
| `src/components/home/AnimatedDTOP.tsx` | NEW — DTOP with signal animation |
| `src/components/home/CoAnalystComparison.tsx` | NEW — before/after answer card |
| `src/components/home/CustomerQuotes.tsx` | NEW — testimonial grid |
| `src/components/home/HomeFooter.tsx` | NEW — full marketing footer |
| `src/components/home/BookWalkthroughDialog.tsx` | NEW — replaces mailto CTAs |
| `src/components/home/TrustLogos.tsx` | NEW — greyscale SVG customer logos |
| `src/assets/logos/*.svg` | NEW — customer logo SVGs (placeholder if real ones not licensed) |
| `src/components/shared/StatSourceChip.tsx` | Reuse — already exists |

---

## 4. Acceptance Criteria

- A first-time visitor sees a real product visual within the first scroll.
- Every numeric claim on the page has a source chip.
- Customer logos render as greyscale SVGs, not text in boxes.
- At least 2 customer quotes with named role + company appear above the fold of the proof section.
- Exactly **one** primary CTA appears throughout, and it opens a scheduling modal — no `mailto:` links remain on the page.
- Page passes Lighthouse SEO ≥ 95 and has valid `SoftwareApplication` JSON-LD.
- DTOP pipeline animates on scroll-in and respects `prefers-reduced-motion`.
- All new colors come from the existing design system tokens — no hardcoded hex.
- Mobile (≤ 768px) layout verified at 375px and 768px widths.

---

## 5. Out of Scope (call out so we don't scope-creep)

- Real customer testimonial content/legal sign-off — placeholders used until provided.
- Stub destination pages for new footer links (Security, Status, Integrations) — links exist, pages are a follow-up.
- A full booking backend — the dialog can post to an edge function or embed a third-party scheduler.
- Localization / i18n.
- Replacing the password gate.

---

## 6. Risks

- **Logo licensing**: real customer logos may need approval. Fallback: show greyscale silhouettes labeled "Tier-1 airline · Defense agency · National rail operator" — still more credible than current text boxes.
- **Product screenshots**: if no real UI exists for a section, the high-fidelity mock must be clearly representative, not misleading.
- **Animation cost**: Framer Motion adds ~30KB. Acceptable for a marketing page.

---

## 7. Suggested Build Order (so the page is shippable at every step)

1. SEO head + footer (quick wins, zero risk)
2. Trust logos + section reorder
3. Stat source chips on every number
4. Product showcase component
5. Customer quotes
6. CTA consolidation + booking dialog
7. DTOP animation + CoAnalyst comparison
8. Final polish + mobile QA

Each step leaves the page in a deployable state.
