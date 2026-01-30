
# Plan: Create Master Navigation Component

## Problem

There are two separate navigation implementations:
1. **HomepageMockup.tsx** (lines 197-248): Full navigation with dropdown, search, login, and CTA
2. **IndustryHero.tsx** (lines 29-42): Simplified navigation with just solution links

This causes duplication and inconsistency between pages.

## Solution

Create a single shared `MainNavigation` component that both the homepage and solution pages use.

---

## Files to Create

### `src/components/MainNavigation.tsx`

A reusable navigation component that includes:
- Logo linking to `/homepage-mockup`
- Platform, Solutions (dropdown), Customers, Resources links
- Search icon, Login button, Request Demo CTA
- Sticky header with scroll-aware background

```tsx
// Key features:
- Same navItems structure from HomepageMockup
- Solutions dropdown with Airlines, Defense, Rail
- Responsive design (hidden on mobile)
- Scroll-aware styling (transparent → solid background)
```

---

## Files to Modify

### `src/pages/HomepageMockup.tsx`

**Changes:**
- Remove the `navItems` constant (lines 28-46)
- Remove the inline header/navigation (lines 197-249)
- Import and use `<MainNavigation />` instead

### `src/components/solutions/IndustryHero.tsx`

**Changes:**
- Remove the inline navigation (lines 29-42)
- Import and use `<MainNavigation />` at the top of the page (outside the hero section)
- Adjust hero section to account for fixed navigation

### `src/pages/solutions/AirlinesPage.tsx`

**Changes:**
- Import `MainNavigation`
- Add `<MainNavigation />` at the top of the page, before `<IndustryHero />`

### `src/pages/solutions/DefensePage.tsx`

**Changes:**
- Import `MainNavigation`
- Add `<MainNavigation />` at the top of the page

### `src/pages/solutions/RailPage.tsx`

**Changes:**
- Import `MainNavigation`
- Add `<MainNavigation />` at the top of the page

---

## Component Architecture

```text
MainNavigation (shared)
├── Logo → /homepage-mockup
├── Nav Links
│   ├── Platform
│   ├── Solutions (dropdown)
│   │   ├── Airlines → /solutions/airlines
│   │   ├── Defense → /solutions/defense
│   │   └── Rail → /solutions/rail
│   ├── Customers
│   └── Resources
└── Actions
    ├── Search
    ├── Login
    └── Request Demo (CTA)
```

---

## Result

After implementation:
- Single source of truth for navigation across all pages
- Consistent navigation experience whether on homepage or solution pages
- Easy to update navigation in one place
- Solution pages will have the full navigation with dropdown (not just direct links)
