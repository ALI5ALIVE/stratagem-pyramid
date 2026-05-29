---
name: PPTX Brand Template
description: Comply365 AircraftIT-derived PPTX chrome — assets, colors, layout coords for editable deck exports.
type: design
---
Source template: `AircraftIT Webinar - Platform Feb 2026 - For TP Design.pptx` (uploaded May 2026).

Brand chrome module: `src/exporters/pptx/comply365Brand.ts`
Brand assets: `src/assets/brand/comply365/{wordmark-bar.png, jet-mark.png, cover-chrome.png, wing.png}`

Theme colors (from `ppt/theme/theme1.xml`):
- bg `#121418`, surface `#1B1E24`, hairline `#2C2F37`
- primary blue `#0057FF`, deep blue `#005389`
- cyan `#00BBC7`, magenta accent `#BA0081`
- text `#FFFFFF`, muted `#C3CFE5`

Font: Arial (template's theme Latin font — universal fallback).

Layout:
- Top strip: 0.18" tall, brand bg color; jet-mark image right-aligned at y=0.05 on content slides.
- Footer strip: from y = H-0.55, 0.55" tall, brand bg; thin 0.018" blue rule at top of strip.
- Wordmark image: bottom-left, x=0.35, y=H-0.46, height 0.34" (aspect 8.5:1).
- Deck label: centered at y=H-0.42.
- Page counter: bottom-right, x=W-1.25.
- Cover hero: right 28% width, dark chevron `cover-chrome.png`.
- Divider hero: right 32% width, `wing.png` with 0.8" dark fade overlay on inner edge.

Applied to: Executive Pitch Medium + Long PPTX exports (`buildExecutivePitch3Deck.ts`).
Out of scope: other deck builders (Customer Overview, Tech Deep Dive, AI Infographic) still use `src/lib/pptxBrand.ts`.