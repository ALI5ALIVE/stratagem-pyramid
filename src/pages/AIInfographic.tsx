import { Helmet } from "react-helmet-async";
import AICapabilitiesMatrix from "@/components/ai-infographic/AICapabilitiesMatrix";
import DeckPPTXExportButton from "@/components/DeckPPTXExportButton";

const AIInfographic = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Comply365 AI Capabilities | AI Infographic</title>
        <meta
          name="description"
          content="Comply365 AI capabilities mapped across ContentManager365, TrainingManager365 and SafetyManager365 — with downloadable PPTX."
        />
        <link rel="canonical" href="/ai-infographic" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Comply365 Platform
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold leading-tight">
              AI Capabilities
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              How our AI Solutions plug into ContentManager365, TrainingManager365
              and SafetyManager365 — one map, every capability.
            </p>
          </div>
          <DeckPPTXExportButton deckId="ai-infographic" />
        </header>

        <section className="rounded-3xl border border-border bg-card/30 p-6 md:p-10">
          <AICapabilitiesMatrix />
        </section>

        <footer className="mt-10 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm bg-blue-500" />
            AI-enabled capability
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm bg-slate-500" />
            Standard (no AI) capability
          </span>
        </footer>
      </main>
    </div>
  );
};

export default AIInfographic;