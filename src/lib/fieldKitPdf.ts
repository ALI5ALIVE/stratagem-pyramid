import jsPDF from "jspdf";
import {
  salesEnablementCoachCards,
  type CoachCardWeek,
} from "@/data/salesEnablementCoachCards";
import { getSalesEnablementNarration } from "@/data/salesEnablementNarration";
import {
  SLIDE_DISCOVERY,
  SLIDE_OBJECTIONS,
  WEEK_DISCOVERY_FALLBACK,
  WEEK_OBJECTION_FALLBACK,
  type SlideObjection,
  SLIDE_PROOFS,
  WEEK_PROOF_FALLBACK,
  SLIDE_WHITEBOARD,
  WEEK_WHITEBOARD_FALLBACK,
  SLIDE_MISTAKE,
  WEEK_MISTAKE_FALLBACK,
  SLIDE_META,
  WEEK_META_FALLBACK,
  type SlideMeta,
} from "@/data/salesEnablementSlideAids";
import {
  buildSlideLearning,
  buildSlideLearningFromCoachCard,
  type SlideLearning,
  buildSlideOnePager,
  type SlideOnePager,
} from "@/data/salesEnablementLearningOutcomes";
import {
  buildStudyNote,
  collectWeekGlossary,
  type SlideOnePager as StudyNote,
  type StudyTerm,
} from "@/data/salesEnablementStudyNotes";

// ─── Glyph sanitiser ─────────────────────────────────────────────────────────
// helvetica core (jsPDF default) is Latin-1 only. Smart quotes, em-dashes,
// bullets, arrows etc. render as boxes or wrong glyphs. Sanitise at the
// write site so data files can stay readable.
const GLYPH_MAP: Array<[RegExp, string]> = [
  [/[\u2018\u2019\u02BC]/g, "'"],   // smart single quotes
  [/[\u201C\u201D]/g, '"'],         // smart double quotes
  [/[\u2013\u2014]/g, "-"],         // en/em dash
  [/\u2026/g, "..."],               // ellipsis
  [/[\u2022\u25CF\u25AA\u25A0]/g, "·"], // bullets to middle dot (Latin-1 safe)
  [/[\u2192\u27A1]/g, ">"],         // right arrows
  [/\u21B3/g, ">"],                 // turn arrow
  [/\u00A0/g, " "],                 // nbsp
];
const sanitize = (s: string | undefined): string => {
  if (!s) return "";
  let out = s;
  GLYPH_MAP.forEach(([re, rep]) => { out = out.replace(re, rep); });
  // strip anything still outside Latin-1
  out = out.replace(/[^\x00-\xFF]/g, "");
  return out;
};

// ─── Brand tokens (RGB tuples for jsPDF) ─────────────────────────────────────
const C = {
  ink: [11, 18, 32] as [number, number, number],
  paper: [255, 255, 255] as [number, number, number],
  paperWarm: [250, 251, 253] as [number, number, number],
  navy: [11, 26, 74] as [number, number, number],
  navyDeep: [8, 16, 44] as [number, number, number],
  brand: [0, 102, 255] as [number, number, number],
  slate: [31, 41, 55] as [number, number, number],
  muted: [91, 103, 118] as [number, number, number],
  subtle: [138, 149, 165] as [number, number, number],
  hairline: [229, 234, 240] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  offwhite: [244, 247, 251] as [number, number, number],
  // Field accents
  amber: [217, 119, 6] as [number, number, number],
  amberSoft: [254, 243, 199] as [number, number, number],
  emerald: [5, 150, 105] as [number, number, number],
  emeraldSoft: [209, 250, 229] as [number, number, number],
  rose: [225, 29, 72] as [number, number, number],
  roseSoft: [254, 226, 232] as [number, number, number],
  sky: [2, 132, 199] as [number, number, number],
  skoftSoft: [224, 242, 254] as [number, number, number],
  // DTOP
  dBlue: [61, 139, 255] as [number, number, number],
  tAmber: [245, 158, 11] as [number, number, number],
  oViolet: [139, 92, 246] as [number, number, number],
  pEmerald: [16, 185, 129] as [number, number, number],
};

const setFill = (pdf: jsPDF, c: [number, number, number]) => pdf.setFillColor(c[0], c[1], c[2]);
const setStroke = (pdf: jsPDF, c: [number, number, number]) => pdf.setDrawColor(c[0], c[1], c[2]);
const setText = (pdf: jsPDF, c: [number, number, number]) => pdf.setTextColor(c[0], c[1], c[2]);

