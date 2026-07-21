import React, { useState } from "react";
import { Film, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Deck = "executive-pitch-medium";

interface Props {
  deckId: Deck;
  className?: string;
}

const FILENAMES: Record<Deck, string> = {
  "executive-pitch-medium": "comply365-medium-pitch-webpage.zip",
};

const DeckHtmlReplicaExportButton: React.FC<Props> = ({ deckId, className }) => {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    setBusy(true);
    const tid = toast.loading("Preparing standalone HTML webpage…");
    try {
      const { buildMediumPitchReplicaHtml } = await import("@/exporters/html/buildMediumPitchReplica");
      const blob = await buildMediumPitchReplicaHtml((current, total, label) => {
        if (current >= total) {
          toast.loading("Packaging HTML webpage…", { id: tid });
        } else {
          toast.loading(`Slide ${current + 1}/${total} — ${label}`, { id: tid });
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
      toast.success("Standalone HTML webpage ready", { id: tid });
    } catch (err) {
      console.error("Standalone HTML export failed:", err);
      toast.error("Standalone HTML export failed. See console.", { id: tid });
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
          <Film className="w-4 h-4 mr-2" />
          Download 2
        </>
      )}
    </Button>
  );
};

export default DeckHtmlReplicaExportButton;