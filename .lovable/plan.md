

# Add Back Buttons and Scoped CoAnalyst Sub-Page

## Problem
1. The CoAnalyst CTA links to the full 15-slide password-protected CoAnalyst deck — user wants it to show only the two relevant slides (Intelligence Tiers + Vs Generic AI) with a back button to Exec Pitch 2.
2. The Calculator CTA links to the full Line of Sight page with no way to get back to Exec Pitch 2.

## Changes

### 1. New page: `src/pages/CoAnalystPreview.tsx`
A lightweight page at route `/coanalyst-preview` that renders only two slides:
- `CASlide6HowItWorks` (Intelligence Tiers)
- `CASlide8VsGenericAI` (Vs Generic AI)

With a sticky back button at top-left: "← Back to Executive Pitch" linking to `/pitch-executive-2`.
No password gate. No sidebar navigation. Just the two slides stacked vertically with snap scrolling.

### 2. `src/App.tsx` — Add route
- Add `<Route path="/coanalyst-preview" element={<CoAnalystPreview />} />` and the import.

### 3. `src/components/slides/SlideAIVision.tsx` — Update CTA link
- Change `to="/coanalyst"` → `to="/coanalyst-preview"` on the CTA link.

### 4. `src/pages/LineOfSightPage.tsx` — Add back button
- Add a sticky/fixed back button at the top of the page: "← Back to Executive Pitch" linking to `/pitch-executive-2`.
- Use `useLocation` or `useSearchParams` to conditionally show the back button only when arriving from a referrer (or always show it since it's useful navigation).

**1 new file, 3 files modified.**

