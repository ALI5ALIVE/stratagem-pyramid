import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import PersonaPrintablePage from "./PersonaPrintablePage";
import type { PersonaProfile } from "@/data/personaProfiles";
import { ensurePrintFontsLoaded, printBrand } from "./print/printBrand";

interface Props {
  persona: PersonaProfile;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm";
  className?: string;
}

const PersonaDownloadButton: React.FC<Props> = ({ persona, variant = "outline", size = "sm", className }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    await ensurePrintFontsLoaded();
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    document.body.appendChild(tempContainer);

    const root = createRoot(tempContainer);
    try {
      await new Promise<void>((resolve) => {
        root.render(<PersonaPrintablePage persona={persona} />);
        setTimeout(resolve, 200);
      });

      const pageElement = tempContainer.querySelector(".persona-printable-page") as HTMLElement | null;
      if (!pageElement) throw new Error("Printable page not found");

      const canvas = await html2canvas(pageElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: printBrand.color.paper,
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [816, 1056],
      });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 1056, 816);
      pdf.save(`Comply365-Persona-${persona.id}-Brief.pdf`);
    } catch (err) {
      console.error("Persona PDF generation failed:", err);
    } finally {
      root.unmount();
      tempContainer.remove();
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={generatePDF} disabled={isGenerating} variant={variant} size={size} className={className}>
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Download Persona Brief PDF
        </>
      )}
    </Button>
  );
};

export default PersonaDownloadButton;