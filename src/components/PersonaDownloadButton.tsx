import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import PersonaPrintablePage from "./PersonaPrintablePage";
import type { PersonaProfile } from "@/data/personaProfiles";
import { ensurePrintFontsLoaded, printBrand } from "./print/printBrand";
import { toast } from "sonner";

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
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "0";
    tempContainer.style.top = "0";
    tempContainer.style.zIndex = "-1";
    tempContainer.style.opacity = "0";
    tempContainer.style.pointerEvents = "none";
    tempContainer.style.width = `${printBrand.page.width}px`;
    tempContainer.style.height = `${printBrand.page.height}px`;
    document.body.appendChild(tempContainer);

    const root = createRoot(tempContainer);
    try {
      root.render(<PersonaPrintablePage persona={persona} />);
      await new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      );
      await ensurePrintFontsLoaded();

      const pageElement = tempContainer.querySelector(".persona-printable-page") as HTMLElement | null;
      if (!pageElement) throw new Error("Printable page not found");

      const canvas = await html2canvas(pageElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: printBrand.color.darkPaper,
        width: printBrand.page.width,
        height: printBrand.page.height,
        windowWidth: printBrand.page.width,
        windowHeight: printBrand.page.height,
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [816, 1056],
      });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 1056, 816);
      pdf.save(`Comply365-Persona-${persona.id}-Brief.pdf`);
      toast.success("Persona brief downloaded");
    } catch (err) {
      console.error("Persona PDF generation failed:", err);
      toast.error("Could not generate PDF. Please try again.");
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