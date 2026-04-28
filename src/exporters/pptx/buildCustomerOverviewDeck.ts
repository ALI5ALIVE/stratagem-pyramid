import pptxgen from "pptxgenjs";
import {
  PPTX_BRAND,
  paintBackground,
  loadImageAsBase64,
  addCard,
  addEyebrow,
  addIconBadge,
  addBrandStatBlock,
} from "@/lib/pptxBrand";
import logoUrlDark from "@/assets/comply365-logo-white.png";
import {
  type BuildOpts,
  type SlideSpec,
  CONTENT_TOP,
  CONTENT_BOTTOM,
  chrome,
  header,
  slideSpecs,
  regulationSummarySpec,
} from "./buildTechnicalDeck";
import {
  transformationSpec,
  customerOutcomesSpec,
} from "./buildExecutivePitch3Deck";
import { valuePillars } from "@/data/platformPlaybook";

const C = PPTX_BRAND.color;
const W = PPTX_BRAND.size.w;
const H = PPTX_BRAND.size.h;
const DECK_LABEL = "Customer Overview";

/* ──────────────────────────────────────────────────────────────────
   CO-only spec #1 — Title slide
   Mirrors src/components/customer-overview-slides/COSlide0Title.tsx
   ────────────────────────────────────────────────────────────────── */
const coTitleSpec: SlideSpec = {
  label: "Customer Overview Title",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    paintBackground(slide, "dark");

    // Eyebrow
    slide.addText("THE OPERATIONAL PERFORMANCE PLATFORM", {
      x: 0.5, y: 1.2, w: W - 1, h: 0.32,
      fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: true,
      color: C.primary, align: "center", charSpacing: 6,
    });

    // Hero title — two lines, accent on second half
    slide.addText(
      [
        { text: "From cost centre to ", options: { color: C.ink } },
        { text: "performance engine", options: { color: C.primary } },
      ],
      {
        x: 0.5, y: 1.7, w: W - 1, h: 1.6,
        fontFace: PPTX_BRAND.font.display, fontSize: 48, bold: true,
        align: "center", valign: "middle",
      },
    );

    // Subtitle
    slide.addText(
      "A 20-minute walkthrough — where you are today, and where we go together.",
      {
        x: 1.5, y: 3.4, w: W - 3, h: 0.8,
        fontFace: PPTX_BRAND.font.body, fontSize: 16, color: C.muted,
        align: "center", valign: "top",
      },
    );

    // "Prepared for" pill
    const pillW = 3.0;
    const pillX = (W - pillW) / 2;
    const pillY = 4.3;
    slide.addShape("roundRect", {
      x: pillX, y: pillY, w: pillW, h: 0.36,
      fill: { color: C.surfaceAlt }, line: { color: C.hairline, width: 0.75 },
      rectRadius: 0.18,
    });
    slide.addShape("ellipse", {
      x: pillX + 0.18, y: pillY + 0.13, w: 0.1, h: 0.1,
      fill: { color: C.primary }, line: { type: "none" },
    });
    slide.addText("Prepared for [Customer Name]", {
      x: pillX + 0.35, y: pillY, w: pillW - 0.4, h: 0.36,
      fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted,
      valign: "middle",
    });

    // Trust stats row (550+, ~2.5M, 6) — reuse the brand stat block helper
    const stats = [
      { value: "550+", label: "Airlines Worldwide" },
      { value: "~2.5M", label: "Users" },
      { value: "6",     label: "Continents" },
    ];
    const statRowY = 5.3;
    const statW = 2.6;
    const gap = 0.4;
    const totalW = stats.length * statW + (stats.length - 1) * gap;
    const startX = (W - totalW) / 2;
    stats.forEach((s, i) => {
      const sx = startX + i * (statW + gap);
      addBrandStatBlock(slide, sx, statRowY, statW, 1.05, s.value, s.label);
    });
  },
};

/* ──────────────────────────────────────────────────────────────────
   CO-only spec #2 — Value Pillars
   Mirrors src/components/platform-slides/PFSlide9Value.tsx
   ────────────────────────────────────────────────────────────────── */

// Map tailwind text-color tokens to the pptx palette.
const pillarColorOf = (cls: string): string => {
  if (cls.includes("blue")) return C.primary;
  if (cls.includes("amber") || cls.includes("yellow")) return C.amber;
  if (cls.includes("violet") || cls.includes("purple")) return C.violet;
  if (cls.includes("emerald") || cls.includes("green")) return C.prove;
  if (cls.includes("cyan") || cls.includes("teal")) return C.sky;
  return C.primary;
};

