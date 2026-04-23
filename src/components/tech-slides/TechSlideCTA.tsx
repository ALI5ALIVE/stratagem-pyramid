import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, ArrowUpRight } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

/**
 * Closing CTA slide — replaces the prior Partnership slide.
 */
const TechSlideCTA = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-cta"
    showHeader={false}
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-4">
      <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
        Find out more
      </span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight max-w-3xl">
        The Comply365 <span className="text-primary">Operational Performance Platform</span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
        See how Comply365 connects safety, content and training on one operational data foundation —
        with the intelligence and operating model to turn signals into proof.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <Button asChild size="lg" className="gap-2">
          <a href="mailto:hello@comply365.com?subject=Operational%20Performance%20Platform%20%E2%80%94%20Deep%20Dive%20Request">
            <Calendar className="h-4 w-4" />
            Request a deep-dive
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <a href="https://www.comply365.com" target="_blank" rel="noreferrer">
            comply365.com
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4" />
        <a href="mailto:hello@comply365.com" className="hover:text-foreground transition-colors">
          hello@comply365.com
        </a>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-2xl font-display font-bold text-foreground">550+</div>
          <div className="text-xs text-muted-foreground">Airlines worldwide</div>
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-foreground">2.5M+</div>
          <div className="text-xs text-muted-foreground">Users</div>
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-foreground">6</div>
          <div className="text-xs text-muted-foreground">Continents</div>
        </div>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideCTA;