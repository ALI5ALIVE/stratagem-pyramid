import pptxgen from "pptxgenjs";
import {
  PPTX_BRAND,
  paintBackground,
  loadImageAsBase64,
  addCard,
  addLabeledCard,
  addEyebrow,
  addBrandMaster,
  addIconBadge,
  addBrandStatBlock,
} from "@/lib/pptxBrand";
import logoUrlDark from "@/assets/comply365-logo-white.png";
import logoUrlLight from "@/assets/comply365-logo.png";
import {
  type BuildOpts,
  type SlideSpec,
  CONTENT_TOP,
  CONTENT_BOTTOM,
  chrome,
  header,
  layerDividerSpec,
  slideSpecs,
  openerSpec,
  regulationSummarySpec,
} from "./buildTechnicalDeck";
import { elevatorPitch } from "@/data/insightsPlaybook";

const C = PPTX_BRAND.color;
const W = PPTX_BRAND.size.w;
const DECK_LABEL = "Executive Pitch · Medium";

/* ─────────────────────────────────────────────────────────────────
   Two specs unique to Exec3 (not present in the Tech V4 builder).
   They mirror Slide4Transformation.tsx and CustomerOutcomesSlide.tsx.
   ───────────────────────────────────────────────────────────────── */

// ─── The Transformation (mirrors src/components/slides/Slide4Transformation.tsx)
export const transformationSpec: SlideSpec = {
  label: "The Transformation",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(
      slide,
      "The Transformation",
      "From cost center to competitive advantage",
      "Point Tools manage silos · Comply365 closes the loop.",
    );

    // Two-column body: left = before/after + time-allocation; right = value boxes + quote.
    const bodyTop = CONTENT_TOP;
    const bodyBottom = CONTENT_BOTTOM;
    const bodyH = bodyBottom - bodyTop;
    const colGap = 0.3;
    const colW = (W - 1 - colGap) / 2;
    const lx = 0.5;
    const rx = lx + colW + colGap;

    /* ── LEFT COLUMN ───────────────────────────────────────────── */
    // Before / After columns inside left
    const baH = 2.55;
    const baGap = 0.2;
    const baColW = (colW - baGap) / 2;
    const beforeX = lx;
    const afterX = lx + baColW + baGap;
    const baY = bodyTop + 0.18; // leave space for top tag

    // Tag chips
    slide.addShape("roundRect", {
      x: beforeX + 0.18, y: bodyTop, w: 1.0, h: 0.28,
      fill: { color: "2A0A12" }, line: { color: C.danger, width: 0.75 }, rectRadius: 0.05,
    });
    slide.addText("POINT TOOLS", {
      x: beforeX + 0.18, y: bodyTop, w: 1.0, h: 0.28,
      fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: C.danger,
      align: "center", valign: "middle", charSpacing: 3,
    });
    slide.addShape("roundRect", {
      x: afterX + 0.18, y: bodyTop, w: 1.0, h: 0.28,
      fill: { color: "0A1A33" }, line: { color: C.primary, width: 0.75 }, rectRadius: 0.05,
    });
    slide.addText("PLATFORM", {
      x: afterX + 0.18, y: bodyTop, w: 1.0, h: 0.28,
      fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: C.primary,
      align: "center", valign: "middle", charSpacing: 3,
    });

    addCard(slide, beforeX, baY, baColW, baH, { fill: C.surfaceAlt, border: C.danger });
    addCard(slide, afterX, baY, baColW, baH, { fill: C.surfaceAlt, border: C.primary });

    const beforeItems = [
      { label: "Reactive", desc: "Risk handling", glyph: "!" },
      { label: "Cost Center", desc: "Compliance burden", glyph: "$" },
      { label: "Data Locked", desc: "Siloed systems", glyph: "L" },
      { label: "Firefighting", desc: "Manual coordination", glyph: "✓" },
    ];
    const afterItems = [
      { label: "Proactive", desc: "Detection & prevention", glyph: "⚡" },
      { label: "Value Driver", desc: "Competitive advantage", glyph: "↗" },
      { label: "Data Unlocked", desc: "Connected insights", glyph: "U" },
      { label: "Strategic", desc: "Improvement focus", glyph: "◎" },
    ];
    const rowH = (baH - 0.3) / beforeItems.length;
    beforeItems.forEach((it, i) => {
      const ry = baY + 0.15 + i * rowH;
      addIconBadge(slide, beforeX + 0.15, ry + 0.06, 0.32, C.danger, it.glyph);
      slide.addText(it.label, {
        x: beforeX + 0.55, y: ry, w: baColW - 0.65, h: 0.24,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: C.ink, valign: "middle",
      });
      slide.addText(it.desc, {
        x: beforeX + 0.55, y: ry + 0.22, w: baColW - 0.65, h: 0.22,
        fontFace: PPTX_BRAND.font.body, fontSize: 8.5, color: C.muted, valign: "middle",
      });
    });
    afterItems.forEach((it, i) => {
      const ry = baY + 0.15 + i * rowH;
      addIconBadge(slide, afterX + 0.15, ry + 0.06, 0.32, C.primary, it.glyph);
      slide.addText(it.label, {
        x: afterX + 0.55, y: ry, w: baColW - 0.65, h: 0.24,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: C.ink, valign: "middle",
      });
      slide.addText(it.desc, {
        x: afterX + 0.55, y: ry + 0.22, w: baColW - 0.65, h: 0.22,
        fontFace: PPTX_BRAND.font.body, fontSize: 8.5, color: C.muted, valign: "middle",
      });
    });

    // Centered arrow badge between the two columns
    const arrowSize = 0.6;
    const arrowCX = lx + colW / 2;
    slide.addShape("ellipse", {
      x: arrowCX - arrowSize / 2, y: baY + baH / 2 - arrowSize / 2,
      w: arrowSize, h: arrowSize,
      fill: { color: C.primary }, line: { color: C.primary, width: 1 },
    });
    slide.addText("→", {
      x: arrowCX - arrowSize / 2, y: baY + baH / 2 - arrowSize / 2,
      w: arrowSize, h: arrowSize,
      fontFace: PPTX_BRAND.font.display, fontSize: 22, bold: true, color: C.bg,
      align: "center", valign: "middle",
    });

    // Time Allocation Shift card (below before/after)
    const taY = baY + baH + 0.22;
    const taH = bodyBottom - taY;
    addCard(slide, lx, taY, colW, taH, { fill: C.surfaceAlt });
    slide.addText("TIME ALLOCATION SHIFT", {
      x: lx + 0.2, y: taY + 0.12, w: colW - 0.4, h: 0.25,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.muted, charSpacing: 3,
    });

    const drawTimeBar = (
      label: string,
      yPos: number,
      segs: { pct: number; color: string; text?: string }[],
    ) => {
      slide.addText(label, {
        x: lx + 0.2, y: yPos, w: 0.6, h: 0.22,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "middle",
      });
      const barX = lx + 0.85;
      const barW = colW - 1.05;
      const barH = 0.24;
      let cursor = barX;
      segs.forEach((s) => {
        const sw = (barW * s.pct) / 100;
        slide.addShape("rect", {
          x: cursor, y: yPos, w: sw, h: barH,
          fill: { color: s.color }, line: { type: "none" },
        });
        if (s.text && sw > 0.5) {
          slide.addText(s.text, {
            x: cursor, y: yPos, w: sw, h: barH,
            fontFace: PPTX_BRAND.font.body, fontSize: 7, bold: true, color: "FFFFFF",
            align: "center", valign: "middle", margin: 0,
          });
        }
        cursor += sw;
      });
    };

    const TC = { coord: C.danger, admin: C.accent, improve: C.primary };
    drawTimeBar("Before", taY + 0.46, [
      { pct: 60, color: TC.coord, text: "Coordination 60%" },
      { pct: 30, color: TC.admin, text: "Admin 30%" },
      { pct: 10, color: TC.improve, text: "10%" },
    ]);
    drawTimeBar("After", taY + 0.86, [
      { pct: 10, color: TC.coord, text: "10%" },
      { pct: 20, color: TC.admin, text: "20%" },
      { pct: 70, color: TC.improve, text: "Improvement 70%" },
    ]);

    // Tiny legend
    const legY = taY + taH - 0.3;
    const legend = [
      { c: TC.coord, l: "Coordination" },
      { c: TC.admin, l: "Administration" },
      { c: TC.improve, l: "Improvement" },
    ];
    let legX = lx + 0.3;
    legend.forEach((g) => {
      slide.addShape("rect", {
        x: legX, y: legY + 0.08, w: 0.12, h: 0.12,
        fill: { color: g.c }, line: { type: "none" },
      });
      slide.addText(g.l, {
        x: legX + 0.18, y: legY, w: 1.4, h: 0.28,
        fontFace: PPTX_BRAND.font.body, fontSize: 8.5, color: C.muted, valign: "middle",
      });
      legX += 1.55;
    });

    /* ── RIGHT COLUMN ──────────────────────────────────────────── */
    // 4 value boxes (2x2) + cultural-shift quote at bottom
    slide.addText("VALUE DELIVERED", {
      x: rx, y: bodyTop, w: colW, h: 0.28,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.accent, charSpacing: 3,
    });

    const valueBoxes = [
      { title: "Schedule Protection", desc: "Fewer disruptions, faster recovery", metric: "OTP ↑ 3%", color: C.primary, glyph: "S" },
      { title: "Revenue Protection", desc: "Protected revenue through reliability", metric: "$2.3M saved", color: C.accent, glyph: "$" },
      { title: "Cost Savings", desc: "Reduced admin overhead and audit scrambles", metric: "70% less admin", color: C.cyan, glyph: "↓" },
      { title: "Customer Loyalty", desc: "Trust through consistent operations", metric: "NPS ↑", color: C.prove, glyph: "♥" },
    ];
    const vbTop = bodyTop + 0.32;
    const vbBottomReserve = 1.05; // for the quote card
    const vbAreaH = bodyBottom - vbTop - vbBottomReserve - 0.18;
    const vbCols = 2, vbRows = 2;
    const vbGap = 0.18;
    const vbW = (colW - vbGap) / vbCols;
    const vbH = (vbAreaH - vbGap) / vbRows;
    valueBoxes.forEach((v, i) => {
      const col = i % vbCols, row = Math.floor(i / vbCols);
      const x = rx + col * (vbW + vbGap);
      const y = vbTop + row * (vbH + vbGap);
      addCard(slide, x, y, vbW, vbH, { border: v.color });
      addIconBadge(slide, x + 0.15, y + 0.15, 0.4, v.color, v.glyph);
      slide.addText(v.title, {
        x: x + 0.65, y: y + 0.12, w: vbW - 0.75, h: 0.28,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: v.color, valign: "middle",
      });
      slide.addText(v.desc, {
        x: x + 0.65, y: y + 0.4, w: vbW - 0.75, h: 0.36,
        fontFace: PPTX_BRAND.font.body, fontSize: 8.5, color: C.muted, valign: "top",
      });
      slide.addText(v.metric, {
        x: x + 0.15, y: y + vbH - 0.42, w: vbW - 0.3, h: 0.32,
        fontFace: PPTX_BRAND.font.display, fontSize: 16, bold: true, color: v.color,
        align: "right", valign: "middle",
      });
    });

    // Cultural-shift quote
    const qY = bodyBottom - vbBottomReserve;
    const qH = vbBottomReserve;
    addCard(slide, rx, qY, colW, qH, { fill: C.primarySoft, border: C.primary });
    slide.addText("\u201C", {
      x: rx + 0.15, y: qY + 0.05, w: 0.4, h: qH - 0.1,
      fontFace: PPTX_BRAND.font.display, fontSize: 36, bold: true, color: C.primary, valign: "top",
    });
    slide.addText(
      [
        { text: "Point solutions manage silos.\n", options: { color: C.ink, italic: true } },
        { text: "Comply365 closes the loop.", options: { bold: true, color: C.primary } },
      ],
      {
        x: rx + 0.55, y: qY + 0.1, w: colW - 0.7, h: qH * 0.6,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, valign: "top",
      },
    );
    slide.addText(
      "From compliance burden → operational performance as competitive advantage",
      {
        x: rx + 0.55, y: qY + qH - 0.34, w: colW - 0.7, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, italic: true, valign: "middle",
      },
    );
  },
};

