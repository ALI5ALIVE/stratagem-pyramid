

# Replace Ops Intelligence Slide with Exec "Intelligence Layer"

## Change

Replace the content of `src/components/ops-slides/OpsSlide5Intelligence.tsx` with the simplified Executive deck layout: hero stat (90% vs 35%), centered precision gap bar chart, and R&D credibility line. Keep the ops-specific slide ID (`ops-slide-5`) and component name.

### What changes in the file:
- **Remove**: The two-column layout (precision bars + 4 use-case-linked cards), the `useCaseLinks` array, and Lucide icon imports (`Plane`, `Wind`, `FileWarning`, `Clock`)
- **Add**: `Brain` icon import, centered hero stat block (90% vs 35%), descriptive sentence, full 4-level precision gap bar chart from the exec version, and the R&D investment tagline
- **Update**: Title to "The Intelligence Layer", subtitle to "Aviation-specific AI that generic tools can't replicate."
- **Keep**: Same component export name, same `ops-slide-5` ID, same props interface pattern

No changes needed to `OperationalPitch.tsx` — it already imports `OpsSlide5Intelligence` at the correct position.

**1 file changed:** `src/components/ops-slides/OpsSlide5Intelligence.tsx`

