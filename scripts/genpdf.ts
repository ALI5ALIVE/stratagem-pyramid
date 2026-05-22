import jsPDFMod from "jspdf";
// @ts-ignore
globalThis.jsPDF = jsPDFMod;
const { buildWeekFieldKitPdf } = await import("../src/lib/fieldKitPdf");
import { coachCardWeeks } from "../src/data/salesEnablementCoachCards";
import { writeFileSync, mkdirSync } from "fs";
mkdirSync("/tmp/pdfqa", { recursive: true });
for (const w of coachCardWeeks) {
  const pdf = buildWeekFieldKitPdf(w);
  const ab = pdf.output("arraybuffer");
  writeFileSync(`/tmp/pdfqa/week-${w.number}.pdf`, Buffer.from(ab));
  console.log("wrote", w.number, "pages:", pdf.getNumberOfPages());
}
