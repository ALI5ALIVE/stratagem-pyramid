

# Plan: Extend Homepage Mockup to Full Website Experience

## Summary

Expand the current homepage mockup in Slide 15 to be a more complete, full-fidelity website homepage that showcases the entire messaging framework in a realistic marketing context. The current mockup is compact (360px height) — we'll maximize the available viewport space to create a more immersive website experience.

---

## Current State

The existing mockup includes:
- Browser chrome (URL bar, window controls)
- Header navigation
- Hero section with headline and CTAs
- Three performance pillars (Safety, Content, Training)
- Case study banner
- Footer tagline

**Limitation:** The mockup is constrained to 360px height, making it feel abbreviated rather than like a real homepage.

---

## Expanded Homepage Layout

### Structural Changes
- Increase browser mockup height from 360px to ~480-520px (maximizing slide viewport)
- Remove the separate "Key insight" text below the mockup — incorporate messaging into the homepage itself
- Add additional homepage sections that real websites have

### New Sections to Add

| Section | Content | Purpose |
|---------|---------|---------|
| **Trust Bar** | "Trusted by 50+ airlines worldwide" with placeholder airline logos | Social proof, credibility |
| **Platform Overview** | "One Platform. Three Performance Domains." with DTOP flow mini-visual | Reinforce operating model |
| **Customer Logos** | Grid of 6-8 placeholder customer logo boxes | Industry validation |
| **Footer** | Full footer with Solutions, Resources, Company columns + tagline | Complete website feel |

### Enhanced Existing Sections

| Section | Enhancement |
|---------|-------------|
| **Hero** | Add a subtle hero visual/graphic on the right side (platform diagram placeholder) |
| **Three Pillars** | Add "Learn more →" links to make them feel interactive |
| **Case Study** | Make it more prominent with a customer quote snippet |

---

## Visual Layout (Top to Bottom)

```
┌─────────────────────────────────────────────────────────────┐
│  ●  ●  ●                    comply365.com                   │  <- Browser chrome
├─────────────────────────────────────────────────────────────┤
│  [Logo]        Platform | Solutions | Customers | [Demo]    │  <- Nav
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     The Operational Performance Platform          [Visual]  │  <- Hero
│     Connect Safety, Content, and Training...                │
│     [See Platform]  [Calculate Impact]                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Trusted by 50+ airlines  │ [logo] [logo] [logo] [logo]     │  <- Trust bar
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │   Safety    │ │   Content   │ │  Training   │            │  <- 3 Pillars
│  │ Performance │ │ Performance │ │ Performance │            │
│  │  50% faster │ │ 60% faster  │ │ 94% ready   │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │  "Comply365 transformed how we manage...           │    │  <- Case Study
│  │  +3.2% OTP  │  2hr Audit  │  Zero Repeat Findings  │    │
│  │                                      [Read Story →]│    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Detect → Trigger → Orchestrate → Prove              │   │  <- DTOP flow
│  │  "Turn operational signals into governed actions"    │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Solutions     Resources     Company         [Request Demo] │  <- Footer
│  · Safety      · Blog        · About                        │
│  · Content     · Case Studies· Careers                      │
│  · Training    · Webinars    · Contact                      │
│─────────────────────────────────────────────────────────────│
│  Point solutions manage silos. Comply365 closes the loop.   │  <- Tagline
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### File to Modify
`src/components/slides/SlidePlatformExperience.tsx`

### Key Changes

1. **Increase mockup height**: Change from `h-[360px]` to `h-[500px]` or use flex to fill available space

2. **Add Trust Bar section** (after hero):
   ```tsx
   <div className="px-4 py-2 border-y border-border/30 bg-muted/20 flex items-center justify-center gap-6">
     <span className="text-[9px] text-muted-foreground">Trusted by 50+ airlines worldwide</span>
     {/* Placeholder logo boxes */}
   </div>
   ```

3. **Add DTOP Flow section** (after pillars or case study):
   ```tsx
   <div className="px-4 py-2">
     <div className="flex items-center justify-center gap-2 text-[9px]">
       <span className="px-2 py-1 bg-primary/10 rounded">Detect</span>
       <ArrowRight className="w-3 h-3 text-muted-foreground" />
       <span className="px-2 py-1 bg-primary/10 rounded">Trigger</span>
       ...
     </div>
   </div>
   ```

4. **Add Footer with columns**:
   ```tsx
   <div className="px-4 py-2 bg-muted/50 border-t border-border/30">
     <div className="grid grid-cols-4 gap-4 text-[8px]">
       <div>Solutions: Safety, Content, Training</div>
       <div>Resources: Blog, Case Studies</div>
       ...
     </div>
   </div>
   ```

5. **Enhance Case Study** with customer quote:
   ```tsx
   <p className="text-[9px] italic text-muted-foreground">
     "Comply365 transformed how we manage operational change..."
   </p>
   ```

6. **Remove external insight text**: The messaging is now embedded in the homepage itself

---

## Data Structures to Add

```tsx
const trustLogos = ["Airline 1", "Airline 2", "Airline 3", "Airline 4", "Airline 5"];

const footerColumns = [
  { title: "Solutions", links: ["Safety Manager", "Content Manager", "Training Manager"] },
  { title: "Resources", links: ["Blog", "Case Studies", "Webinars"] },
  { title: "Company", links: ["About", "Careers", "Contact"] },
];
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/slides/SlidePlatformExperience.tsx` | Expand mockup with trust bar, DTOP flow, footer columns, and enhanced case study |

---

## Result

After implementation:
- The homepage mockup will feel like a complete, realistic website
- All key messaging elements are demonstrated in context:
  - Category name in hero
  - Three performance domains
  - DTOP operating model
  - Customer proof (case study + logos)
  - Differentiation tagline in footer
- The slide becomes a powerful visualization of messaging application across a real marketing asset

