import PlatformArchitectureDiagramV4 from "@/components/platform-slides/PlatformArchitectureDiagramV4";

export default function PlatformPicture() {
  return (
    <section className="border-b border-border/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The platform</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            One platform. Four layers. One closed loop.
          </h2>
        </div>
        <div className="rounded-2xl border border-border/40 bg-card/40 p-6 lg:p-10">
          <div className="mx-auto w-full max-w-5xl">
            <PlatformArchitectureDiagramV4 />
          </div>
        </div>
      </div>
    </section>
  );
}