// ─── Customer Outcomes (mirrors src/components/shared/CustomerOutcomesSlide.tsx)
export const customerOutcomesSpec: SlideSpec = {
  label: "Customer Outcomes",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(
      slide,
      "Customer Value",
      "What This Means for Customers",
      "Connecting safety signals to measurable business outcomes.",
    );

    // Exec value-prop banner
    const banY = CONTENT_TOP;
    const banH = 0.65;
    addCard(slide, 0.5, banY, W - 1, banH, { fill: C.surface, border: C.primary });
    slide.addText(
      [
        { text: "Connect ", options: { color: C.ink } },
        { text: "safety signals to business outcomes", options: { color: C.primary, bold: true } },
        { text: ": protected schedules, protected revenue, lower costs, and loyal customers.", options: { color: C.ink } },
      ],
      {
        x: 0.7, y: banY, w: W - 1.4, h: banH,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, align: "center", valign: "middle",
      },
    );

    // Cost Center → Operational Performance → Revenue Driver strip
    const stripY = banY + banH + 0.18;
    const stripH = 0.85;
    const stripGap = 0.18;
    const stripCardW = (W - 1 - stripGap * 2 - 0.6) / 3; // arrows take ~0.3 each
    const arrowW = 0.3;
    const stripCells: { glyph: string; title: string; sub: string; color: string; fill: string }[] = [
      { glyph: "$", title: "COST CENTER", sub: "Reactive · Siloed", color: C.subtle, fill: C.surfaceAlt },
      { glyph: "◉", title: "OPERATIONAL PERFORMANCE", sub: "Connected · Proactive", color: C.primary, fill: C.primarySoft },
      { glyph: "↗", title: "REVENUE DRIVER", sub: "Protected · Growing", color: C.prove, fill: "0A1F18" },
    ];
    let csx = 0.5;
    stripCells.forEach((c, i) => {
      addCard(slide, csx, stripY, stripCardW, stripH, { fill: c.fill, border: c.color });
      addIconBadge(slide, csx + 0.18, stripY + (stripH - 0.4) / 2, 0.4, c.color, c.glyph);
      slide.addText(c.title, {
        x: csx + 0.65, y: stripY + 0.12, w: stripCardW - 0.75, h: 0.32,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: c.color, charSpacing: 3, valign: "middle",
      });
      slide.addText(c.sub, {
        x: csx + 0.65, y: stripY + 0.42, w: stripCardW - 0.75, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "middle",
      });
      csx += stripCardW;
      if (i < stripCells.length - 1) {
        slide.addText("→", {
          x: csx, y: stripY, w: arrowW, h: stripH,
          fontFace: PPTX_BRAND.font.display, fontSize: 18, bold: true,
          color: i === 0 ? C.primary : C.prove,
          align: "center", valign: "middle",
        });
        csx += arrowW;
      }
    });

    // Four outcome cards with signal/action/result
    const cardsY = stripY + stripH + 0.22;
    const ctaH = 0.7;
    const cardsH = CONTENT_BOTTOM - cardsY - ctaH - 0.18;
    const outcomes = [
      {
        title: "Schedule Protection", subtitle: "Fewer disruptions, faster recovery", color: C.primary,
        signal: "Hard landing trend detected in operational data",
        action: "Targeted pilot retraining deployed",
        result: "Fewer maintenance delays, protected departures",
      },
      {
        title: "Revenue Protection", subtitle: "Protect the schedule, protect the revenue", color: C.prove,
        signal: "Smoke & fumes cluster at regional hub",
        action: "De-icing procedure revised, ground crew retrained",
        result: "92% fewer incidents, schedule maintained",
      },
      {
        title: "Cost Savings", subtitle: "Less wear, fewer claims, less rework", color: C.amber,
        signal: "Training gaps identified via performance data",
        action: "Personalized competency modules assigned",
        result: "Reduced tire wear, fewer landing gear repairs",
      },
      {
        title: "Customer Loyalty", subtitle: "Trust through consistent operations", color: C.violet,
        signal: "Procedure confusion pattern detected",
        action: "SOP rewritten with clarity, crew retrained",
        result: "Zero incidents, on-time performance maintained",
      },
    ];
    const ocGap = 0.15;
    const ocW = (W - 1 - ocGap * 3) / 4;
    outcomes.forEach((o, i) => {
      const x = 0.5 + i * (ocW + ocGap);
      addCard(slide, x, cardsY, ocW, cardsH, { border: o.color });
      // Header
      slide.addShape("rect", { x, y: cardsY, w: ocW, h: 0.05, fill: { color: o.color }, line: { type: "none" } });
      slide.addText(o.title, {
        x: x + 0.15, y: cardsY + 0.15, w: ocW - 0.3, h: 0.3,
        fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: o.color,
      });
      slide.addText(o.subtitle, {
        x: x + 0.15, y: cardsY + 0.45, w: ocW - 0.3, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, italic: true,
      });

      // Signal / Action / Result rows (inside card)
      const rows = [
        { tag: "SIGNAL", text: o.signal, color: C.amber },
        { tag: "ACTION", text: o.action, color: C.primary },
        { tag: "RESULT", text: o.result, color: C.prove, bold: true },
      ];
      const rowsTop = cardsY + 0.85;
      const rowsAreaH = cardsH - 0.95;
      const rH = rowsAreaH / rows.length;
      rows.forEach((r, ri) => {
        const ry = rowsTop + ri * rH;
        slide.addShape("ellipse", {
          x: x + 0.18, y: ry + 0.08, w: 0.12, h: 0.12,
          fill: { color: r.color }, line: { type: "none" },
        });
        slide.addText(r.tag, {
          x: x + 0.36, y: ry + 0.04, w: ocW - 0.46, h: 0.22,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: r.color, charSpacing: 2,
        });
        slide.addText(r.text, {
          x: x + 0.36, y: ry + 0.26, w: ocW - 0.46, h: rH - 0.3,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: r.bold ? C.ink : C.muted, valign: "top",
          bold: !!r.bold,
        });
      });
    });

    // ROI CTA pill
    const ctaY = CONTENT_BOTTOM - ctaH;
    addCard(slide, 0.5, ctaY, W - 1, ctaH, { fill: C.primarySoft, border: C.primary });
    addIconBadge(slide, 0.7, ctaY + (ctaH - 0.5) / 2, 0.5, C.primary, "%");
    slide.addText("Learn more about the Platform ROI", {
      x: 1.4, y: ctaY + 0.12, w: W - 3.4, h: 0.28,
      fontFace: PPTX_BRAND.font.display, fontSize: 13, bold: true, color: C.ink,
    });
    slide.addText(
      "Explore the Interactive Calculator to model cost avoidance with your airline's numbers.",
      {
        x: 1.4, y: ctaY + 0.4, w: W - 3.4, h: 0.28,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, italic: true,
      },
    );
    slide.addText("comply365.com/line-of-sight  →", {
      x: W - 3.4, y: ctaY, w: 2.9, h: ctaH,
      fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: true, color: C.primary,
      align: "right", valign: "middle",
    });
  },
};

