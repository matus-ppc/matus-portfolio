"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "./Section";
import { Check, ArrowRight, MonitorPlay, MousePointerClick, Smartphone, ShoppingCart } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { ContactModal } from "./ContactModal";

export function Configurator() {
  const { t, language } = useLanguage();
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [hours, setHours] = useState(1);
  const [consulting, setConsulting] = useState(0);
  const [feed, setFeed] = useState(false);
  const [reports, setReports] = useState(false);
  const [copywriting, setCopywriting] = useState(false);
  const [landingPage, setLandingPage] = useState(false);
  const [simpleWeb, setSimpleWeb] = useState(false);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<"audit" | "inquiry">("audit");

  const PLATFORMS = [
    { id: "google", name: "Google Ads", icon: <MousePointerClick className="w-6 h-6" />, price: 250 },
    { id: "meta", name: "Meta Ads", icon: <Smartphone className="w-6 h-6" />, price: 250 },
    { id: "tiktok", name: "TikTok Ads", icon: <MonitorPlay className="w-6 h-6" />, price: 250 },
    { id: "heureka", name: "Heureka / CSS", icon: <ShoppingCart className="w-6 h-6" />, price: 150 },
  ];

  const BASE_FEE = 250;
  const EXTRA_HOUR = 25;
  const CONSULTING_RATE = 50;

  const calculateTotal = () => {
    let total = 0;

    if (platforms.length > 0) {
      total += BASE_FEE;
      if (platforms.length > 1) {
        const sortedPrices = platforms
          .map(pId => PLATFORMS.find(x => x.id === pId)?.price ?? 0)
          .sort((a, b) => b - a);
        for (let i = 1; i < sortedPrices.length; i++) {
          total += sortedPrices[i];
        }
      }
      const extraHours = Math.max(0, hours - 1);
      total += extraHours * EXTRA_HOUR;
      total += consulting * CONSULTING_RATE;
      if (feed) total += 120;
      if (reports) total += 100;
      if (copywriting) total += 80;
    }

    if (landingPage) total += 450;
    if (simpleWeb) total += 700;
    
    return total;
  };

  const targetTotal = calculateTotal();
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    const duration = 400;
    const start = displayTotal;
    const diff = targetTotal - start;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayTotal(Math.round(start + diff * eased));
      if (progress < 1) {
        animFrame.current = requestAnimationFrame(step);
      }
    };
    animFrame.current = requestAnimationFrame(step);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [targetTotal]);

  const togglePlatform = (id: string) => {
    if (platforms.includes(id)) {
      setPlatforms(platforms.filter(p => p !== id));
    } else {
      setPlatforms([...platforms, id]);
    }
  };

  const openModal = (source: "audit" | "inquiry") => {
    setModalSource(source);
    setModalOpen(true);
  };

  const getActiveAddons = () => {
    const active: string[] = [];
    if (feed) active.push(t.configurator.addons[0]);
    if (reports) active.push(t.configurator.addons[1]);
    if (copywriting) active.push(t.configurator.addons[2]);
    if (landingPage) active.push(t.configurator.landing_page_label);
    if (simpleWeb) active.push(t.configurator.simple_web_label);
    return active;
  };

  return (
    <Section id="cennik" className="bg-background py-32 border-b border-card-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-card-border pb-12 gap-8">
          <div>
            <div className="ui-label text-accent mb-6 flex items-center gap-4">
              <span className="w-4 h-4 bg-accent" />
              03 — {t.configurator.label}
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-black text-foreground tracking-tighter leading-[0.9]">
              {t.configurator.title_part1} <br/> <span className="italic font-light">{t.configurator.title_italic}</span>
            </h2>
          </div>
          <div className="ui-label text-foreground text-right max-w-xs uppercase">
            {t.configurator.subtext}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 border border-card-border">
          
          {/* Left Column - Audit (WHITE as requested) */}
          <div className="lg:w-[35%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-card-border flex flex-col bg-background text-foreground">
            <div className="p-10 md:p-14 flex flex-col h-full">
              <div className="ui-label text-accent mb-8 font-black">01 — {t.configurator.one_time}</div>
              <h3 className="text-4xl md:text-6xl font-serif font-black mb-6 tracking-tight leading-[1]">{t.configurator.audit_title}</h3>
              <p className="text-foreground/70 mb-12 text-lg">
                {t.configurator.audit_desc}
              </p>
              
              <ul className="space-y-6 mb-16 flex-grow ui-label text-xs tracking-widest text-foreground/80">
                {t.configurator.audit_features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="pt-8 border-t border-card-border mt-auto">
                <p className="ui-label text-foreground/50 mb-4">{language === 'sk' ? 'Cena auditu' : 'Audit Price'}</p>
                <div className="text-6xl font-serif font-black mb-8 flex items-baseline gap-3">
                  <span className="text-3xl font-sans font-bold opacity-60 tracking-tighter">
                    {t.configurator.audit_price.split(" ")[0]}
                  </span>
                  <span>
                    {t.configurator.audit_price.split(" ").slice(1).join(" ")}
                  </span>
                </div>
                <button 
                  onClick={() => openModal("audit")}
                  className="w-full inline-flex items-center justify-between gap-2 bg-foreground text-background px-6 py-4 font-bold ui-label hover:bg-accent hover:text-white transition-colors border border-foreground cursor-pointer"
                >
                  {t.configurator.audit_cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Configurator (SOLID GREEN as requested) */}
          <div className="lg:w-[65%] flex flex-col bg-accent text-white relative">
            <div className="p-10 md:p-14 mb-[280px] sm:mb-[220px] md:mb-[160px]">
              <div className="ui-label text-white/50 mb-8 font-black">{t.configurator.config_label}</div>
              <h3 className="text-4xl md:text-6xl font-serif font-black text-white mb-12 tracking-tight leading-[1]">{t.configurator.config_title}</h3>
              
              {/* Step 1: Platforms */}
              <div className="mb-16">
                 <h4 className="ui-label text-white/60 mb-6 pb-4 border-b border-white/20">{t.configurator.step1}</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-white/20">
                  {PLATFORMS.map(p => {
                    const isActive = platforms.includes(p.id);
                    return (
                      <div 
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={`cursor-pointer p-6 border-b border-r border-white/20 transition-colors flex items-center justify-between group ${isActive ? 'bg-white text-accent' : 'hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`${isActive ? 'text-accent' : 'text-white/40 group-hover:text-white'}`}>
                            {p.icon}
                          </div>
                          <div>
                            <div className="ui-label font-bold text-sm tracking-wider">{p.name}</div>
                            <div className={`text-sm mt-1 font-mono font-bold ${isActive ? 'text-accent/80' : 'text-white/60 group-hover:text-white'}`}>+{p.price} €/{language === 'sk' ? 'mes.' : 'mo.'}</div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${isActive ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/50'}`}>
                          {isActive && <Check className="w-3 h-3 text-white stroke-[4]" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Sliders */}
              <div className="mb-16">
                <h4 className="ui-label text-white/60 mb-8 pb-4 border-b border-white/20">{t.configurator.step2}</h4>
                
                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between items-end mb-6">
                      <span className="ui-label text-white">{t.configurator.step2_hours}</span>
                      <span className="text-4xl font-serif font-black text-white tabular-nums leading-none">{hours} h</span>
                    </div>
                    <input 
                      type="range" min="1" max="50" step="1" 
                      value={hours} onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full accent-white"
                    />
                    <div className="flex justify-between mt-4 ui-label text-[10px] text-white/40">
                      <span>1 h ({language === 'sk' ? 'ZÁKLAD' : 'BASE'})</span>
                      <span>50 h (MAX)</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-end mb-6">
                      <span className="ui-label text-white">{t.configurator.step2_cons}</span>
                      <span className="text-4xl font-serif font-black text-white tabular-nums leading-none">{consulting} h</span>
                    </div>
                    <input 
                      type="range" min="0" max="5" step="1" 
                      value={consulting} onChange={(e) => setConsulting(Number(e.target.value))}
                      className="w-full accent-white"
                    />
                    <div className="flex justify-between mt-4 ui-label text-[10px] text-white/40">
                      <span>0 h</span>
                      <span>5 h</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3: Addons */}
              <div>
                <h4 className="ui-label text-white/60 mb-6 pb-4 border-b border-white/20">{t.configurator.step3}</h4>
                <div className="space-y-0 border-t border-l border-white/20">
                  {[
                    { state: feed, setter: setFeed, label: t.configurator.addons[0], price: 120 },
                    { state: reports, setter: setReports, label: t.configurator.addons[1], price: 100 },
                    { state: copywriting, setter: setCopywriting, label: t.configurator.addons[2], price: 80 },
                  ].map((addon, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => addon.setter(!addon.state)}
                      className={`cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-r border-white/20 gap-4 transition-colors group ${addon.state ? 'bg-white text-accent' : 'hover:bg-white/10'}`}
                    >
                      <div className="flex flex-col">
                        <span className="ui-label block">{addon.label}</span>
                        <span className={`text-sm mt-1 font-mono font-bold ${addon.state ? 'text-accent/80' : 'text-white/60 group-hover:text-white'}`}>+{addon.price} €/{language === 'sk' ? 'mes.' : 'mo.'}</span>
                      </div>
                      <div className={`w-12 h-6 border flex items-center px-1 transition-colors ${addon.state ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/50 bg-transparent'}`}>
                        <div className={`w-4 h-4 bg-current transition-transform duration-200 ${addon.state ? 'text-white translate-x-5' : 'text-white translate-x-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Landing Page Service */}
                <div className="mt-6 border-t border-white/20 pt-6">
                  <div 
                    onClick={() => setLandingPage(!landingPage)}
                    className={`cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border border-white/20 gap-6 md:gap-8 transition-colors group ${landingPage ? 'bg-white text-accent' : 'bg-white/5 hover:bg-white/10'}`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                        <h4 className="text-xl md:text-2xl font-serif font-black">{t.configurator.landing_page_label}</h4>
                        <span className={`ui-label px-2 py-1 text-[10px] w-fit ${landingPage ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                          {t.configurator.landing_page_tag}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed max-w-xl ${landingPage ? 'text-accent/80' : 'text-white/60 group-hover:text-white/80'}`}>
                        {t.configurator.landing_page_desc}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between w-full md:w-auto gap-8 border-t border-white/20 pt-6 md:border-none md:pt-0">
                      <div className="flex items-baseline gap-2 justify-end text-left md:text-right">
                        <span className="text-lg font-sans font-bold opacity-60 tracking-tighter">
                          {t.configurator.landing_page_price.split(" ")[0]}
                        </span>
                        <span className={`text-2xl md:text-3xl font-serif font-black ${landingPage ? 'text-accent' : 'text-white'}`}>
                          +{t.configurator.landing_page_price.split(" ")[1]} {t.configurator.landing_page_price.split(" ")[2]}
                        </span>
                      </div>
                      
                      <div className={`w-12 h-6 border flex items-center px-1 transition-colors shrink-0 ${landingPage ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/50 bg-transparent'}`}>
                        <div className={`w-4 h-4 bg-current transition-transform duration-200 ${landingPage ? 'text-white translate-x-5' : 'text-white translate-x-0'}`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simple Web Service */}
                <div className="mt-0 border-t border-white/20 pt-6">
                  <div 
                    onClick={() => setSimpleWeb(!simpleWeb)}
                    className={`cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border border-white/20 gap-6 md:gap-8 transition-colors group ${simpleWeb ? 'bg-white text-accent' : 'bg-white/5 hover:bg-white/10'}`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                        <h4 className="text-xl md:text-2xl font-serif font-black">{t.configurator.simple_web_label}</h4>
                        <span className={`ui-label px-2 py-1 text-[10px] w-fit ${simpleWeb ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                          {t.configurator.simple_web_tag}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed max-w-xl ${simpleWeb ? 'text-accent/80' : 'text-white/60 group-hover:text-white/80'}`}>
                        {t.configurator.simple_web_desc}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between w-full md:w-auto gap-8 border-t border-white/20 pt-6 md:border-none md:pt-0">
                      <div className="flex items-baseline gap-2 justify-end text-left md:text-right">
                        <span className="text-lg font-sans font-bold opacity-60 tracking-tighter">
                          {t.configurator.simple_web_price.split(" ")[0]}
                        </span>
                        <span className={`text-2xl md:text-3xl font-serif font-black ${simpleWeb ? 'text-accent' : 'text-white'}`}>
                          +{t.configurator.simple_web_price.split(" ")[1]} {t.configurator.simple_web_price.split(" ")[2]}
                        </span>
                      </div>
                      
                      <div className={`w-12 h-6 border flex items-center px-1 transition-colors shrink-0 ${simpleWeb ? 'border-accent bg-accent' : 'border-white/20 group-hover:border-white/50 bg-transparent'}`}>
                        <div className={`w-4 h-4 bg-current transition-transform duration-200 ${simpleWeb ? 'text-white translate-x-5' : 'text-white translate-x-0'}`} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Brutalist Sticky Summary Footer (Black Background for Contrast in Green Column) */}
            <div className="absolute bottom-0 left-0 right-0 border-t-2 border-background bg-foreground p-8 flex flex-col sm:flex-row items-center justify-between gap-6 z-20 text-background">
              <div>
                <p className="ui-label text-background/60 mb-2 text-center sm:text-left">{t.configurator.summary_label}</p>
                <div className="text-6xl md:text-7xl font-serif font-black flex items-baseline gap-2 justify-center sm:justify-start tabular-nums tracking-tighter leading-none text-background">
                  {displayTotal} €
                  <span className="text-xl font-sans font-bold opacity-40 uppercase tracking-widest">{t.configurator.per_month}</span>
                </div>
                {platforms.length > 0 && (
                  <p className="ui-label text-background/50 text-[10px] mt-3 text-center sm:text-left">{t.configurator.summary_note}</p>
                )}
              </div>
              
              <button 
                onClick={() => openModal("inquiry")}
                className="w-full sm:w-auto inline-flex items-center justify-between gap-6 bg-background text-foreground px-8 py-5 font-bold ui-label hover:bg-accent hover:text-white hover:shadow-[8px_8px_0px_#FFFFFF] border-2 border-background transition-all cursor-pointer"
              >
                {t.configurator.cta}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
        calculatorData={{
          totalPrice: targetTotal,
          platforms: platforms.map(pId => PLATFORMS.find(x => x.id === pId)?.name ?? pId),
          hours,
          consulting,
          addons: getActiveAddons(),
        }}
      />
    </Section>
  );
}
