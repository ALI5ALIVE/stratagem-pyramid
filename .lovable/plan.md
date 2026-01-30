

# Plan: Full-Page Website Homepage Mockup

## Summary

Transform Slide 15 into a **dedicated full-page website mockup** that breaks out of the slide deck format entirely. Instead of a constrained mockup within a slide container, this will be a complete, scrollable website homepage with rich copy, multiple sections, and realistic marketing content — demonstrating exactly how the Comply365 positioning and messaging would appear on a real website.

---

## The Approach

Two options for implementation:

### Option A: Separate Page Route (Recommended)
Create a new page at `/homepage-mockup` that's a complete, full-length scrollable webpage. The slide would contain a thumbnail/link that opens this full experience.

### Option B: Special Slide Format
Transform Slide 15 to break out of the `SlideContainer` constraints entirely, making it a scrollable, full-height page within the deck.

**Recommendation:** Option A gives the best experience — the user can view the full website mockup in its natural form, then return to the deck.

---

## Full Homepage Structure

The mockup will be a complete website homepage with rich, realistic marketing content:

```text
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER                                   │
│  Logo    Platform ▾  Solutions ▾  Customers  Resources  [Demo]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                         HERO SECTION                             │
│                                                                  │
│        The Operational Performance Platform                      │
│                                                                  │
│   Connect Safety, Content, and Training into one governed       │
│   system. Turn operational signals into measurable performance.  │
│                                                                  │
│   [See the Platform]  [Calculate Your Impact]                   │
│                                                                  │
│              [Hero Visual: Platform Diagram]                     │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                      TRUST BAR                                   │
│   Trusted by 50+ airlines worldwide                              │
│   [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│            THE PROBLEM: FRAGMENTED OPERATIONS                    │
│                                                                  │
│   Rich paragraph explaining the challenge airlines face:         │
│   - Safety systems disconnected from training                    │
│   - Procedures updated but crew not notified                     │
│   - Auditors asking for proof you can't provide                  │
│                                                                  │
│   [Visual: Three silos illustration]                             │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│              THREE PERFORMANCE DOMAINS                           │
│                                                                  │
│   ┌────────────────┐ ┌────────────────┐ ┌────────────────┐      │
│   │    SAFETY      │ │    CONTENT     │ │   TRAINING     │      │
│   │  PERFORMANCE   │ │  PERFORMANCE   │ │  PERFORMANCE   │      │
│   │                │ │                │ │                │      │
│   │  Detect safety │ │  Manage proce- │ │  Ensure work-  │      │
│   │  signals,      │ │  dure changes, │ │  force readi-  │      │
│   │  close faster, │ │  eliminate     │ │  ness, target  │      │
│   │  reduce recur- │ │  drift, prove  │ │  training,     │      │
│   │  rence.        │ │  compliance.   │ │  verify comp-  │      │
│   │                │ │                │ │  etency.       │      │
│   │  50% faster    │ │  60% faster    │ │  94% workforce │      │
│   │  investigation │ │  change cycle  │ │  readiness     │      │
│   │  closure       │ │                │ │                │      │
│   │                │ │                │ │                │      │
│   │  [Learn more]  │ │  [Learn more]  │ │  [Learn more]  │      │
│   └────────────────┘ └────────────────┘ └────────────────┘      │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│           HOW IT WORKS: THE DTOP OPERATING MODEL                 │
│                                                                  │
│   DETECT → TRIGGER → ORCHESTRATE → PROVE                        │
│                                                                  │
│   Rich explanation of the connected flow with examples:          │
│                                                                  │
│   1. DETECT: A FOQA exceedance or audit finding is identified   │
│   2. TRIGGER: Automatically triggers procedure review           │
│   3. ORCHESTRATE: Targeted training activated for affected crew │
│   4. PROVE: Audit evidence generated automatically              │
│                                                                  │
│   "This is what separates a platform from point solutions."     │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                 CUSTOMER SUCCESS STORIES                         │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  "Comply365 transformed how we manage operational       │   │
│   │   change across our entire fleet. We went from          │   │
│   │   12-day investigation cycles to 6 days."               │   │
│   │                                                          │   │
│   │   — VP Safety, Major North American Airline              │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│   │  +3.2%   │  │   2hrs   │  │   Zero   │                      │
│   │   OTP    │  │  Audit   │  │  Repeat  │                      │
│   │  Improv- │  │   Prep   │  │ Findings │                      │
│   │  ement   │  │   Time   │  │          │                      │
│   └──────────┘  └──────────┘  └──────────┘                      │
│                                                                  │
│   [Read the Full Case Study →]                                  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                 THE PLATFORM ADVANTAGE                           │
│                                                                  │
│   Point solutions manage silos.                                  │
│   Platforms manage outcomes.                                     │
│                                                                  │
│   Detailed paragraph explaining why connected systems            │
│   outperform fragmented point solutions...                       │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Point Solutions          │        Comply365            │   │
│   │  ─────────────────────────┼───────────────────────────  │   │
│   │  Silos                    │  Connected system           │   │
│   │  Manual handoffs          │  Automated triggers         │   │
│   │  Audit scrambles          │  Continuous proof           │   │
│   │  Reactive training        │  Targeted activation        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                    CTA SECTION                                   │
│                                                                  │
│   Ready to see what connected operational performance            │
│   looks like for your airline?                                   │
│                                                                  │
│   [Request a Demo]    [Calculate Your ROI]                      │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                   │
│                                                                  │
│   Logo                                                           │
│                                                                  │
│   Solutions        Resources        Company                      │
│   Safety Manager   Blog             About Us                     │
│   Content Manager  Case Studies     Careers                      │
│   Training Manager Webinars         Contact                      │
│   Governance       Documentation    Partners                     │
│                                                                  │
│   ─────────────────────────────────────────────────────────     │
│                                                                  │
│   Point solutions manage silos. Comply365 closes the loop.       │
│                                                                  │
│   © 2025 Comply365. All rights reserved.                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Rich Copy Sections

### Hero Copy
**Headline:** The Operational Performance Platform

**Subhead:** Connect Safety, Content, and Training into one governed system. Turn operational signals into measurable performance.

**Supporting text:** Airlines don't fail because of one broken process. They fail because broken processes compound — a safety signal that doesn't trigger a procedure update, a procedure change that doesn't reach the crew, training that doesn't prove readiness. Comply365 closes these gaps with a single connected platform.

---

### Problem Section Copy
**Headline:** The Fragmentation Problem

**Body:** 
Today's aviation operations run on disconnected systems. Your Safety Management System doesn't talk to your Learning Management System. Your document management doesn't know what your training records show. When an auditor asks for proof that a procedure change reached every affected crew member, you scramble.

The result? Slower investigations. Longer change cycles. Audit findings that keep recurring. And a workforce that's never quite sure they have the latest information.

---

### Three Pillars Rich Content

**Safety Performance:**
When a safety event occurs, every minute matters. Comply365 detects signals from multiple sources — FOQA, ASAP, audit findings — and connects them to action. Investigations close 50% faster because the right people see the right data immediately. Recurrence drops because root causes connect to training gaps and procedural fixes automatically.

**Content Performance:**
Procedures change constantly. New regulations. Audit findings. Safety learnings. The challenge isn't making the change — it's ensuring it reaches everyone who needs it, when they need it. Comply365 cuts change cycles by 60% and creates an unbroken chain of evidence from revision to acknowledgment.

**Training Performance:**
Training isn't about seat time. It's about readiness. Comply365 connects training to performance — activating targeted learning when safety data or content changes demand it, not on arbitrary schedules. The result: 94% workforce readiness, reduced training waste, and proof that your people are qualified for what they're doing.

---

### DTOP Section Copy
**Headline:** How It Works: Detect → Trigger → Orchestrate → Prove

**Body:**
Most platforms stop at visibility. Comply365 goes further. When a signal is detected — a FOQA exceedance, an audit finding, a safety report — the platform doesn't just log it. It triggers connected actions: procedure reviews, targeted training, governance workflows. And at every step, proof is generated automatically.

This is what separates a platform from a collection of point solutions. Not just seeing problems — closing the loop on them.

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/HomepageMockup.tsx` | Create | Full-page website mockup with all sections and rich content |
| `src/App.tsx` | Update | Add route for `/homepage-mockup` |
| `src/components/slides/SlidePlatformExperience.tsx` | Update | Replace current content with a thumbnail + link to open the full mockup |

---

## Technical Implementation Details

### New Page: HomepageMockup.tsx
- Full scrollable page (not constrained to viewport)
- Uses Tailwind for styling consistent with brand
- Includes navigation back to slide deck
- Real website feel with hover states, proper typography, and spacing
- Responsive design for different screen sizes

### Updated Slide 15
- Shows a thumbnail preview of the homepage
- "View Full Homepage Mockup" button that navigates to `/homepage-mockup`
- Brief explanation: "Click to view the complete website experience"

### Styling
- Use existing design tokens (primary blue, accent colors)
- Proper section spacing (py-16, py-24 for sections)
- Rich typography with proper hierarchy
- Realistic button and link styling

---

## Result

After implementation:
- A complete, professional-looking website homepage mockup
- Rich marketing copy demonstrating how messaging applies
- All key sections: Hero, Problem, Solutions, How It Works, Case Study, Comparison, CTA, Footer
- The positioning ("Operational Performance Platform") woven throughout
- Domain-specific language (Safety/Content/Training Performance) in context
- The differentiation tagline prominently featured
- Accessible from Slide 15 via a button/link

