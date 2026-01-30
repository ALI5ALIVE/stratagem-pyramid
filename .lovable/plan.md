

# Plan: Transform Platform Experience to Homepage Mockup

## Summary

Transform Slide 15 from a product dashboard mockup to a **marketing homepage mockup** that showcases how the "Operational Performance Platform" positioning and messaging would appear on the Comply365 website. This better demonstrates messaging application in a customer-facing context.

---

## The Change

**Current:** Product dashboard mockup showing internal navigation (Safety Performance, Content Performance, Training Performance) with operational metrics

**New:** Marketing homepage mockup showing:
- Hero section with category positioning ("The Operational Performance Platform")
- Value proposition messaging
- Domain performance pillars (Safety, Content, Training)
- Customer case study snippets with measurable outcomes
- Call-to-action demonstrating messaging consistency

---

## Homepage Mockup Layout

### Browser Chrome
- Same browser window styling (red/yellow/green dots, URL bar)
- URL: `comply365.com` (not `app.comply365.com/dashboard`)

### Header Navigation
- Logo (left)
- Nav: Platform | Solutions | Customers | Resources | Request Demo (right)

### Hero Section
- Headline: "The Operational Performance Platform"
- Subhead: "Connect Safety, Content, and Training into one governed system. Turn operational signals into measurable performance."
- CTA buttons: "See the Platform" | "Calculate Your Impact"
- Hero graphic: Simplified DTOP flow visualization

### Three Pillars Section
- "Safety Performance" | "Content Performance" | "Training Performance"
- Each with icon, short value statement, and sample metric
- Uses the same terminology as the product UI (demonstrating alignment)

### Case Study Banner
- "How [Airline] improved on-time performance 3.2% in 12 months"
- Or a generic "Featured Case Study" with key metrics
- Shows how messaging translates to customer proof

### Footer CTA
- "Point solutions manage silos. Comply365 closes the loop."
- Reinforces positioning tagline

---

## Narration Update

Update the narration script to explain:
- This is how the messaging appears on the website
- The terminology is consistent across marketing, sales, and product
- Case studies reinforce the "performance" language with measurable outcomes
- The differentiation tagline ("Point solutions manage silos. Comply365 closes the loop.") appears throughout

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/slides/SlidePlatformExperience.tsx` | Complete rewrite to show marketing homepage mockup instead of product dashboard |
| `src/data/slideNarration.ts` | Update Slide 15 script to describe homepage messaging application |

---

## Technical Details

### `SlidePlatformExperience.tsx` Structure

```
Browser Chrome (comply365.com)
├── Header Nav
│   ├── Logo
│   └── Platform | Solutions | Customers | Resources | Request Demo
├── Hero Section
│   ├── "The Operational Performance Platform"
│   ├── Subhead with value proposition
│   └── CTAs: See the Platform | Calculate Your Impact
├── Three Pillars (Safety | Content | Training Performance)
│   ├── Icon + title for each
│   ├── Short value statement
│   └── Sample outcome metric
├── Case Study Banner
│   ├── Airline logo placeholder or "Featured Customer"
│   ├── "3.2% OTP improvement" or similar
│   └── "Read the full story →"
└── Footer CTA
    └── "Point solutions manage silos. Comply365 closes the loop."
```

### New Narration Script (Slide 15)

"Here's how the Operational Performance Platform messaging appears on the website — not just in the product. The hero leads with the category: 'The Operational Performance Platform.' The subhead explains the value: connecting Safety, Content, and Training into one governed system. Notice the three pillars: Safety Performance, Content Performance, Training Performance. This is the same language customers will see in the product navigation — terminology that's consistent from marketing to sales to daily use. The case study section shows how messaging translates to proof: real outcomes like on-time performance improvement and audit preparation time reduction. And the footer reinforces our differentiation: 'Point solutions manage silos. Comply365 closes the loop.' This isn't just a tagline. It's the category promise. The messaging is aligned across every touchpoint — website, sales deck, product experience. That consistency builds category ownership."

---

## Visual Comparison

| Element | Current (Dashboard) | New (Homepage) |
|---------|---------------------|----------------|
| URL | app.comply365.com/dashboard | comply365.com |
| Purpose | Show internal product UI | Show external marketing |
| Focus | Operational metrics | Positioning & value |
| Case studies | None | Featured customer |
| CTA | None | "See the Platform" |

---

## Result

After implementation:
- Slide 15 becomes a marketing homepage mockup that demonstrates messaging application
- Shows how "Operational Performance" terminology appears on the public website
- Includes case study proof that reinforces the performance language
- Demonstrates consistency between marketing and product messaging
- Updated narration explains the importance of messaging alignment across touchpoints