/* ─────────────────────────────────────────────────────────────────
   Exec3 layer-divider variants (no layer numbers, custom captions).
   ───────────────────────────────────────────────────────────────── */

const exec3IntelligenceDivider: SlideSpec = layerDividerSpec({
  label: "▸ Intelligence Layer",
  layerNumber: 3,
  layerName: "Intelligence & Orchestration",
  tagline:
    "Automation · Insights & Intelligence · CoAnalyst (Recommendations & Prescriptive Actions) — turning operational data into action.",
  active: "intelligence",
  upNext: ["Automation", "Insights & Recommendations", "CoAnalyst", "CoAnalyst vs Generic AI"],
});

const exec3MobileDivider: SlideSpec = layerDividerSpec({
  label: "▸ Mobile",
  layerNumber: 2,
  layerName: "Unified Mobile",
  tagline:
    "One trusted shell for the frontline — Content, Training and Safety in a single app the crew already uses every shift.",
  active: "mobile",
  upNext: ["Unified Mobile Experience"],
});

const exec3DtopDivider: SlideSpec = layerDividerSpec({
  label: "▸ DTOP",
  layerNumber: 1,
  layerName: "DTOP — The System of Work",
  tagline:
    "Detect → Trigger → Orchestrate → Prove. The operating model that wraps the whole stack.",
  active: "dtop",
  upNext: ["DTOP Operating Model"],
});

