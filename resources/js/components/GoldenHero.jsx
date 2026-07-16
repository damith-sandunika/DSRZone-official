import React from 'react';
import { motion } from 'framer-motion';

// ── Replace this path with your actual hero image ──────────────────────────
const HERO_IMAGE = '/images/hero.png';
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
            className="relative min-h-screen text-white overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-16 lg:gap-y-0 px-6 sm:px-10 lg:px-16 pt-28 pb-16 lg:pt-0 lg:pb-0"
        >
            {/* ── Backgrounds ─────────────────────────────── */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: 'url(/images/3.jpg)' }}
                aria-hidden
            />
            <div className="absolute inset-0 bg-[#0a0c12]/88 pointer-events-none" />

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
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[80px] pointer-events-none" />

            {/* ── Left: Text ──────────────────────────────── */}
            <div className="relative z-10 order-2 lg:order-1 flex-1 flex flex-col justify-center lg:max-w-[52%]">
                <motion.p
                    className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400/90 mb-4"
                    {...fadeUp(0)}
                >
                    DSRZone.com
                </motion.p>

                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
                    {...fadeUp(0.1)}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600">
                        Digital Systems
                    </span>
                    <br />
                    <span className="text-white">That Scale</span>
                </motion.h1>

                <motion.p
                    className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg"
                    {...fadeUp(0.2)}
                >
                    We build and integrate software systems for menus, inventory,
                    booking, and operations — so your business runs smoother.
                </motion.p>

                {/* Stats row */}
                <motion.div
                    className="mt-10 flex flex-wrap gap-8"
                    {...fadeUp(0.3)}
                >
                    {[
                        { value: '50+', label: 'Projects Delivered' },
                        { value: '5+', label: 'Years Experience' },
                        { value: '100%', label: 'Client Satisfaction' },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-3xl font-bold text-white">{s.value}</p>
                            <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wider">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                <motion.div className="mt-10 flex flex-wrap gap-4" {...fadeUp(0.4)}>
                    <a
                        href="#products"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 shadow-lg shadow-blue-700/30 hover:shadow-blue-600/40 transition-all"
                    >
                        View Products
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-500/50 text-blue-400 font-semibold px-7 py-3.5 hover:bg-blue-500/10 hover:border-blue-400 transition-all"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>

            {/* ── Right: Hero Image ───────────────────────── */}
            <motion.div
                className="relative z-10 order-1 lg:order-2 flex-1 flex items-center justify-center lg:justify-end"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
                {/* Glow ring behind image */}
                <div
                    className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
                        filter: 'blur(30px)',
                    }}
                />

                {/* Image frame */}
                <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-3xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-900/30">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500/60 rounded-tl-3xl z-10" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500/60 rounded-br-3xl z-10" />

                    <img
                        src={HERO_IMAGE}
                        alt="DSRZone — Digital Systems"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />

                    {/* Fallback placeholder shown when image missing */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1628] to-[#0a0c12] gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                            <img src="/images/logo.png" alt="DSRZone" className="w-16 h-16 object-contain opacity-80" />
                        </div>
                        <p className="text-blue-400/60 text-sm font-medium">Add hero.png to /public/images/</p>
                    </div>
                </div>

                {/* Floating badge – top-right */}
                <motion.div
                    className="absolute top-8 right-4 lg:right-0 bg-[#0f1828]/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl px-4 py-3 shadow-xl"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Live Systems</p>
                    <p className="text-white font-bold text-lg mt-0.5">50+ Clients</p>
                </motion.div>

                {/* Floating badge – bottom-left */}
                <motion.div
                    className="absolute bottom-8 left-4 lg:left-0 bg-[#0f1828]/90 backdrop-blur-xl border border-green-500/20 rounded-2xl px-4 py-3 shadow-xl"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <p className="text-green-400 text-xs font-semibold">All Systems Online</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default GoldenHero;
