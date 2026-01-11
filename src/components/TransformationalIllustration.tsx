interface TransformationalIllustrationProps {
  onNodeClick?: (node: string) => void;
}

const TransformationalIllustration = ({ onNodeClick }: TransformationalIllustrationProps) => {
  return (
    <svg
      viewBox="0 0 200 50"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Human emoji */}
      <text
        x="30"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="38"
        className="pointer-events-none select-none cursor-pointer"
        onClick={() => onNodeClick?.("human")}
      >
        👤
      </text>

      {/* Plus sign */}
      <text
        x="65"
        y="28"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(0, 0%, 100%)"
        fontSize="26"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
      >
        +
      </text>

      {/* AI emoji */}
      <text
        x="100"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="38"
        className="pointer-events-none select-none cursor-pointer"
        onClick={() => onNodeClick?.("ai")}
      >
        🤖
      </text>

      {/* Equals sign */}
      <text
        x="135"
        y="28"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(0, 0%, 100%)"
        fontSize="26"
        fontWeight="bold"
        fontFamily="'Space Grotesk', sans-serif"
        className="pointer-events-none select-none"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
      >
        =
      </text>

      {/* Target/Opportunity emoji */}
      <text
        x="170"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="40"
        className="pointer-events-none select-none cursor-pointer"
        onClick={() => onNodeClick?.("opportunity")}
      >
        🎯
      </text>
    </svg>
  );
};

export default TransformationalIllustration;