/* ─────────────────────────────────────────────────────────────────
   Section dividers (Regulation, Roadmap) — mirror TechSlideSectionDivider.
   ───────────────────────────────────────────────────────────────── */

function buildSectionDivider(
  slide: pptxgen.Slide,
  ctx: { logo: string; logoLight: string; index: number; total: number },
  opts: { eyebrow: string; title: string; tagline: string; upNext: string[]; accent: string },
) {
  chrome(slide, ctx);
  const accent = opts.accent;
  slide.addText(opts.eyebrow.toUpperCase(), {
    x: 0.6, y: 1.7, w: 12, h: 0.4,
    fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true, color: accent, charSpacing: 6,
  });
  slide.addText(opts.title, {
    x: 0.6, y: 2.15, w: 12, h: 1.2,
    fontFace: PPTX_BRAND.font.display, fontSize: 44, bold: true, color: C.ink,
  });
  slide.addText(opts.tagline, {
    x: 0.6, y: 3.45, w: 12, h: 1.0,
    fontFace: PPTX_BRAND.font.body, fontSize: 14, color: C.muted, italic: true,
  });
  slide.addText("UP NEXT IN THIS SECTION", {
    x: 0.6, y: 4.7, w: 8, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.muted, charSpacing: 4,
  });
  opts.upNext.forEach((item, i) => {
    slide.addShape("rect", {
      x: 0.6, y: 5.1 + i * 0.36, w: 0.04, h: 0.22,
      fill: { color: accent }, line: { type: "none" },
    });
    slide.addText(item, {
      x: 0.78, y: 5.03 + i * 0.36, w: 11, h: 0.32,
      fontFace: PPTX_BRAND.font.body, fontSize: 13, color: C.ink,
    });
  });
}