// ─── Per-week metadata (curated; kept inline to avoid editing data file) ─────
interface WeekMeta {
  subtitle: string;
  outcomes: string[];
  closingLine: string;
  drillQuestions: string[];
  practiceCue: string;
}
const WEEK_META: Record<CoachCardWeek["id"], WeekMeta> = {
  w1: {
    subtitle: "Foundation — the market shift, the platform in plain English, and the DTOP loop.",
    outcomes: [
      "Pitch the platform in one sentence — and name the four bands in order.",
      "Draw the DTOP loop on a whiteboard in 90 seconds, in colour, without notes.",
      "Name the four signal sources and convert them into a discovery question.",
    ],
    closingLine:
      "One platform, three Core Apps, intelligence on top, mobile on the device, DTOP wrapping it all.",
    drillQuestions: [
      "Can I deliver the one-sentence platform pitch without reading?",
      "Can I draw DTOP in colour, in order, in under 90 seconds?",
      "Can I name the four signal sources in the canonical order?",
      "Can I ask the wedge question after Detect without pausing?",
      "Do I know which terms are banned (FOQA, FDM, ASAP) and what to say instead?",
    ],
    practiceCue: "Run the 'whiteboard DTOP' scenario in Practice Center against the Operational persona.",
  },
  w2: {
    subtitle: "Capabilities — how the four bands fit together and why the intelligence layer is the moat.",
    outcomes: [
      "Explain the difference between Insights, Intelligence, and Automation in plain English.",
      "Anchor the 90% vs 35% accuracy headline correctly — and defend it.",
      "Tour the capability stack and end with Unified Mobile as the last mile.",
    ],
    closingLine:
      "Insights see the signal, Intelligence reasons about it, Automation moves the work, Mobile lands it on the device.",
    drillQuestions: [
      "Can I tell the three intelligence tiers apart without using product names?",
      "Can I cite ~90% domain vs ~35% generic accuracy correctly?",
      "Do I know one use case per capability band and can I tell it in 60 seconds?",
      "Can I handle the 'we'll build it internally' objection without flinching?",
      "Can I close Week 2 with the capstone whiteboard?",
    ],
    practiceCue: "Run the 'capability tour' scenario in Practice Center against the Technical persona.",
  },
  w3: {
    subtitle: "Sell & Win — discovery, footprint, objections, and the Strategy & Vision Session close.",
    outcomes: [
      "Map any account to a footprint pattern (single / two / all three Core Apps).",
      "Run a discovery call that surfaces the wedge in under 20 minutes.",
      "Land the Strategy & Vision Session as the natural next step.",
    ],
    closingLine:
      "Pick the account, run the call, pick the use case, handle the objection, close, book the Strategy & Vision Session.",
    drillQuestions: [
      "Can I diagnose a footprint pattern from three discovery answers?",
      "Do I have a question bank entry ready for every persona?",
      "Can I offer the Strategy & Vision Session without scoping it?",
      "Can I name the three differentiators that anchor every close?",
      "Can I run the 30-day capstone end-to-end without prompts?",
    ],
    practiceCue: "Run the 'discovery to close' scenario in Practice Center across all three personas.",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Extract a "core idea" line from a slide's narration script. */
const extractCoreLine = (slideId: string): string | undefined => {
  const n = getSalesEnablementNarration(slideId);
  if (!n) return undefined;
  // Look for "core message:" / "core message you must internalise:" patterns
  const m = n.script.match(/core message[^.:]*[:.]\s*([^.]+\.)/i);
  if (m) return m[1].trim();
  // Fallback: first sentence
  const first = n.script.split(/\.\s/)[0];
  return first ? first.trim().replace(/\.$/, "") + "." : undefined;
};

const FIELD_STYLES = {
  remember: {
    label: "REMEMBER THIS",
    accent: C.amber,
    soft: C.amberSoft,
  },
  sayItLikeThis: {
    label: "SAY IT LIKE THIS",
    accent: C.emerald,
    soft: C.emeraldSoft,
  },
  watchOutFor: {
    label: "WATCH OUT FOR",
    accent: C.rose,
    soft: C.roseSoft,
  },
  bridge: {
    label: "BRIDGE TO NEXT",
    accent: C.sky,
    soft: C.skoftSoft,
  },
} as const;

type FieldKey = keyof typeof FIELD_STYLES;

// ─── Narration paraphrasing ──────────────────────────────────────────────────
const FILLER_OPENERS = [
  /^this slide matters because[^.]*\.\s*/i,
  /^why this matters[^.:]*[:.]\s*/i,
  /^this is the[^.]*and it does the heavy lifting[^.]*\.\s*/i,
  /^this slide[^.]*\.\s*/i,
];

const FILLER_SENTENCES = [
  /when you deliver this[^.]*\./gi,
  /slow down[^.]*\./gi,
  /delivery tip[^.:]*[:.][^.]*\./gi,
  /^next[^.]*\.\s*$/gim,
];

/** Deterministic paraphrase of a teaching script → coaching summary. */
const paraphraseNarration = (script: string, maxChars = 540): string => {
  let s = script.trim();
  FILLER_OPENERS.forEach((re) => { s = s.replace(re, ""); });
  FILLER_SENTENCES.forEach((re) => { s = s.replace(re, ""); });

  // Voice shift: 2nd person teaching → 3rd person coaching
  const subs: Array<[RegExp, string]> = [
    [/\byou must internalise\b/gi, "reps should internalise"],
    [/\byou must\b/gi, "reps need to"],
    [/\byour job is\b/gi, "the rep's job is"],
    [/\byour job\b/gi, "the rep's job"],
    [/\byou're addressing\b/gi, "this addresses"],
    [/\byou are\b/gi, "the rep is"],
    [/\byou'll\b/gi, "reps will"],
    [/\byou can\b/gi, "reps can"],
    [/\byou\b/gi, "the rep"],
    [/\byour\b/gi, "the rep's"],
    [/\bthe core message[^.:]*[:.]\s*/gi, "Core message: "],
    [/\bthe pain[^.:]*[:.]\s*/gi, "Pain: "],
    [/\bthe value lever[^.:]*[:.]\s*/gi, "Value lever: "],
  ];
  subs.forEach(([re, repl]) => { s = s.replace(re, repl); });

  // Split into sentences, dedupe, drop short fragments, dropt next-slide cues
  const sentences = s
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 25 && !/^next[\s,]/i.test(x) && !/^then\s/i.test(x));

  // Prefer sentences anchored to core/pain/value
  const ranked = [
    ...sentences.filter((x) => /^Core message:/i.test(x)),
    ...sentences.filter((x) => /^Pain:/i.test(x)),
    ...sentences.filter((x) => /^Value lever:/i.test(x)),
    ...sentences.filter(
      (x) => !/^(Core message|Pain|Value lever):/i.test(x),
    ),
  ];

  let out = "";
  for (const sent of ranked) {
    if ((out + " " + sent).length > maxChars) break;
    out = out ? `${out} ${sent}` : sent;
  }
  // Tidy spacing
  out = out.replace(/\s{2,}/g, " ").trim();
  // Ensure ends with .
  if (out && !/[.!?]$/.test(out)) out += ".";
  return out;
};

/** Pull a representative "verbatim lift" — first quoted sentence, or first
 *  declarative line after stripping filler. */
const extractVerbatimLift = (script: string): string | undefined => {
  const q = script.match(/['"]([^'"\n]{20,180}[.!?])['"]/);
  if (q) return q[1].trim();
  // pull the first sentence anchored to "Core message"
  const core = script.match(/core message[^.:]*[:.]\s*([^.]{20,160}[.!?])/i);
  if (core) return core[1].trim();
  return undefined;
};

/** Bullet-form of the teaching summary. Splits into prioritized beats,
 *  promoting Core/Pain/Value-labelled sentences with a bold lead-in. */
type TeachingBullet = { lead?: string; text: string };
const paraphraseNarrationBullets = (
  script: string,
  maxBullets = 7,
): TeachingBullet[] => {
  let s = script.trim();
  FILLER_OPENERS.forEach((re) => { s = s.replace(re, ""); });
  FILLER_SENTENCES.forEach((re) => { s = s.replace(re, ""); });
  const subs: Array<[RegExp, string]> = [
    [/\byou must internalise\b/gi, "reps should internalise"],
    [/\byou must\b/gi, "reps need to"],
    [/\byour job is\b/gi, "the rep's job is"],
    [/\byour job\b/gi, "the rep's job"],
    [/\byou're addressing\b/gi, "this addresses"],
    [/\byou are\b/gi, "the rep is"],
    [/\byou'll\b/gi, "reps will"],
    [/\byou can\b/gi, "reps can"],
    [/\byou\b/gi, "the rep"],
    [/\byour\b/gi, "the rep's"],
    [/\bthe core message[^.:]*[:.]\s*/gi, "Core message: "],
    [/\bthe pain[^.:]*[:.]\s*/gi, "Pain: "],
    [/\bthe value lever[^.:]*[:.]\s*/gi, "Value lever: "],
  ];
  subs.forEach(([re, repl]) => { s = s.replace(re, repl); });

  const sentences = s
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 25 && !/^next[\s,]/i.test(x) && !/^then\s/i.test(x));

  const seen = new Set<string>();
  const tagged: TeachingBullet[] = [];
  const push = (lead: string | undefined, text: string) => {
    const key = text.toLowerCase().replace(/[^a-z0-9 ]/g, "").slice(0, 60);
    if (!key || seen.has(key)) return;
    seen.add(key);
    let t = text.trim();
    if (t.length > 180) t = t.slice(0, 177).replace(/[,;:\s]+\S*$/, "") + "…";
    if (!/[.!?…]$/.test(t)) t += ".";
    tagged.push({ lead, text: t });
  };

  const labelMap: Array<[RegExp, string]> = [
    [/^Core message:\s*/i, "Core"],
    [/^Pain:\s*/i, "Pain"],
    [/^Value lever:\s*/i, "Value"],
  ];
  // Priority pass: labelled
  for (const [re, lead] of labelMap) {
    sentences
      .filter((x) => re.test(x))
      .forEach((x) => push(lead, x.replace(re, "")));
  }
  // Then unlabelled
  sentences
    .filter((x) => !labelMap.some(([re]) => re.test(x)))
    .forEach((x) => push(undefined, x));

  return tagged.slice(0, maxBullets);
};

/** Pull customer-signal cues from narration; fallback to generic per-week. */
const extractListenFor = (script: string, weekId: CoachCardWeek["id"]): string[] => {
  const out: string[] = [];
  // Discovery questions framed in quotes or starting with "which/how/what"
  const qMatch = script.match(/['"]([^'".?]{15,120}\?)['"]/g);
  if (qMatch) {
    qMatch.slice(0, 1).forEach((q) => {
      out.push(`They ask ${q.replace(/^['"]|['"]$/g, "").trim()}`);
    });
  }
  // "their answer almost always points at X" pattern
  const wedge = script.match(/(?:their answer|the wedge)[^.]{10,140}\./i);
  if (wedge) out.push(wedge[0].replace(/^./, (c) => c.toUpperCase()));

  const fallback: Record<CoachCardWeek["id"], string[]> = {
    w1: [
      "They lean in when DTOP is drawn — not when features are listed.",
      "They name a stack they've already tried to stitch together themselves.",
    ],
    w2: [
      "They ask how the intelligence layer differs from a generic chatbot.",
      "They start naming internal data sources they want connected.",
    ],
    w3: [
      "They volunteer the names of two stakeholders who should be in the next meeting.",
      "They ask what the Strategy & Vision Session would actually cover.",
    ],
  };
  while (out.length < 2) out.push(fallback[weekId][out.length]);
  return out.slice(0, 2);
};

/** Soft-clip text to fit a max line count for splitTextToSize results. */
const clipLines = (lines: string[], max: number): string[] => {
  if (lines.length <= max) return lines;
  const kept = lines.slice(0, max);
  const last = kept[max - 1];
  kept[max - 1] = last.replace(/[\s,.;:]*$/, "") + "…";
  return kept;
};

/** Merge narration-extracted + curated discovery questions, dedupe, cap 3. */
const buildDiscoveryQuestions = (
  script: string | undefined,
  slideId: string,
  weekId: CoachCardWeek["id"],
): string[] => {
  const fromScript: string[] = [];
  if (script) {
    const qMatch = script.match(/['"]([^'".?]{15,140}\?)['"]/g);
    if (qMatch) {
      qMatch.forEach((q) => fromScript.push(q.replace(/^['"]|['"]$/g, "").trim()));
    }
  }
  const curated = SLIDE_DISCOVERY[slideId] ?? [];
  const merged: string[] = [];
  const seen = new Set<string>();
  [...curated, ...fromScript].forEach((q) => {
    const norm = q.toLowerCase().replace(/[^a-z0-9? ]/g, "").trim();
    if (!seen.has(norm) && q.length <= 160) {
      seen.add(norm);
      merged.push(q);
    }
  });
  if (merged.length === 0) merged.push(...WEEK_DISCOVERY_FALLBACK[weekId]);
  return merged.slice(0, 3);
};

/** Per-slide objections with per-week fallback. */
const buildObjections = (slideId: string, weekId: CoachCardWeek["id"]): SlideObjection[] => {
  const curated = SLIDE_OBJECTIONS[slideId];
  if (curated && curated.length) return curated.slice(0, 2);
  return WEEK_OBJECTION_FALLBACK[weekId].slice(0, 2);
};

/** Rotate fallback pools so consecutive slides don't show identical content. */
const rotatePool = <T,>(pool: T[], idx: number, take: number): T[] => {
  if (!pool.length) return [];
  const out: T[] = [];
  for (let i = 0; i < take && i < pool.length; i++) {
    out.push(pool[(idx + i) % pool.length]);
  }
  return out;
};

const buildObjectionsRotated = (
  slideId: string,
  weekId: CoachCardWeek["id"],
  idx: number,
): SlideObjection[] => {
  const curated = SLIDE_OBJECTIONS[slideId];
  if (curated && curated.length) return curated.slice(0, 2);
  return rotatePool(WEEK_OBJECTION_FALLBACK[weekId], idx, 2);
};

const buildDiscoveryQuestionsRotated = (
  script: string | undefined,
  slideId: string,
  weekId: CoachCardWeek["id"],
  idx: number,
): string[] => {
  const fromScript: string[] = [];
  if (script) {
    const qMatch = script.match(/['"]([^'".?]{15,140}\?)['"]/g);
    if (qMatch) qMatch.forEach((q) => fromScript.push(q.replace(/^['"]|['"]$/g, "").trim()));
  }
  const curated = SLIDE_DISCOVERY[slideId] ?? [];
  const merged: string[] = [];
  const seen = new Set<string>();
  [...curated, ...fromScript].forEach((q) => {
    const norm = q.toLowerCase().replace(/[^a-z0-9? ]/g, "").trim();
    if (!seen.has(norm) && q.length <= 160) {
      seen.add(norm);
      merged.push(q);
    }
  });
  if (merged.length === 0) merged.push(...rotatePool(WEEK_DISCOVERY_FALLBACK[weekId], idx, 2));
  return merged.slice(0, 3);
};

const buildProofs = (slideId: string, weekId: CoachCardWeek["id"], idx: number): string[] => {
  const curated = SLIDE_PROOFS[slideId];
  if (curated && curated.length) return curated.slice(0, 3);
  const pools = WEEK_PROOF_FALLBACK[weekId];
  return pools[idx % pools.length];
};

const buildWhiteboard = (slideId: string, weekId: CoachCardWeek["id"]): string => {
  return SLIDE_WHITEBOARD[slideId] ?? WEEK_WHITEBOARD_FALLBACK[weekId];
};

const buildMistake = (slideId: string, weekId: CoachCardWeek["id"]): string => {
  return SLIDE_MISTAKE[slideId] ?? WEEK_MISTAKE_FALLBACK[weekId];
};

const buildMeta = (slideId: string, weekId: CoachCardWeek["id"]): SlideMeta => {
  return SLIDE_META[slideId] ?? WEEK_META_FALLBACK[weekId];
};

// ─── PDF Builder ─────────────────────────────────────────────────────────────
export const buildWeekFieldKitPdf = (week: CoachCardWeek): jsPDF => {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const meta = WEEK_META[week.id];

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;

  // ── Chrome helpers ─────────────────────────────────────────────────────────
  const drawHeader = (label: string) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setText(pdf, C.subtle);
    pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 28);
    pdf.setFont("helvetica", "normal");
    setText(pdf, C.muted);
    pdf.text(label, pageW - margin, 28, { align: "right" });
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 36, pageW - margin, 36);
  };

  const drawFooter = () => {
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin, pageH - 32, pageW - margin, pageH - 32);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    setText(pdf, C.subtle);
    pdf.text(
      `Comply365 · Week ${week.number} Field Kit · ${week.title}`,
      margin,
      pageH - 18,
    );
    pdf.text("Rep-facing · Not for customer distribution", pageW - margin, pageH - 18, {
      align: "right",
    });
  };

  const stampPageNumbers = () => {
    const total = pdf.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      pdf.setPage(i);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      setText(pdf, C.subtle);
      pdf.text(`${i} / ${total}`, pageW / 2, pageH - 18, { align: "center" });
    }
  };

  // ── 1. COVER PAGE ──────────────────────────────────────────────────────────
  // Dark navy hero
  setFill(pdf, C.navyDeep);
  pdf.rect(0, 0, pageW, pageH * 0.46, "F");
  // Brand accent bar
  setFill(pdf, C.brand);
  pdf.rect(0, pageH * 0.46 - 6, pageW * 0.32, 6, "F");

  // Wordmark
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  setText(pdf, [180, 200, 230]);
  pdf.text("COMPLY365", margin, 64);
  pdf.setFont("helvetica", "normal");
  setText(pdf, [120, 140, 175]);
  pdf.text("SALES ENABLEMENT ACADEMY", margin + 78, 64);

  // Title block
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  setText(pdf, [120, 160, 220]);
  pdf.text(`WEEK ${week.number}  ·  FIELD KIT`, margin, pageH * 0.22);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(40);
  setText(pdf, C.white);
  pdf.text(week.title, margin, pageH * 0.22 + 44);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(13);
  setText(pdf, [200, 215, 235]);
  const subLines = pdf.splitTextToSize(meta.subtitle, contentW * 0.78);
  pdf.text(subLines, margin, pageH * 0.22 + 78);

  // Outcomes block (white card overlap)
  const cardY = pageH * 0.46 - 24;
  const cardX = margin;
  const cardH = 168;
  const cardW = contentW;
  setFill(pdf, C.white);
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(1);
  pdf.roundedRect(cardX, cardY, cardW, cardH, 8, 8, "FD");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.brand);
  pdf.text("HOW TO USE THIS KIT", cardX + 20, cardY + 26);
  let oy = cardY + 50;
  const usageGuide = [
    "Every slide gets two pages: a one-page study sheet, then the full coach transcript verbatim for memorisation and self-recording.",
    "Study sheet — left rail: takeaway, why a buyer cares, watch-out, what this connects to. Right column: what's on the slide, ideas you must own, terms, facts.",
    "Transcript page — read it once before you record yourself, then close the kit. Never read the transcript live on a customer call.",
  ];
  usageGuide.forEach((o, i) => {
    // Number chip
    setFill(pdf, C.brand);
    pdf.circle(cardX + 26, oy - 4, 9, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setText(pdf, C.white);
    pdf.text(String(i + 1), cardX + 26, oy - 1, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    setText(pdf, C.slate);
    const lines = pdf.splitTextToSize(o, cardW - 70);
    pdf.text(lines, cardX + 44, oy);
    oy += lines.length * 14 + 12;
  });

  // Legend
  const legY = cardY + cardH + 28;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.muted);
  pdf.text("CARD LEGEND", margin, legY);
  const legend: Array<[string, [number, number, number]]> = [
    ["Remember this", C.amber],
    ["Say it like this", C.emerald],
    ["Watch out for", C.rose],
    ["Bridge to next", C.sky],
  ];
  const colW = contentW / 4;
  legend.forEach(([label, color], i) => {
    const x = margin + i * colW;
    setFill(pdf, color);
    pdf.rect(x, legY + 10, 16, 4, "F");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    setText(pdf, C.slate);
    pdf.text(label, x + 22, legY + 14);
  });

  // Locked terminology mini-ref
  const termY = legY + 38;
  setFill(pdf, C.offwhite);
  pdf.roundedRect(margin, termY, contentW, 78, 6, 6, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.muted);
  pdf.text("LOCKED TERMINOLOGY — USE THESE, NEVER THE OTHERS", margin + 16, termY + 18);
  const terms: Array<[string, string]> = [
    ["Operational Data", "not FOQA / FDM / ASAP"],
    ["Generative AI", "not 'the AI' / LLM"],
    ["Recommended Actions", "not 'suggestions'"],
    ["BrandNumber names", "Comply365, SafetyManager365 (no spaces)"],
  ];
  const tColW = contentW / 2;
  terms.forEach((t, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = margin + 16 + col * tColW;
    const y = termY + 38 + row * 18;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    setText(pdf, C.slate);
    pdf.text(t[0], x, y);
    pdf.setFont("helvetica", "normal");
    setText(pdf, C.muted);
    pdf.text(t[1], x + pdf.getTextWidth(t[0]) + 6, y);
  });

  // ── 2. WEEK AT A GLANCE ────────────────────────────────────────────────────
  pdf.addPage();
  drawHeader(`Week ${week.number} · ${week.title}`);

  let y = 70;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Week at a glance", margin, y);
  y += 8;
  setFill(pdf, C.brand);
  pdf.rect(margin, y, 36, 3, "F");
  y += 24;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  setText(pdf, C.muted);
  const intro = `${week.slideIds.length} slides — each one a teaching moment. The bold line is the one thing you must internalise before the next call.`;
  const introLines = pdf.splitTextToSize(intro, contentW);
  pdf.text(introLines, margin, y);
  y += introLines.length * 13 + 18;

  week.slideIds.forEach((slideId, idx) => {
    const cc = salesEnablementCoachCards[slideId];
    const narration = getSalesEnablementNarration(slideId);
    if (!cc) return;
    const title = narration?.title ?? slideId;

    const rowH = 38;
    if (y + rowH > pageH - 60) {
      drawFooter();
      pdf.addPage();
      drawHeader(`Week ${week.number} · ${week.title}`);
      y = 70;
    }

    // Index
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setText(pdf, C.subtle);
    pdf.text(String(idx + 1).padStart(2, "0"), margin, y + 4);

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    setText(pdf, C.ink);
    const titleLines = pdf.splitTextToSize(title, contentW - 36);
    pdf.text(titleLines, margin + 28, y + 4);

    // Remember (one-liner)
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    setText(pdf, C.muted);
    const remLines = pdf.splitTextToSize(cc.remember, contentW - 36);
    pdf.text(remLines.slice(0, 2), margin + 28, y + 4 + titleLines.length * 13);

    const used = titleLines.length * 13 + Math.min(remLines.length, 2) * 12 + 12;
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.line(margin + 28, y + used, pageW - margin, y + used);
    y += used + 8;
  });

  drawFooter();

  // ── 3. SLIDE CARDS ─────────────────────────────────────────────────────────
  week.slideIds.forEach((slideId, idx) => {
    const cc = salesEnablementCoachCards[slideId];
    if (!cc) return;
    const narration = getSalesEnablementNarration(slideId);
    const title = sanitize(narration?.title ?? slideId);
    const studyNote = buildStudyNote(slideId, week.id, narration?.script);
    const sMeta = buildMeta(slideId, week.id);

    renderSlidePagePortrait(pdf, {
      week,
      slideIndex: idx,
      slideCount: week.slideIds.length,
      title,
      studyNote,
      meta: sMeta,
    });
  });

  // ── 3b. APPENDIX: GLOSSARY (every term across the week, A-Z) ───────────────
  renderGlossaryAppendixPage(pdf, week);

  // ── 3c. APPENDIX: SELL & WIN (W3 only — discovery + objections) ────────────
  if (week.id === "w3") {
    renderSellAndWinAppendixPage(pdf, week);
  }

  // ── 4. CLOSING PAGE ────────────────────────────────────────────────────────
  pdf.addPage();
  drawHeader(`Week ${week.number} · ${week.title}`);

  let zy = 70;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Closing drill", margin, zy);
  zy += 8;
  setFill(pdf, C.brand);
  pdf.rect(margin, zy, 36, 3, "F");
  zy += 26;

  // 60-second elevator
  setFill(pdf, C.navyDeep);
  pdf.roundedRect(margin, zy, contentW, 76, 8, 8, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, [140, 175, 230]);
  pdf.text("60-SECOND ELEVATOR — SAY THIS OUT LOUD", margin + 20, zy + 22);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  setText(pdf, C.white);
  const elev = pdf.splitTextToSize(`"${meta.closingLine}"`, contentW - 40);
  pdf.text(elev, margin + 20, zy + 44);
  zy += 76 + 24;

  // Self-check
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.muted);
  pdf.text("SELF-CHECK — TICK EACH ONE BEFORE YOUR NEXT CALL", margin, zy);
  zy += 18;
  meta.drillQuestions.forEach((q) => {
    // checkbox
    setStroke(pdf, C.muted);
    pdf.setLineWidth(0.8);
    pdf.rect(margin, zy - 9, 11, 11, "S");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    setText(pdf, C.slate);
    const lines = pdf.splitTextToSize(q, contentW - 24);
    pdf.text(lines, margin + 20, zy);
    zy += lines.length * 13 + 8;
  });

  zy += 12;
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, zy, pageW - margin, zy);
  zy += 20;

  // Practice cue
  setFill(pdf, C.offwhite);
  pdf.roundedRect(margin, zy, contentW, 60, 6, 6, "F");
  setFill(pdf, C.brand);
  pdf.rect(margin, zy, 3, 60, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setText(pdf, C.brand);
  pdf.text("PRACTICE CENTER", margin + 16, zy + 20);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  setText(pdf, C.slate);
  const pcLines = pdf.splitTextToSize(meta.practiceCue, contentW - 32);
  pdf.text(pcLines, margin + 16, zy + 38);

  drawFooter();
  stampPageNumbers();

  return pdf;

  // ── Inner: field panel ─────────────────────────────────────────────────────
  function drawFieldPanel(
    pdfInner: jsPDF,
    x: number,
    yPos: number,
    w: number,
    h: number,
    key: FieldKey,
    text: string,
  ) {
    const style = FIELD_STYLES[key];
    // soft background
    setFill(pdfInner, style.soft);
    pdfInner.roundedRect(x, yPos, w, h, 6, 6, "F");
    // left accent bar
    setFill(pdfInner, style.accent);
    pdfInner.rect(x, yPos, 4, h, "F");
    // border
    setStroke(pdfInner, C.hairline);
    pdfInner.setLineWidth(0.5);
    pdfInner.roundedRect(x, yPos, w, h, 6, 6, "S");
    // label
    pdfInner.setFont("helvetica", "bold");
    pdfInner.setFontSize(8);
    setText(pdfInner, style.accent);
    pdfInner.text(style.label, x + 14, yPos + 20);
    // body
    const isQuote = key === "sayItLikeThis";
    pdfInner.setFont("helvetica", isQuote ? "bolditalic" : "normal");
    pdfInner.setFontSize(11);
    setText(pdfInner, C.slate);
    const body = isQuote ? `\u201C${text}\u201D` : text;
    const lines = pdfInner.splitTextToSize(body, w - 28);
    pdfInner.text(lines, x + 14, yPos + 40);
  }
};

function drawFieldPanelCompact(
  pdfInner: jsPDF,
  x: number,
  yPos: number,
  w: number,
  h: number,
  key: FieldKey,
  text: string,
) {
  const style = FIELD_STYLES[key];
  setFill(pdfInner, style.soft);
  pdfInner.roundedRect(x, yPos, w, h, 5, 5, "F");
  setFill(pdfInner, style.accent);
  pdfInner.rect(x, yPos, 3, h, "F");
  setStroke(pdfInner, C.hairline);
  pdfInner.setLineWidth(0.4);
  pdfInner.roundedRect(x, yPos, w, h, 5, 5, "S");

  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(7);
  setText(pdfInner, style.accent);
  pdfInner.text(style.label, x + 10, yPos + 14);

  const isQuote = key === "sayItLikeThis";
  pdfInner.setFont("helvetica", isQuote ? "bolditalic" : "normal");
  pdfInner.setFontSize(9);
  setText(pdfInner, C.slate);
  const body = isQuote ? `\u201C${text}\u201D` : text;
  const lines = clipLines(pdfInner.splitTextToSize(body, w - 22), Math.floor((h - 24) / 11));
  pdfInner.text(lines, x + 10, yPos + 28, { lineHeightFactor: 1.3 });
}

function drawCoachChip(
  pdfInner: jsPDF,
  x: number,
  yPos: number,
  w: number,
  h: number,
  key: FieldKey,
  label: string,
  text: string,
) {
  const style = FIELD_STYLES[key];
  setFill(pdfInner, style.soft);
  pdfInner.roundedRect(x, yPos, w, h, 4, 4, "F");
  setFill(pdfInner, style.accent);
  pdfInner.rect(x, yPos, w, 2, "F");
  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(6.5);
  setText(pdfInner, style.accent);
  pdfInner.text(label, x + 6, yPos + 12);
  pdfInner.setFont("helvetica", "normal");
  pdfInner.setFontSize(7.5);
  setText(pdfInner, C.slate);
  const lines = clipLines(pdfInner.splitTextToSize(text, w - 12), 3);
  pdfInner.text(lines, x + 6, yPos + 22, { lineHeightFactor: 1.25 });
}

function drawObjectionBlock(
  pdfInner: jsPDF,
  x: number,
  yPos: number,
  w: number,
  h: number,
  o: { pushback: string; response: string },
) {
  // Container
  setFill(pdfInner, [253, 242, 245]);
  pdfInner.roundedRect(x, yPos, w, h, 4, 4, "F");
  setFill(pdfInner, C.rose);
  pdfInner.rect(x, yPos, 3, h, "F");

  // Pushback row — draw a filled rose triangle (helvetica core lacks U+25B8)
  setFill(pdfInner, C.rose);
  pdfInner.triangle(x + 9, yPos + 8, x + 9, yPos + 16, x + 16, yPos + 12, "F");
  pdfInner.setFont("helvetica", "bold");
  pdfInner.setFontSize(8.5);
  setText(pdfInner, C.ink);
  const pLines = clipLines(pdfInner.splitTextToSize(o.pushback, w - 26), 2);
  pdfInner.text(pLines, x + 22, yPos + 12);
  const afterPushY = yPos + 12 + pLines.length * 10 + 4;

  // Response row — draw an emerald right-arrow (avoid U+21B3)
  setStroke(pdfInner, C.emerald);
  pdfInner.setLineWidth(1.2);
  pdfInner.line(x + 9, afterPushY - 3, x + 18, afterPushY - 3);
  pdfInner.line(x + 14, afterPushY - 6, x + 18, afterPushY - 3);
  pdfInner.line(x + 14, afterPushY, x + 18, afterPushY - 3);
  pdfInner.setFont("helvetica", "normal");
  pdfInner.setFontSize(8);
  setText(pdfInner, C.slate);
  const maxRespLines = Math.max(2, Math.floor((h - (afterPushY - yPos) - 6) / 10));
  const rLines = clipLines(pdfInner.splitTextToSize(o.response, w - 26), maxRespLines);
  pdfInner.text(rLines, x + 22, afterPushY, { lineHeightFactor: 1.3 });
}

// ─── New rendering helpers ──────────────────────────────────────────────────
function drawSectionLabel(pdf: jsPDF, x: number, y: number, label: string, color: [number, number, number]) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, color);
  pdf.text(label, x, y);
  setFill(pdf, color);
  pdf.rect(x, y + 3, 18, 1.5, "F");
}

function drawAccentBlock(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  body: string,
  accent: [number, number, number],
  soft: [number, number, number],
) {
  setFill(pdf, soft);
  pdf.roundedRect(x, y, w, h, 5, 5, "F");
  setFill(pdf, accent);
  pdf.rect(x, y, 3, h, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, accent);
  pdf.text(label, x + 10, y + 14);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  setText(pdf, C.slate);
  const lines = clipLines(
    pdf.splitTextToSize(body, w - 18),
    Math.max(1, Math.floor((h - 22) / 11)),
  );
  pdf.text(lines, x + 10, y + 26, { lineHeightFactor: 1.3 });
}

// ─── Learning-outcome column renderer ──────────────────────────────────────
function renderLearningColumn(
  pdf: jsPDF,
  opts: {
    x: number;
    yTop: number;
    yBottom: number;
    w: number;
    learning: SlideLearning;
    whiteboard: string;
  },
) {
  const { x, yTop, yBottom, w, learning, whiteboard } = opts;
  const L = {
    outcome: sanitize(learning.outcome),
    coreIdea: sanitize(learning.coreIdea),
    beats: learning.teachBeats.map((b) => ({ label: b.label, text: sanitize(b.text) })),
    sayLikeThis: sanitize(learning.sayLikeThis),
    whiteboard: sanitize(whiteboard),
  };

  let y = yTop;

  // 1. LEARNING OUTCOME — accent band, navy fill, light text
  const outH = 46;
  setFill(pdf, [11, 26, 74]); // navy
  pdf.roundedRect(x, y, w, outH, 5, 5, "F");
  setFill(pdf, [0, 102, 255]); // brand
  pdf.rect(x, y, 3, outH, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  pdf.setTextColor(140, 175, 230);
  pdf.text("LEARNING OUTCOME  -  BY THE END THE REP CAN", x + 10, y + 13);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9.5);
  pdf.setTextColor(255, 255, 255);
  const outLines = clipLines(pdf.splitTextToSize(L.outcome, w - 20), 3);
  pdf.text(outLines, x + 10, y + 26, { lineHeightFactor: 1.3 });
  y += outH + 8;

  // 2. CORE IDEA — single bold sentence, no chrome
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(0, 102, 255);
  pdf.text("THE CORE IDEA", x, y);
  setFill(pdf, [0, 102, 255]);
  pdf.rect(x, y + 3, 18, 1.5, "F");
  y += 14;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10.5);
  pdf.setTextColor(11, 18, 32);
  const coreLines = clipLines(pdf.splitTextToSize(L.coreIdea, w), 2);
  pdf.text(coreLines, x, y, { lineHeightFactor: 1.25 });
  y += coreLines.length * 13 + 10;

  // 3. HOW TO TEACH IT — three numbered beats (Hook / Frame / Proof)
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(91, 103, 118);
  pdf.text("HOW TO TEACH IT  -  3 BEATS", x, y);
  setFill(pdf, [91, 103, 118]);
  pdf.rect(x, y + 3, 18, 1.5, "F");
  y += 12;

  // 4 + 5 are anchored to bottom; reserve their space now so beats height-fit
  const wbH = 50;
  const sayH = 44;
  const beatsBottom = yBottom - wbH - 6 - sayH - 6;

  const indent = 18;
  const beatGap = 8;
  const lineH = 11;

  // Pre-measure each beat at progressively tighter wrap caps until the
  // stack fits between y and beatsBottom. Always keep all 3 beats; reduce
  // wrap lines first, then drop characters via clipLines truncation.
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  const measureBeat = (b: { label: string; text: string }, wrapCap: number) => {
    const labelW = (() => {
      pdf.setFont("helvetica", "bold");
      const wL = pdf.getTextWidth(b.label);
      pdf.setFont("helvetica", "normal");
      return wL;
    })();
    const firstSlotW = Math.max(40, w - indent - labelW - 5);
    const firstFit = pdf.splitTextToSize(b.text, firstSlotW);
    const firstChunk = firstFit[0] ?? "";
    const remaining = b.text.slice(firstChunk.length).trim();
    const wrapLines =
      remaining && wrapCap > 0
        ? clipLines(pdf.splitTextToSize(remaining, w - indent), wrapCap)
        : [];
    return { labelW, firstChunk, wrapLines };
  };
  let wrapCap = 2;
  let prepared = L.beats.map((b) => measureBeat(b, wrapCap));
  const stackH = (p: typeof prepared) =>
    p.reduce((acc, m) => acc + lineH + m.wrapLines.length * lineH, 0) +
    (p.length - 1) * beatGap;
  while (wrapCap > 0 && y + stackH(prepared) > beatsBottom) {
    wrapCap -= 1;
    prepared = L.beats.map((b) => measureBeat(b, wrapCap));
  }

  L.beats.forEach((b, i) => {
    const m = prepared[i];
    // Number chip
    setFill(pdf, [0, 102, 255]);
    pdf.circle(x + 6, y + 3, 6, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(255, 255, 255);
    pdf.text(String(i + 1), x + 6, y + 5.5, { align: "center" });
    // Label (bold)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(11, 18, 32);
    pdf.text(b.label, x + indent, y + 4);
    // First chunk of body on the same line
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(31, 41, 55);
    pdf.text(m.firstChunk, x + indent + m.labelW + 5, y + 4);
    // Wrap lines aligned to indent
    if (m.wrapLines.length) {
      pdf.text(m.wrapLines, x + indent, y + 4 + lineH, { lineHeightFactor: 1.3 });
    }
    y += 4 + lineH + m.wrapLines.length * lineH + beatGap;
  });

  // 4. SAY IT LIKE THIS — emerald accent block (anchored above whiteboard)
  const sayY = yBottom - wbH - 6 - sayH;
  drawAccentBlock(
    pdf,
    x,
    sayY,
    w,
    sayH,
    "SAY IT LIKE THIS",
    `"${L.sayLikeThis}"`,
    [5, 150, 105],
    [209, 250, 229],
  );

  // 5. WHITEBOARD / WHERE TO POINT — violet accent (anchored to col bottom)
  drawAccentBlock(
    pdf,
    x,
    yBottom - wbH,
    w,
    wbH,
    "WHITEBOARD  /  WHERE TO POINT",
    L.whiteboard,
    [139, 92, 246],
    [243, 240, 253],
  );
}

// ─── Check-yourself band renderer ──────────────────────────────────────────
function renderCheckYourselfBand(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  question: string,
) {
  setFill(pdf, [250, 251, 253]);
  pdf.roundedRect(x, y, w, h, 4, 4, "F");
  setFill(pdf, [0, 102, 255]);
  pdf.rect(x, y, 3, h, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(0, 102, 255);
  pdf.text("CHECK YOURSELF  -  TICK BEFORE MOVING ON", x + 10, y + 11);
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(10);
  pdf.setTextColor(11, 18, 32);
  const lines = clipLines(pdf.splitTextToSize(question, w - 28), 1);
  pdf.text(lines, x + 10, y + 22);
  // tick box on the far right
  pdf.setDrawColor(91, 103, 118);
  pdf.setLineWidth(0.8);
  pdf.rect(x + w - 18, y + h / 2 - 5.5, 11, 11, "S");
}

function drawMetaStrip(pdf: jsPDF, x: number, y: number, w: number, meta: SlideMeta) {
  // DTOP chip
  let cx = x;
  if (meta.dtop) {
    const dtopColor: Record<NonNullable<SlideMeta["dtop"]>, [number, number, number]> = {
      D: C.dBlue,
      T: C.tAmber,
      O: C.oViolet,
      P: C.pEmerald,
    };
    const col = dtopColor[meta.dtop];
    setFill(pdf, col);
    pdf.roundedRect(cx, y - 8, 14, 14, 3, 3, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    setText(pdf, C.white);
    pdf.text(meta.dtop, cx + 7, y + 2, { align: "center" });
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    setText(pdf, C.muted);
    pdf.text("DTOP STAGE", cx + 20, y + 2);
    cx += 86;
  }

  // Persona chips
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.muted);
  pdf.text("PERSONA FIT:", cx, y + 2);
  cx += 64;
  meta.persona.forEach((p) => {
    const pw = pdf.getTextWidth(p) + 12;
    setFill(pdf, C.offwhite);
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(cx, y - 7, pw, 13, 3, 3, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    setText(pdf, C.slate);
    pdf.text(p, cx + 6, y + 2);
    cx += pw + 5;
  });

  // Time-on-slide pinned right
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.muted);
  pdf.text("TIME ON SLIDE:", x + w - 96, y + 2);
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.slate);
  pdf.text("60–90s", x + w - 36, y + 2);
}

export const downloadWeekFieldKit = (week: CoachCardWeek) => {
  const pdf = buildWeekFieldKitPdf(week);
  pdf.save(`Comply365-Week-${week.number}-${week.title.replace(/\s+/g, "-")}-Field-Kit.pdf`);
};

// ─────────────────────────────────────────────────────────────────────────────
// Portrait study-note page — one slide per page, designed so a rep can learn
// the slide WITHOUT the narration audio. Layout:
//   01. Numbered title
//   02. THE ONE-SENTENCE TAKEAWAY (curated `inOneSentence`)
//   03. Two-column row: WHAT'S ON THE SLIDE  |  WHY A BUYER CARES
//   04. THE IDEAS YOU MUST OWN (numbered curated keyIdeas)
//   05. 2x2 grid: KEY TERMS · DEFENSIBLE FACTS · WATCH-OUT · HOW THIS CONNECTS
//   06. CHECK YOURSELF (3 self-test questions, checkboxes)
//   07. Footer · optional one-line narration echo
// ─────────────────────────────────────────────────────────────────────────────
function renderSlidePagePortrait(
  pdf: jsPDF,
  opts: {
    week: CoachCardWeek;
    slideIndex: number;
    slideCount: number;
    title: string;
    studyNote: StudyNote;
    meta: SlideMeta;
  },
) {
  const { week, slideIndex, slideCount, title, studyNote, meta } = opts;

  pdf.addPage("a4", "portrait");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;
  const footerY = pageH - 56;

  // Header line
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, C.subtle);
  pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);

  const headRight: string[] = [];
  headRight.push(`Week ${week.number} · Slide ${String(slideIndex + 1).padStart(2, "0")} of ${slideCount}`);
  if (meta.dtop) headRight.push(`DTOP · ${meta.dtop}`);
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.muted);
  pdf.text(sanitize(headRight.join("   ·   ")), pageW - margin, 34, { align: "right" });

  // Numeral-led title
  let y = 78;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(34);
  setText(pdf, C.brand);
  const numStr = String(slideIndex + 1).padStart(2, "0");
  pdf.text(numStr, margin, y);
  const numW = pdf.getTextWidth(numStr);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(22);
  setText(pdf, [200, 215, 235]);
  pdf.text("/", margin + numW + 10, y - 4);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  setText(pdf, C.ink);
  const titleX = margin + numW + 28;
  const titleLines = clipLines(pdf.splitTextToSize(title.toUpperCase(), contentW - (titleX - margin)), 2);
  pdf.text(titleLines, titleX, y - 2, { lineHeightFactor: 1.15 });
  y += Math.max(0, (titleLines.length - 1) * 20) + 14;

  setStroke(pdf, C.ink);
  pdf.setLineWidth(0.7);
  pdf.line(margin, y, margin + 32, y);
  y += 22;

  // ── 02. THE ONE-SENTENCE TAKEAWAY ──────────────────────────────────────────
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.brand);
  pdf.text("THE ONE-SENTENCE TAKEAWAY", margin, y);
  setFill(pdf, C.brand);
  pdf.rect(margin, y + 3, 22, 1.5, "F");
  y += 14;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  setText(pdf, C.ink);
  const oneSent = sanitize(studyNote.inOneSentence);
  const oneSentLines = clipLines(pdf.splitTextToSize(oneSent, contentW), 3);
  pdf.text(oneSentLines, margin, y, { lineHeightFactor: 1.35 });
  y += oneSentLines.length * 13 + 14;

  // ── 03. WHAT'S ON THE SLIDE  |  WHY A BUYER CARES ──────────────────────────
  const splitGap = 16;
  const splitW = (contentW - splitGap) / 2;
  const splitBlockH = 116;
  const whatsOn = (studyNote.whatsOnSlide ?? []).slice(0, 4).map(sanitize);
  drawStudyBlock(
    pdf,
    margin,
    y,
    splitW,
    splitBlockH,
    "WHAT'S ON THE SLIDE",
    C.brand,
    [243, 247, 255],
    whatsOn.map((b) => ({ bullet: true, text: b })),
  );
  drawStudyBlock(
    pdf,
    margin + splitW + splitGap,
    y,
    splitW,
    splitBlockH,
    "WHY A BUYER CARES",
    [11, 26, 74],
    [241, 244, 252],
    [{ bullet: false, text: sanitize(studyNote.whyItMatters) }],
  );
  y += splitBlockH + 16;

  // ── 04. THE IDEAS YOU MUST OWN ─────────────────────────────────────────────
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.brand);
  pdf.text("THE IDEAS YOU MUST OWN", margin, y);
  setFill(pdf, C.brand);
  pdf.rect(margin, y + 3, 22, 1.5, "F");
  y += 14;

  // Reserve bottom space for the 2x2 grid + check-yourself + footer first.
  const checkBandH = 60;
  const gridH = 138;
  const ideasMaxY = footerY - 14 - checkBandH - 12 - gridH - 16;

  const ideas = (studyNote.keyIdeas ?? []).slice(0, 4).map(sanitize);
  if (ideas.length === 0) {
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(9.5);
    setText(pdf, C.muted);
    pdf.text("(No curated ideas for this slide.)", margin, y);
  } else {
    const numW2 = 22;
    const ideaX = margin + numW2;
    const ideaW = contentW - numW2;
    // Available vertical budget per idea.
    const budget = Math.max(28, (ideasMaxY - y) / ideas.length);
    const maxLines = Math.max(1, Math.floor((budget - 6) / 12));
    ideas.forEach((idea, i) => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      setText(pdf, C.brand);
      pdf.text(String(i + 1).padStart(2, "0"), margin, y + 9);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9.5);
      setText(pdf, C.slate);
      const lines = clipLines(pdf.splitTextToSize(idea, ideaW), maxLines);
      pdf.text(lines, ideaX, y + 9, { lineHeightFactor: 1.35 });
      y += Math.max(20, lines.length * 12 + 8);
    });
  }

  // ── 05. 2x2 GRID — Terms · Facts · Watch-out · How this connects ──────────
  const gridTop = footerY - 14 - checkBandH - 12 - gridH;
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, gridTop - 10, pageW - margin, gridTop - 10);

  const colGap = 16;
  const colW = (contentW - colGap) / 2;
  const leftX = margin;
  const rightX = margin + colW + colGap;
  const rowH = gridH / 2 - 6;

  drawBottomBlock(
    pdf,
    leftX,
    gridTop,
    colW,
    rowH,
    "KEY TERMS",
    C.brand,
    studyNote.terms.slice(0, 4).map((t) => ({ label: sanitize(t.term), text: sanitize(t.definition) })),
  );
  drawBottomBlock(
    pdf,
    rightX,
    gridTop,
    colW,
    rowH,
    "DEFENSIBLE FACTS",
    C.emerald,
    studyNote.facts.slice(0, 3).map((f) => ({ label: "", text: sanitize(f) })),
  );
  drawBottomBlock(
    pdf,
    leftX,
    gridTop + rowH + 12,
    colW,
    rowH,
    "WATCH-OUT",
    C.rose,
    [{ label: "", text: sanitize(studyNote.watchOut) }],
  );
  const connectsItems = (studyNote.connectsTo.length ? studyNote.connectsTo : meta.connectsTo ?? []).slice(0, 4);
  drawBottomBlock(
    pdf,
    rightX,
    gridTop + rowH + 12,
    colW,
    rowH,
    "HOW THIS CONNECTS",
    C.sky,
    connectsItems.map((c) => ({ label: "", text: sanitize(c) })),
  );

  // ── 06. CHECK YOURSELF — three checkboxes ──────────────────────────────────
  const checkY = gridTop + gridH + 12;
  setFill(pdf, C.offwhite);
  pdf.roundedRect(margin, checkY, contentW, checkBandH, 5, 5, "F");
  setFill(pdf, C.brand);
  pdf.rect(margin, checkY, 3, checkBandH, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, C.brand);
  pdf.text("CHECK YOURSELF · ANSWER ALOUD BEFORE TURNING THE PAGE", margin + 10, checkY + 12);

  const questions = (studyNote.checkYourself ?? []).slice(0, 3).map(sanitize);
  const qInner = contentW - 36;
  let qy = checkY + 22;
  const qBudget = (checkBandH - 26) / Math.max(questions.length, 1);
  questions.forEach((q) => {
    setStroke(pdf, C.muted);
    pdf.setLineWidth(0.7);
    pdf.rect(margin + 10, qy + 2, 8, 8, "S");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    setText(pdf, C.slate);
    const lines = clipLines(pdf.splitTextToSize(q, qInner), Math.max(1, Math.floor((qBudget - 2) / 10)));
    pdf.text(lines, margin + 24, qy + 9, { lineHeightFactor: 1.3 });
    qy += qBudget;
  });

  // ── 07. Footer ─────────────────────────────────────────────────────────────
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, footerY, pageW - margin, footerY);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  setText(pdf, C.subtle);
  pdf.text(`Week ${week.number} · ${sanitize(week.title)} · Study Notes`, margin, footerY + 14);
  pdf.text("Rep-facing · Not for customer distribution", pageW - margin, footerY + 14, { align: "right" });

  // Optional narration echo, single italic line just above footer line.
  const echo = sanitize(studyNote.narrationInOneLine ?? "");
  if (echo) {
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(7.5);
    setText(pdf, C.subtle);
    const echoLines = clipLines(
      pdf.splitTextToSize(`From the coach narration: "${echo}"`, contentW),
      1,
    );
    pdf.text(echoLines, margin, footerY - 6);
  }
}

