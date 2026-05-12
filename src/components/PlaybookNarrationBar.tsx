import SlidePlayButton from "@/components/SlidePlayButton";
import type { PlaybookNarrationController } from "@/hooks/usePlaybookNarration";

interface Props {
  narration: PlaybookNarrationController;
  activeSlideId: string;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
}

/**
 * Single, page-level glassmorphism narration control bar.
 * Used by every Specialist Playbook page and by the Academy LessonScroller
 * so we don't need to embed a play button inside each individual slide.
 */
const PlaybookNarrationBar = ({ narration, activeSlideId, onNextSlide, onPrevSlide }: Props) => {
  const isActive = narration.currentSlide === activeSlideId;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="relative pointer-events-auto">
        <SlidePlayButton
          isPlaying={isActive && narration.isPlaying}
          isLoading={isActive && narration.isLoading}
          progress={isActive ? narration.progress : 0}
          hasCompleted={isActive && narration.hasCompleted}
          onPlay={() => narration.play(activeSlideId)}
          onPause={() => narration.pause()}
          onNextSlide={onNextSlide}
          onPrevSlide={onPrevSlide}
        />
      </div>
    </div>
  );
};

export default PlaybookNarrationBar;