

# Plan: Update Slide Numbering and Descriptions on Title Slide

## Current Issue

The agenda items in `Slide0Title.tsx` need to be verified and aligned with the actual slide sequence in `SlideDeck.tsx`. There are minor inconsistencies in labels and descriptions.

---

## Files to Modify

### `src/components/slides/Slide0Title.tsx`

**Lines 6-22** - Update the `agendaItems` array to match the current slide deck structure:

**Current:**
```tsx
const agendaItems = [
  { num: 1, label: "Strategic Shift", summary: "Why we're redefining the category" },
  { num: 2, label: "Before & After", summary: "What's broken — and how we fix it" },
  { num: 3, label: "Operating Model", summary: "Detect → Trigger → Orchestrate → Prove" },
  { num: 4, label: "Platform Capabilities", summary: "The platform that powers it" },
  { num: 5, label: "Transformation", summary: "Cost center to value driver" },
  { num: 6, label: "Operational Performance Ladder", summary: "Building blocks of performance" },
  { num: 7, label: "Operational Performance Roadmap", summary: "The measurable journey" },
  { num: 8, label: "Positioning", summary: "Where we stand vs. competitors" },
  { num: 9, label: "Customers", summary: "Measurable value delivery" },
  { num: 10, label: "Investors", summary: "Why this builds shareholder value" },
  { num: 11, label: "Becoming an AI Company", summary: "The intelligence layer & roadmap" },
  { num: 12, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 13, label: "Campaign Ideas", summary: "Cementing category leadership" },
  { num: 14, label: "Messaging in Context", summary: "How the category applies across domains" },
  { num: 15, label: "Platform Experience", summary: "How messaging appears in the product" },
];
```

**Updated:**
```tsx
const agendaItems = [
  { num: 1, label: "Strategic Shift", summary: "Why we're defining the category" },
  { num: 2, label: "Before & After", summary: "Fragmentation vs. connected operations" },
  { num: 3, label: "Operating Model", summary: "Detect → Trigger → Orchestrate → Prove" },
  { num: 4, label: "Platform Capabilities", summary: "The intelligent operating layer" },
  { num: 5, label: "Transformation", summary: "From cost center to value driver" },
  { num: 6, label: "Value Ladder", summary: "How value compounds with maturity" },
  { num: 7, label: "Maturity Roadmap", summary: "The measurable performance journey" },
  { num: 8, label: "Positioning", summary: "Competitive landscape & differentiation" },
  { num: 9, label: "Customers", summary: "Real-world measurable outcomes" },
  { num: 10, label: "Investors", summary: "Building shareholder value" },
  { num: 11, label: "AI Vision", summary: "The intelligence layer roadmap" },
  { num: 12, label: "Messaging House", summary: "Complete positioning framework" },
  { num: 13, label: "Campaign Ideas", summary: "Category leadership campaigns" },
  { num: 14, label: "Messaging in Context", summary: "How positioning applies across domains" },
  { num: 15, label: "Homepage Experience", summary: "Category positioning in the product" },
];
```

---

## Summary of Changes

| # | Current Label | Updated Label | Current Summary | Updated Summary |
|---|---------------|---------------|-----------------|-----------------|
| 1 | Strategic Shift | Strategic Shift | "Why we're redefining the category" | "Why we're defining the category" |
| 2 | Before & After | Before & After | "What's broken — and how we fix it" | "Fragmentation vs. connected operations" |
| 4 | Platform Capabilities | Platform Capabilities | "The platform that powers it" | "The intelligent operating layer" |
| 5 | Transformation | Transformation | "Cost center to value driver" | "From cost center to value driver" |
| 6 | Operational Performance Ladder | **Value Ladder** | "Building blocks of performance" | "How value compounds with maturity" |
| 7 | Operational Performance Roadmap | **Maturity Roadmap** | "The measurable journey" | "The measurable performance journey" |
| 8 | Positioning | Positioning | "Where we stand vs. competitors" | "Competitive landscape & differentiation" |
| 9 | Customers | Customers | "Measurable value delivery" | "Real-world measurable outcomes" |
| 10 | Investors | Investors | "Why this builds shareholder value" | "Building shareholder value" |
| 11 | Becoming an AI Company | **AI Vision** | "The intelligence layer & roadmap" | "The intelligence layer roadmap" |
| 13 | Campaign Ideas | Campaign Ideas | "Cementing category leadership" | "Category leadership campaigns" |
| 14 | Messaging in Context | Messaging in Context | "How the category applies across domains" | "How positioning applies across domains" |
| 15 | Platform Experience | **Homepage Experience** | "How messaging appears in the product" | "Category positioning in the product" |

---

## Rationale

1. **Shortened labels** (6, 7, 15) - "Operational Performance Ladder" → "Value Ladder" fits better in the grid layout
2. **Consistent terminology** - "AI Vision" aligns with the slide label in SlideDeck.tsx
3. **Clearer summaries** - Updated descriptions are more specific and action-oriented
4. **"Defining" vs "Redefining"** - We're creating a new category, not redefining an existing one

---

## Visual Impact

The title slide agenda grid will display shorter, more scannable labels while maintaining navigation functionality. The 4-column layout will render more cleanly with concise text.

