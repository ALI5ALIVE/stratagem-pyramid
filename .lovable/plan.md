## Hide Competitive Cheat Sheet & Objections from Week 3

Remove the two slide entries from the Sales Enablement deck registry so they no longer appear in navigation, narration sequence, or PDF/PPTX exports.

**File:** `src/pages/SalesEnablement.tsx`

Delete these two lines from the `slides` array (lines 167–168):
- `{ id: "se-slide-objections", label: "W3 · Objections", component: SEObjections }`
- `{ id: "se-competitive-cheatsheet", label: "W3 · Competitive Cheat Sheet", component: SECompetitiveCheatSheet }`

Also remove the now-unused imports for `SEObjections` and `SECompetitiveCheatSheet` at the top of the file.

The underlying components, narration entries, and use-case-cheatsheet slide remain untouched in case you want to re-enable them later.