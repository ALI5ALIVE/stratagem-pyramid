

# Platform Integration Case Studies Slide

## What We're Building

A new slide component (`TechSlide6PlatformIntegrations.tsx`) showcasing the two live platform integration case studies, using the existing DTOP vertical timeline pattern. Each case study gets a detailed card with pain points, integration flow, before/after comparison, and value unlocked.

## Content (extracted from the uploaded PDFs)

### Case Study 1: Regulation Database Integration with ContentManager365
- **Pain**: Regulatory text copied manually from PDFs; inconsistencies across manuals; weeks of audit prep; growing fleets requiring consistent compliance
- **Flow**: Regulator publishes change → SafetyManager365 stores and triggers change request → ContentManager365 links to updated SOP → TrainingManager365 connects training to latest SOP
- **Before**: Evidence assembled manually, static traceability matrices, weeks of preparation
- **After**: Live traceability between regulations and manual references, visible coverage gaps, consistent evidence generation
- **Value**: Faster authoring cycles, reduced rework, fewer audit findings, AI-assisted compliance mapping
- **Status**: In Production (Phase 1: Q1-Q2 2026)

### Case Study 2: TrainingManager365 to ContentManager365 Integration
- **Pain**: No traceability between training records and operational procedures; disconnected systems; manual uploads; training drift when procedures change
- **Flow**: Training developer links document from ContentManager365 → Trainees/trainers access latest version automatically → When document updates, linked content stays current → Procedure changes surface linked training modules
- **Before**: Manual document management, training impact assessed manually, no proof of readiness
- **After**: Smart links to latest revisions, targeted retraining by crew segment, audit readiness with direct evidence
- **Value**: Reduced compliance risk, faster change implementation, closed-loop learning, enhanced investigation quality
- **Status**: In Production

## Technical Approach

### New file: `src/components/tech-slides/TechSlide6PlatformIntegrations.tsx`
- Uses `SalesSlideContainer` wrapper (consistent with existing use case slides)
- Two-column layout, one card per integration case study
- Each card uses the DTOP vertical timeline pattern (blue/amber/cyan/emerald border-left steps) already established in `TechSlide10SafetyUseCases.tsx`
- Cards are expandable on click (matching existing pattern) to reveal pain points, before/after, and phased value realization
- Top: status badges ("In Production" / "Live") per case
- Bottom: callout reinforcing "These are live platform integrations — not roadmap items"

### Modified file: `src/pages/TechnicalDeepDive.tsx`
- Import `TechSlide6PlatformIntegrations`
- Insert into the `slides` array after the DTOP slide (after `tech-slide-5`) with id `tech-slide-6` and label `"Platform Integrations"`

**2 files: 1 new, 1 modified.**

