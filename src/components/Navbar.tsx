"use client";

import * as React from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-foreground/10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
          Matúš Baranec
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#sluzby" className="hover:text-accent transition-colors">Služby</a>
          <a href="#o-mne" className="hover:text-accent transition-colors">O mne</a>
          <a href="#skusenosti" className="hover:text-accent transition-colors">Skúsenosti</a>
          <a href="#kontakt" className="hover:text-accent transition-colors">Kontakt</a>
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
