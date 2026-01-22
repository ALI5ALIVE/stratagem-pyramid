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
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-5">
      <div className="flex items-center gap-5 sm:gap-8">
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
            className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-white/20 to-white/5 border border-white/30"
            style={{
              boxShadow: hoveredNode === "intelligence" 
                ? "0 0 32px 12px hsl(199, 89%, 48%)" 
                : "0 0 20px 6px hsl(199, 89%, 48%, 0.5)",
            }}
          >
            <TrendingUp 
              className="w-14 h-14 sm:w-16 sm:h-16 text-white" 
              strokeWidth={2.5}
            />
          </div>
          <span className="text-sm sm:text-base text-white/70 font-medium">Intelligence</span>
        </div>

        {/* Plus sign */}
        <span className="text-white/80 font-bold text-3xl sm:text-4xl">+</span>

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
            className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-amber-400/30 to-amber-600/20 border border-amber-400/50"
            style={{
              boxShadow: hoveredNode === "ava" 
                ? "0 0 32px 12px hsl(45, 93%, 58%)" 
                : "0 0 20px 6px hsl(45, 93%, 58%, 0.5)",
            }}
          >
            <Sparkles 
              className="w-14 h-14 sm:w-16 sm:h-16 text-amber-400" 
              strokeWidth={2.5}
            />
          </div>
          <span className="text-sm sm:text-base text-amber-400 font-semibold">Ava</span>
        </div>

        {/* Equals sign */}
        <span className="text-white/80 font-bold text-3xl sm:text-4xl">=</span>

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
            className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-amber-400/30 to-amber-600/20 border border-amber-400/50"
            style={{
              boxShadow: hoveredNode === "leadership" 
                ? "0 0 32px 12px hsl(45, 93%, 58%)" 
                : "0 0 20px 6px hsl(45, 93%, 58%, 0.5)",
            }}
          >
            <Trophy 
              className="w-14 h-14 sm:w-16 sm:h-16 text-amber-400" 
              strokeWidth={2.5}
            />
          </div>
          <span className="text-sm sm:text-base text-amber-400/80 font-medium">Leadership</span>
        </div>
      </div>
    </div>
  );
};

export default GDTransformationalIllustration;
