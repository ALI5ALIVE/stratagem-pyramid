import { Mic } from "lucide-react";
import type { KeynoteScriptAct } from "@/data/silosToSignalsScript";

const accentText: Record<string, string> = {
  blue: "text-blue-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
};

interface ScriptBlockProps {
  script: KeynoteScriptAct;
  accent: "blue" | "amber" | "violet" | "emerald";
}

export function ScriptBlock({ script, accent }: ScriptBlockProps) {
  const wordCount = script.paragraphs.reduce(
    (sum, p) => sum + p.split(/\s+/).filter(Boolean).length,
    0,
  );
  const minutes = Math.max(1, Math.round(wordCount / 140));

  return (
    <div className="keynote-script rounded-xl border border-border bg-card/30 p-6 md:p-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <Mic className="h-3 w-3" /> Spoken script
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
          ~{wordCount.toLocaleString()} words · ~{minutes} min spoken
        </div>
      </div>
      <p className="text-xs italic text-muted-foreground leading-relaxed mb-6 border-l-2 border-border pl-4">
        {script.stageDirection}
      </p>
      <div className="space-y-4 text-[15px] leading-[1.75] text-foreground/90">
        {script.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className={`mt-6 pt-5 border-t border-border/60 text-[11px] uppercase tracking-[0.22em] ${accentText[accent]}`}>
        Cue · {script.cue}
      </div>
    </div>
  );
}