"use client";

import { useLanguage } from "./LanguageProvider";
import { Section } from "./Section";

export function Experience() {
  const { t, language } = useLanguage();
  
  const experiences = [
    { title: "ZÁHRADNÝ", client: "PROTEC" },
    { title: "MÓDA", client: "SHOOOS" },
    { title: "DEVELOPMENT", client: "WOOPRA" },
    { title: "ROBOTICKÉ KOSAČKY", client: "BELROBOTICS" },
    { title: "GOLF", client: "GOLF CENTRUM" }
  ];

  return (
    <Section id="skusenosti" className="bg-background text-foreground py-32 border-b border-card-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative">
        
        {/* HUGE watermark text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full whitespace-nowrap opacity-[0.02] dark:opacity-[0.04]">
          <span className="text-[25vw] font-serif font-black uppercase leading-none">{t.experience.watermark}</span>
        </div>

        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-card-border pb-12 gap-8 relative z-10">
          <div>
            <div className="ui-label text-accent mb-6 flex items-center gap-4">
              <span className="w-4 h-4 bg-accent" />
              03 — {t.experience.label}
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-black text-foreground tracking-tighter leading-[0.9]">
              {t.experience.title} <br/> <span className="italic font-light">{t.experience.title_italic}</span>
            </h2>
          </div>
          <div className="ui-label text-foreground text-right max-w-xs uppercase">
            {t.experience.subtext}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-white/10 relative z-10">
          {t.experience.clients.map((exp: any, idx: number) => (
            <div 
              key={idx} 
              className="bg-accent border-b lg:border-b-0 lg:border-r border-white/10 p-8 flex flex-col justify-between min-h-[300px] cursor-default last:border-0"
            >
              <div className="ui-label text-white/40">{language === 'sk' ? 'Klient' : 'Client'}: {idx+1}</div>
              <div>
                <h4 className="ui-label mb-2 text-white/60">{exp.title}</h4>
                <div className={`font-serif font-black text-white tracking-tighter leading-none whitespace-nowrap ${exp.client.length > 10 ? 'text-xl sm:text-2xl md:text-2xl lg:text-3xl' : 'text-4xl'}`}>
                  {exp.client}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
