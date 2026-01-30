

# Plan: Move Industry Context to Scope Line

## Goal

Remove the industry badge ("For Commercial Aviation", etc.) and instead integrate the industry context into the blue scope line beneath the headline.

---

## Current State

| Element | Airlines | Defense | Rail |
|---------|----------|---------|------|
| Badge | "For Commercial Aviation" | "For Military Aviation & Defense" | "For Rail Operations" |
| Scope line | "for Safety, Content, and Training" | "for Safety, Content, and Training" | "for Safety, Content, and Training" |

---

## Proposed Changes

**Remove the badge entirely** and update the scope line to include both the industry and the three pillars:

| Industry | New Scope Line |
|----------|----------------|
| Airlines | "Airline Safety, Content, and Training" |
| Defense | "Defense Safety, Content, and Training" |
| Rail | "Rail Safety, Content, and Training" |

This creates a cleaner hero without the redundant badge while anchoring the industry in the primary scope statement.

---

## Files to Modify

### 1. `src/components/solutions/IndustryHero.tsx`

**Remove the Badge component entirely** from the JSX (lines 31-34), as the industry context will now be in the scope line.

### 2. `src/pages/solutions/AirlinesPage.tsx`

**Update IndustryHero props:**
- Remove: `badgeText="For Commercial Aviation"`
- Update: `scopeLine="Airline Safety, Content, and Training"`

### 3. `src/pages/solutions/DefensePage.tsx`

**Update IndustryHero props:**
- Remove: `badgeText="For Military Aviation & Defense"`
- Update: `scopeLine="Defense Safety, Content, and Training"`

### 4. `src/pages/solutions/RailPage.tsx`

**Update IndustryHero props:**
- Remove: `badgeText="For Rail Operations"`
- Update: `scopeLine="Rail Safety, Content, and Training"`

---

## Visual Result

**Before:**
```
[For Commercial Aviation] ← badge

The Operational Performance Platform

for Safety, Content, and Training ← scope line
```

**After:**
```
The Operational Performance Platform

Airline Safety, Content, and Training ← combined scope line
```

---

## Technical Details

The `IndustryHero` component will be simplified by removing the Badge import and the badge rendering code. The `badgeText` prop can be removed from the interface since it will no longer be used.

