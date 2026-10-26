import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
    const stats = [
        { value: '50+', label: 'Projects Delivered', highlight: true },
        { value: '30+', label: 'Happy Clients' },
        { value: '5+', label: 'Industries', highlight: true },
        { value: '100%', label: 'Commitment' },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030712] pt-20 sm:pt-28 pb-10 sm:pb-16"
        >
            {/* Pure Background Video - Shifted right on mobile for perfect framing */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/hero backgroudnd.png"
                className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center z-0 pointer-events-none opacity-100"
            >
                <source src="/images/DSRZone.mp4" type="video/mp4" />
                <source src="/DSRZone.mp4" type="video/mp4" />
            </video>

            {/* Subtle Left Side Black Shade to boost text contrast while keeping video pure */}
            <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 bg-gradient-to-r from-black/75 via-black/40 to-transparent z-10 pointer-events-none" />

            {/* Main Hero Container */}
            <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
                {/* Content slightly lifted upwards */}
                <div className="flex-1 my-auto flex flex-col justify-center max-w-2xl -mt-6 sm:-mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex flex-col items-start"
                    >
                        {/* Pre-title Tagline */}
                        <div className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.25em] text-blue-400 uppercase mb-3 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            SOFTWARE DEVELOPMENT COMPANY
                        </div>

                        {/* Main Heading (REAL SOLUTIONS on next line) */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black text-white tracking-tight leading-[1.15] mb-5 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                            TURNING IDEAS INTO<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#1062FE] drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                                REAL SOLUTIONS
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-lg font-normal leading-relaxed mb-6 sm:mb-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                            We design and develop custom software, web platforms and digital systems that help businesses grow, work smarter and achieve more.
                        </p>

                        {/* CTA Buttons - Single row on mobile with responsive compact sizing */}
                        <div className="flex flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
                            <a
                                href="#contact"
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#1062FE] hover:bg-[#0052E0] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(16,98,254,0.4)] hover:shadow-[0_12px_28px_rgba(16,98,254,0.6)] hover:-translate-y-0.5 transition-all group whitespace-nowrap"
                            >
                                <span>Start a Project</span>
                                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                            </a>
                            <a
                                href="#portfolio"
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs sm:text-sm border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all whitespace-nowrap"
                            >
                                View Our Work
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats Row - Centered alignment */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="pt-6 sm:pt-8 border-t border-white/15 mt-6 sm:mt-8"
                >
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center sm:justify-start lg:justify-start gap-5 sm:gap-8 lg:gap-12 text-center sm:text-left">
                        {stats.map((stat, idx) => (
                            <React.Fragment key={stat.label}>
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${
                                        stat.highlight ? 'text-[#38bdf8]' : 'text-white'
                                    }`}>
                                        {stat.value}
                                    </span>
                                    <span className="text-[11px] sm:text-xs font-medium text-slate-300 mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                                        {stat.label}
                                    </span>
                                </div>
                                {idx < stats.length - 1 && (
                                    <div className="hidden sm:block h-8 w-[1px] bg-white/20" />
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
