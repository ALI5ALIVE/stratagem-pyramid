import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { signalVsOthers } from "@/data/signalsPlaybook";

const SIGSlide2WhatIsSignal = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="sig-what"
      title="What is a signal?"
      subtitle="A signal is a pattern in operational data that warrants action. It's not an event, an alert, or a metric — and that distinction matters."
      slideNumber={2}
      {...props}
    >
      <div className="h-full flex flex-col gap-5">
        <div className="p-5 rounded-xl border border-primary/40 bg-primary/5">
          <p className="text-xs uppercase tracking-widest text-primary mb-2">Definition</p>
          <p className="text-lg text-foreground font-medium leading-relaxed">
            A <span className="text-primary font-semibold">signal</span> is a meaningful change in operational data —
            detected early enough to <span className="text-primary font-semibold">act on</span>, in time to{" "}
            <span className="text-primary font-semibold">prevent</span> — not just record.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 flex-1">
          {signalVsOthers.map((row) => {
            const isSignal = row.term === "Signal";
            return (
              <div
                key={row.term}
                className={`p-4 rounded-xl border flex flex-col ${
                  isSignal
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-card"
                }`}
              >
                <p
                  className={`text-xs uppercase tracking-wider mb-2 ${
                    isSignal ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {isSignal ? "What we sell" : "Often confused with"}
                </p>
                <h4
                  className={`text-xl font-display font-bold mb-3 ${
                    isSignal ? "text-primary" : "text-foreground"
                  }`}
                >
                  {row.term}
                </h4>
                <p className="text-sm text-foreground mb-3 leading-relaxed">{row.what}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                  {row.problem}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGSlide2WhatIsSignal;