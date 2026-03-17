

# Remove TOC Grid from Technical Pitch Title Slide

## Change
Edit `src/components/tech-slides/TechSlide0Title.tsx` to remove the `tocItems` array and the interactive TOC grid section, keeping only the title, subtitle, trust stats, and category line.

## File: `src/components/tech-slides/TechSlide0Title.tsx`
- Delete the `tocItems` array (lines ~22-41)
- Delete the TOC grid `<div className="grid grid-cols-6 ...">` block
- Remove the `onNavigateToSlide` prop since it's no longer needed

