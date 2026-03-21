import { useLanguage } from "./LanguageProvider";
import { Section } from "./Section";
import { motion } from "framer-motion";
import { TrendingUp, Target, Activity, Zap, LineChart, PieChart } from "lucide-react";

export function Results() {
  const { t } = useLanguage();
  
  return (
    <Section id="vysledky" className="bg-background text-foreground py-32 border-b border-card-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative">
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-card-border pb-12 gap-8 relative z-10">
          <div>
            <div className="ui-label text-accent mb-6 flex items-center gap-4">
              <span className="w-4 h-4 bg-accent" />
              02 — {t.results.label}
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-black text-foreground tracking-tighter leading-[0.9]">
              {t.results.title_part1} <br/> <span className="italic font-light">{t.results.title_italic}</span>
            </h2>
          </div>
          <div className="ui-label text-foreground text-right max-w-xs uppercase">
            {t.results.subtext}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-card-border relative z-10">
          {t.results.items.map((item: any, idx: number) => {
             const Icon = [TrendingUp, Target, Activity, Zap, LineChart, PieChart][idx] || TrendingUp;
             return (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                 className="bg-accent border border-white/10 p-8 md:p-12 relative flex flex-col justify-between min-h-[380px] group overflow-hidden"
               >
                 {/* Jemný piktogram na vyplnenie priestoru rovnako ako v Službách */}
                 <Icon 
                   strokeWidth={0.5}
                   className="absolute top-12 right-12 md:right-16 md:top-16 w-32 h-32 md:w-56 md:h-56 text-white/[0.05] transition-opacity duration-700 group-hover:text-white/[0.12] pointer-events-none z-0" 
                 />
               <div className="flex justify-between items-start mb-16 relative z-10 transition-colors">
                 <div className="ui-label bg-white text-accent px-4 py-2">
                   {item.segment}
                 </div>
                 <div className="ui-label text-white/40">
                    Kód: {idx+1}00
                 </div>
               </div>
               
               <div className="relative z-10">
                 <span className="text-6xl md:text-8xl font-serif font-black text-white tracking-tighter mb-4 block leading-[0.85]">
                   {item.mainStat || (idx === 0 ? "+92%" : idx === 1 ? "7.0R" : idx === 2 ? "+115%" : idx === 3 ? "+210%" : idx === 4 ? "4.8R" : "-35%")}
                 </span>
                 <h4 className="ui-label mt-8 mb-4 border-t border-white/30 pt-4 text-white">
                   {item.title}
                 </h4>
                 <p className="text-white/80 font-medium text-lg leading-relaxed">
                   {item.desc}
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