// Two-column study block used at the top of the page (What's on slide / Why
// a buyer cares). Supports either bullet list or paragraph body.
function drawStudyBlock(
  pdf: jsPDF,
  x: number,
  yTop: number,
  w: number,
  h: number,
  heading: string,
  accent: [number, number, number],
  soft: [number, number, number],
  items: Array<{ bullet: boolean; text: string }>,
) {
  setFill(pdf, soft);
  pdf.roundedRect(x, yTop, w, h, 5, 5, "F");
  setFill(pdf, accent);
  pdf.rect(x, yTop, 3, h, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, accent);
  pdf.text(heading, x + 10, yTop + 13);

  const innerX = x + 12;
  const innerW = w - 22;
  let cy = yTop + 26;
  const bottom = yTop + h - 4;

  for (const item of items) {
    if (cy > bottom - 6) break;
    if (item.bullet) {
      const remH = bottom - cy;
      const maxLines = Math.max(1, Math.floor(remH / 10));
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      setText(pdf, accent);
      pdf.text("·", innerX, cy + 4);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      setText(pdf, C.slate);
      const lines = clipLines(pdf.splitTextToSize(item.text, innerW - 10), Math.min(maxLines, 3));
      pdf.text(lines, innerX + 8, cy + 4, { lineHeightFactor: 1.3 });
      cy += lines.length * 10 + 4;
    } else {
      const remH = bottom - cy;
      const maxLines = Math.max(1, Math.floor(remH / 11));
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      setText(pdf, C.slate);
      const lines = clipLines(pdf.splitTextToSize(item.text, innerW), maxLines);
      pdf.text(lines, innerX, cy + 4, { lineHeightFactor: 1.35 });
      cy += lines.length * 11 + 4;
    }
  }
}

