"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Shield, X, Check, ShieldCheck } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_SETTINGS: CookieSettings = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("cookie-consent");
    if (!savedSettings) {
      // Don't show immediately, wait for preloader
    } else {
      setSettings(JSON.parse(savedSettings));
    }
    setMounted(true);

    // Listen for preloader completion
    const handlePreloaderComplete = () => {
      setIsPreloaderComplete(true);
      const savedSettings = localStorage.getItem("cookie-consent");
      if (!savedSettings) {
        setIsOpen(true);
      }
    };

    window.addEventListener("preloader-complete", handlePreloaderComplete);
    return () => window.removeEventListener("preloader-complete", handlePreloaderComplete);
  }, []);

  const handleAcceptAll = () => {
    const newSettings = { essential: true, analytics: true, marketing: true };
    saveSettings(newSettings);
  };

  const handleAcceptNecessary = () => {
    const newSettings = { essential: true, analytics: false, marketing: false };
    saveSettings(newSettings);
  };

  const handleSaveSettings = () => {
    saveSettings(settings);
  };

  const saveSettings = (newSettings: CookieSettings) => {
    setSettings(newSettings);
    localStorage.setItem("cookie-consent", JSON.stringify(newSettings));
    setIsOpen(false);
    setShowSettings(false);
    
    // Update Google Consent Mode v2
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': newSettings.analytics ? 'granted' : 'denied',
        'ad_storage': newSettings.marketing ? 'granted' : 'denied',
        'ad_user_data': newSettings.marketing ? 'granted' : 'denied',
        'ad_personalization': newSettings.marketing ? 'granted' : 'denied'
      });
    }

    // Dispatch custom event for ConsentScripts to pick up
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: newSettings }));
  };

  if (!mounted) return null;

  return (
    <>
      {/* Persistent Icon - Only show after preloader */}
      <AnimatePresence>
        {isPreloaderComplete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-[100] w-12 h-12 bg-accent text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-2xl transition-colors hover:bg-accent/90"
            title="Nastavenia cookies"
          >
            <ShieldCheck size={24} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[110] p-4 md:p-8 flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-4xl bg-background/80 backdrop-blur-xl border border-card-border p-6 md:p-8 pointer-events-auto shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {/* Background accent line or grid could be added here if needed to match design */}
              
              {!showSettings ? (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="ui-label text-accent mb-2 flex items-center gap-2">
                      <Shield size={14} />
                      Súkromie & Cookies
                    </div>
                    <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                      Tento web používa súbory cookies na zlepšenie vášho používateľského zážitku a analýzu návštevnosti. Vyberte si, ktoré cookies chcete povoliť.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex-1 md:flex-none px-6 py-3 border border-card-border text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                    >
                      Nastavenia
                    </button>
                    <button
                      onClick={handleAcceptNecessary}
                      className="flex-1 md:flex-none px-6 py-3 border border-card-border text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                    >
                      Len nevyhnutné
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 md:flex-none px-6 py-3 bg-accent text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                      Prijať všetky
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="ui-label text-accent mb-2">Nastavenia súkromia</div>
                      <h3 className="text-xl font-serif font-black tracking-tight uppercase">Podrobné predvoľby</h3>
                    </div>
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Necessary */}
                    <div className="border border-card-border p-4 bg-muted/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-tighter">Nevyhnutné</span>
                        <div className="w-5 h-5 bg-accent text-white flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      </div>
                      <p className="text-[10px] uppercase leading-tight text-foreground/60">
                        Povinné pre správne fungovanie webu. Nedajú sa vypnúť.
                      </p>
                    </div>

                    {/* Analytics */}
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={cn(
                        "border p-4 transition-all text-left group",
                        settings.analytics ? "border-accent bg-accent/5" : "border-card-border hover:border-foreground/50"
                      )}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-tighter">Analytické</span>
                        <div className={cn(
                          "w-5 h-5 border flex items-center justify-center transition-colors",
                          settings.analytics ? "bg-accent border-accent text-white" : "border-card-border"
                        )}>
                          {settings.analytics && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                      <p className="text-[10px] uppercase leading-tight text-foreground/60">
                        Pomáhajú nám pochopiť, ako návštevníci používajú web.
                      </p>
                    </button>

                    {/* Marketing */}
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={cn(
                        "border p-4 transition-all text-left group",
                        settings.marketing ? "border-accent bg-accent/5" : "border-card-border hover:border-foreground/50"
                      )}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-tighter">Marketingové</span>
                        <div className={cn(
                          "w-5 h-5 border flex items-center justify-center transition-colors",
                          settings.marketing ? "bg-accent border-accent text-white" : "border-card-border"
                        )}>
                          {settings.marketing && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                      <p className="text-[10px] uppercase leading-tight text-foreground/60">
                        Zabezpečujú relevantnejšie reklamy a ponuky.
                      </p>
                    </button>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-card-border">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="px-6 py-3 border border-card-border text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors"
                    >
                      Späť
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="px-8 py-3 bg-accent text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      Uložiť nastavenia
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
