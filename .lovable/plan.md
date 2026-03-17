

# Add Intelligence Layer Card Above Product Module Cards

## Change
Add a prominent "Intelligence Layer" card above the three product module cards in both `ExecSlide3Platform.tsx` and `OpsSlide4Platform.tsx`. This card represents CoAnalyst as the intelligence layer that unlocks data intelligence across all three applications. The existing bottom CoAnalyst bar will be removed since this new card replaces it.

## Files to Edit

### 1. `src/components/exec-slides/ExecSlide3Platform.tsx`
- Add a new card at the top of the right column (above Safety/Content/Training cards) styled with `bg-primary/10 border-primary/30` and the Brain icon
- Title: **"CoAnalyst — Intelligence Layer"**
- Copy: "The key to unlocking operational intelligence. CoAnalyst connects safety, content, and training data — transforming siloed reports into actionable insights through CoAuthor, CoAnalyst, and CoTrainer."
- Remove the bottom CoAnalyst bar (lines 78-89) since the intelligence layer is now prominently featured in the card stack
- Reduce card gap/padding slightly to fit 4 cards

### 2. `src/components/ops-slides/OpsSlide4Platform.tsx`
- Same new intelligence card at top of right column with operational copy:
  - Title: **"CoAnalyst — Intelligence Layer"**
  - Copy: "The key that unlocks data intelligence across your operation. CoAnalyst activates the data held within Safety, Content, and Training Manager — surfacing patterns, predicting risks, and driving closed-loop corrective action through CoAuthor, CoAnalyst, and CoTrainer."
- Remove the bottom CoAnalyst bar (lines 98-109)
- Reduce card gap to `gap-2` and padding to `p-3` to fit 4 cards comfortably

## Visual Result
```text
Right Column:
┌─ CoAnalyst Intelligence Layer ─────────────┐
│  🧠 The key to unlocking data intelligence │
│  CoAuthor · CoAnalyst · CoTrainer          │
└────────────────────────────────────────────┘
┌─ Safety Manager 365 ──────────────────────┐
│  SMS · FOQA · Audits                      │
└────────────────────────────────────────────┘
┌─ Content Manager 365 ─────────────────────┐
│  Procedures · Manuals · Distribution      │
└────────────────────────────────────────────┘
┌─ Training Manager 365 ────────────────────┐
│  Competency · Courses · Evidence          │
└────────────────────────────────────────────┘
```