const sectionDividerSpec = (opts: {
  label: string;
  eyebrow: string;
  title: string;
  tagline: string;
  upNext: string[];
  accent: string;
}): SlideSpec => ({
  label: opts.label,
  build: (slide, ctx) => buildSectionDivider(slide, ctx, opts),
});

const exec3RegulationDivider = sectionDividerSpec({
  label: "▸ Regulation Management",
  eyebrow: "Section · Regulation in motion",
  title: "Regulation Management",
  tagline:
    "Turning a constant stream of regulatory change into traceable, in-app updates — without slowing the operation.",
  upNext: ["Regulation Management Capability Summary"],
  accent: C.violet,
});

const exec3RoadmapDivider = sectionDividerSpec({
  label: "▸ 2026 Phased Roadmap",
  eyebrow: "Section · What's next",
  title: "2026 Phased Roadmap",
  tagline:
    "How the platform extends across Insights, Automation and Mobile through 2026 — locked dates and committed phases.",
  upNext: ["Insights · Automation · Mobile · Phase Plan"],
  accent: C.amber,
});

/* ─────────────────────────────────────────────────────────────────
   Insights — Just Ask (mirrors IRSlide2WhatIs with showWorkflow=true).
   ───────────────────────────────────────────────────────────────── */

const insightsJustAskSpec: SlideSpec = {
  label: "Insights — Just Ask",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(
      slide,
      "The Platform · Insights & Intelligence",
      "A platform-wide intelligence capability — just by asking",
      "Ask in plain English · get cross-domain answers and recommended actions.",
    );

    const lx = 0.5;
    const colW = W - 1;

    // 1) One-liner pitch card
    const pY = CONTENT_TOP;
    const pH = 0.8;
    addCard(slide, lx, pY, colW, pH, { fill: C.primarySoft, border: C.primary });
    slide.addText(elevatorPitch.oneLiner, {
      x: lx + 0.25, y: pY, w: colW - 0.5, h: pH,
      fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.ink, valign: "middle",
    });

    // 2) Ask / Get back row
    const aY = pY + pH + 0.2;
    const aH = 1.2;
    const gap = 0.2;
    const halfW = (colW - gap) / 2;
    addCard(slide, lx, aY, halfW, aH, { fill: C.surfaceAlt, border: C.amber });
    slide.addText("ASK", {
      x: lx + 0.2, y: aY + 0.12, w: halfW - 0.4, h: 0.25,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.amber, charSpacing: 3,
    });
    slide.addText(`"${elevatorPitch.exampleQuestion}"`, {
      x: lx + 0.2, y: aY + 0.42, w: halfW - 0.4, h: aH - 0.5,
      fontFace: PPTX_BRAND.font.display, fontSize: 14, color: C.ink, valign: "top",
    });

    const gx = lx + halfW + gap;
    addCard(slide, gx, aY, halfW, aH, { fill: C.surfaceAlt, border: C.prove });
    slide.addText("GET BACK", {
      x: gx + 0.2, y: aY + 0.12, w: halfW - 0.4, h: 0.25,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.prove, charSpacing: 3,
    });
    slide.addText(elevatorPitch.exampleAnswer, {
      x: gx + 0.2, y: aY + 0.42, w: halfW - 0.4, h: aH - 0.5,
      fontFace: PPTX_BRAND.font.body, fontSize: 10.5, color: C.ink, valign: "top",
    });

    // 3) Workflow row · 6 stages
    const wY = aY + aH + 0.3;
    slide.addText("HOW IT WORKS · BEHIND THE ANSWER", {
      x: lx, y: wY, w: colW * 0.7, h: 0.28,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.muted, charSpacing: 3,
    });
    slide.addText("6 STAGES · SECONDS END-TO-END", {
      x: lx + colW * 0.7, y: wY, w: colW * 0.3, h: 0.28,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.primary, charSpacing: 3,
      align: "right",
    });

    const stages = [
      { label: "Plain-English question", desc: "Captured in-app and parsed against the aviation taxonomy.", color: C.amber },
      { label: "Connected operational data", desc: "Safety, content, training & ops pulled into a unified, tenant-isolated context.", color: C.cyan },
      { label: "Domain knowledge graph", desc: "4,000+ aviation categories at 5 levels link entities, events and procedures.", color: C.violet },
      { label: "Domain-trained reasoning", desc: "Aviation ML models guide the LLM — cited evidence, no hallucinated micro-classifications.", color: C.primary },
      { label: "Guardrails & audit trail", desc: "Tenant isolation, source citations, full traceability for every answer.", color: C.prove },
      { label: "Insight + Recommended Action", desc: "Plain-English answer plus the next best action, ready to trigger in-app.", color: C.danger },
    ];
    const sY = wY + 0.36;
    const sH = CONTENT_BOTTOM - sY;
    const sGap = 0.12;
    const sW = (colW - sGap * (stages.length - 1)) / stages.length;
    stages.forEach((s, i) => {
      const x = lx + i * (sW + sGap);
      addCard(slide, x, sY, sW, sH, { border: s.color, fill: C.surfaceAlt });
      slide.addText(`0${i + 1}`, {
        x: x + sW - 0.55, y: sY + 0.1, w: 0.45, h: 0.2,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.muted, align: "right",
      });
      slide.addText(s.label, {
        x: x + 0.2, y: sY + 0.32, w: sW - 0.4, h: 0.6,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: s.color, valign: "top",
      });
      slide.addText(s.desc, {
        x: x + 0.2, y: sY + 1.0, w: sW - 0.4, h: sH - 1.1,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "top",
      });
    });
  },
};

