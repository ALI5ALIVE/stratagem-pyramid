

# DTOP Operating Model — Downloadable 1-Page PDF

## Summary

Generate a polished, branded single-page PDF (US Letter, landscape) summarizing the DTOP operating model for leave-behind use in sales meetings. Output to `/mnt/documents/`.

## Layout (Landscape, single page)

**Header strip**: Comply365 logo area, title "The DTOP Operating Model", tagline "The only closed-loop operating model in aviation"

**Left column (~40%)**:
- **The Problem**: Brief 3-line summary of industry fragmentation and the $4.1B cost exposure
- **Elevator Pitch**: 2-sentence positioning statement

**Center column (~35%)**:
- **The 4 Steps** (D / T / O / P): Each with letter, label, tagline, and 1-line description. Color-coded (blue, amber, green, violet)

**Right column (~25%)**:
- **Value Delivered**: 4 metric callouts (40-60% incident reduction, 70% less coordination, 90% faster audit prep, 100% traceability)
- **Why Only Comply365**: 2-line moat statement

**Footer strip**: "comply365.com" + "Confidential" + contact prompt

## Design

- Dark navy background (#0A0F1E) with white/light text matching app aesthetic
- DTOP step colors: blue (#3B82F6), amber (#F59E0B), emerald (#10B981), violet (#8B5CF6)
- Space Grotesk headings, Inter body (fallback to Helvetica for PDF compatibility)
- Clean card-like sections with subtle borders

## Technical Approach

- Python script using `reportlab` to generate the PDF
- Content pulled directly from the data already defined in the playbook
- Output: `/mnt/documents/Comply365-DTOP-Operating-Model-1-Pager.pdf`
- QA via `pdftoppm` image conversion and visual inspection

**1 script, 1 output file. No app changes.**

