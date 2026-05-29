import pptxgen from "pptxgenjs";

/* ─────────────────────────────────────────────────────────────────
   Two brand palettes share the same token shape, so slide specs
   keep referencing C.primary / C.ink / C.surface etc., and the
   palette is swapped at deck-build time via installComply365Brand().
   ───────────────────────────────────────────────────────────────── */

const DARK_PALETTE = {
  bg: "0A0F1C",
  surface: "121A2E",
  surfaceAlt: "0F1729",
  hairline: "1F2A44",
  ink: "F8FAFC",
  muted: "94A3B8",
  subtle: "64748B",
  primary: "0066FF",
  primarySoft: "1E3A8A",
  accent: "00B4D8",
  detect: "60A5FA",
  trigger: "F59E0B",
  orchestrate: "A78BFA",
  prove: "10B981",
  danger: "EF4444",
  success: "10B981",
  warning: "F59E0B",
  rose: "F43F5E",
  blue: "3B82F6",
  emerald: "10B981",
  violet: "A78BFA",
  amber: "F59E0B",
  cyan: "22D3EE",
  sky: "38BDF8",
  purple: "C084FC",
  gridLine: "16213A",
  glow: "0A2A6B",
  tier1: "F59E0B",
  tier2: "A78BFA",
  tier3: "10B981",
  gradStart: "0A0F1C",
  gradEnd: "0E1B3D",
  dataViz1: "0066FF",
  dataViz2: "22D3EE",
  dataViz3: "A78BFA",
  dataViz4: "F59E0B",
  dataViz5: "F43F5E",
  dataViz6: "10B981",
  wordmarkInk: "16213A",
} as const;

/** Comply365 official template palette — extracted from the
 *  AircraftIT Webinar deck theme (Simple Light): primary #0057FF,
 *  teal #00BBC7, magenta #BA0081, ink #121418, muted #52555C. */
const COMPLY_PALETTE = {
  bg: "FFFFFF",
  surface: "F5F7FB",
  surfaceAlt: "EEF2F8",
  hairline: "D5DBE6",
  ink: "121418",
  muted: "52555C",
  subtle: "7A7F8A",
  primary: "0057FF",
  primarySoft: "E5EEFF",
  accent: "00BBC7",
  detect: "0057FF",
  trigger: "F59E0B",
  orchestrate: "BA0081",
  prove: "00BBC7",
  danger: "BA0081",
  success: "00BBC7",
  warning: "F59E0B",
  rose: "BA0081",
  blue: "0057FF",
  emerald: "00BBC7",
  violet: "BA0081",
  amber: "F59E0B",
  cyan: "00BBC7",
  sky: "0097A7",
  purple: "BA0081",
  gridLine: "E8ECF3",
  glow: "E5EEFF",
  tier1: "F59E0B",
  tier2: "BA0081",
  tier3: "00BBC7",
  gradStart: "0A1230",
  gradEnd: "0057FF",
  dataViz1: "0057FF",
  dataViz2: "00BBC7",
  dataViz3: "BA0081",
  dataViz4: "F59E0B",
  dataViz5: "005389",
  dataViz6: "52555C",
  wordmarkInk: "EEF2F8",
} as const;

export const PPTX_BRAND = {
  size: { w: 13.333, h: 7.5 },
  color: { ...DARK_PALETTE } as Record<keyof typeof DARK_PALETTE, string>,
  // Brand fonts (PowerPoint will substitute Arial / Calibri locally if not installed)
  font: { display: "Space Grotesk", body: "Inter" } as { display: string; body: string },
  /** Active brand mode — controls chrome (background, accents, logo placement). */
  mode: "dark" as "dark" | "comply365",
};

/** Swap the live palette + fonts to the Comply365 official template brand.
 *  Mutates PPTX_BRAND in place so all downstream `C.primary` etc. references
 *  pick up the new palette without any spec edits. Call restoreDefaultBrand()
 *  in a `finally` block. */
