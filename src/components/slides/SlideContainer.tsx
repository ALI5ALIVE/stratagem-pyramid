import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import complyIcon from "@/assets/comply365-icon.png";

interface SlideContainerProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
  slideNumber?: number;
  showTitleAccent?: boolean;
}

const SlideContainer = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className,
  variant = "dark",
  slideNumber,
  showTitleAccent = true
}: SlideContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full flex flex-col px-6 sm:px-10 lg:px-16 py-16 sm:py-20 snap-start relative",
        variant === "light" ? "slide-light bg-white text-foreground" : "bg-background",
        className
      )}
    >
      {/* Logo icon - top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
        <img 
          src={complyIcon} 
          alt="Comply365" 
          className="h-8 sm:h-10 w-auto opacity-80"
        />
      </div>

      {/* Slide number - bottom right */}
      {slideNumber && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10">
          <span className={cn(
            "text-sm font-medium",
            variant === "light" ? "text-muted-foreground" : "text-muted-foreground"
          )}>
            {String(slideNumber).padStart(2, '0')}
          </span>
        </div>
      )}

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        {/* Header section - left aligned like PPT template */}
        <div className="mb-8 sm:mb-12">
          <h2 className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight mb-2",
            variant === "light" ? "text-foreground" : "text-foreground"
          )}>
            <span className={showTitleAccent ? "title-accent" : ""}>
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className={cn(
              "text-primary text-sm sm:text-base md:text-lg max-w-3xl mt-3",
              variant === "light" ? "text-primary" : "text-primary"
            )}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content area */}
        <div className="w-full flex-1">{children}</div>
      </div>
    </section>
  );
};

export default SlideContainer;
