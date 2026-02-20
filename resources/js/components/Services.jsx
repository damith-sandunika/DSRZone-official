import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';

const fallbackServices = [
    { id: 1, title: 'Web Development', description: 'Custom web applications built with modern technologies', image: null },
    { id: 2, title: 'Mobile Apps', description: 'Native and cross-platform mobile applications', image: null },
    { id: 3, title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and deployment', image: null },
];

function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/v1/services').then((res) => setServices(res.data)).catch(() => setServices(fallbackServices)).finally(() => setLoading(false));
    }, []);

    return (
        <section id="services" className="py-24 border-t border-white/5 relative overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: 'url(/images/4.jpg)' }}
                aria-hidden
            />
            <div className="absolute inset-0 bg-[#0a0c12]/85 pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="section-label">What We Do</p>
                        <h2 className="section-title mt-2">
                            <span className="section-title-accent">Our Services</span>
                        </h2>
                        <div className="section-divider" />
                        <p className="section-desc mt-6">
                            IT and graphic solutions tailored for modern businesses
                        </p>
                    </div>
                </ScrollReveal>

                {loading ? (
                    <div className="text-center text-gray-500 py-12">Loading services...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <ScrollReveal key={service.id} delay={i * 80}>
                                <div className="card-hover group rounded-xl overflow-hidden bg-[#0a0c12] border border-white/5 hover:border-[#f59e0b]/30">
                                    <div className="relative h-52 overflow-hidden">
                                        {service.image ? (
                                            <img src={imageUrl(service.image)} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#f59e0b]/15 to-[#d97706]/10 flex items-center justify-center">
                                                <span className="text-5xl opacity-60">{service.icon || '💡'}</span>
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                                    </div>
                                    <div className="p-6 bg-[#0a0c12]/95">
                                        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{service.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Services;
