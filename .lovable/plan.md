## Fix

In `src/components/platform-slides/PFSlide9Value.tsx`, vertically center the 5 Value Unlocked cards within the slide area (since cards no longer fill the height, they currently sit at the top).

Wrap the grid in a flex container that fills the slide height and centers its child:

- Outer wrapper: `h-full flex items-center justify-center`
- Inner grid keeps `grid grid-cols-2 md:grid-cols-5 gap-2 items-start w-full`

No data or other slide changes.