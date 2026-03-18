

# Remove Sales Deck

## What Happens

The Sales Deck and all its assets are removed from the app. The slide components are preserved as standalone files (they already exist on disk and in version history).

## Files to Delete
- `src/pages/SalesDeck.tsx`
- `src/data/salesDeckNarration.ts`
- All 12 files in `src/components/sales-slides/`

## Files to Edit

### `src/App.tsx`
- Remove `SalesDeck` import and `/sales-deck` route

### `src/pages/HomePage.tsx`
- Remove the Sales Deck card from `pitchDecks` array
- Remove `Megaphone` icon import if unused

### `src/components/AppSidebar.tsx`
- Remove the Sales Deck entry from `pitchItems`
- Remove `Megaphone` icon import if unused

