
# Plan: Resize Slide Content to Fit Viewport

## Overview

This plan addresses content overflow across all 14 slides to ensure all content fits within a single viewport without scrolling. The changes involve adjusting the SlideContainer component and individual slide layouts.

---

## Root Cause Analysis

| Issue | Description |
|-------|-------------|
| `min-h-screen` | SlideContainer allows content to grow beyond viewport |
| Large spacing | `mb-8`, `gap-8`, `py-16` create excessive whitespace |
| Unconstrained content | Lists, grids, and visuals can expand indefinitely |
| Fixed heights | Charts and visuals don't adapt to available space |

---

## Files to Update

### 1. SlideContainer.tsx - Core Layout Fix

**Current Issue:** Uses `min-h-screen` which allows overflow

**Changes:**
- Change section from `min-h-screen` to `h-screen` 
- Add `overflow-hidden` to prevent scroll within slides
- Reduce vertical padding from `py-16 sm:py-20` to `py-10 sm:py-14`
- Reduce header margin from `mb-8 sm:mb-12` to `mb-4 sm:mb-6`
- Make content area use `flex-1 overflow-hidden` to constrain children

---

### 2. Slide0Title.tsx - Title Slide

**Current Issue:** Content fits but spacing can be tightened

**Changes:**
- Reduce `space-y-8 sm:space-y-12` to `space-y-4 sm:space-y-6`
- Reduce agenda grid padding `pt-4 sm:pt-8` to `pt-2 sm:pt-4`
- Reduce grid gaps

---

### 3. Slide1StrategicShift.tsx - Strategic Shift

**Current Issue:** Good layout, minor spacing adjustments needed

**Changes:**
- Reduce `gap-8 lg:gap-12` to `gap-4 lg:gap-6`
- Reduce `space-y-6` in content area

---

### 4. Slide2BeforeAfter.tsx - Before & After

**Current Issue:** SVG visuals and margin at bottom may overflow

**Changes:**
- Reduce SVG container height from `h-48` to `h-36`
- Reduce `gap-6 lg:gap-10` to `gap-4 lg:gap-6`
- Reduce bottom callout margin from `mt-6` to `mt-3`

---

### 5. Slide3OperatingModel.tsx - Operating Model

**Current Issue:** Multiple sections with generous spacing

**Changes:**
- Reduce `mb-4` to `mb-2` for CoreSolutionsInfinity
- Reduce `mb-3` to `mb-2` for data sources row
- Reduce `mt-4` to `mt-2` for value generated row

---

### 6. SlidePlatformCapabilities.tsx - Platform Capabilities

**Current Issue:** Good layout, minor tightening

**Changes:**
- Reduce image size from `w-72 h-72 lg:w-80 lg:h-80` to `w-56 h-56 lg:w-64 lg:h-64`
- Reduce `py-8` padding in visual container to `py-4`
- Reduce `mt-6 pt-5` in bottom banner to `mt-3 pt-3`

---

### 7. Slide4Transformation.tsx - Transformation

**Current Issue:** Good, minor adjustments

**Changes:**
- Already uses compact spacing, minimal changes needed
- Reduce any remaining `gap-4` to `gap-3`

---

### 8. Slide4ValuePyramid.tsx - Performance Ladder

**Current Issue:** Details panel has scrollable content which is fine

**Changes:**
- Reduce `gap-6 lg:gap-8` to `gap-4 lg:gap-6`
- Reduce min-height from `min-h-[300px] lg:min-h-[400px]` to `min-h-[260px] lg:min-h-[340px]`

---

### 9. Slide5MaturityCurve.tsx - Performance Roadmap

**Current Issue:** SVG curve may be too tall, summary banner adds height

**Changes:**
- Reduce `space-y-4` to `space-y-2`
- Reduce `gap-6` grid gap to `gap-4`
- Reduce SVG `max-h-[400px]` to `max-h-[320px]`
- Reduce summary banner padding

