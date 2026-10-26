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
    const ROTATION_INTERVAL = 5500; // 5.5 seconds

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

    // Navigation callbacks
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

    // Determine avatar source
    const getAvatarSrc = (item, fallbackIdx) => {
        if (item?.avatar) {
            return imageUrl(item.avatar);
        }
        return FALLBACK_TESTIMONIALS[fallbackIdx % FALLBACK_TESTIMONIALS.length].avatar;
    };

    return (
        <section
            id="testimonials"
            className="relative py-20 lg:py-28 overflow-hidden bg-[#f4f7fb] text-slate-800 transition-colors duration-500"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Ambient background glows & organic shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/60 via-sky-50/40 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-20 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-indigo-100/40 via-blue-50/30 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

                {/* ── TOP SECTION HEADER ───────────────────────── */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2.5 mb-3">
                            <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-blue-600 font-mono">
                                CLIENT REVIEWS
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                            Trusted by <br className="hidden sm:inline" />
                            Businesses <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Like Yours</span>
                        </h2>

                        <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
                            Real feedback from our valued clients who are growing their businesses with our solutions.
                        </p>
                    </div>

                    {/* Navigation Controls: Arrows and Slider Counter */}
                    <div className="flex items-center gap-4 self-start lg:self-end">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous review"
                            className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all duration-300"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next review"
                            className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-blue-500 text-slate-600 hover:text-blue-600 flex items-center justify-center shadow-sm hover:shadow transition-all duration-300"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Slide Counter */}
                        <div className="flex items-center gap-2 pl-2">
                            <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                            <span className="text-xs sm:text-sm font-bold font-mono text-slate-700">
                                {String(activeIndex + 1).padStart(2, '0')} / {String(total || 5).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── MAIN SPOTLIGHT: SPEECH CARD + PORTRAIT SHOWCASE ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">

                    {/* ── LEFT: SPEECH BUBBLE REVIEW CARD (7 COLS) ─ */}
                    <div className="lg:col-span-7">
                        <div className="relative rounded-[2.5rem] bg-white p-7 sm:p-10 lg:p-12 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] border border-slate-100">

                            {/* Speech Bubble Arrow Tail pointing towards the client */}
                            <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-t border-r border-slate-100 rotate-45" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current?.id || activeIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                >
                                    {/* Stars & Quotation Mark Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        {/* Golden Stars */}
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < (current?.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Big Stylized Quote Icon */}
                                        <div className="text-blue-200/90 leading-none select-none">
                                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Testimonial Quote Message */}
                                    <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal mb-8">
                                        "{current?.testimonial}"
                                    </p>

                                    {/* Divider */}
                                    <div className="border-t border-slate-100 pt-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                                            {/* Company Info / Logo */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2 shrink-0 shadow-sm">
                                                    {current?.company_logo ? (
                                                        <img
                                                            src={imageUrl(current.company_logo)}
                                                            alt={current.company}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        /* Stylized Company Emblem */
                                                        <svg className="w-7 h-7 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M2 12h20" />
                                                            <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                                                            <path d="m4 8 16-4" />
                                                            <path d="m4 4 16 4" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                                                        {current?.company || 'Enterprise Client'}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-500 font-medium">
                                                        Verified Business Client
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Client Name & Position */}
                                            <div className="sm:border-l sm:border-slate-100 sm:pl-6">
                                                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                                                    {current?.name}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                    {current?.position}
                                                    {current?.company ? `, ${current.company}` : ''}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Social Links & Telephone Number Row */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100">
                                            {/* Social Media Badges */}
                                            <div className="flex items-center gap-2">
                                                {/* Facebook */}
                                                <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                </span>
                                                {/* Instagram */}
                                                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                    </svg>
                                                </span>
                                                {/* LinkedIn */}
                                                <span className="w-7 h-7 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                    </svg>
                                                </span>
                                                {/* WhatsApp */}
                                                <span className="w-7 h-7 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                                                    </svg>
                                                </span>
                                            </div>

                                            {/* Phone / Telephone Number */}
                                            {current?.phone && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="font-mono">{current.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>

                    {/* ── RIGHT: CLIENT PORTRAIT SHOWCASE (5 COLS) ─ */}
                    <div className="lg:col-span-5 relative flex justify-center">

                        {/* Portrait Frame Container */}
                        <div className="relative w-full max-w-[360px] sm:max-w-[400px]">

                            {/* Floating Badge 1 (Top Right): Business Growth Partner */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-4 -right-2 sm:-right-4 z-30 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.4)]"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                                <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">
                                    Business Growth Partner
                                </span>
                            </motion.div>

                            {/* Main Portrait Card */}
                            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-500/20 via-sky-400/10 to-indigo-500/20 p-2 sm:p-2.5 border border-white/80 shadow-2xl backdrop-blur-md">
                                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-slate-900 shadow-inner">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={current?.id || activeIndex}
                                            src={getAvatarSrc(current, activeIndex)}
                                            alt={current?.name}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.4 }}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </AnimatePresence>

                                    {/* Bottom soft gradient shadow */}
                                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Floating Badge 2 (Bottom Right): 50% Faster Operations */}
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -bottom-4 -right-2 sm:-right-4 z-30 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_15px_30px_rgba(15,23,42,0.12)] text-slate-800"
                            >
                                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                        <polyline points="17 6 23 6 23 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h5 className="text-sm sm:text-base font-black text-slate-900 leading-none">
                                        {current?.growth_stat || '50% Faster'}
                                    </h5>
                                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                                        Business Productivity
                                    </p>
                                </div>
                            </motion.div>

                            {/* Handwritten scribble script caption */}
                            <div className="absolute -bottom-14 left-4 sm:left-8 flex items-center gap-2 select-none pointer-events-none">
                                <svg className="w-8 h-8 text-blue-500 -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                <span className="text-xl sm:text-2xl font-bold text-blue-600 font-['Caveat',cursive] drop-shadow-sm">
                                    Our Happy Client
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ── BOTTOM CLIENT STRIP: HORIZONTAL MINI CARDS (AUTO ROTATING) ── */}
                <div className="pt-6 sm:pt-10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        {testimonials.map((item, idx) => {
                            const isActive = idx === activeIndex;

                            return (
                                <button
                                    key={item.id || idx}
                                    type="button"
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative text-left p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                                        isActive
                                            ? 'bg-white shadow-[0_12px_30px_rgba(37,99,235,0.15)] border-b-2 border-blue-600 scale-[1.02]'
                                            : 'bg-white/60 hover:bg-white/90 border border-slate-200/60 text-slate-600'
                                    }`}
                                >
                                    {/* Mini Avatar */}
                                    <img
                                        src={getAvatarSrc(item, idx)}
                                        alt={item.name}
                                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 border-2 transition-colors ${
                                            isActive ? 'border-blue-500 shadow-sm' : 'border-slate-200'
                                        }`}
                                    />

                                    {/* Name & Position */}
                                    <div className="min-w-0 flex-1">
                                        <h5 className={`text-xs font-bold truncate leading-snug ${
                                            isActive ? 'text-slate-900' : 'text-slate-700'
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
