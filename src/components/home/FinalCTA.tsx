import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="book" className="border-b border-border/40 py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-12">
        <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground lg:text-6xl">
          Bring us your hardest operational loop.
          <br />
          <span className="text-primary">We'll show you it closed in 20 minutes.</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#book">
              Book a working session <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border/60">
            <a href="#contact">Talk to sales</a>
          </Button>
        </div>
      </div>
    </section>
  );
}