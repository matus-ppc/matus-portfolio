"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'zoom'>('idle');

  useEffect(() => {
    // Phase 1: Keep idle/loader state for 1.5s
    const timer = setTimeout(() => {
      setPhase('zoom');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background pointer-events-none"
    >
      {/* 1. Underlying Image (Only visible through the mask hole initially) */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image 
          src="/profile-bw.webp" 
          alt="Preloader Texture" 
          fill 
          className="object-cover grayscale contrast-125 opacity-40 mix-blend-multiply object-[center_10%] md:object-center" 
          priority 
        />
        
        {/* Jemný tieň / rozmazaný kruh na prekrytie vodoznaku v pravom dolnom rohu (len na mobile) */}
        <div className="absolute -bottom-10 -right-10 w-[60vw] h-[60vw] max-w-[300px] max-h-[300px] bg-background md:hidden pointer-events-none rounded-full blur-3xl z-10 opacity-90" />
      </motion.div>

      {/* 2. Scalable SVG Mask */}
      <motion.svg 
        className="absolute z-10 w-full h-full origin-center"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          phase === 'zoom' 
            ? { scale: 80, opacity: 0 } 
            : { scale: 1, opacity: 1 }
        }
        transition={{ 
          duration: 1.5, 
          ease: [0.76, 0, 0.24, 1], // Apple-like buttery smooth cubic bezier
        }}
        onAnimationComplete={() => {
          if (phase === 'zoom') {
             // Fully clear the preloader and unblock main page
            onComplete();
          }
        }}
      >
        <defs>
          <mask id="textMask">
            {/* White = Keep background visible (Green) */}
            <rect width="100%" height="100%" fill="white" />
            
            {/* Black = Punch a hole to see the texture underneath */}
            <text 
              x="50%" y="50%" 
              fontSize="18vw" 
              fontWeight="900" 
              fontFamily="var(--font-serif), serif" 
              textAnchor="middle" 
              dominantBaseline="central" 
              fill="black"
              letterSpacing="-0.05em"
            >
              MB.
            </text>
          </mask>
        </defs>
        
        {/* The solid dark green cover layer */}
        <rect 
          width="100%" height="100%" 
          fill="#004225" 
          mask="url(#textMask)" 
        />
      </motion.svg>
    </motion.div>
  );
}
