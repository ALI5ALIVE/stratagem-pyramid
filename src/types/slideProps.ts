export interface SlideNarrationProps {
  isActive?: boolean;
  isPlaying?: boolean;
  isLoading?: boolean;
  progress?: number;
  hasCompleted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
}
