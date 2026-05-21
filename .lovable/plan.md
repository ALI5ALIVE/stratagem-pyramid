## Fix

Hide the W3 Use Case Cheat Sheet slide from the Sales Enablement deck without deleting the component or data.

**Edits in `src/pages/SalesEnablement.tsx`:**

1. Remove line 168 (`{ id: "se-usecase-cheatsheet", label: "W3 · Use Case Cheat Sheet", component: SEUseCaseCheatSheet },`) from the `slides` array so it no longer renders or appears in the nav.
2. Remove the now-unused `SEUseCaseCheatSheet` import (line 14) to keep the build clean.
3. Remove `"Use case cheat sheet"` from the W3 `upNext` list (line 96) so the agenda matches.

**Not changed:** the `SEUseCaseCheatSheet.tsx` component, `useCaseCheatSheetRows` data, the `SEW3Capstone` reference to the artifact, or the field-kit memory note (it stays as historic structure; the slide is hidden, not deleted, so it can be reinstated by re-adding the array entry).