---

### 10. Slide8PositioningMap.tsx - Positioning

**Current Issue:** Chart uses square aspect ratio which is too tall

**Changes:**
- Change chart container from `aspect-square` to fixed max height
- Use `max-h-[380px]` instead of `aspect-square`
- Reduce `gap-5` to `gap-3`

---

### 11. Slide7Customers.tsx - Customers

**Current Issue:** Most overflowed slide - has multiple large sections

**Changes:**
- Reduce executive banner margin from `mb-8` to `mb-4`
- Reduce cost-performance-revenue section margin from `mb-6` to `mb-3`
- Reduce gauge cards from `md:grid-cols-3 gap-5 mb-8` to `gap-3 mb-4`
- Reduce gauge SVG height from `h-32` to `h-24`
- Reduce padding in cards from `p-5` to `p-4`

---

### 12. SlideAIVision.tsx - AI Vision

**Current Issue:** Dense content in two columns

**Changes:**
- Reduce `gap-6 lg:gap-8` to `gap-4 lg:gap-6`
- Reduce `space-y-4` to `space-y-3` in left column
- Reduce timeline card padding from `p-3` to `p-2.5`

---

### 13. Slide9CategoryRationale.tsx - Category Rationale

**Current Issue:** Good layout but hero banner is tall

**Changes:**
- Reduce hero banner padding from `p-4 sm:p-6` to `p-3 sm:p-4`
- Reduce `mb-4 sm:mb-6` to `mb-3 sm:mb-4`
- Reduce closing statement margin from `mt-4 sm:mt-6` to `mt-3 sm:mt-4`

---

### 14. SlideMessagingHouse.tsx - Messaging House

**Current Issue:** House structure with multiple sections

**Changes:**
- Reduce roof min-height from `min-h-[100px]` to `min-h-[80px]`
- Reduce `gap-3` to `gap-2` between house sections
- Reduce POV section padding

---

### 15. SlideCampaignIdeas.tsx - Campaign Ideas

**Current Issue:** Dense campaign grid

**Changes:**
- Reduce `gap-4` in top strip to `gap-3`
- Reduce flagship campaign card padding from `p-4` to `p-3`
- Reduce supporting campaign grid gap from `gap-2` to `gap-1.5`

---

### 16. DetailsPanel.tsx - Shared Component

**Current Issue:** Used in Value Pyramid slide

**Changes:**
- Reduce `space-y-1.5` to `space-y-1`
- Reduce various margin-bottom values

---

## Summary of Changes

| Slide | Primary Changes |
|-------|----------------|
| Container | `h-screen overflow-hidden`, reduce padding |
| 0 - Title | Reduce spacing between sections |
| 1 - Strategic Shift | Reduce grid gap |
| 2 - Before/After | Smaller SVG, reduce margins |
| 3 - Operating Model | Tighter section spacing |
| 4 - Platform | Smaller ecosystem image |
| 5 - Transformation | Minor gap reduction |
| 6 - Performance Ladder | Reduce gap and min-heights |
| 7 - Roadmap | Smaller curve, less spacing |
| 8 - Positioning | Max-height charts instead of aspect-square |
| 9 - Customers | Reduce all margins and gauge size |
| 10 - AI Vision | Tighter column spacing |
| 11 - Category | Reduce hero and callout padding |
| 12 - Messaging House | Smaller roof, tighter sections |
| 13 - Campaign | Reduce card padding and gaps |
| Shared - DetailsPanel | Reduce spacing |

---

## Technical Approach

For each slide, the changes follow this pattern:

```text
1. Reduce container padding/margins
2. Reduce gaps between grid/flex items
3. Reduce component heights where applicable
4. Ensure content uses flex-1 with overflow constraints
```

The goal is to maintain readability while ensuring all content fits within a single viewport height, eliminating the need to scroll within any individual slide.
