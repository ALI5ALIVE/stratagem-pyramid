import pptxgen from "pptxgenjs";
import {
  PPTX_BRAND,
  paintBackground,
  addBrandedFooter,
  addCard,
  addStatTile,
  addBrandLogo,
  loadImageAsBase64,
  addEyebrow,
  addSectionTitle,
  addLabeledCard,
  addPill,
  addPillRow,
  addStepArrow,
  addCheckRow,
  addDivider,
  addIconBadge,
  addDtopPills,
  addBrandMaster,
  addSectionDivider,
  addBrandStatBlock,
  addCalloutBanner,
  addGlowWash,
} from "@/lib/pptxBrand";
import logoUrl from "@/assets/comply365-logo-white.png";
import {
  useCases,
  methodologyNote,
  leadingMeasures,
  executiveOutcomes,
  sourceCitations,
} from "@/data/lineOfSightData";

const C = PPTX_BRAND.color;
const W = PPTX_BRAND.size.w;
const H = PPTX_BRAND.size.h;
const DECK_LABEL = "Technical Deep Dive";

export interface BuildOpts {
  onProgress?: (current: number, total: number, label: string) => void;
}

interface SlideSpec {
  label: string;
  build: (slide: pptxgen.Slide, ctx: { logo: string; index: number; total: number }) => Promise<void> | void;
}

const fmtMoney = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

function chrome(slide: pptxgen.Slide, ctx: { logo: string; index: number; total: number }) {
  addBrandMaster(slide, {
    logo: ctx.logo,
    index: ctx.index,
    total: ctx.total,
    deckLabel: DECK_LABEL,
    variant: "dark",
    grid: true,
  });
}

function header(
  slide: pptxgen.Slide,
  eyebrow: string,
  title: string,
  subtitle?: string,
) {
  addEyebrow(slide, 0.5, 0.45, 12, eyebrow);
  slide.addText(title, {
    x: 0.5, y: 0.72, w: 12.3, h: 0.55,
    fontFace: PPTX_BRAND.font.display, fontSize: 24, bold: true, color: C.ink,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 1.25, w: 12.3, h: 0.45,
      fontFace: PPTX_BRAND.font.body, fontSize: 12, color: C.muted, italic: true,
    });
  }
}

const CONTENT_TOP = 1.85;
const CONTENT_BOTTOM = 6.85;

// Layer accent colours — match the React PlatformArchitectureDiagram tokens.
const LAYER_ACCENT: Record<"core" | "data" | "intelligence" | "mobile" | "dtop", string> = {
  core: "60A5FA",         // blue-400
  data: "22D3EE",         // cyan-400
  intelligence: "F59E0B", // amber-500
  mobile: "A78BFA",       // violet-400
  dtop: "34D399",         // emerald-400
};

const LAYER_STACK: { key: keyof typeof LAYER_ACCENT; label: string }[] = [
  { key: "dtop",         label: "Layer 5 · DTOP — System of Work" },
  { key: "mobile",       label: "Layer 4 · Unified Mobile Experience" },
  { key: "intelligence", label: "Layer 3 · Intelligence & Orchestration" },
  { key: "data",         label: "Layer 2 · Operational Data Foundation" },
  { key: "core",         label: "Layer 1 · Core Operational Apps" },
];

function buildLayerDivider(
  slide: pptxgen.Slide,
  ctx: { logo: string; index: number; total: number },
  opts: { layerNumber: number; layerName: string; tagline: string; active: keyof typeof LAYER_ACCENT; upNext: string[] },
) {
  chrome(slide, ctx);
  const accent = LAYER_ACCENT[opts.active];

  // Eyebrow
  slide.addText(`LAYER ${opts.layerNumber} · ARCHITECTURE`, {
    x: 0.6, y: 1.7, w: 8, h: 0.4,
    fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true, color: accent, charSpacing: 6,
  });
  // Title
  slide.addText(opts.layerName, {
    x: 0.6, y: 2.15, w: 8, h: 1.1,
    fontFace: PPTX_BRAND.font.display, fontSize: 44, bold: true, color: C.ink,
  });
  // Tagline
  slide.addText(opts.tagline, {
    x: 0.6, y: 3.35, w: 8, h: 1.0,
    fontFace: PPTX_BRAND.font.body, fontSize: 14, color: C.muted, italic: true,
  });
  // "Up next in this layer"
  slide.addText("UP NEXT IN THIS LAYER", {
    x: 0.6, y: 4.55, w: 8, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.muted, charSpacing: 4,
  });
  opts.upNext.forEach((item, i) => {
    slide.addShape("rect", {
      x: 0.6, y: 4.95 + i * 0.36, w: 0.04, h: 0.22,
      fill: { color: accent }, line: { type: "none" },
    });
    slide.addText(item, {
      x: 0.78, y: 4.88 + i * 0.36, w: 7.5, h: 0.32,
      fontFace: PPTX_BRAND.font.body, fontSize: 13, color: C.ink,
    });
  });

  // Right: 5-row mini stack with active layer lit
  const stackX = 9.1;
  const stackW = 3.7;
  const stackY = 1.7;
  const rowH = 0.78;
  const gap = 0.12;
  slide.addText("YOU ARE HERE", {
    x: stackX, y: stackY - 0.45, w: stackW, h: 0.3,
    fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.muted, charSpacing: 4, align: "right",
  });
  LAYER_STACK.forEach((l, i) => {
    const isActive = l.key === opts.active;
    const y = stackY + i * (rowH + gap);
    const layerAccent = LAYER_ACCENT[l.key];
    slide.addShape("roundRect", {
      x: stackX, y, w: stackW, h: rowH,
      fill: { color: isActive ? layerAccent : "1A1F2E", transparency: isActive ? 80 : 70 },
      line: { color: isActive ? layerAccent : C.hairline, width: isActive ? 1.5 : 0.5 },
      rectRadius: 0.08,
    });
    if (isActive) {
      slide.addShape("rect", {
        x: stackX, y, w: 0.06, h: rowH,
        fill: { color: layerAccent }, line: { type: "none" },
      });
    }
    slide.addText(l.label, {
      x: stackX + 0.2, y, w: stackW - 0.3, h: rowH,
      fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: isActive,
      color: isActive ? layerAccent : C.muted,
      valign: "middle",
    });
  });
}

const dividerSpec = (opts: {
  label: string;
  layerNumber: number;
  layerName: string;
  tagline: string;
  active: keyof typeof LAYER_ACCENT;
  upNext: string[];
}): SlideSpec => ({
  label: opts.label,
  build: (slide, ctx) => buildLayerDivider(slide, ctx, opts),
});

