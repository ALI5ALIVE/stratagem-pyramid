## Problem found

The pages are blank because the new PPTX wiring imports the entire native PPTX exporter stack during normal app startup:

```text
App loads every route
  → ExecutivePitch3 imports TechSlideOpener
  → TechSlideOpener imports DeckPPTXExportButton
  → DeckPPTXExportButton imports @/exporters/pptx
  → @/exporters/pptx eagerly imports all PPTX builders + pptxgenjs
```

That makes the preview request a large dependency graph before the page renders. In the browser/network trace, multiple startup module requests are being aborted, leaving `#root` empty and the app white-screened. This is consistent across routes because `App.tsx` imports all pages eagerly.

## Fix plan

1. **Stop loading PPTX builders at startup**
   - Refactor `src/exporters/pptx/index.ts` so it exports only lightweight deck metadata immediately.
   - Replace top-level imports of `buildTechnicalDeck`, `buildExecutiveDeck`, and `buildExecutivePitch3Deck` with lazy dynamic imports inside each builder function.

2. **Keep type imports type-only**
   - Move shared `BuildOpts` typing into a lightweight local interface or type-only path so no PPTX builder code is pulled into the runtime bundle just for types.
   - Ensure `DeckPPTXExportButton` and `TechSlideOpener` only load the heavy PPTX code after the user clicks “Download Editable PowerPoint”.

3. **Preserve current download behavior**
   - Keep the same deck IDs and filenames:
     - `tech-deep-dive`
     - `executive-pitch`
     - `executive-pitch-3`
   - Keep the existing progress toasts and download button UI unchanged.

4. **Review routing load risk**
   - Check whether any other heavy exporters or generated assets are imported by page modules at startup.
   - If needed, apply the same lazy-loading pattern to prevent future blank-page regressions.

5. **Verify after implementation**
   - Confirm `/`, `/coanalyst`, `/pitch-executive-3`, `/pitch-technical-v4`, and `/platform-playbook` render again.
   - Confirm the Executive Pitch 3 PPTX button still initiates generation when clicked.
   - Then return to the V4 diagram/PPTX standardization work once the app is stable.

## Technical details

Primary files to update:

```text
src/exporters/pptx/index.ts
src/components/DeckPPTXExportButton.tsx
```

Likely shape of the new `index.ts` registry:

```ts
export const DECK_BUILDERS = {
  "executive-pitch-3": {
    filename: "Comply365-Executive-Pitch-Medium.pptx",
    label: "Executive Pitch · Medium",
    build: async (opts) => {
      const { buildExecutivePitch3Deck } = await import("./buildExecutivePitch3Deck");
      return buildExecutivePitch3Deck(opts);
    },
  },
};
```

This keeps all current functionality but removes the exporter dependency graph from normal page rendering.