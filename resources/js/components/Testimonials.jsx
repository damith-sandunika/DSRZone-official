import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../config/axios';
import { imageUrl } from '../utils/imageUrl';
import { motion, AnimatePresence } from 'framer-motion';

// High-quality professional avatar fallbacks if not uploaded in admin panel
const FALLBACK_TESTIMONIALS = [
    {
        id: 1,
        name: 'Kasun Perera',
        position: 'Managing Director',
        company: 'Rapid Laundromat Group',
        phone: '+61 412 345 678',
        growth_stat: '50% Faster Operations',
        rating: 5,
        testimonial: 'DSRZone developed our Laundry Management System exactly as we needed. The team understood our requirements very well and delivered a user-friendly system with great support. Our daily operations are now much easier and more efficient.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        company_logo: null
    },
    {
        id: 2,
        name: 'Sanduni Fernando',
        position: 'Owner',
        company: 'Spice Hub Restaurant',
        phone: '+94 77 234 5678',
        growth_stat: '3x Table Turnover',
        rating: 5,
        testimonial: 'The POS and online ordering system designed by DSRZone boosted our table turns and takeout orders significantly. Outstanding UI and reliable 24/7 uptime for our branches.',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
        company_logo: null
    },
    {
        id: 3,
        name: 'Dilan Jayasinghe',
        position: 'Director',
        company: 'Sisira Driving School',
        phone: '+94 71 889 9001',
        growth_stat: '80% Less Paperwork',
        rating: 5,
        testimonial: 'Managing student appointments and exam dates was chaotic until DSRZone deployed our customized management portal. Extremely professional team and swift execution!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        company_logo: null
    },
    {
        id: 4,
        name: 'Nadee Perera',
        position: 'Owner',
        company: 'Tasty Bites',
        phone: '+94 76 543 2198',
        growth_stat: '2x Customer Retention',
        rating: 5,
        testimonial: 'From brand identity and logos to their seamless web system, DSRZone exceeded our expectations. Our customer engagement doubled within the first few months.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        company_logo: null
    },
    {
        id: 5,
        name: 'Ruwan Chamara',
        position: 'Director',
        company: 'Drive Master',
        phone: '+94 70 112 3344',
        growth_stat: '99.9% Booking Accuracy',
        rating: 5,
        testimonial: 'A genuinely world-class team. DSRZone\'s automated scheduling and notification platform transformed our client communications and instructor workflows completely.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        company_logo: null
    }
];

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);
    const ROTATION_INTERVAL = 6000;

    // Fetch testimonials from API
    useEffect(() => {
        axios.get('/api/v1/testimonials')
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setTestimonials(res.data);
                } else {
                    setTestimonials(FALLBACK_TESTIMONIALS);
                }
            })
            .catch(() => setTestimonials(FALLBACK_TESTIMONIALS))
            .finally(() => setLoading(false));
    }, []);

    const total = testimonials.length;

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % (total || 1));
    }, [total]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + (total || 1)) % (total || 1));
    }, [total]);

    // Auto-rotation
    useEffect(() => {
        if (total <= 1 || isPaused) return;

        timerRef.current = setInterval(() => {
            handleNext();
        }, ROTATION_INTERVAL);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [total, isPaused, handleNext, activeIndex]);

    const current = testimonials[activeIndex] || testimonials[0] || FALLBACK_TESTIMONIALS[0];

    const getAvatarSrc = (item, fallbackIdx) => {
        if (item?.avatar) {
            return imageUrl(item.avatar);
        }
        return FALLBACK_TESTIMONIALS[fallbackIdx % FALLBACK_TESTIMONIALS.length].avatar;
    };

    // Double the array for seamless infinite marquee loop
    const marqueeList = total > 0 ? [...testimonials, ...testimonials] : [...FALLBACK_TESTIMONIALS, ...FALLBACK_TESTIMONIALS];

    return (
        <section
            id="testimonials"
            className="relative py-10 sm:py-14 lg:py-16 overflow-hidden bg-[#f4f7fb] text-slate-800 transition-colors duration-500"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Ambient background glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/60 via-sky-50/40 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-100/40 via-blue-50/30 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

                {/* ── TOP SECTION HEADER (COMPACT) ───────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 lg:mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-5 h-[2px] bg-blue-600 rounded-full" />
                            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-blue-600 font-mono">
                                CLIENT REVIEWS
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-[1.15]">
                            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Businesses Like Yours</span>
                        </h2>

                        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                            Real feedback from our valued clients who are growing their businesses with our solutions.
                        </p>
                    </div>

                    {/* Navigation Arrows & Counter */}
                    <div className="flex items-center gap-3 self-start sm:self-end shrink-0">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous review"
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next review"
                            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-1.5 pl-1">
                            <span className="w-5 h-[2px] bg-blue-600 rounded-full" />
                            <span className="text-xs font-bold font-mono text-slate-700">
                                {String(activeIndex + 1).padStart(2, '0')} / {String(total || 5).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════
                    MOBILE VIEW (< lg)
                    - Compact client photo at the TOP
                    - Speech review card directly below
                    - Horizontal auto-scrolling mini cards strip at bottom (~3 visible)
                    - Fits fully in mobile viewport height!
                   ══════════════════════════════════════════════════════ */}
                <div className="block lg:hidden mb-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current?.id || activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center"
                        >
                            {/* Small client avatar photo placed above the card */}
                            <div className="relative mb-3 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-md ring-4 ring-white">
                                    <img
                                        src={getAvatarSrc(current, activeIndex)}
                                        alt={current?.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold shadow-sm">
                                    ★ 5.0
                                </span>
                            </div>

                            {/* Mobile Review Speech Card */}
                            <div className="w-full rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 text-center">
                                {/* Stars */}
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < (current?.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-4 line-clamp-3">
                                    "{current?.testimonial}"
                                </p>

                                {/* Client details */}
                                <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
                                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                                        {current?.name}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-medium">
                                        {current?.position}{current?.company ? `, ${current.company}` : ''}
                                    </p>
                                    {current?.growth_stat && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold mt-2">
                                            🚀 {current.growth_stat}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ══════════════════════════════════════════════════════
                    DESKTOP VIEW (lg:)
                    - Compact Speech Card (7 cols) + Portrait (5 cols)
                    - Scaled to fit 1280x720 screens comfortably without scrolling
                   ══════════════════════════════════════════════════════ */}
                <div className="hidden lg:grid grid-cols-12 gap-8 items-center mb-8">

                    {/* Speech Bubble Card (7 cols) */}
                    <div className="col-span-7">
                        <div className="relative rounded-3xl bg-white p-6 lg:p-8 shadow-[0_15px_40px_rgba(15,23,42,0.06)] border border-slate-100">

                            {/* Arrow Tail */}
                            <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-t border-r border-slate-100 rotate-45" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current?.id || activeIndex}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Stars & Big Quote Icon */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < (current?.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>

                                    {/* Quote Text */}
                                    <p className="text-sm lg:text-base text-slate-700 leading-relaxed font-normal mb-5 line-clamp-4">
                                        "{current?.testimonial}"
                                    </p>

                                    {/* Divider & Author Meta */}
                                    <div className="border-t border-slate-100 pt-4">
                                        <div className="flex items-center justify-between gap-4">
                                            {/* Company Info */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                                                    {current?.company_logo ? (
                                                        <img
                                                            src={imageUrl(current.company_logo)}
                                                            alt={current.company}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M2 12h20" />
                                                            <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                                                            <path d="m4 8 16-4" />
                                                            <path d="m4 4 16 4" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                                        {current?.company || 'Enterprise Client'}
                                                    </h4>
                                                    <p className="text-[10px] text-slate-500 font-medium">
                                                        Verified Business Client
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Name & Title */}
                                            <div className="border-l border-slate-100 pl-4 text-right sm:text-left">
                                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                                    {current?.name}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 font-medium">
                                                    {current?.position}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Social Links & Phone */}
                                        <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                                </span>
                                                <span className="w-6 h-6 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-sm">
                                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                                </span>
                                                <span className="w-6 h-6 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-sm">
                                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" /></svg>
                                                </span>
                                            </div>

                                            {current?.phone && (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 font-mono">
                                                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span>{current.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Portrait Frame (5 cols) */}
                    <div className="col-span-5 relative flex justify-center">
                        <div className="relative w-full max-w-[280px] lg:max-w-[300px]">
                            {/* Floating Badge 1 (Top Right) */}
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-3 -right-3 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white shadow-md text-xs font-bold"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                                <span>Growth Partner</span>
                            </motion.div>

                            {/* Main Portrait Box */}
                            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/20 via-sky-400/10 to-indigo-500/20 p-2 border border-white/80 shadow-xl">
                                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-inner">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={current?.id || activeIndex}
                                            src={getAvatarSrc(current, activeIndex)}
                                            alt={current?.name}
                                            initial={{ opacity: 0, scale: 1.04 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.35 }}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </AnimatePresence>
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Floating Badge 2 (Bottom Right) */}
                            <motion.div
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -bottom-3 -right-3 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-slate-100 shadow-md text-slate-800"
                            >
                                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                        <polyline points="17 6 23 6 23 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h5 className="text-xs font-black text-slate-900 leading-none">
                                        {current?.growth_stat || '50% Faster'}
                                    </h5>
                                    <p className="text-[9px] text-slate-500 font-semibold mt-0.5">
                                        Business Productivity
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>

                {/* ══════════════════════════════════════════════════════
                    SINGLE ROW HORIZONTAL AUTO-SCROLLING STRIP
                    - 5 visible on desktop, ~3 visible on mobile
                    - NEVER wraps downwards into multiple rows!
                    - Auto-scrolls smoothly; hover/click pauses to select
                   ══════════════════════════════════════════════════════ */}
                <div className="relative w-full overflow-hidden pt-2">
                    {/* Edge fade masks for smooth visual transition */}
                    <div className="absolute left-0 inset-y-0 w-8 sm:w-12 bg-gradient-to-r from-[#f4f7fb] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 inset-y-0 w-8 sm:w-12 bg-gradient-to-l from-[#f4f7fb] to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-2.5 sm:gap-3.5 w-max py-2"
                        animate={{
                            x: isPaused ? 0 : [0, -1400]
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: Math.max(25, marqueeList.length * 3),
                                ease: 'linear'
                            }
                        }}
                    >
                        {marqueeList.map((item, idx) => {
                            const realIdx = idx % total;
                            const isActive = realIdx === activeIndex;

                            return (
                                <button
                                    key={`${item.id || realIdx}-${idx}`}
                                    type="button"
                                    onClick={() => setActiveIndex(realIdx)}
                                    className={`relative text-left p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2.5 shrink-0 ${
                                        /* Width: ~220px on desktop (5 fit in 1200px), ~160px on mobile (3 visible) */
                                        'w-[155px] sm:w-[210px] lg:w-[225px]'
                                    } ${
                                        isActive
                                            ? 'bg-white shadow-md border-2 border-blue-600 ring-1 ring-blue-500/20 scale-[1.02]'
                                            : 'bg-white/70 hover:bg-white border border-slate-200/80 text-slate-600'
                                    }`}
                                >
                                    <img
                                        src={getAvatarSrc(item, realIdx)}
                                        alt={item.name}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 border transition-colors ${
                                            isActive ? 'border-blue-500 shadow-sm' : 'border-slate-200'
                                        }`}
                                    />

                                    <div className="min-w-0 flex-1">
                                        <h5 className={`text-[11px] sm:text-xs font-bold truncate leading-tight ${
                                            isActive ? 'text-slate-900' : 'text-slate-800'
                                        }`}>
                                            {item.name}
                                        </h5>
                                        <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                            {item.position || 'Client'}
                                        </p>
                                        <p className="text-[9px] text-slate-400 truncate">
                                            {item.company}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
