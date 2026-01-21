import { useState } from "react";
import SlideContainer from "./SlideContainer";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Label,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SlideNarrationProps } from "@/types/slideProps";

const vendors = [
  { name: "Comply365", breadth: 9.5, depth: 9.0, color: "#0066ff", isHighlighted: true },
  { name: "Ideagen", breadth: 7.0, depth: 7.0, color: "#10b981", isHighlighted: false },
  { name: "TrustFlight Centrik", breadth: 7.0, depth: 6.75, color: "#8b5cf6", isHighlighted: false },
  { name: "Hinfact", breadth: 4.5, depth: 4.0, color: "#f59e0b", isHighlighted: false },
  { name: "Web Manuals", breadth: 4.0, depth: 4.4, color: "#ef4444", isHighlighted: false },
  { name: "Yonder", breadth: 2.0, depth: 2.5, color: "#ec4899", isHighlighted: false },
  { name: "Orlando", breadth: 1.5, depth: 2.5, color: "#14b8a6", isHighlighted: false },
];

const capabilities = [
  "Manuals",
  "Documents", 
  "Training",
  "Crew Records",
  "Rostering",
  "Fatigue",
  "SMS/Safety",
  "Hazard/Risk",
  "CAPA/Audit",
  "Readiness",
];

const radarData = capabilities.map((cap, index) => {
  const scores: Record<string, number> = {
    "Comply365": [4, 4, 4, 3, 3, 4, 4, 3, 4, 3][index],
    "Ideagen": [3, 3, 3, 2, 2, 2, 3, 3, 4, 3][index],
    "TrustFlight Centrik": [3, 3, 2, 3, 3, 2, 3, 3, 3, 2][index],
    "Hinfact": [2, 2, 1, 1, 1, 1, 3, 2, 2, 1][index],
    "Web Manuals": [3, 2, 1, 1, 0, 0, 2, 1, 2, 2][index],
    "Yonder": [1, 1, 1, 1, 1, 1, 1, 1, 1, 0][index],
    "Orlando": [1, 1, 1, 0, 0, 0, 1, 1, 1, 1][index],
  };
  return {
    capability: cap,
    ...Object.fromEntries(vendors.map(v => [v.name, scores[v.name] || 0])),
  };
});

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-xs text-muted-foreground">
          Breadth: <span className="text-foreground">{data.breadth}%</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Depth: <span className="text-foreground">{data.depth.toFixed(1)}/4.0</span>
        </p>
      </div>
    );
  }
  return null;
};

// Quadrant label component for ReferenceArea with corner positioning
const QuadrantLabel = ({ viewBox, label, sublabel, position }: any) => {
  const { x, y, width, height } = viewBox;
  const padding = 12;
  
  let textX, textY;
  
  switch (position) {
    case "top-left":
      textX = x + padding;
      textY = y + padding + 12;
      break;
    case "top-right":
      textX = x + width - padding;
      textY = y + padding + 12;
      break;
    case "bottom-left":
      textX = x + padding;
      textY = y + height - padding - 8;
      break;
    case "bottom-right":
      textX = x + width - padding;
      textY = y + height - padding - 8;
      break;
    default:
      textX = x + width / 2;
      textY = y + height / 2;
  }
  
  const anchor = position?.includes("left") ? "start" : position?.includes("right") ? "end" : "middle";
  
  return (
    <g>
      <text
        x={textX}
        y={textY - 8}
        textAnchor={anchor}
        fill="hsl(var(--foreground))"
        fontSize={11}
        fontWeight="bold"
        opacity={0.8}
      >
        {label}
      </text>
      <text
        x={textX}
        y={textY + 8}
        textAnchor={anchor}
        fill="hsl(var(--muted-foreground))"
        fontSize={9}
        opacity={0.7}
      >
        {sublabel}
      </text>
    </g>
  );
};

