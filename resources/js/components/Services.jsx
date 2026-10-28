import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../config/axios';
import { imageUrl } from '../utils/imageUrl';
import { AnimatePresence, motion } from 'framer-motion';

// Fallback services matching default content if backend is offline
const FALLBACK_SERVICES = [
    {
        id: 1,
        title: 'Web Development',
        subtitle: 'Modern & high-performance websites',
        description: 'We build modern, responsive and high-performance websites that create real business value.',
        icon: 'code',
        image: null,
        features: [
            { title: 'Fast & Responsive', description: 'Optimized for all devices' },
            { title: 'Modern UI/UX', description: 'Clean and user-friendly designs' },
            { title: 'Secure & Scalable', description: 'Built with best practices' }
        ]
    },
    {
        id: 2,
        title: 'Mobile Applications',
        subtitle: 'Android & iOS mobile apps',
        description: 'High-impact native and cross-platform mobile apps with fluid performance and exceptional UX.',
        icon: 'smartphone',
        image: null,
        features: [
            { title: 'Cross-Platform', description: 'Flutter & React Native perfection' },
            { title: 'High Performance', description: 'Fast startup & silky 60fps animations' },
            { title: 'Push & Cloud Sync', description: 'Real-time cloud database integration' }
        ]
    },
    {
        id: 3,
        title: 'Web Systems',
        subtitle: 'Custom business management systems',
        description: 'Scalable ERP, CRM, inventory, and automated business workflows engineered for seamless productivity.',
        icon: 'layers',
        image: null,
        features: [
            { title: 'Smart Analytics', description: 'Real-time business insights & reports' },
            { title: 'Process Automation', description: 'Automate invoicing, payroll & billing' },
            { title: 'Role-Based Security', description: 'Granular permissions and audit logs' }
        ]
    },
    {
        id: 4,
        title: 'Social Media Marketing',
        subtitle: 'Creative content & brand growth',
        description: 'Data-driven digital marketing, brand design, and growth campaigns that convert clicks into lifelong customers.',
        icon: 'megaphone',
        image: null,
        features: [
            { title: 'Targeted Ads', description: 'Meta, Google & LinkedIn ad campaigns' },
            { title: 'Brand Growth', description: 'Engaging reels, banners & video assets' },
            { title: 'SEO & Reach', description: 'Organic keyword reach and authority' }
        ]
    },
    {
        id: 5,
        title: 'Custom Software Solutions',
        subtitle: 'Tailored solutions for your business',
        description: 'Tailored enterprise software, API integrations, and cloud infrastructure tailored to your exact operational requirements.',
        icon: 'settings',
        image: null,
        features: [
            { title: 'Bespoke Architecture', description: 'Custom built for your workflows' },
            { title: 'API Integration', description: 'Connect payment gateways & external APIs' },
            { title: 'Cloud Hosted', description: '99.9% uptime with automated backups' }
        ]
    }
];

function ServiceIcon({ name, className = 'w-5 h-5' }) {
    switch (name) {
        case 'code':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>
            );
        case 'smartphone':
        case 'mobile':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
            );
        case 'layers':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                </svg>
            );
        case 'megaphone':
        case 'marketing':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 11 18-5v12L3 14v-3z" />
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
            );
        case 'settings':
        case 'cog':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            );
        default:
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            );
    }
}

