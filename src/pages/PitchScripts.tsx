import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { FileText, Download, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PITCH_SCRIPT_DECKS,
  buildPitchScriptDocx,
  type PitchScriptDeckId,
} from "@/lib/pitchScriptDocx";

const ORDER: PitchScriptDeckId[] = ["short", "medium", "long"];

const PitchScripts = () => {
  const [busyId, setBusyId] = useState<PitchScriptDeckId | null>(null);

  const download = async (id: PitchScriptDeckId) => {
    const deck = PITCH_SCRIPT_DECKS[id];
    setBusyId(id);
    const tid = toast.loading(`Building ${deck.title} script…`);
    try {
      const blob = await buildPitchScriptDocx(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = deck.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`${deck.title} script ready`, { id: tid });
    } catch (err) {
      console.error("Script export failed:", err);
      toast.error("Script export failed. See console.", { id: tid });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
          Pitch Enablement
        </p>
        <h1 className="text-4xl font-display font-bold mb-3 tracking-tight">
          Executive pitch scripts
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          Download the full narration script for each executive pitch as a Word
          document. Includes per-slide word count and estimated read time at
          150&nbsp;wpm.
        </p>

        <div className="space-y-4">
          {ORDER.map((id) => {
            const deck = PITCH_SCRIPT_DECKS[id];
            const isBusy = busyId === id;
            return (
              <div
                key={id}
                className="rounded-xl border border-border bg-card/40 p-6 flex items-start gap-5"
              >
                <div className="mt-1 rounded-lg bg-primary/10 border border-primary/20 p-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold mb-1">{deck.title}</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    {deck.subtitle} · {deck.slides.length} slides
                  </p>
                  <Link
                    to={deck.route}
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View live deck <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <Button
                  onClick={() => download(id)}
                  disabled={isBusy}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Building…
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download .docx
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PitchScripts;