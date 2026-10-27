import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function Hero({ onVideoReady }) {
    const videoRef = useRef(null);
    const stats = [
        { value: '50+', label: 'Projects Delivered', highlight: true },
        { value: '30+', label: 'Happy Clients' },
        { value: '5+', label: 'Industries', highlight: true },
        { value: '100%', label: 'Commitment' },
    ];

    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
            onVideoReady?.();
        }
    }, [onVideoReady]);

    const handleReady = () => {
        onVideoReady?.();
    };

    return (
        <section
            id="home"
            className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#030712] pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-16"
        >
            {/* ══════════════════════════════════════════════════════════════
                SEAMLESS BACKGROUND VIDEO (NO BOX / NO BORDER)
                - On Mobile: Sits edge-to-edge at the top (~50vh)
                - On Desktop: Fullscreen cinematic background
               ══════════════════════════════════════════════════════════════ */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={handleReady}
                onCanPlay={handleReady}
                onCanPlayThrough={handleReady}
                onPlaying={handleReady}
                poster="/images/hero backgroudnd.png"
                className="absolute top-0 inset-x-0 w-full h-[52vh] sm:h-[58vh] md:h-full md:inset-0 object-cover object-[75%_center] md:object-center z-0 pointer-events-none"
            >
                <source src="/images/DSRZone.mp4" type="video/mp4" />
                <source src="/DSRZone.mp4" type="video/mp4" />
            </video>

            {/* ══════════════════════════════════════════════════════════════
                MOBILE BACKGROUND SHADES & FADES (< md)
                Fades the top video seamlessly into the dark background
               ══════════════════════════════════════════════════════════════ */}
            {/* Top soft vignette for navbar */}
            <div className="md:hidden absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />

            {/* Smooth gradient fading video into #030712 */}
            <div className="md:hidden absolute top-[28vh] inset-x-0 h-[26vh] bg-gradient-to-b from-transparent via-[#030712]/80 to-[#030712] z-10 pointer-events-none" />

            {/* Solid dark base behind text area */}
            <div className="md:hidden absolute top-[52vh] inset-x-0 bottom-0 bg-[#030712] z-10 pointer-events-none" />

            {/* Ambient cyber blue glow behind content */}
            <div className="md:hidden absolute top-[44vh] left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-blue-600/15 rounded-full blur-[100px] z-10 pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                DESKTOP SHADE GRADIENT (md: and up)
               ══════════════════════════════════════════════════════════════ */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                HERO CONTENT CONTAINER
               ══════════════════════════════════════════════════════════════ */}
            <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between flex-1">

                {/* ──────────────────────────────────────────────────────────
                    MOBILE VIEW (< md)
                    Top: Spacer so the 3D video is clearly seen edge-to-edge
                    Bottom: Tagline, Title, Description, Buttons, Stats
                   ────────────────────────────────────────────────────────── */}
                <div className="flex flex-col md:hidden w-full">
                    {/* Top video viewing spacer - gives the top 3D animation full prominence */}
                    <div className="h-[36vh] sm:h-[40vh] w-full" />

                    {/* Text and buttons sitting below the video on the dark shade */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center px-2 pt-2 pb-6"
                    >
                        {/* Pre-title Tagline */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            SOFTWARE DEVELOPMENT COMPANY
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl font-black text-white tracking-tight leading-[1.18] mb-3">
                            TURNING IDEAS INTO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1062FE] drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                                REAL SOLUTIONS
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed mb-6 max-w-md">
                            We design and develop custom software, web platforms and digital systems that help businesses grow, work smarter and achieve more.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-row items-center justify-center gap-3 w-full max-w-sm mb-7">
                            <a
                                href="#contact"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#1062FE] hover:bg-[#0052E0] active:scale-95 text-white font-bold text-xs shadow-[0_8px_20px_rgba(16,98,254,0.4)] transition-all whitespace-nowrap"
                            >
                                <span>Start a Project</span>
                                <span>&rarr;</span>
                            </a>
                            <a
                                href="#portfolio"
                                className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-white font-semibold text-xs border border-white/15 backdrop-blur-sm transition-all whitespace-nowrap"
                            >
                                View Our Work
                            </a>
                        </div>

                        {/* Bottom Stats Grid */}
                        <div className="grid grid-cols-2 gap-2.5 w-full pt-5 border-t border-white/10">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center p-2.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-sm"
                                >
                                    <span className={`text-xl font-black tracking-tight ${
                                        stat.highlight ? 'text-[#38bdf8]' : 'text-white'
                                    }`}>
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-300 mt-0.5">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ──────────────────────────────────────────────────────────
                    DESKTOP VIEW (md: and up)
                    Cinematic full-screen with left-aligned hero content
                   ────────────────────────────────────────────────────────── */}
                <div className="hidden md:flex flex-1 my-auto flex-col justify-center max-w-2xl -mt-6 sm:-mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex flex-col items-start"
                    >
                        {/* Pre-title Tagline */}
                        <div className="inline-block text-xs font-bold tracking-[0.25em] text-blue-400 uppercase mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            SOFTWARE DEVELOPMENT COMPANY
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black text-white tracking-tight leading-[1.15] mb-5 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                            TURNING IDEAS INTO<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1062FE] drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                                REAL SOLUTIONS
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-slate-200 text-sm md:text-base max-w-lg font-normal leading-relaxed mb-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                            We design and develop custom software, web platforms and digital systems that help businesses grow, work smarter and achieve more.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-row items-center gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1062FE] hover:bg-[#0052E0] text-white font-bold text-sm shadow-[0_8px_20px_rgba(16,98,254,0.4)] hover:shadow-[0_12px_28px_rgba(16,98,254,0.6)] hover:-translate-y-0.5 transition-all group whitespace-nowrap"
                            >
                                <span>Start a Project</span>
                                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                            </a>
                            <a
                                href="#portfolio"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-sm border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all whitespace-nowrap"
                            >
                                View Our Work
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats Row on Desktop */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="hidden md:block pt-8 border-t border-white/15 mt-8"
                >
                    <div className="flex flex-wrap items-center justify-start gap-8 lg:gap-12 text-left">
                        {stats.map((stat, idx) => (
                            <React.Fragment key={stat.label}>
                                <div className="flex flex-col items-start text-left">
                                    <span className={`text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${
                                        stat.highlight ? 'text-[#38bdf8]' : 'text-white'
                                    }`}>
                                        {stat.value}
                                    </span>
                                    <span className="text-xs font-medium text-slate-300 mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                                        {stat.label}
                                    </span>
                                </div>
                                {idx < stats.length - 1 && (
                                    <div className="h-8 w-[1px] bg-white/20" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

export default Hero;
