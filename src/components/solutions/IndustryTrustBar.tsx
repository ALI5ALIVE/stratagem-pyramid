interface IndustryTrustBarProps {
  industry: string;
  primaryStat: string;
  primaryLabel: string;
  secondaryStat: string;
  secondaryLabel: string;
  tertiaryStat?: string;
  tertiaryLabel?: string;
}

const IndustryTrustBar = ({
  primaryStat,
  primaryLabel,
  secondaryStat,
  secondaryLabel,
  tertiaryStat = "99.9%",
  tertiaryLabel = "uptime",
}: IndustryTrustBarProps) => {
  return (
    <section className="py-6 border-y border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            <span className="font-semibold text-foreground">{primaryStat}</span> {primaryLabel}
          </p>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span><strong className="text-foreground">{secondaryStat}</strong> {secondaryLabel}</span>
            {tertiaryStat && (
              <>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline"><strong className="text-foreground">{tertiaryStat}</strong> {tertiaryLabel}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryTrustBar;
