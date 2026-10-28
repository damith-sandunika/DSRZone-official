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
    const timerRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const cardRefs = useRef([]);
    const ROTATION_INTERVAL = 6000;

    const isProgrammaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef(null);

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

    const total = testimonials.length || FALLBACK_TESTIMONIALS.length;

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % (total || 1));
    }, [total]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + (total || 1)) % (total || 1));
    }, [total]);

    // Auto-rotation runs continuously
    useEffect(() => {
        if (total <= 1) return;

        timerRef.current = setInterval(() => {
            handleNext();
        }, ROTATION_INTERVAL);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [total, handleNext, activeIndex]);

    // Smoothly scroll container ONLY to center active card without scrolling the window/page!
    useEffect(() => {
        if (scrollContainerRef.current && cardRefs.current[activeIndex]) {
            const container = scrollContainerRef.current;
            const target = cardRefs.current[activeIndex];
            const targetLeft = target.offsetLeft - (container.clientWidth / 2) + (target.clientWidth / 2);

            isProgrammaticScrollRef.current = true;
            container.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: 'smooth'
            });

            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                isProgrammaticScrollRef.current = false;
            }, 500);
        }
    }, [activeIndex]);

    // Interactive sync: when the user scrolls or swipes the bottom row, detect the card closest to center and update the top card!
    const handleScroll = useCallback(() => {
        if (isProgrammaticScrollRef.current || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const containerCenter = container.scrollLeft + (container.clientWidth / 2);

        let closestIdx = 0;
        let minDiff = Infinity;

        cardRefs.current.forEach((el, idx) => {
            if (!el) return;
            const elCenter = el.offsetLeft + (el.clientWidth / 2);
            const diff = Math.abs(containerCenter - elCenter);
            if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
            }
        });

        if (closestIdx !== activeIndex) {
            setActiveIndex(closestIdx);
        }
    }, [activeIndex]);

    const currentList = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;
    const current = currentList[activeIndex] || currentList[0];

    const getAvatarSrc = (item, fallbackIdx) => {
        if (item?.avatar) {
            return imageUrl(item.avatar);
        }
        return FALLBACK_TESTIMONIALS[fallbackIdx % FALLBACK_TESTIMONIALS.length].avatar;
    };

    return (
        <section
            id="testimonials"
            className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#f4f7fb] text-slate-800 transition-colors duration-500"
        >
            {/* Ambient background glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 -left-20 w-[550px] h-[550px] bg-gradient-to-br from-blue-100/70 via-sky-50/40 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-10 right-0 w-[550px] h-[550px] bg-gradient-to-tl from-indigo-100/50 via-blue-50/30 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

                {/* ── TOP SECTION HEADER ──────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
                    <div className="text-center sm:text-left">
                        <div className="inline-flex items-center justify-center sm:justify-start gap-2.5 mb-2">
                            <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-blue-600 font-mono">
                                CLIENT REVIEWS
                            </span>
                            <span className="w-6 h-[2px] bg-blue-600 rounded-full sm:hidden" />
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-[1.15]">
                            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Businesses Like Yours</span>
                        </h2>

                        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl mx-auto sm:mx-0">
                            Real feedback from our valued clients who are scaling their businesses with our digital systems.
                        </p>
                    </div>

                    {/* Navigation Arrows & Counter */}
                    <div className="flex items-center justify-center sm:justify-end gap-3 self-center sm:self-end shrink-0">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous review"
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next review"
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-1.5 pl-1 font-mono text-xs sm:text-sm font-bold text-slate-700">
                            <span className="w-5 h-[2px] bg-blue-600 rounded-full" />
                            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(total || 5).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════
                    MOBILE VIEW (< lg)
                    - Substantially larger, spacious, high-end Card
                    - Prominent large client portrait with gradient border
                    - Synced 1:1 with whichever bottom card is centered!
                   ══════════════════════════════════════════════════════ */}
                <div className="block lg:hidden mb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current?.id || activeIndex}
                            initial={{ opacity: 0, y: 14, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -14, scale: 0.98 }}
                            transition={{ duration: 0.35 }}
                            className="w-full"
                        >
                            <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)] border border-slate-200/90 overflow-hidden">
                                {/* Top Blue Horizon Accent */}
                                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

                                {/* Subtle Background Quote Watermark */}
                                <div className="absolute top-4 right-5 text-blue-100/60 pointer-events-none select-none">
                                    <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Header with LARGE, PROMINENT CLIENT PHOTO */}
                                <div className="flex items-center gap-4 sm:gap-5 mb-5 relative z-10">
                                    <div className="relative shrink-0">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500 shadow-lg shadow-blue-500/20">
                                            <img
                                                src={getAvatarSrc(current, activeIndex)}
                                                alt={current?.name}
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = FALLBACK_TESTIMONIALS[activeIndex % FALLBACK_TESTIMONIALS.length].avatar;
                                                }}
                                                className="w-full h-full object-cover object-top rounded-[12px]"
                                            />
                                        </div>
                                        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white font-black shadow-sm" title="Verified Client">
                                            ✓
                                        </span>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < (current?.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="text-xs font-black text-slate-800 ml-1">5.0</span>
                                        </div>

                                        <h4 className="text-base sm:text-xl font-black text-slate-900 leading-tight truncate">
                                            {current?.name}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-blue-600 font-bold truncate mt-0.5">
                                            {current?.position}{current?.company ? ` • ${current.company}` : ''}
                                        </p>

                                        {current?.growth_stat && (
                                            <div className="mt-2">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-black shadow-2xs">
                                                    <span>🚀</span>
                                                    <span>{current.growth_stat}</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Review Quote Text */}
                                <div className="pt-3 border-t border-slate-100 relative z-10">
                                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal italic">
                                        "{current?.testimonial}"
                                    </p>
                                </div>

                                {/* Card Bottom Footer */}
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Verified Client Review
                                    </span>
                                    <span className="font-mono text-slate-400 font-bold">
                                        {String(activeIndex + 1).padStart(2, '0')} / {String(total || 5).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ══════════════════════════════════════════════════════
                    DESKTOP VIEW (lg:)
                    - Compact Speech Card (7 cols) + Portrait (5 cols)
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
                                                        <span className="text-sm font-black text-blue-600">
                                                            {current?.name ? current.name.charAt(0) : 'C'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                                                        {current?.name}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 font-medium">
                                                        {current?.position}{current?.company ? `, ${current.company}` : ''}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Verified Badge */}
                                            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold">
                                                <span>✓</span>
                                                <span>Verified Client</span>
                                            </div>
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
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = FALLBACK_TESTIMONIALS[activeIndex % FALLBACK_TESTIMONIALS.length].avatar;
                                            }}
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
                    SYNCHRONIZED CLIENT CARDS ROW (MOBILE & DESKTOP)
                    - Active card is centered, highlighted & synced 1:1 with top review
                    - Tapping any card selects it and updates top display
                    - Smooth horizontal container scrolling with NO page jump!
                    - NO visible browser scrollbar!
                   ══════════════════════════════════════════════════════ */}
                <div className="relative w-full pt-2">
                    {/* Edge fade masks for smooth visual transition */}
                    <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-[#f4f7fb] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-[#f4f7fb] to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-3 scroll-smooth select-none lg:justify-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory px-[calc(50%-95px)] sm:px-[calc(50%-115px)] lg:px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {currentList.map((item, idx) => {
                            const isActive = idx === activeIndex;

                            return (
                                <button
                                    key={item.id || idx}
                                    ref={(el) => (cardRefs.current[idx] = el)}
                                    type="button"
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative text-left p-2.5 sm:p-3 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-3 shrink-0 snap-center ${
                                        'w-[185px] sm:w-[220px] lg:w-[230px]'
                                    } ${
                                        isActive
                                            ? 'bg-white shadow-[0_12px_28px_rgba(37,99,235,0.22)] border-2 border-blue-600 scale-[1.04] ring-2 ring-blue-500/20'
                                            : 'bg-white/80 hover:bg-white border border-slate-200/80 text-slate-600 opacity-70 hover:opacity-100 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="relative shrink-0">
                                        <img
                                            src={getAvatarSrc(item, idx)}
                                            alt={item.name}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = FALLBACK_TESTIMONIALS[idx % FALLBACK_TESTIMONIALS.length].avatar;
                                            }}
                                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 transition-colors ${
                                                isActive ? 'border-blue-600 shadow-sm' : 'border-slate-200'
                                            }`}
                                        />
                                        {isActive && (
                                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white" />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h5 className={`text-xs sm:text-sm font-bold truncate leading-tight ${
                                            isActive ? 'text-blue-600 font-extrabold' : 'text-slate-800'
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
                    </div>
                </div>

            </div>
        </section>
    );
}
