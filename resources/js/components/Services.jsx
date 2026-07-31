import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../config/axios';
import { imageUrl } from '../utils/imageUrl';
import { AnimatePresence, motion } from 'framer-motion';

const fallbackServices = [
    { id: 1, icon: '🌐', title: 'Web Development',
      description: 'Custom, scalable web platforms built for speed, performance, and outstanding user experiences to represent your brand online.', image: null },
    { id: 2, icon: '⚙️', title: 'Web System Development',
      description: 'End-to-end web system architectures designed for efficiency, automated workflows, and complex business logic management.', image: null },
    { id: 3, icon: '📦', title: 'POS System',
      description: 'Real-time stock tracking, barcode scanning, and multi-branch sync point-of-sale solutions for retail and wholesale operations.', image: null },
    { id: 4, icon: '🎨', title: 'UI/UX Design',
      description: 'Pixel-perfect interfaces and brand identities that communicate professionalism, build trust, and convert visitors into loyal clients.', image: null },
    { id: 5, icon: '📱', title: 'Social Media Management',
      description: 'Strategic social media campaigns, content creation, and community management to grow your online presence and engage with your audience.', image: null },
];

const STEP_GRADIENTS = [
    'linear-gradient(135deg,#0a0c12 0%,#030610 100%)',
    'linear-gradient(135deg,#061325 0%,#030610 100%)',
    'linear-gradient(135deg,#030610 0%,#0a192f 100%)',
    'linear-gradient(135deg,#0a192f 0%,#030610 100%)',
    'linear-gradient(135deg,#0a0c12 0%,#030610 100%)',
    'linear-gradient(135deg,#051024 0%,#030610 100%)',
];

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [linePercent, setLinePercent] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        axios.get('/api/v1/services')
            .then((res) => setServices(res.data.length ? res.data : fallbackServices))
            .catch(() => setServices(fallbackServices))
            .finally(() => setLoading(false));
    }, []);

    const n = services.length;

    const onScroll = useCallback(() => {
        const el = sectionRef.current;
        if (!el || n < 2) return;

        const { top, height } = el.getBoundingClientRect();
        const scrollable = height - window.innerHeight;
        const raw = Math.min(1, Math.max(0, -top / scrollable));

        setLinePercent(raw * 100);
        const step = Math.min(n - 1, Math.floor(raw * n));
        setActiveStep(step);
    }, [n]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    const scrollToStep = (i) => {
        const el = sectionRef.current;
        if (!el) return;
        const scrollable = el.offsetHeight - window.innerHeight;
        const target = el.offsetTop + (i / (n - 1)) * scrollable;
        window.scrollTo({ top: target, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <section className="py-24 bg-[#030610] h-screen flex items-center justify-center">
                <div className="text-blue-500 animate-pulse font-semibold">Loading services…</div>
            </section>
        );
    }

    const active = services[activeStep] || services[0];
    const circlePosPct = (i) => (n > 1 ? (i / (n - 1)) * 100 : 0);

    return (
        <section ref={sectionRef} className="relative border-t border-white/5 bg-[#030610]" style={{ height: `${n * 100}vh` }}>
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

                {/* ── BACKGROUND: Image/Gradient Layer ─────────────── */}
                <div className="absolute inset-0 z-0">
                    {services.map((svc, i) => {
                        const img = svc.image ? imageUrl(svc.image) : null;
                        return (
                            <div key={svc.id} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === activeStep ? 1 : 0 }}>
                                {img ? (
                                    <img src={img} alt={svc.title} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                ) : (
                                    <div className="w-full h-full" style={{ background: STEP_GRADIENTS[i % STEP_GRADIENTS.length] }} />
                                )}
                            </div>
                        );
                    })}
                    {/* Shadow Overlays to ensure text readability */}
                    <div className="absolute inset-0 bg-[#030610]/80 md:bg-[#030610]/40" />
                    <div className="hidden md:block absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[#030610] via-[#030610]/95 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030610] to-transparent" />
                </div>

                {/* ── HEADER ─────────────────────────────────────── */}
                <div className="relative z-10 pt-24 pb-4 px-4 text-center md:text-left md:max-w-7xl md:mx-auto md:w-full md:px-8">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">What We Do</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white shadow-black drop-shadow-md">Our Services</h2>
                </div>

                {/* ── CONTENT LAYER ─────────────────────────────────────── */}
                <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto flex items-stretch px-4 sm:px-8 pb-12">

                    {/* ── LEFT: Text content ─────────────────────────── */}
                    <div className="flex-1 flex items-center pr-6 md:pr-12 lg:pr-24 min-w-0 pb-16 md:pb-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="w-full max-w-lg"
                            >
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl sm:text-2xl font-black tracking-widest text-blue-400 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] font-mono">
                                    {String(activeStep + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
                                    {active?.title}
                                </h3>
                                <div className="w-12 h-1 rounded-full bg-blue-500 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-medium mb-8 drop-shadow-md max-w-md">
                                    {active?.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── CENTER: Timeline (Visible on Desktop) ── */}
                    <div className="hidden md:flex relative flex-col items-center justify-center w-16 shrink-0 py-12">
                        {/* Track background */}
                        <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[2px] bg-white/10 rounded-full" />
                        {/* Filled line */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 top-12 w-[2px] bg-blue-500 transition-none origin-top rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                            style={{ height: `calc((100% - 6rem) * ${linePercent / 100})` }}
                        />
                        {/* Numbers */}
                        {services.map((svc, i) => {
                            const isActive = i === activeStep;
                            const isDone   = i < activeStep;
                            const pct      = circlePosPct(i);

                            return (
                                <button
                                    key={svc.id}
                                    type="button"
                                    onClick={() => scrollToStep(i)}
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none"
                                    style={{
                                        top: `calc(3rem + (100% - 6rem) * ${pct / 100})`,
                                        width:  isActive ? '3rem' : '2rem',
                                        height: isActive ? '3rem' : '2rem',
                                        background: isActive ? '#3b82f6' : isDone ? 'rgba(59,130,246,0.4)' : '#0a0c12',
                                        border: isActive ? '2px solid #93c5fd' : isDone ? '1px solid rgba(59,130,246,0.6)' : '1px solid rgba(255,255,255,0.15)',
                                        color: isActive || isDone ? '#fff' : '#64748b',
                                        boxShadow: isActive ? '0 0 20px rgba(59,130,246,0.8)' : 'none',
                                        fontSize: isActive ? '14px' : '12px'
                                    }}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    {/* ── RIGHT: Space for Image ────────────── */}
                    <div className="hidden md:flex flex-1 items-center justify-center relative pointer-events-none">
                        {/* We leave this area completely empty so the background image is perfectly visible on the right side! */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 0.05, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6 }}
                                className="absolute text-[250px] text-blue-500 blur-sm right-0 top-1/2 -translate-y-1/2"
                            >
                                {active?.icon}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* Mobile Scroll Tracker Line (Right Edge) */}
                <div className="md:hidden absolute right-5 sm:right-8 top-1/4 bottom-1/4 w-[2px] bg-white/10 rounded-full z-20 pointer-events-none">
                     <div className="absolute top-0 w-full bg-blue-500 rounded-full transition-none shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ height: `${linePercent}%` }} />
                     {services.map((svc, i) => {
                         const isActive = i === activeStep;
                         const isDone = i < activeStep;
                         return (
                             <button
                                 key={svc.id}
                                 type="button"
                                 onClick={() => scrollToStep(i)}
                                 className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 flex items-center justify-center font-bold text-[9px] pointer-events-auto"
                                 style={{
                                     top: `${circlePosPct(i)}%`,
                                     width: isActive ? '1.75rem' : '1.25rem',
                                     height: isActive ? '1.75rem' : '1.25rem',
                                     background: isActive ? '#3b82f6' : isDone ? 'rgba(59,130,246,0.4)' : '#0a0c12',
                                     border: isActive ? '1px solid #93c5fd' : isDone ? '1px solid rgba(59,130,246,0.6)' : '1px solid rgba(255,255,255,0.15)',
                                     color: isActive || isDone ? '#fff' : '#64748b',
                                     boxShadow: isActive ? '0 0 15px rgba(59,130,246,0.8)' : 'none'
                                 }}
                             >
                                 {i + 1}
                             </button>
                         );
                     })}
                </div>

                {/* Scroll hint icon at bottom */}
                {activeStep === 0 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-20 pointer-events-none">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                )}
            </div>
        </section>
    );
}