function drawBottomBlock(
  pdf: jsPDF,
  x: number,
  yTop: number,
  w: number,
  h: number,
  heading: string,
  accent: [number, number, number],
  items: Array<{ label: string; text: string }>,
) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7);
  setText(pdf, accent);
  pdf.text(heading, x, yTop);

  let cy = yTop + 14;
  const bottom = yTop + h;
  for (const item of items) {
    if (cy > bottom - 6) break;
    if (item.label) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      setText(pdf, C.ink);
      const labelText = item.label + " ·";
      pdf.text(labelText, x, cy);
      const labelW = pdf.getTextWidth(labelText) + 4;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      setText(pdf, C.slate);
      const remW = w - labelW;
      const lines = clipLines(pdf.splitTextToSize(item.text, remW), 2);
      pdf.text(lines, x + labelW, cy, { lineHeightFactor: 1.3 });
      cy += lines.length * 10 + 4;
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      setText(pdf, C.slate);
      const maxLines = Math.max(1, Math.floor((bottom - cy) / 10));
      const lines = clipLines(pdf.splitTextToSize(item.text, w), Math.min(maxLines, 3));
      pdf.text(lines, x, cy, { lineHeightFactor: 1.3 });
      cy += lines.length * 10 + 5;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Glossary appendix — every term used in the week, deduped A-Z.
function renderGlossaryAppendixPage(pdf: jsPDF, week: CoachCardWeek) {
  pdf.addPage("a4", "portrait");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, C.subtle);
  pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.muted);
  pdf.text(`Week ${week.number} · Glossary`, pageW - margin, 34, { align: "right" });

  let y = 78;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Glossary", margin, y);
  y += 6;
  setFill(pdf, C.brand);
  pdf.rect(margin, y, 36, 3, "F");
  y += 22;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  setText(pdf, C.muted);
  const intro = "Every term used across the week, in your own voice. If you can't define it from memory, study the slide it belongs to before your next call.";
  const iLines = pdf.splitTextToSize(intro, contentW);
  pdf.text(iLines, margin, y, { lineHeightFactor: 1.4 });
  y += iLines.length * 13 + 16;

  const terms = collectWeekGlossary(week.slideIds);
  terms.forEach((t) => {
    if (y > pageH - 80) {
      pdf.addPage("a4", "portrait");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      setText(pdf, C.subtle);
      pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
      pdf.setFont("helvetica", "normal");
      setText(pdf, C.muted);
      pdf.text(`Week ${week.number} · Glossary (cont.)`, pageW - margin, 34, { align: "right" });
      y = 70;
    }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    setText(pdf, C.ink);
    pdf.text(sanitize(t.term), margin, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    setText(pdf, C.slate);
    const dLines = pdf.splitTextToSize(sanitize(t.definition), contentW);
    pdf.text(dLines, margin, y + 14, { lineHeightFactor: 1.4 });
    y += 14 + dLines.length * 13 + 10;
    setStroke(pdf, C.hairline);
    pdf.setLineWidth(0.4);
    pdf.line(margin, y - 4, pageW - margin, y - 4);
    y += 6;
  });
}

