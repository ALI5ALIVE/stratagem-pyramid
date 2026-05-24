## Change

Remove the in-page "On this page" sticky sidebar from `src/pages/PositioningPlaybook.tsx` — it duplicates navigation now that the Market Development sidebar is always present on this route.

- Delete the `<aside>` block (lines ~88–102) containing the sticky `nav` with section links.
- Collapse the outer grid wrapper from `lg:grid lg:grid-cols-[240px_1fr] lg:gap-12` back to a single column (`mx-auto max-w-[1400px] px-6 py-12`), so the main content uses the full width.
- Leave the top header bar (Command Centre back link + version chip) untouched.

No other pages or data changes.
