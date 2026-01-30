

# Plan: Update Homepage Badge + Create Industry Solutions Pages

## Summary

1. **Quick Fix**: Update the homepage badge from "For Airlines & Aviation Operations" to "For mission-critical, regulated operations"
2. **New Pages**: Create three industry-specific solution pages (Airlines, Defense, Rail) that apply the Operational Performance Platform messaging from the deck

---

## Part 1: Homepage Badge Update

### File: `src/pages/HomepageMockup.tsx`
**Line 227**

| Current | New |
|---------|-----|
| `For Airlines & Aviation Operations` | `For mission-critical, regulated operations` |

---

## Part 2: Industry Solutions Page Template

Each industry page will follow a consistent structure inspired by the deck messaging, particularly:
- **Slide 0**: Category definition
- **Slide 3**: Operating Model (Detect → Trigger → Orchestrate → Prove)
- **Slide 12**: Messaging House (pillars, value propositions)

### Page Structure (Common to All)

```text
┌─────────────────────────────────────────────────────────┐
│  HERO SECTION                                           │
│  - Industry-specific headline                           │
│  - Core platform definition                             │
│  - CTA buttons                                          │
├─────────────────────────────────────────────────────────┤
│  CUSTOMER LOGOS BAR                                     │
│  - Trusted by [industry] leaders                        │
├─────────────────────────────────────────────────────────┤
│  INDUSTRY CHALLENGE SECTION                             │
│  - Before/After comparison                              │
│  - Industry-specific pain points                        │
├─────────────────────────────────────────────────────────┤
│  OPERATING MODEL (DTOP)                                 │
│  - Detect → Trigger → Orchestrate → Prove               │
│  - Industry-specific examples for each step             │
├─────────────────────────────────────────────────────────┤
│  THREE PERFORMANCE PILLARS                              │
│  - Safety Performance (industry-specific)               │
│  - Content Performance (industry-specific)              │
│  - Training Performance (industry-specific)             │
├─────────────────────────────────────────────────────────┤
│  PLATFORM CAPABILITIES                                  │
│  - Connected Foundation                                 │
│  - Continuous Improvement                               │
│  - Proof at Scale                                       │
│  - AI Accelerator                                       │
├─────────────────────────────────────────────────────────┤
│  CASE STUDY / CUSTOMER QUOTE                            │
│  - Industry-specific success story                      │
├─────────────────────────────────────────────────────────┤
│  CTA SECTION                                            │
│  - Request demo / Calculate ROI                         │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Part 3: Industry-Specific Content

### Airlines Page (`/solutions/airlines`)

**Hero:**
- Headline: "Operational Performance for Airlines"
- Subhead: "A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes."

**Industry Challenge:**
| Point Solutions | Connected Platform |
|-----------------|-------------------|
| FOQA data sits in isolation | Safety signals trigger procedure updates |
| Manual coordination between departments | Automated workflows across safety, content, training |
| Audit scrambles before inspections | Continuous proof of compliance |
| Reactive training schedules | Training targeted to actual operational risk |

**DTOP Examples:**
- **Detect**: FOQA exceedance, ASAP report, audit finding
- **Trigger**: Automatic procedure review, training requirement
- **Orchestrate**: Coordinated updates to manuals, targeted crew training
- **Prove**: FAA/EASA audit-ready documentation

**Performance Metrics:**
- Safety: "50% faster investigation closure"
- Content: "60% faster regulatory change cycles"
- Training: "94% workforce readiness score"

**Customer Logos:** Delta, British Airways, Qantas, Southwest

---

### Defense Page (`/solutions/defense`)

**Hero:**
- Headline: "Operational Performance for Defense"
- Subhead: "A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes."

**Industry Positioning:**
- "Force multiplier" language
- Mission-readiness focus
- Warfighter enablement

**Industry Challenge:**
| Point Solutions | Connected Platform |
|-----------------|-------------------|
| Maintenance data disconnected from training | Safety signals drive qualification updates |
| Manual airworthiness documentation | Automated configuration control |
| Disparate training systems | Unified competency management |
| Reactive maintenance schedules | Predictive readiness posture |

**DTOP Examples:**
- **Detect**: Maintenance event, safety incident, configuration change
- **Trigger**: Automatic procedure update, qualification requirement
- **Orchestrate**: Technical order updates, targeted technician training
- **Prove**: Airworthiness authority compliance documentation

**Performance Metrics:**
- Safety: "Mission-critical incident reduction"
- Content: "Configuration control accuracy"
- Training: "Warfighter readiness assurance"

**Customer Logos:** UK MoD, Royal Air Force, Australian Defence

---

### Rail Page (`/solutions/rail`)

**Hero:**
- Headline: "Operational Performance for Rail"
- Subhead: "A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes."

**Industry Positioning:**
- Network reliability focus
- Passenger safety emphasis
- Regulatory compliance (ORR, ERA)

**Industry Challenge:**
| Point Solutions | Connected Platform |
|-----------------|-------------------|
| Signal failures logged separately from procedures | Safety events trigger procedure reviews |
| Manual driver competency tracking | Automated route competency management |
| Disparate safety and training systems | Unified operational governance |
| Reactive audit preparation | Continuous compliance evidence |

**DTOP Examples:**
- **Detect**: SPAD incident, maintenance event, near-miss report
- **Trigger**: Automatic rule book update, driver briefing
- **Orchestrate**: Procedure distribution, targeted driver training
- **Prove**: ORR/ERA audit-ready documentation

**Performance Metrics:**
- Safety: "SPAD incident reduction"
- Content: "Rule book change cycle time"
- Training: "Driver competency readiness"

---

## Files to Create

| File | Description |
|------|-------------|
| `src/pages/solutions/AirlinesPage.tsx` | Airlines industry solution page |
| `src/pages/solutions/DefensePage.tsx` | Defense industry solution page |
| `src/pages/solutions/RailPage.tsx` | Rail industry solution page |
| `src/components/solutions/IndustryHero.tsx` | Reusable hero component |
| `src/components/solutions/IndustryChallenge.tsx` | Before/After comparison |
| `src/components/solutions/IndustryDTOP.tsx` | DTOP flow with industry examples |
| `src/components/solutions/IndustryPillars.tsx` | Three performance pillars |
| `src/components/solutions/IndustryCapabilities.tsx` | Platform capabilities section |
| `src/components/solutions/IndustryCTA.tsx` | Call-to-action section |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/HomepageMockup.tsx` | Update badge text (line 227) |
| `src/App.tsx` | Add routes for `/solutions/airlines`, `/solutions/defense`, `/solutions/rail` |

