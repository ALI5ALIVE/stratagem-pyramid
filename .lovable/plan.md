## Goal

Reorganize the **Customer Pitch Decks** section on the homepage so it only shows the two primary, sales-led decks. Move the CEO Overview and Long Technical Deep Dive into a new **Additional Resources** section at the bottom of the page.

## Changes

**File:** `src/pages/HomePage.tsx`

1. **Trim `pitchDecks` array** to only contain:
   - Short — Customer Overview
   - Medium — Executive Pitch

2. **Add a new `additionalResources` array** containing:
   - CEO Overview (`/pitch-executive-2`)
   - Long — Technical Deep Dive (`/pitch-technical-v4`)

3. **Add a new section** at the bottom of the page (after Capabilities), titled **"Additional Resources"** with subtitle like *"Extended decks for deeper boardroom and technical conversations"*, rendering the two cards in the same grid layout used elsewhere.

No other files affected. No routing or PPTX changes needed — the routes and decks themselves remain untouched.

## Result

- Customer Pitch Decks section becomes a focused 2-card row (Short + Medium).
- CEO Overview and Long Technical Deep Dive remain fully accessible, but live at the bottom of the page under "Additional Resources" so the primary pitch flow is cleaner.