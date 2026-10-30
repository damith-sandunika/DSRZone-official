import React from 'react';
import { motion } from 'framer-motion';

function About() {
    const stats = [
        {
            value: '5+',
            label: 'Years Experience',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            )
        },
        {
            value: '24/7',
            label: 'Active Tech Support',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
                </svg>
            )
        },
        {
            value: '15+',
            label: 'Modern Tech Stacks',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                </svg>
            )
        },
        {
            value: '100%',
            label: 'Custom Architecture',
            icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
    ];

    return (
        <section id="about" className="relative w-full overflow-hidden bg-white text-slate-800">

            {/* ── ENHANCED AMBIENT GEOMETRIC BACKGROUND & FLOATING SHAPES ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">

                {/* 1. Soft Ambient Sky & Blue Radial Glows */}
                <div
                    className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/60 via-sky-100/40 to-transparent rounded-full blur-3xl"
                />
                <div
                    className="absolute -bottom-24 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-cyan-100/50 via-blue-50/30 to-transparent rounded-full blur-3xl"
                />
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-2xl"
                />

                {/* 2. Floating Concentric Circles (Top Left) */}
                <div className="absolute -top-10 -left-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-blue-400/20 border-dashed animate-[spin_120s_linear_infinite]" />
                <div className="absolute top-8 left-8 w-20 h-20 rounded-full border border-sky-400/25" />

                {/* 3. Dot Matrix Pattern (Left Side) */}
                <div className="absolute top-1/4 left-4 sm:left-10 grid grid-cols-4 gap-2.5 opacity-25">
                    {[...Array(16)].map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    ))}
                </div>

                {/* 4. Floating Rotated Diamonds & Rectangles (Right Side) */}
                <div className="absolute top-16 right-6 sm:right-16 w-12 h-12 rounded-xl border-2 border-blue-400/25 rotate-45" />
                <div className="absolute top-36 right-20 sm:right-32 w-6 h-6 rounded-lg border border-cyan-500/30 rotate-12" />

                {/* 5. Angled Pill Accent Streaks */}
                <div className="absolute bottom-28 left-6 sm:left-14 w-28 h-2 rounded-full bg-gradient-to-r from-blue-500/20 to-transparent -rotate-45" />
                <div className="absolute top-24 right-1/4 w-24 h-1.5 rounded-full bg-gradient-to-r from-sky-400/25 to-transparent rotate-12" />

                {/* 6. Subtle Cyber Tech Crosshairs (+) */}
                <span className="absolute top-20 left-1/3 text-blue-400/35 font-mono text-xl font-light">+</span>
                <span className="absolute bottom-32 left-1/4 text-sky-400/30 font-mono text-lg font-light">+</span>
                <span className="absolute top-40 right-1/3 text-blue-500/30 font-mono text-xl font-light">+</span>
                <span className="absolute bottom-20 right-1/4 text-cyan-400/35 font-mono text-lg font-light">+</span>

                {/* 7. Corner Architectural L-Brackets */}
                <svg className="absolute bottom-12 right-8 sm:right-14 w-7 h-7 text-blue-400/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 14v5a1 1 0 01-1 1h-5" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="absolute top-10 left-1/2 w-6 h-6 text-sky-400/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 10V5a1 1 0 011-1h5" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-0">

                {/* ════════════════════════════════════════════════════════════
                    MOBILE & TABLET VIEW (< lg)
                    Order:
                    1. Centered Header: ABOUT US / Turning Ideas Into Real Solutions
                    2. Centered Founder Portrait in Architectural Arch
                    3. Under Image: Centered Bio, Founder & CEO DSRZone, Button
                    4. Centered Stats Box
                   ════════════════════════════════════════════════════════════ */}
                <div className="flex flex-col lg:hidden items-center text-center">

                    {/* 1. Header (Centered with Subtitle Description matching other sections) */}
                    <div className="text-center mb-8 max-w-xl mx-auto">
                        <div className="inline-flex items-center justify-center gap-2 mb-2.5">
                            <span className="w-6 h-[2px] bg-[#0062fe] rounded-full" />
                            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#0062fe] font-mono">
                                ABOUT US
                            </span>
                            <span className="w-6 h-[2px] bg-[#0062fe] rounded-full" />
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.15]">
                            Architects Of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">Digital Innovation</span>
                        </h2>

                        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                            Passionate engineers and designers dedicated to building high-performance digital platforms and custom software that drive business growth.
                        </p>
                    </div>

                    {/* 2. Founder Photo inside Architectural Arch (Enlarged for Mobile View) */}
                    <div className="relative w-full max-w-[345px] sm:max-w-[395px] flex items-end justify-center pt-14 sm:pt-16 mb-7">
                        {/* Architectural Window Arch Backdrop */}
                        <div className="absolute inset-x-5 sm:inset-x-7 bottom-0 top-12 sm:top-14 rounded-t-[125px] rounded-b-[32px] overflow-hidden border-2 border-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                            <img
                                src="/images/dsrzone-founder-office-workspace.jpg"
                                alt="DSRZone Modern Tech Office Workspace"
                                title="DSRZone Office Headquarters"
                                className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-105 contrast-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-white/45 to-sky-100/40" />
                        </div>

                        {/* Founder Photo - Head and shoulders rise ABOVE the top of the background arch! */}
                        <img
                            src="/images/dsrzone-founder-damith-sandunika.png"
                            alt="Damith Sandunika – Founder & Lead Software Architect at DSRZone"
                            title="Damith Sandunika – Founder of DSRZone"
                            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.28)] select-none -mb-1 transform scale-[1.03] transition-transform duration-300"
                        />
                    </div>

                    {/* 3. Under Image Content (Bio, Title, CTA Button - All Centered) */}
                    <div className="w-full max-w-lg mx-auto text-center mb-10">
                        {/* Bio Description */}
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal px-2">
                            Hi, I'm Damith Sandunika, the founder of DSRZone. We are a software development company focused on building modern web platforms, digital systems and custom software solutions that help businesses grow, work smarter and achieve more.
                        </p>

                        {/* Founder & CEO Designation & Signature */}
                        <div className="flex flex-col items-center justify-center mb-6">
                            <div className="font-['Caveat',cursive] text-3xl sm:text-4xl text-slate-900 font-bold select-none tracking-wide -rotate-2">
                                Damith Sandunika
                            </div>
                            <div className="mt-1">
                                <p className="text-xs font-bold text-slate-800">Founder & CEO</p>
                                <p className="text-[11px] font-semibold text-slate-500">DSRZone</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0062fe] hover:bg-[#0051d4] text-white font-bold text-sm shadow-[0_10px_25px_rgba(0,98,254,0.35)] hover:shadow-[0_14px_30px_rgba(0,98,254,0.5)] active:scale-95 transition-all group"
                            >
                                <span>More About Us</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* 4. Stats Box on Deep Blue (Centered on Mobile) */}
                    <div className="w-full max-w-lg bg-gradient-to-b from-[#003da6] via-[#002b80] to-[#00174e] rounded-3xl p-6 sm:p-8 text-white shadow-xl text-left">
                        <div className="space-y-6">
                            {stats.map((s, idx) => (
                                <div
                                    key={s.label}
                                    className={`flex items-center gap-4 ${idx < stats.length - 1 ? 'pb-5 border-b border-white/10' : ''
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0055ff] to-[#38bdf8] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,85,255,0.45)] ring-1 ring-white/20 shrink-0">
                                        {s.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black tracking-tight leading-tight text-white font-mono">
                                            {s.value}
                                        </span>
                                        <span className="text-xs font-medium text-blue-100/90 leading-snug mt-0.5">
                                            {s.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ════════════════════════════════════════════════════════════
                    DESKTOP VIEW (lg:)
                    Architectural 12-Column Layout matching Mockup
                    - 5 cols: Left text, bio, signature, CTA
                    - 4 cols: Center window arch with cutout photo
                    - 3 cols: Right deep-blue stats bar
                   ════════════════════════════════════════════════════════════ */}
                <div className="hidden lg:grid grid-cols-12 gap-0 items-stretch min-h-[640px]">

                    {/* Desktop Left Column (5 Cols) */}
                    <div className="col-span-5 flex flex-col justify-center py-16 pr-6 z-20 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-6 h-[2px] bg-[#0062fe] rounded-full" />
                                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#0062fe] font-mono">
                                    ABOUT US
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-[1.12] mb-5">
                                Architects Of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">Digital <br />Innovation</span>
                            </h2>

                            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-md font-normal">
                                Hi, I'm Damith Sandunika, the founder of DSRZone. We are a software development company focused on building modern web platforms, digital systems and custom software solutions that help businesses grow, work smarter and achieve more.
                            </p>

                            <div className="flex items-center justify-between max-w-md mb-8">
                                <div className="text-left">
                                    <div className="font-['Caveat',cursive] text-4xl text-slate-900 font-bold select-none tracking-wide -rotate-2">
                                        Damith Sandunika
                                    </div>
                                    <div className="mt-1">
                                        <p className="text-xs font-bold text-slate-800">Founder & CEO</p>
                                        <p className="text-[11px] font-semibold text-slate-500">DSRZone</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-1.5 opacity-40 select-none pb-2">
                                    {[...Array(16)].map((_, i) => (
                                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0062fe] hover:bg-[#0051d4] text-white font-bold text-sm shadow-[0_10px_25px_rgba(0,98,254,0.35)] hover:shadow-[0_14px_30px_rgba(0,98,254,0.5)] hover:-translate-y-0.5 transition-all group"
                                >
                                    <span>More About Us</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Center Column: Founder Cutout Photo in Architectural Arch (4 Cols) */}
                    <div className="col-span-4 relative flex items-end justify-center self-end">
                        <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-[140px] rounded-b-[40px] overflow-hidden border-2 border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                            <img
                                src="/images/dsrzone-founder-office-workspace.jpg"
                                alt="DSRZone Modern Tech Office Workspace"
                                title="DSRZone Headquarters"
                                className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-105 contrast-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-white/45 to-sky-100/40" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full flex justify-center -mb-1"
                        >
                            <img
                                src="/images/dsrzone-founder-damith-sandunika.png"
                                alt="Damith Sandunika – Founder & Lead Software Architect at DSRZone"
                                title="Damith Sandunika | DSRZone Founder"
                                className="w-full max-w-[420px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] select-none"
                            />
                        </motion.div>
                    </div>

                    {/* Right Column: 4 Stats on Deep Blue Gradient (3 Cols) */}
                    <div className="col-span-3 relative flex flex-col justify-center bg-gradient-to-b from-[#003da6] via-[#002b80] to-[#00174e] -mr-8 px-8 py-16 text-white">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                            {stats.map((s, idx) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, x: 25 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className={`flex items-center gap-4 ${idx < stats.length - 1 ? 'pb-7 border-b border-white/10' : ''
                                        }`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0055ff] to-[#38bdf8] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,85,255,0.45)] ring-1 ring-white/20 shrink-0">
                                        {s.icon}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[32px] font-black tracking-tight leading-tight text-white font-mono">
                                            {s.value}
                                        </span>
                                        <span className="text-sm font-medium text-blue-100/90 leading-snug mt-0.5">
                                            {s.label}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default About;
