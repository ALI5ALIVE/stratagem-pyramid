import pptxgen from "pptxgenjs";
import {
  PPTX_BRAND,
  paintBackground,
  addBrandedFooter,
  addTitleBlock,
  addCard,
  addBulletList,
  addStatTile,
  addDtopPills,
  addImageFallback,
  addBrandLogo,
  loadImageAsBase64,
} from "@/lib/pptxBrand";
import { renderComponentToPng } from "./renderToImage";
import logoUrl from "@/assets/comply365-logo-white.png";

// Slide components for image-fallback rendering
import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import TechSlide2IndustryChallenge from "@/components/tech-slides/TechSlide2IndustryChallenge";
import TechSlide4Platform from "@/components/tech-slides/TechSlide4Platform";
import TechSlide4aSafetyManager from "@/components/tech-slides/TechSlide4aSafetyManager";
import TechSlide4bContentManager from "@/components/tech-slides/TechSlide4bContentManager";
import TechSlide4cTrainingManager from "@/components/tech-slides/TechSlide4cTrainingManager";
import TechSlideDataFoundation from "@/components/tech-slides/TechSlideDataFoundation";
import TechSlideInsights from "@/components/tech-slides/TechSlideInsights";
import TechSlideAutomation from "@/components/tech-slides/TechSlideAutomation";
import TechSlideMobile from "@/components/tech-slides/TechSlideMobile";
import TechSlideTiersVsAI from "@/components/tech-slides/TechSlideTiersVsAI";
import TechSlideUseCases from "@/components/tech-slides/TechSlideUseCases";
import TechSlide6PlatformIntegrations from "@/components/tech-slides/TechSlide6PlatformIntegrations";
import TechSlideCalculator from "@/components/tech-slides/TechSlideCalculator";
import TechSlide14MaturityRoadmap from "@/components/tech-slides/TechSlide14MaturityRoadmap";
import TechSlide15Roadmap2026 from "@/components/tech-slides/TechSlide15Roadmap2026";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";
import TechSlide18Partnership from "@/components/tech-slides/TechSlide18Partnership";

const C = PPTX_BRAND.color;
const DECK_LABEL = "Technical Deep Dive";

export interface BuildOpts {
  onProgress?: (current: number, total: number, label: string) => void;
}

interface SlideSpec {
  label: string;
  build: (slide: pptxgen.Slide, ctx: { logo: string; index: number; total: number }) => Promise<void> | void;
}

function footerWrap(
  slide: pptxgen.Slide,
  ctx: { logo: string; index: number; total: number },
  variant: "dark" | "light" = "dark",
) {
  paintBackground(slide, variant);
  addBrandLogo(slide, ctx.logo, variant);
  addBrandedFooter(slide, ctx.index, ctx.total, DECK_LABEL, variant);
}

/** Helper: a "hero" card slide with image fallback for complex visuals. */
function imageFallbackSlide(
  label: string,
  Component: React.ComponentType<any>,
  eyebrow: string,
  title: string,
  subtitle?: string,
): SlideSpec {
  return {
    label,
    build: async (slide, ctx) => {
      footerWrap(slide, ctx);
      addTitleBlock(slide, { eyebrow, title, subtitle, y: 0.45 });
      const png = await renderComponentToPng(Component, { slideNumber: ctx.index });
      // Image area below title block
      const y = subtitle ? 2.0 : 1.7;
      const h = PPTX_BRAND.size.h - y - 0.7;
      const w = h * (16 / 9);
      const x = (PPTX_BRAND.size.w - w) / 2;
      addImageFallback(slide, png, x, y, w, h, "High-fidelity capture · edit text natively in PPT");
    },
  };
}

const slideSpecs: SlideSpec[] = [
  // 0 — Title
  {
    label: "Title",
    build: (slide, ctx) => {
      footerWrap(slide, ctx);
      slide.addText("THE COMPLETE PLATFORM STORY", {
        x: 0.5, y: 2.2, w: 12.3, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true, color: C.primary, charSpacing: 6, align: "center",
      });
      slide.addText([
        { text: "Operational Performance\n", options: { color: C.ink } },
        { text: "Platform", options: { color: C.primary } },
      ], {
        x: 0.5, y: 2.7, w: 12.3, h: 2.0,
        fontFace: PPTX_BRAND.font.display, fontSize: 56, bold: true, align: "center",
      });
      slide.addText(
        "The technical deep-dive: architecture, intelligence, every use case costed, and your roadmap to predictable, measurable, provable operations.",
        {
          x: 1.5, y: 4.9, w: 10.3, h: 1.0,
          fontFace: PPTX_BRAND.font.body, fontSize: 14, color: C.muted, align: "center",
        },
      );
      // Trust stats row
      const stats = [
        { v: "550+", l: "Airlines Worldwide" },
        { v: "6", l: "Continents" },
        { v: "Global", l: "Aviation & AI Experts" },
      ];
      const tileW = 2.4, tileH = 0.9, gap = 0.3;
      const totalW = stats.length * tileW + (stats.length - 1) * gap;
      let x = (PPTX_BRAND.size.w - totalW) / 2;
      stats.forEach((s) => {
        addStatTile(slide, x, 6.0, tileW, tileH, s.v, s.l);
        x += tileW + gap;
      });
    },
  },

  // 1 — Strategic Shift
  imageFallbackSlide(
    "Strategic Shift",
    TechSlide1StrategicShift,
    "Act 1 · Frame the problem",
    "The Strategic Shift",
    "From fragmented tools to a unified operational platform.",
  ),

  // 2 — Industry Challenge
  imageFallbackSlide(
    "Industry Challenge",
    TechSlide2IndustryChallenge,
    "Act 1 · Frame the problem",
    "The Industry Challenge",
    "$25–35B annual exposure across safety, compliance, ops and training.",
  ),

  // 3 — Platform Overview (native rebuild)
  {
    label: "Platform Overview",
    build: (slide, ctx) => {
      footerWrap(slide, ctx);
      addTitleBlock(slide, {
        eyebrow: "Act 2 · Architecture",
        title: "The Operational Performance Platform",
        subtitle: "Three core managers + intelligence + mobile + DTOP, on one connected foundation.",
      });
      const modules = [
        { name: "SafetyManager365", desc: "SMS, risk, occurrence reporting, investigations." },
        { name: "ContentManager365", desc: "Manuals, regulations, controlled content lifecycle." },
        { name: "TrainingManager365", desc: "Competency, certification, evidence of capability." },
      ];
      const cardW = 4.0, cardH = 2.0, gap = 0.3;
      const totalW = modules.length * cardW + (modules.length - 1) * gap;
      let x = (PPTX_BRAND.size.w - totalW) / 2;
      modules.forEach((m) => {
        addCard(slide, x, 2.5, cardW, cardH);
        slide.addText(m.name, {
          x: x + 0.25, y: 2.7, w: cardW - 0.5, h: 0.5,
          fontFace: PPTX_BRAND.font.display, fontSize: 16, bold: true, color: C.ink,
        });
        slide.addText(m.desc, {
          x: x + 0.25, y: 3.2, w: cardW - 0.5, h: 1.2,
          fontFace: PPTX_BRAND.font.body, fontSize: 12, color: C.muted,
        });
        x += cardW + gap;
      });
      // CoAnalyst banner
      addCard(slide, 0.7, 4.8, PPTX_BRAND.size.w - 1.4, 1.0, { fill: C.primarySoft, border: C.primary });
      slide.addText("CoAnalyst — the intelligence layer above all three managers", {
        x: 0.9, y: 4.95, w: PPTX_BRAND.size.w - 1.8, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 16, bold: true, color: C.ink,
      });
      slide.addText("Detect signals, trigger workflows, orchestrate response, prove outcomes — across every module.", {
        x: 0.9, y: 5.35, w: PPTX_BRAND.size.w - 1.8, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, color: C.ink,
      });
      addDtopPills(slide, 0.7, 6.05, PPTX_BRAND.size.w - 1.4);
    },
  },

  imageFallbackSlide("SafetyManager365", TechSlide4aSafetyManager, "Act 2 · Architecture", "SafetyManager365"),
  imageFallbackSlide("ContentManager365", TechSlide4bContentManager, "Act 2 · Architecture", "ContentManager365"),
  imageFallbackSlide("TrainingManager365", TechSlide4cTrainingManager, "Act 2 · Architecture", "TrainingManager365"),
  imageFallbackSlide("Data Foundation", TechSlideDataFoundation, "Act 2 · Architecture", "The Data Foundation"),

  // 8 — CoAnalyst (native rebuild)
  {
    label: "CoAnalyst",
    build: (slide, ctx) => {
      footerWrap(slide, ctx);
      addTitleBlock(slide, {
        eyebrow: "Act 3 · Intelligence layer",
        title: "CoAnalyst — Intelligence & Orchestration",
        subtitle: "From Reports to Intelligence. From Events to Control.",
      });
      const pipeline = [
        { l: "Ingest", d: "Operational signals, manuals, training records, telemetry." },
        { l: "Enrich", d: "Context from policy, history, regulation, peer benchmarks." },
        { l: "Reason", d: "Hybrid AI — symbolic rules + ML + LLMs." },
        { l: "Answer", d: "Grounded recommendations with evidence." },
        { l: "Activate", d: "Trigger workflows, tasks, audit trail." },
      ];
      const w = 2.3, h = 2.4, gap = 0.18;
      const totalW = pipeline.length * w + (pipeline.length - 1) * gap;
      let x = (PPTX_BRAND.size.w - totalW) / 2;
      pipeline.forEach((p, i) => {
        addCard(slide, x, 2.4, w, h);
        slide.addText(`0${i + 1}`, {
          x: x + 0.2, y: 2.55, w: w - 0.4, h: 0.3,
          fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.primary, bold: true, charSpacing: 4,
        });
        slide.addText(p.l, {
          x: x + 0.2, y: 2.85, w: w - 0.4, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 16, bold: true, color: C.ink,
        });
        slide.addText(p.d, {
          x: x + 0.2, y: 3.3, w: w - 0.4, h: 1.4,
          fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.muted,
        });
        x += w + gap;
      });
      // stats
      addStatTile(slide, 2.5, 5.4, 4, 1.2, "90%", "Domain accuracy vs ~35% generic AI", C.prove);
      addStatTile(slide, 6.8, 5.4, 4, 1.2, "60+", "Languages supported", C.accent);
    },
  },

  imageFallbackSlide("Insights & Recommendations", TechSlideInsights, "Act 3 · Intelligence layer", "Insights & Recommended Actions"),
  imageFallbackSlide("Automation", TechSlideAutomation, "Act 3 · Intelligence layer", "Operational Automation"),
  imageFallbackSlide("Unified Mobile", TechSlideMobile, "Act 3 · Intelligence layer", "Unified Mobile Experience"),

  // 12 — DTOP (native rebuild)
  {
    label: "DTOP Operating Model",
    build: (slide, ctx) => {
      footerWrap(slide, ctx);
      addTitleBlock(slide, {
        eyebrow: "Act 4 · Operating model",
        title: "Detect → Trigger → Orchestrate → Prove",
        subtitle: "A closed-loop operating model that turns signals into provable outcomes.",
      });
      const steps = [
        { letter: "D", label: "Detect", color: C.detect, desc: "Continuous signal capture across ops, safety, content, training." },
        { letter: "T", label: "Trigger", color: C.trigger, desc: "Policy + AI evaluate, escalate, route to the right owner." },
        { letter: "O", label: "Orchestrate", color: C.orchestrate, desc: "Workflows, tasks, manuals, training updates run in lock-step." },
        { letter: "P", label: "Prove", color: C.prove, desc: "Auditable evidence chain — every action timestamped and signed." },
      ];
      const w = 2.95, h = 3.0, gap = 0.2;
      let x = 0.5;
      steps.forEach((s) => {
        addCard(slide, x, 2.5, w, h, { border: s.color });
        slide.addShape("ellipse", {
          x: x + w / 2 - 0.4, y: 2.7, w: 0.8, h: 0.8,
          fill: { color: s.color }, line: { type: "none" },
        });
        slide.addText(s.letter, {
          x: x + w / 2 - 0.4, y: 2.7, w: 0.8, h: 0.8,
          fontFace: PPTX_BRAND.font.display, fontSize: 32, bold: true, color: C.bg, align: "center", valign: "middle",
        });
        slide.addText(s.label, {
          x: x + 0.2, y: 3.65, w: w - 0.4, h: 0.4,
          fontFace: PPTX_BRAND.font.display, fontSize: 18, bold: true, color: s.color, align: "center",
        });
        slide.addText(s.desc, {
          x: x + 0.2, y: 4.15, w: w - 0.4, h: 1.2,
          fontFace: PPTX_BRAND.font.body, fontSize: 11, color: C.muted, align: "center",
        });
        x += w + gap;
      });
      addCard(slide, 0.5, 5.9, PPTX_BRAND.size.w - 1.0, 0.85, { fill: C.surfaceAlt });
      slide.addText("Every step is observable, governed, and auditable — that is the durable moat.", {
        x: 0.7, y: 6.0, w: PPTX_BRAND.size.w - 1.4, h: 0.65,
        fontFace: PPTX_BRAND.font.body, fontSize: 13, italic: true, color: C.ink, align: "center", valign: "middle",
      });
    },
  },

  imageFallbackSlide("Tiers vs Generic AI", TechSlideTiersVsAI, "Act 4 · Operating model", "Intelligence Tiers vs Generic AI"),
  imageFallbackSlide("Use Cases", TechSlideUseCases, "Act 4 · Operating model", "Use Cases by Tier"),
  imageFallbackSlide("Platform Integrations", TechSlide6PlatformIntegrations, "Act 4 · Operating model", "Platform Integrations — Live Case Studies"),

  imageFallbackSlide("Line of Sight Calculator", TechSlideCalculator, "Act 5 · Value & close", "Line of Sight — ROI Calculator"),
  imageFallbackSlide("Maturity Roadmap", TechSlide14MaturityRoadmap, "Act 5 · Value & close", "Maturity Roadmap"),
  imageFallbackSlide("2026 Roadmap", TechSlide15Roadmap2026, "Act 5 · Value & close", "Roadmap to 2026"),
  imageFallbackSlide("Why Comply365", TechSlideWhyComply, "Act 5 · Value & close", "Why Comply365"),

  // Final — Partnership / closing native
  {
    label: "Partnership",
    build: (slide, ctx) => {
      footerWrap(slide, ctx);
      slide.addText("LET'S BUILD THIS TOGETHER", {
        x: 0.5, y: 2.5, w: 12.3, h: 0.4,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true, color: C.primary, charSpacing: 6, align: "center",
      });
      slide.addText("Partnership", {
        x: 0.5, y: 3.0, w: 12.3, h: 1.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 60, bold: true, color: C.ink, align: "center",
      });
      slide.addText("From signals to control — predictable, measurable, provable operations.", {
        x: 1.5, y: 4.6, w: 10.3, h: 0.8,
        fontFace: PPTX_BRAND.font.body, fontSize: 16, color: C.muted, align: "center",
      });
      const pillars = [
        { v: "Connected", l: "Foundation" },
        { v: "Operational", l: "Intelligence" },
        { v: "Provable", l: "Outcomes" },
      ];
      const w = 2.6, gap = 0.3;
      const totalW = pillars.length * w + (pillars.length - 1) * gap;
      let x = (PPTX_BRAND.size.w - totalW) / 2;
      pillars.forEach((p) => {
        addStatTile(slide, x, 5.7, w, 1.0, p.v, p.l);
        x += w + gap;
      });
    },
  },
];

export async function buildTechnicalDeck(opts: BuildOpts = {}): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.defineLayout({ name: "WIDE_16_9", width: PPTX_BRAND.size.w, height: PPTX_BRAND.size.h });
  pptx.layout = "WIDE_16_9";
  pptx.title = "Comply365 — Technical Deep Dive";
  pptx.author = "Comply365";
  pptx.company = "Comply365";

  const logo = await loadImageAsBase64(logoUrl).catch(() => "");
  const total = slideSpecs.length;

  for (let i = 0; i < slideSpecs.length; i++) {
    const spec = slideSpecs[i];
    opts.onProgress?.(i, total, spec.label);
    const slide = pptx.addSlide();
    try {
      await spec.build(slide, { logo, index: i, total });
    } catch (err) {
      console.error(`PPTX slide ${i} (${spec.label}) failed:`, err);
      paintBackground(slide, "dark");
      slide.addText(`Slide failed to render: ${spec.label}`, {
        x: 1, y: 3, w: 11.3, h: 1,
        fontFace: PPTX_BRAND.font.body, fontSize: 24, color: C.danger, align: "center",
      });
    }
  }

  opts.onProgress?.(total, total, "Packaging…");
  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  return blob;
}