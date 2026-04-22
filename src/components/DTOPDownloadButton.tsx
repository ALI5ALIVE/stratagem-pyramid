import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import DTOPPrintablePage from "./print/DTOPPrintablePage";
import { ensurePrintFontsLoaded, printBrand } from "./print/printBrand";

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
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    document.body.appendChild(tempContainer);

    const root = createRoot(tempContainer);
    try {
      await new Promise<void>((resolve) => {
        root.render(<DTOPPrintablePage />);
        setTimeout(resolve, 200);
      });

      const pageElement = tempContainer.querySelector(".dtop-printable-page") as HTMLElement | null;
      if (!pageElement) throw new Error("DTOP printable page not found");

      const canvas = await html2canvas(pageElement, {
        scale: 2, useCORS: true, logging: false,
        backgroundColor: printBrand.color.paper,
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
    } catch (err) {
      console.error("DTOP PDF generation failed:", err);
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