

# Plan: Messaging Application Slides — Contextualizing "Operational Performance"

## Summary

Create two new slides that demonstrate how the "Operational Performance Platform" messaging applies in practice, addressing the concern that "operational performance" could be confused with airline OPS metrics (OTP, fuel burn, turnaround times). The slides will:

1. **Slide A: "Messaging in Context"** — Show how the platform terminology maps to Safety, Training, and Content domains with clear contextual language examples
2. **Slide B: "Platform Experience Mockup"** — A visual homepage/dashboard mockup that shows how the messaging appears in the actual product experience

---

## The Core Concern

In airlines, "Operational Performance" commonly refers to:
- On-Time Performance (OTP)
- Fuel efficiency
- Turnaround times
- Delay minutes
- Load factors

The concern is that using "Operational Performance Platform" without context could create confusion with existing OCC/NOC dashboards or Ops Control tools.

**Our solution:** Show that when applied to Safety, Training, and Content domains, the term "Operational Performance" takes on specific, unambiguous meaning — and the platform UI reinforces this through clear domain framing.

---

## Slide A: "Messaging in Context"

**Title:** Operational Performance — In Context  
**Subtitle:** How the category applies across Safety, Training, and Content

### Layout
A three-column layout showing how "Operational Performance" contextualizes differently for each domain:

| Domain | What "Performance" Means | Key Metric Examples |
|--------|-------------------------|---------------------|
| **Safety Performance** | Fewer incidents, reduced recurrence, faster investigation closure | Investigation closure time, repeat findings, ASAP submission rate |
| **Content Performance** | Faster procedural change cycles, reduced drift, compliance alignment | Time-to-change, revision currency, controlled distribution |
| **Training Performance** | Higher readiness, targeted qualification, faster time-to-competency | Qualification currency, assessment pass rates, training activation speed |

### Visual Element
A horizontal timeline showing the "Detect → Trigger → Orchestrate → Prove" flow with domain-specific examples at each stage:
- **Detect:** FOQA exceedance detected in Safety domain
- **Trigger:** Procedure update triggered in Content domain
- **Orchestrate:** Targeted training activated in Training domain
- **Prove:** Audit evidence generated across all three

### Key Callout Box
> "Operational Performance is not OTP or dispatch reliability. It's the coordinated execution of Safety, Content, and Training — the internal processes that protect and enable OTP."

---

## Slide B: "Platform Experience" (Homepage Mockup)

**Title:** The Platform Experience  
**Subtitle:** How messaging appears in the product

### Layout
A mock dashboard/homepage wireframe showing:

**Left Sidebar Navigation:**
- Safety Performance
- Content Performance  
- Training Performance
- Governance & Proof
- AI Insights

**Main Content Area:**
A simplified dashboard with three domain cards:

1. **Safety Performance Card**
   - "47 open investigations"
   - "Recurrence rate: 4.2% ↓"
   - "Avg. closure time: 12 days"

2. **Content Performance Card**
   - "23 procedures pending update"
   - "Time-to-change: 8 days avg"
   - "Currency rate: 96.4%"

3. **Training Performance Card**
   - "Workforce readiness: 94%"
   - "Overdue qualifications: 127"
   - "Training activations this month: 342"

**Bottom Banner:**
The "Detect → Trigger → Orchestrate → Prove" flow as a visual progress indicator

**Right Sidebar:**
"Recent Actions" or "AI Recommendations" panel:
- "⚡ New FOQA trend detected — 3 procedures flagged for review"
- "📋 Procedure SOP-2847 updated — 847 crew require re-acknowledgment"
- "🎓 Targeted training activated for 23 crew based on performance data"

### Design Notes
- Use the existing Comply365 color scheme (primary blue, accent teal)
- Show the logo in the top-left
- Style as a "product screenshot" wireframe, not a full UI implementation
- Include subtle browser chrome to make it feel like a real product view

---

## Files to Create

### 1. `src/components/slides/SlideMessagingContext.tsx`
New slide component showing messaging application across domains

### 2. `src/components/slides/SlidePlatformExperience.tsx`
New slide component with the homepage mockup visualization

### 3. Update `src/pages/SlideDeck.tsx`
- Add imports for both new slides
- Add entries to the `slides` array (as Slides 14 and 15)
- Add components to the render section

### 4. Update `src/data/slideNarration.ts`
- Add narration scripts for both new slides

---

## Technical Details

| File | Action | Description |
|------|--------|-------------|
| `SlideMessagingContext.tsx` | Create | Three-column domain breakdown + DTOP flow with examples |
| `SlidePlatformExperience.tsx` | Create | Dashboard mockup with sidebar, domain cards, and AI panel |
| `SlideDeck.tsx` | Update | Add imports, slides array entries (14-15), and render components |
| `slideNarration.ts` | Update | Add narration scripts for slides 14 and 15 |
| `Slide0Title.tsx` | Update | Add new agenda items for the two new slides |

---

## Narration Scripts

### Slide 14 (Messaging in Context)
> "A common question we get: doesn't 'Operational Performance' already mean something in airlines — like on-time performance or dispatch reliability? The answer is yes — and that's precisely why we use it. But in the context of Safety, Content, and Training, performance takes on specific, measurable meaning. Safety Performance means fewer incidents, reduced recurrence, and faster investigation closure. Content Performance means faster procedural change cycles, reduced drift, and compliance alignment. Training Performance means higher workforce readiness, targeted qualification, and faster time-to-competency. The Detect, Trigger, Orchestrate, Prove flow connects all three. A safety signal detects an issue. A content update is triggered. Training is orchestrated to close the gap. And proof is generated automatically. This is what we mean by Operational Performance. Not OTP or dispatch reliability — but the internal execution of Safety, Content, and Training that protects and enables those outcomes."

### Slide 15 (Platform Experience)
> "Here's how this messaging appears in the actual platform experience. The navigation doesn't say 'Safety Management System' or 'Learning Management System.' It says Safety Performance, Content Performance, Training Performance. Each domain has its own performance dashboard — with metrics that matter to that function. Safety shows investigation status and recurrence rates. Content shows procedural change cycles and currency. Training shows workforce readiness and qualification status. The AI recommendations panel surfaces cross-domain insights: a new trend detected in safety data, a procedure flagged for review, targeted training activated based on performance signals. And at the bottom, the Detect, Trigger, Orchestrate, Prove flow visualizes the connected operating model. This isn't just positioning language. It's how the product works. The messaging and the experience are aligned."

---

## Result

After implementation:
- Two new slides (14-15) that directly address the "performance can mean other things" concern
- Clear domain-specific application of the "Operational Performance" terminology
- A tangible product mockup that makes the messaging concrete
- Narration scripts that explain the contextual application

