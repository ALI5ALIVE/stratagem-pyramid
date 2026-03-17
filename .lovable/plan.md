

# Add Platform Visual Slide to Both Pitch Decks

## What's Missing
The decks currently show DTOP (the operating model) and CoAnalyst (the intelligence layer), but are missing the **application platform** itself — the three product modules (Safety Manager 365, Content Manager 365, Training Manager 365) with CoAnalyst as the intelligence ring. This is the "what you're actually buying" slide that bridges the operating model concept to the real product.

## Approach
Use the existing `comply365-platform-ecosystem.png` asset (the concentric circle diagram already in the project) as the hero visual, paired with three product module cards and a CoAnalyst callout. Add this as a new slide in both decks, positioned between DTOP and the Intelligence/Use Cases slides.

## Files to Create

### 1. `src/components/exec-slides/ExecSlide3Platform.tsx`
- Title: "The Platform"
- Two-column layout: Left = `comply365-platform-ecosystem.png` image (large, prominent), Right = three stacked product cards (Safety Manager 365, Content Manager 365, Training Manager 365) each with 2-3 bullet capabilities
- Bottom strip: CoAnalyst callout — "AI-Powered Intelligence Layer: CoAuthor | CoAnalyst | CoTrainer"
- Uses `SalesSlideContainer`

### 2. `src/components/ops-slides/OpsSlide4Platform.tsx`
- Same visual but with more operational detail per module
- Title: "The Application Platform"
- Two-column: Left = ecosystem image, Right = three product cards with operational focus (e.g., Safety Manager: "SMS, FOQA ingestion, investigation workflows"; Content Manager: "Procedure authoring, revision cascades, distribution"; Training Manager: "Competency tracking, targeted assignments, completion evidence")
- Bottom: CoAnalyst bar showing how it spans all three modules

## Files to Edit

### 3. `src/pages/ExecutivePitch.tsx`
- Insert new slide between current Slide 3 (DTOP) and Slide 4 (Intelligence)
- Renumber: current slides 4-6 become 5-7
- Update slides array (now 8 slides total)

### 4. `src/pages/OperationalPitch.tsx`
- Insert new slide between current Slide 4 (DTOP) and Slide 5 (Intelligence)
- Renumber: current slides 5-11 become 6-12
- Update slides array (now 13 slides total)

## Visual Layout (both slides)

```text
┌─────────────────────────────────────────────────┐
│  The Platform                                   │
│  "Three connected applications, one platform"   │
├──────────────────┬──────────────────────────────┤
│                  │  ┌─ Safety Manager 365 ────┐ │
│   [Platform      │  │  SMS · FOQA · Audits    │ │
│    Ecosystem     │  └─────────────────────────┘ │
│    Image]        │  ┌─ Content Manager 365 ───┐ │
│                  │  │  Procedures · Manuals    │ │
│   (large,        │  └─────────────────────────┘ │
│    centered)     │  ┌─ Training Manager 365 ──┐ │
│                  │  │  Competency · Courses    │ │
│                  │  └─────────────────────────┘ │
├──────────────────┴──────────────────────────────┤
│  AI Layer: CoAuthor · CoAnalyst · CoTrainer     │
└─────────────────────────────────────────────────┘
```

## Key Details
- Image import: `import platformEcosystem from "@/assets/comply365-platform-ecosystem.png"` (already exists in project)
- Exec version: concise, 2-3 bullets per module, emphasis on "connected" message
- Ops version: more detail per module with operational examples, ties back to DTOP data flow

