## Add the AI Naming Brief to the Market Development page

Surface the `Comply365_AI_Naming_Brief_v1.pdf` as a first-class asset on `/market-development`, so it sits alongside the Positioning Playbook and DTOP POV.

### Where it goes

Add it under the existing **Positioning & Category Design** workstream in `src/data/marketDevelopmentAssets.ts` — that's where brand architecture decisions belong (the brief is the AI brand architecture artefact).

### Changes

**1. Host the PDF**
- Copy `/mnt/documents/Comply365_AI_Naming_Brief_v1.pdf` → `public/docs/Comply365_AI_Naming_Brief_v1.pdf` so it ships with the app and is downloadable at `/docs/Comply365_AI_Naming_Brief_v1.pdf`.

**2. Register the asset card**
- In `src/data/marketDevelopmentAssets.ts`, add a new entry to the `positioning` workstream's `assets` array:
  - title: "AI Naming & Architecture Brief"
  - href: `/docs/Comply365_AI_Naming_Brief_v1.pdf`
  - purpose: "Board-ready brief: three-tier naming convention, Intelligence Layer persona shortlist, and JTBD agents mapped to DTOP stages."
  - status: "Live"
  - icon: `FileText` (already imported pattern; add `FileBadge` or reuse `BookOpen`-family — use `FileText` from lucide-react for consistency with the existing Event Brief card)

**3. Make external/PDF links open correctly**
- `AssetCard` in `src/pages/MarketDevelopmentHub.tsx` currently uses react-router `<Link>` for every asset. PDFs need a real anchor with `target="_blank"` and `rel="noopener noreferrer"` so the browser opens/downloads the file instead of routing.
- Update `AssetCard` to detect non-internal hrefs (starts with `/docs/`, `http`, or ends with `.pdf`) and render an `<a>` instead of `<Link>` in those cases. Keep all existing styling/hover behaviour identical.

### Out of scope
- No copy changes to other cards, no new workstream, no design refresh.
- Not adding it to the sidebar (`MarketDevSidebar`) — the hub card is enough; revisit if the user wants nav-level access.
