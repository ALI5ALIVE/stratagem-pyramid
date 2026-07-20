import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageOrientation,
} from "docx";
import { execPitchMediumSlides } from "@/data/execPitchMediumSlides";
import { execPitch3Slides } from "@/data/execPitch3Slides";
import { executivePitchNarrations } from "@/data/executivePitchNarration";
import { executivePitch2Narrations } from "@/data/executivePitch2Narration";

export type PitchScriptDeckId = "short" | "medium" | "long";

interface DeckMeta {
  id: PitchScriptDeckId;
  title: string;
  subtitle: string;
  filename: string;
  route: string;
  slides: { id: string; label: string }[];
  narrationLookup: (slideId: string) => string | undefined;
}

const shortSlides = [
  { id: "exec-slide-0", label: "Title" },
  { id: "exec-slide-1", label: "The Human-Factor Cost" },
  { id: "exec-slide-2", label: "The Shift" },
  { id: "exec-slide-3", label: "The New Operating Model" },
  { id: "exec-slide-4", label: "The Platform" },
  { id: "exec-slide-5", label: "Intelligence Layer" },
  { id: "exec-slide-6", label: "Line of Sight" },
  { id: "exec-slide-6b", label: "Customer Outcomes" },
  { id: "exec-slide-7", label: "Why Comply365" },
];

const execNarr = (id: string) =>
  executivePitchNarrations.find((n) => n.slideId === id)?.script;
const exec2Narr = (id: string) =>
  executivePitch2Narrations.find((n) => n.slideId === id)?.script;

export const PITCH_SCRIPT_DECKS: Record<PitchScriptDeckId, DeckMeta> = {
  short: {
    id: "short",
    title: "Executive Pitch — Short",
    subtitle: "≈ 4-minute customer narrative",
    filename: "Comply365-Executive-Pitch-Short-Script.docx",
    route: "/pitch-executive",
    slides: shortSlides,
    narrationLookup: (id) => execNarr(id) ?? exec2Narr(id),
  },
  medium: {
    id: "medium",
    title: "Executive Pitch — Medium",
    subtitle: "Foundation + 3 capabilities + Roadmap + Why Comply365",
    filename: "Comply365-Executive-Pitch-Medium-Script.docx",
    route: "/pitch-executive-medium",
    slides: execPitchMediumSlides.map((s) => ({ id: s.id, label: s.label })),
    narrationLookup: execNarr,
  },
  long: {
    id: "long",
    title: "Executive Pitch — Long",
    subtitle: "Full executive walkthrough",
    filename: "Comply365-Executive-Pitch-Long-Script.docx",
    route: "/pitch-executive-3",
    slides: execPitch3Slides.map((s) => ({ id: s.id, label: s.label })),
    narrationLookup: execNarr,
  },
};

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const readTime = (words: number) => Math.max(1, Math.round((words / 150) * 60)); // seconds @ 150 wpm
const fmtSeconds = (s: number) =>
  s >= 60 ? `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s` : `${s}s`;

export async function buildPitchScriptDocx(deckId: PitchScriptDeckId): Promise<Blob> {
  const deck = PITCH_SCRIPT_DECKS[deckId];
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const children: Paragraph[] = [];

  // Cover block
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: "Comply365",
          bold: true,
          color: "3D8BFF",
          size: 22,
        }),
      ],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: deck.title, bold: true })],
    }),
    new Paragraph({
      children: [new TextRun({ text: deck.subtitle, italics: true, color: "666666" })],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Narration script · exported ${dateStr}`,
          color: "999999",
          size: 18,
        }),
      ],
      spacing: { after: 240 },
    }),
  );

  // Totals
  const scripts = deck.slides
    .map((s) => ({ slide: s, script: deck.narrationLookup(s.id) }))
    .filter((x) => !!x.script) as { slide: { id: string; label: string }; script: string }[];

  const totalWords = scripts.reduce((n, s) => n + wordCount(s.script), 0);
  const totalSecs = readTime(totalWords);

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: "Total: ", bold: true }),
        new TextRun({ text: `${scripts.length} slides · ${totalWords.toLocaleString()} words · ~${fmtSeconds(totalSecs)} at 150 wpm` }),
      ],
      spacing: { after: 360 },
    }),
  );

  // Per-slide script
  deck.slides.forEach((slide, i) => {
    const script = deck.narrationLookup(slide.id);
    const num = String(i + 1).padStart(2, "0");

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 320, after: 80 },
        children: [new TextRun({ text: `${num} · ${slide.label}`, bold: true })],
      }),
    );

    if (script) {
      const words = wordCount(script);
      children.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: `${words} words · ~${fmtSeconds(readTime(words))}`,
              color: "888888",
              italics: true,
              size: 18,
            }),
          ],
        }),
      );
      script
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .forEach((para) => {
          children.push(
            new Paragraph({
              spacing: { after: 160 },
              children: [new TextRun({ text: para, size: 24 })],
            }),
          );
        });
    } else {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "(No narration script recorded for this slide.)",
              color: "AA6633",
              italics: true,
            }),
          ],
        }),
      );
    }
  });

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 40, bold: true, font: "Calibri" },
          paragraph: { spacing: { before: 120, after: 160 }, outlineLevel: 0 },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 28, bold: true, font: "Calibri", color: "1F2A44" },
          paragraph: { spacing: { before: 260, after: 80 }, outlineLevel: 1 },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 12240,
              height: 15840,
              orientation: PageOrientation.PORTRAIT,
            },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}