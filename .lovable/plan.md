

# Home Page + Navigation Overhaul

## What We're Building

A new **Home/Dashboard page** at `/` that acts as a polished launch pad for all decks, replacing the current setup where the Strategy Deck lives at `/`. The Strategy Deck moves to `/strategy`. The navigation gets a complete upgrade with grouped categories, descriptions, and visual polish.

## Architecture

### 1. New Home Page (`src/pages/HomePage.tsx`)

A card-grid dashboard organized into three sections:

**Customer Pitch Decks** (what you present externally)
- Executive Pitch — C-suite, 8 slides, strategic ROI
- Operational Pitch — VP Ops/Safety, 12 slides, workflow depth
- Technical Deep-Dive — IT/Innovation