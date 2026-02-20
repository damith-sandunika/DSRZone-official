import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HEADLINE = 'SLDIGITASYSTEM';
const SUBHEADLINE = 'Architecting Digital Intelligence';

function CpuIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="16" x="4" y="4" rx="2" ry="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

function Typewriter({ text, delay = 0, onComplete }) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) return;
    setDisplay('');
    setDone(false);
    const start = Date.now();
    let i = 0;
    const t = setInterval(() => {
      if (Date.now() - start < delay) return;
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else {
        setDone(true);
        onComplete?.();
        clearInterval(t);
      }
    }, 50);
    return () => clearInterval(t);
  }, [text, delay, onComplete]);

  return <span>{display}</span>;
}

function HeroSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Section height is 100vh + 500px so progress 0→1 = first 500px of scroll
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden bg-slate-950"
      style={{ height: 'calc(100vh + 500px)' }}
    >
      {/* Grid pattern (thin gray lines) */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial gradient spotlight (center) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(59, 130, 246, 0.08) 0%, transparent 55%)',
        }}
      />

      {/* Content: parallax exit on scroll (viewport-sized so first screen is filled) */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-screen flex flex-col items-center justify-center px-4"
        style={{ opacity, scale, y }}
      >
        {/* Centerpiece: icon with breathe + neon glow */}
        <motion.div
          className="flex items-center justify-center text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <CpuIcon className="w-20 h-20 sm:w-24 sm:h-24" />
        </motion.div>

        {/* Headline: fade in up */}
        <motion.h1
          className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.35em] text-white uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          {HEADLINE}
        </motion.h1>

        {/* Sub-headline: typewriter */}
        <motion.p
          className="mt-4 text-slate-400 text-lg sm:text-xl tracking-wide min-h-[2rem] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Typewriter text={SUBHEADLINE} delay={1000} />
        </motion.p>

        {/* Scroll Down indicator (bouncing) */}
        <motion.a
          href="#pipeline"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-blue-400/90 transition-colors z-10"
          aria-label="Scroll down"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll Down</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}

export default HeroSection;
