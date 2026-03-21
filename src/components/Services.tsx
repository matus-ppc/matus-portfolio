import { useLanguage } from "./LanguageProvider";
import { Section } from "./Section";
import { BarChart3, ShoppingCart, Settings, SearchCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Services() {
  const { t } = useLanguage();
  
  return (
    <Section id="sluzby" className="bg-background text-foreground py-32 border-b border-card-border">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-card-border pb-12 gap-8">
          <div>
            <div className="ui-label text-accent mb-6 flex items-center gap-4">
              <span className="w-4 h-4 bg-accent" />
              01 — {t.services.label}
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-black text-foreground tracking-tighter leading-[0.9]">
              {t.services.title_part1} <br/> <span className="italic font-light">{t.services.title_italic}</span>
            </h2>
          </div>
          <div className="ui-label text-foreground text-right max-w-xs uppercase leading-relaxed">
            {t.services.subtext}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-card-border">
          {t.services.items.map((service: any, idx: number) => {
            const Icon = [BarChart3, ShoppingCart, Settings, SearchCheck][idx];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-accent border border-white/10 p-10 md:p-14 min-h-[500px] flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Jemný piktogram na vyplnenie priestoru */}
                <Icon 
                  strokeWidth={0.5}
                  className="absolute top-16 right-16 md:right-24 md:top-20 w-40 h-40 md:w-64 md:h-64 text-white/[0.05] transition-opacity duration-700 group-hover:text-white/[0.12] pointer-events-none z-0" 
                />

                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="ui-label text-white/40 group-hover:text-white/80 transition-colors duration-200">
                    0{idx + 1}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-serif font-black mb-6 text-white tracking-tight leading-[1.1]">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-lg font-medium leading-relaxed mb-10 max-w-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

