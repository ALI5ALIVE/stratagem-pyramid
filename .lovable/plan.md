## Plan: Remove slide sub-navigation from sidebar

**Change**
Remove the "Slides" group at the bottom of `AppSidebar.tsx` that lists individual slide titles for the active deck. The deck pages already provide in-page navigation (scroll, arrow keys, narration bar, progress indicator), so this sub-list is redundant.

**Files**
- `src/components/AppSidebar.tsx` — delete the `{open && slides.length > 0 && (...)}` block and the now-unused `useSlideNavigation` import/hook call.

**Kept as-is**
- `SlideNavigationContext` itself (other code still calls `register`/`unregister`; harmless to leave).
- All top-level groups: Home, Target Audience, Pitch Decks, Sales Enablement, Capabilities, Additional Resources, account row.

**Optional follow-up (ask before doing)**
While here, do you also want any of the top-level groups reordered, renamed, or trimmed? If yes, tell me which — otherwise I'll only remove the Slides sub-nav.