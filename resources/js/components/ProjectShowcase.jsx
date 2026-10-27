import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CAPABILITIES = [
    {
        id: 'crm',
        title: 'Customer Management',
        desc: 'Unified client profiles, history & loyalty tracking',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        color: 'from-blue-500/20 to-sky-400/20',
        badgeBg: 'bg-blue-50 text-blue-600',
    },
    {
        id: 'orders',
        title: 'Order Management',
        desc: 'Real-time booking, order routing & status pipelines',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        color: 'from-sky-500/20 to-cyan-400/20',
        badgeBg: 'bg-sky-50 text-sky-600',
    },
    {
        id: 'billing',
        title: 'Billing & Payments',
        desc: 'Automated invoices, POS gateways & digital receipts',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        color: 'from-indigo-500/20 to-blue-400/20',
        badgeBg: 'bg-indigo-50 text-indigo-600',
    },
    {
        id: 'inventory',
        title: 'Inventory Control',
        desc: 'Stock depletion alerts & supplier purchase orders',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
        color: 'from-cyan-500/20 to-teal-400/20',
        badgeBg: 'bg-cyan-50 text-cyan-600',
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp Automation',
        desc: 'Instant order confirmations, updates & notifications',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
        ),
        color: 'from-emerald-500/20 to-teal-400/20',
        badgeBg: 'bg-emerald-50 text-emerald-600',
    },
    {
        id: 'analytics',
        title: 'Reports & Analytics',
        desc: 'Real-time KPIs, profit margins & revenue insights',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        color: 'from-blue-600/20 to-indigo-500/20',
        badgeBg: 'bg-blue-50 text-blue-600',
    },
];

export default function ProjectShowcase() {
    const [isPaused, setIsPaused] = useState(false);
    const [activeBadge, setActiveBadge] = useState(null);

    return (
        <section
            id="ecosystem"
            className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f8fafc] via-[#edf3fa] to-[#e4eef9] text-slate-900 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Ambient background architectural arcs / glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[800px] sm:h-[1100px] rounded-full border border-blue-200/40 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full border border-sky-300/30 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">

                {/* ── SECTION HEADER ───────────────────────────────── */}
                <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/80 mb-3 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-blue-700 font-mono">
                            ENTERPRISE PLATFORMS
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                        All-in-One <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">Business Systems</span>
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        Complete custom software solutions to manage and scale your enterprise with modern cloud architecture, intuitive mobile portals, and smart automation.
                    </p>
                </div>

                {/* ── 3D STAGE & ROTATING ORBITING ICONS CONTAINER ── */}
                <div className="relative w-full max-w-4xl flex items-center justify-center my-2 sm:my-4">

                    {/* Central 3D Stage Visual (Laptop + Mobile on Circular Podium with Indoor Plants) */}
                    <div className="relative w-full aspect-[16/9] max-w-[860px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(30,58,138,0.12)] border border-white/80 bg-white">
                        <img
                            src="/images/platform_showcase_stage.jpg"
                            alt="DSRZone Enterprise Platform"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-white/10 pointer-events-none" />
                    </div>

                    {/* ══════════════════════════════════════════════════
                        DYNAMIC ORBITING / ROTATING ICONS
                        - 6 capability badges orbiting around the laptop!
                        - Parent container rotates 360deg
                        - Child counter-rotates -360deg to remain upright
                       ══════════════════════════════════════════════════ */}
                    <motion.div
                        className="absolute inset-0 m-auto pointer-events-none z-20 flex items-center justify-center"
                        animate={{
                            rotate: isPaused ? 0 : 360,
                        }}
                        transition={{
                            rotate: {
                                repeat: Infinity,
                                duration: 32,
                                ease: 'linear',
                            },
                        }}
                    >
                        {CAPABILITIES.map((cap, idx) => {
                            const total = CAPABILITIES.length;
                            const angle = (idx * (360 / total)) * (Math.PI / 180);

                            // Elliptical orbit radii (responsive for mobile vs desktop)
                            // Desktop: rx ~360px, ry ~190px | Mobile: rx ~160px, ry ~100px
                            return (
                                <div
                                    key={cap.id}
                                    className="absolute pointer-events-auto"
                                    style={{
                                        transform: `translate(calc(cos(${idx * (360 / total)}deg) * clamp(140px, 32vw, 360px)), calc(sin(${idx * (360 / total)}deg) * clamp(80px, 18vw, 190px)))`,
                                    }}
                                >
                                    {/* Counter-rotate so badge text remains perfectly upright! */}
                                    <motion.div
                                        animate={{
                                            rotate: isPaused ? 0 : -360,
                                        }}
                                        transition={{
                                            rotate: {
                                                repeat: Infinity,
                                                duration: 32,
                                                ease: 'linear',
                                            },
                                        }}
                                        whileHover={{ scale: 1.12 }}
                                        onClick={() => setActiveBadge(activeBadge === cap.id ? null : cap.id)}
                                        className="group relative cursor-pointer"
                                    >
                                        {/* Cloud Badge Container */}
                                        <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_25px_rgba(30,58,138,0.14)] hover:shadow-[0_12px_30px_rgba(2,132,199,0.22)] transition-all">
                                            {/* Icon circle */}
                                            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-50 to-sky-100 flex items-center justify-center shadow-xs border border-blue-100/80">
                                                {cap.icon}
                                            </div>

                                            {/* Title */}
                                            <span className="mt-1 text-[10px] sm:text-xs font-bold text-slate-800 tracking-tight whitespace-nowrap px-1 max-w-[100px] sm:max-w-none truncate sm:whitespace-normal text-center leading-tight">
                                                {cap.title}
                                            </span>
                                        </div>

                                        {/* Hover Tooltip / Detail Card */}
                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 w-44 sm:w-48 p-2.5 rounded-xl bg-slate-900 text-white text-center shadow-xl border border-slate-700">
                                            <h5 className="text-xs font-bold text-sky-400">{cap.title}</h5>
                                            <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">{cap.desc}</p>
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-slate-900 rotate-45" />
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>

                </div>

                {/* ── BOTTOM CTA ACTION BUTTONS ────────────────────── */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 z-20">
                    <a
                        href="#contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all"
                    >
                        <span>Request Custom Demo</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <a
                        href="#products"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
                    >
                        <span>Explore Our Products</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>

            </div>
        </section>
    );
}