/* ─────────────────────────────────────────────────────────────────
   CoAnalyst (mirrors TechV4Slide7CoAnalyst — apps × capabilities matrix).
   ───────────────────────────────────────────────────────────────── */

const coAnalystSpec: SlideSpec = {
  label: "CoAnalyst",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(
      slide,
      "The Platform · CoAnalyst",
      "Domain-trained intelligence — embedded in every application",
      "Ask in plain English · cross-domain insight · recommended next actions.",
    );

    const apps = [
      { name: "SafetyManager365", short: "Safety", color: C.danger, status: "Available" },
      { name: "ContentManager365", short: "Content", color: C.cyan, status: "On roadmap" },
      { name: "TrainingManager365", short: "Training", color: C.prove, status: "On roadmap" },
    ];
    const capabilities = [
      {
        name: "Ask in plain English",
        blurb: "Natural-language questions answered with cited evidence from the application's own data.",
      },
      {
        name: "Cross-domain insight & root cause",
        blurb: "Connect signals already in-app to surface why something is happening — not just what.",
      },
      {
        name: "Recommended next actions",
        blurb: "Turn insight into prescriptive guidance the team can act on immediately, in-app.",
      },
    ];

    const lx = 0.5;
    const totalW = W - 1;
    const labelColW = 3.2;
    const appColW = (totalW - labelColW) / apps.length;
    const top = CONTENT_TOP;
    const headerH = 0.55;
    const rowsH = CONTENT_BOTTOM - top - headerH - 0.1;
    const rowH = rowsH / capabilities.length;

    // App headers
    apps.forEach((a, i) => {
      const x = lx + labelColW + i * appColW;
      addCard(slide, x + 0.05, top, appColW - 0.1, headerH, { fill: C.surfaceAlt, border: a.color });
      slide.addText(a.name, {
        x: x + 0.15, y: top + 0.05, w: appColW - 0.3, h: 0.28,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: a.color, valign: "middle",
      });
      slide.addText(a.status, {
        x: x + 0.15, y: top + 0.3, w: appColW - 0.3, h: 0.22,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.muted, italic: true,
      });
    });

    // Capability rows
    capabilities.forEach((cap, ri) => {
      const ry = top + headerH + 0.1 + ri * rowH;
      // Label cell
      addCard(slide, lx, ry, labelColW - 0.1, rowH - 0.1, { fill: C.surface, border: C.primary });
      slide.addText(cap.name, {
        x: lx + 0.18, y: ry + 0.12, w: labelColW - 0.4, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: C.primary,
      });
      slide.addText(cap.blurb, {
        x: lx + 0.18, y: ry + 0.55, w: labelColW - 0.4, h: rowH - 0.7,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "top",
      });
      // App cells
      apps.forEach((a, ai) => {
        const x = lx + labelColW + ai * appColW;
        addCard(slide, x + 0.05, ry, appColW - 0.1, rowH - 0.1, { fill: C.surfaceAlt, border: C.hairline });
        slide.addShape("ellipse", {
          x: x + 0.18, y: ry + 0.18, w: 0.18, h: 0.18,
          fill: { color: a.color }, line: { type: "none" },
        });
        slide.addText(`Embedded in ${a.short}`, {
          x: x + 0.42, y: ry + 0.1, w: appColW - 0.55, h: 0.32,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, bold: true, color: C.ink, valign: "middle",
        });
        slide.addText(
          ai === 0
            ? "Live and in production with anchor customers."
            : "Same engine, same UX — sequenced after Safety.",
          {
            x: x + 0.18, y: ry + 0.46, w: appColW - 0.3, h: rowH - 0.6,
            fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "top",
          },
        );
      });
    });
  },
};

