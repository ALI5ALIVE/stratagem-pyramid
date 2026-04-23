import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReturnInfo { path: string; label: string }

/**
 * Floating button shown when a return path is stored in sessionStorage by
 * <DeepDiveLink />. Click clears the return state and navigates back.
 */
const BackToDeckButton = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<ReturnInfo | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("deepDiveReturn");
      if (!raw) return;
      const parsed = JSON.parse(raw) as ReturnInfo;
      // Only show when we're not already on the return path
      if (parsed?.path && parsed.path !== window.location.pathname) {
        setInfo(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  if (!info) return null;

  const handleClick = () => {
    try { sessionStorage.removeItem("deepDiveReturn"); } catch { /* ignore */ }
    navigate(info.path);
  };

  return (
    <Button
      onClick={handleClick}
      size="sm"
      variant="default"
      className="fixed top-4 left-4 z-[60] shadow-lg gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      ← {info.label}
    </Button>
  );
};

export default BackToDeckButton;