const slideSpecs: SlideSpec[] = [
  // ─── 0. TITLE ──────────────────────────────────────────────────
  {
    label: "Title",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      // Subtle wordmark watermark (very low contrast)
      slide.addText("comply365", {
        x: 0.5, y: 4.0, w: W - 1, h: 1.6,
        fontFace: PPTX_BRAND.font.display, fontSize: 130, bold: true,
        color: C.wordmarkInk, align: "center",
      });
      slide.addText("THE COMPLETE PLATFORM STORY", {
        x: 0.5, y: 1.9, w: 12.3, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true, color: C.primary, charSpacing: 6, align: "center",
      });
      slide.addText([
        { text: "Operational Performance\n", options: { color: C.ink } },
        { text: "Platform", options: { color: C.primary } },
      ], {
        x: 0.5, y: 2.4, w: 12.3, h: 2.0,
        fontFace: PPTX_BRAND.font.display, fontSize: 56, bold: true, align: "center",
      });
      slide.addText(
        "The technical deep-dive: architecture, intelligence, every use case costed, and your roadmap to predictable, measurable, provable operations.",
        {
          x: 1.5, y: 4.6, w: 10.3, h: 0.9,
          fontFace: PPTX_BRAND.font.body, fontSize: 14, color: C.muted, align: "center",
        },
      );
      const stats = [
        { v: "550+", l: "Airlines Worldwide", c: C.primary },
        { v: "~2.5M", l: "Users", c: C.accent },
        { v: "6", l: "Continents", c: C.violet },
      ];
      const tileW = 2.4, tileH = 0.95, gap = 0.3;
      const totalW = stats.length * tileW + (stats.length - 1) * gap;
      let x = (W - totalW) / 2;
      stats.forEach((s) => {
        addBrandStatBlock(slide, x, 5.65, tileW, tileH, s.v, s.l, s.c);
        x += tileW + gap;
      });
      addDtopPills(slide, 0.7, 6.85 - 0.55, W - 1.4);
    },
  },

  // ─── 1. STRATEGIC SHIFT ───────────────────────────────────────
  {
    label: "Strategic Shift",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Frame the problem", "The Strategic Shift",
        "From point tools to an Operational Performance Platform — and why the category exists now");

      const before = [
        "Standalone SMS for safety reporting",
        "Separate document management for procedures",
        "Disconnected LMS for training records",
        "Manual compliance evidence collection",
        "Siloed data — no cross-functional intelligence",
      ];
      const after = [
        "Connected safety, content & training platform",
        "Automated detect → trigger → orchestrate → prove",
        "Intelligence layer linking every operational signal",
        "Continuous compliance evidence by default",
        "Single source of operational truth",
      ];

      const colW = 5.85, colH = 2.7;
      // Today
      slide.addShape("roundRect", {
        x: 0.5, y: CONTENT_TOP, w: colW, h: colH,
        fill: { color: "1F0A12" }, line: { color: C.danger, width: 1 }, rectRadius: 0.1,
      });
      slide.addText("✕  TODAY: POINT TOOLS", {
        x: 0.7, y: CONTENT_TOP + 0.15, w: colW - 0.4, h: 0.35,
        fontFace: PPTX_BRAND.font.display, fontSize: 13, bold: true, color: C.danger, charSpacing: 3,
      });
      slide.addText(before.map((t) => ({ text: t, options: { bullet: { code: "25CF" } } })), {
        x: 0.85, y: CONTENT_TOP + 0.55, w: colW - 0.5, h: colH - 0.7,
        fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.muted, paraSpaceAfter: 6,
      });

      // Arrow
      slide.addText("➜", {
        x: colW + 0.5, y: CONTENT_TOP + colH / 2 - 0.3, w: 0.4, h: 0.6,
        fontFace: PPTX_BRAND.font.display, fontSize: 28, color: C.primary, align: "center", valign: "middle",
      });

      // Tomorrow
      const x2 = W - 0.5 - colW;
      slide.addShape("roundRect", {
        x: x2, y: CONTENT_TOP, w: colW, h: colH,
        fill: { color: "0A1F18" }, line: { color: C.prove, width: 1 }, rectRadius: 0.1,
      });
      slide.addText("✓  TOMORROW: CONNECTED PLATFORM", {
        x: x2 + 0.2, y: CONTENT_TOP + 0.15, w: colW - 0.4, h: 0.35,
        fontFace: PPTX_BRAND.font.display, fontSize: 13, bold: true, color: C.prove, charSpacing: 3,
      });
      slide.addText(after.map((t) => ({ text: t, options: { bullet: { code: "25CF" } } })), {
        x: x2 + 0.35, y: CONTENT_TOP + 0.55, w: colW - 0.5, h: colH - 0.7,
        fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.muted, paraSpaceAfter: 6,
      });

      // Drivers
      const drivers = [
        { label: "Regulatory Pressure", desc: "EASA/FAA demanding proactive safety management evidence" },
        { label: "Data Explosion", desc: "12K+ monthly signals across reports, audits, training — mostly orphaned" },
        { label: "AI Maturity", desc: "Domain-specific AI now accurate enough for aviation categorisation" },
        { label: "Cost Pressure", desc: "Airlines can no longer afford fragmented, reactive operations" },
      ];
      const dY = CONTENT_TOP + colH + 0.2;
      const dW = (W - 1 - 3 * 0.2) / 4;
      const dH = CONTENT_BOTTOM - dY;
      drivers.forEach((d, i) => {
        addLabeledCard(slide, 0.5 + i * (dW + 0.2), dY, dW, dH, {
          eyebrow: d.label, title: "", body: d.desc, accent: C.primary, titleSize: 1, bodySize: 10,
        });
      });
    },
  },

  // ─── 2. INDUSTRY CHALLENGE ────────────────────────────────────
  {
    label: "Industry Challenge",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Frame the problem", "The Industry Challenge",
        "The daily reality of fragmented operations — and the cost of inaction");

      const pains = [
        { label: "12K+ signals/month", sub: "Across operational data, reports, audits" },
        { label: "8K+ orphaned", sub: "No connected response" },
        { label: "3-week investigations", sub: "Manual evidence gathering" },
        { label: "Same events recur", sub: "No closed-loop learning" },
      ];
      const pY = CONTENT_TOP;
      const pW = (W - 1 - 3 * 0.2) / 4;
      pains.forEach((p, i) => {
        const x = 0.5 + i * (pW + 0.2);
        addCard(slide, x, pY, pW, 0.95, { border: C.danger });
        addIconBadge(slide, x + 0.18, pY + 0.18, 0.55, C.danger, "!");
        slide.addText(p.label, {
          x: x + 0.85, y: pY + 0.13, w: pW - 1, h: 0.32,
          fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: C.ink,
        });
        slide.addText(p.sub, {
          x: x + 0.85, y: pY + 0.45, w: pW - 1, h: 0.4,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted,
        });
      });

      // Cost waterfall
      const ucCosts = useCases.map((uc) => ({
        label: uc.label,
        annual: uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor,
        sev: uc.input.severity,
      }));
      const total = ucCosts.reduce((s, u) => s + u.annual, 0);
      const sorted = [...ucCosts].sort((a, b) => b.annual - a.annual);
      const max = sorted[0]?.annual || 1;

      const wfTop = pY + 1.15;
      const wfBottom = CONTENT_BOTTOM - 1.45;
      const rowH = (wfBottom - wfTop) / sorted.length;
      const labelW = 2.2;
      const sevW = 0.7;
      const barMaxW = W - 1 - labelW - sevW - 0.3;

      sorted.forEach((u, i) => {
        const ry = wfTop + i * rowH;
        slide.addText(u.label, {
          x: 0.5, y: ry, w: labelW, h: rowH - 0.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, align: "right", valign: "middle",
        });
        const bw = Math.max((u.annual / max) * barMaxW, 0.5);
        const bx = 0.5 + labelW + 0.15;
        slide.addShape("roundRect", {
          x: bx, y: ry + 0.04, w: bw, h: rowH - 0.13,
          fill: { color: C.danger }, line: { type: "none" }, rectRadius: 0.04,
        });
        slide.addText(`${fmtMoney(u.annual)}/yr`, {
          x: bx + 0.1, y: ry + 0.04, w: bw - 0.2, h: rowH - 0.13,
          fontFace: PPTX_BRAND.font.display, fontSize: 9, bold: true, color: C.ink, valign: "middle",
        });
        slide.addText(u.sev, {
          x: bx + bw + 0.1, y: ry, w: sevW, h: rowH - 0.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.subtle, valign: "middle",
        });
      });

      // Total banner
      const tY = CONTENT_BOTTOM - 1.25;
      slide.addShape("roundRect", {
        x: 0.5, y: tY, w: W - 1, h: 0.55,
        fill: { color: "1F0A12" }, line: { color: C.danger, width: 1 }, rectRadius: 0.1,
      });
      slide.addText(`${fmtMoney(total)}`, {
        x: 0.7, y: tY, w: 2, h: 0.55,
        fontFace: PPTX_BRAND.font.display, fontSize: 20, bold: true, color: C.danger, valign: "middle",
      });
      slide.addText("per year — total annual cost of operational fragmentation across 8 costed use cases", {
        x: 2.7, y: tY, w: W - 3.2, h: 0.55,
        fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.muted, valign: "middle",
      });
      // Citation chip strip
      const citY = tY + 0.65;
      slide.addText("SOURCES", {
        x: 0.5, y: citY, w: 0.9, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: C.subtle, charSpacing: 3, valign: "middle",
      });
      const citationSources = ["EUROCONTROL", "IATA", "A4A", "SITA", "WTW", "Flight Safety Foundation", "FAA", "Oliver Wyman"];
      const chipH = 0.25;
      const chipGap = 0.06;
      let cx = 1.4;
      citationSources.forEach((src) => {
        const chipW = Math.max(0.8, src.length * 0.075 + 0.2);
        if (cx + chipW > W - 0.5) return;
        slide.addShape("roundRect", {
          x: cx, y: citY, w: chipW, h: chipH,
          fill: { color: C.surfaceAlt }, line: { color: C.hairline, width: 0.5 }, rectRadius: chipH / 2,
        });
        slide.addText(src, {
          x: cx, y: citY, w: chipW, h: chipH,
          fontFace: PPTX_BRAND.font.body, fontSize: 7.5, color: C.muted, align: "center", valign: "middle",
        });
        cx += chipW + chipGap;
      });
    },
  },

  // ─── 3. PLATFORM OVERVIEW ─────────────────────────────────────
  {
    label: "Platform Overview",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Architecture", "The Operational Performance Platform",
        "Five layers. One platform. Wired together by DTOP.");

      const layers = [
        { tag: "LAYER 5", title: "DTOP — The Way of Working", desc: "Detect, Trigger, Orchestrate, Prove — wraps the whole stack.", color: C.prove },
        { tag: "LAYER 4", title: "Unified Mobile", desc: "One trusted shell for the frontline — Content, Training, Safety.", color: C.violet },
        { tag: "LAYER 3", title: "Intelligence & Orchestration", desc: "Insights & Intelligence · Recommendations & Prescriptive Actions · Automation.", color: C.amber },
        { tag: "LAYER 2", title: "Operational Data Foundation", desc: "One unified data lake — the substrate every layer reasons over.", color: C.cyan },
        { tag: "LAYER 1", title: "Core Operational Apps", desc: "ContentManager365 · TrainingManager365 · SafetyManager365.", color: C.blue },
      ];
      const ly = CONTENT_TOP;
      const lh = (CONTENT_BOTTOM - ly - 0.1) / 5;
      layers.forEach((l, i) => {
        const y = ly + i * lh;
        addCard(slide, 0.5, y + 0.05, W - 1, lh - 0.1, { border: l.color });
        // colour bar left
        slide.addShape("rect", {
          x: 0.5, y: y + 0.05, w: 0.12, h: lh - 0.1,
          fill: { color: l.color }, line: { type: "none" },
        });
        slide.addText(l.tag, {
          x: 0.75, y: y + 0.13, w: 1.4, h: 0.3,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: l.color, charSpacing: 3,
        });
        slide.addText(l.title, {
          x: 2.2, y: y + 0.1, w: 4.5, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 13, bold: true, color: C.ink, valign: "middle",
        });
        slide.addText(l.desc, {
          x: 6.8, y: y + 0.1, w: W - 7.3, h: lh - 0.2,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, valign: "middle",
        });
      });
    },
  },
];

// Helper for the three "core app" slides — same template, different content
function buildModuleSlide(opts: {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent: string;
  capsTitle: string;
  capabilities: { label: string; desc: string }[];
  flowTitle: string;
  flow: { step: string; desc: string }[];
  caption: string;
}) {
  return (slide: pptxgen.Slide, ctx: { logo: string; index: number; total: number }) => {
    chrome(slide, ctx);
    header(slide, opts.eyebrow, opts.title, opts.subtitle);

    const colW = (W - 1 - 0.3) / 2;
    // Left: capabilities
    slide.addText(opts.capsTitle.toUpperCase(), {
      x: 0.5, y: CONTENT_TOP, w: colW, h: 0.3,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: opts.accent, charSpacing: 3,
    });
    const capsY = CONTENT_TOP + 0.35;
    const capsH = CONTENT_BOTTOM - capsY;
    const cw = (colW - 0.2) / 2;
    const ch = (capsH - 2 * 0.15) / 3;
    opts.capabilities.slice(0, 6).forEach((c, i) => {
      const cx = 0.5 + (i % 2) * (cw + 0.2);
      const cy = capsY + Math.floor(i / 2) * (ch + 0.15);
      addLabeledCard(slide, cx, cy, cw, ch, {
        title: c.label, body: c.desc, accent: opts.accent, titleSize: 11, bodySize: 9,
      });
    });

    // Right: data flow
    const rx = 0.5 + colW + 0.3;
    slide.addText(opts.flowTitle, {
      x: rx, y: CONTENT_TOP, w: colW, h: 0.32,
      fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: opts.accent,
    });
    const fy = CONTENT_TOP + 0.4;
    const fh = (CONTENT_BOTTOM - fy - 0.3) / opts.flow.length;
    opts.flow.forEach((f, i) => {
      const y = fy + i * fh;
      // numbered dot
      slide.addShape("ellipse", {
        x: rx, y: y + 0.05, w: 0.42, h: 0.42,
        fill: { color: opts.accent }, line: { type: "none" },
      });
      slide.addText(`${i + 1}`, {
        x: rx, y: y + 0.05, w: 0.42, h: 0.42,
        fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color: C.bg, align: "center", valign: "middle",
      });
      slide.addText(f.step, {
        x: rx + 0.55, y: y + 0.04, w: colW - 0.55, h: 0.3,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: C.ink,
      });
      slide.addText(f.desc, {
        x: rx + 0.55, y: y + 0.34, w: colW - 0.55, h: fh - 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "top",
      });
    });

    slide.addText(opts.caption, {
      x: rx, y: CONTENT_BOTTOM - 0.25, w: colW, h: 0.25,
      fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.subtle, italic: true, align: "center",
    });
  };
}

