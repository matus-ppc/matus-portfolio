"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp, BarChart3 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20 border-b border-card-border pb-16">

      {/* Topographic Background Grid */}
      <div className="bg-grid" />

      {/* Jemné piktogramy (Lucide icons) namiesto abstraktných tvarov, vo farbe accent, s veľmi nízkou priehľadnosťou */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Vpravo hore */}
        <Target 
          strokeWidth={0.3} 
          className="absolute -top-32 md:-right-32 right-[-20%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] text-accent/[0.04] rotate-12" 
        />
        
        {/* Vľavo dole */}
        <TrendingUp 
          strokeWidth={0.3} 
          className="absolute -bottom-48 md:-left-48 left-[-30%] w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] text-accent/[0.04] -rotate-6" 
        />
        
        {/* Vpravo dole */}
        <BarChart3 
          strokeWidth={0.3} 
          className="absolute bottom-0 right-[5%] lg:right-[15%] w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] text-accent/[0.04] rotate-6" 
        />
      </div>

      {/* Endless Marquee Background */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 mix-blend-plus-lighter flex flex-col gap-6">
        <motion.div
          className="whitespace-nowrap flex text-[15vw] font-serif font-black uppercase leading-none"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          <span>DÁTA • VÝKON • STRATÉGIA • DÁTA • VÝKON • STRATÉGIA • </span>
          <span>DÁTA • VÝKON • STRATÉGIA • DÁTA • VÝKON • STRATÉGIA • </span>
        </motion.div>
        <motion.div
          className="whitespace-nowrap flex text-[15vw] font-serif font-black uppercase leading-none italic"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 50, repeat: Infinity }}
        >
          <span>RAST • KAMPANE • E-COMMERCE • RAST • KAMPANE • E-COMMERCE • </span>
          <span>RAST • KAMPANE • E-COMMERCE • RAST • KAMPANE • E-COMMERCE • </span>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">

        {/* Left column: Main Headline */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2"
          >
            <div className="ui-label text-accent mb-4 flex items-center gap-4 text-[0.75rem] md:text-[0.85rem] tracking-[0.2em]">
              <span className="w-8 h-[1px] bg-accent" />
              {t.hero.role}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-light text-foreground leading-[1.05] tracking-tight">
              {t.hero.title_part1}
              <span className="font-black text-accent italic pr-2">{t.hero.title_italic1}</span>
              <br />
              {t.hero.title_part2} 
              <br />
              <span className="font-black text-accent italic whitespace-nowrap">{t.hero.title_italic2}</span>
            </h1>
          </motion.div>
        </div>

        {/* Right column: Description & CTA */}
        <div className="lg:col-span-4 flex flex-col justify-end lg:pb-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium mb-10 border-l border-foreground/20 pl-6">
              {t.hero.description}
            </p>

            <a
              href="#kontakt"
              className="group inline-flex items-center gap-4 bg-foreground text-background px-8 py-5 border border-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors duration-200"
            >
              <span className="ui-label font-bold text-sm">{t.hero.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
