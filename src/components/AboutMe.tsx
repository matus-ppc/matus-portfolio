import Image from "next/image";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

export function AboutMe() {
  const { t } = useLanguage();
  
  return (
    <Section id="o-mne" className="bg-background py-32 border-b border-card-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left: Text Content & Tiles */}
          <div className="lg:w-[60%] flex flex-col justify-center">
            <div className="ui-label text-accent mb-6 flex items-center gap-4">
              <span className="w-4 h-4 bg-accent" />
              04 — {t.about.label}
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-black text-foreground mb-12 tracking-tighter leading-[0.95]">
              {t.about.title_part1}<br/> <span className="italic font-light">{t.about.title_italic}</span>
            </h2>
            
            <div className="space-y-8 text-xl font-serif text-foreground/80 leading-relaxed mb-16 border-l border-foreground/20 pl-8">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
            </div>

            {/* Brutal Tiles - Permanently Green */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.about.tiles.map((tile: string, idx: number) => (
                <div 
                  key={idx}
                  className="bg-accent border border-accent p-8 flex flex-col items-center justify-center text-center gap-4 text-white hover:bg-white hover:text-accent transition-colors duration-300 group"
                >
                  <span className="ui-label text-white group-hover:text-accent transition-colors tracking-widest leading-relaxed">
                    {tile}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="lg:w-[40%] flex items-center">
            <div className="w-full aspect-[4/5] relative group">
              <div className="w-full h-full relative z-10 overflow-hidden bg-background border border-card-border">
                <Image 
                  src="/profile-bw.webp" 
                  alt="Matúš Baranec" 
                  fill
                  className="object-cover grayscale contrast-125"
                  style={{ objectPosition: "center 10%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Overlapping text on photo */}
              <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-accent text-white px-4 py-3 sm:px-6 sm:py-4 z-20 ui-label shadow-[4px_4px_0px_var(--foreground)]">
                MATÚŠ BARANEC / 2026
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
