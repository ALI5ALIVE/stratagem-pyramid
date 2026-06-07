import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ClipboardCheck, Clock } from "lucide-react";
import LessonScroller from "@/components/academy/LessonScroller";
import { SLIDE_REGISTRY } from "@/components/academy/slideRegistry";
import type { AcademyModule } from "@/hooks/useAcademyProgress";
import PlaybookNarrationBar from "@/components/PlaybookNarrationBar";
import { usePlaybookNarration } from "@/hooks/usePlaybookNarration";
import { hasPlaybookNarration } from "@/data/playbookNarrations";

export default function ModuleLesson() {
  const { moduleId } = useParams();
  const nav = useNavigate();
  const [module, setModule] = useState<AcademyModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const narration = usePlaybookNarration();

  useEffect(() => {
    if (!moduleId) return;
    supabase.from("academy_modules").select("*").eq("id", moduleId).maybeSingle()
      .then(({ data }) => { setModule(data as AcademyModule | null); setLoading(false); });
  }, [moduleId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading lesson…</div>;
  if (!module) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Module not found. <Link className="ml-2 text-primary" to="/academy">Back</Link></div>;

  const slideIds = module.slide_ids;
  const activeSlideId = slideIds[Math.min(activeIdx, slideIds.length - 1)];
  const hasNarration = hasPlaybookNarration(activeSlideId);

  const scrollToIdx = (idx: number) => {
    const target = slideIds[idx];
    if (!target) return;
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Top floating control bar */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-background/90 backdrop-blur shadow-sm">
        <Button asChild variant="ghost" size="sm" className="h-7 px-2">
          <Link to="/academy"><ArrowLeft className="h-3.5 w-3.5 mr-1" />Academy</Link>
        </Button>
        <div className="text-[11px] font-mono uppercase tracking-wider text-primary">
          Week {module.week_number ?? module.module_number} of 3{module.kicker ? ` · ${module.kicker}` : ''}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" />~{module.estimated_minutes} min
        </div>
        <div className="hidden md:block text-xs text-foreground max-w-[260px] truncate">{module.title}</div>
        <Button size="sm" className="h-7" onClick={() => nav(`/academy/${module.id}/quiz`)}>
          <ClipboardCheck className="h-3.5 w-3.5 mr-1" />
          Take quiz
        </Button>
      </div>

      <LessonScroller slideIds={slideIds} onActiveIndexChange={setActiveIdx}>
        {slideIds.map((sid, idx) => {
          const Comp = SLIDE_REGISTRY[sid];
          if (!Comp) return null;
          return <Comp key={sid} id={sid} slideNumber={idx} />;
        })}
      </LessonScroller>
      {hasNarration && (
        <PlaybookNarrationBar
          narration={narration}
          activeSlideId={activeSlideId}
          onNextSlide={activeIdx < slideIds.length - 1 ? () => scrollToIdx(activeIdx + 1) : undefined}
          onPrevSlide={activeIdx > 0 ? () => scrollToIdx(activeIdx - 1) : undefined}
        />
      )}
    </div>
  );
}