// Sell & Win appendix (W3 only) — consolidates discovery questions + objections.
function renderSellAndWinAppendixPage(pdf: jsPDF, week: CoachCardWeek) {
  pdf.addPage("a4", "portrait");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  setText(pdf, C.subtle);
  pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
  pdf.setFont("helvetica", "normal");
  setText(pdf, C.muted);
  pdf.text(`Week ${week.number} · Sell & Win Reference`, pageW - margin, 34, { align: "right" });

  let y = 78;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  setText(pdf, C.ink);
  pdf.text("Sell & win reference", margin, y);
  y += 6;
  setFill(pdf, C.brand);
  pdf.rect(margin, y, 36, 3, "F");
  y += 22;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  setText(pdf, C.muted);
  const intro = "Discovery questions and objection responses pulled from every slide in the week. Pre-call cheat sheet only.";
  const iLines = pdf.splitTextToSize(intro, contentW);
  pdf.text(iLines, margin, y, { lineHeightFactor: 1.4 });
  y += iLines.length * 13 + 16;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  setText(pdf, C.brand);
  pdf.text("DISCOVERY QUESTIONS", margin, y);
  y += 14;

  const seenQ = new Set<string>();
  week.slideIds.forEach((sid) => {
    const qs = SLIDE_DISCOVERY[sid] ?? [];
    qs.forEach((q) => {
      const k = q.toLowerCase().replace(/[^a-z0-9? ]/g, "").trim();
      if (seenQ.has(k)) return;
      seenQ.add(k);
      if (y > pageH - 120) return;
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(9.5);
      setText(pdf, C.ink);
      const ql = clipLines(pdf.splitTextToSize(`"${sanitize(q)}"`, contentW), 2);
      pdf.text(ql, margin, y, { lineHeightFactor: 1.35 });
      y += ql.length * 11 + 6;
    });
  });

  y += 10;
  setStroke(pdf, C.hairline);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageW - margin, y);
  y += 14;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  setText(pdf, C.brand);
  pdf.text("OBJECTION RESPONSES", margin, y);
  y += 14;

  const seenO = new Set<string>();
  week.slideIds.forEach((sid) => {
    const objs = SLIDE_OBJECTIONS[sid] ?? [];
    objs.forEach((o) => {
      const k = o.pushback.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
      if (seenO.has(k)) return;
      seenO.add(k);
      if (y > pageH - 90) {
        pdf.addPage("a4", "portrait");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.5);
        setText(pdf, C.subtle);
        pdf.text("COMPLY365 · SALES ENABLEMENT ACADEMY", margin, 34);
        pdf.setFont("helvetica", "normal");
        setText(pdf, C.muted);
        pdf.text(`Week ${week.number} · Sell & Win (cont.)`, pageW - margin, 34, { align: "right" });
        y = 70;
      }
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      setText(pdf, C.ink);
      const pl = clipLines(pdf.splitTextToSize(sanitize(o.pushback), contentW), 2);
      pdf.text(pl, margin, y, { lineHeightFactor: 1.3 });
      y += pl.length * 11 + 4;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      setText(pdf, C.slate);
      const rl = clipLines(pdf.splitTextToSize("> " + sanitize(o.response), contentW), 3);
      pdf.text(rl, margin, y, { lineHeightFactor: 1.35 });
      y += rl.length * 11 + 10;
    });
  });
}

