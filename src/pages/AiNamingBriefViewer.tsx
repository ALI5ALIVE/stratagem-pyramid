import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import namingBriefPdf from "@/assets/docs/Comply365_AI_Naming_Brief_v1.pdf?url";

export default function AiNamingBriefViewer() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-6 pt-8 pb-4 flex items-center justify-between gap-4">
        <div>
          <Link
            to="/market-development"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3 w-3 mr-1" /> Market Development
          </Link>
          <h1 className="text-xl font-bold text-foreground tracking-tight mt-2">
            AI Naming & Architecture Brief
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Three-tier naming convention, Intelligence Layer persona shortlist, and JTBD agents mapped to DTOP stages.
          </p>
        </div>
        <a
          href={namingBriefPdf}
          download="Comply365_AI_Naming_Brief_v1.pdf"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> Download PDF
        </a>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 pb-10">
        <div className="rounded-xl border border-border bg-card overflow-hidden h-[calc(100vh-220px)] min-h-[600px]">
          <object
            data={namingBriefPdf}
            type="application/pdf"
            className="w-full h-full"
          >
            <iframe
              src={namingBriefPdf}
              title="AI Naming & Architecture Brief"
              className="w-full h-full border-0"
            />
            <div className="p-6 text-sm text-muted-foreground">
              Your browser cannot display the embedded PDF.{" "}
              <a href={namingBriefPdf} className="text-primary underline" download>
                Download it instead
              </a>
              .
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}