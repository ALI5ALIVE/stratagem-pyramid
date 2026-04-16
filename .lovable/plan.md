

# Fix DTOP Download Button Causing Logout

## Problem
The `<a href="..." download>` tag navigates the browser away from the app, which disrupts the Lovable preview iframe session and logs you out.

## Fix
Replace the `<a>` tag with a programmatic download using `fetch()` + `URL.createObjectURL()` in `src/components/dtop-slides/DTOPSlide0Title.tsx`. This downloads the file in the background without navigating away from the page.

**1 file modified.**

