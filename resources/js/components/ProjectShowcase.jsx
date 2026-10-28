import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CAPABILITIES = [
    {
        id: 'crm',
        title: 'Customer Management',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        id: 'orders',
        title: 'Order Management',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        id: 'billing',
        title: 'Billing & Payments',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        id: 'inventory',
        title: 'Inventory Control',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp Automation',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
        ),
    },
    {
        id: 'analytics',
        title: 'Reports & Analytics',
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

const STEPS = 36;
const getOrbitKeyframes = (index, total, rx, ry) => {
    const xs = [];
    const ys = [];
    const baseAngle = (index * (360 / total)) * (Math.PI / 180);
    for (let s = 0; s <= STEPS; s++) {
        const theta = baseAngle + (s / STEPS) * 2 * Math.PI;
        xs.push(Math.cos(theta) * rx);
        ys.push(Math.sin(theta) * ry);
    }
    return { xs, ys };
};

export default function ProjectShowcase() {
    const [radius, setRadius] = useState({ rx: 460, ry: 230 });

    // Responsive ellipse dimensions: enlarged orbit for spacious, cinematic icon movement
    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w < 640) {
                // Mobile: restored width to previous size (rx: 142), increased height (ry: 102) for taller orbit
                setRadius({ rx: 142, ry: 102 });
            } else if (w < 1024) {
                // Tablet: rx: 320px, ry: 165px -> 640px x 330px
                setRadius({ rx: 320, ry: 165 });
            } else {
                // Desktop: rx: 460px, ry: 230px -> 920px x 460px
                setRadius({ rx: 460, ry: 230 });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section
            id="ecosystem"
            className="relative w-full overflow-hidden bg-white select-none"
        >
            {/* ═══════════════════════════════════════════════════════════
                FULL-WIDTH 3D STAGE BACKDROP (EDGE-TO-EDGE)
               ═══════════════════════════════════════════════════════════ */}
            <div className="relative w-full aspect-[16/12] sm:aspect-[16/9] min-h-[490px] sm:min-h-[640px] md:min-h-[740px] lg:min-h-[820px] flex flex-col justify-between items-center overflow-hidden bg-white">

                {/* 1. Mobile-Only Soft Ambient Side Glow (No sharp borders) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none sm:hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                {/* 2. The Crisp Stage Image with Exact Aspect Ratio & Direct Edge Melters */}
                <div className="absolute inset-x-0 top-[52%] -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0 w-full aspect-[1376/768] sm:h-full sm:aspect-auto pointer-events-none z-10 overflow-hidden">
                    <img
                        src="/images/dsrzone-enterprise-platform-showcase.jpg"
                        alt="DSRZone (DSR) Enterprise Business Systems – All-in-One Cloud Management Platform"
                        title="DSRZone Enterprise Platform Architecture"
                        className="w-full h-full object-cover object-center sm:object-bottom"
                    />

                    {/* Exact Top Edge Line Dissolver: Starts with pure solid white right at the top line */}
                    <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-white via-white/90 via-30% to-transparent pointer-events-none" />

                    {/* Exact Bottom Edge Line Dissolver: Starts with pure solid white right at the bottom line */}
                    <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-white via-white/90 via-30% to-transparent pointer-events-none" />
                </div>

                {/* 3. Section Global Top Shade: Smooth atmospheric fade behind headline */}
                <div className="absolute top-0 inset-x-0 h-36 sm:h-52 bg-gradient-to-b from-white via-white/80 via-40% to-transparent pointer-events-none z-20" />

                {/* 4. Section Global Bottom Shade: Smooth atmospheric fade behind buttons */}
                <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-white via-white/85 via-40% to-transparent pointer-events-none z-20" />

                {/* ── 1. TOP HEADLINE (ON TOP OF IMAGE ARCH) ─────────── */}
                <div className="relative z-30 max-w-4xl mx-auto px-4 pt-7 sm:pt-14 md:pt-16 text-center">
                    <div className="inline-flex items-center justify-center gap-2.5 mb-2.5 sm:mb-3">
                        <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                        <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-blue-600 font-mono">
                            ENTERPRISE PLATFORMS
                        </span>
                        <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                    </div>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                        All-in-One <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">Business Systems</span>
                    </h2>

                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
                        Complete custom software solutions to manage and scale your business with modern cloud technology, intuitive dashboards, and automated workflows.
                    </p>
                </div>

                {/* ── 2. ROTATING CIRCULAR ORBIT OF ICONS (LOWERED POSITION) ── */}
                <div className="absolute top-[58%] sm:top-[60%] md:top-[61%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">

                    {/* Orbit Ellipse visual dashed guide */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-blue-300/40 border-dashed pointer-events-none transition-all duration-300"
                        style={{
                            width: `${radius.rx * 2}px`,
                            height: `${radius.ry * 2}px`,
                        }}
                    />

                    {/* The 6 orbiting icons - permanently upright, continuously revolving */}
                    <div
                        className="relative pointer-events-none"
                        style={{
                            width: `${radius.rx * 2}px`,
                            height: `${radius.ry * 2}px`,
                        }}
                    >
                        {CAPABILITIES.map((cap, idx) => {
                            const { xs, ys } = getOrbitKeyframes(idx, CAPABILITIES.length, radius.rx, radius.ry);

                            return (
                                <motion.div
                                    key={`${cap.id}-${radius.rx}`}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                                    animate={{ x: xs, y: ys }}
                                    transition={{
                                        x: { duration: 28, repeat: Infinity, ease: 'linear' },
                                        y: { duration: 28, repeat: Infinity, ease: 'linear' },
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.25 }}
                                        className="group relative cursor-pointer"
                                    >
                                        {/* Pure circular icon button - 100% upright at all times! */}
                                        <div className="w-10 h-10 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_20px_rgba(30,58,138,0.18)] hover:shadow-[0_12px_28px_rgba(2,132,199,0.32)] flex items-center justify-center transition-all p-2.5">
                                            {cap.icon}
                                        </div>

                                        {/* Hover Tooltip Label */}
                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] sm:text-xs font-bold whitespace-nowrap shadow-xl">
                                            {cap.title}
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-1.5 h-1.5 bg-slate-900 rotate-45" />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>

                {/* ── 3. BOTTOM CTA BUTTONS ON PODIUM BASE (SIDE-BY-SIDE ON SINGLE LINE, PUSHED DOWN) ── */}
                <div className="relative z-30 pb-5 sm:pb-12 flex flex-row items-center justify-center gap-2 sm:gap-4 px-3 sm:px-4 w-full max-w-md mx-auto">
                    <a
                        href="#contact"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-sm font-extrabold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-center whitespace-nowrap"
                    >
                        <span>Custom Demo</span>
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <a
                        href="#products"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/95 border border-slate-200 hover:border-blue-400 text-slate-800 hover:text-blue-600 text-[11px] sm:text-sm font-bold shadow-md hover:shadow-lg transition-all text-center whitespace-nowrap"
                    >
                        <span>All Products</span>
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>

            </div>
        </section>
    );
}
