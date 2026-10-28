import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function CallToAction() {
    return (
        <section className="relative py-10 sm:py-16 lg:py-20 bg-[#f8fbff] text-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>

                    {/* ═══════════════════════════════════════════════════════════
                        HEROIC CALL-TO-ACTION CARD (MATCHING USER REFERENCE DESIGN)
                       ═══════════════════════════════════════════════════════════ */}
                    <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#03091e] text-white shadow-2xl border border-slate-800/80">

                        {/* ─────────────────────────────────────────────────────────
                            DESKTOP BACKGROUND: ULTRA-WIDE MOUNTAIN PANORAMA
                           ───────────────────────────────────────────────────────── */}
                        <div className="hidden lg:block absolute inset-0 pointer-events-none select-none">
                            {/* Full-bleed Mountain Summit with Climber */}
                            <img
                                src="/images/dsrzone-mountain-summit-cta.png"
                                alt="DSRZone Innovation – Reaching New Summits in Technology"
                                title="Innovation Today for a Better Tomorrow | DSRZone"
                                className="absolute inset-0 w-full h-full object-cover object-[67%_center]"
                            />

                            {/* Left Smooth Dark Blue Gradient for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#03091e] via-[#03091e]/95 via-42% to-transparent" />

                            {/* Bottom-left ambient cyber glow */}
                            <div className="absolute -bottom-16 -left-16 w-[450px] h-[300px] bg-gradient-to-tr from-blue-600/30 via-cyan-500/15 to-transparent rounded-full blur-3xl" />

                            {/* Subtle Ambient Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#03091e]/40 via-transparent to-transparent" />

                            {/* Desktop Script Quote: Innovation Today for a Better Tomorrow */}
                            <div className="absolute top-12 xl:top-16 right-16 xl:right-28 text-right pointer-events-none z-20">
                                <div className="font-['Caveat',cursive] text-2xl xl:text-3xl text-white/95 font-semibold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] tracking-wide -rotate-3">
                                    Innovation<br />
                                    Today for a<br />
                                    Better Tomorrow
                                </div>
                                {/* Hand-drawn curved underline accent */}
                                <svg
                                    className="w-32 xl:w-40 h-4 text-white/80 ml-auto mt-1 transform -rotate-2 drop-shadow-md"
                                    viewBox="0 0 160 20"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M3 12 C 45 4, 115 16, 155 8"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* ─────────────────────────────────────────────────────────
                            DESKTOP CONTENT (LEFT COLUMN OVER PANORAMA)
                           ───────────────────────────────────────────────────────── */}
                        <div className="hidden lg:flex relative z-10 min-h-[480px] xl:min-h-[520px] items-center p-10 xl:p-16 max-w-2xl">
                            <div className="flex flex-col items-start text-left">

                                {/* 1. Tagline (Without '10' Badge) */}
                                <div className="inline-flex items-center gap-3 mb-5">
                                    <span className="text-xs xl:text-sm font-extrabold tracking-[0.2em] uppercase text-blue-400 font-mono">
                                        READY TO GET STARTED?
                                    </span>
                                    <span className="w-16 xl:w-24 h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-transparent rounded-full ml-1" />
                                </div>

                                {/* 2. Main Headline */}
                                <h2 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.12]">
                                    Let's Build Something <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070f3] via-[#00a6ff] to-[#38bdf8]">
                                        Great Together
                                    </span>
                                </h2>

                                {/* 3. Subtitle */}
                                <p className="mt-4 xl:mt-5 text-sm xl:text-base text-slate-300 font-normal leading-relaxed max-w-lg">
                                    From idea to launch, we'll be with you every step of the way. Turn your vision into reality with our expert team.
                                </p>

                                {/* 4. Action Buttons */}
                                <div className="flex items-center gap-4 mt-8">
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center justify-center gap-2 px-7 xl:px-8 py-3.5 xl:py-4 rounded-full bg-gradient-to-r from-[#0066fe] to-[#0088ff] hover:from-[#0052cc] hover:to-[#0077ee] text-white text-sm xl:text-base font-bold shadow-lg shadow-blue-600/35 hover:shadow-xl hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                                    >
                                        <span>Start Your Project</span>
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>

                                    <a
                                        href="#contact"
                                        className="inline-flex items-center justify-center px-7 xl:px-8 py-3.5 xl:py-4 rounded-full bg-[#07122b]/70 hover:bg-[#0c1f47] border border-white/20 hover:border-blue-400/80 text-white font-bold text-sm xl:text-base backdrop-blur-md shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
                                    >
                                        Contact Us
                                    </a>
                                </div>

                            </div>
                        </div>

                        {/* ─────────────────────────────────────────────────────────
                            MOBILE & TABLET VIEW (< lg)
                            (Matches mobile layout with side-by-side buttons on one line)
                           ───────────────────────────────────────────────────────── */}
                        <div className="flex lg:hidden flex-col">

                            {/* 1. Mobile Upper Content (Dark Blue Card Interior) */}
                            <div className="p-6 sm:p-9 flex flex-col items-start text-left">

                                {/* Tagline (Without '10' Badge) */}
                                <div className="inline-flex items-center gap-2.5 mb-3.5">
                                    <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase text-blue-400 font-mono">
                                        READY TO GET STARTED?
                                    </span>
                                    <span className="w-12 h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-transparent rounded-full ml-1" />
                                </div>

                                {/* Headline - 'Let's Build Something' on ONE Single Line */}
                                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-[1.18]">
                                    Let's Build Something <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070f3] via-[#00a6ff] to-[#38bdf8]">
                                        Great Together
                                    </span>
                                </h2>

                                {/* Subtitle */}
                                <p className="mt-3 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                                    From idea to launch, we'll be with you every step of the way. Turn your vision into reality with our expert team.
                                </p>

                                {/* Side-by-Side Action Buttons with EQUAL SIZE on Mobile (Grid 2-Col) */}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full mt-6">
                                    <a
                                        href="#contact"
                                        className="w-full h-11 sm:h-12 inline-flex items-center justify-center gap-1.5 px-2 rounded-full bg-gradient-to-r from-[#0066fe] to-[#0088ff] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/35 active:scale-[0.98] transition-all text-center whitespace-nowrap"
                                    >
                                        <span>Start Project</span>
                                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>

                                    <a
                                        href="#contact"
                                        className="w-full h-11 sm:h-12 inline-flex items-center justify-center px-2 rounded-full bg-[#07122b]/80 border border-white/20 text-white font-bold text-xs sm:text-sm shadow-md active:scale-[0.98] transition-all text-center whitespace-nowrap"
                                    >
                                        Contact Us
                                    </a>
                                </div>

                            </div>

                            {/* 2. Mobile Lower Image Section (Mountain Climber + Sunset + Script Quote) */}
                            <div className="relative w-full h-64 sm:h-80 overflow-hidden mt-1">

                                {/* Mountain Photo zoomed & centered on the climber & sunrise */}
                                <img
                                    src="/images/dsrzone-mountain-summit-cta.png"
                                    alt="DSRZone Innovation – Reaching New Summits in Technology"
                                    title="Innovation Today for a Better Tomorrow | DSRZone"
                                    className="w-full h-full object-cover object-[62%_center]"
                                />

                                {/* Smooth Top Gradient Transition into Midnight Blue Card Interior */}
                                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#03091e] to-transparent pointer-events-none" />

                                {/* Mobile Script Quote (Positioned Over the Sunset Sky Next to the Climber) */}
                                <div className="absolute top-4 right-4 sm:right-8 text-right pointer-events-none z-10">
                                    <div className="font-['Caveat',cursive] text-lg sm:text-2xl text-white font-semibold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-wide -rotate-3">
                                        Innovation<br />
                                        Today for a<br />
                                        Better Tomorrow
                                    </div>
                                    <svg
                                        className="w-24 sm:w-32 h-3.5 text-white/80 ml-auto mt-0.5 transform -rotate-2 drop-shadow-md"
                                        viewBox="0 0 160 20"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M3 12 C 45 4, 115 16, 155 8"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>

                            </div>

                        </div>

                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
