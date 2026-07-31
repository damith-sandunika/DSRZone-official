import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';

const stats = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '50+', label: 'Happy Clients' },
    { value: '10+', label: 'Years Experience' },
    { value: '24/7', label: 'Support' },
];

function About() {
    const [logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/v1/projects')
            .then(res => {
                const projectsWithLogos = res.data.filter(p => p.logo);
                setLogos(projectsWithLogos.map(p => p.logo));
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="about" className="py-20 bg-[#030610] border-t border-white/5 relative overflow-hidden">
            {/* Background cyber accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/90 mb-3">About Us</p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">IT & Graphic Solutions</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <ScrollReveal delay={50}>
                        <div className="bg-[#0a0c12]/60 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
                            
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-5 flex items-center gap-3">
                                <span className="w-8 h-px bg-blue-500/50" />
                                Who We Are
                            </h3>
                            <div className="space-y-4 text-slate-400 text-sm sm:text-sm leading-relaxed">
                                <p>
                                    DSRZone delivers <span className="text-blue-300 font-medium">IT and graphic solutions</span> that combine
                                    cutting-edge software development with strong visual identity. We help brands and businesses
                                    grow with custom software, branding, and dynamic designs.
                                </p>
                                <p>
                                    From web and mobile applications to modern logos, brochures, and digital marketing assets,
                                    we bring both technical and creative expertise under one roof.
                                </p>
                                <p>
                                    We work closely with startups and enterprises to build highly scalable products and visually stunning graphics that
                                    truly stand out and perform in the real world.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={100}>
                        <div className="grid grid-cols-2 gap-3 sm:gap-5">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-[#0a0c12]/80 border border-blue-500/10 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 mb-1 drop-shadow-sm">
                                        {stat.value}
                                    </div>
                                    <div className="text-[9px] sm:text-[10px] text-blue-400/70 font-semibold uppercase tracking-widest text-center mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>

                {/* Temporary Client Logos Strip */}
                <ScrollReveal delay={200}>
                    <div className="mt-20 pt-10 border-t border-white/5 overflow-hidden relative">
                        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                            {/* Duplicate list exactly ONCE to make -50% translation seamless */}
                            {[...logos, ...logos].map((logo, i) => (
                                <div key={i} className="logo-slide px-4 md:px-8">
                                    <img
                                        src={imageUrl(logo)}
                                        alt="Client Logo"
                                        className="h-12 md:h-16 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                                    />
                                </div>
                            ))}
                            {logos.length === 0 && !loading && (
                                <div className="text-slate-500 italic">No client logos available yet.</div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

export default About;
