import React from 'react';
import ScrollReveal from './ScrollReveal';

const stats = [
    { value: '100+', label: 'Projects Delivered' },
    { value: '50+', label: 'Happy Clients' },
    { value: '10+', label: 'Years Experience' },
    { value: '24/7', label: 'Support' },
];

function About() {
    return (
        <section id="about" className="py-24 bg-[#0f1220] border-t border-white/5 relative overflow-hidden">
            <div className="section-grid-pattern" aria-hidden />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="section-label">About Us</p>
                        <h2 className="section-title mt-2">
                            <span className="section-title-accent">IT & Graphic Solutions</span>
                        </h2>
                        <div className="section-divider" />
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal delay={50}>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Who We Are</h3>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p className="text-lg">
                                    Sldigitasystem delivers <span className="text-[#f59e0b]">IT and graphic solutions</span> that combine
                                    software development with strong visual identity. We help brands and businesses
                                    grow with custom software, branding, and design.
                                </p>
                                <p>
                                    From web and mobile apps to logos, brochures, and digital marketing assets,
                                    we bring technical and creative expertise under one roof.
                                </p>
                                <p>
                                    We work with startups and enterprises to build products and visuals that
                                    stand out and perform.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="card-hover rounded-xl bg-white/[0.03] p-6 border border-white/5 hover:border-[#f59e0b]/30"
                                >
                                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

export default About;
