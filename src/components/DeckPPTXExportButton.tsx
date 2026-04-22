import React, { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DECK_BUILDERS, type DeckId } from "@/exporters/pptx";

interface Props {
  deckId: DeckId;
  className?: string;
}

const DeckPPTXExportButton: React.FC<Props> = ({ deckId, className }) => {
  const [busy, setBusy] = useState(false);
  const cfg = DECK_BUILDERS[deckId];

  const handleClick = async () => {
    if (!cfg) return;
    setBusy(true);
    const tid = toast.loading(`Preparing ${cfg.label} PowerPoint…`);
    try {
      const blob = await cfg.build({
        onProgress: (current, total, label) => {
          if (current >= total) {
            toast.loading(`Packaging ${cfg.label}…`, { id: tid });
          } else {
            toast.loading(`Building slide ${current + 1} of ${total} — ${label}`, { id: tid });
          }
        },
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = cfg.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`${cfg.label} PowerPoint ready`, { id: tid });
    } catch (err) {
      console.error("PPTX export failed:", err);
      toast.error("PowerPoint export failed. See console.", { id: tid });
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
          <FileDown className="w-4 h-4 mr-2" />
          Download Editable PowerPoint
        </>
      )}
    </Button>
  );
};

export default DeckPPTXExportButton;