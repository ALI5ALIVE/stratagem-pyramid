import { useState } from "react";
import { TrendingUp, Sparkles, Trophy } from "lucide-react";

interface GDTransformationalIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const GDTransformationalIllustration = ({ onNodeClick }: GDTransformationalIllustrationProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleClick = (node: string) => {
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* TrendingUp - Market Intelligence */}
        <div
          className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
            hoveredNode === "intelligence" ? "scale-110" : ""
          }`}
          onMouseEnter={() => setHoveredNode("intelligence")}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleClick("intelligence")}
        >
          <div
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-white/20 to-white/5 border border-white/30"
            style={{
              boxShadow: hoveredNode === "intelligence" 
                ? "0 0 32px 12px hsl(199, 89%, 48%)" 
                : "0 0 20px 6px hsl(199, 89%, 48%, 0.5)",
            }}
          >
            <TrendingUp 
              className="w-10 h-10 sm:w-12 sm:h-12 text-white" 
              strokeWidth={2.5}
            />
          </div>
          <span className="text-xs sm:text-sm text-white/70 font-medium">Intelligence</span>
        </div>

        {/* Plus sign */}
        <span className="text-white/80 font-bold text-2xl sm:text-3xl">+</span>

        {/* Sparkles - Ava AI */}
        <div
          className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
            hoveredNode === "ava" ? "scale-110" : ""
          }`}
          onMouseEnter={() => setHoveredNode("ava")}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleClick("ava")}
        >
          <div
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-amber-400/30 to-amber-600/20 border border-amber-400/50"
            style={{
              boxShadow: hoveredNode === "ava" 
                ? "0 0 32px 12px hsl(45, 93%, 58%)" 
                : "0 0 20px 6px hsl(45, 93%, 58%, 0.5)",
            }}
          >
            <Sparkles 
              className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" 
              strokeWidth={2.5}
            />
          </div>
          <span className="text-xs sm:text-sm text-amber-400 font-semibold">Ava</span>
        </div>

        {/* Equals sign */}
        <span className="text-white/80 font-bold text-2xl sm:text-3xl">=</span>

        {/* Trophy - Category Leadership */}
        <div
          className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
            hoveredNode === "leadership" ? "scale-110" : ""
          }`}
          onMouseEnter={() => setHoveredNode("leadership")}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleClick("leadership")}
        >
          <div
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-amber-400/30 to-amber-600/20 border border-amber-400/50"
            style={{
              boxShadow: hoveredNode === "leadership" 
                ? "0 0 32px 12px hsl(45, 93%, 58%)" 
                : "0 0 20px 6px hsl(45, 93%, 58%, 0.5)",
            }}
          >
            <Trophy 
              className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" 
              strokeWidth={2.5}
            />
          </div>
          <span className="text-xs sm:text-sm text-amber-400/80 font-medium">Leadership</span>
        </div>
      </div>
    </div>
  );
};

export default GDTransformationalIllustration;
