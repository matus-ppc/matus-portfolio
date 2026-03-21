"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="domov" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Kde sa dáta <br className="hidden md:block" />
          stretávajú s <span className="text-accent">príbehom</span>.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          PPC špecialista so vzdelaním v informatike a žurnalistike. 
          Spájam technickú presnosť s presvedčivou komunikáciou pre váš rast.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="#kontakt" 
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-accent/90 transition-all hover:-translate-y-1 shadow-lg shadow-accent/20"
          >
            Získať audit kampaní
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
