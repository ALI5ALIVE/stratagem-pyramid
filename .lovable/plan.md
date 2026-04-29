## Changes to `TechSlideWhyComply.tsx`

This slide is the closing "Why Comply365" slide on the Medium / Executive Pitch 3 deck.

### 1. Connected Foundation — shorten copy
- **From:** "One data model, three core apps, one intelligence layer. Content, training and safety reason together — not in parallel."
- **To:** "One data model, three core apps, one intelligence layer for Content, training and safety."

### 2. Domain-Trained Intelligence — remove date reference
- **From:** "Insights & Intelligence built on aviation data since 2023. Not a generic AI with an aviation wrapper — purpose-built for the operational corpus."
- **To:** "Insights & Intelligence built on aviation data. Not a generic AI with an aviation wrapper — purpose-built for the operational corpus."

### 3. Add CTA — Deep dive on the platform and use cases
Add a CTA button below the trust-signals row (still inside the slide, no layout breakage) that links to the Technical Deep Dive (V4) page, which is the canonical platform + use-cases deep dive in this project.

- Label: "Deep dive · Platform & Use Cases"
- Target route: `/pitch-technical-v4` (the route mounted by `TechnicalDeepDiveV4.tsx`)
- Style: subtle outlined button using existing `DeepDiveLink` component pattern (already used elsewhere, e.g. CoAnalyst slide), so it matches the deck's visual language and doesn't disturb the closing-slide composition.
- Placement: right side of the trust-signals row replacing or supplementing the small italic "Closed loop · Domain-trained · Proof by design." line — the CTA replaces that tagline so the row stays balanced and h-screen fits without clipping.

### Verification before finalising
- Confirm `/pitch-technical-v4` is the correct deep-dive target by checking `src/App.tsx` route registration. If the user prefers a different destination (e.g. `/pitch-technical`, `/platform-playbook`, or one of the use-case pages), I'll switch the target — otherwise V4 is the most current platform deep-dive deck.

### Files touched
- `src/components/tech-slides/TechSlideWhyComply.tsx` — copy edits + CTA button.

No narration changes required — the existing script already speaks to "domain-trained intelligence" and "connected foundation" without referencing the year 2023.