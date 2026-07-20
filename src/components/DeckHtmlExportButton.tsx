import React, { useState } from "react";
import { FileCode2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// Lazy-imported inside handler to avoid a circular module init between
// TechSlideOpener → DeckHtmlExportButton → buildMediumPitchHtml → execPitchMediumSlides → TechSlideOpener.

type Deck = "executive-pitch-medium";

interface Props {
  deckId: Deck;
  className?: string;
}

const FILENAMES: Record<Deck, string> = {
  "executive-pitch-medium": "comply365-medium-pitch-html.zip",
};

const DeckHtmlExportButton: React.FC<Props> = ({ deckId, className }) => {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    setBusy(true);
    const tid = toast.loading("Preparing HTML bundle…");
    try {
      const { buildMediumPitchHtmlZip } = await import("@/exporters/html/buildMediumPitchHtml");
      const blob = await buildMediumPitchHtmlZip((current, total, label) => {
        if (current >= total) {
          toast.loading("Packaging HTML bundle…", { id: tid });
        } else {
          toast.loading(`Rendering slide ${current + 1} of ${total} — ${label}`, { id: tid });
        }
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = FILENAMES[deckId];
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("HTML bundle ready", { id: tid });
    } catch (err) {
      console.error("HTML export failed:", err);
      toast.error("HTML export failed. See console.", { id: tid });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={busy} variant="outline" size="sm" className={className}>
      {busy ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Building…
        </>
      ) : (
        <>
          <FileCode2 className="w-4 h-4 mr-2" />
          Download HTML bundle
        </>
      )}
    </Button>
  );
};

export default DeckHtmlExportButton;