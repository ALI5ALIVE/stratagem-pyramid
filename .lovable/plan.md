

# Simplify Home Page

Remove three sections from the Command Centre home page that are accessed from within decks rather than directly.

## Changes

### `src/pages/HomePage.tsx`
- Delete the `tools` array (Line of Sight, Homepage Mockup cards)
- Delete the `solutions` array (Airlines, Defense, Rail cards)
- Remove the "Tools & Analysis" and "Industry Solutions" sections from the render
- Clean up unused icon imports (`Target`, `Globe`, `Plane`, `Shield`, `Train`)

The page will retain only **Customer Pitch Decks** and **Strategy & Positioning** sections.

