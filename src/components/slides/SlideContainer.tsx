import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideContainerProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const SlideContainer = ({ id, title, subtitle, children, className }: SlideContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-12 sm:py-16 snap-start",
        className
      )}
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};

export default SlideContainer;
