## Remove the architecture diagram from `/platform` Hero

In `src/pages/PlatformOverview.tsx` Hero section:

- Drop the right-column block (`lg:col-span-5`) containing `<PlatformArchitectureDiagramV4 compact />` and its caption strip ("DTOP wraps the stack · Mobile · Intelligence · Core Apps").
- Expand the left column to full width: change `lg:col-span-7` → remove the grid wrapper, or set the inner block to span the full container so the H1, sub-copy, CTAs and persona switcher fill the hero cleanly.
- Remove the now-unused `PlatformArchitectureDiagramV4` import (it stays used further down inside the `PlatformModules` section, so verify before deleting — likely keep the import).

The diagram still appears in the **Platform Modules** section below, so the page doesn't lose the visual entirely — it just stops competing with the hero headline.

### Out of scope
- No copy changes to the hero.
- No changes to other sections.
