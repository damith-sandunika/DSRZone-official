import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Fallback demo projects (admin panel eke data nathnam meka penenawa) ─── */
const fallbackProjects = [
    {
        id: 1,
        title: 'Smarty Menu — Digital Menu System',
        category: 'Restaurant Tech',
        client: 'The Garden Restaurant, Colombo',
        problem: 'Customers waited too long to order; physical menus went missing and re-printing was costly.',
        solution: 'We deployed a QR-based digital menu with real-time item updates, order tracking and a live kitchen dashboard. Order wait-time dropped by 40%.',
        images: [],
        project_url: null,
        technologies: ['React', 'Laravel', 'MySQL', 'QR'],
    },
    {
        id: 2,
        title: 'Inventory Pro — Stock Management',
        category: 'Business Operations',
        client: 'Lanka Pharma Distributors',
        problem: 'Stock discrepancies caused daily losses; managers had no visibility into real-time inventory levels.',
        solution: 'Built a real-time inventory dashboard with barcode scanning, expiry alerts and multi-branch syncing. Losses reduced by 60%.',
        images: [],
        project_url: null,
        technologies: ['Vue', 'Node.js', 'PostgreSQL'],
    },
    {
        id: 3,
        title: 'EduPulse — Learning Management',
        category: 'EdTech',
        client: 'Institute of Technology, Kandy',
        problem: 'No centralised platform for course materials, attendance, and student progress tracking.',
        solution: 'Developed a full LMS with video lessons, quizzes, certificates and attendance reports — accessible on any device.',
        images: [],
        project_url: null,
        technologies: ['React', 'Laravel', 'AWS S3'],
    },
];

/* ─── Image carousel ─────────────────────────────────────────────────────── */
function ImageCarousel({ images, title }) {
    const [idx, setIdx] = useState(0);
    const hasImages = images && images.length > 0;

    return (
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#0d1628] rounded-t-2xl flex-shrink-0">
            {hasImages ? (
                <>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={idx}
                            src={imageUrl(images[idx])}
                            alt={`${title} screenshot ${idx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover object-top animate-autoscroll cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    </AnimatePresence>
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={() => setIdx((i) => (i + 1) % images.length)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIdx(i)}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-blue-400' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                /* Placeholder */
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-[#0a0c12]">
                    <svg className="w-16 h-16 text-blue-500/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
        </div>
    );
}

/* ─── Project card ───────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
    const imgs = Array.isArray(project.images) ? project.images
        : project.image ? [project.image] : [];
    
    // Alternate layout: Even index -> Image Right, Text Left. Odd index -> Image Left, Text Right.
    const isEven = index % 2 === 0;

    return (
        <ScrollReveal delay={100}>
            <article className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center bg-[#0a0c12]/40 backdrop-blur-md rounded-3xl p-6 lg:p-10 border border-white/5 hover:border-blue-500/20 transition-all shadow-2xl relative overflow-hidden group">
                
                {/* Image Section */}
                <div className={`w-full lg:w-1/2 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                     <ImageCarousel images={imgs} title={project.title} />
                     <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className={`w-full lg:w-1/2 flex flex-col gap-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 sm:mb-3 block">
                            {project.category || 'Project'}
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">{project.title}</h3>
                    </div>

                    {project.client && (
                        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium -mt-2">
                            <svg className="w-4 h-4 text-blue-400/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {project.client}
                        </div>
                    )}

                    {/* Problem / Solution */}
                    <div className="flex flex-col gap-4 mt-2">
                        {/* Problem */}
                        <div className="rounded-2xl bg-[#130b0b]/60 border border-red-500/10 p-5">
                            <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <p className="text-xs font-bold uppercase tracking-widest text-red-400/90">Problem</p>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {project.problem || project.description || 'Client faced operational challenges that slowed down daily workflows.'}
                            </p>
                        </div>

                        {/* Solution */}
                        <div className="rounded-2xl bg-[#08101a]/60 border border-blue-500/10 p-5">
                            <div className="flex items-center gap-2 mb-2.5">
                                <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-400/90">Our Solution</p>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {project.solution || 'We delivered a custom digital system tailored to their specific needs.'}
                            </p>
                        </div>
                    </div>

                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map((t, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 text-xs font-medium">{t}</span>
                            ))}
                        </div>
                    )}

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-2">
                        {project.project_url && (
                            <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                                Visit site
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        )}
                    </div>
                </div>
            </article>
        </ScrollReveal>
    );
}

/* ─── Main Portfolio component ───────────────────────────────────────────── */
const INITIAL_COUNT = 5; // Top 5 main projects as requested

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/v1/projects?limit=6')
            .then((res) => setProjects(Array.isArray(res.data) ? res.data : []))
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    // Only display 5 projects here. The rest will go to a separate Products page.
    const visible = projects.slice(0, INITIAL_COUNT);
    const hasMore = projects.length > INITIAL_COUNT;

    return (
        <section id="portfolio" className="py-20 sm:py-28 bg-[#030610] border-t border-white/5 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <ScrollReveal>
                    <div className="text-center mb-16 sm:mb-24">
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/90 mb-3">Our Work</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">Portfolio</span>
                        </h2>
                        <p className="mt-6 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            Real problems. Real solutions. See how we've transformed businesses across Sri Lanka with our premium digital systems.
                        </p>
                    </div>
                </ScrollReveal>

                {loading ? (
                    <div className="flex flex-col gap-12">
                        {[1,2,3].map(i => (
                            <div key={i} className="rounded-3xl bg-[#0c1221]/50 border border-white/5 h-[500px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-12 sm:gap-20">
                            {visible.map((project, i) => (
                                <ProjectCard key={project.id} project={project} index={i} />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="text-center mt-20">
                                <a
                                    href="/products"
                                    className="inline-flex items-center gap-3 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-semibold px-8 py-3.5 hover:bg-blue-600/20 hover:border-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                >
                                    View All Products
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default Portfolio;
