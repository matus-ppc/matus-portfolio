import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

export function Contact() {
  const { t } = useLanguage();
  
  return (
    <>
      <Section id="kontakt" className="bg-background py-32 border-b border-card-border overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative">
          
          <div className="flex flex-col items-center text-center space-y-12">
            <div className="ui-label text-accent font-black tracking-widest flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent" />
              05 — {t.contact.label}
              <span className="w-8 h-[1px] bg-accent" />
            </div>

            <div className="absolute top-0 right-6 ui-label text-foreground/20">
              {t.contact.code}
            </div>
            
            <h2 className="text-5xl md:text-8xl font-serif font-black text-foreground tracking-tighter leading-tight max-w-4xl">
              {t.contact.title}
            </h2>

            <div className="w-full max-w-5xl group relative">
              <a 
                href="mailto:ahoj@matusbaranec.sk" 
                className="group relative inline-block border-2 border-foreground px-4 md:px-12 py-6 bg-background hover:bg-accent transition-colors duration-200"
              >
                <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black text-foreground group-hover:text-white tracking-tighter transition-colors duration-200">
                  ahoj@matusbaranec.sk
                </span>
                <div className="absolute top-4 left-4 w-full h-full border-2 border-foreground -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-200 bg-foreground/5" />
              </a>
            </div>

            <p className="ui-label text-foreground/40 font-bold uppercase tracking-widest mt-12">
              {t.contact.subtext}
            </p>
          </div>

        </div>
      </Section>
      
      <footer className="bg-foreground text-background text-center py-12">
        <div className="ui-label opacity-50">
          &copy; {new Date().getFullYear()} MATÚŠ BARANEC. {t.contact.copyright}
        </div>
      </footer>
    </>
  );
}
