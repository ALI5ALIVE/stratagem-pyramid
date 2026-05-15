# Replace `/comply365-mockup` hero with the `/comply365-home` hero

Swap the current mockup hero section (the gradient + collage image hero, `Comply365MockupHome.tsx` lines 30–67) with the exact hero used on `/comply365-home` (`Comply365Home.tsx` lines 47–131).

That hero is the two-column layout with:
- Left: "Operations runs on signals. Nobody acts on them." headline, subhead, **Book a walkthrough** dialog button, "See the platform" link, and the Detect → Trigger → Orchestrate → Prove pill row.
- Right: the "Intelligence Layer" product-peek mock card (QRH 7.12 r.14 / Recommended Action).
- Background: dual radial gradients + faint grid pattern.

## Technical changes (single file: `src/pages/Comply365MockupHome.tsx`)

1. **Imports**:
   - Add `Link` from `react-router-dom`.
   - Add `BookWalkthroughDialog` from `@/components/home/BookWalkthroughDialog` (path used by `Comply365Home.tsx`).
   - Keep existing `Sparkles`, `ArrowRight`.
2. **Replace** the entire `{/* 1. HERO */}` `<section>` (lines 30–67) with the Hero markup copied verbatim from `Comply365Home.tsx`.
3. **Keep** the `heroCollage` import — it is still referenced lower in the file (Section 14 blog card).
4. No other sections, navigation, or routing change.

## Out of scope

- No edits to `Comply365Home.tsx` or any shared component.
- No changes to other sections of `/comply365-mockup`.
- No new assets.