const valuePillarsSpec: SlideSpec = {
  label: "Value Pillars",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(
      slide,
      "Value & close",
      "Value Unlocked",
      "Five shifts that only one connected platform can deliver.",
    );

    const top = CONTENT_TOP;
    const h = CONTENT_BOTTOM - top - 0.2;
    const cols = valuePillars.length;
    const gap = 0.18;
    const colW = (W - 1 - gap * (cols - 1)) / cols;

    valuePillars.forEach((p, i) => {
      const px = 0.5 + i * (colW + gap);
      const colour = pillarColorOf(p.color);
      addCard(slide, px, top, colW, h, { fill: C.surfaceAlt, border: colour });

      // Title
      slide.addText(p.title, {
        x: px + 0.18, y: top + 0.18, w: colW - 0.36, h: 0.55,
        fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true,
        color: colour, valign: "top",
      });

      // Description
      slide.addText(p.description, {
        x: px + 0.18, y: top + 0.78, w: colW - 0.36, h: 1.1,
        fontFace: PPTX_BRAND.font.body, fontSize: 8.5, color: C.muted,
        valign: "top",
      });

      // Bullets
      const bulletsY = top + 1.95;
      p.bullets.forEach((b, j) => {
        slide.addText(`•  ${b}`, {
          x: px + 0.18, y: bulletsY + j * 0.34, w: colW - 0.36, h: 0.32,
          fontFace: PPTX_BRAND.font.body, fontSize: 8.5, color: C.ink,
          valign: "top",
        });
      });

      // Shift footer
      const footerY = top + h - 0.7;
      slide.addShape("line", {
        x: px + 0.18, y: footerY - 0.05, w: colW - 0.36, h: 0,
        line: { color: C.hairline, width: 0.5 },
      });
      slide.addText(p.shift, {
        x: px + 0.18, y: footerY, w: colW - 0.36, h: 0.6,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, italic: true,
        color: colour, valign: "top",
      });
    });
  },
};

/* ──────────────────────────────────────────────────────────────────
   CO-only spec #3 — Closing "Your First 90 Days"
   Mirrors src/components/customer-overview-slides/COClosingFirst90Days.tsx
   ────────────────────────────────────────────────────────────────── */
const co90DaysSpec: SlideSpec = {
  label: "Your First 90 Days",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(
      slide,
      "Closing",
      "Your first 90 days with us",
      "Let's start with one use case — and prove the platform on your numbers.",
    );

    const phases = [
      {
        days: "DAYS 1–30",
        title: "Discovery Workshop",
        glyph: "C",
        color: C.primary,
        bullets: [
          "Pick one high-cost use case together",
          "Baseline today's cost and recurrence rate",
          "Map the signal-to-action gap in your operation",
        ],
        outcome: "A shared, measurable starting point.",
      },
      {
        days: "DAYS 31–60",
        title: "Pilot",
        glyph: "P",
        color: C.violet,
        bullets: [
          "Deploy the connected loop on the chosen use case",
          "Detect → Trigger → Orchestrate → Prove in production",
          "Weekly check-ins, no big-bang rollout",
        ],
        outcome: "Early signal, early proof.",
      },
      {
        days: "DAYS 61–90",
        title: "Prove & Expand",
        glyph: "↗",
        color: C.prove,
        bullets: [
          "Present measured outcomes against baseline",
          "Define the next two use cases to onboard",
          "Agree the rollout plan and success metrics",
        ],
        outcome: "Proof in hand. Roadmap agreed.",
      },
    ];

    const top = CONTENT_TOP + 0.1;
    const cardH = 3.2;
    const gap = 0.25;
    const cardW = (W - 1 - gap * 2) / 3;

    phases.forEach((p, i) => {
      const x = 0.5 + i * (cardW + gap);
      addCard(slide, x, top, cardW, cardH, { fill: C.surfaceAlt, border: p.color });

      // Step pill
      slide.addShape("roundRect", {
        x: x + 0.2, y: top - 0.14, w: 0.85, h: 0.28,
        fill: { color: C.bg }, line: { color: C.hairline, width: 0.75 },
        rectRadius: 0.14,
      });
      slide.addText(`STEP ${i + 1}`, {
        x: x + 0.2, y: top - 0.14, w: 0.85, h: 0.28,
        fontFace: PPTX_BRAND.font.body, fontSize: 7.5, bold: true,
        color: C.muted, align: "center", valign: "middle", charSpacing: 3,
      });

      // Icon + days + title
      addIconBadge(slide, x + 0.25, top + 0.3, 0.42, p.color, p.glyph);
      slide.addText(p.days, {
        x: x + 0.85, y: top + 0.28, w: cardW - 1.0, h: 0.22,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true,
        color: C.muted, charSpacing: 3,
      });
      slide.addText(p.title, {
        x: x + 0.85, y: top + 0.5, w: cardW - 1.0, h: 0.32,
        fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true,
        color: p.color,
      });

      // Bullets
      const bulletsY = top + 1.05;
      p.bullets.forEach((b, j) => {
        slide.addShape("ellipse", {
          x: x + 0.28, y: bulletsY + j * 0.42 + 0.07, w: 0.08, h: 0.08,
          fill: { color: p.color }, line: { type: "none" },
        });
        slide.addText(b, {
          x: x + 0.45, y: bulletsY + j * 0.42, w: cardW - 0.6, h: 0.4,
          fontFace: PPTX_BRAND.font.body, fontSize: 9.5, color: C.ink,
          valign: "top",
        });
      });

      // Outcome footer
      const footerY = top + cardH - 0.45;
      slide.addShape("line", {
        x: x + 0.2, y: footerY - 0.05, w: cardW - 0.4, h: 0,
        line: { color: C.hairline, width: 0.5 },
      });
      slide.addText(p.outcome, {
        x: x + 0.2, y: footerY, w: cardW - 0.4, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, italic: true,
        color: C.muted, valign: "top",
      });
    });

    // CTA banner
    const ctaY = top + cardH + 0.45;
    const ctaH = CONTENT_BOTTOM - ctaY - 0.1;
    addCard(slide, 0.5, ctaY, W - 1, Math.max(ctaH, 0.9), { fill: "0A1A33", border: C.primary });
    addIconBadge(slide, 0.85, ctaY + 0.2, 0.5, C.primary, "📅");
    slide.addText("Book a 60-minute discovery workshop", {
      x: 1.55, y: ctaY + 0.18, w: W - 4.5, h: 0.36,
      fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color: C.ink,
    });
    slide.addText(
      "One use case. One baseline. One clear path to measurable performance.",
      {
        x: 1.55, y: ctaY + 0.55, w: W - 4.5, h: 0.32,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted,
      },
    );
    slide.addShape("roundRect", {
      x: W - 2.7, y: ctaY + 0.28, w: 2.0, h: 0.5,
      fill: { color: C.primary }, line: { type: "none" }, rectRadius: 0.08,
    });
    slide.addText("Schedule workshop  →", {
      x: W - 2.7, y: ctaY + 0.28, w: 2.0, h: 0.5,
      fontFace: PPTX_BRAND.font.body, fontSize: 10, bold: true,
      color: "FFFFFF", align: "center", valign: "middle",
    });
  },
};

