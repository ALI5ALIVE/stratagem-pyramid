import pptxgen from "pptxgenjs";
import {
  PPTX_BRAND,
  paintBackground,
  addCard,
  loadImageAsBase64,
  addEyebrow,
  addLabeledCard,
  addPillRow,
  addBrandMaster,
  addBrandStatBlock,
  addCalloutBanner,
  addGlowWash,
  addDivider,
  addPill,
} from "@/lib/pptxBrand";
import logoUrlDark from "@/assets/comply365-logo-white.png";
import logoUrlLight from "@/assets/comply365-logo.png";
import platformEcosystemUrl from "@/assets/platform-ecosystem.png";
import { useCases } from "@/data/lineOfSightData";

const C = PPTX_BRAND.color;
const W = PPTX_BRAND.size.w;
const DECK_LABEL = "Executive Pitch";

export interface BuildOpts {
  onProgress?: (current: number, total: number, label: string) => void;
}

interface SlideSpec {
  label: string;
  build: (slide: pptxgen.Slide, ctx: { logo: string; logoLight: string; index: number; total: number }) => Promise<void> | void;
}

const fmtMoney = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K` : `$${v}`;

const CONTENT_TOP = 1.85;
const CONTENT_BOTTOM = 6.85;

function chrome(
  slide: pptxgen.Slide,
  ctx: { logo: string; logoLight: string; index: number; total: number },
  variant: "dark" | "light" = "dark",
) {
  const isLight = variant === "light";
  addBrandMaster(slide, {
    logo: isLight ? ctx.logoLight : ctx.logo,
    index: ctx.index,
    total: ctx.total,
    deckLabel: DECK_LABEL,
    variant,
    grid: true,
  });
}

function header(slide: pptxgen.Slide, eyebrow: string, title: string, subtitle?: string) {
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

// ─── Slide 1 · Title ────────────────────────────────────────────
const titleSpec: SlideSpec = {
  label: "Title",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    const cy = 1.6;
    addGlowWash(slide, 0.5, 1.4, 6, 3, C.primary);
    slide.addText("THE OPERATIONAL PERFORMANCE PLATFORM", {
      x: 0.6, y: cy, w: W - 1.2, h: 0.4,
      fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true, color: C.primary, charSpacing: 4,
    });
    slide.addText(
      [
        { text: "What if operational ", options: { color: C.ink } },
        { text: "performance", options: { color: C.primary } },
        { text: " was predictable?", options: { color: C.ink } },
      ],
      {
        x: 0.6, y: cy + 0.55, w: W - 1.2, h: 1.9,
        fontFace: PPTX_BRAND.font.display, fontSize: 44, bold: true,
      },
    );
    slide.addText("From fragmented signals to connected outcomes.", {
      x: 0.6, y: cy + 2.55, w: W - 1.2, h: 0.4,
      fontFace: PPTX_BRAND.font.body, fontSize: 18, color: C.muted,
    });
    slide.addText("Predictable. Measurable. Provable.", {
      x: 0.6, y: cy + 2.95, w: W - 1.2, h: 0.4,
      fontFace: PPTX_BRAND.font.body, fontSize: 18, color: C.muted, italic: true,
    });

    // Trust strip — 3 stats
    const stats = [
      { v: "550+", l: "Airlines worldwide", c: C.primary },
      { v: "~2.5M", l: "Users", c: C.accent },
      { v: "6", l: "Continents", c: C.violet },
    ];
    const tileW = 2.4, tileH = 0.95, gap = 0.3;
    const totW = stats.length * tileW + (stats.length - 1) * gap;
    let sx = (W - totW) / 2;
    stats.forEach((s) => {
      addBrandStatBlock(slide, sx, 5.7, tileW, tileH, s.v, s.l, s.c);
      sx += tileW + gap;
    });
  },
};

// ─── Slide 2 · Before (fragmentation) ───────────────────────────
const beforeSpec: SlideSpec = {
  label: "The Before",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "The Strategic Shift · 1 of 2", "Before — Disconnected Operations",
      "Three core systems run in parallel — none of them talk.");

    // Left: stat block + visual silos
    const leftX = 0.5;
    const leftW = 5.5;
    const leftY = CONTENT_TOP;
    const leftH = CONTENT_BOTTOM - leftY;
    addCard(slide, leftX, leftY, leftW, leftH, { fill: C.surfaceAlt, border: C.danger });
    slide.addText("THE FRAGMENTATION TAX", {
      x: leftX + 0.25, y: leftY + 0.2, w: leftW - 0.5, h: 0.3,
      fontFace: PPTX_BRAND.font.body, fontSize: 10, bold: true, color: C.danger, charSpacing: 4,
    });

    // Three silos in row
    const silos = [
      { name: "SAFETY", color: C.rose, vol: "12K signals/mo" },
      { name: "CONTENT", color: C.amber, vol: "Manual revisions" },
      { name: "TRAINING", color: C.violet, vol: "Disconnected records" },
    ];
    const siloY = leftY + 0.7;
    const siloH = 1.85;
    const siloGap = 0.18;
    const siloW = (leftW - 0.5 - siloGap * 2) / 3;
    silos.forEach((s, i) => {
      const sx = leftX + 0.25 + i * (siloW + siloGap);
      slide.addShape("roundRect", {
        x: sx, y: siloY, w: siloW, h: siloH,
        fill: { color: C.surface }, line: { color: s.color, width: 1, dashType: "dash" }, rectRadius: 0.08,
      });
      slide.addShape("ellipse", {
        x: sx + siloW / 2 - 0.25, y: siloY + 0.25, w: 0.5, h: 0.5,
        fill: { color: s.color }, line: { type: "none" },
      });
      slide.addText(s.name, {
        x: sx, y: siloY + 0.85, w: siloW, h: 0.3,
        fontFace: PPTX_BRAND.font.display, fontSize: 11, bold: true, color: s.color, align: "center",
      });
      slide.addText(s.vol, {
        x: sx, y: siloY + 1.15, w: siloW, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, color: C.muted, align: "center", italic: true,
      });
    });

    // "Data locked" pill
    const lockY = siloY + siloH + 0.3;
    slide.addShape("roundRect", {
      x: leftX + 0.5, y: lockY, w: leftW - 1, h: 0.55,
      fill: { color: "1F0A12" }, line: { color: C.danger, width: 1 }, rectRadius: 0.27,
    });
    slide.addText("⚠  Data locked in silos — no closed loop, no proof", {
      x: leftX + 0.5, y: lockY, w: leftW - 1, h: 0.55,
      fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: true, color: C.danger,
      align: "center", valign: "middle",
    });

    // Right: pain bullets
    const rightX = leftX + leftW + 0.3;
    const rightW = W - rightX - 0.5;
    const items = [
      { h: "Same incidents recur", d: "No cross-system pattern detection. The hazard nobody saw coming was visible in three other reports." },
      { h: "3-week investigations", d: "Evidence scattered across reports, training records and content libraries — manually stitched." },
      { h: "Compliance is reactive", d: "Audit prep starts after the auditor lands, not as a continuous byproduct of operations." },
      { h: "Decisions on stale data", d: "Executives review last quarter's noise instead of this week's signal." },
    ];
    const ih = (CONTENT_BOTTOM - leftY - (items.length - 1) * 0.15) / items.length;
    items.forEach((it, i) => {
      const iy = leftY + i * (ih + 0.15);
      addLabeledCard(slide, rightX, iy, rightW, ih, {
        title: it.h, body: it.d, accent: C.danger, titleSize: 12, bodySize: 10,
      });
    });
  },
};

// ─── Slide 3 · After (connected) ────────────────────────────────
const afterSpec: SlideSpec = {
  label: "The After",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "The Strategic Shift · 2 of 2", "After — Connected Performance",
      "One platform. One operating model. One entry point.");

    // Left: connected hub visual
    const leftX = 0.5;
    const leftW = 5.5;
    const leftY = CONTENT_TOP;
    const leftH = CONTENT_BOTTOM - leftY;
    addCard(slide, leftX, leftY, leftW, leftH, { fill: "0A1F18", border: C.prove });
    slide.addText("THE CONNECTED PLATFORM", {
      x: leftX + 0.25, y: leftY + 0.2, w: leftW - 0.5, h: 0.3,
      fontFace: PPTX_BRAND.font.body, fontSize: 10, bold: true, color: C.prove, charSpacing: 4,
    });

    // Center hub
    const hubCX = leftX + leftW / 2;
    const hubCY = leftY + 1.7;
    slide.addShape("ellipse", {
      x: hubCX - 0.55, y: hubCY - 0.55, w: 1.1, h: 1.1,
      fill: { color: C.primary, transparency: 65 }, line: { type: "none" },
    });
    slide.addShape("ellipse", {
      x: hubCX - 0.4, y: hubCY - 0.4, w: 0.8, h: 0.8,
      fill: { color: C.primary }, line: { type: "none" },
    });
    slide.addText("HUB", {
      x: hubCX - 0.4, y: hubCY - 0.4, w: 0.8, h: 0.8,
      fontFace: PPTX_BRAND.font.display, fontSize: 12, bold: true, color: C.bg,
      align: "center", valign: "middle",
    });

    // Three connected nodes
    const nodes = [
      { label: "SAFETY", color: C.rose, dx: -1.7, dy: -0.9 },
      { label: "CONTENT", color: C.amber, dx: 1.7, dy: -0.9 },
      { label: "TRAINING", color: C.violet, dx: 0, dy: 1.3 },
    ];
    nodes.forEach((n) => {
      const nx = hubCX + n.dx;
      const ny = hubCY + n.dy;
      slide.addShape("line", {
        x: hubCX, y: hubCY, w: nx - hubCX, h: ny - hubCY,
        line: { color: C.prove, width: 1.5 },
      });
      slide.addShape("ellipse", {
        x: nx - 0.32, y: ny - 0.22, w: 0.64, h: 0.44,
        fill: { color: n.color }, line: { type: "none" },
      });
      slide.addText(n.label, {
        x: nx - 0.5, y: ny - 0.22, w: 1.0, h: 0.44,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: C.bg,
        align: "center", valign: "middle",
      });
    });

    // Bottom: closed loop pill
    const loopY = leftY + leftH - 0.85;
    slide.addShape("roundRect", {
      x: leftX + 0.5, y: loopY, w: leftW - 1, h: 0.55,
      fill: { color: "052E1B" }, line: { color: C.prove, width: 1 }, rectRadius: 0.27,
    });
    slide.addText("✓  Detect → Trigger → Orchestrate → Prove — closed loop", {
      x: leftX + 0.5, y: loopY, w: leftW - 1, h: 0.55,
      fontFace: PPTX_BRAND.font.body, fontSize: 11, bold: true, color: C.prove,
      align: "center", valign: "middle",
    });

    // Right: outcomes
    const rightX = leftX + leftW + 0.3;
    const rightW = W - rightX - 0.5;
    const items = [
      { h: "One operating model", d: "Detect → Trigger → Orchestrate → Prove (DTOP) — applied across every signal, in every department." },
      { h: "Audit by design", d: "Every action timestamped, signed and traceable — the audit trail is a byproduct, not a project." },
      { h: "Domain intelligence", d: "Aviation-trained ML reasons across safety, content and training together — 90% accuracy vs 35% for generic AI." },
      { h: "Provable outcomes", d: "78% fewer repeat events. 6 weeks → 48 hours signal-to-response. Live in production today." },
    ];
    const ih = (CONTENT_BOTTOM - leftY - (items.length - 1) * 0.15) / items.length;
    items.forEach((it, i) => {
      const iy = leftY + i * (ih + 0.15);
      addLabeledCard(slide, rightX, iy, rightW, ih, {
        title: it.h, body: it.d, accent: C.prove, titleSize: 12, bodySize: 10,
      });
    });
  },
};

// ─── Slide 4 · DTOP Operating Model ─────────────────────────────
const dtopSpec: SlideSpec = {
  label: "DTOP Operating Model",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "The new operating model", "DTOP — From Signals to Provable Outcomes",
      "A closed-loop operating model that turns signals into provable outcomes.");

    const steps = [
      { letter: "D", label: "Detect", color: "0EA5E9", desc: "Continuous signal capture across ops, safety, content, training." },
      { letter: "T", label: "Trigger", color: "F59E0B", desc: "Policy + AI evaluate, escalate, route to the right owner." },
      { letter: "O", label: "Orchestrate", color: "A855F7", desc: "Workflows, tasks, manuals, training updates run in lock-step." },
      { letter: "P", label: "Prove", color: "10B981", desc: "Auditable evidence chain — every action timestamped and signed." },
    ];
    const sY = CONTENT_TOP;
    const sH = 3.2;
    const sW = (W - 1 - 3 * 0.2) / 4;
    steps.forEach((s, i) => {
      const x = 0.5 + i * (sW + 0.2);
      addCard(slide, x, sY, sW, sH, { border: s.color });
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
        fontFace: PPTX_BRAND.font.display, fontSize: 36, bold: true, color: C.bg,
        align: "center", valign: "middle",
      });
      slide.addText(s.label, {
        x: x + 0.18, y: sY + 1.3, w: sW - 0.36, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 18, bold: true, color: s.color, align: "center",
      });
      slide.addText(s.desc, {
        x: x + 0.18, y: sY + 1.8, w: sW - 0.36, h: sH - 1.95,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, align: "center", valign: "top",
      });
      if (i < steps.length - 1) {
        slide.addText("›", {
          x: x + sW + 0.02, y: sY + sH / 2 - 0.25, w: 0.18, h: 0.5,
          fontFace: PPTX_BRAND.font.display, fontSize: 28, bold: true,
          color: C.subtle, align: "center", valign: "middle",
        });
      }
    });

    // Continuous loop bar
    slide.addShape("rect", {
      x: 0.5, y: sY + sH + 0.05, w: W - 1, h: 0.04,
      fill: { color: C.primary }, line: { type: "none" },
    });
    slide.addText("↺  Continuous Improvement Loop", {
      x: W / 2 - 2, y: sY + sH + 0.0, w: 4, h: 0.18,
      fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true,
      color: C.primary, align: "center", charSpacing: 3,
    });

    // Audit banner
    const aY = sY + sH + 0.25;
    addCalloutBanner(slide, 0.5, aY, W - 1, 0.6,
      "Every step is observable, governed and auditable — that is the durable moat.", C.primary);

    // Example chain
    const eY = aY + 0.75;
    const eH = CONTENT_BOTTOM - eY;
    const chainItems = [
      "Safety signal detected",
      "Policy triggers procedure review",
      "Targeted training assigned",
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
};

// ─── Slide 5 · The Platform ─────────────────────────────────────
const platformSpec: SlideSpec = {
  label: "The Platform",
  build: async (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "The platform", "One Platform. One Operating Model.",
      "Three core apps connected by an intelligence layer and a unified mobile shell.");

    // Left: ecosystem image
    try {
      const img = await loadImageAsBase64(platformEcosystemUrl);
      slide.addImage({
        data: img,
        x: 0.6, y: CONTENT_TOP + 0.1, w: 5.4, h: CONTENT_BOTTOM - CONTENT_TOP - 0.2,
        sizing: { type: "contain", w: 5.4, h: CONTENT_BOTTOM - CONTENT_TOP - 0.2 },
      });
    } catch {
      addCard(slide, 0.6, CONTENT_TOP + 0.1, 5.4, CONTENT_BOTTOM - CONTENT_TOP - 0.2);
    }

    // Right: 4 cards
    const rightX = 6.4;
    const rightW = W - rightX - 0.5;
    const cards = [
      { eyebrow: "INTELLIGENCE LAYER", title: "CoAnalyst", body: "Domain-trained AI reasoning across safety, content and training together. 90% accuracy vs 35% generic AI.", color: C.amber },
      { eyebrow: "CORE APP", title: "SafetyManager365", body: "SMS, investigations, hazard register, audits and risk — built on the operational data foundation.", color: C.rose },
      { eyebrow: "CORE APP", title: "ContentManager365 + CoAuthor", body: "Procedure authoring, revision cascades, regulatory change impact and multi-format distribution.", color: C.amber },
      { eyebrow: "CORE APP", title: "TrainingManager365 + CoTrainer", body: "Competency-based training, targeted assignments and qualification tracking — triggered by safety events.", color: C.violet },
    ];
    const ih = (CONTENT_BOTTOM - CONTENT_TOP - (cards.length - 1) * 0.12) / cards.length;
    cards.forEach((c, i) => {
      const iy = CONTENT_TOP + i * (ih + 0.12);
      addLabeledCard(slide, rightX, iy, rightW, ih, {
        eyebrow: c.eyebrow, title: c.title, body: c.body, accent: c.color, titleSize: 13, bodySize: 9.5,
      });
    });
  },
};

// ─── Slide 6 · Use Cases ────────────────────────────────────────
const useCasesSpec: SlideSpec = {
  label: "Use Cases",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "DTOP in action", "Use Cases — Safety, Operations & Financial",
      "Every signal follows the same DTOP loop — different domain, same architecture");

    const lY = CONTENT_TOP;
    addPillRow(slide, 3.0, lY, W - 6, 0.32, [
      { text: "DETECT", color: "0EA5E9" },
      { text: "TRIGGER", color: "F59E0B" },
      { text: "ORCHESTRATE", color: "A855F7" },
      { text: "PROVE", color: "10B981" },
    ]);

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
        const chain = uc.platformMechanism.split(" → ").map((s) =>
          s.replace(/^(Detect|Trigger|Orchestrate|Prove)\s*\(/, "").replace(/\)$/, "")
        );
        const labels = ["DETECT", "TRIGGER", "ORCHESTRATE", "PROVE"];
        const colors = ["0EA5E9", "F59E0B", "A855F7", "10B981"];
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
};

// ─── Slide 7 · Transformation ───────────────────────────────────
const transformationSpec: SlideSpec = {
  label: "The Transformation",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "The transformation", "From Cost Center to Performance Engine",
      "Three shifts that change what operations is — and what it delivers.");

    const shifts = [
      {
        eyebrow: "FROM",
        from: "Reactive cost center",
        to: "Predictive performance engine",
        body: "Operations stops being where money disappears and becomes where margin is earned.",
        color: C.sky,
      },
      {
        eyebrow: "FROM",
        from: "Compliance project",
        to: "Compliance byproduct",
        body: "Audit trails are produced as a side-effect of normal work — not a quarterly scramble.",
        color: C.violet,
      },
      {
        eyebrow: "FROM",
        from: "Disconnected silos",
        to: "Connected operating model",
        body: "Safety, content and training reason together — one signal triggers a coordinated response.",
        color: C.prove,
      },
    ];
    const sY = CONTENT_TOP;
    const sH = 3.2;
    const sW = (W - 1 - 2 * 0.25) / 3;
    shifts.forEach((s, i) => {
      const x = 0.5 + i * (sW + 0.25);
      addCard(slide, x, sY, sW, sH, { border: s.color });
      slide.addShape("rect", {
        x, y: sY, w: sW, h: 0.06,
        fill: { color: s.color }, line: { type: "none" },
      });
      slide.addText("FROM", {
        x: x + 0.2, y: sY + 0.2, w: sW - 0.4, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: C.subtle, charSpacing: 3,
      });
      slide.addText(s.from, {
        x: x + 0.2, y: sY + 0.45, w: sW - 0.4, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 13, color: C.muted,
      });
      slide.addText("↓", {
        x: x + 0.2, y: sY + 0.95, w: sW - 0.4, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 22, bold: true, color: s.color, align: "center",
      });
      slide.addText("TO", {
        x: x + 0.2, y: sY + 1.4, w: sW - 0.4, h: 0.25,
        fontFace: PPTX_BRAND.font.body, fontSize: 9, bold: true, color: s.color, charSpacing: 3,
      });
      slide.addText(s.to, {
        x: x + 0.2, y: sY + 1.65, w: sW - 0.4, h: 0.6,
        fontFace: PPTX_BRAND.font.display, fontSize: 16, bold: true, color: C.ink,
      });
      addDivider(slide, x + 0.2, sY + 2.35, sW - 0.4);
      slide.addText(s.body, {
        x: x + 0.2, y: sY + 2.45, w: sW - 0.4, h: sH - 2.55,
        fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted, valign: "top",
      });
    });

    // Bottom callout
    const cY = sY + sH + 0.3;
    const cH = CONTENT_BOTTOM - cY;
    addCard(slide, 0.5, cY, W - 1, cH, { fill: C.primarySoft, border: C.primary });
    slide.addText("Operations becomes the asset that compounds — not the line item that erodes margin.", {
      x: 0.5, y: cY, w: W - 1, h: cH,
      fontFace: PPTX_BRAND.font.display, fontSize: 16, bold: true, color: C.ink,
      align: "center", valign: "middle", italic: true,
    });
  },
};

// ─── Slide 8 · Performance Ladder (Value Pyramid) ───────────────
const pyramidSpec: SlideSpec = {
  label: "Performance Ladder",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "Performance ladder", "The Value Pyramid",
      "Five maturity stages — each one compounds the value of the last.");

    // Pyramid on the left (5 stacked trapezoids)
    const tiers = [
      { n: "5", label: "PREDICTIVE", sub: "AI-Accelerated", color: C.amber },
      { n: "4", label: "INTELLIGENT", sub: "AI-Assisted", color: C.violet },
      { n: "3", label: "CONNECTED", sub: "Closed Loop", color: "14B8A6" },
      { n: "2", label: "MANAGED", sub: "Silo Optimisation", color: C.sky },
      { n: "1", label: "FRAGMENTED", sub: "Manual / Reactive", color: C.danger },
    ];
    const pyrX = 0.5;
    const pyrW = 5.6;
    const pyrTopY = CONTENT_TOP + 0.1;
    const pyrH = CONTENT_BOTTOM - pyrTopY - 0.2;
    const tierH = pyrH / tiers.length;
    tiers.forEach((t, i) => {
      // Width tapers: top narrowest
      const widthFraction = 0.35 + (i / (tiers.length - 1)) * 0.65;
      const tw = pyrW * widthFraction;
      const tx = pyrX + (pyrW - tw) / 2;
      const ty = pyrTopY + i * tierH;
      slide.addShape("trapezoid", {
        x: tx, y: ty, w: tw, h: tierH - 0.08,
        fill: { color: t.color, transparency: 30 },
        line: { color: t.color, width: 1 },
      });
      slide.addText(`${t.n}. ${t.label}`, {
        x: tx, y: ty, w: tw, h: tierH - 0.08,
        fontFace: PPTX_BRAND.font.display, fontSize: 13, bold: true, color: C.ink,
        align: "center", valign: "middle",
      });
    });

    // Right: tier descriptions
    const rightX = pyrX + pyrW + 0.4;
    const rightW = W - rightX - 0.5;
    const descs = [
      { title: "Stage 5 · Predictive", body: "Risk modelled probabilistically. Decisions made before incidents occur. AI-accelerated, human-validated.", color: C.amber },
      { title: "Stage 4 · Intelligent", body: "Cross-system patterns surfaced automatically. Actions recommended; humans approve.", color: C.violet },
      { title: "Stage 3 · Connected", body: "Detect → Trigger → Orchestrate → Prove runs end-to-end. Audit trail by design.", color: "14B8A6" },
      { title: "Stage 2 · Managed", body: "Each silo is well-run, but the connections are still manual.", color: C.sky },
      { title: "Stage 1 · Fragmented", body: "Reactive, manual, document-driven. The starting point for most operations.", color: C.danger },
    ];
    const dh = (CONTENT_BOTTOM - CONTENT_TOP - (descs.length - 1) * 0.1) / descs.length;
    descs.forEach((d, i) => {
      const dy = CONTENT_TOP + i * (dh + 0.1);
      addLabeledCard(slide, rightX, dy, rightW, dh, {
        title: d.title, body: d.body, accent: d.color, titleSize: 11, bodySize: 9.5,
      });
    });
  },
};

// ─── Slide 9 · Intelligence Journey ─────────────────────────────
const aiVisionSpec: SlideSpec = {
  label: "Intelligence Journey",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "Intelligence journey", "The AI Maturity Curve",
      "From historical reporting to predictive risk modelling — staged delivery, each tier compounds value.");

    const tiers = [
      { stage: "Today", tier: "Historical", color: C.sky, status: "LIVE",
        capabilities: ["Plain-English query of past events", "Auto-categorisation across 4,000+ taxonomy nodes", "Trend detection across reports"] },
      { stage: "Today", tier: "Reactive", color: C.amber, status: "LIVE",
        capabilities: ["Real-time threshold alerts", "Routing & escalation", "Cross-system signal correlation"] },
      { stage: "Near term", tier: "Proactive", color: C.violet, status: "ACTIVE DELIVERY",
        capabilities: ["Pattern detection before incidents", "Hazard cluster identification", "Predictive workload signals"] },
      { stage: "Future", tier: "Predictive", color: C.prove, status: "ROADMAP",
        capabilities: ["Probabilistic risk modelling", "Scenario simulation", "Auto-orchestrated mitigations"] },
    ];
    const tY = CONTENT_TOP;
    const tH = 3.6;
    const tW = (W - 1 - 3 * 0.18) / 4;
    tiers.forEach((t, i) => {
      const x = 0.5 + i * (tW + 0.18);
      addCard(slide, x, tY, tW, tH, { border: t.color });
      slide.addShape("rect", {
        x, y: tY, w: tW, h: 0.06,
        fill: { color: t.color }, line: { type: "none" },
      });
      // status pill
      slide.addShape("roundRect", {
        x: x + 0.18, y: tY + 0.2, w: tW - 0.36, h: 0.3,
        fill: { color: t.color, transparency: 75 }, line: { color: t.color, width: 0.5 }, rectRadius: 0.05,
      });
      slide.addText(t.status, {
        x: x + 0.18, y: tY + 0.2, w: tW - 0.36, h: 0.3,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: t.color,
        align: "center", valign: "middle", charSpacing: 2,
      });
      slide.addText(t.stage.toUpperCase(), {
        x: x + 0.18, y: tY + 0.6, w: tW - 0.36, h: 0.22,
        fontFace: PPTX_BRAND.font.body, fontSize: 8, color: C.subtle, charSpacing: 2,
      });
      slide.addText(t.tier, {
        x: x + 0.18, y: tY + 0.85, w: tW - 0.36, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 18, bold: true, color: t.color,
      });
      slide.addText(
        t.capabilities.map((c) => ({ text: c, options: { bullet: { code: "2713" } } })),
        {
          x: x + 0.18, y: tY + 1.4, w: tW - 0.36, h: tH - 1.55,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.muted,
          paraSpaceAfter: 4, valign: "top",
        },
      );
    });

    // Bottom callout
    const cY = tY + tH + 0.3;
    const cH = CONTENT_BOTTOM - cY;
    addCalloutBanner(slide, 0.5, cY, W - 1, cH,
      "Each tier is a deliverable, not an aspiration. Today's customers are already on Reactive — Proactive ships in 2026.", C.primary);
  },
};

// ─── Slide 10 · Customer Outcomes ───────────────────────────────
const outcomesSpec: SlideSpec = {
  label: "Customer Outcomes",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "Customer outcomes", "From Safety Signals to Business Value",
      "How operational signals become measurable outcomes for finance, ops and customers.");

    const cards = [
      {
        title: "Schedule Reliability", color: C.sky,
        signal: "Maintenance event detected on aircraft type",
        action: "Fleet-wide check + procedure update",
        result: "Cancellations avoided, OTP +3pts",
      },
      {
        title: "Revenue Protection", color: C.prove,
        signal: "Recurring delay pattern identified",
        action: "Root cause + targeted training assigned",
        result: "Delay cost -$2.4M annual",
      },
      {
        title: "Cost Containment", color: C.amber,
        signal: "Compliance gap surfaced in audit",
        action: "Auto-remediation workflow + evidence chain",
        result: "Audit prep -70%, fines avoided",
      },
      {
        title: "Customer Loyalty", color: C.violet,
        signal: "Crew sentiment + customer complaints rising",
        action: "Service procedure refresh + recurrent training",
        result: "NPS +8, repeat events -78%",
      },
    ];
    const cY = CONTENT_TOP;
    const cH = 3.7;
    const cW = (W - 1 - 3 * 0.18) / 4;
    cards.forEach((c, i) => {
      const x = 0.5 + i * (cW + 0.18);
      addCard(slide, x, cY, cW, cH, { border: c.color });
      slide.addShape("rect", {
        x, y: cY, w: cW, h: 0.06,
        fill: { color: c.color }, line: { type: "none" },
      });
      slide.addText(c.title, {
        x: x + 0.18, y: cY + 0.2, w: cW - 0.36, h: 0.4,
        fontFace: PPTX_BRAND.font.display, fontSize: 14, bold: true, color: c.color,
      });
      // Signal/Action/Result rows
      const rows = [
        { label: "SIGNAL", text: c.signal, color: "0EA5E9" },
        { label: "ACTION", text: c.action, color: "F59E0B" },
        { label: "RESULT", text: c.result, color: "10B981" },
      ];
      const rY = cY + 0.7;
      const rH = (cH - 0.85) / 3;
      rows.forEach((r, j) => {
        const ry = rY + j * rH;
        slide.addText(r.label, {
          x: x + 0.18, y: ry + 0.05, w: cW - 0.36, h: 0.22,
          fontFace: PPTX_BRAND.font.body, fontSize: 8, bold: true, color: r.color, charSpacing: 2,
        });
        slide.addText(r.text, {
          x: x + 0.18, y: ry + 0.27, w: cW - 0.36, h: rH - 0.32,
          fontFace: PPTX_BRAND.font.body, fontSize: 10, color: C.ink, valign: "top",
        });
        if (j < rows.length - 1) {
          slide.addShape("line", {
            x: x + 0.25, y: ry + rH - 0.02, w: cW - 0.5, h: 0,
            line: { color: C.hairline, width: 0.5 },
          });
        }
      });
    });

    // CTA banner
    const bY = cY + cH + 0.3;
    const bH = CONTENT_BOTTOM - bY;
    addCard(slide, 0.5, bY, W - 1, bH, { fill: C.primarySoft, border: C.primary });
    slide.addText("Every outcome above is computed in the Comply365 Line of Sight calculator — try it at /line-of-sight.", {
      x: 0.5, y: bY, w: W - 1, h: bH,
      fontFace: PPTX_BRAND.font.body, fontSize: 12, italic: true, color: C.ink,
      align: "center", valign: "middle",
    });
  },
};

// ─── Slide 11 · Why Comply365 ───────────────────────────────────
const whyUsSpec: SlideSpec = {
  label: "Why Comply365",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    header(slide, "Why Comply365", "The Three Things That Make Outcomes Possible",
      "Connected foundation, domain intelligence, proof by design.");

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

    const diffs = [
      { title: "Connected Foundation", desc: "One data model, three core apps, one intelligence layer. Content, training and safety reason together — not in parallel.", color: C.sky },
      { title: "Domain-Trained Intelligence", desc: "Aviation-trained AI since 2023. Not a generic LLM with a wrapper — purpose-built for the operational corpus.", color: C.primary },
      { title: "Proof by Design", desc: "Every action logged automatically. The audit trail is a byproduct, not a report. Closed-loop DTOP.", color: C.prove },
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
};

// ─── Slide 12 · CTA ─────────────────────────────────────────────
const ctaSpec: SlideSpec = {
  label: "CTA",
  build: (slide, ctx) => {
    chrome(slide, ctx);
    slide.addText("FIND OUT MORE", {
      x: 0.5, y: 1.8, w: W - 1, h: 0.4,
      fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: true, color: C.primary,
      charSpacing: 6, align: "center",
    });
    slide.addText([
      { text: "What does your first ", options: { color: C.ink } },
      { text: "use case", options: { color: C.primary } },
      { text: " look like?", options: { color: C.ink } },
    ], {
      x: 1.0, y: 2.3, w: W - 2, h: 1.4,
      fontFace: PPTX_BRAND.font.display, fontSize: 38, bold: true, align: "center",
    });
    slide.addText(
      "Let's start with a discovery workshop to identify the use case that delivers the most value — and prove it in 90 days.",
      {
        x: 1.5, y: 3.85, w: W - 3, h: 0.9,
        fontFace: PPTX_BRAND.font.body, fontSize: 13, color: C.muted, align: "center",
      },
    );
    const pillY = 4.95;
    const pills = [
      { text: "Request a discovery workshop · hello@comply365.com", color: C.primary, w: 5.4 },
      { text: "comply365.com ↗", color: C.hairline, w: 2.6 },
    ];
    const totalW = pills.reduce((s, p) => s + p.w, 0) + (pills.length - 1) * 0.2;
    let px = (W - totalW) / 2;
    pills.forEach((p, i) => {
      slide.addShape("roundRect", {
        x: px, y: pillY, w: p.w, h: 0.55,
        fill: { color: i === 0 ? p.color : C.surfaceAlt },
        line: { color: p.color, width: 1 }, rectRadius: 0.27,
      });
      slide.addText(p.text, {
        x: px, y: pillY, w: p.w, h: 0.55,
        fontFace: PPTX_BRAND.font.body, fontSize: 12, bold: i === 0,
        color: i === 0 ? C.bg : C.ink, align: "center", valign: "middle",
      });
      px += p.w + 0.2;
    });

    const stats = [
      { v: "550+", l: "Airlines worldwide", c: C.primary },
      { v: "~2.5M", l: "Users", c: C.accent },
      { v: "6", l: "Continents", c: C.violet },
    ];
    const tileW = 2.4, tileH = 0.95, gap = 0.3;
    const totW = stats.length * tileW + (stats.length - 1) * gap;
    let sx = (W - totW) / 2;
    stats.forEach((s) => {
      addBrandStatBlock(slide, sx, 5.85, tileW, tileH, s.v, s.l, s.c);
      sx += tileW + gap;
    });
  },
};

// ─── Builder ────────────────────────────────────────────────────
export async function buildExecutiveDeck(opts: BuildOpts = {}): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: "WIDE_16_9", width: PPTX_BRAND.size.w, height: PPTX_BRAND.size.h });
  pptx.layout = "WIDE_16_9";
  pptx.title = "Comply365 — Executive Pitch";
  pptx.author = "Comply365";
  pptx.company = "Comply365";

  const logo = await loadImageAsBase64(logoUrlDark).catch(() => "");
  const logoLight = await loadImageAsBase64(logoUrlLight).catch(() => "");

  const composed: SlideSpec[] = [
    titleSpec,
    beforeSpec,
    afterSpec,
    dtopSpec,
    platformSpec,
    useCasesSpec,
    transformationSpec,
    pyramidSpec,
    aiVisionSpec,
    outcomesSpec,
    whyUsSpec,
    ctaSpec,
  ];

  const total = composed.length;
  for (let i = 0; i < composed.length; i++) {
    const spec = composed[i];
    opts.onProgress?.(i, total, spec.label);
    const slide = pptx.addSlide();
    try {
      await spec.build(slide, { logo, logoLight, index: i, total });
    } catch (err) {
      console.error(`Exec PPTX slide ${i} (${spec.label}) failed:`, err);
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
