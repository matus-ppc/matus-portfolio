import { Section } from "./Section";
import { Code, PenTool, Globe, TrendingUp } from "lucide-react";

export function AboutMe() {
  return (
    <Section id="o-mne">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Unikátne prepojenie</h2>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                Začal som so vzdelaním v <strong className="text-foreground">informatike</strong> a <strong className="text-foreground">žurnalistike</strong>. Toto netradičné spojenie mi umožňuje vidieť marketing z dvoch uhlov: technického a komunikačného.
              </p>
              <p>
                Rozumiem kódu a dátam, preto dokážem kampane presne merať a vyhodnocovať. Zároveň však viem, že na druhej strane obrazovky sedí človek, ktorého treba osloviť <strong className="text-foreground">správnym príbehom</strong>.
              </p>
              <p>
                Mám <strong className="text-accent">viac ako 3 roky praxe</strong> so správou slovenských e-shopov aj medzinárodným scalingom na trhy ako CZ, HU, RO a HR.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-foreground/5 p-6 rounded-[24px] flex flex-col items-center justify-center text-center aspect-square gap-3">
              <Code className="w-8 h-8 text-accent" />
              <span className="font-semibold">IT & Analytika</span>
            </div>
            <div className="bg-foreground/5 p-6 rounded-[24px] flex flex-col items-center justify-center text-center aspect-square gap-3 mt-8">
              <PenTool className="w-8 h-8 text-accent" />
              <span className="font-semibold">Žurnalistika</span>
            </div>
            <div className="bg-foreground/5 p-6 rounded-[24px] flex flex-col items-center justify-center text-center aspect-square gap-3 -mt-8">
              <Globe className="w-8 h-8 text-accent" />
              <span className="font-semibold">CEE Scaling</span>
            </div>
            <div className="bg-foreground/5 p-6 rounded-[24px] flex flex-col items-center justify-center text-center aspect-square gap-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              <span className="font-semibold">3+ Roky Praxe</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
