// Shared brand tokens for executive-grade printable one-pagers.
// Hex/rgba values are required for html2canvas — Tailwind tokens won't render.

export const printBrand = {
  color: {
    ink: "#0B1220",
    slate: "#1F2937",
    muted: "#5B6776",
    subtle: "#8A95A5",
    hairline: "#E5EAF0",
    paper: "#FAFBFD",
    paperWarm: "#FFFFFF",
    brand: "#0066FF",
    brandDeep: "#0B1A4A",
    success: "#0F766E",
    amber: "#B45309",
    rose: "#9F1239",
    violet: "#5B21B6",
    emerald: "#047857",
  },
  font: {
    display: "'Space Grotesk', 'Inter', 'Helvetica Neue', Arial, sans-serif",
    body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  },
  page: {
    width: 1056,
    height: 816,
    margin: 36,
  },
} as const;

/**
 * Inject Google Fonts link (idempotent) and wait for fonts to be ready.
 * Prevents Times-fallback rendering on first export.
 */
export const ensurePrintFontsLoaded = async (): Promise<void> => {
  const id = "print-brand-fonts";
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }
  // Wait for fonts to be loaded
  if ((document as any).fonts?.ready) {
    try {
      await (document as any).fonts.ready;
      // Explicitly load the families we need (some browsers don't auto-load until used)
      await Promise.all([
        (document as any).fonts.load("600 14px 'Inter'"),
        (document as any).fonts.load("600 14px 'Space Grotesk'"),
        (document as any).fonts.load("700 28px 'Space Grotesk'"),
      ]);
    } catch {
      /* non-fatal */
    }
  }
  // Small grace period for layout settle
  await new Promise((r) => setTimeout(r, 80));
};

/** Section heading style — small caps, tracked, muted ink */
export const sectionLabel = (color: string = printBrand.color.muted): React.CSSProperties => ({
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color,
  fontFamily: printBrand.font.display,
});

/** 1px hairline rule */
export const hairline: React.CSSProperties = {
  height: 1,
  background: printBrand.color.hairline,
  width: "100%",
  border: 0,
};

import type React from "react";