

# Plan: Fix Top Navigation for Solutions Pages

## Problem

The `HomepageMockup.tsx` navigation currently uses plain `<button>` elements that don't navigate anywhere. The "Solutions" dropdown should link to the actual solution pages (`/solutions/airlines`, `/solutions/defense`, `/solutions/rail`).

## Current State

**Lines 28-33 in HomepageMockup.tsx:**
```tsx
const navItems = [
  { label: "Platform", hasDropdown: true },
  { label: "Solutions", hasDropdown: true },
  { label: "Customers", hasDropdown: false },
  { label: "Resources", hasDropdown: true },
];
```

**Lines 191-199:**
```tsx
{navItems.map((item) => (
  <button
    key={item.label}
    className="..."
  >
    {item.label}
    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
  </button>
))}
```

These are just buttons with no navigation functionality.

## Solution

Replace the generic navigation with working links that include a dropdown for Solutions:

### 1. Update Navigation Structure (lines 28-33)

Replace the `navItems` array with a more detailed structure that includes links:

```tsx
const navItems = [
  { label: "Platform", href: "/homepage-mockup", hasDropdown: false },
  { 
    label: "Solutions", 
    hasDropdown: true,
    dropdownItems: [
      { label: "Airlines", href: "/solutions/airlines" },
      { label: "Defense", href: "/solutions/defense" },
      { label: "Rail", href: "/solutions/rail" },
    ]
  },
  { label: "Customers", href: "/homepage-mockup", hasDropdown: false },
  { label: "Resources", href: "/homepage-mockup", hasDropdown: false },
];
```

### 2. Create Dropdown Component for Solutions (new component within file)

Add a dropdown menu that appears on hover/click for the Solutions nav item.

### 3. Update Navigation Rendering (lines 190-200)

Replace the simple button rendering with logic that handles both regular links and dropdown menus:

```tsx
<nav className="hidden md:flex items-center gap-8">
  {navItems.map((item) => (
    item.hasDropdown ? (
      <div key={item.label} className="relative group">
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          {item.label}
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[160px]">
            {item.dropdownItems?.map((dropdownItem) => (
              <Link
                key={dropdownItem.href}
                to={dropdownItem.href}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {dropdownItem.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <Link
        key={item.label}
        to={item.href}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {item.label}
      </Link>
    )
  ))}
</nav>
```

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/HomepageMockup.tsx` | Update `navItems` structure and navigation rendering to include working dropdown links |

## Result

After implementation:
- Clicking "Airlines", "Defense", or "Rail" in the Solutions dropdown navigates to the respective pages
- Solutions dropdown appears on hover with smooth transitions
- Navigation is consistent between homepage and solution pages
- Logo links back to homepage mockup

