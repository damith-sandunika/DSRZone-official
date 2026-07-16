import React from 'react';
import { motion } from 'framer-motion';

// ── Replace this path with your actual hero image ──────────────────────────
const HERO_IMAGE = '/images/DamithSandunika.png';
// ──────────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
});

function GoldenHero() {
    return (
        <section
            id="home"
            className="relative min-h-screen text-white overflow-hidden flex flex-col lg:flex-row lg:justify-between px-6 sm:px-10 lg:px-16 pt-24 lg:pt-0 pb-0"
        >
            {/* ── Backgrounds ─────────────────────────────── */}
            {/* Desktop Background */}
            <motion.div
                className="absolute inset-0 bg-cover bg-top bg-no-repeat pointer-events-none hidden md:block"
                style={{ backgroundImage: "url('/images/hero backgroudnd.png')" }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
            />
            {/* Mobile Background */}
            <motion.div
                className="absolute inset-0 bg-cover bg-top bg-no-repeat pointer-events-none md:hidden"
                style={{ backgroundImage: "url('/images/hero backgroudn mobile.png')" }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
            />
            {/* Beautiful Gradient Shade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c12]/70 via-[#0a0c12]/85 to-[#0a0c12] pointer-events-none" />

            {/* Subtle blue grid */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Glow blobs */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

            {/* ── Left: Text (Title & Desc) ──────────────────────────────── */}
            <div className="relative z-10 order-1 flex-1 flex flex-col items-center lg:items-start text-center lg:text-left justify-center lg:max-w-[50%] pt-10 lg:pt-0">

                <motion.h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
                    {...fadeUp(0.1)}
                >
                    <span className="text-white">Smart Solutions.</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600">
                        Infinite Possibilities.
                    </span>
                </motion.h1>

                <motion.p
                    className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed max-w-md"
                    {...fadeUp(0.2)}
                >
                    We are a creative tech agency specializing in modern web platforms, mobile applications, and high-end graphic design for ambitious brands.
                </motion.p>

                {/* Desktop Stats & Buttons (Hidden on mobile) */}
                <div className="hidden lg:block">
                    <motion.div
                        className="mt-8 grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-md"
                        {...fadeUp(0.3)}
                    >
                        {[
                            { value: '25+', label: 'Projects Delivered' },
                            { value: '3+', label: 'Years Experience' },
                            { value: '99%', label: 'Client Satisfaction' },
                        ].map((s) => (
                            <div key={s.label} className="flex flex-col items-center sm:items-start p-3 sm:p-4 rounded-xl bg-blue-900/20 border border-blue-500/10 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-lg shadow-black/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-sm">{s.value}</p>
                                <p className="text-[8px] sm:text-[9px] text-blue-300/80 mt-1 uppercase tracking-widest font-bold text-center sm:text-left">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div className="mt-8 flex flex-wrap gap-4" {...fadeUp(0.4)}>
                        <a
                            href="#products"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 shadow-lg shadow-blue-700/30 hover:shadow-blue-600/40 transition-all"
                        >
                            View Products
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-500/50 text-blue-400 font-semibold text-sm px-6 py-3 hover:bg-blue-500/10 hover:border-blue-400 transition-all"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* ── Right: Hero Image ───────────────────────── */}
            <motion.div
                className="relative z-10 order-2 flex-1 flex items-end justify-center lg:justify-end self-end w-full lg:w-1/2 pt-10 lg:pt-0"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
                {/* The Image Container aligned to bottom */}
                <div className="relative w-full max-w-[450px] lg:max-w-[650px] z-10 flex items-end justify-center lg:justify-end">
                    
                    {/* Gold shine behind the person */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] lg:w-[450px] lg:h-[500px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(234,179,8,0.3) 0%, transparent 65%)',
                            filter: 'blur(50px)',
                            zIndex: 0
                        }}
                    />

                    <motion.img
                        src={HERO_IMAGE}
                        alt="Damith Sandunika — Digital Systems"
                        className="w-full object-contain object-bottom"
                        style={{
                            maxHeight: '90vh',
                            /* Mask to make the bottom fade out smoothly (transparent bottom) */
                            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                        }}
                        animate={{ 
                            opacity: [0.7, 0.95, 0.7],
                            filter: [
                                'brightness(1) drop-shadow(0 0 0px rgba(56,189,248,0))', 
                                'brightness(1.15) drop-shadow(0 0 25px rgba(56,189,248,0.5))', 
                                'brightness(1) drop-shadow(0 0 0px rgba(56,189,248,0))'
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                {/* Floating badge – top-right */}
                <motion.div
                    className="absolute top-1/4 lg:top-1/3 right-0 lg:-right-4 bg-[#0f1828]/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl px-4 py-3 shadow-xl z-20"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider">Live Systems</p>
                    <p className="text-white font-bold text-sm lg:text-lg mt-0.5">50+ Clients</p>
                </motion.div>

                {/* Floating badge – bottom-left */}
                <motion.div
                    className="absolute bottom-1/4 lg:bottom-1/4 left-0 lg:left-10 bg-[#0f1828]/90 backdrop-blur-xl border border-green-500/20 rounded-2xl px-4 py-3 shadow-xl z-20"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <p className="text-green-400 text-[10px] lg:text-xs font-semibold">All Systems Online</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Mobile Stats & Buttons (Hidden on desktop) */}
            <div className="relative z-10 order-3 block lg:hidden w-full pb-10">
                <motion.div
                    className="mt-6 grid grid-cols-3 gap-3 w-full"
                    {...fadeUp(0.3)}
                >
                    {[
                        { value: '25+', label: 'Projects Delivered' },
                        { value: '3+', label: 'Years Experience' },
                        { value: '99%', label: 'Client Satisfaction' },
                    ].map((s) => (
                        <div key={s.label} className="flex flex-col items-center p-3 rounded-xl bg-blue-900/20 border border-blue-500/10 backdrop-blur-md relative overflow-hidden shadow-lg shadow-black/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 transition-opacity" />
                            <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-sm">{s.value}</p>
                            <p className="text-[8px] text-blue-300/80 mt-1 uppercase tracking-widest font-bold text-center">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                <motion.div className="mt-6 flex flex-wrap justify-center gap-4" {...fadeUp(0.4)}>
                    <a
                        href="#products"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 shadow-lg shadow-blue-700/30 transition-all"
                    >
                        View Products
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-500/50 text-blue-400 font-semibold text-sm px-6 py-3 transition-all"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default GoldenHero;
