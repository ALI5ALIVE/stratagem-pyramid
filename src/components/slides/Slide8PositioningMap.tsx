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
  { name: "Comply365", breadth: 100, depth: 3.6, color: "#0066ff", isHighlighted: true },
  { name: "Ideagen", breadth: 60, depth: 2.8, color: "#00b4d8", isHighlighted: false },
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

const QuadrantLabel = ({ x, y, label, sublabel }: { x: number; y: number; label: string; sublabel: string }) => (
  <g>
    <text x={x} y={y} textAnchor="middle" className="fill-muted-foreground text-xs font-medium">
      {label}
    </text>
    <text x={x} y={y + 12} textAnchor="middle" className="fill-muted-foreground/60 text-[9px]">
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
        <div className="bg-card rounded-xl border border-border p-5 min-h-[380px] lg:min-h-[420px]">
          {activeView === "matrix" ? (
            <div className="h-full">
              <ResponsiveContainer width="100%" height={380}>
                <ScatterChart margin={{ top: 30, right: 30, bottom: 50, left: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  
                  {/* Reference lines for quadrants */}
                  <ReferenceLine x={50} stroke="hsl(var(--border))" strokeDasharray="5 5" />
                  <ReferenceLine y={2} stroke="hsl(var(--border))" strokeDasharray="5 5" />

                  <XAxis
                    type="number"
                    dataKey="breadth"
                    domain={[0, 110]}
                    name="Capability Breadth"
                    unit="%"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    label={{
                      value: "Capability Breadth →",
                      position: "bottom",
                      offset: 15,
                      style: { fill: 'hsl(var(--muted-foreground))', fontSize: 11 }
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="depth"
                    domain={[0, 4]}
                    name="Capability Depth"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    label={{
                      value: "Capability Depth →",
                      angle: -90,
                      position: "left",
                      offset: 8,
                      style: { fill: 'hsl(var(--muted-foreground))', fontSize: 11 }
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
                              y={cy - size - 6}
                              textAnchor="middle"
                              className="fill-foreground text-[10px] font-medium"
                            >
                              {vendor.name}
                            </text>
                          </g>
                        );
                      }}
                    />
                  ))}

                  {/* Quadrant labels */}
                  <QuadrantLabel x={25} y={340} label="Niche Players" sublabel="Limited coverage" />
                  <QuadrantLabel x={80} y={340} label="Challengers" sublabel="Broad but shallow" />
                  <QuadrantLabel x={25} y={50} label="Visionaries" sublabel="High depth, narrow" />
                  <QuadrantLabel x={80} y={50} label="Leaders" sublabel="Full capability + depth" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-full">
              <ResponsiveContainer width="100%" height={380}>
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
