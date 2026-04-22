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
  },
  font: { display: "Calibri", body: "Calibri" },
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