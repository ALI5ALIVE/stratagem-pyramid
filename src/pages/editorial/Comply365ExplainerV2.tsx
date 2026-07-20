import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Film, Mic, Clock, Palette, Info, Layers } from "lucide-react";
import {
  Document as DocxDocument,
  Packer as DocxPacker,
  Paragraph as DocxParagraph,
  TextRun as DocxTextRun,
  HeadingLevel as DocxHeadingLevel,
} from "docx";
import {
  EXPLAINER_META,
  EXPLAINER_BEATS,
  EXPLAINER_SCRIPT,
  EXPLAINER_STORYBOARD,
  LAYER_VALUE_LINES,
  ART_DIRECTION,
  OUT_OF_SCOPE,
} from "@/data/comply365ExplainerV2";

export default function Comply365ExplainerV2() {
  const wordCount = EXPLAINER_SCRIPT.reduce(
    (s, seg) => s + seg.text.split(/\s+/).filter(Boolean).length,
    0,
  );

  async function downloadDocx() {
    const H = (text: string, level: (typeof DocxHeadingLevel)[keyof typeof DocxHeadingLevel]) =>
      new DocxParagraph({ heading: level, children: [new DocxTextRun(text)] });
    const P = (text: string, opts: { bold?: boolean; italic?: boolean } = {}) =>
      new DocxParagraph({
        children: [new DocxTextRun({ text, bold: opts.bold, italics: opts.italic })],
      });

    const children: DocxParagraph[] = [];
    children.push(H(EXPLAINER_META.title, DocxHeadingLevel.HEADING_1));
    children.push(P(EXPLAINER_META.subtitle, { italic: true }));
    children.push(
      P(
        `${EXPLAINER_META.version} · ~${wordCount} words · target ${EXPLAINER_META.targetLength} · ${EXPLAINER_META.pace}`,
        { italic: true },
      ),
    );
    children.push(P(""));

    children.push(H("Narrative spine", DocxHeadingLevel.HEADING_2));
    EXPLAINER_BEATS.forEach((b) => {
      children.push(P(`${b.index}. ${b.label}  [${b.timecode}]`, { bold: true }));
      children.push(P(`Purpose: ${b.purpose}`));
      children.push(P(`Visual: ${b.visualMode}`));
      children.push(P(""));
    });

    children.push(H("Script (v2)", DocxHeadingLevel.HEADING_2));
    EXPLAINER_SCRIPT.forEach((seg) => {
      children.push(P(`[${seg.timecode} · ${seg.beat}]`, { bold: true }));
      children.push(P(seg.text));
      children.push(P(""));
    });

    children.push(H("Layer value lines", DocxHeadingLevel.HEADING_2));
    LAYER_VALUE_LINES.forEach((l) => {
      children.push(P(l.layer, { bold: true }));
      children.push(P(`Capability: ${l.capability}`));
      children.push(P(`Benefit: ${l.benefit}`));
      children.push(P(""));
    });

    children.push(H("Storyboard", DocxHeadingLevel.HEADING_2));
    EXPLAINER_STORYBOARD.forEach((shot) => {
      children.push(P(`Shot ${shot.n} · ${shot.timecode}`, { bold: true }));
      children.push(P(`VO: ${shot.vo}`));
      children.push(P(`Visual: ${shot.visual}`));
      children.push(P(`Motion: ${shot.motion}`));
      if (shot.valueCaption) children.push(P(`Value caption: ${shot.valueCaption}`));
      children.push(P(""));
    });

    children.push(H("Art direction", DocxHeadingLevel.HEADING_2));
    ART_DIRECTION.forEach((a) => {
      children.push(P(`${a.label}: `, { bold: true }));
      children.push(P(a.value));
    });
    children.push(P(""));

    children.push(H("Out of scope for v2", DocxHeadingLevel.HEADING_2));
    OUT_OF_SCOPE.forEach((s) => children.push(P(`• ${s}`)));

    const doc = new DocxDocument({ sections: [{ children }] });
    const blob = await DocxPacker.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Comply365-Explainer-v2.docx";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Film className="h-3 w-3" /> Editorial · Explainer brief</span>
              <Link
                to="/editorial/comply365-explainer-v1"
                className="text-primary/80 hover:text-primary normal-case tracking-normal"
              >
                ← Compare with v1 (industry-pain led)
              </Link>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold leading-tight">
              {EXPLAINER_META.title}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">{EXPLAINER_META.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" /> {EXPLAINER_META.targetLength}</Badge>
              <Badge variant="outline" className="gap-1"><Mic className="h-3 w-3" /> ~{wordCount} words</Badge>
              <Badge variant="outline">{EXPLAINER_META.pace}</Badge>
              <Badge variant="outline">{EXPLAINER_META.version}</Badge>
            </div>
          </div>
          <Button onClick={downloadDocx} className="gap-2">
            <Download className="h-4 w-4" /> Download brief (.docx)
          </Button>
        </div>

        {/* What changed vs v1 */}
        <section className="mb-14 rounded-xl border border-primary/30 bg-primary/5 p-6">
          <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-2">Why v2</div>
          <p className="text-sm leading-relaxed text-foreground/90">
            v1 opened on industry pain and only reached the product at 0:30. v2 is a{" "}
            <span className="font-semibold text-foreground">product/solution explainer</span> —
            Comply365 is named in the first 12 seconds, each stack layer carries a capability +
            benefit line, and the payoff beat uses specific outcomes and the 550+ operators trust
            signal.
          </p>
        </section>

        {/* Narrative spine */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl mb-5">1 · Narrative spine</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
            {EXPLAINER_BEATS.map((b) => (
              <div key={b.index} className="rounded-xl border border-border bg-card/40 p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Beat {b.index} · {b.timecode}
                </div>
                <div className="mt-2 font-semibold text-sm leading-snug">{b.label}</div>
                <div className="mt-3 text-xs text-muted-foreground leading-relaxed">{b.purpose}</div>
                <div className="mt-3 text-xs text-primary/80 leading-relaxed">{b.visualMode}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Script */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl mb-5">2 · Script (v2)</h2>
          <div className="rounded-xl border border-border bg-card/30 divide-y divide-border/60">
            {EXPLAINER_SCRIPT.map((seg) => (
              <div key={seg.timecode} className="grid grid-cols-[110px_1fr] gap-6 p-5">
                <div>
                  <div className="font-mono text-sm text-primary">{seg.timecode}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">
                    {seg.beat}
                  </div>
                </div>
                <p className="text-[15px] leading-[1.75] text-foreground/90">{seg.text}</p>
              </div>
            ))}
          </div>
          <p className="text-xs italic text-muted-foreground mt-3">{EXPLAINER_META.pace}.</p>
        </section>

        {/* Layer value lines */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl mb-5 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> 3 · Layer value lines (on-screen captions)
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {LAYER_VALUE_LINES.map((l) => (
              <div key={l.layer} className="rounded-xl border border-border bg-card/30 p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Layer</div>
                <div className="font-semibold mt-1">{l.layer}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Capability</div>
                <div className="text-sm">{l.capability}</div>
                <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Benefit</div>
                <div className="text-sm text-primary/90">{l.benefit}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Storyboard */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl mb-5">4 · Storyboard — 12 shots</h2>
          <div className="space-y-3">
            {EXPLAINER_STORYBOARD.map((shot) => (
              <div
                key={shot.n}
                className="rounded-xl border border-border bg-card/30 p-5 grid md:grid-cols-[80px_120px_1fr_1fr] gap-5"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Shot</div>
                  <div className="font-heading text-2xl">{shot.n}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Time</div>
                  <div className="font-mono text-sm text-primary mt-1">{shot.timecode}</div>
                  <div className="text-xs text-muted-foreground italic mt-3">"{shot.vo}"</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">Visual</div>
                  <p className="text-sm leading-relaxed">{shot.visual}</p>
                  {shot.valueCaption && (
                    <div className="mt-3 inline-block rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary">
                      On-screen caption: {shot.valueCaption}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">Motion</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{shot.motion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Art direction */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl mb-5 flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" /> 5 · Art direction
          </h2>
          <div className="rounded-xl border border-border bg-card/30 divide-y divide-border/60">
            {ART_DIRECTION.map((a) => (
              <div key={a.label} className="grid grid-cols-[180px_1fr] gap-6 p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{a.label}</div>
                <div className="text-sm leading-relaxed">{a.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Out of scope */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl mb-5 flex items-center gap-2">
            <Info className="h-5 w-5 text-amber-400" /> 6 · Out of scope for v2
          </h2>
          <ul className="rounded-xl border border-border bg-card/30 p-6 space-y-2">
            {OUT_OF_SCOPE.map((s) => (
              <li key={s} className="text-sm text-muted-foreground">— {s}</li>
            ))}
          </ul>
        </section>

        <div className="text-xs text-muted-foreground italic border-t border-border pt-6">
          Reference: Amdocs Cognitive Core — https://www.amdocs.com/products-services/aos/cognitive-core
        </div>
      </div>
    </div>
  );
}