slideSpecs.push(
  // ─── 4. SAFETY MANAGER 365 ────────────────────────────────────
  dividerSpec({
    label: "▸ Layer 1 · Core Operational Apps",
    layerNumber: 1,
    layerName: "Core Operational Apps",
    tagline: "ContentManager365 · TrainingManager365 · SafetyManager365 — the systems of record that emit every operational event.",
    active: "core",
    upNext: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  }),
  {
    label: "SafetyManager365",
    build: buildModuleSlide({
      eyebrow: "Architecture",
      title: "Core Operational Apps — SafetyManager365",
      subtitle: "Advanced Safety, Quality & Risk Management — from reactive reporting to predictive safety intelligence",
      accent: C.rose,
      capsTitle: "Core Capabilities",
      capabilities: [
        { label: "SMS Event Reporting", desc: "Capture safety events across all operations with structured taxonomy" },
        { label: "Investigation Workflows", desc: "Guided root-cause analysis with evidence attachment and tracking" },
        { label: "Flight Data Analysis", desc: "Automated flight data monitoring with exceedance detection" },
        { label: "Audit Management", desc: "Internal and regulatory audit scheduling, findings, and corrective actions" },
        { label: "Hazard Register", desc: "Centralised hazard identification, assessment, and mitigation tracking" },
        { label: "Risk Assessment", desc: "Quantitative risk matrices with trend analysis and threshold alerts" },
      ],
      flowTitle: "How Insights & Intelligence Activates Safety Data",
      flow: [
        { step: "Safety Events", desc: "Reports, operational data, audit findings flow in" },
        { step: "Pattern Detection", desc: "Insights & Intelligence identifies recurring themes across 4,000+ categories" },
        { step: "Risk Prediction", desc: "Proactive alerts surface emerging hazards before incidents" },
        { step: "Recommended Action", desc: "Automated triggers to training, procedures and management review" },
      ],
      caption: "Every safety signal becomes a connected data point — not an isolated report.",
    }),
  },
  // ─── 5. CONTENT MANAGER 365 ───────────────────────────────────
  {
    label: "ContentManager365",
    build: buildModuleSlide({
      eyebrow: "Architecture",
      title: "Core Operational Apps — ContentManager365 + CoAuthor",
      subtitle: "Next-gen operational content management — from manual revisions to intelligent document orchestration",
      accent: C.blue,
      capsTitle: "Core Capabilities",
      capabilities: [
        { label: "Procedure Authoring", desc: "Structured document creation with approval workflows and version control" },
        { label: "Revision Cascades", desc: "One change triggers automatic updates across all affected documents" },
        { label: "Regulatory Change Impact", desc: "Map regulatory updates to affected procedures, training, and operations" },
        { label: "Multi-Format Distribution", desc: "Push content to crews via EFB, mobile, web — with read acknowledgement" },
        { label: "Manual Management", desc: "Complete manual lifecycle from draft through retirement with audit trail" },
        { label: "Document Control", desc: "Centralised library with access controls, retention policies, and search" },
      ],
      flowTitle: "CoAuthor — AI-Powered Content Intelligence",
      flow: [
        { step: "Regulatory Analysis", desc: "Analyses regulatory changes and identifies impacted manual sections" },
        { step: "Smart Revisions", desc: "Proposes revised language ready to merge and route for approval" },
        { step: "Impact Cascades", desc: "Identifies all downstream impacts across manuals and SOPs" },
        { step: "Audit-Ready Output", desc: "Policies and procedures become clearer, safer and always audit-ready" },
      ],
      caption: "CoAuthor turns every regulatory change into a ready-to-review revision — not just a notification.",
    }),
  },
  // ─── 6. TRAINING MANAGER 365 ──────────────────────────────────
  {
    label: "TrainingManager365",
    build: buildModuleSlide({
      eyebrow: "Architecture",
      title: "Core Operational Apps — TrainingManager365 + CoTrainer",
      subtitle: "Higher-quality training with less effort — from compliance checklists to competency-driven readiness",
      accent: C.prove,
      capsTitle: "Core Capabilities",
      capabilities: [
        { label: "Competency-Based Training", desc: "Map training to specific competency frameworks and regulatory requirements" },
        { label: "Targeted Assignments", desc: "Assign courses based on role, fleet, route, or safety event triggers" },
        { label: "Completion Evidence", desc: "Digital records of completion with assessment scores and sign-offs" },
        { label: "Qualification Records", desc: "Centralised crew qualification tracking with expiry alerts" },
        { label: "Recurrent Automation", desc: "Automated scheduling of recurrent training with compliance monitoring" },
        { label: "Gap Analysis", desc: "Identify competency gaps across fleet, base, or individual performance" },
      ],
      flowTitle: "CoTrainer — Intelligence Before Instruction",
      flow: [
        { step: "Debrief Transcription", desc: "Transcribes every debrief, generates summaries, coaching cues, improvement areas" },
        { step: "Automated Grading", desc: "Accelerates grading and generates rich, actionable trainee feedback" },
        { step: "Feedback Enhancement", desc: "Analyses instructor feedback to improve clarity, tone and constructiveness" },
        { step: "Personalised Training", desc: "Prior performance data personalises each session for improved crew readiness" },
      ],
      caption: "CoTrainer transforms every training session into a data-enriched learning event.",
    }),
  },

  // ─── 7. DATA FOUNDATION ───────────────────────────────────────
  dividerSpec({
    label: "▸ Layer 2 · Operational Data Foundation",
    layerNumber: 2,
    layerName: "Operational Data Foundation",
    tagline: "One unified data lake, taxonomy, knowledge graph and aviation LLMs — the substrate every layer reasons over.",
    active: "data",
    upNext: ["The Operational Data Foundation"],
  }),
  {
    label: "Data Foundation",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Architecture", "The Operational Data Foundation",
        "Unified taxonomy + operational knowledge graph + custom aviation LLMs — the substrate every other layer reasons over");

      // Top: 3 sources → unified DB block
      const sources = [
        { name: "ContentManager365", feeds: "Procedures · Revisions · Acks", color: C.blue },
        { name: "TrainingManager365", feeds: "Assignments · Completions · Recurrency", color: C.prove },
        { name: "SafetyManager365", feeds: "Occurrences · Audits · Investigations", color: C.rose },
      ];
      const tY = CONTENT_TOP;
      const tH = 0.95;
      const sW = 2.4;
      const totalSources = sources.length * sW + (sources.length - 1) * 0.15;
      let sx = 0.5;
      sources.forEach((s) => {
        addCard(slide, sx, tY, sW, tH, { border: s.color });
        slide.addText(s.name, {
          x: sx + 0.18, y: tY + 0.12, w: sW - 0.36, h: 0.3,
          fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: s.color,
        });
        slide.addText(s.feeds, {
          x: sx + 0.18, y: tY + 0.42, w: sW - 0.36, h: 0.5,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted,
        });
        sx += sW + 0.15;
      });
      // arrow
      slide.addText("➜", {
        x: 0.5 + totalSources + 0.05, y: tY + 0.25, w: 0.4, h: 0.5,
        fontFace: PPTX_BRAND.font.display, fontSize: 22, color: C.cyan, align: "center", valign: "middle",
      });
      // unified block
      const ux = 0.5 + totalSources + 0.55;
      const uW = W - 0.5 - ux;
      addCard(slide, ux, tY, uW, tH, { border: C.cyan, fill: "0F2030" });
      slide.addText("Operational Data Foundation", {
        x: ux + 0.2, y: tY + 0.12, w: uW - 0.4, h: 0.3,
        fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: C.cyan,
      });
      slide.addText("Cross-product schema · Governed access · Customer-owned", {
        x: ux + 0.2, y: tY + 0.42, w: uW - 0.4, h: 0.5,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted,
      });

      // Three pillars
      const pillars = [
        {
          title: "Unified Aviation Taxonomy",
          tag: "One schema across content, training & safety",
          metric: "4,000+ categories",
          color: C.amber,
          points: [
            "4,000+ aviation categories across 5 levels of depth",
            "ICAO / IATA / regulator alignment out of the box",
            "Same labels applied consistently in every product",
          ],
        },
        {
          title: "Operational Knowledge Graph",
          tag: "Procedures ↔ Training ↔ Events ↔ People ↔ Aircraft",
          metric: "Multi-hop traversal",
          color: C.violet,
          points: [
            "Entities, roles and relationships modelled as a graph",
            "A safety event traces to procedure, training and crew in one hop",
            "Powers cross-product reasoning no dashboard can do",
          ],
        },
        {
          title: "Custom Aviation LLM Models",
          tag: "Domain-trained, not domain-prompted",
          metric: "90% vs 35% accuracy",
          color: C.primary,
          points: [
            "Fine-tuned on millions of aviation reports since 2023",
            "Specialist models per task: classification, extraction, summarisation",
            "90% accuracy at Level 4–5 — generic AI sits at ~35%",
          ],
        },
      ];
      const pY = tY + tH + 0.2;
      const pH = CONTENT_BOTTOM - pY - 0.55;
      const pW = (W - 1 - 2 * 0.2) / 3;
      pillars.forEach((p, i) => {
        const x = 0.5 + i * (pW + 0.2);
        addCard(slide, x, pY, pW, pH, { border: p.color });
        slide.addText(p.title, {
          x: x + 0.18, y: pY + 0.12, w: pW - 0.36, h: 0.3,
          fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: p.color,
        });
        slide.addText(p.tag, {
          x: x + 0.18, y: pY + 0.42, w: pW - 0.36, h: 0.3,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, italic: true,
        });
        slide.addText(p.points.map((t) => ({ text: t, options: { bullet: { code: "25B8" } } })), {
          x: x + 0.18, y: pY + 0.78, w: pW - 0.36, h: pH - 1.2,
          fontFace: PPTX_BRAND.font.body, fontSize: 9.5, color: C.ink, paraSpaceAfter: 4,
        });
        // metric badge
        slide.addShape("roundRect", {
          x: x + 0.18, y: pY + pH - 0.4, w: pW - 0.36, h: 0.3,
          fill: { color: C.surfaceAlt }, line: { color: p.color, width: 0.5 }, rectRadius: 0.04,
        });
        slide.addText(p.metric.toUpperCase(), {
          x: x + 0.18, y: pY + pH - 0.4, w: pW - 0.36, h: 0.3,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: p.color, align: "center", valign: "middle", charSpacing: 2,
        });
      });

      // Governance strip
      const gY = CONTENT_BOTTOM - 0.4;
      const guarantees = ["🔒 Customer-Owned & Tenant-Isolated", "📡 Real-Time Event Propagation", "🔌 Open APIs · Webhooks · No Lock-In"];
      addCard(slide, 0.5, gY, W - 1, 0.4, { fill: C.surfaceAlt });
      const gW = (W - 1) / 3;
      guarantees.forEach((g, i) => {
        slide.addText(g, {
          x: 0.5 + i * gW, y: gY, w: gW, h: 0.4,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.ink, align: "center", valign: "middle",
        });
      });
    },
  },

  // ─── 8. INSIGHTS & INTELLIGENCE ───────────────────────────────
  dividerSpec({
    label: "▸ Layer 3 · Intelligence & Orchestration",
    layerNumber: 3,
    layerName: "Intelligence & Orchestration Layer",
    tagline: "Insights & Intelligence · Recommendations & Prescriptive Actions · Automation — turning data into action.",
    active: "intelligence",
    upNext: [
      "Insights & Intelligence",
      "Recommendations & Prescriptive Actions",
      "Automation",
    ],
  }),
  {
    label: "Insights & Intelligence",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Intelligence & Orchestration", "Insights & Intelligence — Intelligence & Orchestration",
        "From Reports to Intelligence. From Events to Control.");

      // Master message banner
      const mY = CONTENT_TOP;
      addCard(slide, 0.5, mY, W - 1, 0.55, { fill: C.primarySoft, border: C.primary });
      slide.addText("Hybrid AI: symbolic rules + ML + custom aviation LLMs · grounded recommendations · auditable", {
        x: 0.7, y: mY, w: W - 1.4, h: 0.55,
        fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: C.ink, align: "center", valign: "middle",
      });

      // Pipeline
      const pipeline = [
        { l: "Ingest", d: "Operational signals, manuals, training records, telemetry." },
        { l: "Enrich", d: "Context from policy, history, regulation, peer benchmarks." },
        { l: "Reason", d: "Hybrid AI — symbolic rules + ML + custom LLMs." },
        { l: "Answer", d: "Grounded recommendations with evidence." },
        { l: "Activate", d: "Trigger workflows, tasks, audit trail." },
      ];
      const pY = mY + 0.75;
      const pH = 2.4;
      const pW = (W - 1 - 4 * 0.18) / 5;
      pipeline.forEach((p, i) => {
        const x = 0.5 + i * (pW + 0.18);
        addCard(slide, x, pY, pW, pH, { border: C.primary });
        slide.addText(`0${i + 1}`, {
          x: x + 0.18, y: pY + 0.12, w: pW - 0.36, h: 0.25,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.primary, charSpacing: 3,
        });
        slide.addText(p.l, {
          x: x + 0.18, y: pY + 0.4, w: pW - 0.36, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color: C.ink,
        });
        slide.addText(p.d, {
          x: x + 0.18, y: pY + 0.82, w: pW - 0.36, h: pH - 0.95,
          fontFace: PPTX_BRAND.font.body, fontSize: 9.5, color: C.muted, valign: "top",
        });
      });

      // Two stat tiles
      const sY = pY + pH + 0.2;
      const sH = CONTENT_BOTTOM - sY;
      addStatTile(slide, 0.5, sY, (W - 1.2) / 2, sH, "90%", "Domain accuracy at Level 4–5 — vs ~35% generic AI", C.prove);
      addStatTile(slide, 0.5 + (W - 1.2) / 2 + 0.2, sY, (W - 1.2) / 2, sH, "60+", "Languages supported across the operational corpus", C.accent);
    },
  },

  // ─── 9. RECOMMENDATIONS & PRESCRIPTIVE ACTIONS ───────────────
  {
    label: "Recommendations & Prescriptive Actions",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Intelligence & Orchestration", "Intelligence & Orchestration Layer — Recommendations & Prescriptive Actions",
        "From insight to prescriptive action — proactive signals across the platform");

      const caps = [
        { title: "Pattern Detection", desc: "Cross-domain correlation surfaces patterns no single dashboard would catch — linking training gaps to safety events to procedural ambiguity.", color: C.amber },
        { title: "Recommended Actions", desc: "Every insight is paired with a concrete next step — targeted training, procedure update, compliance review — with traceable reasoning.", color: C.violet },
        { title: "Trend & Foresight", desc: "Continuous, exploratory analysis turns reactive reporting into proactive risk identification — gaps surface before findings, not after.", color: C.prove },
      ];
      const cY = CONTENT_TOP;
      const cH = 1.5;
      const cW = (W - 1 - 2 * 0.2) / 3;
      caps.forEach((c, i) => {
        addLabeledCard(slide, 0.5 + i * (cW + 0.2), cY, cW, cH, {
          title: c.title, body: c.desc, accent: c.color, titleSize: 12, bodySize: 9.5,
        });
      });

      // Worked example
      const wY = cY + cH + 0.25;
      const wH = CONTENT_BOTTOM - wY;
      addCard(slide, 0.5, wY, W - 1, wH, { border: C.primary });
      slide.addText("Worked Example — Dangerous Goods Risk", {
        x: 0.7, y: wY + 0.12, w: 8, h: 0.3,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: C.ink,
      });
      slide.addText("Question to evidence-backed action plan in <60 seconds", {
        x: W - 5, y: wY + 0.14, w: 4.5, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.subtle, align: "right", italic: true,
      });
      // question box
      const qY = wY + 0.5;
      addCard(slide, 0.7, qY, W - 1.4, 0.45, { fill: C.primarySoft, border: C.primary });
      slide.addText('"Are dangerous goods incidents linked to training gaps?"', {
        x: 0.9, y: qY, w: W - 1.8, h: 0.45,
        fontFace: PPTX_BRAND.font.body, fontSize: 11, italic: true, color: C.ink, valign: "middle",
      });

      const steps = [
        { l: "Ask", d: "COO asks the question in plain English — no BI build, no waiting.", color: C.amber },
        { l: "Correlate", d: "Engine joins safety events, DG training completion, station rosters and procedure versions.", color: C.blue },
        { l: "Insight", d: "3 hub stations show DG handling spikes — all three correlate with overdue DG recurrent training.", color: C.violet },
        { l: "Recommend", d: "Targeted retraining for 180 ground crew, expedite SOP republish, audit pack generated.", color: C.prove },
      ];
      const stY = qY + 0.6;
      const stH = wY + wH - stY - 0.15;
      const stW = (W - 1.4 - 3 * 0.15) / 4;
      steps.forEach((s, i) => {
        const x = 0.7 + i * (stW + 0.15);
        addCard(slide, x, stY, stW, stH, { border: s.color });
        slide.addText(s.l.toUpperCase(), {
          x: x + 0.15, y: stY + 0.1, w: stW - 0.3, h: 0.25,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: s.color, charSpacing: 3,
        });
        slide.addText(s.d, {
          x: x + 0.15, y: stY + 0.38, w: stW - 0.3, h: stH - 0.5,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "top",
        });
      });
    },
  },

  // ─── 10. AUTOMATION ───────────────────────────────────────────
  {
    label: "Automation",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Intelligence & Orchestration", "Automation & Orchestration",
        "One automation layer across the platform — closing the loop on cross-product workflows");

      const pipe = [
        { l: "Triggers", d: "Native events, webhooks, schedules — Outlook & Teams included.", color: C.blue },
        { l: "Orchestration", d: "No-code/low-code workflows. Reusable connectors. Centrally governed.", color: C.amber },
        { l: "Guardrails", d: "Versioned, observable, testable. Conditional branching, retries, role-scoped.", color: C.violet },
        { l: "Audit Trail", d: "Every execution logged: who, what, when, why. Audit-ready by default.", color: C.prove },
      ];
      const pY = CONTENT_TOP;
      const pH = 1.4;
      const pW = (W - 1 - 3 * 0.15) / 4;
      pipe.forEach((p, i) => {
        const x = 0.5 + i * (pW + 0.15);
        addLabeledCard(slide, x, pY, pW, pH, {
          title: p.l, body: p.d, accent: p.color, titleSize: 12, bodySize: 9.5,
        });
      });

      // Worked example
      const wY = pY + pH + 0.25;
      addCard(slide, 0.5, wY, W - 1, 0.4, { fill: C.surfaceAlt });
      slide.addText("Cross-Product Workflow — Publish → Train → Assure", {
        x: 0.7, y: wY, w: 8, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: C.ink, valign: "middle",
      });
      slide.addText("Zero manual handoffs · Zero custom code", {
        x: W - 4.5, y: wY, w: 4, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.subtle, italic: true, align: "right", valign: "middle",
      });

      const flowSteps = [
        { tag: "1. EVENT", color: C.blue, desc: "ContentManager365 fires a procedure-published event with role, criticality and effective date." },
        { tag: "2. ORCHESTRATE", color: C.amber, desc: "Workflow joins affected roles to TrainingManager365, opens a SafetyManager365 compliance checkpoint, notifies in Teams." },
        { tag: "3. OUTCOME", color: C.prove, desc: "Training auto-assigned, acknowledgement tracked, exceptions surfaced — auditable trail end-to-end." },
      ];
      const fY = wY + 0.55;
      const fH = 1.6;
      const fW = (W - 1 - 2 * 0.15) / 3;
      flowSteps.forEach((s, i) => {
        addLabeledCard(slide, 0.5 + i * (fW + 0.15), fY, fW, fH, {
          eyebrow: s.tag, title: "", body: s.desc, accent: s.color, titleSize: 1, bodySize: 10,
        });
      });

      // Two callouts
      const coY = fY + fH + 0.15;
      const coH = CONTENT_BOTTOM - coY;
      const coW = (W - 1 - 0.2) / 2;
      addLabeledCard(slide, 0.5, coY, coW, coH, {
        eyebrow: "Human-in-the-loop by design",
        title: "",
        body: "Approval gates, optional review steps and override controls — automation augments operators, never bypasses them.",
        accent: C.violet, titleSize: 1, bodySize: 10,
      });
      addLabeledCard(slide, 0.5 + coW + 0.2, coY, coW, coH, {
        eyebrow: "Native connectors, not bespoke code",
        title: "",
        body: "Outlook, Teams, Slack, identity providers, customer data systems — integrations land in days, not months.",
        accent: C.primary, titleSize: 1, bodySize: 10,
      });
    },
  },

  // ─── 11. MOBILE ───────────────────────────────────────────────
  dividerSpec({
    label: "▸ Layer 4 · Unified Mobile",
    layerNumber: 4,
    layerName: "Unified Mobile Experience",
    tagline: "One trusted shell for the frontline — Procedures, Training and Safety in a single app.",
    active: "mobile",
    upNext: ["Unified Mobile"],
  }),
  {
    label: "Unified Mobile",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Intelligence & Orchestration", "The Unified Mobile Experience",
        "One trusted entry point for the frontline — Content, Training and Safety in a single shell");

      // Phone mock (left)
      const phX = 0.7, phY = CONTENT_TOP, phW = 2.6, phH = CONTENT_BOTTOM - CONTENT_TOP;
      slide.addShape("roundRect", {
        x: phX, y: phY, w: phW, h: phH,
        fill: { color: C.surfaceAlt }, line: { color: C.hairline, width: 2 }, rectRadius: 0.25,
      });
      slide.addText("Comply365 Mobile", {
        x: phX, y: phY + 0.2, w: phW, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.subtle, align: "center",
      });
      slide.addText("One trusted shell", {
        x: phX, y: phY + 0.45, w: phW, h: 0.3,
        fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: C.ink, align: "center",
      });
      const apps = [
        { name: "Procedures", status: "Live · daily use", color: C.blue },
        { name: "Training", status: "Phase 1 · Q2 2026", color: C.prove },
        { name: "Safety", status: "Phase 2 · Q4 2026", color: C.rose },
      ];
      const aY = phY + 1.0;
      const aH = (phH - 1.3 - 2 * 0.12) / 3;
      apps.forEach((a, i) => {
        const ay = aY + i * (aH + 0.12);
        addCard(slide, phX + 0.2, ay, phW - 0.4, aH, { border: a.color });
        slide.addText(a.name, {
          x: phX + 0.35, y: ay + 0.08, w: phW - 0.7, h: 0.3,
          fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: a.color,
        });
        slide.addText(a.status, {
          x: phX + 0.35, y: ay + 0.38, w: phW - 0.7, h: 0.25,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted,
        });
      });
      slide.addText("SSO · Unified shell · iOS", {
        x: phX, y: phY + phH - 0.3, w: phW, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.subtle, align: "center",
      });

      // Pillars 2x2 (right)
      const pillars = [
        { title: "Less Context Shifting", desc: "Crews stay in the app they already trust. Training and Safety stop being detours — they become tabs.", color: C.blue },
        { title: "Single Sign-On", desc: "One identity across the platform. Authenticate once, access ContentManager365, TrainingManager365 and SafetyManager365 from one shell.", color: C.amber },
        { title: "Unified Notifications", desc: "One notification stream — procedure changes, training due, safety follow-ups — all in the same inbox.", color: C.violet },
        { title: "Simpler Deployment", desc: "One MDM footprint, one certification, one approval cycle through customer mobile estates — instead of three.", color: C.prove },
      ];
      const px = phX + phW + 0.4;
      const pw = W - 0.5 - px;
      const ph2 = (CONTENT_BOTTOM - CONTENT_TOP - 0.2) / 2 - 0.05;
      const pcw = (pw - 0.2) / 2;
      pillars.forEach((p, i) => {
        const cx = px + (i % 2) * (pcw + 0.2);
        const cy = CONTENT_TOP + Math.floor(i / 2) * (ph2 + 0.2);
        addLabeledCard(slide, cx, cy, pcw, ph2, {
          title: p.title, body: p.desc, accent: p.color, titleSize: 12, bodySize: 9.5,
        });
      });
    },
  },

  // ─── 12. DTOP ─────────────────────────────────────────────────
  dividerSpec({
    label: "▸ Layer 5 · DTOP",
    layerNumber: 5,
    layerName: "DTOP — The System of Work",
    tagline: "Detect → Trigger → Orchestrate → Prove. The operating model that wraps the whole stack.",
    active: "dtop",
    upNext: ["DTOP Operating Model"],
  }),
  {
    label: "DTOP Operating Model",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Operating model", "Detect → Trigger → Orchestrate → Prove",
        "A closed-loop operating model that turns signals into provable outcomes.");

      const steps = [
        { letter: "D", label: "Detect", color: C.detect, desc: "Continuous signal capture across ops, safety, content, training." },
        { letter: "T", label: "Trigger", color: C.trigger, desc: "Policy + AI evaluate, escalate, route to the right owner." },
        { letter: "O", label: "Orchestrate", color: C.orchestrate, desc: "Workflows, tasks, manuals, training updates run in lock-step." },
        { letter: "P", label: "Prove", color: C.prove, desc: "Auditable evidence chain — every action timestamped and signed." },
      ];
      const sY = CONTENT_TOP;
      const sH = 3.2;
      const sW = (W - 1 - 3 * 0.2) / 4;
      steps.forEach((s, i) => {
        const x = 0.5 + i * (sW + 0.2);
        addCard(slide, x, sY, sW, sH, { border: s.color });
        // Brand motif: top accent strip on each step card
        slide.addShape("rect", {
          x, y: sY, w: sW, h: 0.06,
          fill: { color: s.color }, line: { type: "none" },
        });
        slide.addShape("ellipse", {
          x: x + sW / 2 - 0.45, y: sY + 0.25, w: 0.9, h: 0.9,
          fill: { color: s.color }, line: { type: "none" },
        });
        slide.addText(s.letter, {
          x: x + sW / 2 - 0.45, y: sY + 0.25, w: 0.9, h: 0.9,
          fontFace: PPTX_BRAND.font.display, fontSize: 36, bold: true, color: C.bg, align: "center", valign: "middle",
        });
        slide.addText(s.label, {
          x: x + 0.18, y: sY + 1.3, w: sW - 0.36, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 18, bold: true, color: s.color, align: "center",
        });
        slide.addText(s.desc, {
          x: x + 0.18, y: sY + 1.8, w: sW - 0.36, h: sH - 1.95,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, align: "center", valign: "top",
        });
        // Step arrow between cards
        if (i < steps.length - 1) {
          slide.addText("›", {
            x: x + sW + 0.02, y: sY + sH / 2 - 0.25, w: 0.18, h: 0.5,
            fontFace: PPTX_BRAND.font.display, fontSize: 28, bold: true,
            color: C.subtle, align: "center", valign: "middle",
          });
        }
      });
      // Closed-loop return arrow (last → first) under the cards
      slide.addShape("rect", {
        x: 0.5, y: sY + sH + 0.05, w: W - 1, h: 0.04,
        fill: { color: C.primary }, line: { type: "none" },
      });
      slide.addText("↺  Continuous Improvement Loop", {
        x: W / 2 - 2, y: sY + sH + 0.0, w: 4, h: 0.18,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true,
        color: C.primary, align: "center", charSpacing: 3,
      });

      // Audit trail strip
      const aY = sY + sH + 0.25;
      addCard(slide, 0.5, aY, W - 1, 0.6, { fill: C.surfaceAlt, border: C.primary });
      slide.addText("Every step is observable, governed and auditable — that is the durable moat.", {
        x: 0.7, y: aY, w: W - 1.4, h: 0.6,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, italic: true, color: C.ink, align: "center", valign: "middle",
      });

      // example chain
      const eY = aY + 0.75;
      const eH = CONTENT_BOTTOM - eY;
      const chainItems = [
        "FOQA exceedance detected",
        "Policy triggers procedure review",
        "Targeted sim training assigned",
        "Audit-ready evidence generated",
      ];
      const cw = (W - 1 - 3 * 0.15) / 4;
      chainItems.forEach((t, i) => {
        const x = 0.5 + i * (cw + 0.15);
        addCard(slide, x, eY, cw, eH, { fill: C.surface });
        slide.addText(t, {
          x: x + 0.15, y: eY, w: cw - 0.3, h: eH,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.ink, align: "center", valign: "middle",
        });
      });
    },
  },

  // ─── 13. TIERS VS GENERIC AI ──────────────────────────────────
  {
    label: "Tiers vs Generic AI",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Operating model", "Intelligence Tiers vs Generic AI",
        "Four tiers of operational intelligence — and the precision gap generic AI cannot close");

      const tiers = [
        { tier: "Historical", color: C.sky, desc: "Query past events in plain English" },
        { tier: "Reactive", color: C.amber, desc: "Real-time alerts on threshold breach" },
        { tier: "Proactive", color: C.violet, desc: "Pattern detection before incidents" },
        { tier: "Predictive", color: C.prove, desc: "Probabilistic risk modelling" },
      ];
      const tY = CONTENT_TOP;
      const tH = 0.95;
      const tW = (W - 1 - 3 * 0.18) / 4;
      tiers.forEach((t, i) => {
        const x = 0.5 + i * (tW + 0.18);
        addLabeledCard(slide, x, tY, tW, tH, {
          title: t.tier, body: t.desc, accent: t.color, titleSize: 12, bodySize: 9.5,
        });
      });

      // Capability table (left, 60%) + accuracy + risk + quote (right, 40%)
      const bY = tY + tH + 0.2;
      const bH = CONTENT_BOTTOM - bY;
      const tblW = 7.8;

      const rows = [
        ["4,000+ category taxonomy (5 levels)", true, false],
        ["Hybrid AI: domain ML + LLMs", true, false],
        ["Cross-report pattern recognition", true, false],
        ["Proactive hazard detection", true, false],
        ["Predictive recurrence modelling", true, false],
        ["Low hallucination on aviation data", true, false],
        ["60+ language translation", true, true],
        ["Summarisation & basic Q&A", true, true],
      ] as const;

      const tblData = [
        [
          { text: "Capability", options: { bold: true, color: C.subtle, fontSize: 10, fill: { color: C.surfaceAlt } } },
          { text: "Insights & Intelligence", options: { bold: true, color: C.primary, fontSize: 10, align: "center" as const, fill: { color: C.surfaceAlt } } },
          { text: "Generic AI", options: { bold: true, color: C.subtle, fontSize: 10, align: "center" as const, fill: { color: C.surfaceAlt } } },
        ],
        ...rows.map((r) => [
          { text: String(r[0]), options: { color: C.ink, fontSize: 9.5 } },
          { text: r[1] ? "✓" : "✕", options: { color: r[1] ? C.prove : C.danger, bold: true, fontSize: 14, align: "center" as const } },
          { text: r[2] ? "✓" : "✕", options: { color: r[2] ? C.prove : C.danger, bold: true, fontSize: 14, align: "center" as const } },
        ]),
      ];

      slide.addTable(tblData, {
        x: 0.5, y: bY, w: tblW,
        colW: [4.6, 1.6, 1.6],
        rowH: 0.32,
        border: { type: "solid", pt: 0.5, color: C.hairline },
        fontFace: PPTX_BRAND.font.body,
        valign: "middle",
      });

      // Right column
      const rx = 0.5 + tblW + 0.2;
      const rw = W - 0.5 - rx;
      // Accuracy block
      const acH = 1.5;
      addCard(slide, rx, bY, rw, acH, { border: C.amber });
      slide.addText("ACCURACY BY TAXONOMY DEPTH", {
        x: rx + 0.18, y: bY + 0.1, w: rw - 0.36, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.amber, charSpacing: 3,
      });
      const acc = [
        ["Level 1 (~50 types)", "~95%", "~90%"],
        ["Level 2–3 (hundreds)", "~92%", "~60%"],
        ["Level 4–5 (thousands)", "~90%", "30–40%"],
      ];
      acc.forEach((a, i) => {
        const ay = bY + 0.4 + i * 0.32;
        slide.addText(a[0], { x: rx + 0.18, y: ay, w: rw - 1.4, h: 0.3, fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "middle" });
        slide.addText(a[1], { x: rx + rw - 1.2, y: ay, w: 0.55, h: 0.3, fontFace: PPTX_BRAND.font.display, fontSize: 10, bold: true, color: C.primary, align: "center", valign: "middle" });
        slide.addText(a[2], { x: rx + rw - 0.65, y: ay, w: 0.55, h: 0.3, fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.subtle, align: "center", valign: "middle" });
      });

      // Risk
      const rY = bY + acH + 0.15;
      const rH = bH - acH - 0.6;
      addCard(slide, rx, rY, rw, rH, { border: C.danger });
      slide.addText("THE REAL-WORLD RISK", {
        x: rx + 0.18, y: rY + 0.1, w: rw - 0.36, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.danger, charSpacing: 3,
      });
      slide.addText("Generic AI classifies a repeated bird strike as a one-off — missing the cluster pattern signalling a runway hazard trend that requires immediate operational response.", {
        x: rx + 0.18, y: rY + 0.4, w: rw - 0.36, h: rH - 0.5,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, valign: "top",
      });

      // Quote
      const qY = bY + bH - 0.45;
      addCard(slide, rx, qY, rw, 0.45, { fill: C.primarySoft, border: C.primary });
      slide.addText('"Generative AI reads reports. Insights & Intelligence understands aviation operations."', {
        x: rx + 0.1, y: qY, w: rw - 0.2, h: 0.45,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, italic: true, color: C.ink, align: "center", valign: "middle",
      });
    },
  },

  // ─── 14. USE CASES ────────────────────────────────────────────
  {
    label: "Use Cases",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Operating model", "Use Cases — Safety, Operations & Financial",
        "Every signal follows the same DTOP loop — different domain, same architecture");

      // DTOP legend
      const lY = CONTENT_TOP;
      addPillRow(slide, 3.0, lY, W - 6, 0.32, [
        { text: "DETECT", color: C.detect },
        { text: "TRIGGER", color: C.trigger },
        { text: "ORCHESTRATE", color: C.orchestrate },
        { text: "PROVE", color: C.prove },
      ]);

      // 3 columns by domain
      const groups = [
        { domain: "Safety", color: C.rose, ids: ["uc1", "uc5"] },
        { domain: "Operations", color: C.blue, ids: ["uc2", "uc3"] },
        { domain: "Financial", color: C.amber, ids: ["uc7"] },
      ];
      const gY = lY + 0.55;
      const gH = CONTENT_BOTTOM - gY;
      const gW = (W - 1 - 2 * 0.2) / 3;

      groups.forEach((g, idx) => {
        const x = 0.5 + idx * (gW + 0.2);
        addCard(slide, x, gY, gW, gH, { border: g.color });
        slide.addText(g.domain.toUpperCase(), {
          x: x + 0.18, y: gY + 0.12, w: gW - 0.36, h: 0.3,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, bold: true, color: g.color, charSpacing: 3,
        });

        const cases = useCases.filter((uc) => g.ids.includes(uc.id));
        const cardSpace = gH - 0.55;
        const ch = cardSpace / cases.length - 0.1;
        cases.forEach((uc, i) => {
          const annual = uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor;
          const cy = gY + 0.5 + i * (ch + 0.1);
          // header row
          slide.addText(uc.label, {
            x: x + 0.18, y: cy, w: gW - 1.3, h: 0.3,
            fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: C.ink,
          });
          slide.addShape("roundRect", {
            x: x + gW - 1.2, y: cy + 0.02, w: 1.0, h: 0.28,
            fill: { color: C.danger }, line: { type: "none" }, rectRadius: 0.05,
          });
          slide.addText(`${fmtMoney(annual)}/yr`, {
            x: x + gW - 1.2, y: cy + 0.02, w: 1.0, h: 0.28,
            fontFace: PPTX_BRAND.font.display, fontSize: 9, bold: true, color: C.ink, align: "center", valign: "middle",
          });
          // DTOP chain extracted
          const chain = uc.platformMechanism.split(" → ").map((s) =>
            s.replace(/^(Detect|Trigger|Orchestrate|Prove)\s*\(/, "").replace(/\)$/, "")
          );
          const labels = ["DETECT", "TRIGGER", "ORCHESTRATE", "PROVE"];
          const colors = [C.detect, C.trigger, C.orchestrate, C.prove];
          const stepH = (ch - 0.4) / 4;
          for (let s = 0; s < 4; s++) {
            const sy = cy + 0.35 + s * stepH;
            slide.addShape("rect", {
              x: x + 0.2, y: sy, w: 0.04, h: stepH - 0.04,
              fill: { color: colors[s] }, line: { type: "none" },
            });
            slide.addText(labels[s], {
              x: x + 0.32, y: sy - 0.02, w: 1.0, h: 0.2,
              fontFace: PPTX_BRAND.font.body, fontSize: 7, bold: true, color: colors[s], charSpacing: 2,
            });
            slide.addText(chain[s] || "", {
              x: x + 0.32, y: sy + 0.13, w: gW - 0.55, h: stepH - 0.18,
              fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.muted, valign: "top",
            });
          }
        });
      });
    },
  },

  // ─── 15. PLATFORM INTEGRATIONS ────────────────────────────────
  {
    label: "Platform Integrations",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Operating model", "Platform Integration Case Studies",
        "Live integrations proving the connected platform — in production today");

      const cs = [
        {
          title: "Regulation Database Integration",
          subtitle: "ContentManager365 ↔ Regulatory Sources",
          status: "In Production",
          flow: {
            detect: "Regulator publishes regulatory change or amendment",
            trigger: "SafetyManager365 stores update and triggers change request to authoring team",
            orchestrate: "ContentManager365 links SOPs to updated regulatory references automatically",
            prove: "TrainingManager365 connects training syllabi to latest SOP revisions — full traceability",
          },
          value: ["Faster authoring cycles", "Reduced rework from missed regulatory changes", "Fewer audit findings", "AI-assisted compliance mapping"],
        },
        {
          title: "TrainingManager365 ↔ ContentManager365",
          subtitle: "Training Records ↔ Operational Procedures",
          status: "Live",
          flow: {
            detect: "Training developer links operational document from ContentManager365",
            trigger: "Trainees and trainers automatically access the latest published version",
            orchestrate: "When the document updates, linked training content stays current",
            prove: "Procedure changes surface linked training modules — triggering targeted retraining",
          },
          value: ["Reduced compliance risk from outdated training", "Faster change implementation", "Closed-loop learning incident → retraining", "Enhanced investigation quality"],
        },
      ];

      const cY = CONTENT_TOP;
      const cH = CONTENT_BOTTOM - CONTENT_TOP - 0.55;
      const cW = (W - 1 - 0.3) / 2;

      cs.forEach((c, idx) => {
        const x = 0.5 + idx * (cW + 0.3);
        addCard(slide, x, cY, cW, cH, { border: C.primary });
        // header
        slide.addText(c.title, {
          x: x + 0.18, y: cY + 0.12, w: cW - 1.3, h: 0.3,
          fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: C.ink,
        });
        slide.addShape("roundRect", {
          x: x + cW - 1.2, y: cY + 0.13, w: 1.0, h: 0.28,
          fill: { color: C.prove }, line: { type: "none" }, rectRadius: 0.05,
        });
        slide.addText(c.status, {
          x: x + cW - 1.2, y: cY + 0.13, w: 1.0, h: 0.28,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: C.bg, align: "center", valign: "middle",
        });
        slide.addText(c.subtitle, {
          x: x + 0.18, y: cY + 0.42, w: cW - 0.36, h: 0.22,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, italic: true,
        });

        // DTOP timeline
        const labels = ["SIGNAL DETECTED", "ACTION TRIGGERED", "CHANGE ORCHESTRATED", "OUTCOME PROVEN"];
        const colors = [C.detect, C.trigger, C.orchestrate, C.prove];
        const flows = [c.flow.detect, c.flow.trigger, c.flow.orchestrate, c.flow.prove];
        const tlY = cY + 0.75;
        const tlH = (cH - 0.75 - 0.95) / 4;
        flows.forEach((f, i) => {
          const ty = tlY + i * tlH;
          slide.addShape("rect", {
            x: x + 0.25, y: ty, w: 0.05, h: tlH - 0.05,
            fill: { color: colors[i] }, line: { type: "none" },
          });
          slide.addText(labels[i], {
            x: x + 0.4, y: ty - 0.02, w: cW - 0.5, h: 0.22,
            fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: colors[i], charSpacing: 2,
          });
          slide.addText(f, {
            x: x + 0.4, y: ty + 0.18, w: cW - 0.55, h: tlH - 0.22,
            fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.ink, valign: "top",
          });
        });

        // value chips
        const vY = cY + cH - 0.85;
        slide.addText("VALUE", {
          x: x + 0.18, y: vY, w: cW - 0.36, h: 0.22,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: C.primary, charSpacing: 2,
        });
        const chW = (cW - 0.36 - 3 * 0.08) / 4;
        c.value.forEach((v, vi) => {
          const vx = x + 0.18 + vi * (chW + 0.08);
          slide.addShape("roundRect", {
            x: vx, y: vY + 0.28, w: chW, h: 0.45,
            fill: { color: C.surfaceAlt }, line: { color: C.primary, width: 0.5 }, rectRadius: 0.05,
          });
          slide.addText(v, {
            x: vx + 0.05, y: vY + 0.28, w: chW - 0.1, h: 0.45,
            fontFace: PPTX_BRAND.font.body, fontSize: 7.5, color: C.ink, align: "center", valign: "middle",
          });
        });
      });

      // bottom callout
      const bY = CONTENT_BOTTOM - 0.4;
      addCard(slide, 0.5, bY, W - 1, 0.4, { fill: C.primarySoft });
      slide.addText("These are live platform integrations — not roadmap items. Each demonstrates the connected data model that powers the intelligence layer.", {
        x: 0.7, y: bY, w: W - 1.4, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.ink, italic: true, align: "center", valign: "middle",
      });
    },
  },

  // ─── 16. LINE OF SIGHT ────────────────────────────────────────
  {
    label: "Line of Sight Cascade",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Value & close", "Line of Sight — From Use Case to Executive Outcome",
        "Costed use cases drive leading measures — leading measures drive executive outcomes");

      const cY = CONTENT_TOP;
      const cH = CONTENT_BOTTOM - CONTENT_TOP - 0.65;
      const colW = (W - 1 - 2 * 0.25) / 3;

      // Column 1: Use cases (compressed list)
      const totalExposure = useCases.reduce(
        (s, uc) => s + uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor, 0,
      );
      addCard(slide, 0.5, cY, colW, cH, { border: C.danger });
      slide.addText("OPERATIONAL USE CASES", {
        x: 0.5 + 0.18, y: cY + 0.12, w: colW - 0.36, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.danger, charSpacing: 2,
      });
      const ucList = useCases.slice(0, 8);
      const ucRowH = (cH - 0.5) / ucList.length;
      ucList.forEach((uc, i) => {
        const ry = cY + 0.42 + i * ucRowH;
        const annual = uc.input.baseline * uc.input.costMidpoint * uc.input.annualisationFactor;
        slide.addText(uc.label, {
          x: 0.5 + 0.18, y: ry, w: colW - 1.3, h: ucRowH - 0.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.ink, valign: "middle",
        });
        slide.addText(`${fmtMoney(annual)}/yr`, {
          x: 0.5 + colW - 1.15, y: ry, w: 0.95, h: ucRowH - 0.05,
          fontFace: PPTX_BRAND.font.display, fontSize: 9, bold: true, color: C.danger, align: "right", valign: "middle",
        });
      });

      // Column 2: Leading measures
      const c2x = 0.5 + colW + 0.25;
      addCard(slide, c2x, cY, colW, cH, { border: C.amber });
      slide.addText("LEADING MEASURES", {
        x: c2x + 0.18, y: cY + 0.12, w: colW - 0.36, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.amber, charSpacing: 2,
      });
      const lmRowH = (cH - 0.5) / leadingMeasures.length;
      leadingMeasures.forEach((lm, i) => {
        const ry = cY + 0.42 + i * lmRowH;
        slide.addText(lm.label, {
          x: c2x + 0.18, y: ry, w: colW - 1.5, h: lmRowH - 0.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.ink, valign: "middle",
        });
        const arrow = lm.direction === "up" ? "↑" : "↓";
        slide.addText(`${arrow} ${lm.baselineValue}${lm.unit}`, {
          x: c2x + colW - 1.35, y: ry, w: 1.15, h: lmRowH - 0.05,
          fontFace: PPTX_BRAND.font.display, fontSize: 9.5, bold: true, color: C.amber, align: "right", valign: "middle",
        });
      });

      // Column 3: Executive outcomes
      const c3x = c2x + colW + 0.25;
      addCard(slide, c3x, cY, colW, cH, { border: C.prove });
      slide.addText("EXECUTIVE OUTCOMES", {
        x: c3x + 0.18, y: cY + 0.12, w: colW - 0.36, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.prove, charSpacing: 2,
      });
      const allMetrics = executiveOutcomes.flatMap((o) => o.metrics.map((m) => ({ ...m, who: o.stakeholder })));
      const oRowH = (cH - 0.5) / allMetrics.length;
      allMetrics.forEach((m, i) => {
        const ry = cY + 0.42 + i * oRowH;
        slide.addText(m.who, {
          x: c3x + 0.18, y: ry, w: 0.55, h: oRowH - 0.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 7.5, bold: true, color: C.subtle, valign: "middle",
        });
        slide.addText(m.label, {
          x: c3x + 0.7, y: ry, w: colW - 0.85, h: oRowH - 0.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.ink, valign: "middle",
        });
      });

      // Bottom: total exposure banner
      const bY = CONTENT_BOTTOM - 0.5;
      addCard(slide, 0.5, bY, W - 1, 0.5, { fill: "1F0A12", border: C.danger });
      slide.addText(fmtMoney(totalExposure), {
        x: 0.7, y: bY, w: 2, h: 0.5,
        fontFace: PPTX_BRAND.font.display, fontSize: 18, bold: true, color: C.danger, valign: "middle",
      });
      slide.addText("Total addressable annual exposure across 8 costed use cases — your starting envelope for ROI modelling", {
        x: 2.7, y: bY, w: W - 3.2, h: 0.5,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, valign: "middle",
      });
    },
  },

  // ─── 17. MATURITY ROADMAP ─────────────────────────────────────
  {
    label: "Maturity Roadmap",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Value & close", "The Maturity Roadmap",
        "How teams change their way of working at every stage");

      const stages = [
        { n: "1", label: "Fragmented", sub: "Manual / Reactive", color: C.danger, result: "High variability and repeat issues. Hidden cost of repeat work and audit scrambles." },
        { n: "2", label: "Managed", sub: "Silo Optimisation", color: C.sky, result: "Compliance managed in silos, but no systematic learning." },
        { n: "3", label: "Connected", sub: "Closed Loop", color: "14B8A6", result: "Single source of truth · Audit prep ↓ 30% · Handoffs ↓ 50%." },
        { n: "4", label: "Intelligent", sub: "AI-Assisted", color: C.violet, result: "Recurrence ↓ 50% · Time-to-change ↓ 60% · Measurable KPI lift." },
        { n: "5", label: "Predictive", sub: "AI-Accelerated", color: C.amber, result: "OTP ↑ 15% · Delay mins ↓ 40% · Admin hours ↓ 70%." },
      ];

      // Top: connector line
      const sY = CONTENT_TOP;
      const sH = CONTENT_BOTTOM - sY;
      const sW = (W - 1 - 4 * 0.15) / 5;

      // Maturity arc — circles plotted on a rising curve (Stage 1 low → Stage 5 high)
      // Y positions roughly form a curve.
      const arcY = [0.78, 0.62, 0.45, 0.26, 0.05];
      // Background curve approximated by short line segments connecting circles.
      stages.forEach((_, i) => {
        if (i === stages.length - 1) return;
        const x1 = 0.5 + i * (sW + 0.15) + sW / 2;
        const x2 = 0.5 + (i + 1) * (sW + 0.15) + sW / 2;
        const y1 = sY + arcY[i] + 0.3;
        const y2 = sY + arcY[i + 1] + 0.3;
        slide.addShape("line", {
          x: x1, y: y1, w: x2 - x1, h: y2 - y1,
          line: { color: C.primary, width: 1.5, dashType: "dash" },
        });
      });

      stages.forEach((s, i) => {
        const x = 0.5 + i * (sW + 0.15);
        const cy = sY + arcY[i];
        // Glow halo
        slide.addShape("ellipse", {
          x: x + sW / 2 - 0.42, y: cy - 0.12, w: 0.84, h: 0.84,
          fill: { color: s.color, transparency: 75 }, line: { type: "none" },
        });
        // numbered circle
        slide.addShape("ellipse", {
          x: x + sW / 2 - 0.3, y: cy, w: 0.6, h: 0.6,
          fill: { color: s.color }, line: { type: "none" },
        });
        slide.addText(s.n, {
          x: x + sW / 2 - 0.3, y: cy, w: 0.6, h: 0.6,
          fontFace: PPTX_BRAND.font.display, fontSize: 22, bold: true, color: C.bg, align: "center", valign: "middle",
        });
        // card below
        addCard(slide, x, sY + 1.0, sW, sH - 1.0, { border: s.color });
        // Brand motif: top accent strip
        slide.addShape("rect", {
          x, y: sY + 1.0, w: sW, h: 0.06,
          fill: { color: s.color }, line: { type: "none" },
        });
        slide.addText(s.label, {
          x: x + 0.18, y: sY + 1.15, w: sW - 0.36, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color: s.color, align: "center",
        });
        slide.addText(s.sub.toUpperCase(), {
          x: x + 0.18, y: sY + 1.55, w: sW - 0.36, h: 0.25,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.subtle, align: "center", charSpacing: 2,
        });
        slide.addText(s.result, {
          x: x + 0.18, y: sY + 1.9, w: sW - 0.36, h: sH - 2.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, align: "center", valign: "top",
        });
      });
    },
  },

  // ─── 18. 2026 ROADMAP ─────────────────────────────────────────
  {
    label: "2026 Roadmap",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Value & close", "2026 Use Case Roadmap",
        "Phased delivery — each phase builds on proven value");

      const phases = [
        {
          phase: "H1 2026", label: "In Production & Quick Wins", color: C.sky,
          items: [
            "✓ Regulation Database Integration with ContentManager365",
            "✓ ContentManager365 ↔ TrainingManager365 Integration",
            "Safety report auto-categorisation",
            "Audit evidence package generation",
          ],
        },
        {
          phase: "H2 2026", label: "Connected Operations", color: C.violet,
          items: [
            "Safety Report Submissions within ContentManager365",
            "UI Unification across all solutions",
            "Platform PoCs with early adopter airlines",
            "Proactive pattern detection (smoke & fumes, fatigue)",
            "Executive outcome dashboards",
          ],
        },
        {
          phase: "2027+", label: "Intelligent Operations", color: C.prove,
          items: [
            "Predictive risk modelling across fleet",
            "Full platform use-case coverage",
            "Insurance portfolio evidence automation",
            "Industry benchmarking and peer comparison",
          ],
        },
      ];
      const pY = CONTENT_TOP;
      // Timeline ruler at top
      const rulerY = pY;
      slide.addShape("rect", {
        x: 0.5, y: rulerY + 0.18, w: W - 1, h: 0.04,
        fill: { color: C.hairline }, line: { type: "none" },
      });
      const tickPositions = [0.5, (W) / 2, W - 0.5];
      const tickColors = [C.sky, C.violet, C.prove];
      const tickLabels = ["H1 2026", "H2 2026", "2027+"];
      tickPositions.forEach((tx, i) => {
        slide.addShape("ellipse", {
          x: tx - 0.1, y: rulerY + 0.1, w: 0.2, h: 0.2,
          fill: { color: tickColors[i] }, line: { type: "none" },
        });
        slide.addText(tickLabels[i], {
          x: tx - 1, y: rulerY + 0.32, w: 2, h: 0.22,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: tickColors[i],
          align: "center", charSpacing: 3,
        });
      });
      const phasesY = pY + 0.65;
      const pH = CONTENT_BOTTOM - phasesY - 0.6;
      const pW = (W - 1 - 2 * 0.25) / 3;
      phases.forEach((p, i) => {
        const x = 0.5 + i * (pW + 0.25);
        addCard(slide, x, phasesY, pW, pH, { border: p.color });
        slide.addText(p.phase, {
          x: x + 0.2, y: phasesY + 0.15, w: pW - 0.4, h: 0.25,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.subtle, charSpacing: 3,
        });
        slide.addText(p.label, {
          x: x + 0.2, y: phasesY + 0.42, w: pW - 0.4, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color: p.color,
        });
        const items = p.items.map((it) => ({
          text: it.startsWith("✓") ? it.slice(2) : it,
          options: { bullet: { code: it.startsWith("✓") ? "2713" : "25CF" }, color: it.startsWith("✓") ? C.prove : C.ink },
        }));
        slide.addText(items, {
          x: x + 0.2, y: phasesY + 0.95, w: pW - 0.4, h: pH - 1.05,
          fontFace: PPTX_BRAND.font.body, fontSize: 10.5, color: C.ink, paraSpaceAfter: 6,
        });
      });
      // illustrative note
      const nY = CONTENT_BOTTOM - 0.4;
      addCard(slide, 0.5, nY, W - 1, 0.4, { border: C.amber, fill: "1F1A0A" });
      slide.addText("Note: Roadmap content is illustrative — specific deliverables to be defined during the discovery workshop based on your operational priorities.", {
        x: 0.7, y: nY, w: W - 1.4, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, italic: true, align: "center", valign: "middle",
      });
    },
  },

  // ─── 19. WHY COMPLY365 ────────────────────────────────────────
  {
    label: "Why Comply365",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Value & close", "Outcomes & Why Comply365",
        "Measured outcomes from carriers running on the platform — and the three things that make them possible");

      // Outcomes strip
      const outcomes = [
        { v: "78%", l: "Reduction in repeat events", c: C.rose },
        { v: "6 wks → 48 hrs", l: "Signal to coordinated response", c: C.blue },
        { v: "5 days", l: "Directive to crew acknowledgement", c: C.violet },
        { v: "90% vs 35%", l: "Domain accuracy vs generic AI", c: C.amber },
      ];
      const oY = CONTENT_TOP;
      const oH = 1.05;
      const oW = (W - 1 - 3 * 0.2) / 4;
      outcomes.forEach((o, i) => {
        const x = 0.5 + i * (oW + 0.2);
        addCard(slide, x, oY, oW, oH, { border: C.primary });
        slide.addText(o.v, {
          x: x + 0.1, y: oY + 0.12, w: oW - 0.2, h: 0.5,
          fontFace: PPTX_BRAND.font.display, fontSize: 22, bold: true, color: o.c, align: "center",
        });
        slide.addText(o.l, {
          x: x + 0.1, y: oY + 0.62, w: oW - 0.2, h: 0.4,
          fontFace: PPTX_BRAND.font.body, fontSize: 9.5, color: C.muted, align: "center",
        });
      });

      // 3 differentiators
      const diffs = [
        { title: "Connected Foundation", desc: "One data model, three core apps, one intelligence layer. Content, training and safety reason together — not in parallel.", color: C.sky },
        { title: "Domain-Trained Intelligence", desc: "Insights & Intelligence built on aviation data since 2023. Not a generic AI with an aviation wrapper — purpose-built for the operational corpus.", color: C.primary },
        { title: "Proof by Design", desc: "Every action logged automatically. The audit trail is a byproduct, not a report. Closed loop — Detect, Trigger, Orchestrate, Prove.", color: C.prove },
      ];
      const dY = oY + oH + 0.25;
      const dH = 2.4;
      const dW = (W - 1 - 2 * 0.2) / 3;
      diffs.forEach((d, i) => {
        const x = 0.5 + i * (dW + 0.2);
        addLabeledCard(slide, x, dY, dW, dH, {
          title: d.title, body: d.desc, accent: d.color, titleSize: 14, bodySize: 11,
        });
      });

      // Trust strip
      const trust = [
        { v: "550+", l: "Airlines Worldwide" },
        { v: "~2.5M", l: "Users" },
        { v: "6", l: "Continents" },
      ];
      const tY = dY + dH + 0.25;
      addCard(slide, 0.5, tY, W - 1, 0.7, { fill: C.surfaceAlt });
      const tW = (W - 1) / 4;
      trust.forEach((t, i) => {
        const tx = 0.5 + i * tW;
        slide.addText(t.v, {
          x: tx + 0.1, y: tY + 0.05, w: tW - 0.2, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 16, bold: true, color: C.primary, align: "center",
        });
        slide.addText(t.l, {
          x: tx + 0.1, y: tY + 0.42, w: tW - 0.2, h: 0.25,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, align: "center",
        });
      });
      slide.addText('"Point solutions manage silos. Generic AI creates noise. We close the loop."', {
        x: 0.5 + 3 * tW, y: tY, w: tW, h: 0.7,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.ink, italic: true, align: "center", valign: "middle",
      });
    },
  },

  // ─── 20. PARTNERSHIP ─────────────────────────────────────────
  {
    label: "Partnership",
    build: (slide, ctx) => {
      chrome(slide, ctx);
      header(slide, "Value & close", "Partnership Model",
        "Your path to connected operational performance");

      const steps = [
        { n: "01", title: "Discover", color: C.sky, timeline: "Week 1–2", desc: "Half-day workshop to map your operational landscape, identify high-value use cases, and define your maturity starting point." },
        { n: "02", title: "Pilot", color: C.violet, timeline: "Months 1–3", desc: "90-day proof of value on your top use case. Measurable outcomes from week one. Full DTOP pipeline in production." },
        { n: "03", title: "Scale", color: C.prove, timeline: "Months 4–12", desc: "Expand across departments and use cases with a phased roadmap. Each phase builds on proven value — no big-bang required." },
      ];
      const sY = CONTENT_TOP;
      const sH = 3.3;
      const sW = (W - 1 - 2 * 0.3) / 3;
      steps.forEach((s, i) => {
        const x = 0.5 + i * (sW + 0.3);
        addCard(slide, x, sY, sW, sH, { border: s.color });
        // step badge
        slide.addShape("roundRect", {
          x: x + 0.2, y: sY + 0.2, w: 1.0, h: 0.4,
          fill: { color: s.color }, line: { type: "none" }, rectRadius: 0.05,
        });
        slide.addText(`STEP ${s.n}`, {
          x: x + 0.2, y: sY + 0.2, w: 1.0, h: 0.4,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.bg, align: "center", valign: "middle", charSpacing: 2,
        });
        slide.addText(s.title, {
          x: x + 0.2, y: sY + 0.75, w: sW - 0.4, h: 0.5,
          fontFace: PPTX_BRAND.font.display, fontSize: 22, bold: true, color: s.color,
        });
        slide.addText(s.desc, {
          x: x + 0.2, y: sY + 1.35, w: sW - 0.4, h: sH - 2.0,
          fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.muted, valign: "top",
        });
        // Timeline footer
        addDivider(slide, x + 0.2, sY + sH - 0.55, sW - 0.4);
        slide.addText("TIMELINE", {
          x: x + 0.2, y: sY + sH - 0.5, w: sW - 0.4, h: 0.2,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.subtle, charSpacing: 2,
        });
        slide.addText(s.timeline, {
          x: x + 0.2, y: sY + sH - 0.3, w: sW - 0.4, h: 0.25,
          fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: s.color,
        });
      });

      // CTA
      const ctaY = sY + sH + 0.25;
      const ctaH = CONTENT_BOTTOM - ctaY;
      addCard(slide, 0.5, ctaY, W - 1, ctaH, { fill: C.primarySoft, border: C.primary });
      slide.addText("What does your first use case look like?", {
        x: 0.5, y: ctaY + 0.15, w: W - 1, h: 0.5,
        fontFace: PPTX_BRAND.font.display, fontSize: 22, bold: true, color: C.ink, align: "center",
      });
      slide.addText("Let's start with a discovery workshop to identify the use case that delivers the most value — and prove it in 90 days.", {
        x: 1.5, y: ctaY + 0.7, w: W - 3, h: ctaH - 0.8,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, color: C.muted, align: "center",
      });
    },
  },
);

