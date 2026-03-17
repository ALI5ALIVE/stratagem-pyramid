

# Add Individual Product Module Slides to Technical Deep-Dive

## What
Insert 3 new slides after the current Platform overview (Slide 4), one each for Safety Manager 365, Content Manager 365, and Training Manager 365. Each slide gets a full-screen deep-dive with detailed capabilities, data flows, and how CoAnalyst activates that module's data.

## New Files (3)

### `src/components/tech-slides/TechSlide4aSafetyManager.tsx`
- **Title:** "Safety Manager 365"
- **Subtitle:** "From reactive reporting to predictive safety intelligence"
- **Layout:** Two-column — left: key capabilities grid (SMS reporting, FOQA/FDM ingestion, audit management, hazard register, risk assessment, investigation workflows); right: "How CoAnalyst Activates Safety Data" card showing the data flow (safety events → pattern detection → risk prediction → corrective action)
- Red accent colour scheme (`text-red-400`, `bg-red-500/10`)
- Shield icon

### `src/components/tech-slides/TechSlide4bContentManager.tsx`
- **Title:** "Content Manager 365"
- **Subtitle:** "From manual revisions to intelligent document orchestration"
- **Layout:** Same two-column — left: capabilities (procedure authoring, revision cascades, regulatory change impact analysis, multi-format distribution, manual management, document control); right: "How CoAnalyst Activates Content Data" (procedure changes → cascade triggers → impact analysis → targeted training updates)
- Blue accent (`text-blue-400`, `bg-blue-500/10`)
- FileText icon

### `src/components/tech-slides/TechSlide4cTrainingManager.tsx`
- **Title:** "Training Manager 365"
- **Subtitle:** "From compliance checklists to competency-driven workforce readiness"
- **Layout:** Same pattern — left: capabilities (competency-based training, targeted assignments, completion evidence, qualification records, recurrent training automation, gap analysis); right: "How CoAnalyst Activates Training Data" (safety findings → targeted retraining → verified competency → closed-loop evidence)
- Emerald accent (`text-emerald-400`, `bg-emerald-500/10`)
- GraduationCap icon

All three use `SalesSlideContainer` with the standard props pattern.

## Files to Edit (1)

### `src/pages/TechnicalDeepDive.tsx`
- Import the 3 new components
- Insert them into the `slides` array after index 4 (The Platform), shifting all subsequent slide IDs:
  - `tech-slide-4a` → Safety Manager 365
  - `tech-slide-4b` → Content Manager 365
  - `tech-slide-4c` → Training Manager 365
- Total slides goes from 19 to 22