function FeatureBulletIcon({ index, className = 'w-4 h-4' }) {
    if (index === 0) {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        );
    }
    if (index === 1) {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C21.438 6.478 17.215 2 12 2z" />
            </svg>
        );
    }
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef(null);
    const ROTATION_INTERVAL = 6000;

    // Fetch services from API
    useEffect(() => {
        axios.get('/api/v1/services')
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setServices(res.data);
                } else {
                    setServices(FALLBACK_SERVICES);
                }
            })
            .catch(() => setServices(FALLBACK_SERVICES))
            .finally(() => setLoading(false));
    }, []);

    const total = services.length;

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % (total || 1));
    }, [total]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + (total || 1)) % (total || 1));
    }, [total]);

    useEffect(() => {
        if (total <= 1) return;

        timerRef.current = setInterval(() => {
            handleNext();
        }, ROTATION_INTERVAL);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [total, handleNext, activeIndex]);

    const currentService = services[activeIndex] || services[0] || FALLBACK_SERVICES[0];

    const featuresList = (currentService?.features && currentService.features.length > 0)
        ? currentService.features
        : [
            { title: 'Fast & Responsive', description: 'Optimized for all devices' },
            { title: 'Modern UI/UX', description: 'Clean and user-friendly designs' },
            { title: 'Secure & Scalable', description: 'Built with best practices' }
        ];

    return (
        <section
            id="services"
            className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-[#f4f7fb] text-slate-800 transition-colors duration-500"
        >
            {/* Ambient Lighting & Blueprint Accents */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-24 w-[700px] h-[700px] bg-gradient-to-br from-blue-100/70 via-sky-50/40 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/40 via-indigo-50/30 to-transparent rounded-full blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />
                <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-slate-200/50 via-slate-100/20 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

                {/* ── SECTION HEADER ─────────────────────────────── */}
                <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16 text-center sm:text-left mx-auto sm:mx-0">
                    <div className="inline-flex items-center justify-center sm:justify-start gap-2.5 mb-3">
                        <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                        <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-blue-600 font-mono">
                            OUR SERVICES
                        </span>
                        <span className="w-6 h-[2px] bg-blue-600 rounded-full sm:hidden" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                        Solutions Built <br className="hidden sm:inline" />
                        for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Growth</span>
                    </h2>

                    <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto sm:mx-0">
                        We provide end-to-end digital solutions to help businesses build, automate and grow with modern technology.
                    </p>
                </div>

                {/* ══════════════════════════════════════════════════════
                    MOBILE VIEW (< lg)
                    - Left/Center: Scaled Card with full width image & text shade
                    - Right-side: ONLY the 1, 2, 3, 4, 5 numbered buttons
                    - Bottom: Arrows (< >) and Get Started button
                   ══════════════════════════════════════════════════════ */}
                <div className="block lg:hidden">
                    {/* Row with Card (in front) and 1,2,3,4 buttons (on right) */}
                    <div className="flex items-stretch gap-3 mb-6">

                        {/* Service Card */}
                        <div className="flex-1 min-w-0 rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col justify-between relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentService?.id || activeIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full"
                                >
                                    {/* Full Width Showcase Image */}
                                    <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                                        {currentService?.image ? (
                                            <img
                                                src={imageUrl(currentService.image)}
                                                alt={currentService.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-4 text-center">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg mb-2">
                                                    <ServiceIcon name={currentService?.icon} className="w-6 h-6" />
                                                </div>
                                                <p className="text-xs font-bold text-white">{currentService?.title}</p>
                                            </div>
                                        )}
                                        {/* Soft gradient shade over bottom edge of image */}
                                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                    </div>

                                    {/* Card Text Content with subtle soft background shade */}
                                    <div className="p-4 sm:p-5 pt-1 flex flex-col flex-1 justify-between bg-white relative">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="text-base font-black font-mono text-blue-600">
                                                    {String(activeIndex + 1).padStart(2, '0')}
                                                </span>
                                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600">
                                                    SERVICE
                                                </span>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug mb-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
                                                {currentService?.title}
                                            </h3>

                                            <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3 line-clamp-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)]">
                                                {currentService?.description}
                                            </p>

                                            {/* Feature Points */}
                                            <div className="space-y-1.5 mb-4">
                                                {featuresList.slice(0, 3).map((feat, fIdx) => (
                                                    <div key={fIdx} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                                                        <div className="w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                                            <FeatureBulletIcon index={fIdx} className="w-3 h-3" />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-slate-800 truncate">{feat.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <a
                                            href="#contact"
                                            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors text-center"
                                        >
                                            <span>Explore Service</span>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Bottom Animated Blue Loading Progress Line */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100 overflow-hidden z-20">
                                <motion.div
                                    key={`mob-line-${activeIndex}`}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: ROTATION_INTERVAL / 1000, ease: 'linear' }}
                                    className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                                />
                            </div>
                        </div>

                        {/* Right-Side Numbered Buttons Rail (1, 2, 3, 4, 5 ONLY) */}
                        <div className="flex flex-col justify-between items-center py-1 shrink-0 gap-2">
                            {services.map((svc, idx) => {
                                const isActive = idx === activeIndex;
                                const numStr = String(idx + 1).padStart(2, '0');

                                return (
                                    <button
                                        key={svc.id || idx}
                                        type="button"
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 cursor-pointer ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40 scale-105'
                                                : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                                        }`}
                                    >
                                        {numStr}
                                    </button>
                                );
                            })}
                        </div>

                    </div>

                    {/* Bottom Controls: Prev Arrow, Get Started CTA, Next Arrow */}
                    <div className="flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous service"
                            className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 flex items-center justify-center shadow-sm active:scale-95 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <a
                            href="#contact"
                            className="flex-1 max-w-[220px] py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95 transition-all"
                        >
                            <span>Get Started</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next service"
                            className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 flex items-center justify-center shadow-sm active:scale-95 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════
                    DESKTOP VIEW (lg:)
                    - Left Column (4 cols): Vertical Timeline List + Controls
                    - Right Column (8 cols): Large Card with FULL WIDTH IMAGE
                      and smooth white shade behind text for high legibility
                   ══════════════════════════════════════════════════════ */}
                <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Column: Vertical Timeline List (4 cols) */}
                    <div className="col-span-4 flex flex-col justify-between">
                        <div className="relative pl-3">
                            <div className="absolute left-[27px] top-6 bottom-6 w-[1.5px] bg-slate-200" />

                            <div className="space-y-4">
                                {services.map((svc, idx) => {
                                    const isActive = idx === activeIndex;
                                    const numStr = String(idx + 1).padStart(2, '0');

                                    return (
                                        <button
                                            key={svc.id || idx}
                                            type="button"
                                            onClick={() => setActiveIndex(idx)}
                                            className={`group relative w-full text-left flex items-center gap-4 p-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)] translate-x-1.5'
                                                    : 'hover:bg-white/80 text-slate-700'
                                            }`}
                                        >
                                            <div
                                                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors duration-300 ${
                                                    isActive
                                                        ? 'bg-white text-blue-600 shadow-md'
                                                        : 'bg-white border border-slate-200 text-slate-500 group-hover:border-blue-300 group-hover:text-blue-600'
                                                }`}
                                            >
                                                {numStr}
                                            </div>

                                            <div
                                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                                    isActive
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                                                }`}
                                            >
                                                <ServiceIcon name={svc.icon} className="w-4 h-4" />
                                            </div>

                                            <div className="min-w-0 flex-1 pr-2">
                                                <h4 className={`text-sm font-bold truncate leading-snug ${
                                                    isActive ? 'text-white' : 'text-slate-800 group-hover:text-blue-600'
                                                }`}>
                                                    {svc.title}
                                                </h4>
                                                <p className={`text-[11px] truncate mt-0.5 ${
                                                    isActive ? 'text-blue-100' : 'text-slate-500'
                                                }`}>
                                                    {svc.subtitle || (svc.description ? svc.description.substring(0, 34) + '...' : '')}
                                                </p>
                                            </div>

                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeIndicatorDesktop"
                                                    className="w-1.5 h-6 bg-white/40 rounded-full mr-1"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Left Controls: Prev / Next & CTA */}
                        <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handlePrev}
                                aria-label="Previous service"
                                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 transition-all group"
                            >
                                <span>Get Started</span>
                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>

                            <button
                                type="button"
                                onClick={handleNext}
                                aria-label="Next service"
                                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Column (8 cols): Card with FULL WIDTH IMAGE & SMOOTH SHADE */}
                    <div className="col-span-8 relative">
                        <div className="relative rounded-[2.5rem] bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.08)] overflow-hidden min-h-[500px] flex items-center">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentService?.id || activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    {/* 1. Full-Width Service Image in the Card Background */}
                                    {currentService?.image ? (
                                        <img
                                            src={imageUrl(currentService.image)}
                                            alt={currentService.title}
                                            className="w-full h-full object-cover object-right"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-50 via-sky-50/40 to-blue-50 flex items-center justify-end pr-16">
                                            <div className="w-64 h-64 rounded-full bg-blue-100/40 blur-3xl" />
                                        </div>
                                    )}

                                    {/* 2. Soft White Shade Gradient behind text for 100% legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-48% to-white/10 pointer-events-none" />
                                </motion.div>
                            </AnimatePresence>

                            {/* 3. Text & Details sitting on top of the soft shade */}
                            <div className="relative z-20 max-w-lg p-8 lg:p-12">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentService?.id || activeIndex}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -14 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-2xl font-black font-mono text-slate-900 tracking-tight">
                                                {String(activeIndex + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-600">
                                                SERVICE
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                                            {currentService?.title}
                                        </h3>

                                        <p className="text-sm text-slate-700 leading-relaxed font-medium mb-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.04)]">
                                            {currentService?.description}
                                        </p>

                                        {/* 3 Key Feature Bullets */}
                                        <div className="space-y-3.5 mb-8">
                                            {featuresList.slice(0, 3).map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50/90 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                                        <FeatureBulletIcon index={fIdx} className="w-4 h-4" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                                                            {feat.title}
                                                        </h5>
                                                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                                                            {feat.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <a
                                            href="#contact"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all duration-300 group"
                                        >
                                            <span>Explore Service</span>
                                            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Bottom Animated Blue Loading Progress Line */}
                            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-slate-100 overflow-hidden z-30">
                                <motion.div
                                    key={`desk-line-${activeIndex}`}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: ROTATION_INTERVAL / 1000, ease: 'linear' }}
                                    className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
                                />
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