export async function buildTechnicalDeck(opts: BuildOpts = {}): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: "WIDE_16_9", width: PPTX_BRAND.size.w, height: PPTX_BRAND.size.h });
  pptx.layout = "WIDE_16_9";
  pptx.title = "Comply365 — Technical Deep Dive";
  pptx.author = "Comply365";
  pptx.company = "Comply365";

  const logo = await loadImageAsBase64(logoUrl).catch(() => "");

  // Section divider helper specs.
  const dividerSpec = (
    eyebrow: string,
    title: string,
    subtitle: string,
    sectionIndex: number,
  ): SlideSpec => ({
    label: `Section · ${title}`,
    build: (slide, ctx) => {
      addSectionDivider(slide, {
        eyebrow,
        title,
        subtitle,
        index: sectionIndex,
        logo: ctx.logo,
      });
      // Slide counter footer only (no full chrome over the hero).
      slide.addText(
        `${String(ctx.index + 1).padStart(2, "0")} / ${String(ctx.total).padStart(2, "0")}`,
        {
          x: PPTX_BRAND.size.w - 1.4, y: PPTX_BRAND.size.h - 0.38, w: 1, h: 0.3,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, align: "right",
        },
      );
      slide.addText(DECK_LABEL, {
        x: 0.42, y: PPTX_BRAND.size.h - 0.38, w: 5.8, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted,
      });
    },
  });

  // Sources & methodology appendix.
  const appendixSpec: SlideSpec = {
    label: "Sources & Methodology",
    build: (slide, ctx) => {
      addBrandMaster(slide, {
        logo: ctx.logo, index: ctx.index, total: ctx.total,
        deckLabel: DECK_LABEL, variant: "dark", grid: false,
      });
      addEyebrow(slide, 0.5, 0.45, 12, "Appendix");
      slide.addText("Sources & Methodology", {
        x: 0.5, y: 0.72, w: 12.3, h: 0.55,
        fontFace: PPTX_BRAND.font.display, fontSize: 24, bold: true, color: C.ink,
      });
      slide.addText(
        "Every cost figure in this deck traces to published industry benchmarks. Use the citations below to validate assumptions during your discovery workshop.",
        {
          x: 0.5, y: 1.25, w: 12.3, h: 0.45,
          fontFace: PPTX_BRAND.font.body, fontSize: 12, color: C.muted, italic: true,
        },
      );

      // Methodology callout
      addCalloutBanner(slide, 0.5, 1.85, W - 1, 0.7, methodologyNote, C.primary);

      // Two-column citation list
      const entries = Object.entries(sourceCitations);
      const half = Math.ceil(entries.length / 2);
      const colW = (W - 1 - 0.3) / 2;
      const top = 2.75;
      const rowH = (CONTENT_BOTTOM - top) / half;
      entries.forEach(([key, src], i) => {
        const col = i < half ? 0 : 1;
        const row = i % half;
        const x = 0.5 + col * (colW + 0.3);
        const y = top + row * rowH;
        // small id chip
        slide.addShape("roundRect", {
          x, y: y + 0.05, w: 0.6, h: 0.28,
          fill: { color: C.surfaceAlt }, line: { color: C.primary, width: 0.5 }, rectRadius: 0.05,
        });
        slide.addText(key.toUpperCase(), {
          x, y: y + 0.05, w: 0.6, h: 0.28,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: C.primary,
          align: "center", valign: "middle",
        });
        slide.addText(src, {
          x: x + 0.7, y, w: colW - 0.7, h: rowH - 0.1,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, valign: "top",
        });
      });
    },
  };

  // Compose the final deck order with dividers + appendix.
  // Original slide indices we want to gate behind dividers:
  //   3 → Foundations, 8 → Intelligence, 16 → Outcomes, 17 → Roadmap
  const dividerBeforeIndex: Record<number, { eyebrow: string; title: string; subtitle: string }> = {
    3: { eyebrow: "Act 2", title: "Foundations", subtitle: "Architecture, data and the core operational apps." },
    8: { eyebrow: "Act 3", title: "Intelligence", subtitle: "Insights & Intelligence, Recommendations & Prescriptive Actions, and Automation across the unified mobile shell." },
    16: { eyebrow: "Act 5", title: "Outcomes", subtitle: "Line of sight from costed use case to executive outcome." },
    17: { eyebrow: "Act 5", title: "Roadmap", subtitle: "Maturity, phased delivery, and the partnership model." },
  };

  const composed: SlideSpec[] = [];
  let sectionIdx = 1;
  slideSpecs.forEach((spec, i) => {
    const div = dividerBeforeIndex[i];
    if (div) {
      composed.push(dividerSpec(div.eyebrow, div.title, div.subtitle, sectionIdx));
      sectionIdx += 1;
    }
    composed.push(spec);
  });
  composed.push(appendixSpec);

  const total = composed.length;

  for (let i = 0; i < composed.length; i++) {
    const spec = composed[i];
    opts.onProgress?.(i, total, spec.label);
    const slide = pptx.addSlide();
    try {
      await spec.build(slide, { logo, index: i, total });
    } catch (err) {
      console.error(`PPTX slide ${i} (${spec.label}) failed:`, err);
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
