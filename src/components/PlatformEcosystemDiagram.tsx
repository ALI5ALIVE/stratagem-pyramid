import platformEcosystem from "@/assets/platform-ecosystem.png";

interface PlatformEcosystemDiagramProps {
  className?: string;
}

const PlatformEcosystemDiagram = ({ className = "" }: PlatformEcosystemDiagramProps) => {
  return (
    <img
      src={platformEcosystem}
      alt="Comply365 Platform Ecosystem — Safety, Content, and Training connected through Intelligence Layer intelligence layer"
      className={`w-full h-auto ${className}`}
      style={{ maxWidth: "500px" }}
    />
  );
};

export default PlatformEcosystemDiagram;
