import pptxgen from "pptxgenjs";

export const PPTX_BRAND = {
  size: { w: 13.333, h: 7.5 },
  color: {
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
    // Extended tokens (added for brand polish)
    gridLine: "16213A",
    glow: "0A2A6B",
    tier1: "F59E0B", // Reactive
    tier2: "A78BFA", // Proactive
    tier3: "10B981", // Predictive
    gradStart: "0A0F1C",
    gradEnd: "0E1B3D",
    dataViz1: "0066FF",
    dataViz2: "22D3EE",
    dataViz3: "A78BFA",
    dataViz4: "F59E0B",
    dataViz5: "F43F5E",
    dataViz6: "10B981",
    wordmarkInk: "16213A",
  },
  // Brand fonts (PowerPoint will substitute Calibri locally if not installed)
  font: { display: "Space Grotesk", body: "Inter" },
} as const;

const C = PPTX_BRAND.color;

/** Paint the slide background dark and add a subtle top hairline. */
export function paintBackground(slide: pptxgen.Slide, variant: "dark" | "light" = "dark") {
  slide.background = { color: variant === "light" ? "FFFFFF" : C.bg };
  // top hairline
  slide.addShape("rect", {
    x: 0, y: 0, w: PPTX_BRAND.size.w, h: 0.04,
    fill: { color: variant === "light" ? "E2E8F0" : C.hairline },
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
  slide.addImage({
    data: logoBase64,
    x: PPTX_BRAND.size.w - 1.5, y: 0.25, w: 1.1, h: 0.32,
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
  const variant = ctx.variant ?? "dark";
  paintBackground(slide, variant);
  if (ctx.grid !== false && variant === "dark") addSafeAreaGrid(slide);
  if (ctx.logo) addBrandLogo(slide, ctx.logo, variant);
  // Faint Comply365 wordmark glyph left of footer label
  const ink = variant === "light" ? C.subtle : C.muted;
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