---

## Technical Details

### Routing Updates (App.tsx)

```tsx
import AirlinesPage from "./pages/solutions/AirlinesPage";
import DefensePage from "./pages/solutions/DefensePage";
import RailPage from "./pages/solutions/RailPage";

// Add routes:
<Route path="/solutions/airlines" element={<AirlinesPage />} />
<Route path="/solutions/defense" element={<DefensePage />} />
<Route path="/solutions/rail" element={<RailPage />} />
```

### Shared Components Architecture

Each industry page will import shared components and pass industry-specific content as props:

```tsx
<IndustryHero
  industry="Airlines"
  headline="Operational Performance for Airlines"
  subhead="A connected, intelligent, and predictive platform..."
  ctaPrimary="See the Platform"
  ctaSecondary="Calculate Your Impact"
/>

<IndustryDTOP
  examples={[
    { step: "Detect", example: "FOQA exceedance captured" },
    { step: "Trigger", example: "Procedure review initiated" },
    ...
  ]}
/>
```

### Design Consistency

- Uses existing Tailwind classes from HomepageMockup
- Reuses UI components (Button, Card, Badge)
- Maintains dark theme with gradient accents
- Follows existing animation patterns

---

## Implementation Order

1. Update homepage badge text (quick fix)
2. Create shared solution page components
3. Create Airlines page (use as template)
4. Create Defense page (adapt from Airlines)
5. Create Rail page (adapt from Airlines)
6. Add routes to App.tsx

---

## Result

After implementation:
- Homepage speaks to all regulated industries, not just aviation
- Three industry-specific pages demonstrate deep domain understanding
- Consistent "Operational Performance Platform" messaging across all pages
- DTOP operating model applied with industry-specific examples
- Each page tells a coherent story: Problem → Operating Model → Capabilities → Proof → CTA

