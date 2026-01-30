
# Plan: Move "Back to Deck" Button Below Navigation

## Problem

The "Back to Deck" button is positioned at `top-4 left-4` and overlaps with the MainNavigation logo. Both have `z-50`, but since the navigation comes after in the DOM, its logo covers the button.

## Solution

Move the "Back to Deck" button down below the navigation header so it doesn't overlap with the logo.

---

## File to Modify

### `src/pages/HomepageMockup.tsx`

**Lines 167-175** - Change the positioning from `top-4` to `top-20` (approximately 80px down, below the navigation header which is about 64-72px tall):

| Current | New |
|---------|-----|
| `fixed top-4 left-4 z-50` | `fixed top-20 left-4 z-50` |

This positions the button below the fixed navigation header, making it fully visible and clickable.

---

## Visual Layout

```text
┌─────────────────────────────────────────────────────┐
│  [Logo]     Platform | Solutions | ...    [Actions] │  ← Navigation (fixed, top-0)
├─────────────────────────────────────────────────────┤
│  [← Back to Deck]                                   │  ← Button (fixed, top-20)
│                                                     │
│                    Hero Section                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Result

After implementation:
- "Back to Deck" button is clearly visible below the navigation header
- No overlap with the logo
- Button is fully clickable
- Maintains the fixed positioning so it stays visible while scrolling
