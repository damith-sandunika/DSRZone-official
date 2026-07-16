import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../config/axios';
import { imageUrl } from '../utils/imageUrl';
import { AnimatePresence, motion } from 'framer-motion';

/* ─── Fallback services ──────────────────────────────────────────────────── */
const fallbackServices = [
    { id: 1, icon: '🌐', title: 'Web Application Development',
      description: 'Custom, scalable web platforms built with React, Laravel, and Node.js — from business dashboards to full e-commerce systems that grow with your business.', image: null },
    { id: 2, icon: '📱', title: 'Mobile App Development',
      description: 'Native and cross-platform iOS & Android apps designed for performance and an outstanding user experience that keeps your customers coming back.', image: null },
    { id: 3, icon: '🍽️', title: 'Digital Menu Systems',
      description: 'QR-based smart menus for restaurants and cafes with real-time updates, order management, and kitchen displays — eliminating costly reprints forever.', image: null },
    { id: 4, icon: '📦', title: 'Inventory & POS Solutions',
      description: 'Real-time stock tracking, barcode scanning, multi-branch sync, and integrated point-of-sale for retail and wholesale operations across Sri Lanka.', image: null },
    { id: 5, icon: '🎓', title: 'Learning Management Systems',
      description: 'End-to-end LMS platforms with video lessons, quiz engines, progress analytics and student certificate generation — teaching at scale made simple.', image: null },
    { id: 6, icon: '🎨', title: 'UI/UX & Graphic Design',
      description: 'Pixel-perfect interfaces and brand identities that communicate professionalism, build trust with your customers, and convert visitors into loyal clients.', image: null },
];

