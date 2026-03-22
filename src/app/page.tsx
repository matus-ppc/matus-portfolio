"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { Configurator } from "@/components/Configurator";
import { AboutMe } from "@/components/AboutMe";

import { Contact } from "@/components/Contact";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  // Lock scroll while preloading
  useEffect(() => {
    if (!loaderComplete) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    
    // Cleanup in case component unmounts
    return () => { document.body.style.overflow = ""; };
  }, [loaderComplete]);

  return (
    <>
      <AnimatePresence>
        {!loaderComplete && (
          <Preloader onComplete={() => {
            setLoaderComplete(true);
            window.dispatchEvent(new CustomEvent("preloader-complete"));
          }} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={loaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="overflow-hidden"
      >
        <Navbar />
        <Hero />
        <Services />
        <Results />
        <Configurator />
        <AboutMe />

        <Contact />
      </motion.main>
    </>
  );
}
