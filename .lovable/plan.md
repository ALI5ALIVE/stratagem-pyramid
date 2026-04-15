

# Persona Deep-Dive Hub

## Summary

Create a new dedicated `/personas` page with comprehensive, world-class persona profiles designed as a reference tool for sales enablement and content alignment. Each persona will be a rich, scrollable profile card with structured sections that any content creator, sales rep, or marketer can use to align messaging.

## Personas (5 profiles)

Based on existing data across the codebase (MessagingHouse, CoAnalyst Persona Messaging, Sales Enablement):

1. **CEO / COO** (Executive)
2. **VP Safety / Safety Director**
3. **VP Operations / Operations Director**
4. **Training & L&D Director**
5. **CIO / IT Director**

Each persona will include these sections:

```text
┌─────────────────────────────────────────────────┐
│  [Icon] PERSONA TITLE          Role / Seniority │
│  ─────────────────────────────────────────────── │
│  PROFILE SNAPSHOT                                │
│  Title variants, reports to, org size, budget    │
│  ─────────────────────────────────────────────── │
│  STRATEGIC PRIORITIES                            │
│  What keeps them up at night (3-5 bullets)       │
│  ─────────────────────────────────────────────── │
│  DAILY PAIN POINTS                               │
│  Operational frustrations they face today        │
│  ─────────────────────────────────────────────── │
│  BUYING TRIGGERS                                 │
│  Events/signals that create urgency to act       │
│  ─────────────────────────────────────────────── │
│  DECISION CRITERIA                               │
│  How they evaluate solutions                     │
│  ─────────────────────────────────────────────── │
│  VALUE PROPOSITION                               │
│  Our tailored pitch to this persona              │
│  ─────────────────────────────────────────────── │
│  KEY MESSAGES (3-5)                              │
│  Exact phrases/talking points for conversations  │
│  ─────────────────────────────────────────────── │
│  OBJECTION HANDLING                              │
│  Common objections + structured responses        │
│  ─────────────────────────────────────────────── │
│  CONTENT ALIGNMENT                               │
│  Preferred formats, channels, content themes     │
│  ─────────────────────────────────────────────── │
│  METRICS THAT MATTER                             │
│  KPIs this persona is measured on                │
│  ─────────────────────────────────────────────── │
│  DISCOVERY QUESTIONS                             │
│  Open-ended questions to use in meetings         │
└─────────────────────────────────────────────────┘
```

## Changes

### 1. New data file: `src/data/personaProfiles.ts`
- Comprehensive structured data for all 5 personas
- Each persona object contains: `id`, `title`, `titleVariants`, `icon`, `color`, `reportsTo`, `orgContext`, `strategicPriorities`, `dailyPains`, `buyingTriggers`, `decisionCriteria`, `valueProposition`, `keyMessages`, `objections` (with responses), `contentAlignment` (formats, channels, themes), `metricsThatMatter`, `discoveryQuestions`
- Aviation-specific, deeply researched content drawn from existing slide data and expanded significantly

### 2. New page: `src/pages/PersonaDeepDive.tsx`
- Left sidebar: vertical tab list of 5 personas with icons and color accents
- Right content area: scrollable deep-dive profile with all sections rendered using cards, badges, and accordion patterns
- Responsive: on mobile, tabs become horizontal scrollable chips at the top
- Print-friendly styling for PDF export
- Clean dark theme matching existing app aesthetic

### 3. `src/App.tsx` — Add route
- Add `<Route path="/personas" element={<PersonaDeepDive />} />`

### 4. `src/components/AppSidebar.tsx` — Add nav item
- Add `{ title: "Persona Profiles", url: "/personas", icon: Users }` to the `toolItems` array

### 5. `src/pages/HomePage.tsx` — Add card
- Add a new card in the "Strategy & Positioning" or "Tools" section linking to `/personas`

**3 new files, 3 files modified.**

## Technical Details

- No backend/database needed — all content is static data
- Uses existing UI primitives: `Card`, `Badge`, `Accordion`, `ScrollArea`, `Tabs`
- Persona color system matches existing accent patterns (emerald, blue, orange, violet, cyan)
- Data file is the single source of truth — any future persona updates happen in one place

