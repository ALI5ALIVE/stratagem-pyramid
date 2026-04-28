# Fix: preview is blank on /pitch-technical-v4

## What's actually wrong

Your code is fine. I verified:

- Dev server is running cleanly. The log only shows successful HMR updates for the four files we last edited — no syntax errors, no Vite "transform failed", no exceptions.
- Every file the browser is asking for actually exists on disk: `src/index.css`, `src/App.tsx`, `src/components/ui/tooltip.tsx`, `src/components/AppLayout.tsx`, `src/pages/ExecutivePitch2.tsx`, `src/pages/InsightsPlaybook.tsx`.
- The recently edited slides (`PlatformArchitectureDiagramV4`, `TechV4SlideInsights`, `TechV4SlideMobile`, `TechSlideWhyComply`) all parse — JSX is balanced and imports resolve.

When I loaded `/pitch-technical-v4` in the preview, the browser console shows a cluster of 404s like:

```
GET /src/index.css?t=1777366101393              404
GET /src/components/ui/tooltip.tsx              404
GET /node_modules/.bun/vite@5.4.19+.../env.mjs  404
GET /src/components/AppLayout.tsx               404
GET /src/pages/ExecutivePitch2.tsx              404
GET /src/pages/InsightsPlaybook.tsx             404
```

That `?t=1777366101393` query string is the giveaway: the iframe is still running an old `main.tsx` bundle from a previous Vite session and re-requesting modules with a timestamp the *current* Vite no longer recognises. The new dev server has a different bun-pinned path for `vite/dist/client/env.mjs`, so the import map mismatches and the entire module graph fails to load → blank screen.

This is an **environment / iframe-cache** issue, not a code bug. There is nothing to revert in the slide changes.

## Fix (no code changes needed)

1. **Hard-refresh the preview iframe.** In the preview pane click the refresh icon while holding Shift, or open the preview in a new tab and reload. That will pull the new `main.tsx` with the current timestamp and the 404s will go away.
2. If the preview is still blank after a hard refresh, click any chat input (even just "ok") so Lovable bumps the sandbox — that forces a fresh Vite restart with a coherent module graph.
3. If you want, you can also try the **published** URL (`https://stratagem-pyramid.lovable.app/pitch-technical-v4`) — that one is served by the static build, not the live dev server, so it bypasses the stale-module problem entirely. (Note: visiting it through the Lovable login screen is a separate auth gate and not related to this bug.)

## Why I'm confident

- No errors in the dev-server log since the last edits — only "hmr update" lines.
- Every 404'd path resolves to a real file on disk with valid contents.
- The error pattern (timestamp-tagged URLs + a bun-hashed Vite path) is the exact signature of an iframe holding a pre-restart module graph.

## What I'll do next (after the refresh)

If the hard refresh does **not** clear the blank screen, send me a fresh console log and I'll dig further — at that point we'd be looking at a sandbox issue rather than the slide code.
