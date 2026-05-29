import pptxgen from "pptxgenjs";
import { PPTX_BRAND, loadImageAsBase64 } from "@/lib/pptxBrand";
import wordmarkBarUrl from "@/assets/brand/comply365/wordmark-bar.png";
import jetMarkUrl from "@/assets/brand/comply365/jet-mark.png";
import coverChromeUrl from "@/assets/brand/comply365/cover-chrome.png";
import wingUrl from "@/assets/brand/comply365/wing.png";

/* ─────────────────────────────────────────────────────────────────
   Comply365 official-template brand chrome for PPTX exports.

   Colors, layout coordinates and assets are extracted directly from
   the AircraftIT Webinar template so the deck matches the brand
   guidelines used by the Comply365 design team.
   ───────────────────────────────────────────────────────────────── */

export const COMPLY365_BRAND = {
  // Theme colors lifted from ppt/theme/theme1.xml of the template.
  colors: {
    bg: "121418",        // deep near-black background
    bgDeep: "000000",
    surface: "1B1E24",
    primary: "0057FF",   // signature Comply365 blue
    deepBlue: "005389",
    cyan: "00BBC7",
    cyanDeep: "0097A7",
    magenta: "BA0081",
    text: "FFFFFF",
    muted: "C3CFE5",
    hairline: "2C2F37",
  },
  font: { heading: "Arial", body: "Arial" },
} as const;

export type C365ChromeKind = "cover" | "divider" | "content" | "closer";

export interface C365ChromeAssets {
  wordmarkBar: string;
  jetMark: string;
  coverChrome: string;
  wing: string;
}

export async function loadComply365Assets(): Promise<C365ChromeAssets> {
  const [wordmarkBar, jetMark, coverChrome, wing] = await Promise.all([
    loadImageAsBase64(wordmarkBarUrl).catch(() => ""),
    loadImageAsBase64(jetMarkUrl).catch(() => ""),
    loadImageAsBase64(coverChromeUrl).catch(() => ""),
    loadImageAsBase64(wingUrl).catch(() => ""),
  ]);
  return { wordmarkBar, jetMark, coverChrome, wing };
}

const W = PPTX_BRAND.size.w;
const H = PPTX_BRAND.size.h;
const C = COMPLY365_BRAND.colors;

/**
 * Repaint a slide's chrome to match the official Comply365 template.
 *
 * Strategy: each spec already draws its body on a dark surface. We:
 *   1. Cover the very top and very bottom strips with the brand background.
 *   2. Stamp the COMPLY365 wordmark image in the bottom-left footer.
 *   3. Stamp the jet mark in the top-right corner.
 *   4. Print the deck label + slide-counter in the brand muted text.
 *
 * For cover and divider slides we also paint a hero flourish on the right
 * (cover-chrome dark+blue chevron, or the aircraft-wing photo) to match
 * the look of the template title / section slides.
 */
export function paintComply365Chrome(
  slide: pptxgen.Slide,
  ctx: {
    assets: C365ChromeAssets;
    kind: C365ChromeKind;
    index: number;
    total: number;
    deckLabel: string;
  },
) {
  const { assets, kind, index, total, deckLabel } = ctx;

  // Background unification — paint a thin top strip and the footer strip
  // in the template bg color so brand chrome reads cleanly over whatever
  // the existing spec drew.
  slide.addShape("rect", {
    x: 0, y: 0, w: W, h: 0.18,
    fill: { color: C.bg }, line: { type: "none" },
  });
  slide.addShape("rect", {
    x: 0, y: H - 0.55, w: W, h: 0.55,
    fill: { color: C.bg }, line: { type: "none" },
  });
  // Thin Comply365 blue accent rule above the footer.
  slide.addShape("rect", {
    x: 0, y: H - 0.55, w: W, h: 0.018,
    fill: { color: C.primary }, line: { type: "none" },
  });

  // Footer: wordmark image (bottom-left), deck label center, page # right.
  if (assets.wordmarkBar) {
    // The wordmark strip in the template is roughly 8.5:1 W:H.
    const wmH = 0.34;
    const wmW = wmH * 8.5;
    slide.addImage({
      data: assets.wordmarkBar,
      x: 0.35, y: H - 0.46, w: wmW, h: wmH,
    });
  }
  slide.addText(deckLabel, {
    x: W / 2 - 3, y: H - 0.42, w: 6, h: 0.3,
    fontFace: COMPLY365_BRAND.font.body, fontSize: 9, color: C.muted,
    align: "center", valign: "middle",
  });
  slide.addText(
    `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    {
      x: W - 1.25, y: H - 0.42, w: 0.9, h: 0.3,
      fontFace: COMPLY365_BRAND.font.body, fontSize: 9, color: C.muted,
      align: "right", valign: "middle",
    },
  );

  // Jet mark — small, top-right, on every slide for brand consistency.
  if (assets.jetMark && kind !== "cover" && kind !== "divider") {
    const jH = 0.22;
    const jW = jH * 4; // mark is wide & short
    slide.addImage({
      data: assets.jetMark,
      x: W - jW - 0.35, y: 0.05, w: jW, h: jH,
    });
  }

  // Cover / divider / closer slides get an extra hero flourish on the right.
  if (kind === "cover" && assets.coverChrome) {
    // Right-half hero with the dark-blue chevron motif from the template.
    const heroW = W * 0.42;
    slide.addImage({
      data: assets.coverChrome,
      x: W - heroW, y: 0.18, w: heroW, h: H - 0.73,
      // sizing.type 'cover' keeps the chevron aligned to the right edge
      sizing: { type: "cover", w: heroW, h: H - 0.73 },
    });
  } else if (kind === "divider" && assets.wing) {
    // Section dividers reuse the wing photo on the right third.
    const heroW = W * 0.36;
    slide.addImage({
      data: assets.wing,
      x: W - heroW, y: 0.18, w: heroW, h: H - 0.73,
      sizing: { type: "cover", w: heroW, h: H - 0.73 },
    });
    // Dark gradient overlay on the left edge of the photo for readability.
    slide.addShape("rect", {
      x: W - heroW, y: 0.18, w: 0.6, h: H - 0.73,
      fill: { color: C.bg, transparency: 35 }, line: { type: "none" },
    });
  }
}
