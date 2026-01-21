export interface SlideNarrationProps {
  isActive?: boolean;
  isPlaying?: boolean;
  isLoading?: boolean;
  progress?: number;
  onPlay?: () => void;
  onPause?: () => void;
}
