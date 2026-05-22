import pptxgen from "pptxgenjs";
import { PPTX_BRAND, addCard, loadImageAsBase64 } from "@/lib/pptxBrand";
import logoUrlDark from "@/assets/comply365-logo-white.png";
import logoUrlLight from "@/assets/comply365-logo.png";
import { chrome, header, CONTENT_TOP, CONTENT_BOTTOM } from "./buildTechnicalDeck";
import {
  aiSolutions,
  noAISolution,
  productColumns,
  solutionColors,
} from "@/data/aiInfographic";
import type { BuildOpts } from "./types";

const W = PPTX_BRAND.size.w; // 13.333
const H = PPTX_BRAND.size.h; // 7.5
const C = PPTX_BRAND.color;

/** Builds a single-slide PPTX matching the source AI Solutions infographic. */
export async function buildAIInfographicDeck(opts: BuildOpts = {}): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pptx.title = "Comply365 — AI Capabilities";
  pptx.author = "Comply365";

  opts.onProgress?.(0, 1, "AI Capabilities");

  const [logo, logoLight] = await Promise.all([
    loadImageAsBase64(logoUrlDark).catch(() => ""),
    loadImageAsBase64(logoUrlLight).catch(() => ""),
  ]);

  const slide = pptx.addSlide();
  chrome(slide, { logo, logoLight, index: 0, total: 1 }, "dark");
  header(
    slide,
    "Platform",
    "AI Capabilities",
    "AI Solutions mapped to ContentManager365, TrainingManager365 and SafetyManager365 capabilities.",
  );

  // Layout grid: 4 columns, leave room at bottom for legend
  const legendH = 0.35;
  const gridTop = CONTENT_TOP;
  const gridBottom = CONTENT_BOTTOM - legendH - 0.15;
  const gridH = gridBottom - gridTop;
  const colGap = 0.25;
  const margin = 0.5;
  const colW = (W - margin * 2 - colGap * 3) / 4;

  const columnsX: Record<string, number> = {};
  const headerH = 0.45;
  const cellH = 0.46;
  const cellGap = 0.14;

  // 1) AI Solutions column (left)
  const solX = margin;
  columnsX["solutions"] = solX;
  // Solutions column container — matches product columns but with primary border
  addCard(slide, solX, gridTop, colW, gridH, { fill: C.surface, radius: 0.18 });
  slide.addShape("roundRect", {
    x: solX, y: gridTop, w: colW, h: gridH,
    fill: { type: "none" }, line: { color: C.primary, width: 1.5 }, rectRadius: 0.18,
  });
  // Header bar
  const solHeaderH = 0.5;
  slide.addShape("roundRect", {
    x: solX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: solHeaderH,
    fill: { color: C.primary }, line: { type: "none" }, rectRadius: 0.12,
  });
  slide.addText("AI SOLUTIONS", {
    x: solX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: solHeaderH,
    fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, charSpacing: 3,
    color: "FFFFFF", align: "center", valign: "middle",
  });
  // White underline accent
  slide.addShape("rect", {
    x: solX + colW / 2 - 0.3, y: gridTop + 0.15 + solHeaderH - 0.07,
    w: 0.6, h: 0.03,
    fill: { color: "FFFFFF" }, line: { type: "none" },
  });

  // Solution chips
  const solCenters: Record<string, { x: number; y: number }> = {};
  const solChipH = 0.5;
  const solChipGap = 0.12;
  let cy = gridTop + 0.15 + solHeaderH + 0.25;
  aiSolutions.forEach((sol) => {
    const chipX = solX + 0.2;
    const chipW = colW - 0.4;
    const accent = solutionColors[sol.id].pptx;
    // Filled colored chip
    slide.addShape("roundRect", {
      x: chipX, y: cy, w: chipW, h: solChipH,
      fill: { color: accent }, line: { type: "none" }, rectRadius: 0.1,
    });
    // White dot anchor
    slide.addShape("ellipse", {
      x: chipX + 0.18, y: cy + solChipH / 2 - 0.09, w: 0.18, h: 0.18,
      fill: { color: "FFFFFF" }, line: { type: "none" },
    });
    slide.addText(sol.label, {
      x: chipX + 0.45, y: cy, w: chipW - 0.5, h: solChipH,
      fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true,
      color: "FFFFFF", align: "left", valign: "middle",
    });
    solCenters[sol.id] = { x: chipX + chipW, y: cy + solChipH / 2 };
    cy += solChipH + solChipGap;
  });

  // No AI chip near bottom
  const noAiY = gridBottom - 0.2 - solChipH;
  const chipX = solX + 0.2;
  const chipW = colW - 0.4;
  slide.addShape("roundRect", {
    x: chipX, y: noAiY, w: chipW, h: solChipH,
    fill: { color: C.surfaceAlt },
    line: { color: C.muted, width: 1, dashType: "dash" }, rectRadius: 0.1,
  });
  slide.addText("No AI", {
    x: chipX, y: noAiY, w: chipW, h: solChipH,
    fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true,
    color: C.muted, align: "center", valign: "middle",
  });
  solCenters["noai"] = { x: chipX + chipW, y: noAiY + solChipH / 2 };

  // 2-4) Product columns
  const rowCenters: Record<string, { x: number; y: number }> = {};
  productColumns.forEach((col, idx) => {
    const colX = margin + (idx + 1) * (colW + colGap);
    columnsX[col.id] = colX;
    addCard(slide, colX, gridTop, colW, gridH, { fill: C.surface, radius: 0.15 });
    slide.addShape("roundRect", {
      x: colX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: headerH,
      fill: { color: C.primary }, line: { type: "none" }, rectRadius: 0.1,
    });
    slide.addText(col.product, {
      x: colX + 0.15, y: gridTop + 0.15, w: colW - 0.3, h: headerH,
      fontFace: PPTX_BRAND.font.display, fontSize: 13, bold: true,
      color: "FFFFFF", align: "center", valign: "middle",
    });

    let ry = gridTop + 0.15 + headerH + 0.25;
    col.rows.forEach((row) => {
      const rX = colX + 0.2;
      const rW = colW - 0.4;
      slide.addShape("roundRect", {
        x: rX, y: ry, w: rW, h: cellH,
        fill: { color: C.surfaceAlt },
        line: { color: row.ai ? C.primary : C.muted, width: 0.75, dashType: row.ai ? "solid" : "dash" },
        rectRadius: 0.08,
      });
      slide.addText(row.label, {
        x: rX, y: ry, w: rW, h: cellH,
        fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: row.ai,
        color: row.ai ? C.ink : C.muted, align: "center", valign: "middle",
      });
      rowCenters[row.id] = { x: rX, y: ry + cellH / 2 };
      ry += cellH + cellGap;
    });
  });

  // Connector arrows: pptxgenjs "line" shapes require non-negative w/h,
  // so we compute absolute dimensions and use flipH/flipV when the
  // target is left of / above the source.
  const drawArrow = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    color: string,
  ) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    slide.addShape("line", {
      x: Math.min(from.x, to.x),
      y: Math.min(from.y, to.y),
      w: Math.max(Math.abs(dx), 0.01),
      h: Math.max(Math.abs(dy), 0.01),
      flipH: dx < 0,
      flipV: dy < 0,
      line: { color, width: 1.25, endArrowType: "triangle" },
    });
  };

  const allSolutions = [...aiSolutions, noAISolution];
  allSolutions.forEach((sol) => {
    const from = solCenters[sol.id];
    if (!from) return;
    const color = sol.tier === "ai" ? C.primary : C.muted;
    if (sol.targets.length === 0) {
      // Short stub arrow pointing right (mirrors the source slide)
      drawArrow(from, { x: from.x + 0.45, y: from.y }, color);
      return;
    }
    sol.targets.forEach((tid) => {
      const to = rowCenters[tid];
      if (!to) return;
      drawArrow(from, to, color);
    });
  });

  // Legend row above brand footer
  const legY = gridBottom + 0.15;
  const drawSwatch = (x: number, color: string, label: string) => {
    slide.addShape("rect", {
      x, y: legY + 0.06, w: 0.18, h: 0.18,
      fill: { color }, line: { type: "none" },
    });
    slide.addText(label, {
      x: x + 0.26, y: legY, w: 2.5, h: 0.3,
      fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, valign: "middle",
    });
  };
  drawSwatch(margin, C.primary, "AI-enabled capability");
  drawSwatch(margin + 2.4, C.muted, "Standard (no AI) capability");

  opts.onProgress?.(1, 1, "AI Capabilities");

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  return blob;
}