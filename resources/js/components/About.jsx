import React from 'react';
import { motion } from 'framer-motion';

function About() {
    const stats = [
        {
            value: '50+',
            label: 'Projects Delivered',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            value: '30+',
            label: 'Happy Clients',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            value: '5+',
            label: 'Industries Served',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            value: '100%',
            label: 'Commitment to Quality',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
    ];

    return (
        <section id="about" className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 bg-white">
            {/* 100% Matching Split-Screen Background Asset */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
                style={{ backgroundImage: "url('/images/about_bg.jpg')" }}
            />

            {/* Mobile / Tablet fallback gradient helper */}
            <div className="absolute inset-0 bg-white/70 lg:hidden pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
                    
                    {/* Left Column: Founder Bio, Headline, Signature & Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4"
                    >
                        {/* Section Tag */}
                        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] text-[#1062FE] mb-3">
                            <span className="w-6 h-[2px] bg-[#1062FE]" />
                            <span>ABOUT US</span>
                        </div>

                        {/* Title matching screenshot */}
                        <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-slate-900 tracking-tight leading-[1.12] mb-5">
                            Turning Ideas<br />
                            Into <span className="text-[#1062FE]">Real<br />Solutions</span>
                        </h2>

                        {/* Paragraph description */}
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-md font-normal">
                            Hi, I'm Damith Sandunika, the founder of DSRZone. We are a software development company focused on building modern web platforms, digital systems and custom software solutions that help businesses grow, work smarter and achieve more.
                        </p>

                        {/* Signature & Designation */}
                        <div className="mb-7">
                            <div className="font-['Caveat',cursive] text-3xl sm:text-4xl text-slate-900 -rotate-2 select-none tracking-wide">
                                Damith Sandunika
                            </div>
                            <div className="mt-1">
                                <p className="text-xs font-bold text-slate-900">Founder & CEO</p>
                                <p className="text-[11px] font-semibold text-slate-500">DSRZone</p>
                            </div>
                        </div>

                        {/* Button */}
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1062FE] hover:bg-[#0052E0] text-white font-bold text-sm shadow-[0_8px_20px_rgba(16,98,254,0.35)] hover:shadow-[0_12px_28px_rgba(16,98,254,0.5)] hover:-translate-y-0.5 transition-all group"
                        >
                            <span>More About Us</span>
                            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        </a>
                    </motion.div>

                    {/* Center Column: Founder Cutout Image seamlessly placed on the arched glass */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-4 flex items-end justify-center relative -mb-6 lg:-mb-12"
                    >
                        <img
                            src="/images/DamithSandunika.png"
                            alt="Damith Sandunika - Founder & CEO of DSRZone"
                            className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] h-auto object-contain mx-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] select-none"
                        />
                    </motion.div>

                    {/* Right Column: 4 Stat Cards in Deep Blue Background */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-3 bg-[#03215c]/90 lg:bg-transparent rounded-3xl lg:rounded-none p-6 sm:p-8 lg:p-0 flex flex-col justify-center"
                    >
                        <div className="flex flex-col space-y-6">
                            {stats.map((s, idx) => (
                                <div
                                    key={s.label}
                                    className={`flex items-center gap-4 ${
                                        idx < stats.length - 1 ? 'pb-6 border-b border-blue-400/20' : ''
                                    }`}
                                >
                                    {/* Glowing Rounded Squircle Icon Badge */}
                                    <div className="w-13 h-13 p-3 rounded-2xl bg-gradient-to-tr from-[#0052e0] to-[#0080ff] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,82,224,0.45)] ring-1 ring-white/20 shrink-0">
                                        {s.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                                            {s.value}
                                        </span>
                                        <span className="text-xs sm:text-sm font-medium text-blue-100/90 mt-0.5 leading-snug">
                                            {s.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default About;
