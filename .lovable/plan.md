## Goal
Replace the "Tuesday morning, before coffee" `ProductShowcase` section on the home page (`/`) with a customer-benefits section modeled on the "What This Means for Customers" slide from Executive Pitch 3 (`CustomerOutcomesSlide`).

## Scope
- Frontend only. Public homepage `src/pages/Comply365Home.tsx`.
- No changes to the executive pitch deck or its slide.

## Changes

### 1. New component: `src/components/home/CustomerBenefits.tsx`
Web-native adaptation of `CustomerOutcomesSlide` (not a slide container — fits the homepage rhythm of `WhyNow`, `Platform`, etc.).

Structure:
- **Eyebrow**: "What this means for customers" (uppercase tracking style, matches other sections)
- **H2**: "Connecting operational signals to measurable business outcomes."
- **Lead paragraph**: One sentence — "Schedule protected. Revenue protected. Costs lower. Customers loyal."
- **Cost Center → Operational Performance → Revenue Driver** transformation strip (reused from the slide, restyled with homepage tokens — `border-border`, `bg-card`, no fixed slide sizing).
- **4-card grid** (md:grid-cols-2, lg:grid-cols-4) — Schedule Protection, Revenue Protection, Cost Savings, Customer Loyalty. Each card shows icon + title + subtitle + Signal → Action → Result mini-flow. Uses semantic tokens; accent colors match DTOP palette (primary, emerald, amber, violet).
- **Closing band**: "Operational signals → business outcomes." with a `Book a walkthrough` link via `BookWalkthroughDialog`.

Terminology: per memory, replace "safety signals" with "operational signals" on the public site.

### 2. Update `src/pages/Comply365Home.tsx`
- Remove `import ProductShowcase from "@/components/home/ProductShowcase"`.
- Add `import CustomerBenefits from "@/components/home/CustomerBenefits"`.
- In the page composition, swap `<ProductShowcase />` for `<CustomerBenefits />` (same slot — between DTOP and WhyNow).

### 3. Cleanup
- Delete `src/components/home/ProductShowcase.tsx` (no other importers — confirmed by codebase listing showing it only on the home page).

## Out of scope
- DTOP, Hero, Trust, Why Now, Intelligence Layer, Personas, CTA, Footer — unchanged.
- Exec Pitch 3 deck and `CustomerOutcomesSlide` — unchanged.
- No copy changes outside the new section.

## Acceptance
- Home page renders Hero → Trust → DTOP → **Customer Benefits** → Why Now → Intelligence Layer → Proof → Personas → CTA → Footer.
- No "Tuesday morning" vignette UI remains on `/`.
- 4 outcome cards display Signal/Action/Result with semantic tokens, responsive at 375px and 1415px.
- No references to "CoAnalyst" introduced; uses "operational signals" wording.