const Slide8PositioningMap = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeView, setActiveView] = useState<"matrix" | "radar">("matrix");
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(
    new Set(vendors.map(v => v.name))
  );

  const toggleVendor = (name: string) => {
    setSelectedVendors(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        if (next.size > 1) next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <SlideContainer
      id="slide-8"
      title="Competitive Positioning"
      subtitle="Where Comply365 stands — and why competitors can't follow"
      slideNumber={6}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-5">
        {/* Tab Toggle */}
        <div className="flex justify-center">
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "matrix" | "radar")}>
            <TabsList className="bg-card">
              <TabsTrigger value="matrix" className="text-xs">
                Strategic Matrix
              </TabsTrigger>
              <TabsTrigger value="radar" className="text-xs">
                Capability Radar
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Chart Container */}
        <div className="bg-card rounded-xl border border-border p-5">
          {activeView === "matrix" ? (
            <div className="w-full max-w-[720px] mx-auto aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 50, right: 40, bottom: 110, left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  
                  {/* Reference lines for quadrants */}
                  <ReferenceLine x={5} stroke="hsl(var(--border))" strokeDasharray="5 5" />
                  <ReferenceLine y={5} stroke="hsl(var(--border))" strokeDasharray="5 5" />

                  <XAxis
                    type="number"
                    dataKey="breadth"
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    name="Full Capability Coverage"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    label={{
                      value: "Full Capability Coverage →",
                      position: "bottom",
                      offset: 5,
                      style: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }
                    }}
                  />
                  <text 
                    x="50%" 
                    y="96%" 
                    textAnchor="middle" 
                    className="fill-muted-foreground text-[10px]"
                  >
                    (Point Solution → Multi-Module Suite → Connected Platform)
                  </text>
                  <YAxis
                    type="number"
                    dataKey="depth"
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    name="Strategic Value"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    label={{
                      value: "Strategic Value →",
                      angle: -90,
                      position: "left",
                      offset: 20,
                      style: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }
                    }}
                  />
                  <text 
                    x={-360}
                    y={18}
                    textAnchor="middle" 
                    className="fill-muted-foreground text-[10px]"
                    transform="rotate(-90)"
                  >
                    (Compliance Tool → Operational System → Strategic Platform)
                  </text>

                  <Tooltip content={<CustomTooltip />} />

                  {/* Quadrant backgrounds - rendered FIRST so competitors appear on top */}
                  <ReferenceArea
                    x1={0} x2={5} y1={0} y2={5}
                    fill="#6b7280"
                    fillOpacity={0.15}
                    stroke="#6b7280"
                    strokeOpacity={0.3}
                    label={<QuadrantLabel label="Basic Tools" sublabel="Task-level Value" position="bottom-left" />}
                  />
                  <ReferenceArea
                    x1={5} x2={10} y1={0} y2={5}
                    fill="#9ca3af"
                    fillOpacity={0.15}
                    stroke="#9ca3af"
                    strokeOpacity={0.3}
                    label={<QuadrantLabel label="Broad Tools" sublabel="Breadth without Depth" position="bottom-right" />}
                  />
                  <ReferenceArea
                    x1={0} x2={5} y1={5} y2={10}
                    fill="#8b5cf6"
                    fillOpacity={0.15}
                    stroke="#8b5cf6"
                    strokeOpacity={0.3}
                    label={<QuadrantLabel label="Specialists" sublabel="High Value, Narrow Domain" position="top-left" />}
                  />
                  <ReferenceArea
                    x1={5} x2={10} y1={5} y2={10}
                    fill="#0066ff"
                    fillOpacity={0.2}
                    stroke="#0066ff"
                    strokeOpacity={0.4}
                    label={<QuadrantLabel label="Leaders" sublabel="Full Capability + Strategic" position="top-right" />}
                  />

                  {/* Vendors rendered AFTER quadrants so they appear on top */}
                  {vendors.map((vendor) => (
                    <Scatter
                      key={vendor.name}
                      name={vendor.name}
                      data={[vendor]}
                      fill={vendor.color}
                      shape={(props: any) => {
                        const { cx, cy } = props;
                        const size = vendor.isHighlighted ? 14 : 7;
                        return (
                          <g>
                            {vendor.isHighlighted && (
                              <>
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={size + 6}
                                  fill={vendor.color}
                                  opacity={0.2}
                                  className="animate-pulse"
                                />
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={size + 3}
                                  fill={vendor.color}
                                  opacity={0.3}
                                />
                              </>
                            )}
                            <circle
                              cx={cx}
                              cy={cy}
                              r={size}
                              fill={vendor.color}
                              stroke={vendor.isHighlighted ? "#fff" : "transparent"}
                              strokeWidth={vendor.isHighlighted ? 2 : 0}
                            />
                            <text
                              x={cx}
                              y={cy - size - 8}
                              textAnchor="middle"
                              className="fill-foreground text-xs font-medium"
                            >
                              {vendor.name}
                            </text>
                          </g>
                        );
                      }}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Quick Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setSelectedVendors(new Set(vendors.map(v => v.name)))}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                >
                  Select All
                </button>
                <span className="text-muted-foreground">|</span>
                <button
                  onClick={() => setSelectedVendors(new Set(["Comply365"]))}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                >
                  Comply365 Only
                </button>
              </div>

              {/* Vendor Selector Chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {vendors.map((vendor) => (
                  <button
                    key={vendor.name}
                    onClick={() => toggleVendor(vendor.name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 ${
                      selectedVendors.has(vendor.name)
                        ? "opacity-100"
                        : "opacity-40 grayscale"
                    }`}
                    style={{
                      backgroundColor: selectedVendors.has(vendor.name) 
                        ? `${vendor.color}20` 
                        : 'transparent',
                      borderColor: vendor.color,
                      color: vendor.color
                    }}
                  >
                    {vendor.name}
                  </button>
                ))}
              </div>

              {/* Radar Chart */}
              <div className="w-full max-w-[720px] mx-auto aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="capability"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 4]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }}
                    />

                    {vendors
                      .filter(vendor => selectedVendors.has(vendor.name))
                      .map((vendor) => (
                        <Radar
                          key={vendor.name}
                          name={vendor.name}
                          dataKey={vendor.name}
                          stroke={vendor.color}
                          fill={vendor.color}
                          fillOpacity={vendor.isHighlighted ? 0.4 : 0.15}
                          strokeWidth={vendor.isHighlighted ? 3 : 2}
                        />
                      ))}
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Key Takeaway */}
        <div className="flex justify-center">
          <div className="bg-primary/10 border border-primary/30 rounded-lg px-5 py-3 max-w-2xl text-center">
            <p className="text-xs text-foreground">
              <span className="font-semibold text-primary">Comply365</span> is the only vendor positioned in the{" "}
              <span className="font-semibold">Leaders quadrant</span> with comprehensive coverage across all 10 operational capabilities.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide8PositioningMap;
