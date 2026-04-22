import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import DTOPPrintablePage from "./print/DTOPPrintablePage";
import { ensurePrintFontsLoaded, printBrand } from "./print/printBrand";
import { toast } from "sonner";

interface Props {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm";
  className?: string;
  label?: string;
}

const DTOPDownloadButton: React.FC<Props> = ({
  variant = "outline", size = "sm", className, label = "Download 1-Pager PDF",
}) => {
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
      root.render(<DTOPPrintablePage />);
      await new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      );
      await ensurePrintFontsLoaded();

      const pageElement = tempContainer.querySelector(".dtop-printable-page") as HTMLElement | null;
      if (!pageElement) throw new Error("DTOP printable page not found");

      const canvas = await html2canvas(pageElement, {
        scale: 2, useCORS: true, logging: false,
        backgroundColor: printBrand.color.paper,
        width: printBrand.page.width,
        height: printBrand.page.height,
        windowWidth: printBrand.page.width,
        windowHeight: printBrand.page.height,
      });

      const pdf = new jsPDF({
        orientation: "landscape", unit: "px",
        format: [printBrand.page.height, printBrand.page.width],
      });
      pdf.addImage(
        canvas.toDataURL("image/png"), "PNG",
        0, 0, printBrand.page.width, printBrand.page.height,
      );
      pdf.save("Comply365-DTOP-Operating-Model-Brief.pdf");
      toast.success("DTOP one-pager downloaded");
    } catch (err) {
      console.error("DTOP PDF generation failed:", err);
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
          {label}
        </>
      )}
    </Button>
  );
};

export default DTOPDownloadButton;