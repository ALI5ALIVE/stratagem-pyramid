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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const vendors = [
  { name: "Comply365", breadth: 9, depth: 9.5, color: "#0066ff", isHighlighted: true },
  { name: "Ideagen", breadth: 6.5, depth: 8, color: "#00b4d8", isHighlighted: false },
  { name: "TrustFlight Centrik", breadth: 8, depth: 6.5, color: "#8b5cf6", isHighlighted: false },
  { name: "Hinfact", breadth: 5, depth: 5.5, color: "#6b7280", isHighlighted: false },
  { name: "Web Manuals", breadth: 6, depth: 5, color: "#9ca3af", isHighlighted: false },
  { name: "Yonder", breadth: 3, depth: 3.5, color: "#d1d5db", isHighlighted: false },
  { name: "Orlando", breadth: 2, depth: 3, color: "#e5e7eb", isHighlighted: false },
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

const QuadrantOverlay = ({ 
  x, y, width, height, label, sublabel, bgColor 
}: { 
  x: number; y: number; width: number; height: number; label: string; sublabel: string; bgColor: string;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={bgColor}
      opacity={0.15}
    />
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="none"
      stroke={bgColor}
      strokeWidth={1}
      opacity={0.3}
    />
    <text 
      x={x + width / 2} 
      y={y + height / 2 - 6} 
      textAnchor="middle" 
      className="fill-foreground text-xs font-bold"
      opacity={0.7}
    >
      {label}
    </text>
    <text 
      x={x + width / 2} 
      y={y + height / 2 + 10} 
      textAnchor="middle" 
      className="fill-muted-foreground text-[10px]"
      opacity={0.6}
    >
      {sublabel}
    </text>
  </g>
);

const Slide8PositioningMap = () => {
  const [activeView, setActiveView] = useState<"matrix" | "radar">("matrix");

  return (
    <SlideContainer
      id="slide-8"
      title="Competitive Positioning"
      subtitle="Comply365 leads with 100% capability coverage and highest depth score (3.6/4.0)"
      slideNumber={6}
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

                  {/* Render each vendor as a separate scatter to control styling */}
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

                  {/* Quadrant overlays - positioned relative to chart area */}
                  {/* Bottom-Left: Basic Tools (0-5 x, 0-5 y) */}
                  <QuadrantOverlay x={100} y={290} width={185} height={185} label="Basic Tools" sublabel="Task-level Value" bgColor="#6b7280" />
                  {/* Bottom-Right: Broad Tools (5-10 x, 0-5 y) */}
                  <QuadrantOverlay x={285} y={290} width={185} height={185} label="Broad Tools" sublabel="Breadth without Depth" bgColor="#9ca3af" />
                  {/* Top-Left: Specialists (0-5 x, 5-10 y) */}
                  <QuadrantOverlay x={100} y={50} width={185} height={240} label="Specialists" sublabel="High Value, Narrow Domain" bgColor="#8b5cf6" />
                  {/* Top-Right: Leaders (5-10 x, 5-10 y) */}
                  <QuadrantOverlay x={285} y={50} width={185} height={240} label="Leaders" sublabel="Full Capability + Strategic" bgColor="#0066ff" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          ) : (
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

                  {vendors.map((vendor) => (
                    <Radar
                      key={vendor.name}
                      name={vendor.name}
                      dataKey={vendor.name}
                      stroke={vendor.color}
                      fill={vendor.color}
                      fillOpacity={vendor.isHighlighted ? 0.4 : 0.1}
                      strokeWidth={vendor.isHighlighted ? 3 : 1}
                    />
                  ))}

                  <Legend
                    wrapperStyle={{ paddingTop: 15 }}
                    formatter={(value) => (
                      <span className="text-[10px] text-muted-foreground">{value}</span>
                    )}
                  />
                </RadarChart>
              </ResponsiveContainer>
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
