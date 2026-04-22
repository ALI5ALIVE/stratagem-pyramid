

## Persona One-Pager PDF Download

Add a "Download One-Pager PDF" button to each persona on the **Persona Deep-Dive Hub** (`/personas`) that produces a professional, single-page, branded PDF summarising the active persona. Each PDF is generated client-side (no backend, no extra deps — reuses the `jspdf` + `html2canvas` stack already in the project).

## What the one-pager contains

Designed to fit on **one A4 landscape page** (matches existing `PrintablePage` format) with a tight, scannable layout:

```text
┌─────────────────────────────────────────────────────────────────┐
│ Comply365 logo            PERSONA ONE-PAGER       Date / Conf. │
├─────────────────────────────────────────────────────────────────┤
│ [Icon] CEO / COO                              Seniority: C-Suite│
│        Variants: CEO · COO · President · Accountable Manager    │
│        Profile summary (2–3 lines)                              │
│  Reports To  │  Org Context  │  Budget Influence (3 mini cards) │
├──────────────────────────┬──────────────────────────────────────┤
│ Strategic Priorities     │ Daily Pain Points                    │
│ (top 4, condensed)       │ (top 4, condensed)                   │
├──────────────────────────┼──────────────────────────────────────┤
│ Buying Triggers (top 3)  │ Decision Criteria (top 3)            │
├──────────────────────────┴──────────────────────────────────────┤
│ Value Proposition (italic, accent border)                       │
├──────────────────────────┬──────────────────────────────────────┤
│ Key Messages (top 3)     │ Metrics That Matter (top 4)          │
├──────────────────────────┴──────────────────────────────────────┤
│ Top Discovery Question  │  Top Objection + Response             │
├─────────────────────────────────────────────────────────────────┤
│ © Comply365 · Sales Enablement · /personas              v1.0    │
└─────────────────────────────────────────────────────────────────┘
```

To guarantee single-page fit, list-heavy sections are **truncated to top N items** (priorities/pains: 4; triggers/criteria/messages: 3; metrics: 4; discovery/objection: 1 each). Persona accent colour drives the header band, icon, and section title accents so each persona's PDF feels visually distinct but on-brand.

## How it works

1. Add a **"Download One-Pager PDF"** button in the persona header area (next to the seniority badge), and a duplicate button in the mobile chips toolbar.
2. On click: render a new `PersonaPrintablePage` component into a hidden offscreen `<div>` via `createRoot`, capture with `html2canvas` at 2× scale, write to a landscape A4 `jsPDF` (1056×816 px to match existing `PrintablePage`), download as `Comply365-Persona-{persona.id}.pdf`.
3. Show a `Loader2` spinner + disabled state while generating (same pattern as `DownloadButton.tsx`).

## Files

**New**
- `src/components/PersonaPrintablePage.tsx` — single-page print template, inline styles only (so html2canvas captures correctly without Tailwind class race conditions, mirroring `PrintablePage.tsx`). Accepts `{ persona: PersonaProfile }`.
- `src/components/PersonaDownloadButton.tsx` — wraps the generation logic; reuses the `jspdf` + `html2canvas` + `createRoot` pattern from `DownloadButton.tsx`. Accepts `{ persona: PersonaProfile }`.

**Edited**
- `src/pages/PersonaDeepDive.tsx` — import and render `<PersonaDownloadButton persona={active} />` in the persona header card (top-right, next to the seniority badge); also surface it above the mobile chips when on mobile.

## Design details

- **Branding**: Comply365 logo top-left, persona accent colour as a 6px top border on the page and on each section card. Inter / Space Grotesk system fallbacks (the print render uses inline `font-family` since html2canvas doesn't load Tailwind fonts reliably).
- **Colour mapping**: convert each persona's Tailwind tokens (`text-violet-400`, `bg-violet-500/10`, `border-violet-500/30`) to inline hex/rgba in a small `personaColorMap` inside the printable component, so PDF output is deterministic regardless of computed CSS.
- **Typography**: 11pt body, 9pt mini-cards, 18pt persona name, generous line-height (1.4) for executive readability.
- **Footer**: copyright, "Sales Enablement", source URL (`/personas`), and a doc version (`v1.0`) for tracking.

## Out of scope

- No bulk "Download all personas" zip — single-persona only (can be added later if requested).
- No print-from-browser CSS — this is a generated PDF, not a `window.print()` flow.
- No new external libraries — reuses `jspdf`, `html2canvas`, and `react-dom/client` already in `package.json`.
- Persona data is unchanged.

## QA plan

After implementing, verify by downloading each of the 5 personas' PDFs and confirming: single page, no clipped text, accent colour matches, all 10 sections render, logo + footer present.

