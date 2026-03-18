

# Remove GlobalData Deck

## Files to Delete
- `src/pages/GlobalDataDeck.tsx`
- `src/data/globalDataNarration.ts`
- `src/hooks/useGlobalDataNarration.ts`
- `src/assets/globaldata-logo-white.svg`
- All 15 files in `src/components/globaldata-slides/` (GDSlide0–9, GDSlideContainer, helper components)

## Files to Edit

### `src/App.tsx`
- Remove `GlobalDataDeck` import and the `/globaldata` route

### `src/pages/HomePage.tsx`
- Remove the GlobalData card from the `tools` array
- Remove the `Sparkles` icon import if no longer used

### `src/components/AppSidebar.tsx`
- Remove the GlobalData entry from the sidebar items array
- Remove the `Sparkles` icon import if no longer used

