

## Fix: Persona & DTOP PDF downloads silently failing

### Root cause

Both download buttons render the printable page into an off-screen container at `left: -9999px`, then call `html2canvas` after a `setTimeout(200)`. Two problems:

1. **html2canvas + far off-screen elements**: when an element is positioned at `left: -9999px`, html2canvas computes a bounding rect outside the viewport and in some browsers returns a blank/clipped canvas. The PDF "saves" but is empty (or the canvas step throws and is only logged to console — no user feedback).
2. **Render timing**: `createRoot.render()` is async; `setTimeout(200)` is not guaranteed to be after React commit + style application + font swap. First-click exports often capture an unstyled frame.

The "Function components cannot be given refs" console warning is unrelated noise from Radix Sidebar — not the cause.

### Fix

Apply the same pattern to **both** `PersonaDownloadButton.tsx` and `DTOPDownloadButton.tsx`:

1. **Position the off-screen container at on-screen coordinates but visually hidden**:
   ```ts
   tempContainer.style.position = "fixed";
   tempContainer.style.left = "0";
   tempContainer.style.top = "0";
   tempContainer.style.zIndex = "-1";
   tempContainer.style.opacity = "0";
   tempContainer.style.pointerEvents = "none";
   tempContainer.style.width = `${printBrand.page.width}px`;
   tempContainer.style.height = `${printBrand.page.height}px`;
   ```
   The element is now in the layout viewport so html2canvas captures it correctly, but invisible to the user.

2. **Replace `setTimeout` with double-`requestAnimationFrame` + fonts ready** to guarantee the React commit and style/font application have happened before capture:
   ```ts
   root.render(<PrintablePage … />);
   await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
   await ensurePrintFontsLoaded(); // call again after mount so fontfaceset.load resolves against the rendered DOM
   ```

3. **Pass explicit width/height/window dims to html2canvas** so it never falls back to the document body:
   ```ts
   html2canvas(pageElement, {
     scale: 2,
     useCORS: true,
     logging: false,
     backgroundColor: printBrand.color.paper,
     width: printBrand.page.width,
     height: printBrand.page.height,
     windowWidth: printBrand.page.width,
     windowHeight: printBrand.page.height,
   });
   ```

4. **Surface failures with a toast** (using existing `sonner` already wired into the app) so the user knows when generation fails instead of silently doing nothing:
   ```ts
   import { toast } from "sonner";
   …
   } catch (err) {
     console.error("Persona PDF generation failed:", err);
     toast.error("Could not generate PDF. Please try again.");
   }
   ```
   And a `toast.success("Persona brief downloaded")` after `pdf.save(...)`.

### Files

**Edited**
- `src/components/PersonaDownloadButton.tsx` — apply the four fixes above.
- `src/components/DTOPDownloadButton.tsx` — apply the same four fixes.

### Verification

1. Open `/personas`, click **Download Persona Brief PDF** for each of the 5 personas → each saves as a properly rendered landscape PDF with Space Grotesk + Inter fonts, persona accent colour, and full content.
2. Open the DTOP playbook title slide, click **Download 1-Pager PDF** → the dynamic DTOP one-pager saves correctly.
3. If anything fails, a red toast appears explaining it instead of silent nothing.
4. No new console warnings introduced.

### Out of scope

- No redesign of the printable pages themselves.
- No changes to `printBrand.ts` tokens.
- The "Function components cannot be given refs" warning from Radix Sidebar is not addressed here — it is unrelated noise and does not affect functionality.

