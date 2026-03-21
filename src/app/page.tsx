import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { AboutMe } from "@/components/AboutMe";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-background relative">
      <Navbar />
      <Hero />
      <Services />
      <AboutMe />
      <Experience />
      <Contact />
      
      <footer className="bg-accent text-white/50 text-center py-6 text-sm">
        <p>&copy; {new Date().getFullYear()} Matúš Baranec. Všetky práva vyhradené.</p>
      </footer>
    </main>
  );
}
