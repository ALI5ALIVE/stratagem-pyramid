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
  { name: "Comply365", breadth: 100, depth: 3.6, color: "#10b981", isHighlighted: true },
  { name: "Ideagen", breadth: 60, depth: 2.8, color: "#3b82f6", isHighlighted: false },
  { name: "TrustFlight Centrik", breadth: 60, depth: 2.7, color: "#8b5cf6", isHighlighted: false },
  { name: "Hinfact", breadth: 40, depth: 1.6, color: "#6b7280", isHighlighted: false },
  { name: "Web Manuals", breadth: 20, depth: 1.4, color: "#9ca3af", isHighlighted: false },
  { name: "Yonder", breadth: 10, depth: 0.9, color: "#d1d5db", isHighlighted: false },
  { name: "Orlando", breadth: 10, depth: 0.7, color: "#e5e7eb", isHighlighted: false },
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
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Breadth: <span className="text-foreground">{data.breadth}%</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Depth: <span className="text-foreground">{data.depth.toFixed(1)}/4.0</span>
        </p>
      </div>
    );
  }
  return null;
};

const QuadrantLabel = ({ x, y, label, sublabel }: { x: number; y: number; label: string; sublabel: string }) => (
  <g>
    <text x={x} y={y} textAnchor="middle" className="fill-muted-foreground text-xs font-medium">
      {label}
    </text>
    <text x={x} y={y + 14} textAnchor="middle" className="fill-muted-foreground/60 text-[10px]">
      {sublabel}
    </text>
  </g>
);

const Slide8PositioningMap = () => {
  const [activeView, setActiveView] = useState<"matrix" | "radar">("matrix");

  return (
    <SlideContainer
      id="slide-8"
      title="Competitive Positioning: Comply365 vs Market"
      subtitle="Comply365 leads with 100% capability coverage and highest depth score (3.6/4.0)"
    >
      <div className="flex flex-col gap-6">
        {/* Tab Toggle */}
        <div className="flex justify-center">
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "matrix" | "radar")}>
            <TabsList className="bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="matrix" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Strategic Matrix
              </TabsTrigger>
              <TabsTrigger value="radar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Capability Radar
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Chart Container */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 p-6 min-h-[400px] lg:min-h-[500px]">
          {activeView === "matrix" ? (
            <div className="h-full">
              <ResponsiveContainer width="100%" height={450}>
                <ScatterChart margin={{ top: 40, right: 40, bottom: 60, left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.1)" />
                  
                  {/* Quadrant background areas */}
                  <defs>
                    <linearGradient id="leadersGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Reference lines for quadrants */}
                  <ReferenceLine x={50} stroke="hsl(var(--muted-foreground) / 0.3)" strokeDasharray="5 5" />
                  <ReferenceLine y={2} stroke="hsl(var(--muted-foreground) / 0.3)" strokeDasharray="5 5" />

                  <XAxis
                    type="number"
                    dataKey="breadth"
                    domain={[0, 110]}
                    name="Capability Breadth"
                    unit="%"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground) / 0.3)' }}
                    label={{
                      value: "Capability Breadth →",
                      position: "bottom",
                      offset: 20,
                      style: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="depth"
                    domain={[0, 4]}
                    name="Capability Depth"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground) / 0.3)' }}
                    label={{
                      value: "Capability Depth →",
                      angle: -90,
                      position: "left",
                      offset: 10,
                      style: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }
                    }}
                  />

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
                        const size = vendor.isHighlighted ? 16 : 8;
                        return (
                          <g>
                            {vendor.isHighlighted && (
                              <>
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={size + 8}
                                  fill={vendor.color}
                                  opacity={0.2}
                                  className="animate-pulse"
                                />
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={size + 4}
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
                              style={{ fontSize: vendor.isHighlighted ? 12 : 10 }}
                            >
                              {vendor.name}
                            </text>
                          </g>
                        );
                      }}
                    />
                  ))}

                  {/* Quadrant labels */}
                  <QuadrantLabel x={25} y={380} label="Niche Players" sublabel="Limited coverage" />
                  <QuadrantLabel x={80} y={380} label="Challengers" sublabel="Broad but shallow" />
                  <QuadrantLabel x={25} y={60} label="Visionaries" sublabel="High depth, narrow" />
                  <QuadrantLabel x={80} y={60} label="Leaders" sublabel="Full capability + depth" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-full">
              <ResponsiveContainer width="100%" height={450}>
                <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="hsl(var(--muted-foreground) / 0.2)" />
                  <PolarAngleAxis
                    dataKey="capability"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 4]}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
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
                    wrapperStyle={{ paddingTop: 20 }}
                    formatter={(value) => (
                      <span className="text-xs text-muted-foreground">{value}</span>
                    )}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Key Takeaway */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl px-6 py-4 max-w-2xl text-center">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-emerald-400">Comply365</span> is the only vendor positioned in the{" "}
              <span className="font-semibold">Leaders quadrant</span> with comprehensive coverage across all 10 operational capabilities.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide8PositioningMap;