/* ──────────────────────────────────────────────────────────────────
   Build the deck
   ────────────────────────────────────────────────────────────────── */
export async function buildCustomerOverviewDeck(opts: BuildOpts = {}): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: "WIDE_16_9", width: PPTX_BRAND.size.w, height: PPTX_BRAND.size.h });
  pptx.layout = "WIDE_16_9";
  pptx.title = "Comply365 — Customer Overview";
  pptx.author = "Comply365";
  pptx.company = "Comply365";

  const logo = await loadImageAsBase64(logoUrlDark).catch(() => "");

  const byLabel = (label: string): SlideSpec => {
    const s = slideSpecs.find((x) => x.label === label);
    if (!s) throw new Error(`Customer Overview PPTX: missing slide spec "${label}"`);
    return s;
  };

  // Compose 11 slides in the exact order from src/pages/CustomerOverview.tsx.
  const composed: SlideSpec[] = [
    coTitleSpec,                                     // 0 · COSlide0Title
    byLabel("Industry Challenge"),                   // 1 · TechSlide2IndustryChallenge
    byLabel("Strategic Shift"),                      // 2 · TechSlide1StrategicShift
    byLabel("Platform Overview"),                    // 3 · TechV4PlatformOverview
    transformationSpec,                              // 4 · Slide4Transformation
    valuePillarsSpec,                                // 5 · PFSlide9Value
    byLabel("Use Cases"),                            // 6 · SlideUseCases
    regulationSummarySpec,                           // 7 · TechSlideRegulationSummary
    customerOutcomesSpec,                            // 8 · CustomerOutcomesSlide
    byLabel("Maturity Roadmap · Curve & Behaviour"), // 9 · Slide5MaturityCurve
    co90DaysSpec,                                    // 10 · COClosingFirst90Days
  ];

  const total = composed.length;

  for (let i = 0; i < composed.length; i++) {
    const spec = composed[i];
    opts.onProgress?.(i, total, spec.label);
    const slide = pptx.addSlide();
    try {
      await spec.build(slide, { logo, logoLight: "", index: i, total });
      // Repaint the bottom-left footer label to read "Customer Overview".
      slide.addShape("rect", {
        x: 0.42, y: H - 0.38, w: 5.8, h: 0.3,
        fill: { color: C.bg }, line: { type: "none" },
      });
      slide.addText(DECK_LABEL, {
        x: 0.42, y: H - 0.38, w: 5.8, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted,
      });
    } catch (err) {
      console.error(`CO PPTX slide ${i} (${spec.label}) failed:`, err);
      paintBackground(slide, "dark");
      slide.addText(`Slide failed to render: ${spec.label}\n${(err as Error)?.message ?? ""}`, {
        x: 1, y: 3, w: 11.3, h: 1.5,
        fontFace: PPTX_BRAND.font.body, fontSize: 18, color: C.danger, align: "center",
      });
    }
  }

  opts.onProgress?.(total, total, "Packaging…");
  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  return blob;
}