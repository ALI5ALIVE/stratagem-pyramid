# Link the new /platform-mockup page from the Comply365 mockup home

Update the platform links on `/comply365-mockup` so they navigate to the new `/platform-mockup` page instead of the existing `/platform` / `/platform-playbook` routes.

## Changes

1. **`src/pages/Comply365MockupHome.tsx`**
   - Hero "See the platform" link (line 65): change `to="/platform"` → `to="/platform-mockup"`.
   - "Explore the platform" button (line 139): wrap in `<Link to="/platform-mockup">` so it actually navigates.

2. **`src/components/home/TopNav.tsx`**
   - Top nav `Platform` item (line 5): change `href: "/platform-playbook"` → `href: "/platform-mockup"`.
   - Note: `TopNav` is shared — confirm with the user before changing, or scope the change to only the mockup page by inlining a custom nav. Default plan: update the shared TopNav since it's already mockup-flavoured (logo links to `/operational-platform`).

## Out of scope
- No changes to `/platform-mockup` itself.
- No styling changes.
