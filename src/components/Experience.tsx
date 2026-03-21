import { Section } from "./Section";
import { Car, TreePine, HardHat, Navigation, Armchair, Shirt, Sparkles, Briefcase, Building } from "lucide-react";

export function Experience() {
  const segments = [
    { name: "Auto-moto", icon: <Car className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "Záhradný nábytok", icon: <TreePine className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "Stavebníctvo", icon: <HardHat className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "Geodézia", icon: <Navigation className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "Nábytok", icon: <Armchair className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "Móda", icon: <Shirt className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "Kozmetika", icon: <Sparkles className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "B2B", icon: <Briefcase className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
    { name: "Hotely", icon: <Building className="w-8 h-8 text-foreground/60 group-hover:text-accent transition-colors" /> },
  ];

  return (
    <Section id="skusenosti" className="bg-foreground/5 dark:bg-foreground/5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-16">Skúsenosti naprieč segmentmi</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {segments.map((segment, idx) => (
            <div 
              key={idx} 
              className="bg-background rounded-[20px] p-6 flex flex-col items-center justify-center gap-4 border border-foreground/5 hover:border-accent/30 hover:shadow-md transition-all group"
            >
              {segment.icon}
              <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{segment.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
