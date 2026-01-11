import { Brain, Sparkles, Rocket } from 'lucide-react';

interface TransformationalIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const TransformationalIllustration = ({ onNodeClick }: TransformationalIllustrationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      {/* Brain - Human Intelligence */}
      <div 
        className="cursor-pointer hover:scale-110 transition-transform"
        onClick={() => onNodeClick?.("human")}
        style={{ filter: 'drop-shadow(0 0 4px rgba(147, 197, 253, 0.6))' }}
      >
        <Brain size={22} className="text-white" strokeWidth={1.5} />
      </div>

      {/* Plus sign */}
      <span 
        className="text-white font-bold text-lg select-none"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
      >
        +
      </span>

      {/* Sparkles - AI Power */}
      <div 
        className="cursor-pointer hover:scale-110 transition-transform"
        onClick={() => onNodeClick?.("ai")}
        style={{ filter: 'drop-shadow(0 0 4px rgba(196, 181, 253, 0.6))' }}
      >
        <Sparkles size={22} className="text-white" strokeWidth={1.5} />
      </div>

      {/* Equals sign */}
      <span 
        className="text-white font-bold text-lg select-none"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
      >
        =
      </span>

      {/* Rocket - Transformation */}
      <div 
        className="cursor-pointer hover:scale-110 transition-transform"
        onClick={() => onNodeClick?.("opportunity")}
        style={{ filter: 'drop-shadow(0 0 4px rgba(253, 224, 71, 0.6))' }}
      >
        <Rocket size={22} className="text-white" strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default TransformationalIllustration;