const STEP_GRADIENTS = [
    'linear-gradient(135deg,#0d1f3c 0%,#07090f 100%)',
    'linear-gradient(135deg,#0c1a2e 0%,#07090f 100%)',
    'linear-gradient(135deg,#130d2e 0%,#07090f 100%)',
    'linear-gradient(135deg,#0a2018 0%,#07090f 100%)',
    'linear-gradient(135deg,#1f1508 0%,#07090f 100%)',
    'linear-gradient(135deg,#210d1a 0%,#07090f 100%)',
];

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [linePercent, setLinePercent] = useState(0); // continuous 0-100
    const sectionRef = useRef(null);

    useEffect(() => {
        axios.get('/api/v1/services')
            .then((res) => setServices(res.data.length ? res.data : fallbackServices))
            .catch(() => setServices(fallbackServices))
            .finally(() => setLoading(false));
    }, []);

    const n = services.length;

    /* ── Continuous scroll tracker ────────────────────────────────────────── */
    const onScroll = useCallback(() => {
        const el = sectionRef.current;
        if (!el || n < 2) return;

        const { top, height } = el.getBoundingClientRect();
        const scrollable = height - window.innerHeight;
        const raw = Math.min(1, Math.max(0, -top / scrollable));     // 0 → 1 continuous

        /* Line fills continuously */
        setLinePercent(raw * 100);

        /* Active step text changes at each 1/(n-1) boundary */
        const step = Math.min(n - 1, Math.floor(raw * n));
        setActiveStep(step);
    }, [n]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    /* Click on circle → smooth scroll to that step */
    const scrollToStep = (i) => {
        const el = sectionRef.current;
        if (!el) return;
        const scrollable = el.offsetHeight - window.innerHeight;
        const target = el.offsetTop + (i / (n - 1)) * scrollable;
        window.scrollTo({ top: target, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <section id="services" className="py-24 bg-[#07090f] border-t border-white/5">
                <div className="max-w-5xl mx-auto text-center text-gray-500 py-20">Loading…</div>
            </section>
        );
    }

    const active = services[activeStep] || services[0];

    /* Circle position along the track (%) */
    const circlePosPct = (i) => (n > 1 ? (i / (n - 1)) * 100 : 0);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative border-t border-white/5"
            style={{ height: `${n * 100}vh` }}
        >
            {/* ── STICKY VIEWPORT ─────────────────────────────────────────── */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* ── BACKGROUND: full bleed image per step ─────────────── */}
                <div className="absolute inset-0 z-0">
                    {services.map((svc, i) => {
                        const img = svc.image ? imageUrl(svc.image) : null;
                        return (
                            <div
                                key={svc.id}
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{ opacity: i === activeStep ? 1 : 0 }}
                            >
                                {img
                                    ? <img src={img} alt={svc.title} className="w-full h-full object-cover" />
                                    : <div className="w-full h-full" style={{ background: STEP_GRADIENTS[i % STEP_GRADIENTS.length] }} />
                                }
                            </div>
                        );
                    })}
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#07090f]/72" />
                    {/* Right-side deeper shade for text */}
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#07090f]/90 via-[#07090f]/50 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#07090f] to-transparent" />
                </div>

                {/* ── CONTENT LAYER ─────────────────────────────────────── */}
                <div className="relative z-10 h-full flex flex-col">

                    {/* Section header */}
                    <div className="text-center pt-8 pb-4 shrink-0 px-4">
                        <p className="section-label">What We Do</p>
                        <h2 className="section-title text-2xl sm:text-3xl mt-1">
                            <span className="section-title-accent">Our Services</span>
                        </h2>
                    </div>

                    {/* Main flex row */}
                    <div className="flex-1 flex min-h-0 items-stretch">

                        {/* ── LEFT: Text content ─────────────────────────── */}
                        <div className="flex-1 flex items-center
                                        pl-6 sm:pl-10 lg:pl-16
                                        pr-4 sm:pr-6
                                        min-w-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -18 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className="w-full max-w-md"
                                >
                                    {/* Step label */}
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/80 mb-3">
                                        Step {String(activeStep + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                                    </p>

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4">
                                        {active?.icon || '⚙️'}
                                    </div>

                                    {/* Title — normal size */}
                                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                                        {active?.title}
                                    </h3>

                                    <div className="w-8 h-0.5 rounded-full bg-blue-500 mb-4" />

                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
                                        {active?.description}
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        <a href="#contact"
                                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 text-sm shadow-lg shadow-blue-800/30 transition-all hover:-translate-y-0.5">
                                            Get Started
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                        <a href="#portfolio"
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 font-semibold px-5 py-2.5 text-sm transition-all">
                                            See Examples
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── CENTER: Timeline — absolute center on desktop, left-ish on mobile ── */}
                        <div className="
                            relative flex flex-col items-center justify-center
                            w-14 sm:w-16 lg:w-20
                            py-8 shrink-0
                        ">
                            {/* Track background line */}
                            <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-px bg-white/8" />

                            {/* Filled line — continuous */}
                            <div
                                className="absolute left-1/2 -translate-x-1/2 top-8 w-px bg-blue-500 transition-none origin-top"
                                style={{ height: `calc((100% - 4rem) * ${linePercent / 100})` }}
                            />

                            {/* Circles — evenly distributed */}
                            {services.map((svc, i) => {
                                const isActive = i === activeStep;
                                const isDone   = i < activeStep;
                                const pct      = circlePosPct(i);

                                return (
                                    <button
                                        key={svc.id}
                                        type="button"
                                        onClick={() => scrollToStep(i)}
                                        title={svc.title}
                                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                                                   flex items-center justify-center rounded-full
                                                   text-xs font-bold transition-all duration-300 cursor-pointer select-none"
                                        style={{
                                            top: `calc(2rem + (100% - 4rem) * ${pct / 100})`,
                                            width:  isActive ? '2.75rem' : '2rem',
                                            height: isActive ? '2.75rem' : '2rem',
                                            background: isActive
                                                ? '#3b82f6'
                                                : isDone
                                                    ? 'rgba(59,130,246,0.35)'
                                                    : 'rgba(255,255,255,0.04)',
                                            border: isActive
                                                ? '2px solid #93c5fd'
                                                : isDone
                                                    ? '1px solid rgba(59,130,246,0.5)'
                                                    : '1px solid rgba(255,255,255,0.15)',
                                            color: isActive || isDone ? '#fff' : '#6b7280',
                                            boxShadow: isActive ? '0 0 18px rgba(59,130,246,0.6)' : 'none',
                                            transform: `translateX(-50%) translateY(-50%) scale(${isActive ? 1 : 0.9})`,
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── RIGHT: decorative / breathing room ────────────── */}
                        <div className="hidden lg:flex flex-1 items-center justify-center opacity-30 px-8">
                            {/* Subtle rotating icon for active step */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-8xl select-none"
                                >
                                    {active?.icon || '⚙️'}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>

                    {/* Scroll hint */}
                    {activeStep === 0 && (
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
                            <p className="text-xs text-gray-600 uppercase tracking-widest">Scroll</p>
                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
