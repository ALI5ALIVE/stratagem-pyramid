import React, { useState, useRef } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PrintablePage from './PrintablePage';
import { createRoot } from 'react-dom/client';

interface LayerData {
  id: string;
  level: number;
  label: string;
  sublabel?: string;
  color: string;
  glow: string;
  headline: string;
  whatItLooksLike: string[];
  result: string[];
  valueProof: {
    metrics: string[];
    roiStatement: string;
  };
  whyItMatters: string;
  behavioralShift: {
    from: string;
    to: string;
    culturalMarker: string;
  };
  timeAllocation: {
    reactive: number;
    proactive: number;
    strategic: number;
  };
}

interface DownloadButtonProps {
  layersData: LayerData[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ layersData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Sort layers from 5 to 1 (starting from fragmented to predictive)
      const sortedLayers = [...layersData].sort((a, b) => b.level - a.level);
      const totalPages = sortedLayers.length;
      
      // Create PDF in landscape orientation
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [816, 1056] // Matching our page dimensions
      });

      // Create a temporary container for rendering
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      document.body.appendChild(tempContainer);

      for (let i = 0; i < sortedLayers.length; i++) {
        const layer = sortedLayers[i];
        const pageNumber = i + 1;

        // Create a div for this page
        const pageDiv = document.createElement('div');
        tempContainer.appendChild(pageDiv);

        // Render the PrintablePage component into the div
        const root = createRoot(pageDiv);
        await new Promise<void>((resolve) => {
          root.render(
            <PrintablePage 
              layer={layer} 
              pageNumber={pageNumber} 
              totalPages={totalPages} 
            />
          );
          // Give React time to render
          setTimeout(resolve, 100);
        });

        // Find the rendered printable-page element
        const pageElement = pageDiv.querySelector('.printable-page') as HTMLElement;
        
        if (pageElement) {
          // Capture the page as canvas
          const canvas = await html2canvas(pageElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
          });

          // Add page to PDF
          const imgData = canvas.toDataURL('image/png');
          
          if (i > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(imgData, 'PNG', 0, 0, 1056, 816);
        }

        // Cleanup
        root.unmount();
        pageDiv.remove();
      }

      // Remove temp container
      tempContainer.remove();

      // Download the PDF
      pdf.save('Comply365-Maturity-Model.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        onClick={generatePDF}
        disabled={isGenerating}
        variant="outline"
        size="sm"
        className="mt-4 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download Maturity Model
          </>
        )}
      </Button>
      
      {/* Hidden container for rendering pages */}
      <div ref={containerRef} style={{ position: 'absolute', left: '-9999px', top: 0 }} />
    </>
  );
};

export default DownloadButton;
