import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="kontakt" className="bg-accent text-white py-32 text-center" delay={0.2}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white">
          Máte záujem o spoluprácu? <br className="hidden md:block" />Napíšte mi.
        </h2>
        <a 
          href="mailto:ahoj@matusbaranec.sk" 
          className="inline-block mt-4 text-2xl md:text-4xl font-light hover:opacity-80 transition-opacity border-b border-white/30 pb-2"
        >
          ahoj@matusbaranec.sk
        </a>
      </div>
    </Section>
  );
}
