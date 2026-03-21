import { Section } from "./Section";
import { BarChart3, ShoppingCart, Settings, SearchCheck } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Správa kampaní",
      description: "Kompletné zastrešenie výkonnostného marketingu v rámci Google Ads a Meta Ads. Od stratégie až po exekúciu.",
      icon: <BarChart3 className="w-6 h-6 text-accent" />
    },
    {
      title: "Cenové porovnávače",
      description: "Optimalizácia a bidding pre Heureka, Favi, Biano a ďalšie CSS systémy pre maximálnu návratnosť.",
      icon: <ShoppingCart className="w-6 h-6 text-accent" />
    },
    {
      title: "Technické nastavenie",
      description: "Presné meranie konverzií a analytika prostredníctvom Google Tag Manager (GTM) a GA4.",
      icon: <Settings className="w-6 h-6 text-accent" />
    },
    {
      title: "Audity a stratégie",
      description: "Hĺbkový rozbor existujúcich kampaní, identifikácia plytvania rozpočtom a návrh novej stratégie rastu.",
      icon: <SearchCheck className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <Section id="sluzby" className="bg-foreground/5 dark:bg-foreground/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Služby</h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Zameriavam sa na komplexný rast e-shopov a B2B segmentu prostredníctvom výkonnostného marketingu a presnej analytiky.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-background p-8 rounded-[24px] shadow-sm border border-foreground/5 hover:border-accent/20 transition-colors group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
