import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { AlertCircle, Database } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Exec2Slide1BeforeProps extends SlideNarrationProps {
  slideNumber?: number;
}

const beforeItems = [
  "Safety, content, training are disconnected",
  "Investigations and changes happen manually",
  "Training not tied to operational signals",
  "Evidence assembled late and inconsistently",
];

const generateParticles = (count: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 15 + Math.random() * 12;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    particles.push({ x, y });
  }
  return particles;
};

const Exec2Slide1Before = ({
  slideNumber,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
  onPrevSlide,
}: Exec2Slide1BeforeProps) => {
  return (
    <SalesSlideContainer
      id="exec2-slide-1"
      title="The Strategic Shift"
      subtitle="Before — The operational reality we're transforming"
      slideNumber={slideNumber}
      variant="dark"
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
      onPrevSlide={onPrevSlide}
    >
      <div className="space-y-6">
        {/* Fragmentation Visual */}
        <div className="relative h-40">
          <svg viewBox="0 0 300 140" className="w-full h-full">
            {/* Broken connection lines */}
            <line x1="80" y1="55" x2="105" y2="55" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            <text x="95" y="52" fill="hsl(var(--destructive))" fontSize="10" fontWeight="bold">✕</text>
            <line x1="195" y1="55" x2="220" y2="55" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            <text x="210" y="52" fill="hsl(var(--destructive))" fontSize="10" fontWeight="bold">✕</text>

            {/* Safety Silo */}
            <g>
              <circle cx="55" cy="55" r="35" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />
              <circle cx="55" cy="55" r="28" fill="hsl(var(--destructive) / 0.1)" />
              {generateParticles(8).map((p, i) => (
                <circle key={`s-${i}`} cx={55 + p.x} cy={55 + p.y} r="2" fill="hsl(var(--destructive))" opacity="0.6" />
              ))}
              <text x="55" y="52" textAnchor="middle" dominantBaseline="middle" fill="hsl(var(--destructive))" fontSize="9" fontWeight="600">Safety</text>
              <text x="55" y="63" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="7" opacity="0.8">Events</text>
            </g>

            {/* Content Silo */}
            <g>
              <circle cx="150" cy="55" r="35" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />
              <circle cx="150" cy="55" r="28" fill="hsl(var(--destructive) / 0.1)" />
              {generateParticles(10).map((p, i) => (
                <circle key={`p-${i}`} cx={150 + p.x} cy={55 + p.y} r="2" fill="hsl(var(--destructive))" opacity="0.6" />
              ))}
              <text x="150" y="52" textAnchor="middle" dominantBaseline="middle" fill="hsl(var(--destructive))" fontSize="9" fontWeight="600">Content</text>
              <text x="150" y="63" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="7" opacity="0.8">Docs</text>
            </g>

            {/* Training Silo */}
            <g>
              <circle cx="245" cy="55" r="35" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />
              <circle cx="245" cy="55" r="28" fill="hsl(var(--destructive) / 0.1)" />
              {generateParticles(12).map((p, i) => (
                <circle key={`t-${i}`} cx={245 + p.x} cy={55 + p.y} r="2" fill="hsl(var(--destructive))" opacity="0.6" />
              ))}
              <text x="245" y="52" textAnchor="middle" dominantBaseline="middle" fill="hsl(var(--destructive))" fontSize="9" fontWeight="600">Training</text>
              <text x="245" y="63" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="7" opacity="0.8">Records</text>
            </g>

            {/* Data volume labels */}
            <g>
              <text x="55" y="105" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="11" fontWeight="bold">12K</text>
              <text x="55" y="118" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">scattered</text>
              <text x="150" y="105" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="11" fontWeight="bold">8K</text>
              <text x="150" y="118" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">orphaned</text>
              <text x="245" y="105" textAnchor="middle" fill="hsl(var(--destructive))" fontSize="11" fontWeight="bold">45K</text>
              <text x="245" y="118" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">manual</text>
            </g>
          </svg>
        </div>

        {/* Bullet points */}
        <div className="bg-card/60 border border-destructive/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-destructive">Fragmented Data Silos</h3>
          </div>
          <ul className="space-y-2">
            {beforeItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Data Locked callout */}
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive uppercase">Data Locked</span>
          </div>
          <p className="text-sm text-muted-foreground">
            65K+ data points managed manually, not automated or online
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default Exec2Slide1Before;