export function installComply365Brand() {
  Object.assign(PPTX_BRAND.color, COMPLY_PALETTE);
  PPTX_BRAND.font.display = "Arial";
  PPTX_BRAND.font.body = "Arial";
  PPTX_BRAND.mode = "comply365";
}

/** Revert to the default dark Comply365 brand used by other decks. */
export function restoreDefaultBrand() {
  Object.assign(PPTX_BRAND.color, DARK_PALETTE);
  PPTX_BRAND.font.display = "Space Grotesk";
  PPTX_BRAND.font.body = "Inter";
  PPTX_BRAND.mode = "dark";
}

/** Resolve the effective variant for chrome rendering. The exec pitch decks
 *  pass variant="dark" by historical default, but in comply365 brand mode
 *  every content slide should render light. */
function effectiveVariant(requested: "dark" | "light"): "dark" | "light" {
  return PPTX_BRAND.mode === "comply365" ? "light" : requested;
}

const C = PPTX_BRAND.color;
const W = PPTX_BRAND.size.w;
const H = PPTX_BRAND.size.h;

/** Draw the signature Comply365 template chrome: thin diagonal blue
 *  accent in the top-right corner and a small accent block in the
 *  bottom-left (echoes the cover slide). Variant controls whether the
 *  accent is light (on dark hero) or solid (on white content). */
function addComplyAccents(slide: pptxgen.Slide, variant: "hero" | "content") {
  if (variant === "content") {
    // Top-right diagonal blue wedges (thin stripes), echoing template slide 5+.
    slide.addShape("rtTriangle", {
      x: W - 1.8, y: 0, w: 1.8, h: 0.55,
      fill: { color: C.primary }, line: { type: "none" }, flipH: true,
    });
    slide.addShape("rtTriangle", {
      x: W - 1.1, y: 0, w: 1.1, h: 0.32,
      fill: { color: C.accent }, line: { type: "none" }, flipH: true,
    });
  } else {
    // Hero: bigger diagonal block top-right + a faint one bottom-left.
    slide.addShape("rtTriangle", {
      x: W - 4.2, y: 0, w: 4.2, h: 2.4,
      fill: { color: C.primary, transparency: 15 }, line: { type: "none" }, flipH: true,
    });
    slide.addShape("rtTriangle", {
      x: W - 2.6, y: 0, w: 2.6, h: 1.4,
      fill: { color: C.accent, transparency: 35 }, line: { type: "none" }, flipH: true,
    });
    slide.addShape("rtTriangle", {
      x: 0, y: H - 1.2, w: 3.0, h: 1.2,
      fill: { color: C.primary, transparency: 45 }, line: { type: "none" },
    });
  }
}

/** Paint the slide background dark and add a subtle top hairline. */
export function paintBackground(slide: pptxgen.Slide, variant: "dark" | "light" = "dark") {
  const v = effectiveVariant(variant);
  slide.background = { color: v === "light" ? "FFFFFF" : C.bg };
  if (PPTX_BRAND.mode === "comply365") {
    addComplyAccents(slide, "content");
    return;
  }
  // top hairline
  slide.addShape("rect", {
    x: 0, y: 0, w: PPTX_BRAND.size.w, h: 0.04,
    fill: { color: v === "light" ? "E2E8F0" : C.hairline },
    line: { type: "none" },
  });
}

/** Standard brand footer: deck label · slide n / total · brand mark. */
export function addBrandedFooter(
  slide: pptxgen.Slide,
  index: number,
  total: number,
  deckLabel: string,
  variant: "dark" | "light" = "dark",
) {
  const ink = variant === "light" ? C.subtle : C.muted;
  slide.addShape("rect", {
    x: 0, y: PPTX_BRAND.size.h - 0.42, w: PPTX_BRAND.size.w, h: 0.02,
    fill: { color: variant === "light" ? "E2E8F0" : C.hairline },
    line: { type: "none" },
  });
  slide.addText(deckLabel, {
    x: 0.4, y: PPTX_BRAND.size.h - 0.38, w: 6, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, color: ink,
  });
  slide.addText("Comply365 · Operational Performance Platform", {
    x: PPTX_BRAND.size.w / 2 - 3, y: PPTX_BRAND.size.h - 0.38, w: 6, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, color: ink, align: "center",
  });
  slide.addText(`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, {
    x: PPTX_BRAND.size.w - 1.4, y: PPTX_BRAND.size.h - 0.38, w: 1, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, color: ink, align: "right",
  });
}

/** Title block (eyebrow + title + optional subtitle). */
export function addTitleBlock(
  slide: pptxgen.Slide,
  opts: { eyebrow?: string; title: string; subtitle?: string; y?: number; variant?: "dark" | "light" },
) {
  const variant = opts.variant ?? "dark";
  const ink = variant === "light" ? "0F172A" : C.ink;
  const muted = variant === "light" ? C.subtle : C.muted;
  let y = opts.y ?? 0.5;
  if (opts.eyebrow) {
    slide.addText(opts.eyebrow.toUpperCase(), {
      x: 0.5, y, w: 12, h: 0.3,
      fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.primary, bold: true, charSpacing: 4,
    });
    y += 0.32;
  }
  slide.addText(opts.title, {
    x: 0.5, y, w: 12.3, h: 0.85,
    fontFace: PPTX_BRAND.font.display, fontSize: 28, bold: true, color: ink,
  });
  y += 0.85;
  if (opts.subtitle) {
    slide.addText(opts.subtitle, {
      x: 0.5, y, w: 12.3, h: 0.5,
      fontFace: PPTX_BRAND.font.body, fontSize: 14, color: muted,
    });
  }
}

/** Standard card: rounded surface rectangle. */
export function addCard(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  opts: { fill?: string; border?: string; radius?: number } = {},
) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: opts.fill ?? C.surface },
    line: { color: opts.border ?? C.hairline, width: 0.75 },
    rectRadius: opts.radius ?? 0.08,
  });
}

/** DTOP step pills row (Detect / Trigger / Orchestrate / Prove). */
export function addDtopPills(slide: pptxgen.Slide, x: number, y: number, w: number) {
  const steps = [
    { letter: "D", label: "Detect", color: C.detect },
    { letter: "T", label: "Trigger", color: C.trigger },
    { letter: "O", label: "Orchestrate", color: C.orchestrate },
    { letter: "P", label: "Prove", color: C.prove },
  ];
  const gap = 0.18;
  const pillW = (w - gap * (steps.length - 1)) / steps.length;
  steps.forEach((s, i) => {
    const px = x + i * (pillW + gap);
    slide.addShape("roundRect", {
      x: px, y, w: pillW, h: 0.55,
      fill: { color: C.surface },
      line: { color: s.color, width: 1 },
      rectRadius: 0.08,
    });
    slide.addShape("ellipse", {
      x: px + 0.15, y: y + 0.1, w: 0.35, h: 0.35,
      fill: { color: s.color }, line: { type: "none" },
    });
    slide.addText(s.letter, {
      x: px + 0.15, y: y + 0.1, w: 0.35, h: 0.35,
      fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color: C.bg, align: "center", valign: "middle",
    });
    slide.addText(s.label, {
      x: px + 0.6, y: y + 0.12, w: pillW - 0.7, h: 0.32,
      fontFace: PPTX_BRAND.font.display, fontSize: 13, bold: true, color: C.ink, valign: "middle",
    });
  });
}

/** Bullet list. */
export function addBulletList(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  items: string[],
  opts: { fontSize?: number; color?: string } = {},
) {
  slide.addText(items.map((t) => ({ text: t, options: { bullet: { code: "25A0" } } })), {
    x, y, w, h,
    fontFace: PPTX_BRAND.font.body,
    fontSize: opts.fontSize ?? 12,
    color: opts.color ?? PPTX_BRAND.color.ink,
    paraSpaceAfter: 6,
    valign: "top",
  });
}

/** Stat tile. */
export function addStatTile(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  value: string, label: string, accent: string = C.primary,
) {
  addCard(slide, x, y, w, h);
  slide.addText(value, {
    x: x + 0.1, y: y + 0.18, w: w - 0.2, h: h * 0.5,
    fontFace: PPTX_BRAND.font.display, fontSize: 32, bold: true, color: accent, align: "center",
  });
  slide.addText(label, {
    x: x + 0.1, y: y + h * 0.65, w: w - 0.2, h: h * 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, align: "center",
  });
}

/** Image fallback for complex visuals. */
export function addImageFallback(
  slide: pptxgen.Slide,
  base64Png: string,
  x: number, y: number, w: number, h: number,
  caption?: string,
) {
  slide.addImage({ data: base64Png, x, y, w, h });
  if (caption) {
    slide.addText(caption, {
      x, y: y + h + 0.05, w, h: 0.25,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, align: "center", italic: true,
    });
  }
}

/** Load a public/asset image as base64 data URI. */
export async function loadImageAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/** Add the Comply365 logo to top-right of a slide. */
export async function addBrandLogo(slide: pptxgen.Slide, logoBase64: string, variant: "dark" | "light" = "dark") {
  if (!logoBase64) return;
  // Comply365 wordmark natural aspect ratio is ~9.65:1 (1920×199).
  // In comply365 brand mode the logo sits slightly larger to match the
  // template's top-right placement.
  const h = PPTX_BRAND.mode === "comply365" ? 0.36 : 0.32;
  const w = h * 9.65;
  slide.addImage({
    data: logoBase64,
    x: PPTX_BRAND.size.w - w - 0.45,
    y: PPTX_BRAND.mode === "comply365" ? 0.18 : 0.25,
    w, h,
  });
}

/** Eyebrow label — uppercase tracked. */
export function addEyebrow(
  slide: pptxgen.Slide,
  x: number, y: number, w: number,
  text: string,
  color: string = C.primary,
) {
  slide.addText(text.toUpperCase(), {
    x, y, w, h: 0.28,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, color, bold: true, charSpacing: 4,
  });
}

/** Section title — display 22pt bold. */
export function addSectionTitle(
  slide: pptxgen.Slide,
  x: number, y: number, w: number,
  text: string,
  color: string = C.ink,
) {
  slide.addText(text, {
    x, y, w, h: 0.4,
    fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color,
  });
}

/** Coloured pill with text inside (for tags / data sources). */
export function addPill(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  text: string,
  color: string,
) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: PPTX_BRAND.color.surface },
    line: { color, width: 1 },
    rectRadius: h / 2,
  });
  slide.addText(text, {
    x, y, w, h,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, color, bold: true,
    align: "center", valign: "middle",
  });
}

/** Horizontal pill row with auto sizing. */
export function addPillRow(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  items: { text: string; color?: string }[],
) {
  const gap = 0.12;
  const pillW = (w - gap * (items.length - 1)) / items.length;
  items.forEach((it, i) => {
    addPill(slide, x + i * (pillW + gap), y, pillW, h, it.text, it.color ?? C.primary);
  });
}

/** Coloured square icon badge with letter/glyph inside. */
export function addIconBadge(
  slide: pptxgen.Slide,
  x: number, y: number, size: number,
  color: string,
  glyph: string = "■",
) {
  slide.addShape("roundRect", {
    x, y, w: size, h: size,
    fill: { color },
    line: { type: "none" },
    rectRadius: size * 0.2,
  });
  slide.addText(glyph, {
    x, y, w: size, h: size,
    fontFace: PPTX_BRAND.font.display, fontSize: Math.max(10, size * 22),
    bold: true, color: PPTX_BRAND.color.bg, align: "center", valign: "middle",
  });
}

/** Right-pointing chevron between cards. */
export function addStepArrow(
  slide: pptxgen.Slide,
  x: number, y: number, h: number = 0.3,
  color: string = PPTX_BRAND.color.muted,
) {
  slide.addText("›", {
    x, y, w: h * 0.8, h,
    fontFace: PPTX_BRAND.font.display, fontSize: Math.max(14, h * 40),
    bold: true, color, align: "center", valign: "middle",
  });
}

/** Card with eyebrow + title + body paragraph. Most-used slide primitive. */
export function addLabeledCard(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  opts: {
    eyebrow?: string;
    title: string;
    body?: string;
    accent?: string;
    fill?: string;
    titleSize?: number;
    bodySize?: number;
  },
) {
  const accent = opts.accent ?? C.primary;
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: opts.fill ?? C.surface },
    line: { color: accent, width: 0.75 },
    rectRadius: 0.08,
  });
  // Brand motif: left accent bar
  slide.addShape("rect", {
    x, y: y + 0.06, w: 0.05, h: h - 0.12,
    fill: { color: accent }, line: { type: "none" },
  });
  let cy = y + 0.15;
  if (opts.eyebrow) {
    slide.addText(opts.eyebrow.toUpperCase(), {
      x: x + 0.18, y: cy, w: w - 0.36, h: 0.22,
      fontFace: PPTX_BRAND.font.body, fontSize: 8, color: accent, bold: true, charSpacing: 3,
    });
    cy += 0.22;
  }
  slide.addText(opts.title, {
    x: x + 0.18, y: cy, w: w - 0.36, h: 0.34,
    fontFace: PPTX_BRAND.font.display, fontSize: opts.titleSize ?? 12, bold: true, color: C.ink,
  });
  cy += 0.34;
  if (opts.body) {
    slide.addText(opts.body, {
      x: x + 0.18, y: cy, w: w - 0.36, h: y + h - cy - 0.12,
      fontFace: PPTX_BRAND.font.body, fontSize: opts.bodySize ?? 9.5, color: C.muted,
      valign: "top", paraSpaceAfter: 2,
    });
  }
}

/** Check / cross row used in capability comparisons. */
export function addCheckRow(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  label: string,
  ok: boolean,
  ok2?: boolean,
) {
  slide.addText(label, {
    x, y, w: w - 1.2, h,
    fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.ink, valign: "middle",
  });
  const iconX1 = x + w - 1.1;
  const iconX2 = x + w - 0.5;
  slide.addText(ok ? "✓" : "✕", {
    x: iconX1, y, w: 0.5, h,
    fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true,
    color: ok ? C.prove : C.danger, align: "center", valign: "middle",
  });
  if (typeof ok2 === "boolean") {
    slide.addText(ok2 ? "✓" : "✕", {
      x: iconX2, y, w: 0.5, h,
      fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true,
      color: ok2 ? C.prove : C.danger, align: "center", valign: "middle",
    });
  }
}

/** Small divider line. */
export function addDivider(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, color: string = C.hairline,
) {
  slide.addShape("rect", {
    x, y, w, h: 0.015,
    fill: { color }, line: { type: "none" },
  });
}

/* ───────────────────────────────────────────────────────────────────
   Brand polish — added for pinpoint visuals + deeper Comply365 brand
   ─────────────────────────────────────────────────────────────────── */

/** Faint dotted grid in the safe area (decorative, low-contrast). */
function addSafeAreaGrid(slide: pptxgen.Slide) {
  const step = 0.55;
  const x0 = 0.4, y0 = 1.7;
  const x1 = PPTX_BRAND.size.w - 0.4;
  const y1 = PPTX_BRAND.size.h - 0.5;
  for (let x = x0; x <= x1; x += step) {
    for (let y = y0; y <= y1; y += step) {
      slide.addShape("ellipse", {
        x: x - 0.012, y: y - 0.012, w: 0.024, h: 0.024,
        fill: { color: C.gridLine }, line: { type: "none" },
      });
    }
  }
}

/** Master chrome: background + top hairline + logo + footer + faint grid. */
export function addBrandMaster(
  slide: pptxgen.Slide,
  ctx: { logo: string; index: number; total: number; deckLabel: string; variant?: "dark" | "light"; grid?: boolean },
) {
  const requested = ctx.variant ?? "dark";
  const variant = effectiveVariant(requested);
  paintBackground(slide, requested);
  if (ctx.grid !== false && variant === "dark") addSafeAreaGrid(slide);
  if (ctx.logo) addBrandLogo(slide, ctx.logo, variant);
  const ink = variant === "light" ? C.subtle : C.muted;

  if (PPTX_BRAND.mode === "comply365") {
    // Template-style footer: thin blue rule + small wordmark left, page X / Y right.
    slide.addShape("rect", {
      x: 0.5, y: H - 0.46, w: W - 1.0, h: 0.012,
      fill: { color: C.primary }, line: { type: "none" },
    });
    slide.addText(ctx.deckLabel, {
      x: 0.5, y: H - 0.40, w: 6, h: 0.30,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted,
    });
    slide.addText("Comply365 · Operational Performance Platform", {
      x: W / 2 - 3, y: H - 0.40, w: 6, h: 0.30,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, align: "center",
    });
    slide.addText(
      `${String(ctx.index + 1).padStart(2, "0")} / ${String(ctx.total).padStart(2, "0")}`,
      {
        x: W - 1.4, y: H - 0.40, w: 1, h: 0.30,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, align: "right",
      },
    );
    return;
  }

  // Faint Comply365 wordmark glyph left of footer label (dark mode only)
  slide.addShape("ellipse", {
    x: 0.18, y: PPTX_BRAND.size.h - 0.36, w: 0.18, h: 0.18,
    fill: { color: C.primary }, line: { type: "none" },
  });
  slide.addText("365", {
    x: 0.18, y: PPTX_BRAND.size.h - 0.36, w: 0.18, h: 0.18,
    fontFace: PPTX_BRAND.font.body, fontSize: 5, bold: true, color: C.bg,
    align: "center", valign: "middle",
  });
  // Footer label, brand mark center, slide counter right
  slide.addShape("rect", {
    x: 0, y: PPTX_BRAND.size.h - 0.42, w: PPTX_BRAND.size.w, h: 0.02,
    fill: { color: variant === "light" ? "E2E8F0" : C.hairline }, line: { type: "none" },
  });
  slide.addText(ctx.deckLabel, {
    x: 0.42, y: PPTX_BRAND.size.h - 0.38, w: 5.8, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, color: ink,
  });
  slide.addText("Comply365 · Operational Performance Platform", {
    x: PPTX_BRAND.size.w / 2 - 3, y: PPTX_BRAND.size.h - 0.38, w: 6, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, color: ink, align: "center",
  });
  slide.addText(
    `${String(ctx.index + 1).padStart(2, "0")} / ${String(ctx.total).padStart(2, "0")}`,
    {
      x: PPTX_BRAND.size.w - 1.4, y: PPTX_BRAND.size.h - 0.38, w: 1, h: 0.3,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, color: ink, align: "right",
    },
  );
}

/** Hero chrome — gradient-ish bg via stacked rects + faint wordmark watermark. */
export function addBrandHero(slide: pptxgen.Slide) {
  if (PPTX_BRAND.mode === "comply365") {
    // Comply365 template cover: deep navy + diagonal blue/teal wedges top-right
    // and a soft accent wedge bottom-left.
    slide.background = { color: "0A1230" };
    addComplyAccents(slide, "hero");
    // Faint wordmark watermark — large, very low contrast.
    slide.addText("comply365", {
      x: 0.5, y: H - 2.6, w: W - 1, h: 2,
      fontFace: PPTX_BRAND.font.display, fontSize: 180, bold: true,
      color: "0F1B45", align: "center",
    });
    return;
  }
  slide.background = { color: C.gradStart };
  // Stacked translucent layers approximate a vertical gradient.
  slide.addShape("rect", {
    x: 0, y: 0, w: PPTX_BRAND.size.w, h: PPTX_BRAND.size.h / 2,
    fill: { color: C.gradEnd, transparency: 35 }, line: { type: "none" },
  });
  slide.addShape("rect", {
    x: 0, y: PPTX_BRAND.size.h / 2, w: PPTX_BRAND.size.w, h: PPTX_BRAND.size.h / 2,
    fill: { color: C.bg, transparency: 20 }, line: { type: "none" },
  });
  // Watermark wordmark — large, very low contrast.
  slide.addText("comply365", {
    x: 0.5, y: PPTX_BRAND.size.h - 2.6, w: PPTX_BRAND.size.w - 1, h: 2,
    fontFace: PPTX_BRAND.font.display, fontSize: 180, bold: true,
    color: C.wordmarkInk, align: "center",
  });
}

/** Section divider slide — full-bleed dark, big eyebrow + title. */
export function addSectionDivider(
  slide: pptxgen.Slide,
  opts: { eyebrow: string; title: string; subtitle?: string; index?: number; logo?: string },
) {
  addBrandHero(slide);
  // Top accent bar
  slide.addShape("rect", {
    x: 0.5, y: 1.6, w: 0.6, h: 0.06,
    fill: { color: C.primary }, line: { type: "none" },
  });
  if (typeof opts.index === "number") {
    slide.addText(String(opts.index).padStart(2, "0"), {
      x: 0.5, y: 1.75, w: 2.2, h: 1.4,
      fontFace: PPTX_BRAND.font.display, fontSize: 96, bold: true, color: C.primary,
    });
  }
  slide.addText(opts.eyebrow.toUpperCase(), {
    x: 0.5, y: 3.15, w: 12, h: 0.4,
    fontFace: PPTX_BRAND.font.body, fontSize: 13, bold: true, color: C.accent, charSpacing: 6,
  });
  slide.addText(opts.title, {
    x: 0.5, y: 3.6, w: 12.3, h: 1.4,
    fontFace: PPTX_BRAND.font.display, fontSize: 56, bold: true, color: C.ink,
  });
  if (opts.subtitle) {
    slide.addText(opts.subtitle, {
      x: 0.5, y: 5.05, w: 12.3, h: 0.7,
      fontFace: PPTX_BRAND.font.body, fontSize: 16, color: C.muted,
    });
  }
  if (opts.logo) addBrandLogo(slide, opts.logo, "dark");
}

/** Stat block with subtle left accent bar — replaces addStatTile for hero stats. */
export function addBrandStatBlock(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  value: string, label: string, accent: string = C.primary,
) {
  addCard(slide, x, y, w, h);
  // Left accent bar (the brand motif)
  slide.addShape("rect", {
    x, y, w: 0.06, h,
    fill: { color: accent }, line: { type: "none" },
  });
  slide.addText(value, {
    x: x + 0.18, y: y + 0.12, w: w - 0.3, h: h * 0.55,
    fontFace: PPTX_BRAND.font.display, fontSize: 30, bold: true, color: accent,
    align: "center", valign: "middle",
  });
  slide.addText(label, {
    x: x + 0.18, y: y + h * 0.62, w: w - 0.3, h: h * 0.32,
    fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, align: "center",
  });
}

/** Branded callout banner. */
export function addCalloutBanner(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  text: string, accent: string = C.primary,
) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: C.primarySoft }, line: { color: accent, width: 1 },
    rectRadius: 0.08,
  });
  // accent bar
  slide.addShape("rect", {
    x, y, w: 0.06, h,
    fill: { color: accent }, line: { type: "none" },
  });
  slide.addText(text, {
    x: x + 0.2, y, w: w - 0.3, h,
    fontFace: PPTX_BRAND.font.body, fontSize: 11, italic: true, color: C.ink,
    align: "center", valign: "middle",
  });
}

/** Soft glow rectangle (decorative wash). */
export function addGlowWash(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number, color: string = C.primary,
) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color, transparency: 85 }, line: { type: "none" }, rectRadius: 0.2,
  });
}