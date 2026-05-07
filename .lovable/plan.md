## Goal
On `/platform`, replace the circular ecosystem PNG (`comply365-platform-ecosystem.png`) in the **"The Platform"** section with the same visual the Medium pitch uses on its Platform slide.

## What the Medium deck actually shows
`TechV4PlatformOverview` (slide "The Platform" in `/pitch-executive-3`) does **not** use a circular image — it uses `PlatformArchitectureDiagramV4`: a stacked-layer diagram showing
DTOP (wrap) → Unified Mobile → Intelligence & Orchestration → Core Apps, all bordered as "The Operational Performance Platform · One Integrated Solution".

That stack is the "platform image" from the Medium deck.

## Change
In `src/pages/PlatformOverview.tsx`, `PlatformModules` section:
- Remove the `<img src={platformEcosystem} … />` block (and its import).
- Render `<PlatformArchitectureDiagramV4 compact />` in the same left column slot (`lg:col-span-5`).
- Keep the right-column 4 module cards untouched.
- Tighten the column container so the stack diagram has room (`flex items-stretch`, give it `h-full min-h-[420px]`).

## Out of scope
- Don't edit Medium deck slides.
- Don't change other sections of `/platform`.
- Don't delete the `comply365-platform-ecosystem.png` asset (still referenced elsewhere potentially).
