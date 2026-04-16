

# Add DTOP 1-Pager Download Button to Playbook

## Summary

Add a download button to the DTOP playbook title slide that fetches and downloads the previously generated PDF 1-pager. The PDF was generated to `/mnt/documents/` which isn't accessible from the app at runtime, so we need to embed the PDF as a static asset in the project.

## Approach

1. **Copy the generated PDF into `public/`** so it's served as a static asset at `/Comply365-DTOP-Operating-Model-1-Pager.pdf`
2. **Add a download button to `DTOPSlide0Title.tsx`** below the DTOP step pills, using the existing `Button` component with a `Download` icon — styled to match the dark theme

## Changes

### 1. Copy PDF to `public/Comply365-DTOP-Operating-Model-1-Pager.pdf`
Place the generated PDF in the public directory so it's accessible via URL.

### 2. `src/components/dtop-slides/DTOPSlide0Title.tsx`
- Import `Download` from lucide-react and `Button` from ui
- Add a download button below the DTOP steps row
- Uses an `<a>` tag with `download` attribute wrapping the button

**1 file copied, 1 file modified.**

