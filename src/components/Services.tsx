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
            const icons = [
              <BarChart3 key="1" className="w-8 h-8" />,
              <ShoppingCart key="2" className="w-8 h-8" />,
              <Settings key="3" className="w-8 h-8" />,
              <SearchCheck key="4" className="w-8 h-8" />
            ];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-accent border border-white/10 p-10 md:p-14 min-h-[500px] flex flex-col justify-between relative group"
              >
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    {icons[idx]}
                  </div>
                  <div className="ui-label text-foreground/40 group-hover:text-background/50 transition-colors duration-200">
                    0{idx + 1}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-black mb-6 text-white tracking-tight leading-[1.1]">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-lg font-medium leading-relaxed mb-10">
                    {service.description}
                  </p>
                  {/* Secondary detail removed as requested */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