/* ─────────────────────────────────────────────────────────────────
   Build the deck.
   ───────────────────────────────────────────────────────────────── */

export async function buildExecutivePitch3Deck(opts: BuildOpts = {}): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: "WIDE_16_9", width: PPTX_BRAND.size.w, height: PPTX_BRAND.size.h });
  pptx.layout = "WIDE_16_9";
  pptx.title = "Comply365 — Executive Pitch (Medium)";
  pptx.author = "Comply365";
  pptx.company = "Comply365";

  const logo = await loadImageAsBase64(logoUrlDark).catch(() => "");
  const logoLight = await loadImageAsBase64(logoUrlLight).catch(() => "");

  // Lookup helpers — pull specs out of the shared Tech registry by label.
  const byLabel = (label: string): SlideSpec => {
    const s = slideSpecs.find((x) => x.label === label);
    if (!s) throw new Error(`Exec3 PPTX exporter: missing slide spec "${label}"`);
    return s;
  };

  // Compose slides in the exact order from src/pages/ExecutivePitch3.tsx.
  const composed: SlideSpec[] = [
    openerSpec,                                    // 1 · Title
    byLabel("Strategic Shift"),                    // 2
    customerOutcomesSpec,                          // 3 · What This Means for Customers
    byLabel("Platform Overview"),                  // 4 · The Platform
    exec3DtopDivider,                              // 5 · ▸ DTOP
    byLabel("DTOP Operating Model"),               // 6
    exec3MobileDivider,                            // 7 · ▸ Mobile
    byLabel("Unified Mobile"),                     // 8
    exec3IntelligenceDivider,                      // 9 · ▸ Intelligence Layer
    byLabel("Automation"),                         // 10
    insightsJustAskSpec,                           // 11 · Insights — Just Ask
    byLabel("CoAnalyst"),                          // 12
    byLabel("Tiers vs Generic AI"),                // 13 · CoAnalyst vs Generic AI
    byLabel("Recommendations & Prescriptive Actions"), // 14
    exec3RegulationDivider,                        // 15
    regulationSummarySpec,                         // 16
    exec3RoadmapDivider,                           // 17
    byLabel("2026 Roadmap"),                       // 18
    byLabel("Why Comply365"),                      // 19
  ];

  const total = composed.length;

  for (let i = 0; i < composed.length; i++) {
    const spec = composed[i];
    opts.onProgress?.(i, total, spec.label);
    const slide = pptx.addSlide();
    try {
      // Override the deck label on every slide via a wrapped chrome — we
      // do this by replacing the chrome master after the fact: not supported
      // by pptxgen, so we instead patch the footer label directly.
      await spec.build(slide, { logo, logoLight, index: i, total });
      // After the spec drew its own chrome (which used the *Tech* deck label),
      // overpaint the bottom-left footer label so it reads "Executive Pitch · Medium".
      // We cover the old text with a thin filled rect that matches the bg, then
      // re-render the label in the same position used by addBrandMaster().
      const C2 = PPTX_BRAND.color;
      slide.addShape("rect", {
        x: 0.42, y: PPTX_BRAND.size.h - 0.38, w: 5.8, h: 0.3,
        fill: { color: C2.bg }, line: { type: "none" },
      });
      slide.addText(DECK_LABEL, {
        x: 0.42, y: PPTX_BRAND.size.h - 0.38, w: 5.8, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C2.muted,
      });
    } catch (err) {
      console.error(`Exec3 PPTX slide ${i} (${spec.label}) failed:`, err);
      paintBackground(slide, "dark");
      slide.addText(`Slide failed to render: ${spec.label}\n${(err as Error)?.message ?? ""}`, {
        x: 1, y: 3, w: 11.3, h: 1.5,
        fontFace: PPTX_BRAND.font.body, fontSize: 18, color: C.danger, align: "center",
      });
    }
  }

  opts.onProgress?.(total, total, "Packaging…");
  // Suppress unused-import warning for helpers we keep available for future tweaks.
  void addLabeledCard;
  void addEyebrow;
  void addBrandMaster;
  void addBrandStatBlock;
  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  return blob;
}