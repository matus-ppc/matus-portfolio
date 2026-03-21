import * as React from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "./LanguageProvider";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.services, href: "#sluzby" },
    { name: t.nav.results, href: "#vysledky" },
    { name: t.nav.pricing, href: "#cennik" },
    { name: t.nav.about, href: "#o-mne" }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-card-border">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#" className="font-serif font-black text-lg md:text-xl tracking-tight text-foreground hover:italic transition-all">
          MATÚŠ.
        </a>

        {/* LINKS */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="ui-label text-foreground/70 hover:text-accent transition-colors relative group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* CTA & ThemeToggle & LanguageToggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex bg-muted p-0.5 md:p-1 border border-card-border overflow-hidden">
            <button 
              onClick={() => setLanguage("sk")}
              className={`px-2 md:px-3 py-1 ui-label text-[10px] transition-colors ${language === 'sk' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}
            >
              SK
            </button>
            <button 
              onClick={() => setLanguage("en")}
              className={`px-2 md:px-3 py-1 ui-label text-[10px] transition-colors ${language === 'en' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}
            >
              EN
            </button>
          </div>
          
          <ThemeToggle />
          
          <a 
            href="#kontakt" 
            className="ui-label bg-foreground text-background px-3 md:px-6 py-1.5 md:py-2 border border-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors duration-200 text-[10px] md:text-xs"
          >
            {t.nav.contact}
          </a>
        </div>
        
      </div>
    </header>
  );
}
